"use client";

import Image from "next/image";
import { useState } from "react";
import { GOLD_AUF_HELL, Reveal, SektionsKopf, TEXT_AUF_HELL, TiltCard } from "./shared";
import { COCKPIT_EINRICHTUNG_PREIS } from "./cohorts";

/* Bonus nach Wahl (seit 12.11.2026, Iljas Wunsch): eins von zwei eigenen Werkzeugen, jeweils der ganze Code.
   Welches, sagt man nach der Buchung, übergeben wird es zur Fragestunde. Die gemeinsame Einrichtung gibt es
   nur fürs Cockpit, für das Mail-Programm hat Ilja keinen Preis genannt. Sie steht als schmale Zeile statt als
   Karte, damit der Abschnitt mit der Wahl weiter ins Laptop-Fenster passt. */

type Ansicht = { name: string; bild: string; alt: string; text: string };

const WERKZEUGE: { knopf: string; quelle: string; einrichtung: boolean; ansichten: Ansicht[] }[] = [
  {
    knopf: "Social Media Cockpit",
    quelle: "Bilder aus meinem eigenen Cockpit.",
    einrichtung: true,
    ansichten: [
      { name: "Wochenplan", bild: "/akademie/cockpit/wochenplan.webp", alt: "Social Media Cockpit, Ansicht Wochenplan", text: "Deine Instagram-Beiträge für zwei Wochen, jeder als Karte. Freigegebene gehen zur geplanten Zeit von selbst raus." },
      { name: "Kalender", bild: "/akademie/cockpit/kalender.webp", alt: "Social Media Cockpit, Ansicht Kalender", text: "Der ganze Monat. Jeder Beitrag steht an seinem Tag." },
      { name: "Cockpit", bild: "/akademie/cockpit/cockpit.webp", alt: "Social Media Cockpit, Ansicht Cockpit", text: "Die wichtigsten Zahlen auf einer Seite." },
      { name: "Analyse", bild: "/akademie/cockpit/analyse.webp", alt: "Social Media Cockpit, Ansicht Analyse", text: "Claude liest die Zahlen und schlägt vor, was als Nächstes kommt." },
    ],
  },
  {
    knopf: "Mail & Newsletter",
    quelle: "Posteingang mit Beispieldaten, die Rundmail ist echt.",
    einrichtung: false,
    ansichten: [
      { name: "Posteingang", bild: "/case-studies/sabala-mail.jpg", alt: "Mail- und Newsletter-Programm, Posteingang mit Beispieldaten", text: "Mein Mail- und Newsletter-Programm: alle Postfächer an einem Ort, und Claude ordnet jede Mail ein." },
      { name: "Rundmail", bild: "/akademie/mailprogramm/rundmail.jpg", alt: "Rundmail aus dem eigenen Programm mit der Überschrift: Diese Mail kommt aus meinem eigenen Programm", text: "Rundmails gehen über dein eigenes Postfach raus, nur an Menschen mit Einwilligung, jede Mail einzeln." },
    ],
  },
];

const knopfStil = (an: boolean) =>
  an
    ? { background: "var(--deep)", color: "var(--gold-light)", border: "1px solid var(--deep)" }
    : { background: "rgba(255,255,255,0.6)", color: "var(--deep)", border: "1px solid rgba(138,106,31,0.5)" };

export default function BonusWahl() {
  const [wahl, setWahl] = useState(0);
  const [aktiv, setAktiv] = useState(0);
  const werkzeug = WERKZEUGE[wahl];
  const ansicht = werkzeug.ansichten[aktiv];

  return (
    <section id="bonus" className="relative overflow-hidden px-6 py-[7vh]" style={{ background: "var(--warm-light)" }}>
      <div className="pointer-events-none absolute right-[-10vw] top-[10%] h-[60vh] w-[60vw]" style={{ background: "radial-gradient(ellipse, rgba(184,150,62,0.22), transparent 70%)" }} />

      <div className="relative mx-auto max-w-6xl">
        <SektionsKopf
          hell
          zeile="Bonus nach Wahl"
          titel={
            <>
              Zwei Werkzeuge. <span style={{ color: GOLD_AUF_HELL }}>Eins schenke ich dir.</span>
            </>
          }
          text="Den ganzen Code, so wie ich selbst damit arbeite. Nach der Buchung sagst du mir, welches du willst."
        />

        {/* Zwei Teile: Wahl samt Ansichten und Bild. Am Handy in dieser Reihenfolge, damit das Bild direkt unter
            seinem Umschalter steht. Am Laptop steht die Wahl links, das Bild rechts daneben. */}
        <div className="mt-8 grid items-center gap-x-12 gap-y-6 min-[56.25rem]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <Reveal delay={0.05}>
            <div role="group" aria-label="Werkzeug wählen" className="grid grid-cols-2 gap-2.5">
              {WERKZEUGE.map((w, i) => (
                <button
                  key={w.knopf}
                  type="button"
                  aria-pressed={wahl === i}
                  onClick={() => {
                    setWahl(i);
                    setAktiv(0);
                  }}
                  className="min-h-[48px] rounded-full px-4 py-2 font-serif text-[1.1rem] leading-tight transition-colors duration-300"
                  style={knopfStil(wahl === i)}
                >
                  {w.knopf}
                </button>
              ))}
            </div>

            <div role="group" aria-label="Ansicht wählen" className="mt-4 grid grid-cols-2 gap-2.5">
              {werkzeug.ansichten.map((a, i) => (
                <button
                  key={a.name}
                  type="button"
                  aria-pressed={aktiv === i}
                  onClick={() => setAktiv(i)}
                  className="min-h-[48px] rounded-full px-4 py-2 font-mono text-[13px] uppercase tracking-[0.12em] transition-colors duration-300"
                  style={knopfStil(aktiv === i)}
                >
                  {a.name}
                </button>
              ))}
            </div>
            <p className="mt-4 min-h-[3.3em] text-[1.04rem] leading-relaxed text-deep">{ansicht.text}</p>
            <p className="text-[0.9rem]" style={{ color: TEXT_AUF_HELL }}>
              {werkzeug.quelle}{" "}
              <a href={ansicht.bild} target="_blank" rel="noopener noreferrer" className="inline-block py-2 font-semibold underline underline-offset-4" style={{ color: GOLD_AUF_HELL }}>
                Bild groß ansehen
              </a>
            </p>
            {werkzeug.einrichtung && (
              <p className="mt-2 inline-flex flex-wrap items-baseline gap-x-2.5 rounded-2xl px-5 py-2.5 text-[0.95rem] leading-snug" style={{ background: "linear-gradient(180deg, #15110b, #0d0a07)", border: "1.5px solid rgba(184,150,62,0.5)", color: "rgba(250,248,245,0.85)" }}>
                <span className="font-mono text-[12.5px] uppercase tracking-[0.2em] text-gold">Optional</span>
                gemeinsam einrichten, <span className="font-serif text-[1.15rem] leading-none text-gold-light">{COCKPIT_EINRICHTUNG_PREIS} €</span> zzgl. MwSt.
              </p>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            {/* Das Bildschirmfoto neigt sich mit der Maus wie ein Bildschirm, den du in der Hand drehst */}
            <TiltCard hervor={1.025} max={4} radius={16}>
              <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "2000 / 1161", background: "#0b0f17", border: "1.5px solid rgba(184,150,62,0.6)", boxShadow: "0 40px 90px rgba(46,43,38,0.3), 0 10px 30px rgba(184,150,62,0.2)" }}>
                {WERKZEUGE.flatMap((w, wi) =>
                  w.ansichten.map((a, ai) => {
                    const sichtbar = wahl === wi && aktiv === ai;
                    return (
                      <Image
                        key={a.bild}
                        src={a.bild}
                        alt={a.alt}
                        aria-hidden={!sichtbar}
                        fill
                        sizes="(max-width: 1024px) 94vw, 680px"
                        className="object-cover transition-opacity duration-500"
                        style={{ opacity: sichtbar ? 1 : 0 }}
                      />
                    );
                  }),
                )}
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
