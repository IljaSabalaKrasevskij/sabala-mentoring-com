import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import { Download, Wallet, Laptop, Gauge, Terminal, AppWindow, Globe, Mail, Brain, Share2, Presentation, Sparkles, ArrowRight } from "lucide-react";
import { CountUp } from "@/components/blog/CountUp";
import { dropCapClass, GoldDivider, PullQuote } from "@/components/blog/BlogProse";
import AcademyNewsletter from "@/components/akademie/AcademyNewsletter";

const site = "https://sabala-mentoring.com";
const url = `${site}/claude-code`;

const heroBild = {
  src: "/claude-code/hero.jpg",
  alt: "Skizze: ein Mann arbeitet am Abend an einem Holzschreibtisch am Laptop, um ihn herum ordentlich sortierte Stapel aus Briefen, Notizen und einem Webseiten-Entwurf",
};
const iljaFoto = { src: "/akademie/ilja-trainer-2026.jpg", alt: "Ilja Krasevskij, Gründer von Sabala Studios" };

const title = "Claude Code auf Deutsch: einrichten, Kosten, Skills";
const description =
  "Claude Code einfach erklärt: was es ist, wie du es installierst, was es kostet und welche Befehle du brauchst. Aus dem Alltag eines echten Geschäfts.";

export const metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description: "Was Claude Code ist, wie du es einrichtest, was es kostet und wie ich damit mein Geschäft führe.",
    type: "website",
    url,
    images: [{ url: `${site}${heroBild.src}`, width: 1280, height: 720, alt: heroBild.alt }],
  },
};

const autor = {
  "@type": "Person",
  name: "Ilja Krasevskij",
  url: `${site}/ueber-mich`,
  sameAs: ["https://www.linkedin.com/in/sabala-mentoring/"],
  jobTitle: "Founder, Sabala Studios",
  knowsAbout: ["Claude Code", "KI im Unternehmen", "Webseiten mit KI", "Second Brain"],
};

const start = [
  { href: "/blog/claude-code-installieren", icon: Download, t: "Wie installiere ich Claude Code?", d: "Schritt für Schritt für Mac und Windows, dazu der Weg ohne Terminal." },
  { href: "/blog/claude-code-kosten", icon: Wallet, t: "Was kostet Claude Code?", d: "Alle Pläne von Pro bis Enterprise und wann sich die API lohnt." },
  { href: "/blog/webseiten-bau-mit-claude-anfaenger", icon: Laptop, t: "Wie baue ich meine erste Webseite?", d: "Die drei Dateien, die jedes Projekt braucht, und die typischen Fehler am Anfang." },
  { href: "/blog/claude-code-weniger-code-ponytail", icon: Gauge, t: "Wie komme ich weiter, bevor das Limit kommt?", d: "Ein kostenloses Plugin, das Claude weniger Code schreiben lässt." },
];

const vergleich = [
  { t: "Claude im Chat", punkte: ["Du fragst, Claude antwortet.", "Ergebnisse kopierst du selbst weiter.", "Claude sieht nur, was du ihm gibst."] },
  { t: "Claude Code", punkte: ["Claude arbeitet in deinem Projektordner.", "Es schreibt, ändert und prüft Dateien selbst.", "Es führt Befehle aus, mit deiner Erlaubnis."] },
];

const wege = [
  { icon: Terminal, t: "Im Terminal", d: "Ein Befehl, und Claude Code läuft auf Mac, Windows oder Linux. Der schnellste Weg und der mit den meisten Möglichkeiten." },
  { icon: AppWindow, t: "In der Desktop-App", d: "Die Claude-App für Mac und Windows hat einen eigenen Bereich für Code. Du wählst einen Ordner und schreibst los, ganz ohne Terminal." },
  { icon: Globe, t: "Im Browser", d: "Unter claude.ai/code läuft Claude Code in der Cloud. Dafür verbindest du ein Projekt, das auf GitHub liegt." },
];

// Quelle: claude.com/pricing, abgerufen am 11.11.2026, USD pro Monat ohne Steuer.
const preise = [
  { plan: "Pro", preis: "20 $", info: "17 $ bei Jahreszahlung, zum Lernen und für kleinere Projekte" },
  { plan: "Max", preis: "100 $", info: "fünfmal so viel Nutzung wie Pro" },
  { plan: "Ultra", preis: "200 $", info: "zehnmal so viel Nutzung wie Pro pro Woche" },
  { plan: "Team", preis: "ab 20 $", info: "pro Platz bei Jahreszahlung, für 2 bis 150 Personen" },
];

const befehle = [
  { k: "/init", d: "Legt die CLAUDE.md mit den Regeln deines Projekts an." },
  { k: "/clear", d: "Startet eine neue Unterhaltung mit leerem Verlauf." },
  { k: "/compact", d: "Fasst einen langen Verlauf zusammen." },
  { k: "/model", d: "Wechselt das Modell, etwa zu Sonnet." },
  { k: "/usage", d: "Zeigt, wie viel du schon verbraucht hast." },
  { k: "Shift + Tab", d: "Stellt um, was Claude ohne Rückfrage darf." },
];

const alltag = [
  { icon: Mail, t: "Mein Mailprogramm mit Kundenliste", d: "Postfach, Entwürfe und Kunden an einem Ort, selbst gebaut." },
  { icon: Brain, t: "Mein Second Brain", d: "Über 2.200 Notizen, in denen Claude bei jeder Aufgabe nachschlägt." },
  { icon: Share2, t: "Mein Social-Media-Cockpit", d: "Beiträge und Reels planen, prüfen und freigeben." },
  { icon: Globe, t: "Webseiten für Kunden", d: "Aus eigenem Code, schnell und sichtbar bei Google und in KI-Antworten." },
  { icon: Presentation, t: "Berichte und Präsentationen", d: "Analysen und Folien in meinem Design, aus meinen eigenen Daten." },
];

const faq = [
  {
    q: "Was ist Claude Code?",
    a: "Claude Code ist ein KI-Werkzeug von Anthropic, das direkt in deinem Projektordner arbeitet. Es liest Dateien, schreibt und ändert sie und führt Befehle aus, immer mit deiner Erlaubnis. Du nutzt es im Terminal, in der Claude-Desktop-App oder im Browser unter claude.ai/code. Damit baust du Webseiten, ordnest Wissen oder automatisierst Aufgaben, die immer wiederkehren.",
  },
  {
    q: "Ist Claude Code kostenlos?",
    a: "Nein. Der kostenlose Claude-Plan enthält Claude Code nicht. Du brauchst Pro für 20 US-Dollar im Monat, bei Jahreszahlung 17 Dollar, oder einen größeren Plan wie Max oder Ultra. Alternativ zahlst du über ein API-Konto nach Verbrauch. Anthropic nennt alle Preise ohne Steuer.",
  },
  {
    q: "Brauche ich Programmierkenntnisse für Claude Code?",
    a: "Für den Anfang nicht. Du beschreibst in normalen Sätzen, was du willst, und Claude Code setzt es um. Wichtig ist, dass du Ergebnisse prüfst und weißt, was in welchem Ordner liegt. Wer das Terminal scheut, startet mit der Desktop-App. Das Wissen wächst dann mit jedem Projekt.",
  },
  {
    q: "Läuft Claude Code auf Windows?",
    a: "Ja. Ab Windows 10 Version 1809 installierst du Claude Code mit einem Befehl in PowerShell, ohne Administratorrechte. Git für Windows wird empfohlen, ist aber keine Pflicht. Alternativ nutzt du die Claude-Desktop-App für Windows, dort arbeitest du ganz ohne Terminal.",
  },
  {
    q: "Was ist der Unterschied zwischen Claude und Claude Code?",
    a: "Claude ist der Chat: Du fragst, Claude antwortet, und du kopierst das Ergebnis selbst weiter. Claude Code arbeitet in deinen Dateien und baut, ändert und prüft direkt in deinem Projekt. Bei Pro, Max und Ultra teilen sich beide dasselbe Nutzungskontingent.",
  },
  {
    q: "Was sind Skills in Claude Code?",
    a: "Skills sind gespeicherte Arbeitsabläufe: kurze Anleitungen, die Claude lädt, wenn sie zur Aufgabe passen. Ich habe zum Beispiel eigene Skills für Newsletter, Präsentationen und die SEO-Prüfung von Webseiten. Einmal sauber geschrieben, sparst du dir jedes Mal das Erklären, und das Ergebnis sieht immer gleich aus.",
  },
  {
    q: "Kann ich Claude Code im Team nutzen?",
    a: "Ja. Mit Claude Team bekommt jeder einen eigenen Platz, Standard für 25 oder Premium für 125 US-Dollar im Monat, bei Jahreszahlung 20 und 100 Dollar. Claude Code ist in beiden enthalten, die Abrechnung läuft zentral, und jeder Platz hat sein eigenes Kontingent. Für Firmen ab 20 Plätzen gibt es Enterprise.",
  },
];

const seiteSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: title,
  description,
  url,
  inLanguage: "de-DE",
  author: autor,
  about: {
    "@type": "SoftwareApplication",
    name: "Claude Code",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "macOS, Windows, Linux",
    publisher: { "@type": "Organization", name: "Anthropic" },
  },
  hasPart: start.map((s) => ({ "@type": "Article", headline: s.t, url: `${site}${s.href}` })),
});

const breadcrumbSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Start", item: site },
    { "@type": "ListItem", position: 2, name: "Claude Code", item: url },
  ],
});

const faqSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

// Lesbarkeit für Leser ab 50: dunkle Fließtext-Farbe, Links in dunklem Gold, keine halb durchsichtige Schrift.
const proseBlock =
  "prose prose-lg max-w-none font-satoshi leading-[1.8] text-[#57514A] prose-headings:font-instrument prose-headings:font-normal prose-headings:text-deep-charcoal prose-strong:text-deep-charcoal prose-a:text-[#7A5C18] prose-a:underline prose-a:decoration-refined-gold prose-a:underline-offset-4 hover:prose-a:text-deep-charcoal prose-h2:text-3xl md:prose-h2:text-[2.6rem] prose-h2:mt-4 prose-h2:mb-6 prose-h2:leading-[1.15] prose-p:mb-6 prose-code:before:content-none prose-code:after:content-none prose-code:rounded prose-code:bg-warm-light prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal prose-code:text-deep-charcoal";

export default function ClaudeCodeThemenSeite() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-pure-surface pb-0 selection:bg-refined-gold selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: seiteSchemaJson.replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchemaJson.replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchemaJson.replace(/</g, "\\u003c") }} />

      <div className="w-full bg-[#2E2B26] pt-24 md:pt-32" />

      {/* HERO: ohne Einblenden, damit der größte Inhalt sofort steht */}
      <section className="relative flex min-h-[min(110vw,760px)] w-full flex-col justify-end overflow-hidden bg-[#1a1612] md:min-h-[min(calc(100vw*9/21),760px)]">
        <Image src={heroBild.src} alt={heroBild.alt} fill priority sizes="100vw" className="object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0a] via-[#1a1612]/80 to-[#1a1612]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0c0a]/90 via-[#1a1612]/50 to-transparent" />
        <div className="relative z-10 w-full max-w-[1400px] px-6 pb-16 pt-8 sm:px-12 md:px-24 md:pb-24">
          <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-[13px] uppercase tracking-widest">
            <span className="rounded-full border border-gold-light bg-[#2E2B26] px-3 py-1 text-gold-light">Themen-Seite</span>
            <span className="text-[#E9E4DA]">Stand November 2026</span>
          </div>
          <h1 className="mb-6 max-w-[1100px] font-instrument text-[clamp(2.5rem,5vw,5rem)] leading-[1.05] text-white">
            Claude Code auf Deutsch: <span className="italic text-gold-light">einrichten, verstehen, im Geschäft nutzen.</span>
          </h1>
          <p className="mb-10 max-w-[760px] font-satoshi text-lg leading-relaxed text-[#E9E4DA] md:text-xl">
            Was Claude Code ist, wie du es installierst, was es kostet und wie ich damit mein Geschäft führe. Alles an einem Ort, in einfacher Sprache.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/blog/claude-code-installieren" className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-light px-8 py-4 font-satoshi text-[16px] font-semibold text-deep-charcoal transition-colors hover:bg-white">
              Claude Code installieren <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/blog/claude-code-kosten" className="inline-flex items-center justify-center rounded-full border border-[#E9E4DA] px-8 py-4 font-satoshi text-[16px] font-semibold text-white transition-colors hover:bg-[#2E2B26]">
              Was es kostet
            </Link>
          </div>
        </div>
      </section>

      {/* DIE KURZE ANTWORT */}
      <section className="mx-auto w-full max-w-[860px] px-6 pt-16 sm:px-12 md:px-24">
        <div className="rounded-r-lg border-l-2 border-refined-gold bg-cream p-8 md:p-10">
          <p className="mb-5 font-mono text-[13px] uppercase tracking-widest text-[#7A5C18]">Die kurze Antwort vorab</p>
          <p className="font-satoshi text-lg leading-relaxed text-deep-charcoal">
            Claude Code ist ein KI-Werkzeug von Anthropic, das direkt in deinen Dateien arbeitet. Es liest deinen Projektordner, schreibt und ändert Dateien und führt Befehle aus, immer mit deiner Erlaubnis. Du nutzt es im Terminal, in der Claude-Desktop-App oder im Browser und brauchst dafür ein bezahltes Claude-Abo ab 17 US-Dollar im Monat.
          </p>
        </div>
      </section>

      {/* WO ANFANGEN */}
      <section className="mx-auto w-full max-w-[1100px] px-6 pt-20 sm:px-12 md:px-24">
        <ScrollReveal>
          <p className="mb-4 font-mono text-[13px] uppercase tracking-widest text-[#7A5C18]">Anleitungen</p>
          <h2 className="mb-10 font-instrument text-3xl leading-[1.15] text-deep-charcoal md:text-[2.6rem]">Wo willst du anfangen?</h2>
        </ScrollReveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {start.map((s, i) => (
            <ScrollReveal key={s.href} delay={i * 0.05}>
              <Link href={s.href} className="group flex h-full gap-5 rounded-2xl border border-refined-gold/40 bg-cream p-6 transition-colors hover:border-refined-gold hover:bg-warm-light md:p-7">
                <s.icon className="mt-1 h-6 w-6 flex-shrink-0 text-[#7A5C18]" aria-hidden />
                <div>
                  <h3 className="font-instrument text-2xl leading-snug text-deep-charcoal">{s.t}</h3>
                  <p className="mt-2 font-satoshi text-[16px] leading-relaxed text-[#57514A]">{s.d}</p>
                  <span className="mt-3 inline-flex items-center gap-2 font-satoshi text-[15px] font-semibold text-[#7A5C18] group-hover:text-deep-charcoal">
                    Weiterlesen <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* WAS IST CLAUDE CODE */}
      <section className="mx-auto w-full max-w-[1100px] px-6 pt-24 sm:px-12 md:px-24">
        <ScrollReveal>
          <div className={`${proseBlock} mx-auto max-w-[820px]`}>
            <h2>Was ist Claude Code überhaupt?</h2>
            <p className={dropCapClass}>
              Im Schnitt wird in Deutschland 135.000 Mal im Monat nach Claude Code gesucht. Im Oktober 2025 waren es noch 40.500 Suchen, im März 2026 auf dem Höhepunkt 246.000. Die meisten Antworten im Netz sind englisch, sehr technisch oder beides. Hier bekommst du sie auf Deutsch, aus dem Alltag eines Geschäfts, das jeden Tag mit Claude Code arbeitet.
            </p>
            <p>
              Claude Code ist ein KI-Werkzeug von Anthropic, das in deinem Projektordner arbeitet. Du beschreibst eine Aufgabe in normalen Sätzen, Claude liest die passenden Dateien, schlägt Änderungen vor, schreibt sie und führt Befehle aus, zum Beispiel um eine Webseite zu bauen und zu testen. Was es darf, bestimmst du: Vor einer Änderung fragt es nach, bis du ihm mehr erlaubst.
            </p>
          </div>
        </ScrollReveal>
        <div className="mx-auto mt-8 grid max-w-[1000px] gap-4 md:grid-cols-2">
          {vergleich.map((v, i) => (
            <ScrollReveal key={v.t} delay={i * 0.06}>
              <div className={`h-full rounded-2xl border p-7 ${i === 1 ? "border-refined-gold/40 bg-[#2E2B26]" : "border-refined-gold/40 bg-cream"}`}>
                <h3 className={`font-instrument text-2xl ${i === 1 ? "text-gold-light" : "text-deep-charcoal"}`}>{v.t}</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {v.punkte.map((p) => (
                    <li key={p} className={`font-satoshi text-[17px] leading-relaxed ${i === 1 ? "text-[#E9E4DA]" : "text-[#57514A]"}`}>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <PullQuote>Im Chat bekommst du Antworten. Mit Claude Code bekommst du fertige Arbeit in deinem Ordner.</PullQuote>

      {/* WO LAEUFT ES */}
      <section className="mx-auto w-full max-w-[1100px] px-6 sm:px-12 md:px-24">
        <ScrollReveal>
          <div className={`${proseBlock} mx-auto max-w-[820px]`}>
            <h2>Wo läuft Claude Code?</h2>
            <p>
              Auf drei Wegen, alle mit demselben Abo. Wie du jeden davon einrichtest, steht in der <Link href="/blog/claude-code-installieren">Anleitung zur Installation</Link>.
            </p>
          </div>
        </ScrollReveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {wege.map((w, i) => (
            <ScrollReveal key={w.t} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-refined-gold/40 bg-[#2E2B26] p-7">
                <w.icon className="mb-4 h-6 w-6 text-gold-light" aria-hidden />
                <h3 className="font-instrument text-2xl text-white">{w.t}</h3>
                <p className="mt-3 font-satoshi text-[16px] leading-relaxed text-[#E9E4DA]">{w.d}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* KOSTEN */}
      <section className="mx-auto w-full max-w-[1100px] px-6 pt-24 sm:px-12 md:px-24">
        <ScrollReveal>
          <div className={`${proseBlock} mx-auto max-w-[820px]`}>
            <h2>Was kostet Claude Code?</h2>
            <p>
              Claude Code steckt in jedem bezahlten Claude-Plan, der kostenlose Plan enthält es nicht. Für eine Person kostet es 17 bis 200 US-Dollar im Monat. Alle Pläne, die Grenzen und die Rechnung mit der API stehen im Artikel <Link href="/blog/claude-code-kosten">Was kostet Claude Code?</Link>
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="mx-auto mt-6 grid max-w-[1000px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {preise.map((p) => (
              <div key={p.plan} className="rounded-2xl border border-refined-gold/40 bg-cream p-6">
                <p className="font-instrument text-2xl text-deep-charcoal">{p.plan}</p>
                <p className="mt-1 font-instrument text-3xl text-[#7A5C18]">{p.preis}</p>
                <p className="mt-2 font-satoshi text-[15px] leading-snug text-[#57514A]">{p.info}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-4 max-w-[1000px] font-satoshi text-[15px] text-[#57514A]">Pro Monat, in US-Dollar und ohne Steuer, Stand 11. November 2026.</p>
        </ScrollReveal>
      </section>

      {/* BEFEHLE */}
      <section className="mx-auto w-full max-w-[1100px] px-6 pt-24 sm:px-12 md:px-24">
        <ScrollReveal>
          <div className={`${proseBlock} mx-auto max-w-[820px]`}>
            <h2>Welche Befehle brauchst du am Anfang?</h2>
            <p>Sechs Befehle tragen dich durch die ersten Wochen. Alle anderen zeigt dir <code>/help</code>.</p>
          </div>
        </ScrollReveal>
        <div className="mx-auto mt-8 grid max-w-[1000px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {befehle.map((b, i) => (
            <ScrollReveal key={b.k} delay={i * 0.04}>
              <div className="h-full rounded-xl border border-refined-gold/40 bg-cream p-6">
                <p className="font-mono text-lg font-semibold text-[#7A5C18]">{b.k}</p>
                <p className="mt-2 font-satoshi text-[16px] leading-relaxed text-[#57514A]">{b.d}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <GoldDivider />

      {/* SKILLS */}
      <section className="mx-auto w-full max-w-[1100px] px-6 sm:px-12 md:px-24">
        <ScrollReveal>
          <div className={`${proseBlock} mx-auto max-w-[820px]`}>
            <h2>Was sind Skills, und welche lohnen sich?</h2>
            <p className={dropCapClass}>
              Skills sind gespeicherte Arbeitsabläufe. Jeder Skill ist eine kurze Anleitung, die Claude lädt, wenn sie zur Aufgabe passt: wie ein Newsletter bei dir aussieht, wie eine Präsentation aufgebaut ist, worauf eine SEO-Prüfung achtet. Einmal sauber geschrieben, sparst du dir jedes Mal das Erklären.
            </p>
            <p>
              Ich arbeite mit 118 Skills, 35 davon habe ich selbst geschrieben. Die anderen stammen aus offenen Sammlungen, die ich vor dem Einsatz prüfe. Für den Anfang reicht ein einziger Skill für die Aufgabe, die du am häufigsten erledigst.
            </p>
          </div>
        </ScrollReveal>
        <div className="mx-auto mt-8 grid max-w-[1000px] grid-cols-1 gap-4 sm:grid-cols-3">
          <ScrollReveal>
            <div className="flex h-full flex-col rounded-2xl border border-refined-gold/40 bg-[#2E2B26] p-7">
              <span className="mb-2 font-instrument text-5xl leading-none text-gold-light"><CountUp to={118} /></span>
              <span className="font-satoshi text-[16px] text-[#E9E4DA]">Skills im täglichen Einsatz</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
            <div className="flex h-full flex-col rounded-2xl border border-refined-gold/40 bg-[#2E2B26] p-7">
              <span className="mb-2 font-instrument text-5xl leading-none text-gold-light"><CountUp to={35} /></span>
              <span className="font-satoshi text-[16px] text-[#E9E4DA]">davon selbst geschrieben</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.12}>
            <div className="flex h-full flex-col rounded-2xl border border-refined-gold/40 bg-[#2E2B26] p-7">
              <span className="mb-2 font-instrument text-5xl leading-none text-gold-light">2.200+</span>
              <span className="font-satoshi text-[16px] text-[#E9E4DA]">Notizen im Second Brain, in denen Claude nachschlägt</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* MEIN ALLTAG */}
      <section className="mx-auto w-full max-w-[1100px] px-6 pt-24 sm:px-12 md:px-24">
        <ScrollReveal>
          <div className="grid items-center gap-10 rounded-[28px] border border-refined-gold/40 bg-deep-charcoal p-8 shadow-[0_30px_70px_rgba(184,150,62,0.12)] md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:p-12">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[340px] overflow-hidden rounded-2xl border border-refined-gold/40">
              <Image src={iljaFoto.src} alt={iljaFoto.alt} fill sizes="340px" className="object-cover" />
            </div>
            <div>
              <p className="mb-4 font-mono text-[13px] uppercase tracking-widest text-gold-light">Aus meinem Alltag</p>
              <h2 className="mb-6 font-instrument text-3xl leading-tight text-white md:text-[2.6rem]">So führe ich mein Geschäft mit Claude Code.</h2>
              <ul className="flex flex-col gap-4">
                {alltag.map((a) => (
                  <li key={a.t} className="flex gap-4">
                    <a.icon className="mt-1 h-5 w-5 flex-shrink-0 text-gold-light" aria-hidden />
                    <p className="font-satoshi text-[17px] leading-relaxed text-[#E9E4DA]">
                      <strong className="text-white">{a.t}.</strong> {a.d}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-satoshi text-[17px] leading-relaxed text-[#E9E4DA]">
                Das alles läuft bei mir jeden Tag, gebaut und gepflegt mit Claude Code. Fertige Arbeiten zeige ich in den{" "}
                <Link href="/case-studies" className="text-gold-light underline decoration-gold-light underline-offset-4 hover:text-white">
                  Show Cases
                </Link>
                .
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-[900px] px-6 pt-24 sm:px-12 md:px-24">
        <ScrollReveal>
          <p className="mb-4 text-center font-mono text-[13px] uppercase tracking-widest text-[#7A5C18]">Häufige Fragen</p>
          <h2 className="mb-12 text-center font-instrument text-3xl leading-[1.1] text-deep-charcoal md:text-5xl">Was Menschen über Claude Code fragen.</h2>
        </ScrollReveal>
        <div className="flex flex-col gap-3">
          {faq.map((f, i) => (
            <ScrollReveal key={f.q} delay={i * 0.04}>
              <details className="group rounded-xl border border-refined-gold/40 bg-cream px-6 py-5 transition-colors hover:border-refined-gold [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                  <h3 className="font-instrument text-xl text-deep-charcoal">{f.q}</h3>
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-refined-gold text-xl text-[#7A5C18] transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 font-satoshi text-[17px] leading-relaxed text-[#57514A]">{f.a}</p>
              </details>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* EIN CTA */}
      <section className="mx-auto mt-24 w-full max-w-[1000px] px-6 md:px-12">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-refined-gold/40 bg-[#2E2B26] p-10 md:p-16">
            <div className="mb-4 flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-gold-light" aria-hidden />
              <span className="font-mono text-[13px] uppercase tracking-widest text-gold-light">Mit Begleitung lernen</span>
            </div>
            <h2 className="mb-6 font-instrument text-3xl text-white md:text-4xl">Claude Code gemeinsam einrichten.</h2>
            <p className="mb-8 max-w-[640px] font-satoshi text-lg leading-relaxed text-[#E9E4DA]">
              In der Beratungsstunde richten wir Claude Code bei dir ein und klären deine Fragen, 60 Minuten per Video mit geteiltem Bildschirm. Wenn du danach tiefer einsteigen willst, gilt der Gutschein aus der Stunde für den Second-Brain-Kurs.
            </p>
            <Link href="/beratung" className="inline-flex items-center justify-center rounded-full bg-gold-light px-8 py-4 font-satoshi text-[16px] font-semibold text-deep-charcoal transition-colors hover:bg-white">
              Zur Beratungsstunde
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <div className="mt-20 md:mt-28">
        <AcademyNewsletter />
      </div>
    </main>
  );
}
