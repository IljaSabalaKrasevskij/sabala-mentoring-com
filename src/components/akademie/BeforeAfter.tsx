"use client";

import { ArrowRight, Check, X } from "lucide-react";
import { Reveal, SektionsKopf } from "./shared";

/* Was sich für dich ändert: fünf Zeilen, links der Alltag heute, rechts der Alltag nach dem Kurs.
   Der rechte Satz ist der wichtige: er steht groß und in einem goldenen Feld, das am Laptop über alle
   fünf Zeilen durchläuft. Die Sätze links sind die Worte der Zielgruppe aus dem Akademie-ICP im Vault. */

const ZEILEN: [heute: string, danach: string][] = [
  ["Jede Session fängt bei null an.", "Claude weiß am Montag, was ihr am Donnerstag gebaut habt."],
  ["Dein Wissen liegt verstreut in fünf Tools.", "Alles liegt an einem Ort, und Claude liest mit."],
  ["Du erklärst immer wieder denselben Kundenkontext.", "Du öffnest Claude, und er fragt: „Weiter mit dem Projekt?“"],
  ["Claude Code wirkt zu kompliziert.", "Das Terminal macht dir keine Angst mehr."],
  ["Du verbrauchst Token, nur um alles neu zu erklären.", "Deine Token fließen in echte Arbeit."],
];

const SPALTEN = "md:grid-cols-[minmax(0,0.8fr)_1.5rem_minmax(0,1.3fr)]";
const FELD = "rgba(184,150,62,0.4)";

export default function BeforeAfter() {
  return (
    <section className="relative overflow-hidden px-6 py-[8vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="pointer-events-none absolute right-[-15vw] top-1/2 hidden h-[70vh] w-[60vw] -translate-y-1/2 md:block" style={{ background: "radial-gradient(ellipse, rgba(184,150,62,0.14), transparent 70%)" }} />

      <div className="relative mx-auto max-w-6xl">
        <SektionsKopf zeile="Vorher und danach" titel="Was sich für dich ändert" />

        <div className="mt-9">
          <div className={`hidden gap-x-6 pb-3 font-mono text-[12.5px] uppercase tracking-[0.22em] md:grid ${SPALTEN}`}>
            <span style={{ color: "rgba(250,248,245,0.55)" }}>Heute</span>
            <span />
            <span className="pl-5 text-gold-light">Nach den zwei Workshops</span>
          </div>

          {ZEILEN.map(([heute, danach], i) => {
            const erste = i === 0;
            const letzte = i === ZEILEN.length - 1;
            return (
              <Reveal key={heute} delay={i * 0.07} className={`grid items-stretch gap-x-6 gap-y-2.5 pb-5 md:pb-0 ${SPALTEN}`}>
                <p className="flex items-center gap-3 border-t pt-5 text-[1rem] leading-snug md:py-[18px]" style={{ borderColor: "rgba(250,248,245,0.14)", color: "rgba(250,248,245,0.62)" }}>
                  <X aria-hidden size={17} className="shrink-0" style={{ color: "rgba(250,248,245,0.4)" }} />
                  {heute}
                </p>
                <span className="hidden items-center border-t md:flex" style={{ borderColor: "rgba(250,248,245,0.14)" }}>
                  <ArrowRight aria-hidden size={20} className="text-gold" />
                </span>
                {/* Am Laptop schließen die fünf Zellen bündig aneinander und bilden ein Feld. Am Handy ist jede ein eigenes Kästchen. */}
                <p
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 font-serif text-[1.35rem] leading-tight text-cream md:rounded-none md:border-x md:border-b-0 md:border-t md:px-5 md:py-[18px] md:text-[1.55rem] ${erste ? "md:rounded-t-2xl" : ""} ${letzte ? "md:rounded-b-2xl md:border-b" : ""}`}
                  style={{ borderColor: FELD, background: "linear-gradient(90deg, rgba(184,150,62,0.16), rgba(184,150,62,0.05))" }}
                >
                  <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-gold text-tech-bg">
                    <Check aria-hidden size={14} strokeWidth={3} />
                  </span>
                  {danach}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
