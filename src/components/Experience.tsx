"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const EASING = "cubic-bezier(0.645,0.045,0.355,1)";

const jobs = [
  {
    company: "Upstatement",
    role: "Engineer",
    period: "May 2018 - Present",
    bullets: [
      "Worked closely with clients across multiple verticals — ranging from fintech to consumer products to build quality, impactful web applications.",
      "Improved build pipeline performance by 40% across multiple client projects.",
      "Collaborated cross-functionally with design and product teams to deliver accessible experiences.",
    ],
  },
  {
    company: "Apple",
    role: "Engineer",
    period: "Jan 2017 - Apr 2018",
    bullets: [
      "Worked on developer tooling and internal platforms.",
      "Improved build pipeline performance by 40%.",
      "Collaborated cross-functionally with design and product.",
    ],
  },
  {
    company: "Scout Studio",
    role: "Developer",
    period: "Jun 2016 - Dec 2016",
    bullets: [
      "Built client-facing web applications.",
      "Implemented responsive designs from Figma specs.",
    ],
  },
  {
    company: "Starry",
    role: "Intern",
    period: "Jan 2016 - May 2016",
    bullets: [
      "Developed front-end components in React.",
      "Wrote unit tests with Jest.",
    ],
  },
  {
    company: "MullenLowe",
    role: "Creative Dev Intern",
    period: "Jun 2015 - Aug 2015",
    bullets: [
      "Built interactive campaign microsites.",
      "Assisted with motion graphics and animations.",
    ],
  },
];

export default function Experience() {
  const [active, setActive] = useState(0);
  const job = jobs[active];
  const heading = useReveal(0);
  const content = useReveal(100);

  return (
    <section id="experience" className="px-[203px] py-24">
      {/* Section heading */}
      <div ref={heading.ref} style={heading.style} className="flex items-center gap-3 mb-16">
        <span className="text-[#022558] text-3xl font-bold">2.</span>
        <h2 className="text-[#022558] text-3xl font-bold whitespace-nowrap">Where I&apos;ve Worked</h2>
        <div className="flex-1 h-px bg-[#022558]/20 ml-3" />
      </div>

      <div ref={content.ref} style={content.style} className="flex gap-10 min-h-[340px]">
        {/* Tab list */}
        <div className="flex flex-col border-l-2 border-[#022558]/20 shrink-0">
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
            <h3 className="text-[#022558] text-xl font-semibold">
              {job.role}{" "}
              <span className="text-[#1da8c7]">@ {job.company}</span>
            </h3>
            <p className="text-[#495670] text-sm font-mono mt-1">{job.period}</p>
          </div>
          <ul className="space-y-3">
            {job.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 text-[#495670] text-base leading-relaxed">
                <span className="text-[#1da8c7] mt-1 shrink-0 text-xs">▹</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
