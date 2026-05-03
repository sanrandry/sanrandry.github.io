"use client";

import { useEffect, useRef, useState } from "react";

const PORTFOLIO_URL = "/portfolio/";

function normalizeUrl(value: string) {
  const t = value.trim();
  if (!t) return PORTFOLIO_URL;
  if (t.startsWith("/") || t.startsWith("http://") || t.startsWith("https://")) return t;
  return `https://${t}`;
}

function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }));
    update();
    const t = setInterval(update, 30_000);
    return () => clearInterval(t);
  }, []);
  return (
    <span aria-live="polite" aria-atomic="true" aria-label={`Heure : ${time}`}>
      {time}
    </span>
  );
}

// ─── Window types ────────────────────────────────────────────────────────────

interface Win {
  id: string;
  title: string;
  url: string;
  address: string;
  open: boolean;
  minimized: boolean;
  maximized: boolean;
  x: number;
  y: number;
  z: number;
  key: number;
  w?: string;
  h?: string;
}

let gZ = 1;
function nextZ() {
  return ++gZ;
}

// ─── BrowserWindow ───────────────────────────────────────────────────────────

interface BWProps {
  win: Win;
  dark: boolean;
  active: boolean;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
  onNavigate: (id: string, address: string) => void;
  onReload: (id: string) => void;
}

function BrowserWindow({ win, dark, active, onClose, onMinimize, onMaximize, onFocus, onMove, onNavigate, onReload }: BWProps) {
  const [addr, setAddr] = useState(win.address);
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);

  useEffect(() => setAddr(win.address), [win.address]);

  function onTitleDown(e: React.MouseEvent) {
    if (win.maximized) return;
    if ((e.target as HTMLElement).closest("button,a,input")) return;
    onFocus(win.id);
    drag.current = { sx: e.clientX, sy: e.clientY, ox: win.x, oy: win.y };
    const mm = (ev: MouseEvent) => {
      if (!drag.current) return;
      onMove(win.id, drag.current.ox + ev.clientX - drag.current.sx, drag.current.oy + ev.clientY - drag.current.sy);
    };
    const mu = () => {
      drag.current = null;
      document.removeEventListener("mousemove", mm);
      document.removeEventListener("mouseup", mu);
    };
    document.addEventListener("mousemove", mm);
    document.addEventListener("mouseup", mu);
    e.preventDefault();
  }

  const isExternal = !win.url.startsWith("/");

  const tb = dark
    ? "border-slate-700 bg-slate-800/90"
    : "border-slate-200 bg-white/85";
  const frame = dark
    ? "border border-slate-700 bg-slate-900/96 shadow-slate-900/60"
    : "border border-slate-200/80 bg-white/92 shadow-slate-900/20";
  const inputCls = dark
    ? "border-slate-600 bg-slate-700 text-slate-200"
    : "border-slate-200 bg-white text-slate-700 shadow-inner";
  const navCls = dark ? "bg-white/8 text-slate-400" : "bg-slate-100 text-slate-600";
  const btnHover = dark ? "hover:bg-white/10" : "hover:bg-slate-900/8";

  return (
    <div
      role="dialog"
      aria-label={win.title}
      className={`absolute flex flex-col overflow-hidden rounded-xl shadow-2xl backdrop-blur-xl ${frame}`}
      style={win.maximized
        ? { position: "absolute", top: 0, right: 0, bottom: 0, left: 0, zIndex: win.z, resize: "none" }
        : { position: "absolute", left: win.x, top: win.y, zIndex: win.z, width: win.w ?? "clamp(340px, 66vw, 820px)", height: win.h ?? "clamp(240px, 64vh, 620px)", resize: "both", minWidth: 300, minHeight: 180 }
      }
      onMouseDown={() => onFocus(win.id)}
    >
      {/* Title bar */}
      <div
        className={`flex min-h-11 cursor-grab items-center gap-2 border-b px-3 select-none active:cursor-grabbing ${tb}`}
        onMouseDown={onTitleDown}
      >
        <div className="group/tl flex shrink-0 items-center gap-1.5">
          <button
            onClick={() => onClose(win.id)}
            className="relative grid h-6 w-6 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-1"
            aria-label="Fermer la fenêtre"
          >
            <span className="h-3 w-3 rounded-full bg-rose-400 transition" aria-hidden="true" />
            <svg className="absolute inset-0 m-auto h-2 w-2 opacity-0 transition group-hover/tl:opacity-100" viewBox="0 0 10 10" aria-hidden="true">
              <path d="M1 1l8 8M9 1L1 9" stroke="#7d1a1a" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
          <button
            onClick={() => onMinimize(win.id)}
            className="relative grid h-6 w-6 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-1"
            aria-label="Réduire la fenêtre"
          >
            <span className="h-3 w-3 rounded-full bg-amber-300 transition" aria-hidden="true" />
            <svg className="absolute inset-0 m-auto h-2 w-2 opacity-0 transition group-hover/tl:opacity-100" viewBox="0 0 10 4" aria-hidden="true">
              <path d="M1 2h8" stroke="#7d5500" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
          <button
            onClick={() => onMaximize(win.id)}
            className="relative grid h-6 w-6 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-1"
            aria-label={win.maximized ? "Restaurer la fenêtre" : "Maximiser la fenêtre"}
          >
            <span className="h-3 w-3 rounded-full bg-emerald-400 transition" aria-hidden="true" />
            <svg className="absolute inset-0 m-auto h-2.5 w-2.5 opacity-0 transition group-hover/tl:opacity-100" viewBox="0 0 10 10" aria-hidden="true">
              {win.maximized
                ? <path d="M3 1H1v2M7 1h2v2M3 9H1V7M7 9h2V7" stroke="#064e3b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                : <path d="M1 4V1h3M6 1h3v3M9 6v3H6M4 9H1V6" stroke="#064e3b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              }
            </svg>
          </button>
        </div>

        <div className={`hidden h-6 items-center gap-0.5 rounded-full px-1 sm:flex ${navCls}`}>
          <button type="button" className={`h-6 w-7 rounded-full text-xs transition ${btnHover}`} aria-label="Page précédente">{"<"}</button>
          <button type="button" className={`h-6 w-7 rounded-full text-xs transition ${btnHover}`} aria-label="Page suivante">{">"}</button>
          <button type="button" onClick={() => onReload(win.id)} className={`h-6 w-7 rounded-full text-xs transition ${btnHover}`} aria-label="Recharger">R</button>
        </div>

        <form className="flex min-w-0 flex-1" onSubmit={(e) => { e.preventDefault(); onNavigate(win.id, addr); }}>
          <label className="sr-only" htmlFor={`addr-${win.id}`}>Adresse</label>
          <input
            id={`addr-${win.id}`}
            value={addr}
            onChange={(e) => setAddr(e.target.value)}
            className={`h-7 min-w-0 flex-1 rounded-full border px-3 font-mono text-xs outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 ${inputCls}`}
            aria-label="Barre d'adresse"
          />
        </form>

        <a
          href={win.url}
          target="_blank"
          rel="noreferrer"
          className="hidden shrink-0 rounded-full border border-cyan-600/20 bg-cyan-100 px-2.5 py-1 text-xs font-bold text-cyan-800 transition hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 sm:block"
        >
          Open tab
        </a>
      </div>

      {/* Content */}
      <div className="relative flex-1 overflow-hidden bg-white">
        {!active && (
          <div
            className="absolute inset-0 z-10 cursor-pointer"
            onMouseDown={() => onFocus(win.id)}
            aria-hidden="true"
          />
        )}
        <iframe
          key={`${win.url}-${win.key}`}
          src={win.url}
          title={win.title}
          className="h-full w-full border-0 bg-white"
        />
        {isExternal && (
          <p className="pointer-events-none absolute bottom-3 left-3 right-3 rounded-xl border border-slate-200/70 bg-white/92 p-2.5 text-xs text-slate-600 shadow-xl backdrop-blur">
            Certains sites bloquent les vues intégrées. Utilisez <strong>Open tab</strong> si la page reste blanche.
          </p>
        )}
      </div>

      {/* Resize handle */}
      <div
        className="pointer-events-none absolute bottom-1.5 right-1.5 h-4 w-4 rounded-br-lg border-b-2 border-r-2 border-cyan-500/50"
        aria-hidden="true"
      />
    </div>
  );
}

// ─── Dock items ───────────────────────────────────────────────────────────────

const DOCK_ITEMS = [
  { id: "portfolio", label: "Portfolio", icon: "WEB", bg: "bg-cyan-700",  text: "text-white",      url: PORTFOLIO_URL,                    title: "Portfolio Browser", external: false },
  { id: "cv",        label: "CV",        icon: "PDF", bg: "bg-rose-600",  text: "text-white",      url: "/CV.pdf",                        title: "CV",                external: false },
  { id: "github",    label: "GitHub",    icon: "GH",  bg: "bg-slate-800", text: "text-white",      url: "https://github.com/sanrandry",   title: "GitHub",            external: true  },
  { id: "mail",      label: "Mail",      icon: "@",   bg: "bg-amber-300", text: "text-slate-950",  url: "mailto:sinrandry@gmail.com",     title: "Mail",              external: true  },
] as const;

// ─── Main component ───────────────────────────────────────────────────────────

export default function WebOSPortfolio() {
  const [windows, setWindows] = useState<Win[]>([
    { id: "cv",        title: "CV",               url: "/CV.pdf",    address: "/CV.pdf",    open: true, minimized: false, maximized: false, x: 400, y: 8,  z: 1, key: 0, w: "calc(100% - 408px)", h: "calc(100% - 16px)" },
    { id: "portfolio", title: "Portfolio Browser", url: PORTFOLIO_URL, address: PORTFOLIO_URL, open: true, minimized: false, maximized: false, x: 8,   y: 8,  z: 2, key: 0, w: "68%",                  h: "calc(100% - 16px)" },
  ]);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [dark, setDark]           = useState(false);
  const [mouseX, setMouseX]       = useState<number | null>(null);
  const dockRefs                  = useRef<Map<string, HTMLElement>>(new Map());

  // Dark mode init
  useEffect(() => {
    const saved = localStorage.getItem("os-theme");
    if (saved) {
      setDark(saved === "dark");
    } else {
      setDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("os-theme")) setDark(e.matches);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Keyboard: Escape closes menu
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, []);

  function toggleDark() {
    setDark((d) => {
      const next = !d;
      localStorage.setItem("os-theme", next ? "dark" : "light");
      return next;
    });
  }

  // ── Window management ──────────────────────────────────────────────────────

  function cascadePos(wins: Win[]): { x: number; y: number } {
    const open = wins.filter((w) => w.open && !w.minimized && !w.maximized);
    if (open.length === 0) return { x: 20, y: 20 };
    const top = open.reduce((a, b) => (a.z > b.z ? a : b));
    const STEP = 32;
    const MAX_X = 280;
    const MAX_Y = 220;
    return {
      x: top.x + STEP > MAX_X ? 20 : top.x + STEP,
      y: top.y + STEP > MAX_Y ? 20 : top.y + STEP,
    };
  }

  function openWindow(id: string, url: string, title: string) {
    if (url.startsWith("mailto:")) { window.location.href = url; return; }
    if (url.startsWith("https://github")) { window.open(url, "_blank", "noreferrer"); return; }
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === id);
      if (existing) {
        return prev.map((w) => w.id === id ? { ...w, open: true, minimized: false, z: nextZ() } : w);
      }
      const { x, y } = cascadePos(prev);
      return [
        ...prev,
        { id, title, url, address: url, open: true, minimized: false, maximized: false, x, y, z: nextZ(), key: 0 },
      ];
    });
  }

  function closeWindow(id: string) {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }

  function minimizeWindow(id: string) {
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, minimized: true, maximized: false } : w));
  }

  function maximizeWindow(id: string) {
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, maximized: !w.maximized, z: nextZ() } : w));
  }

  function focusWindow(id: string) {
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, z: nextZ() } : w));
  }

  function moveWindow(id: string, x: number, y: number) {
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, x: Math.max(0, x), y: Math.max(0, y) } : w));
  }

  function navigateWindow(id: string, address: string) {
    const url = normalizeUrl(address);
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, url, address: url, key: w.key + 1 } : w));
  }

  function reloadWindow(id: string) {
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, key: w.key + 1 } : w));
  }

  // ── Dock magnification ─────────────────────────────────────────────────────

  function dockRef(key: string) {
    return (el: HTMLElement | null) => {
      if (el) dockRefs.current.set(key, el);
      else dockRefs.current.delete(key);
    };
  }

  function dockScale(key: string): number {
    if (mouseX === null) return 1;
    const el = dockRefs.current.get(key);
    if (!el) return 1;
    const r = el.getBoundingClientRect();
    const center = r.left + r.width / 2;
    const dist = Math.abs(mouseX - center);
    const maxDist = 72;
    if (dist >= maxDist) return 1;
    return 1 + 0.25 * Math.cos((dist / maxDist) * (Math.PI / 2));
  }

  // ── Computed ───────────────────────────────────────────────────────────────

  const activeWindows = windows.filter((w) => w.open && !w.minimized);
  const topZ = activeWindows.length > 0 ? Math.max(...activeWindows.map((w) => w.z)) : 0;
  const allClosed = windows.every((w) => !w.open || w.minimized);

  // ── Colors ─────────────────────────────────────────────────────────────────

  const c = {
    outer:     dark ? "bg-slate-950" : "bg-[#eaf4fb]",
    bezel:     dark ? "bg-slate-900 ring-slate-700/40 shadow-slate-900/60" : "bg-slate-950 ring-slate-900/40 shadow-slate-900/40",
    notch:     dark ? "bg-slate-900" : "bg-slate-950",
    screen:    dark ? "bg-slate-800" : "bg-[#eaf4fb]",
    menubar:   dark ? "border-slate-700/60 bg-slate-900/85 text-slate-200 shadow-slate-900/20" : "border-slate-900/10 bg-white/70 text-slate-900 shadow-sky-900/10",
    menuHover: dark ? "hover:bg-white/10" : "hover:bg-slate-900/8",
    dropdown:  dark ? "border-slate-700 bg-slate-800/96 shadow-slate-900/60" : "border-slate-900/10 bg-white/90 shadow-sky-900/20",
    menuItem:  dark ? "text-slate-200 hover:bg-white/8" : "text-slate-800 hover:bg-cyan-50",
    divider:   dark ? "bg-slate-700" : "bg-slate-200",
    clockText: dark ? "text-slate-400" : "text-slate-600",
    dock:      dark ? "border-white/8 bg-slate-800/60 shadow-slate-900/40" : "border-white/70 bg-white/48 shadow-sky-900/20",
    dockMenu:  dark ? "bg-slate-700 text-cyan-400" : "bg-white text-cyan-700",
    emptyText: dark ? "text-cyan-400" : "text-cyan-700",
  };

  return (
    <main
      className={`relative h-screen w-full overflow-hidden p-3 sm:p-5 transition-colors duration-300 ${c.outer}`}
      role="application"
      aria-label="Santatraina OS"
    >
      {/* Outer background */}
      {dark
        ? <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.05),transparent_40%)]" />
        : <div className="pointer-events-none absolute inset-0 laptop-scene-bg" />
      }

      {/* Mac bezel */}
      <div className={`relative h-full overflow-hidden rounded-[28px] p-[10px] shadow-2xl ring-1 ${c.bezel}`}>

        {/* Notch */}
        <div className={`absolute left-1/2 top-[10px] z-[60] h-4 w-32 -translate-x-1/2 rounded-b-2xl sm:w-44 ${c.notch}`} aria-hidden="true" />

        {/* Screen */}
        <div className={`relative h-full overflow-hidden rounded-[18px] ${c.screen}`}>

          {/* Wallpaper */}
          {dark
            ? <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(14,165,233,0.12),transparent_35%),radial-gradient(circle_at_85%_80%,rgba(45,212,191,0.08),transparent_35%),linear-gradient(160deg,#0f172a,#1e293b)]" />
            : <>
                <div className="pointer-events-none absolute inset-0 os-wallpaper" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(14,165,233,0.2),transparent_30%),radial-gradient(circle_at_78%_18%,rgba(45,212,191,0.16),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.38),rgba(219,234,254,0.62))]" />
              </>
          }

          {/* ── Menubar ── */}
          <header
            className={`absolute left-0 right-0 top-0 z-50 flex h-7 items-center justify-between rounded-t-[18px] border-b px-2 text-[13px] shadow-lg backdrop-blur-2xl ${c.menubar}`}
          >
            <nav className="flex min-w-0 items-center gap-0.5" aria-label="Menu système">
              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                className={`grid h-6 w-7 shrink-0 place-items-center rounded-md text-[13px] font-black text-cyan-600 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${c.menuHover}`}
                aria-label="Ouvrir le menu Santatraina OS"
                aria-expanded={menuOpen}
                aria-haspopup="menu"
              >
                S
              </button>
              {["Santatraina OS", "File", "Edit", "View", "Window", "Help"].map((item, i) => (
                <button
                  key={item}
                  type="button"
                  className={`hidden h-6 rounded-md px-2 text-[13px] transition sm:block ${i === 0 ? "font-bold" : "font-medium"} ${c.menuHover}`}
                >
                  {item}
                </button>
              ))}
            </nav>

            {/* ── Dropdown ── */}
            {menuOpen && (
              <div
                role="menu"
                aria-label="Menu Santatraina OS"
                className={`absolute left-2 top-[calc(100%+6px)] w-72 overflow-hidden rounded-xl border p-1.5 shadow-2xl backdrop-blur-2xl ${c.dropdown}`}
              >
                <div className="flex items-center gap-3 px-3 py-2">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-cyan-500 text-base font-black text-white" aria-hidden="true">S</span>
                  <div>
                    <p className={`text-sm font-bold ${dark ? "text-slate-100" : "text-slate-950"}`}>Santatraina OS</p>
                    <p className="text-xs text-slate-500">Portfolio desktop</p>
                  </div>
                </div>
                <div className={`my-1 h-px ${c.divider}`} />
                {[
                  { label: "Open Portfolio",      hint: "WEB",  action: () => { openWindow("portfolio", PORTFOLIO_URL, "Portfolio Browser"); setMenuOpen(false); } },
                  { label: "New browser window",  hint: "⌘N",  action: () => { openWindow(`win-${Date.now()}`, PORTFOLIO_URL, "Browser"); setMenuOpen(false); } },
                  { label: dark ? "Light mode" : "Dark mode", hint: dark ? "☀" : "🌙", action: () => { toggleDark(); setMenuOpen(false); } },
                ].map(({ label, hint, action }) => (
                  <button key={label} type="button" role="menuitem" onClick={action}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${c.menuItem}`}>
                    <span>{label}</span>
                    <span className={`text-xs ${dark ? "text-slate-500" : "text-slate-400"}`}>{hint}</span>
                  </button>
                ))}
                <div className={`my-1 h-px ${c.divider}`} />
                <a href="/CV.pdf" role="menuitem" onClick={() => setMenuOpen(false)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${c.menuItem}`}>
                  <span>Open CV</span>
                  <span className={`text-xs ${dark ? "text-slate-500" : "text-slate-400"}`}>PDF</span>
                </a>
                <a href="mailto:sinrandry@gmail.com" role="menuitem" onClick={() => setMenuOpen(false)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${c.menuItem}`}>
                  <span>Contact</span>
                  <span className={`text-xs ${dark ? "text-slate-500" : "text-slate-400"}`}>@</span>
                </a>
              </div>
            )}

            {/* Right side */}
            <div className={`flex items-center gap-2 text-xs ${c.clockText}`}>
              <button
                type="button"
                onClick={toggleDark}
                className={`hidden h-5 w-5 items-center justify-center rounded transition sm:flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${c.menuHover}`}
                aria-label={dark ? "Passer en mode clair" : "Passer en mode sombre"}
                aria-pressed={dark}
              >
                {dark ? "☀" : "🌙"}
              </button>
              <span className="hidden sm:inline" aria-hidden="true">Wi-Fi</span>
              <span className="hidden sm:inline" aria-hidden="true">100%</span>
              <span className="hidden font-mono opacity-50 sm:inline" aria-label={`Version ${process.env.NEXT_PUBLIC_VERSION}`}>v{process.env.NEXT_PUBLIC_VERSION}</span>
              <Clock />
            </div>
          </header>

          {/* ── Desktop area ── */}
          <section
            className="absolute inset-x-0 overflow-hidden"
            style={{ top: 28, bottom: 88 }}
            aria-label="Bureau"
            onClick={() => menuOpen && setMenuOpen(false)}
          >
            {activeWindows.map((win) => (
              <BrowserWindow
                key={win.id}
                win={win}
                dark={dark}
                active={win.z === topZ}
                onClose={closeWindow}
                onMinimize={minimizeWindow}
                onMaximize={maximizeWindow}
                onFocus={focusWindow}
                onMove={moveWindow}
                onNavigate={navigateWindow}
                onReload={reloadWindow}
              />
            ))}

            {allClosed && (
              <div className="grid h-full place-items-center">
                <div className="text-center">
                  <p className={`font-mono text-xs uppercase tracking-[0.24em] ${c.emptyText}`}>
                    Toutes les fenêtres sont fermées
                  </p>
                  <button
                    type="button"
                    onClick={() => openWindow("portfolio", PORTFOLIO_URL, "Portfolio Browser")}
                    className="mt-4 rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-black text-white transition hover:bg-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
                  >
                    Ouvrir le Portfolio
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* ── Dock ── */}
          <footer
            className={`absolute bottom-3 left-1/2 z-50 flex -translate-x-1/2 items-end gap-1.5 rounded-[24px] border px-2 py-1.5 shadow-2xl backdrop-blur-2xl ${c.dock}`}
            aria-label="Dock"
            onMouseMove={(e) => setMouseX(e.clientX)}
            onMouseLeave={() => setMouseX(null)}
          >
            {/* S / Menu */}
            <button
              type="button"
              ref={dockRef("menu")}
              onClick={() => setMenuOpen((o) => !o)}
              className={`group relative grid h-14 w-14 place-items-center rounded-[18px] text-base font-black shadow-lg ring-1 ring-slate-900/10 transition-transform duration-100 ${c.dockMenu}`}
              style={{ transform: `scale(${dockScale("menu")})`, transformOrigin: "bottom center" }}
              aria-label="Menu Santatraina OS"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
            >
              S
              <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-950/90 px-2 py-1 text-[11px] text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100" aria-hidden="true">
                Menu
              </span>
            </button>

            <div className="mx-0.5 mb-2 h-9 w-px bg-slate-900/15" aria-hidden="true" />

            {DOCK_ITEMS.map((item) => {
              const win = windows.find((w) => w.id === item.id);
              const isOpen = win?.open && !win?.minimized;
              const isMin  = win?.minimized;
              return (
                <button
                  key={item.id}
                  type="button"
                  ref={dockRef(item.id)}
                  onClick={() => openWindow(item.id, item.url, item.title)}
                  className={`group relative grid h-14 w-14 place-items-center rounded-[18px] ${item.bg} ${item.text} text-xs font-black shadow-lg transition-transform duration-100`}
                  style={{ transform: `scale(${dockScale(item.id)})`, transformOrigin: "bottom center" }}
                  aria-label={item.label}
                >
                  <span aria-hidden="true">{item.icon}</span>
                  {isOpen && <span className="absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-white/60" aria-hidden="true" />}
                  {isMin  && <span className="absolute -bottom-1 h-1.5 w-6 rounded-full bg-amber-200"  aria-hidden="true" />}
                  <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-950/90 px-2 py-1 text-[11px] text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100" aria-hidden="true">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </footer>

        </div>
      </div>
    </main>
  );
}
