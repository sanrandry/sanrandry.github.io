"use client";

import { getPortfolioContent } from "./content";
import { useAppearance } from "./hooks/useAppearance";
import { usePortfolioSession } from "./hooks/usePortfolioSession";
import { useDesktopWindow } from "./hooks/useDesktopWindow";
import { useFullscreen } from "./hooks/useFullscreen";
import { DesktopMenu } from "./shell/DesktopMenu";
import { MobileHome } from "./shell/MobileHome";
import { PortfolioWindow } from "./shell/PortfolioWindow";
import { DesktopDock } from "./shell/DesktopDock";
import { PortfolioViews } from "./views/PortfolioViews";
import { ExperienceDialog } from "./dialogs/ExperienceDialog";
import { SettingsDialog } from "./dialogs/SettingsDialog";
import { SearchDialog } from "./dialogs/SearchDialog";
import { ProjectDialog } from "./dialogs/ProjectDialog";
import "./styles/index.scss";

export default function WebOSPortfolio() {
  const appearance = useAppearance();
  const { lang, dark, motion } = appearance;
  const content = getPortfolioContent(lang);
  const { say } = content;
  const desktopWindow = useDesktopWindow();
  const session = usePortfolioSession(
    content.projects.length,
    desktopWindow.resetWindow,
  );
  const { view, navigate, preferenceReady, storageUnavailable } = session;
  const { page, appOpen: mobileAppOpen } = view;
  const android = session.experience === "google";
  const fullscreen = useFullscreen();
  const { fullscreenFailed } = fullscreen;
  return (
    <div
      className={`desktop ${preferenceReady ? "" : "preference-loading"} ${android ? "ecosystem-google" : "ecosystem-apple"} ${dark ? "theme-dark" : ""} ${motion ? "" : "motion-off"} ${mobileAppOpen ? "mobile-app-open" : ""}`}
      lang={lang}
      onClickCapture={fullscreen.onNavigationClick}
    >
      <noscript>
        <style>{".desktop.preference-loading { visibility: visible; }"}</style>
      </noscript>
      <a
        className="desktop-skip"
        href="#portfolio-content"
        onClick={(event) => {
          event.preventDefault();
          navigate(page);
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

      <MobileHome content={content} session={session} fullscreen={fullscreen} />
      <DesktopMenu
        content={content}
        session={session}
        appearance={appearance}
        fullscreen={fullscreen}
        desktopWindow={desktopWindow}
      />
      <PortfolioWindow
        content={content}
        session={session}
        appearance={appearance}
        desktopWindow={desktopWindow}
      >
        <PortfolioViews
          content={content}
          page={page}
          motion={motion}
          navigate={navigate}
          showProject={session.showProject}
        />
      </PortfolioWindow>
      <DesktopDock
        content={content}
        session={session}
        fullscreen={fullscreen}
      />
      {storageUnavailable && (
        <p className="preference-notice" role="status">
          {say(
            "Choix appliqué pour cette visite. Stockage local indisponible.",
            "Choice applied for this visit. Local storage unavailable.",
          )}
        </p>
      )}
      {fullscreenFailed && (
        <p className="desktop-fullscreen-error preference-notice" role="status">
          {say(
            "Plein écran indisponible pour cette action. Utilisez les commandes de votre navigateur.",
            "Fullscreen is unavailable for this action. Use your browser controls.",
          )}
        </p>
      )}

      <ExperienceDialog
        content={content}
        session={session}
        appearance={appearance}
        fullscreen={fullscreen}
      />
      <SettingsDialog
        content={content}
        session={session}
        appearance={appearance}
        fullscreen={fullscreen}
      />
      <SearchDialog content={content} session={session} />
      <ProjectDialog content={content} session={session} />
    </div>
  );
}
