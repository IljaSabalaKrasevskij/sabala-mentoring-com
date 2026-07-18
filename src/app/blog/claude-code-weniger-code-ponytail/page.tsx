import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { ArrowLeft, Sparkles, Scissors, Gauge, ShieldCheck, Quote } from "lucide-react";
import { CountUp } from "@/components/blog/CountUp";
import SabalaLogo from "@/components/brand/SabalaLogo";
import AcademyNewsletter from "@/components/akademie/AcademyNewsletter";

const slug = "claude-code-weniger-code-ponytail";
const url = `https://sabala-mentoring.com/blog/${slug}`;
const datePublished = "2026-06-21";

export const metadata = {
  title: "Claude Code am Limit: warum weniger Code dich weiterbringt",
  description:
    "Claude Code baut oft zu viel und steht damit schnell am Limit. Ein kostenloses Plugin dreht das um. Was die viralen Zahlen wirklich sagen, ehrlich nachgerechnet, mit allen Sicherheits-Grenzen.",
  alternates: { canonical: url },
  openGraph: {
    title: "Claude Code am Limit: warum weniger Code dich weiterbringt",
    description: "Ein Befehl, rund 54 Prozent weniger Code, volle Sicherheit. Ehrlich getestet statt viral nachgeplappert.",
    type: "article",
    publishedTime: datePublished,
    url,
    images: [{ url: `${url}/cover.jpg`, width: 1200, height: 630, alt: "Skizze: eine Schere kuerzt eine lange Code-Zeile auf das Noetigste, warmes Lampenlicht ueber einem Schreibtisch" }],
  },
};

const articleSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Claude Code am Limit: warum weniger Code dich weiterbringt",
  description: "Ein kostenloses Plugin laesst Claude Code weniger, aber das Richtige bauen. Ehrlich nachgerechnet.",
  author: { "@type": "Person", name: "Ilja Krasevskij", url: "https://sabala-mentoring.com/ueber-mich" },
  publisher: { "@type": "Organization", name: "Sabala Mentoring" },
  datePublished,
  dateModified: datePublished,
  mainEntityOfPage: { "@type": "WebPage", "@id": url },
  image: `${url}/cover.jpg`,
});

const faq = [
  {
    q: "Ist das Plugin sicher? Verändert es heimlich mein Setup?",
    a: "Nein. Ponytail ist Open Source unter MIT-Lizenz. Ich habe den Code vor dem Einsatz selbst geprüft: keine versteckten Installations-Skripte, keine Netzwerk-Verbindung, kein Zugriff auf deine Passwörter oder Schlüssel. Es schreibt nur kleine lokale Notiz-Dateien und schlägt dir vor, eine Statusanzeige einzurichten. Mehr passiert nicht, und du schaltest es jederzeit mit dem Befehl stop ponytail wieder aus.",
  },
  {
    q: "Schreibt Claude dann schlechteren oder unsicheren Code?",
    a: "Nein, und das ist der wichtigste Punkt. Ponytail kürzt nie an Sicherheit, Eingabe-Prüfung, Fehlerbehandlung oder Barrierefreiheit. Diese Dinge bleiben unverhandelbar. Weniger Code heißt hier weniger Ballast, nicht weniger Sorgfalt. Und weil weniger Code geschrieben wird, gibt es auch weniger Stellen, an denen sich ein Fehler verstecken kann.",
  },
  {
    q: "Stimmen die 94 Prozent weniger Code wirklich?",
    a: "Jein. Die 94 Prozent sind die Obergrenze für einen einzelnen Fall, in dem Claude sonst maßlos überbaut. Im ehrlichen Praxistest an echtem Code über zwölf Aufgaben sind es im Schnitt rund 54 Prozent weniger Code. Das ist immer noch enorm, und es ist belegt, statt schöngerechnet.",
  },
  {
    q: "Brauche ich das, wenn ich kein Entwickler bin?",
    a: "Gerade dann. Wenn du mit Claude Code deine Webseite oder kleine Werkzeuge baust, ohne Profi zu sein, kommst du mit Ponytail deutlich länger voran, bevor du an dein Limit stößt. Und dein Projekt bleibt übersichtlich genug, dass du es noch verstehst.",
  },
];

const faqSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

const levels = [
  { tag: "lite", title: "Sanft", body: "Claude baut, was du sagst, nennt dir aber in einer Zeile die einfachere Alternative. Du entscheidest. Gut zum Reinschnuppern." },
  { tag: "full", title: "Standard", body: "Die Leiter wird durchgesetzt. Standard-Bordmittel und native Features zuerst, kürzester Weg zum Ergebnis. Die Stufe für den Alltag." },
  { tag: "ultra", title: "Maximum", body: "YAGNI bis zum Anschlag. Löschen vor Hinzufügen. Liefert die eine Zeile und hinterfragt den Rest der Anforderung gleich mit." },
];

const stats = [
  { value: 54, approx: true, label: "weniger Code", sub: "im Schnitt, bis 94 % im Extremfall" },
  { value: 22, approx: true, label: "weniger Tokens", sub: "du kommst später ans Limit" },
  { value: 20, approx: true, label: "weniger Kosten", sub: "weniger Tokens, weniger Rechnung" },
  { value: 100, approx: false, label: "Sicherheit erhalten", sub: "kein Schutz wird wegradiert" },
];

const ladder = [
  { t: "Muss das überhaupt sein?", d: "Wird etwas nur auf Verdacht gebaut, fliegt es raus. Die wichtigste Frage." },
  { t: "Gibt es das schon eingebaut?", d: "Die Standard-Werkzeuge der Sprache können mehr, als die meisten denken." },
  { t: "Löst ein natives Feature das?", d: "Ein einfaches Datums-Feld im Browser statt einer ganzen Zusatz-Bibliothek." },
  { t: "Reicht etwas, das schon installiert ist?", d: "Nie ein neues Paket für das, was ein paar Zeilen können." },
  { t: "Geht es in einer Zeile?", d: "Dann eine Zeile." },
  { t: "Erst dann: das Minimum schreiben.", d: "Das absolute Minimum, das funktioniert." },
];

const proseBlock =
  "prose prose-lg md:prose-xl prose-stone max-w-none font-satoshi leading-[1.85] text-warm-steel prose-headings:font-instrument prose-headings:text-deep-charcoal prose-strong:text-deep-charcoal prose-a:text-refined-gold prose-a:no-underline hover:prose-a:underline prose-h2:font-instrument prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-20 prose-h2:mb-8 prose-h2:leading-[1.15] prose-h3:font-instrument prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-5 prose-p:mb-6 prose-ul:my-6 prose-li:mb-2 prose-li:leading-[1.7] prose-code:before:content-none prose-code:after:content-none prose-code:bg-warm-light/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded";

const dropCapClass = "first-letter:font-instrument first-letter:text-[4.5rem] md:first-letter:text-[5.5rem] first-letter:leading-[0.85] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-refined-gold";

function GoldDivider() {
  return (
    <div className="flex items-center gap-4 my-16 max-w-[820px] mx-auto px-6 sm:px-12 md:px-24 w-full">
      <div className="h-px bg-gradient-to-r from-transparent via-refined-gold/30 to-transparent flex-1"></div>
      <div className="w-1.5 h-1.5 rounded-full bg-refined-gold/40"></div>
      <div className="h-px bg-gradient-to-r from-refined-gold/30 via-transparent to-transparent flex-1"></div>
    </div>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <ScrollReveal>
      <blockquote className="not-prose my-16 max-w-[820px] mx-auto px-6 sm:px-12 md:px-24 w-full">
        <div className="border-l-2 border-refined-gold pl-6 md:pl-10 relative">
          <Quote className="absolute -left-3 -top-2 w-6 h-6 text-refined-gold bg-pure-surface" />
          <p className="font-instrument text-2xl md:text-4xl text-deep-charcoal leading-[1.2] italic">{children}</p>
        </div>
      </blockquote>
    </ScrollReveal>
  );
}

export default function BlogClaudeCodeWenigerCodePage() {
  return (
    <main className="flex flex-col w-full bg-pure-surface min-h-screen selection:bg-refined-gold selection:text-white">
      <Script id="schema-article" type="application/ld+json" strategy="beforeInteractive">{articleSchemaJson}</Script>
      <Script id="schema-faq" type="application/ld+json" strategy="beforeInteractive">{faqSchemaJson}</Script>

      <div className="pt-24 md:pt-32 w-full bg-[#2E2B26]"></div>

      {/* HERO */}
      <section className="relative w-full aspect-square md:aspect-[21/9] max-h-[800px] overflow-hidden bg-[#1a1612]">
        <Image src={`/blog/${slug}/cover.jpg`} alt="Skizze: eine Schere kuerzt eine lange Code-Zeile auf das Noetigste, warmes Lampenlicht ueber einem Schreibtisch" fill className="object-cover opacity-45" priority />
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
              <span className="bg-refined-gold/15 text-refined-gold px-3 py-1 rounded-full border border-refined-gold/40">KI Academy &middot; How-to</span>
              <span className="text-pure-surface/75">Juni 2026</span>
              <span className="text-pure-surface/50 hidden sm:inline-block">•</span>
              <span className="text-pure-surface/75 hidden sm:inline-block">8 Min Lesezeit</span>
            </div>
            <h1 className="font-instrument text-[clamp(2.5rem,5vw,5rem)] text-pure-surface leading-[1.05] max-w-[1100px] mb-6">
              Claude Code am Limit? <span className="italic text-refined-gold">Warum weniger Code dich weiterbringt.</span>
            </h1>
            <p className="text-pure-surface/80 text-lg md:text-xl font-satoshi max-w-[760px] leading-relaxed">
              Claude Code baut oft mehr, als deine Aufgabe braucht, und steht damit schnell am Limit. Ein kostenloses Plugin dreht das um. Hier ist, was es wirklich bringt, ehrlich nachgerechnet statt viral nachgeplappert.
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
              <strong>Ponytail</strong> ist ein kostenloses Open-Source-Plugin für Claude Code. Mit einem Befehl bringst du Claude bei, vor jeder Zeile zu fragen: muss das überhaupt sein? Das Ergebnis im ehrlichen Praxistest: rund <strong>54 Prozent weniger Code</strong>, etwa 20 Prozent weniger Kosten, spürbar schneller, und die Sicherheit bleibt voll erhalten. Du arbeitest also deutlich länger, bevor du an dein Limit kommst.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* DAS PROBLEM */}
      <section className="px-6 sm:px-12 md:px-24 pt-20 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Das Problem: Claude baut zu viel</h2>
            <p className={dropCapClass}>Du gibst Claude Code eine kleine Aufgabe, und zurück kommt eine kleine Software. Eine Extra-Klasse hier, eine Abstraktion für später da, ein Stück Gerüst, nach dem niemand gefragt hat. Das fühlt sich gründlich an, kostet dich aber doppelt.</p>
            <p>Mehr Code heißt mehr Tokens, und mehr Tokens heißt: du stehst nach wenigen Minuten an deinem Limit, oft mit Code, den du gar nicht gebraucht hättest. Dazu kommt das Stillere: jede zusätzliche Zeile ist eine zusätzliche Stelle, an der sich ein Fehler oder eine Sicherheitslücke verstecken kann.</p>
            <p>Das zählt gerade jetzt doppelt. Sobald <strong>Fable 5</strong> zurückkommt, hast du das stärkste Modell der Welt, aber auch das teuerste. Es frisst dein Limit etwa doppelt so schnell wie Opus. Wer so ein Modell mit halb so viel Code pro Aufgabe nutzt, holt das Doppelte raus, bevor die Wartezeit kommt.</p>
          </div>
        </ScrollReveal>
      </section>

      {/* DIE IDEE */}
      <section className="px-6 sm:px-12 md:px-24 pt-20 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Die Idee: denken wie der faulste Senior-Dev</h2>
            <p className={dropCapClass}><em>Faul</em> heißt hier nicht schludrig, faul heißt effizient. Der beste Code ist der, den du nie schreibst. Ponytail bringt Claude bei, vor jeder Zeile eine kurze Leiter durchzugehen und beim ersten Punkt zu stoppen, der trägt:</p>
          </div>
        </ScrollReveal>

        <div className="mt-10 flex flex-col gap-4">
          {ladder.map((l, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className="flex items-baseline gap-5 bg-warm-light/30 border-l-4 border-refined-gold rounded-r-2xl pl-6 pr-6 md:pl-8 py-5 md:py-6">
                <span className="font-instrument text-3xl md:text-4xl text-refined-gold/50 leading-none flex-shrink-0 w-10">{i + 1}</span>
                <p className="font-satoshi text-deep-charcoal text-base md:text-lg leading-relaxed m-0"><strong>{l.t}</strong> <span className="text-warm-steel">{l.d}</span></p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.1}>
          <div className="mt-10 aspect-[16/9] relative rounded-2xl overflow-hidden border border-refined-gold/15">
            <Image src={`/blog/${slug}/ladder.jpg`} alt="Skizze: eine Treppe aus Code-Zeilen, jede Stufe kuerzer als die vorige, bis auf eine einzige saubere Zeile" fill className="object-cover" />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className={`${proseBlock} mt-10`}>
            <p>Das Schöne daran: es ist ein Reflex, kein Forschungsprojekt. Claude entscheidet in Sekunden und baut weiter. Du merkst es nur daran, dass die Antworten kürzer und klarer werden.</p>
          </div>
        </ScrollReveal>
      </section>

      <PullQuote>Der beste Code ist der, den du nie schreibst.</PullQuote>

      {/* DARK: DREI STUFEN */}
      <section className="px-6 sm:px-12 md:px-24 pt-20 max-w-[1100px] mx-auto w-full">
        <ScrollReveal>
          <div className="bg-deep-charcoal text-pure-surface rounded-[28px] p-8 md:p-14 border border-refined-gold/30 shadow-[0_30px_70px_rgba(184,150,62,0.12)]">
            <div className="flex items-center gap-3 mb-6">
              <Scissors className="w-5 h-5 text-refined-gold" />
              <span className="font-mono text-refined-gold text-xs tracking-[0.22em] uppercase font-bold">Du bestimmst, wie streng</span>
            </div>
            <h2 className="font-instrument text-3xl md:text-5xl text-pure-surface leading-tight mb-10">
              Drei Stufen, <span className="italic text-refined-gold">ein Befehl.</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {levels.map((l) => (
                <div key={l.tag}>
                  <div className="font-mono text-refined-gold text-xs tracking-[0.22em] uppercase mb-3">/ponytail {l.tag}</div>
                  <h3 className="font-instrument text-xl text-pure-surface mb-3">{l.title}</h3>
                  <p className="font-satoshi text-pure-surface/70 text-sm leading-relaxed">{l.body}</p>
                </div>
              ))}
            </div>
            <p className="font-satoshi text-pure-surface/55 text-sm leading-relaxed mt-10 pt-8 border-t border-white/10">
              Bestehenden Code kannst du dir mit <code className="text-refined-gold/90">/ponytail-review</code> auf unnötige Teile durchleuchten lassen. Und mit <code className="text-refined-gold/90">stop ponytail</code> ist alles wieder normal.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* DIE EHRLICHEN ZAHLEN */}
      <section className="px-6 sm:px-12 md:px-24 pt-24 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Die ehrlichen Zahlen</h2>
            <p>Hier trennt sich ehrlich von viral. Auf vielen Seiten liest du jetzt: bis zu 94 Prozent weniger Code, drei bis sechs Mal schneller, bis zu 77 Prozent günstiger. Diese Zahlen stammen aus einem einzelnen Test mit jeweils einem Prompt. Der Entwickler selbst hat öffentlich eingeräumt, dass dieser Aufbau die Vergleichszahl schönt, weil das Modell ohne Plugin seine Antwort mit viel Prosa aufbläht.</p>
            <p>Die ehrliche Messung sieht anders aus: ein echter Claude-Code-Lauf an einem echten Open-Source-Projekt, zwölf Aufgaben, einmal mit und einmal ohne Plugin verglichen. Das ist das Ergebnis, auf das du dich verlassen kannst:</p>
          </div>
        </ScrollReveal>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 0.06}>
              <div className="bg-[#2E2B26] p-6 md:p-7 rounded-2xl border border-refined-gold/20 h-full flex flex-col">
                <span className="font-instrument text-4xl md:text-5xl text-refined-gold leading-none mb-2">{s.approx ? "~" : ""}<CountUp to={s.value} suffix=" %" /></span>
                <span className="font-satoshi text-pure-surface font-semibold text-sm mb-1">{s.label}</span>
                <span className="font-satoshi text-pure-surface/65 text-xs leading-snug">{s.sub}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal>
          <div className={`${proseBlock} mt-10`}>
            <p>Die 94 Prozent sind nicht erfunden, sie sind die Obergrenze für den einen Fall, in dem Claude sonst maßlos überbaut. Ein Datums-Auswähler schrumpft von 404 auf 23 Zeilen, weil Ponytail einfach das native Feld nimmt. Im Schnitt über alle Aufgaben sind es rund 54 Prozent. Das ist immer noch enorm, und es ist belegt statt schöngerechnet.</p>
          </div>
        </ScrollReveal>
      </section>

      {/* WAS BEDEUTET DAS FUER DICH */}
      <section className="px-6 sm:px-12 md:px-24 pt-20 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Was das für dich bedeutet</h2>
            <p>Kurz gesagt: du arbeitest länger, bevor du an dein Limit kommst, dein Projekt bleibt übersichtlich, und du zahlst für weniger Tokens. Drei Vorteile aus einer einzigen Umstellung.</p>
            <div className="not-prose grid sm:grid-cols-3 gap-5 my-8">
              <div className="bg-warm-light/40 rounded-xl p-6 border border-refined-gold/10">
                <Gauge className="w-6 h-6 text-refined-gold mb-3" />
                <p className="font-satoshi text-deep-charcoal text-sm leading-relaxed"><strong>Mehr Strecke pro Sitzung.</strong> Weniger Tokens pro Aufgabe heißt, du kommst spürbar weiter, bevor die Wartezeit kommt.</p>
              </div>
              <div className="bg-warm-light/40 rounded-xl p-6 border border-refined-gold/10">
                <Scissors className="w-6 h-6 text-refined-gold mb-3" />
                <p className="font-satoshi text-deep-charcoal text-sm leading-relaxed"><strong>Code, den du noch verstehst.</strong> Weniger Zeilen heißt weniger Stellen für Fehler und ein Projekt, das nicht über dir zusammenbricht.</p>
              </div>
              <div className="bg-warm-light/40 rounded-xl p-6 border border-refined-gold/10">
                <ShieldCheck className="w-6 h-6 text-refined-gold mb-3" />
                <p className="font-satoshi text-deep-charcoal text-sm leading-relaxed"><strong>Sicherheit bleibt.</strong> Eingabe-Prüfung, Fehlerbehandlung und Barrierefreiheit werden nie wegradiert. Nur der Ballast.</p>
              </div>
            </div>
            <p>Das ist der Punkt, den die viralen Posts gern unterschlagen, und der gerade für alle zählt, die mit KI bauen, ohne Entwickler zu sein: Ponytail kürzt nie an der falschen Stelle. Weniger Code heißt hier weniger Ballast, nicht weniger Sorgfalt.</p>
          </div>
        </ScrollReveal>
      </section>

      {/* INSTALLATION */}
      <section className="px-6 sm:px-12 md:px-24 pt-20 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>In unter einer Minute eingerichtet</h2>
            <p>Ponytail ist ein Plugin für Claude Code. Du installierst es mit zwei kurzen Befehlen direkt im Chat, dann schaltest du die Stufe ein, die du willst. Ich habe den Code vorher selbst geprüft: keine versteckten Skripte, keine Netzwerk-Verbindung, kein Zugriff auf deine Daten.</p>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="mt-6 rounded-2xl bg-[#15120d] border border-refined-gold/20 p-6 md:p-8 font-mono text-sm leading-relaxed overflow-x-auto">
            <p className="text-pure-surface/40 mb-2"># 1. Plugin installieren (in Claude Code)</p>
            <p className="text-refined-gold/90">/plugin marketplace add DietrichGebert/ponytail</p>
            <p className="text-refined-gold/90 mb-5">/plugin install ponytail@ponytail</p>
            <p className="text-pure-surface/40 mb-2"># 2. Stufe waehlen</p>
            <p className="text-pure-surface/90">/ponytail full</p>
            <p className="text-pure-surface/50 mb-5">lite, full oder ultra. full ist der gute Standard.</p>
            <p className="text-pure-surface/40 mb-2"># 3. Bestehenden Code pruefen lassen</p>
            <p className="text-pure-surface/90">/ponytail-review</p>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className={`${proseBlock} mt-8`}>
            <p>Das war es. Open Source, kostenlos, MIT-Lizenz. Wer tiefer einsteigen will: in meinem Artikel <Link href="/blog/webseiten-bau-mit-claude-anfaenger">der ehrliche Anfänger-Guide</Link> zeige ich, wie du Claude Code überhaupt erst sauber aufsetzt, mit CLAUDE.md, Skills und den häufigsten Anfänger-Fehlern.</p>
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

      {/* SPOKES / WEITERLESEN */}
      <section className="px-6 sm:px-12 md:px-24 pt-24 max-w-[1100px] mx-auto w-full">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-widest text-refined-gold mb-4 text-center">Was du als Nächstes liest</p>
          <h2 className="font-instrument text-3xl md:text-4xl text-deep-charcoal text-center mb-12 leading-[1.1]">Mehr aus der KI-Akademie.</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: "/blog/webseiten-bau-mit-claude-anfaenger", tag: "KI Academy", title: "Webseiten-Bau mit Claude Code: der ehrliche Anfänger-Guide" },
            { href: "/blog/webseite-mit-ki-bauen-2026", tag: "KI & Webseiten", title: "Webseite mit KI bauen 2026: der Premium-Stack" },
            { href: "/blog/seo-und-geo-fuer-personal-brands-2026", tag: "SEO & GEO", title: "SEO und GEO: in Google und ChatGPT gefunden werden" },
          ].map((s, i) => (
            <ScrollReveal key={s.href} delay={i * 0.05}>
              <Link href={s.href} className="block h-full bg-warm-light/30 border border-warm-steel/15 rounded-xl p-6 hover:border-refined-gold/50 hover:bg-warm-light/50 transition-all duration-300">
                <span className="font-mono text-xs uppercase tracking-widest text-refined-gold">{s.tag}</span>
                <h3 className="font-instrument text-lg text-deep-charcoal mt-2 leading-snug">{s.title}</h3>
              </Link>
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
                <span className="text-xs font-mono tracking-widest uppercase text-refined-gold">Claude Code wirklich beherrschen</span>
              </div>
              <h3 className="font-instrument text-3xl md:text-4xl text-white mb-6">Ponytail ist ein Anfang. Das ganze Setup lernst du in der KI-Akademie.</h3>
              <p className="text-white/60 font-satoshi text-lg leading-relaxed mb-8">
                Ein Plugin spart dir Tokens. Das richtige Setup macht aus Claude Code deinen KI-Mitarbeiter. In der Akademie zeige ich dir die Skills, Workflows und Kniffe, die im Alltag wirklich etwas bringen, Schritt für Schritt und ohne Tech-Studium.
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

      {/* AKADEMIE-NEWSLETTER — Lead-Capture für künftige Kurse (gleiche Komponente wie /akademie) */}
      <div className="mt-20 md:mt-28">
        <AcademyNewsletter />
      </div>
    </main>
  );
}
