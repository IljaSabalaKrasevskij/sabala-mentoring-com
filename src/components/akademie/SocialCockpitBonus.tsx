"use client";

import Image from "next/image";
import { useState } from "react";
import { Brackets, Eyebrow, Reveal } from "./shared";
import { COCKPIT_EINRICHTUNG_PREIS } from "./cohorts";

/* Bonus — Iljas Social Media Cockpit als Code-Geschenk, darunter die freiwillige
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
    <section id="bonus" className="relative overflow-hidden px-6 py-[14vh]" style={{ background: "linear-gradient(180deg, var(--cream) 0%, #faf2dd 55%, var(--cream) 100%)" }}>
      <div className="pointer-events-none absolute left-1/2 top-[12%] h-[55vh] w-[70vw] -translate-x-1/2" style={{ background: "radial-gradient(ellipse, rgba(184,150,62,0.2), transparent 70%)" }} />

      <div className="relative mx-auto max-w-5xl">
        <Eyebrow>{"// dein bonus"}</Eyebrow>
        <Reveal>
          <h2 className="mx-auto mt-5 max-w-3xl text-center font-serif text-deep" style={{ fontSize: "clamp(2rem, 4.6vw, 3.2rem)", lineHeight: 1.06 }}>
            Mein Social Media Cockpit. <span className="block" style={{ color: "var(--gold)" }}>Der ganze Code, geschenkt.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[1.04rem] leading-relaxed text-warm-mid">
            So plane ich meinen ganzen Social-Media-Content: im eigenen Kalender, mit Claude Code, ohne Notion. Als Teilnehmer bekommst du den kompletten Code geschenkt. Daraus wird dein eigenes Cockpit.
          </p>
        </Reveal>

        {/* Ansichten zum Umschalten */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap justify-center gap-2.5">
            {ANSICHTEN.map((a, i) => (
              <button
                key={a.name}
                type="button"
                aria-pressed={aktiv === i}
                onClick={() => setAktiv(i)}
                className="rounded-full px-5 py-2.5 font-mono text-[13px] uppercase tracking-[0.14em] transition-colors duration-300"
                style={
                  aktiv === i
                    ? { background: "var(--deep)", color: "var(--gold-light)", border: "1px solid var(--deep)" }
                    : { background: "rgba(255,255,255,0.5)", color: "var(--deep)", border: "1px solid rgba(184,150,62,0.45)" }
                }
              >
                {a.name}
              </button>
            ))}
          </div>

          <div
            className="relative mt-6 overflow-hidden rounded-2xl"
            style={{ aspectRatio: "2000 / 1161", background: "#0b0f17", border: "1.5px solid rgba(184,150,62,0.55)", boxShadow: "0 40px 90px rgba(46,43,38,0.28), 0 10px 30px rgba(184,150,62,0.18)" }}
          >
            {ANSICHTEN.map((a, i) => (
              <Image
                key={a.name}
                src={a.bild}
                alt={`Social Media Cockpit, Ansicht ${a.name}`}
                aria-hidden={aktiv !== i}
                fill
                sizes="(max-width: 1100px) 94vw, 1024px"
                className="object-cover transition-opacity duration-500"
                style={{ opacity: aktiv === i ? 1 : 0 }}
              />
            ))}
          </div>

          <p className="mx-auto mt-5 max-w-2xl text-center text-[1.04rem] leading-relaxed text-deep">{ANSICHTEN[aktiv].text}</p>
          <p className="mt-2 text-center text-[0.94rem] text-warm-mid">
            Bilder aus meinem eigenen Cockpit.{" "}
            <a href={ANSICHTEN[aktiv].bild} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4" style={{ color: "var(--gold)" }}>
              Bild groß ansehen
            </a>
          </p>
        </Reveal>

        {/* Freiwillig dazu: gemeinsame Einrichtung */}
        <Reveal className="relative mx-auto mt-16 max-w-3xl rounded-2xl p-7 md:p-9" style={{ background: "linear-gradient(180deg, #15110b, #0d0a07)", border: "1.5px solid rgba(184,150,62,0.5)", boxShadow: "0 30px 70px rgba(46,43,38,0.3)" }}>
          <Brackets color="var(--gold)" inset={12} size={14} />
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-mono text-[12.5px] uppercase tracking-[0.2em] text-gold">Optional dazu</p>
              <h3 className="mt-3 font-serif text-[1.7rem] leading-tight text-cream">Wir richten dein Cockpit gemeinsam ein.</h3>
              <p className="mt-3 max-w-md text-[1rem] leading-relaxed text-warm-light/75">
                Du willst das Setup nicht allein machen? Dann richten wir dein eigenes Social Media Cockpit zusammen ein.
              </p>
            </div>
            <div className="shrink-0 md:text-right">
              <p className="font-serif leading-none text-gold" style={{ fontSize: "clamp(2.6rem, 6vw, 3.4rem)" }}>
                €{COCKPIT_EINRICHTUNG_PREIS}
              </p>
              <p className="mt-2 font-mono text-[12.5px] uppercase tracking-[0.14em]" style={{ color: "rgba(250,248,245,0.6)" }}>
                zzgl. MwSt. · freiwillig
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
