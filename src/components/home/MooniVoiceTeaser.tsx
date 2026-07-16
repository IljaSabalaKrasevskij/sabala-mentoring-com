"use client";

import Link from "next/link";
import { motion } from "motion/react";

/* ─────────────────────────────────────────────────────────────────────────
   Mooni Voice Teaser — „Mooni ist echt": direkt nach der 3D-Mooni-Sektion.
   Voice-Wave + Terminal-Zeile, rein CSS-animiert (kein JS, läuft überall).
   Dunkel, weil die Values-Sektion mit einem Verlauf in tech-bg endet.
   ───────────────────────────────────────────────────────────────────────── */

const BARS = [0.3, 0.55, 0.85, 0.45, 1, 0.6, 0.35, 0.9, 0.5, 0.75, 0.4, 0.95, 0.55, 0.3];

const STATS = [
  { n: "5×", label: "schneller als tippen" },
  { n: "100 %", label: "lokal auf deinem Mac" },
  { n: "0 €", label: "für immer, open source" },
];

const USE_CASES = [
  "LinkedIn-Nachrichten beantworten, während andere noch tippen",
  "Claude Code und Terminal per Stimme steuern",
  "Mails, Newsletter und Notizen einfach einsprechen",
];

// 32 Zeichen — muss zu steps(32) in der mv-type-Animation passen
const TYPED = "sprich, der text steht schon da.";

export default function MooniVoiceTeaser() {
  return (
    <section id="mooni-voice" className="relative overflow-hidden px-6 py-[16vh]" style={{ background: "var(--tech-bg)" }}>
      {/* feiner Gold-Schimmer, wie in ForWhom */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(circle, rgba(184,150,62,0.08), transparent 65%)" }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        {/* ── Text ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
            {"// mooni ist echt · open source"}
          </p>
          <h2 className="mt-5 font-serif leading-[1.06] text-cream" style={{ fontSize: "clamp(2.4rem, 5.6vw, 4.3rem)", letterSpacing: "-0.01em" }}>
            Du sprichst schneller,
            <br />
            als du tippst.
          </h2>
          <p className="mt-6 max-w-xl text-[1.12rem] leading-relaxed text-warm-light/75">
            Der kleine Roboter von eben ist ein echtes Werkzeug. Mooni Voice macht aus deiner
            Stimme Text, in jeder App auf deinem Mac. Das ganze Setup läuft lokal, gebaut und
            getestet auf Apple Silicon.
          </p>

          {/* Zahlen zuerst */}
          <div className="mt-9 grid max-w-xl grid-cols-3 gap-5">
            {STATS.map((s) => (
              <div key={s.n}>
                <p className="font-serif text-[clamp(1.9rem,3.2vw,2.6rem)] leading-none text-gold-light">{s.n}</p>
                <p className="mt-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-warm-light/50">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Use-Cases */}
          <ul className="mt-9 space-y-3">
            {USE_CASES.map((u) => (
              <li key={u} className="flex items-start gap-3 text-[1.02rem] leading-relaxed text-warm-light/80">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--gold-light)" }} />
                {u}
              </li>
            ))}
          </ul>

          <p className="mt-8 font-serif text-[1.15rem] italic text-warm-light/70">
            „Ich spreche damit jeden Tag. Und ich lieb&apos;s.&ldquo;{" "}
            <span className="ml-2 font-mono text-[11px] not-italic uppercase tracking-[0.2em] text-gold">· Ilja</span>
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              href="/open-source-projekte/mooni-voice"
              className="inline-flex items-center gap-2 rounded-full bg-gold-light px-9 py-4 font-mono text-sm uppercase tracking-[0.12em] text-tech-bg transition-colors hover:bg-gold"
            >
              Mooni Voice laden <span aria-hidden>→</span>
            </Link>
            <a
              href="https://github.com/IljaSabalaKrasevskij/mooni-voice"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[12px] uppercase tracking-[0.14em] text-warm-light/45 transition-colors hover:text-gold-light"
            >
              Quellcode auf GitHub ↗
            </a>
          </div>
        </motion.div>

        {/* ── Demo-Karte: Wave + getippte Zeile ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="relative rounded-2xl p-6 md:p-8"
          style={{
            background: "linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))",
            border: "1px solid rgba(184,150,62,0.25)",
            boxShadow: "0 30px 70px rgba(0,0,0,0.45)",
          }}
        >
          {/* Fenster-Titelzeile */}
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "rgba(226,99,77,0.7)" }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "rgba(212,174,90,0.7)" }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "rgba(111,163,130,0.7)" }} />
            <span className="ml-3 font-mono text-[11px] tracking-[0.2em] text-warm-light/40">mooni voice</span>
            <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "#E2634D" }}>
              <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: "#E2634D" }} />
              rec
            </span>
          </div>

          {/* Voice-Wave */}
          <div className="mt-7 flex h-16 items-center justify-center gap-1.5" aria-hidden>
            {BARS.map((h, i) => (
              <span
                key={i}
                style={{
                  width: 4,
                  height: `${h * 100}%`,
                  borderRadius: 2,
                  background: "var(--gold-light)",
                  opacity: 0.9,
                  transformOrigin: "center",
                  animation: `mv-bar ${1 + (i % 3) * 0.25}s ease-in-out ${i * 0.09}s infinite`,
                }}
              />
            ))}
          </div>

          {/* Getippte Ausgabe */}
          <div className="mt-7 rounded-xl px-4 py-3.5" style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <span className="font-mono text-[13px] text-warm-light/35">&gt;&nbsp;</span>
            <span className="mv-typed font-mono text-[13px] text-cream/90">{TYPED}</span>
          </div>

          <p className="mt-5 text-center font-mono text-[11px] tracking-[0.14em] text-warm-light/35">
            drücken · sprechen · fertig
          </p>
        </motion.div>
      </div>

      <style>{`
        @keyframes mv-bar { 0%, 100% { transform: scaleY(0.25) } 50% { transform: scaleY(1) } }
        .mv-typed {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          vertical-align: bottom;
          max-width: calc(100% - 2ch);
          border-right: 2px solid rgba(212, 174, 90, 0.8);
          animation: mv-type 7s steps(32, end) infinite, mv-caret 0.9s step-end infinite;
        }
        @keyframes mv-type { 0% { width: 0 } 55% { width: 32ch } 92% { width: 32ch } 100% { width: 0 } }
        @keyframes mv-caret { 0%, 100% { border-color: rgba(212,174,90,0.8) } 50% { border-color: transparent } }
        @media (prefers-reduced-motion: reduce) {
          .mv-typed { animation: none; width: 32ch }
        }
      `}</style>
    </section>
  );
}
