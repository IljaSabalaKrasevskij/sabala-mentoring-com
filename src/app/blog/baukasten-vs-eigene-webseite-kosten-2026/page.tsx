import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { ArrowLeft, Sparkles, Calculator } from "lucide-react";

const slug = "baukasten-vs-eigene-webseite-kosten-2026";
const url = `https://sabala-mentoring.com/blog/${slug}`;
const datePublished = "2026-05-27";

export const metadata = {
  title: "Baukasten vs. eigene Webseite für Coaches: Die ehrliche 3-Jahres-Rechnung",
  description:
    "Webflow vs. Premium-Webseite. Echte Markt-Preise, 3- und 5-Jahres-Rechnung, Hidden Costs, Break-Even-Punkt. Wann sich Premium für Coaches wirklich lohnt.",
  alternates: { canonical: url },
  openGraph: {
    title: "Baukasten vs. eigene Webseite: Die ehrliche Kosten-Rechnung",
    description: "3- und 5-Jahres-Rechnung mit echten Markt-Preisen für Coaches.",
    type: "article",
    publishedTime: datePublished,
    url,
  },
};

const articleSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Baukasten vs. eigene Webseite für Coaches: Die ehrliche 3-Jahres-Rechnung",
  description: "Echte Markt-Preise, Break-Even-Punkt, wann sich was lohnt.",
  author: { "@type": "Person", name: "Ilja Krasevskij", url: "https://sabala-mentoring.com/ueber-mich" },
  publisher: { "@type": "Organization", name: "Sabala Mentoring" },
  datePublished,
  dateModified: datePublished,
  mainEntityOfPage: { "@type": "WebPage", "@id": url },
});

const faq = [
  {
    q: "Lohnt sich Baukasten unter welchem Umsatz?",
    a: "Realistisch: wenn du als Coach unter 30.000 Euro Jahresumsatz liegst und am Anfang stehst, ist Baukasten ein sinnvoller Einstieg. Über 50.000 Euro Jahresumsatz wird Baukasten zur Bremse. Über 100.000 Euro Jahresumsatz ist Baukasten oft direkt schädlich, weil Premium-Position und Baukasten-Optik nicht zusammenpassen.",
  },
  {
    q: "Was ist ein realistisches Premium-Webseiten-Budget?",
    a: "In Deutschland für Coaching-Nische: 6.000-20.000 Euro für Initial-Erstellung plus 50-200 Euro pro Monat Pflege. Sabala-Lite startet bei 8.000 Euro, Sabala-OnePager (Premium-Einseiter) bei 2.490 Euro (Reference-Edition) oder 4.900 Euro regulär.",
  },
  {
    q: "Kann ich eine Premium-Webseite günstiger bekommen?",
    a: "Ja. Mit DIY-Ansatz und AI-Coding-Tools (Antigravity, Claude Code, Cursor) kannst du selbst eine Premium-Webseite bauen. Tool-Kosten: ~50 Euro pro Monat. Aber: Brand-Strategie, Voice, Customer-Journey, Foto-Direction musst du dann selbst lösen oder einkaufen. Wenn du die Brand-Klarheit schon hast, ist DIY möglich.",
  },
  {
    q: "Was kostet die Pflege langfristig?",
    a: "Bei Sabala nach den initialen 12 Monaten: 49 Euro pro Monat Mini, 69 Euro pro Monat Plus (mit Monatsbericht), 149 Euro pro Monat Premium (mit Strategie-Call). Bei Baukasten: vergleichbar oder höher, je nach Anbieter.",
  },
  {
    q: "Wie schnell amortisiert sich der Mehrpreis?",
    a: "Realistisch bei einem Coach mit 1.000-2.000 Euro Tagessatz: 2-4 zusätzliche Klienten pro Jahr durch besseren Auftritt = 4.000-16.000 Euro Mehrumsatz. Amortisation typischerweise innerhalb Jahr 1.",
  },
];

const faqSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

const proseBlock =
  "prose prose-lg md:prose-xl prose-stone max-w-none font-satoshi leading-[1.85] text-warm-steel prose-headings:font-instrument prose-headings:text-deep-charcoal prose-strong:text-deep-charcoal prose-a:text-refined-gold prose-a:no-underline hover:prose-a:underline prose-h2:font-instrument prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-20 prose-h2:mb-8 prose-h2:leading-[1.15] prose-h3:font-instrument prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-5 prose-p:mb-6 prose-ul:my-6 prose-li:mb-2 prose-li:leading-[1.7]";

export default function BlogBaukastenVsEigenePage() {
  return (
    <main className="flex flex-col w-full bg-pure-surface min-h-screen selection:bg-refined-gold selection:text-white pb-32">
      <Script id="schema-article" type="application/ld+json" strategy="beforeInteractive">{articleSchemaJson}</Script>
      <Script id="schema-faq" type="application/ld+json" strategy="beforeInteractive">{faqSchemaJson}</Script>

      <div className="pt-24 md:pt-32 w-full bg-[#2E2B26]"></div>

      {/* HERO — Sketch-Cover */}
      <section className="relative w-full aspect-square md:aspect-[21/9] max-h-[800px] overflow-hidden bg-[#2E2B26]">
        <Image src="/blog/baukasten-vs-eigene-webseite-kosten-2026/cover.jpg" alt="Skizze: Goldwaage mit Münzen und Krone als Symbol für Kostenvergleich Baukasten vs eigene Webseite" fill className="object-cover opacity-90" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-pure-surface via-pure-surface/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-pure-surface/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full px-6 sm:px-12 md:px-24 pb-16 md:pb-24 max-w-[1400px] mx-auto z-10">
          <ScrollReveal>
            <Link href="/blog" className="inline-flex items-center gap-2 text-warm-steel hover:text-refined-gold transition-colors font-mono text-xs uppercase tracking-widest mb-10">
              <ArrowLeft className="w-4 h-4" /> Zurück zum Journal
            </Link>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-widest text-refined-gold mb-6">
              <span className="bg-refined-gold/10 px-3 py-1 rounded-full border border-refined-gold/30">Pricing &amp; ROI</span>
              <span className="text-deep-charcoal/80">Mai 2026</span>
              <span className="text-deep-charcoal/80 hidden sm:inline-block">•</span>
              <span className="text-deep-charcoal/80 hidden sm:inline-block">7 Min Lesezeit</span>
            </div>
            <h1 className="font-instrument text-[clamp(2.5rem,5vw,5rem)] text-deep-charcoal leading-[1.05] max-w-[1100px] mb-6">
              Baukasten vs. eigene Webseite für Coaches: <span className="italic text-refined-gold">Die ehrliche 3-Jahres-Rechnung.</span>
            </h1>
            <p className="text-warm-steel text-lg md:text-xl font-satoshi max-w-[760px] leading-relaxed">
              Ein Coach fragt mich: was wäre meine echte Ersparnis, wenn ich von Webflow auf Premium-Webseite wechsele? Hier ist die Rechnung, inklusive Lock-in-Kosten und Hidden Costs. Ohne Marketing-Schönfärberei.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-6 sm:px-12 md:px-24 pt-16 max-w-[860px] mx-auto w-full">
        <ScrollReveal>
          <div className="bg-warm-light/40 border-l-2 border-refined-gold p-8 md:p-10 rounded-r-lg">
            <p className="font-mono text-xs uppercase tracking-widest text-refined-gold mb-6">Quick Answer in 3 Sätzen</p>
            <p className="font-satoshi text-deep-charcoal text-lg leading-relaxed">
              Eine Baukasten-Webseite (Webflow, Squarespace, Wix) kostet über 3 Jahre realistisch 1.500-3.500 Euro inklusive Hosting, Pflege und Lock-in-Kosten. Eine Premium-Webseite mit eigenem Code (Next.js, Vercel, GitHub) kostet einmalig 8.000-15.000 Euro inklusive 12 Monate Pflege, danach 49-149 Euro pro Monat. Break-Even-Punkt liegt typischerweise bei Jahr 4-5, danach ist die eigene Webseite langfristig 60-80 Prozent günstiger UND du hast keinen Lock-in.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <section className="px-6 sm:px-12 md:px-24 pt-20 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Die Baukasten-Rechnung (Webflow als Beispiel)</h2>
            <p><strong>Webflow CMS Plan 2026</strong>: 27 Euro pro Monat (zuvor 16 Euro 2022, jährliche Preiserhöhungen).</p>
            <ul>
              <li>Jährlich: 324 Euro</li>
              <li>Über 3 Jahre: <strong>972 Euro</strong></li>
            </ul>
            <p>Dazu typischerweise:</p>
            <ul>
              <li>Custom Code Erweiterungen: 5-20 Euro pro Monat = 180-720 Euro / 3 Jahre</li>
              <li>Plugin/Integration-Kosten: 100-300 Euro pro Jahr = 300-900 Euro / 3 Jahre</li>
              <li>Stock-Fotos / Bilder-Lizenzen: 100-500 Euro einmalig</li>
              <li>Erstellung (DIY oder Freelancer): 0-2.500 Euro</li>
            </ul>
            <p><strong>Realistische 3-Jahres-Summe Baukasten: 1.500-3.500 Euro</strong></p>

            <h2>Die Premium-Rechnung (Sabala-Lite als Beispiel)</h2>
            <p><strong>Lite-Paket</strong>: 8.000 Euro einmalig (inklusive Brand-Audit, Identity Sessions, 5-Seiten Premium-Webseite, 3 Blog-Artikel, 6 Monate Pflege Mini).</p>
            <p>Nach 6 Monaten Pflege optional:</p>
            <ul>
              <li>Mini-Pflege: 49 Euro pro Monat = 1.176 Euro / 2 Jahre</li>
              <li>Plus-Pflege: 69 Euro pro Monat = 1.656 Euro / 2 Jahre</li>
              <li>Premium-Pflege: 149 Euro pro Monat = 3.576 Euro / 2 Jahre</li>
            </ul>
            <p><strong>Realistische 3-Jahres-Summe Premium</strong>:</p>
            <ul>
              <li>Mit Mini-Pflege: 8.000 + 1.176 + 360 (Hosting) = <strong>9.536 Euro</strong></li>
              <li>Mit Plus-Pflege: 8.000 + 1.656 + 360 = <strong>10.016 Euro</strong></li>
              <li>Mit Premium-Pflege: 8.000 + 3.576 + 360 = <strong>11.936 Euro</strong></li>
            </ul>

            <h2>Auf den ersten Blick: Baukasten ist günstiger</h2>
            <p>Ja, in den ersten 3 Jahren. Aber das ist nicht die ganze Wahrheit.</p>

            <h3>Was die Baukasten-Rechnung verschleiert</h3>
            <ul>
              <li><strong>Kein Lock-in-Schutz</strong>: wenn Webflow Preise verdoppelt (was 2024 passierte), zahlst du oder migrierst aufwendig. Die <Link href="/blog/webdesigner-verschwunden-code-eigentum">Lock-in-Falle im Detail</Link> habe ich auseinandergenommen.</li>
              <li><strong>Migration nach Jahr 3-5</strong>: realistisch wechseln Coaches alle 3-5 Jahre den Anbieter. Migration kostet 1.500-4.000 Euro plus Inhalt-Verlust.</li>
              <li><strong>Premium-Look-Limit</strong>: Baukasten-Webseiten sehen aus wie Baukasten-Webseiten. Bei 12k-Programmen wird die Inkonsistenz teuer in entgangenen Verkaeufen.</li>
              <li><strong>Cookie-Banner-Pflicht</strong>: alle grossen Baukasten setzen Tracking-Cookies, du musst Banner einbauen, verlierst Conversion. Mehr dazu in <Link href="/blog/dsgvo-cookie-banner-reform-2026">DSGVO-Reform 2026 + cookie-frei</Link>.</li>
              <li><strong>SEO-Limit</strong>: Baukasten-Code ist nicht performance-optimiert. Du rankst schlechter, weniger organische Besucher.</li>
            </ul>

            <h3>Was die Premium-Rechnung verschleiert</h3>
            <ul>
              <li><strong>Höhere Initial-Investition</strong>: 8.000 Euro auf einen Schlag ist Cash-Flow-Stress.</li>
              <li><strong>Lernkurve für Self-Pflege</strong>: wenn du Claude Code lernst, dauert das 1-2 Stunden.</li>
              <li><strong>Abhängigkeit vom Partner in Setup-Phase</strong>: durch Code-Eigentum reduziert, aber initial gegeben.</li>
            </ul>
          </div>
        </ScrollReveal>
      </section>

      <section className="px-6 sm:px-12 md:px-24 pt-16 max-w-[1100px] mx-auto w-full">
        <ScrollReveal>
          <div className="bg-deep-charcoal text-pure-surface rounded-[28px] p-8 md:p-12 border border-refined-gold/30 shadow-[0_30px_70px_rgba(184,150,62,0.12)]">
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="w-5 h-5 text-refined-gold" />
              <span className="font-mono text-refined-gold text-xs tracking-[0.22em] uppercase font-bold">Die ehrliche 5-Jahres-Rechnung</span>
            </div>
            <h2 className="font-instrument text-2xl md:text-4xl text-pure-surface leading-tight mb-8">
              Jahr 4-5 macht <span className="italic text-refined-gold">den Unterschied.</span>
            </h2>

            <div className="overflow-x-auto -mx-2">
              <table className="w-full font-satoshi text-pure-surface/85 text-sm md:text-base">
                <thead>
                  <tr className="border-b border-refined-gold/30">
                    <th className="text-left py-3 pr-4 font-mono text-[0.7rem] uppercase tracking-widest text-refined-gold/80">Position</th>
                    <th className="text-right py-3 px-4 font-mono text-[0.7rem] uppercase tracking-widest text-refined-gold/80">Baukasten 5J</th>
                    <th className="text-right py-3 pl-4 font-mono text-[0.7rem] uppercase tracking-widest text-refined-gold/80">Premium 5J</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-pure-surface/10"><td className="py-3 pr-4">Initial / Lizenzen</td><td className="text-right py-3 px-4 font-mono">2.500–4.500 €</td><td className="text-right py-3 pl-4 font-mono">8.000 €</td></tr>
                  <tr className="border-b border-pure-surface/10"><td className="py-3 pr-4">Pflege Jahre 2-5</td><td className="text-right py-3 px-4 font-mono">inklusive</td><td className="text-right py-3 pl-4 font-mono">2.352–3.312 €</td></tr>
                  <tr className="border-b border-pure-surface/10"><td className="py-3 pr-4">Hosting</td><td className="text-right py-3 px-4 font-mono">inklusive</td><td className="text-right py-3 pl-4 font-mono">600 €</td></tr>
                  <tr className="border-b border-pure-surface/10"><td className="py-3 pr-4">Migration (typisch Jahr 4)</td><td className="text-right py-3 px-4 font-mono">1.500–3.500 €</td><td className="text-right py-3 pl-4 font-mono">0 €</td></tr>
                  <tr className="border-b border-refined-gold/30"><td className="py-3 pr-4">Brand-Anpassung (Jahr 3)</td><td className="text-right py-3 px-4 font-mono">1.000–2.500 €</td><td className="text-right py-3 pl-4 font-mono">0 €</td></tr>
                  <tr><td className="py-4 pr-4 font-instrument text-lg text-pure-surface">Total 5 Jahre</td><td className="text-right py-4 px-4 font-instrument text-lg text-pure-surface">5.000–10.500 €</td><td className="text-right py-4 pl-4 font-instrument text-lg text-refined-gold">10.952–11.912 €</td></tr>
                </tbody>
              </table>
            </div>

            <p className="font-satoshi text-pure-surface/70 text-sm md:text-base leading-relaxed mt-8">
              Über 5 Jahre kostet Premium 2.000-6.000 Euro mehr. Liefert aber 5-10x mehr Substanz, ROI und Differenzierung. Pro 1.000 Euro Mehrkosten realistisch 8-30k Mehrumsatz durch Premium-Position.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <section className="px-6 sm:px-12 md:px-24 pt-20 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Wann lohnt sich was?</h2>

            <h3>Baukasten ist sinnvoll, wenn:</h3>
            <ul>
              <li>Du bist Hobbyist oder Side-Hustler ohne ernsthaftes Geschäftsmodell</li>
              <li>Dein Coaching-Tagessatz liegt unter 200 Euro</li>
              <li>Du hast weniger als 5 Klienten pro Quartal als Ziel</li>
              <li>Du bist in der DIY-Phase und willst erst mal etwas live haben</li>
              <li>Du hast keinen Wert auf Premium-Differenzierung</li>
            </ul>

            <h3>Premium ist sinnvoll, wenn:</h3>
            <ul>
              <li>Du verkaufst Programme über 5.000 Euro</li>
              <li>Du willst Premium-Position aufbauen</li>
              <li>Du brauchst SEO + GEO-Sichtbarkeit langfristig</li>
              <li>Du willst Code-Eigentum und Lock-in-Freiheit</li>
              <li>Du hast langfristig (5+ Jahre) den Anspruch, sichtbar in deiner Nische zu sein</li>
              <li>Du willst Brand-Konsistenz auf höchstem Niveau</li>
            </ul>

            <h2>Die unsichtbare Rechnung: Premium-Position</h2>
            <p>Was Markt-Vergleiche oft übersehen: deine Webseite ist nicht nur eine technische Lösung, sie ist dein wichtigstes Verkaufs-Werkzeug. Realität 2026:</p>
            <ul>
              <li><strong>80 Prozent der hochbezahlten Coaches</strong> haben eine Premium-Webseite</li>
              <li><strong>Premium-Webseite + Premium-Pricing</strong> macht psychologisch Sinn: Kongruenz schafft Vertrauen</li>
              <li><strong>Baukasten-Webseite + 12k-Programm</strong> ist Inkongruenz, die ein potenzieller Kunde unbewusst registriert</li>
            </ul>
            <p>Wenn dein Coaching-Tagessatz bei 1.500 Euro liegt, aber deine Webseite wie 19-Euro-Squarespace aussieht: jeder Kunde fragt sich „warum kostet ihr Programm 12k“. Das musst du dann am Telefon erklaeren statt es vorher zu zeigen. Wie eine cookie-freie Premium-Webseite gebaut wird, die mit echtem <Link href="/blog/webseite-mit-ki-bauen-2026">AI-Coding-Stack</Link> entsteht, habe ich in einem eigenen Artikel beschrieben.</p>
          </div>
        </ScrollReveal>
      </section>

      <section className="px-6 sm:px-12 md:px-24 pt-24 max-w-[900px] mx-auto w-full">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-widest text-refined-gold mb-4 text-center">Häufige Fragen</p>
          <h2 className="font-instrument text-3xl md:text-5xl text-deep-charcoal text-center mb-12 leading-[1.1]">Was Coaches typischerweise fragen.</h2>
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

      <section className="px-6 md:px-12 mt-24 max-w-[1000px] mx-auto w-full">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#2E2B26] border border-white/10 p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 group shadow-[0_30px_60px_rgba(0,0,0,0.1)]">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-refined-gold/10 pointer-events-none" />
            <div className="flex-1 relative z-10 text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                <Sparkles className="w-5 h-5 text-refined-gold" />
                <span className="text-xs font-mono tracking-widest uppercase text-refined-gold">Die Rechnung für deinen Fall</span>
              </div>
              <h3 className="font-instrument text-3xl md:text-4xl text-white mb-6">Lass uns deine Zahlen anschauen.</h3>
              <p className="text-white/60 font-satoshi text-lg leading-relaxed mb-8">
                Wenn du wissen willst, was eine Premium-Loesung fuer DICH konkret bedeutet (basierend auf deinem Tagessatz, deiner Zielgruppe, deinem Zeithorizont), buch ein 30-Min-Beratungsgespraech. Fuer einen schlanken Einstieg mit klarem Festpreis: Sabala-OnePager 2.490 Euro (Reference) oder 4.900 Euro regulaer.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link href="/special-launch-angebot" className="inline-flex items-center justify-center gap-2 bg-refined-gold text-deep-charcoal hover:bg-white px-8 py-4 transition-colors font-medium rounded-full w-full sm:w-auto">
                  OnePager-Einstieg ansehen
                </Link>
                <Link href="/termin-buchen" className="text-white/80 hover:text-white px-6 py-4 transition-colors font-medium border border-white/10 rounded-full hover:bg-white/5 w-full sm:w-auto text-center">
                  Beratungsgespräch buchen
                </Link>
                <Link href="/blog#audit" className="text-refined-gold/90 hover:text-refined-gold px-6 py-4 transition-colors font-medium text-sm w-full sm:w-auto text-center underline-offset-4 hover:underline">
                  Mini-Audit anfragen
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
