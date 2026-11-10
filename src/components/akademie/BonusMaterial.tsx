"use client";

import { BookOpenCheck, Brain, ClipboardCopy, FileText, FolderTree, NotebookPen, Palette, PenLine, RotateCw, ShieldCheck, SwatchBook } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GOLD_AUF_HELL, HEBT, Reveal, SektionsKopf, TEXT_AUF_HELL, TiltCard } from "./shared";
import { DESIGN_PAKET, SKILLS, VORLAGEN, type Posten } from "./ablauf";

/* Skills und Bonus-Material: was wir im Kurs einrichten und was du dazu mitbekommst.
   Links die fünf Skills als Klapptafel (dunkel, wie ein Blick in Claude), rechts Vorlagen und das
   Design-Paket als Karten, die sich mit der Maus neigen. Die Texte kommen aus ablauf.ts, dieselbe Quelle wie das PDF. */

/* ablauf.ts nennt die Symbole beim Namen, damit auch das PDF-Skript sie findet. */
const SYMBOLE: Record<string, LucideIcon> = {
  "notebook-pen": NotebookPen,
  "shield-check": ShieldCheck,
  "pen-line": PenLine,
  "book-open-check": BookOpenCheck,
  brain: Brain,
  "folder-tree": FolderTree,
  "file-text": FileText,
  "clipboard-copy": ClipboardCopy,
  palette: Palette,
  "swatch-book": SwatchBook,
};

/* Eine Zeile der Klapptafel, mit der Maus: beide Seiten gleich hoch und mit eigenem Rand. */
const ZEILE = "maus:min-h-[46px] maus:rounded-xl maus:border maus:py-1.5";
const SCHATTEN = "shadow-[0_18px_44px_rgba(46,43,38,0.08)] hover:shadow-[0_34px_70px_rgba(46,43,38,0.22)]";

/* Die fünf Skills. Mit der Maus steht vorn nur der Name, beim Darüberfahren kippt die Zeile nach vorn
   und zeigt in Gold, was der Skill tut. Am Handy steht der Satz wie bisher unter dem Namen. */
function Klapptafel() {
  return (
    <ul className="mt-3.5 space-y-2.5 maus:space-y-[7px]">
      {SKILLS.map((p) => {
        const Symbol = SYMBOLE[p.symbol];
        return (
          <li key={p.name}>
            <div tabIndex={0} role="group" aria-label={p.name} className="dreh dreh-quer relative rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light">
              <div className="dreh-innen">
                <div className={`dreh-vorn flex items-center gap-3.5 maus:border-[rgba(250,248,245,0.13)] maus:bg-[rgba(250,248,245,0.05)] maus:px-3 ${ZEILE}`}>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg maus:h-8 maus:w-8" style={{ background: "rgba(184,150,62,0.16)", color: "var(--gold-light)" }}>
                    <Symbol aria-hidden size={19} strokeWidth={1.8} />
                  </span>
                  <span className="text-[1.02rem] font-semibold text-cream maus:text-[1.06rem]">{p.name}</span>
                  <RotateCw aria-hidden size={15} strokeWidth={2.2} className="ml-auto hidden shrink-0 maus:block" style={{ color: "rgba(212,174,90,0.75)" }} />
                </div>
                <p className={`dreh-hinten -mt-1.5 pl-[3.125rem] text-[0.97rem] leading-snug text-[rgba(250,248,245,0.78)] maus:mt-0 maus:flex maus:items-center maus:border-gold-light maus:bg-[linear-gradient(90deg,#d9b662,#c39a3f)] maus:px-4 maus:font-medium maus:text-tech-bg ${ZEILE}`}>
                  {p.text}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/* `nurName`: nur die Namen zeigen. Die Vorlagen erklären sich selbst, der Satz dazu steht im PDF.
   So bleibt der Abschnitt in einem Laptop-Fenster. */
function Liste({ posten, nurName = false }: { posten: Posten[]; nurName?: boolean }) {
  return (
    <ul className={`mt-3.5 [transform-style:preserve-3d] ${nurName ? "space-y-2" : "space-y-2.5"}`}>
      {posten.map((p) => {
        const Symbol = SYMBOLE[p.symbol];
        return (
          <li key={p.name} className={`flex gap-3.5 [transform-style:preserve-3d] ${nurName ? "items-center" : "items-start"}`}>
            <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${HEBT}`} style={{ background: "rgba(184,150,62,0.14)", color: GOLD_AUF_HELL }}>
              <Symbol aria-hidden size={19} strokeWidth={1.8} />
            </span>
            <p className="text-[0.97rem] leading-snug" style={{ color: TEXT_AUF_HELL }}>
              <span className="block text-[1.02rem] font-semibold text-deep">{p.name}</span>
              {!nurName && p.text}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

export default function BonusMaterial() {
  return (
    <section id="material" className="relative overflow-hidden px-6 py-[5.5vh]" style={{ background: "var(--cream)" }}>
      <div className="pointer-events-none absolute left-[-10vw] top-[10%] hidden h-[60vh] w-[55vw] md:block" style={{ background: "radial-gradient(ellipse, rgba(184,150,62,0.16), transparent 70%)" }} />

      <div className="relative mx-auto max-w-6xl">
        <SektionsKopf
          hell
          zeile="Skills und Bonus-Material"
          titel={
            <>
              Fünf Skills, fertige Vorlagen, <span style={{ color: GOLD_AUF_HELL }}>ein Design-Paket.</span>
            </>
          }
        />

        <div className="mt-7 grid gap-4 min-[56.25rem]:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)]">
          <Reveal className="flex flex-col rounded-2xl p-6" style={{ background: "linear-gradient(180deg, #17120b, #0a0806)", border: "1px solid rgba(184,150,62,0.5)", boxShadow: "0 30px 70px rgba(46,43,38,0.3)" }}>
            <p className="font-mono text-[12.5px] uppercase tracking-[0.16em] text-gold-light">Richten wir im Kurs gemeinsam ein</p>
            <h3 className="mt-2 font-serif text-[1.7rem] leading-tight text-cream">Fünf Skills für Claude</h3>
            <Klapptafel />
            {/* Iljas goldene Regel aus dem Kurs. Sie füllt den Platz neben den zwei Karten rechts. */}
            <p className="mt-auto pt-5">
              <span className="block rounded-xl px-4 py-3 text-[0.97rem] leading-snug text-cream" style={{ background: "rgba(184,150,62,0.12)", border: "1px solid rgba(184,150,62,0.4)" }}>
                <span className="font-semibold text-gold-light">Meine goldene Regel:</span> Erst prüfen, dann installieren. Immer.
              </span>
            </p>
          </Reveal>

          <div className="grid gap-4">
            <Reveal delay={0.08}>
              <TiltCard hervor={1.025} max={5} radius={16} className={`group/karte h-full px-6 py-4 ${SCHATTEN}`} style={{ background: "#ffffff", border: "1px solid rgba(184,150,62,0.3)" }}>
                <p className="font-mono text-[12.5px] uppercase tracking-[0.16em]" style={{ color: GOLD_AUF_HELL }}>
                  Bekommst du dazu
                </p>
                <h3 className="mt-2 font-serif text-[1.5rem] leading-tight text-deep">Vorlagen und Prompts</h3>
                <Liste posten={VORLAGEN} nurName />
              </TiltCard>
            </Reveal>

            <Reveal delay={0.14}>
              <TiltCard hervor={1.025} max={5} radius={16} className={`group/karte h-full px-6 py-4 ${SCHATTEN}`} style={{ background: "linear-gradient(160deg, #fbf3dc, #f3e6c2)", border: "1px solid rgba(184,150,62,0.55)" }}>
                {/* Farbkarte als kleines Bild für „Design“. Sie schwebt beim Darüberfahren über der Karte. */}
                <span aria-hidden className={`absolute right-0 top-0 hidden gap-1.5 sm:flex ${HEBT}`}>
                  {["#0a0806", "#2e2b26", "#8a6a1f", "#b8963e", "#d4ae5a", "#faf8f5"].map((farbe) => (
                    <span key={farbe} className="h-5 w-5 rounded-full" style={{ background: farbe, border: "1px solid rgba(46,43,38,0.18)" }} />
                  ))}
                </span>
                <p className="font-mono text-[12.5px] uppercase tracking-[0.16em]" style={{ color: GOLD_AUF_HELL }}>
                  Bonus, geschenkt
                </p>
                <h3 className="mt-2 font-serif text-[1.5rem] leading-tight text-deep">Dein Design-Paket</h3>
                <Liste posten={DESIGN_PAKET} />
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
