"use client";

import { useEffect, useState } from "react";

const PORTFOLIO_URL = "/portfolio/";

function normalizeUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return PORTFOLIO_URL;
  if (trimmed.startsWith("/") || trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }));
    };
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return <span>{time}</span>;
}

export default function WebOSPortfolio() {
  const [browserOpen, setBrowserOpen] = useState(true);
  const [browserMinimized, setBrowserMinimized] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [address, setAddress] = useState(PORTFOLIO_URL);
  const [loadedUrl, setLoadedUrl] = useState(PORTFOLIO_URL);
  const [browserKey, setBrowserKey] = useState(0);

  function openBrowser() {
    setBrowserOpen(true);
    setBrowserMinimized(false);
    setAddress(PORTFOLIO_URL);
    setLoadedUrl(PORTFOLIO_URL);
  }

  function minimizeBrowser() {
    setBrowserOpen(true);
    setBrowserMinimized(true);
  }

  function closeBrowser() {
    setBrowserOpen(false);
    setBrowserMinimized(false);
  }

  function reloadBrowser() {
    setBrowserKey((current) => current + 1);
  }

  function navigateBrowser(value = address) {
    const nextUrl = normalizeUrl(value);
    setAddress(nextUrl);
    setLoadedUrl(nextUrl);
    setBrowserKey((current) => current + 1);
    setBrowserOpen(true);
    setBrowserMinimized(false);
  }

  return (
    <main className="relative grid h-screen place-items-center overflow-hidden bg-[#eaf4fb] px-3 py-2 text-slate-900 sm:px-6">
      <div className="pointer-events-none absolute inset-0 laptop-scene-bg" />

      <div
        className="relative"
        style={{ width: "min(97vw, calc((100vh - 24px) * 1.6))" }}
      >
        <div className="relative rounded-[28px] bg-slate-950 p-[10px] shadow-2xl shadow-slate-900/30 ring-1 ring-slate-900/40">
          <div className="absolute left-1/2 top-[10px] z-[60] h-4 w-32 -translate-x-1/2 rounded-b-2xl bg-slate-950 sm:w-44" />
          <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] bg-[#eaf4fb]">
            <div className="pointer-events-none absolute inset-0 os-wallpaper" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(14,165,233,0.2),transparent_30%),radial-gradient(circle_at_78%_18%,rgba(45,212,191,0.16),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.38),rgba(219,234,254,0.62))]" />

      <header className="absolute left-0 right-0 top-0 z-50 flex h-7 items-center justify-between border-b border-slate-900/10 bg-white/62 px-2 text-[13px] text-slate-900 shadow-lg shadow-sky-900/10 backdrop-blur-2xl">
        <nav className="flex min-w-0 items-center gap-1" aria-label="System menu">
          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="grid h-6 w-7 shrink-0 place-items-center rounded-md text-[13px] font-black text-cyan-700 transition hover:bg-slate-900/10"
            aria-label="Open Santatraina OS menu"
            aria-expanded={menuOpen}
          >
            S
          </button>
          {["Santatraina OS", "File", "Edit", "View", "Window", "Help"].map((item, index) => (
            <button
              key={item}
              type="button"
              onClick={() => setMenuOpen((current) => (index === 0 ? !current : true))}
              className={`hidden h-6 rounded-md px-2 font-medium transition hover:bg-slate-900/10 sm:block ${index === 0 ? "font-bold" : ""}`}
            >
              {item}
            </button>
          ))}
        </nav>

        {menuOpen && (
          <div className="absolute left-2 top-[calc(100%+6px)] w-72 overflow-hidden rounded-xl border border-slate-900/10 bg-white/88 p-1.5 shadow-2xl shadow-sky-900/20 backdrop-blur-2xl">
            <div className="flex items-center gap-3 px-3 py-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-500 text-base font-black text-white">
                S
              </span>
              <div>
                <p className="text-sm font-bold text-slate-950">Santatraina OS</p>
                <p className="text-xs text-slate-500">Portfolio desktop</p>
              </div>
            </div>
            <div className="my-1 h-px bg-slate-900/10" />
            <button
              type="button"
              onClick={() => { openBrowser(); setMenuOpen(false); }}
              className="flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-left text-sm text-slate-800 transition hover:bg-cyan-100"
            >
              <span>Open browser</span>
              <span className="text-xs text-slate-400">WEB</span>
            </button>
            <button
              type="button"
              onClick={() => { minimizeBrowser(); setMenuOpen(false); }}
              className="flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-left text-sm text-slate-800 transition hover:bg-cyan-100"
            >
              <span>Minimize browser</span>
              <span className="text-xs text-slate-400">Cmd M</span>
            </button>
            <button
              type="button"
              onClick={() => { navigateBrowser(PORTFOLIO_URL); setMenuOpen(false); }}
              className="flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-left text-sm text-slate-800 transition hover:bg-cyan-100"
            >
              <span>Load portfolio</span>
              <span className="text-xs text-slate-400">Cmd R</span>
            </button>
            <button
              type="button"
              onClick={() => { navigateBrowser("https://www.google.com"); setMenuOpen(false); }}
              className="flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-left text-sm text-slate-800 transition hover:bg-cyan-100"
            >
              <span>Open Google</span>
              <span className="text-xs text-slate-400">Cmd L</span>
            </button>
            <div className="my-1 h-px bg-slate-900/10" />
            <a
              href="/CV.pdf"
              onClick={() => setMenuOpen(false)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-left text-sm text-slate-800 transition hover:bg-cyan-100"
            >
              <span>Open CV</span>
              <span className="text-xs text-slate-400">PDF</span>
            </a>
            <a
              href="mailto:sinrandry@gmail.com"
              onClick={() => setMenuOpen(false)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-left text-sm text-slate-800 transition hover:bg-cyan-100"
            >
              <span>Contact</span>
              <span className="text-xs text-slate-400">@</span>
            </a>
          </div>
        )}

        <div className="flex items-center gap-3 text-xs text-slate-700">
          <span className="hidden sm:inline">{browserOpen && !browserMinimized ? "Portfolio Browser" : browserOpen ? "Browser Minimized" : "Browser Closed"}</span>
          <span className="hidden sm:inline">Wi-Fi</span>
          <span className="hidden sm:inline">100%</span>
          <Clock />
        </div>
      </header>

      <section className="relative z-10 h-full overflow-hidden px-0 pb-24 pt-7">
        <div className="relative h-full min-h-0 overflow-hidden">
          {browserOpen && !browserMinimized ? (
            <section className="os-browser-window flex h-full min-h-0 w-full flex-col overflow-hidden rounded-none border-0 bg-white/78 shadow-none backdrop-blur-2xl">
              <div className="flex min-h-12 items-center gap-3 border-b border-slate-900/10 bg-white/70 px-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={closeBrowser}
                    className="h-3.5 w-3.5 rounded-full bg-rose-400 transition hover:scale-110"
                    aria-label="Close browser"
                  />
                  <button
                    type="button"
                    onClick={minimizeBrowser}
                    className="h-3.5 w-3.5 rounded-full bg-amber-300 transition hover:scale-110"
                    aria-label="Minimize browser"
                  />
                  <button
                    type="button"
                    onClick={openBrowser}
                    className="h-3.5 w-3.5 rounded-full bg-emerald-400 transition hover:scale-110"
                    aria-label="Restore browser"
                  />
                </div>

                <div className="hidden h-7 items-center gap-1 rounded-full bg-slate-900/[0.06] px-2 text-slate-600 sm:flex">
                  <button type="button" className="rounded-full px-2 text-sm transition hover:bg-slate-900/10" aria-label="Back">
                    {"<"}
                  </button>
                  <button type="button" className="rounded-full px-2 text-sm transition hover:bg-slate-900/10" aria-label="Forward">
                    {">"}
                  </button>
                  <button type="button" onClick={reloadBrowser} className="rounded-full px-2 text-sm transition hover:bg-slate-900/10" aria-label="Reload">
                    R
                  </button>
                </div>

                <form
                  className="flex min-w-0 flex-1"
                  onSubmit={(event) => {
                    event.preventDefault();
                    navigateBrowser();
                  }}
                >
                  <label className="sr-only" htmlFor="portfolio-address">
                    Browser address
                  </label>
                  <input
                    id="portfolio-address"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    className="h-8 min-w-0 flex-1 rounded-full border border-slate-900/10 bg-white/86 px-4 font-mono text-xs text-slate-700 shadow-inner outline-none transition focus:border-cyan-500"
                    aria-label="Browser address"
                  />
                </form>

                <a
                  href={loadedUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden rounded-full border border-cyan-600/20 bg-cyan-100 px-3 py-1.5 text-xs font-bold text-cyan-800 transition hover:bg-cyan-200 sm:block"
                >
                  Open tab
                </a>
              </div>

              <div className="relative flex-1 bg-white">
                <iframe
                  key={`${loadedUrl}-${browserKey}`}
                  src={loadedUrl}
                  title="Santatraina OS browser"
                  className="h-full w-full border-0 bg-white"
                />
                {loadedUrl !== PORTFOLIO_URL && (
                  <div className="pointer-events-none absolute bottom-3 left-3 right-3 rounded-2xl border border-slate-200/70 bg-white/90 p-3 text-xs text-slate-600 shadow-xl backdrop-blur">
                    Some external sites block embedded browser views. Use Open tab if this page stays blank.
                  </div>
                )}
              </div>
              <div className="pointer-events-none absolute bottom-2 right-2 hidden h-5 w-5 rounded-br-2xl border-b-2 border-r-2 border-cyan-500/60 md:block" />
            </section>
          ) : (
            <div className="grid h-full min-h-0 place-items-center border border-dashed border-slate-900/20 bg-white/46 text-center shadow-xl shadow-sky-900/10 backdrop-blur-xl">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-700">
                  {browserOpen ? "Browser minimized" : "Browser closed"}
                </p>
                <button
                  type="button"
                  onClick={openBrowser}
                  className="mt-4 rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-black text-white transition hover:bg-cyan-400"
                >
                  Open Portfolio
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <footer className="absolute bottom-3 left-1/2 z-50 flex -translate-x-1/2 items-end gap-1.5 rounded-[24px] border border-white/70 bg-white/48 px-2 py-1.5 shadow-2xl shadow-sky-900/20 backdrop-blur-2xl">
        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          className="group relative grid h-14 w-14 place-items-center rounded-[18px] bg-white text-base font-black text-cyan-700 shadow-lg shadow-sky-900/15 ring-1 ring-slate-900/10 transition duration-200 hover:-translate-y-3 hover:scale-110"
          aria-label="Open Santatraina OS menu"
        >
          S
          <span className="pointer-events-none absolute -top-9 scale-95 rounded-lg bg-slate-950/90 px-2 py-1 text-[11px] text-white opacity-0 shadow-lg transition group-hover:scale-100 group-hover:opacity-100">
            Menu
          </span>
        </button>
        <div className="mx-1 mb-2 h-9 w-px bg-slate-900/15" />
        <button
          type="button"
          onClick={openBrowser}
          className="group relative grid h-14 w-14 place-items-center rounded-[18px] bg-cyan-500 text-xs font-black text-white shadow-lg shadow-sky-900/20 transition duration-200 hover:-translate-y-3 hover:scale-110"
          aria-label="Open portfolio browser"
        >
          WEB
          {browserOpen && !browserMinimized && <span className="absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-cyan-100" />}
          {browserMinimized && <span className="absolute -bottom-1 h-1.5 w-6 rounded-full bg-amber-200" />}
          <span className="pointer-events-none absolute -top-9 scale-95 rounded-lg bg-slate-950/90 px-2 py-1 text-[11px] text-white opacity-0 shadow-lg transition group-hover:scale-100 group-hover:opacity-100">
            Portfolio
          </span>
        </button>
        <a
          href="/CV.pdf"
          className="group relative grid h-14 w-14 place-items-center rounded-[18px] bg-rose-400 text-xs font-black text-white shadow-lg shadow-black/25 transition duration-200 hover:-translate-y-3 hover:scale-110"
          aria-label="Open CV"
        >
          PDF
          <span className="pointer-events-none absolute -top-9 scale-95 rounded-lg bg-slate-950/90 px-2 py-1 text-[11px] text-white opacity-0 shadow-lg transition group-hover:scale-100 group-hover:opacity-100">
            CV
          </span>
        </a>
        <button
          type="button"
          onClick={() => window.open("https://github.com/sanrandry", "_blank", "noreferrer")}
          className="group relative grid h-14 w-14 place-items-center rounded-[18px] bg-slate-800 text-xs font-black text-white shadow-lg shadow-sky-900/20 transition duration-200 hover:-translate-y-3 hover:scale-110"
          aria-label="Open GitHub"
        >
          GH
          <span className="pointer-events-none absolute -top-9 scale-95 rounded-lg bg-slate-950/90 px-2 py-1 text-[11px] text-white opacity-0 shadow-lg transition group-hover:scale-100 group-hover:opacity-100">
            GitHub
          </span>
        </button>
        <button
          type="button"
          onClick={() => window.location.href = "mailto:sinrandry@gmail.com"}
          className="group relative grid h-14 w-14 place-items-center rounded-[18px] bg-amber-300 text-lg font-black text-slate-950 shadow-lg shadow-black/25 transition duration-200 hover:-translate-y-3 hover:scale-110"
          aria-label="Open Mail"
        >
          @
          <span className="pointer-events-none absolute -top-9 scale-95 rounded-lg bg-slate-950/90 px-2 py-1 text-[11px] text-white opacity-0 shadow-lg transition group-hover:scale-100 group-hover:opacity-100">
            Mail
          </span>
        </button>
      </footer>
          </div>
        </div>
        <div className="mx-auto h-5 w-[86%] rounded-[50%] bg-slate-900/18 blur-md" />
      </div>
    </main>
  );
}
