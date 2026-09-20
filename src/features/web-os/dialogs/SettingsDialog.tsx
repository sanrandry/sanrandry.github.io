import type { PortfolioContent } from "../content";
import type { PortfolioSession } from "../hooks/usePortfolioSession";
import { Icon } from "../ui/Icon";
import type { Appearance } from "../hooks/useAppearance";
import type { Fullscreen } from "../hooks/useFullscreen";
import { FullscreenHint } from "../ui/FullscreenControls";
export function SettingsDialog({
  content,
  session,
  appearance,
  fullscreen,
}: {
  content: PortfolioContent;
  session: PortfolioSession;
  appearance: Appearance;
  fullscreen: Fullscreen;
}) {
  const { say, lang } = content;
  const { closeOverlay, openExperience } = session;
  const { settingsDialog } = session.refs;
  const { setLang, dark, setDark, motion, setMotion } = appearance;
  const android = session.experience === "google";
  const { screenMode, toggleFullscreen } = fullscreen;
  return (
    <dialog
      onCancel={(event) => {
        event.preventDefault();
        closeOverlay();
      }}
      className="ios-sheet ios-settings"
      ref={settingsDialog}
      aria-labelledby="ios-settings-title"
    >
      <div className="ios-sheet-handle" aria-hidden="true" />
      <header>
        <h2 id="ios-settings-title">{say("Réglages", "Settings")}</h2>
        <button onClick={closeOverlay}>{say("OK", "Done")}</button>
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
        <button
          className="fullscreen-control"
          onClick={toggleFullscreen}
          disabled={screenMode === "standalone" || screenMode === "unsupported"}
          aria-pressed={
            screenMode === "fullscreen" || screenMode === "standalone"
          }
        >
          <Icon name="external" />
          <span>{say("Plein écran", "Fullscreen")}</span>
          <span
            className={`ios-switch ${screenMode === "fullscreen" || screenMode === "standalone" ? "is-on" : ""}`}
            aria-hidden="true"
          />
        </button>
      </div>
      <FullscreenHint content={content} fullscreen={fullscreen} />
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
  );
}
