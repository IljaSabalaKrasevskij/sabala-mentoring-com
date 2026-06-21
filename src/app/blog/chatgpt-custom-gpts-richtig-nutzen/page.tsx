import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import { BlogSpokes } from "@/components/blog/BlogSpokes";
import SabalaLogo from "@/components/brand/SabalaLogo";
import Script from "next/script";
import { ArrowLeft, Sparkles, Workflow, Layers, Zap, Bot, Quote } from "lucide-react";

export const metadata = {
  title: "99% aller Selbstständigen nutzen ChatGPT falsch (Custom GPTs ändern alles)",
  description: "Fehlender Kontext, unstimmige Sprache, manipulative Antworten. Warum die meisten Solopreneure das volle Potenzial von ChatGPT verschenken und wie ein Custom-GPT-System mit 7 Rollen alles verändert.",
  openGraph: {
    title: "99% aller Selbstständigen nutzen ChatGPT falsch · Custom GPTs als Gamechanger",
    description: "Wie ein 7-Kasten-Custom-GPT-System deine Solo-Arbeit auf Premium-Niveau hebt.",
    images: ["/blog/chatgpt-custom-gpts-richtig-nutzen/cover.jpg"],
    type: "article",
    publishedTime: "2026-04-15",
  },
};

const articleSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "99% aller Selbstständigen nutzen ChatGPT falsch · Wie Custom GPTs alles ändern",
  "description": "Fehlender Kontext, unstimmige Sprache, manipulative Antworten. Wie ein Custom-GPT-System mit 7 Rollen den Solopreneur-Alltag verändert.",
  "image": "https://sabala-mentoring.com/blog/chatgpt-custom-gpts-richtig-nutzen/cover.jpg",
  "author": { "@type": "Person", "name": "Ilja Krasevskij", "alternateName": "Sabala", "url": "https://sabala-mentoring.com/ueber-mich", "sameAs": ["https://www.linkedin.com/in/iljakrasevskij/", "https://sabala-mentoring.com"], "jobTitle": "Mentor für Personal Brands", "worksFor": { "@type": "Organization", "name": "Sabala Mentoring" } },
  "publisher": { "@type": "Organization", "name": "Sabala Mentoring", "logo": { "@type": "ImageObject", "url": "https://sabala-mentoring.com/sabala-logo.svg" } },
  "datePublished": "2026-04-15",
  "dateModified": "2026-05-19",
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://sabala-mentoring.com/blog/chatgpt-custom-gpts-richtig-nutzen" }
});

const personSchemaJson = JSON.stringify({
  "@context": "https://schema.org", "@type": "Person",
  "name": "Ilja Krasevskij", "alternateName": "Sabala",
  "url": "https://sabala-mentoring.com/ueber-mich",
  "sameAs": ["https://www.linkedin.com/in/iljakrasevskij/", "https://sabala-mentoring.com"],
  "jobTitle": "Mentor für Personal Brands",
  "worksFor": { "@type": "Organization", "name": "Sabala Mentoring" },
  "knowsAbout": ["Custom GPTs", "ChatGPT", "Personal Brand", "KI-Team", "Premium-Webseiten"]
});

const faqSchemaJson = JSON.stringify({
  "@context": "https://schema.org", "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Was sind Custom GPTs und warum sind sie besser als der Standard-ChatGPT?", "acceptedAnswer": { "@type": "Answer", "text": "Custom GPTs sind feste, wiederverwendbare Mini-Assistenten mit eigenem Kontext, eigener Stimme und eigenem Auftrag. Du baust sie einmal und sie werden Teil deines Studios. Der Standard-Chat zwingt dich, in jeder Session deinen Kontext neu zu erklären. Custom GPTs erinnern sich, kennen deine Marke und antworten in deiner Stimme. Das spart 10 bis 20 Minuten pro Tag und liefert konsistente Qualität." } },
    { "@type": "Question", "name": "Brauche ich Programmierkenntnisse für Custom GPTs?", "acceptedAnswer": { "@type": "Answer", "text": "Nein. Custom GPTs werden in ChatGPT Plus oder Team direkt im Browser erstellt. Du füllst Felder aus: Name, Rolle, Instructions, hochgeladene Wissensdokumente. Kein Code. Was du brauchst ist Klarheit über deine Marke, deinen Ton und deine wiederkehrenden Aufgaben." } },
    { "@type": "Question", "name": "Was ist das 7-Kasten-System?", "acceptedAnswer": { "@type": "Answer", "text": "Statt einem Universal-GPT baust du sieben spezialisierte Rollen: Content und Marke, Klienten-Kommunikation, Verkauf und Angebot, Strategie und Positionierung, Recherche und Analyse, Reflexion und Klarheit, Operations und Admin. Jede Rolle hat einen klaren Aufgabenbereich und arbeitet wie ein eingespieltes Team. Das System wurde aus der Praxis mit Solopreneuren entwickelt." } },
    { "@type": "Question", "name": "Lohnt sich ChatGPT Plus für Selbstständige?", "acceptedAnswer": { "@type": "Answer", "text": "Wenn du Custom GPTs nutzen willst, brauchst du ChatGPT Plus (oder Team). 20 Dollar pro Monat. Bei seriöser Nutzung von 2 bis 3 Stunden pro Tag bringt es leicht eine Stunde pro Tag an Zeitersparnis. Für die meisten Selbstständigen amortisiert sich das in der ersten Woche." } },
    { "@type": "Question", "name": "Wie unterscheidet sich ChatGPT von Claude für Solopreneure?", "acceptedAnswer": { "@type": "Answer", "text": "Claude liefert oft präzisere Sprache und tiefere Analysen. ChatGPT hat den Vorteil der Custom GPTs als wiederverwendbares System. Für reine Textqualität ist Claude oft besser. Für den operativen Solo-Alltag mit wiederkehrenden Aufgaben ist ChatGPT mit Custom GPTs der stärkere Hebel." } },
    { "@type": "Question", "name": "Wie lange dauert es, einen guten Custom GPT zu bauen?", "acceptedAnswer": { "@type": "Answer", "text": "Ein erster brauchbarer Custom GPT entsteht in 30 bis 45 Minuten. Eine wirklich gut abgestimmte Rolle braucht 2 bis 3 Iterationen über eine Woche, in der du das Verhalten beobachtest und nachsteuerst. Das 7-Kasten-System ist über 4 bis 6 Wochen aufgebaut, dann läuft es dauerhaft." } },
    { "@type": "Question", "name": "Was passiert mit meinen Daten in Custom GPTs?", "acceptedAnswer": { "@type": "Answer", "text": "In ChatGPT Plus werden Conversations standardmäßig zum Modelltraining genutzt. Das kannst du in den Einstellungen abschalten. Für sensible Klienten-Daten oder Geschäftsgeheimnisse empfehle ich ChatGPT Team mit Enterprise-Datenschutz oder die API mit eigenem Daten-Handling." } },
    { "@type": "Question", "name": "Wie verhindere ich, dass mein Custom GPT wie generisches ChatGPT klingt?", "acceptedAnswer": { "@type": "Answer", "text": "Drei Schritte: Erstens eine klare Stimm-Definition in den Instructions (Tabu-Begriffe, Satz-Länge, Beispiele für gute und schlechte Sätze). Zweitens hochgeladene Referenz-Texte von dir (10 bis 20 deiner besten Texte). Drittens ein Verhaltens-Skript: erst fragen, dann denken, dann antworten. Standard-ChatGPT-Sätze brauchen 2 bis 3 Korrektur-Runden, dann lernt der GPT deine Stimme." } }
  ]
});

const faq = [
  { q: "Was sind Custom GPTs und warum sind sie besser als der Standard-ChatGPT?", a: "Custom GPTs sind feste, wiederverwendbare Mini-Assistenten mit eigenem Kontext, eigener Stimme und eigenem Auftrag. Du baust sie einmal und sie werden Teil deines Studios. Der Standard-Chat zwingt dich, in jeder Session deinen Kontext neu zu erklären. Custom GPTs erinnern sich, kennen deine Marke und antworten in deiner Stimme. Das spart 10 bis 20 Minuten pro Tag und liefert konsistente Qualität." },
  { q: "Brauche ich Programmierkenntnisse für Custom GPTs?", a: "Nein. Custom GPTs werden in ChatGPT Plus oder Team direkt im Browser erstellt. Du füllst Felder aus: Name, Rolle, Instructions, hochgeladene Wissensdokumente. Kein Code. Was du brauchst ist Klarheit über deine Marke, deinen Ton und deine wiederkehrenden Aufgaben." },
  { q: "Was ist das 7-Kasten-System?", a: "Statt einem Universal-GPT baust du sieben spezialisierte Rollen: Content und Marke, Klienten-Kommunikation, Verkauf und Angebot, Strategie und Positionierung, Recherche und Analyse, Reflexion und Klarheit, Operations und Admin. Jede Rolle hat einen klaren Aufgabenbereich und arbeitet wie ein eingespieltes Team." },
  { q: "Lohnt sich ChatGPT Plus für Selbstständige?", a: "Wenn du Custom GPTs nutzen willst, brauchst du ChatGPT Plus oder Team. 20 Dollar pro Monat. Bei seriöser Nutzung von 2 bis 3 Stunden pro Tag bringt es leicht eine Stunde pro Tag an Zeitersparnis. Für die meisten Selbstständigen amortisiert sich das in der ersten Woche." },
  { q: "Wie unterscheidet sich ChatGPT von Claude für Solopreneure?", a: "Claude liefert oft präzisere Sprache und tiefere Analysen. ChatGPT hat den Vorteil der Custom GPTs als wiederverwendbares System. Für reine Textqualität ist Claude oft besser. Für den operativen Solo-Alltag mit wiederkehrenden Aufgaben ist ChatGPT mit Custom GPTs der stärkere Hebel." },
  { q: "Wie lange dauert es, einen guten Custom GPT zu bauen?", a: "Ein erster brauchbarer Custom GPT entsteht in 30 bis 45 Minuten. Eine wirklich gut abgestimmte Rolle braucht 2 bis 3 Iterationen über eine Woche, in der du das Verhalten beobachtest und nachsteuerst. Das 7-Kasten-System ist über 4 bis 6 Wochen aufgebaut, dann läuft es dauerhaft." },
  { q: "Was passiert mit meinen Daten in Custom GPTs?", a: "In ChatGPT Plus werden Conversations standardmäßig zum Modelltraining genutzt. Das kannst du in den Einstellungen abschalten. Für sensible Klienten-Daten oder Geschäftsgeheimnisse empfehle ich ChatGPT Team mit Enterprise-Datenschutz oder die API mit eigenem Daten-Handling." },
  { q: "Wie verhindere ich, dass mein Custom GPT wie generisches ChatGPT klingt?", a: "Drei Schritte: Erstens eine klare Stimm-Definition in den Instructions. Zweitens hochgeladene Referenz-Texte von dir (10 bis 20 deiner besten Texte). Drittens ein Verhaltens-Skript: erst fragen, dann denken, dann antworten. Standard-ChatGPT-Sätze brauchen 2 bis 3 Korrektur-Runden, dann lernt der GPT deine Stimme." },
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

export default function BlogChatGPTCustomGPTsPage() {
  return (
    <main className="flex flex-col w-full bg-pure-surface min-h-screen selection:bg-refined-gold selection:text-white pb-32">

      <Script id="schema-article" type="application/ld+json" strategy="beforeInteractive">{articleSchemaJson}</Script>
      <Script id="schema-person" type="application/ld+json" strategy="beforeInteractive">{personSchemaJson}</Script>
      <Script id="schema-faq" type="application/ld+json" strategy="beforeInteractive">{faqSchemaJson}</Script>

      <div className="pt-24 md:pt-32 w-full bg-[#2E2B26]"></div>

      {/* HERO */}
      <section className="relative w-full aspect-square md:aspect-[21/9] max-h-[800px] overflow-hidden bg-[#2E2B26]">
        <Image src="/blog/chatgpt-custom-gpts-richtig-nutzen/cover.jpg" alt="Holografisches KI-Cockpit als Symbol für Custom GPTs" fill className="object-cover opacity-90" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-pure-surface via-pure-surface/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-pure-surface/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full px-6 sm:px-12 md:px-24 pb-16 md:pb-24 max-w-[1400px] mx-auto z-10">
          <ScrollReveal>
            <Link href="/" aria-label="Sabala Mentoring — Startseite" className="inline-block mb-8 transition-opacity hover:opacity-80">
              <SabalaLogo light size={64} />
            </Link>
            <Link href="/blog" className="inline-flex items-center gap-2 text-warm-steel hover:text-refined-gold transition-colors font-mono text-xs uppercase tracking-widest mb-10">
              <ArrowLeft className="w-4 h-4" /> Zurück zum Journal
            </Link>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-widest text-refined-gold mb-6">
              <span className="bg-refined-gold/10 px-3 py-1 rounded-full border border-refined-gold/30">KI &amp; Workflow</span>
              <span className="text-deep-charcoal/80">April 2026</span>
              <span className="text-deep-charcoal/80 hidden sm:inline-block">•</span>
              <span className="text-deep-charcoal/80 hidden sm:inline-block">9 Min Lesezeit</span>
            </div>
            <h1 className="font-instrument text-[clamp(2.5rem,5vw,5rem)] text-deep-charcoal leading-[1.1] max-w-[1100px] mb-6">
              99% aller Selbstständigen nutzen ChatGPT falsch.
            </h1>
            <p className="text-warm-steel text-lg md:text-xl font-satoshi max-w-[750px] leading-relaxed">
              Fehlender Kontext, unstimmige Sprache, ein Textwall der nicht zum eigenen Ton passt. Warum der Default-Chat dich ausbremst und wie ein Custom-GPT-System mit klar definierten Rollen alles verändert.
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
              <li className="flex gap-4"><Bot className="w-5 h-5 text-refined-gold flex-shrink-0 mt-1" /><span>Der Default-ChatGPT-Chat zwingt dich, in jeder Session deinen Kontext neu zu erklären. <strong>10 bis 20 Minuten verloren, jeden Tag.</strong></span></li>
              <li className="flex gap-4"><Layers className="w-5 h-5 text-refined-gold flex-shrink-0 mt-1" /><span>Custom GPTs sind wiederverwendbare Mini-Assistenten mit eigenem Kontext, eigener Stimme und eigenem Auftrag.</span></li>
              <li className="flex gap-4"><Workflow className="w-5 h-5 text-refined-gold flex-shrink-0 mt-1" /><span>Das <strong>7-Kasten-System</strong> teilt deine Solo-Arbeit in sieben spezialisierte Rollen statt einem Universal-GPT.</span></li>
              <li className="flex gap-4"><Sparkles className="w-5 h-5 text-refined-gold flex-shrink-0 mt-1" /><span>Aufbau-Zeit: 4 bis 6 Wochen. Danach läuft das System dauerhaft. Eine Stunde Zeitersparnis pro Tag ist normal.</span></li>
            </ul>
          </div>
        </ScrollReveal>
      </section>

      {/* INTRO */}
      <section className="px-6 sm:px-12 md:px-24 pt-20 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <p className={`text-xl md:text-2xl font-light text-deep-charcoal !leading-[1.5] !mb-8 ${dropCapClass}`}>
              ChatGPT liegt mittlerweile in fast jedem Tab offen. Trotzdem höre ich von Coaches, Beratern und Solopreneuren immer wieder denselben Satz: <strong>Ich nutze es schon, aber irgendwie bringt es mich nicht weiter.</strong> Genau hier beginnt das eigentliche Thema.
            </p>

            <h2>Was die meisten falsch machen</h2>
            <p><strong>Wer ChatGPT im Default-Chat öffnet und einfach lostippt, läuft in immer dieselben fünf Sackgassen.</strong> Diese Sackgassen sind keine Tool-Probleme. Sie sind Nutzungs-Probleme. Und genau deshalb lassen sich alle fünf lösen.</p>
            <ul>
              <li><strong>Fehlender Kontext.</strong> Bei jeder neuen Sitzung muss von vorne erklärt werden, wer du bist, wem du dienst, wie deine Marke klingt. Diese Wiederholung kostet täglich 10 bis 20 Minuten und macht müde, bevor die eigentliche Arbeit beginnt.</li>
              <li><strong>Sprache nicht stimmig.</strong> Die Standard-Antworten klingen wie ein durchschnittlicher LinkedIn-Post: glatt, generisch, austauschbar. Nichts davon trägt deine Handschrift.</li>
              <li><strong>Manipulative Tonalität.</strong> Verkaufstexte schießen mit Druck-Vokabeln raus. Jetzt, exklusiv, nur heute. Wer bewusst und werteorientiert positioniert ist, schreibt das nicht. Will das nicht.</li>
              <li><strong>Direkter Textwall.</strong> Auf jede Frage kommt sofort ein 600-Wörter-Block. Statt zu denken, beginnt man zu kürzen, zu redigieren, zu unterbrechen. Der Arbeitsfluss bricht zusammen, bevor er entstehen konnte.</li>
              <li><strong>Kein wiederkehrender Prozess.</strong> Jede Aufgabe wird neu erfunden. Newsletter, Reels-Skripte, Angebotsmails, Klienten-Onboarding. Bei jedem Durchlauf der gleiche Re-Aufwand.</li>
            </ul>
            <p>Das Ergebnis: ChatGPT wird zum besseren Lexikon, nicht zum echten Hebel. Die meisten Selbstständigen verlieren mehr Energie an die KI, als sie zurückbekommen.</p>
          </div>
        </ScrollReveal>
      </section>

      <PullQuote>
        Ein guter Workflow erkennst du daran, dass du nicht mehr nachdenken musst, wann du KI nutzt. Es passiert einfach.
      </PullQuote>

      <section className="px-6 sm:px-12 md:px-24 pt-12 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Warum ChatGPT (noch) Claude und Co. schlägt</h2>
            <p className={dropCapClass}><strong>Ich werde regelmäßig gefragt: sollte ich nicht lieber auf Claude umsteigen?</strong> Die ehrliche Antwort: Für sprachliche Tiefe und längere Analysen ist Claude oft präziser. Für deinen <strong>operativen Solo-Alltag</strong> ist ChatGPT trotzdem der bessere Hebel. Und der Grund ist nicht die Modellqualität.</p>
            <p>Es sind die <strong>Custom GPTs</strong>: feste, wiederverwendbare Mini-Assistenten mit eigenem Kontext, eigener Stimme und eigenem Auftrag. Du baust sie einmal und sie sind Teil deines Studios. Dauerhaft. Verfügbar in einem Klick. Ohne dass du dich jedes Mal neu erklären musst.</p>
          </div>
        </ScrollReveal>
      </section>

      <GoldDivider />

      <section className="px-6 sm:px-12 md:px-24 pt-4 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Das Konzept: Sieben Rollen statt einem Universal-Helfer</h2>
            <p><strong>In meinem Mentoring arbeite ich mit Selbstständigen an einem System, das ich das 7-Kasten-GPT nenne.</strong> Angelehnt an die wiederkehrenden Aufgabenfelder, die wirklich jeder Solopreneur hat. Statt einen Universal-GPT zu bauen, der alles ein bisschen kann, definieren wir sieben spezialisierte Rollen mit jeweils:</p>
            <ul className="list-disc pl-6">
              <li>klar umrissenem Aufgabenfeld</li>
              <li>eigener Stimme und Tonalität (deine Markenstimme, nicht ChatGPT-Standard)</li>
              <li>festem Kontext-Briefing zu deiner Positionierung, deinen Werten, deinen Klienten</li>
              <li>einem Verhaltens-Skript: erst fragen, dann denken, dann antworten</li>
            </ul>
            <p>Das Ergebnis ist kein Chatbot mehr. Es ist ein Team. Jedes Mitglied übernimmt einen festen Bereich deines Tagesgeschäfts und arbeitet so, wie du arbeiten würdest, wenn du Zeit hättest.</p>
          </div>
        </ScrollReveal>
      </section>

      {/* HIGHLIGHT CARD · DIE 7 KÄSTEN */}
      <section className="px-6 sm:px-12 md:px-24 pt-16 max-w-[1100px] mx-auto w-full">
        <ScrollReveal delay={0.2}>
          <div className="bg-white border-2 border-warm-light hover:border-refined-gold/40 p-8 md:p-12 rounded-[2rem] shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-refined-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-warm-light rounded-2xl flex items-center justify-center shrink-0">
                  <Layers className="w-8 h-8 text-refined-gold" />
                </div>
                <div>
                  <h3 className="font-instrument text-3xl text-deep-charcoal">Das 7-Kasten-System</h3>
                  <span className="text-sm font-mono tracking-widest text-warm-steel uppercase">Sieben Rollen für dein KI-Team</span>
                </div>
              </div>
              <p className="text-warm-steel text-[1.1rem] leading-relaxed mb-8">
                Jede Rolle löst einen Bereich, in dem fast jeder Selbstständige täglich Energie verliert. Statt einem riesigen Default-GPT bekommst du sieben kleine Spezialisten, die zusammen wie ein eingespieltes Team arbeiten.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3"><Sparkles className="w-5 h-5 text-refined-gold mt-1 shrink-0" /><span className="text-deep-charcoal"><strong>Content und Marke:</strong> Reels-Skripte, Newsletter, LinkedIn-Posts in deiner echten Stimme, nicht im KI-Standard.</span></li>
                <li className="flex items-start gap-3"><Sparkles className="w-5 h-5 text-refined-gold mt-1 shrink-0" /><span className="text-deep-charcoal"><strong>Klienten-Kommunikation:</strong> Angebotsmails, Erinnerungen, Onboarding-Sequenzen, wertschätzend, nicht manipulativ.</span></li>
                <li className="flex items-start gap-3"><Sparkles className="w-5 h-5 text-refined-gold mt-1 shrink-0" /><span className="text-deep-charcoal"><strong>Verkauf und Angebot:</strong> Pakete strukturieren, Pricing-Logik prüfen, Verkaufsgespräche vorbereiten.</span></li>
                <li className="flex items-start gap-3"><Sparkles className="w-5 h-5 text-refined-gold mt-1 shrink-0" /><span className="text-deep-charcoal"><strong>Strategie und Positionierung:</strong> Sparringspartner für die Frage Macht das wirklich Sinn? bevor du Wochen verschwendest.</span></li>
                <li className="flex items-start gap-3"><Sparkles className="w-5 h-5 text-refined-gold mt-1 shrink-0" /><span className="text-deep-charcoal"><strong>Recherche und Analyse:</strong> Marktbeobachtung, Mitbewerber, Trends, verdichtet auf das, was für dich relevant ist.</span></li>
                <li className="flex items-start gap-3"><Sparkles className="w-5 h-5 text-refined-gold mt-1 shrink-0" /><span className="text-deep-charcoal"><strong>Reflexion und Klarheit:</strong> Tagesabschluss, Wochenplanung, ehrliche Spiegelung, der ruhige Sparringspartner.</span></li>
                <li className="flex items-start gap-3"><Sparkles className="w-5 h-5 text-refined-gold mt-1 shrink-0" /><span className="text-deep-charcoal"><strong>Operations und Admin:</strong> Buchhaltungs-Vorab-Checks, Tool-Recherche, To-Do-Strukturierung, die unsichtbare Arbeit, die Energie zieht.</span></li>
              </ul>
              <div className="mt-10">
                <Link href="/gpt-team" className="inline-flex items-center justify-center bg-deep-charcoal text-white rounded-full px-8 py-4 font-medium hover:bg-refined-gold transition-colors shadow-lg">
                  Mein KI-Team kennenlernen
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Visueller Anker */}
      <section className="px-6 sm:px-12 md:px-24 pt-12 max-w-[1100px] mx-auto w-full">
        <ScrollReveal>
          <div className="aspect-[16/9] relative rounded-2xl overflow-hidden border border-refined-gold/15">
            <Image src="/blog/chatgpt-custom-gpts-richtig-nutzen/assistant.jpg" alt="Skizze: ein kleiner KI-Assistent wird auf einer Werkbank aus beschrifteten Schubladen zusammengebaut" fill className="object-cover" />
          </div>
        </ScrollReveal>
      </section>

      {/* GAMECHANGER */}
      <section className="px-6 sm:px-12 md:px-24 pt-20 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Warum genau das ein Gamechanger für Selbstständige ist</h2>
            <p className={dropCapClass}><strong>Solopreneure haben kein Personalbüro, keine Marketing-Abteilung, keinen Vertriebsleiter.</strong> Aber sie haben dieselben wiederkehrenden Aufgaben wie jedes andere Unternehmen, nur müssen sie sie alle selbst tragen.</p>
            <p>Genau hier setzt das System an. Ein gut gebautes Custom-GPT ersetzt keine deiner Werte und keine deiner Beziehungen. Aber es übernimmt die Reibung, die zwischen Idee und Umsetzung liegt. Es ist der Unterschied zwischen <strong>Ich müsste mal</strong> und <strong>Ist gemacht</strong>.</p>
            <p>Konkret bedeutet das im Alltag:</p>
            <ul className="list-disc pl-6">
              <li>Ein Newsletter-Entwurf in 10 Minuten, in deiner Stimme, nicht im ChatGPT-Standard.</li>
              <li>Ein Klienten-Angebot, das nicht klingt wie ein Funnel.</li>
              <li>Eine Reflexionsfrage am Ende des Tages, die wirklich passt, weil dein KI-Sparringspartner deine Saison kennt.</li>
              <li>Ein Marken-Tonalitäts-Wächter, der dir sagt: Diese Formulierung ist nicht du.</li>
            </ul>
          </div>
        </ScrollReveal>
      </section>

      <PullQuote>
        Ein Custom-GPT ersetzt keine deiner Werte. Es übernimmt die Reibung, die zwischen Idee und Umsetzung liegt.
      </PullQuote>

      {/* DER PUNKT */}
      <section className="px-6 sm:px-12 md:px-24 pt-4 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Der Punkt, an dem sich alles ändert</h2>
            <p><strong>Die meisten Selbstständigen, mit denen ich arbeite, kennen den Moment:</strong> Sie öffnen morgens den Laptop, atmen einmal tief durch und wissen sofort, was zu tun ist. Der Grund ist nicht eine längere To-Do-Liste. Es sind ihre Werkzeuge, die auf sie warten. Vorbereitet. Im richtigen Ton. Mit dem richtigen Kontext.</p>
            <p>Das ist kein KI-Trend. Das ist Infrastruktur. Genauso wie ein gutes <Link href="/blog/technik-setup-online-coach">Technik-Setup</Link> dir energetische Klarheit in jedem Call gibt, gibt dir ein sauberes KI-Team Klarheit in jedem Arbeitsblock. Und wer das mit einer durchdachten <Link href="/blog/seo-und-geo-fuer-personal-brands-2026">SEO- und GEO-Strategie</Link> kombiniert, baut Personal-Brand-Sichtbarkeit, die im Schlaf weiterarbeitet.</p>
            <p>Wer einmal so gearbeitet hat, will nicht mehr zurück. Und genau das ist der Hebel, den 99 Prozent der Selbstständigen heute liegen lassen.</p>
          </div>
        </ScrollReveal>
      </section>

      {/* FAQ */}
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

      {/* CTA */}
      <section className="px-6 md:px-12 mt-24 max-w-[1000px] mx-auto w-full">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#2E2B26] border border-white/10 p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 group shadow-[0_30px_60px_rgba(0,0,0,0.1)]">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-refined-gold/5 lg:from-refined-gold/10 pointer-events-none transition-opacity duration-700 opacity-50 group-hover:opacity-100"></div>
            <div className="flex-1 relative z-10 text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                <Workflow className="w-5 h-5 text-refined-gold" />
                <span className="text-xs font-mono tracking-widest uppercase text-refined-gold">Mein KI-Team arbeitet jeden Tag mit mir</span>
              </div>
              <h3 className="font-instrument text-3xl md:text-4xl text-white mb-6">Vielleicht bald auch für dich.</h3>
              <p className="text-white/60 font-satoshi text-lg leading-relaxed mb-8">
                Mooni, Aurel, Lia und die anderen begleiten meine Arbeit — Recherche, Texte, Strategie, Brand-Voice. Wenn du selbst so ein Team willst: ich baue customized AI Agents auf deine Brand, deine Aufgaben, deine Stimme zugeschnitten. Mit deinen Werten, deinen wirklichen Aufgaben.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link href="/gpt-team" className="inline-flex items-center gap-2 bg-refined-gold text-deep-charcoal hover:bg-white px-8 py-4 transition-colors font-medium rounded-full w-full sm:w-auto justify-center">
                  <Zap className="w-4 h-4" /> Mein KI-Team kennenlernen
                </Link>
                <Link href="/termin-buchen" className="text-white/80 hover:text-white px-6 py-4 transition-colors font-medium border border-white/10 rounded-full hover:bg-white/5 w-full sm:w-auto text-center">
                  Eigenes Team bauen lassen
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <BlogSpokes slugs={["webseiten-bau-mit-claude-anfaenger", "claude-code-weniger-code-ponytail", "webseite-mit-ki-bauen-2026"]} />
    </main>
  );
}
