"use client";

import { Check } from "lucide-react";
import { GOLD_AUF_HELL, HEBT, Knopf, Reveal, SektionsKopf, TEXT_AUF_DUNKEL, TEXT_AUF_HELL, TiltCard } from "./shared";
import { BERATUNG_GUTSCHEIN, BERATUNG_PREIS, BERATUNG_PREIS_REGULAER, CURRENT_COHORT, KURS_PREIS, KURS_RATE, STATUS_LABEL, TERMIN_NAMEN, formatTagMonat } from "./cohorts";

/* Jetzt buchbar: die zwei Angebote der Akademie nebeneinander, je mit Stufe, Nutzen, Eckdaten, Preis und Knopf.
   Links die Beratungsstunde als leichter Einstieg, rechts hell hervorgehoben der Kurs mit seinen Terminen.
   Die Termine stehen nur hier (der frühere Kalender zeigte dieselben drei Tage noch einmal).
   Preise und Termine kommen aus cohorts.ts. Der Anker #kurse bleibt, die Startseite verlinkt darauf. */

function Punkte({ punkte, hell = false }: { punkte: string[]; hell?: boolean }) {
  return (
    <ul className="mt-4 space-y-2 [transform-style:preserve-3d]">
      {punkte.map((p) => (
        <li key={p} className="flex items-start gap-3 text-[0.97rem] leading-snug [transform-style:preserve-3d]" style={{ color: hell ? TEXT_AUF_HELL : TEXT_AUF_DUNKEL }}>
          <span className={`mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-tech-bg ${HEBT}`}>
            <Check aria-hidden size={13} strokeWidth={3} />
          </span>
          {p}
        </li>
      ))}
    </ul>
  );
}

export default function CourseGrid() {
  /* Zwei Workshops in einer Zeile, die Fragestunde in der zweiten: die Uhrzeiten stehen auf der Kursseite.
     Hat ein Lauf einmal nicht genau drei Termine, steht jeder in einer eigenen Zeile. */
  const tage = CURRENT_COHORT?.sessions.map((s) => formatTagMonat(s.date));
  const termine = tage && (tage.length === 3 ? [`Workshops am ${tage[0]} und ${tage[1]}`, `${TERMIN_NAMEN[2]} am ${tage[2]}`] : tage.map((t, i) => `${TERMIN_NAMEN[i] ?? CURRENT_COHORT!.sessions[i].label}: ${t}`));

  return (
    <section id="kurse" className="relative overflow-hidden px-6 py-[6vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="pointer-events-none absolute left-1/2 top-[-10%] h-[70vh] w-[70vw] -translate-x-1/2" style={{ background: "radial-gradient(ellipse, rgba(212,174,90,0.12), transparent 70%)" }} />

      <div className="relative mx-auto max-w-6xl">
        <SektionsKopf
          zeile="Jetzt buchbar"
          titel={
            <>
              Lerne, was wirklich funktioniert. <span className="text-gold-light">Mit mir, live.</span>
            </>
          }
        />

        <div className="mt-8 grid items-stretch gap-5 min-[56.25rem]:grid-cols-2">
          {/* Beratungsstunde: der leichte Einstieg */}
          <Reveal>
            <TiltCard hervor={1.02} max={4} radius={16} glow="rgba(212,174,90,0.14)" className="group/karte h-full p-6 md:p-7" style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(212,174,90,0.42)" }}>
              <div className="flex h-full flex-col [transform-style:preserve-3d]">
                <p className="font-mono text-[12.5px] uppercase tracking-[0.18em] text-gold-light">Stufe 1 · Einzelgespräch · 60 Minuten</p>
                <h3 className="mt-2 font-serif text-[1.9rem] leading-tight text-cream">Deine Beratungsstunde</h3>
                <p className="mt-2.5 text-[1.04rem] leading-relaxed" style={{ color: "rgba(250,248,245,0.86)" }}>
                  Du fragst, ich zeige es dir live am Bildschirm, an deinem Fall. Danach bekommst du alles schriftlich.
                </p>
                <Punkte punkte={["Kein Vorwissen nötig", "Den Termin suchst du dir nach der Buchung aus", `Dazu ein Gutschein über ${BERATUNG_GUTSCHEIN} € für den Second-Brain-Kurs`]} />
                <div className="mt-auto flex flex-wrap items-end justify-between gap-x-6 gap-y-4 pt-5">
                  <p className="leading-none">
                    <span className="font-serif text-[2.5rem] text-gold-light">{BERATUNG_PREIS} €</span>
                    <span className="ml-3 text-[0.95rem]" style={{ color: TEXT_AUF_DUNKEL }}>
                      statt {BERATUNG_PREIS_REGULAER} €, netto
                    </span>
                  </p>
                  <Knopf href="/beratung">Zur Beratung</Knopf>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* Der Kurs: hell hervorgehoben, mit Terminen und Stand der Plätze */}
          <Reveal delay={0.08}>
            <TiltCard
              hervor={1.02}
              max={4}
              radius={16}
              className="group/karte h-full p-6 shadow-[0_30px_80px_rgba(0,0,0,0.5),0_0_60px_rgba(184,150,62,0.16)] hover:shadow-[0_44px_100px_rgba(0,0,0,0.6),0_0_90px_rgba(184,150,62,0.32)] md:p-7"
              style={{ background: "linear-gradient(160deg, #ffffff 0%, #faf5e8 70%, #f1e6c8 100%)" }}
            >
              <div className="flex h-full flex-col [transform-style:preserve-3d]">
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                  <p className="font-mono text-[12.5px] uppercase tracking-[0.18em]" style={{ color: GOLD_AUF_HELL }}>
                    {CURRENT_COHORT ? `Stufe 2 · Live-Kurs · ab ${formatTagMonat(CURRENT_COHORT.start)}` : "Stufe 2 · Live-Kurs · Termin in Planung"}
                  </p>
                  {CURRENT_COHORT && (
                    <p className="flex items-center gap-2 text-[0.9rem] font-semibold text-deep">
                      <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: CURRENT_COHORT.status === "offen" ? "#4f9a3d" : "var(--gold)" }} />
                      {STATUS_LABEL[CURRENT_COHORT.status]}
                    </p>
                  )}
                </div>
                <h3 className="mt-2 font-serif text-[1.9rem] leading-tight text-deep">Dein Second Brain</h3>
                <p className="mt-2.5 text-[1.04rem] leading-relaxed text-deep">
                  Claude vergisst nach jeder Session alles. Nach zwei Live-Workshops kennt er dein Wissen, deine Kunden und deine Projekte.
                </p>
                <Punkte hell punkte={termine ? [...termine, `Kleine Runde, maximal ${CURRENT_COHORT!.capacity} Plätze`] : ["Zwei Live-Workshops und eine Fragestunde", "Kleine Runde, live per Zoom", "Auf der Warteliste erfährst du den Termin zuerst"]} />
                <div className="mt-auto flex flex-wrap items-end justify-between gap-x-6 gap-y-4 pt-5">
                  <p className="leading-none">
                    <span className="font-serif text-[2.5rem] text-deep">{KURS_PREIS} €</span>
                    <span className="ml-3 text-[0.95rem]" style={{ color: TEXT_AUF_HELL }}>
                      oder 2 × {KURS_RATE} €, netto
                    </span>
                  </p>
                  <Knopf href="/akademie">{CURRENT_COHORT ? "Zum Kurs" : "Zur Warteliste"}</Knopf>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>

        {/* Dritter Weg für Unternehmen: Startseite und Menü versprechen ihn, hier ist die Tür dazu. */}
        <p className="mt-4 text-center text-[1rem] leading-relaxed" style={{ color: TEXT_AUF_DUNKEL }}>
          Für Teams: Du willst mehrere Plätze oder ein Training nur für dein Unternehmen?{" "}
          <a href="/termin-buchen" className="inline-flex min-h-[44px] items-center font-semibold text-gold-light underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
            Lass uns sprechen
          </a>
        </p>
      </div>
    </section>
  );
}
