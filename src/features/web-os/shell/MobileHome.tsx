import type { PortfolioContent } from "../content";
import type { PortfolioSession } from "../hooks/usePortfolioSession";
import { Icon } from "../ui/Icon";
import type { Fullscreen } from "../hooks/useFullscreen";
import Image from "next/image";
import { Clock } from "../ui/Clock";
import { MobileAppIcon } from "../ui/MobileAppIcon";
import { FullscreenHint } from "../ui/FullscreenControls";
export function MobileHome({
  content,
  session,
  fullscreen,
}: {
  content: PortfolioContent;
  session: PortfolioSession;
  fullscreen: Fullscreen;
}) {
  const { say, lang, appName, mobileApps, t } = content;
  const { navigate, openSearch, openSettings } = session;
  const { mobileHome } = session.refs;
  const android = session.experience === "google";
  return (
    <>
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
                <MobileAppIcon item={item} android={android} />
                <span>{appName(item)}</span>
              </button>
            ))}
            <a
              className="ios-launch-app"
              href="/CV.pdf"
              target="_blank"
              rel="noreferrer"
            >
              <MobileAppIcon item={"cv"} android={android} />
              <span>{say("Mon CV", "Resume")}</span>
            </a>
            <button className="ios-launch-app" onClick={openSettings}>
              <MobileAppIcon item={"settings"} android={android} />
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
          <FullscreenHint content={content} fullscreen={fullscreen} />
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
              <MobileAppIcon item={"home"} android={android} />
            </button>
            <button onClick={() => navigate("contact")} aria-label="Contact">
              <MobileAppIcon item={"contact"} android={android} />
            </button>
            <a
              href="https://github.com/sanrandry"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <MobileAppIcon item={"github"} android={android} />
            </a>
            <a
              href="https://www.linkedin.com/in/randry-santatraina-sitraka-131415168/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <MobileAppIcon item={"linkedin"} android={android} />
            </a>
          </nav>
          <span className="ios-launcher-indicator" aria-hidden="true" />
        </div>
      </main>
    </>
  );
}
