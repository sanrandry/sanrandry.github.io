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
    <section className="min-h-screen flex items-center pl-[203px] pr-16 pt-24">
      <div className="flex flex-col gap-5 max-w-4xl">
        <p style={fadeUp(100, loaded)} className="text-[#1da8c7] text-xl font-mono tracking-wide">
          {t.hero.greeting}
        </p>

        <h1 style={fadeUp(200, loaded)} className="text-[#022558] text-6xl lg:text-7xl font-semibold leading-tight">
          Santatraina Sitraka RANDRY.
        </h1>

        <h2 style={fadeUp(300, loaded)} className="text-[#8892b0] text-5xl lg:text-6xl font-semibold leading-tight">
          {t.hero.tagline}
        </h2>

        <p style={fadeUp(400, loaded)} className="text-[#495670] text-xl font-normal max-w-xl leading-relaxed mt-4">
          {t.hero.description}
        </p>

        <div style={fadeUp(500, loaded)} className="mt-8">
          <a
            href="#work"
            className="inline-block border-2 border-[#1da8c7] text-[#1da8c7] px-7 py-4 rounded text-lg font-mono hover:bg-[#1da8c7]/10 transition-colors"
            style={{ transition: `background-color 250ms ${EASING}, color 250ms ${EASING}` }}
          >
            {t.hero.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
