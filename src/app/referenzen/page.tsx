import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referenzen & Ergebnisse | Sabala Mentoring",
  description:
    "Echte Projekt-Ergebnisse von Sabala Studios. Case Study: Stefanie Lommel, Wandelbegleitung fuer Familien- und Traditionsunternehmen.",
};

const outcomes = [
  {
    label: "Positionierung",
    value: "Wandelbegleitung fuer Familienunternehmen",
    text: "Aus einer breiten Expertenrolle wurde ein klarer Auftrag: Stefanie Lommel wird gerufen, bevor Wandel zur Krise wird.",
  },
  {
    label: "Zielgruppe",
    value: "Inhaber:innen & Geschaeftsfuehrung",
    text: "Die Seite spricht Entscheider:innen in Familien- und Traditionsunternehmen direkt an, ohne Umwege ueber allgemeines Coaching.",
  },
  {
    label: "Angebotsstrecke",
    value: "15 Min. Telefonat + 90 Min. Session",
    text: "Der Einstieg ist niedrigschwellig, das erste bezahlte Format ist konkret benannt: eine 90-Minuten-Entlastungssession.",
  },
  {
    label: "Technik & SEO",
    value: "Next.js, Schema.org, Vercel",
    text: "Person, Organisation und Service sind strukturiert ausgezeichnet. Die Seite ist schnell, sauber indexierbar und live auf Vercel.",
  },
];

const proofPoints = [
  "Live-Webseite mit eigenem Code statt Baukasten-Template",
  "Klare Sprache fuer Unternehmer:innen unter Entscheidungsdruck",
  "Konkrete Kontaktwege: Termin, E-Mail und Angebot",
  "Editoriale Bildwelt mit Stefanie als erster Vertrauensanker",
];

const testimonial =
  "Ich durfte die umfangreiche und breit aufgesetzte AI Diamond Force gleich fuer Praxisanwendungen nutzen. Gerade die juristischen Grundlagen haben sehr geholfen, auf Punkte zu achten, die direkt auf mein Angebot zugeschnitten sind.";

export default function ReferenzenPage() {
  return (
    <div className="min-h-[100dvh] bg-warm-canvas text-deep-charcoal selection:bg-refined-gold selection:text-white">
      <section className="relative overflow-hidden bg-pure-surface px-6 pb-20 pt-36 sm:px-10 md:px-16 md:pb-28 md:pt-48">
        <div className="pointer-events-none absolute right-[-18vw] top-[-18vw] h-[48vw] w-[48vw] rounded-full bg-gold-glow opacity-20 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <ScrollReveal>
            <p className="font-geist text-[0.7rem] font-medium uppercase tracking-[0.22em] text-warm-steel">
              Referenzen & Ergebnisse
            </p>
            <h1 className="mt-6 max-w-4xl font-instrument text-[clamp(3.4rem,8vw,7.2rem)] leading-[0.94] tracking-tight">
              Keine Deko.
              <br />
              <span className="italic text-warm-steel">Echte Seiten,</span>
              <br />
              echte Klarheit.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="border-l border-refined-gold/35 pl-6 font-satoshi text-lg leading-[1.7] text-warm-steel">
              Hier geht es nicht um Screenshots, die nur gut aussehen. Es geht um Auftritte, die eine Rolle schaerfen, ein Angebot sichtbar machen und den naechsten Schritt einfach machen.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-8 md:px-16 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <ScrollReveal className="min-h-[560px]">
            <Link
              href="https://www.dielommel.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full"
            >
              <div className="relative h-full min-h-[560px] overflow-hidden rounded-[2rem] border border-whisper-border bg-[#141414] shadow-[0_28px_70px_-32px_rgba(0,0,0,0.3)]">
                <Image
                  src="/images/Referenz-Stefanie-Lommel.jpg"
                  alt="Stefanie Lommel fuer die Referenz Holen wir die Lommel"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 54vw"
                  className="object-cover object-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 md:p-10">
                  <p className="font-geist text-[0.7rem] uppercase tracking-[0.22em] text-white/65">
                    Live Case Study
                  </p>
                  <h2 className="mt-3 max-w-xl font-instrument text-4xl leading-none text-white md:text-6xl">
                    Holen wir die Lommel.
                  </h2>
                  <div className="mt-7 flex flex-wrap gap-3">
                    {["Wandelbegleitung", "Premium-Webseite", "Next.js"].map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-geist text-[0.65rem] uppercase tracking-[0.18em] text-white/80 backdrop-blur"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex h-full flex-col justify-between rounded-[2rem] border border-whisper-border bg-pure-surface p-7 shadow-[0_24px_60px_-36px_rgba(0,0,0,0.18)] md:p-10">
              <div>
                <p className="font-geist text-[0.7rem] uppercase tracking-[0.22em] text-refined-gold">
                  Stefanie Lommel
                </p>
                <h3 className="mt-4 font-instrument text-4xl leading-[1.02] md:text-5xl">
                  Eine Webseite fuer Wandel, bevor Wandel zur Krise wird.
                </h3>
                <p className="mt-6 font-satoshi text-lg leading-[1.7] text-warm-steel">
                  Stefanie begleitet Inhaber:innen und Geschaeftsfuehrer:innen von Familien- und Traditionsunternehmen durch komplexe Wandelprozesse. Die Seite macht diese Rolle in wenigen Sekunden verstaendlich.
                </p>
              </div>

              <div className="mt-10 grid gap-3">
                {proofPoints.map((point) => (
                  <div key={point} className="flex gap-3 border-t border-whisper-border pt-4">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-refined-gold" />
                    <p className="font-satoshi text-[0.98rem] leading-relaxed text-deep-charcoal/80">{point}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="https://www.dielommel.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-refined-gold px-6 py-3 font-satoshi text-sm font-semibold text-white transition-colors hover:bg-deep-charcoal"
                >
                  Live-Seite ansehen
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-8 md:px-16 md:pb-36">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="mb-10 flex flex-col justify-between gap-5 border-t border-deep-charcoal/10 pt-8 md:flex-row md:items-end">
              <div>
                <p className="font-geist text-[0.7rem] uppercase tracking-[0.22em] text-warm-steel">
                  Sichtbare Ergebnisse
                </p>
                <h2 className="mt-4 max-w-3xl font-instrument text-4xl leading-[1.05] md:text-6xl">
                  Was sich auf der fertigen Seite konkret geaendert hat.
                </h2>
              </div>
              <p className="max-w-md font-satoshi text-base leading-[1.7] text-warm-steel">
                Keine erfundenen Conversion-Zahlen. Nur Dinge, die auf der live Webseite nachpruefbar sind.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-4 md:grid-cols-2">
            {outcomes.map((item, index) => (
              <ScrollReveal key={item.label} delay={0.08 * index}>
                <div className="h-full border border-whisper-border bg-pure-surface p-6 md:p-8">
                  <p className="font-geist text-[0.68rem] uppercase tracking-[0.22em] text-refined-gold">
                    {item.label}
                  </p>
                  <h3 className="mt-4 font-instrument text-3xl leading-tight text-deep-charcoal">
                    {item.value}
                  </h3>
                  <p className="mt-4 font-satoshi text-[0.98rem] leading-[1.7] text-warm-steel">
                    {item.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-t-[2.5rem] bg-[#141414] px-6 py-24 text-pure-surface sm:px-10 md:px-16 md:py-36">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[44vh] w-[70vw] -translate-x-1/2 rounded-full bg-refined-gold/10 blur-[120px]" />

        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <ScrollReveal>
            <div className="relative aspect-square max-w-[320px] overflow-hidden rounded-full border border-white/10 grayscale">
              <Image
                src="/images/Testimonial Stefanie Lommel.jpeg"
                alt="Stefanie Lommel"
                fill
                sizes="320px"
                className="object-cover"
              />
            </div>
            <p className="mt-6 font-satoshi text-lg text-white">Stefanie Lommel</p>
            <p className="mt-1 font-geist text-[0.72rem] uppercase tracking-[0.18em] text-white/45">
              Organisationsentwicklerin & Coach fuer Geschaeftsfuehrer
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="font-instrument text-3xl leading-[1.25] text-white/92 md:text-5xl">
              {testimonial}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="-mt-8 flex items-center justify-center rounded-t-[2.5rem] bg-pure-surface px-6 py-24 md:py-32">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-instrument text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] text-deep-charcoal">
              Dein eigener Auftritt soll nicht nur schoen sein, sondern klar?
            </h2>
            <div className="mt-9 flex justify-center">
              <Link
                href="https://tidycal.com/sabala"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 rounded-full bg-refined-gold py-2 pl-8 pr-2 font-satoshi font-medium text-white transition-colors hover:bg-deep-charcoal"
              >
                Kennenlerngespraech buchen
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
