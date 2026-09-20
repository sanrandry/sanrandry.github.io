import type { PortfolioContent } from "../content";
export function ExperienceView({ content }: { content: PortfolioContent }) {
  const { say, t } = content;
  return (
    <>
      <div className="content-eyebrow">{say("LE PARCOURS", "THE JOURNEY")}</div>
      <h1 tabIndex={-1} className="view-heading page-title">
        {say(
          "Toujours construire. Toujours apprendre.",
          "Always building. Always learning.",
        )}
      </h1>
      <p className="page-intro">
        {say(
          "Plus de 6 ans à relier besoins métier et solutions techniques.",
          "Over 6 years connecting business needs with technical solutions.",
        )}
      </p>
      <div className="experience-list mt-8 mb-10 ml-[5px]">
        {t.experience.jobs.map((job, index) => (
          <article key={job.company} className="relative pb-[35px] pl-[25px]">
            <span className="timeline-dot" />
            <div className="job-meta flex justify-between">
              <span>{job.period}</span>
              <span>0{index + 1}</span>
            </div>
            <h2>{job.company}</h2>
            <h3>{job.role}</h3>
            <ul>
              {job.bullets.map((bullet) => (
                <li key={bullet} className="py-[3px]">
                  {bullet}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </>
  );
}
