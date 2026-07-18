import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CountUp } from "@/components/blog/CountUp";
import { ArticleAuditCTA } from "@/components/blog/ArticleAuditCTA";
import Image from "next/image";
import Link from "next/link";
import SabalaLogo from "@/components/brand/SabalaLogo";
import Script from "next/script";
import {
  ArrowLeft, Search, Bot, Layers, Compass, Sparkles, Clock, AlertTriangle,
  MapPin, Wrench, Database, MessageCircle, BookOpen, Quote,
  Zap, Target, Network, Award, Crown
} from "lucide-react";

export const metadata = {
  title: "SEO und Generative Engine Optimization (GEO) für Personal Brands 2026",
  description: "Generative Engine Optimization (GEO) macht deine Personal Brand 2026 in ChatGPT, Perplexity und Google AI Overviews sichtbar. Sechs SEO-Tools, vier GEO-Methoden, ein 30-Minuten-Sprint. Kein Agentur-Sprech.",
  openGraph: {
    title: "SEO und Generative Engine Optimization (GEO): Wie deine Personal Brand 2026 in Google und ChatGPT gefunden wird",
    description: "Pillar-Hub für Personal Brands: SEO + GEO + AEO als Dreiklang. Echte Daten, kostenlose Tools, ICP-validiert.",
    images: ["/blog/seo-und-geo-fuer-personal-brands-2026/cover.jpg"],
    type: "article",
    publishedTime: "2026-05-19",
  },
};

const articleSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "SEO und Generative Engine Optimization (GEO): Wie deine Personal Brand 2026 in Google und ChatGPT gefunden wird",
  "description": "Generative Engine Optimization (GEO) macht deine Personal Brand 2026 in ChatGPT, Perplexity und Google AI Overviews sichtbar.",
  "image": "https://sabala-mentoring.com/blog/seo-und-geo-fuer-personal-brands-2026/cover.jpg",
  "author": { "@type": "Person", "name": "Ilja Krasevskij", "alternateName": "Sabala", "url": "https://sabala-mentoring.com/ueber-mich", "sameAs": ["https://www.linkedin.com/in/iljakrasevskij/", "https://sabala-mentoring.com"], "jobTitle": "Mentor für Personal Brands", "worksFor": { "@type": "Organization", "name": "Sabala Mentoring" } },
  "publisher": { "@type": "Organization", "name": "Sabala Mentoring", "logo": { "@type": "ImageObject", "url": "https://sabala-mentoring.com/sabala-logo.svg" } },
  "datePublished": "2026-05-19",
  "dateModified": "2026-05-19",
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://sabala-mentoring.com/blog/seo-und-geo-fuer-personal-brands-2026" }
});

const personSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Ilja Krasevskij",
  "alternateName": "Sabala",
  "url": "https://sabala-mentoring.com/ueber-mich",
  "sameAs": ["https://www.linkedin.com/in/iljakrasevskij/", "https://sabala-mentoring.com"],
  "jobTitle": "Mentor für Personal Brands",
  "worksFor": { "@type": "Organization", "name": "Sabala Mentoring" },
  "knowsAbout": ["Personal Brand", "SEO", "Generative Engine Optimization", "Premium-Webseiten", "Business Mentoring"]
});

const faqSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Was bedeutet Generative Engine Optimization (GEO)?", "acceptedAnswer": { "@type": "Answer", "text": "GEO ist die Optimierung deiner Inhalte für KI-Suchsysteme wie ChatGPT, Perplexity, Claude und Google Gemini. Statt für klassische Suchergebnisse zu ranken, geht es darum, dass diese KIs deine Marke als verlässliche Quelle zitieren, wenn jemand eine Frage stellt. GEO ergänzt SEO, ersetzt es nicht." } },
    { "@type": "Question", "name": "Wie verbessere ich meine ChatGPT-Sichtbarkeit?", "acceptedAnswer": { "@type": "Answer", "text": "Drei Hebel: Schema-Markup einbauen (FAQPage, Person, Article), Erwähnungen auf Wikipedia oder Reddit aufbauen (gemeinsam 59 Prozent aller ChatGPT-Citations), klares Frage-Antwort-Format mit konkreten Zahlen." } },
    { "@type": "Question", "name": "Welche kostenlosen Tools brauche ich für GEO und SEO?", "acceptedAnswer": { "@type": "Answer", "text": "Für SEO: Google Search Console, Google Suggest, AnswerThePublic, AlsoAsked, findquestions.com, Pinterest-Suchleiste. Für GEO: ChatGPT-Direktbefragung, Perplexity-Quellen-Analyse, Bing Webmaster Tools, Schema.org-Markup-Tester." } },
    { "@type": "Question", "name": "Wie lange dauert es bis SEO und GEO Erfolge sehen?", "acceptedAnswer": { "@type": "Answer", "text": "Bei GEO: erste Citations in 4 bis 8 Wochen, konsistente Präsenz in 3 bis 6 Monaten, dominante Position in 6 bis 12 Monaten. Bei SEO: erste Bewegungen in 8 bis 12 Wochen, spürbare Klicks in 4 bis 6 Monaten." } },
    { "@type": "Question", "name": "Brauche ich einen Blog, um in ChatGPT gefunden zu werden?", "acceptedAnswer": { "@type": "Answer", "text": "Ein Blog ist der effizienteste Hebel, aber kein Muss. Pflicht ist eine Webseite mit substanziellen Inhalten, FAQ-Sektion mit Schema-Markup, klare Autoren-Bio." } },
    { "@type": "Question", "name": "Was ist FAQ Schema Markup und wie baue ich es ein?", "acceptedAnswer": { "@type": "Answer", "text": "FAQ Schema ist ein strukturierter Datentyp von Schema.org. Du baust es ein, indem du JSON-LD-Code in den head-Bereich der Seite packst. Generatoren wie technicalseo.com nehmen den Code ab." } },
    { "@type": "Question", "name": "Was ist der Unterschied zwischen GEO und AEO?", "acceptedAnswer": { "@type": "Answer", "text": "AEO optimiert für direkte Antworten in Featured Snippets, Google AI Overviews und Voice-Search. GEO zielt auf Zitation durch generative KI-Modelle wie ChatGPT oder Perplexity." } },
    { "@type": "Question", "name": "Wie optimiere ich für Google AI Overviews?", "acceptedAnswer": { "@type": "Answer", "text": "Drei Schritte: H2-Überschriften als echte Klienten-Fragen schreiben, in den ersten 50-80 Wörtern unter der Überschrift beantworten, FAQPage-Schema-Markup implementieren." } },
    { "@type": "Question", "name": "Wie lange dauert es, bis ich in ChatGPT zitiert werde?", "acceptedAnswer": { "@type": "Answer", "text": "Erste Citations in 4 bis 8 Wochen bei sauberem Schema-Markup und Bing-Indexierung. Perplexity reagiert oft nach 2 bis 4 Wochen." } }
  ]
});

const stats = [
  { value: 89, suffix: "%", label: "der ChatGPT-Zitationen", sub: "stammen von Seiten außerhalb der Google Top 10" },
  { value: 47.9, decimals: 1, suffix: "%", label: "Wikipedia-Anteil", sub: "an allen ChatGPT-Citations" },
  { value: 11.3, decimals: 1, suffix: "%", label: "Reddit-Anteil", sub: "an allen ChatGPT-Citations" },
  { value: 115, suffix: "%", label: "Sichtbarkeits-Boost", sub: "durch gezielte GEO-Maßnahmen (Aggarwal 2023)" },
  { value: 11, suffix: "×", label: "höhere Conversion-Rate", sub: "von AI-Search-Visitors vs. organischer Traffic" },
];

const seoTools = [
  { icon: Search, name: "Google Search Console" },
  { icon: MessageCircle, name: "Google Suggest" },
  { icon: BookOpen, name: "AnswerThePublic" },
  { icon: Network, name: "AlsoAsked" },
  { icon: Quote, name: "findquestions.com" },
  { icon: MapPin, name: "Pinterest Trends" },
];
const geoTools = [
  { icon: Bot, name: "ChatGPT direkt befragen" },
  { icon: Compass, name: "Perplexity-Quellen analysieren" },
  { icon: Database, name: "Bing Webmaster Tools" },
  { icon: Wrench, name: "Schema.org Markup-Tester" },
];

const hebelSummary = [
  { icon: MessageCircle, num: "01", title: "Fragen-Überschriften" },
  { icon: Layers, num: "02", title: "Pyramidenstruktur" },
  { icon: BookOpen, num: "03", title: "FAQ mit Schema-Markup" },
  { icon: Award, num: "04", title: "E-E-A-T konsequent zeigen" },
  { icon: Network, num: "05", title: "Pillar-Page-Architektur" },
];

const timeline = [
  { time: "Woche 1-2", icon: Sparkles, title: "Setup", desc: "Schema-Markup einbauen, Bing Webmaster einrichten, Google Search Console verifizieren. Die Vorbereitung." },
  { time: "Woche 4-8", icon: Zap, title: "Erste Citations", desc: "Perplexity zitiert dich (2-4 Wochen). Erste ChatGPT-Mentions sichtbar (4-8 Wochen) bei sauberem Setup." },
  { time: "Monat 3-6", icon: Target, title: "Konsistenz", desc: "Konsistente Erwähnungen in deiner Nische. Die KI kennt deine Marke und nennt sie regelmäßig." },
  { time: "Monat 6-12", icon: Crown, title: "Dominanz", desc: "Dominante Position für Long-Tail-Anfragen. Du wirst zur ersten Wahl in deinem Spezialgebiet." },
];

const fehlerSummary = [
  "Keyword-Stuffing",
  "Wall-of-Text",
  "Fehlende Autoren-Bio",
  "Lifestyle ohne Lösung",
  "Tool-Glaube statt Substanz",
  "Kein Tracking",
];

const faq = [
  { q: "Was bedeutet Generative Engine Optimization (GEO)?", a: "GEO ist die Optimierung deiner Inhalte für KI-Suchsysteme wie ChatGPT, Perplexity, Claude und Google Gemini. Statt für klassische Suchergebnisse zu ranken, geht es darum, dass diese KIs deine Marke als verlässliche Quelle zitieren, wenn jemand eine Frage stellt. GEO ergänzt SEO, ersetzt es nicht. Sauberes SEO ist die Grundlage, GEO setzt darauf auf." },
  { q: "Wie verbessere ich meine ChatGPT-Sichtbarkeit?", a: "Drei Hebel: Schema-Markup einbauen (FAQPage, Person, Article), Erwähnungen auf Wikipedia oder Reddit aufbauen (gemeinsam 59 Prozent aller ChatGPT-Citations), klares Frage-Antwort-Format. Bing Webmaster Tools einrichten ist 2026 Pflicht." },
  { q: "Welche kostenlosen Tools brauche ich für GEO und SEO?", a: "Für SEO: Google Search Console, Google Suggest, AnswerThePublic, AlsoAsked, findquestions.com, Pinterest-Suchleiste. Für GEO: ChatGPT-Direktbefragung, Perplexity-Quellen-Analyse, Bing Webmaster Tools, Schema.org-Markup-Tester. Insgesamt zehn Werkzeuge, alle kostenlos." },
  { q: "Wie lange dauert es bis SEO und GEO Erfolge sehen?", a: "Bei GEO: erste Citations in 4 bis 8 Wochen, konsistente Präsenz in 3 bis 6 Monaten, dominante Position in 6 bis 12 Monaten. Bei SEO: erste Bewegungen in 8 bis 12 Wochen, spürbare Klicks in 4 bis 6 Monaten. Beide arbeiten kumulativ." },
  { q: "Brauche ich einen Blog, um in ChatGPT gefunden zu werden?", a: "Ein Blog ist der effizienteste Hebel, aber kein Muss. Pflicht ist eine Webseite mit substanziellen Inhalten, FAQ-Sektion mit Schema-Markup, klare Autoren-Bio. Service-Webseiten ohne Blog können GEO-sichtbar werden, wenn Pyramidenstruktur und E-E-A-T-Signale sauber sind." },
  { q: "Was ist FAQ Schema Markup und wie baue ich es ein?", a: "FAQ Schema ist ein strukturierter Datentyp von Schema.org. Du baust es ein, indem du JSON-LD-Code in den head-Bereich packst. Generatoren wie technicalseo.com nehmen den Code ab. Validiere mit dem Schema.org-Validator." },
  { q: "Was ist der Unterschied zwischen GEO und AEO?", a: "AEO optimiert für direkte Antworten in Featured Snippets, Google AI Overviews und Voice-Search. GEO zielt auf Zitation durch generative KI-Modelle wie ChatGPT oder Perplexity. Beide nutzen Schema-Markup als gemeinsame Basis." },
  { q: "Wie optimiere ich für Google AI Overviews?", a: "Drei Schritte: H2-Überschriften als echte Klienten-Fragen schreiben, in den ersten 50 bis 80 Wörtern unter der Überschrift beantworten, FAQPage-Schema-Markup implementieren. Google bevorzugt diese Struktur für AI Overviews seit Anfang 2025." },
  { q: "Wie lange dauert es, bis ich in ChatGPT zitiert werde?", a: "Erste Citations in 4 bis 8 Wochen bei sauberem Schema-Markup und Bing-Indexierung. Perplexity reagiert oft nach 2 bis 4 Wochen. Brand-Mentions auf Wikipedia oder Reddit beschleunigen den Prozess." },
];

const spokes = [
  { num: "01", title: "Bing Webmaster für ChatGPT-Sichtbarkeit" },
  { num: "02", title: "FAQ-Schema einbauen: Schritt für Schritt" },
  { num: "03", title: "E-E-A-T-Signale aufbauen ohne Buzzwords" },
  { num: "04", title: "Substanz statt Show in der Außenkommunikation" },
  { num: "05", title: "KI-Team-Setup als Personal Brand" },
  { num: "06", title: "AI Overviews für deine Marke" },
  { num: "07", title: "Internal Linking für Topical Authority" },
  { num: "08", title: "Webseite-Anti-Patterns für Premium-Marken" },
  { num: "09", title: "Pinterest für Personal Brands" },
];

// Wiederverwendbare Prose-Wrapper-Klassen
const proseBlock = "prose prose-lg md:prose-xl prose-stone max-w-none font-satoshi leading-[1.85] text-warm-steel prose-headings:font-instrument prose-headings:text-deep-charcoal prose-strong:text-deep-charcoal prose-a:text-refined-gold prose-a:no-underline hover:prose-a:underline prose-h2:mt-16 prose-h2:mb-6 prose-h3:mt-10 prose-h3:mb-4 prose-p:mb-6";

// Drop-Cap Klasse für erste Absätze nach H2 (Editorial-Look)
const dropCapClass = "first-letter:font-instrument first-letter:text-[5rem] md:first-letter:text-[6rem] first-letter:leading-[0.85] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-refined-gold";

// Gold-Trennlinie zwischen Sektionen
function GoldDivider() {
  return (
    <div className="flex items-center gap-4 my-20 max-w-[820px] mx-auto px-6 sm:px-12 md:px-24 w-full">
      <div className="h-px bg-gradient-to-r from-transparent via-refined-gold/30 to-transparent flex-1"></div>
      <div className="w-1.5 h-1.5 rounded-full bg-refined-gold/40"></div>
      <div className="h-px bg-gradient-to-r from-refined-gold/30 via-transparent to-transparent flex-1"></div>
    </div>
  );
}

// Pull-Quote für Kern-Aussagen
function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <ScrollReveal>
      <blockquote className="not-prose my-16 max-w-[820px] mx-auto px-6 sm:px-12 md:px-24 w-full">
        <div className="border-l-2 border-refined-gold pl-6 md:pl-10 relative">
          <Quote className="absolute -left-3 -top-2 w-6 h-6 text-refined-gold bg-pure-surface" />
          <p className="font-instrument text-2xl md:text-4xl text-deep-charcoal leading-[1.2] italic">
            {children}
          </p>
        </div>
      </blockquote>
    </ScrollReveal>
  );
}

export default function SeoGeoPersonalBrandsPage() {
  return (
    <main className="flex flex-col w-full bg-pure-surface min-h-screen selection:bg-refined-gold selection:text-white pb-32">

      <Script id="schema-article" type="application/ld+json" strategy="beforeInteractive">{articleSchemaJson}</Script>
      <Script id="schema-person" type="application/ld+json" strategy="beforeInteractive">{personSchemaJson}</Script>
      <Script id="schema-faq" type="application/ld+json" strategy="beforeInteractive">{faqSchemaJson}</Script>

      <div className="pt-24 md:pt-32 w-full bg-[#2E2B26]"></div>

      {/* HERO */}
      <section className="relative w-full aspect-square md:aspect-[21/9] max-h-[800px] overflow-hidden bg-[#2E2B26]">
        <Image src="/blog/seo-und-geo-fuer-personal-brands-2026/cover.jpg" alt="Phantásien-Atlas mit zwei Welten und Gold-Sphäre" fill className="object-cover opacity-90" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-pure-surface via-pure-surface/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-pure-surface/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full px-6 sm:px-12 md:px-24 pb-16 md:pb-24 max-w-[1400px] mx-auto z-10">
          <ScrollReveal>
            <Link href="/" aria-label="Sabala Mentoring · Startseite" className="inline-block mb-8 transition-opacity hover:opacity-80">
              <SabalaLogo light size={64} />
            </Link>
            <Link href="/blog" className="inline-flex items-center gap-2 text-warm-steel hover:text-refined-gold transition-colors font-mono text-xs uppercase tracking-widest mb-10">
              <ArrowLeft className="w-4 h-4" /> Zurück zum Journal
            </Link>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-widest text-refined-gold mb-6">
              <span className="bg-refined-gold/90 text-deep-charcoal px-3 py-1 rounded-full">Pillar-Hub</span>
              <span className="bg-refined-gold/10 px-3 py-1 rounded-full border border-refined-gold/30">SEO &amp; GEO</span>
              <span className="text-deep-charcoal/80">Mai 2026</span>
              <span className="text-deep-charcoal/80 hidden sm:inline-block">•</span>
              <span className="text-deep-charcoal/80 hidden sm:inline-block">14 Min Lesezeit</span>
            </div>
            <h1 className="font-instrument text-[clamp(2.5rem,5vw,5rem)] text-deep-charcoal leading-[1.1] max-w-[1100px] mb-6">
              SEO und Generative Engine Optimization (GEO). Wie deine Personal Brand 2026 in Google und ChatGPT gefunden wird.
            </h1>
            <p className="text-warm-steel text-lg md:text-xl font-satoshi max-w-[800px] leading-relaxed">
              Sechs SEO-Tools, vier GEO-Methoden, ein 30-Minuten-Sprint. Kein Agentur-Sprech. Für Personal Brands, die in beiden Welten gefunden werden wollen.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* DAS WICHTIGSTE IN KÜRZE */}
      <section className="px-6 sm:px-12 md:px-24 pt-20 max-w-[860px] mx-auto w-full">
        <ScrollReveal>
          <div className="bg-warm-light/40 border-l-2 border-refined-gold p-8 md:p-10 rounded-r-lg">
            <p className="font-mono text-xs uppercase tracking-widest text-refined-gold mb-6">Das Wichtigste in Kürze</p>
            <ul className="space-y-4 font-satoshi text-deep-charcoal text-lg leading-relaxed">
              <li className="flex gap-4"><Search className="w-5 h-5 text-refined-gold flex-shrink-0 mt-1" /><span>SEO und GEO sind 2026 zwei verschiedene Spiele. <strong>SEO bringt Klicks bei Google, GEO bringt Citations in ChatGPT, Perplexity und Claude.</strong></span></li>
              <li className="flex gap-4"><Layers className="w-5 h-5 text-refined-gold flex-shrink-0 mt-1" /><span>Du brauchst beide. KI-Suchsysteme zitieren bevorzugt Quellen mit sauberem SEO-Fundament.</span></li>
              <li className="flex gap-4"><Bot className="w-5 h-5 text-refined-gold flex-shrink-0 mt-1" /><span>Personal Brands haben einen Vorteil. <strong>Author-Schema mit echter Person schlägt anonyme Firmen-Webseite.</strong></span></li>
              <li className="flex gap-4"><Sparkles className="w-5 h-5 text-refined-gold flex-shrink-0 mt-1" /><span>Erste Citations kommen in <strong>4 bis 8 Wochen</strong>. Dominante Position dauert <strong>6 bis 12 Monate</strong>.</span></li>
            </ul>
          </div>
        </ScrollReveal>
      </section>

      {/* INTRO STORY */}
      <section className="px-6 sm:px-12 md:px-24 pt-20 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <p className={`text-xl md:text-2xl font-light text-deep-charcoal !leading-[1.5] !mb-8 ${dropCapClass}`}>
              Stell dir vor, eine 38-jährige Gründerin sucht jemanden, der ihre Vision schärft. Vor zwei Jahren hat sie Google geöffnet, drei Begriffe getippt und zehn blaue Links bekommen. <strong>Heute? Sie öffnet ChatGPT, fragt in einem Satz und bekommt drei Namen. Mit Begründung. Ohne Klick.</strong>
            </p>
            <p>Wenn dein Name dort nicht fällt, hast du diese Person verloren, bevor sie überhaupt deine Webseite gesehen hat.</p>
            <p>2026 ist Sichtbarkeit kein Google-Spiel mehr. Sie ist ein Dreiklang aus SEO, GEO und AEO. Wer nur einen davon beherrscht, verschenkt einen großen Teil der Erstkontakte. ChatGPT hat im Frühjahr 2026 über 700 Millionen wöchentliche Nutzer. 81 Prozent Marktanteil bei KI-Chatbots. 5 Milliarden Anfragen pro Monat.</p>
            <p>Und im DACH-Premium-Segment für Personal Brands hat fast niemand systematisch GEO im Blick. Wer jetzt anfängt, übernimmt die Position, bevor sie umkämpft wird.</p>
            <p><strong>Dieser Artikel zeigt dir:</strong></p>
            <ul>
              <li>Was Generative Engine Optimization (GEO) konkret ist und wie es sich von SEO und AEO unterscheidet</li>
              <li>Welche kostenlosen Werkzeuge du für beide Welten brauchst</li>
              <li>Welche fünf Hebel deine Webseite für Google und ChatGPT gleichzeitig stark machen</li>
              <li>Was du heute in dreißig Minuten umsetzen kannst</li>
            </ul>
            <p>Am Ende weißt du, wo dein Auftritt heute steht und welcher Schritt morgen den größten Effekt bringt.</p>
          </div>
        </ScrollReveal>
      </section>

      {/* DEFINITIONS · Long-Prose + Card-Grid */}
      <section className="px-6 sm:px-12 md:px-24 pt-20 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Die kurze Antwort vorab</h2>
            <p className={dropCapClass}><strong>SEO (Search Engine Optimization):</strong> Du wirst in Google gefunden. Klassische blaue Links, organische Rankings, Klicks auf deine Seite. Das Spiel, das alle seit zwanzig Jahren spielen.</p>
            <p><strong>GEO (Generative Engine Optimization):</strong> Du wirst von ChatGPT, Perplexity, Claude und Google Gemini als Quelle zitiert. Die KI nennt deinen Namen oder fasst deine Inhalte zusammen, wenn jemand eine Frage stellt. Du gewinnst Sichtbarkeit ohne Klick.</p>
            <p><strong>AEO (Answer Engine Optimization):</strong> Du wirst zur direkten Antwort. In Featured Snippets, in Voice-Search-Ergebnissen (Siri, Alexa, Google Assistant) oder in den AI Overviews oben in der Google-Suche.</p>
            <p>Drei Disziplinen, ein Ziel: gefunden werden, wenn jemand nach dem sucht, was du anbietest. Sie verstärken sich gegenseitig. Wer SEO macht, baut das Fundament für GEO mit. Wer AEO ernst nimmt, gewinnt automatisch GEO-Punkte. Es ist ein System, kein Buffet.</p>
          </div>
        </ScrollReveal>
      </section>
      <section className="px-6 sm:px-12 md:px-24 pt-12 max-w-[1200px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { tag: "SEO", icon: Search, title: "Search Engine Optimization", desc: "Klicks aus Google. Klassische blaue Links." },
            { tag: "GEO", icon: Bot, title: "Generative Engine Optimization", desc: "Zitiert in ChatGPT, Perplexity, Claude." },
            { tag: "AEO", icon: Zap, title: "Answer Engine Optimization", desc: "Featured Snippets und AI Overviews." },
          ].map((d, i) => (
            <ScrollReveal key={d.tag} delay={i * 0.1}>
              <div className="h-full bg-warm-light/30 border border-refined-gold/20 rounded-2xl p-8 hover:border-refined-gold/60 hover:bg-warm-light/50 transition-all duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-refined-gold/15 flex items-center justify-center"><d.icon className="w-6 h-6 text-refined-gold" /></div>
                  <span className="font-mono text-2xl font-bold text-refined-gold">{d.tag}</span>
                </div>
                <h3 className="font-instrument text-xl text-deep-charcoal mb-2 leading-snug">{d.title}</h3>
                <p className="text-warm-steel font-satoshi leading-relaxed text-sm">{d.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <GoldDivider />

      {/* WARUM 2026 ANDERS IST · Long-Prose + Stats */}
      <section className="px-6 sm:px-12 md:px-24 pt-12 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Warum 2026 anders ist als 2024</h2>
            <p className={dropCapClass}><strong>Die Zahlen verschieben sich gerade. Nicht über Jahre. Über Quartale.</strong> ChatGPT hat im Frühjahr 2026 über 700 Millionen wöchentliche Nutzer gemeldet. Perplexity wächst zweistellig pro Quartal. Google Gemini ist in fast jeder Android-Suche integriert. Für Premium-Recherchen, also genau das, was deine Wunschklienten machen bevor sie buchen, verschiebt sich der Einstieg in Echtzeit.</p>
            <p><strong>Drei Zahlen erzählen die ganze Geschichte:</strong></p>
            <p><strong>89 Prozent der ChatGPT-Zitationen</strong> stammen von Seiten außerhalb der Google Top 10. Wer also nur auf Google Position 1 optimiert, baut die falsche Strategie. KI-Suchsysteme greifen tiefer in den Long-Tail als der klassische Google-Algorithmus.</p>
            <p><strong>Wikipedia stellt 47,9 Prozent aller ChatGPT-Zitationen</strong>, Reddit weitere 11,3 Prozent. Persönliche Webseiten werden zitiert, wenn sie eindeutige Marken-Entitäten transportieren. Ohne klare Author-Identität und Schema-Markup wirst du übersprungen.</p>
            <p>Gezielte GEO-Maßnahmen steigern die Sichtbarkeit in KI-Suchsystemen um <strong>bis zu 115 Prozent</strong>, das hat Aggarwal et al. 2023 in einer akademischen Studie gezeigt. Diese Zahl wirkt klein, ist aber riesig. 115 Prozent mehr Citations bedeutet doppelte Reichweite ohne einen einzigen zusätzlichen Klick.</p>
            <h3>Was bedeutet das konkret für deine Personal Brand?</h3>
            <p>Eine 38-jährige Gründerin sucht eine Mentorin für Personal Branding. Vor zwei Jahren tippte sie Mentor Personal Branding DACH bei Google ein, schaute sich zehn Webseiten an und buchte beim Stimmigsten. Heute öffnet sie ChatGPT und stellt eine viel präzisere Frage: deutschsprachige Mentoren für Personal Branding, die mit Visionären arbeiten und nicht den klassischen Coaching-Pathos verwenden. Drei Namen, mit Begründung, in zwei Sekunden.</p>
            <p>Wenn du in Schritt eins, also ChatGPT, nicht auftauchst, kommst du in Schritt zwei, dem Google-Check, gar nicht mehr vor. Die Reihenfolge hat sich umgedreht. KI-Suche filtert vor, Google wird zum Verifizier-Schritt.</p>
            <p>Das ist die neue Realität. SEO allein reicht nicht mehr. Und sie kommt mit einer guten Nachricht: Im DACH-Premium-Segment für Personal Brands hat fast niemand systematisch GEO im Blick. Wer jetzt anfängt, übernimmt die Position, bevor sie umkämpft wird.</p>
          </div>
        </ScrollReveal>
      </section>
      {/* Stat-Cards als visueller Anker NACH dem Text */}
      <section className="px-6 sm:px-12 md:px-24 pt-12 max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 items-center">
          <ScrollReveal>
            <p className="font-mono text-xs uppercase tracking-widest text-refined-gold mb-3">Die Zahlen visualisiert</p>
            <h3 className="font-instrument text-2xl md:text-3xl text-deep-charcoal leading-snug mb-6">Was die Daten 2026 sagen.</h3>
            <div className="aspect-[16/9] relative rounded-2xl overflow-hidden">
              <Image src="/blog/seo-und-geo-fuer-personal-brands-2026/stats.jpg" alt="Wesen mit Datenvisualisierungen" fill className="object-cover" />
            </div>
          </ScrollReveal>
          <div className="flex flex-col gap-4">
            {stats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.06}>
                <div className="bg-[#2E2B26] text-pure-surface p-5 md:p-6 rounded-2xl border border-refined-gold/20">
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="font-instrument text-4xl md:text-5xl text-refined-gold"><CountUp to={s.value} decimals={s.decimals || 0} /></span>
                    <span className="font-instrument text-2xl md:text-3xl text-refined-gold">{s.suffix}</span>
                  </div>
                  <p className="font-satoshi text-base text-pure-surface font-medium">{s.label}</p>
                  <p className="font-satoshi text-xs text-pure-surface/70 mt-1">{s.sub}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <PullQuote>
        Die Reihenfolge hat sich umgedreht. KI-Suche filtert vor, Google wird zum Verifizier-Schritt.
      </PullQuote>

      {/* TOOLS · Long-Prose pro Tool + Card-Grid */}
      <section className="px-6 sm:px-12 md:px-24 pt-12 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Wie du herausfindest, was deine Wunschklienten suchen</h2>
            <p className={dropCapClass}><strong>Das ist die häufigste Frage, die ich höre: woher weiß ich denn überhaupt, wonach meine Klienten googeln oder ChatGPT fragen?</strong> Die Antwort ist einfacher als die meisten denken. Du fragst die Werkzeuge, die deine Klienten selbst nutzen. Die meisten sind kostenlos und in einer Stunde aufgesetzt.</p>
            <h3>Sechs Werkzeuge für Google</h3>
            <p><strong>Google Search Console</strong> ist dein wichtigstes Werkzeug. Sie zeigt dir, mit welchen Suchbegriffen Menschen heute schon auf deine Webseite kommen. Diese Daten sind Gold, weil sie deine echten Klienten abbilden, keine Hypothesen. Wenn du Search Console noch nicht eingerichtet hast, ist das dein erster Schritt heute. Drei Minuten Setup, lebenslange Daten.</p>
            <p><strong>Google Suggest</strong> ist die kostenlose Live-Demo deines Marktes. Öffne ein Inkognito-Fenster, tippe dein Hauptthema ein und schaue, was Google dir vorschlägt. Diese Vorschläge sind keine Zufallswürfe. Es sind die Phrasen, die echte Menschen in den letzten Tagen gesucht haben. Acht Suggestions pro Thema reichen für eine Stunde gute Recherche.</p>
            <p><strong>AnswerThePublic.com</strong> macht das systematischer. Du gibst dein Hauptthema ein und bekommst eine visuelle Karte aller Fragen, die Menschen dazu stellen. Sortiert nach Fragewort (Was, Wie, Warum, Wann, Wo). Fünf kostenlose Suchen pro Tag sind in der Regel genug für einen ganzen Themen-Cluster.</p>
            <p><strong>AlsoAsked.com</strong> zieht die People-Also-Ask-Cluster von Google heraus. Wenn du eine Hauptfrage eingibst, zeigt das Tool, welche fünf, zehn oder fünfzehn Folgefragen Menschen typischerweise stellen. Das ist dein FAQ-Block fertig serviert. Ab 2026 leider mit Login-Pflicht.</p>
            <p><strong>findquestions.com</strong> ist mein Reddit-Scan-Favorit. Es scannt Reddit nach den echten Fragen, die Menschen in deiner Branche stellen, und liefert 40 Blog-Topic-Ideen plus die relevanten Subreddits. Reddit ist 2026 die zweitgrößte ChatGPT-Citation-Quelle (11,3 Prozent), das macht findquestions zum heimlichen GEO-Spezialhebel. Wer die Reddit-Fragen kennt, schreibt Content, den die KI bevorzugt zitiert.</p>
            <p><strong>Pinterest Trends und Pinterest-Suchleiste</strong> sind das unterschätzte Werkzeug für Personal Brands. Pinterest ist eine Suchmaschine, nicht ein Social Network. 80 Prozent der Nutzer recherchieren aktiv vor einer Kaufentscheidung. Die Suchleiste verrät dir, was wirklich gesucht wird, oft präziser als Google für visuell-emotionale Themen wie Coaching, Branding und Lebensstilthemen.</p>
            <h3>Vier Methoden für GEO</h3>
            <p>Hier ist 2026 noch wenig etabliert. Genau das ist die Chance. Vier Methoden, die jede Personal Brand ohne Tool-Abo umsetzen kann.</p>
            <p><strong>Methode eins: ChatGPT direkt befragen.</strong> Frage ChatGPT, Claude und Perplexity nach den Top-Anbietern in deinem Bereich. Schreibe deine Klienten-Anfrage exakt so, wie ein Klient sie formulieren würde. Wenn du nicht auftauchst, weißt du, wo du stehst. Wenn deine direkten Konkurrenten auftauchen, schau dir deren Webseiten an. Was haben sie strukturell, das du nicht hast?</p>
            <p><strong>Methode zwei: Perplexity-Quellen analysieren.</strong> Perplexity nennt die Webseiten, aus denen es zitiert. Stelle deine Klienten-Fragen und schau die Quellen-Liste an. Welche Webseiten werden zitiert? Welche Inhalte werden bevorzugt (Blogs, FAQ-Seiten, Studien)? Das ist deine GEO-Konkurrenzanalyse in drei Minuten.</p>
            <p><strong>Methode drei: Bing Webmaster Tools.</strong> Microsoft Bing liefert große Teile der Trainingsdaten für ChatGPT. Wenn deine Seite in Bing sauber indexiert ist und mit Bing Webmaster Tools überwacht wird, hast du einen direkten Hebel auf KI-Sichtbarkeit. Bing Webmaster ist kostenlos und in zehn Minuten eingerichtet. Wer 2026 noch nicht in Bing indexiert ist, verschenkt den effizientesten GEO-Hebel.</p>
            <p><strong>Methode vier: Schema.org Markup-Tester.</strong> Strukturierte Daten sind die Sprache, in der dein Inhalt mit KIs spricht. Der Schema.org-Validator zeigt dir, ob deine FAQ-, Person- oder Article-Markups korrekt sind. Ohne sauberes Schema-Markup bleibst du für AI-Citations weitgehend unsichtbar.</p>
            <p>Halte deine Recherche schriftlich fest. Eine einfache Tabelle reicht: Frage, Suchvolumen-Einschätzung (hoch, mittel, niedrig), wo schon Inhalte existieren, wo Lücke ist. Drei bis vier Stunden ehrliche Recherche ersetzen sechs Monate Bauch-Content.</p>
          </div>
        </ScrollReveal>
      </section>
      {/* Tool-Grid als visuelle Übersicht NACH dem Text */}
      <section className="px-6 sm:px-12 md:px-24 pt-12 max-w-[1200px] mx-auto w-full">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-widest text-refined-gold mb-3">Alle zehn Werkzeuge im Überblick</p>
          <h3 className="font-instrument text-2xl text-deep-charcoal mb-8">Die kostenlose Werkzeugkiste.</h3>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-refined-gold mb-4 flex items-center gap-2"><Search className="w-4 h-4" /> SEO-Tools</p>
            <ul className="space-y-3">
              {seoTools.map((t, i) => (
                <ScrollReveal key={t.name} delay={i * 0.04}>
                  <li className="flex items-center gap-3 bg-warm-light/30 border border-warm-steel/15 rounded-xl p-4 hover:border-refined-gold/50 transition-all">
                    <t.icon className="w-5 h-5 text-refined-gold flex-shrink-0" />
                    <span className="font-satoshi text-deep-charcoal">{t.name}</span>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-refined-gold mb-4 flex items-center gap-2"><Bot className="w-4 h-4" /> GEO-Methoden</p>
            <ul className="space-y-3">
              {geoTools.map((t, i) => (
                <ScrollReveal key={t.name} delay={i * 0.04}>
                  <li className="flex items-center gap-3 bg-[#2E2B26] text-pure-surface border border-refined-gold/20 rounded-xl p-4 hover:border-refined-gold/60 transition-all">
                    <t.icon className="w-5 h-5 text-refined-gold flex-shrink-0" />
                    <span className="font-satoshi">{t.name}</span>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </div>
        <ScrollReveal delay={0.3}>
          <div className="mt-8 aspect-[21/9] relative rounded-2xl overflow-hidden">
            <Image src="/blog/seo-und-geo-fuer-personal-brands-2026/tools.jpg" alt="Atlas mit Werkzeugen drumherum" fill className="object-cover" />
          </div>
        </ScrollReveal>
      </section>

      <PullQuote>
        Wer SEO macht, baut das Fundament für GEO mit. Es ist ein System, kein Buffet.
      </PullQuote>

      {/* FÜNF HEBEL · Strukturierte Hebel-Blöcke mit Nummer-Badge */}
      <section className="px-6 sm:px-12 md:px-24 pt-12 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Die fünf Hebel für beide Welten gleichzeitig</h2>
            <p className={dropCapClass}><strong>Jetzt zur Praxis.</strong> Diese fünf Hebel zahlen auf SEO und GEO gleichzeitig ein. Was du einmal aufbaust, wirkt in beiden Systemen. Drei Welten, ein System.</p>
          </div>
        </ScrollReveal>

        <div className="mt-12 flex flex-col gap-10">
          {[
            {
              num: "01",
              title: "Fragen-Überschriften statt Schlagwort-Überschriften",
              body: (
                <>
                  <p>Schreibe deine H2- und H3-Überschriften als echte Klienten-Fragen. <em>Was passiert in unserem Erstgespräch?</em> funktioniert besser als <em>Mein Coaching-Ansatz</em>. <em>Wie genau arbeitest du mit deinen Klienten?</em> zieht mehr als das nüchterne <em>Methodik</em>.</p>
                  <p>Warum das so stark ist? Google liebt es, weil es die Suchintention exakt spiegelt. ChatGPT liebt es, weil es den Inhalt einer Antwort sofort versteht. Und deine Klienten lieben es, weil sie ihre eigene Sprache wiederfinden.</p>
                </>
              ),
            },
            {
              num: "02",
              title: "Pyramidenstruktur in jeder Sektion",
              body: (
                <>
                  <p>Jede Sektion startet mit einer direkten Antwort in zwei bis drei Sätzen. Danach kommt die Tiefe, die Beispiele, die Belege. Das nennt sich Pyramidenstruktur.</p>
                  <p>Diese Reihenfolge bedient drei Welten gleichzeitig: AEO bekommt das Snippet-fähige Material oben, SEO bekommt die Tiefe darunter für das Ranking, und GEO bekommt die klar zitierbaren Aussagen, die KIs gerne übernehmen. Eine Struktur, drei Gewinne.</p>
                </>
              ),
            },
            {
              num: "03",
              title: "FAQ-Sektion mit Schema-Markup",
              body: (
                <>
                  <p>Eine FAQ-Sektion mit sechs bis neun Fragen ist 2026 nicht optional. Sie ist die Eintrittskarte zur Citation-Welt. Jede Frage bekommt eine Antwort von fünfzig bis hundert Wörtern. Das ist die Länge, die KIs am liebsten zitieren.</p>
                  <p>Wichtig: Die FAQ braucht das passende Schema-Markup (FAQPage-Schema). Ohne das Markup wird die FAQ nur von Menschen gelesen, nicht von Maschinen. Schema-Generatoren wie technicalseo.com oder Schema.dev nehmen dir die Technik ab. Du gibst deine Fragen und Antworten ein, kopierst den generierten Code und packst ihn in den head-Bereich deiner Seite.</p>
                </>
              ),
            },
            {
              num: "04",
              title: "E-E-A-T konsequent zeigen",
              body: (
                <>
                  <p>E-E-A-T steht für Experience, Expertise, Authoritativeness und Trustworthiness. Google hat das Konzept geprägt, und KI-Modelle haben es vollständig übernommen, weil sie nicht halluzinieren wollen. Sie wollen sich auf glaubwürdige Quellen stützen können.</p>
                  <p>Konkret heißt das: Eine echte Autoren-Bio auf jeder Seite. Mit Foto, Lebenslauf-Highlights und einem Link zu deinen relevanten Vorträgen, Podcasts oder Publikationen. Verifizierte Bewertungen (zum Beispiel über ProvenExpert) inklusive der Bewertungs-Zahl und des Durchschnitts. Konkrete Kunden-Cases mit Namen, wenn der Klient zustimmt. Ein klares Impressum mit Anschrift, das auch echte Erreichbarkeit signalisiert.</p>
                  <p>Bei mir steht zum Beispiel auf jeder Seite: 4,96 von 5 bei 154 verifizierten ProvenExpert-Bewertungen. Das ist eine konkrete Zahl, kein Marketing-Sprech. Genau das, was KIs für eine Citation brauchen.</p>
                </>
              ),
            },
            {
              num: "05",
              title: "Pillar-Page-Architektur mit semantischen Clustern",
              body: (
                <>
                  <p>Wenn du als Personal Brand für mehrere Themen oder Zielgruppen arbeitest, baust du keine Sammelseite. Du baust einen Pillar-Hub plus Cluster-Seiten.</p>
                  <p>Beispiel aus meiner Praxis: Mein Hauptthema ist Premium-Webseiten für Personal Brands. Daraus werden Cluster: Personal-Brand-Webseite mit Methodik, Webseite für Solopreneure mit Newsletter-Stärke, Founder-Webseite mit Vision. Jede Cluster-Seite ranked für ihr eigenes Spezial-Keyword, verlinkt aber zurück zum Pillar-Hub. Das schafft thematische Autorität, die Google belohnt und KIs als Tiefe interpretieren.</p>
                </>
              ),
            },
          ].map((hebel, i) => (
            <ScrollReveal key={hebel.num} delay={i * 0.05}>
              <article className="relative bg-warm-light/30 border-l-4 border-refined-gold rounded-r-2xl pl-8 pr-6 md:pl-10 md:pr-10 py-8 md:py-10 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="font-instrument text-4xl md:text-5xl text-refined-gold/40 leading-none tracking-tight">{hebel.num}</span>
                  <h3 className="font-instrument text-2xl md:text-3xl text-deep-charcoal font-medium leading-[1.15] m-0">{hebel.title}</h3>
                </div>
                <div className="text-warm-steel font-satoshi text-base md:text-lg leading-relaxed space-y-4 [&_em]:text-deep-charcoal [&_em]:not-italic [&_em]:font-medium">
                  {hebel.body}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className={`${proseBlock} mt-10`}>
            <p>Diese fünf Hebel sind die Substanz hinter dem Hype. Wer sie umsetzt, wird langfristig sichtbar. Wer ihnen ausweicht, optimiert für 2022.</p>
          </div>
        </ScrollReveal>
      </section>
      {/* Hebel-Cards als visuelle Zusammenfassung */}
      <section className="px-6 sm:px-12 md:px-24 pt-12 max-w-[1200px] mx-auto w-full">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-widest text-refined-gold mb-3 text-center">Die fünf Hebel auf einen Blick</p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {hebelSummary.map((h, i) => (
            <ScrollReveal key={h.num} delay={i * 0.06}>
              <div className="h-full bg-warm-light/30 border border-refined-gold/20 rounded-2xl p-5 hover:border-refined-gold/60 hover:bg-warm-light/50 transition-all">
                <span className="font-instrument text-3xl text-refined-gold/50">{h.num}</span>
                <h.icon className="w-5 h-5 text-refined-gold mt-3 mb-2" />
                <h4 className="font-instrument text-base text-deep-charcoal leading-snug">{h.title}</h4>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* SIDE-QUEST 30-MIN · Dark-Block mit Prose */}
      <section className="px-6 sm:px-12 md:px-24 pt-24 max-w-[920px] mx-auto w-full">
        <ScrollReveal>
          <div className="bg-[#2E2B26] text-pure-surface rounded-3xl p-10 md:p-16">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-refined-gold" />
              <p className="font-mono text-xs uppercase tracking-widest text-refined-gold">Side-Quest</p>
            </div>
            <h2 className="font-instrument text-3xl md:text-5xl text-pure-surface leading-[1.1] mb-6">Was du heute in dreißig Minuten machst.</h2>
            <p className="text-pure-surface/70 font-satoshi mb-10 max-w-[700px] leading-relaxed">
              Genug Theorie. Hier ist dein Sprint für die nächsten dreißig Minuten. Mehr Effekt für deine Sichtbarkeit als die meisten in einem Monat erreichen.
            </p>
            <div className="space-y-6 font-satoshi text-pure-surface/90 leading-[1.85]">
              <div className="flex gap-6">
                <span className="font-instrument text-3xl text-refined-gold flex-shrink-0 leading-none">1-5</span>
                <div>
                  <h3 className="font-instrument text-xl text-pure-surface mb-2">Search Console verifizieren</h3>
                  <p className="text-pure-surface/80">Öffne Google Search Console und überprüfe, ob deine Webseite verifiziert ist. Falls nicht, mache es jetzt. Ohne diese Daten optimierst du im Blindflug.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <span className="font-instrument text-3xl text-refined-gold flex-shrink-0 leading-none">5-10</span>
                <div>
                  <h3 className="font-instrument text-xl text-pure-surface mb-2">ChatGPT-Realitäts-Check</h3>
                  <p className="text-pure-surface/80">Öffne ChatGPT und frage nach den besten deutschsprachigen Anbietern in deinem Spezialgebiet im DACH-Raum. Schreibe dir auf, wer auftaucht und warum. Bist du dabei? Wenn ja: super. Wenn nein: was haben die genannten Anbieter, das du nicht hast?</p>
                </div>
              </div>
              <div className="flex gap-6">
                <span className="font-instrument text-3xl text-refined-gold flex-shrink-0 leading-none">10-15</span>
                <div>
                  <h3 className="font-instrument text-xl text-pure-surface mb-2">Sechs Klienten-Fragen sammeln</h3>
                  <p className="text-pure-surface/80">Schreibe sechs Fragen auf, die deine Klienten dir typischerweise in den ersten zehn Minuten eines Erstgesprächs stellen. Diese sechs Fragen sind dein FAQ-Block für die wichtigste Seite deiner Webseite.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <span className="font-instrument text-3xl text-refined-gold flex-shrink-0 leading-none">15-25</span>
                <div>
                  <h3 className="font-instrument text-xl text-pure-surface mb-2">Top-Seite in Pyramide schreiben</h3>
                  <p className="text-pure-surface/80">Nimm eine deiner Top-Seiten (Über-Mich oder Angebot) und schreibe die erste Sektion um in Pyramidenstruktur. Erste zwei Sätze: direkte Antwort auf die Klienten-Frage. Danach: Tiefe.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <span className="font-instrument text-3xl text-refined-gold flex-shrink-0 leading-none">25-30</span>
                <div>
                  <h3 className="font-instrument text-xl text-pure-surface mb-2">FAQ-Schema deployen</h3>
                  <p className="text-pure-surface/80">Geh auf einen FAQ-Schema-Generator (zum Beispiel technicalseo.com/tools/schema-markup-generator) und erzeuge das Schema für deine sechs Fragen. Kopiere den Code in den head deiner Seite, deploye, fertig.</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ZEITSCHIENE */}
      <section className="px-6 sm:px-12 md:px-24 pt-24 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Erwartungs-Setting: Wie lange dauert es wirklich?</h2>
            <p>GEO und SEO arbeiten in verschiedenen Zeitschienen. Hier sind die realistischen Erwartungen, basierend auf meiner eigenen Praxis und auf Studien aus 2025/2026.</p>
            <p><strong>Vier bis acht Wochen:</strong> Erste ChatGPT-Citations werden sichtbar, wenn Schema-Markup sauber implementiert ist und Bing-Indexierung läuft. Perplexity reagiert oft noch schneller (zwei bis vier Wochen), weil es Web-Live-Quellen aktiver zieht.</p>
            <p><strong>Drei bis sechs Monate:</strong> Konsistente Erwähnungen in deiner Nische. Die KI kennt deine Marke und nennt sie regelmäßig, wenn passende Fragen kommen.</p>
            <p><strong>Sechs bis zwölf Monate:</strong> Dominante Position für Long-Tail-Anfragen. Du wirst zur ersten Wahl, wenn jemand spezifisch nach deinem Themenbereich fragt.</p>
            <p>Bei SEO dauert es länger als bei GEO. Spürbare Klick-Zahlen aus Google brauchen meist vier bis sechs Monate Konsistenz. Erste Bewegungen siehst du in der Search Console aber schon nach acht bis zwölf Wochen.</p>
            <p>Der Unterschied zu Performance-Marketing: einmal aufgebaute Positionen sind stabil. Ein gut platzierter FAQ-Block zitierfähig zu sein, ist Mehrwert über Jahre, nicht Tage.</p>
          </div>
        </ScrollReveal>
      </section>
      {/* Timeline-Visual */}
      <section className="px-6 sm:px-12 md:px-24 pt-12 max-w-[1400px] mx-auto w-full">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 mb-10 items-center">
            <div className="aspect-[16/9] relative rounded-2xl overflow-hidden">
              <Image src="/blog/seo-und-geo-fuer-personal-brands-2026/timeline.jpg" alt="Quest-Pfad durch Landschaft" fill className="object-cover" />
            </div>
            <p className="font-mono text-xs uppercase tracking-widest text-refined-gold">Vier Phasen, ein Jahr.</p>
          </div>
        </ScrollReveal>
        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-refined-gold/40 via-refined-gold/20 to-transparent md:transform md:-translate-x-1/2"></div>
          {timeline.map((t, i) => (
            <ScrollReveal key={t.time} delay={i * 0.08}>
              <div className={`relative flex gap-6 md:gap-12 mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className="relative z-10 flex-shrink-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
                  <div className="w-16 h-16 rounded-full bg-pure-surface border-2 border-refined-gold flex items-center justify-center shadow-lg">
                    <t.icon className="w-7 h-7 text-refined-gold" />
                  </div>
                </div>
                <div className="md:w-[calc(50%-3rem)] bg-warm-light/40 rounded-2xl p-6 md:p-8 border border-refined-gold/15">
                  <p className="font-mono text-xs uppercase tracking-widest text-refined-gold mb-2">{t.time}</p>
                  <h3 className="font-instrument text-2xl text-deep-charcoal mb-3">{t.title}</h3>
                  <p className="text-warm-steel font-satoshi text-sm leading-relaxed">{t.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <PullQuote>
        Diese fünf Hebel sind die Substanz hinter dem Hype. Wer ihnen ausweicht, optimiert für 2022.
      </PullQuote>

      {/* HÄUFIGE FEHLER · Strukturierte Fehler-Cards mit Nummer-Badge */}
      <section className="px-6 sm:px-12 md:px-24 pt-12 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Häufige Fehler, die du vermeidest</h2>
            <p className={dropCapClass}><strong>Es gibt sechs Fehler, die Personal-Brand-Webseiten 2026 zuverlässig unsichtbar machen.</strong> Einer davon kommt aus der Tool-Welt, fünf aus der Inhalts-Welt.</p>
          </div>
        </ScrollReveal>

        <div className="mt-12 flex flex-col gap-8">
          {[
            { num: "01", title: "Keyword-Stuffing", body: "Wenn dein Text wirkt, als hättest du ein Wort dreißigmal eingebaut, sind Google und KI gleichermaßen abgestoßen. Schreibe für Menschen, dann findet die Suche dich auch. KI-Modelle erkennen unnatürliche Wortwiederholungen heute besser als jeder klassische Algorithmus." },
            { num: "02", title: "Wall-of-Text ohne Struktur", body: "Lange Absätze ohne Zwischen-Überschriften, ohne Aufzählungen, ohne klare Hierarchie. KIs lieben Struktur. Menschen auch. Faustregel: alle 200 bis 400 Wörter eine visuelle Atempause (Bild, Liste, Zwischenüberschrift, Card)." },
            { num: "03", title: "Fehlende Autoren-Bio", body: "Wenn auf deiner Webseite nicht klar ist, wer du bist, woher deine Expertise kommt und warum man dir glauben sollte, wirst du nicht zitiert. Punkt. KI-Modelle haben gelernt, anonyme Quellen zu meiden. Eine Person mit Geschichte schlägt eine Marke ohne Gesicht." },
            { num: "04", title: "Lifestyle-Content ohne konkrete Lösung", body: "„Finde dein wahres Selbst“ rankt nirgendwo. „Wie ich Solopreneuren helfe, ihre Stundensätze von 80 auf 250 Euro zu erhöhen“ rankt überall. Konkrete Outcomes mit Zahlen werden überall bevorzugt, von Google bis ChatGPT." },
            { num: "05", title: "Auf Tools setzen statt auf Substanz", body: "Es gibt SEO-Tools, die dir versprechen, dass du in drei Wochen rankst. Das ist Unsinn. Substanz bauen dauert. Aber sie hält dann auch. Wer drei Tools für 200 Euro pro Monat abonniert und dann doch kein Ranking baut, hat das Problem nicht verstanden." },
            { num: "06", title: "Kein Tracking", body: "Wenn du nicht weißt, was funktioniert, kannst du nichts verbessern. Google Search Console, ein einfaches Analytics-Tool (Umami, Plausible) und einmal monatlich zehn Minuten Review reichen aus. Mehr ist Overengineering." },
          ].map((fehler, i) => (
            <ScrollReveal key={fehler.num} delay={i * 0.04}>
              <article className="relative bg-warm-light/30 border-l-4 border-refined-gold/60 rounded-r-2xl pl-8 pr-6 md:pl-10 md:pr-10 py-7 md:py-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="font-instrument text-3xl md:text-4xl text-refined-gold/40 leading-none tracking-tight">{fehler.num}</span>
                  <h3 className="font-instrument text-xl md:text-2xl text-deep-charcoal font-medium leading-[1.2] m-0">
                    <span className="font-mono text-xs uppercase tracking-widest text-refined-gold/80 block mb-1">Fehler {fehler.num}</span>
                    {fehler.title}
                  </h3>
                </div>
                <p className="text-warm-steel font-satoshi text-base md:text-lg leading-relaxed m-0">{fehler.body}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className={`${proseBlock} mt-10`}>
            <p>Wenn du diese sechs Fehler vermeidest, bist du in den Top zwanzig Prozent der Personal-Brand-Webseiten im DACH-Raum. Ohne ein einziges teures Tool.</p>
          </div>
        </ScrollReveal>
      </section>
      {/* Fehler-Cards als Quick-Reference */}
      <section className="px-6 sm:px-12 md:px-24 pt-8 max-w-[1100px] mx-auto w-full">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-widest text-refined-gold mb-3 text-center">Die sechs Anti-Patterns</p>
        </ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {fehlerSummary.map((f, i) => (
            <ScrollReveal key={f} delay={i * 0.05}>
              <div className="bg-warm-light/30 border-l-2 border-refined-gold/40 rounded-r-lg p-4 text-center">
                <AlertTriangle className="w-4 h-4 text-refined-gold/70 mx-auto mb-2" />
                <p className="font-satoshi text-sm text-deep-charcoal leading-tight">{f}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* FAQ-ACCORDION */}
      <section className="px-6 sm:px-12 md:px-24 pt-24 max-w-[900px] mx-auto w-full">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-widest text-refined-gold mb-4 text-center">Häufige Fragen</p>
          <h2 className="font-instrument text-3xl md:text-5xl text-deep-charcoal text-center mb-12 leading-[1.1]">Was meine Klienten<br/>typischerweise fragen.</h2>
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

      {/* CTA: Audit als einziger Call-to-Action — bewusste 1-CTA-Strategie (Hick's Law) */}
      <ScrollReveal>
        <ArticleAuditCTA
          eyebrow="Persönliches Audit · kostenlos"
          headline={<>Wie sichtbar bist du<br/>in Google und ChatGPT?</>}
          bridge={<>Schick mir deine Webseite, ich schaue persönlich drauf. SEO-Status, GEO-Zitierfähigkeit, FAQ-Schema, E-E-A-T-Signale, Trust-Elemente. Du bekommst drei konkrete Hebel, die du sofort umsetzen kannst. Kein Funnel, kein Sales-Call dahinter. Nur Substanz.</>}
        />
      </ScrollReveal>

      {/* Hinweis: Premium-CTA-Block (Premium-Angebot + KI-Team) wurde am 20.05.2026 entfernt
          zugunsten einer 1-CTA-Strategie (nur Audit-Form oben). Hick's Law: weniger Optionen,
          höhere Conversion. Premium-Service erreichbar via Header-Navigation oder Audit-Follow-up. */}

      {/* SPOKES */}
      <section className="px-6 sm:px-12 md:px-24 pt-24 max-w-[1200px] mx-auto w-full">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-widest text-refined-gold mb-4 text-center">Was du als Nächstes liest</p>
          <h2 className="font-instrument text-3xl md:text-5xl text-deep-charcoal text-center mb-4 leading-[1.1]">Die neun Spokes zu diesem Pillar.</h2>
          <p className="text-warm-steel font-satoshi text-center mb-12">Erscheinen in den kommenden 3 bis 4 Wochen.</p>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {spokes.map((s, i) => (
            <ScrollReveal key={s.num} delay={i * 0.04}>
              <div className="bg-warm-light/30 border border-warm-steel/15 rounded-xl p-6 hover:border-refined-gold/50 hover:bg-warm-light/50 transition-all duration-300 cursor-default">
                <span className="font-mono text-xs uppercase tracking-widest text-refined-gold">Spoke {s.num}</span>
                <h3 className="font-instrument text-lg text-deep-charcoal mt-2 leading-snug">{s.title}</h3>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

    </main>
  );
}
