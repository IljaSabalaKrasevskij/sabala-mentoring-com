import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { ArrowLeft, Sparkles, Layers } from "lucide-react";

const slug = "webseiten-bau-mit-claude-anfaenger";
const url = `https://sabala-mentoring.com/blog/${slug}`;
const datePublished = "2026-06-18";

export const metadata = {
  title: "Webseiten-Bau mit Claude Code: der ehrliche Anfänger-Guide",
  description:
    "Vom leeren Terminal zur eigenen Webseite mit Claude Code. Die vier Setup-Schritte, die drei Pflicht-Dateien und die fünf häufigsten Anfänger-Fehler. Mit Boris Chernys eigenen Tipps und Sebastian Kaufmanns Setup-Logik.",
  alternates: { canonical: url },
  openGraph: {
    title: "Webseiten-Bau mit Claude Code: der ehrliche Anfänger-Guide",
    description: "Vier Setup-Schritte, drei Pflicht-Dateien, fünf Anfänger-Fehler. Mit echten Zitaten.",
    type: "article",
    publishedTime: datePublished,
    url,
    images: [{ url: `${url}/cover.jpg`, width: 1200, height: 630, alt: "Skizze: aufgeschlagenes Notizbuch mit Wireframe und Bleistift neben einem Laptop unter warmem Lampenlicht" }],
  },
};

const articleSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Webseiten-Bau mit Claude Code: der ehrliche Anfänger-Guide",
  description: "Setup-Schritte, Pflicht-Dateien und typische Anfänger-Fehler. Mit Quellen.",
  author: { "@type": "Person", name: "Ilja Krasevskij", url: "https://sabala-mentoring.com/ueber-mich" },
  publisher: { "@type": "Organization", name: "Sabala Mentoring" },
  datePublished,
  dateModified: datePublished,
  mainEntityOfPage: { "@type": "WebPage", "@id": url },
  image: `${url}/cover.jpg`,
});

const faq = [
  {
    q: "Brauche ich Programmier-Vorerfahrung?",
    a: "Hilft, ist aber nicht zwingend. Wer noch nie Code gesehen hat, sollte mit einem kleinen Projekt starten, nicht mit einer ganzen Webseite. Sebastian Kaufmann arbeitet bei Skaile auch mit Beratern und Coaches ohne Tech-Hintergrund, die nach ein bis zwei Wochen produktiv bauen.",
  },
  {
    q: "Reicht Claude.ai im Browser nicht?",
    a: "Nein, weil Claude.ai keinen Zugriff auf deine Dateien hat. Du müsstest jeden Code-Block hin und her kopieren. Claude Code ist genau das Werkzeug, das diese Kopier-Hölle wegnimmt.",
  },
  {
    q: "Welcher Editor passt am besten dazu?",
    a: "VS Code ist der Standard, weil Anthropic eine offizielle Extension dafür anbietet. Das orangefarbene Claude-Logo in der Toolbar reicht für den Login. Alternativen wie Cursor oder Zed funktionieren auch, sind aber für den Einstieg ein Umweg.",
  },
  {
    q: "Wie schnell amortisiert sich der Setup-Aufwand?",
    a: "Bei der nächsten Komponente. Eine sauber eingerichtete CLAUDE.md plus ein Skill für die häufigste Aufgabe spart dir bei jeder neuen Komponente zehn bis fünfzehn Minuten Erklärungs-Aufwand. Bei einer Webseite mit zehn Komponenten amortisiert sich Setup also schon im ersten Sprint.",
  },
];

const faqSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

const proseBlock =
  "prose prose-lg md:prose-xl prose-stone max-w-none font-satoshi leading-[1.85] text-warm-steel prose-headings:font-instrument prose-headings:text-deep-charcoal prose-strong:text-deep-charcoal prose-a:text-refined-gold prose-a:no-underline hover:prose-a:underline prose-h2:font-instrument prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-20 prose-h2:mb-8 prose-h2:leading-[1.15] prose-h3:font-instrument prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-5 prose-p:mb-6 prose-ul:my-6 prose-li:mb-2 prose-li:leading-[1.7] prose-code:before:content-none prose-code:after:content-none prose-code:bg-warm-light/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-deep-charcoal prose-pre:text-pure-surface prose-pre:rounded-xl";

export default function BlogWebseitenBauMitClaudePage() {
  return (
    <main className="flex flex-col w-full bg-pure-surface min-h-screen selection:bg-refined-gold selection:text-white pb-32">
      <Script id="schema-article" type="application/ld+json" strategy="beforeInteractive">{articleSchemaJson}</Script>
      <Script id="schema-faq" type="application/ld+json" strategy="beforeInteractive">{faqSchemaJson}</Script>

      <div className="pt-24 md:pt-32 w-full bg-[#2E2B26]"></div>

      {/* HERO — dark backdrop, cover als atmospheric layer */}
      <section className="relative w-full aspect-square md:aspect-[21/9] max-h-[800px] overflow-hidden bg-[#1a1612]">
        <Image src={`/blog/${slug}/cover.jpg`} alt="Skizze: aufgeschlagenes Notizbuch mit Wireframe und Bleistift neben einem Laptop unter warmem Lampenlicht" fill className="object-cover opacity-45" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0a] via-[#1a1612]/85 to-[#1a1612]/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0c0a]/85 via-[#1a1612]/35 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full px-6 sm:px-12 md:px-24 pb-16 md:pb-24 max-w-[1400px] mx-auto z-10">
          <ScrollReveal>
            <Link href="/blog" className="inline-flex items-center gap-2 text-pure-surface/70 hover:text-refined-gold transition-colors font-mono text-xs uppercase tracking-widest mb-10">
              <ArrowLeft className="w-4 h-4" /> Zurück zum Journal
            </Link>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-widest mb-6">
              <span className="bg-refined-gold/15 text-refined-gold px-3 py-1 rounded-full border border-refined-gold/40">KI Academy &middot; How-to</span>
              <span className="text-pure-surface/75">Juni 2026</span>
              <span className="text-pure-surface/50 hidden sm:inline-block">•</span>
              <span className="text-pure-surface/75 hidden sm:inline-block">8 Min Lesezeit</span>
            </div>
            <h1 className="font-instrument text-[clamp(2.5rem,5vw,5rem)] text-pure-surface leading-[1.05] max-w-[1100px] mb-6">
              Webseiten-Bau mit Claude Code: <span className="italic text-refined-gold">der ehrliche Anfänger-Guide.</span>
            </h1>
            <p className="text-pure-surface/80 text-lg md:text-xl font-satoshi max-w-[760px] leading-relaxed">
              Vom leeren Terminal zur eigenen Webseite. Die vier Setup-Schritte, die drei Pflicht-Dateien und die fünf häufigsten Anfänger-Fehler, die fast jeder macht. Mit Boris Chernys eigenen Tipps und Sebastian Kaufmanns Setup-Logik, durchgehend mit Quellen.
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
              Claude Code wird zum produktiven Webseiten-Bau-Werkzeug, sobald drei Dinge stimmen: ein <strong>Pro-Account</strong> (Free reicht nicht), eine <strong>kurze, präzise CLAUDE.md</strong> im Projekt-Root, und mindestens ein paar wiederverwendbare <strong>Skills</strong> (Slash-Commands) für die Aufgaben, die du oft brauchst. MCPs (Tool-Verbindungen) kommen später dazu. Mehr brauchst du in den ersten Wochen nicht.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Definition + Setup */}
      <section className="px-6 sm:px-12 md:px-24 pt-20 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <p>Du sitzt vor einem leeren Terminal. Cursor blinkt. Du hast irgendwo gelesen, dass man mit Claude Code in einem Nachmittag eine Webseite bauen kann, hast den Account angelegt, jetzt geht es los, und plötzlich ist jeder Schritt eine Frage. Wo installiere ich das genau? Welche Datei lege ich zuerst an? Warum macht Claude bei mir nichts Sinnvolles, obwohl er bei anderen scheinbar zaubert?</p>
            <p>Diese Lücke zwischen <em>„geht angeblich"</em> und <em>„läuft bei mir"</em> ist normal, und sie hat eine konkrete Ursache: Claude Code funktioniert anders als ChatGPT. Es ist kein Chat, es ist ein <strong>Code-First-Werkzeug</strong> im Terminal, das deinen Projekt-Ordner liest und Dateien schreibt. Wenn du das mit dem Chat-Muster fütterst, bekommst du Chat-Output. Wenn du es mit einem <strong>klaren Setup</strong> fütterst, bekommst du fertige Webseiten-Code.</p>

            <h2>Was ist Claude Code überhaupt?</h2>
            <p>Claude Code ist Anthropics offizielles CLI-Werkzeug, das du im Terminal aufrufst, und das deinen Projekt-Ordner kennt. Du beschreibst auf Deutsch, was passieren soll, Claude liest deine Dateien, schreibt neuen Code, ändert vorhandenen, führt Tests aus. Es ist kein Chat-Fenster mit Code-Output, sondern ein <strong>echter Mitarbeiter im Terminal</strong>, der direkt in deine Codebase greift. Das ist der entscheidende Unterschied zu ChatGPT oder Claude.ai im Browser: dort kopierst du Code hin und her, hier passiert die Arbeit im Projekt selbst.</p>

            <h2>Die vier Setup-Schritte</h2>
            <p>Diese Reihenfolge ist die kürzeste, die Sebastian Kaufmann von Skaile in seinem Setup-Guide empfiehlt. Funktioniert für Mac, Linux und Windows (über WSL).</p>

            <h3>1. Pro-Account anlegen</h3>
            <p>Geh auf claude.ai, registriere dich, und buche den Pro-Plan. Free-Tier reicht nicht, weil die Token-Limits zu eng sind, um über einen halben Tag konzentriert zu arbeiten. Pro lohnt sich ab dem ersten Tag.</p>

            <h3>2. Claude Code installieren</h3>
            <pre><code>{`npm install -g @anthropic-ai/claude-code
cd dein-projekt
claude`}</code></pre>
            <p>Beim ersten Start öffnet sich der Browser für den Login. Wichtig: starte Claude <strong>immer aus dem Root-Verzeichnis</strong> deines Projekts. Nur so liest er die CLAUDE.md und kennt deinen ganzen Code.</p>

            <h3>3. /init für die CLAUDE.md</h3>
            <p>Tipp im Claude-Prompt einfach <code>/init</code> ein. Claude scannt das Projekt automatisch und generiert eine erste CLAUDE.md. Das ist deine <strong>Bedienungsanleitung für Claude</strong>. Ohne sie ist Claude wie ein neuer Mitarbeiter ohne Briefing.</p>

            <h3>4. Ein bis zwei Skills installieren</h3>
            <p>Skills sind wiederverwendbare Slash-Commands (zum Beispiel <code>/sabala-newsletter</code>, <code>/render-pin</code>). Für den Start reicht es, wenn du <strong>einen einzigen Skill</strong> baust, den du regelmäßig brauchst. Skills wachsen organisch mit deiner Arbeit. Sebastian Kaufmann empfiehlt für den Einstieg ein Set von rund <strong>10 produktiven Skills</strong>, von Code-Review bis Doc-Generierung. Quelle und Liste: <a href="https://starten.skaile.de" target="_blank" rel="noopener">starten.skaile.de</a>.</p>
          </div>
        </ScrollReveal>
      </section>

      {/* 3 Dateien — Highlight-Block */}
      <section className="px-6 sm:px-12 md:px-24 pt-24 max-w-[1100px] mx-auto w-full">
        <ScrollReveal>
          <div className="bg-deep-charcoal text-pure-surface rounded-[28px] p-8 md:p-14 border border-refined-gold/30 shadow-[0_30px_70px_rgba(184,150,62,0.12)]">
            <div className="flex items-center gap-3 mb-6">
              <Layers className="w-5 h-5 text-refined-gold" />
              <span className="font-mono text-refined-gold text-xs tracking-[0.22em] uppercase font-bold">Die drei Dateien, die jedes Webprojekt braucht</span>
            </div>
            <h2 className="font-instrument text-3xl md:text-5xl text-pure-surface leading-tight mb-10">
              <span className="italic text-refined-gold">CLAUDE.md, Skills, MCPs.</span> Mehr nicht.
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="font-instrument text-3xl text-refined-gold mb-3">01</div>
                <h3 className="font-instrument text-xl text-pure-surface mb-3">CLAUDE.md</h3>
                <p className="font-satoshi text-pure-surface/70 text-sm leading-relaxed">Eine Markdown-Datei im Projekt-Root. Claude lädt sie bei jedem Start. Hier rein kommt: Tech-Stack, Konventionen, Don'ts, wie Claude mit dir kommunizieren soll. <strong className="text-pure-surface">Max. rund 200 Zeilen</strong>, kürzer ist besser.</p>
              </div>
              <div>
                <div className="font-instrument text-3xl text-refined-gold mb-3">02</div>
                <h3 className="font-instrument text-xl text-pure-surface mb-3">Skills</h3>
                <p className="font-satoshi text-pure-surface/70 text-sm leading-relaxed">Liegen in <code className="text-refined-gold/90">~/.claude/skills/</code> oder im Projekt unter <code className="text-refined-gold/90">.claude/skills/</code>. Jeder Skill ist ein Ordner mit einer SKILL.md plus Helper-Skripten. Aufruf über <code className="text-refined-gold/90">/skill-name</code>.</p>
              </div>
              <div>
                <div className="font-instrument text-3xl text-refined-gold mb-3">03</div>
                <h3 className="font-instrument text-xl text-pure-surface mb-3">MCPs</h3>
                <p className="font-satoshi text-pure-surface/70 text-sm leading-relaxed">Model Context Protocol. Verbindet Claude mit externen Tools: Datenbank, Browser, Notion, Slack. Für den ersten Webseiten-Bau brauchst du <strong className="text-pure-surface">keinen einzigen MCP</strong>. Kommt ab Woche zwei.</p>
              </div>
            </div>
            <div className="mt-10 pt-8 border-t border-refined-gold/20">
              <p className="font-satoshi text-pure-surface/80 italic text-lg leading-relaxed">„Try to keep CLAUDE.md pretty short. If it gets too long, it's just going to use up context."</p>
              <p className="font-mono text-pure-surface/50 text-xs mt-3">— Boris Cherny, Claude Code Lead, Anthropic</p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 5 Fehler */}
      <section className="px-6 sm:px-12 md:px-24 pt-24 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Die fünf häufigsten Anfänger-Fehler</h2>
            <p>Aus der eigenen Praxis und aus dem, was Sebastian Kaufmann immer wieder bei Skaile-Beratungs-Kunden sieht.</p>
            <ul>
              <li><strong>CLAUDE.md wird zu lang.</strong> Wer alle Projekt-Details reinschreibt, frisst den Context auf, bevor Claude eine Zeile Code geschrieben hat. Lieber kurz und konkret. Boris' Regel: aggressiv kürzen.</li>
              <li><strong>Claude wird im falschen Verzeichnis gestartet.</strong> Wer <code>claude</code> außerhalb des Projekt-Roots aufruft, hat keinen Zugriff auf die CLAUDE.md und keinen Codebase-Context. Erkennbar daran, dass Claude generische Antworten gibt statt projekt-spezifischer.</li>
              <li><strong>Free-Account statt Pro.</strong> Die Token-Limits im Free-Tier reichen für maximal zehn Minuten echte Arbeit, danach Wartezeit. Wer ernsthaft baut, braucht Pro.</li>
              <li><strong>Keine Skills, jedes Mal alles neu erklären.</strong> Wer dieselbe Aufgabe fünfmal ohne Skill macht, verbringt mehr Zeit mit Erklären als mit Bauen. Spätestens beim zweiten Mal lohnt sich ein Skill.</li>
              <li><strong>Brand-Strategie fehlt komplett.</strong> Claude baut, was du beschreibst, aber nicht, <em>was du brauchst.</em> Wer ohne Brand-Vorgaben (Farben, Schrift, Voice, Zielgruppe) startet, bekommt ein technisch korrektes, aber generisches Ergebnis. Brand-Klarheit muss <strong>vor</strong> der ersten Code-Zeile stehen.</li>
            </ul>

            <h2>Bonus: Boris Chernys eigene Tipps</h2>
            <p>Der Gründer von Claude Code teilt seine internen Workflows auf X. Drei davon sind direkt für Anfänger relevant:</p>
            <ul>
              <li><strong>Plan Mode mit Subagents.</strong> Bevor Claude Code schreibt, lass mehrere parallele Subagents die Codebase erkunden. Resultat: ein Plan, der beim ersten Versuch sitzt.</li>
              <li><strong>Compounding Engineering.</strong> Jeder Fehler, den du korrigierst, wird zur permanenten Lesson in CLAUDE.md. Claude wird mit jedem Tag schlauer in deinem Projekt.</li>
              <li><strong>Senior Reviewer.</strong> Eine zweite Claude-Instanz reviewt den Diff ohne Codebase-Context. Findet genau die Bugs, die die erste Instanz übersehen hat.</li>
            </ul>
            <p>Komplette Sammlung mit Setup-Prompts: Sebastian Kaufmann hat die fünf wichtigsten Boris-Tipps zu einem direkt installierbaren Setup-Prompt zusammengefasst, <a href="https://class.skaile.de" target="_blank" rel="noopener">class.skaile.de</a>.</p>

            <h2>Was bedeutet das für dich konkret?</h2>
            <p>Wenn du wirklich an einem Nachmittag eine Webseite mit Claude Code bauen willst, sind die ersten 30 Minuten der wichtigste Teil. Nicht der Code-Sprint danach. <strong>Setup-Zeit ist Bauen-Zeit</strong>, nur unsichtbar.</p>
            <p>Reihenfolge, mit der du verlässlich produktiv wirst:</p>
            <ol>
              <li>Pro-Account und Installation (10 Minuten)</li>
              <li><code>/init</code> + CLAUDE.md aggressiv kürzen auf das, was wirklich dein Projekt prägt (15 Minuten)</li>
              <li>Einen Skill bauen für die häufigste Aufgabe in deinem Projekt (20 Minuten)</li>
              <li>Erst danach: erste echte Komponente bauen lassen</li>
            </ol>
            <p>Diese 45 Minuten Setup ersparen dir später Stunden. Wer ohne Setup losbaut, baut langsamer und kommt nicht weit. Wie Sabala-Mentoring selbst mit Claude Code, Antigravity und Spline gebaut wurde, habe ich in einem eigenen Artikel beschrieben: <Link href="/blog/webseite-mit-ki-bauen-2026">der Premium-Stack 2026</Link>.</p>
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

      {/* Quellen */}
      <section className="px-6 sm:px-12 md:px-24 pt-20 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className="border-l-2 border-refined-gold/40 pl-6">
            <p className="font-mono text-xs uppercase tracking-widest text-refined-gold mb-4">Quellen</p>
            <ul className="font-satoshi text-warm-steel text-sm space-y-3 leading-relaxed">
              <li><strong className="text-deep-charcoal">Sebastian Kaufmann</strong> (Skaile AI Consulting, Hannover), <a href="https://guides.skaile.de" target="_blank" rel="noopener" className="text-refined-gold hover:underline">guides.skaile.de</a>, 73 Claude-Code-Walkthroughs. Setup-Guides 01.02, 01.07 und 01.09 als Hauptquelle für diesen Artikel.</li>
              <li><strong className="text-deep-charcoal">Boris Cherny</strong> (Claude Code Lead, Anthropic), öffentliche Tipps auf X, gesammelt unter <a href="https://class.skaile.de" target="_blank" rel="noopener" className="text-refined-gold hover:underline">class.skaile.de</a>.</li>
              <li><strong className="text-deep-charcoal">Anthropic Claude Code Docs</strong>, <a href="https://docs.anthropic.com/claude-code" target="_blank" rel="noopener" className="text-refined-gold hover:underline">docs.anthropic.com/claude-code</a>.</li>
            </ul>
          </div>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 mt-24 max-w-[1000px] mx-auto w-full">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#2E2B26] border border-white/10 p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 group shadow-[0_30px_60px_rgba(0,0,0,0.1)]">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-refined-gold/10 pointer-events-none" />
            <div className="flex-1 relative z-10 text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                <Sparkles className="w-5 h-5 text-refined-gold" />
                <span className="text-xs font-mono tracking-widest uppercase text-refined-gold">Den Einstieg gemeinsam machen</span>
              </div>
              <h3 className="font-instrument text-3xl md:text-4xl text-white mb-6">Zwei Stunden Begleitung schlagen zwei Wochen Trial-and-Error.</h3>
              <p className="text-white/60 font-satoshi text-lg leading-relaxed mb-8">
                Wer Claude Code für eine echte Premium-Webseite einsetzen will, profitiert vom direkten Sparring mehr als von 13 YouTube-Tutorials. Buch ein 30-Min-Gespräch, ich rechne dir vor, wie viele Stunden Setup-Hilfe dich vor Wochen Such-Frust schützt.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link href="/termin-buchen" className="inline-flex items-center justify-center gap-2 bg-refined-gold text-deep-charcoal hover:bg-white px-8 py-4 transition-colors font-medium rounded-full w-full sm:w-auto">
                  Beratungsgespräch buchen
                </Link>
                <Link href="/premium-angebot" className="text-white/80 hover:text-white px-6 py-4 transition-colors font-medium border border-white/10 rounded-full hover:bg-white/5 w-full sm:w-auto text-center">
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
