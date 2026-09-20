import type { PortfolioContent } from "../content";
import type { PortfolioSession } from "../hooks/usePortfolioSession";
import { Icon } from "../ui/Icon";
import type { Appearance } from "../hooks/useAppearance";
import type { Fullscreen } from "../hooks/useFullscreen";
import type { DesktopWindow } from "../hooks/useDesktopWindow";
import { Clock } from "../ui/Clock";
import { PowerButton } from "../ui/FullscreenControls";
export function DesktopMenu({
  content,
  session,
  appearance,
  fullscreen,
  desktopWindow,
}: {
  content: PortfolioContent;
  session: PortfolioSession;
  appearance: Appearance;
  fullscreen: Fullscreen;
  desktopWindow: DesktopWindow;
}) {
  const { say, lang, names } = content;
  const { navigate, openExperience } = session;
  const { menu } = session.refs;
  const { dark, setDark, motion, setMotion, setLang } = appearance;
  const android = session.experience === "google";
  return (
    <>
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
                desktopWindow.resetWindow();
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
          <PowerButton content={content} fullscreen={fullscreen} />
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
    </>
  );
}
