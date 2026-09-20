import type { PortfolioContent } from "../content";
import type { PortfolioSession } from "../hooks/usePortfolioSession";
import { Icon } from "../ui/Icon";
import type { Appearance } from "../hooks/useAppearance";
import type { Page } from "../model";
import type { DesktopWindow } from "../hooks/useDesktopWindow";
import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
export function PortfolioWindow({
  content,
  session,
  appearance,
  desktopWindow,
  children,
}: {
  content: PortfolioContent;
  session: PortfolioSession;
  appearance: Appearance;
  desktopWindow: DesktopWindow;
  children: ReactNode;
}) {
  const { say, names, appName } = content;
  const {
    navigate,
    returnToMobileHome,
    hideWindow,
    openSettings,
    windowState,
  } = session;
  const { page } = session.view;
  const { motion, setMotion } = appearance;
  const {
    maximized,
    position,
    startDrag,
    moveWindow,
    stopDrag,
    toggleMaximized,
  } = desktopWindow;
  const android = session.experience === "google";
  return (
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
          onPointerUp={stopDrag}
          onPointerCancel={stopDrag}
          onLostPointerCapture={stopDrag}
          onDoubleClick={(event) => {
            if (
              !window.matchMedia(
                "(max-width: 767px), (max-width: 1024px) and (max-height: 500px) and (pointer: coarse)",
              ).matches &&
              !(event.target as HTMLElement).closest("button,a")
            ) {
              toggleMaximized();
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
            onClick={openSettings}
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
                toggleMaximized();
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
                ["home", "projects", "experience", "about", "contact"] as Page[]
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
            ref={session.refs.content}
            id="portfolio-content"
            tabIndex={-1}
          >
            {children}
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
  );
}
