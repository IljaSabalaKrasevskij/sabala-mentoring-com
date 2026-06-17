"use client";

import { motion } from "framer-motion";
import { Brackets, Eyebrow } from "./shared";

/* Für wen / nicht für wen — asymmetrisch, mit Hierarchie.
   Linke Spalte ist die Held-Card (60%), rechte ist dezenter Filter (40%). */

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
    <section className="relative overflow-hidden px-6 py-[18vh]" style={{ background: "var(--cream)" }}>
      {/* atmosphärischer Gold-Glow hinter der „Für dich"-Card */}
      <div className="pointer-events-none absolute left-[8%] top-[40%] h-[60vh] w-[55vw] -translate-y-1/2" style={{ background: "radial-gradient(ellipse, rgba(184,150,62,0.18), transparent 70%)" }} />
      {/* feiner Topo-Linien-Hauch — sehr subtil */}
      <div className="qual-topo pointer-events-none absolute inset-0 opacity-[0.05]" />

      <div className="relative mx-auto max-w-5xl">
        <Eyebrow>{"// ehrlich gesagt"}</Eyebrow>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-5 max-w-3xl text-center font-serif text-deep"
          style={{ fontSize: "clamp(2rem, 4.8vw, 3.4rem)", lineHeight: 1.06 }}
        >
          Nicht für jeden. <span style={{ color: "var(--gold)" }}>Vielleicht genau für dich.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-5 mb-16 max-w-xl text-center text-[1.05rem] leading-relaxed text-warm-mid"
        >
          Diese Akademie ist für eine bestimmte Phase deiner Arbeit gemacht — finde heraus, ob du gerade in genau der bist.
        </motion.p>

        <div className="grid items-start gap-7 md:grid-cols-12 md:gap-8">
          {/* ─────────── FÜR DICH — Held-Card ─────────── */}
          <div
            className="qual-hero qual-reveal-l relative overflow-hidden rounded-2xl p-8 md:col-span-7 md:p-10"
            style={{
              background: "linear-gradient(160deg, #ffffff 0%, #faf5e8 70%, #f1e6c8 100%)",
              border: "1.5px solid rgba(184,150,62,0.45)",
              boxShadow: "0 30px 70px rgba(120,90,30,0.18), 0 0 0 1px rgba(184,150,62,0.1) inset",
            }}
          >
            <Brackets color="rgba(184,150,62,0.6)" inset={14} size={14} />
            {/* Shimmer-Sweep oben */}
            <span className="qual-shimmer pointer-events-none absolute inset-x-0 top-0 h-px" />
            {/* Empfohlen-Badge */}
            <div className="mb-6 flex items-center justify-between">
              <span className="qual-pulse-icon relative flex h-14 w-14 items-center justify-center">
                <span className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(184,150,62,0.28), transparent 70%)" }} />
                <span className="qual-ping absolute inset-0 rounded-full" style={{ border: "1.5px solid rgba(184,150,62,0.5)" }} />
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ color: "var(--gold)" }}>
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M8 12.5l2.5 2.5L16 9" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ background: "rgba(184,150,62,0.12)", border: "1px solid rgba(184,150,62,0.35)", color: "var(--gold)" }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--gold)", boxShadow: "0 0 8px var(--gold)" }} />
                Empfohlen für dich
              </span>
            </div>

            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold">Für dich, wenn</p>
            <h3 className="mt-2 font-serif text-[1.6rem] leading-tight text-deep">Du an diesem Punkt arbeitest</h3>

            <ul className="mt-7 space-y-1">
              {FOR.map((f, i) => (
                <li
                  key={f}
                  className="qual-row qual-row-reveal group relative flex items-start gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-[rgba(184,150,62,0.07)]"
                  style={{ "--d": `${0.25 + i * 0.07}s` } as React.CSSProperties}
                >
                  <span className="mt-px inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-semibold transition-transform duration-300 group-hover:scale-110" style={{ background: "linear-gradient(135deg, #d4ae5a, #B8963E)", color: "#0a0806", boxShadow: "0 4px 10px rgba(184,150,62,0.35), inset 0 1px 0 rgba(255,255,255,0.4)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[1rem] leading-relaxed text-deep/85">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ─────────── NICHT FÜR DICH — dezenter Filter ─────────── */}
          <div
            className="qual-soft qual-reveal-r relative overflow-hidden rounded-2xl p-7 md:col-span-5 md:mt-8 md:p-8"
            style={{
              background: "linear-gradient(180deg, rgba(46,43,38,0.04), rgba(46,43,38,0.02))",
              border: "1px solid rgba(46,43,38,0.1)",
              boxShadow: "0 10px 30px rgba(46,43,38,0.05)",
            }}
          >
            <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "rgba(46,43,38,0.06)", border: "1px solid rgba(46,43,38,0.12)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ color: "var(--warm-mid)" }}>
                <path d="M3 5h18l-7 8v6l-4-2v-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--warm-mid)" }}>
              Noch nicht das Richtige, wenn
            </p>
            <h4 className="mt-2 font-serif text-[1.25rem] leading-tight" style={{ color: "var(--warm-mid)" }}>
              Du gerade an einem anderen Punkt stehst
            </h4>

            <ul className="mt-6 space-y-3.5">
              {NOT_FOR.map((f, i) => (
                <li
                  key={f}
                  className="qual-row-soft flex items-start gap-3 text-[0.94rem] leading-snug text-warm-mid/85"
                  style={{ "--d": `${0.45 + i * 0.06}s` } as React.CSSProperties}
                >
                  <span className="mt-2 h-px w-3 shrink-0" style={{ background: "rgba(46,43,38,0.3)" }} />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-7 rounded-xl border border-dashed px-4 py-3" style={{ borderColor: "rgba(46,43,38,0.18)", background: "rgba(255,255,255,0.4)" }}>
              <p className="text-[0.85rem] italic leading-relaxed text-warm-mid/85">
                Für komplette Anfänger gibt es einen separaten Einstiegskurs.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* sanfte Topographic-Linien als Hintergrund-Textur */
        .qual-topo {
          background-image:
            repeating-linear-gradient(0deg, transparent 0, transparent 28px, rgba(120,90,30,0.5) 28px, rgba(120,90,30,0.5) 29px),
            repeating-linear-gradient(90deg, transparent 0, transparent 28px, rgba(120,90,30,0.5) 28px, rgba(120,90,30,0.5) 29px);
        }

        /* Held-Card: sanfter Gold-Glow-Pulse */
        .qual-hero {
          animation: qual-hero-glow 5.5s ease-in-out infinite;
        }
        @keyframes qual-hero-glow {
          0%,100% { box-shadow: 0 30px 70px rgba(120,90,30,0.18), 0 0 0 1px rgba(184,150,62,0.1) inset; }
          50%     { box-shadow: 0 36px 90px rgba(120,90,30,0.28), 0 0 0 1px rgba(184,150,62,0.25) inset, 0 0 50px rgba(184,150,62,0.15); }
        }

        /* Shimmer-Linie oben auf Held-Card */
        .qual-shimmer {
          background: linear-gradient(90deg, transparent, rgba(212,174,90,0.9), transparent);
          animation: qual-shimmer-move 6s ease-in-out infinite;
        }
        @keyframes qual-shimmer-move {
          0% { transform: translateX(-100%); opacity: 0 }
          25% { opacity: 1 }
          75%,100% { transform: translateX(100%); opacity: 0 }
        }

        /* Held-Card Ping-Ring um Icon */
        .qual-ping { animation: qual-ping 2.8s cubic-bezier(0,0,0.2,1) infinite; }
        @keyframes qual-ping { 0% { transform: scale(0.85); opacity: 0.9 } 70%,100% { transform: scale(1.45); opacity: 0 } }

        /* Reveal-Animations (Pure CSS — tab-stabil) */
        .qual-reveal-l {
          opacity: 0;
          transform: translateX(-24px);
          animation: qual-glide-l 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
        }
        .qual-reveal-r {
          opacity: 0;
          transform: translateX(24px);
          animation: qual-glide-r 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
        }
        @keyframes qual-glide-l { to { opacity: 1; transform: translateX(0); } }
        @keyframes qual-glide-r { to { opacity: 1; transform: translateX(0); } }

        .qual-row-reveal {
          opacity: 0;
          transform: translateX(-12px);
          animation: qual-row-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: var(--d);
        }
        @keyframes qual-row-in { to { opacity: 1; transform: translateX(0); } }

        .qual-row-soft {
          opacity: 0;
          animation: qual-soft-in 0.5s ease-out forwards;
          animation-delay: var(--d);
        }
        @keyframes qual-soft-in { to { opacity: 1; } }
      `}</style>
    </section>
  );
}
