"use client";

import { motion } from "framer-motion";
import { ACADEMY_CHECKOUT_URL, Brackets, Eyebrow } from "./shared";

/* Preis + Dringlichkeit + CTA. Gold-Glow-Rahmen, klar, ohne Druck-Pathos. */

const INCLUDES = [
  "Session 1: Obsidian + NotebookLM",
  "Session 2: Claude Code Pro + Memory-System",
  "3 Skills: Closing Session, Memory, Cybersecurity",
  "Live-Umsetzung an beiden Terminen",
  "PARA-Vorlage für Obsidian",
];

export default function PriceBlock() {
  return (
    <section id="preis" className="relative overflow-hidden px-6 py-[18vh]" style={{ background: "var(--tech-bg)" }}>
      {/* großer Gold-Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[80vw] -translate-x-1/2 -translate-y-1/2" style={{ background: "radial-gradient(circle, rgba(184,150,62,0.16), transparent 65%)" }} />

      <div className="relative mx-auto max-w-xl text-center">
        <Eyebrow>{"// dein platz im ersten durchlauf"}</Eyebrow>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-5 max-w-lg font-serif text-cream"
          style={{ fontSize: "clamp(2rem, 4.8vw, 3.2rem)", lineHeight: 1.06 }}
        >
          Das Pflicht-Setup. 2×2 Stunden live.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="relative mt-12 overflow-hidden rounded-2xl px-8 py-10"
          style={{ background: "linear-gradient(180deg, #15110b, #0d0a07)", border: "1.5px solid var(--gold)", boxShadow: "0 0 60px rgba(184,150,62,0.2), 0 30px 80px rgba(0,0,0,0.5)" }}
        >
          <Brackets color="var(--gold)" inset={12} size={14} />

          {/* Preis */}
          <div className="flex items-end justify-center gap-3">
            <span className="font-serif" style={{ fontSize: "clamp(4rem, 12vw, 6rem)", lineHeight: 0.9, color: "var(--gold)" }}>
              €197
            </span>
            <span className="mb-3 font-mono text-[12px] uppercase tracking-wide" style={{ color: "rgba(250,248,245,0.4)" }}>
              Launch-Preis
            </span>
          </div>
          <p className="mt-2 font-mono text-[12px] tracking-wide" style={{ color: "rgba(250,248,245,0.6)" }}>
            einmal €197 oder bequem 2× €103
          </p>
          <p className="mt-1 font-mono text-[11px] tracking-wide" style={{ color: "rgba(250,248,245,0.4)" }}>
            ab der 2. Kohorte €247
          </p>

          {/* Termine */}
          <div className="mx-auto mt-8 flex max-w-sm flex-wrap justify-center gap-3">
            {[
              { l: "Session 1", d: "Fr · 26. Juni", t: "15:00 MEZ" },
              { l: "Session 2", d: "Fr · 3. Juli", t: "15:00 MEZ" },
            ].map((s) => (
              <span key={s.l} className="flex flex-col px-4 py-2.5 text-left" style={{ background: "rgba(184,150,62,0.08)", border: "1px solid rgba(184,150,62,0.25)" }}>
                <span className="font-mono text-[9px] uppercase tracking-[0.18em]" style={{ color: "var(--gold)" }}>{s.l}</span>
                <span className="mt-0.5 font-serif text-[1rem] text-cream">{s.d}</span>
                <span className="font-mono text-[10px]" style={{ color: "rgba(250,248,245,0.5)" }}>{s.t}</span>
              </span>
            ))}
          </div>

          {/* Inhalt */}
          <ul className="mx-auto mt-7 max-w-sm space-y-2.5 text-left">
            {INCLUDES.map((it) => (
              <li key={it} className="flex gap-3 text-[0.95rem] text-warm-light/85">
                <span style={{ color: "var(--gold)" }}>✓</span>
                {it}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href={ACADEMY_CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-9 inline-flex w-full items-center justify-center gap-3 font-sans font-semibold transition-all"
            style={{ background: "var(--gold)", color: "#0a0806", letterSpacing: "0.08em", padding: "20px 32px", fontSize: "1.05rem" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "var(--gold-light)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "var(--gold)")}
          >
            Jetzt für €197 anmelden
            <svg width="18" height="12" viewBox="0 0 20 12" fill="none" className="transition-transform group-hover:translate-x-1">
              <path d="M0 6h18M13 1l5 5-5 5" stroke="#0a0806" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          {/* Knappheit */}
          <div className="mt-6 flex items-center justify-center gap-2.5 font-mono text-[12px] tracking-wide" style={{ color: "rgba(250,248,245,0.55)" }}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: "var(--gold)" }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "var(--gold)" }} />
            </span>
            Nur 10 Plätze
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-7 max-w-md text-[0.9rem] leading-relaxed text-warm-mid"
        >
          Keine langen Wartelisten. Sind die 10 Plätze weg, sind sie weg. Bitte buche nur, wenn du an beiden Terminen live dabei sein kannst.
        </motion.p>
      </div>
    </section>
  );
}
