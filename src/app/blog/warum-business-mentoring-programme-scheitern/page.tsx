import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { ArrowLeft, Target, Users, Flame, Quote, AlertTriangle, Heart, Compass } from "lucide-react";

export const metadata = {
  title: "Warum viele Business-Mentoring-Programme scheitern (und wie du Mentoren richtig wählst)",
  description: "Der Markt ist geflutet von lauten Versprechen und Schablonen. Wenn du relational und feinsinnig arbeitest, greifen diese Massen-Systeme zu kurz. Ein ehrlicher Blick auf die tiefen Ursachen.",
  openGraph: {
    title: "Warum Business-Mentoring-Programme scheitern · Sabala Mentoring",
    description: "Drei strukturelle Schwächen großer Programme. Und wie du deinen Mentor wirklich wählst.",
    images: ["/blog/warum-business-mentoring-programme-scheitern/cover.jpg"],
    type: "article",
    publishedTime: "2025-01-15",
  },
};

const articleSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Warum viele Business-Mentoring-Programme kläglich scheitern (und wie du Mentoren richtig wählst)",
  "description": "Der Markt ist geflutet von lauten Versprechen und Schablonen. Wenn du relational und feinsinnig arbeitest, greifen diese Massen-Systeme zu kurz.",
  "image": "https://sabala-mentoring.com/blog/warum-business-mentoring-programme-scheitern/cover.jpg",
  "author": { "@type": "Person", "name": "Ilja Krasevskij", "alternateName": "Sabala", "url": "https://sabala-mentoring.com/ueber-mich", "sameAs": ["https://www.linkedin.com/in/iljakrasevskij/", "https://sabala-mentoring.com"], "jobTitle": "Mentor für Personal Brands", "worksFor": { "@type": "Organization", "name": "Sabala Mentoring" } },
  "publisher": { "@type": "Organization", "name": "Sabala Mentoring", "logo": { "@type": "ImageObject", "url": "https://sabala-mentoring.com/sabala-logo.svg" } },
  "datePublished": "2025-01-15",
  "dateModified": "2026-05-19",
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://sabala-mentoring.com/blog/warum-business-mentoring-programme-scheitern" }
});

const personSchemaJson = JSON.stringify({
  "@context": "https://schema.org", "@type": "Person",
  "name": "Ilja Krasevskij", "alternateName": "Sabala",
  "url": "https://sabala-mentoring.com/ueber-mich",
  "sameAs": ["https://www.linkedin.com/in/iljakrasevskij/", "https://sabala-mentoring.com"],
  "jobTitle": "Mentor für Personal Brands",
  "worksFor": { "@type": "Organization", "name": "Sabala Mentoring" },
  "knowsAbout": ["Business Mentoring", "Personal Brand", "Premium-Webseiten", "Begleiter-Haltung", "Substanz statt Show"]
});

const faqSchemaJson = JSON.stringify({
  "@context": "https://schema.org", "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Warum scheitern viele Business-Mentoring-Programme?", "acceptedAnswer": { "@type": "Answer", "text": "Drei strukturelle Ursachen: erstens fehlt der individuelle Ansatz, zweitens fehlt echte 1:1 Begleitung, drittens setzt der Fokus auf Taktik statt auf Tiefe. Skalier-Programme sind für Massen-Märkte gebaut. Wer feinsinnig und relational arbeitet, findet darin keine Sprache. Die Konzepte bleiben trockene Theorie, weil das Nervensystem sich dagegen wehrt." } },
    { "@type": "Question", "name": "Was unterscheidet einen guten Business-Mentor von einem schlechten?", "acceptedAnswer": { "@type": "Answer", "text": "Drei Kriterien: erstens eine echte 1:1 Komponente (kein Massen-Gruppencall mit 50 Teilnehmern), zweitens der Mentor ist selbst coachbar und reflektiert seine blinden Flecken, drittens hält er stillen Raum für Schmerz oder Angst statt sofort High-Vibe-Sätze zu fordern. Wer nur sendet, aber nicht empfängt, ist blind für deine tatsächliche Situation." } },
    { "@type": "Question", "name": "Sind Online-Business-Programme generell schlecht?", "acceptedAnswer": { "@type": "Answer", "text": "Nein. Für klare, lineare Skalierungs-Themen (Online-Kurse, Funnel-Bau, Tech-Setup) können Gruppen-Programme funktionieren. Sie scheitern bei innerer Arbeit, Positionierung und Markenbildung. Wer mit Menschen arbeitet, braucht einen Begleiter, der dieselbe Tiefe hält wie er selbst." } },
    { "@type": "Question", "name": "Wie viel kostet seriöses Business-Mentoring für werteorientierte Coaches?", "acceptedAnswer": { "@type": "Answer", "text": "Echte 1:1 Begleitung mit Substanz beginnt typischerweise bei 4000 bis 8000 Euro für 3 bis 6 Monate. Massen-Programme sind oft günstiger (1500 bis 3000 Euro), aber sie liefern Schablonen, keine individuelle Arbeit. Premium-Mentoring kostet mehr, weil der Mentor weniger Klienten begleitet und mehr Zeit pro Person hat." } },
    { "@type": "Question", "name": "Woran erkenne ich manipulative Sales-Strategien in Mentoring-Programmen?", "acceptedAnswer": { "@type": "Answer", "text": "Klassische Warnsignale: künstliche Verknappung (nur heute, nur 3 Plätze), aggressive Druck-Vokabeln (sichere dir, jetzt zugreifen), emotionale Schmerzpunkt-Trigger ohne Substanz danach, hohe Versprechen ohne klare Methodik. Werteorientierte Mentoring-Arbeit verkauft ruhig, mit Klarheit und ohne Drama." } },
    { "@type": "Question", "name": "Was bedeutet feinsinnig arbeiten im Business-Kontext?", "acceptedAnswer": { "@type": "Answer", "text": "Feinsinnig bedeutet: zwischen den Zeilen lesen, energetische Nuancen wahrnehmen, Klienten nicht in Schablonen zwingen, eigene Intuition als Werkzeug ernst nehmen. Diese Arbeitsweise braucht Business-Begleitung, die das Feine respektiert statt es als Schwäche zu interpretieren." } },
    { "@type": "Question", "name": "Brauche ich Marketing, wenn ich werteorientiert arbeite?", "acceptedAnswer": { "@type": "Answer", "text": "Ja, aber nicht als laute Selbstdarstellung. Echtes Marketing für werteorientierte Coaches bedeutet: deine Haltung klar und stark in den Markt stellen, damit die richtigen Klienten in Resonanz gehen. Das ist Klarheit, keine Maskerade. Eine durchdachte Webseite mit klarem Auftritt arbeitet auch ohne tägliche Posts." } },
    { "@type": "Question", "name": "Wie unterscheidet sich Sabala Mentoring von klassischen Business-Programmen?", "acceptedAnswer": { "@type": "Answer", "text": "Sabala arbeitet als Begleiter, nicht als Skaliererungs-Coach. Fokus: deine Klarheit, deinen Auftritt, deine Brand-Substanz. 1:1 Arbeit über 4 bis 6 Monate. Keine Funnels, keine künstliche Verknappung. Statt 10 Strategien einen klaren Auftritt, der trägt." } }
  ]
});

const faq = [
  { q: "Warum scheitern viele Business-Mentoring-Programme?", a: "Drei strukturelle Ursachen: erstens fehlt der individuelle Ansatz, zweitens fehlt echte 1:1 Begleitung, drittens setzt der Fokus auf Taktik statt auf Tiefe. Skalier-Programme sind für Massen-Märkte gebaut. Wer feinsinnig und relational arbeitet, findet darin keine Sprache." },
  { q: "Was unterscheidet einen guten Business-Mentor von einem schlechten?", a: "Drei Kriterien: erstens eine echte 1:1 Komponente, zweitens der Mentor ist selbst coachbar und reflektiert seine blinden Flecken, drittens hält er stillen Raum für Schmerz oder Angst statt sofort High-Vibe-Sätze zu fordern. Wer nur sendet, aber nicht empfängt, ist blind für deine tatsächliche Situation." },
  { q: "Sind Online-Business-Programme generell schlecht?", a: "Nein. Für klare, lineare Skalierungs-Themen können Gruppen-Programme funktionieren. Sie scheitern bei innerer Arbeit, Positionierung und Markenbildung. Wer mit Menschen arbeitet, braucht einen Begleiter, der dieselbe Tiefe hält wie er selbst." },
  { q: "Wie viel kostet seriöses Business-Mentoring für werteorientierte Coaches?", a: "Echte 1:1 Begleitung mit Substanz beginnt typischerweise bei 4000 bis 8000 Euro für 3 bis 6 Monate. Massen-Programme sind oft günstiger (1500 bis 3000 Euro), aber sie liefern Schablonen, keine individuelle Arbeit." },
  { q: "Woran erkenne ich manipulative Sales-Strategien in Mentoring-Programmen?", a: "Klassische Warnsignale: künstliche Verknappung, aggressive Druck-Vokabeln (sichere dir, jetzt zugreifen), emotionale Schmerzpunkt-Trigger ohne Substanz danach, hohe Versprechen ohne klare Methodik." },
  { q: "Was bedeutet feinsinnig arbeiten im Business-Kontext?", a: "Feinsinnig bedeutet: zwischen den Zeilen lesen, energetische Nuancen wahrnehmen, Klienten nicht in Schablonen zwingen, eigene Intuition als Werkzeug ernst nehmen. Diese Arbeitsweise braucht Business-Begleitung, die das Feine respektiert statt es als Schwäche zu interpretieren." },
  { q: "Brauche ich Marketing, wenn ich werteorientiert arbeite?", a: "Ja, aber nicht als laute Selbstdarstellung. Echtes Marketing für werteorientierte Coaches bedeutet: deine Haltung klar und stark in den Markt stellen, damit die richtigen Klienten in Resonanz gehen. Das ist Klarheit, keine Maskerade." },
  { q: "Wie unterscheidet sich Sabala Mentoring von klassischen Business-Programmen?", a: "Sabala arbeitet als Begleiter, nicht als Skalierungs-Coach. Fokus: deine Klarheit, deinen Auftritt, deine Brand-Substanz. 1:1 Arbeit über 4 bis 6 Monate. Keine Funnels, keine künstliche Verknappung. Statt 10 Strategien einen klaren Auftritt, der trägt." },
];

const dropCapClass = "first-letter:font-instrument first-letter:text-[5rem] md:first-letter:text-[6rem] first-letter:leading-[0.85] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-refined-gold";
const proseBlock = "prose prose-lg md:prose-xl prose-stone max-w-none font-satoshi leading-[1.85] text-warm-steel prose-headings:font-instrument prose-headings:text-deep-charcoal prose-strong:text-deep-charcoal prose-a:text-refined-gold prose-a:no-underline hover:prose-a:underline prose-h2:font-instrument prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-20 prose-h2:mb-8 prose-h2:leading-[1.15] prose-h3:font-instrument prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-5 prose-p:mb-8 prose-ul:my-8 prose-li:mb-3 prose-li:leading-[1.7]";

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <ScrollReveal>
      <blockquote className="not-prose my-20 max-w-[820px] mx-auto px-6 sm:px-12 md:px-24 w-full">
        <div className="border-l-2 border-refined-gold pl-6 md:pl-10 relative">
          <Quote className="absolute -left-3 -top-2 w-6 h-6 text-refined-gold bg-pure-surface" />
          <p className="font-instrument text-2xl md:text-4xl text-deep-charcoal leading-[1.2] italic">{children}</p>
        </div>
      </blockquote>
    </ScrollReveal>
  );
}

function GoldDivider() {
  return (
    <div className="flex items-center gap-4 my-20 max-w-[820px] mx-auto px-6 sm:px-12 md:px-24 w-full">
      <div className="h-px bg-gradient-to-r from-transparent via-refined-gold/30 to-transparent flex-1"></div>
      <div className="w-1.5 h-1.5 rounded-full bg-refined-gold/40"></div>
      <div className="h-px bg-gradient-to-r from-refined-gold/30 via-transparent to-transparent flex-1"></div>
    </div>
  );
}

export default function BlogMentoringPage() {
  return (
    <main className="flex flex-col w-full bg-pure-surface min-h-screen selection:bg-refined-gold selection:text-white pb-32">

      <Script id="schema-article" type="application/ld+json" strategy="beforeInteractive">{articleSchemaJson}</Script>
      <Script id="schema-person" type="application/ld+json" strategy="beforeInteractive">{personSchemaJson}</Script>
      <Script id="schema-faq" type="application/ld+json" strategy="beforeInteractive">{faqSchemaJson}</Script>

      <div className="pt-24 md:pt-32 w-full bg-[#2E2B26]"></div>

      {/* HERO */}
      <section className="relative w-full aspect-square md:aspect-[21/9] max-h-[800px] overflow-hidden bg-[#2E2B26]">
        <Image src="/blog/warum-business-mentoring-programme-scheitern/cover.jpg" alt="Asterix-Vibe Cover: kleines unbeugsames Dorf gegen großes Imperium" fill className="object-cover opacity-90" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-pure-surface via-pure-surface/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-pure-surface/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full px-6 sm:px-12 md:px-24 pb-16 md:pb-24 max-w-[1400px] mx-auto z-10">
          <ScrollReveal>
            <Link href="/blog" className="inline-flex items-center gap-2 text-warm-steel hover:text-refined-gold transition-colors font-mono text-xs uppercase tracking-widest mb-10">
              <ArrowLeft className="w-4 h-4" /> Zurück zum Journal
            </Link>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-widest text-refined-gold mb-6">
              <span className="bg-refined-gold/10 px-3 py-1 rounded-full border border-refined-gold/30">Business Mentoring</span>
              <span className="text-deep-charcoal/80">Januar 2026</span>
              <span className="text-deep-charcoal/80 hidden sm:inline-block">•</span>
              <span className="text-deep-charcoal/80 hidden sm:inline-block">9 Min Lesezeit</span>
            </div>
            <h1 className="font-instrument text-[clamp(2.5rem,5vw,5rem)] text-deep-charcoal leading-[1.1] max-w-[1000px] mb-6">
              Warum viele Business-Mentoring-Programme kläglich scheitern (und wie du Mentoren richtig wählst).
            </h1>
            <p className="text-warm-steel text-lg md:text-xl font-satoshi max-w-[700px] leading-relaxed">
              Der Markt ist geflutet von lauten Versprechen und Schablonen. Wenn du relational und feinsinnig arbeitest, greifen diese Massen-Systeme zu kurz. Ein ehrlicher Blick auf die tiefen Ursachen.
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
              <li className="flex gap-4"><AlertTriangle className="w-5 h-5 text-refined-gold flex-shrink-0 mt-1" /><span>Drei strukturelle Schwächen: <strong>kein individueller Ansatz, fehlende 1:1 Begleitung, Fokus auf Taktik statt Tiefe.</strong></span></li>
              <li className="flex gap-4"><Heart className="w-5 h-5 text-refined-gold flex-shrink-0 mt-1" /><span>Wer feinsinnig arbeitet, braucht einen Mentor, der dieselbe Tiefe hält. Schablonen verändern kein Bewusstsein.</span></li>
              <li className="flex gap-4"><Users className="w-5 h-5 text-refined-gold flex-shrink-0 mt-1" /><span>Echte 1:1 Komponente, ein selbst coachbarer Mentor, stiller Raum für Schmerz. <strong>Drei Filter, drei Fragen.</strong></span></li>
              <li className="flex gap-4"><Compass className="w-5 h-5 text-refined-gold flex-shrink-0 mt-1" /><span>Das Ziel ist nicht mehr Strategie. Es ist Klarheit: deine Haltung so stark in den Markt stellen, dass Klienten in Resonanz gehen.</span></li>
            </ul>
          </div>
        </ScrollReveal>
      </section>

      {/* INTRO */}
      <section className="px-6 sm:px-12 md:px-24 pt-20 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <p className={`text-xl md:text-2xl font-light text-deep-charcoal !leading-[1.5] !mb-8 ${dropCapClass}`}>
              Der Markt ist aktuell von Business-Mentoring-Angeboten geflutet. Leider geraten viele Suchende an völlig unpassende Schablonen, wodurch sie viel wertvolle Zeit und Geld verlieren. <strong>Hier erfährst du, warum das so ist und wie du dich schützen kannst.</strong>
            </p>
            <p>Dieser Artikel richtet sich besonders an Menschen, die mit Menschen arbeiten. Coaches, Therapeuten, Meditationslehrer, Trainer oder Begleiter, die <strong>tief wahrnehmen</strong>, empathisch sind und ihre Arbeit nicht in starre Konzepte pressen lassen wollen.</p>
            <p>Wenn du spürst, dass du sehr fein arbeitest, viel zwischen den Zeilen wahrnimmst und dennoch Schwierigkeiten hast, deine Arbeit klar nach außen zu kommunizieren, dann liegt das absolut nicht an fehlender Kompetenz. Es liegt oft an der Art von Business-Denken, in die dich klassische Programme pressen wollen.</p>

            <h2>Warum große Mentoring-Programme in Versuchung führen</h2>
            <p className={dropCapClass}><strong>Die Versprechungen großer Business-Programme sind verlockend: Success, Freedom, Leichtigkeit.</strong> Viele Anbieter arbeiten mit extrem emotionaler Ansprache, die zielgerichtet die Schmerzpunkte ihrer Zielgruppe drückt:</p>
            <ul>
              <li><strong>Überforderung:</strong> Du weißt nicht, wie du starten sollst? Hier ist Blueprint X.</li>
              <li><strong>Angst vor Sichtbarkeit:</strong> Mit unserer Methode gewinnst du Kunden, ohne dich zu verkaufen.</li>
              <li><strong>Mangel an Struktur:</strong> Unser Programm gibt dir den roten Faden.</li>
            </ul>
            <p>Diese Versprechen wecken Hoffnung. Den Glauben, endlich den Durchbruch zu schaffen. Doch oft endet die Reise am gleichen Punkt, gepaart mit dem toxischen Gefühl: Ich habe die Strategie wohl einfach nicht hart genug umgesetzt.</p>
          </div>
        </ScrollReveal>
      </section>

      {/* 3 SCHWAECHEN CARDS */}
      <section className="px-6 sm:px-12 md:px-24 pt-16 max-w-[1200px] mx-auto w-full">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-widest text-refined-gold mb-3 text-center">Strukturanalyse</p>
          <h2 className="font-instrument text-3xl md:text-5xl text-deep-charcoal text-center mb-12 leading-[1.1]">Die 3 größten<br/>strukturellen Schwächen.</h2>
        </ScrollReveal>
        <div className="flex flex-col gap-8">
          <ScrollReveal delay={0.1}>
            <div className="bg-white border border-warm-light p-8 md:p-10 rounded-2xl shadow-sm relative overflow-hidden group hover:border-refined-gold/40 transition-all">
              <div className="absolute top-0 right-0 p-8 text-[8rem] font-instrument leading-none text-warm-light group-hover:text-refined-gold/15 transition-colors pointer-events-none select-none">1</div>
              <div className="relative z-10">
                <h3 className="font-instrument text-2xl text-deep-charcoal mb-4 flex items-center gap-3"><Users className="text-refined-gold w-6 h-6" /> Kein individueller Ansatz</h3>
                <p className="text-warm-steel text-[1.1rem] leading-relaxed">Jeder Mensch bringt andere energetische Herausforderungen und Bedürfnisse mit. Ein vorgefertigter Videokurs oder eine Massen-Call-Struktur kann diese psychologische Komplexität nicht abdecken. Ein Coach muss Blockaden und unbewusste Ängste im Kontakt wittern und auflösen.</p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="bg-white border border-warm-light p-8 md:p-10 rounded-2xl shadow-sm relative overflow-hidden group hover:border-refined-gold/40 transition-all">
              <div className="absolute top-0 right-0 p-8 text-[8rem] font-instrument leading-none text-warm-light group-hover:text-refined-gold/15 transition-colors pointer-events-none select-none">2</div>
              <div className="relative z-10">
                <h3 className="font-instrument text-2xl text-deep-charcoal mb-4 flex items-center gap-3"><Target className="text-refined-gold w-6 h-6" /> Mangelnde 1:1 Begleitung</h3>
                <p className="text-warm-steel text-[1.1rem] leading-relaxed">Ohne persönliche Tiefe fehlt der Raum, um wirklich hinzuschauen. Ich hatte Klienten, die wochenlang prokrastiniert haben (Technik funktioniert nicht). Erst in der tiefen 1:1 Arbeit kam heraus, dass dahinter die massive Angst vor Kontrollverlust steckte. So etwas löst kein Gruppencall mit 50 anderen.</p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="bg-white border border-warm-light p-8 md:p-10 rounded-2xl shadow-sm relative overflow-hidden group hover:border-refined-gold/40 transition-all">
              <div className="absolute top-0 right-0 p-8 text-[8rem] font-instrument leading-none text-warm-light group-hover:text-refined-gold/15 transition-colors pointer-events-none select-none">3</div>
              <div className="relative z-10">
                <h3 className="font-instrument text-2xl text-deep-charcoal mb-4 flex items-center gap-3"><Flame className="text-refined-gold w-6 h-6" /> Fokus auf Taktik statt Tiefe</h3>
                <p className="text-warm-steel text-[1.1rem] leading-relaxed">Du kannst noch so viel über Skalierung, Funnels und Hacks lernen. Bleibt die Verbindung zwischen deiner tiefen Intuition und den strategischen Business-Schritten aus, wird sich alles, was du tust, wie ein ständiger Verrat an deinen eigenen Werten anfühlen.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <PullQuote>
        Erfolgreiches Mentoring schafft Klarheit, ohne die Tiefe zu verlieren. Es verbindet innere Ausrichtung mit der notwendigen äußeren Form.
      </PullQuote>

      {/* MAIN-PROSE Block 1 */}
      <section className="px-6 sm:px-12 md:px-24 pt-12 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Wenn das Mentoring an der Oberfläche erstickt</h2>
            <p className={dropCapClass}><strong>Ein entscheidender Punkt, der in der glänzenden Online-Welt oft unter den Tisch fällt:</strong> Die Tiefe der Methode, aus der jemand arbeitet, muss zwingend zur Tiefe der Begleitung passen.</p>
            <p>Gerade Coaches, die wahrnehmungsbasiert oder spirituell arbeiten, erleben hier oft eine massive und schmerzhafte Lücke. Stell dir vor: Du heilst in deinen Sitzungen alte emotionale Wunden, arbeitest im tiefen Frequenz-Raum und nimmst feinste Nuancen in der Mimik deines Klienten wahr. Und dann triffst du auf einen Business-Mentor, der rein auf der kognitiven Macher-Ebene agiert (<em>Schalte einfach diese Ads, schick 50 DMs am Tag und du musst nur launchen</em>).</p>
            <p>Das führt unweigerlich zu dem leisen, toxischen Gefühl: <em>Mit mir stimmt etwas nicht. Ich schaffe das nicht.</em> Die Wahrheit ist aber: Du bist nicht unfähig. Die Sprache passt nur einfach nicht. Die Konzepte bleiben trockene Theorie, weil dein Nervensystem sich intuitiv dagegen wehrt, Menschen wie Nummern in einem Funnel zu behandeln. Was dir fehlt, ist kein noch aggressiverer Sales-Leitfaden. Es ist ein Begleiter, der genau diesen tiefen Raum mit halten und verstehen kann.</p>
          </div>
        </ScrollReveal>
      </section>

      <GoldDivider />

      {/* MAIN-PROSE Block 2 */}
      <section className="px-6 sm:px-12 md:px-24 pt-4 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Der innere Konflikt von feinsinnigen Experten</h2>
            <p><strong>Viele hochbegabte Coaches ziehen sich irgendwann aus dem Marketing zurück.</strong> Sie posten weniger, sie verbergen sich, weil sich das laute Trommeln auf Social Media wie ein Verrat an ihrer eigenen spirituellen oder therapeutischen Ethik anfühlt. Sie glauben, sie müssten sich zwischen <strong>Integrität</strong> und <strong>Umsatz</strong> entscheiden.</p>
            <p>Doch das ist der eigentliche Irrtum vieler Mentoring-Programme: Sie lehren dich, wie du eine Maske aufsetzt, um zu verkaufen. Echtes Business Mentoring lehrt dich, wie du deine innerste Haltung so klar und stark in den Markt stellst, dass die <em>richtigen</em> Klienten von ganz allein in Resonanz gehen.</p>
          </div>
        </ScrollReveal>
      </section>

      <PullQuote>
        Echtes Business Mentoring lehrt dich, deine innerste Haltung so klar in den Markt zu stellen, dass die richtigen Klienten von selbst in Resonanz gehen.
      </PullQuote>

      {/* MAIN-PROSE Block 3 */}
      <section className="px-6 sm:px-12 md:px-24 pt-4 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>So wählst du deinen Mentor in Zukunft richtig</h2>
            <p><strong>Achte bei der Wahl deiner zukünftigen Begleitung nicht auf die Instagram-Follower oder das finanzielle Versprechen in der Bio.</strong> Achte auf Erfahrung, Empathie und den Frequenzraum, den diese Person erschaffen kann.</p>
            <ul className="list-disc pl-6">
              <li><strong>Gibt es eine echte Eins-zu-eins-Komponente?</strong> Ohne den 1:1 Resonanzraum ist individuelle innere Arbeit fast unmöglich. Schablonen verändern kein Bewusstsein.</li>
              <li><strong>Ist der Mentor selbst coachbar?</strong> Lasse niemals jemanden in deinen Kopf, der sich nicht selbst regelmäßig überprüfen und von anderen begleiten lässt. Wer nur sendet, aber nicht empfängt, ist blind für blinde Flecken.</li>
              <li><strong>Ist es Empathie oder Manipulation?</strong> Ein wahrer Begleiter fragt nicht nur nach deinen Zielen. Er hält auch stillen Raum für den Schmerz oder die Angst vor der nächsten Schwelle, ohne dass du sofort High-Vibe sein oder eine Checkliste ausfüllen musst.</li>
            </ul>
          </div>
        </ScrollReveal>
      </section>

      <GoldDivider />

      {/* MAIN-PROSE Block 4 */}
      <section className="px-6 sm:px-12 md:px-24 pt-4 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Dein Weg zum wahren Fundament</h2>
            <p>Am Ende ist oft gar nicht die Frage, welches theoretische Programm du brauchst. Die eigentliche Frage ist: Hast du ein <strong>digitales Zuhause</strong> (eine Webseite, ein Branding, eine Struktur), das die Komplexität deiner Seele überhaupt fassen kann?</p>
            <p>Wahres Mentoring bedeutet für uns heute nicht mehr nur Reden. Es bedeutet, deine innere Wahrheit in eine funktionierende, hochprofessionelle Realität zu übersetzen, ohne deine Essenz zu kompromittieren. Wenn du die anstrengende Kundenakquise loslassen willst, brauchst du ein technisches Fundament, das deine Ausstrahlung für dich übernimmt. Genauso wichtig wie der Mentor ist <Link href="/blog/seo-und-geo-fuer-personal-brands-2026">eine durchdachte SEO- und GEO-Strategie</Link>, damit dein Auftritt auch von den richtigen Menschen gefunden wird.</p>
          </div>
        </ScrollReveal>
      </section>

      {/* FAQ */}
      <section className="px-6 sm:px-12 md:px-24 pt-24 max-w-[900px] mx-auto w-full">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-widest text-refined-gold mb-4 text-center">Häufige Fragen</p>
          <h2 className="font-instrument text-3xl md:text-5xl text-deep-charcoal text-center mb-12 leading-[1.1]">Was Klienten<br/>typischerweise fragen.</h2>
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
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-refined-gold/5 lg:from-refined-gold/10 pointer-events-none transition-opacity duration-700 opacity-50 group-hover:opacity-100"></div>
            <div className="flex-1 relative z-10 text-center md:text-left">
              <h3 className="font-instrument text-3xl md:text-4xl text-white mb-6">Wenn du keine Schablone,<br/> sondern Klarheit suchst.</h3>
              <p className="text-white/60 font-satoshi text-lg leading-relaxed mb-8">
                Spürst du, dass klassische Massenprogramme nicht zu deiner Arbeit passen? Lass uns gemeinsam hingucken, was dein Angebot wirklich trägt und wie wir es nach außen sichtbar machen.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link href="/premium-angebot" className="bg-refined-gold hover:bg-white text-deep-charcoal px-8 py-4 rounded-full font-medium transition-colors w-full sm:w-auto text-center">
                  Zum Premium Mentoring
                </Link>
                <Link href="/termin-buchen" className="text-white/80 hover:text-white px-6 py-4 transition-colors font-medium border border-white/10 rounded-full hover:bg-white/5 w-full sm:w-auto text-center">
                  Sabala persönlich sprechen
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/3 flex justify-center shrink-0 relative z-10">
              <div className="w-32 h-32 rounded-[2rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-md">
                <Compass className="w-12 h-12 text-refined-gold" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </main>
  );
}
