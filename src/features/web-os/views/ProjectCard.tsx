import type { PortfolioContent } from "../content";
import { Icon } from "../ui/Icon";
export function ProjectCard({
  index,
  content,
  showProject,
}: {
  index: number;
  content: PortfolioContent;
  showProject: (index: number) => void;
}) {
  const { projects, say } = content;
  const project = projects[index];
  return (
    <button
      className="project-card w-full overflow-hidden rounded-lg text-left"
      onClick={() => showProject(index)}
    >
      <span
        className={`project-visual relative block overflow-hidden visual-${index % 2}`}
        aria-hidden="true"
      >
        {index === 0 ? (
          <>
            <span className="planet" />
            <span className="planet-orbit" />
            <span className="project-art-label">
              EARTH INTELLIGENCE <span>↗</span>
            </span>
          </>
        ) : (
          <>
            <span className="mini-dashboard">
              <span className="mini-sidebar" />
              <span className="mini-chart">
                <i />
                <i />
                <i />
                <i />
                <i />
              </span>
              <span className="mini-row" />
            </span>
            <span className="project-art-label">
              VOAKAJY <span>✳</span>
            </span>
          </>
        )}
      </span>
      <span className="project-card-info">
        <span>
          <strong>{project.title}</strong>
          <small>
            {index === 0
              ? say(
                  "Observation de la Terre · Microservices",
                  "Earth observation · Microservices",
                )
              : say(
                  "Gestion RH · Plateforme métier",
                  "HR management · Business platform",
                )}
          </small>
        </span>
        <Icon name="external" size={17} />
      </span>
    </button>
  );
}
