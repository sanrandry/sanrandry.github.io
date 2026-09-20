import type { PortfolioContent } from "../content";
import { Icon } from "../ui/Icon";
import { projectTech } from "../content";
import { ProjectCard } from "./ProjectCard";
export function ProjectsView({
  content,
  showProject,
}: {
  content: PortfolioContent;
  showProject: (index: number) => void;
}) {
  const { say, projects } = content;
  return (
    <>
      <div className="content-eyebrow">
        {say("SÉLECTION & EXPLORATIONS", "SELECTED WORK & EXPLORATIONS")}
        <span>08 {say("PROJETS", "PROJECTS")}</span>
      </div>
      <h1 tabIndex={-1} className="view-heading page-title">
        {say("Des idées. Du concret.", "Ideas, made real.")}
      </h1>
      <p className="page-intro">
        {say(
          "De l’observation de la Terre aux outils métier. Des projets variés, une même exigence.",
          "From Earth observation to business tools. Different challenges, the same attention to detail.",
        )}
      </p>
      <div className="featured-grid grid grid-cols-2 gap-[18px]">
        <ProjectCard index={0} content={content} showProject={showProject} />
        <ProjectCard index={1} content={content} showProject={showProject} />
      </div>
      <div className="project-list mt-[25px] mb-[35px]">
        {projects.slice(2).map((project, index) => (
          <button
            className="flex w-full items-center gap-[18px] px-2 py-[19px] text-left"
            key={project.title}
            onClick={() => showProject(index + 2)}
          >
            <span className="project-number">0{index + 3}</span>
            <span>
              <strong>{project.title}</strong>
              <small>{projectTech[index + 2].join(" · ")}</small>
            </span>
            <Icon name="arrow" size={18} />
          </button>
        ))}
      </div>
    </>
  );
}
