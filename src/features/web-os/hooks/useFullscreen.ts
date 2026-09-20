import { useEffect, useRef, useState, type MouseEvent } from "react";

export function useFullscreen() {
  const [screenMode, setScreenMode] = useState("browser");
  const [fullscreenFailed, setFullscreenFailed] = useState(false);
  const fullscreenAttempted = useRef(false);

  useEffect(() => {
    const standalone = window.matchMedia(
      "(display-mode: standalone), (display-mode: fullscreen)",
    );
    const update = () =>
      setScreenMode(
        document.fullscreenElement
          ? "fullscreen"
          : standalone.matches
            ? "standalone"
            : document.fullscreenEnabled
              ? "browser"
              : "unsupported",
      );
    const frame = requestAnimationFrame(update);
    document.addEventListener("fullscreenchange", update);
    standalone.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("fullscreenchange", update);
      standalone.removeEventListener("change", update);
    };
  }, []);
  async function enterFullscreen() {
    fullscreenAttempted.current = true;
    if (document.fullscreenElement || screenMode === "standalone") return;
    try {
      if (!document.fullscreenEnabled) return;
      await document.documentElement.requestFullscreen({
        navigationUI: "hide",
      });
      setFullscreenFailed(false);
    } catch {
      setFullscreenFailed(true);
    }
  }
  async function toggleFullscreen() {
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch {
        setFullscreenFailed(true);
      }
    } else await enterFullscreen();
  }

  function onNavigationClick(event: MouseEvent<HTMLElement>) {
    // Browsers require a gesture. One attempt per visit; never undo a user's exit.
    if (
      event.isTrusted &&
      !fullscreenAttempted.current &&
      (event.target as HTMLElement).closest(
        ".ios-home button, .experience-option, .ios-tabs button, .ios-back, .ios-home-control, .ios-app-settings, .project-card, .project-row, .menubar-name, .menubar-links button, .finder-sidebar button, .dock button, .desktop-shortcuts button, .desktop-empty button, .chrome-launcher, .chrome-preferences, .hero-section button, button.text-button, .content-footer button, .system-dropdown button, .ios-search-results button",
      )
    )
      void enterFullscreen();
  }
  return { screenMode, fullscreenFailed, toggleFullscreen, onNavigationClick };
}
export type Fullscreen = ReturnType<typeof useFullscreen>;
