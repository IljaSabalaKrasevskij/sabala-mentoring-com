import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { ArrowLeft, Sparkles, Code, Layers, Cpu, Lock } from "lucide-react";

const slug = "webseite-mit-ki-bauen-2026";
const url = `https://sabala-mentoring.com/blog/${slug}`;
const datePublished = "2026-05-27";

export const metadata = {
  title: "Webseite mit KI bauen 2026: Der Premium-Stack jenseits Baukasten",
  description:
    "Antigravity, Spline, Claude Code, Vercel. Der echte Pro-Tool-Stack für Coaches, die Premium mit KI bauen wollen, statt im Jimdo-Look zu landen. Mit echten Beispielen.",
  alternates: { canonical: url },
  openGraph: {
    title: "Webseite mit KI bauen 2026: Der Premium-Stack, den niemand zeigt",
    description: "Der echte Pro-Tool-Stack jenseits Jimdo und IONOS. Mit echten Beispielen aus Sabala-Mentoring.",
    type: "article",
    publishedTime: datePublished,
    url,
  },
};

const articleSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Webseite mit KI bauen 2026: Der Premium-Stack, den niemand zeigt",
  description:
    "Antigravity, Spline, Claude Code, Vercel: der Pro-Tool-Stack jenseits Baukasten für Coaches und Selbstständige.",
  author: {
    "@type": "Person",
    name: "Ilja Krasevskij",
    alternateName: "Sabala",
    url: "https://sabala-mentoring.com/ueber-mich",
    jobTitle: "Premium Brand & Web Partner",
    worksFor: { "@type": "Organization", name: "Sabala Mentoring" },
  },
  publisher: {
    "@type": "Organization",
    name: "Sabala Mentoring",
    logo: { "@type": "ImageObject", url: "https://sabala-mentoring.com/sabala-logo.svg" },
  },
  datePublished,
  dateModified: datePublished,
  mainEntityOfPage: { "@type": "WebPage", "@id": url },
});

const faq = [
  {
    q: "Brauche ich Programmier-Kenntnisse für eine KI-gebaute Webseite?",
    a: "Nicht zwingend. AI-Coding-Tools wie Claude Code lassen dich auf Deutsch oder Englisch beschreiben, was du willst, und schreiben den Code für dich. Du musst lesen können, was sie schreiben, und nachfragen können, wenn etwas unklar ist. Aber du musst nicht selbst tippen.",
  },
  {
    q: "Was kostet eine KI-gebaute Webseite im Vergleich zu Baukasten?",
    a: "Tool-Kosten: etwa 50 Euro pro Monat. Baukasten-Kosten: 15-50 Euro pro Monat. Auf Tool-Ebene ähnlich. Der Unterschied liegt in der Arbeit dahinter. Eine Premium-Webseite mit KI-Stack und strategischer Begleitung kostet über 12 Monate typischerweise 8.000-15.000 Euro. Baukasten ist Abo auf Lebenszeit.",
  },
  {
    q: "Welche KI-Tools sind 2026 wirklich premium-tauglich?",
    a: "Stand 2026: Antigravity (Google), Claude Code (Anthropic), Cursor (eigenständig), Spline (3D), Vercel (Hosting), GitHub (Versionierung). Nicht premium-tauglich: Jimdo AI, Wix AI, Squarespace Blueprint, Hostinger AI Website Builder. Diese sind gut für Hobby-Seiten, aber sie geben dir keinen Code.",
  },
  {
    q: "Was passiert, wenn die KI-Tools nicht mehr existieren?",
    a: "Genau hier liegt der Unterschied zu Baukasten. Wenn Antigravity verschwindet, hast du immer noch deinen Code auf GitHub. Du kannst jedes andere AI-Tool nehmen oder einen menschlichen Entwickler. Bei Jimdo oder Webflow: Anbieter weg, Webseite weg. Code-Ownership ist deine Versicherung.",
  },
  {
    q: "Wie unterscheidet sich AI-Coding von ChatGPT?",
    a: "ChatGPT ist ein Chatbot. Du fragst, er antwortet, du kopierst Text. AI-Coding-Tools (Claude Code, Cursor, Antigravity) integrieren sich direkt in deine Code-Umgebung. Sie sehen deine Dateien, verstehen den Kontext und schreiben den Code direkt rein. Du sagst „mach die Hero-Sektion dunkler“, und sie ändert die richtige Stelle.",
  },
];

const faqSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

const proseBlock =
  "prose prose-lg md:prose-xl prose-stone max-w-none font-satoshi leading-[1.85] text-warm-steel prose-headings:font-instrument prose-headings:text-deep-charcoal prose-strong:text-deep-charcoal prose-a:text-refined-gold prose-a:no-underline hover:prose-a:underline prose-h2:font-instrument prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-20 prose-h2:mb-8 prose-h2:leading-[1.15] prose-h3:font-instrument prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-5 prose-p:mb-6 prose-ul:my-6 prose-li:mb-2 prose-li:leading-[1.7]";

export default function BlogWebseiteMitKIBauenPage() {
  return (
    <main className="flex flex-col w-full bg-pure-surface min-h-screen selection:bg-refined-gold selection:text-white pb-32">
      <Script id="schema-article" type="application/ld+json" strategy="beforeInteractive">{articleSchemaJson}</Script>
      <Script id="schema-faq" type="application/ld+json" strategy="beforeInteractive">{faqSchemaJson}</Script>

      <div className="pt-24 md:pt-32 w-full bg-[#2E2B26]"></div>

      {/* HERO — Sketch-Cover */}
      <section className="relative w-full aspect-square md:aspect-[21/9] max-h-[800px] overflow-hidden bg-[#2E2B26]">
        <Image src="/blog/webseite-mit-ki-bauen-2026/cover.jpg" alt="Skizze: Crystal mit floating Tool-Icons als Symbol für den Premium-AI-Webseiten-Stack" fill className="object-cover opacity-90" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-pure-surface via-pure-surface/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-pure-surface/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full px-6 sm:px-12 md:px-24 pb-16 md:pb-24 max-w-[1400px] mx-auto z-10">
          <ScrollReveal>
            <Link href="/blog" className="inline-flex items-center gap-2 text-warm-steel hover:text-refined-gold transition-colors font-mono text-xs uppercase tracking-widest mb-10">
              <ArrowLeft className="w-4 h-4" /> Zurück zum Journal
            </Link>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-widest text-refined-gold mb-6">
              <span className="bg-refined-gold/10 px-3 py-1 rounded-full border border-refined-gold/30">KI &amp; Webseiten</span>
              <span className="text-deep-charcoal/80">Mai 2026</span>
              <span className="text-deep-charcoal/80 hidden sm:inline-block">•</span>
              <span className="text-deep-charcoal/80 hidden sm:inline-block">9 Min Lesezeit</span>
            </div>
            <h1 className="font-instrument text-[clamp(2.5rem,5vw,5rem)] text-deep-charcoal leading-[1.05] max-w-[1100px] mb-6">
              Webseite mit KI bauen 2026: Der Premium-Stack, <span className="italic text-refined-gold">den niemand zeigt.</span>
            </h1>
            <p className="text-warm-steel text-lg md:text-xl font-satoshi max-w-[760px] leading-relaxed">
              Diese Seite ist mit Antigravity, Spline und Claude Code gebaut. In neun Tagen. Was 99 Prozent der Coaches verpassen: der Unterschied zwischen Baukasten-KI und Pro-Tool-Stack ist nicht graduell. Es ist eine andere Liga.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* QUICK ANSWER */}
      <section className="px-6 sm:px-12 md:px-24 pt-16 max-w-[860px] mx-auto w-full">
        <ScrollReveal>
          <div className="bg-warm-light/40 border-l-2 border-refined-gold p-8 md:p-10 rounded-r-lg">
            <p className="font-mono text-xs uppercase tracking-widest text-refined-gold mb-6">Quick Answer in 3 Sätzen</p>
            <p className="font-satoshi text-deep-charcoal text-lg leading-relaxed">
              Eine KI-gebaute Premium-Webseite 2026 entsteht NICHT mit Baukasten-KI wie Jimdo oder IONOS. Sie entsteht mit professionellen AI-Coding-Tools (Antigravity, Cursor, Claude Code), einem cinematic 3D-Editor (Spline) und Premium-Hosting (Vercel). Der entscheidende Unterschied: dein Code gehört dir, Custom-Design ist ohne Template-Grenzen möglich, und du kannst Updates jederzeit selbst machen. Der Markt zeigt dir das selten, weil die meisten Anbieter mit Subscription-Lock-in verdienen.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* INTRO + DEFINITION */}
      <section className="px-6 sm:px-12 md:px-24 pt-20 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Was ist eine KI-gebaute Premium-Webseite eigentlich?</h2>
            <p><strong>Eine KI-gebaute Premium-Webseite ist eine Webseite, deren Code von dir oder einem AI-Coding-Tool generiert wird</strong> (statt von einer Baukasten-Software gerendert). Sie liegt als eigenständige Codebasis auf GitHub, von wo aus sie über jeden Hosting-Anbieter deployed werden kann.</p>
            <p>Der entscheidende Unterschied zur Baukasten-KI:</p>
            <ul>
              <li><strong>Baukasten-KI</strong> (Jimdo, Wix AI, Squarespace Blueprint) rendert dir ein Template aus einer geschlossenen Datenbank. Du kannst Texte tauschen, Farben anpassen, Bilder hochladen. Sobald du etwas willst, das die Software nicht vorsieht, hast du keine Möglichkeit.</li>
              <li><strong>Echte KI-Coding-Tools</strong> (Antigravity, Cursor, Claude Code) generieren echten Code, den du öffnen, lesen und verändern kannst. Es gibt keine Vorgabe. Was du beschreibst, wird gebaut.</li>
            </ul>
            <p>Das ist nicht nur ein Tool-Unterschied. Es ist ein Eigentums-Unterschied.</p>

            <h2>Warum sehen Coaches diesen Unterschied nicht?</h2>
            <p>Weil Suchmaschinen dir Anbieter zeigen, die Werbebudget haben. Jimdo und IONOS sind in jeder SERP-Position 1-3 für „Webseite selbst bauen“. Antigravity ist ein Tool von Google, das du in der Suche fast nie findest, weil die Zielgruppe Entwickler sind, nicht Coaches.</p>
            <p>Das Ergebnis: die Mehrheit der Coaches glaubt, „mit KI bauen“ heißt Jimdo-Schablone mit AI-Text. Es geht um Welten mehr. Wer hier den Unterschied versteht, hat einen <Link href="/blog/webdesigner-verschwunden-code-eigentum">echten Eigentums-Vorteil gegenüber Baukasten</Link>, den ich in einem eigenen Artikel auseinandergenommen habe.</p>
          </div>
        </ScrollReveal>
      </section>

      {/* 5 BAUSTEINE */}
      <section className="px-6 sm:px-12 md:px-24 pt-12 max-w-[1100px] mx-auto w-full">
        <ScrollReveal>
          <h2 className="font-instrument text-3xl md:text-5xl text-deep-charcoal text-center mb-4 leading-tight">
            Der Premium-Stack 2026: <span className="italic text-refined-gold">5 Bausteine</span>
          </h2>
          <p className="text-warm-steel font-satoshi text-center max-w-[640px] mx-auto mb-16">
            Tools, die ich täglich nutze. Mit konkreten Beispielen aus aktuellen Projekten.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {[
            {
              num: "01",
              icon: Code,
              title: "Antigravity, Cursor oder Claude Code",
              role: "Das Build-Tool",
              body: "Du schreibst auf Deutsch oder Englisch, was du willst, und das Tool generiert den Code. Konkretes Beispiel: ein Kunde wollte ein automatisch erscheinendes Audit-Popup auf seiner Homepage. Idee zu Live: 90 Minuten. Vor drei Jahren wäre das ein 2.000-Euro-Auftrag an einen Frontend-Entwickler gewesen.",
            },
            {
              num: "02",
              icon: Layers,
              title: "Spline",
              role: "Cinematic 3D",
              body: "Ein 3D-Editor, vergleichbar mit Figma, aber für dreidimensionale Szenen. Du kannst rotierende Logos, schwebende Kristalle, animierte Tunnel erstellen, ohne eine Zeile Three.js zu schreiben. Sabala-Brand-Symbol (Kristall mit Gold-Aura) ist eine Spline-Szene. Läuft auf jedem Smartphone flüssig.",
            },
            {
              num: "03",
              icon: Cpu,
              title: "Vercel",
              role: "Premium-Hosting",
              body: "Deutsche Edge-Region Frankfurt, cookie-frei möglich, Auto-Deploy über GitHub. sabala-mentoring.com läuft auf Vercel. Google PageSpeed: 98 von 100 mobil, 100 von 100 Desktop. Konkurrenz-WordPress-Seiten mit ähnlichem Inhalt liegen typischerweise bei 50-70 mobil.",
            },
            {
              num: "04",
              icon: Lock,
              title: "GitHub",
              role: "Code-Eigentum",
              body: "Dein Code liegt auf deinem GitHub-Konto. Du bist Owner. Migrations-Freiheit: wenn Vercel morgen die Preise verzehnfacht, deployst du auf Netlify, Cloudflare Pages oder eigenem Server. Der gleiche Code läuft überall. Wenn ich nicht mehr da bin, kann jeder Entwickler übernehmen.",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.num}>
                <div className="h-full bg-warm-light/30 border border-refined-gold/15 hover:border-refined-gold/40 transition-all duration-500 rounded-[24px] p-7 md:p-8 group">
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-refined-gold text-xs tracking-[0.22em] uppercase font-bold">{item.num}</span>
                    <div className="w-10 h-10 rounded-full bg-refined-gold/10 border border-refined-gold/30 flex items-center justify-center group-hover:bg-refined-gold/20 transition-colors">
                      <Icon className="w-4 h-4 text-refined-gold" />
                    </div>
                  </div>
                  <p className="font-mono text-warm-steel/70 text-[0.65rem] tracking-widest uppercase mb-1">{item.role}</p>
                  <h3 className="font-instrument text-2xl md:text-[1.7rem] text-deep-charcoal mb-4 leading-tight">{item.title}</h3>
                  <p className="font-satoshi text-warm-steel text-base leading-[1.7]">{item.body}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.2}>
          <div className="mt-8 bg-deep-charcoal text-pure-surface rounded-[24px] p-7 md:p-10 border border-refined-gold/30 shadow-[0_30px_70px_rgba(184,150,62,0.12)]">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-refined-gold text-xs tracking-[0.22em] uppercase font-bold">05</span>
              <span className="font-mono text-refined-gold/70 text-[0.65rem] tracking-widest uppercase">Pflicht-Voraussetzung</span>
            </div>
            <h3 className="font-instrument text-2xl md:text-3xl text-pure-surface mb-4 leading-tight">Brand-Vision als nicht-verhandelbare Voraussetzung</h3>
            <p className="font-satoshi text-pure-surface/75 leading-[1.7]">
              Das wichtigste Werkzeug ist nicht digital. KI baut, was du beschreibst, aber nicht WAS du brauchst. Vor jeder Code-Zeile muss klar sein: wer ist deine Zielgruppe, was ist deine Voice, wo sind deine Trust-Elemente, was ist die eine Aktion, die ein Besucher machen soll. Ohne diese Klarheit baut die KI etwas, das funktional korrekt ist, aber nicht konvertiert.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* WAS AI NICHT KANN */}
      <section className="px-6 sm:px-12 md:px-24 pt-24 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Was AI nicht kann (Stand 2026)</h2>
            <p>Ehrlichkeit gehört dazu. Diese vier Sachen kann auch der beste AI-Stack 2026 nicht ersetzen:</p>
            <ul>
              <li><strong>Brand-Identität entwickeln</strong>: AI schreibt keine Voice, die nach dir klingt, wenn du sie nicht vorher hast.</li>
              <li><strong>Customer-Journey designen</strong>: AI weiß nicht, in welcher Reihenfolge ein potenzieller Kunde von Vertrauen zu Kauf geführt werden muss. Das ist UX-Insight.</li>
              <li><strong>Voice in dir finden</strong>: AI kann Sätze in deiner Voice umformulieren, aber nicht deine Voice schaffen. Das ist Personal-Brand-Arbeit.</li>
              <li><strong>Foto-Authentizität</strong>: AI-generierte Portraits sehen 2026 immer noch wie AI-generierte Portraits aus. Du brauchst echte Fotos.</li>
            </ul>
            <p>Genau hier setze ich an. Der AI-Stack ist Werkzeug. Die Substanz dahinter ist Sabala-Arbeit: Brand-Strategie, Voice, Customer-Journey, Foto-Direction, Trust-Architektur. Wer AI nicht nur fuers Coden, sondern fuer den ganzen Arbeitsalltag nutzen will, schaut sich am besten <Link href="/gpt-team">mein eigenes KI-Team</Link> an. Sieben spezialisierte Custom GPTs, die Sabala-Stimme verstehen.</p>

            <h2>Was kostet das alles?</h2>
            <p>Realistische Markt-Preise 2026:</p>
            <ul>
              <li><strong>Antigravity / Cursor / Claude Code</strong>: 20-30 Euro pro Monat</li>
              <li><strong>Spline</strong>: kostenlos für Basic, 9 Euro pro Monat für Pro</li>
              <li><strong>Vercel</strong>: kostenlos für kleine Seiten, 20 Euro pro Monat für Pro</li>
              <li><strong>GitHub</strong>: kostenlos für Private Repos</li>
            </ul>
            <p><strong>Tools insgesamt: etwa 50 Euro pro Monat.</strong> Das ist weniger als ein typisches Webflow-Abo. Die <Link href="/blog/baukasten-vs-eigene-webseite-kosten-2026">vollstaendige 5-Jahres-Rechnung Baukasten vs. eigene Webseite</Link> habe ich in einem eigenen Artikel mit konkreten Markt-Preisen aufgeschluesselt.</p>
            <p>Was den Preis macht, ist nicht das Werkzeug. Es ist die Arbeit, die jemand reinsteckt, der versteht WAS gebaut werden muss und WIE.</p>
          </div>
        </ScrollReveal>
      </section>

      {/* FAQ */}
      <section className="px-6 sm:px-12 md:px-24 pt-24 max-w-[900px] mx-auto w-full">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-widest text-refined-gold mb-4 text-center">Häufige Fragen</p>
          <h2 className="font-instrument text-3xl md:text-5xl text-deep-charcoal text-center mb-12 leading-[1.1]">Was sich Coaches typischerweise fragen.</h2>
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
                <span className="text-xs font-mono tracking-widest uppercase text-refined-gold">Premium-Auftritt mit AI-Stack</span>
              </div>
              <h3 className="font-instrument text-3xl md:text-4xl text-white mb-6">Tools sind verfügbar. Substanz bleibt deine.</h3>
              <p className="text-white/60 font-satoshi text-lg leading-relaxed mb-8">
                Wenn du eine Premium-Webseite willst, die mit AI-Tools gebaut ist und dir wirklich gehört, plus die strategische Begleitung dazu (Brand, Voice, Customer-Journey, SEO+GEO), ist das genau was Sabala macht. Fuer den schlanken Einstieg gibts die Premium-OnePager-Variante.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link href="/premium-angebot" className="inline-flex items-center justify-center gap-2 bg-refined-gold text-deep-charcoal hover:bg-white px-8 py-4 transition-colors font-medium rounded-full w-full sm:w-auto">
                  Premium-Angebot ansehen
                </Link>
                <Link href="/special-launch-angebot" className="text-white/80 hover:text-white px-6 py-4 transition-colors font-medium border border-white/10 rounded-full hover:bg-white/5 w-full sm:w-auto text-center">
                  OnePager-Einstieg
                </Link>
                <Link href="/blog#audit" className="text-refined-gold/90 hover:text-refined-gold px-6 py-4 transition-colors font-medium text-sm w-full sm:w-auto text-center underline-offset-4 hover:underline">
                  Kostenfreies Mini-Audit
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
