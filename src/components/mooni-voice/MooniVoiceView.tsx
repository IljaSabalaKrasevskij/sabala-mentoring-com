"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal, TiltCard, Eyebrow } from "@/components/akademie/shared";

/* Mooni Voice: Premium-Produktseite im Sabala-Hausstil.
   12 Sektionen, Story-Bogen: Hook > Schmerz > Erleichterung > Beweis (Use Cases)
   > Zahlen > Vertrauen > Tiefe > Vergleich > Mensch > Download > FAQ > Abschluss.
   Motion komplett CSS-first (Compositor-Thread): laeuft auch in Browsern, die
   requestAnimationFrame drosseln (Comet u. a.). Kein Canvas, kein rAF. */

const AMBER = "#E8A33D";
const AMBER_HI = "#F2C572";
const AMBER_SOFT = "rgba(232,163,61,0.16)";
const DMG_URL =
  "https://github.com/IljaSabalaKrasevskij/mooni-voice/releases/download/v0.8.3/Mooni.Voice_0.8.3_aarch64.dmg";
const REPO_URL = "https://github.com/IljaSabalaKrasevskij/mooni-voice";

/* ── CSS-Keyframes für alle Motion-Bausteine (kein styled-jsx, plain <style>) ── */
const MV_CSS = `
.mv-bar{transform-origin:50% 50%;animation:mv-eq var(--d,1.6s) ease-in-out infinite;animation-delay:var(--dl,0s)}
@keyframes mv-eq{0%,100%{transform:scaleY(var(--min,.22))}50%{transform:scaleY(1)}}
.mv-key{animation:mv-press 3s cubic-bezier(.4,0,.2,1) infinite}
.mv-key-b{animation-delay:.1s}
@keyframes mv-press{0%,58%,100%{transform:translateY(0);box-shadow:0 5px 0 rgba(232,163,61,.3),0 12px 26px rgba(0,0,0,.45)}66%,84%{transform:translateY(4px);box-shadow:0 1px 0 rgba(232,163,61,.3),0 4px 10px rgba(0,0,0,.35)}}
.mv-dash{height:2px;background-image:repeating-linear-gradient(90deg,rgba(232,163,61,.8) 0 9px,transparent 9px 17px);background-size:26px 2px;animation:mv-dash 1.05s linear infinite}
@keyframes mv-dash{to{background-position:26px 0}}
.mv-caret{animation:mv-caret 1.05s steps(1) infinite}
@keyframes mv-caret{0%,49%{opacity:1}50%,100%{opacity:0}}
.mv-ring{animation:mv-ring 2.4s ease-out infinite}
@keyframes mv-ring{0%{transform:scale(.85);opacity:.6}75%,100%{transform:scale(1.35);opacity:0}}
.mv-grow{transition:width 1.15s cubic-bezier(.16,1,.3,1)}
/* Bewusste Betreiber-Entscheidung: die dekorativen Mikro-Animationen (kleine,
   ortsfeste Bewegungen) laufen auch bei "Bewegung reduzieren" weiter, nur in
   sanfterer Gangart. Grund: macOS-Reduce-Motion ist beim Betreiber selbst aktiv
   und wuerde die Marken-Animationen sonst komplett abschalten. */
@media (prefers-reduced-motion:reduce){
  .mv-bar{animation-duration:calc(var(--d,1.6s)*1.9)}
  .mv-key{animation-duration:5s}
  .mv-ring{animation-duration:3.6s}
  .mv-dash{animation-duration:2.2s}
}`;

/* ── Inline-SVG-Icons (Lucide-Stil, einheitlicher Stroke 1.7) ───────────── */
const PATHS: Record<string, string> = {
  layers: "M12 2 2 7l10 5 10-5-10-5Z M2 17l10 5 10-5 M2 12l10 5 10-5",
  lock: "M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0v4",
  zap: "M13 2 3 14h7l-1 8 10-12h-7l1-8Z",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z M14 2v6h6 M9 13h6 M9 17h6",
  cpu: "M6 6h12v12H6z M9 9h6v6H9z M9 2v2 M15 2v2 M9 20v2 M15 20v2 M2 9h2 M2 15h2 M20 9h2 M20 15h2",
  code: "M16 18l6-6-6-6 M8 6l-6 6 6 6",
  cloud: "M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.7-1.5A4 4 0 0 0 6 19h11.5Z M4 4l16 16",
  terminal: "M4 17l6-6-6-6 M12 19h8",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z M12 6v6l4 2",
  mic: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v3",
  github: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-1-2.6c3-.3 6-1.5 6-6.5a5 5 0 0 0-1.4-3.5 4.7 4.7 0 0 0-.1-3.5s-1.1-.3-3.5 1.3a12 12 0 0 0-6.4 0C6.3.7 5.2 1 5.2 1a4.7 4.7 0 0 0-.1 3.5A5 5 0 0 0 3.7 8c0 5 3 6.2 6 6.5a3.4 3.4 0 0 0-1 2.6V21",
  mail: "M4 6h16v12H4z M4 7l8 6 8-6",
  pen: "M12 20h9 M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z",
  chat: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z",
  globe: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z",
  check: "M20 6 9 17l-5-5",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z",
};
function Ic({ name, size = 22, color = AMBER, stroke = 1.7 }: { name: string; size?: number; color?: string; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {PATHS[name].split(" M").map((d, i) => (
        <path key={i} d={i === 0 ? d : "M" + d} />
      ))}
    </svg>
  );
}

/* Mooni-Roboterkopf-Logo */
function MooniLogo({ size = 96 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 1024 1024" aria-hidden style={{ filter: "drop-shadow(0 0 24px rgba(232,163,61,0.35))" }}>
      <rect x="100" y="100" width="824" height="824" rx="185" fill="#1E1B2E" />
      <rect x="499" y="219" width="26" height="80" rx="13" fill={AMBER} />
      <circle cx="512" cy="188" r="30" fill={AMBER} />
      <rect x="273" y="295" width="478" height="420" rx="146" fill="#F5F2EC" />
      <polygon points="372,700 372,786 452,706" fill="#F5F2EC" />
      <circle cx="442" cy="470" r="55" fill={AMBER} />
      <circle cx="582" cy="470" r="55" fill={AMBER} />
      <circle cx="423" cy="448" r="19" fill="#fff" />
      <circle cx="563" cy="448" r="19" fill="#fff" />
    </svg>
  );
}

/* ── Runder Gold-CTA im Sabala-Hausstil (Buttons sind nie eckig) ────────── */
function MooniCTA({ href, children, large = false }: { href: string; children: React.ReactNode; large?: boolean }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-3 rounded-full font-sans font-semibold transition-all duration-300"
      style={{
        background: AMBER,
        color: "#1a1206",
        letterSpacing: "0.02em",
        padding: large ? "17px 38px" : "14px 30px",
        fontSize: large ? "1.05rem" : "0.95rem",
        boxShadow: "0 14px 34px rgba(232,163,61,0.28)",
      }}
      onMouseEnter={(e) => {
        const t = e.currentTarget;
        t.style.background = AMBER_HI;
        t.style.transform = "translateY(-2px)";
        t.style.boxShadow = "0 20px 46px rgba(232,163,61,0.38)";
      }}
      onMouseLeave={(e) => {
        const t = e.currentTarget;
        t.style.background = AMBER;
        t.style.transform = "none";
        t.style.boxShadow = "0 14px 34px rgba(232,163,61,0.28)";
      }}
    >
      {children}
      <svg width="18" height="12" viewBox="0 0 20 12" fill="none" className="transition-transform group-hover:translate-x-1">
        <path d="M0 6h18M13 1l5 5-5 5" stroke="#1a1206" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

/* ── Voice-Wave, rein CSS-animiert. Laeuft ueberall, auch wenn der Browser
   requestAnimationFrame pausiert (Comet, Energiesparmodus, Hintergrund-Tabs).
   Hoehen + Delays deterministisch aus dem Index (SSR-stabil, kein random). ── */
function Wave({ height = 120, bars = 56, className = "" }: { height?: number; bars?: number; className?: string }) {
  return (
    <div className={className} aria-hidden style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 3, height }}>
      {Array.from({ length: bars }).map((_, i) => {
        const env = Math.sin((i / (bars - 1)) * Math.PI); // Huellkurve: Mitte hoch
        const jitter = 0.4 + 0.6 * Math.abs(Math.sin(i * 1.7) * 0.6 + Math.sin(i * 0.43) * 0.4);
        // Alle Werte fest gerundet: Browser-CSSOM kuerzt Floats, volle JS-Praezision
        // wuerde beim Hydrieren nicht mehr matchen (SSR-Mismatch).
        const h = Math.round(Math.max(4, env * height * jitter));
        const dur = (1.15 + ((i * 37) % 40) / 55).toFixed(2);
        const delay = (-(((i * 53) % 100) / 62)).toFixed(2);
        const min = (0.16 + env * 0.14).toFixed(3);
        return (
          <span
            key={i}
            className="mv-bar"
            style={{
              width: 3,
              height: h,
              borderRadius: 99,
              background: `linear-gradient(180deg, ${AMBER_HI} 0%, rgba(232,163,61,0.22) 100%)`,
              ...( { "--d": `${dur}s`, "--dl": `${delay}s`, "--min": min } as React.CSSProperties),
            }}
          />
        );
      })}
    </div>
  );
}

/* ── Tastenkuerzel-Visual: ⌥ + Leertaste mit CSS-Druck-Animation ─────────── */
function KeyCaps({ compact = false }: { compact?: boolean }) {
  const base: React.CSSProperties = {
    background: "#16121f",
    border: "1px solid rgba(232,163,61,0.4)",
    color: "#F5F2EC",
    borderRadius: 12,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  };
  const pad = compact ? "10px 16px" : "16px 24px";
  const font = compact ? 13 : 16;
  return (
    <div aria-hidden className="flex items-center justify-center gap-3">
      <span className="mv-key font-mono" style={{ ...base, padding: pad, fontSize: font }}>
        <span style={{ color: AMBER }}>⌥</span> Option
      </span>
      <span className="font-mono" style={{ color: "#8b84a0", fontSize: font }}>+</span>
      <span className="mv-key mv-key-b font-mono" style={{ ...base, padding: pad, fontSize: font, minWidth: compact ? 110 : 150 }}>
        Leertaste
      </span>
    </div>
  );
}

/* ── TypeLine: eine Zeile, die sich in Schleife selbst tippt ─────────────── */
function TypeLine({ text, speed = 42, pause = 2400, className, style }: { text: string; speed?: number; pause?: number; className?: string; style?: React.CSSProperties }) {
  const [n, setN] = useState(0);
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    setN(0);
    let j = 0;
    let restart: ReturnType<typeof setTimeout>;
    const iv = setInterval(() => {
      j += 1;
      setN(j);
      if (j >= text.length) {
        clearInterval(iv);
        restart = setTimeout(() => setCycle((c) => c + 1), pause);
      }
    }, speed);
    return () => {
      clearInterval(iv);
      clearTimeout(restart);
    };
  }, [text, speed, pause, cycle]);
  return (
    <p className={className} style={style}>
      {text.slice(0, n)}
      <span className="mv-caret ml-0.5 inline-block h-[1em] w-[2px] align-middle" style={{ background: AMBER }} />
    </p>
  );
}

/* ── CountUp: Zahl zaehlt hoch, sobald sichtbar (IO + setInterval, kein rAF) ── */
function CountUp({ to, duration = 1300, className, style }: { to: number; duration?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let iv: ReturnType<typeof setInterval>;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || started.current) return;
        started.current = true;
        io.disconnect();
        const t0 = Date.now();
        iv = setInterval(() => {
          const p = Math.min(1, (Date.now() - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setV(Math.round(to * eased));
          if (p >= 1) clearInterval(iv);
        }, 24);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(iv);
    };
  }, [to, duration]);
  return (
    <span ref={ref} className={className} style={style}>
      {v}
    </span>
  );
}

/* ── BarRace: getippt vs. gesprochen, Breite waechst beim Reinscrollen ───── */
function BarRace() {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const rows = [
    { label: "Getippt", time: "≈ 2:30 min", pct: 100, bg: "rgba(46,43,38,0.25)", color: "var(--deep)" },
    { label: "Mit Mooni gesprochen", time: "≈ 0:40 min", pct: 27, bg: `linear-gradient(90deg, ${AMBER}, ${AMBER_HI})`, color: "var(--deep)" },
  ];
  return (
    <div ref={ref}>
      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--warm-mid)" }}>
        Eine Antwort mit 100 Wörtern
      </p>
      <div className="flex flex-col gap-4">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="mb-1.5 flex items-baseline justify-between text-[14px]">
              <span style={{ color: r.color }}>{r.label}</span>
              <span className="font-mono text-[12px]" style={{ color: "var(--warm-mid)" }}>{r.time}</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full" style={{ background: "rgba(46,43,38,0.08)" }}>
              <div className="mv-grow h-full rounded-full" style={{ width: seen ? `${r.pct}%` : "0%", background: r.bg }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Use-Case-Schalter: 6 Alltagsszenen, tippen sich live ins Fenster ────── */
const CASES = [
  {
    icon: "code", label: "Claude Code", tag: "Prompts, so lang wie dein Gedanke",
    app: "Claude Code", prompt: "> ",
    text: "refactor die Lead-API, blocke Wegwerf-Mails und schreib mir Tests dazu",
    saved: "getippt ≈ 50 s · gesprochen ≈ 12 s",
  },
  {
    icon: "terminal", label: "Terminal", tag: "Commits und Befehle im Sprechtempo",
    app: "Terminal", prompt: "~ $ ",
    text: "git commit -m \"Formular gehärtet, Download bleibt gratis\"",
    saved: "getippt ≈ 25 s · gesprochen ≈ 7 s",
  },
  {
    icon: "chat", label: "LinkedIn", tag: "Kommentare und DMs ohne Aufschieben",
    app: "LinkedIn", prompt: "",
    text: "Danke dir! Genau darum ging es mir. Lass uns nächste Woche kurz telefonieren.",
    saved: "getippt ≈ 90 s · gesprochen ≈ 25 s",
  },
  {
    icon: "mail", label: "E-Mail", tag: "Antworten diktieren, lesen, senden",
    app: "Mail", prompt: "",
    text: "Hallo Frau Brendel, danke für Ihre Nachricht. Donnerstag um 14 Uhr passt bei mir.",
    saved: "getippt ≈ 2 min · gesprochen ≈ 35 s",
  },
  {
    icon: "pen", label: "Notizen", tag: "Ideen festhalten, bevor sie weg sind",
    app: "Notizen", prompt: "",
    text: "Newsletter-Idee: die Geschichte hinter dem Mooni-Formular erzählen",
    saved: "getippt ≈ 30 s · gesprochen ≈ 8 s",
  },
  {
    icon: "globe", label: "ChatGPT & Claude", tag: "Prompts sprechen statt tippen",
    app: "claude.ai", prompt: "",
    text: "Erklär mir in zwei Sätzen, was Parakeet von Whisper unterscheidet.",
    saved: "getippt ≈ 40 s · gesprochen ≈ 10 s",
  },
];

function UseCases() {
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);
  const cur = CASES[idx];

  useEffect(() => {
    setDone(false);
    setShown("");
    let j = 0;
    let advance: ReturnType<typeof setTimeout>;
    const iv = setInterval(() => {
      j += 1;
      setShown(cur.text.slice(0, j));
      if (j >= cur.text.length) {
        clearInterval(iv);
        setDone(true);
        advance = setTimeout(() => setIdx((v) => (v + 1) % CASES.length), 2300);
      }
    }, 38);
    return () => {
      clearInterval(iv);
      clearTimeout(advance);
    };
  }, [idx, cur.text]);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,340px)_1fr] lg:items-stretch lg:gap-8">
      {/* Tab-Liste */}
      <div className="flex snap-x gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0" role="tablist" aria-label="Einsatz-Beispiele">
        {CASES.map((c, i) => {
          const active = i === idx;
          return (
            <button
              key={c.label}
              role="tab"
              aria-selected={active}
              onClick={() => setIdx(i)}
              className="shrink-0 snap-start rounded-xl px-4 py-3 text-left transition-all lg:w-full"
              style={{
                background: active ? "#FFFFFF" : "transparent",
                border: `1px solid ${active ? "rgba(184,150,62,0.45)" : "rgba(181,176,168,0.3)"}`,
                boxShadow: active ? "0 12px 30px rgba(46,43,38,0.08)" : "none",
              }}
            >
              <span className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: active ? "rgba(184,150,62,0.12)" : "rgba(46,43,38,0.05)" }}>
                  <Ic name={c.icon} size={17} color={active ? "var(--gold)" : "var(--warm-mid)"} />
                </span>
                <span>
                  <span className="block text-[15px] font-semibold" style={{ color: "var(--deep)" }}>{c.label}</span>
                  <span className="hidden text-[13px] sm:block" style={{ color: "var(--warm-mid)" }}>{c.tag}</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Demo-Fenster (fuellt die Hoehe der Tab-Liste) + CTA rechts darunter */}
      <div className="flex flex-col">
        <div className="flex flex-1 flex-col overflow-hidden rounded-2xl" style={{ background: "#0a0810", border: "1px solid rgba(232,163,61,0.22)", boxShadow: "0 40px 90px rgba(0,0,0,0.35)" }}>
          <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#13101c", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
            <span className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
            <span className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
            <span className="ml-2 font-mono text-[11px]" style={{ color: "#8b84a0" }}>{cur.app}</span>
          </div>
          <div className="flex flex-1 flex-col px-6 py-6 font-mono text-[13px] leading-relaxed sm:text-sm" style={{ color: "#F5F2EC" }}>
            <p className="break-words">
              <span style={{ color: AMBER }}>{cur.prompt}</span>
              <span>{shown}</span>
              <span className="mv-caret ml-0.5 inline-block h-4 w-2 align-middle" style={{ background: AMBER }} />
            </p>
            <div className="mt-auto flex items-center gap-2 pt-8 font-sans text-[12px]" style={{ color: done ? AMBER : "#8b84a0" }}>
              {done ? (
                <>
                  <Ic name="check" size={14} />
                  steht da.
                </>
              ) : (
                <>
                  <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                    <span className="mv-ring absolute inset-0 rounded-full" style={{ border: `1.5px solid ${AMBER}` }} />
                    <Ic name="mic" size={13} />
                  </span>
                  höre zu …
                </>
              )}
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
          <p className="font-mono text-[12px] tracking-[0.06em]" style={{ color: "var(--warm-mid)" }}>
            {cur.saved}
          </p>
          <MooniCTA href="#download">Probier es selbst</MooniCTA>
        </div>
      </div>
    </div>
  );
}

/* ── App-Fenster-Mockup: die echte dunkle Mooni-Oberflaeche ──────────────── */
const NAV = ["Allgemein", "Modelle", "Erweitert", "Verlauf", "Nachbearbeitung", "Info"];
function AppMockup() {
  return (
    <div className="overflow-hidden rounded-2xl" style={{ background: "#15131F", border: "1px solid rgba(232,163,61,0.22)", boxShadow: "0 40px 90px rgba(0,0,0,0.55)" }}>
      <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#1b1827", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
        <span className="mx-auto font-mono text-[11px]" style={{ color: "#8b84a0" }}>Mooni Voice</span>
      </div>
      <div className="flex" style={{ minHeight: 232 }}>
        <div className="hidden w-[40%] flex-col gap-1 p-3 sm:flex" style={{ borderRight: "1px solid rgba(255,255,255,0.05)" }}>
          {NAV.map((n) => {
            const active = n === "Nachbearbeitung";
            return (
              <div key={n} className="rounded-lg px-3 py-2 text-[12px]"
                style={active
                  ? { background: AMBER, color: "#1a1206", fontWeight: 600 }
                  : { color: "#9b93ac" }}>
                {n}
              </div>
            );
          })}
        </div>
        <div className="flex-1 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: AMBER }}>Live-Kontext (Mooni)</p>
          <div className="mt-3 rounded-lg px-3 py-2.5 text-[12px]" style={{ background: "rgba(255,255,255,0.05)", color: "#cfc9da" }}>
            ~/Documents/mooni-context.md
          </div>
          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "#6f6886" }}>Aufnahme</p>
          <div className="mt-3 flex h-[64px] items-center justify-center rounded-lg px-3" style={{ background: "rgba(0,0,0,0.25)" }}>
            <Wave height={44} bars={30} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Daten-Fluss (Privatsphaere): Mikro > dein Mac > Cursor ──────────────── */
function FlowDiagram() {
  const node: React.CSSProperties = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(232,163,61,0.28)",
    borderRadius: 16,
    padding: "18px 22px",
    textAlign: "center",
  };
  return (
    <div>
      <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
        <div style={node} className="md:flex-1">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full" style={{ border: `1.5px solid ${AMBER}` }}>
              <span className="mv-ring absolute inset-0 rounded-full" style={{ border: `1.5px solid ${AMBER}` }} />
              <Ic name="mic" size={18} />
            </span>
          </div>
          <p className="text-[15px] font-semibold" style={{ color: "#F5F2EC" }}>Deine Stimme</p>
          <p className="mt-1 text-[13px]" style={{ color: "#b8b1c2" }}>Mikrofon an, sprechen</p>
        </div>
        <div className="mv-dash mx-auto h-[2px] w-16 shrink-0 md:w-14" aria-hidden />
        <div style={{ ...node, borderColor: "rgba(232,163,61,0.5)", background: "rgba(232,163,61,0.08)" }} className="md:flex-[1.3]">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "rgba(232,163,61,0.14)" }}>
            <Ic name="cpu" size={20} />
          </div>
          <p className="text-[15px] font-semibold" style={{ color: "#F5F2EC" }}>Dein Mac</p>
          <p className="mt-1 text-[13px]" style={{ color: "#b8b1c2" }}>Parakeet oder Whisper, komplett lokal</p>
        </div>
        <div className="mv-dash mx-auto h-[2px] w-16 shrink-0 md:w-14" aria-hidden />
        <div style={node} className="md:flex-1">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center font-mono text-lg" style={{ color: AMBER }}>
            <span>T</span>
            <span className="mv-caret ml-0.5 inline-block h-5 w-[2px]" style={{ background: AMBER }} />
          </div>
          <p className="text-[15px] font-semibold" style={{ color: "#F5F2EC" }}>Dein Text</p>
          <p className="mt-1 text-[13px]" style={{ color: "#b8b1c2" }}>steht da, wo der Cursor blinkt</p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.16em]" style={{ color: "#8b84a0" }}>
        <Ic name="cloud" size={16} color="#8b84a0" />
        Kein Server. Kein Konto. Kein Abo.
      </div>
    </div>
  );
}

/* ── Inhalts-Daten ──────────────────────────────────────────────────────── */
const PROBLEMS = [
  { icon: "terminal", title: "Kein Diktat, wo du arbeitest", body: "Claude Code, Terminal, Cursor: genau da, wo du am meisten schreibst, gibt es keine Stimme. Das Mac-Diktat kennt deine Tools nicht." },
  { icon: "cloud", title: "Diktier-Apps wollen deine Stimme", body: "Viele Tools schicken dein Audio an fremde Server. Für Kundenmails, Code und halbfertige Ideen ist das kein guter Deal." },
  { icon: "clock", title: "Der Gedanke wartet nicht", body: "Bis die Antwort getippt ist, ist der nächste Gedanke schon weg. Sprechen hält dein Denktempo, Tippen bremst es aus." },
];
const FEATURES = [
  { icon: "file", title: "Live-Kontext-Datei", body: "Verknüpf z. B. deine CLAUDE.md. Mooni liest sie bei der Politur live mit, damit Eigennamen und dein Stil sitzen." },
  { icon: "cpu", title: "Dein Modell, deine Wahl", body: "Parakeet (25 europäische Sprachen, Auto-Erkennung) oder Whisper (rund 99 Sprachen). Einmal laden, für immer offline." },
  { icon: "zap", title: "KI-Politur, lokal", body: "Ein Ollama-Modell räumt Füllwörter und Satzzeichen auf. Optional, und auch das läuft komplett auf deinem Gerät." },
  { icon: "layers", title: "Wirklich überall", body: "Systemweites Tastenkürzel. Jedes Textfeld, jede App: Browser, Mail, IDE, Terminal. Ohne Fenster-Wechsel." },
  { icon: "pen", title: "Eigenes Vokabular", body: "Bring Mooni deine Namen und Fachbegriffe bei. Einmal eintragen, ab dann immer richtig geschrieben." },
  { icon: "code", title: "Open Source, MIT", body: "Ein Fork von Handy (cjpais), weitergedacht. Kein Abo, kein Konto, der Code liegt offen auf GitHub." },
];
const STEPS = [
  { n: "1", title: "Laden", body: "Unten eintragen, DMG laden und Mooni Voice in den Ordner Programme ziehen." },
  { n: "2", title: "Öffnen", body: "Beim ersten Start: Rechtsklick auf die App, dann Öffnen. Einmalig, danach startet sie normal." },
  { n: "3", title: "Sprechen", body: "Mikrofon erlauben, Modell laden. Dann Option + Leertaste halten und loslegen." },
];
const FAQ = [
  { q: "Ist Mooni Voice wirklich gratis?", a: "Ja. Kein Abo, kein Konto, keine versteckte Pro-Version. Sabala verdient mit Webseiten und KI-Systemen, nicht mit deiner Stimme. Mooni Voice ist unser Open-Source-Beitrag und bleibt gratis." },
  { q: "Ist meine Stimme wirklich privat?", a: "Ja. Die Spracherkennung läuft komplett offline auf deinem Mac. Es gibt keinen Server, an den etwas gehen könnte. Du kannst das im Quellcode auf GitHub nachlesen." },
  { q: "Läuft es auf meinem Mac?", a: "Du brauchst einen Mac mit Apple-Chip (M1 oder neuer) und macOS 14. Für Windows und Linux schau dir das Original Handy an, von dem Mooni Voice abstammt." },
  { q: "Welche Sprachen versteht es?", a: "Mit Parakeet: Deutsch, Englisch und 23 weitere europäische Sprachen, automatisch erkannt. Du darfst mitten im Satz mischen. Mit Whisper Large sind es rund 99 Sprachen." },
  { q: "macOS zeigt beim ersten Start eine Warnung. Ist das normal?", a: "Ja. Die App ist nicht bei Apple notarisiert, das kostet eine Entwickler-Mitgliedschaft und ändert nichts am Code. Einmal Rechtsklick auf die App, dann Öffnen. Danach startet sie wie jede andere." },
  { q: "Warum soll ich meine E-Mail dalassen?", a: "Der Download ist ein fairer Tausch: App gegen E-Mail. Geschrieben wird dir nur, wenn du beim Newsletter den Haken setzt. Wegwerf-Adressen sortiert das Formular aus." },
  { q: "Was sind KI-Politur und Live-Kontext?", a: "Profi-Features, beide optional: Ein lokales Ollama-Modell räumt Füllwörter und Satzzeichen auf. Und eine verknüpfte Datei (z. B. deine CLAUDE.md) sorgt dafür, dass Eigennamen und dein Stil sitzen. Fürs normale Diktieren brauchst du beides nicht." },
  { q: "Kann ich den Code sehen und mitbauen?", a: "Ja. Alles liegt öffentlich auf GitHub unter MIT-Lizenz. Issues und Pull Requests sind willkommen." },
];

function errorMessage(status: number, reason: string): string {
  if (status === 429) return "Zu viele Versuche. Bitte kurz warten und noch mal probieren.";
  if (reason === "email_disposable")
    return "Bitte nutz eine echte, dauerhafte E-Mail. Wegwerf-Adressen können wir nicht annehmen.";
  if (reason === "email") return "Diese E-Mail sieht nicht gültig aus. Bitte prüf sie noch mal.";
  if (reason === "name") return "Bitte gib deinen Namen an.";
  return "Bitte prüf Name und E-Mail und versuch es noch mal.";
}

export default function MooniVoiceView() {
  const [vorname, setVorname] = useState("");
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [fax, setFax] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const downloadRef = useRef<HTMLAnchorElement>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/mooni-voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vorname, email, newsletter, fax }),
      });
      // 4xx = echte Ablehnung (Fake-Name / kaputte oder Wegwerf-Mail): KEIN Download.
      if (res.status >= 400 && res.status < 500) {
        let reason = "";
        try {
          reason = (await res.json())?.reason ?? "";
        } catch {
          /* leer lassen */
        }
        setBusy(false);
        setError(errorMessage(res.status, reason));
        return;
      }
      // 5xx: unser Serverfehler, der kostenlose Download scheitert daran nicht.
    } catch {
      // Netzwerkfehler: Download ebenfalls durchlassen (Leadmagnet, kein Zugangs-Gate).
    }
    setBusy(false);
    setDone(true);
    setTimeout(() => downloadRef.current?.click(), 300);
  }

  return (
    <main className="overflow-x-hidden" style={{ background: "var(--cream)", color: "var(--deep)" }}>
      <style>{MV_CSS}</style>

      {/* ── 1 · HERO (dunkel, CSS-Voice-Wave) ───────────────────────────── */}
      <section className="relative px-6 pb-24 pt-32 text-center" style={{ background: "var(--tech-bg)", color: "#F5F2EC" }}>
        <div className="pointer-events-none absolute left-1/2 top-0 h-[70vh] w-[95vw] -translate-x-1/2" style={{ background: `radial-gradient(ellipse at top, ${AMBER_SOFT}, transparent 62%)` }} />
        <div className="relative mx-auto max-w-3xl">
          <Reveal>
            <div className="animate-float-slow mx-auto mb-7 inline-block">
              <MooniLogo size={100} />
            </div>
          </Reveal>
          <Eyebrow color={AMBER}>Gratis · Open Source · 100 % lokal</Eyebrow>
          <Reveal delay={0.05}>
            <h1 className="mt-5 font-serif leading-[1.02]" style={{ fontSize: "clamp(2.7rem, 7.5vw, 5.2rem)", textShadow: "0 0 32px rgba(232,163,61,0.25)" }}>
              Sprich. Es steht da.<br />Überall.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-lg" style={{ color: "#b8b1c2" }}>
              Mooni Voice tippt, was du sagst. In jeder App auf deinem Mac, auch da,
              wo Diktieren nie funktioniert hat: Claude Code, Terminal, LinkedIn, Mail.
              Komplett offline.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.16}>
          <div className="relative mx-auto mt-10 max-w-2xl">
            <Wave height={130} bars={64} />
          </div>
        </Reveal>
        <Reveal delay={0.22}>
          <div className="mt-9 flex flex-col items-center gap-6">
            <MooniCTA href="#download" large>Kostenlos holen</MooniCTA>
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.08em] transition-opacity hover:opacity-80" style={{ color: AMBER }}>
              <Ic name="github" size={15} />
              Code auf GitHub ansehen
            </a>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "#8b84a0" }}>
              <span>100 % lokal</span><span>·</span><span>25 Sprachen</span><span>·</span><span>kein Abo</span><span>·</span><span>MIT-Lizenz</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── 2 · PROBLEM (cream, Story mit Zahlen-Anker) ─────────────────── */}
      <section className="px-6 py-[12vh]">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Kennst du das?</Eyebrow>
            <Reveal>
              <h2 className="mt-5 font-serif leading-[1.08]" style={{ fontSize: "clamp(2rem, 4.6vw, 3.4rem)" }}>
                Du denkst in 150 Wörtern pro Minute.<br />Und tippst 40.
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed" style={{ color: "var(--warm-mid)" }}>
                Der Gedanke ist fertig, aber die Finger brauchen noch zwei Minuten.
                Das passiert dir nicht einmal am Tag, sondern bei jeder Mail, jeder
                LinkedIn-Antwort, jedem Prompt. Lauter kleine Bremsen, die du gar
                nicht mehr bemerkst.
              </p>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {PROBLEMS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl p-7" style={{ background: "#FFFFFF", border: "1px solid rgba(181,176,168,0.3)" }}>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "rgba(184,150,62,0.10)" }}>
                    <Ic name={p.icon} color="var(--gold)" />
                  </div>
                  <h3 className="font-serif text-xl">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed" style={{ color: "var(--warm-mid)" }}>{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 · DER MOMENT (dunkel, Tasten + Wave + Typo) ───────────────── */}
      <section className="relative px-6 py-[13vh] text-center" style={{ background: "var(--tech-bg)", color: "#F5F2EC" }}>
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2" style={{ background: `radial-gradient(ellipse, ${AMBER_SOFT}, transparent 65%)` }} />
        <div className="relative mx-auto max-w-3xl">
          <Eyebrow color={AMBER}>So fühlt es sich an</Eyebrow>
          <Reveal>
            <h2 className="mt-5 font-serif leading-[1.06]" style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)", textShadow: "0 0 28px rgba(232,163,61,0.22)" }}>
              Halten. Sprechen.<br />Loslassen.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-12">
              <KeyCaps />
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mx-auto mt-8 max-w-md">
              <Wave height={64} bars={44} />
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <TypeLine
              text="…und der Text steht da, wo dein Cursor blinkt."
              className="mx-auto mt-8 min-h-[2em] max-w-xl font-serif text-xl sm:text-2xl"
              style={{ color: "#F5F2EC" }}
            />
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-md text-[15px]" style={{ color: "#8b84a0" }}>
              Ein Tastenkürzel, systemweit. Kein Fenster wechseln, kein Kopieren, kein Umweg.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 4 · USE CASES (cream, interaktiver Schalter) ────────────────── */}
      <section className="px-6 py-[12vh]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <Eyebrow>Im Alltag</Eyebrow>
            <Reveal>
              <h2 className="mt-5 font-serif leading-[1.1]" style={{ fontSize: "clamp(2rem, 4.4vw, 3.2rem)" }}>
                Ein Werkzeug, das überall mitgeht.
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mx-auto mt-5 max-w-2xl text-[16px]" style={{ color: "var(--warm-mid)" }}>
                Klick dich durch sechs Momente aus einem ganz normalen Arbeitstag.
                Überall gilt: reinsprechen statt tippen.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="mt-12">
              <UseCases />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 5 · ZEITRECHNUNG (warm-light Band, Zahlen + BarRace) ────────── */}
      <section className="px-6 py-[12vh]" style={{ background: "var(--warm-light)" }}>
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <Eyebrow>Rechne kurz mit</Eyebrow>
            <Reveal>
              <h2 className="mt-5 font-serif leading-[1.1]" style={{ fontSize: "clamp(2rem, 4.4vw, 3.2rem)" }}>
                Sprechen ist deine schnellste Tastatur.
              </h2>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {[
              { big: <><CountUp to={40} /></>, unit: "Wörter/Min", label: "so schnell tippst du" },
              { big: <><CountUp to={150} /></>, unit: "Wörter/Min", label: "so schnell sprichst du" },
              { big: <>3x</>, unit: "und mehr", label: "so viel schneller ist dein Text raus" },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06}>
                <div className="h-full rounded-2xl p-7 text-center" style={{ background: "#FFFFFF", border: "1px solid rgba(181,176,168,0.35)" }}>
                  <p className="font-serif" style={{ fontSize: "clamp(2.6rem, 5vw, 3.6rem)", color: "var(--gold)" }}>{s.big}</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: "var(--warm-mid)" }}>{s.unit}</p>
                  <p className="mt-3 text-[15px]" style={{ color: "var(--deep)" }}>{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <div className="mx-auto mt-10 max-w-2xl rounded-2xl p-8" style={{ background: "#FFFFFF", border: "1px solid rgba(181,176,168,0.35)" }}>
              <BarRace />
              <p className="mt-6 text-center text-[15px]" style={{ color: "var(--warm-mid)" }}>
                Bei 15 Antworten am Tag holst du dir rund eine halbe Stunde zurück. Jeden Tag.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 6 · PRIVATSPHÄRE (dunkel, Datenfluss) ───────────────────────── */}
      <section className="relative px-6 py-[13vh]" style={{ background: "var(--tech-bg)", color: "#F5F2EC" }}>
        <div className="pointer-events-none absolute left-1/2 top-0 h-[50vh] w-[85vw] -translate-x-1/2" style={{ background: `radial-gradient(ellipse at top, ${AMBER_SOFT}, transparent 68%)` }} />
        <div className="relative mx-auto max-w-4xl">
          <div className="text-center">
            <Eyebrow color={AMBER}>Privatsphäre</Eyebrow>
            <Reveal>
              <h2 className="mt-5 font-serif leading-[1.08]" style={{ fontSize: "clamp(2rem, 4.6vw, 3.4rem)", textShadow: "0 0 28px rgba(232,163,61,0.22)" }}>
                Deine Stimme verlässt<br />deinen Mac nie.
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mx-auto mt-5 max-w-xl text-[16px]" style={{ color: "#b8b1c2" }}>
                Der komplette Weg vom Wort zum Text passiert auf deinem Gerät.
                Das ist kein Versprechen, das ist die Architektur.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="mt-12">
              <FlowDiagram />
            </div>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-10 text-center">
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.08em] transition-opacity hover:opacity-80" style={{ color: AMBER }}>
                <Ic name="github" size={15} />
                Lies es im Quellcode nach
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 7 · UNTER DER HAUBE (cream, Mockup + Feature-Karten) ────────── */}
      <section className="px-6 py-[12vh]">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <div>
                <Eyebrow center={false}>Unter der Haube</Eyebrow>
                <h2 className="mt-5 font-serif leading-[1.1]" style={{ fontSize: "clamp(2rem, 4.4vw, 3.2rem)" }}>
                  Bewusst schlicht.<br />Bewusst deins.
                </h2>
                <p className="mt-5 max-w-md text-[16px] leading-relaxed" style={{ color: "var(--warm-mid)" }}>
                  Ein Fenster, klare Einstellungen, dunkles Theme. Du wählst das Modell,
                  verknüpfst auf Wunsch deine Kontext-Datei, und dann verschwindet Mooni
                  in der Menüleiste und arbeitet einfach.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}><AppMockup /></Reveal>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.05}>
                <TiltCard className="h-full" radius={18}>
                  <div className="h-full rounded-[18px] p-7" style={{ background: "#FFFFFF", border: "1px solid rgba(181,176,168,0.3)" }}>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "rgba(184,150,62,0.10)" }}>
                      <Ic name={b.icon} color="var(--gold)" />
                    </div>
                    <h3 className="font-serif text-xl">{b.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed" style={{ color: "var(--warm-mid)" }}>{b.body}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8 · VERGLEICH (cream) ───────────────────────────────────────── */}
      <section className="px-6 pb-[12vh]">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <Eyebrow>Der Unterschied</Eyebrow>
            <Reveal>
              <h2 className="mt-5 font-serif leading-[1.1]" style={{ fontSize: "clamp(2rem, 4.4vw, 3.2rem)" }}>
                Lokal und quelloffen, nicht Cloud und Abo.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.05}>
            <div className="mt-10 overflow-x-auto rounded-2xl" style={{ border: "1px solid rgba(181,176,168,0.3)", background: "#FFFFFF" }}>
              <table className="w-full border-collapse text-left text-[15px]">
                <thead>
                  <tr style={{ color: "var(--warm-mid)" }}>
                    <th scope="col" className="p-4 font-medium"></th>
                    <th scope="col" className="p-4 font-mono text-[12px] uppercase tracking-[0.1em]" style={{ color: "var(--gold)" }}>Mooni Voice</th>
                    <th scope="col" className="p-4 font-medium">Wispr / superwhisper</th>
                    <th scope="col" className="p-4 font-medium">Apple-Diktat</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Preis", "gratis · open source", "Abo", "gratis"],
                    ["Deine Daten", "100 % lokal", "teils Cloud", "Cloud"],
                    ["In Dev-/KI-Tools", "ja", "teils", "nein"],
                    ["Eigenes Vokabular", "ja", "teils", "nein"],
                    ["Modell-Wahl", "ja", "nein", "nein"],
                  ].map((row) => (
                    <tr key={row[0]} style={{ borderTop: "1px solid rgba(181,176,168,0.3)" }}>
                      <th scope="row" className="p-4 font-normal" style={{ color: "var(--warm-mid)" }}>{row[0]}</th>
                      <td className="p-4 font-medium" style={{ background: "rgba(184,150,62,0.07)", color: "var(--deep)" }}>{row[1]}</td>
                      <td className="p-4" style={{ color: "var(--warm-mid)" }}>{row[2]}</td>
                      <td className="p-4" style={{ color: "var(--warm-mid)" }}>{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 9 · IN DREI MINUTEN STARTKLAR (warm-light Band) ─────────────── */}
      <section className="px-6 py-[11vh]" style={{ background: "var(--warm-light)" }}>
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <Eyebrow>Startklar</Eyebrow>
            <Reveal>
              <h2 className="mt-5 font-serif leading-[1.1]" style={{ fontSize: "clamp(2rem, 4.4vw, 3.2rem)" }}>
                In drei Minuten sprichst du statt zu tippen.
              </h2>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.07}>
                <div className="relative h-full overflow-hidden rounded-2xl p-7" style={{ background: "#FFFFFF", border: "1px solid rgba(181,176,168,0.35)" }}>
                  <span className="font-serif text-5xl" style={{ color: "rgba(184,150,62,0.25)" }}>{s.n}</span>
                  <h3 className="mt-2 font-serif text-xl">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed" style={{ color: "var(--warm-mid)" }}>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10 · DOWNLOAD (dunkel, Formular mit Hard-Gate) ──────────────── */}
      <section id="download" className="relative scroll-mt-16 px-6 py-[14vh]" style={{ background: "var(--tech-bg)", color: "#F5F2EC" }}>
        <div className="pointer-events-none absolute left-1/2 top-0 h-[50vh] w-[85vw] -translate-x-1/2" style={{ background: `radial-gradient(ellipse at top, ${AMBER_SOFT}, transparent 68%)` }} />
        <div className="relative mx-auto max-w-md text-center">
          <Eyebrow color={AMBER}>Hol es dir</Eyebrow>
          <h2 className="mt-5 font-serif leading-[1.08]" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", textShadow: "0 0 28px rgba(232,163,61,0.22)" }}>
            Kostenlos. Open Source.<br />Für immer deins.
          </h2>
          <div className="mx-auto mt-7 max-w-[260px] opacity-90">
            <Wave height={56} bars={34} />
          </div>
          {!done ? (
            <form onSubmit={onSubmit} className="mt-6 text-left">
              <p className="mb-5 text-center text-[15px]" style={{ color: "#b8b1c2" }}>
                Trag dich ein und lade sofort herunter. Gratis und Open Source, du zahlst nie.
              </p>
              <input
                type="text" value={vorname} onChange={(e) => setVorname(e.target.value)}
                placeholder="Dein Name" required autoComplete="given-name" aria-label="Dein Name"
                className="mb-3 w-full rounded-xl px-4 py-3.5 font-sans text-[15px] outline-none transition-colors focus:border-[color:var(--gold)]"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(232,163,61,0.25)", color: "#F5F2EC" }}
              />
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Deine E-Mail" required autoComplete="email" aria-label="Deine E-Mail"
                className="mb-4 w-full rounded-xl px-4 py-3.5 font-sans text-[15px] outline-none transition-colors focus:border-[color:var(--gold)]"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(232,163,61,0.25)", color: "#F5F2EC" }}
              />
              <input type="text" tabIndex={-1} autoComplete="off" value={fax} onChange={(e) => setFax(e.target.value)}
                aria-hidden style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />
              <label className="mb-4 flex cursor-pointer items-start gap-2.5 text-[13px] leading-snug" style={{ color: "#b8b1c2" }}>
                <input
                  type="checkbox" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ accentColor: AMBER }}
                />
                <span>Schick mir ab und zu Updates zu Mooni Voice und Tipps von Sabala per E-Mail. Jederzeit mit einem Klick abbestellbar.</span>
              </label>
              {error && (
                <p role="alert" className="mb-3 text-[13px]" style={{ color: "#f0a3a3" }}>
                  {error}
                </p>
              )}
              <button
                type="submit" disabled={busy}
                className="w-full rounded-xl py-4 font-sans font-semibold transition-opacity disabled:opacity-60"
                style={{ background: AMBER, color: "#1a1206", letterSpacing: "0.04em" }}
              >
                {busy ? "Moment …" : "Kostenlos herunterladen"}
              </button>
              <p className="mt-3 text-center text-[12px]" style={{ color: "#6f6886" }}>
                Deine E-Mail nutzen wir für den Download. Newsletter nur, wenn du oben zustimmst.
              </p>
            </form>
          ) : (
            <div className="mt-6">
              <p className="font-serif text-2xl">Danke{vorname ? `, ${vorname}` : ""}.</p>
              <a
                ref={downloadRef} href={DMG_URL} download
                className="mt-5 inline-block w-full rounded-xl py-4 font-sans font-semibold"
                style={{ background: AMBER, color: "#1a1206", letterSpacing: "0.04em" }}
              >
                Mooni Voice herunterladen (.dmg)
              </a>
              <div className="mt-6 text-left font-sans text-[14px] leading-relaxed" style={{ color: "#b8b1c2" }}>
                <p><b style={{ color: "#F5F2EC" }}>1.</b> DMG öffnen, in den Ordner Programme ziehen.</p>
                <p><b style={{ color: "#F5F2EC" }}>2.</b> Erster Start: Rechtsklick auf die App, dann Öffnen.</p>
                <p><b style={{ color: "#F5F2EC" }}>3.</b> Mikrofon + Bedienungshilfen erlauben, fertig — das Sprachmodell ist schon eingebaut.</p>
              </div>
            </div>
          )}
          <a
            href={REPO_URL} target="_blank" rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.08em] transition-opacity hover:opacity-80"
            style={{ color: AMBER }}
          >
            <Ic name="github" size={15} color={AMBER} />
            Code auf GitHub ansehen
          </a>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: "#6f6886" }}>
            Open Source · MIT · ein Fork von Handy (cjpais)
          </p>
        </div>
      </section>

      {/* ── 11 · FAQ + ABSCHLUSS (cream) ────────────────────────────────── */}
      <section className="px-6 py-[12vh]">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <Eyebrow>Fragen</Eyebrow>
            <Reveal>
              <h2 className="mt-5 font-serif leading-[1.1]" style={{ fontSize: "clamp(2rem, 4.4vw, 3.2rem)" }}>
                Die ehrlichen Antworten.
              </h2>
            </Reveal>
          </div>
          <div className="mt-10">
            {FAQ.map((f) => (
              <details key={f.q} className="group border-b py-5" style={{ borderColor: "rgba(181,176,168,0.3)" }}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg">
                  {f.q}
                  <span className="font-mono text-xl transition-transform group-open:rotate-45" style={{ color: "var(--gold)" }}>+</span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--warm-mid)" }}>{f.a}</p>
              </details>
            ))}
          </div>
          <Reveal delay={0.05}>
            <div className="mt-14 text-center">
              <p className="font-serif text-2xl">Alles klar?</p>
              <p className="mt-2 text-[15px]" style={{ color: "var(--warm-mid)" }}>
                Dann sag deiner Tastatur, sie hat ab heute Unterstützung.
              </p>
              <div className="mt-7">
                <MooniCTA href="#download">Mooni Voice kostenlos holen</MooniCTA>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
