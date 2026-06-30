"use client";

import { COHORTS, STATUS_LABEL, STATUS_COLOR, type Cohort } from "./cohorts";
import { Reveal, Eyebrow, Brackets } from "./shared";

/* Termin-Auswahl: jeder Lauf eine Karte mit eigenem ThriveCart-Checkout.
   CTAs weiter oben springen per #termine hierher. */

function CohortCard({ cohort }: { cohort: Cohort }) {
  const soldOut = cohort.status === "ausgebucht";
  return (
    <Reveal
      className="relative flex flex-col rounded-2xl px-7 py-8"
      style={{ background: "linear-gradient(180deg, #15110b, #0d0a07)", border: "1.5px solid rgba(184,150,62,0.4)" }}
    >
      <Brackets color="var(--gold)" inset={12} size={14} />

      <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: STATUS_COLOR[cohort.status] }}>
        <span className="inline-flex h-2 w-2 rounded-full" style={{ background: STATUS_COLOR[cohort.status] }} />
        {STATUS_LABEL[cohort.status]}
      </span>

      <div className="mt-5 flex flex-col gap-3">
        {cohort.sessions.map((s) => (
          <div key={s.label} className="flex flex-col">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--gold)" }}>{s.label}</span>
            <span className="font-serif text-[1.2rem] text-cream">{s.date}</span>
            <span className="font-mono text-[11px]" style={{ color: "rgba(250,248,245,0.5)" }}>{s.time}</span>
          </div>
        ))}
      </div>

      {soldOut ? (
        <span className="mt-7 inline-flex w-full items-center justify-center font-sans font-semibold" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(250,248,245,0.4)", padding: "18px 28px", cursor: "not-allowed" }}>
          Ausgebucht
        </span>
      ) : (
        <a
          href={cohort.checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-7 inline-flex w-full items-center justify-center gap-3 font-sans font-semibold transition-all"
          style={{ background: "var(--gold)", color: "#0a0806", letterSpacing: "0.08em", padding: "18px 28px", fontSize: "1rem" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "var(--gold-light)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "var(--gold)")}
        >
          Platz sichern — €197
          <svg width="18" height="12" viewBox="0 0 20 12" fill="none" className="transition-transform group-hover:translate-x-1">
            <path d="M0 6h18M13 1l5 5-5 5" stroke="#0a0806" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      )}
    </Reveal>
  );
}

export default function Termine() {
  return (
    <section id="termine" className="relative px-6 py-[16vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="mx-auto max-w-3xl">
        <Eyebrow>{"// waehle deinen start"}</Eyebrow>
        <h2 className="mt-5 text-center font-serif text-cream" style={{ fontSize: "clamp(2rem, 4.6vw, 3rem)", lineHeight: 1.08 }}>
          Wann willst du starten?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center text-[0.95rem] leading-relaxed text-warm-mid">
          Such dir den Lauf, an dem du an beiden Terminen live dabei sein kannst. Kleine Runde, feste Plätze.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {COHORTS.map((c) => (
            <CohortCard key={c.id} cohort={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
