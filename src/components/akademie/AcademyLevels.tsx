"use client";

import { ArrowRight, RotateCw } from "lucide-react";
import { GOLD_AUF_HELL, Reveal, SektionsKopf } from "./shared";
import { LEVELS, type Level } from "./levels";

/* Dein Einstieg: die vier Stufen der Akademie als Karten zum Umdrehen (Mechanik und `maus:` in globals.css).
   Vorn steht, woran du deine Stufe erkennst, hinten dein nächster Schritt mit dem Weg dorthin.
   Am Handy steht beides untereinander in einer Karte, dort ist nichts versteckt.
   Am Laptop steigen die Karten nach rechts an: Es ist eine Leiter. */

type Weg = { text: string; href: string };
type Stufe = { level: Level; hier: string; weiter: string; ziel: Weg; auch?: Weg };

const STUFEN: Stufe[] = [
  {
    level: 1,
    hier: "Du hast von KI gehört, ChatGPT mal probiert, nutzt es aber nicht im Alltag.",
    weiter: "Hol dir in einer Stunde Klarheit. Du fragst, ich zeige es dir live am Bildschirm.",
    ziel: { text: "Zur Beratungsstunde", href: "/beratung" },
    auch: { text: "Lieber allein starten: zum Shop", href: "/shop" },
  },
  {
    level: 2,
    hier: "Du nutzt KI schon, aber planlos. Du spürst das Potenzial, kommst aber nicht ins System.",
    weiter: "Bau dein Fundament live mit mir: Claude Code, Obsidian und Gemini Notebook.",
    ziel: { text: "Zum Second-Brain-Kurs", href: "/akademie" },
  },
  {
    level: 3,
    hier: "Claude Code läuft, du baust erste Workflows und Skills, automatisierst Routine.",
    weiter: "Der Kurs zu Automationen und ersten eigenen Agenten ist in Vorbereitung. Ich sage dir Bescheid, sobald der Termin steht.",
    ziel: { text: "Bescheid bekommen", href: "#newsletter" },
  },
  {
    level: 4,
    hier: "Du baust eigene Agenten und Systeme und orchestrierst KI im Hintergrund.",
    weiter: "Dann bist du eher ein Fall für eine direkte Zusammenarbeit als für einen Kurs.",
    ziel: { text: "Gemeinsam bauen", href: "/mitentwickelt" },
  },
];

/* Jede Stufe beginnt etwas höher als die davor. Der Abstand oben macht aus vier Karten eine Treppe. */
const TREPPE = ["min-[56.25rem]:mt-9", "min-[56.25rem]:mt-6", "min-[56.25rem]:mt-3", ""];

/* Mit der Maus ist jede Seite eine eigene Karte. Am Handy trägt die Karte außen Rand und Grund. */
const SEITE = "maus:rounded-2xl maus:border maus:p-6";

function Weiter({ weg, klein = false }: { weg: Weg; klein?: boolean }) {
  return (
    <a
      href={weg.href}
      className={`group inline-flex min-h-[44px] items-center gap-2 text-[#8a6a1f] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold maus:text-gold-light ${klein ? "text-[0.95rem]" : "text-[1.02rem] font-semibold"}`}
    >
      {weg.text}
      {!klein && <ArrowRight aria-hidden size={17} strokeWidth={2.2} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />}
    </a>
  );
}

export default function AcademyLevels() {
  return (
    <section id="einstieg" className="relative overflow-hidden px-6 py-[7vh]" style={{ background: "var(--cream)" }}>
      <div className="pointer-events-none absolute left-1/2 top-0 h-[45vh] w-[80vw] -translate-x-1/2" style={{ background: "radial-gradient(ellipse at top, rgba(184,150,62,0.14), transparent 70%)" }} />

      <div className="relative mx-auto max-w-6xl">
        <SektionsKopf
          hell
          zeile="Dein Einstieg"
          titel="Wo stehst du gerade?"
          text={
            <>
              Vier Stufen, von neugierig bis Builder. <span className="hidden maus:inline">Fahr mit der Maus über deine Stufe und sieh deinen nächsten Schritt.</span>
              <span className="maus:hidden">Such deine Stufe und sieh deinen nächsten Schritt.</span>
            </>
          }
        />

        <div className="mt-7 grid gap-4 sm:grid-cols-2 min-[56.25rem]:grid-cols-4">
          {STUFEN.map((s, i) => {
            const rand = `rgba(184,150,62,${0.3 + i * 0.2})`;
            return (
              <Reveal key={s.level} delay={i * 0.07} className={TREPPE[i]}>
                <div className="dreh relative h-full rounded-2xl border bg-white p-5 shadow-[0_18px_44px_rgba(46,43,38,0.08)] maus:border-0 maus:bg-transparent maus:p-0 maus:shadow-none" style={{ borderColor: rand }}>
                  <div className="dreh-innen">
                    {/* Vorderseite: woran du deine Stufe erkennst */}
                    {/* Am Handy steht die Zahl links neben dem Text, das spart Höhe. Mit der Maus steht sie groß darüber. */}
                    <div className={`dreh-vorn flex gap-4 maus:flex-col maus:gap-0 maus:bg-white maus:shadow-[0_18px_44px_rgba(46,43,38,0.1)] ${SEITE}`} style={{ borderColor: rand }}>
                      <div className="flex shrink-0 flex-col items-center gap-2 maus:flex-row maus:items-end maus:justify-between">
                        <span className="font-serif text-[2.6rem] leading-[0.9] text-deep maus:text-[3.2rem]">{s.level}</span>
                        {/* Vier Sprossen, gefüllt bis zu dieser Stufe */}
                        <span aria-hidden className="flex items-end gap-1 maus:pb-1">
                          {[10, 15, 20, 25].map((h, n) => (
                            <span key={h} className="w-1.5 rounded-sm" style={{ height: h, background: n < s.level ? "var(--gold)" : "rgba(46,43,38,0.13)" }} />
                          ))}
                        </span>
                      </div>
                      <div className="min-w-0 maus:mt-3">
                        <p className="font-mono text-[12.5px] uppercase tracking-[0.16em]" style={{ color: GOLD_AUF_HELL }}>
                          Stufe {s.level} · {LEVELS[s.level].name}
                        </p>
                        <p className="mt-1.5 text-[1rem] leading-snug text-[rgba(46,43,38,0.86)] maus:mt-2">{s.hier}</p>
                      </div>
                      <p className="mt-auto hidden items-center gap-2 pt-5 font-mono text-[12.5px] uppercase tracking-[0.14em] maus:flex" style={{ color: GOLD_AUF_HELL }}>
                        <RotateCw aria-hidden size={15} strokeWidth={2.2} />
                        Nächster Schritt
                      </p>
                    </div>

                    {/* Rückseite: der nächste Schritt. Am Handy steht sie unter einer Linie in derselben Karte. */}
                    <div className={`dreh-hinten mt-3.5 border-t border-[rgba(184,150,62,0.35)] pt-3 maus:mt-0 maus:flex maus:flex-col maus:border-gold maus:bg-[linear-gradient(180deg,#1b150c,#0a0806)] maus:shadow-[0_24px_60px_rgba(46,43,38,0.3)] ${SEITE}`}>
                      <p className="font-mono text-[12.5px] uppercase tracking-[0.16em] text-[#8a6a1f] maus:text-gold-light">Dein nächster Schritt</p>
                      <p className="mt-1.5 text-[1rem] leading-snug text-[rgba(46,43,38,0.86)] maus:mt-2 maus:text-[rgba(250,248,245,0.88)]">{s.weiter}</p>
                      <div className="mt-auto flex flex-col pt-1 maus:pt-4">
                        <Weiter weg={s.ziel} />
                        {s.auch && <Weiter weg={s.auch} klein />}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
