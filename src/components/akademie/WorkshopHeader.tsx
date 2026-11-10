"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, CalendarDays, Play, Users } from "lucide-react";
import { Brackets, Knopf, PlatzKnopf, TEXT_AUF_DUNKEL } from "./shared";
import { CURRENT_COHORT, formatTagMonat } from "./cohorts";

/* Kopf der Kursseite. Oben das Versprechen, darunter links der nächste Schritt, rechts das Erklärvideo.
   Das Video steht hier statt eines Porträts, weil es in zwei Minuten zeigt, worum es geht.
   Es spricht Iljas KI-Klon: die Stimme ist geklont, im Bild ist seine echte Aufnahme mit neu gerechnetem Mund.
   Beides ist im Video (Schild „KI-Klon von Ilja“) und hier darunter gekennzeichnet.
   Neue Fassung = neuer Dateiname, sonst liefert der Browser die alte aus dem Zwischenspeicher. */

const EIN = (delay: number) => ({ initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay } });

export default function WorkshopHeader() {
  const video = useRef<HTMLVideoElement>(null);
  const [gestartet, setGestartet] = useState(false);

  function abspielen() {
    const v = video.current;
    if (!v) return;
    setGestartet(true);
    const r = v.getBoundingClientRect();
    if (r.top < 0 || r.bottom > window.innerHeight) v.scrollIntoView({ block: "center", behavior: "smooth" });
    // Scheitert der Start, bleiben die Bedienelemente des Browsers sichtbar.
    v.play().catch(() => {});
  }

  const fakten = [
    { symbol: CalendarDays, text: CURRENT_COHORT ? `Start am ${formatTagMonat(CURRENT_COHORT.start)}, live per Zoom` : "Nächster Termin in Planung, live per Zoom" },
    { symbol: Users, text: `Kleine Runde, maximal ${CURRENT_COHORT?.capacity ?? 6} Plätze` },
    { symbol: BadgeCheck, text: "Dein Trainer: Ilja Krasevskij, zertifizierter digitaler Trainer und KI-Dozent" },
  ];

  return (
    <section className="relative overflow-hidden" style={{ background: "var(--tech-bg)" }}>
      {/* Die Bibliothek des Kurses als Stimmung im Hintergrund, stark abgedunkelt, damit der Text hell auf dunkel steht */}
      <div aria-hidden className="absolute inset-0">
        <Image src="/akademie/ki-library-bg.jpg" alt="" fill priority sizes="100vw" className="object-cover" style={{ opacity: 0.55, objectPosition: "center 42%" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,8,6,0.9) 0%, rgba(10,8,6,0.68) 45%, rgba(10,8,6,0.95) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 60% at 74% 62%, rgba(184,150,62,0.16), transparent 70%)" }} />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 pb-14 pt-24 sm:px-[6vw] min-[56.25rem]:pb-[8vh] min-[56.25rem]:pt-[9vh]">
        <motion.p {...EIN(0)} className="max-w-[84%] font-mono text-[12.5px] uppercase leading-relaxed tracking-[0.16em] text-gold sm:tracking-[0.24em]">
          Sabala Academy · Live-Workshop für Selbständige und Unternehmen
        </motion.p>

        <motion.h1 {...EIN(0.05)} className="mt-4 text-balance font-serif text-cream" style={{ fontSize: "clamp(2.5rem, 4.6vw, 4.1rem)", lineHeight: 1.05 }}>
          Claude vergisst nach jeder Session alles. <span className="text-gold-light min-[56.25rem]:block">Das hier ändert das.</span>
        </motion.h1>

        <div className="mt-8 grid items-start gap-10 min-[56.25rem]:mt-9 min-[56.25rem]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] min-[56.25rem]:gap-14">
          <motion.div {...EIN(0.12)}>
            <p className="max-w-xl text-pretty text-[1.06rem] leading-relaxed min-[56.25rem]:text-[1.12rem]" style={{ color: "rgba(250,248,245,0.86)" }}>
              In zwei Live-Workshops richten wir dein Second Brain ein. Danach kennt Claude dein Wissen, deine Kunden und deine Projekte, und jede Session beginnt dort, wo die letzte aufgehört hat.
            </p>

            {/* Die Handy-Leiste (PlatzLeiste) zeigt sich, sobald dieser Knopf aus dem Bild ist */}
            <div id="kopf-knopf" className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <PlatzKnopf />
              <span className="hidden xl:inline-flex">
                <Knopf
                  zweit
                  href="#video"
                  onClick={(e) => {
                    e.preventDefault();
                    abspielen();
                  }}
                >
                  <Play aria-hidden size={16} fill="currentColor" />
                  In 2 Minuten erklärt
                </Knopf>
              </span>
            </div>

            <ul className="mt-7 space-y-2.5">
              {fakten.map(({ symbol: Symbol, text }) => (
                <li key={text} className="flex items-start gap-3 text-[0.97rem] leading-snug" style={{ color: TEXT_AUF_DUNKEL }}>
                  <Symbol aria-hidden size={18} className="mt-0.5 shrink-0 text-gold" />
                  {text}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Ab 1280 px rückt das Video neben die zweite Zeile der Überschrift: die ist kurz, rechts von ihr ist Platz */}
          <motion.div {...EIN(0.2)} id="video" className="scroll-mt-8 xl:-mt-16">
            <div className="relative aspect-video overflow-hidden rounded-xl" style={{ background: "#0a0806", border: "1px solid rgba(184,150,62,0.5)", boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(184,150,62,0.12)" }}>
              <video
                ref={video}
                controls={gestartet}
                playsInline
                preload="metadata"
                poster="/akademie/erklaervideo-2026-11-klon-poster.jpg"
                onPlay={() => setGestartet(true)}
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source src="/akademie/erklaervideo-2026-11-klon.mp4" type="video/mp4" />
              </video>
              {!gestartet && (
                <>
                  <Brackets color="rgba(184,150,62,0.55)" inset={12} size={14} />
                  {/* Der Knopf sitzt unten rechts: dort ist das Standbild frei, Gesicht und Schrift bleiben unverdeckt */}
                  <button type="button" onClick={abspielen} aria-label="Erklärvideo starten, Dauer 2 Minuten" className="group absolute inset-0 flex cursor-pointer items-end justify-end p-[4%]">
                    <span className="inline-flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-5 text-[0.95rem] font-semibold text-cream backdrop-blur-sm transition-transform duration-300 group-hover:scale-105" style={{ background: "rgba(10,8,6,0.78)", border: "1px solid rgba(212,174,90,0.6)" }}>
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold text-tech-bg">
                        <Play aria-hidden size={18} fill="currentColor" />
                      </span>
                      {/* Die Beschriftung nur, wo das Video breit genug ist. Im schmalen Zweispalter (900 bis 1100 px) würde sie die Schrift im Standbild berühren. */}
                      <span className="hidden sm:inline min-[56.25rem]:hidden min-[68.75rem]:inline">Video starten ·</span> 2:05
                    </span>
                  </button>
                </>
              )}
            </div>
            <p className="mt-3 text-[0.9rem]" style={{ color: "rgba(250,248,245,0.6)" }}>
              Stimme und Bild sind mein KI-Klon. Ganz bewusst.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
