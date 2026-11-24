import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, FolderOpen, Package, Sparkles, Store, AppWindow } from "lucide-react";
import { CountUp } from "@/components/blog/CountUp";
import { BlogSpokes } from "@/components/blog/BlogSpokes";
import { dropCapClass, GoldDivider, PullQuote } from "@/components/blog/BlogProse";
import { StartpaketKasten } from "@/components/blog/StartpaketKasten";
import AnmeldeForm from "@/components/akademie/AnmeldeForm";

/* Artikel „Claude Code Skills“ (15.11.2026, Iljas „Ja, beides“). Zielt auf die Suchen, die es wirklich gibt:
   „Claude Skills“ 8.100 und „Claude Code Skills“ 2.900 im Monat in Deutschland (September 2026), fast ohne Konkurrenz.
   Der eine Haupt-Aufruf ist das Startpaket (dieselben zehn Skills als Ordner), darum das Formular am Ende
   und der Kasten nach der Liste. Fakten zu Skills: code.claude.com/docs/en/skills und Anthropic, 22.10.2026. */

const slug = "claude-code-skills";
const site = "https://sabala-mentoring.com";
const url = `${site}/blog/${slug}`;
const datePublished = "2026-11-15";

const cover = {
  src: `/blog/${slug}/cover.jpg`,
  alt: "Skizze: eine Frau mit Brille sitzt lächelnd am Schreibtisch mit Laptop, ein kleiner weißer Roboter zieht eine Karte aus einem Karteikasten",
};
const schublade = {
  src: `/blog/${slug}/schublade.jpg`,
  alt: "Skizze: in einer Werkstatt holt ein kleiner Roboter auf einem Hocker ein Blatt aus einer von vielen Schubladen, ein Handwerker schaut lächelnd zu",
};
const pruefen = {
  src: `/blog/${slug}/pruefen.jpg`,
  alt: "Skizze: ein Mann prüft ein Paket mit der Lupe, bevor er es öffnet, der kleine Roboter schaut neugierig über den Rand",
};

const title = "Claude Code Skills: was sie sind und welche sich lohnen";
const description =
  "Was Claude Skills sind, wie du sie in Claude Code und der Claude-App installierst und welche zehn sich für den Anfang lohnen. Mit Sicherheits-Check.";

export const metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description: "Was ein Skill ist, wie du ihn installierst und welche zehn ich für die erste Woche empfehle.",
    type: "article",
    publishedTime: datePublished,
    url,
    images: [{ url: `${site}${cover.src}`, width: 1536, height: 864, alt: cover.alt }],
  },
};

const autor = {
  "@type": "Person",
  name: "Ilja Krasevskij",
  url: `${site}/ueber-mich`,
  sameAs: ["https://www.linkedin.com/in/sabala-mentoring/"],
  jobTitle: "Founder, Sabala Studios",
  knowsAbout: ["Claude Code", "Claude Skills", "KI im Unternehmen", "Webseiten mit KI", "Second Brain"],
};

// Quelle: Anthropic, „Donating Agent Skills to the Agentic AI Foundation“, 22.10.2026. Suchdaten: Deutschland, September 2026.
const zahlen = [
  { wert: 70, suffix: "+", label: "KI-Werkzeuge", sub: "nutzen das Skill-Format, darunter ChatGPT, Cursor und VS Code" },
  { wert: 1, suffix: " Mio.", label: "Skills veröffentlicht", sub: "seit dem Start im Oktober 2025" },
  { wert: 280, suffix: " Mio.", label: "Installationen", sub: "fast so viele, sagt Anthropic" },
];

const unterschied = [
  { icon: BookOpen, t: "CLAUDE.md", d: "Liest Claude bei jedem Start. Hier steht, wer du bist, worum es im Projekt geht und welche Regeln immer gelten." },
  { icon: Sparkles, t: "Skill", d: "Liest Claude nur, wenn er gebraucht wird. Hier steht, wie eine bestimmte Aufgabe geht, Schritt für Schritt." },
  { icon: Package, t: "Plugin", d: "Ein Paket zum Installieren. Es bündelt einen oder mehrere Skills, oft mit kleinen Helfern dazu." },
];

const wege = [
  {
    icon: Store,
    t: "Aus einem Marktplatz",
    d: "Der einfachste Weg. Den offiziellen Marktplatz von Anthropic kennt Claude Code schon, eine Zeile reicht:",
    befehle: ["/plugin install skill-creator@claude-plugins-official"],
    danach: "Bei unabhängigen Entwicklern meldest du zuerst ihren Marktplatz an, dann installierst du:",
    befehle2: ["/plugin marketplace add blader/humanizer", "/plugin install humanizer@humanizer"],
  },
  {
    icon: FolderOpen,
    t: "Als Ordner",
    d: "Hast du einen Skill als Ordner, etwa aus einem Paket zum Herunterladen, kopierst du ihn in deinen persönlichen Skill-Ordner. Dann gilt er in allen Projekten.",
    befehle: ["Mac: ~/.claude/skills", "Windows: %USERPROFILE%\\.claude\\skills"],
  },
  {
    icon: AppWindow,
    t: "In der Claude-App",
    d: "Skills laufen auch auf claude.ai, schon im kostenlosen Plan. Dafür muss unter Einstellungen „Code execution and file creation“ eingeschaltet sein. Dann öffnest du claude.ai/customize/skills, klickst auf das Plus, auf „Create skill“ und „Upload a skill“ und lädst den Skill als ZIP-Datei hoch.",
  },
];

// Dieselben zehn wie im Startpaket (startpaket/claude-code-startpaket/04 Zehn Skills.md), gleiche Reihenfolge.
const skills = [
  { t: "Erklärmodus", k: "explanatory-output-style", d: "Claude erklärt beim Arbeiten kurz, warum es etwas so baut. So lernst du nebenbei, was in deinen Dateien passiert.", q: "Anthropic, offizieller Marktplatz" },
  { t: "CLAUDE.md pflegen", k: "claude-md-management", d: "Prüft deine CLAUDE.md und schlägt Verbesserungen vor. Am Ende einer Sitzung hält es fest, was ihr dabei gelernt habt.", q: "Anthropic, offizieller Marktplatz" },
  { t: "Eigene Skills bauen", k: "skill-creator", d: "Macht aus einem Ablauf, den du oft brauchst, deinen eigenen Skill. Du beschreibst, Claude schreibt die Datei.", q: "Anthropic, offizieller Marktplatz" },
  { t: "Gestaltung für Webseiten", k: "frontend-design", d: "Für Seiten und Oberflächen, die nicht nach Vorlage aussehen. Claude nutzt ihn von selbst, sobald du eine Seite baust.", q: "Anthropic, offizieller Marktplatz" },
  { t: "Plan hinterfragen", k: "mattpocock-skills", d: "Mit /grill-me stellt Claude dir so lange Fragen zu deinem Vorhaben, bis jede offene Stelle geklärt ist.", q: "Matt Pocock, im offiziellen Marktplatz" },
  { t: "Weniger Code, gleiches Ergebnis", k: "ponytail", d: "Bringt Claude dazu, die einfachste Lösung zu bauen, die wirklich läuft. Das schont dein Kontingent im Abo.", q: "DietrichGebert/ponytail" },
  { t: "Statuszeile", k: "claude-hud", d: "Zeigt unten im Terminal, wie voll das Gedächtnis der Unterhaltung ist und woran Claude gerade arbeitet.", q: "jarrodwatts/claude-hud" },
  { t: "Pläne, die einen Neustart überstehen", k: "planning-with-files", d: "Legt bei großen Aufgaben Plan und Fortschritt als Dateien ab. Bricht die Unterhaltung ab, macht Claude dort weiter.", q: "OthmanAdi/planning-with-files" },
  { t: "KI-Klang aus Texten nehmen", k: "humanizer", d: "Findet typische Muster von KI-Texten und schreibt sie um, ohne den Inhalt zu ändern. Am stärksten bei englischen Texten.", q: "blader/humanizer" },
  { t: "Design prüfen und polieren", k: "impeccable", d: "Kritisiert und verfeinert das Design deiner Webseite: Abstände, Schriften, Farben und die Reihenfolge, in der das Auge liest.", q: "pbakaus/impeccable" },
];

const pruefpunkte = [
  { t: "Wer steht dahinter?", d: "Ein Entwickler oder eine Firma mit Namen und Geschichte." },
  { t: "Welche Lizenz?", d: "MIT oder Apache 2.0 erlauben die Nutzung." },
  { t: "Wird er gepflegt?", d: "Die letzte Änderung sollte nicht lange her sein." },
  { t: "Was steht in der SKILL.md?", d: "Die Datei ist kurz und in normaler Sprache geschrieben. Steht dort etwas, das du nicht willst, lass es." },
  { t: "Frag Claude.", d: "Gib Claude Code den Link und schreib: „Prüf dieses Repository, bevor ich es installiere. Was tut es auf meinem Rechner?“" },
];

const ablauf = [
  { n: "1", t: "Eintragen", d: "Name, Mail-Adresse und Telefonnummer." },
  { n: "2", t: "Mail bestätigen", d: "Link in der Mail öffnen, Adresse bestätigen." },
  { n: "3", t: "Herunterladen", d: "Der Klick führt dich direkt zum Paket." },
];

const faq = [
  {
    q: "Was sind Claude Skills?",
    a: "Ein Skill ist eine kurze Anleitung in einer Datei namens SKILL.md, die Claude liest, sobald sie zur Aufgabe passt. Oben stehen ein Name und eine Beschreibung, darunter die Schritte in normaler Sprache. Am Anfang kennt Claude nur die Beschreibungen, die ganze Anleitung liest es erst bei Bedarf. In Claude Code rufst du einen Skill auch direkt auf, mit Schrägstrich und Namen.",
  },
  {
    q: "Wo speichert Claude Code Skills?",
    a: "Persönliche Skills liegen im Ordner ~/.claude/skills in deinem Benutzerordner und gelten in allen Projekten. Skills für ein einzelnes Projekt legst du in den Unterordner .claude/skills des Projekts. Was du über /plugin installierst, verwaltet Claude Code selbst. Welche Skills gerade geladen sind, zeigt dir der Befehl /skills.",
  },
  {
    q: "Funktionieren Skills auch ohne Claude Code?",
    a: "Ja. In der Claude-App auf claude.ai kannst du Skills als ZIP-Datei hochladen, schon im kostenlosen Plan, solange die Code-Ausführung in den Einstellungen eingeschaltet ist. Das Format ist außerdem ein offener Standard. Laut Anthropic nutzen es mehr als 70 KI-Werkzeuge, darunter ChatGPT, Cursor, GitHub Copilot und VS Code.",
  },
  {
    q: "Sind Claude Skills kostenlos?",
    a: "Die meisten Skills sind kostenlos und quelloffen, auch alle zehn aus diesem Artikel. Du brauchst nur Zugang zu Claude. Claude Code ist ab dem Pro-Plan dabei, der 18 Euro im Monat kostet, bei Jahreszahlung 15 Euro. In der Claude-App gehen Skills schon im kostenlosen Plan.",
  },
  {
    q: "Was ist der Unterschied zwischen einem Skill und einem Plugin?",
    a: "Ein Skill ist eine einzelne Anleitung für eine Aufgabe. Ein Plugin ist ein Paket, das du mit /plugin installierst. Es kann einen oder mehrere Skills enthalten und dazu Helfer wie eigene Befehle oder eine Statuszeile. Für dich als Nutzer ist der Unterschied klein: Beides installierst du einmal, danach weiß Claude mehr.",
  },
  {
    q: "Wie viele Skills sollte ich installieren?",
    a: "Fang mit einem einzigen an, mit dem für die Aufgabe, die du am häufigsten erledigst. Wenn du merkst, dass er hilft, nimm den nächsten dazu. Viele Skills bremsen Claude kaum, weil es am Anfang nur die kurzen Beschreibungen liest. Den Überblick behältst du trotzdem leichter, wenn du nur installierst, was du wirklich nutzt.",
  },
  {
    q: "Können Skills gefährlich sein?",
    a: "Ja, wenn sie aus einer unbekannten Quelle kommen. Ein Skill kann Claude anweisen, Befehle auf deinem Rechner auszuführen oder Daten an fremde Adressen zu schicken. Anthropic rät, Skills nur aus vertrauenswürdigen Quellen zu installieren und vorher zu lesen, was drinsteht. Mit den fünf Fragen aus diesem Artikel prüfst du jeden fremden Skill in wenigen Minuten.",
  },
];

const articleSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Claude Code Skills: was sie sind und welche zehn sich für den Anfang lohnen",
  description,
  author: autor,
  publisher: { "@type": "Organization", name: "Sabala Mentoring", url: site },
  datePublished,
  dateModified: datePublished,
  inLanguage: "de-DE",
  mainEntityOfPage: { "@type": "WebPage", "@id": url },
  image: `${site}${cover.src}`,
});

const breadcrumbSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Start", item: site },
    { "@type": "ListItem", position: 2, name: "Claude Code", item: `${site}/claude-code` },
    { "@type": "ListItem", position: 3, name: "Claude Code Skills", item: url },
  ],
});

const faqSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

// Lesbarkeit für Leser ab 50: dunkle Fließtext-Farbe, Links in dunklem Gold, keine halb durchsichtige Schrift.
const proseBlock =
  "prose prose-lg max-w-none font-satoshi leading-[1.8] text-[#57514A] prose-headings:font-instrument prose-headings:font-normal prose-headings:text-deep-charcoal prose-strong:text-deep-charcoal prose-a:text-[#7A5C18] prose-a:underline prose-a:decoration-refined-gold prose-a:underline-offset-4 prose-a:py-3 hover:prose-a:text-deep-charcoal prose-h2:text-3xl md:prose-h2:text-[2.6rem] prose-h2:mt-4 prose-h2:mb-6 prose-h2:leading-[1.15] prose-p:mb-6 prose-li:mb-2 prose-code:before:content-none prose-code:after:content-none prose-code:rounded prose-code:bg-warm-light prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal prose-code:text-deep-charcoal";

function Bild({ bild }: { bild: { src: string; alt: string } }) {
  return (
    <ScrollReveal>
      <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-refined-gold/30">
        <Image src={bild.src} alt={bild.alt} fill sizes="(min-width: 1100px) 1000px, 100vw" className="object-cover" />
      </div>
    </ScrollReveal>
  );
}

export default function ClaudeCodeSkillsPage() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-pure-surface pb-32 selection:bg-refined-gold selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleSchemaJson.replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchemaJson.replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchemaJson.replace(/</g, "\\u003c") }} />

      <div className="w-full bg-[#2E2B26] pt-24 md:pt-32" />

      {/* HERO: ohne Einblenden, damit der größte Inhalt sofort steht */}
      <section className="relative flex min-h-[min(100vw,760px)] w-full flex-col justify-end overflow-hidden bg-[#1a1612] md:min-h-[min(calc(100vw*9/21),760px)]">
        <Image src={cover.src} alt={cover.alt} fill priority sizes="100vw" className="object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0a] via-[#1a1612]/85 to-[#1a1612]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0c0a]/90 via-[#1a1612]/50 to-transparent" />
        <div className="relative z-10 w-full max-w-[1400px] px-6 pb-16 pt-8 sm:px-12 md:px-24 md:pb-24">
          <div className="mb-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link href="/blog" className="-my-3.5 inline-flex items-center gap-2 py-3.5 font-mono text-[13px] uppercase tracking-widest text-[#E9E4DA] transition-colors hover:text-gold-light">
              <ArrowLeft className="h-4 w-4" /> Zurück zum Journal
            </Link>
            <Link href="/claude-code" className="-my-3.5 py-3.5 font-mono text-[13px] uppercase tracking-widest text-gold-light underline decoration-gold-light underline-offset-4 transition-colors hover:text-white">
              Alles zu Claude Code
            </Link>
          </div>
          <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-[13px] uppercase tracking-widest">
            <span className="rounded-full border border-gold-light bg-[#2E2B26] px-3 py-1 text-gold-light">KI-Akademie · Skills</span>
            <span className="text-[#E9E4DA]">November 2026</span>
            <span className="text-[#E9E4DA]">9 Min Lesezeit</span>
          </div>
          <h1 className="mb-6 max-w-[1100px] font-instrument text-[clamp(2.5rem,5vw,5rem)] leading-[1.05] text-white">
            Claude Code Skills. <span className="italic text-gold-light">Zehn, mit denen du anfängst.</span>
          </h1>
          <p className="max-w-[760px] font-satoshi text-lg leading-relaxed text-[#E9E4DA] md:text-xl">
            Was ein Skill ist, wie du ihn in zwei Minuten installierst und welche zehn ich jedem für die erste Woche empfehle.
          </p>
        </div>
      </section>

      {/* DIE KURZE ANTWORT */}
      <section className="mx-auto w-full max-w-[860px] px-6 pt-16 sm:px-12 md:px-24">
        <div className="rounded-r-lg border-l-2 border-refined-gold bg-cream p-8 md:p-10">
          <p className="mb-5 font-mono text-[13px] uppercase tracking-widest text-[#7A5C18]">Die kurze Antwort vorab</p>
          <p className="font-satoshi text-lg leading-relaxed text-deep-charcoal">
            Ein Skill ist eine kurze Anleitung in einer Datei, die Claude liest, sobald sie zur Aufgabe passt. Einmal installiert, weiß Claude zum Beispiel, wie dein Newsletter aussieht oder wie eine Seite geprüft wird, ohne dass du es jedes Mal erklärst. Für den Anfang reichen wenige Skills, und die besten sind <strong>kostenlos</strong>.
          </p>
        </div>
      </section>

      {/* WAS SIND SKILLS */}
      <section className="mx-auto w-full max-w-[1100px] px-6 pt-20 sm:px-12 md:px-24">
        <ScrollReveal>
          <div className={`${proseBlock} mx-auto max-w-[820px]`}>
            <h2>Was sind Claude Skills überhaupt?</h2>
            <p className={dropCapClass}>
              Früher habe ich Claude jeden Montag dasselbe erklärt: wie mein Newsletter aufgebaut ist, welche Wörter ich nie benutze, worauf ich bei einer neuen Seite achte. Heute steht das in Skills, und Claude liest es selbst nach, sobald es gebraucht wird. Ein Skill ist ein Ordner mit einer Textdatei namens SKILL.md. Oben stehen ein Name und eine kurze Beschreibung, darunter die Anleitung in normaler Sprache.
            </p>
            <p>
              Am Anfang jeder Unterhaltung kennt Claude nur die Namen und Beschreibungen aller Skills. Die ganze Anleitung liest es erst, wenn deine Bitte dazu passt. Es ist wie in einer Werkstatt mit vielen Schubladen: Claude kennt die Schilder auf allen Schubladen, aufziehen muss es nur die eine, die es gerade braucht. Deshalb belasten auch viele Skills deine Unterhaltung kaum. In Claude Code kannst du einen Skill auch selbst aufrufen, mit Schrägstrich und Namen, etwa <code>/humanizer</code>.
            </p>
            <p>
              Skills gibt es nicht nur in Claude Code. Anthropic hat das Format im Oktober 2025 vorgestellt und im Dezember 2025 als offenen Standard veröffentlicht. Laut{" "}
              <a href="https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation" target="_blank" rel="noopener noreferrer">Anthropic</a> nutzen ihn inzwischen mehr als 70 KI-Werkzeuge, darunter ChatGPT, Cursor, GitHub Copilot und VS Code. Ein Skill lässt sich also oft auch dort nutzen.
            </p>
          </div>
        </ScrollReveal>
        <div className="mx-auto max-w-[1000px]">
          <Bild bild={schublade} />
        </div>
      </section>

      {/* ZAHLEN */}
      <section className="mx-auto w-full max-w-[1100px] px-6 pt-16 sm:px-12 md:px-24">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {zahlen.map((z, i) => (
            <ScrollReveal key={z.label} delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-2xl border border-refined-gold/40 bg-[#2E2B26] p-6 md:p-7">
                <span className="mb-2 font-instrument text-4xl leading-none text-gold-light md:text-5xl">
                  <CountUp to={z.wert} suffix={z.suffix} />
                </span>
                <span className="mb-1 font-satoshi text-[15px] font-semibold text-white">{z.label}</span>
                <span className="font-satoshi text-[15px] leading-snug text-[#E9E4DA]">{z.sub}</span>
              </div>
            </ScrollReveal>
          ))}
          <ScrollReveal delay={0.18}>
            <div className="flex h-full flex-col rounded-2xl border border-refined-gold/40 bg-[#2E2B26] p-6 md:p-7">
              <span className="mb-2 font-instrument text-4xl leading-none text-gold-light md:text-5xl">8.100</span>
              <span className="mb-1 font-satoshi text-[15px] font-semibold text-white">Suchen im Monat</span>
              <span className="font-satoshi text-[15px] leading-snug text-[#E9E4DA]">nach „Claude Skills“ in Deutschland</span>
            </div>
          </ScrollReveal>
        </div>
        <p className="mx-auto mt-5 max-w-[820px] font-satoshi text-[15px] leading-relaxed text-[#57514A]">
          Quellen:{" "}
          <a href="https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation" target="_blank" rel="noopener noreferrer" className="py-3.5 text-[#7A5C18] underline decoration-refined-gold underline-offset-4">
            Anthropic, 22. Oktober 2026
          </a>
          , Suchdaten für Deutschland vom September 2026.
        </p>
      </section>

      {/* UNTERSCHIED */}
      <section className="mx-auto w-full max-w-[1100px] px-6 pt-20 sm:px-12 md:px-24">
        <ScrollReveal>
          <div className={`${proseBlock} mx-auto max-w-[820px]`}>
            <h2>Was ist der Unterschied zwischen Skill, Plugin und CLAUDE.md?</h2>
            <p>
              Die drei Begriffe fallen ständig zusammen, und am Anfang verwechselt sie fast jeder. Dabei ist die Aufteilung einfach:
            </p>
          </div>
        </ScrollReveal>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {unterschied.map((u, i) => (
            <ScrollReveal key={u.t} delay={i * 0.05}>
              <div className="h-full rounded-xl border border-refined-gold/40 bg-cream p-6">
                <u.icon className="mb-3 h-6 w-6 text-[#7A5C18]" aria-hidden />
                <h3 className="font-instrument text-2xl text-deep-charcoal">{u.t}</h3>
                <p className="mt-2 font-satoshi text-[16px] leading-relaxed text-[#57514A]">{u.d}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal>
          <div className={`${proseBlock} mx-auto mt-8 max-w-[820px]`}>
            <p>
              Eine gute Faustregel steht in der{" "}
              <a href="https://code.claude.com/docs/en/skills" target="_blank" rel="noopener noreferrer">Doku von Claude Code</a>: Wenn du dieselbe Anweisung immer wieder in den Chat kopierst oder ein Abschnitt deiner CLAUDE.md zu einer ganzen Anleitung gewachsen ist, gehört er in einen Skill. Die CLAUDE.md bleibt dann kurz, und Claude liest die Anleitung nur, wenn sie gebraucht wird.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <GoldDivider />

      {/* INSTALLIEREN */}
      <section className="mx-auto w-full max-w-[1100px] px-6 sm:px-12 md:px-24">
        <ScrollReveal>
          <div className="rounded-[28px] border border-refined-gold/40 bg-deep-charcoal p-8 shadow-[0_30px_70px_rgba(184,150,62,0.12)] md:p-14">
            <div className="mb-6 flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-gold-light" aria-hidden />
              <span className="font-mono text-[13px] font-bold uppercase tracking-[0.22em] text-gold-light">Schritt für Schritt</span>
            </div>
            <h2 className="mb-8 font-instrument text-3xl leading-tight text-white md:text-5xl">
              Wie installierst du einen Skill? <span className="italic text-gold-light">Drei Wege.</span>
            </h2>
            <ol className="flex flex-col gap-8">
              {wege.map((w, i) => (
                <li key={w.t} className="border-t border-[#4A453D] pt-6">
                  <div className="flex items-center gap-3">
                    <span className="font-instrument text-3xl leading-none text-gold-light">{i + 1}</span>
                    <w.icon className="h-5 w-5 text-gold-light" aria-hidden />
                    <h3 className="font-instrument text-2xl text-white">{w.t}</h3>
                  </div>
                  <p className="mt-3 font-satoshi text-[17px] leading-relaxed text-[#E9E4DA]">{w.d}</p>
                  {w.befehle && (
                    <div className="mt-4 overflow-x-auto rounded-xl border border-[#4A453D] bg-[#15120d] px-5 py-4 font-mono text-[15px] leading-relaxed text-gold-light">
                      {w.befehle.map((b) => (
                        <p key={b}>{b}</p>
                      ))}
                    </div>
                  )}
                  {w.danach && <p className="mt-4 font-satoshi text-[17px] leading-relaxed text-[#E9E4DA]">{w.danach}</p>}
                  {w.befehle2 && (
                    <div className="mt-4 overflow-x-auto rounded-xl border border-[#4A453D] bg-[#15120d] px-5 py-4 font-mono text-[15px] leading-relaxed text-gold-light">
                      {w.befehle2.map((b) => (
                        <p key={b}>{b}</p>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ol>
            <p className="mt-8 border-t border-[#4A453D] pt-6 font-satoshi text-[17px] leading-relaxed text-[#E9E4DA]">
              Hast du einen Ordner kopiert, startest du Claude Code danach neu. Mit <code className="rounded bg-[#15120d] px-1.5 py-0.5 font-mono text-gold-light">/skills</code> siehst du, welche Skills geladen sind. Die Befehle tippst du in Claude Code ein, nicht ins normale Terminal.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ZEHN SKILLS */}
      <section className="mx-auto w-full max-w-[1100px] px-6 pt-20 sm:px-12 md:px-24">
        <ScrollReveal>
          <div className={`${proseBlock} mx-auto max-w-[820px]`}>
            <h2>Welche zehn Skills lohnen sich für den Anfang?</h2>
            <p>
              Diese zehn nutze ich selbst, und ich empfehle sie jedem, der mit Claude Code anfängt. Alle sind kostenlos, ihre Lizenz erlaubt die Nutzung. Die ersten fünf stammen aus dem offiziellen Marktplatz von Anthropic, die anderen fünf von unabhängigen Entwicklern. Zwei davon sind streng genommen Plugins mit Helfern, der Erklärmodus und die Statuszeile. Installiert werden alle gleich.
            </p>
          </div>
        </ScrollReveal>
        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {skills.map((s, i) => (
            <li key={s.k}>
              <ScrollReveal delay={(i % 2) * 0.04} className="h-full">
                <div className="flex h-full gap-5 rounded-r-2xl border-l-4 border-refined-gold bg-cream py-6 pl-6 pr-6">
                  <span className="w-8 flex-shrink-0 font-instrument text-4xl leading-none text-[#7A5C18]">{i + 1}</span>
                  <div>
                    <h3 className="font-instrument text-2xl leading-snug text-deep-charcoal">{s.t}</h3>
                    <p className="mt-1 font-mono text-[15px] text-[#7A5C18] [overflow-wrap:anywhere]">{s.k}</p>
                    <p className="mt-2 font-satoshi text-[16px] leading-relaxed text-[#57514A]">{s.d}</p>
                    <p className="mt-2 font-satoshi text-[15px] text-[#57514A]">Quelle: {s.q}</p>
                  </div>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </section>

      <StartpaketKasten artikel={slug} titel="Alle zehn in einem Ordner, mit Befehl zum Installieren." text="Im kostenlosen Startpaket, dazu die Installation für Mac und Windows, ein Spickzettel und zwei CLAUDE.md-Vorlagen." />

      <PullQuote>Fang mit einem einzigen Skill an. Mit dem für die Aufgabe, die du am häufigsten erledigst.</PullQuote>

      {/* EIGENER SKILL */}
      <section className="mx-auto w-full max-w-[820px] px-6 sm:px-12 md:px-24">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Wann lohnt sich ein eigener Skill?</h2>
            <p>
              Sobald du Claude dieselbe Sache zum dritten Mal erklärst. In meinem eigenen Setup liegen über 120 Skills, rund 35 davon habe ich selbst geschrieben: für meine Angebote, meine Newsletter, meine Webseiten-Prüfung.
            </p>
            <p>
              Am einfachsten geht es mit <code>skill-creator</code> aus der Liste oben. Du beschreibst den Ablauf so, wie du ihn einer neuen Mitarbeiterin erklären würdest, und Claude schreibt daraus die SKILL.md. Danach probierst du ihn zwei, drei Mal aus und schärfst nach, wo Claude noch rät.
            </p>
            <p>
              Achtzehn meiner eigenen Skills gibt es kostenlos zum Mitnehmen, auf Deutsch und sortiert in sechs Pakete: von Texten ohne KI-Klang über Design, SEO und Marktrecherche bis zu Social Media und Entwicklung. Du findest sie in den <Link href="/claude-code/skill-paket">Skill-Paketen</Link>, mit einem Setup für deinen Beruf.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* FREMDE SKILLS PRUEFEN */}
      <section className="mx-auto w-full max-w-[1100px] px-6 pt-20 sm:px-12 md:px-24">
        <ScrollReveal>
          <div className={`${proseBlock} mx-auto max-w-[820px]`}>
            <h2>Worauf achtest du bei fremden Skills?</h2>
            <p>
              Ein Skill kann Claude anweisen, Befehle auf deinem Rechner auszuführen. Bei fast 280 Millionen Installationen ist klar, dass nicht jeder Skill da draußen gut gemeint ist. Anthropic schreibt selbst in seiner{" "}
              <a href="https://support.claude.com/en/articles/12512180-use-skills-in-claude" target="_blank" rel="noopener noreferrer">Hilfe zu Skills</a>, man solle nur Skills aus vertrauenswürdigen Quellen installieren und vorher lesen, was drinsteht. Fünf Fragen reichen dafür:
            </p>
          </div>
        </ScrollReveal>
        <ol className="mx-auto mt-8 flex max-w-[820px] flex-col gap-3">
          {pruefpunkte.map((p, i) => (
            <li key={p.t}>
              <ScrollReveal delay={i * 0.04}>
                <div className="flex gap-5 rounded-r-2xl border-l-4 border-refined-gold bg-cream py-5 pl-6 pr-6">
                  <span className="w-8 flex-shrink-0 font-instrument text-3xl leading-none text-[#7A5C18]">{i + 1}</span>
                  <p className="font-satoshi text-[17px] leading-relaxed text-[#57514A]">
                    <strong className="text-deep-charcoal">{p.t}</strong> {p.d}
                  </p>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ol>
        <div className="mx-auto max-w-[1000px]">
          <Bild bild={pruefen} />
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-[900px] px-6 pt-24 sm:px-12 md:px-24">
        <ScrollReveal>
          <p className="mb-4 text-center font-mono text-[13px] uppercase tracking-widest text-[#7A5C18]">Häufige Fragen</p>
          <h2 className="mb-12 text-center font-instrument text-3xl leading-[1.1] text-deep-charcoal md:text-5xl">Was Leser zu Skills fragen.</h2>
        </ScrollReveal>
        <div className="flex flex-col gap-3">
          {faq.map((f, i) => (
            <ScrollReveal key={f.q} delay={i * 0.04}>
              <details className="group rounded-xl border border-refined-gold/40 bg-cream px-6 py-5 transition-colors hover:border-refined-gold [&_summary::-webkit-details-marker]:hidden">
                <summary className="-my-1.5 flex cursor-pointer list-none items-center justify-between gap-6 py-1.5">
                  <h3 className="font-instrument text-xl text-deep-charcoal">{f.q}</h3>
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-refined-gold text-xl text-[#7A5C18] transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 font-satoshi text-[17px] leading-relaxed text-[#57514A]">{f.a}</p>
              </details>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* EIN CTA: das Startpaket mit Formular, gleiche Quelle wie auf /claude-code/startpaket */}
      <section id="startpaket" className="mt-24 w-full scroll-mt-24 bg-[#080604] px-6 py-16 sm:px-12 md:py-24">
        <div className="mx-auto grid w-full max-w-[1100px] gap-12 rounded-[5px] border border-refined-gold/40 bg-gradient-to-br from-[#2a2217] via-[#14100b] to-[#100c07] p-7 sm:p-10 md:p-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-4 font-mono text-[13px] uppercase tracking-[0.22em] text-gold-light">Kostenlos per Mail</p>
            <h2 className="mb-5 font-instrument text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.1] text-white">Die zehn Skills als Startpaket.</h2>
            <p className="mb-8 font-satoshi text-[16px] leading-relaxed text-[#E9E4DA]">
              Alle zehn mit Befehl zum Installieren, dazu die Installation von Claude Code für Mac und Windows, ein Spickzettel und zwei CLAUDE.md-Vorlagen. Trag dich ein und bestätige kurz die Mail, dann geht es zum Download. Danach bekommst du meinen Newsletter mit KI-Updates, abmelden geht jederzeit mit einem Klick.
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

      <BlogSpokes slugs={["claude-code-installieren", "claude-code-weniger-code-ponytail", "second-brain-obsidian-claude"]} />
    </main>
  );
}
