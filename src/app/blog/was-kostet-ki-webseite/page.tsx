import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import { BlogSpokes } from "@/components/blog/BlogSpokes";
import { dropCapClass, PullQuote } from "@/components/blog/BlogProse";
import SabalaLogo from "@/components/brand/SabalaLogo";
import Script from "next/script";
import { ArrowLeft, Sparkles, Calculator } from "lucide-react";

const slug = "was-kostet-ki-webseite";
const url = `https://sabala-mentoring.com/blog/${slug}`;
const datePublished = "2026-06-16";

export const metadata = {
  title: "Was eine KI-Webseite wirklich kostet: die ehrliche 5-Jahres-Rechnung",
  description:
    "Baukasten 1.500-3.500 Euro über 3 Jahre. Eigene Webseite 8.000-15.000 Euro einmalig. Wo der Break-Even liegt, welche Kosten beide verschleiern, und welche Frage am Ende mehr zählt als der Preis.",
  alternates: { canonical: url },
  openGraph: {
    title: "Was eine KI-Webseite wirklich kostet: die ehrliche 5-Jahres-Rechnung",
    description: "Echte Zahlen, Hidden Costs, Break-Even-Punkt. Ohne Agentur-Sprech.",
    type: "article",
    publishedTime: datePublished,
    url,
    images: [{ url: `${url}/cover.jpg`, width: 1200, height: 630, alt: "Skizze: aufgeschlagenes Vergleichs-Notizbuch mit Goldmünzen unter warmem Lampenlicht" }],
  },
};

const articleSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Was eine KI-Webseite wirklich kostet: die ehrliche 5-Jahres-Rechnung",
  description: "Realistische Markt-Preise, Break-Even, wann sich was lohnt.",
  author: { "@type": "Person", name: "Ilja Krasevskij", url: "https://sabala-mentoring.com/ueber-mich" },
  publisher: { "@type": "Organization", name: "Sabala Mentoring" },
  datePublished,
  dateModified: datePublished,
  mainEntityOfPage: { "@type": "WebPage", "@id": url },
  image: `${url}/cover.jpg`,
});

const faq = [
  {
    q: "Ab welchem Umsatz lohnt sich eine eigene Webseite?",
    a: "Grob: unter 30.000 Euro Jahresumsatz ist ein Baukasten ein sinnvoller Einstieg. Über 50.000 Euro wird er zur Bremse. Über 100.000 Euro wird er oft direkt schädlich, weil Premium-Position und Baukasten-Optik nicht zusammenpassen.",
  },
  {
    q: "Kann ich eine eigene Webseite günstiger bekommen?",
    a: "Ja. Mit KI-Coding-Tools wie Claude Code oder Cursor kannst du sie selbst bauen, Tool-Kosten ~50 Euro im Monat. Brand-Strategie, Voice, Customer-Journey und Bild-Direction musst du dann selbst lösen oder einkaufen. Wenn du die Klarheit schon hast, ist DIY möglich.",
  },
  {
    q: "Wie schnell amortisiert sich der Mehrpreis?",
    a: "Bei einem Tagessatz von 1.000-2.000 Euro reichen zwei bis vier zusätzliche Kunden im Jahr durch den besseren Auftritt. Amortisation typischerweise innerhalb des ersten Jahres.",
  },
];

const faqSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

const proseBlock =
  "prose prose-lg md:prose-xl prose-stone max-w-none font-satoshi leading-[1.85] text-warm-steel prose-headings:font-instrument prose-headings:text-deep-charcoal prose-strong:text-deep-charcoal prose-a:text-refined-gold prose-a:no-underline hover:prose-a:underline prose-h2:font-instrument prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-20 prose-h2:mb-8 prose-h2:leading-[1.15] prose-h3:font-instrument prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-5 prose-p:mb-6 prose-ul:my-6 prose-li:mb-2 prose-li:leading-[1.7]";

export default function BlogWasKostetKiWebseitePage() {
  return (
    <main className="flex flex-col w-full bg-pure-surface min-h-screen selection:bg-refined-gold selection:text-white pb-32">
      <Script id="schema-article" type="application/ld+json" strategy="beforeInteractive">{articleSchemaJson}</Script>
      <Script id="schema-faq" type="application/ld+json" strategy="beforeInteractive">{faqSchemaJson}</Script>

      <div className="pt-24 md:pt-32 w-full bg-[#2E2B26]"></div>

      {/* HERO — dark backdrop, cover als atmospheric layer */}
      <section className="relative w-full aspect-square md:aspect-[21/9] max-h-[800px] overflow-hidden bg-[#1a1612]">
        <Image src={`/blog/${slug}/cover.jpg`} alt="Skizze: aufgeschlagenes Vergleichs-Notizbuch mit Goldmünzen unter warmem Lampenlicht" fill className="object-cover opacity-45" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0a] via-[#1a1612]/85 to-[#1a1612]/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0c0a]/85 via-[#1a1612]/35 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full px-6 sm:px-12 md:px-24 pb-16 md:pb-24 max-w-[1400px] mx-auto z-10">
          <ScrollReveal>
            <Link href="/" aria-label="Sabala Mentoring · Startseite" className="inline-block mb-8 transition-opacity hover:opacity-80">
              <SabalaLogo light size={64} />
            </Link>
            <Link href="/blog" className="inline-flex items-center gap-2 text-pure-surface/70 hover:text-refined-gold transition-colors font-mono text-xs uppercase tracking-widest mb-10">
              <ArrowLeft className="w-4 h-4" /> Zurück zum Journal
            </Link>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-widest mb-6">
              <span className="bg-refined-gold/15 text-refined-gold px-3 py-1 rounded-full border border-refined-gold/40">Pricing &amp; ROI</span>
              <span className="text-pure-surface/75">Juni 2026</span>
              <span className="text-pure-surface/50 hidden sm:inline-block">•</span>
              <span className="text-pure-surface/75 hidden sm:inline-block">6 Min Lesezeit</span>
            </div>
            <h1 className="font-instrument text-[clamp(2.5rem,5vw,5rem)] text-pure-surface leading-[1.05] max-w-[1100px] mb-6">
              Was eine KI-Webseite wirklich kostet: <span className="italic text-refined-gold">die ehrliche 5-Jahres-Rechnung.</span>
            </h1>
            <p className="text-pure-surface/80 text-lg md:text-xl font-satoshi max-w-[760px] leading-relaxed">
              Eine Gründerin fragt mich: was wäre meine echte Ersparnis, wenn ich von 35 Euro Webflow auf Premium wechsele? Ich habe eine Stunde gerechnet. Hier sind die Zahlen, mit Lock-in und Hidden Costs, ohne Marketing-Schönfärberei.
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
              Baukasten ist in den ersten drei Jahren günstiger. Ab Jahr vier dreht sich das, weil Preiserhöhungen, Migration und der fehlende Premium-Look ins Geld gehen. Eine eigene Webseite kostet mehr Cash am Anfang, ist langfristig günstiger und gehört dir. Welche Option richtig ist, hängt nicht am Preis, sondern an einer Frage: <strong>verkaufst du etwas, bei dem dein Auftritt Teil des Versprechens ist?</strong>
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* DEFINITION + BEGRIFFSKLAERUNG */}
      <section className="px-6 sm:px-12 md:px-24 pt-20 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Was meint <em>KI-Webseite</em>?</h2>
            <p className={dropCapClass}>Vorweg eine Klarstellung. KI-Webseite meint <strong>keine Seite, die magisch von allein entsteht.</strong> Gemeint ist eine Seite mit eigenem Code (Next.js, Vercel, GitHub), die du mit KI-Werkzeugen wie Claude Code selbst pflegen und erweitern kannst, statt monatlich an einen Baukasten zu zahlen, dem die Seite gehört.</p>
            <p>Der Unterschied ist nicht „mit oder ohne KI". Der Unterschied ist <strong>Eigentum</strong>.</p>

            <h2>Was beide Optionen wirklich kosten</h2>
            <p><strong>Baukasten (Webflow als Beispiel):</strong> 27 Euro im Monat plus Erweiterungen, Plugins, Lizenzen, Bilder. Realistisch über 3 Jahre: <strong>1.500 bis 3.500 Euro</strong>. Squarespace und Wix ähnlich, günstiger im Grundpreis, teurer in den Add-ons.</p>
            <p><strong>Eigene Webseite (Sabala-Lite als Beispiel):</strong> 8.000 Euro einmalig, inklusive Brand-Audit, fünf Premium-Seiten, drei Blog-Artikel, sechs Monate Pflege. Danach Hosting plus 49 bis 149 Euro Pflege im Monat. Realistisch über 3 Jahre: <strong>9.500 bis 11.900 Euro</strong>.</p>
            <p>Auf den ersten Blick ist Baukasten günstiger. Aber das ist nicht die ganze Wahrheit.</p>
          </div>
        </ScrollReveal>
      </section>

      {/* Visueller Anker: Waage */}
      <section className="px-6 sm:px-12 md:px-24 pt-12 max-w-[1100px] mx-auto w-full">
        <ScrollReveal>
          <div className="aspect-[16/9] relative rounded-2xl overflow-hidden border border-refined-gold/15">
            <Image src={`/blog/${slug}/scale.jpg`} alt="Skizze: eine Waage wiegt zwei Münzstapel gegeneinander, Baukasten gegen eigene Webseite über die Jahre" fill className="object-cover" />
          </div>
        </ScrollReveal>
      </section>

      {/* HIDDEN COSTS — KOMPAKT */}
      <section className="px-6 sm:px-12 md:px-24 pt-12 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h3>Was die Baukasten-Rechnung verschleiert</h3>
            <ul>
              <li><strong>Kein Lock-in-Schutz:</strong> wenn Webflow die Preise verdoppelt, was 2024 schon passierte, zahlst du oder migrierst aufwendig.</li>
              <li><strong>Migration alle 3 bis 5 Jahre:</strong> realistische Wechselrate, kostet 1.500 bis 4.000 Euro plus verlorene Inhalte.</li>
              <li><strong>Premium-Look-Limit:</strong> Baukasten-Seiten sehen aus wie Baukasten-Seiten. Wer 12.000-Euro-Programme verkauft, zahlt diese Inkongruenz in entgangenen Anfragen.</li>
              <li><strong>SEO-Grenze:</strong> Baukasten-Code rankt selten oben. Weniger organische Besucher, langfristig weniger ROI.</li>
            </ul>
            <h3>Was die Premium-Rechnung verschleiert</h3>
            <ul>
              <li><strong>Höhere Anfangsinvestition:</strong> 8.000 Euro auf einen Schlag sind für viele ein echtes Cash-Flow-Thema.</li>
              <li><strong>Lernkurve:</strong> wenn du selbst pflegen willst, kostet dich der Einstieg in Claude Code ein bis zwei Stunden.</li>
            </ul>
          </div>
        </ScrollReveal>
      </section>

      {/* HIGHLIGHT TABELLE */}
      <section className="px-6 sm:px-12 md:px-24 pt-20 max-w-[1100px] mx-auto w-full">
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
                    <th className="text-right py-3 pl-4 font-mono text-[0.7rem] uppercase tracking-widest text-refined-gold/80">Eigene Seite 5J</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-pure-surface/10"><td className="py-3 pr-4">Initial / Lizenzen</td><td className="text-right py-3 px-4 font-mono">2.500–4.500 €</td><td className="text-right py-3 pl-4 font-mono">8.000 €</td></tr>
                  <tr className="border-b border-pure-surface/10"><td className="py-3 pr-4">Pflege Jahre 2-5</td><td className="text-right py-3 px-4 font-mono">inklusive</td><td className="text-right py-3 pl-4 font-mono">2.350–3.300 €</td></tr>
                  <tr className="border-b border-pure-surface/10"><td className="py-3 pr-4">Hosting</td><td className="text-right py-3 px-4 font-mono">inklusive</td><td className="text-right py-3 pl-4 font-mono">600 €</td></tr>
                  <tr className="border-b border-pure-surface/10"><td className="py-3 pr-4">Migration (Jahr 4)</td><td className="text-right py-3 px-4 font-mono">1.500–3.500 €</td><td className="text-right py-3 pl-4 font-mono">0 €</td></tr>
                  <tr className="border-b border-refined-gold/30"><td className="py-3 pr-4">Brand-Anpassung (Jahr 3)</td><td className="text-right py-3 px-4 font-mono">1.000–2.500 €</td><td className="text-right py-3 pl-4 font-mono">0 €</td></tr>
                  <tr><td className="py-4 pr-4 font-instrument text-lg text-pure-surface">Total 5 Jahre</td><td className="text-right py-4 px-4 font-instrument text-lg text-pure-surface">5.000–10.500 €</td><td className="text-right py-4 pl-4 font-instrument text-lg text-refined-gold">11.000–11.900 €</td></tr>
                </tbody>
              </table>
            </div>
            <p className="font-satoshi text-pure-surface/70 text-sm md:text-base leading-relaxed mt-8">
              Über 5 Jahre kostet die eigene Lösung 2.000-6.000 Euro mehr. Was die Tabelle nicht zeigt: eine eigene Premium-Webseite bringt bei meinen Kunden typischerweise drei bis zehn Mal mehr Anfragen pro Monat. Zwei zusätzliche Kunden im Quartal sind, je nach Preis, schnell 8.000 bis 32.000 Euro mehr Jahresumsatz.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <PullQuote>Rechne nicht nur, was die Webseite kostet. Rechne, was dich eine Webseite kostet, die unter deinem Niveau verkauft.</PullQuote>

      {/* WANN LOHNT SICH WAS */}
      <section className="px-6 sm:px-12 md:px-24 pt-24 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Wann lohnt sich was?</h2>
            <p>Ich verkaufe keine Premium-Webseiten an Menschen, die noch keine brauchen. Hier die ehrliche Grenze.</p>
            <h3>Baukasten ist sinnvoll, wenn:</h3>
            <ul>
              <li>du am Anfang stehst und erst mal etwas live haben willst</li>
              <li>dein Angebot unter 200 Euro pro Einheit liegt</li>
              <li>dein Auftritt kein Teil deines Verkaufsversprechens ist</li>
            </ul>
            <h3>Eine eigene Webseite ist sinnvoll, wenn:</h3>
            <ul>
              <li>du Angebote über 5.000 Euro verkaufst</li>
              <li>du eine Position aufbauen willst, nicht nur teilnehmen</li>
              <li>du langfristig in Google und in KI-Suchsystemen sichtbar sein willst</li>
              <li>du Code-Eigentum und Unabhängigkeit willst</li>
            </ul>

            <h2>Die unsichtbare Rechnung</h2>
            <p>Das übersehen die meisten Vergleiche. Deine Webseite ist nicht nur eine technische Lösung. Sie ist dein wichtigstes Verkaufswerkzeug.</p>
            <p>Wenn dein Tagessatz bei 1.500 Euro liegt, deine Webseite aber wie ein 19-Euro-Template aussieht, fragt sich jeder Interessent unbewusst: warum kostet das Programm so viel? Diese Frage musst du dann am Telefon beantworten, statt sie vorher mit deinem Auftritt schon beantwortet zu haben.</p>
            <p><strong>Rechne nicht nur, was die Webseite kostet. Rechne, was dich eine Webseite kostet, die unter deinem Niveau verkauft.</strong> Wo genau das visuell anfängt, habe ich in den <Link href="/blog/premium-webseite-oder-baukasten">5 Anti-Patterns und 7 Premium-Signalen</Link> auseinandergenommen.</p>
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
                <span className="text-xs font-mono tracking-widest uppercase text-refined-gold">Die Rechnung für deinen Fall</span>
              </div>
              <h3 className="font-instrument text-3xl md:text-4xl text-white mb-6">Lass uns deine Zahlen anschauen.</h3>
              <p className="text-white/60 font-satoshi text-lg leading-relaxed mb-8">
                Wenn du wissen willst, was eine eigene Webseite für dich konkret bedeutet, auf Basis deines Preises und Zeithorizonts, buch ein 30-Min-Gespräch. Ich rechne dir die Zahlen vor, du entscheidest.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link href="/termin-buchen" className="inline-flex items-center justify-center gap-2 bg-refined-gold text-deep-charcoal hover:bg-white px-8 py-4 transition-colors font-medium rounded-full w-full sm:w-auto">
                  Beratungsgespräch buchen
                </Link>
                <Link href="/webseiten" className="text-white/80 hover:text-white px-6 py-4 transition-colors font-medium border border-white/10 rounded-full hover:bg-white/5 w-full sm:w-auto text-center">
                  Premium-Angebot ansehen
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
      <BlogSpokes slugs={["baukasten-vs-eigene-webseite-kosten-2026", "premium-webseite-oder-baukasten", "webseite-mit-ki-bauen-2026"]} />
    </main>
  );
}
