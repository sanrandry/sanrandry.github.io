"use client";

import { useReveal } from "@/hooks/useReveal";

const imgProject1 = "/images/project1.png";
const imgProject2 = "/images/project2.png";

const EASING = "cubic-bezier(0.645,0.045,0.355,1)";

interface FeaturedProjectProps {
  title: string;
  label: string;
  description: string;
  tags: string[];
  image: string;
  links?: { github?: string; external?: string };
  reverse?: boolean;
}

function FeaturedProject({ title, label, description, tags, image, links, reverse = false }: FeaturedProjectProps) {
  const reveal = useReveal(0);

  return (
    <div ref={reveal.ref} style={reveal.style} className={`relative flex items-center ${reverse ? "flex-row-reverse" : "flex-row"}`}>
      {/* Image */}
      <a
        href={links?.external || "#"}
        target="_blank"
        rel="noreferrer"
        className="w-[55%] rounded-lg overflow-hidden relative shrink-0 group block"
        style={{ aspectRatio: "3/2" }}
      >
        <img src={image} alt={title} className="w-full h-full object-cover rounded-lg" />
        <div
          className="absolute inset-0 bg-[#1da8c7]/50 group-hover:bg-transparent rounded-lg"
          style={{ transition: `background-color 250ms ${EASING}` }}
        />
      </a>

      {/* Text card */}
      <div
        className={`absolute z-10 flex flex-col gap-3 w-[52%] ${reverse ? "left-0 items-start text-left" : "right-0 items-end text-right"}`}
      >
        <span className="text-[#1da8c7] text-sm font-mono">{label}</span>
        <h3 className="text-[#022558] text-2xl font-bold">
          <a href={links?.external || "#"} className="hover:text-[#1da8c7]" style={{ transition: `color 250ms ${EASING}` }}>
            {title}
          </a>
        </h3>
        <div className="bg-white shadow-lg rounded px-7 py-5 w-full">
          <p className="text-[#495670] text-base leading-relaxed">{description}</p>
        </div>
        <ul className={`flex gap-4 flex-wrap mt-2 font-mono text-xs text-[#022558] ${reverse ? "" : "justify-end"}`}>
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        {links && (
          <div className={`flex gap-4 mt-1 ${reverse ? "" : "justify-end"}`}>
            {links.github && (
              <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-[#022558] hover:text-[#1da8c7]" style={{ transition: `color 250ms ${EASING}` }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
            )}
            {links.external && (
              <a href={links.external} target="_blank" rel="noreferrer" aria-label="External link" className="text-[#022558] hover:text-[#1da8c7]" style={{ transition: `color 250ms ${EASING}` }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Work() {
  const heading = useReveal(0);

  return (
    <section id="work" className="px-[203px] py-24">
      {/* Section heading */}
      <div ref={heading.ref} style={heading.style} className="flex items-center gap-3 mb-24">
        <span className="text-[#022558] text-3xl font-bold">3.</span>
        <h2 className="text-[#022558] text-3xl font-bold whitespace-nowrap">Some things I&apos;ve Built</h2>
        <div className="flex-1 h-px bg-[#022558]/20 ml-3" />
      </div>

      <div className="flex flex-col gap-32">
        <FeaturedProject
          label="Featured Project"
          title="Halcyon Theme"
          description="A minimal, dark blue theme for VS Code, Sublime Text, Atom, iTerm, and more. Available on Visual Studio Marketplace, Package Control, Atom Package Manager, and npm."
          tags={["VS Code", "Sublime Text", "Atom", "iTerm"]}
          image={imgProject1}
          links={{ github: "#", external: "#" }}
        />
        <FeaturedProject
          label="Featured Project"
          title="Halcyon Theme"
          description="A minimal, dark blue theme for VS Code, Sublime Text, Atom, iTerm, and more. Available on Visual Studio Marketplace, Package Control, Atom Package Manager, and npm."
          tags={["VS Code", "Sublime Text", "Atom", "iTerm"]}
          image={imgProject2}
          links={{ github: "#", external: "#" }}
          reverse
        />
      </div>
    </section>
  );
}
