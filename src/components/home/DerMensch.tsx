"use client";

import Image from "next/image";
import { motion } from "motion/react";

/* ─────────────────────────────────────────────────────────────────────────
   „Der Mensch dahinter" — Portrait + Denkweise (Differenzierer).
   Heller Atemzug nach der dunklen Planetenwelt. Texte im Fluss, kleines „du".
   ───────────────────────────────────────────────────────────────────────── */
type Pillar = { term: string; line: string };

const PILLARS: Pillar[] = [
  {
    term: "Critical Thinking",
    line: "Ich hinterfrage zuerst, damit du am Ende nicht für falsche Annahmen bezahlst.",
  },
  {
    term: "Creative Thinking",
    line: "Ich suche den Weg, den noch keiner gegangen ist, statt eine Vorlage über dein Projekt zu legen.",
  },
  {
    term: "Analyse",
    line: "Ich schaue auf Substanz und Daten, nicht auf den schnellen Effekt.",
  },
];

export default function DerMensch() {
  return (
    <section className="relative overflow-hidden px-6 py-[16vh]" style={{ background: "var(--cream)" }}>
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto w-[min(78vw,400px)]"
        >
          {/* sanfter Gold-Halo hinter dem Kreis */}
          <div
            className="pointer-events-none absolute inset-0 -z-0"
            style={{ background: "radial-gradient(circle, rgba(184,150,62,0.22), transparent 68%)", transform: "scale(1.15)" }}
          />
          <Image
            src="/ilja-portrait.png"
            alt="Ilja Krasevskij"
            width={1000}
            height={1000}
            className="relative rounded-full"
            style={{ boxShadow: "0 30px 70px rgba(80,60,20,0.28)" }}
          />
        </motion.div>

        {/* Text */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="font-mono text-[11px] uppercase tracking-[0.35em] text-gold"
          >
            // der mensch dahinter
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 font-serif leading-[1.05] text-deep"
            style={{ fontSize: "clamp(2.2rem, 4.6vw, 3.4rem)", color: "#2A2520" }}
          >
            Ich bin Ilja.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 max-w-xl text-[1.1rem] leading-relaxed"
            style={{ color: "#46403A" }}
          >
            Bevor ich für dich baue, denke ich erst mit dir, weil die beste Technik nichts wert ist, wenn die Idee dahinter nicht stimmt.
          </motion.p>

          <div className="mt-10 space-y-6">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.term}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
                className="flex gap-4"
              >
                <span className="mt-2 h-px w-8 shrink-0" style={{ background: "var(--gold)" }} />
                <div>
                  <h3 className="font-mono text-[12px] uppercase tracking-[0.22em] text-gold">{p.term}</h3>
                  <p className="mt-1.5 text-[1.02rem] leading-relaxed" style={{ color: "#46403A" }}>
                    {p.line}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-10 max-w-xl font-serif text-[1.2rem] italic leading-relaxed"
            style={{ color: "#2A2520" }}
          >
            Für mich ist das die Art, wie ich der Welt etwas zurückgebe.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
