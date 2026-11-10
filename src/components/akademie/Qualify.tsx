"use client";

import { Check, Minus } from "lucide-react";
import { GOLD_AUF_HELL, PlatzKnopf, Reveal, SektionsKopf, TEXT_AUF_DUNKEL, TEXT_AUF_HELL } from "./shared";
import { CURRENT_COHORT } from "./cohorts";

/* Für wen der Kurs ist und für wen noch nicht. Links die helle Karte für die, die gemeint sind,
   rechts leiser der Filter. Wer noch am Anfang steht, bekommt mit der Beratungsstunde einen anderen ersten Schritt. */

const FUER = [
  "du schon mit Kunden oder an eigenen Projekten arbeitest",
  "du mit Claude angefangen hast und merkst, dass es ohne Setup zäh wird",
  "du beide Workshops live einplanst und zwei Wochen dranbleibst",
  "du Token sparen und spürbar schneller arbeiten willst",
  "du bessere Ergebnisse für deine Kundenprojekte willst",
];

const NOCH_NICHT = [
  "du kein Claude Code Pro holen willst",
  "du nur die Aufzeichnung ansehen möchtest",
  "du nicht beide Workshops einplanen kannst",
  "du deine Arbeitsweise nicht ändern möchtest",
  "du noch ganz am Anfang stehst",
];

export default function Qualify() {
  return (
    <section className="relative overflow-hidden px-6 py-[7vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="pointer-events-none absolute left-[-10vw] top-1/2 hidden h-[70vh] w-[60vw] -translate-y-1/2 md:block" style={{ background: "radial-gradient(ellipse, rgba(184,150,62,0.14), transparent 70%)" }} />

      <div className="relative mx-auto max-w-6xl">
        <SektionsKopf
          zeile="Für wen"
          titel={
            <>
              Nicht für jeden. <span className="text-gold-light">Vielleicht genau für dich.</span>
            </>
          }
          text="Der Kurs passt zu einer bestimmten Phase deiner Arbeit. Schau, ob du gerade dort stehst."
        />

        <div className="mt-9 grid items-stretch gap-6 md:grid-cols-12">
          <Reveal className="relative flex flex-col rounded-2xl p-7 md:col-span-7 md:p-8" style={{ background: "linear-gradient(160deg, #ffffff 0%, #faf5e8 70%, #f1e6c8 100%)", boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(184,150,62,0.16)" }}>
            <p className="font-mono text-[12.5px] uppercase tracking-[0.2em]" style={{ color: GOLD_AUF_HELL }}>
              Für dich, wenn
            </p>
            <ul className="mt-5 space-y-3">
              {FUER.map((f) => (
                <li key={f} className="flex items-start gap-3.5 text-[1.06rem] leading-snug text-deep">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-tech-bg">
                    <Check aria-hidden size={15} strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            {/* Der Knopf sitzt in der Karte: wer sich in der Liste wiederfindet, hat den nächsten Schritt direkt vor sich */}
            <div className="mt-auto flex flex-col gap-x-5 gap-y-3 pt-6 sm:flex-row sm:flex-wrap sm:items-center">
              <PlatzKnopf />
              <p className="text-[0.95rem]" style={{ color: TEXT_AUF_HELL }}>
                Kleine Runde, maximal {CURRENT_COHORT?.capacity ?? 6} Plätze.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="rounded-2xl p-7 md:col-span-5 md:p-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(250,248,245,0.16)" }}>
            <p className="font-mono text-[12.5px] uppercase tracking-[0.2em]" style={{ color: "rgba(250,248,245,0.6)" }}>
              Noch nicht das Richtige, wenn
            </p>
            <ul className="mt-5 space-y-3">
              {NOCH_NICHT.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[0.97rem] leading-snug" style={{ color: TEXT_AUF_DUNKEL }}>
                  <Minus aria-hidden size={16} className="mt-[3px] shrink-0" style={{ color: "rgba(250,248,245,0.4)" }} />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t pt-4 text-[0.95rem] leading-relaxed" style={{ borderColor: "rgba(250,248,245,0.14)", color: TEXT_AUF_DUNKEL }}>
              Du stehst noch am Anfang? Dann ist die{" "}
              <a href="/beratung" className="text-gold-light underline underline-offset-4">
                Beratungsstunde
              </a>{" "}
              der bessere erste Schritt.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
