"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ACADEMY_CHECKOUT_URL, Brackets } from "./shared";

/* ─────────────────────────────────────────────────────────────────────────
   WorkshopHeader — der eigentliche, IMMER sichtbare Workshop-Kopf. Titel, Termine,
   CTA. Kommt direkt nach dem Entdecker-Hero, damit man den Workshop-Titel garantiert sieht.
   ───────────────────────────────────────────────────────────────────────── */

const DATES = [
  { label: "Session 1", date: "Fr · 26. Juni 2026", time: "15:00 MEZ" },
  { label: "Session 2", date: "Fr · 3. Juli 2026", time: "15:00 MEZ" },
];

export default function WorkshopHeader() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#0a0806" }}>
      {/* Hintergrundbild rechts — das normale, helle Porträt, knallig */}
      <div className="absolute inset-0 z-0">
        <Image src="/hero/ilja-default.png" alt="Ilja Krasevskij" fill priority className="object-cover object-right" sizes="100vw" />
        {/* Gradient nur links für Textlesbarkeit, rechts bleibt hell und knallig */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(10,8,6,0.94) 0%, rgba(10,8,6,0.72) 30%, rgba(10,8,6,0.32) 50%, transparent 78%)" }} />
      </div>

      <div className="relative z-10 flex min-h-[84vh] flex-col justify-center px-[6vw] py-[12vh]">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs uppercase tracking-[0.3em]"
          style={{ color: "#b8963e" }}
        >
          Sabala Academy · Live-Workshop
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-5 max-w-[720px] font-serif leading-[1.06] text-cream"
          style={{ fontSize: "clamp(2.6rem, 5vw, 4rem)", textShadow: "0 2px 30px rgba(10,8,6,0.7)" }}
        >
          Claude vergisst nach
          <br />
          jeder Session alles.
          <br />
          <span style={{ color: "#b8963e" }}>Das hier ändert das.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-6 max-w-xl text-base leading-relaxed md:text-lg"
          style={{ color: "rgba(250,248,245,0.78)" }}
        >
          In 2×2 Stunden richtest du ein System ein, das sich an alles erinnert. Obsidian, NotebookLM und Claude Code, live aufgebaut. Das Basic-Setup, mit dem die Profis arbeiten.
        </motion.p>

        {/* Termine */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-9 flex flex-wrap gap-3"
        >
          {DATES.map((d) => (
            <span key={d.label} className="relative flex flex-col px-5 py-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(184,150,62,0.3)" }}>
              <Brackets color="rgba(184,150,62,0.45)" inset={6} size={8} />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "#b8963e" }}>
                {d.label}
              </span>
              <span className="mt-1 font-serif text-[1.15rem] text-cream">{d.date}</span>
              <span className="font-mono text-[11px]" style={{ color: "rgba(250,248,245,0.5)" }}>
                {d.time}
              </span>
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mt-9 flex flex-wrap items-center gap-5"
        >
          <a
            href={ACADEMY_CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 font-sans font-semibold transition-all"
            style={{ background: "#b8963e", color: "#0a0806", letterSpacing: "0.08em", padding: "17px 38px", fontSize: "1rem" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#d4ae5a")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#b8963e")}
          >
            Platz sichern — €197
            <svg width="18" height="12" viewBox="0 0 20 12" fill="none" className="transition-transform group-hover:translate-x-1">
              <path d="M0 6h18M13 1l5 5-5 5" stroke="#0a0806" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <span className="flex flex-col font-mono text-[12px] uppercase tracking-[0.18em]" style={{ color: "rgba(250,248,245,0.55)" }}>
            <span>oder 2× €103</span>
            <span>nur 10 Plätze</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
