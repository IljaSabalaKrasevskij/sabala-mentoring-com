"use client";

import Image from "next/image";
import { useState } from "react";
import { GOLD_AUF_HELL, Reveal, SektionsKopf, TEXT_AUF_HELL } from "./shared";
import { COCKPIT_EINRICHTUNG_PREIS } from "./cohorts";

/* Bonus — Iljas Social Media Cockpit als Code-Geschenk, daneben die freiwillige
   gemeinsame Einrichtung. Die Bilder sind Bildschirmfotos aus seinem eigenen Cockpit. */

const ANSICHTEN = [
  { name: "Wochenplan", bild: "/akademie/cockpit/wochenplan.webp", text: "Zwei Wochen auf einen Blick. Jeder Beitrag ist eine Karte mit Bild, Uhrzeit und Stand." },
  { name: "Kalender", bild: "/akademie/cockpit/kalender.webp", text: "Der ganze Monat. Jeder Beitrag steht an seinem Tag." },
  { name: "Cockpit", bild: "/akademie/cockpit/cockpit.webp", text: "Die wichtigsten Zahlen auf einer Seite." },
  { name: "Analyse", bild: "/akademie/cockpit/analyse.webp", text: "Claude liest die Zahlen und schlägt vor, was als Nächstes kommt." },
];

export default function SocialCockpitBonus() {
  const [aktiv, setAktiv] = useState(0);

  return (
    <section id="bonus" className="relative overflow-hidden px-6 py-[7vh]" style={{ background: "var(--warm-light)" }}>
      <div className="pointer-events-none absolute right-[-10vw] top-[10%] h-[60vh] w-[60vw]" style={{ background: "radial-gradient(ellipse, rgba(184,150,62,0.22), transparent 70%)" }} />

      <div className="relative mx-auto max-w-6xl">
        <SektionsKopf
          hell
          zeile="Dein Bonus"
          titel={
            <>
              Mein Social Media Cockpit. <span style={{ color: GOLD_AUF_HELL }}>Der ganze Code, geschenkt.</span>
            </>
          }
          text="So plane ich meinen ganzen Social-Media-Content: im eigenen Kalender, mit Claude Code, ohne Notion. Aus dem Code wird dein eigenes Cockpit."
        />

        {/* Drei Teile: Umschalter, Bild, Zusatz. Am Handy in dieser Reihenfolge, damit das Bild direkt unter
            seinem Umschalter steht. Am Laptop stehen Umschalter und Zusatz links, das Bild rechts daneben. */}
        <div className="mt-8 grid items-center gap-x-12 gap-y-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <Reveal delay={0.05} className="lg:col-start-1 lg:row-start-1 lg:self-end">
            <div className="grid grid-cols-2 gap-2.5">
              {ANSICHTEN.map((a, i) => (
                <button
                  key={a.name}
                  type="button"
                  aria-pressed={aktiv === i}
                  onClick={() => setAktiv(i)}
                  className="min-h-[48px] rounded-full px-4 py-2 font-mono text-[13px] uppercase tracking-[0.12em] transition-colors duration-300"
                  style={
                    aktiv === i
                      ? { background: "var(--deep)", color: "var(--gold-light)", border: "1px solid var(--deep)" }
                      : { background: "rgba(255,255,255,0.6)", color: "var(--deep)", border: "1px solid rgba(138,106,31,0.5)" }
                  }
                >
                  {a.name}
                </button>
              ))}
            </div>
            <p className="mt-4 min-h-[3.3em] text-[1.04rem] leading-relaxed text-deep">{ANSICHTEN[aktiv].text}</p>
            <p className="text-[0.9rem]" style={{ color: TEXT_AUF_HELL }}>
              Bilder aus meinem eigenen Cockpit.{" "}
              <a href={ANSICHTEN[aktiv].bild} target="_blank" rel="noopener noreferrer" className="inline-block py-2 font-semibold underline underline-offset-4" style={{ color: GOLD_AUF_HELL }}>
                Bild groß ansehen
              </a>
            </p>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "2000 / 1161", background: "#0b0f17", border: "1.5px solid rgba(184,150,62,0.6)", boxShadow: "0 40px 90px rgba(46,43,38,0.3), 0 10px 30px rgba(184,150,62,0.2)" }}>
              {ANSICHTEN.map((a, i) => (
                <Image
                  key={a.name}
                  src={a.bild}
                  alt={`Social Media Cockpit, Ansicht ${a.name}`}
                  aria-hidden={aktiv !== i}
                  fill
                  sizes="(max-width: 1024px) 94vw, 680px"
                  className="object-cover transition-opacity duration-500"
                  style={{ opacity: aktiv === i ? 1 : 0 }}
                />
              ))}
            </div>
          </Reveal>

          {/* Freiwillig dazu: gemeinsame Einrichtung */}
          <Reveal delay={0.15} className="lg:col-start-1 lg:row-start-2 lg:self-start">
            <div className="flex items-center justify-between gap-5 rounded-2xl px-6 py-5" style={{ background: "linear-gradient(180deg, #15110b, #0d0a07)", border: "1.5px solid rgba(184,150,62,0.5)", boxShadow: "0 20px 50px rgba(46,43,38,0.26)" }}>
              <div>
                <p className="font-mono text-[12.5px] uppercase tracking-[0.2em] text-gold">Optional dazu</p>
                <h3 className="mt-1.5 font-serif text-[1.3rem] leading-tight text-cream">Wir richten dein Cockpit gemeinsam ein.</h3>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-serif text-[2rem] leading-none text-gold-light">{COCKPIT_EINRICHTUNG_PREIS} €</p>
                <p className="mt-1.5 text-[0.85rem] leading-tight" style={{ color: "rgba(250,248,245,0.7)" }}>
                  zzgl. MwSt.
                  <br />
                  freiwillig
                </p>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
