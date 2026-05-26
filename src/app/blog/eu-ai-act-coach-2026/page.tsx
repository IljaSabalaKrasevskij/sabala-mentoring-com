import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Link from "next/link";
import Script from "next/script";
import { ArrowLeft, Sparkles, AlertTriangle } from "lucide-react";

const slug = "eu-ai-act-coach-2026";
const url = `https://sabala-mentoring.com/blog/${slug}`;
const datePublished = "2026-05-27";

export const metadata = {
  title: "EU AI Act ab August 2026: Was Coaches jetzt klären müssen",
  description:
    "Der EU AI Act ist ab 2. August 2026 vollständig anwendbar. Was Coaches, Berater und Selbstständige in den nächsten 8 Wochen konkret tun müssen.",
  alternates: { canonical: url },
  openGraph: {
    title: "EU AI Act ab August 2026 für Coaches",
    description: "Acht Wochen bis volle Anwendbarkeit. Was du jetzt klären musst.",
    type: "article",
    publishedTime: datePublished,
    url,
  },
};

const articleSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "EU AI Act ab August 2026: Was Coaches jetzt klären müssen",
  description: "Der EU AI Act ist ab 2. August 2026 vollständig anwendbar. Was Coaches konkret tun müssen.",
  author: { "@type": "Person", name: "Ilja Krasevskij", url: "https://sabala-mentoring.com/ueber-mich" },
  publisher: { "@type": "Organization", name: "Sabala Mentoring" },
  datePublished,
  dateModified: datePublished,
  mainEntityOfPage: { "@type": "WebPage", "@id": url },
});

const faq = [
  {
    q: "Muss ich auf meiner Webseite angeben, dass ich KI nutze?",
    a: "Ja, für alle Inhalte, die mit AI generiert oder überarbeitet wurden, gilt eine Transparenz-Pflicht ab August 2026. Das gilt für Texte, Bilder und AI-Chatbots. Nicht für Werkzeuge, die du nur zur Recherche oder Editierung nutzt (z.B. Grammatik-Check).",
  },
  {
    q: "Was ist ein Hoch-Risiko-KI-System?",
    a: "AI-Systeme in kritischen Bereichen: Bewerber-Auswahl, Bonitätsprüfung, medizinische Diagnostik, Bildungsbewertung. Coaches sind in der Regel NICHT in dieser Kategorie. Wenn du AI für Persönlichkeits-Diagnostik mit formaler Auswertung nutzt, bist du im Graubereich.",
  },
  {
    q: "Gilt der AI Act auch für ChatGPT-Nutzung in Coachings?",
    a: "Wenn du ChatGPT als Werkzeug nutzt (z.B. für Brainstorming, Konzept-Entwicklung), bist du in Kategorie 4 (Minimal-Risiko). Wenn du AI-Coaching anbietest (z.B. ein Chatbot, der Klienten direkt coacht), bist du in Kategorie 3 (Transparenz-Pflicht) oder ggf. Hoch-Risiko, je nach Anwendung.",
  },
  {
    q: "Was kostet ein Verstoß?",
    a: "Theoretisch bis 35 Millionen Euro oder 7 Prozent vom Jahresumsatz. Realistisch für Einzel-Coaches: das größte Risiko sind Abmahnungen durch Wettbewerbszentralen wegen unzureichender AI-Kennzeichnung, typischerweise im niedrigen vierstelligen Bereich.",
  },
  {
    q: "Gilt der AI Act auch außerhalb der EU?",
    a: "Der AI Act gilt für alle AI-Systeme, die in der EU eingesetzt werden, unabhängig vom Sitz des Anbieters. Wenn du als deutsche Coach AI nutzt, gilt der AI Act für dich. Wenn du als nicht-EU-Coach Kunden in der EU bedienst, ebenfalls.",
  },
];

const faqSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

const proseBlock =
  "prose prose-lg md:prose-xl prose-stone max-w-none font-satoshi leading-[1.85] text-warm-steel prose-headings:font-instrument prose-headings:text-deep-charcoal prose-strong:text-deep-charcoal prose-a:text-refined-gold prose-a:no-underline hover:prose-a:underline prose-h2:font-instrument prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-20 prose-h2:mb-8 prose-h2:leading-[1.15] prose-h3:font-instrument prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-5 prose-p:mb-6 prose-ul:my-6 prose-li:mb-2 prose-li:leading-[1.7]";

export default function BlogEuAiActCoachPage() {
  return (
    <main className="flex flex-col w-full bg-pure-surface min-h-screen selection:bg-refined-gold selection:text-white pb-32">
      <Script id="schema-article" type="application/ld+json" strategy="beforeInteractive">{articleSchemaJson}</Script>
      <Script id="schema-faq" type="application/ld+json" strategy="beforeInteractive">{faqSchemaJson}</Script>

      <div className="pt-24 md:pt-32 w-full bg-[#08070a]"></div>

      <section className="relative w-full min-h-[55vh] md:min-h-[65vh] bg-[#08070a] overflow-hidden flex items-end">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2E2B26]/70 via-[#15110b] to-[#08070a]" />
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-refined-gold/[0.12] blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-[160px] bg-gradient-to-t from-pure-surface via-pure-surface/40 to-transparent pointer-events-none" />

        <div className="relative z-10 px-6 sm:px-12 md:px-24 max-w-[1400px] mx-auto pt-32 pb-24 md:pb-28 w-full">
          <ScrollReveal>
            <Link href="/blog" className="inline-flex items-center gap-2 text-pure-surface/70 hover:text-refined-gold transition-colors font-mono text-xs uppercase tracking-widest mb-10">
              <ArrowLeft className="w-4 h-4" /> Zurück zum Journal
            </Link>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-widest text-refined-gold mb-6">
              <span className="bg-refined-gold/10 px-3 py-1 rounded-full border border-refined-gold/30">Recht &amp; KI</span>
              <span className="text-pure-surface/70">Mai 2026</span>
              <span className="text-pure-surface/70 hidden sm:inline-block">•</span>
              <span className="text-pure-surface/70 hidden sm:inline-block">7 Min Lesezeit</span>
            </div>
            <h1 className="font-instrument text-[clamp(2.5rem,5vw,5rem)] text-pure-surface leading-[1.05] max-w-[1100px] mb-6">
              EU AI Act ab August 2026: <span className="italic text-refined-gold">Was Coaches jetzt klären müssen.</span>
            </h1>
            <p className="text-pure-surface/70 text-lg md:text-xl font-satoshi max-w-[760px] leading-relaxed">
              Am 2. August 2026 ist der EU AI Act vollständig anwendbar. Acht Wochen ab heute. Wenn du AI-Tools in deiner Praxis nutzt, betrifft dich das. Hier ist, was du jetzt klären solltest.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-6 sm:px-12 md:px-24 pt-16 max-w-[860px] mx-auto w-full">
        <ScrollReveal>
          <div className="bg-warm-light/40 border-l-2 border-refined-gold p-8 md:p-10 rounded-r-lg">
            <p className="font-mono text-xs uppercase tracking-widest text-refined-gold mb-6">Quick Answer in 3 Sätzen</p>
            <p className="font-satoshi text-deep-charcoal text-lg leading-relaxed">
              Der EU AI Act ist ab 2. August 2026 vollständig anwendbar und gilt für jede:n, der AI-Tools in der EU einsetzt, auch für Einzel-Coaches. Er ergänzt die DSGVO, ersetzt sie nicht. Was du konkret tun musst: AI-Tool-Inventar machen, Transparenz-Pflicht auf der Webseite umsetzen, Risiko-Kategorie deiner Anwendung prüfen, Dokumentation anlegen. Bußgelder gehen bis 35 Millionen Euro für Verstöße, aber realistisch sind erste Prüfungen 2027.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <section className="px-6 sm:px-12 md:px-24 pt-20 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Was ist der EU AI Act eigentlich?</h2>
            <p><strong>Der EU AI Act ist die erste umfassende KI-Regulierung der Welt.</strong> Er trat am 1. August 2024 in Kraft und wird in Stufen anwendbar:</p>
            <ul>
              <li><strong>Februar 2025</strong>: Verbote bestimmter AI-Praktiken (z.B. Social Scoring, manipulative KI)</li>
              <li><strong>August 2025</strong>: Pflichten für General Purpose AI (GPT-4, Claude, Gemini)</li>
              <li><strong>August 2026</strong>: Vollständige Anwendung für Hoch-Risiko-Systeme und alle anderen Bereiche</li>
            </ul>
            <p>Der AI Act ist kein KI-Verbot. Er ist ein <strong>Risiko-basierter Rahmen</strong>: je höher das Risiko deiner AI-Anwendung, desto mehr Pflichten hast du. Bei minimal-riskanten Anwendungen (Spam-Filter, Grammatik-Check) hast du fast keine Pflichten. Bei Hoch-Risiko-Systemen (Bewerber-Screening, Kreditbewertung) hast du strenge Dokumentations-, Test- und Transparenz-Pflichten.</p>
            <p>Wichtig: <strong>der AI Act ersetzt die DSGVO nicht.</strong> Beide gelten parallel. Eine zweite Reform-Welle 2026 betrifft auch das Cookie-Banner-Regime: <Link href="/blog/dsgvo-cookie-banner-reform-2026">was die DSGVO-Reform 2026 fuer dich bedeutet</Link>, habe ich separat aufgeschrieben.</p>

            <h2>Die 4 Risiko-Kategorien</h2>

            <h3>Kategorie 1: Verbotene Praktiken</h3>
            <p>Bestimmte AI-Anwendungen sind seit Februar 2025 verboten: Social Scoring durch Behörden, manipulative AI gegen den Willen der Person, massenhafte Gesichtserkennung im öffentlichen Raum. <strong>Für Coaches: in der Regel nicht betroffen.</strong></p>

            <h3>Kategorie 2: Hoch-Risiko-Systeme</h3>
            <p>AI-Systeme in kritischen Bereichen: Bewerber-Auswahl, Bonitätsprüfung, medizinische Diagnostik, Bildungsbewertung. <strong>Für Coaches: selten betroffen</strong>, außer du nutzt AI für formale Eignungs-Diagnostik.</p>

            <h3>Kategorie 3: Begrenztes Risiko (Transparenz-Pflicht)</h3>
            <p>AI-Systeme, die mit Menschen interagieren oder Inhalte generieren: Chatbots, AI-generierte Texte (Blog-Artikel mit ChatGPT), AI-generierte Bilder, Deepfakes. <strong>Das ist die wahrscheinliche Kategorie für dich.</strong> Wenn du ChatGPT für Blog-Texte, AI-Bilder für deine Webseite oder einen AI-Chatbot nutzt, hast du Transparenz-Pflichten.</p>

            <h3>Kategorie 4: Minimal-Risiko</h3>
            <p>Alle anderen Anwendungen (Spam-Filter, Grammatik-Check, Empfehlungssysteme). <strong>Viele alltägliche Tools fallen hier rein.</strong> Keine spezifischen AI-Act-Pflichten.</p>
          </div>
        </ScrollReveal>
      </section>

      <section className="px-6 sm:px-12 md:px-24 pt-12 max-w-[1100px] mx-auto w-full">
        <ScrollReveal>
          <h2 className="font-instrument text-3xl md:text-5xl text-deep-charcoal text-center mb-4 leading-tight">
            Was du in 8 Wochen <span className="italic text-refined-gold">konkret tun solltest.</span>
          </h2>
          <p className="text-warm-steel font-satoshi text-center max-w-[640px] mx-auto mb-16">
            Fünf Schritte. Realistisch in einem Nachmittag erledigbar.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {[
            { num: "01", title: "AI-Tool-Inventar", body: "Liste alle AI-Tools auf, die du nutzt: ChatGPT, Claude, Midjourney, KIE AI, Otter, Fathom, Calendly mit AI-Features. Pro Tool dokumentieren: Was tut es? Welche Daten gehen rein? Wo gespeichert?" },
            { num: "02", title: "Transparenz-Pflicht umsetzen", body: "Wenn du AI-Texte oder AI-Bilder nutzt, kennzeichne das. Beispiel: Blog-Artikel-Ende „Erstellt mit Unterstützung von Claude, manuell überarbeitet“. AI-Bilder im Alt-Text als AI-generiert markieren. AI-Chatbots am Anfang als AI ausweisen." },
            { num: "03", title: "Datenschutz-Erklärung prüfen", body: "Wenn deine AI-Tools personenbezogene Daten verarbeiten, muss das in der Datenschutz-Erklärung stehen: Welche Tools, wo verarbeitet (EU/USA), Rechtsgrundlage, Speicherdauer." },
            { num: "04", title: "Pflicht-Schulung dokumentieren", body: "Wer AI nutzt, sollte AI-kompetent sein. Dokumentiere kurz, dass du dich mit den Grundlagen deiner Tools beschäftigt hast. Eine Notiz in den Geschäftsunterlagen reicht." },
            { num: "05", title: "AI-Richtlinie anlegen", body: "Wenn du jemals einen Audit hast: zeige deine AI-Politik. Eine einseitige interne AI-Richtlinie mit Tool-Liste, Transparenz-Maßnahmen und Verantwortlichkeiten reicht." },
          ].map((item) => (
            <ScrollReveal key={item.num}>
              <div className="h-full bg-warm-light/30 border border-refined-gold/15 hover:border-refined-gold/40 transition-all duration-500 rounded-[24px] p-7 md:p-8 group">
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-refined-gold text-xs tracking-[0.22em] uppercase font-bold">{item.num}</span>
                  <div className="w-10 h-10 rounded-full bg-refined-gold/10 border border-refined-gold/30 flex items-center justify-center group-hover:bg-refined-gold/20 transition-colors">
                    <Sparkles className="w-4 h-4 text-refined-gold" />
                  </div>
                </div>
                <h3 className="font-instrument text-2xl md:text-[1.5rem] text-deep-charcoal mb-4 leading-tight">{item.title}</h3>
                <p className="font-satoshi text-warm-steel text-base leading-[1.7]">{item.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="px-6 sm:px-12 md:px-24 pt-24 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Was passiert, wenn du nichts tust?</h2>
            <ul>
              <li><strong>Bußgelder theoretisch bis 35 Millionen Euro</strong> oder 7 Prozent vom Jahresumsatz.</li>
              <li><strong>Realistisch für Einzel-Coaches</strong>: erste Prüfungen ab 2027, vermutlich nach Beschwerden.</li>
              <li><strong>Höhere Wahrscheinlichkeit</strong>: Abmahnung durch Wettbewerbszentrale wegen fehlender AI-Kennzeichnung.</li>
            </ul>
            <p>Mein eigenes Vorgehen: AI-Bilder im Sabala-Blog seit Februar 2026 gekennzeichnet, AI-Hinweis im Newsletter-Footer, AI-Stack intern dokumentiert. Aufwand: einmalig 2 Stunden plus 5 Minuten pro Veröffentlichung. Wer AI bewusst und verantwortungsvoll in der Praxis einsetzen will, schaut sich auch <Link href="/blog/chatgpt-custom-gpts-richtig-nutzen">Custom GPTs als strukturiertes AI-System</Link> an. Strukturierte Custom GPTs sind transparenter als Default-ChatGPT-Sessions, was im AI-Act-Audit hilft.</p>

            <h2>Was bedeutet das für deine Webseite konkret?</h2>
            <p>Drei sichtbare Änderungen empfehle ich:</p>
            <ol>
              <li><strong>AI-Hinweis im Footer oder Impressum</strong>: „Diese Webseite nutzt AI-Tools für Code-Generierung und Illustration. Texte sind menschlich verfasst und manuell überarbeitet.“</li>
              <li><strong>Kennzeichnung pro Blog-Artikel</strong>: wenn AI-Unterstützung genutzt, kurze Notiz am Ende.</li>
              <li><strong>Datenschutz-Erklärung erweitern</strong>: AI-Tool-Liste plus Verarbeitungs-Hinweise.</li>
            </ol>
            <p>Drei Änderungen, einmaliger Aufwand etwa 1 Stunde, lebenslange Compliance.</p>
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
                <AlertTriangle className="w-5 h-5 text-refined-gold" />
                <span className="text-xs font-mono tracking-widest uppercase text-refined-gold">AI Act Compliance + Premium-Auftritt</span>
              </div>
              <h3 className="font-instrument text-3xl md:text-4xl text-white mb-6">Klarheit statt raten.</h3>
              <p className="text-white/60 font-satoshi text-lg leading-relaxed mb-8">
                Wenn du AI in deiner Praxis nutzt und sicherstellen willst, dass deine Webseite, dein Marketing und deine Tools AI-Act-konform sind, sprechen wir am besten in einem Beratungsgespraech daruber. Compliance-Check ist Teil meiner technischen Begleitung. Wer AI-Workflows aufbauen will, schaut sich auch mein KI-Team an.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link href="/termin-buchen" className="inline-flex items-center justify-center gap-2 bg-refined-gold text-deep-charcoal hover:bg-white px-8 py-4 transition-colors font-medium rounded-full w-full sm:w-auto">
                  Beratungsgespräch buchen
                </Link>
                <Link href="/gpt-team" className="text-white/80 hover:text-white px-6 py-4 transition-colors font-medium border border-white/10 rounded-full hover:bg-white/5 w-full sm:w-auto text-center">
                  KI-Team kennenlernen
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
