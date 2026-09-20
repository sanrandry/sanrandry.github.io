import { useEffect, useRef, useState } from "react";
import {
  initialView,
  parsePortfolioView,
  parseExperience,
  type Page,
  type PortfolioView,
  type Experience,
} from "../model";

// Preference and history initialize together: no flash of the wrong shell or stray history entry.
export function usePortfolioSession(
  projectCount: number,
  resetWindow: () => void,
) {
  const [experience, setExperience] = useState<Experience>("apple");
  const [hasChosenExperience, setHasChosenExperience] = useState(false);
  const [preferenceReady, setPreferenceReady] = useState(false);
  const [storageUnavailable, setStorageUnavailable] = useState(false);
  const experienceDialog = useRef<HTMLDialogElement>(null);

  const [view, setView] = useState(initialView);
  const currentView = useRef(initialView);
  const previousView = useRef(initialView);
  const { appOpen: mobileAppOpen } = view;

  const [query, setQuery] = useState("");
  const [windowState, setWindowState] = useState<
    "open" | "minimized" | "closed"
  >("open");

  const projectDialog = useRef<HTMLDialogElement>(null);
  const menu = useRef<HTMLDetailsElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const homeDock = useRef<HTMLButtonElement>(null);
  const mobileHome = useRef<HTMLButtonElement>(null);
  const mobileOrigin = useRef<HTMLElement | null>(null);
  const searchDialog = useRef<HTMLDialogElement>(null);
  const settingsDialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    // ponytail: one local preference, no account or device detection. Invalid values show the chooser again.
    const restore = (event: PopStateEvent) => {
      const next =
        parsePortfolioView(event.state?.portfolioView, projectCount) ??
        initialView;
      currentView.current = next;
      setView(next);
      setWindowState("open");
      menu.current?.removeAttribute("open");
    };
    window.addEventListener("popstate", restore);
    const frame = requestAnimationFrame(() => {
      let saved: Experience | null = null;
      try {
        saved = parseExperience(localStorage.getItem("portfolio-experience"));
      } catch {
        /* Storage may be blocked; the chooser still works. */
      }
      if (saved) {
        setExperience(saved);
        setHasChosenExperience(true);
      }
      const restored =
        parsePortfolioView(window.history.state?.portfolioView, projectCount) ??
        initialView;
      const next: PortfolioView = saved
        ? restored
        : { ...restored, overlay: "experience" };
      // Preserve Next's history fields; never add a sentinel that traps Back at the launcher.
      window.history.replaceState(
        { ...window.history.state, portfolioView: next },
        "",
      );
      currentView.current = next;
      setView(next);
      setPreferenceReady(true);
    });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("popstate", restore);
    };
  }, [projectCount]);
  function visit(change: Partial<PortfolioView>, replace = false) {
    const before = currentView.current;
    const next = { ...before, ...change };
    if (JSON.stringify(before) === JSON.stringify(next)) return;
    next.depth = before.depth + (replace ? 0 : 1);
    window.history[replace ? "replaceState" : "pushState"](
      { ...window.history.state, portfolioView: next },
      "",
    );
    currentView.current = next;
    setView(next);
  }
  function closeOverlay() {
    if (currentView.current.depth > 0) window.history.back();
    else visit({ overlay: null }, true);
  }
  useEffect(() => {
    const dialogs = {
      project: projectDialog.current,
      search: searchDialog.current,
      settings: settingsDialog.current,
      experience: experienceDialog.current,
    };
    for (const [name, element] of Object.entries(dialogs)) {
      if (name !== view.overlay && element?.open) element.close();
    }
    if (view.overlay && !dialogs[view.overlay]?.open)
      dialogs[view.overlay]?.showModal();
    const before = previousView.current;
    previousView.current = view;
    if (
      view.overlay ||
      (before.page === view.page && before.appOpen === view.appOpen)
    )
      return;
    const frame = requestAnimationFrame(() => {
      if (view.appOpen) {
        content.current?.scrollTo(0, 0);
        content.current
          ?.querySelector<HTMLElement>(".view-heading")
          ?.focus({ preventScroll: true });
      } else {
        const origin = mobileOrigin.current;
        if (origin?.isConnected && origin.getClientRects().length)
          origin.focus({ preventScroll: true });
        else mobileHome.current?.focus({ preventScroll: true });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [view]);

  function openExperience() {
    menu.current?.removeAttribute("open");
    visit({ overlay: "experience" });
  }
  function chooseExperience(next: Experience) {
    setExperience(next);
    setHasChosenExperience(true);
    resetWindow();
    try {
      localStorage.setItem("portfolio-experience", next);
      setStorageUnavailable(false);
    } catch {
      setStorageUnavailable(true);
    }
    closeOverlay();
    requestAnimationFrame(() => {
      const target = [
        ...document.querySelectorAll<HTMLElement>(
          "[data-experience-trigger], .ios-app-settings, .ios-launch-app:last-child",
        ),
      ].find((el) => el.getClientRects().length);
      target?.focus({ preventScroll: true });
    });
  }
  useEffect(() => {
    const closeMenu = (event: Event) => {
      if (!menu.current?.open) return;
      if (event instanceof KeyboardEvent) {
        if (event.key !== "Escape") return;
        menu.current.querySelector("summary")?.focus();
      } else if (menu.current.contains(event.target as Node)) return;
      menu.current.open = false;
    };
    document.addEventListener("pointerdown", closeMenu);
    document.addEventListener("keydown", closeMenu);
    return () => {
      document.removeEventListener("pointerdown", closeMenu);
      document.removeEventListener("keydown", closeMenu);
    };
  }, []);
  function navigate(next: Page) {
    if (!mobileAppOpen)
      mobileOrigin.current = document.activeElement as HTMLElement;
    setWindowState("open");
    visit({ page: next, appOpen: true, overlay: null, project: 0 });
    menu.current?.removeAttribute("open");
  }
  function returnToMobileHome() {
    visit({ appOpen: false, overlay: null });
  }
  function openSearch() {
    setQuery("");
    visit({ overlay: "search" });
  }
  function hideWindow(next: "closed" | "minimized") {
    setWindowState(next);
    visit({ appOpen: false }, true);
    homeDock.current?.focus();
  }

  function showProject(index: number) {
    visit({ project: index, overlay: "project" });
  }

  return {
    view,
    experience,
    hasChosenExperience,
    preferenceReady,
    storageUnavailable,
    windowState,
    query,
    setQuery,
    navigate,
    returnToMobileHome,
    openSearch,
    openExperience,
    chooseExperience,
    closeOverlay,
    showProject,
    hideWindow,
    openSettings: () => visit({ overlay: "settings" }),
    refs: {
      projectDialog,
      menu,
      content,
      homeDock,
      mobileHome,
      searchDialog,
      settingsDialog,
      experienceDialog,
    },
  };
}
export type PortfolioSession = ReturnType<typeof usePortfolioSession>;
