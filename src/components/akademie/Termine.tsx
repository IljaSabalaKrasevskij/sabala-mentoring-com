"use client";

import { Check } from "lucide-react";
import {
  BUCHBAR,
  COCKPIT_EINRICHTUNG_PREIS,
  COHORTS,
  KURS_PREIS,
  KURS_RATE,
  STATUS_COLOR,
  STATUS_LABEL,
  TERMIN_NAMEN,
  formatSessionDate,
  zeitText,
  type Cohort,
} from "./cohorts";
import { Brackets, Eyebrow, Knopf, Reveal, SektionsKopf, TEXT_AUF_DUNKEL } from "./shared";
import AnmeldeForm from "./AnmeldeForm";

/* Dein Platz: der eine Angebots-Block der Kursseite. Links, was alles drin ist, rechts je Lauf eine
   Karte mit Terminen, Preis und Buchung (eigener ThriveCart-Checkout). Ohne buchbaren Lauf steht hier
   die Warteliste. Alle Knöpfe weiter oben und Links von anderen Seiten springen per #termine hierher. */

const DRIN: [was: string, wert: number | string][] = [
  ["Workshop 1 live (2,5 Stunden): dein Wissen an einem Ort", 249],
  ["Workshop 2 live (2,5 Stunden): Claude bekommt ein Gedächtnis", 249],
  ["Skill-Paket: fünf Skills von Closing-Routine bis Repo-Vetting", 19],
  ["Live-Umsetzung und Fragen in beiden Workshops", 49],
  ["Fragestunde (1 Stunde live)", "inklusive"],
  ["Starter-Vault, Vorlagen und alle Prompts", "inklusive"],
  ["Bonus: Design-Paket und ein Werkzeug nach Wahl, Social Media Cockpit oder Mail- und Newsletter-Programm", "geschenkt"],
];

const EINZELN = DRIN.reduce((summe, [, wert]) => summe + (typeof wert === "number" ? wert : 0), 0);

function BuchungsKarte({ cohort }: { cohort: Cohort }) {
  const ausgebucht = cohort.status === "ausgebucht";
  return (
    <Reveal className="relative rounded-2xl px-6 py-7 sm:px-8" style={{ background: "linear-gradient(180deg, #17120b, #0d0a07)", border: "1.5px solid var(--gold)", boxShadow: "0 0 60px rgba(184,150,62,0.2), 0 30px 80px rgba(0,0,0,0.5)" }}>
      <Brackets color="var(--gold)" inset={12} size={14} />

      <p className="flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-[12.5px] uppercase tracking-[0.14em]">
        <span className="flex items-center gap-2.5" style={{ color: STATUS_COLOR[cohort.status] }}>
          <span className="h-2 w-2 rounded-full" style={{ background: STATUS_COLOR[cohort.status] }} />
          {STATUS_LABEL[cohort.status]}
        </span>
        <span style={{ color: "rgba(250,248,245,0.65)" }}>Maximal {cohort.capacity} Plätze</span>
      </p>

      <dl className="mt-5 space-y-3">
        {cohort.sessions.map((s, i) => (
          <div key={s.date} className="grid grid-cols-[7.2rem_1fr] items-baseline gap-x-3">
            <dt className="font-mono text-[12.5px] uppercase tracking-[0.12em] text-gold">{TERMIN_NAMEN[i] ?? s.label}</dt>
            <dd>
              <span className="block font-serif text-[1.2rem] leading-tight text-cream">{formatSessionDate(s.date)}</span>
              <span className="block text-[0.9rem]" style={{ color: "rgba(250,248,245,0.65)" }}>
                {zeitText(s.time)}
              </span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex items-end gap-4 border-t pt-5" style={{ borderColor: "rgba(184,150,62,0.3)" }}>
        <span className="font-serif leading-[0.9] text-gold-light" style={{ fontSize: "clamp(3.2rem, 7vw, 4rem)" }}>
          {KURS_PREIS} €
        </span>
        {/* B2B-Hinweis weiter unten: Die Akademie richtet sich an Unternehmen, deshalb Nettopreise.
            Ohne ihn muesste gegenueber Verbrauchern brutto ausgezeichnet werden (§ 3 PAngV). */}
        <span className="pb-1 text-[0.95rem] leading-snug" style={{ color: TEXT_AUF_DUNKEL }}>
          netto zzgl. MwSt.
          <br />
          oder 2 × {KURS_RATE} €
        </span>
      </div>

      <div className="mt-6">
        {ausgebucht ? (
          <span className="flex min-h-[52px] w-full items-center justify-center font-sans text-[1rem] font-semibold" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(250,248,245,0.5)", cursor: "not-allowed" }}>
            Ausgebucht
          </span>
        ) : (
          <Knopf href={cohort.checkoutUrl} neuerTab breit>
            Platz sichern
          </Knopf>
        )}
      </div>
      <p className="mt-4 text-[0.9rem] leading-relaxed" style={{ color: "rgba(250,248,245,0.65)" }}>
        Angebot für Unternehmen und Selbständige. Bitte plane beide Workshops live ein.
      </p>
    </Reveal>
  );
}

export default function Termine() {
  if (!BUCHBAR) {
    return (
      <section id="termine" className="relative px-6 py-[12vh]" style={{ background: "var(--tech-bg)" }}>
        <div className="mx-auto max-w-2xl">
          <Eyebrow>Warteliste</Eyebrow>
          <h2 className="mt-5 text-center font-serif text-cream" style={{ fontSize: "clamp(2rem, 4.6vw, 3rem)", lineHeight: 1.08 }}>
            Der nächste Lauf wird gerade geplant.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-center text-[1rem] leading-relaxed" style={{ color: TEXT_AUF_DUNKEL }}>
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
            />
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section id="termine" className="relative overflow-hidden px-6 py-[8vh]" style={{ background: "var(--tech-bg)" }}>
      {/* alter Sprungpunkt, falls noch ein Link auf #preis zeigt */}
      <span id="preis" className="absolute top-0" />
      <div className="pointer-events-none absolute right-[-5vw] top-1/2 h-[90vh] w-[70vw] -translate-y-1/2" style={{ background: "radial-gradient(ellipse, rgba(184,150,62,0.17), transparent 70%)" }} />

      {/* Drei Teile: Kopf, Buchungskarte, Liste. Am Handy in dieser Reihenfolge, damit Termine, Preis und Knopf
          gleich oben stehen. Am Laptop stehen Kopf und Liste links, die Karte rechts daneben. */}
      <div className="relative mx-auto grid max-w-6xl gap-x-14 gap-y-8 min-[56.25rem]:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] min-[56.25rem]:gap-y-6">
        <div className="min-[56.25rem]:col-start-1 min-[56.25rem]:row-start-1">
          <SektionsKopf links zeile="Dein Platz" titel="Alles drin. Ein Preis." />
        </div>

        <div className="space-y-6 min-[56.25rem]:col-start-2 min-[56.25rem]:row-span-2 min-[56.25rem]:row-start-1 min-[56.25rem]:self-center">
          {COHORTS.map((c) => (
            <BuchungsKarte key={c.id} cohort={c} />
          ))}
        </div>

        <Reveal delay={0.05} className="min-[56.25rem]:col-start-1 min-[56.25rem]:row-start-2">
          <ul>
            {DRIN.map(([was, wert]) => (
              <li key={was} className="flex items-start justify-between gap-4 border-b py-2.5" style={{ borderColor: "rgba(250,248,245,0.1)" }}>
                <span className="flex items-start gap-3 text-[1rem] leading-snug text-cream">
                  <Check aria-hidden size={18} strokeWidth={2.6} className="mt-[2px] shrink-0 text-gold" />
                  {was}
                </span>
                <span className="shrink-0 pt-px text-[0.9rem]" style={{ color: "rgba(250,248,245,0.6)" }}>
                  {typeof wert === "number" ? `${wert} €` : wert}
                </span>
              </li>
            ))}
            <li className="flex items-baseline justify-between gap-4 pt-3.5">
              <span className="text-[0.95rem]" style={{ color: TEXT_AUF_DUNKEL }}>
                Einzeln gerechnet
              </span>
              <span className="text-[1rem] line-through" style={{ color: "rgba(250,248,245,0.6)" }}>
                {EINZELN} €
              </span>
            </li>
          </ul>
          <p className="mt-5 text-[0.9rem] leading-relaxed" style={{ color: "rgba(250,248,245,0.65)" }}>
            Wählst du das Cockpit, richten wir es auf Wunsch gemeinsam ein, für {COCKPIT_EINRICHTUNG_PREIS} € zzgl. MwSt.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
