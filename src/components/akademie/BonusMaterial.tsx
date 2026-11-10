"use client";

import { BookOpenCheck, Brain, ClipboardCopy, FileText, FolderTree, NotebookPen, Palette, PenLine, ShieldCheck, SwatchBook } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GOLD_AUF_HELL, Reveal, SektionsKopf, TEXT_AUF_DUNKEL, TEXT_AUF_HELL } from "./shared";
import { DESIGN_PAKET, SKILLS, VORLAGEN, type Posten } from "./ablauf";

/* Skills und Bonus-Material: was wir im Kurs einrichten und was du dazu mitbekommst.
   Links die fünf Skills (dunkle Tafel, wie ein Blick in Claude), rechts Vorlagen und das Design-Paket.
   Die Texte kommen aus ablauf.ts, dieselbe Quelle wie das PDF. */

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

/* `nurName`: nur die Namen zeigen. Die Vorlagen erklären sich selbst, der Satz dazu steht im PDF.
   So bleibt der Abschnitt in einem Laptop-Fenster. */
function Liste({ posten, dunkel = false, nurName = false }: { posten: Posten[]; dunkel?: boolean; nurName?: boolean }) {
  return (
    <ul className={`mt-3.5 ${nurName ? "space-y-2" : "space-y-2.5"}`}>
      {posten.map((p) => {
        const Symbol = SYMBOLE[p.symbol];
        return (
          <li key={p.name} className={`flex gap-3.5 ${nurName ? "items-center" : "items-start"}`}>
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={dunkel ? { background: "rgba(184,150,62,0.16)", color: "var(--gold-light)" } : { background: "rgba(184,150,62,0.14)", color: GOLD_AUF_HELL }}>
              <Symbol aria-hidden size={19} strokeWidth={1.8} />
            </span>
            <p className="text-[0.97rem] leading-snug" style={{ color: dunkel ? TEXT_AUF_DUNKEL : TEXT_AUF_HELL }}>
              <span className={`block text-[1.02rem] font-semibold ${dunkel ? "text-cream" : "text-deep"}`}>{p.name}</span>
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
            <Liste posten={SKILLS} dunkel />
            {/* Iljas goldene Regel aus dem Kurs. Sie füllt den Platz neben den zwei Karten rechts. */}
            <p className="mt-auto pt-5">
              <span className="block rounded-xl px-4 py-3 text-[0.97rem] leading-snug text-cream" style={{ background: "rgba(184,150,62,0.12)", border: "1px solid rgba(184,150,62,0.4)" }}>
                <span className="font-semibold text-gold-light">Meine goldene Regel:</span> Erst prüfen, dann installieren. Immer.
              </span>
            </p>
          </Reveal>

          <div className="grid gap-4">
            <Reveal delay={0.08} className="rounded-2xl px-6 py-4" style={{ background: "#ffffff", border: "1px solid rgba(184,150,62,0.3)", boxShadow: "0 18px 44px rgba(46,43,38,0.08)" }}>
              <p className="font-mono text-[12.5px] uppercase tracking-[0.16em]" style={{ color: GOLD_AUF_HELL }}>
                Bekommst du dazu
              </p>
              <h3 className="mt-2 font-serif text-[1.5rem] leading-tight text-deep">Vorlagen und Prompts</h3>
              <Liste posten={VORLAGEN} nurName />
            </Reveal>

            <Reveal delay={0.14} className="relative rounded-2xl px-6 py-4" style={{ background: "linear-gradient(160deg, #fbf3dc, #f3e6c2)", border: "1px solid rgba(184,150,62,0.55)", boxShadow: "0 18px 44px rgba(46,43,38,0.08)" }}>
              {/* Farbkarte als kleines Bild für „Design“ */}
              <span aria-hidden className="absolute right-6 top-4 hidden gap-1.5 sm:flex">
                {["#0a0806", "#2e2b26", "#8a6a1f", "#b8963e", "#d4ae5a", "#faf8f5"].map((farbe) => (
                  <span key={farbe} className="h-5 w-5 rounded-full" style={{ background: farbe, border: "1px solid rgba(46,43,38,0.18)" }} />
                ))}
              </span>
              <p className="font-mono text-[12.5px] uppercase tracking-[0.16em]" style={{ color: GOLD_AUF_HELL }}>
                Bonus, geschenkt
              </p>
              <h3 className="mt-2 font-serif text-[1.5rem] leading-tight text-deep">Dein Design-Paket</h3>
              <Liste posten={DESIGN_PAKET} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
