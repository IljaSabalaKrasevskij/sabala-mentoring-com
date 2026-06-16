"use client";

import { motion } from "motion/react";

/* ─────────────────────────────────────────────────────────────────────────
   „Für wen?" — Wiedererkennung. Drei Situationen (Pains) → die drei Modi.
   Quelle: ICP v6.0 (KMU/Start-ups/Scale-ups + Bildung). Texte ohne Em-Dashes.
   ───────────────────────────────────────────────────────────────────────── */
type Segment = {
  n: string;
  title: string;
  pain: string;
  tag: string;
  color: string;
};

const SEGMENTS: Segment[] = [
  {
    n: "01",
    title: "Deine Organisation soll KI nutzen",
    pain: "Fünf bis fünfzig Leute mit echter Ambition, aber ohne internes KI-Know-how, mitten im Tool-Chaos und ohne die Zeit, während der Druck weiter wächst.",
    tag: "Für dich gebaut",
    color: "#EAC86A",
  },
  {
    n: "02",
    title: "Dein Projekt steckt fest",
    pain: "Große Vision, du kommst weit allein, doch bei Frontend, UX oder Architektur ist Schluss, und du brauchst jemanden, der mit dir über die Ziellinie geht.",
    tag: "Mit dir entwickelt",
    color: "#D4823C",
  },
  {
    n: "03",
    title: "Du willst es selbst können",
    pain: "Dein Team nutzt KI nur an der Oberfläche, oder du willst selbst bauen, aber dein Wissen liegt verteilt auf zwölf Tools.",
    tag: "Dir beigebracht",
    color: "#6FA382",
  },
];

export default function ForWhom() {
  return (
    <section className="relative overflow-hidden px-6 py-[16vh]" style={{ background: "var(--tech-bg)" }}>
      {/* feiner Gold-Schimmer im Hintergrund */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[50vh] w-[80vw] -translate-x-1/2"
        style={{ background: "radial-gradient(ellipse at top, rgba(184,150,62,0.08), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center font-mono text-[11px] uppercase tracking-[0.35em] text-gold"
        >
          // für wen ich baue
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mx-auto mt-5 max-w-2xl text-center font-serif text-cream"
          style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", lineHeight: 1.05 }}
        >
          Erkennst du dich?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-5 max-w-xl text-center text-[1.05rem] leading-relaxed text-warm-light/75"
        >
          Egal wo du gerade stehst, es gibt einen Weg, KI in dein Business zu bringen.
        </motion.p>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {SEGMENTS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.12 * i }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col rounded-2xl p-8"
              style={{
                background: "linear-gradient(160deg, rgba(255,255,255,0.045), rgba(255,255,255,0.012))",
                border: "1px solid rgba(184,150,62,0.18)",
                backdropFilter: "blur(6px)",
              }}
            >
              {/* obere Akzentlinie in der Modus-Farbe */}
              <span className="absolute left-8 right-8 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }} />

              <span className="font-mono text-[11px] tracking-[0.3em]" style={{ color: s.color }}>
                {s.n}
              </span>

              <h3 className="mt-5 font-serif text-[1.65rem] leading-tight text-cream">{s.title}</h3>

              <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-warm-light/70">{s.pain}</p>

              <span
                className="mt-7 inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors"
                style={{ color: s.color }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.color, boxShadow: `0 0 8px ${s.color}` }} />
                {s.tag}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 text-center font-mono text-[12px] uppercase tracking-[0.25em] text-warm-mid"
        >
          Drei Modi, wie wir zusammenarbeiten, die du gleich erkunden kannst.
        </motion.p>
      </div>
    </section>
  );
}
