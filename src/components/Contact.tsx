"use client";

import { useReveal } from "@/hooks/useReveal";
import { useLanguage } from "@/context/LanguageContext";

const EASING = "cubic-bezier(0.645,0.045,0.355,1)";

export default function Contact() {
  const { t } = useLanguage();
  const content = useReveal(0);

  return (
    <section id="contact" className="px-6 py-20 lg:py-40 flex flex-col items-center text-center">
      <div ref={content.revealRef} style={content.revealStyle} className="flex flex-col items-center gap-5 lg:gap-6 max-w-2xl w-full">
        <span className="text-[#495670] text-sm font-mono">{t.contact.sectionNum} {t.contact.sectionLabel}</span>

        <h2 className="text-[#022558] text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          {t.contact.title}
        </h2>

        <p className="text-[#495670] text-base lg:text-lg leading-relaxed">
          {t.contact.description}
        </p>

        <a
          href="mailto:sinrandry@gmail.com"
          className="mt-4 border border-[#1da8c7] text-[#1da8c7] text-sm font-mono px-8 py-5 rounded hover:bg-[#1da8c7]/10"
          style={{ transition: `background-color 250ms ${EASING}` }}
        >
          {t.contact.cta}
        </a>
      </div>
    </section>
  );
}
