import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Link from "next/link";
import Script from "next/script";
import { ArrowLeft, Lock, AlertTriangle, Github, KeyRound, FileText } from "lucide-react";

const slug = "webdesigner-verschwunden-code-eigentum";
const url = `https://sabala-mentoring.com/blog/${slug}`;
const datePublished = "2026-05-27";

export const metadata = {
  title: "Wenn dein Webdesigner verschwindet: Code-Eigentum als Versicherung",
  description:
    "Webseiten-Lock-in auf drei Ebenen erklärt: Plattform, Hosting, Person. Warum Code-Eigentum die einzige echte Versicherung gegen Webdesigner-Abhängigkeit ist.",
  alternates: { canonical: url },
  openGraph: {
    title: "Wenn dein Webdesigner verschwindet: warum Code-Eigentum die echte Versicherung ist",
    description: "Webflow-Lock-in, WordPress-Plugin-Wahn, Personen-Abhängigkeit. Und der Stack, der dir gehört.",
    type: "article",
    publishedTime: datePublished,
    url,
  },
};

const articleSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Wenn dein Webdesigner verschwindet: Warum Code-Eigentum die einzige echte Versicherung ist",
  description: "Webseiten-Lock-in auf drei Ebenen. Wie Code-Eigentum dich frei macht.",
  author: { "@type": "Person", name: "Ilja Krasevskij", url: "https://sabala-mentoring.com/ueber-mich" },
  publisher: { "@type": "Organization", name: "Sabala Mentoring" },
  datePublished,
  dateModified: datePublished,
  mainEntityOfPage: { "@type": "WebPage", "@id": url },
});

const faq = [
  {
    q: "Was ist der Unterschied zwischen Webflow-Export und echtem Code-Eigentum?",
    a: "Webflow-Export gibt dir HTML/CSS/JS-Dateien. Aber: die Dateien laufen nicht ohne Webflow-Konfiguration. Animationen brechen. CMS-Inhalte sind nicht übertragbar. Realistisch ist ein Webflow-Export ein Notnagel, kein echtes Eigentum. Bei echtem Code-Eigentum (Next.js + GitHub) läuft der gleiche Code auf jedem Hosting.",
  },
  {
    q: "Brauche ich Programmier-Kenntnisse für eine Code-Eigentums-Webseite?",
    a: "Nicht zwingend. Du musst nicht selbst tippen. Aber: du solltest verstehen, was ein Repository ist, was ein Deploy ist, was ein Commit ist. Eine Stunde Onboarding reicht typischerweise. Danach kannst du mit Claude Code 80 Prozent aller Routine-Änderungen selbst machen.",
  },
  {
    q: "Was passiert mit meinen Daten, wenn ich von Webflow auf eine Code-Eigentums-Lösung umziehe?",
    a: "Migration ist Arbeit. Inhalte müssen exportiert, neu strukturiert und neu eingepflegt werden. Realistisch: bei einer 8-Seiten-Webseite plane 20-30 Stunden ein. Bei Sabala mache ich das in der Premium-Begleitung mit.",
  },
  {
    q: "Was kostet eine Code-Eigentums-Webseite vs. Webflow?",
    a: "Webflow: 27-43 Euro pro Monat, also 972-1.548 Euro über 3 Jahre, plus Lock-in. Code-Eigentum mit Vercel + GitHub: 0-20 Euro pro Monat (kostenlose Tiers reichen oft), plus AI-Tool-Subscription (50 Euro pro Monat). Aber: einmaliges Investment in die Erstellung statt monatliches Abo.",
  },
  {
    q: "Wer kann eine Code-Eigentums-Webseite weiterpflegen, wenn ich den Erstaussteller verliere?",
    a: "Jeder Entwickler, der Next.js und React kennt. Das ist 2026 Industry-Standard. Suche auf Toptal, Upwork oder über LinkedIn nach „Next.js Freelancer Deutschland“. Tagessatz typischerweise 600-1.000 Euro. Eine Routine-Änderung dauert 1-2 Stunden, also 75-200 Euro Aufwand.",
  },
];

const faqSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

const proseBlock =
  "prose prose-lg md:prose-xl prose-stone max-w-none font-satoshi leading-[1.85] text-warm-steel prose-headings:font-instrument prose-headings:text-deep-charcoal prose-strong:text-deep-charcoal prose-a:text-refined-gold prose-a:no-underline hover:prose-a:underline prose-h2:font-instrument prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-20 prose-h2:mb-8 prose-h2:leading-[1.15] prose-h3:font-instrument prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-5 prose-p:mb-6 prose-ul:my-6 prose-li:mb-2 prose-li:leading-[1.7]";

export default function BlogWebdesignerVerschwundenPage() {
  return (
    <main className="flex flex-col w-full bg-pure-surface min-h-screen selection:bg-refined-gold selection:text-white pb-32">
      <Script id="schema-article" type="application/ld+json" strategy="beforeInteractive">{articleSchemaJson}</Script>
      <Script id="schema-faq" type="application/ld+json" strategy="beforeInteractive">{faqSchemaJson}</Script>

      <div className="pt-24 md:pt-32 w-full bg-[#08070a]"></div>

      <section className="relative w-full min-h-[60vh] md:min-h-[68vh] bg-[#08070a] overflow-hidden flex items-end">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2E2B26]/70 via-[#15110b] to-[#08070a]" />
        <div className="absolute top-1/3 right-1/3 w-[600px] h-[600px] bg-refined-gold/[0.14] blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-[160px] bg-gradient-to-t from-pure-surface via-pure-surface/40 to-transparent pointer-events-none" />

        <div className="relative z-10 px-6 sm:px-12 md:px-24 max-w-[1400px] mx-auto pt-32 pb-24 md:pb-28 w-full">
          <ScrollReveal>
            <Link href="/blog" className="inline-flex items-center gap-2 text-pure-surface/70 hover:text-refined-gold transition-colors font-mono text-xs uppercase tracking-widest mb-10">
              <ArrowLeft className="w-4 h-4" /> Zurück zum Journal
            </Link>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-widest text-refined-gold mb-6">
              <span className="bg-refined-gold/10 px-3 py-1 rounded-full border border-refined-gold/30">Code-Eigentum</span>
              <span className="text-pure-surface/70">Mai 2026</span>
              <span className="text-pure-surface/70 hidden sm:inline-block">•</span>
              <span className="text-pure-surface/70 hidden sm:inline-block">8 Min Lesezeit</span>
            </div>
            <h1 className="font-instrument text-[clamp(2.5rem,5vw,5rem)] text-pure-surface leading-[1.05] max-w-[1100px] mb-6">
              Wenn dein Webdesigner verschwindet: <span className="italic text-refined-gold">Code-Eigentum als einzige echte Versicherung.</span>
            </h1>
            <p className="text-pure-surface/70 text-lg md:text-xl font-satoshi max-w-[760px] leading-relaxed">
              Coach hat vor drei Jahren eine Webseite bauen lassen. Webdesigner zieht um, antwortet nicht mehr. Webseite läuft noch. Aber jede Änderung wird zur Forschungs-Expedition. Drei Monate Hin und Her, dann 1.500 Euro für einen Komplett-Umzug. Drei Jahre Inhalt weg. Das ist Lock-in.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-6 sm:px-12 md:px-24 pt-16 max-w-[860px] mx-auto w-full">
        <ScrollReveal>
          <div className="bg-warm-light/40 border-l-2 border-refined-gold p-8 md:p-10 rounded-r-lg">
            <p className="font-mono text-xs uppercase tracking-widest text-refined-gold mb-6">Quick Answer in 3 Sätzen</p>
            <p className="font-satoshi text-deep-charcoal text-lg leading-relaxed">
              Webseiten-Lock-in passiert auf drei Ebenen: Hosting-Lock-in (Anbieter geht pleite, Webseite weg), Plattform-Lock-in (Webflow/Squarespace-Abo gekündigt, Webseite weg) und Personen-Lock-in (Webdesigner nicht mehr erreichbar, Änderungen unmöglich). Die einzige echte Versicherung ist Code-Eigentum: dein Code liegt auf deinem GitHub-Konto, deployt auf einem austauschbaren Hosting, mit AI-Tools editierbar. Wenn dein Webdesigner verschwindet, kann jeder andere Entwickler in wenigen Stunden weitermachen.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <section className="px-6 sm:px-12 md:px-24 pt-20 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Was ist Webseiten-Lock-in eigentlich?</h2>
            <p><strong>Webseiten-Lock-in ist die Abhängigkeit von einer Person, Plattform oder einem Anbieter</strong>, ohne die du deine eigene Webseite nicht mehr ändern oder umziehen kannst. Du besitzt nominal die Webseite, aber faktisch nicht die Kontrolle.</p>
            <p>Drei Ebenen, auf denen Lock-in passiert:</p>
            <ul>
              <li><strong>Plattform-Lock-in</strong>: Webflow, Squarespace, Wix, Jimdo. Dein Inhalt liegt in einer geschlossenen Datenbank des Anbieters. Wenn du kündigst, ist die Seite weg. Export geht meist nur eingeschränkt.</li>
              <li><strong>Hosting-Lock-in</strong>: Ein 1and1-Account ohne FTP-Zugang. Ein WordPress-Server, dessen Login der Webdesigner hat. Ein eigenes Hosting, das niemand mehr versteht.</li>
              <li><strong>Personen-Lock-in</strong>: Der Webdesigner hat die Schlüssel. Du nicht. Wenn er weg ist, sind die Schlüssel weg.</li>
            </ul>
            <p>Der dritte Punkt ist der schmerzhafteste, weil er emotional verschleiert ist. Du vertraust einer Person, überreichst die Verantwortung, und denkst nicht an den Fall, dass die Person nicht mehr da ist. Die naechste Frage ist dann: <Link href="/blog/baukasten-vs-eigene-webseite-kosten-2026">was kostet Lock-in eigentlich</Link>? Die 3- und 5-Jahres-Rechnung Baukasten vs. eigene Webseite habe ich separat aufgeschrieben.</p>
          </div>
        </ScrollReveal>
      </section>

      <section className="px-6 sm:px-12 md:px-24 pt-12 max-w-[1100px] mx-auto w-full">
        <ScrollReveal>
          <h2 className="font-instrument text-3xl md:text-5xl text-deep-charcoal text-center mb-4 leading-tight">
            Die 5 typischen <span className="italic text-refined-gold">Lock-in-Fallen.</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mt-12">
          {[
            { num: "01", title: "Webflow / Squarespace / Wix Abo-Lock-in", body: "27-43 Euro pro Monat. Nach 3 Jahren 972-1.548 Euro. Wenn du kündigst, ist die Webseite weg. Webflow-Preise stiegen 2022-2026 von 12 auf 27 Euro. Migration weg ist technisch und finanziell aufwendig." },
            { num: "02", title: "WordPress-Plugin-Wahn", body: "23 Plugins. Yoast SEO. WPRocket. Elementor. WooCommerce. Jedes Plugin braucht Updates. Update bricht etwas. Plugin-Hersteller stellt Service ein. Plugin-Lizenz läuft aus. Du brauchst jemanden, der das pflegt." },
            { num: "03", title: "Webdesigner-Login-Lock-in", body: "Der Webdesigner hat Server-Login, Domain-Login, FTP-Zugang, WordPress-Admin. Du hast Frontend-Login für Blogbeiträge. In 8 von 10 Fällen hat der Coach nicht einmal eine vollständige Liste der Logins." },
            { num: "04", title: "Custom-PHP ohne Dokumentation", body: "Der Webdesigner hat dir eine Webseite in PHP geschrieben, ohne Framework, ohne Dokumentation. Funktioniert. Bis du eine Änderung willst. Kein anderer Entwickler kann den Code lesen, weil keine Struktur, keine Kommentare." },
            { num: "05", title: "AI-Baukasten-Lock-in (neu)", body: "Jimdo AI, Hostinger AI, Wix AI sind 2024-2026 explodiert. Schöne UX. Aber dein Inhalt liegt in der Anbieter-Datenbank. Wenn der Anbieter morgen Preise verdoppelt oder den AI-Builder einstellt, hast du keine Migrations-Option." },
          ].map((item) => (
            <ScrollReveal key={item.num}>
              <div className="h-full bg-warm-light/30 border border-refined-gold/15 hover:border-refined-gold/40 transition-all duration-500 rounded-[24px] p-7 md:p-8 group">
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-refined-gold text-xs tracking-[0.22em] uppercase font-bold">{item.num}</span>
                  <div className="w-10 h-10 rounded-full bg-refined-gold/10 border border-refined-gold/30 flex items-center justify-center group-hover:bg-refined-gold/20 transition-colors">
                    <AlertTriangle className="w-4 h-4 text-refined-gold" />
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
            <h2>Der Code-Eigentums-Stack: deine Versicherung</h2>
            <p>Wenn du nicht Lock-in willst, brauchst du einen Stack, der dir gehört. Praktisch:</p>

            <h3>1. GitHub für den Code</h3>
            <p>Dein Webseiten-Code liegt auf GitHub. Privates Repository. Du hast die Owner-Rechte. Jede Änderung mit Datum, Uhrzeit, Beschreibung archiviert. Wenn du jemandem Zugang gibst, kannst du den jederzeit wieder entziehen.</p>

            <h3>2. Vercel oder austauschbares Hosting</h3>
            <p>Vercel ist mein Standard. Aber dein Code ist nicht an Vercel gebunden. Wenn Vercel morgen verschwindet, deployst du den gleichen Code in 30 Minuten auf Netlify, Cloudflare Pages oder Render.</p>

            <h3>3. Claude Code als CLI</h3>
            <p>Hier kommt der entscheidende Punkt: du kannst mit Claude Code (oder Cursor, oder Antigravity) direkt mit deinem Code sprechen. Auf Deutsch. „Änder die Telefonnummer im Footer.“ „Mach das Hero-Bild dunkler.“ Das Tool ändert den Code, du pushst es, deine Webseite ist 40 Sekunden später aktualisiert. Wie genau dieser <Link href="/blog/webseite-mit-ki-bauen-2026">AI-Coding-Stack im Detail funktioniert</Link>, habe ich in einem eigenen Artikel beschrieben.</p>
            <p>Du brauchst keinen Webdesigner mehr für Routine-Änderungen. Du brauchst einen, wenn du strategisch etwas neu denken willst. Aber Texte ändern, Bilder tauschen, Footer pflegen: das machst du selbst mit Claude Code.</p>

            <h3>4. Dokumentation im Code</h3>
            <p>Premium-Code 2026 hat eingebaute Dokumentation. Komponenten-Namen sind sprechend. Kommentare erklären WARUM eine Entscheidung getroffen wurde. Wenn jemand anderes deinen Code übernehmen muss, kommt er in 30 Minuten rein.</p>

            <h3>5. Schlüssel-Liste</h3>
            <p>Egal wie sauber dein Code ist: du brauchst eine Liste aller Logins (Domain, Hosting, GitHub, Vercel, Email-Provider). Bei Sabala-Kunden lege ich diese Liste am Tag des Launches als Notion-Page an, mit Anweisungen pro Konto. Wenn ich nicht mehr da wäre, könnte ein Entwickler innerhalb einer Stunde alles übernehmen.</p>

            <h2>Was das für dich bedeutet</h2>
            <p>Drei konkrete Fragen, die du dir stellen kannst:</p>
            <ol>
              <li>Hast du eine vollständige Login-Liste aller Konten zu deiner Webseite?</li>
              <li>Wenn dein Webdesigner morgen verschwindet: könnte jemand anderes deine Webseite übernehmen, ohne den Code neu zu schreiben?</li>
              <li>Wenn dein Hosting-Anbieter morgen pleite geht: wo würdest du innerhalb von 30 Tagen hosten können?</li>
            </ol>
            <p>Wenn du auf eine dieser Fragen keine klare Antwort hast, ist dein Lock-in-Risiko hoch.</p>

            <h2>Wie Sabala das für Kunden löst</h2>
            <p>Mein Standard-Setup für jeden Premium-Kunden:</p>
            <ul>
              <li><strong>Eigenes GitHub-Repo</strong>, du bist Owner, ich bin Collaborator</li>
              <li><strong>Vercel-Account auf deinen Namen</strong>, ich habe Team-Zugang</li>
              <li><strong>Code 100 Prozent dokumentiert</strong> mit React-Standard-Komponenten</li>
              <li><strong>Login-Notion-Page</strong> mit allen Konten und Anweisungen</li>
              <li><strong>Claude-Code-Einführung im Onboarding</strong>: ich zeige dir, wie du selbst Texte änderst</li>
            </ul>
            <p>Wenn ich morgen nicht mehr erreichbar wäre, könntest du: den Code auf GitHub anschauen, einen neuen Entwickler beauftragen, der den Code in einer Stunde versteht, selbst kleine Änderungen mit Claude Code machen, auf ein anderes Hosting umziehen ohne Code-Anpassung.</p>
            <p>Das ist nicht „nice to have“. Das ist Versicherung. Premium-Position ist auch: du gehörst nicht jemandem. Deine Webseite gehört auch nicht jemandem. Du bist frei.</p>
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
                <Lock className="w-5 h-5 text-refined-gold" />
                <span className="text-xs font-mono tracking-widest uppercase text-refined-gold">Code-Eigentum + Premium-Begleitung</span>
              </div>
              <h3 className="font-instrument text-3xl md:text-4xl text-white mb-6">Eine Webseite, die wirklich dir gehört.</h3>
              <p className="text-white/60 font-satoshi text-lg leading-relaxed mb-8">
                Wenn du eine Premium-Webseite willst, die du auch dann pflegen kannst, wenn ich nicht mehr da bin: Code-Eigentum, GitHub, Vercel und Claude-Code-Onboarding sind im Sabala-Premium-Angebot Standard. Fuer den schlanken Einstieg gibts den OnePager mit gleichem Eigentums-Prinzip.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link href="/premium-angebot" className="inline-flex items-center justify-center gap-2 bg-refined-gold text-deep-charcoal hover:bg-white px-8 py-4 transition-colors font-medium rounded-full w-full sm:w-auto">
                  Premium-Angebot ansehen
                </Link>
                <Link href="/special-launch-angebot" className="text-white/80 hover:text-white px-6 py-4 transition-colors font-medium border border-white/10 rounded-full hover:bg-white/5 w-full sm:w-auto text-center">
                  OnePager-Einstieg
                </Link>
                <Link href="/blog#audit" className="text-refined-gold/90 hover:text-refined-gold px-6 py-4 transition-colors font-medium text-sm w-full sm:w-auto text-center underline-offset-4 hover:underline">
                  Lock-in-Check (Mini-Audit)
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
