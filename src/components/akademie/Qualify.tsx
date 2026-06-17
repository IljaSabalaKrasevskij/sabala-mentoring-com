"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "./shared";

/* Für wen / nicht für wen — zwei kontrastierende Spalten */

const FOR = [
  "Du bereits mit Kunden oder an eigenen Projekten arbeitest",
  "Du an beiden Live-Terminen dabei sein kannst",
  "Du bereit bist, dich für zwei Wochen wirklich zu committen",
  "Du Token sparen und spürbar effektiver arbeiten möchtest",
  "Du die Qualität deiner Arbeit steigern möchtest",
  "Du bessere Ergebnisse für deine Kundenprojekte willst",
  "Du vorbereitend bessere Webseiten und Systeme bauen willst",
];

const NOT_FOR = [
  "Du für Session 2 nicht bereit bist, Claude Code Pro zu holen",
  "Du nur die Aufzeichnung anschauen möchtest",
  "Du einen der beiden Live-Termine nicht einplanen kannst",
  "Du an deinem Setup grundsätzlich nichts ändern möchtest",
  "Du komplett am Anfang stehst, ohne Kunden- oder Projektbezug",
];

export default function Qualify() {
  return (
    <section className="relative overflow-hidden px-6 py-[16vh]" style={{ background: "var(--cream)" }}>
      <div className="relative mx-auto max-w-4xl">
        <Eyebrow>{"// ehrlich gesagt"}</Eyebrow>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-5 mb-14 max-w-2xl text-center font-serif text-deep"
          style={{ fontSize: "clamp(2rem, 4.6vw, 3.2rem)", lineHeight: 1.06 }}
        >
          Nicht für jeden. Vielleicht genau für dich.
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl p-8"
            style={{ background: "linear-gradient(160deg, #ffffff, #f3eee5)", border: "1px solid rgba(184,150,62,0.3)", boxShadow: "0 16px 40px rgba(80,60,20,0.1)" }}
          >
            {/* Icon mit Puls-Ringen — „du passt" */}
            <span className="relative mb-5 flex h-14 w-14 items-center justify-center">
              <span className="qual-ping absolute inset-0 rounded-full" style={{ border: "1.5px solid rgba(184,150,62,0.5)" }} />
              <span className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(184,150,62,0.18), transparent 70%)" }} />
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={{ color: "var(--gold)" }}>
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                <path d="M8 12.5l2.5 2.5L16 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">Für dich, wenn</p>
            <ul className="mt-5 space-y-3.5">
              {FOR.map((f) => (
                <li key={f} className="flex gap-3 text-[0.97rem] leading-snug text-deep/85">
                  <span className="mt-0.5 shrink-0 font-semibold" style={{ color: "var(--gold)" }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative overflow-hidden rounded-2xl p-8"
            style={{ background: "rgba(46,43,38,0.04)", border: "1px solid rgba(46,43,38,0.12)" }}
          >
            {/* Icon — Filter/„passt nicht ganz" */}
            <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full" style={{ background: "rgba(46,43,38,0.06)", border: "1px solid rgba(46,43,38,0.12)" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: "var(--warm-mid)" }}>
                <path d="M3 5h18l-7 8v6l-4-2v-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--warm-mid)" }}>
              Noch nicht das Richtige, wenn
            </p>
            <ul className="mt-5 space-y-3.5">
              {NOT_FOR.map((f) => (
                <li key={f} className="flex gap-3 text-[0.97rem] leading-snug text-warm-mid">
                  <span className="mt-0.5 shrink-0" style={{ color: "var(--warm-mid)" }}>—</span>
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[0.88rem] italic leading-relaxed text-warm-mid/80">Für komplette Anfänger gibt es einen separaten Einstiegskurs.</p>
          </motion.div>
        </div>
      </div>

      <style>{`
        .qual-ping { animation: qual-ping 2.6s cubic-bezier(0,0,0.2,1) infinite; }
        @keyframes qual-ping { 0% { transform: scale(0.85); opacity: 0.9 } 70%,100% { transform: scale(1.4); opacity: 0 } }
      `}</style>
    </section>
  );
}
