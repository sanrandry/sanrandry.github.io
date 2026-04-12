"use client";

const EASING = "cubic-bezier(0.645,0.045,0.355,1)";

function fadeUp(delay: number, loaded: boolean): React.CSSProperties {
  return {
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 300ms ${EASING} ${delay}ms, transform 300ms ${EASING} ${delay}ms`,
  };
}

export default function SocialSidebar({ loaded }: { loaded: boolean }) {
  return (
    <>
      {/* Left sidebar */}
      <div
        className="fixed left-10 bottom-0 hidden lg:flex flex-col items-center gap-5 z-40"
        style={fadeUp(600, loaded)}
      >
        <a
          href="https://www.linkedin.com/in/randry-santatraina-sitraka"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="text-[#022558] hover:text-[#1da8c7] hover:-translate-y-1 transition-all"
          style={{ transition: `all 250ms ${EASING}` }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>
        <a
          href="https://github.com/sanrandry"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="text-[#022558] hover:text-[#1da8c7] hover:-translate-y-1"
          style={{ transition: `all 250ms ${EASING}` }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/randry-santatraina-sitraka"
          target="_blank"
          rel="noreferrer"
          aria-label="Twitter"
          className="text-[#022558] hover:text-[#1da8c7] hover:-translate-y-1"
          style={{ transition: `all 250ms ${EASING}` }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
          </svg>
        </a>
        <div className="w-px h-24 bg-[#022558]/40" />
      </div>

      {/* Right sidebar */}
      <div
        className="fixed right-10 bottom-0 hidden lg:flex flex-col items-center gap-5 z-40"
        style={fadeUp(700, loaded)}
      >
        <a
          href="mailto:sinrandry@gmail.com"
          className="text-[#022558] text-xs font-mono tracking-widest hover:text-[#1da8c7] hover:-translate-y-1"
          style={{
            writingMode: "vertical-rl",
            transition: `all 250ms ${EASING}`,
          }}
        >
          sinrandry@gmail.com
        </a>
        <div className="w-px h-24 bg-[#022558]/40" />
      </div>
    </>
  );
}
