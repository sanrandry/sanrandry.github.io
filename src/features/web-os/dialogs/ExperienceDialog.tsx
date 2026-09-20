import type { PortfolioContent } from "../content";
import type { PortfolioSession } from "../hooks/usePortfolioSession";
import { Icon } from "../ui/Icon";
import type { Appearance } from "../hooks/useAppearance";
import type { Fullscreen } from "../hooks/useFullscreen";
import { FullscreenHint } from "../ui/FullscreenControls";
export function ExperienceDialog({
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
  const { closeOverlay, chooseExperience, experience, hasChosenExperience } =
    session;
  const { experienceDialog } = session.refs;
  const { setLang } = appearance;
  return (
    <dialog
      onCancel={(event) => {
        event.preventDefault();
        closeOverlay();
      }}
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
            onClick={closeOverlay}
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
      <FullscreenHint content={content} fullscreen={fullscreen} />
    </dialog>
  );
}
