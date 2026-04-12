"use client";

import { useReveal } from "@/hooks/useReveal";
import { useLanguage } from "@/context/LanguageContext";

const EASING = "cubic-bezier(0.645,0.045,0.355,1)";

const projectTags = [
  ["Vue.js", "Quasar", ".NET 6", "Blazor"],
  ["React", "Redux Toolkit", ".NET 5", "Keycloak"],
  ["Vue.js 2", "TypeGraphQL", "RabbitMQ", "Lerna"],
  ["TypeGraphQL", "Prisma", "Vue.js", "PostgreSQL"],
  ["React Native", "Nest.js", "Next.js", "MySQL"],
  ["Next.js", "Bootstrap", "Redux"],
];

interface CardProps {
  title: string;
  description: string;
  tags: string[];
  github: string;
  external: string;
  delay: number;
}

function ProjectCard({ title, description, tags, github, external, delay }: CardProps) {
  const reveal = useReveal(delay);

  return (
    <div
      ref={reveal.ref}
      style={{
        ...reveal.style,
        transition: `${reveal.style.transition}, box-shadow 250ms ${EASING}, transform 250ms ${EASING}`,
      }}
      className="bg-white border border-[#022558]/10 rounded-lg p-6 lg:p-7 flex flex-col min-h-[240px] lg:h-72 shadow-sm hover:shadow-md hover:-translate-y-1 cursor-pointer"
    >
      <div className="flex items-center justify-between mb-6">
        <svg className="text-[#1da8c7]" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
        <div className="flex gap-3">
          <a href={github} className="text-[#022558] hover:text-[#1da8c7]" aria-label="GitHub" style={{ transition: `color 250ms ${EASING}` }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </a>
          <a href={external} className="text-[#022558] hover:text-[#1da8c7]" aria-label="External link" style={{ transition: `color 250ms ${EASING}` }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-2 flex-1">
        <h4 className="text-[#022558] text-lg font-semibold leading-snug">{title}</h4>
        <p className="text-[#495670] text-sm leading-relaxed">{description}</p>
      </div>

      <div className="flex gap-4 pt-4 flex-wrap">
        {tags.map((tag) => (
          <span key={tag} className="text-[#495670] text-xs font-mono">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const heading = useReveal(0);

  return (
    <section className="px-6 py-16 md:px-12 lg:px-24 lg:py-24">
      <div ref={heading.ref} style={heading.style} className="flex flex-col items-center gap-2 mb-10 lg:mb-12">
        <h2 className="text-[#022558] text-2xl font-bold">{t.projects.sectionTitle}</h2>
        <a
          href="#"
          className="text-[#1da8c7] text-sm font-mono hover:underline"
          style={{ transition: `color 250ms ${EASING}` }}
        >
          {t.projects.archiveLink}
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {t.projects.items.map((project, i) => (
          <ProjectCard
            key={i}
            title={project.title}
            description={project.description}
            tags={projectTags[i]}
            github="#"
            external="#"
            delay={i * 100}
          />
        ))}
      </div>
    </section>
  );
}
