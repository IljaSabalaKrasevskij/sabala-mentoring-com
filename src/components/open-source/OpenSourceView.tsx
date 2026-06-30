"use client";

import Link from "next/link";
import { Reveal, TiltCard, Eyebrow, GoldCTA } from "@/components/akademie/shared";

/* Hub für Sabalas freie / Open-Source-Projekte. Aktuell ein Projekt
   (Mooni Voice), bewusst als Grid angelegt, das weitere aufnimmt. */

const AMBER = "#E8A33D";

const PROJECTS = [
  {
    href: "/open-source-projekte/mooni-voice",
    name: "Mooni Voice",
    tagline: "Sprich. Es steht da. Überall.",
    body: "Lokale Sprache-zu-Text für den Mac, in jeder App, auch in Claude Code & Terminal. Privat, mehrsprachig.",
    meta: ["macOS", "Gratis", "MIT-Lizenz"],
    available: true,
  },
];

function MooniMark({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 1024 1024" aria-hidden>
      <rect x="100" y="100" width="824" height="824" rx="185" fill="#1E1B2E" />
      <rect x="499" y="219" width="26" height="80" rx="13" fill={AMBER} />
      <circle cx="512" cy="188" r="30" fill={AMBER} />
      <rect x="273" y="295" width="478" height="420" rx="146" fill="#F5F2EC" />
      <polygon points="372,700 372,786 452,706" fill="#F5F2EC" />
      <circle cx="442" cy="470" r="55" fill={AMBER} />
      <circle cx="582" cy="470" r="55" fill={AMBER} />
      <circle cx="423" cy="448" r="19" fill="#fff" />
      <circle cx="563" cy="448" r="19" fill="#fff" />
    </svg>
  );
}

export default function OpenSourceView() {
  return (
    <main className="overflow-x-hidden" style={{ background: "var(--cream)", color: "var(--deep)" }}>
      {/* Hero */}
      <section className="px-6 pb-[10vh] pt-36 text-center">
        <div className="mx-auto max-w-2xl">
          <Eyebrow>Open Source · Frei nutzbar</Eyebrow>
          <Reveal>
            <h1 className="mt-5 font-serif leading-[1.06]" style={{ fontSize: "clamp(2.4rem, 5.5vw, 4rem)" }}>
              Werkzeuge, die ich baue<br />und verschenke.
            </h1>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mx-auto mt-6 max-w-xl text-lg" style={{ color: "var(--warm-mid)" }}>
              Nicht alles, was hilft, muss etwas kosten. Hier liegen die freien, quelloffenen
              Projekte aus der Sabala-Werkstatt, lokal, privat, ohne Abo. Nimm sie mit.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Projekt-Grid */}
      <section className="px-6 pb-[16vh]">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 md:grid-cols-2">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.href} delay={i * 0.06}>
                <Link href={p.href} className="block h-full">
                  <TiltCard className="h-full" radius={22}>
                    <div className="flex h-full flex-col rounded-[22px] p-8" style={{ background: "#FFFFFF", border: "1px solid rgba(181,176,168,0.3)" }}>
                      <div className="flex items-center gap-4">
                        <MooniMark />
                        <div>
                          <h2 className="font-serif text-2xl">{p.name}</h2>
                          <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: AMBER }}>{p.tagline}</p>
                        </div>
                      </div>
                      <p className="mt-5 text-[15px]" style={{ color: "var(--warm-mid)" }}>{p.body}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {p.meta.map((m) => (
                          <span key={m} className="rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em]"
                            style={{ background: "rgba(184,150,62,0.10)", color: "var(--gold)" }}>{m}</span>
                        ))}
                      </div>
                      <span className="mt-7 inline-flex items-center gap-2 font-sans text-sm font-semibold" style={{ color: "var(--deep)" }}>
                        Ansehen & laden
                        <svg width="16" height="11" viewBox="0 0 20 12" fill="none">
                          <path d="M0 6h18M13 1l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </TiltCard>
                </Link>
              </Reveal>
            ))}

            {/* Platzhalter, mehr folgt */}
            <Reveal delay={0.12}>
              <div className="flex h-full min-h-[200px] flex-col items-center justify-center rounded-[22px] p-8 text-center"
                style={{ border: "1px dashed rgba(181,176,168,0.5)" }}>
                <p className="font-serif text-xl" style={{ color: "var(--warm-mid)" }}>Mehr folgt.</p>
                <p className="mt-2 text-[14px]" style={{ color: "var(--warm-mid)" }}>
                  Hier landen die nächsten freien Werkzeuge aus der Werkstatt.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-16 text-center">
            <GoldCTA href="/open-source-projekte/mooni-voice">Mooni Voice ansehen</GoldCTA>
          </div>
        </div>
      </section>
    </main>
  );
}
