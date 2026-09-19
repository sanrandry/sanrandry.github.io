"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import { translations, type Lang } from "@/lib/i18n";
import {
  terminalReply,
  normalizeSearch,
  parseExperience,
  type Experience,
} from "@/lib/desktop";
import "./desktop.css";

type Page =
  | "home"
  | "projects"
  | "experience"
  | "about"
  | "contact"
  | "terminal";
type IconName =
  | Page
  | "github"
  | "linkedin"
  | "arrow"
  | "download"
  | "sun"
  | "moon"
  | "code"
  | "globe"
  | "check"
  | "copy"
  | "external"
  | "grid"
  | "settings";
const paths: Record<IconName, string> = {
  grid: "M4 4h5v5H4ZM15 4h5v5h-5ZM4 15h5v5H4ZM15 15h5v5h-5Z",
  settings:
    "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM9 3h6l1 3 3 1 2 5-2 5-3 1-1 3H9l-1-3-3-1-2-5 2-5 3-1Z",
  home: "m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z",
  projects:
    "M3 7V5a2 2 0 0 1 2-2h5l3 3h6a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Zm0 1h18",
  experience: "M8 6V4h8v2M3 10h18M3 7h18v13H3Zm7 3v4h4v-4",
  about:
    "M20 21v-2a6 6 0 0 0-6-6h-4a6 6 0 0 0-6 6v2M16 6a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
  contact: "M3 5h18v14H3Zm0 1 9 7 9-7",
  terminal: "m5 6 5 6-5 6m8 0h6",
  github:
    "M9 21v-4c-4 1-4-2-6-2m12 6v-4c0-1-.3-2-1-2.5 4-.5 6-2 6-5.5 0-1.5-.5-2.5-1.5-3.5.5-1 .5-2.5 0-3.5-2 0-3 1-4 1.5a13 13 0 0 0-5 0C8.5 3 7 2 5.5 2 5 3 5 4.5 5.5 5.5 4.5 6.5 4 7.5 4 9c0 3.5 2 5 6 5.5-.7.5-1 1.5-1 2.5",
  linkedin: "M4 9v12M4 4v.01M10 21V9h5v2c3-4 6-2 6 2v8M15 14v7",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  download: "M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5",
  sun: "M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
  moon: "M21 13a9 9 0 0 1-10-10 9 9 0 1 0 10 10Z",
  code: "m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18",
  globe:
    "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M3 12h18M12 3a19 19 0 0 1 0 18 19 19 0 0 1 0-18",
  check: "m5 12 4 4L19 6",
  copy: "M8 8h13v13H8ZM16 8V3H3v13h5",
  external: "M14 3h7v7m0-7L10 14M10 3H3v18h18v-7",
};
function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
function Clock({
  lang,
  compact = false,
  dateOnly = false,
}: {
  lang: Lang;
  compact?: boolean;
  dateOnly?: boolean;
}) {
  const [date, setDate] = useState<Date | null>(null);
  useEffect(() => {
    const update = () => setDate(new Date());
    update();
    const timer = setInterval(update, 30_000);
    return () => clearInterval(timer);
  }, []);
  return (
    <time className="desktop-clock" dateTime={date?.toISOString()}>
      {date?.toLocaleString(lang === "fr" ? "fr-FR" : "en-GB", {
        ...(compact
          ? {}
          : {
              weekday: "short" as const,
              day: "numeric" as const,
              month: "short" as const,
            }),
        ...(!dateOnly
          ? { hour: "2-digit" as const, minute: "2-digit" as const }
          : {}),
      }) ?? "—"}
    </time>
  );
}
function Sculpture({ motion, lang }: { motion: boolean; lang: Lang }) {
  const scene = useRef<HTMLDivElement>(null);
  function tilt(e: PointerEvent<HTMLDivElement>) {
    if (
      !motion ||
      e.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const box = e.currentTarget.getBoundingClientRect();
    scene.current?.style.setProperty(
      "--tilt-x",
      `${(e.clientY - box.top - box.height / 2) / 18}deg`,
    );
    scene.current?.style.setProperty(
      "--tilt-y",
      `${(e.clientX - box.left - box.width / 2) / 15}deg`,
    );
  }
  function reset() {
    scene.current?.style.setProperty("--tilt-x", "0deg");
    scene.current?.style.setProperty("--tilt-y", "0deg");
  }
  return (
    <div
      className="sculpture-scene"
      ref={scene}
      onPointerMove={tilt}
      onPointerLeave={reset}
      aria-hidden="true"
    >
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="sculpture-shadow" />
      <span className="floating-tag tag-one">
        <span /> frontend
      </span>
      <span className="floating-tag tag-two">
        <Icon name="code" size={13} /> backend
      </span>
      <div className="sculpture">
        <div className="sculpture-turn">
          {["top", "middle", "bottom"].map((layer, index) => (
            <div className={`slab slab-${layer}`} key={layer}>
              <div className="slab-face slab-upper">
                {index === 0 ? (
                  <Icon name="code" size={64} />
                ) : (
                  <span className="chip-lines" />
                )}
              </div>
              <div className="slab-face slab-front" />
              <div className="slab-face slab-back" />
              <div className="slab-face slab-left" />
              <div className="slab-face slab-right" />
              <div className="slab-face slab-under" />
            </div>
          ))}
        </div>
      </div>
      <span className="scene-caption">
        <span className="tiny-cross">✧</span>{" "}
        {lang === "fr"
          ? "Une autre dimension du web."
          : "Another dimension of the web."}
      </span>
    </div>
  );
}
const projectTech = [
  ["Vue.js", ".NET 6", "gRPC", "PostgreSQL"],
  ["Next.js", "Nest.js", "Prisma", "MongoDB"],
  ["Vue.js", "Quasar", ".NET 6", "Blazor"],
  ["React", ".NET 5", "Keycloak"],
  ["Vue.js", "TypeGraphQL", "RabbitMQ"],
  ["TypeGraphQL", "Prisma", "PostgreSQL"],
  ["React Native", "Nest.js", "MySQL"],
  ["Next.js", "Bootstrap", "Redux"],
];

export default function WebOSPortfolio() {
  const [experience, setExperience] = useState<Experience>("apple");
  const [hasChosenExperience, setHasChosenExperience] = useState(false);
  const [preferenceReady, setPreferenceReady] = useState(false);
  const [storageUnavailable, setStorageUnavailable] = useState(false);
  const experienceDialog = useRef<HTMLDialogElement>(null);
  const android = experience === "google";
  const [lang, setLang] = useState<Lang>("fr");
  const [page, setPage] = useState<Page>("home");
  const [mobileAppOpen, setMobileAppOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [windowState, setWindowState] = useState<
    "open" | "minimized" | "closed"
  >("open");
  const [maximized, setMaximized] = useState(false);
  const [dark, setDark] = useState(false);
  const [motion, setMotion] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selected, setSelected] = useState(0);
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<{ input: string; output: string }[]>(
    [],
  );
  const [copyStatus, setCopyStatus] = useState<"" | "copied" | "failed">("");
  const dialog = useRef<HTMLDialogElement>(null);
  const menu = useRef<HTMLDetailsElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const homeDock = useRef<HTMLButtonElement>(null);
  const mobileHome = useRef<HTMLButtonElement>(null);
  const mobileOrigin = useRef<HTMLElement | null>(null);
  const searchDialog = useRef<HTMLDialogElement>(null);
  const settingsDialog = useRef<HTMLDialogElement>(null);
  const drag = useRef<{
    x: number;
    y: number;
    startX: number;
    startY: number;
    limitX: number;
    limitY: number;
  } | null>(null);
  const t = translations[lang];
  const say = (fr: string, en: string) => (lang === "fr" ? fr : en);
  const names: Record<Page, string> = {
    home: say("Bienvenue", "Welcome"),
    projects: say("Projets", "Projects"),
    experience: say("Parcours", "Experience"),
    about: say("À propos", "About"),
    contact: "Contact",
    terminal: "Terminal",
  };
  const projects = [...t.work.projects, ...t.projects.items];
  const mobileApps: Page[] = [
    "home",
    "projects",
    "experience",
    "about",
    "terminal",
    "contact",
  ];
  const appName = (item: Page) => (item === "home" ? "Portfolio" : names[item]);
  const matchedApps = mobileApps.filter((item) =>
    normalizeSearch(appName(item)).includes(normalizeSearch(query)),
  );
  const matchedProjects = projects
    .map((project, index) => ({ ...project, index }))
    .filter((project) =>
      normalizeSearch(project.title).includes(normalizeSearch(query)),
    );

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  useEffect(() => {
    // ponytail: one local preference, no account or device detection. Invalid values show the chooser again.
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
      } else requestAnimationFrame(() => experienceDialog.current?.showModal());
      setPreferenceReady(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  function openExperience() {
    settingsDialog.current?.close();
    searchDialog.current?.close();
    menu.current?.removeAttribute("open");
    experienceDialog.current?.showModal();
  }
  function chooseExperience(next: Experience) {
    setExperience(next);
    setHasChosenExperience(true);
    setPosition({ x: 0, y: 0 });
    setMaximized(false);
    try {
      localStorage.setItem("portfolio-experience", next);
      setStorageUnavailable(false);
    } catch {
      setStorageUnavailable(true);
    }
    experienceDialog.current?.close();
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
    setPage(next);
    setWindowState("open");
    setMobileAppOpen(true);
    menu.current?.removeAttribute("open");
    requestAnimationFrame(() => {
      content.current?.scrollTo(0, 0);
      content.current
        ?.querySelector<HTMLElement>(".view-heading")
        ?.focus({ preventScroll: true });
    });
  }
  function returnToMobileHome() {
    setMobileAppOpen(false);
    requestAnimationFrame(() => {
      const origin = mobileOrigin.current;
      if (origin?.isConnected && origin.getClientRects().length)
        origin.focus({ preventScroll: true });
      else mobileHome.current?.focus({ preventScroll: true });
    });
  }
  function openSearch() {
    setQuery("");
    searchDialog.current?.showModal();
  }
  function hideWindow(next: "closed" | "minimized") {
    setWindowState(next);
    setMobileAppOpen(false);
    homeDock.current?.focus();
  }
  function startDrag(event: PointerEvent<HTMLElement>) {
    if (
      maximized ||
      event.button !== 0 ||
      window.matchMedia(
        "(max-width: 767px), (max-width: 1024px) and (max-height: 500px) and (pointer: coarse)",
      ).matches ||
      (event.target as HTMLElement).closest("button,a,summary")
    )
      return;
    const frame = event.currentTarget.parentElement!;
    const bounds = frame.parentElement!.getBoundingClientRect();
    const box = frame.getBoundingClientRect();
    drag.current = {
      x: event.clientX,
      y: event.clientY,
      startX: position.x,
      startY: position.y,
      limitX: Math.max(0, (bounds.width - box.width) / 2),
      limitY: Math.max(0, (bounds.height - box.height) / 2),
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function moveWindow(event: PointerEvent<HTMLElement>) {
    const d = drag.current;
    if (d)
      setPosition({
        x: Math.max(
          -d.limitX,
          Math.min(d.limitX, d.startX + event.clientX - d.x),
        ),
        y: Math.max(
          -d.limitY,
          Math.min(d.limitY, d.startY + event.clientY - d.y),
        ),
      });
  }
  function showProject(index: number) {
    setSelected(index);
    dialog.current?.showModal();
  }
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("sinrandry@gmail.com");
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  }
  function projectCard(index: number) {
    const project = projects[index];
    return (
      <button className="project-card" onClick={() => showProject(index)}>
        <span
          className={`project-visual visual-${index % 2}`}
          aria-hidden="true"
        >
          {index === 0 ? (
            <>
              <span className="planet" />
              <span className="planet-orbit" />
              <span className="project-art-label">
                EARTH INTELLIGENCE <span>↗</span>
              </span>
            </>
          ) : (
            <>
              <span className="mini-dashboard">
                <span className="mini-sidebar" />
                <span className="mini-chart">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
                <span className="mini-row" />
              </span>
              <span className="project-art-label">
                VOAKAJY <span>✳</span>
              </span>
            </>
          )}
        </span>
        <span className="project-card-info">
          <span>
            <strong>{project.title}</strong>
            <small>
              {index === 0
                ? say(
                    "Observation de la Terre · Microservices",
                    "Earth observation · Microservices",
                  )
                : say(
                    "Gestion RH · Plateforme métier",
                    "HR management · Business platform",
                  )}
            </small>
          </span>
          <Icon name="external" size={17} />
        </span>
      </button>
    );
  }
  function mobileIcon(item: IconName | "cv" | "settings") {
    return (
      <span className={`ios-app-icon ios-icon-${item}`} aria-hidden="true">
        {item === "home" && android ? (
          <Icon name="globe" size={32} />
        ) : item === "home" ? (
          <span className="ios-compass" />
        ) : item === "about" ? (
          <Image src="/images/avatar.webp" alt="" width={64} height={64} />
        ) : item === "cv" ? (
          <span className="ios-pdf">
            PDF
            <i />
            <i />
          </span>
        ) : item === "settings" ? (
          <span className="ios-gear">⚙</span>
        ) : (
          <Icon name={item} size={30} />
        )}
      </span>
    );
  }
  return (
    <div
      className={`desktop ${preferenceReady ? "" : "preference-loading"} ${android ? "ecosystem-google" : "ecosystem-apple"} ${dark ? "theme-dark" : ""} ${motion ? "" : "motion-off"} ${mobileAppOpen ? "mobile-app-open" : ""}`}
      lang={lang}
    >
      <noscript>
        <style>{".desktop.preference-loading { visibility: visible; }"}</style>
      </noscript>
      <a
        className="desktop-skip"
        href="#portfolio-content"
        onClick={() => {
          setWindowState("open");
          setMobileAppOpen(true);
        }}
      >
        {say("Aller au contenu", "Skip to content")}
      </a>
      <div className="wallpaper" aria-hidden="true">
        <div className="wallpaper-ridge ridge-one" />
        <div className="wallpaper-ridge ridge-two" />
        <div className="wallpaper-ridge ridge-three" />
        <div className="wallpaper-grain" />
      </div>
      <div className="ios-statusbar">
        <Clock lang={lang} compact />
        <span className="ios-island" aria-hidden="true">
          <i />
        </span>
        <span className="ios-status-icons" aria-hidden="true">
          <svg width="17" height="14" viewBox="0 0 17 14" fill="currentColor">
            <rect x="0" y="9" width="3" height="5" rx=".7" />
            <rect x="4.5" y="6" width="3" height="8" rx=".7" />
            <rect x="9" y="3" width="3" height="11" rx=".7" />
            <rect x="13.5" y="0" width="3" height="14" rx=".7" />
          </svg>
          <svg
            width="17"
            height="14"
            viewBox="0 0 20 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          >
            <path d="M2 4a13 13 0 0 1 16 0M5 8a8 8 0 0 1 10 0m-7 4a3 3 0 0 1 4 0" />
            <circle cx="10" cy="15" r=".7" fill="currentColor" stroke="none" />
          </svg>
          <span className="ios-battery">
            <i />
          </span>
        </span>
      </div>
      <main
        className="ios-home"
        aria-label={
          android
            ? say("Écran d’accueil Pixel", "Pixel home screen")
            : say("Écran d’accueil iPhone", "iPhone home screen")
        }
      >
        <h1 className="sr-only">
          {say(
            "Le portfolio de Santatraina Randry",
            "Santatraina Randry’s portfolio",
          )}
        </h1>
        <div className="ios-home-content">
          {android && (
            <div className="pixel-at-glance">
              <span className="pixel-edition">RANDRY · PIXEL EDITION</span>
              <Clock lang={lang} dateOnly />
              <span>
                <i />
                {say("Des idées. Du code. Et vous.", "Ideas. Code. And you.")}
              </span>
            </div>
          )}
          <div className="ios-widgets">
            <button
              className="ios-profile-widget"
              onClick={() => navigate("about")}
            >
              <span className="ios-widget-top">
                <Image
                  src="/images/avatar.webp"
                  alt=""
                  width={38}
                  height={38}
                />
                <span>↗</span>
              </span>
              <strong>
                Santatraina
                <br />
                Randry<span>.</span>
              </strong>
              <small>
                {say("Développeur fullstack", "Fullstack developer")}
              </small>
              <span className="ios-widget-availability">
                <i />
                {say("Disponible", "Available")}
              </span>
            </button>
            <button
              className="ios-experience-widget"
              onClick={() => navigate("experience")}
            >
              <span className="ios-widget-top">
                <Icon name="experience" size={19} />
                <span>{say("LE PARCOURS", "THE JOURNEY")}</span>
              </span>
              <strong>{t.stats[0].value.split(" ")[0]}</strong>
              <span>{say("ans à donner vie", "years bringing")}</span>
              <span>{say("à vos idées.", "your ideas to life.")}</span>
              <small>
                {say("De l’idée au produit", "From idea to product")}{" "}
                <span>↗</span>
              </small>
            </button>
          </div>
          <nav
            className="ios-app-grid"
            aria-label={say("Applications", "Apps")}
          >
            {mobileApps.map((item) => (
              <button
                key={item}
                ref={item === "home" ? mobileHome : undefined}
                onClick={() => navigate(item)}
                className={`ios-launch-app ios-launch-${item}`}
              >
                {mobileIcon(item)}
                <span>{appName(item)}</span>
              </button>
            ))}
            <a
              className="ios-launch-app"
              href="/CV.pdf"
              target="_blank"
              rel="noreferrer"
            >
              {mobileIcon("cv")}
              <span>{say("Mon CV", "Resume")}</span>
            </a>
            <button
              className="ios-launch-app"
              onClick={() => settingsDialog.current?.showModal()}
            >
              {mobileIcon("settings")}
              <span>{say("Réglages", "Settings")}</span>
            </button>
          </nav>
          <button
            className="ios-project-widget"
            onClick={() => navigate("projects")}
          >
            <span>
              <small>
                {say("LE CODE, EN CONCRET", "CODE, IN THE REAL WORLD")}
              </small>
              <strong>
                {say("8 projets à explorer.", "8 projects to explore.")}
              </strong>
              <span>
                {say("De la Terre au quotidien", "From Earth to everyday life")}{" "}
                <span>↗</span>
              </span>
            </span>
            <span className="ios-widget-art" aria-hidden="true">
              <span className="planet" />
              <span className="planet-orbit" />
            </span>
          </button>
          <p className="ios-home-caption">
            {say(
              "Un peu de moi. Au bout des doigts.",
              "A little about me. At your fingertips.",
            )}
          </p>
        </div>
        <div className="ios-launcher-bottom">
          <button className="ios-search-trigger" onClick={openSearch}>
            <span aria-hidden="true">⌕</span>
            {say("Rechercher", "Search")}
          </button>
          <nav
            className="ios-dock"
            aria-label={
              android
                ? say("Favoris Pixel", "Pixel favorites")
                : say("Dock iPhone", "iPhone dock")
            }
          >
            <button onClick={() => navigate("home")} aria-label="Portfolio">
              {mobileIcon("home")}
            </button>
            <button onClick={() => navigate("contact")} aria-label="Contact">
              {mobileIcon("contact")}
            </button>
            <a
              href="https://github.com/sanrandry"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              {mobileIcon("github")}
            </a>
            <a
              href="https://www.linkedin.com/in/randry-santatraina-sitraka-131415168/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              {mobileIcon("linkedin")}
            </a>
          </nav>
          <span className="ios-launcher-indicator" aria-hidden="true" />
        </div>
      </main>
      <header className="menubar">
        <details ref={menu} className="system-menu">
          <summary aria-label={say("Menu du bureau", "Desktop menu")}>
            <span className="brand-mark">
              r<span>.</span>
            </span>
          </summary>
          <div className="system-dropdown">
            <strong>
              Randry OS <small>Portfolio · 2026</small>
            </strong>
            <button onClick={() => navigate("about")}>
              {say("À propos de ce portfolio", "About this portfolio")}
            </button>
            <button onClick={openExperience} data-experience-trigger>
              {say(
                "Changer d’univers : iPhone / Android",
                "Switch experience: iPhone / Android",
              )}
            </button>
            <button
              onClick={() => {
                setPosition({ x: 0, y: 0 });
                setMaximized(false);
                navigate("home");
              }}
            >
              {say("Recentrer la fenêtre", "Center window")}
            </button>
            <button
              onClick={() => {
                setMotion(!motion);
                menu.current?.removeAttribute("open");
              }}
            >
              {motion
                ? say("Désactiver les animations", "Disable animations")
                : say("Activer les animations", "Enable animations")}
            </button>
            <a href="/portfolio/">
              {say("Version classique", "Classic portfolio")}{" "}
              <Icon name="external" size={14} />
            </a>
          </div>
        </details>
        <button className="menubar-name" onClick={() => navigate("home")}>
          Randry<span> Portfolio</span>
        </button>
        <nav
          className="menubar-links"
          aria-label={say("Accès rapide", "Quick navigation")}
        >
          <button onClick={() => navigate("projects")}>{names.projects}</button>
          <button onClick={() => navigate("contact")}>{names.contact}</button>
        </nav>
        <div className="menubar-right">
          <button
            className="experience-switch"
            onClick={openExperience}
            data-experience-trigger
          >
            {android ? "Android" : "iPhone"}
            <span aria-hidden="true"> ⇄</span>
          </button>
          <span className="desktop-location">
            <Icon name="globe" size={13} /> Madagascar
          </span>
          <button
            className="theme-switch"
            onClick={() => setDark(!dark)}
            aria-label={
              dark
                ? say("Activer le thème clair", "Switch to light theme")
                : say("Activer le thème sombre", "Switch to dark theme")
            }
          >
            <Icon name={dark ? "sun" : "moon"} size={15} />
          </button>
          <button
            className="language-switch"
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            aria-label={
              lang === "fr"
                ? "FR — Switch to English"
                : "EN — Passer en français"
            }
          >
            {lang.toUpperCase()}
          </button>
          <Clock lang={lang} />
        </div>
      </header>
      <div className="desktop-shortcuts">
        <button onClick={() => navigate("projects")}>
          <span className="desktop-folder">
            <Icon name="projects" size={36} />
          </span>
          {say("Mes projets", "My projects")}
        </button>
        <a href="/CV.pdf" target="_blank" rel="noreferrer">
          <span className="desktop-document">
            <span>PDF</span>
            <i />
            <i />
            <i />
          </span>
          CV — Randry
        </a>
      </div>
      <div className="window-stage">
        {windowState !== "open" && (
          <div className="desktop-empty">
            <span className="empty-monogram">r.</span>
            <h1>{say("Faites comme chez vous.", "Make yourself at home.")}</h1>
            <button className="primary-button" onClick={() => navigate("home")}>
              {say("Ouvrir le portfolio", "Open portfolio")}
              <Icon name="arrow" size={17} />
            </button>
          </div>
        )}
        <main
          className={`portfolio-window ${maximized ? "is-maximized" : ""}`}
          hidden={windowState !== "open"}
          style={
            {
              "--window-x": `${position.x}px`,
              "--window-y": `${position.y}px`,
            } as CSSProperties
          }
          aria-label="Portfolio"
        >
          <header
            className="window-toolbar"
            onPointerDown={startDrag}
            onPointerMove={moveWindow}
            onPointerUp={() => {
              drag.current = null;
            }}
            onPointerCancel={() => {
              drag.current = null;
            }}
            onLostPointerCapture={() => {
              drag.current = null;
            }}
            onDoubleClick={(event) => {
              if (
                !window.matchMedia(
                  "(max-width: 767px), (max-width: 1024px) and (max-height: 500px) and (pointer: coarse)",
                ).matches &&
                !(event.target as HTMLElement).closest("button,a")
              ) {
                setMaximized(!maximized);
                setPosition({ x: 0, y: 0 });
              }
            }}
          >
            <button
              className="ios-back"
              onClick={returnToMobileHome}
              aria-label={say("Accueil", "Home")}
            >
              <span aria-hidden="true">{android ? "←" : "‹"}</span>
              <span className="ios-back-label">{say("Accueil", "Home")}</span>
            </button>
            <strong className="ios-app-title">{appName(page)}</strong>
            <button
              className="ios-app-settings"
              onClick={() => settingsDialog.current?.showModal()}
              aria-label={say("Réglages", "Settings")}
            >
              <span aria-hidden="true">{android ? "⋮" : "•••"}</span>
            </button>
            <div className="traffic-lights">
              <button
                className="traffic-close"
                onClick={() => hideWindow("closed")}
                aria-label={say("Fermer la fenêtre", "Close window")}
              >
                <span>×</span>
              </button>
              <button
                className="traffic-minimize"
                onClick={() => hideWindow("minimized")}
                aria-label={say("Réduire la fenêtre", "Minimize window")}
              >
                <span>−</span>
              </button>
              <button
                className="traffic-maximize"
                onClick={() => {
                  setMaximized(!maximized);
                  setPosition({ x: 0, y: 0 });
                }}
                aria-label={
                  maximized
                    ? say("Restaurer la fenêtre", "Restore window")
                    : say("Agrandir la fenêtre", "Maximize window")
                }
              >
                <span>{android ? "□" : "↗"}</span>
              </button>
            </div>
            <span className="window-breadcrumb">
              <Icon name="projects" size={16} />
              <span>Portfolio</span>
              <span className="breadcrumb-divider">/</span>
              <strong>{names[page]}</strong>
            </span>
            <a
              className="toolbar-contact"
              aria-label={say(
                "Discutons — envoyer un e-mail",
                "Let's talk — send an email",
              )}
              href="mailto:sinrandry@gmail.com"
            >
              <Icon name="contact" size={15} />
              <span>{say("Discutons", "Let's talk")}</span>
            </a>
          </header>
          <div className="window-body">
            <aside className="finder-sidebar">
              <button
                className="sidebar-profile"
                onClick={() => navigate("about")}
              >
                <span className="avatar">
                  <Image
                    src="/images/avatar.webp"
                    alt=""
                    width={34}
                    height={34}
                  />
                </span>
                <span>
                  <strong>Santatraina Randry</strong>
                  <small>Fullstack developer</small>
                </span>
              </button>
              <span className="sidebar-heading">PORTFOLIO</span>
              <nav aria-label={say("Navigation principale", "Main navigation")}>
                {(
                  [
                    "home",
                    "projects",
                    "experience",
                    "about",
                    "contact",
                  ] as Page[]
                ).map((item) => (
                  <button
                    key={item}
                    onClick={() => navigate(item)}
                    aria-current={page === item ? "page" : undefined}
                    className={page === item ? "is-active" : ""}
                  >
                    <Icon name={item} size={18} />
                    <span>{names[item]}</span>
                    {item === "projects" && <small>08</small>}
                  </button>
                ))}
              </nav>
              <span className="sidebar-heading links-heading">
                {say("RETROUVONS-NOUS", "ELSEWHERE")}
              </span>
              <div className="sidebar-socials">
                <a
                  href="https://github.com/sanrandry"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name="github" size={17} />
                  GitHub
                  <Icon name="external" size={12} />
                </a>
                <a
                  href="https://www.linkedin.com/in/randry-santatraina-sitraka-131415168/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name="linkedin" size={17} />
                  LinkedIn
                  <Icon name="external" size={12} />
                </a>
                <a href="/CV.pdf" target="_blank" rel="noreferrer">
                  <Icon name="download" size={17} />
                  {say("Mon CV", "My resume")}
                  <span>PDF</span>
                </a>
              </div>
              <div className="sidebar-bottom">
                <span className="availability">
                  <i />
                  {say("Disponible en freelance", "Available for freelance")}
                </span>
                <span>
                  Antananarivo, Madagascar <span>↗</span>
                </span>
              </div>
            </aside>
            <div
              className="portfolio-content"
              ref={content}
              id="portfolio-content"
              tabIndex={-1}
            >
              <div className="view-content" key={page}>
                {page === "home" && (
                  <>
                    <div className="content-eyebrow">
                      <span>
                        <span className="small-spark">✳</span>{" "}
                        {say(
                          "BIENVENUE DANS MON UNIVERS",
                          "WELCOME TO MY CORNER OF THE WEB",
                        )}
                      </span>
                      <span className="edition-label">PORTFOLIO / 2026</span>
                    </div>
                    <section className="hero-section">
                      <div className="hero-copy">
                        <span className="hello-label">
                          {say(
                            "Bonjour, moi c’est Santatraina.",
                            "Hi, I'm Santatraina.",
                          )}{" "}
                          <span className="hello-wave">✌</span>
                        </span>
                        <h1 tabIndex={-1} className="view-heading">
                          {say("Du code.", "Thoughtful code.")}
                          <br />
                          <span>{say("Du sens.", "Real impact.")}</span>
                        </h1>
                        <p>
                          {say(
                            "Développeur fullstack, je transforme vos idées en expériences web soignées, solides et utiles.",
                            "Fullstack developer turning your ideas into thoughtful, reliable web experiences that make a difference.",
                          )}
                        </p>
                        <div className="hero-actions">
                          <button
                            className="primary-button"
                            onClick={() => navigate("projects")}
                          >
                            {say("Explorer mes projets", "Explore my projects")}
                            <Icon name="arrow" size={17} />
                          </button>
                          <button
                            className="text-button"
                            onClick={() => navigate("contact")}
                          >
                            {say(
                              "Parlons de votre idée",
                              "Let's talk about your idea",
                            )}
                            <span>↗</span>
                          </button>
                        </div>
                      </div>
                      <Sculpture motion={motion} lang={lang} />
                    </section>
                    <div className="stack-strip">
                      <span>
                        {say("MES OUTILS AU QUOTIDIEN", "MY EVERYDAY TOOLKIT")}
                      </span>
                      <div>
                        <b>
                          Vue<span>.js</span>
                        </b>
                        <b>React</b>
                        <b>
                          Next<span>.js</span>
                        </b>
                        <b>
                          Node<span>.js</span>
                        </b>
                        <b>TypeScript</b>
                        <b>Docker</b>
                      </div>
                    </div>
                    <section className="featured-section">
                      <div className="section-label">
                        <h2>
                          {say(
                            "Une sélection de projets",
                            "A selection of my work",
                          )}
                        </h2>
                        <button
                          className="text-button"
                          onClick={() => navigate("projects")}
                        >
                          {say("Tout explorer", "View all work")}
                          <Icon name="arrow" size={15} />
                        </button>
                      </div>
                      <div className="featured-grid">
                        {projectCard(0)}
                        {projectCard(1)}
                      </div>
                    </section>
                    <footer className="content-footer">
                      <span>
                        <i />
                        {say(
                          "Du premier pixel à la mise en production.",
                          "From the first pixel to production.",
                        )}
                      </span>
                      <button onClick={() => navigate("about")}>
                        {say("Un peu plus sur moi", "A little more about me")} ↗
                      </button>
                    </footer>
                  </>
                )}
                {page === "projects" && (
                  <>
                    <div className="content-eyebrow">
                      {say(
                        "SÉLECTION & EXPLORATIONS",
                        "SELECTED WORK & EXPLORATIONS",
                      )}
                      <span>08 {say("PROJETS", "PROJECTS")}</span>
                    </div>
                    <h1 tabIndex={-1} className="view-heading page-title">
                      {say("Des idées. Du concret.", "Ideas, made real.")}
                    </h1>
                    <p className="page-intro">
                      {say(
                        "De l’observation de la Terre aux outils métier. Des projets variés, une même exigence.",
                        "From Earth observation to business tools. Different challenges, the same attention to detail.",
                      )}
                    </p>
                    <div className="featured-grid">
                      {projectCard(0)}
                      {projectCard(1)}
                    </div>
                    <div className="project-list">
                      {projects.slice(2).map((project, index) => (
                        <button
                          key={project.title}
                          onClick={() => showProject(index + 2)}
                        >
                          <span className="project-number">0{index + 3}</span>
                          <span>
                            <strong>{project.title}</strong>
                            <small>{projectTech[index + 2].join(" · ")}</small>
                          </span>
                          <Icon name="arrow" size={18} />
                        </button>
                      ))}
                    </div>
                  </>
                )}
                {page === "experience" && (
                  <>
                    <div className="content-eyebrow">
                      {say("LE PARCOURS", "THE JOURNEY")}
                    </div>
                    <h1 tabIndex={-1} className="view-heading page-title">
                      {say(
                        "Toujours construire. Toujours apprendre.",
                        "Always building. Always learning.",
                      )}
                    </h1>
                    <p className="page-intro">
                      {say(
                        "Plus de 6 ans à relier besoins métier et solutions techniques.",
                        "Over 6 years connecting business needs with technical solutions.",
                      )}
                    </p>
                    <div className="experience-list">
                      {t.experience.jobs.map((job, index) => (
                        <article key={job.company}>
                          <span className="timeline-dot" />
                          <div className="job-meta">
                            <span>{job.period}</span>
                            <span>0{index + 1}</span>
                          </div>
                          <h2>{job.company}</h2>
                          <h3>{job.role}</h3>
                          <ul>
                            {job.bullets.map((bullet) => (
                              <li key={bullet}>{bullet}</li>
                            ))}
                          </ul>
                        </article>
                      ))}
                    </div>
                  </>
                )}
                {page === "about" && (
                  <>
                    <div className="content-eyebrow">
                      {say("DERRIÈRE LE CODE", "BEHIND THE CODE")}
                    </div>
                    <h1 tabIndex={-1} className="view-heading page-title">
                      {say(
                        "Enchanté, Santatraina.",
                        "Nice to meet you. I'm Santatraina.",
                      )}
                    </h1>
                    <div className="about-grid">
                      <div>
                        <p className="page-intro">{t.about.p1}</p>
                        <p>{t.about.p2}</p>
                        <p>{t.about.p3}</p>
                      </div>
                      <div className="about-monogram">
                        <span>
                          SR<span>.</span>
                        </span>
                        <small>
                          ANTANANARIVO
                          <br />
                          18.8792° S · 47.5079° E
                        </small>
                      </div>
                    </div>
                    <div className="stats-grid">
                      {t.stats.map((stat) => (
                        <div key={stat.label}>
                          <strong>{stat.value}</strong>
                          <span>{stat.label}</span>
                        </div>
                      ))}
                    </div>
                    <h2 className="subheading">
                      {say(
                        "Une stack, de bout en bout.",
                        "A stack, end to end.",
                      )}
                    </h2>
                    <div className="skills-grid">
                      {[
                        [
                          "Frontend",
                          "Vue.js · Nuxt.js · React · Next.js · TypeScript",
                        ],
                        [
                          "Backend",
                          "Node.js · Nest.js · .NET · gRPC · GraphQL",
                        ],
                        [
                          say("Données & livraison", "Data & delivery"),
                          "PostgreSQL · MongoDB · Prisma · Docker",
                        ],
                      ].map(([title, stack]) => (
                        <div key={title}>
                          <Icon name="code" />
                          <h3>{title}</h3>
                          <p>{stack}</p>
                        </div>
                      ))}
                    </div>
                    <a
                      className="primary-button resume-button"
                      href="/CV.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {say("Consulter mon CV", "View my resume")}
                      <Icon name="download" size={17} />
                    </a>
                  </>
                )}
                {page === "contact" && (
                  <section className="contact-view">
                    <span className="contact-symbol">
                      <Icon name="contact" size={44} />
                    </span>
                    <span className="availability">
                      <i />
                      {say(
                        "DISPONIBLE POUR DE NOUVEAUX PROJETS",
                        "OPEN TO NEW PROJECTS",
                      )}
                    </span>
                    <h1 tabIndex={-1} className="view-heading page-title">
                      {say("La suite s’écrit", "The next chapter")}
                      <br />
                      <span>{say("ensemble.", "starts together.")}</span>
                    </h1>
                    <p>{t.contact.description}</p>
                    <a
                      className="contact-email"
                      href="mailto:sinrandry@gmail.com"
                    >
                      sinrandry@gmail.com
                      <Icon name="arrow" />
                    </a>
                    <div className="contact-actions">
                      <a
                        className="primary-button"
                        href="mailto:sinrandry@gmail.com"
                      >
                        {say("Écrivez-moi", "Get in touch")}
                        <Icon name="external" size={16} />
                      </a>
                      <button className="text-button" onClick={copyEmail}>
                        <Icon name="copy" size={15} />
                        {say("Copier l’adresse", "Copy email")}
                      </button>
                    </div>
                    <p className="copy-status" role="status">
                      {copyStatus === "copied"
                        ? say("Adresse copiée !", "Email copied!")
                        : copyStatus === "failed"
                          ? say(
                              "Copie indisponible. Sélectionnez l’adresse ci-dessus.",
                              "Copy unavailable. Select the email address above.",
                            )
                          : ""}
                    </p>
                    <div className="contact-socials">
                      <a
                        href="https://github.com/sanrandry"
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub ↗
                      </a>
                      <a
                        href="https://www.linkedin.com/in/randry-santatraina-sitraka-131415168/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        LinkedIn ↗
                      </a>
                      <a href="/CV.pdf" target="_blank" rel="noreferrer">
                        {say("Mon CV", "My resume")} ↗
                      </a>
                    </div>
                  </section>
                )}
                {page === "terminal" && (
                  <>
                    <div className="content-eyebrow">
                      {say("POUR LES CURIEUX", "FOR THE CURIOUS")}
                    </div>
                    <h1 tabIndex={-1} className="view-heading page-title">
                      Hello, terminal.
                    </h1>
                    <p className="page-intro">
                      {say(
                        "Un autre chemin pour faire connaissance. Tapez help pour commencer.",
                        "Another way to get to know me. Type help to get started.",
                      )}
                    </p>
                    <div className="terminal-panel">
                      <div className="terminal-welcome">
                        Randry OS —{" "}
                        {say("terminal de découverte", "discovery terminal")}
                        <br />
                        <span>{terminalReply("help", lang)}</span>
                      </div>
                      <div
                        className="terminal-history"
                        role="log"
                        aria-label={say(
                          "Historique du terminal",
                          "Terminal history",
                        )}
                      >
                        {history.map((entry, index) => (
                          <div key={index}>
                            <div className="terminal-prompt">
                              randry ~ % <span>{entry.input}</span>
                            </div>
                            <pre>{entry.output}</pre>
                          </div>
                        ))}
                      </div>
                      <form
                        onSubmit={(event) => {
                          event.preventDefault();
                          if (!command.trim()) return;
                          if (command.trim().toLowerCase() === "clear")
                            setHistory([]);
                          else
                            setHistory((previous) => [
                              ...previous.slice(-39),
                              {
                                input: command,
                                output: terminalReply(command, lang),
                              },
                            ]);
                          setCommand("");
                        }}
                      >
                        <label htmlFor="terminal-command">randry ~ %</label>
                        <input
                          id="terminal-command"
                          value={command}
                          maxLength={200}
                          onChange={(event) => setCommand(event.target.value)}
                          autoComplete="off"
                          autoCapitalize="off"
                          spellCheck={false}
                          aria-label={say("Commande", "Command")}
                        />
                        <button
                          aria-label={say(
                            "Exécuter la commande",
                            "Run command",
                          )}
                        >
                          <Icon name="arrow" size={18} />
                        </button>
                      </form>
                    </div>
                    <div className="terminal-hints">
                      {["whoami", "stack", "projects", "contact"].map(
                        (item) => (
                          <button
                            key={item}
                            onClick={() => {
                              setCommand(item);
                              document
                                .getElementById("terminal-command")
                                ?.focus();
                            }}
                          >
                            {item}
                            <span>↵</span>
                          </button>
                        ),
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <nav
            className="ios-tabs"
            aria-label={say("Navigation de l’application", "App navigation")}
          >
            {(["home", "projects", "experience", "contact"] as Page[]).map(
              (item) => (
                <button
                  key={item}
                  onClick={() => navigate(item)}
                  aria-current={page === item ? "page" : undefined}
                >
                  <Icon name={item} size={22} />
                  <span>{appName(item)}</span>
                </button>
              ),
            )}
          </nav>
          <button
            className="ios-home-control"
            onClick={returnToMobileHome}
            aria-label={say(
              "Revenir à l’écran d’accueil",
              "Return to home screen",
            )}
          >
            <span />
          </button>
          <footer className="window-status">
            <span>
              <span className="status-dot" />
              {say(
                "Fait avec soin, à Madagascar",
                "Made with care, in Madagascar",
              )}
            </span>
            <button onClick={() => setMotion(!motion)} aria-pressed={motion}>
              <span className={motion ? "motion-dot enabled" : "motion-dot"} />
              {say("Effets 3D", "3D effects")} {motion ? "on" : "off"}
            </button>
            <span className="status-version">© 2026 · SR</span>
          </footer>
        </main>
      </div>
      <div className="dock-zone">
        <span className="desktop-hint">
          {say(
            "Un petit bureau. De grandes idées.",
            "A little desktop. Big ideas.",
          )}
        </span>
        <nav
          className="dock"
          aria-label={say("Applications du dock", "Dock applications")}
        >
          {(["home", "projects", "experience", "terminal"] as Page[]).map(
            (item) => (
              <button
                ref={item === "home" ? homeDock : undefined}
                key={item}
                className={`dock-item dock-${item} ${windowState !== "closed" && page === item ? "is-running" : ""}`}
                onClick={() => navigate(item)}
                aria-label={`${say("Ouvrir", "Open")} ${names[item]}`}
              >
                <span className="dock-tooltip">{names[item]}</span>
                <span className="dock-icon">
                  {item === "home" && android ? (
                    <Icon name="globe" size={31} />
                  ) : item === "home" ? (
                    <span className="finder-face">
                      <span />
                      <span />
                      <i />
                    </span>
                  ) : (
                    <Icon name={item} size={31} />
                  )}
                </span>
              </button>
            ),
          )}
          <span className="dock-divider" />
          <a
            className="dock-item dock-cv"
            href="/CV.pdf"
            target="_blank"
            rel="noreferrer"
            aria-label={say("Ouvrir le CV PDF", "Open PDF resume")}
          >
            <span className="dock-tooltip">{say("Mon CV", "My resume")}</span>
            <span className="dock-icon">
              <span className="pdf-sheet">
                PDF
                <span />
                <span />
              </span>
            </span>
          </a>
          <button
            className={`dock-item dock-contact ${windowState !== "closed" && page === "contact" ? "is-running" : ""}`}
            onClick={() => navigate("contact")}
            aria-label={say("Ouvrir Contact", "Open Contact")}
          >
            <span className="dock-tooltip">Contact</span>
            <span className="dock-icon">
              <Icon name="contact" size={33} />
            </span>
          </button>
          <a
            className="dock-item dock-github"
            href="https://github.com/sanrandry"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <span className="dock-tooltip">GitHub</span>
            <span className="dock-icon">
              <Icon name="github" size={31} />
            </span>
          </a>
        </nav>
      </div>
      {android && (
        <div className="chrome-system-controls">
          <button
            className="chrome-launcher"
            onClick={openSearch}
            aria-label={say(
              "Lanceur ChromeOS : rechercher une app ou un projet",
              "ChromeOS launcher: search apps or projects",
            )}
          >
            <Icon name="grid" size={23} />
          </button>
          <button
            className="chrome-preferences"
            onClick={() => settingsDialog.current?.showModal()}
            data-experience-trigger
          >
            <span className="sr-only">
              {say("Réglages ChromeOS", "ChromeOS settings")}{" "}
            </span>
            <span className="chrome-status-dot" aria-hidden="true" />
            <Clock lang={lang} compact />
            <Icon name="settings" size={19} />
          </button>
        </div>
      )}
      {storageUnavailable && (
        <p className="preference-notice" role="status">
          {say(
            "Choix appliqué pour cette visite. Stockage local indisponible.",
            "Choice applied for this visit. Local storage unavailable.",
          )}
        </p>
      )}
      <dialog
        className="experience-dialog"
        ref={experienceDialog}
        aria-labelledby="experience-title"
        aria-describedby="experience-description"
      >
        <header>
          <span className="experience-brand">
            r<span>.</span> <small>PORTFOLIO</small>
          </span>
          <div>
            <button
              className="experience-language"
              onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              aria-label={
                lang === "fr"
                  ? "FR — Switch to English"
                  : "EN — Passer en français"
              }
            >
              {lang.toUpperCase()}
            </button>
            <button
              className="experience-close"
              onClick={() => experienceDialog.current?.close()}
              aria-label={say(
                "Fermer, conserver le style actuel",
                "Close, keep current style",
              )}
            >
              ×
            </button>
          </div>
        </header>
        <span className="experience-eyebrow">
          {say("MÊME PERSONNE. DEUX UNIVERS.", "SAME PERSON. TWO WORLDS.")}
        </span>
        <h2 id="experience-title">
          {say("Plutôt iPhone", "More iPhone")}
          <br />
          {say("ou Android ?", "or Android?")}
        </h2>
        <p id="experience-description">
          {say(
            "Mon portfolio, dans votre univers. Choisissez l’interface qui vous ressemble.",
            "My portfolio, your world. Pick the interface that feels like home.",
          )}
        </p>
        <div className="experience-options">
          {(["apple", "google"] as const).map((option) => (
            <button
              key={option}
              className={`experience-option option-${option}`}
              onClick={() => chooseExperience(option)}
              aria-pressed={hasChosenExperience && experience === option}
            >
              <span className="experience-preview" aria-hidden="true">
                <span className="preview-window">
                  <i />
                  <i />
                  <i />
                  <span />
                </span>
                <span className="preview-phone">
                  <i />
                  <span />
                  <b />
                  <b />
                  <b />
                  <b />
                </span>
              </span>
              <span className="experience-option-title">
                {option === "apple" ? "iPhone" : "Android"}
                <Icon name="arrow" size={22} />
              </span>
              <span className="experience-option-subtitle">
                {option === "apple" ? "macOS + iOS" : "ChromeOS + Pixel"}
              </span>
              <span className="experience-option-copy">
                {option === "apple"
                  ? say(
                      "Familier. Soigné. Tout simplement.",
                      "Familiar. Refined. Effortless.",
                    )
                  : say(
                      "Expressif. Personnel. Tout vous.",
                      "Expressive. Personal. All you.",
                    )}
              </span>
              {hasChosenExperience && experience === option && (
                <span className="experience-current">
                  <Icon name="check" size={13} />
                  {say("Votre choix", "Your choice")}
                </span>
              )}
            </button>
          ))}
        </div>
        <p className="experience-footnote">
          {say(
            "Choix mémorisé sur ce navigateur. Modifiable à tout moment dans les réglages.",
            "Remembered in this browser. Change it anytime in settings.",
          )}
        </p>
      </dialog>
      <dialog
        className="ios-sheet ios-settings"
        ref={settingsDialog}
        aria-labelledby="ios-settings-title"
      >
        <div className="ios-sheet-handle" aria-hidden="true" />
        <header>
          <h2 id="ios-settings-title">{say("Réglages", "Settings")}</h2>
          <button onClick={() => settingsDialog.current?.close()}>
            {say("OK", "Done")}
          </button>
        </header>
        <p>{say("Un bureau à votre image.", "Make yourself at home.")}</p>
        <div className="ios-settings-group">
          <button onClick={openExperience} data-experience-trigger>
            <Icon name="grid" />
            <span>{say("Votre univers", "Your experience")}</span>
            <strong>
              {android ? "Android" : "iPhone"} <span aria-hidden="true">⇄</span>
            </strong>
          </button>
          <button onClick={() => setDark(!dark)} aria-pressed={dark}>
            <Icon name={dark ? "moon" : "sun"} />
            <span>{say("Mode sombre", "Dark mode")}</span>
            <span
              className={`ios-switch ${dark ? "is-on" : ""}`}
              aria-hidden="true"
            />
          </button>
          <button onClick={() => setLang(lang === "fr" ? "en" : "fr")}>
            <Icon name="globe" />
            <span>{say("Langue", "Language")}</span>
            <strong>
              {lang === "fr" ? "Français" : "English"}{" "}
              <span aria-hidden="true">⇄</span>
            </strong>
          </button>
          <button onClick={() => setMotion(!motion)} aria-pressed={motion}>
            <Icon name="code" />
            <span>{say("Animations 3D", "3D animations")}</span>
            <span
              className={`ios-switch ${motion ? "is-on" : ""}`}
              aria-hidden="true"
            />
          </button>
        </div>
        <p className="ios-settings-note">
          {say(
            "La préférence de mouvement réduit de votre appareil reste prioritaire.",
            "Your device’s reduced-motion preference always takes priority.",
          )}
        </p>
        <a className="ios-classic-link" href="/portfolio/">
          {say("Ouvrir le portfolio classique", "Open the classic portfolio")}
          <Icon name="external" size={17} />
        </a>
        <small>Randry OS · Portfolio 2026</small>
      </dialog>
      <dialog
        className="ios-sheet ios-spotlight"
        ref={searchDialog}
        aria-label={say("Rechercher dans le portfolio", "Search the portfolio")}
      >
        <div className="ios-search-field">
          <span aria-hidden="true">⌕</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            maxLength={80}
            placeholder={say("Application, projet…", "App, project…")}
            aria-label={say("Rechercher", "Search")}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          <button
            onClick={() => searchDialog.current?.close()}
            aria-label={say("Fermer la recherche", "Close search")}
          >
            ×
          </button>
        </div>
        <div className="ios-search-results">
          <p className="ios-result-count" role="status">
            {matchedApps.length + matchedProjects.length}{" "}
            {say("résultat(s)", "result(s)")}
          </p>
          {matchedApps.length > 0 && (
            <>
              <h2>{say("Applications", "Apps")}</h2>
              {matchedApps.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    searchDialog.current?.close();
                    navigate(item);
                  }}
                >
                  {mobileIcon(item)}
                  <span>{appName(item)}</span>
                  <span aria-hidden="true">↗</span>
                </button>
              ))}
            </>
          )}
          {matchedProjects.length > 0 && (
            <>
              <h2>{say("Projets", "Projects")}</h2>
              {matchedProjects.map((project) => (
                <button
                  key={project.index}
                  onClick={() => {
                    searchDialog.current?.close();
                    navigate("projects");
                    requestAnimationFrame(() => showProject(project.index));
                  }}
                >
                  <span className="ios-search-project-icon">
                    <Icon name="projects" />
                  </span>
                  <span>{project.title}</span>
                  <span aria-hidden="true">↗</span>
                </button>
              ))}
            </>
          )}
          {matchedApps.length + matchedProjects.length === 0 && (
            <p className="ios-search-empty">
              {say(
                "Aucun résultat. Essayez « projets » ou « Voakajy ».",
                "No results. Try “projects” or “Voakajy”.",
              )}
            </p>
          )}
        </div>
      </dialog>
      <dialog
        ref={dialog}
        className="project-dialog"
        aria-labelledby="project-dialog-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="project-dialog-content">
          <div className="dialog-top">
            <span>
              {say("NOTE DE PROJET", "PROJECT NOTE")} / 0{selected + 1}
            </span>
            <button
              onClick={() => dialog.current?.close()}
              aria-label={say(
                "Fermer le détail du projet",
                "Close project details",
              )}
            >
              ×
            </button>
          </div>
          <Icon name="projects" size={38} />
          <h2 id="project-dialog-title">{projects[selected].title}</h2>
          <p>{projects[selected].description}</p>
          <div className="project-tags">
            {projectTech[selected].map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
          <p className="project-disclaimer">
            {say(
              "Illustration conceptuelle. Détails techniques disponibles sur demande ; aucun lien public fourni pour ce projet.",
              "Concept illustration. Technical details available on request; no public link provided for this project.",
            )}
          </p>
          <a
            className="primary-button"
            href={`mailto:sinrandry@gmail.com?subject=${encodeURIComponent(projects[selected].title)}`}
          >
            {say("Parlons de ce projet", "Let's discuss this project")}
            <Icon name="arrow" size={17} />
          </a>
        </div>
      </dialog>
    </div>
  );
}
