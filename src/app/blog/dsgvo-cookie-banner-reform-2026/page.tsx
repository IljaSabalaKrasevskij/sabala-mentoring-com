import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Link from "next/link";
import Script from "next/script";
import { ArrowLeft, Sparkles, Shield } from "lucide-react";

const slug = "dsgvo-cookie-banner-reform-2026";
const url = `https://sabala-mentoring.com/blog/${slug}`;
const datePublished = "2026-05-27";

export const metadata = {
  title: "Cookie-Banner ade? DSGVO-Reform 2026 + warum cookie-frei jetzt Premium ist",
  description:
    "Die EU plant 2026 eine DSGVO-Reform, die Cookie-Banner entschärft. Warum cookie-frei trotzdem der Premium-Standard ist, mit konkretem Stack für Coaches.",
  alternates: { canonical: url },
  openGraph: {
    title: "Cookie-Banner ade? Was die DSGVO-Reform 2026 ändert",
    description: "Cookie-frei ist Premium-Standard, mit oder ohne Reform.",
    type: "article",
    publishedTime: datePublished,
    url,
  },
};

const articleSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Cookie-Banner ade? DSGVO-Reform 2026 + warum cookie-frei jetzt erst recht Premium ist",
  description: "Reform-Stand, cookie-freier Premium-Stack, konkrete Migration-Schritte.",
  author: { "@type": "Person", name: "Ilja Krasevskij", url: "https://sabala-mentoring.com/ueber-mich" },
  publisher: { "@type": "Organization", name: "Sabala Mentoring" },
  datePublished,
  dateModified: datePublished,
  mainEntityOfPage: { "@type": "WebPage", "@id": url },
});

const faq = [
  {
    q: "Brauche ich auch ohne Cookies einen Cookie-Banner?",
    a: "Nein, nicht zwingend. Wenn deine Webseite KEINE personenbezogenen Cookies setzt und KEINE personenbezogenen Daten über Tracking-Pixel sammelt, brauchst du keinen Cookie-Banner. Hosting-Plattformen wie Vercel oder Netlify setzen out-of-the-box keine solchen Cookies.",
  },
  {
    q: "Wie tracke ich Besucher ohne Google Analytics?",
    a: "Plausible, Umami oder Fathom sind die drei Standard-Alternativen 2026. Sie tracken anonymisiert, ohne personenbezogene Daten. Du bekommst alle relevanten Metriken (Page Views, Verweildauer, Referrer, Conversions), aber keine demografischen Schätzungen.",
  },
  {
    q: "Was sind die Vorteile von cookie-frei für SEO?",
    a: "Indirekt mehrere: bessere PageSpeed (kein Cookie-Banner-Script blockt Rendering), bessere Core Web Vitals, bessere Mobile-Experience, kein „interstitial penalty“ durch das Banner. Google rankt Seiten ohne Cookie-Banner-Blocker tendenziell höher.",
  },
  {
    q: "Was bedeutet die DSGVO-Reform 2026 für mich konkret?",
    a: "Wenn du bereits cookie-frei läufst: nichts. Wenn du Cookie-Banner einsetzt: du musst bis zur Reform-Verabschiedung (vermutlich 2027) nichts ändern, danach könnten Banner-Pflichten für reine Analytik wegfallen. Praktisch besser: schon jetzt umstellen, dann hast du keinen Reform-Stress.",
  },
  {
    q: "Kann ich von Cookies komplett wegmigrieren, wenn ich aktuell Google Analytics nutze?",
    a: "Ja. Plausible und Umami bieten Migrations-Anleitungen. Daten der Vergangenheit gehen nicht mit, aber ab Migrations-Zeitpunkt hast du saubere cookie-freie Daten. In Premium-Setups installiere ich beide einen Monat parallel, sodass du den Unterschied siehst.",
  },
];

const faqSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

const proseBlock =
  "prose prose-lg md:prose-xl prose-stone max-w-none font-satoshi leading-[1.85] text-warm-steel prose-headings:font-instrument prose-headings:text-deep-charcoal prose-strong:text-deep-charcoal prose-a:text-refined-gold prose-a:no-underline hover:prose-a:underline prose-h2:font-instrument prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-20 prose-h2:mb-8 prose-h2:leading-[1.15] prose-h3:font-instrument prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-5 prose-p:mb-6 prose-ul:my-6 prose-li:mb-2 prose-li:leading-[1.7]";

export default function BlogDsgvoCookieBannerPage() {
  return (
    <main className="flex flex-col w-full bg-pure-surface min-h-screen selection:bg-refined-gold selection:text-white pb-32">
      <Script id="schema-article" type="application/ld+json" strategy="beforeInteractive">{articleSchemaJson}</Script>
      <Script id="schema-faq" type="application/ld+json" strategy="beforeInteractive">{faqSchemaJson}</Script>

      <div className="pt-24 md:pt-32 w-full bg-[#08070a]"></div>

      <section className="relative w-full min-h-[55vh] md:min-h-[65vh] bg-[#08070a] overflow-hidden flex items-end">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2E2B26]/70 via-[#15110b] to-[#08070a]" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-refined-gold/[0.12] blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-[160px] bg-gradient-to-t from-pure-surface via-pure-surface/40 to-transparent pointer-events-none" />

        <div className="relative z-10 px-6 sm:px-12 md:px-24 max-w-[1400px] mx-auto pt-32 pb-24 md:pb-28 w-full">
          <ScrollReveal>
            <Link href="/blog" className="inline-flex items-center gap-2 text-pure-surface/70 hover:text-refined-gold transition-colors font-mono text-xs uppercase tracking-widest mb-10">
              <ArrowLeft className="w-4 h-4" /> Zurück zum Journal
            </Link>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-widest text-refined-gold mb-6">
              <span className="bg-refined-gold/10 px-3 py-1 rounded-full border border-refined-gold/30">DSGVO &amp; Cookie-frei</span>
              <span className="text-pure-surface/70">Mai 2026</span>
              <span className="text-pure-surface/70 hidden sm:inline-block">•</span>
              <span className="text-pure-surface/70 hidden sm:inline-block">7 Min Lesezeit</span>
            </div>
            <h1 className="font-instrument text-[clamp(2.5rem,5vw,5rem)] text-pure-surface leading-[1.05] max-w-[1100px] mb-6">
              Cookie-Banner ade? Was die DSGVO-Reform 2026 ändert <span className="italic text-refined-gold">und warum cookie-frei jetzt erst recht Premium ist.</span>
            </h1>
            <p className="text-pure-surface/70 text-lg md:text-xl font-satoshi max-w-[760px] leading-relaxed">
              Die EU plant 2026 eine Lockerung der Cookie-Banner-Pflicht. Klingt nach Erlösung, ist es nicht. Hier ist, warum cookie-frei jetzt erst recht der Premium-Standard ist.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-6 sm:px-12 md:px-24 pt-16 max-w-[860px] mx-auto w-full">
        <ScrollReveal>
          <div className="bg-warm-light/40 border-l-2 border-refined-gold p-8 md:p-10 rounded-r-lg">
            <p className="font-mono text-xs uppercase tracking-widest text-refined-gold mb-6">Quick Answer in 3 Sätzen</p>
            <p className="font-satoshi text-deep-charcoal text-lg leading-relaxed">
              Die EU plant 2026 mit dem Digital Omnibus eine Lockerung der Cookie-Banner-Pflicht, insbesondere für technisch notwendige und Analytik-Cookies. Aber: das Reform-Paket ist noch nicht beschlossen und wird vermutlich erst 2027 wirksam. Wichtiger ist die strategische Frage: warum bauen wir Webseiten, die überhaupt Cookie-Banner brauchen, statt von Anfang an cookie-frei? Sabala-Mentoring.com läuft seit Tag eins ohne Cookie-Banner, mit Umami statt Google Analytics, und das ist 2026 keine Spar-Lösung, sondern Premium-Standard.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <section className="px-6 sm:px-12 md:px-24 pt-20 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Was ist die geplante DSGVO-Reform 2026?</h2>
            <p><strong>Der „Digital Omnibus“</strong> ist ein Reform-Paket der EU-Kommission, das im November 2025 vorgestellt wurde. Ziel: Bürokratie-Abbau bei DSGVO und ePrivacy-Richtlinie. Konkret könnten sich ändern:</p>
            <ul>
              <li><strong>Cookie-Banner-Pflicht</strong>: Lockerung bei technisch notwendigen und reinen Analytik-Cookies (Plausible, Umami). Voraussichtlich keine Pflicht mehr für „minimale“ Cookie-Verwendung.</li>
              <li><strong>Einwilligungs-Pflicht</strong>: Vereinfachung bei wiederholten Besuchen.</li>
              <li><strong>Dokumentations-Pflicht</strong>: Geringere Pflichten für KMU und Einzel-Selbstständige.</li>
            </ul>
            <p>Status Mai 2026: der Vorschlag liegt im EU-Parlament. Realistische Verabschiedung 2027. Bis dahin gilt: aktuelle DSGVO unveraendert, Cookie-Banner-Pflicht bleibt. Wer parallel auch <Link href="/blog/eu-ai-act-coach-2026">AI-Act-Compliance</Link> umsetzen muss (anwendbar ab August 2026), ist mit beiden Themen besser dran wenn beide gleichzeitig sortiert werden.</p>

            <h2>Warum Cookie-Banner ein Premium-Problem sind</h2>
            <p>Cookie-Banner sind 2026 das, was Flash-Pop-ups 2012 waren: ein nerviges Relikt, das niemand mehr will, aber das aus Reflex implementiert wird.</p>

            <h3>1. Sie ruinieren den ersten Eindruck</h3>
            <p>Ein potenzieller Kunde besucht deine Premium-Webseite. Erstes Gefühl: Wow-Moment, Brand-Resonanz, ich will mehr. Erste Aktion erforderlich: „Akzeptieren oder Ablehnen?“ Du hast den Moment getötet. Verkaufspsychologisch ein Premium-Killer.</p>

            <h3>2. Sie haben kaum messbaren Mehrwert</h3>
            <p>Die meisten Cookie-Banner sind dazu da, Google Analytics und Facebook Pixel zu legalisieren. Aber: 50-70 Prozent der Besucher klicken „Ablehnen“ oder schließen den Tab. Du verlierst Daten und Conversions für Banner-„Compliance“.</p>

            <h3>3. Sie sind unnötig bei cookie-freiem Tracking</h3>
            <p>Die Lösung ist seit 2020 da: cookie-freie Analyse-Tools wie Plausible, Umami, Fathom. Diese tracken ohne personenbezogene Cookies. Keine Banner-Pflicht. Bessere Daten. Sauberer Premium-Eindruck.</p>
          </div>
        </ScrollReveal>
      </section>

      <section className="px-6 sm:px-12 md:px-24 pt-12 max-w-[1100px] mx-auto w-full">
        <ScrollReveal>
          <h2 className="font-instrument text-3xl md:text-5xl text-deep-charcoal text-center mb-4 leading-tight">
            Der cookie-freie <span className="italic text-refined-gold">Premium-Stack.</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mt-12">
          {[
            { num: "01", title: "Hosting ohne Tracking-Cookies", body: "Vercel mit deutscher Edge-Region. Setzt keine personenbezogenen Cookies. Performance-Tracking läuft anonym. Cookie-freie Basis out-of-the-box." },
            { num: "02", title: "Analytics ohne Cookies", body: "Umami, Plausible oder Fathom. Trackt Seitenaufrufe, Verweildauer, Klick-Pfade, Referrer — ohne personenbezogene Cookies, ohne IP-Speicherung. Umami self-hosted 0 Euro, Cloud 9-19 Euro/Monat." },
            { num: "03", title: "Newsletter ohne Cookies", body: "ConvertKit, Brevo oder Buttondown statt Mailchimp. Die meisten neuen Newsletter-Anbieter haben einen Privacy-Mode, der ohne Tracking läuft." },
            { num: "04", title: "Embeds prüfen", body: "Cookie-Banner kommen oft von Embeds: YouTube → youtube-nocookie.com. Vimeo Pro mit „Do Not Track“. Google Maps → OpenStreetMap. Calendly → Direkter Link statt Embed." },
          ].map((item) => (
            <ScrollReveal key={item.num}>
              <div className="h-full bg-warm-light/30 border border-refined-gold/15 hover:border-refined-gold/40 transition-all duration-500 rounded-[24px] p-7 md:p-8 group">
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-refined-gold text-xs tracking-[0.22em] uppercase font-bold">{item.num}</span>
                  <div className="w-10 h-10 rounded-full bg-refined-gold/10 border border-refined-gold/30 flex items-center justify-center group-hover:bg-refined-gold/20 transition-colors">
                    <Shield className="w-4 h-4 text-refined-gold" />
                  </div>
                </div>
                <h3 className="font-instrument text-xl md:text-[1.4rem] text-deep-charcoal mb-4 leading-tight">{item.title}</h3>
                <p className="font-satoshi text-warm-steel text-base leading-[1.7]">{item.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="px-6 sm:px-12 md:px-24 pt-24 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Was deine Konkurrenz NICHT macht</h2>
            <p>Schau dir die Top-10-Coaches deiner Nische an. Wie viele haben Cookie-Banner? Sehr wahrscheinlich 80-90 Prozent. Was das für dich heißt: wenn du als einer der wenigen ohne Banner bist, hast du ein sichtbares Premium-Signal.</p>
            <p>Ein potenzieller Kunde wird denken „die Seite fuehlt sich anders an“, ohne zu artikulieren warum. Das ist der fehlende Reibungs-Moment beim ersten Besuch. Premium-Architektur: viele kleine Entscheidungen, die zusammen ein Gefuehl ergeben. Wie ein cookie-frei gebauter <Link href="/blog/webseite-mit-ki-bauen-2026">AI-Coding-Stack</Link> diese Premium-Architektur von Anfang an mitliefert, habe ich separat aufgeschrieben.</p>

            <h2>Konkrete Schritte für dich</h2>
            <p>Wenn du eine bestehende Webseite hast mit Cookie-Banner-Plage:</p>
            <ol>
              <li><strong>Analytics-Migration vorbereiten</strong> (1 Stunde): Plausible oder Umami Account anlegen.</li>
              <li><strong>Embeds prüfen</strong> (30 Min): Liste alle YouTube-, Vimeo-, Maps-Embeds. Auf nocookie-Varianten umstellen.</li>
              <li><strong>Newsletter-Tool prüfen</strong> (30 Min): Privacy-Mode aktivieren oder Tool wechseln.</li>
              <li><strong>Google Analytics deaktivieren</strong> (15 Min): Tracking-Code entfernen, Plausible/Umami-Code einbinden.</li>
              <li><strong>Cookie-Banner entfernen</strong> (15 Min): Plugin deinstallieren, Code-Snippets entfernen, Datenschutz-Erklärung anpassen.</li>
            </ol>
            <p>Gesamt: 2-3 Stunden. Danach hast du eine cookie-freie Webseite und musst dir um die DSGVO-Reform 2027 keine Gedanken machen.</p>
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
                <span className="text-xs font-mono tracking-widest uppercase text-refined-gold">Cookie-frei + DSGVO-konform</span>
              </div>
              <h3 className="font-instrument text-3xl md:text-4xl text-white mb-6">Premium ohne Banner-Plage.</h3>
              <p className="text-white/60 font-satoshi text-lg leading-relaxed mb-8">
                Wenn du eine bestehende Webseite cookie-frei migrieren willst, sprechen wir am besten in einem Beratungsgespraech darueber. Falls du neu baust: cookie-frei ist in jedem Sabala-Premium-Paket Standard.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link href="/termin-buchen" className="inline-flex items-center justify-center gap-2 bg-refined-gold text-deep-charcoal hover:bg-white px-8 py-4 transition-colors font-medium rounded-full w-full sm:w-auto">
                  Cookie-frei-Migration prüfen
                </Link>
                <Link href="/premium-angebot" className="text-white/80 hover:text-white px-6 py-4 transition-colors font-medium border border-white/10 rounded-full hover:bg-white/5 w-full sm:w-auto text-center">
                  Premium-Angebot ansehen
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
