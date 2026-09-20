import type { PortfolioContent } from "../content";
import type { PortfolioSession } from "../hooks/usePortfolioSession";
import { Icon } from "../ui/Icon";
import type { Page } from "../model";
import type { Fullscreen } from "../hooks/useFullscreen";
import { Clock } from "../ui/Clock";
import { PowerButton } from "../ui/FullscreenControls";
export function DesktopDock({
  content,
  session,
  fullscreen,
}: {
  content: PortfolioContent;
  session: PortfolioSession;
  fullscreen: Fullscreen;
}) {
  const { say, lang, names } = content;
  const { navigate, openSearch, openSettings, windowState } = session;
  const { page } = session.view;
  const { homeDock } = session.refs;
  const android = session.experience === "google";
  return (
    <>
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
          <PowerButton content={content} fullscreen={fullscreen} />
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
            onClick={openSettings}
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
    </>
  );
}
