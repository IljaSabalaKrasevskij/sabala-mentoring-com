"use client";

import Image from "next/image";
import { ArrowRight, Check, Compass, FileDown, Plus, RotateCw } from "lucide-react";
import { GOLD_AUF_HELL, Knopf, Reveal, SektionsKopf, TEXT_AUF_DUNKEL } from "./shared";
import { ABLAUF_PDF, BAUSTEINE, WERKZEUGE, type Werkzeug } from "./ablauf";

/* Die Werkzeuge: die vier Programme, die am Ende eingerichtet und verbunden sind, groß und mit Namen.
   Mit der Maus sind es Karten zum Umdrehen: vorn Logo und Name, hinten steht, was das Werkzeug für dich tut.
   Am Handy steht beides untereinander in einer Kachel, dort ist nichts versteckt (Mechanik und `maus:` in globals.css).
   Darunter, was sie verbindet (zum Aufklappen), und der ganze Trainingsablauf als PDF.
   Comet hat kein eigenes Logo im Projekt, darum dort ein Kompass als Symbol. */

const LOGO: Partial<Record<Werkzeug["id"], string>> = {
  notebooklm: "/akademie/logos/notebooklm.svg",
  obsidian: "/akademie/logos/obsidian.svg",
  claude: "/akademie/logos/claude.svg",
};

/* Mit der Maus ist jede Seite eine eigene Karte. Am Handy trägt die Kachel außen Rand und Grund. */
const SEITE = "maus:rounded-2xl maus:border maus:p-6 maus:shadow-[0_24px_60px_rgba(0,0,0,0.5)]";

export default function Werkzeuge() {
  return (
    <section id="werkzeuge" className="relative overflow-hidden px-6 py-[7vh]" style={{ background: "var(--tech-bg)" }}>
      {/* Die Bibliothek des Kurses als Bild im Hintergrund: der Abschnitt hebt sich so vom flachen Schwarz daneben ab */}
      <div aria-hidden className="absolute inset-0">
        <Image src="/akademie/ki-library-bg.jpg" alt="" fill sizes="100vw" className="object-cover" style={{ opacity: 0.6 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,8,6,0.95) 0%, rgba(10,8,6,0.66) 50%, rgba(10,8,6,0.95) 100%)" }} />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <SektionsKopf
          zeile="Die Werkzeuge"
          titel={
            <>
              Vier Werkzeuge. Einmal richtig verbunden. <span className="text-gold-light">Ein System.</span>
            </>
          }
        />

        <div className="mt-9 grid gap-4 sm:grid-cols-2 min-[56.25rem]:grid-cols-4">
          {WERKZEUGE.map((w, i) => (
            <Reveal key={w.id} delay={i * 0.07} className="relative">
              <div
                tabIndex={0}
                role="group"
                aria-label={`${w.name}, ${w.rolle}`}
                className="dreh relative h-full rounded-2xl border border-[rgba(184,150,62,0.45)] bg-[rgba(16,13,9,0.9)] p-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light maus:border-0 maus:bg-transparent maus:p-0"
              >
                <div className="dreh-innen">
                  {/* Vorderseite. Am Handy liegt das Logo links neben dem Text, das spart Höhe. Ab 640 px steht es darüber. */}
                  <div className={`dreh-vorn relative flex gap-4 sm:block maus:flex maus:flex-col maus:gap-0 maus:border-[rgba(184,150,62,0.45)] maus:bg-[rgba(16,13,9,0.92)] ${SEITE}`}>
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl maus:h-16 maus:w-16" style={{ background: "var(--cream)" }}>
                      {LOGO[w.id] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={LOGO[w.id]} alt="" className="h-9 w-9 maus:h-10 maus:w-10" />
                      ) : (
                        <Compass aria-hidden size={34} strokeWidth={1.6} style={{ color: "#0a0806" }} />
                      )}
                    </span>
                    <span className="absolute right-0 top-1 hidden font-mono text-[12.5px] uppercase tracking-[0.12em] sm:block maus:right-6 maus:top-7" style={{ color: "rgba(250,248,245,0.6)" }}>
                      Workshop {w.workshop}
                    </span>
                    <div className="min-w-0">
                      <p className="font-mono text-[12.5px] uppercase tracking-[0.12em] text-gold-light sm:mt-4 maus:mt-5">{w.rolle}</p>
                      <h3 className="mt-1 font-serif text-[1.55rem] leading-tight text-cream maus:text-[1.65rem]">{w.name}</h3>
                      <p className="text-[0.9rem] maus:text-[0.95rem]" style={{ color: "rgba(250,248,245,0.6)" }}>
                        {w.zusatz}
                        <span className="sm:hidden"> · Workshop {w.workshop}</span>
                      </p>
                    </div>
                    <p className="mt-auto hidden items-center gap-2 pt-6 font-mono text-[12.5px] uppercase tracking-[0.14em] text-gold-light maus:flex">
                      <RotateCw aria-hidden size={15} strokeWidth={2.2} />
                      Mehr dazu
                    </p>
                  </div>

                  {/* Rückseite: hell, damit das Umdrehen auch in der Farbe ein Wechsel ist. Am Handy nur der Satz. */}
                  <div className={`dreh-hinten mt-3 maus:mt-0 maus:flex maus:flex-col maus:border-gold maus:bg-[linear-gradient(160deg,#fdf8ea,#f1dfb2)] ${SEITE}`}>
                    <p aria-hidden className="hidden font-mono text-[12.5px] uppercase tracking-[0.12em] maus:block" style={{ color: GOLD_AUF_HELL }}>
                      In Workshop {w.workshop}
                    </p>
                    <p aria-hidden className="mt-1 hidden font-serif text-[1.45rem] leading-tight text-deep maus:block">
                      {w.name}
                    </p>
                    <p className="text-[0.97rem] leading-snug text-[rgba(250,248,245,0.78)] maus:mt-2.5 maus:text-[1.03rem] maus:text-[rgba(46,43,38,0.88)]">{w.text}</p>
                    <p className="mt-auto hidden items-center gap-2.5 pt-4 text-[0.95rem] font-semibold text-deep maus:flex">
                      <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-gold text-tech-bg">
                        <Check aria-hidden size={14} strokeWidth={3} />
                      </span>
                      Gemeinsam eingerichtet
                    </p>
                  </div>
                </div>
              </div>
              {/* Pfeil zum nächsten Werkzeug: aus vier einzelnen Programmen wird eine Kette. Er dreht sich nicht mit. */}
              {i < WERKZEUGE.length - 1 && (
                <span aria-hidden className="absolute -right-[19px] top-[37px] z-10 hidden h-[22px] w-[22px] items-center justify-center rounded-full bg-gold text-tech-bg min-[56.25rem]:flex maus:top-[45px]">
                  <ArrowRight size={14} strokeWidth={2.6} />
                </span>
              )}
            </Reveal>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-4 min-[56.25rem]:flex-row min-[56.25rem]:items-start">
          <details className="group min-w-0 flex-1 rounded-2xl" style={{ background: "rgba(16,13,9,0.9)", border: "1px solid rgba(250,248,245,0.18)" }}>
            <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-2.5 text-[0.97rem] leading-snug text-cream [&::-webkit-details-marker]:hidden">
              <span>
                <span className="font-semibold">Was sie verbindet:</span> <span style={{ color: TEXT_AUF_DUNKEL }}>{BAUSTEINE.map((b) => b.name).join(" · ")}</span>
              </span>
              <Plus aria-hidden size={20} className="shrink-0 text-gold-light transition-transform duration-300 group-open:rotate-45" />
            </summary>
            <ul className="grid gap-x-8 gap-y-3 px-5 pb-5 pt-1 sm:grid-cols-2">
              {BAUSTEINE.map((b) => (
                <li key={b.name} className="text-[0.97rem] leading-relaxed" style={{ color: TEXT_AUF_DUNKEL }}>
                  <span className="font-semibold text-cream">{b.name}.</span> {b.text}
                </li>
              ))}
            </ul>
          </details>

          <Knopf zweit href={ABLAUF_PDF} neuerTab>
            <FileDown aria-hidden size={18} />
            Trainingsablauf als PDF
          </Knopf>
        </div>
      </div>
    </section>
  );
}
