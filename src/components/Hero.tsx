"use client";

import { useLanguage } from "@/context/LanguageContext";

const EASING = "cubic-bezier(0.645,0.045,0.355,1)";

function fadeUp(delay: number, loaded: boolean): React.CSSProperties {
  return {
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 300ms ${EASING} ${delay}ms, transform 300ms ${EASING} ${delay}ms`,
  };
}

export default function Hero({ loaded }: { loaded: boolean }) {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen flex items-center px-6 pt-28 pb-16 md:px-12 lg:pl-[203px] lg:pr-16 lg:pt-24 lg:pb-0">
      <div className="flex flex-col gap-4 lg:gap-5 max-w-4xl w-full">
        <p style={fadeUp(100, loaded)} className="text-[#1da8c7] text-base md:text-xl font-mono tracking-wide">
          {t.hero.greeting}
        </p>

        <h1 style={fadeUp(200, loaded)} className="text-[#022558] text-4xl md:text-5xl lg:text-7xl font-semibold leading-tight">
          Santatraina Sitraka RANDRY.
        </h1>

        <h2 style={fadeUp(300, loaded)} className="text-[#8892b0] text-3xl md:text-4xl lg:text-6xl font-semibold leading-tight">
          {t.hero.tagline}
        </h2>

        <p style={fadeUp(400, loaded)} className="text-[#495670] text-base lg:text-xl font-normal max-w-xl leading-relaxed mt-2 lg:mt-4">
          {t.hero.description}
        </p>

        <div style={fadeUp(500, loaded)} className="mt-6 lg:mt-8">
          <a
            href="#work"
            className="inline-block border-2 border-[#1da8c7] text-[#1da8c7] px-6 py-3 lg:px-7 lg:py-4 rounded text-base lg:text-lg font-mono hover:bg-[#1da8c7]/10 transition-colors"
            style={{ transition: `background-color 250ms ${EASING}, color 250ms ${EASING}` }}
          >
            {t.hero.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
