"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Brackets, Eyebrow } from "./shared";

/* ─────────────────────────────────────────────────────────────────────────
   ValueStack — Hormozi-Methode. Jede Zeile lädt einzeln ein, der Gesamtwert
   zählt auf den Gesamtwert hoch, dann „kippt" der Preis sichtbar auf €197.
   ───────────────────────────────────────────────────────────────────────── */

const ITEMS: { label: string; value: number }[] = [
  { label: "Session 1 live (2h): Obsidian + NotebookLM Setup", value: 99 },
  { label: "Session 2 live (2h): Claude Code + MCP-Verbindungen", value: 99 },
  { label: "Closing Session Skill (mein persönlicher Skill)", value: 19 },
  { label: "Memory Skill + PARA-Automatisierung", value: 19 },
  { label: "Cybersecurity Skill", value: 19 },
  { label: "Aufzeichnung beider Sessions", value: 29 },
];

const TOTAL = ITEMS.reduce((s, i) => s + i.value, 0); // 284

function useCountUp(target: number, active: boolean, duration = 1100) {
  const [val, setVal] = useState(0);
  const raf = useRef<number | null>(null);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const t = Math.min(1, (ts - start) / duration);
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(target * ease));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target, active, duration]);
  return val;
}

export default function ValueStack() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const total = useCountUp(TOTAL, active);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setActive(true), { threshold: 0, rootMargin: "0px 0px -20% 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden px-6 py-[18vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[60vh] w-[70vw] -translate-x-1/2" style={{ background: "radial-gradient(ellipse, rgba(184,150,62,0.12), transparent 70%)" }} />

      <div className="relative mx-auto max-w-2xl">
        <Eyebrow>// was drin ist</Eyebrow>
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

        <div className="relative mt-12 overflow-hidden rounded-xl p-2" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(184,150,62,0.2)" }}>
          <Brackets color="rgba(184,150,62,0.4)" inset={8} size={11} />
          <ul className="divide-y" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            {ITEMS.map((it, i) => (
              <motion.li
                key={it.label}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.12 }}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <span className="flex items-center gap-3 text-[0.96rem] text-warm-light/85">
                  <span style={{ color: "var(--gold)" }}>✓</span>
                  {it.label}
                </span>
                <span className="shrink-0 font-mono text-[0.92rem]" style={{ color: "rgba(250,248,245,0.5)" }}>
                  €{it.value}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* Gesamtwert */}
          <div className="flex items-center justify-between px-5 py-5" style={{ borderTop: "1px solid rgba(184,150,62,0.25)" }}>
            <span className="font-serif text-[1.3rem] text-cream">Gesamtwert</span>
            <span className="font-mono text-[1.3rem] line-through" style={{ color: "rgba(250,248,245,0.4)" }}>
              €{total}
            </span>
          </div>
        </div>

        {/* Preis-Kipp */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 120 }}
          className="relative mt-8 overflow-hidden rounded-xl px-8 py-9 text-center"
          style={{ background: "linear-gradient(135deg, #B8963E, #d4ae5a)", boxShadow: "0 24px 60px rgba(184,150,62,0.3)" }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: "rgba(10,8,6,0.65)" }}>
            Dein Launch-Preis
          </p>
          <p className="mt-2 font-serif" style={{ fontSize: "clamp(3.4rem, 9vw, 5.5rem)", lineHeight: 1, color: "#0a0806" }}>
            €197
          </p>
          <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.18em]" style={{ color: "rgba(10,8,6,0.6)" }}>
            oder bequem 2× €103
          </p>
          <p className="mt-3 text-[0.95rem] font-medium" style={{ color: "rgba(10,8,6,0.7)" }}>
            Für ein System, das ich mir monatelang aufgebaut habe.
          </p>
          <div className="mt-7 flex justify-center">
            <a
              href="#preis"
              className="group inline-flex items-center gap-3 font-sans font-semibold transition-all"
              style={{ background: "#0a0806", color: "var(--gold-light)", letterSpacing: "0.08em", padding: "18px 40px", fontSize: "1rem" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#2e2b26")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#0a0806")}
            >
              Platz sichern, bevor der Preis steigt
              <svg width="18" height="12" viewBox="0 0 20 12" fill="none" className="transition-transform group-hover:translate-x-1">
                <path d="M0 6h18M13 1l5 5-5 5" stroke="var(--gold-light)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
