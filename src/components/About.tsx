"use client";

import { useReveal } from "@/hooks/useReveal";

const imgProfile = "https://www.figma.com/api/mcp/asset/bcc8479d-d5af-41da-8458-ef2e312e9df7";

const skills = [
  ["JavaScript (ES6+)", "TypeScript", "React"],
  ["Eleventy", "Node.js", "WordPress"],
];

const EASING = "cubic-bezier(0.645,0.045,0.355,1)";

export default function About() {
  const heading = useReveal(0);
  const text = useReveal(100);
  const image = useReveal(200);

  return (
    <section id="about" className="px-[203px] py-24">
      {/* Section heading */}
      <div ref={heading.ref} style={heading.style} className="flex items-center gap-3 mb-16">
        <span className="text-[#022558] text-3xl font-bold">1.</span>
        <h2 className="text-[#022558] text-3xl font-bold whitespace-nowrap">About me</h2>
        <div className="flex-1 h-px bg-[#022558]/20 ml-3" />
      </div>

      <div className="flex gap-16 items-start">
        {/* Text */}
        <div ref={text.ref} style={text.style} className="flex flex-col gap-6 flex-1 text-lg text-[#495670] leading-relaxed">
          <p>
            Hello! My name is Brittany and I enjoy creating things that live on the
            internet. My interest in web development started back in 2012 when I decided
            to try editing custom Tumblr themes — turns out hacking together a custom
            reblo!
          </p>
          <p>
            Hello! My name is Brittany and I enjoy creating things that live on the
            internet. My interest in web development started back in 2012 when I decided
            to try editing custom Tumblr themes — turns out hacking together a custom
            reblo!
          </p>
          <p>
            Hello! My name is Brittany and I enjoy creating things that live on the
            internet. My interest in web development started back in 2012 when I decided
            to try editing custom Tumblr themes — turns out hacking together a custom
            reblo!
          </p>
          <p>Here are a few technologies I&apos;ve been working with recently:</p>

          <div className="flex gap-14">
            {skills.map((col, i) => (
              <ul key={i} className="space-y-2">
                {col.map((skill) => (
                  <li key={skill} className="flex items-center gap-2 text-[#022558]">
                    <span className="text-[#1da8c7] text-xs">▹</span>
                    {skill}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* Profile image */}
        <div ref={image.ref} style={image.style} className="shrink-0 relative w-72">
          <div
            className="absolute border-2 border-[#1da8c7] rounded-lg inset-0 translate-x-4 translate-y-4 z-0"
            style={{ transition: `transform 250ms ${EASING}` }}
          />
          <div className="relative rounded-lg overflow-hidden z-10 group">
            <img
              src={imgProfile}
              alt="Profile"
              className="w-full h-auto rounded-lg object-cover"
            />
            <div
              className="absolute inset-0 bg-[#1da8c7]/40 group-hover:bg-transparent rounded-lg"
              style={{ transition: `background-color 250ms ${EASING}` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
