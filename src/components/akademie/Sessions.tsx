"use client";

import { BrainCircuit, Check, LibraryBig, LifeBuoy } from "lucide-react";
import { GOLD_AUF_HELL, Reveal, SektionsKopf, TEXT_AUF_HELL } from "./shared";
import { CURRENT_COHORT, formatSessionDate } from "./cohorts";
import { FRAGESTUNDE, WORKSHOPS } from "./ablauf";

/* So läuft es ab: drei Termine als drei Karten. Je Workshop steht, womit wir arbeiten und was du danach hast.
   Die Werkzeuge selbst zeigt der nächste Abschnitt (Werkzeuge.tsx), den ganzen Ablauf das PDF.
   Die Karten stehen in der Reihenfolge der Sessions in cohorts.ts, daher kommt das Datum. */

const SYMBOLE = [LibraryBig, BrainCircuit, LifeBuoy];
const KARTEN = [...WORKSHOPS, FRAGESTUNDE];

export default function Sessions() {
  return (
    <section id="ablauf" className="relative overflow-hidden px-6 py-[7vh]" style={{ background: "var(--cream)" }}>
      <div className="pointer-events-none absolute left-1/2 top-0 h-[45vh] w-[80vw] -translate-x-1/2" style={{ background: "radial-gradient(ellipse at top, rgba(184,150,62,0.14), transparent 70%)" }} />

      <div className="relative mx-auto max-w-6xl">
        <SektionsKopf hell zeile="Der Ablauf" titel="Zwei Workshops, eine Fragestunde, ein fertiges Setup." />

        <div className="mt-9 grid gap-5 min-[56.25rem]:grid-cols-3">
          {KARTEN.map((s, i) => {
            const termin = CURRENT_COHORT?.sessions[i];
            const Symbol = SYMBOLE[i];
            const netz = !("danach" in s);
            return (
              <Reveal
                key={s.titel}
                delay={i * 0.08}
                className="relative flex flex-col overflow-hidden rounded-2xl p-6"
                style={{
                  background: netz ? "linear-gradient(160deg, #fbf3dc, #f3e6c2)" : "#ffffff",
                  border: `1px solid rgba(184,150,62,${netz ? 0.55 : 0.3})`,
                  boxShadow: "0 18px 44px rgba(46,43,38,0.08)",
                }}
              >
                {/* Schrittzahl als Wasserzeichen unten rechts, hinter dem Text */}
                <span aria-hidden className="absolute -bottom-3 right-4 font-serif leading-none" style={{ fontSize: "5.5rem", color: `rgba(184,150,62,${netz ? 0.22 : 0.12})` }}>
                  0{i + 1}
                </span>

                <div className="relative flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full" style={{ background: netz ? "rgba(255,255,255,0.7)" : "rgba(184,150,62,0.13)", color: GOLD_AUF_HELL }}>
                    <Symbol aria-hidden size={24} strokeWidth={1.7} />
                  </span>
                  <div>
                    <p className="font-mono text-[12.5px] uppercase leading-snug tracking-[0.1em]" style={{ color: GOLD_AUF_HELL }}>
                      {s.art}
                    </p>
                    {termin && (
                      <p className="text-[0.95rem]" style={{ color: TEXT_AUF_HELL }}>
                        {formatSessionDate(termin.date)}
                      </p>
                    )}
                  </div>
                </div>

                <h3 className="relative mt-5 font-serif text-[1.6rem] leading-tight text-deep">{s.titel}</h3>

                {"danach" in s ? (
                  <>
                    <p className="relative mt-1.5 text-[0.97rem] leading-snug" style={{ color: TEXT_AUF_HELL }}>
                      Mit {s.mit}
                    </p>
                    <p className="relative mt-4 text-[0.95rem] font-semibold text-deep">Danach hast du:</p>
                    <ul className="relative mt-2.5 space-y-2.5">
                      {s.danach.map((d) => (
                        <li key={d} className="flex items-start gap-2.5 text-[0.97rem] leading-snug" style={{ color: TEXT_AUF_HELL }}>
                          <Check aria-hidden size={17} strokeWidth={2.6} className="mt-[3px] shrink-0" style={{ color: GOLD_AUF_HELL }} />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <>
                    <p className="relative mt-3.5 text-[0.97rem] leading-relaxed" style={{ color: TEXT_AUF_HELL }}>
                      {s.text}
                    </p>
                    <p className="relative mt-auto flex items-center gap-2.5 pt-5 text-[0.97rem] font-semibold text-deep">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-tech-bg">
                        <Check aria-hidden size={15} strokeWidth={3} />
                      </span>
                      Im Preis enthalten
                    </p>
                  </>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
