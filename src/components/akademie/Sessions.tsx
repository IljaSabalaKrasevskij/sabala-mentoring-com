"use client";

import { BrainCircuit, Check, LibraryBig, LifeBuoy, Plus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GOLD_AUF_HELL, Reveal, SektionsKopf, TEXT_AUF_HELL } from "./shared";
import { CURRENT_COHORT, formatSessionDate } from "./cohorts";

/* So läuft es ab: drei Termine als drei Karten. Oben steht je Termin, was du danach hast.
   Die Werkzeuge sind das Mittel dazu und stehen darunter zum Aufklappen.
   Die Karten stehen in der Reihenfolge der Sessions in cohorts.ts, daher kommt das Datum. */

type Schritt = { symbol: LucideIcon; art: string; titel: string; danach?: string[]; text?: string };

const SCHRITTE: Schritt[] = [
  {
    symbol: LibraryBig,
    art: "Workshop 1 · 2,5 Stunden live",
    titel: "Dein Wissen an einem Ort",
    danach: [
      "Ein Recherche-Setup, das aus Stunden Minuten macht",
      "Dein Wissen aus Videos, PDFs und Webseiten, durchsuchbar",
      "Ein Second Brain auf deinem Rechner, das Claude lesen kann",
    ],
  },
  {
    symbol: BrainCircuit,
    art: "Workshop 2 · 2,5 Stunden live",
    titel: "Claude bekommt ein Gedächtnis",
    danach: [
      "Du fragst: „Woran haben wir gearbeitet?“ Claude weiß es.",
      "Nach jeder Session schreibt Claude von selbst eine Tagesnotiz",
      "Claude greift bei jeder Aufgabe auf dein Wissen zu",
    ],
  },
  {
    symbol: LifeBuoy,
    art: "Fragestunde · 1 Stunde live",
    titel: "Dein Sicherheitsnetz",
    text: "Nach dem zweiten Workshop arbeitest du ein paar Tage mit deinem Setup. Was dabei offen bleibt, klären wir hier gemeinsam.",
  },
];

const WERKZEUGE: { workshop: string; liste: [name: string, nutzen: string][] }[] = [
  {
    workshop: "Workshop 1",
    liste: [
      ["Comet Browser mit drei Erweiterungen", "Dein KI-Browser für die Recherche. Quellen finden, lesen und weiterverarbeiten, ohne 20 offene Tabs."],
      ["Firecrawl", "Holt ganze Webseiten sauber als Text. Claude besorgt sich seine Quellen damit selbst."],
      ["Gemini Notebook (früher NotebookLM)", "Videos, PDFs und Webseiten werden zu einer Wissensdatenbank, die du durchsuchen kannst."],
      ["Obsidian mit PARA-Struktur", "Dein Wissen als einfache Dateien auf deinem Rechner, verlinkt und geordnet. Das Einsortieren übernimmt danach Claude."],
    ],
  },
  {
    workshop: "Workshop 2",
    liste: [
      ["Terminal und Claude Code", "Wir installieren alles Schritt für Schritt, auch wenn du das Terminal noch nie geöffnet hast."],
      ["Deine CLAUDE.md", "Die eine Datei, die Claude sagt, wer du bist, wie du arbeitest und worauf er zugreifen darf."],
      ["MCP-Verbindungen", "So bekommt Claude Zugriff auf Obsidian und Gemini Notebook, also auf dein Wissen."],
      ["Memory-System und meine Skills", "Closing Session schreibt die Tagesnotiz, Memory merkt sich deine Projekte, Cybersecurity schützt vor gefährlichen Skripten."],
    ],
  },
];

export default function Sessions() {
  return (
    <section id="ablauf" className="relative overflow-hidden px-6 py-[7vh]" style={{ background: "var(--cream)" }}>
      <div className="pointer-events-none absolute left-1/2 top-0 h-[45vh] w-[80vw] -translate-x-1/2" style={{ background: "radial-gradient(ellipse at top, rgba(184,150,62,0.14), transparent 70%)" }} />

      <div className="relative mx-auto max-w-6xl">
        <SektionsKopf hell zeile="Der Ablauf" titel="Zwei Workshops, eine Fragestunde, ein fertiges Setup." />

        <div className="mt-9 grid gap-5 lg:grid-cols-3">
          {SCHRITTE.map((s, i) => {
            const termin = CURRENT_COHORT?.sessions[i];
            const netz = !s.danach;
            return (
              <Reveal
                key={s.titel}
                delay={i * 0.08}
                className="relative flex flex-col overflow-hidden rounded-2xl p-6"
                style={{
                  background: netz ? "linear-gradient(160deg, #fbf3dc, #f3e6c2)" : "#ffffff",
                  border: `1px solid rgba(184,150,62,${netz ? 0.55 : 0.3})`,
                  boxShadow: "0 18px 44px rgba(46,43,38,0.08)",
                }}
              >
                {/* Schrittzahl als Wasserzeichen unten rechts, hinter dem Text */}
                <span aria-hidden className="absolute -bottom-3 right-4 font-serif leading-none" style={{ fontSize: "5.5rem", color: `rgba(184,150,62,${netz ? 0.22 : 0.12})` }}>
                  0{i + 1}
                </span>

                <div className="relative flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full" style={{ background: netz ? "rgba(255,255,255,0.7)" : "rgba(184,150,62,0.13)", color: GOLD_AUF_HELL }}>
                    <s.symbol aria-hidden size={24} strokeWidth={1.7} />
                  </span>
                  <div>
                    <p className="font-mono text-[12.5px] uppercase leading-snug tracking-[0.1em]" style={{ color: GOLD_AUF_HELL }}>
                      {s.art}
                    </p>
                    {termin && (
                      <p className="text-[0.95rem]" style={{ color: TEXT_AUF_HELL }}>
                        {formatSessionDate(termin.date)}
                      </p>
                    )}
                  </div>
                </div>

                <h3 className="relative mt-5 font-serif text-[1.6rem] leading-tight text-deep">{s.titel}</h3>

                {s.danach ? (
                  <>
                    <p className="relative mt-3.5 text-[0.95rem] font-semibold text-deep">Danach hast du:</p>
                    <ul className="relative mt-2.5 space-y-2.5">
                      {s.danach.map((d) => (
                        <li key={d} className="flex items-start gap-2.5 text-[0.97rem] leading-snug" style={{ color: TEXT_AUF_HELL }}>
                          <Check aria-hidden size={17} strokeWidth={2.6} className="mt-[3px] shrink-0" style={{ color: GOLD_AUF_HELL }} />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <>
                    <p className="relative mt-3.5 text-[0.97rem] leading-relaxed" style={{ color: TEXT_AUF_HELL }}>
                      {s.text}
                    </p>
                    <p className="relative mt-auto flex items-center gap-2.5 pt-5 text-[0.97rem] font-semibold text-deep">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-tech-bg">
                        <Check aria-hidden size={15} strokeWidth={3} />
                      </span>
                      Im Preis enthalten
                    </p>
                  </>
                )}
              </Reveal>
            );
          })}
        </div>

        {/* Die Werkzeuge im Einzelnen, zum Aufklappen */}
        <details className="group mt-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(46,43,38,0.14)" }}>
          <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-6 py-3 text-[1rem] font-semibold text-deep [&::-webkit-details-marker]:hidden">
            <span>
              Womit wir arbeiten <span className="font-normal" style={{ color: TEXT_AUF_HELL }}>· acht Werkzeuge, kurz erklärt</span>
            </span>
            <Plus aria-hidden size={20} className="shrink-0 transition-transform duration-300 group-open:rotate-45" style={{ color: GOLD_AUF_HELL }} />
          </summary>
          <div className="grid gap-8 px-6 pb-7 pt-2 md:grid-cols-2">
            {WERKZEUGE.map((w) => (
              <div key={w.workshop}>
                <p className="font-mono text-[12.5px] uppercase tracking-[0.16em]" style={{ color: GOLD_AUF_HELL }}>
                  {w.workshop}
                </p>
                <ul className="mt-3 space-y-3">
                  {w.liste.map(([name, nutzen]) => (
                    <li key={name} className="text-[0.97rem] leading-relaxed" style={{ color: TEXT_AUF_HELL }}>
                      <span className="font-semibold text-deep">{name}.</span> {nutzen}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
