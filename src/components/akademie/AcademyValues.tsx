"use client";

import Image from "next/image";
import { BadgeCheck, Languages, MousePointerClick, SlidersHorizontal } from "lucide-react";
import ClaudeLogo from "@/components/brand/ClaudeLogo";
import { Brackets, GOLD_AUF_HELL, Reveal, SektionsKopf, TEXT_AUF_HELL, TiltCard } from "./shared";

/* So lernst du hier: Iljas Leitsatz, vier Gründe aus Sicht des Teilnehmers und sein Bild.
   Früher standen hier vier Werte-Karten aus Sicht der Akademie (Qualität, Lerntransfer, Einfachheit,
   Customization) unter einem langen Absatz. Es sind dieselben vier Punkte, jetzt kürzer und als Nutzen für dich. */

const GRUENDE = [
  { symbol: MousePointerClick, titel: "Du setzt live um", text: "Am Ende läuft ein echtes System, kein Notizzettel." },
  { symbol: Languages, titel: "Ohne Entwickler-Kauderwelsch", text: "Jeder Schritt wird übersetzt, nichts wird vorausgesetzt." },
  { symbol: BadgeCheck, titel: "Nur, was sich bewährt hat", text: "Erprobte Claude-Setups aus echten Kundenprojekten statt Tool-Hopping." },
  { symbol: SlidersHorizontal, titel: "Zugeschnitten auf deine Arbeit", text: "Deine Mandate, deine Abläufe, deine Stimme." },
];

export default function AcademyValues() {
  return (
    <section className="relative overflow-hidden px-6 py-[7vh]" style={{ background: "linear-gradient(180deg, var(--cream) 0%, #faf2dd 55%, var(--cream) 100%)" }}>
      <div className="pointer-events-none absolute -left-[10%] top-[15%] h-[55vh] w-[55vw]" style={{ background: "radial-gradient(ellipse, rgba(184,150,62,0.18), transparent 70%)" }} />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] md:gap-14">
        <div>
          <SektionsKopf
            hell
            links
            zeile="So lernst du hier"
            titel={
              <>
                Werkzeuge kommen und gehen. <span style={{ color: GOLD_AUF_HELL }}>Dein Können bleibt.</span>
              </>
            }
            text="KI verändert sich im Wochentakt. Darum stehen hier Grundtechniken und erprobte Setups im Mittelpunkt: das Fundament, das bleibt."
          />

          <ul className="mt-7 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {GRUENDE.map(({ symbol: Symbol, titel, text }, i) => (
              <li key={titel}>
                <Reveal delay={i * 0.06} className="flex items-start gap-3.5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(184,150,62,0.14)", color: GOLD_AUF_HELL }}>
                    <Symbol aria-hidden size={21} strokeWidth={1.7} />
                  </span>
                  <p className="text-[0.97rem] leading-snug" style={{ color: TEXT_AUF_HELL }}>
                    <span className="block text-[1.06rem] font-semibold text-deep">{titel}</span>
                    {text}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>

          <p className="mt-6 flex items-center gap-2.5 border-t pt-4 text-[0.95rem]" style={{ borderColor: "rgba(184,150,62,0.4)", color: TEXT_AUF_HELL }}>
            <ClaudeLogo size={17} />
            Alle Setups laufen auf Claude, vor allem auf Claude Code.
          </p>
        </div>

        {/* Am Handy steht das Bild zuerst und bleibt schmal (62 % der Breite). Am Laptop hängt die Breite auch an der
            Fensterhöhe, damit der Abschnitt ins Fenster passt. */}
        <Reveal delay={0.1} className="relative order-first mx-auto w-full md:order-none" style={{ maxWidth: "min(340px, 46vh, 62vw)" }}>
          <span className="pointer-events-none absolute -inset-6 rounded-3xl" style={{ background: "radial-gradient(ellipse, rgba(184,150,62,0.2), transparent 70%)" }} />
          <TiltCard hervor={1.03} max={6} radius={16}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl" style={{ border: "1.5px solid rgba(184,150,62,0.45)", boxShadow: "0 30px 70px rgba(120,90,30,0.24), 0 8px 24px rgba(184,150,62,0.16)" }}>
              <Brackets color="rgba(184,150,62,0.7)" inset={14} size={16} />
              <Image src="/akademie/ilja-trainer-2026.jpg" alt="Ilja Krasevskij, Trainer der Sabala Academy" fill sizes="(max-width: 768px) 80vw, 340px" className="object-cover object-center" />
            </div>
          </TiltCard>
          <p className="relative mt-4 text-center text-[0.97rem] leading-snug" style={{ color: TEXT_AUF_HELL }}>
            <span className="block text-[1.06rem] font-semibold text-deep">Ilja Krasevskij</span>
            Zertifizierter digitaler Trainer und KI-Dozent.{" "}
            <a href="/ueber-mich" className="inline-flex min-h-[44px] items-center font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold" style={{ color: GOLD_AUF_HELL }}>
              Mehr über mich
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
