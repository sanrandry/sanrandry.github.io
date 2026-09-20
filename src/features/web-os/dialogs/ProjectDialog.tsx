import type { PortfolioContent } from "../content";
import type { PortfolioSession } from "../hooks/usePortfolioSession";
import { Icon } from "../ui/Icon";
import { projectTech } from "../content";
export function ProjectDialog({
  content,
  session,
}: {
  content: PortfolioContent;
  session: PortfolioSession;
}) {
  const { say, projects } = content;
  const { closeOverlay } = session;
  const { projectDialog } = session.refs;
  const selected = session.view.project;
  return (
    <dialog
      onCancel={(event) => {
        event.preventDefault();
        closeOverlay();
      }}
      ref={projectDialog}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) closeOverlay();
      }}
    >
      <div className="project-dialog-content">
        <div className="dialog-top mb-5 flex items-center justify-between">
          <span>
            {say("NOTE DE PROJET", "PROJECT NOTE")} / 0{selected + 1}
          </span>
          <button
            className="grid size-8 place-items-center rounded-[50%]"
            onClick={closeOverlay}
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
        <div className="project-tags my-[22px] flex flex-wrap gap-[7px]">
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
  );
}
