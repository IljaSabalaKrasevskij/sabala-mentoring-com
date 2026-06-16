"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "./shared";

/* Vorher / Nachher — animierte Gegenüberstellung, Zeile für Zeile */

const ROWS: [string, string][] = [
  ["Jede Claude-Session startet bei null", "Claude weiß nach 3 Tagen noch, woran ihr gearbeitet habt"],
  ["Wissen liegt in 5 verschiedenen Tools", "Alles in einem System, Claude hat Zugriff"],
  ["Du erklärst immer wieder denselben Kontext", 'Du öffnest Claude, er fragt: "Weiter mit dem Projekt?"'],
  ['Claude Code ist "zu kompliziert"', "Das Terminal macht dir keine Angst mehr"],
  ["Du verbrennst Token für Kontext", "Du nutzt Token für echte Arbeit"],
];

export default function BeforeAfter() {
  return (
    <section className="relative overflow-hidden px-6 py-[16vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 md:block" style={{ background: "linear-gradient(to bottom, transparent, rgba(184,150,62,0.25), transparent)" }} />
      <div className="relative mx-auto max-w-4xl">
        <Eyebrow>// der unterschied</Eyebrow>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-5 mb-14 max-w-xl text-center font-serif text-cream"
          style={{ fontSize: "clamp(2rem, 4.6vw, 3.2rem)", lineHeight: 1.06 }}
        >
          Was sich konkret ändert
        </motion.h2>

        <div className="space-y-3">
          {/* Spaltenköpfe */}
          <div className="grid grid-cols-2 gap-4 px-1">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-warm-mid">Vorher</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">Nachher</span>
          </div>

          {ROWS.map(([before, after], i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="rounded-xl px-5 py-4 text-[0.92rem] leading-snug" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(250,248,245,0.5)" }}>
                {before}
              </div>
              <div className="relative rounded-xl px-5 py-4 text-[0.92rem] leading-snug" style={{ background: "rgba(184,150,62,0.08)", border: "1px solid rgba(184,150,62,0.3)", color: "rgba(250,248,245,0.92)" }}>
                {after}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
