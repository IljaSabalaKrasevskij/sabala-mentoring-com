"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ACADEMY_CHECKOUT_URL, Brackets, Eyebrow } from "./shared";

/* ─────────────────────────────────────────────────────────────────────────
   ValueStack — Hormozi-Anchor. Items glide einzeln rein (CSS-Stagger),
   Gesamtwert zählt hoch, der Preis-Kipp landet als letztes mit Spring.
   Pure CSS-Animations für die Reveal-Sequenz: robust und tab-stabil.
   ───────────────────────────────────────────────────────────────────────── */

const ITEMS: { label: string; value: number }[] = [
  { label: "Session 1 live (2h): Obsidian + NotebookLM Setup", value: 249 },
  { label: "Session 2 live (2h): Claude Code Pro + MCP-Verbindungen", value: 249 },
  { label: "Skill-Paket: Closing Session + Memory + Cybersecurity", value: 19 },
  { label: "Live-Umsetzung & Q&A an beiden Terminen", value: 49 },
];

const TOTAL = ITEMS.reduce((s, i) => s + i.value, 0); // 566

function useCountUp(target: number, duration = 1100) {
  const [val, setVal] = useState(target);
  const raf = useRef<number | null>(null);
  useEffect(() => {
    setVal(0);
    let start: number | null = null;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const t = Math.min(1, (ts - start) / duration);
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(target * ease));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    // Etwas Verzögerung, damit Items vorher reinrutschen können
    const timer = setTimeout(() => {
      raf.current = requestAnimationFrame(tick);
    }, 700);
    return () => {
      clearTimeout(timer);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target, duration]);
  return val;
}

export default function ValueStack() {
  const total = useCountUp(TOTAL);

  return (
    <section className="relative overflow-hidden px-6 py-[18vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[60vh] w-[70vw] -translate-x-1/2" style={{ background: "radial-gradient(ellipse, rgba(184,150,62,0.12), transparent 70%)" }} />

      <div className="relative mx-auto max-w-2xl">
        <Eyebrow>{"// was drin ist"}</Eyebrow>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-5 max-w-xl text-center font-serif text-cream"
          style={{ fontSize: "clamp(2rem, 4.6vw, 3.2rem)", lineHeight: 1.06 }}
        >
          Was du in diesen 4 Stunden bekommst
        </motion.h2>

        <div
          className="vs-stack vs-reveal relative mt-12 overflow-hidden rounded-xl p-2"
          style={
            {
              background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.012))",
              border: "1px solid rgba(184,150,62,0.28)",
              boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
              "--d": "0.05s",
            } as React.CSSProperties
          }
        >
          <Brackets color="rgba(184,150,62,0.55)" inset={8} size={11} />
          {/* feiner Gold-Sweep, der einmal alle ~7s über den Stack zieht */}
          <span className="vs-sweep pointer-events-none absolute inset-y-0 w-1/3" />
          <ul className="divide-y" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            {ITEMS.map((it, i) => (
              <li
                key={it.label}
                className="vs-row vs-row-reveal group relative flex items-center justify-between gap-4 px-5 py-4 transition-all hover:translate-x-1"
                style={{ "--d": `${0.25 + i * 0.14}s` } as React.CSSProperties}
              >
                {/* Hover-Highlight von links */}
                <span className="pointer-events-none absolute inset-y-1 left-0 w-px transition-all duration-300 group-hover:w-[3px]" style={{ background: "linear-gradient(180deg, transparent, var(--gold), transparent)", opacity: 0.5 }} />
                <span className="flex items-center gap-3 text-[0.96rem] text-warm-light/90">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[0.78rem] transition-transform duration-300 group-hover:scale-110" style={{ background: "rgba(184,150,62,0.16)", color: "var(--gold)", border: "1px solid rgba(184,150,62,0.4)" }}>✓</span>
                  {it.label}
                </span>
                <span className="shrink-0 font-mono text-[0.95rem] transition-colors duration-300 group-hover:text-warm-light" style={{ color: "rgba(250,248,245,0.55)" }}>
                  €{it.value}
                </span>
              </li>
            ))}
          </ul>

          {/* Gesamtwert mit Count-Up + sanftem Gold-Pulse */}
          <div
            className="vs-total vs-row-reveal relative flex items-center justify-between px-5 py-5"
            style={{ borderTop: "1px solid rgba(184,150,62,0.32)", "--d": `${0.35 + ITEMS.length * 0.14}s` } as React.CSSProperties}
          >
            <span className="font-serif text-[1.35rem] text-cream">Gesamtwert</span>
            <span className="vs-total-num font-mono text-[1.4rem] line-through" style={{ color: "rgba(250,248,245,0.55)" }}>
              €{total}
            </span>
          </div>
        </div>

        {/* Preis-Kipp — edler, mit Shimmer-Sweep + sanftem Glow-Pulse */}
        <div
          className="vs-price relative mt-10 overflow-hidden rounded-2xl px-8 py-10 text-center"
          style={{ background: "linear-gradient(135deg, #B8963E 0%, #d4ae5a 45%, #B8963E 100%)" }}
        >
          {/* Shimmer-Sweep über den Block */}
          <span className="vs-price-shimmer pointer-events-none absolute inset-y-0 w-[40%]" />
          {/* feine innere Ecken-Akzente */}
          <Brackets color="rgba(10,8,6,0.25)" inset={14} size={12} />

          <p className="relative font-mono text-[11px] uppercase tracking-[0.34em]" style={{ color: "rgba(10,8,6,0.7)" }}>
            Dein Launch-Preis
          </p>
          <p className="relative mt-3 font-serif" style={{ fontSize: "clamp(3.6rem, 10vw, 6rem)", lineHeight: 1, color: "#0a0806", textShadow: "0 2px 0 rgba(255,255,255,0.18)" }}>
            €197
          </p>
          <p className="relative mt-2 font-mono text-[12px] uppercase tracking-[0.2em]" style={{ color: "rgba(10,8,6,0.65)" }}>
            oder bequem 2× €103
          </p>
          <p className="relative mt-4 text-[0.95rem] font-medium" style={{ color: "rgba(10,8,6,0.78)" }}>
            Für ein System, das ich mir monatelang aufgebaut habe.
          </p>
          <div className="relative mt-8 flex justify-center">
            <a
              href={ACADEMY_CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 overflow-hidden font-sans font-semibold transition-all"
              style={{ background: "#0a0806", color: "var(--gold-light)", letterSpacing: "0.08em", padding: "18px 40px", fontSize: "1rem", boxShadow: "0 12px 28px rgba(10,8,6,0.35)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#1a1612")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#0a0806")}
            >
              <span className="relative z-10">Platz sichern, bevor der Preis steigt</span>
              <svg width="18" height="12" viewBox="0 0 20 12" fill="none" className="relative z-10 transition-transform group-hover:translate-x-1">
                <path d="M0 6h18M13 1l5 5-5 5" stroke="var(--gold-light)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        /* Stack-Container: sanftes Reveal */
        .vs-reveal {
          opacity: 0;
          animation: vs-fade-up 0.6s ease-out 0.05s forwards;
        }
        /* Items + Total: glide-in von links */
        .vs-row-reveal {
          opacity: 0;
          transform: translateX(-16px);
          animation: vs-slide-in 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: var(--d);
        }
        @keyframes vs-fade-up {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes vs-slide-in {
          to { opacity: 1; transform: translateX(0); }
        }

        /* Preis-Kipp: spring-artiges Pop-in */
        .vs-price-reveal {
          opacity: 0;
          transform: scale(0.92) translateY(24px);
          animation: vs-spring-pop 0.85s cubic-bezier(0.34, 1.56, 0.64, 1) 1.15s forwards;
        }
        @keyframes vs-spring-pop {
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* Gold-Sweep einmal alle 7s über den Stack */
        .vs-sweep {
          background: linear-gradient(90deg, transparent, rgba(212,174,90,0.18), transparent);
          animation: vs-sweep-move 7s ease-in-out infinite;
        }
        @keyframes vs-sweep-move {
          0% { transform: translateX(-100%) }
          55%,100% { transform: translateX(400%) }
        }

        /* Gesamtwert: durchgestrichene Zahl pulst sanft */
        .vs-total-num { animation: vs-num-pulse 3s ease-in-out infinite; }
        @keyframes vs-num-pulse {
          0%,100% { color: rgba(250,248,245,0.5); }
          50% { color: rgba(250,248,245,0.85); }
        }

        /* Preis-Kipp: sanfter Gold-Glow + Shimmer-Sweep */
        .vs-price {
          animation: vs-price-glow 4.5s ease-in-out infinite;
        }
        @keyframes vs-price-glow {
          0%,100% { box-shadow: 0 24px 60px rgba(184,150,62,0.28), 0 0 0 1px rgba(212,174,90,0.4) inset; }
          50%     { box-shadow: 0 28px 80px rgba(184,150,62,0.5),  0 0 0 1px rgba(244,217,138,0.55) inset, 0 0 60px rgba(212,174,90,0.25); }
        }
        .vs-price-shimmer {
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%);
          animation: vs-shimmer-move 4.8s ease-in-out infinite;
          opacity: 0.55;
        }
        @keyframes vs-shimmer-move {
          0% { transform: translateX(-120%) skewX(-12deg) }
          60%,100% { transform: translateX(320%) skewX(-12deg) }
        }
      `}</style>
    </section>
  );
}
