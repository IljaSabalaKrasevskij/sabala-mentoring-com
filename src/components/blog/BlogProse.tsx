import { Quote } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

// Geteilte Gold-Standard-Prose-Bausteine. Einmal pflegen, alle Artikel nutzen.

// Drop-Cap (großer Initial) für den ersten Absatz nach einer H2.
export const dropCapClass =
  "first-letter:font-instrument first-letter:text-[4.5rem] md:first-letter:text-[5.5rem] first-letter:leading-[0.85] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-refined-gold";

// Dünne Gold-Trennlinie zwischen Sektionen.
export function GoldDivider() {
  return (
    <div className="flex items-center gap-4 my-16 max-w-[820px] mx-auto px-6 sm:px-12 md:px-24 w-full">
      <div className="h-px bg-gradient-to-r from-transparent via-refined-gold/30 to-transparent flex-1"></div>
      <div className="w-1.5 h-1.5 rounded-full bg-refined-gold/40"></div>
      <div className="h-px bg-gradient-to-r from-refined-gold/30 via-transparent to-transparent flex-1"></div>
    </div>
  );
}

// Pull-Quote für die stärkste Aussage des Artikels.
export function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <ScrollReveal>
      <blockquote className="not-prose my-16 max-w-[820px] mx-auto px-6 sm:px-12 md:px-24 w-full">
        <div className="border-l-2 border-refined-gold pl-6 md:pl-10 relative">
          <Quote className="absolute -left-3 -top-2 w-6 h-6 text-refined-gold bg-pure-surface" />
          <p className="font-instrument text-2xl md:text-4xl text-deep-charcoal leading-[1.2] italic">{children}</p>
        </div>
      </blockquote>
    </ScrollReveal>
  );
}
