import type { PortfolioContent } from "../content";
import type { Fullscreen } from "../hooks/useFullscreen";
import { Icon } from "./Icon";
export function PowerButton({
  content,
  fullscreen,
}: {
  content: PortfolioContent;
  fullscreen: Fullscreen;
}) {
  const { say } = content;
  const { screenMode, toggleFullscreen } = fullscreen;
  return (
    <button
      className="desktop-power"
      onClick={toggleFullscreen}
      disabled={screenMode === "standalone" || screenMode === "unsupported"}
      aria-pressed={screenMode === "fullscreen"}
      aria-label={
        screenMode === "fullscreen"
          ? say(
              "Éteindre — quitter le plein écran",
              "Power off — exit fullscreen",
            )
          : say("Activer le plein écran", "Enter fullscreen")
      }
      title={
        screenMode === "standalone" || screenMode === "unsupported"
          ? say(
              "Utilisez les commandes de l’application ou du navigateur pour changer ce mode.",
              "Use the app or browser controls to change this mode.",
            )
          : screenMode === "fullscreen"
            ? say(
                "Quitter le plein écran sans fermer le portfolio. Échap fonctionne aussi.",
                "Exit fullscreen without closing the portfolio. Escape works too.",
              )
            : say("Activer le plein écran", "Enter fullscreen")
      }
    >
      <Icon
        name={screenMode === "fullscreen" ? "power" : "external"}
        size={16}
      />
      <span>
        {screenMode === "fullscreen"
          ? say("Éteindre", "Power off")
          : say("Plein écran", "Fullscreen")}
      </span>
    </button>
  );
}

export function FullscreenHint({
  content,
  fullscreen,
}: {
  content: PortfolioContent;
  fullscreen: Fullscreen;
}) {
  const { say } = content;
  const { screenMode, fullscreenFailed } = fullscreen;
  return (
    screenMode !== "fullscreen" &&
    screenMode !== "standalone" && (
      <p
        className="mobile-fullscreen-note"
        role={fullscreenFailed ? "status" : undefined}
      >
        <span className="fullscreen-mobile-copy">
          {screenMode === "unsupported" || fullscreenFailed
            ? say(
                "Pour ouvrir sans barre navigateur : menu Partager → Sur l’écran d’accueil (iPhone), ou menu du navigateur → Ajouter à l’écran d’accueil (Android), puis ouvrez cette icône.",
                "To open without browser bars: Share → Add to Home Screen (iPhone), or browser menu → Add to Home Screen (Android), then launch that icon.",
              )
            : say(
                "Plein écran au premier toucher de la visite, puis depuis les réglages.",
                "Fullscreen on the visit’s first tap, then available in settings.",
              )}
        </span>
        <span className="fullscreen-desktop-copy">
          {screenMode === "unsupported" || fullscreenFailed
            ? say(
                "Plein écran indisponible pour cette action. Utilisez les commandes de votre navigateur.",
                "Fullscreen is unavailable for this action. Use your browser controls.",
              )
            : say(
                "Plein écran au premier clic de navigation. Éteindre ou Échap pour en sortir.",
                "Fullscreen on your first navigation click. Power off or Escape to exit.",
              )}
        </span>
      </p>
    )
  );
}
