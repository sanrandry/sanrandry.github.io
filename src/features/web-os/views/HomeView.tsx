import type { PortfolioContent } from "../content";
import { Icon } from "../ui/Icon";
import type { Page } from "../model";
import { Sculpture } from "../ui/Sculpture";
import { ProjectCard } from "./ProjectCard";
export function HomeView({
  content,
  motion,
  navigate,
  showProject,
}: {
  content: PortfolioContent;
  motion: boolean;
  navigate: (page: Page) => void;
  showProject: (index: number) => void;
}) {
  const { say, lang } = content;
  return (
    <>
      <div className="content-eyebrow">
        <span>
          <span className="small-spark">✳</span>{" "}
          {say("BIENVENUE DANS MON UNIVERS", "WELCOME TO MY CORNER OF THE WEB")}
        </span>
        <span className="edition-label">PORTFOLIO / 2026</span>
      </div>
      <section className="hero-section">
        <div className="hero-copy">
          <span className="hello-label">
            {say("Bonjour, moi c’est Santatraina.", "Hi, I'm Santatraina.")}{" "}
            <span className="hello-wave">✌</span>
          </span>
          <h1 tabIndex={-1} className="view-heading">
            {say("Du code.", "Thoughtful code.")}
            <br />
            <span>{say("Du sens.", "Real impact.")}</span>
          </h1>
          <p>
            {say(
              "Développeur fullstack, je transforme vos idées en expériences web soignées, solides et utiles.",
              "Fullstack developer turning your ideas into thoughtful, reliable web experiences that make a difference.",
            )}
          </p>
          <div className="hero-actions">
            <button
              className="primary-button"
              onClick={() => navigate("projects")}
            >
              {say("Explorer mes projets", "Explore my projects")}
              <Icon name="arrow" size={17} />
            </button>
            <button className="text-button" onClick={() => navigate("contact")}>
              {say("Parlons de votre idée", "Let's talk about your idea")}
              <span>↗</span>
            </button>
          </div>
        </div>
        <Sculpture motion={motion} lang={lang} />
      </section>
      <div className="stack-strip flex items-center gap-[22px]">
        <span>{say("MES OUTILS AU QUOTIDIEN", "MY EVERYDAY TOOLKIT")}</span>
        <div className="flex flex-1 items-center justify-between gap-3">
          <b>
            Vue<span>.js</span>
          </b>
          <b>React</b>
          <b>
            Next<span>.js</span>
          </b>
          <b>
            Node<span>.js</span>
          </b>
          <b>TypeScript</b>
          <b>Docker</b>
        </div>
      </div>
      <section className="featured-section pt-5">
        <div className="section-label mb-4 flex items-center justify-between gap-3">
          <h2>{say("Une sélection de projets", "A selection of my work")}</h2>
          <button className="text-button" onClick={() => navigate("projects")}>
            {say("Tout explorer", "View all work")}
            <Icon name="arrow" size={15} />
          </button>
        </div>
        <div className="featured-grid grid grid-cols-2 gap-[18px]">
          <ProjectCard index={0} content={content} showProject={showProject} />
          <ProjectCard index={1} content={content} showProject={showProject} />
        </div>
      </section>
      <footer className="content-footer">
        <span>
          <i />
          {say(
            "Du premier pixel à la mise en production.",
            "From the first pixel to production.",
          )}
        </span>
        <button onClick={() => navigate("about")}>
          {say("Un peu plus sur moi", "A little more about me")} ↗
        </button>
      </footer>
    </>
  );
}
