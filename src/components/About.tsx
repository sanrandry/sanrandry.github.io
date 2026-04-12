"use client";

import { useState, useEffect } from "react";
import { useReveal } from "@/hooks/useReveal";
import { useLanguage } from "@/context/LanguageContext";

const imgProfile = "/images/profile.png";

const skills = [
  ["Vue.js / Nuxt.js", "React / Next.js", "Angular", "TypeScript"],
  ["Node.js / Nest.js", "C# / .NET", "Docker", "PostgreSQL / MongoDB"],
];

const EASING = "cubic-bezier(0.645,0.045,0.355,1)";

// Figma Component1 — container 300×360px
// Image:   inset-[0_11.14%_8.74%_0]        → top:0 right:33px bottom:31px left:0  (fixe)
// Border Default:  inset-[8.74%_0_0_11.14%] → top:31px right:0  bottom:0  left:33px (coin bas-droite)
// Border mazava:   inset-[4.59%_5.7%_4.15%_5.44%] → top:17px right:17px bottom:15px left:16px (centré)
// Animation: border glisse du coin vers le centre, overlay fade out

const W = 300, H = 360;
const IMG  = { top: 0,  right: Math.round(W * 0.1114), bottom: Math.round(H * 0.0874), left: 0 };
const BDR_DEFAULT = { top: Math.round(H * 0.0874), right: 0,                           bottom: 0,                          left: Math.round(W * 0.1114) };
const BDR_HOVER   = { top: Math.round(H * 0.0459), right: Math.round(W * 0.057),       bottom: Math.round(H * 0.0415),     left: Math.round(W * 0.0544) };

function ProfileImage() {
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reveal = useReveal(200);

  useEffect(() => { setMounted(true); }, []);

  const bdr = (mounted && hovered) ? BDR_HOVER : BDR_DEFAULT;

  return (
    <div
      ref={reveal.ref}
      style={{ width: W, height: H, position: "relative", flexShrink: 0, ...reveal.style }}
    >
      {/* Border box — glisse du coin bas-droite vers le centre au hover */}
      <div
        style={{
          position: "absolute",
          top:    bdr.top,
          right:  bdr.right,
          bottom: bdr.bottom,
          left:   bdr.left,
          border: "2px solid #1da8c7",
          borderRadius: 8,
          zIndex: 0,
          transition: `top 300ms ${EASING}, right 300ms ${EASING}, bottom 300ms ${EASING}, left 300ms ${EASING}`,
        }}
      />

      {/* Image — position fixe, overlay disparaît au hover */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "absolute",
          top:    IMG.top,
          right:  IMG.right,
          bottom: IMG.bottom,
          left:   IMG.left,
          borderRadius: 8,
          overflow: "hidden",
          zIndex: 1,
          cursor: "pointer",
        }}
      >
        <img
          src={imgProfile}
          alt="Santatraina Sitraka RANDRY"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        {/* Overlay teal — Default: visible, mazava: transparent */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(29, 168, 199, 0.62)",
            borderRadius: 8,
            opacity: hovered ? 0 : 1,
            transition: `opacity 300ms ${EASING}`,
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}

export default function About() {
  const { t } = useLanguage();
  const heading = useReveal(0);
  const text = useReveal(100);

  return (
    <section id="about" className="px-[203px] py-24">
      {/* Section heading */}
      <div ref={heading.ref} style={heading.style} className="flex items-center gap-3 mb-16">
        <span className="text-[#022558] text-3xl font-bold">{t.about.sectionNum}</span>
        <h2 className="text-[#022558] text-3xl font-bold whitespace-nowrap">{t.about.sectionTitle}</h2>
        <div className="flex-1 h-px bg-[#022558]/20 ml-3" />
      </div>

      <div className="flex gap-16 items-start">
        {/* Text */}
        <div ref={text.ref} style={text.style} className="flex flex-col gap-6 flex-1 text-lg text-[#495670] leading-relaxed">
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <p>{t.about.p3}</p>
          <p>{t.about.techTitle}</p>

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

        <ProfileImage />
      </div>
    </section>
  );
}
