import type { PortfolioContent } from "../content";
import { Icon } from "../ui/Icon";
export function AboutView({ content }: { content: PortfolioContent }) {
  const { say, t } = content;
  return (
    <>
      <div className="content-eyebrow">
        {say("DERRIÈRE LE CODE", "BEHIND THE CODE")}
      </div>
      <h1 tabIndex={-1} className="view-heading page-title">
        {say("Enchanté, Santatraina.", "Nice to meet you. I'm Santatraina.")}
      </h1>
      <div className="about-grid grid [align-items:start] gap-[35px]">
        <div>
          <p className="page-intro">{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <p>{t.about.p3}</p>
        </div>
        <div className="about-monogram flex h-[233px] flex-col items-center justify-center gap-[27px] rounded-lg">
          <span>
            SR<span>.</span>
          </span>
          <small>
            ANTANANARIVO
            <br />
            18.8792° S · 47.5079° E
          </small>
        </div>
      </div>
      <div className="stats-grid mt-[22px] mb-[35px] grid grid-cols-[repeat(3,1fr)]">
        {t.stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-2 py-[23px]">
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
      <h2 className="subheading">
        {say("Une stack, de bout en bout.", "A stack, end to end.")}
      </h2>
      <div className="skills-grid grid grid-cols-[repeat(3,1fr)] gap-5">
        {[
          ["Frontend", "Vue.js · Nuxt.js · React · Next.js · TypeScript"],
          ["Backend", "Node.js · Nest.js · .NET · gRPC · GraphQL"],
          [
            say("Données & livraison", "Data & delivery"),
            "PostgreSQL · MongoDB · Prisma · Docker",
          ],
        ].map(([title, stack]) => (
          <div key={title}>
            <Icon name="code" />
            <h3>{title}</h3>
            <p>{stack}</p>
          </div>
        ))}
      </div>
      <a
        className="primary-button resume-button mt-[25px] mb-[35px]"
        href="/CV.pdf"
        target="_blank"
        rel="noreferrer"
      >
        {say("Consulter mon CV", "View my resume")}
        <Icon name="download" size={17} />
      </a>
    </>
  );
}
