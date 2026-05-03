"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { useLanguage } from "@/context/LanguageContext";

const EASING = "cubic-bezier(0.645,0.045,0.355,1)";

const jobTech = [
  ["Nuxt.js", "Pinia", "Express.js", "Strapi", "Docker", "PostgreSQL"],
  ["Vue.js", "Nuxt.js", "Quasar", ".NET 6", "Blazor", "React", "Redux Toolkit", "Microservices", "gRPC", "PostgreSQL", "Keycloak"],
  ["Vue.js 2", "TypeScript", "Express.js", "TypeGraphQL", "Typegoose", "RabbitMQ", "Lerna"],
  ["Angular 16", "TypeGraphQL", "MongoDB"],
  ["Nest.js", "Prisma", "Microservices", "Next.js", "MongoDB", "PostgreSQL"],
];

export default function Experience() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const jobs = t.experience.jobs;
  const job = jobs[active];
  const tech = jobTech[active];
  const heading = useReveal(0);
  const content = useReveal(100);

  return (
    <section id="experience" className="px-6 py-16 md:px-12 lg:px-[203px] lg:py-24">
      <div ref={heading.revealRef} style={heading.revealStyle} className="flex items-center gap-3 mb-10 lg:mb-16">
        <span className="text-[#022558] text-2xl lg:text-3xl font-bold">{t.experience.sectionNum}</span>
        <h2 className="text-[#022558] text-2xl lg:text-3xl font-bold whitespace-nowrap">{t.experience.sectionTitle}</h2>
        <div className="flex-1 h-px bg-[#022558]/20 ml-3" />
      </div>

      <div ref={content.revealRef} style={content.revealStyle} className="flex flex-col lg:flex-row gap-0 lg:gap-10">

        {/* Mobile: horizontal scrollable tabs */}
        <div className="lg:hidden flex overflow-x-auto border-b border-[#022558]/20 mb-6 -mx-6 px-6 scrollbar-hide">
          {jobs.map((j, i) => (
            <button
              key={j.company}
              onClick={() => setActive(i)}
              className="shrink-0 px-5 py-3 text-sm font-mono whitespace-nowrap border-b-2"
              style={{
                color: active === i ? "#1da8c7" : "#495670",
                borderBottomColor: active === i ? "#1da8c7" : "transparent",
                marginBottom: "-2px",
                backgroundColor: "transparent",
                transition: `all 250ms ${EASING}`,
              }}
            >
              {j.company}
            </button>
          ))}
        </div>

        {/* Desktop: vertical tab list */}
        <div className="hidden lg:flex flex-col border-l-2 border-[#022558]/20 shrink-0">
          {jobs.map((j, i) => (
            <button
              key={j.company}
              onClick={() => setActive(i)}
              className="text-left px-8 py-4 text-sm font-mono whitespace-nowrap"
              style={{
                color: active === i ? "#1da8c7" : "#495670",
                borderLeft: active === i ? "2px solid #1da8c7" : "2px solid transparent",
                marginLeft: "-2px",
                backgroundColor: active === i ? "rgba(29,168,199,0.05)" : "transparent",
                transition: `all 250ms ${EASING}`,
              }}
            >
              {j.company}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 py-1 flex-1">
          <div>
            <h3 className="text-[#022558] text-lg lg:text-xl font-semibold leading-snug">
              {job.role}{" "}
              <span className="text-[#1da8c7]">@ {job.company}</span>
            </h3>
            <p className="text-[#495670] text-sm font-mono mt-1">{job.period}</p>
          </div>
          <ul className="space-y-3">
            {job.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 text-[#495670] text-sm lg:text-base leading-relaxed">
                <span className="text-[#1da8c7] mt-1 shrink-0 text-xs">▹</span>
                {b}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 mt-2">
            {tech.map((tag) => (
              <span key={tag} className="text-[#1da8c7] text-xs font-mono bg-[#1da8c7]/10 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
