"use client";

import { motion } from "motion/react";

/* ─────────────────────────────────────────────────────────────────────────
   /mitentwickelt — zwei Säulen, High-End editorial.
   Säule 1: Co-Development & Frontend/Design  ·  Säule 2: Agentensysteme.
   Der Kontakt-Block kommt global aus dem Layout darunter.
   ───────────────────────────────────────────────────────────────────────── */

const SAEULEN = [
  {
    n: "01",
    accent: "#D4823C",
    eyebrow: "Co-Development & Design",
    title: "Wir bauen dein Projekt gemeinsam weiter.",
    lead: "Du hast ein laufendes Projekt und brauchst jemanden, der den technischen Teil mit dir auf Augenhöhe trägt. Ich steige als Partner in deinen Code ein, und sehr oft ist es genau das Design, das am Ende den Unterschied macht.",
    bg: "var(--tech-bg)",
    points: [
      { id: "codev", name: "Co-Development", body: "Ich arbeite in deinem Repo mit, denke in deiner Architektur und bringe das Projekt mit dir Schritt für Schritt dahin, wo es hin soll." },
      { id: "frontend", name: "Frontend & Design", body: "Gerade bei technik- und backendlastigen Teams hebt ein starkes Frontend alles, ich baue Oberflächen, die sich klar, schnell und hochwertig anfühlen." },
      { id: "partner", name: "Partner auf Augenhöhe", body: "Du bekommst ein Gegenüber, das mitdenkt, ehrlich sagt was trägt, und dir den Rücken freihält, statt nur Tickets abzuarbeiten." },
    ],
    fuer: "Für Gründer und Teams mit laufendem Projekt, die einen Entwickler mit echtem Gespür für Design suchen.",
  },
  {
    n: "02",
    accent: "#D4AE5A",
    eyebrow: "Agentensysteme & Automatisierung",
    title: "Wir bauen KI fest in deinen Alltag ein.",
    lead: "Wenn in deinem Business immer wieder dieselbe Arbeit anfällt, entwickeln wir gemeinsam KI-Agenten, die sie übernehmen, sauber in deine Abläufe eingebettet und auf deine Daten zugeschnitten.",
    bg: "#0E0B08",
    points: [
      { id: "agenten", name: "KI-Agenten für wiederkehrende Arbeit", body: "Recherche, Aufbereitung, Antwortentwürfe und Reporting nehmen wir aus deinem Tag heraus und geben sie an Agenten, die rund um die Uhr für dich laufen." },
      { id: "workflows", name: "Workflow-Automatisierung", body: "Deine Tools reden endlich miteinander, sodass Informationen automatisch dort landen, wo du sie brauchst, ganz ohne Copy-Paste zwischen zehn Programmen." },
      { id: "agent-os", name: "Agent OS", body: "Du bekommst ein eigenes Cockpit, in dem du deine Agenten siehst, steuerst und erweiterst, damit das System mit deinem Business mitwächst." },
    ],
    fuer: "Für Unternehmen, die KI fest in ihren Alltag einbauen wollen, über das reine Ausprobieren hinaus.",
  },
];

const ABLAUF = [
  { n: "01", t: "Wir reden", b: "In einem ersten Gespräch schaue ich mir an, wo du stehst und was du erreichen willst, ganz ohne Verpflichtung." },
  { n: "02", t: "Wir steigen ein", b: "Ich arbeite mich in deinen Code oder deine Abläufe ein, und wir legen gemeinsam fest, was zuerst dran ist." },
  { n: "03", t: "Wir bauen weiter", b: "Wir entwickeln Schritt für Schritt, du bleibst jederzeit im Bild, und am Ende führst du es selbst weiter oder behältst mich an Bord." },
];

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

export default function MitentwickeltPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[80vh] items-center overflow-hidden px-6" style={{ background: "var(--tech-bg)" }}>
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[70vh] w-[90vw] -translate-x-1/2 -translate-y-1/2" style={{ background: "radial-gradient(ellipse at center, rgba(212,130,60,0.14), transparent 68%)" }} />
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative mx-auto max-w-4xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-gold">// mit dir entwickelt</p>
          <h1 className="mx-auto mt-8 font-serif leading-[1.02] text-cream" style={{ fontSize: "clamp(2.9rem, 8vw, 6.5rem)", letterSpacing: "-0.02em" }}>
            Wir bauen es<br />gemeinsam zu Ende.
          </h1>
          <p className="mx-auto mt-9 max-w-xl text-[1.25rem] leading-relaxed text-warm-light/85">
            Manche Projekte brauchen ein technisches Gegenüber auf Augenhöhe, jemanden, der mit dir in den Code steigt, dein Vorhaben wirklich versteht und es mit dir fertig macht. Zwei Wege, wie das aussieht.
          </p>
        </motion.div>
      </section>

      {/* Zwei Säulen — große, alternierende Blöcke */}
      {SAEULEN.map((s) => (
        <section key={s.n} className="relative overflow-hidden px-6 py-[16vh]" style={{ background: s.bg }}>
          {/* Riesige Wasserzeichen-Nummer */}
          <span
            className="pointer-events-none absolute -top-10 right-2 select-none font-serif leading-none sm:right-10"
            style={{ fontSize: "clamp(9rem, 26vw, 22rem)", color: s.accent, opacity: 0.07 }}
            aria-hidden
          >
            {s.n}
          </span>

          <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.85fr_1fr]">
            {/* Linke Spalte: Titel */}
            <motion.div {...fade} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.accent }} />
                <span className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: s.accent }}>{s.eyebrow}</span>
              </div>
              <h2 className="mt-6 font-serif leading-[1.06] text-cream" style={{ fontSize: "clamp(2.2rem, 4.6vw, 3.6rem)", letterSpacing: "-0.015em" }}>
                {s.title}
              </h2>
              <p className="mt-7 max-w-md text-[1.1rem] leading-relaxed text-warm-light/75">{s.lead}</p>
              <p className="mt-9 inline-block rounded-full px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.18em]" style={{ border: `1px solid ${s.accent}55`, color: s.accent }}>
                {s.fuer}
              </p>
            </motion.div>

            {/* Rechte Spalte: Punkte mit Hairlines */}
            <motion.div {...fade} transition={{ duration: 0.6, delay: 0.12 }} className="flex flex-col">
              {s.points.map((p, i) => (
                <div
                  key={p.id}
                  id={p.id}
                  className="scroll-mt-28 border-t py-7"
                  style={{ borderColor: "rgba(255,255,255,0.09)", borderBottom: i === s.points.length - 1 ? "1px solid rgba(255,255,255,0.09)" : "none" }}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[12px]" style={{ color: s.accent }}>{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="font-serif text-[1.6rem] text-cream">{p.name}</h3>
                      <p className="mt-2 text-[1rem] leading-relaxed text-warm-light/70">{p.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      ))}

      {/* Wie es läuft */}
      <section className="px-6 py-[15vh]" style={{ background: "var(--tech-bg)" }}>
        <div className="mx-auto max-w-5xl">
          <motion.p {...fade} transition={{ duration: 0.5 }} className="text-center font-mono text-[11px] uppercase tracking-[0.32em] text-gold">
            // wie es läuft
          </motion.p>
          <div className="mt-14 grid gap-12 sm:grid-cols-3">
            {ABLAUF.map((a, i) => (
              <motion.div key={a.n} {...fade} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <span className="font-serif text-[2.6rem] text-gold/30">{a.n}</span>
                <h3 className="mt-2 font-serif text-[1.6rem] text-cream">{a.t}</h3>
                <p className="mt-3 text-[1rem] leading-relaxed text-warm-light/70">{a.b}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
