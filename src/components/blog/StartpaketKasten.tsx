import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/* Startpaket-Kasten für Artikel rund um Claude Code (Iljas „Ja, beides“, 15.11.2026).
   Er steht mitten im Artikel, dort wo das Startpaket inhaltlich hilft, und konkurriert nicht mit dem einen
   Haupt-Aufruf am Ende (BLOG-STYLEGUIDE §5). Titel und Satz passen sich dem Artikel an, das Ziel bleibt die
   Startpaket-Seite mit Formular. Umami zählt die Klicks je Artikel (Ereignis „startpaket-kasten“). */
export function StartpaketKasten({
  artikel,
  titel = "Kostenlos: das Startpaket für die erste Woche",
  text = "Installation, Spickzettel, zwei CLAUDE.md-Vorlagen und zehn Skills in einem Ordner.",
}: {
  artikel: string;
  titel?: string;
  text?: string;
}) {
  return (
    <section className="mx-auto w-full max-w-[1100px] px-6 pt-16 sm:px-12 md:px-24">
      <ScrollReveal>
        <Link
          href="/claude-code/startpaket"
          data-umami-event="startpaket-kasten"
          data-umami-event-artikel={artikel}
          className="group mx-auto flex max-w-[820px] flex-col gap-5 rounded-2xl border border-refined-gold/40 bg-[#2E2B26] p-6 transition-colors hover:border-gold-light sm:flex-row sm:items-center sm:justify-between md:p-7"
        >
          <div className="flex gap-5">
            <Download className="mt-1 h-6 w-6 flex-shrink-0 text-gold-light" aria-hidden />
            <div>
              <p className="font-instrument text-2xl leading-snug text-white">{titel}</p>
              <p className="mt-2 font-satoshi text-[16px] leading-relaxed text-[#E9E4DA]">{text}</p>
            </div>
          </div>
          <span className="inline-flex flex-shrink-0 items-center gap-2 pl-11 font-satoshi text-[15px] font-semibold text-gold-light group-hover:text-white sm:pl-0">
            Startpaket ansehen <ArrowRight className="h-4 w-4" aria-hidden />
          </span>
        </Link>
      </ScrollReveal>
    </section>
  );
}
