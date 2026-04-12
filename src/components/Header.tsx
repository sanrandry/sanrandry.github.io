"use client";

import { useEffect, useState } from "react";

const EASING = "cubic-bezier(0.645,0.045,0.355,1)";

const navItems = [
  { label: "About", href: "#about", num: "01" },
  { label: "Experience", href: "#experience", num: "02" },
  { label: "Work", href: "#work", num: "03" },
  { label: "Contact", href: "#contact", num: "04" },
];

function fadeDown(delay: number, loaded: boolean): React.CSSProperties {
  return {
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(-20px)",
    transition: `opacity 300ms ${EASING} ${delay}ms, transform 300ms ${EASING} ${delay}ms`,
  };
}

export default function Header({ loaded }: { loaded: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12"
      style={{
        height: scrolled ? "70px" : "100px",
        backgroundColor: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(10px)",
        boxShadow: scrolled ? "0 10px 30px -10px rgba(2,37,88,0.1)" : "none",
        transition: `all 250ms ${EASING}`,
      }}
    >
      {/* Logo */}
      <div style={fadeDown(0, loaded)}>
        <a href="#" aria-label="Home" className="relative group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 115"
            width="42"
            height="48"
            fill="none"
            className="group-hover:translate-x-1 group-hover:translate-y-0.5 transition-transform"
            style={{ transition: `transform 250ms ${EASING}` }}
          >
            <polygon
              points="50,5 95,27.5 95,87.5 50,110 5,87.5 5,27.5"
              stroke="#1da8c7"
              strokeWidth="5"
              fill="none"
            />
            <text
              x="50"
              y="72"
              textAnchor="middle"
              fill="#022558"
              fontFamily="serif"
              fontWeight="600"
              fontSize="44"
            >
              S
            </text>
          </svg>
        </a>
      </div>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-8">
        <ol className="flex gap-8 list-none">
          {navItems.map((item, i) => (
            <li key={item.href} style={fadeDown((i + 1) * 100, loaded)}>
              <a
                href={item.href}
                className="text-[#022558] text-sm font-mono hover:text-[#1da8c7] transition-colors"
                style={{ transition: `color 250ms ${EASING}` }}
              >
                <span className="text-[#1da8c7] mr-1">{item.num}.</span>
                {item.label}
              </a>
            </li>
          ))}
        </ol>
        <div style={fadeDown(500, loaded)}>
          <a
            href="/resume.pdf"
            className="border border-[#1da8c7] text-[#1da8c7] text-sm font-mono px-4 py-3 rounded hover:bg-[#1da8c7]/10"
            style={{ transition: `background-color 250ms ${EASING}` }}
          >
            Resume
          </a>
        </div>
      </nav>

      {/* Mobile hamburger */}
      <button
        className="md:hidden p-2 text-[#1da8c7]"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          {menuOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden absolute top-full right-0 w-[min(75vw,400px)] h-screen bg-[#f0f7ff] shadow-2xl p-12 flex flex-col items-center justify-center gap-8"
          style={{ transition: `transform 250ms ${EASING}` }}
        >
          <ol className="flex flex-col items-center gap-6 list-none">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[#022558] text-lg font-mono hover:text-[#1da8c7] transition-colors block"
                >
                  <span className="text-[#1da8c7] block text-center text-sm mb-1">{item.num}.</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
          <a
            href="/resume.pdf"
            className="mt-4 border border-[#1da8c7] text-[#1da8c7] text-sm font-mono px-12 py-4 rounded hover:bg-[#1da8c7]/10 transition-colors"
          >
            Resume
          </a>
        </div>
      )}
    </header>
  );
}
