"use client";

import Image from "next/image";
import { ArrowRight, Compass, FileDown, Plus } from "lucide-react";
import { Knopf, Reveal, SektionsKopf, TEXT_AUF_DUNKEL } from "./shared";
import { ABLAUF_PDF, BAUSTEINE, WERKZEUGE, type Werkzeug } from "./ablauf";

/* Die Werkzeuge: die vier Programme, die am Ende eingerichtet und verbunden sind, groß und mit Namen.
   Darunter, was sie verbindet (zum Aufklappen), und der ganze Trainingsablauf als PDF.
   Comet hat kein eigenes Logo im Projekt, darum dort ein Kompass als Symbol. */

const LOGO: Partial<Record<Werkzeug["id"], string>> = {
  notebooklm: "/akademie/logos/notebooklm.svg",
  obsidian: "/akademie/logos/obsidian.svg",
  claude: "/akademie/logos/claude.svg",
};

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
            /* Am Handy liegt das Logo links neben dem Text, das spart Höhe. Ab 640 px steht es darüber. */
            <Reveal key={w.id} delay={i * 0.07} className="relative flex gap-4 rounded-2xl p-5 sm:block" style={{ background: "rgba(16,13,9,0.9)", border: "1px solid rgba(184,150,62,0.45)" }}>
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl" style={{ background: "var(--cream)" }}>
                {LOGO[w.id] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={LOGO[w.id]} alt="" className="h-9 w-9" />
                ) : (
                  <Compass aria-hidden size={32} strokeWidth={1.6} style={{ color: "#0a0806" }} />
                )}
              </span>
              <span className="absolute right-5 top-6 hidden font-mono text-[12.5px] uppercase tracking-[0.12em] sm:block" style={{ color: "rgba(250,248,245,0.6)" }}>
                Workshop {w.workshop}
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[12.5px] uppercase tracking-[0.12em] text-gold-light sm:mt-4">{w.rolle}</p>
                <h3 className="mt-1 font-serif text-[1.55rem] leading-tight text-cream">{w.name}</h3>
                <p className="text-[0.9rem]" style={{ color: "rgba(250,248,245,0.6)" }}>
                  {w.zusatz}
                  <span className="sm:hidden"> · Workshop {w.workshop}</span>
                </p>
                <p className="mt-2 text-[0.97rem] leading-snug sm:mt-3" style={{ color: TEXT_AUF_DUNKEL }}>
                  {w.text}
                </p>
              </div>
              {/* Pfeil zum nächsten Werkzeug: aus vier einzelnen Programmen wird eine Kette */}
              {i < WERKZEUGE.length - 1 && (
                <span aria-hidden className="absolute -right-[19px] top-[30px] z-10 hidden h-[22px] w-[22px] items-center justify-center rounded-full bg-gold text-tech-bg min-[56.25rem]:flex">
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
