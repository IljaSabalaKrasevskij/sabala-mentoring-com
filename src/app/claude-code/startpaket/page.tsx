import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, FileText, Folder, ListChecks, Puzzle, Terminal, BookOpen, FolderOpen, Keyboard } from "lucide-react";
import AnmeldeForm from "@/components/akademie/AnmeldeForm";

/* ──────────────────────────────────────────────────────────────────────────
   Leadmagnet „Claude-Code-Startpaket“ (Konzept 2027, Phase 1, Maßnahme 6).
   Das Formular trägt die Quelle startpaket-claude-code. Nach dem Klick in der Bestätigungsmail
   führt dankeSeite() aus src/lib/quellen.ts auf /claude-code/startpaket/danke, dort liegt der Download.
   Der Inhalt des Pakets liegt als Quelle in startpaket/claude-code-startpaket, das ZIP in public/downloads.
   ────────────────────────────────────────────────────────────────────────── */

const site = "https://sabala-mentoring.com";
const url = `${site}/claude-code/startpaket`;

const bild = {
  src: "/blog/claude-code-installieren/ohne-terminal.jpg",
  alt: "Skizze: ein älterer Mann arbeitet lächelnd am Küchentisch mit einer einfachen App mit Ordnern auf dem Laptop, Morgenlicht und Pflanzen am Fenster",
};

const title = "Claude-Code-Startpaket: kostenlos für Mac und Windows";
const description =
  "Installation, Spickzettel, zwei CLAUDE.md-Vorlagen und zehn Skills, die ich selbst nutze: alles für deine erste Woche mit Claude Code. Kostenlos per Mail.";

export const metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    type: "website",
    url,
    images: [{ url: `${site}${bild.src}`, width: 1280, height: 720, alt: bild.alt }],
  },
};

// Die echten Dateien im ZIP, in der Reihenfolge, in der sie im Ordner stehen. Ändert sich das Paket, hier nachziehen.
const ordner: { name: string; tiefe: 0 | 1 | 2; ordner?: boolean }[] = [
  { name: "00 Start hier.md", tiefe: 0 },
  { name: "01 Installation.md", tiefe: 0 },
  { name: "02 Befehle.md", tiefe: 0 },
  { name: "03 Die CLAUDE-Datei.md", tiefe: 0 },
  { name: "04 Zehn Skills.md", tiefe: 0 },
  { name: "vorlagen", tiefe: 0, ordner: true },
  { name: "projekt", tiefe: 1, ordner: true },
  { name: "CLAUDE.md", tiefe: 2 },
  { name: "global", tiefe: 1, ordner: true },
  { name: "CLAUDE.md", tiefe: 2 },
];

const inhalt = [
  { datei: "00 Start hier", icon: ListChecks, t: "Der Weg durch die erste Woche", d: "In welcher Reihenfolge du vorgehst, dazu drei Aufgaben für deine erste Stunde mit Claude Code." },
  { datei: "01 Installation", icon: Terminal, t: "Installation für Mac und Windows", d: "Schritt für Schritt, dazu der Weg ganz ohne Terminal und die Lösung für die Fehler, die fast jeder einmal sieht." },
  { datei: "02 Befehle", icon: Keyboard, t: "Der Spickzettel", d: "Die Befehle und Tasten, die du am Anfang wirklich brauchst, auf einer Seite." },
  { datei: "03 Die CLAUDE-Datei", icon: BookOpen, t: "Dein Briefing für Claude", d: "Wie du Claude einmal sagst, wer du bist, worum es geht und welche Regeln gelten." },
  { datei: "vorlagen", icon: FolderOpen, t: "Zwei CLAUDE.md-Vorlagen", d: "Eine für deinen Projektordner, eine für alle Projekte. Lücken ausfüllen, ablegen, fertig." },
  { datei: "04 Zehn Skills", icon: Puzzle, t: "Zehn Skills, die ich selbst nutze", d: "Jeder mit einem Satz, wofür er gut ist, und dem Befehl zum Installieren. Dazu fünf Fragen, mit denen du fremde Skills prüfst." },
];

// Dieselben zehn wie in 04 Zehn Skills.md, gleiche Reihenfolge.
const skills = [
  { t: "Erklärmodus", k: "explanatory-output-style" },
  { t: "CLAUDE.md pflegen", k: "claude-md-management" },
  { t: "Eigene Skills bauen", k: "skill-creator" },
  { t: "Gestaltung für Webseiten", k: "frontend-design" },
  { t: "Plan hinterfragen", k: "grill-me" },
  { t: "Weniger Code, gleiches Ergebnis", k: "ponytail" },
  { t: "Statuszeile", k: "claude-hud" },
  { t: "Pläne, die einen Neustart überstehen", k: "planning-with-files" },
  { t: "KI-Klang aus Texten nehmen", k: "humanizer" },
  { t: "Design prüfen und polieren", k: "impeccable" },
];

const fuerWen = [
  "Du hast von Claude Code gehört und weißt nicht, wo du anfangen sollst.",
  "Du hast es installiert, nutzt aber noch keine CLAUDE.md und keine Skills.",
  "Du willst Webseiten, Texte oder dein Wissen mit Claude ordnen, ohne programmieren zu lernen.",
];

const ablauf = [
  { n: "1", t: "Eintragen", d: "Name, Mail-Adresse und Telefonnummer." },
  { n: "2", t: "Mail bestätigen", d: "Ein Klick auf den Link in der Mail." },
  { n: "3", t: "Herunterladen", d: "Der Klick führt dich direkt zum Paket." },
];

const faq = [
  {
    q: "Was kostet das Startpaket?",
    a: "Nichts. Du trägst dich mit Name, Mail-Adresse und Telefonnummer ein, bestätigst die Mail und lädst das Paket herunter. Dazu bekommst du meinen Newsletter mit KI-Updates für dein Unternehmen. Abmelden geht jederzeit mit einem Klick.",
  },
  {
    q: "Was steckt genau im Startpaket?",
    a: "Ein Ordner mit fünf kurzen Anleitungen und zwei Vorlagen: die Installation für Mac und Windows, ein Spickzettel mit den wichtigsten Befehlen, eine Erklärung der CLAUDE.md, zwei CLAUDE.md-Vorlagen zum Ausfüllen und zehn Skills mit dem Befehl zum Installieren. Alle Dateien sind Markdown und öffnen sich in jedem Texteditor.",
  },
  {
    q: "Brauche ich ein Claude-Abo?",
    a: "Für Claude Code ja. Es ist ab dem Pro-Plan dabei: 20 US-Dollar im Monat, bei jährlicher Zahlung 17 US-Dollar im Monat, jeweils zuzüglich Steuer. Im kostenlosen Plan fehlt Claude Code. Das Paket kannst du schon vorher lesen und dann entscheiden.",
  },
  {
    q: "Funktioniert das auch auf Windows?",
    a: "Ja. Die Anleitung zeigt Mac und Windows Schritt für Schritt, dazu den Weg über die Claude-Desktop-App ganz ohne Terminal.",
  },
  {
    q: "Ich nutze Claude Code schon. Lohnt sich das Paket trotzdem?",
    a: "Wenn du noch keine CLAUDE.md pflegst oder keine Skills nutzt, ja. Dann sind die Vorlagen und die zehn Skills der spannende Teil, die Installation überspringst du einfach.",
  },
  {
    q: "Wer steckt hinter dem Startpaket?",
    a: "Ich bin Ilja Krasevskij. Ich führe mein Geschäft mit Claude Code und zeige Selbständigen und kleinen Teams in der KI-Akademie, wie das geht. Die zehn Skills im Paket nutze ich selbst.",
  },
];

const breadcrumbSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Start", item: site },
    { "@type": "ListItem", position: 2, name: "Claude Code", item: `${site}/claude-code` },
    { "@type": "ListItem", position: 3, name: "Startpaket", item: url },
  ],
});

const faqSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export default function StartpaketSeite() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-pure-surface pb-0 selection:bg-refined-gold selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchemaJson.replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchemaJson.replace(/</g, "\\u003c") }} />

      <div className="w-full bg-[#2E2B26] pt-24 md:pt-32" />

      {/* HERO: ohne Einblenden, damit der größte Inhalt sofort steht */}
      <section className="relative w-full overflow-hidden bg-[#1a1612]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2a231a] via-[#1a1612] to-[#0e0c0a]" />
        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-12 px-6 py-16 sm:px-12 md:px-24 md:py-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div>
            <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-[13px] uppercase tracking-widest">
              <span className="rounded-full border border-gold-light bg-[#2E2B26] px-3 py-1 text-gold-light">Kostenlos · für Mac und Windows</span>
              <span className="text-[#E9E4DA]">Stand November 2026</span>
            </div>
            <h1 className="mb-6 font-instrument text-[clamp(2.5rem,5vw,4.6rem)] leading-[1.05] text-white">
              Dein Startpaket für Claude&nbsp;Code. <span className="italic text-gold-light">Alles für die erste Woche.</span>
            </h1>
            <p className="mb-10 max-w-[640px] font-satoshi text-lg leading-relaxed text-[#E9E4DA] md:text-xl">
              Installation für Mac und Windows, ein Spickzettel mit den wichtigsten Befehlen, zwei CLAUDE.md-Vorlagen und zehn Skills, die ich selbst nutze. In einem Ordner, in einfacher Sprache.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <a href="#anfordern" className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-light px-8 py-4 font-satoshi text-[16px] font-semibold text-deep-charcoal transition-colors hover:bg-white">
                Startpaket anfordern <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a href="#inhalt" className="inline-flex items-center justify-center rounded-full border border-[#E9E4DA] px-8 py-4 font-satoshi text-[16px] font-semibold text-white transition-colors hover:bg-[#2E2B26]">
                Was drin ist
              </a>
            </div>
          </div>

          {/* Der Ordner, so wie er nach dem Entpacken aussieht */}
          <figure className="w-full max-w-[520px] justify-self-center overflow-hidden rounded-2xl border border-refined-gold/40 bg-[#15120d] shadow-[0_30px_70px_rgba(0,0,0,0.45)] lg:justify-self-end">
            <div className="flex items-center gap-2 border-b border-[#3a332a] px-5 py-3">
              <span className="h-3 w-3 rounded-full bg-[#5a5046]" aria-hidden />
              <span className="h-3 w-3 rounded-full bg-[#5a5046]" aria-hidden />
              <span className="h-3 w-3 rounded-full bg-[#5a5046]" aria-hidden />
              <span className="ml-3 truncate font-mono text-[15px] text-[#E9E4DA]">claude-code-startpaket</span>
            </div>
            <ul className="px-5 py-5 font-mono text-[15px] leading-[2.1] text-[#E9E4DA]">
              {ordner.map((o, i) => (
                <li key={i} className={`flex items-center gap-3 ${o.tiefe === 1 ? "pl-7" : o.tiefe === 2 ? "pl-14" : ""}`}>
                  {o.ordner ? <Folder className="h-[18px] w-[18px] flex-shrink-0 text-gold-light" aria-hidden /> : <FileText className="h-[18px] w-[18px] flex-shrink-0 text-gold-light" aria-hidden />}
                  <span className="truncate">{o.name}</span>
                </li>
              ))}
            </ul>
            <figcaption className="border-t border-[#3a332a] px-5 py-3 font-mono text-[15px] text-[#BDB5A6]">7 Dateien · 11 KB · Markdown</figcaption>
          </figure>
        </div>
      </section>

      {/* DIE KURZE ANTWORT */}
      <section className="mx-auto w-full max-w-[860px] px-6 pt-16 sm:px-12 md:px-24">
        <div className="rounded-r-lg border-l-2 border-refined-gold bg-cream p-8 md:p-10">
          <p className="mb-5 font-mono text-[13px] uppercase tracking-widest text-[#7A5C18]">Die kurze Antwort vorab</p>
          <p className="font-satoshi text-lg leading-relaxed text-deep-charcoal">
            Das Claude-Code-Startpaket ist ein kostenloser Ordner mit fünf kurzen Anleitungen und zwei Vorlagen: die Installation für Mac und Windows, ein Spickzettel mit den wichtigsten Befehlen, die CLAUDE.md erklärt mit zwei Vorlagen zum Ausfüllen und zehn Skills, die ich selbst nutze, jeweils mit dem Befehl zum Installieren. Du bekommst es per Mail.
          </p>
        </div>
      </section>

      {/* WAS DRIN STECKT */}
      <section id="inhalt" className="mx-auto w-full max-w-[1100px] scroll-mt-28 px-6 pt-20 sm:px-12 md:px-24">
        <ScrollReveal>
          <p className="mb-4 font-mono text-[13px] uppercase tracking-widest text-[#7A5C18]">Der Inhalt</p>
          <h2 className="mb-10 font-instrument text-3xl leading-[1.15] text-deep-charcoal md:text-[2.6rem]">Was steckt im Startpaket?</h2>
        </ScrollReveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {inhalt.map((s, i) => (
            <ScrollReveal key={s.datei} delay={i * 0.05}>
              <div className="flex h-full flex-col rounded-2xl border border-refined-gold/40 bg-cream p-6 md:p-7">
                <s.icon className="mb-4 h-6 w-6 text-[#7A5C18]" aria-hidden />
                <p className="font-mono text-[15px] text-[#7A5C18]">{s.datei}</p>
                <h3 className="mt-1 font-instrument text-2xl leading-snug text-deep-charcoal">{s.t}</h3>
                <p className="mt-2 font-satoshi text-[16px] leading-relaxed text-[#57514A]">{s.d}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-12 rounded-2xl border border-refined-gold/40 bg-[#2E2B26] p-7 md:p-10">
            <h3 className="mb-6 font-instrument text-2xl text-white md:text-3xl">Die zehn Skills im Paket</h3>
            <ol className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {skills.map((s, i) => (
                <li key={s.k} className="flex items-baseline gap-4">
                  <span className="w-6 flex-shrink-0 text-right font-mono text-[15px] text-gold-light">{i + 1}</span>
                  <span>
                    <span className="block font-satoshi text-[16px] font-semibold text-white">{s.t}</span>
                    <span className="block font-mono text-[15px] text-[#E9E4DA] [overflow-wrap:anywhere]">{s.k}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </ScrollReveal>
      </section>

      {/* FÜR WEN */}
      <section className="mx-auto w-full max-w-[1100px] px-6 pt-24 sm:px-12 md:px-24">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <ScrollReveal>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-refined-gold/40">
              <Image src={bild.src} alt={bild.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
            <div>
              <p className="mb-4 font-mono text-[13px] uppercase tracking-widest text-[#7A5C18]">Für wen</p>
              <h2 className="mb-6 font-instrument text-3xl leading-[1.15] text-deep-charcoal md:text-[2.6rem]">Für wen ist das Startpaket?</h2>
              <ul className="flex flex-col gap-4">
                {fuerWen.map((f) => (
                  <li key={f} className="flex gap-3 font-satoshi text-[17px] leading-relaxed text-[#57514A]">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-[#7A5C18]" aria-hidden />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-satoshi text-[17px] leading-relaxed text-deep-charcoal">Programmieren musst du dafür nicht.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ANFORDERN */}
      <section id="anfordern" className="mt-24 w-full scroll-mt-24 bg-[#080604] px-6 py-16 sm:px-12 md:py-24">
        <div className="mx-auto grid w-full max-w-[1100px] gap-12 rounded-[5px] border border-refined-gold/40 bg-gradient-to-br from-[#2a2217] via-[#14100b] to-[#100c07] p-7 sm:p-10 md:p-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-4 font-mono text-[13px] uppercase tracking-[0.22em] text-gold-light">Kostenlos per Mail</p>
            <h2 className="mb-5 font-instrument text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.1] text-white">Schick mir das Startpaket.</h2>
            <p className="mb-8 font-satoshi text-[16px] leading-relaxed text-[#E9E4DA]">
              Trag dich ein und bestätige kurz die Mail, die danach kommt. Der Klick darin führt dich direkt zum Download. Danach bekommst du meinen Newsletter mit KI-Updates für dein Unternehmen. Abmelden geht jederzeit mit einem Klick.
            </p>
            <ol className="flex flex-col gap-5">
              {ablauf.map((a) => (
                <li key={a.n} className="flex gap-4">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-gold-light font-mono text-[15px] text-gold-light">{a.n}</span>
                  <span>
                    <span className="block font-satoshi text-[16px] font-semibold text-white">{a.t}</span>
                    <span className="block font-satoshi text-[15px] text-[#E9E4DA]">{a.d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <AnmeldeForm quelle="startpaket-claude-code" knopf="Startpaket anfordern" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-[900px] px-6 pt-24 sm:px-12 md:px-24">
        <ScrollReveal>
          <p className="mb-4 text-center font-mono text-[13px] uppercase tracking-widest text-[#7A5C18]">Häufige Fragen</p>
          <h2 className="mb-12 text-center font-instrument text-3xl leading-[1.1] text-deep-charcoal md:text-5xl">Was Leser vor dem Download fragen.</h2>
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
        <p className="mt-12 pb-24 text-center font-satoshi text-[16px] text-[#57514A]">
          Alle Anleitungen zu Claude Code findest du auf der{" "}
          <Link href="/claude-code" className="font-semibold text-[#7A5C18] underline decoration-refined-gold underline-offset-4 hover:text-deep-charcoal">
            Themen-Seite Claude Code
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
