"use client";

import { BUCHBAR, COHORTS, STATUS_LABEL, STATUS_COLOR, formatSessionDate, type Cohort } from "./cohorts";
import { Reveal, Eyebrow, Brackets } from "./shared";
import AnmeldeForm from "./AnmeldeForm";

/* Termin-Auswahl: jeder Lauf eine Karte mit eigenem ThriveCart-Checkout, ohne
   buchbaren Lauf die Warteliste. CTAs weiter oben springen per #termine hierher. */

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
            <span className="font-serif text-[1.2rem] text-cream">{formatSessionDate(s.date)}</span>
            <span className="font-mono text-[11px]" style={{ color: "rgba(250,248,245,0.5)" }}>{s.time}</span>
          </div>
        ))}
      </div>

      <p className="mt-5 text-sm text-warm-mid">Maximal {cohort.capacity} Plätze · alle drei Termine inklusive</p>

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
          Platz sichern · €397
          <svg width="18" height="12" viewBox="0 0 20 12" fill="none" className="transition-transform group-hover:translate-x-1">
            <path d="M0 6h18M13 1l5 5-5 5" stroke="#0a0806" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      )}
      <p className="mt-3 text-center text-xs text-warm-mid">Netto zzgl. MwSt. · für Unternehmen und Selbständige</p>
    </Reveal>
  );
}

export default function Termine() {
  if (!BUCHBAR) {
    return (
      <section id="termine" className="relative px-6 py-[16vh]" style={{ background: "var(--tech-bg)" }}>
        <div className="mx-auto max-w-2xl">
          <Eyebrow>{"// warteliste"}</Eyebrow>
          <h2 className="mt-5 text-center font-serif text-cream" style={{ fontSize: "clamp(2rem, 4.6vw, 3rem)", lineHeight: 1.08 }}>
            Der nächste Lauf wird gerade geplant.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-center text-[0.95rem] leading-relaxed text-warm-mid">
            Trag dich ein. Sobald der Termin steht, bekommst du ihn per Mail und kannst dir einen Platz sichern. Die Runde bleibt klein, maximal 6 Plätze.
          </p>

          <Reveal
            className="relative mt-12 rounded-2xl px-7 py-9"
            style={{ background: "linear-gradient(180deg, #15110b, #0d0a07)", border: "1.5px solid rgba(184,150,62,0.4)" }}
          >
            <Brackets color="var(--gold)" inset={12} size={14} />
            <AnmeldeForm
              api="/api/akademie-newsletter"
              extra={{ warteliste: "kurs" }}
              knopf="Auf die Warteliste"
              danke="Du stehst auf der Liste. Sobald der nächste Lauf feststeht, melde ich mich per Mail."
              hinweis="Du bekommst den neuen Termin und meinen Akademie-Newsletter."
            />
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section id="termine" className="relative px-6 py-[16vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="mx-auto max-w-3xl">
        <Eyebrow>{"// dein nächster kurs"}</Eyebrow>
        <h2 className="mt-5 text-center font-serif text-cream" style={{ fontSize: "clamp(2rem, 4.6vw, 3rem)", lineHeight: 1.08 }}>
          Drei Freitage für dein Second Brain.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center text-[0.95rem] leading-relaxed text-warm-mid">
          Zwei Workshops zum Aufbauen, danach eine zusätzliche Q&amp;A-Session für deine Fragen aus der Praxis. Alle Uhrzeiten in deutscher Zeit (MEZ).
        </p>

        <div className={`mx-auto mt-12 grid gap-6 ${COHORTS.length > 1 ? "sm:grid-cols-2" : "max-w-xl"}`}>
          {COHORTS.map((c) => (
            <CohortCard key={c.id} cohort={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
