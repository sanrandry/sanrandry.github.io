import type { PortfolioContent } from "../content";
import type { PortfolioSession } from "../hooks/usePortfolioSession";
import { Icon } from "../ui/Icon";
import { normalizeSearch } from "../model";
import { MobileAppIcon } from "../ui/MobileAppIcon";
export function SearchDialog({
  content,
  session,
}: {
  content: PortfolioContent;
  session: PortfolioSession;
}) {
  const { say, appName } = content;
  const { closeOverlay, query, setQuery, navigate, showProject } = session;
  const { searchDialog } = session.refs;
  const android = session.experience === "google";
  const { mobileApps, projects } = content;
  const matchedApps = mobileApps.filter((item) =>
    normalizeSearch(appName(item)).includes(normalizeSearch(query)),
  );
  const matchedProjects = projects
    .map((project, index) => ({ ...project, index }))
    .filter((project) =>
      normalizeSearch(project.title).includes(normalizeSearch(query)),
    );

  return (
    <dialog
      onCancel={(event) => {
        event.preventDefault();
        closeOverlay();
      }}
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
          onClick={closeOverlay}
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
              <button key={item} onClick={() => navigate(item)}>
                <MobileAppIcon item={item} android={android} />
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
                onClick={() => showProject(project.index)}
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
  );
}
