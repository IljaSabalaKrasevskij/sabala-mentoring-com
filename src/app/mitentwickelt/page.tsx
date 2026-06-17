import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mit dir entwickelt",
  description:
    "Co-Development, Project-Rescue und Agentensysteme. Ich steige als technischer Partner in dein Projekt ein und wir bauen es gemeinsam zu Ende.",
};

const SAEULEN = [
  {
    eyebrow: "Säule 01",
    accent: "#D4823C",
    title: "Co-Development & Rescue",
    lead: "Dein Projekt läuft schon, steckt aber fest, oder dir fehlt jemand, der den technischen Teil mit dir auf Augenhöhe trägt. Ich steige als Partner in dein bestehendes Projekt ein, und wir bringen es gemeinsam dahin, wo es hingehört.",
    points: [
      {
        id: "rescue",
        name: "Project Rescue",
        body: "Festgefahrene Projekte bringe ich wieder ins Rollen, indem ich technische Schulden aufräume, den Code sortiere und aus einem hängenden Stand wieder ein Projekt mache, das vorankommt.",
      },
      {
        id: "frontend",
        name: "Frontend & UX",
        body: "Ich baue das Frontend so, dass es sich für deine Nutzer richtig anfühlt, klar, schnell und mit einem Design, das deine Marke ernst nimmt.",
      },
      {
        id: "partner",
        name: "Partner auf Augenhöhe",
        body: "Du bekommst ein Gegenüber, das deine Architektur versteht, mitdenkt und ehrlich sagt, was trägt und was du besser anders löst.",
      },
    ],
    fuer: "Für Gründer und Teams mit einem laufenden Projekt, die einen technischen Partner suchen, der mehr tut als Tickets abarbeiten.",
  },
  {
    eyebrow: "Säule 02",
    accent: "#B8963E",
    title: "Agentensysteme & Automatisierung",
    lead: "Wenn in deinem Business immer wieder dieselbe Arbeit anfällt, bauen wir gemeinsam KI-Agenten, die sie übernehmen, sauber in deine Abläufe eingebettet und auf deine Daten zugeschnitten.",
    points: [
      {
        id: "agenten",
        name: "KI-Agenten für wiederkehrende Arbeit",
        body: "Recherche, Aufbereitung, Antwortentwürfe und Reporting nehmen wir aus deinem Tag heraus und geben sie an Agenten, die rund um die Uhr für dich laufen.",
      },
      {
        id: "workflows",
        name: "Workflow-Automatisierung",
        body: "Deine Tools reden endlich miteinander, sodass Informationen automatisch dort landen, wo du sie brauchst, ganz ohne Copy-Paste zwischen zehn Programmen.",
      },
      {
        id: "agent-os",
        name: "Agent OS",
        body: "Du bekommst ein eigenes Cockpit, in dem du deine Agenten siehst, steuerst und erweiterst, damit das System mit deinem Business mitwächst.",
      },
    ],
    fuer: "Für Unternehmen, die KI fest in ihren Alltag einbauen wollen, über das reine Ausprobieren hinaus.",
  },
];

const ABLAUF = [
  { n: "01", t: "Wir reden", b: "In einem ersten Gespräch schaue ich mir an, wo du stehst, was klemmt und was du erreichen willst, ganz ohne Verpflichtung." },
  { n: "02", t: "Wir steigen ein", b: "Ich arbeite mich in deinen Code oder deine Abläufe ein, und wir legen gemeinsam fest, was zuerst dran ist." },
  { n: "03", t: "Wir bauen weiter", b: "Wir entwickeln Schritt für Schritt, du bleibst jederzeit im Bild, und am Ende führst du es selbst weiter oder behältst mich an Bord." },
];

export default function MitentwickeltPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-24 pt-40" style={{ background: "var(--tech-bg)" }}>
        <div className="pointer-events-none absolute left-1/2 top-0 h-[60vh] w-[85vw] -translate-x-1/2" style={{ background: "radial-gradient(ellipse at top, rgba(212,130,60,0.12), transparent 70%)" }} />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-gold">// mit dir entwickelt</p>
          <h1 className="mt-6 font-serif leading-[1.04] text-cream" style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", letterSpacing: "-0.015em" }}>
            Wir bauen es<br />gemeinsam zu Ende.
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-[1.25rem] leading-relaxed text-warm-light/85">
            Manche Projekte brauchen ein technisches Gegenüber auf Augenhöhe, jemanden, der mit dir in den Code steigt, dein Vorhaben wirklich versteht und es mit dir fertig macht. Genau dafür gibt es diesen Weg.
          </p>
        </div>
      </section>

      {/* Zwei Säulen */}
      <section className="px-6 py-24" style={{ background: "var(--cream)" }}>
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          {SAEULEN.map((s) => (
            <div key={s.title} className="flex flex-col rounded-[1.75rem] bg-white p-9 sm:p-11" style={{ border: "1px solid rgba(46,43,38,0.08)", boxShadow: "0 20px 50px rgba(46,43,38,0.05)" }}>
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.accent }} />
                <span className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: s.accent }}>{s.eyebrow}</span>
              </div>
              <h2 className="mt-5 font-serif text-[2.2rem] leading-tight text-deep">{s.title}</h2>
              <p className="mt-4 text-[1.05rem] leading-relaxed text-warm-mid">{s.lead}</p>

              <div className="mt-8 flex flex-col gap-6">
                {s.points.map((p) => (
                  <div key={p.id} id={p.id} className="scroll-mt-28 border-t pt-5" style={{ borderColor: "rgba(46,43,38,0.08)" }}>
                    <h3 className="font-serif text-[1.3rem] text-deep">{p.name}</h3>
                    <p className="mt-2 text-[0.98rem] leading-relaxed text-warm-mid">{p.body}</p>
                  </div>
                ))}
              </div>

              <p className="mt-8 rounded-xl px-4 py-3 text-[0.9rem] leading-relaxed text-warm-mid" style={{ background: "var(--warm-light)" }}>
                {s.fuer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Wie es läuft */}
      <section className="px-6 py-24" style={{ background: "var(--cream)" }}>
        <div className="mx-auto max-w-5xl">
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.3em] text-gold">// wie es läuft</p>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {ABLAUF.map((a) => (
              <div key={a.n}>
                <span className="font-mono text-[2rem] text-gold/40">{a.n}</span>
                <h3 className="mt-3 font-serif text-[1.5rem] text-deep">{a.t}</h3>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-warm-mid">{a.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden px-6 py-28 text-center" style={{ background: "var(--tech-bg)" }}>
        <div className="pointer-events-none absolute left-1/2 top-0 h-[45vh] w-[80vw] -translate-x-1/2" style={{ background: "radial-gradient(ellipse at top, rgba(184,150,62,0.12), transparent 70%)" }} />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="font-serif leading-[1.05] text-cream" style={{ fontSize: "clamp(2.4rem, 5.5vw, 4rem)" }}>
            Steckt dein Projekt fest?
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-[1.15rem] leading-relaxed text-warm-light/80">
            Erzähl mir kurz, wo du stehst, und wir schauen gemeinsam, ob ich der richtige Partner für deinen nächsten Schritt bin.
          </p>
          <Link href="/#kontakt" className="mt-10 inline-flex items-center justify-center rounded-full bg-gold-light px-9 py-4 font-mono text-sm uppercase tracking-[0.12em] text-tech-bg transition-colors hover:bg-gold">
            Lass uns reden
          </Link>
        </div>
      </section>
    </main>
  );
}
