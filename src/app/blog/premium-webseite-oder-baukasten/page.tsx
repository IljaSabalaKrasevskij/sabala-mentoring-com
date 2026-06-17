import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { ArrowLeft, Sparkles, Eye } from "lucide-react";

const slug = "premium-webseite-oder-baukasten";
const url = `https://sabala-mentoring.com/blog/${slug}`;
const datePublished = "2026-06-16";

export const metadata = {
  title: "Premium-Webseite oder Baukasten: 5 Anti-Patterns und 7 Signale, an denen du den Unterschied siehst",
  description:
    "5 Anti-Patterns, die deine Webseite billig wirken lassen, und 7 stille Signale, die Premium von austauschbar trennen. Ehrlich, mit echten Beispielen, ohne Agentur-Sprech.",
  alternates: { canonical: url },
  openGraph: {
    title: "Premium-Webseite oder Baukasten: 5 Anti-Patterns und 7 Signale",
    description: "5 Anti-Patterns und 7 stille Signale, die den Unterschied machen. Konkret und ehrlich.",
    type: "article",
    publishedTime: datePublished,
    url,
    images: [{ url: `${url.replace(/\/$/, "")}/cover.jpg`, width: 1200, height: 630, alt: "Skizze: zwei Webseiten-Wireframes auf Schreibtisch, Premium-Layout links, überladenes Template-Grid rechts, Gold-Trennlinie in der Mitte" }],
  },
};

const articleSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Premium-Webseite oder Baukasten: 5 Anti-Patterns und 7 Signale",
  description: "5 Anti-Patterns + 7 stille Signale, die Premium von austauschbar trennen. Konkret, ehrlich, ohne Agentur-Sprech.",
  author: { "@type": "Person", name: "Ilja Krasevskij", url: "https://sabala-mentoring.com/ueber-mich" },
  publisher: { "@type": "Organization", name: "Sabala Mentoring" },
  datePublished,
  dateModified: datePublished,
  mainEntityOfPage: { "@type": "WebPage", "@id": url },
  image: `${url}/cover.jpg`,
});

const faq = [
  {
    q: "Wie lange dauert es, fünf Anti-Patterns zu beheben?",
    a: "Realistisch zwei bis fünf Tage Arbeit, wenn du selbst hand anlegst. Stock-Fotos durch eigene ersetzen kostet einen halben Tag mit Fotograf. CTAs umtexten dauert eine Stunde. Über-mich neu schreiben braucht einen Vormittag und einen ruhigen Kopf. Cookie-Banner entfernen geht in 30 Minuten, wenn deine Tracking-Lage aufgeräumt ist.",
  },
  {
    q: "Welches Signal hat den höchsten Effekt für den geringsten Aufwand?",
    a: "Eigene Fotos. Nichts verändert die Wahrnehmung deiner Seite so schnell wie der Wechsel von Stock zu echt. Ein guter Fotograf, ein halber Tag, drei brauchbare Bilder. Das schlägt fast jede Code-Optimierung im wahrgenommenen Wert.",
  },
  {
    q: "Brauche ich für Premium-Signale einen Designer?",
    a: "Für die Strategie ja, für die Umsetzung nicht zwingend. Brand-Tokens, ICP-Adressierung und Trust-Architektur sind keine Design-Fragen, sondern Klarheits-Fragen. Wenn du die Klarheit hast, kannst du sie mit jedem Tool umsetzen, von Webflow bis zu eigenem Code.",
  },
  {
    q: "Kann ich Premium-Signale mit Baukasten haben?",
    a: "Ja, in fünf von sieben Punkten. Eigene Stimme, eigene Fotos, ICP-Adressierung, Trust-Architektur und Klarheit sind tool-unabhängig. Die letzten beiden, Brand-Token-Konsistenz und echte Geschwindigkeit, sind im Baukasten schwerer, weil das Template dich limitiert und der Code nicht optimal performt.",
  },
  {
    q: "Woran erkenne ich, ob meine Webseite austauschbar wirkt?",
    a: "Mach den 5-Sekunden-Test mit jemandem, der dich nicht kennt. Zeig ihm deine Seite und drei Konkurrenten kurz hintereinander, jeweils 5 Sekunden. Frag ihn, welche er sich gemerkt hat und warum. Wenn deine nicht dabei ist, hast du eine Antwort.",
  },
];

const faqSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

const proseBlock =
  "prose prose-lg md:prose-xl prose-stone max-w-none font-satoshi leading-[1.85] text-warm-steel prose-headings:font-instrument prose-headings:text-deep-charcoal prose-strong:text-deep-charcoal prose-a:text-refined-gold prose-a:no-underline hover:prose-a:underline prose-h2:font-instrument prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-20 prose-h2:mb-8 prose-h2:leading-[1.15] prose-h3:font-instrument prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-5 prose-p:mb-6 prose-ul:my-6 prose-li:mb-2 prose-li:leading-[1.7]";

const antiPatterns = [
  { n: 1, t: "Der Template-Hero, den jeder zweite hat", desc: "Links Headline „Dein Weg zu mehr X“, rechts Lifestyle-Foto, darunter Button „Jetzt starten“. Wenn drei Webseiten in deiner Nische identisch aussehen, ist deine Position weg, bevor du etwas gesagt hast.", fix: "Brich das Schema. Eine ungewöhnliche Hero-Komposition sagt mehr über deinen Geschmack als jede Floskel-Headline." },
  { n: 2, t: "Stock-Fotos von glücklichen Frauen am Laptop", desc: "Es gibt keinen schnelleren Vertrauensverlust als ein generisches Stock-Foto. Wer Premium-Position verkauft, muss aussehen wie jemand, der eine hat.", fix: "Lieber drei gute eigene Fotos als zwanzig Stock-Bilder. Höchster ROI-Schritt für die meisten Seiten." },
  { n: 3, t: "„Sichere dir jetzt“-CTAs und Funnel-Pathos", desc: "Funnel-Sprache funktioniert in Low-Ticket-Märkten. In Premium-Märkten zerstört sie Vertrauen, weil sie deine Position auf Augenhöhe mit Telefonverkauf bringt.", fix: "Sag, was passiert, wenn jemand klickt. „Buch ein Gespräch, 30 Minuten, ich frage dir Löcher in den Bauch.“ Konkret, ruhig, ohne Druck." },
  { n: 4, t: "Eine Über-mich-Seite, die wie ein Lebenslauf liest", desc: "„Seit 15 Jahren begleite ich Menschen auf ihrem Weg.“ Diese Seite gibt es zehntausendfach. Lebenslauf zeigt Stationen, Bio zeigt warum jemand dir vertrauen kann.", fix: "Erste Person Singular, eigene Worte, eine Anekdote, die niemand sonst hat. Drei Absätze reichen, wenn sie nach dir klingen." },
  { n: 5, t: "Cookie-Banner-Wand und Tracking-Hölle", desc: "Dreistufiges Banner, 17 Tracking-Skripte, Seite nach 4 Sekunden nicht fertig. Bevor jemand eine Headline gelesen hat, ist die Seite verloren.", fix: "Auf Vercel oder Cloudflare ohne Tracking-Cookies hosten: kein Banner nötig. Was kein Cookie ist, braucht keine Einwilligung." },
];

const premiumSignals = [
  { n: 1, t: "Eine eigene Stimme, schon im Hero", desc: "Wenn ein Satz nur von dir kommen könnte, hast du gewonnen. Die billigste Premium-Investition, weil sie nichts kostet außer Mut, aber auch die schwerste." },
  { n: 2, t: "Konsistente Brand-Tokens, immer dieselben", desc: "Drei bis fünf Farben, eine bis zwei Schriften, wiederkehrende Spacing-Werte, im ganzen Auftritt gleich. Inkonsistenz ist das stille Signal, dass kein System dahintersteht." },
  { n: 3, t: "Echte Geschwindigkeit, nicht ladende Bilder", desc: "Premium lädt mobil unter zwei Sekunden. Du siehst nicht erst Weiß, dann Layout, dann Bilder, sondern alles fast gleichzeitig. Google PageSpeed Mobile 90+." },
  { n: 4, t: "Eigene Fotos, atmosphärisch, ehrlich", desc: "Premium hat zwei oder drei wirklich gute Fotos und lebt davon. Ein Portrait, das nach dir aussieht. Ein Detail deiner Arbeit. Ein Ort, der nach deinem Leben aussieht." },
  { n: 5, t: "Klare ICP-Adressierung statt „für alle“", desc: "„Für ambitionierte Menschen“ ist keine Adressierung. „Für Personal Brands mit eigener Methodik, die einen Auftritt zum Tiefgang ihrer Arbeit suchen“ ist eine. Premium hat den Mut zur Spezifik." },
  { n: 6, t: "Trust-Architektur mit Substanz", desc: "Zwei bis drei echte Case Studies mit Vorher-Nachher in Worten und Zahlen. Lieber wenig und wahr als viel und glatt." },
  { n: 7, t: "Eine einzige klare Aktion pro Seite", desc: "Premium zieht zu einer Sache, nicht zu sieben. Eine Sales-Page hat einen CTA, kein Newsletter-Popup, kein Live-Chat, keine zwei Buttons mit verschiedenen Zielen. Klarheit ist das stillste Premium-Signal." },
];

export default function BlogPremiumOderBaukastenPage() {
  return (
    <main className="flex flex-col w-full bg-pure-surface min-h-screen selection:bg-refined-gold selection:text-white pb-32">
      <Script id="schema-article" type="application/ld+json" strategy="beforeInteractive">{articleSchemaJson}</Script>
      <Script id="schema-faq" type="application/ld+json" strategy="beforeInteractive">{faqSchemaJson}</Script>

      <div className="pt-24 md:pt-32 w-full bg-[#2E2B26]"></div>

      {/* HERO — dark backdrop, cover als atmospheric layer */}
      <section className="relative w-full aspect-square md:aspect-[21/9] max-h-[800px] overflow-hidden bg-[#1a1612]">
        <Image src={`/blog/${slug}/cover.jpg`} alt="Skizze: zwei Webseiten-Wireframes auf Schreibtisch, Premium-Layout links mit Negativraum, überladenes Template-Grid rechts, Gold-Trennlinie in der Mitte" fill className="object-cover opacity-45" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0a] via-[#1a1612]/85 to-[#1a1612]/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0c0a]/85 via-[#1a1612]/35 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full px-6 sm:px-12 md:px-24 pb-16 md:pb-24 max-w-[1400px] mx-auto z-10">
          <ScrollReveal>
            <Link href="/blog" className="inline-flex items-center gap-2 text-pure-surface/70 hover:text-refined-gold transition-colors font-mono text-xs uppercase tracking-widest mb-10">
              <ArrowLeft className="w-4 h-4" /> Zurück zum Journal
            </Link>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-widest mb-6">
              <span className="bg-refined-gold/15 text-refined-gold px-3 py-1 rounded-full border border-refined-gold/40">Premium &amp; Brand</span>
              <span className="text-pure-surface/75">Juni 2026</span>
              <span className="text-pure-surface/50 hidden sm:inline-block">•</span>
              <span className="text-pure-surface/75 hidden sm:inline-block">9 Min Lesezeit</span>
            </div>
            <h1 className="font-instrument text-[clamp(2.5rem,5vw,5rem)] text-pure-surface leading-[1.05] max-w-[1100px] mb-6">
              Premium-Webseite oder Baukasten: <span className="italic text-refined-gold">5 Anti-Patterns und 7 Signale, an denen du den Unterschied siehst.</span>
            </h1>
            <p className="text-pure-surface/80 text-lg md:text-xl font-satoshi max-w-[760px] leading-relaxed">
              Eine Bekannte schickt mir zwei Webseiten nebeneinander: „Sag mir ehrlich, was siehst du?" Hier sind die zwölf Stellen, an denen sich Premium und Baukasten in fünf Sekunden trennen. Mit Beispielen, ohne Agentur-Sprech.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* QUICK ANSWER */}
      <section className="px-6 sm:px-12 md:px-24 pt-16 max-w-[860px] mx-auto w-full">
        <ScrollReveal>
          <div className="bg-warm-light/40 border-l-2 border-refined-gold p-8 md:p-10 rounded-r-lg">
            <p className="font-mono text-xs uppercase tracking-widest text-refined-gold mb-6">Die kurze Antwort vorab</p>
            <p className="font-satoshi text-deep-charcoal text-lg leading-relaxed">
              Premium und Baukasten unterscheiden sich nicht in der Technik, sondern in der <strong>Konsequenz</strong>, mit der jede Entscheidung getroffen wurde. Eigene Farben statt Template-Palette. Eigene Schrift statt Default. Echte Fotos statt Stock. Eigene Stimme statt Coaching-Sprech. Du kannst beides mit jedem Tool bauen, aber Baukasten verführt dich zu Kompromissen, die Premium nicht zulässt.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* WAS MEINT PREMIUM */}
      <section className="px-6 sm:px-12 md:px-24 pt-20 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Was meint <em>Premium</em> hier eigentlich?</h2>
            <p>Premium meint nicht teuer. Premium meint <strong>Substanz, die kongruent ist mit dem, was du verkaufst.</strong> Wenn dein Programm 12.000 Euro kostet, muss deine Webseite das auf den ersten Blick stützen, nicht widerlegen.</p>
            <p>Eine Premium-Webseite tut drei Dinge gleichzeitig: sie zeigt, was du kannst (Beweis). Sie klingt nach dir (Stimme). Sie führt zu der einen Aktion, die wirklich zählt (Klarheit). Eine Baukasten-Webseite kann all das auch, theoretisch. Praktisch verführt sie zu Default-Entscheidungen, die im Einzelnen unsichtbar sind und in Summe deine Position senken.</p>
          </div>
        </ScrollReveal>
      </section>

      {/* 5 ANTI-PATTERNS */}
      <section className="px-6 sm:px-12 md:px-24 pt-24 max-w-[1100px] mx-auto w-full">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="font-mono text-xs uppercase tracking-widest text-refined-gold mb-4">Was billig wirken lässt</p>
            <h2 className="font-instrument text-3xl md:text-5xl text-deep-charcoal leading-[1.1]">5 Anti-Patterns, die deine Webseite <span className="italic text-refined-gold">leise nach unten ziehen.</span></h2>
          </div>
        </ScrollReveal>
        <div className="grid gap-5 md:gap-6 max-w-[860px] mx-auto">
          {antiPatterns.map((p, i) => (
            <ScrollReveal key={p.n} delay={i * 0.05}>
              <div className="bg-warm-light/30 border border-refined-gold/15 rounded-xl p-6 md:p-8 hover:border-refined-gold/40 transition-all">
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="font-instrument text-3xl md:text-4xl text-refined-gold">{String(p.n).padStart(2, "0")}</span>
                  <h3 className="font-instrument text-xl md:text-2xl text-deep-charcoal leading-tight">{p.t}</h3>
                </div>
                <p className="font-satoshi text-warm-steel leading-relaxed mb-4">{p.desc}</p>
                <p className="font-satoshi text-deep-charcoal leading-relaxed border-l-2 border-refined-gold/40 pl-4"><strong className="text-refined-gold">Fix:</strong> {p.fix}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 7 PREMIUM SIGNALE */}
      <section className="px-6 sm:px-12 md:px-24 pt-32 max-w-[1100px] mx-auto w-full">
        <ScrollReveal>
          <div className="bg-deep-charcoal text-pure-surface rounded-[28px] p-8 md:p-14 border border-refined-gold/30 shadow-[0_30px_70px_rgba(184,150,62,0.12)]">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-5 h-5 text-refined-gold" />
              <span className="font-mono text-refined-gold text-xs tracking-[0.22em] uppercase font-bold">Was Premium von austauschbar trennt</span>
            </div>
            <h2 className="font-instrument text-3xl md:text-5xl text-pure-surface leading-tight mb-12">
              7 stille Signale. <span className="italic text-refined-gold">Keines ist Magie, alle sind Handwerk und Haltung.</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 md:gap-10">
              {premiumSignals.map((s) => (
                <div key={s.n} className="flex gap-5">
                  <span className="font-instrument text-3xl md:text-4xl text-refined-gold leading-none flex-shrink-0">{String(s.n).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-instrument text-xl md:text-2xl text-pure-surface leading-tight mb-3">{s.t}</h3>
                    <p className="font-satoshi text-pure-surface/70 leading-relaxed text-base">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* WAS BEDEUTET DAS FUR DICH */}
      <section className="px-6 sm:px-12 md:px-24 pt-24 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Was bedeutet das für dich konkret?</h2>
            <p>Geh auf deine eigene Webseite. Öffne sie auf dem Handy, nicht auf dem Laptop. Stell dir die zwei Fragen, die jeder Besucher stellt, bevor er drei Sekunden bei dir bleibt: <strong>Ist das hier ernst gemeint?</strong> und <strong>Klingt das nach jemandem, dem ich vertrauen kann?</strong></p>
            <p>Wenn eine der beiden Antworten ein Zögern auslöst, ist es nicht das Tool, das du wechseln musst. Es ist die Konsequenz in einer der zwölf Stellen oben. Anti-Pattern raus, Signal rein, immer noch dasselbe Hosting.</p>
            <p>Wer wirklich umsteigen will von Baukasten zu eigenem Code, sollte das aus einem Grund tun: <strong>Eigentum</strong>. Nicht aus Optik, denn Optik kannst du auch im Baukasten retten. Aus Eigentum, weil dein Code dann dir gehört und niemand dich aussperren kann. Das ist eine andere Debatte, die ich <Link href="/blog/was-kostet-ki-webseite">im Kosten-Artikel</Link> durchrechne, inklusive 5-Jahres-Vergleich und Break-Even.</p>
          </div>
        </ScrollReveal>
      </section>

      {/* FAQ */}
      <section className="px-6 sm:px-12 md:px-24 pt-24 max-w-[900px] mx-auto w-full">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-widest text-refined-gold mb-4 text-center">Häufige Fragen</p>
          <h2 className="font-instrument text-3xl md:text-5xl text-deep-charcoal text-center mb-12 leading-[1.1]">Was Leser typischerweise fragen.</h2>
        </ScrollReveal>
        <div className="flex flex-col gap-3">
          {faq.map((f, i) => (
            <ScrollReveal key={i} delay={i * 0.04}>
              <details className="group bg-warm-light/30 border border-refined-gold/15 rounded-xl px-6 py-5 hover:border-refined-gold/40 transition-all duration-300 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <h3 className="font-instrument text-lg md:text-xl text-deep-charcoal pr-6">{f.q}</h3>
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-refined-gold/10 border border-refined-gold/30 flex items-center justify-center text-refined-gold text-xl transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-warm-steel font-satoshi leading-relaxed">{f.a}</p>
              </details>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 mt-24 max-w-[1000px] mx-auto w-full">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#2E2B26] border border-white/10 p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 group shadow-[0_30px_60px_rgba(0,0,0,0.1)]">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-refined-gold/10 pointer-events-none" />
            <div className="flex-1 relative z-10 text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                <Sparkles className="w-5 h-5 text-refined-gold" />
                <span className="text-xs font-mono tracking-widest uppercase text-refined-gold">Der 5-Sekunden-Test für deine Seite</span>
              </div>
              <h3 className="font-instrument text-3xl md:text-4xl text-white mb-6">Lass uns die zwölf Stellen bei dir anschauen.</h3>
              <p className="text-white/60 font-satoshi text-lg leading-relaxed mb-8">
                Schick mir den Link zu deiner Seite. Ich schaue mir das in 20 ruhigen Minuten an und sag dir die zwei oder drei Punkte mit dem höchsten Hebel. Kostenfrei, ohne Pitch. Oder buch direkt ein Gespräch — 30 Minuten, ich frage dir Löcher in den Bauch.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link href="/blog#audit" className="inline-flex items-center justify-center gap-2 bg-refined-gold text-deep-charcoal hover:bg-white px-8 py-4 transition-colors font-medium rounded-full w-full sm:w-auto">
                  Mini-Audit anfragen
                </Link>
                <Link href="/termin-buchen" className="text-white/80 hover:text-white px-6 py-4 transition-colors font-medium border border-white/10 rounded-full hover:bg-white/5 w-full sm:w-auto text-center">
                  Beratungsgespräch buchen
                </Link>
                <Link href="/premium-angebot" className="text-refined-gold/90 hover:text-refined-gold px-6 py-4 transition-colors font-medium text-sm w-full sm:w-auto text-center underline-offset-4 hover:underline">
                  Premium-Angebot ansehen
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
