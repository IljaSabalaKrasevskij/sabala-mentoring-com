import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import { BlogSpokes } from "@/components/blog/BlogSpokes";
import { dropCapClass } from "@/components/blog/BlogProse";
import SabalaLogo from "@/components/brand/SabalaLogo";
import Script from "next/script";
import { ArrowLeft, Sparkles, Layers } from "lucide-react";

const slug = "webseiten-bau-mit-claude-anfaenger";
const url = `https://sabala-mentoring.com/blog/${slug}`;
const datePublished = "2026-06-18";

export const metadata = {
  title: "Webseiten-Bau mit Claude Code: der ehrliche Anfänger-Guide",
  description:
    "Was die meisten beim ersten Claude-Code-Setup falsch machen, und wie der Einstieg wirklich in 45 Minuten produktiv wird. Die drei Pflicht-Dateien und die fünf häufigsten Fehler.",
  alternates: { canonical: url },
  openGraph: {
    title: "Webseiten-Bau mit Claude Code: der ehrliche Anfänger-Guide",
    description: "Drei Pflicht-Dateien, fünf typische Fehler, klarer Einstieg in 45 Minuten.",
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
  description: "Drei Pflicht-Dateien, fünf typische Fehler, klarer Einstieg.",
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
    a: "Hilft, ist aber nicht zwingend. Wer noch nie Code gesehen hat, sollte mit einem kleinen Projekt starten, nicht mit einer ganzen Webseite. Ich begleite regelmäßig Berater und Coaches ohne Tech-Hintergrund, die nach ein bis zwei Wochen produktiv bauen.",
  },
  {
    q: "Reicht Claude.ai im Browser nicht?",
    a: "Nein, weil Claude.ai keinen Zugriff auf deine Dateien hat. Du müsstest jeden Code-Block hin und her kopieren. Claude Code ist genau das Werkzeug, das diese Kopier-Hölle wegnimmt.",
  },
  {
    q: "Welcher Editor passt am besten dazu?",
    a: "VS Code ist der Standard, weil Anthropic eine offizielle Extension dafür anbietet. Für den Einstieg reicht das vollständig. Alternativen wie Cursor oder Zed funktionieren auch, sind aber ein Umweg.",
  },
  {
    q: "Wie schnell amortisiert sich der Setup-Aufwand?",
    a: "Bei der nächsten Komponente. Eine sauber eingerichtete CLAUDE.md plus ein Skill für deine häufigste Aufgabe sparen pro Komponente zehn bis fünfzehn Minuten Erklärungs-Aufwand. Bei einer Webseite mit zehn Komponenten amortisiert sich Setup schon im ersten Sprint.",
  },
];

const faqSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

const proseBlock =
  "prose prose-lg md:prose-xl prose-stone max-w-none font-satoshi leading-[1.85] text-warm-steel prose-headings:font-instrument prose-headings:text-deep-charcoal prose-strong:text-deep-charcoal prose-a:text-refined-gold prose-a:no-underline hover:prose-a:underline prose-h2:font-instrument prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-20 prose-h2:mb-8 prose-h2:leading-[1.15] prose-h3:font-instrument prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-5 prose-p:mb-6 prose-ul:my-6 prose-li:mb-2 prose-li:leading-[1.7] prose-code:before:content-none prose-code:after:content-none prose-code:bg-warm-light/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded";

export default function BlogWebseitenBauMitClaudePage() {
  return (
    <main className="flex flex-col w-full bg-pure-surface min-h-screen selection:bg-refined-gold selection:text-white pb-32">
      <Script id="schema-article" type="application/ld+json" strategy="beforeInteractive">{articleSchemaJson}</Script>
      <Script id="schema-faq" type="application/ld+json" strategy="beforeInteractive">{faqSchemaJson}</Script>

      <div className="pt-24 md:pt-32 w-full bg-[#2E2B26]"></div>

      {/* HERO */}
      <section className="relative w-full aspect-square md:aspect-[21/9] max-h-[800px] overflow-hidden bg-[#1a1612]">
        <Image src={`/blog/${slug}/cover.jpg`} alt="Skizze: aufgeschlagenes Notizbuch mit Wireframe und Bleistift neben einem Laptop unter warmem Lampenlicht" fill className="object-cover opacity-45" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0a] via-[#1a1612]/85 to-[#1a1612]/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0c0a]/85 via-[#1a1612]/35 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full px-6 sm:px-12 md:px-24 pb-16 md:pb-24 max-w-[1400px] mx-auto z-10">
          <ScrollReveal>
            <Link href="/" aria-label="Sabala Mentoring — Startseite" className="inline-block mb-8 transition-opacity hover:opacity-80">
              <SabalaLogo light size={64} />
            </Link>
            <Link href="/blog" className="inline-flex items-center gap-2 text-pure-surface/70 hover:text-refined-gold transition-colors font-mono text-xs uppercase tracking-widest mb-10">
              <ArrowLeft className="w-4 h-4" /> Zurück zum Journal
            </Link>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-widest mb-6">
              <span className="bg-refined-gold/15 text-refined-gold px-3 py-1 rounded-full border border-refined-gold/40">KI Academy &middot; How-to</span>
              <span className="text-pure-surface/75">Juni 2026</span>
              <span className="text-pure-surface/50 hidden sm:inline-block">•</span>
              <span className="text-pure-surface/75 hidden sm:inline-block">6 Min Lesezeit</span>
            </div>
            <h1 className="font-instrument text-[clamp(2.5rem,5vw,5rem)] text-pure-surface leading-[1.05] max-w-[1100px] mb-6">
              Webseiten-Bau mit Claude Code: <span className="italic text-refined-gold">der ehrliche Anfänger-Guide.</span>
            </h1>
            <p className="text-pure-surface/80 text-lg md:text-xl font-satoshi max-w-[760px] leading-relaxed">
              Warum die meisten am ersten Tag scheitern, was wirklich auf dein Projekt gehört, und wie du in 45 Minuten produktiv wirst. Aus der Praxis, in der ich selbst täglich baue.
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
              Claude Code wird zum produktiven Werkzeug, sobald drei Dinge stimmen: ein <strong>Pro-Account</strong>, eine <strong>kurze, präzise CLAUDE.md</strong> im Projekt-Root, und mindestens <strong>ein wiederverwendbarer Skill</strong> für die Aufgabe, die du am häufigsten brauchst. MCPs kommen später. Mehr brauchst du in den ersten Wochen nicht.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* CLAUDE CODE = NICHT CHATGPT */}
      <section className="px-6 sm:px-12 md:px-24 pt-20 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Warum die meisten am ersten Tag scheitern</h2>

            <p className={dropCapClass}>Du sitzt vor einem leeren Terminal, der Cursor blinkt, und plötzlich ist jeder Schritt eine Frage. Du hast irgendwo gelesen, dass man mit Claude Code in einem Nachmittag eine Webseite baut, und jetzt funktioniert bei dir nichts so, wie es bei anderen scheint zu funktionieren.</p>

            <p>Diese Lücke zwischen <em>„geht angeblich"</em> und <em>„läuft bei mir"</em> hat genau eine Ursache: <strong>Claude Code ist kein Chat.</strong> Es ist ein Werkzeug im Terminal, das deinen Projekt-Ordner liest, deine Dateien öffnet, neuen Code schreibt und Tests ausführt. Wenn du es mit dem Chat-Muster fütterst, das du von ChatGPT kennst, bekommst du Chat-Antworten zurück. Wenn du es mit einem <strong>klaren Setup</strong> fütterst, bekommst du fertige Webseiten-Komponenten.</p>

            <p>Das ist die ganze Geschichte. Setup-Zeit ist Bauen-Zeit, nur unsichtbar. Wer 30 Minuten in das Setup steckt, baut danach in Stunden, was sonst Tage gedauert hätte.</p>
          </div>
        </ScrollReveal>
      </section>

      {/* 3 Dateien — Highlight-Block */}
      <section className="px-6 sm:px-12 md:px-24 pt-20 max-w-[1100px] mx-auto w-full">
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
                <p className="font-satoshi text-pure-surface/70 text-sm leading-relaxed">Eine einzige Markdown-Datei im Projekt-Root. Claude lädt sie automatisch bei jedem Start. Hier rein kommen Tech-Stack, Konventionen, deine Don'ts. <strong className="text-pure-surface">Maximal 200 Zeilen.</strong> Kürzer ist besser, weil jeder zusätzliche Satz Kontext kostet, den Claude später beim Bauen braucht.</p>
              </div>
              <div>
                <div className="font-instrument text-3xl text-refined-gold mb-3">02</div>
                <h3 className="font-instrument text-xl text-pure-surface mb-3">Skills</h3>
                <p className="font-satoshi text-pure-surface/70 text-sm leading-relaxed">Wiederverwendbare Workflows, die du als Slash-Command aufrufst. Jeder Skill ist ein Ordner mit einer SKILL.md plus Helper-Skripten. Aufruf über <code className="text-refined-gold/90">/skill-name</code>. Ein einziger Skill für deine häufigste Aufgabe reicht für den Start.</p>
              </div>
              <div>
                <div className="font-instrument text-3xl text-refined-gold mb-3">03</div>
                <h3 className="font-instrument text-xl text-pure-surface mb-3">MCPs</h3>
                <p className="font-satoshi text-pure-surface/70 text-sm leading-relaxed">Verbinden Claude mit externen Tools: Datenbank, Browser, Notion, Slack. Für deine erste Webseite brauchst du <strong className="text-pure-surface">keinen einzigen MCP.</strong> Das wird erst ab Woche zwei oder drei interessant, wenn du etwas wirklich integrieren willst.</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 5 ANFAENGER-FEHLER */}
      <section className="px-6 sm:px-12 md:px-24 pt-24 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Die fünf häufigsten Anfänger-Fehler</h2>

            <p>Aus dem, was ich bei eigenen Projekten und in der Begleitung anderer immer wieder sehe.</p>

            <h3>1. CLAUDE.md wird zu lang</h3>
            <p>Wer alle Projekt-Details in die CLAUDE.md schreibt, frisst den Kontext auf, bevor Claude die erste Zeile Code geschrieben hat. <strong>Lieber kurz und konkret.</strong> Konkrete Anweisungen wie <em>„2-Space Indentation"</em> funktionieren deutlich besser als vage Anweisungen wie <em>„formatiere schön"</em>.</p>

            <h3>2. Claude wird im falschen Verzeichnis gestartet</h3>
            <p>Wer <code>claude</code> außerhalb des Projekt-Roots aufruft, hat keinen Zugriff auf die CLAUDE.md und keinen Codebase-Kontext. <strong>Erkennbar daran, dass Claude generische Antworten gibt</strong> statt projekt-spezifischer. Lösung: vorher immer <code>cd dein-projekt</code>.</p>

            <h3>3. Free-Account statt Pro</h3>
            <p>Die Token-Limits im Free-Tier reichen für maximal zehn Minuten echte Arbeit, danach kommt Wartezeit. <strong>Wer ernsthaft baut, braucht Pro.</strong> 20 Euro im Monat sind weniger als eine Stunde Frust.</p>

            <h3>4. Keine Skills, jedes Mal alles neu erklären</h3>
            <p>Wer dieselbe Aufgabe fünfmal ohne Skill macht, verbringt mehr Zeit mit Erklären als mit Bauen. <strong>Spätestens beim zweiten Mal lohnt sich ein Skill.</strong> Das ist die Investition, die sich am schnellsten zurückzahlt.</p>

            <h3>5. Brand-Strategie fehlt komplett</h3>
            <p>Claude baut, was du beschreibst, aber nicht, <em>was du brauchst.</em> Wer ohne Brand-Vorgaben (Farben, Schrift, Voice, Zielgruppe) startet, bekommt ein technisch korrektes, aber generisches Ergebnis. <strong>Brand-Klarheit muss vor der ersten Code-Zeile stehen.</strong></p>
          </div>
        </ScrollReveal>
      </section>

      {/* WAS DU IN 45 MIN ERREICHST */}
      <section className="px-6 sm:px-12 md:px-24 pt-20 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Was du in 45 Minuten erreichen kannst</h2>
            <p>Wenn du wirklich an einem Nachmittag eine Webseite mit Claude Code bauen willst, sind die ersten 45 Minuten der wichtigste Teil. Nicht der Code-Sprint danach.</p>
            <ol>
              <li><strong>10 Minuten</strong> für Pro-Account und Installation.</li>
              <li><strong>15 Minuten</strong> für eine kurze, präzise CLAUDE.md, die dein Projekt prägt.</li>
              <li><strong>20 Minuten</strong> für deinen ersten Skill, der die häufigste Aufgabe in deinem Projekt automatisiert.</li>
            </ol>
            <p>Erst danach beginnst du mit der ersten echten Komponente. Diese 45 Minuten ersparen dir später Stunden. Wer ohne Setup losbaut, baut langsamer und kommt nicht weit. Wie sabala-mentoring.com selbst mit diesem Setup gebaut wurde, beschreibe ich im Artikel <Link href="/blog/webseite-mit-ki-bauen-2026">der Premium-Stack 2026</Link>.</p>
          </div>
        </ScrollReveal>
      </section>

      {/* FAQ */}
      {/* Visueller Anker */}
      <section className="px-6 sm:px-12 md:px-24 pt-12 max-w-[1100px] mx-auto w-full">
        <ScrollReveal>
          <div className="aspect-[16/9] relative rounded-2xl overflow-hidden border border-refined-gold/15">
            <Image src="/blog/webseiten-bau-mit-claude-anfaenger/firststeps.jpg" alt="Skizze: ein aufgeraeumter Anfaenger-Schreibtisch mit offenem Laptop und ersten Code-Zeilen, ein klarer erster Aufbau" fill className="object-cover" />
          </div>
        </ScrollReveal>
      </section>

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
                <span className="text-xs font-mono tracking-widest uppercase text-refined-gold">Claude Code richtig lernen</span>
              </div>
              <h3 className="font-instrument text-3xl md:text-4xl text-white mb-6">Den Einstieg gemeinsam machen, in der KI-Akademie.</h3>
              <p className="text-white/60 font-satoshi text-lg leading-relaxed mb-8">
                Wer Claude Code wirklich für die eigene Webseite nutzen will, kommt mit Anleitung schneller voran als mit zehn YouTube-Tutorials. In der KI-Akademie zeige ich dir das ganze Setup, Schritt für Schritt und ohne Tech-Studium.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link href="/akademie" className="inline-flex items-center justify-center gap-2 bg-refined-gold text-deep-charcoal hover:bg-white px-8 py-4 transition-colors font-medium rounded-full w-full sm:w-auto">
                  KI-Akademie ansehen
                </Link>
                <Link href="/termin-buchen" className="text-white/80 hover:text-white px-6 py-4 transition-colors font-medium border border-white/10 rounded-full hover:bg-white/5 w-full sm:w-auto text-center">
                  Beratungsgespräch buchen
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
      <BlogSpokes slugs={["claude-code-weniger-code-ponytail", "webseite-mit-ki-bauen-2026", "chatgpt-custom-gpts-richtig-nutzen"]} />
    </main>
  );
}
