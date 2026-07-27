"use client";

import { motion } from "framer-motion";
import { Brackets, Eyebrow } from "./shared";

/* ─────────────────────────────────────────────────────────────────────────
   BeforeAfter — Heute → Nach den 2 Sessions, plus Zukunfts-Vision
   ───────────────────────────────────────────────────────────────────────── */

const ROWS: [string, string][] = [
  ["Jede Claude-Session startet bei null", "Claude weiß nach 3 Tagen noch, woran ihr gearbeitet habt"],
  ["Wissen liegt in 5 verschiedenen Tools", "Alles in einem System, Claude hat Zugriff"],
  ["Du erklärst immer wieder denselben Kontext", 'Du öffnest Claude, er fragt: "Weiter mit dem Projekt?"'],
  ['Claude Code ist "zu kompliziert"', "Das Terminal macht dir keine Angst mehr"],
  ["Du verbrennst Token für Kontext", "Du nutzt Token für echte Arbeit"],
];

const VISIONS: { eyebrow: string; head: string; body: string }[] = [
  {
    eyebrow: "Deine Projekte",
    head: "laufen anders.",
    body: "Was du in fünf Stunden lernst, sparst du bei jedem Kundenprojekt wieder rein — und lieferst Qualität, die vorher nicht möglich war. Webseiten, die wirklich verkaufen. Systeme, die wirklich Arbeit übernehmen.",
  },
  {
    eyebrow: "Deine Rolle",
    head: "verschiebt sich.",
    body: "Du bist nicht mehr Anwender — du wirst Architekt. Du orchestrierst deinen eigenen KI-Stack: Skills, Memories, Verbindungen. Du verstehst, was möglich ist und was nicht. Plötzlich baust du Sachen, an die du vorher nicht gedacht hättest.",
  },
  {
    eyebrow: "Dein Vorsprung",
    head: "wird zum Angebot.",
    body: "Deine Coachees, deine Kunden, dein Team fragen nach. Aus deinem Setup wird dein Vorsprung. Und aus deinem Vorsprung wird dein nächstes Angebot — Workshops, die du selbst gibst, weil du den Stack jetzt verstehst.",
  },
];

export default function BeforeAfter() {
  return (
    <section className="relative overflow-hidden px-6 py-[18vh]" style={{ background: "var(--tech-bg)" }}>
      {/* atmosphärischer Gold-Glow von oben + Synapsen-Hauch */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[40vh] w-[80vw] -translate-x-1/2" style={{ background: "radial-gradient(ellipse at top, rgba(184,150,62,0.1), transparent 70%)" }} />
      <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 md:block" style={{ background: "linear-gradient(to bottom, transparent, rgba(184,150,62,0.18), transparent)" }} />

      <div className="relative mx-auto max-w-5xl">
        <Eyebrow>// der unterschied</Eyebrow>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-5 max-w-2xl text-center font-serif text-cream"
          style={{ fontSize: "clamp(2rem, 4.8vw, 3.4rem)", lineHeight: 1.06 }}
        >
          Was sich konkret ändert
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-5 mb-14 max-w-xl text-center text-[1.02rem] leading-relaxed text-warm-light/70"
        >
          Fünf alltägliche Reibungspunkte, die nach den zwei Sessions verschwinden — und an ihre Stelle tritt etwas, das du heute noch nicht erwartest.
        </motion.p>

        {/* ─── 5 Vorher/Nachher Zeilen ─── */}
        <div className="ba-rows space-y-4">
          {/* Spaltenköpfe */}
          <div className="ba-head grid items-center gap-3 px-2 md:grid-cols-[1fr_auto_1fr] md:gap-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: "rgba(250,248,245,0.4)" }}>// heute</span>
            <span className="hidden text-warm-mid md:inline">·</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">// nach den 2 sessions</span>
          </div>

          {ROWS.map(([before, after], i) => (
            <div
              key={i}
              className="ba-row grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr] md:gap-6"
              style={{ "--d": `${0.15 + i * 0.1}s` } as React.CSSProperties}
            >
              {/* Vorher — dezenter, gestrichen-vibe */}
              <div
                className="ba-before relative rounded-xl px-5 py-4 text-[0.95rem] leading-snug"
                style={{ background: "rgba(255,255,255,0.018)", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(250,248,245,0.45)" }}
              >
                <span className="absolute -left-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full" style={{ background: "rgba(250,248,245,0.18)" }} />
                {before}
              </div>

              {/* Arrow — wandelt visuell von links nach rechts */}
              <div className="ba-arrow flex items-center justify-center py-1 md:py-0">
                <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "rgba(184,150,62,0.12)", border: "1px solid rgba(184,150,62,0.4)" }}>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ color: "var(--gold)" }}>
                    <path d="M3 10h13M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>

              {/* Nachher — Gold-Akzent, präsent */}
              <div
                className="ba-after relative rounded-xl px-5 py-4 text-[0.96rem] leading-snug"
                style={{ background: "linear-gradient(135deg, rgba(184,150,62,0.12), rgba(184,150,62,0.06))", border: "1px solid rgba(184,150,62,0.42)", color: "rgba(250,248,245,0.94)", boxShadow: "0 8px 24px rgba(184,150,62,0.1)" }}
              >
                <Brackets color="rgba(184,150,62,0.45)" inset={6} size={7} />
                <span className="inline-flex items-start gap-2.5">
                  <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full" style={{ background: "var(--gold)", color: "#0a0806" }}>
                    <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6.5l2.5 2.5L10 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span>{after}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ─── Zukunfts-Vision ─── */}
        <div className="ba-vision relative mt-32">
          {/* Übergangs-Linie */}
          <div className="pointer-events-none absolute -top-16 left-1/2 h-12 w-px -translate-x-1/2" style={{ background: "linear-gradient(to bottom, transparent, var(--gold))" }} />
          <div className="pointer-events-none absolute -top-3 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full" style={{ background: "var(--gold)", boxShadow: "0 0 18px var(--gold)" }} />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="text-center font-mono text-[11px] uppercase tracking-[0.32em] text-gold"
          >
            // drei monate später
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mx-auto mt-5 max-w-3xl text-center font-serif text-cream"
            style={{ fontSize: "clamp(1.8rem, 4.4vw, 2.9rem)", lineHeight: 1.08 }}
          >
            Und dann öffnet sich etwas, das du jetzt noch nicht{" "}
            <span style={{ color: "var(--gold)" }}>kommen siehst.</span>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-center text-[1.05rem] leading-relaxed text-warm-light/70"
          >
            Diese fünf Stunden wirken nicht für die nächste Session. Sie wirken für jedes Kundenprojekt, jeden Workshop, jedes neue System. Und so verändert sich, wofür du eigentlich gebucht wirst.
          </motion.p>

          <div className="mt-14 grid gap-5 md:grid-cols-3 md:gap-6">
            {VISIONS.map((v, i) => (
              <div
                key={v.eyebrow}
                className="ba-vision-card relative overflow-hidden rounded-2xl p-7"
                style={{
                  background: "linear-gradient(180deg, rgba(184,150,62,0.06), rgba(184,150,62,0.015))",
                  border: "1px solid rgba(184,150,62,0.28)",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
                  "--d": `${0.3 + i * 0.15}s`,
                } as React.CSSProperties}
              >
                <Brackets color="rgba(184,150,62,0.55)" inset={10} size={10} />
                {/* Index */}
                <span className="font-serif" style={{ fontSize: "3.2rem", lineHeight: 1, color: "rgba(184,150,62,0.32)" }}>
                  0{i + 1}
                </span>
                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-gold">// {v.eyebrow}</p>
                <h4 className="mt-2 font-serif text-[1.55rem] leading-tight text-cream">{v.head}</h4>
                <p className="mt-4 text-[0.96rem] leading-relaxed text-warm-light/75">{v.body}</p>
                {/* Glow-Akzent unten */}
                <span className="pointer-events-none absolute -bottom-12 left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(ellipse, rgba(184,150,62,0.18), transparent 70%)" }} />
              </div>
            ))}
          </div>

          {/* Final-Statement */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto mt-14 max-w-2xl text-center font-serif text-[1.25rem] leading-relaxed text-cream/85"
          >
            Du gehst nicht raus mit einem besseren Tool. Du gehst raus mit einem{" "}
            <span style={{ color: "var(--gold)" }}>anderen Standpunkt.</span>
          </motion.p>
        </div>
      </div>

      <style>{`
        /* Reveal: Spaltenköpfe + Zeilen kaskadieren rein */
        .ba-head {
          opacity: 0;
          animation: ba-fade 0.5s ease-out 0.05s forwards;
        }
        .ba-row {
          opacity: 0;
          animation: ba-row-in 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: var(--d);
        }
        @keyframes ba-fade { to { opacity: 1; } }
        @keyframes ba-row-in {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Arrow-Icon pulsiert sanft */
        .ba-arrow > span {
          animation: ba-arrow-pulse 3s ease-in-out infinite;
        }
        @keyframes ba-arrow-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(184,150,62,0.32); }
          50%     { box-shadow: 0 0 0 6px rgba(184,150,62,0); }
        }

        /* Nachher-Cards glühen sanft im Loop */
        .ba-after {
          animation: ba-after-glow 5s ease-in-out infinite;
        }
        @keyframes ba-after-glow {
          0%,100% { box-shadow: 0 8px 24px rgba(184,150,62,0.1); }
          50%     { box-shadow: 0 12px 36px rgba(184,150,62,0.22), 0 0 24px rgba(184,150,62,0.12); }
        }

        /* Vision-Cards: Reveal + permanenter sanfter Glow */
        .ba-vision-card {
          opacity: 0;
          transform: translateY(20px);
          animation: ba-vision-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: var(--d);
        }
        @keyframes ba-vision-in {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
