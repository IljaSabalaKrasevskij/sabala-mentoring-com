import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Sparkles, BookOpen, Bot, Search, Brain } from "lucide-react";
import { BlogSpokes } from "@/components/blog/BlogSpokes";
import { dropCapClass, GoldDivider, PullQuote } from "@/components/blog/BlogProse";

const slug = "second-brain-obsidian-claude";
const site = "https://sabala-mentoring.com";
const url = `${site}/blog/${slug}`;
const datePublished = "2026-11-12";

// ponytail: vorhandene Bilder, eigene Illustrationen folgen, sobald KIE wieder Guthaben hat
const cover = {
  src: "/webinar/ordner-zentrale.jpg",
  alt: "Ein Schreibtisch am Abend mit Schreibtischlampe, gestapelten Ordnern, einem offenen Notizbuch und einem Laptop",
};
const helfer = {
  src: "/claude-code/hero.jpg",
  alt: "Skizze: ein Mann arbeitet am Abend am Laptop, um ihn herum ordentlich sortierte Stapel aus Briefen, Notizen und einem Webseiten-Entwurf",
};
const wegweiser = {
  src: "/blog/claude-code-installieren/wegweiser.jpg",
  alt: "Skizze: ein kleiner Holzwegweiser mit leeren Pfeilen auf einem Schreibtisch, dahinter heftet jemand einen kurzen Zettel an eine Pinnwand",
};

const title = "Second Brain mit Obsidian und Claude: einfach erklärt";
const description =
  "Ein Second Brain mit Obsidian, Claude Code und Gemini Notebook: was es ist, wie du es in 60 bis 90 Minuten aufbaust und welche Fehler du vermeidest.";

export const metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description: "Acht Ordner, eine kurze CLAUDE.md und drei Werkzeuge: so fängt Claude nie wieder bei null an.",
    type: "article",
    publishedTime: datePublished,
    url,
    images: [{ url: `${site}${cover.src}`, width: 1392, height: 752, alt: cover.alt }],
  },
};

const autor = {
  "@type": "Person",
  name: "Ilja Krasevskij",
  url: `${site}/ueber-mich`,
  sameAs: ["https://www.linkedin.com/in/sabala-mentoring/"],
  jobTitle: "Founder, Sabala Studios",
  knowsAbout: ["Second Brain", "Obsidian", "Claude Code", "KI im Unternehmen"],
};

type Schritt = { t: string; d: string; code?: string };

const werkzeuge = [
  { icon: BookOpen, name: "Obsidian", rolle: "Das Gedächtnis", d: "Einfache Textdateien auf deiner Festplatte, in einer festen Ordnerstruktur. Kostenlos, auch für die Arbeit, und die Dateien gehören dir." },
  { icon: Bot, name: "Claude Code", rolle: "Der Assistent", d: "Liest dein Gedächtnis, schreibt hinein, ordnet und fasst zusammen. Im Terminal oder in der Claude-App, ganz ohne Programmieren." },
  { icon: Search, name: "Gemini Notebook", rolle: "Der Rechercheur", d: "Früher NotebookLM. Bekommt Quellen wie PDFs, Links oder Videos und antwortet mit Belegen. Dafür brauchst du ein Google-Konto." },
];

const ordner = [
  { n: "00_Kontext", t: "Wer bin ich?", d: "Profil, Werte, Schreibstil, Regeln. Diesen Ordner liest Claude zuerst." },
  { n: "01_Inbox", t: "Brain Dump", d: "Alles Neue landet hier, sortiert wird später." },
  { n: "02_Projekte", t: "Mit Deadline", d: "Alles, was ein klares Ende hat." },
  { n: "03_Bereiche", t: "Dauerhaft", d: "Kunden, Marke, Gesundheit, Familie." },
  { n: "04_Ressourcen", t: "Wissen", d: "Recherchen, Expertenwissen, Vorlagen." },
  { n: "05_Daily_Notes", t: "Tageslog", d: "Die Tagesnotiz schreibt Claude für dich." },
  { n: "06_Archiv", t: "Fertig", d: "Wird abgelegt, nie gelöscht." },
  { n: "07_Anhaenge", t: "Medien", d: "Bilder, PDFs, Audio und Video." },
];

const schritte: Schritt[] = [
  {
    t: "Obsidian installieren und einen Vault anlegen",
    d: "Lade Obsidian von obsidian.md und leg einen neuen Vault an, lokal auf deiner Festplatte, zum Beispiel unter Dokumente/Mein-Vault. Nie in iCloud, OneDrive, Dropbox oder Google Drive: Diese Dienste gleichen ständig ab und können Dateien beschädigen, während Claude gerade schreibt.",
  },
  {
    t: "Die acht Ordner anlegen",
    d: "Genau diese acht, mit der Nummer davor, damit sie in der Seitenleiste immer in dieser Reihenfolge stehen. Darin darfst du später beliebig Unterordner bauen.",
    code: "00_Kontext\n01_Inbox\n02_Projekte\n03_Bereiche\n04_Ressourcen\n05_Daily_Notes\n06_Archiv\n07_Anhaenge",
  },
  {
    t: "Claude Code in deinem Vault starten",
    d: "Claude muss genau in deinem Vault-Ordner laufen, sonst sieht es nichts davon. In der Claude-App wählst du im Bereich Code den Vault als Ordner. Im Terminal wechselst du mit cd hinein und tippst claude.",
  },
  {
    t: "Eine kurze CLAUDE.md als Wegweiser schreiben",
    d: "Leg im Vault eine Datei CLAUDE.md an. Sie sagt Claude, wo was liegt und welche Regeln gelten. Claude liest sie bei jedem Start. Für den Anfang reichen ein paar Zeilen:",
    code: "# Mein Second Brain\nLies zuerst 00_Kontext (wer ich bin, wie ich schreibe).\nNeues landet in 01_Inbox, sortiert wird einmal pro Woche.\nAm Abend schreibst du die Tagesnotiz in 05_Daily_Notes.\nLösche nie etwas. Fertiges kommt nach 06_Archiv.",
  },
  {
    t: "Kontext füllen und die erste Routine starten",
    d: "Schreib in 00_Kontext ein kurzes Profil und ein paar Regeln zu deinem Schreibstil, oder lass dich von Claude dazu interviewen. Dann die erste Routine: Am Morgen fragst du Claude, was in der Inbox liegt, am Abend lässt du die Tagesnotiz schreiben.",
  },
];

const fehler: Schritt[] = [
  { t: "Der Vault liegt in einem Cloud-Ordner", d: "iCloud, OneDrive und Dropbox gleichen ständig ab und lagern Dateien aus. Dann fehlen Claude Notizen, oder zwei Fassungen überschreiben sich. Leg den Vault lokal ab." },
  { t: "Für jedes neue Thema ein neuer Hauptordner", d: "Nach drei Monaten weiß niemand mehr, wo etwas liegt, auch Claude nicht. Bleib bei den acht Ordnern und bau darin Unterordner." },
  { t: "Die CLAUDE.md wird zum Lager", d: "Alles, was dort steht, liest Claude bei jedem Start. Eine lange Datei kostet Kontext und macht die Antworten unschärfer. Sie zeigt nur, wo etwas liegt." },
  { t: "Alles auf einmal importieren", d: "Fang mit deinem Kontext und den laufenden Projekten an. Altes holst du nach, wenn du es wirklich brauchst." },
  { t: "Keine Routine", d: "Ein Second Brain lebt von kleinen Gewohnheiten: Inbox leeren, Tagesnotiz schreiben, Fertiges archivieren. Ohne sie wird es zur Ablage, die keiner mehr öffnet." },
];

const mein = [
  { t: "Über 2.200 Notizen", d: "in genau dieser Struktur, in einem Ordner auf meinem Rechner und in keinem Cloud-Ordner." },
  { t: "Eine Zeile reicht", d: "Meine globale CLAUDE.md lädt bei jeder Sitzung nur den Wegweiser aus dem Vault." },
  { t: "Ein Wegweiser, kein Lager", d: "Er sagt Claude, wo Marke, Preise, Projekte und Schreibstil liegen. Alles andere steht in eigenen Dateien." },
  { t: "Zuerst suchen, dann fragen", d: "Eine kleine eigene Suche läuft über Vault, Skills und Gedächtnis zugleich, ganz ohne KI." },
  { t: "Jeder Start gleich", d: "Neue Einträge im Brain Dump prüfen, die letzte Tagesnotiz lesen, den wichtigsten offenen Punkt ansprechen." },
];

const faq = [
  {
    q: "Was ist ein Second Brain?",
    a: "Ein Second Brain ist ein zweites Gedächtnis außerhalb deines Kopfes: ein Ordner, in dem dein Wissen geordnet in Notizen liegt. Die Idee geht auf Tiago Forte und seine Methode PARA zurück. Mit Claude Code wird daraus mehr als eine Ablage, denn die KI liest darin, schreibt hinein und kennt so dein Geschäft, deine Kunden und deinen Stil.",
  },
  {
    q: "Was kostet ein Second Brain mit Obsidian und Claude?",
    a: "Obsidian kostet nichts, auch nicht für die Arbeit. Eine Firmenlizenz ist freiwillig, und den Abgleich zwischen Geräten gibt es auf Wunsch ab 4 US-Dollar im Monat. Für Claude Code brauchst du mindestens Claude Pro für 20 US-Dollar im Monat, bei Jahreszahlung 17 Dollar. Für Gemini Notebook brauchst du ein Google-Konto.",
  },
  {
    q: "Brauche ich Programmierkenntnisse?",
    a: "Nein. Du legst Ordner an, schreibst ein paar Zeilen in eine Textdatei und sprichst mit Claude in normalen Sätzen. Wer das Terminal meiden will, nimmt die Claude-App mit ihrem Bereich für Code. Das Grundgerüst steht in 60 bis 90 Minuten, danach wächst es mit jeder Woche.",
  },
  {
    q: "Wo liegen meine Daten?",
    a: "Deine Notizen liegen als einfache Textdateien auf deinem Rechner. Claude Code arbeitet nur in dem Ordner, in dem du es startest, und fragt vor Änderungen nach. Was Claude für eine Aufgabe liest, wird dafür an Anthropic übertragen. Passwörter und sensible Kundendaten gehören deshalb nicht in den Vault.",
  },
  {
    q: "Warum nicht einfach Notion?",
    a: "Notion speichert deine Seiten in seiner eigenen Cloud. Obsidian legt einfache Textdateien auf deine Festplatte, die Claude Code direkt lesen und schreiben kann, ohne Umweg über eine Schnittstelle. Wer schon viel in Notion hat, exportiert die Inhalte als Markdown und holt sie Schritt für Schritt in den Vault.",
  },
  {
    q: "Was ist der Unterschied zwischen NotebookLM und Gemini Notebook?",
    a: "Es gibt keinen. Google hat NotebookLM am 16. Juli 2026 in Gemini Notebook umbenannt. Es ist dasselbe Werkzeug: Du gibst ihm Quellen, und es antwortet mit Belegen aus genau diesen Quellen. Im Second Brain übernimmt es die Recherche, die Ergebnisse legt Claude danach in deinem Vault ab.",
  },
  {
    q: "Wie lange dauert die Einrichtung?",
    a: "Das Grundgerüst aus Vault, acht Ordnern, Claude Code und CLAUDE.md steht in 60 bis 90 Minuten. Richtig wertvoll wird es in den Wochen danach, wenn dein Kontext, deine Projekte und deine Routinen wachsen. Im Kurs bauen wir genau das in zwei Live-Workshops gemeinsam auf.",
  },
];

const articleSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Second Brain mit Obsidian und Claude: damit Claude nie wieder bei null anfängt",
  description,
  author: autor,
  publisher: { "@type": "Organization", name: "Sabala Mentoring", url: site },
  datePublished,
  dateModified: datePublished,
  inLanguage: "de-DE",
  mainEntityOfPage: { "@type": "WebPage", "@id": url },
  image: `${site}${cover.src}`,
});

const howToSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Ein Second Brain mit Obsidian und Claude Code einrichten",
  inLanguage: "de-DE",
  totalTime: "PT90M",
  tool: [{ "@type": "HowToTool", name: "Obsidian" }, { "@type": "HowToTool", name: "Claude Code" }],
  step: schritte.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.t, text: s.d })),
});

const faqSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

// Lesbarkeit für Leser ab 50: dunkle Fließtext-Farbe, Links in dunklem Gold, keine halb durchsichtige Schrift.
const proseBlock =
  "prose prose-lg max-w-none font-satoshi leading-[1.8] text-[#57514A] prose-headings:font-instrument prose-headings:font-normal prose-headings:text-deep-charcoal prose-strong:text-deep-charcoal prose-a:text-[#7A5C18] prose-a:underline prose-a:decoration-refined-gold prose-a:underline-offset-4 hover:prose-a:text-deep-charcoal prose-h2:text-3xl md:prose-h2:text-[2.6rem] prose-h2:mt-4 prose-h2:mb-6 prose-h2:leading-[1.15] prose-p:mb-6 prose-li:mb-2 prose-code:before:content-none prose-code:after:content-none prose-code:rounded prose-code:bg-warm-light prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal prose-code:text-deep-charcoal";

function Codeblock({ code }: { code: string }) {
  return (
    <pre className="mt-4 whitespace-pre-wrap rounded-xl border border-refined-gold/40 bg-[#15120d] px-5 py-4 font-mono text-[15px] leading-relaxed text-gold-light [overflow-wrap:anywhere]">
      <code>{code}</code>
    </pre>
  );
}

function Schritte({ items }: { items: Schritt[] }) {
  return (
    <ol className="mt-8 flex flex-col gap-4">
      {items.map((s, i) => (
        <li key={s.t}>
          <ScrollReveal delay={i * 0.04}>
            <div className="flex gap-5 rounded-r-2xl border-l-4 border-refined-gold bg-cream py-6 pl-6 pr-6 md:pl-8">
              <span className="w-8 flex-shrink-0 font-instrument text-4xl leading-none text-[#7A5C18]">{i + 1}</span>
              <div className="min-w-0 flex-1">
                <h3 className="font-instrument text-2xl leading-snug text-deep-charcoal">{s.t}</h3>
                <p className="mt-2 font-satoshi text-[17px] leading-relaxed text-[#57514A]">{s.d}</p>
                {s.code && <Codeblock code={s.code} />}
              </div>
            </div>
          </ScrollReveal>
        </li>
      ))}
    </ol>
  );
}

function Bild({ bild }: { bild: { src: string; alt: string } }) {
  return (
    <ScrollReveal>
      <div className="relative mx-auto mt-10 aspect-[16/9] max-w-[1000px] overflow-hidden rounded-2xl border border-refined-gold/30">
        <Image src={bild.src} alt={bild.alt} fill sizes="(min-width: 1100px) 1000px, 100vw" className="object-cover" />
      </div>
    </ScrollReveal>
  );
}

export default function SecondBrainObsidianClaudePage() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-pure-surface pb-32 selection:bg-refined-gold selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleSchemaJson.replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: howToSchemaJson.replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchemaJson.replace(/</g, "\\u003c") }} />

      <div className="w-full bg-[#2E2B26] pt-24 md:pt-32" />

      {/* HERO: ohne Einblenden, damit der größte Inhalt sofort steht */}
      <section className="relative flex min-h-[min(100vw,760px)] w-full flex-col justify-end overflow-hidden bg-[#1a1612] md:min-h-[min(calc(100vw*9/21),760px)]">
        <Image src={cover.src} alt={cover.alt} fill priority sizes="100vw" className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0a] via-[#1a1612]/85 to-[#1a1612]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0c0a]/90 via-[#1a1612]/50 to-transparent" />
        <div className="relative z-10 w-full max-w-[1400px] px-6 pb-16 pt-8 sm:px-12 md:px-24 md:pb-24">
          <div className="mb-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link href="/blog" className="inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-widest text-[#E9E4DA] transition-colors hover:text-gold-light">
              <ArrowLeft className="h-4 w-4" /> Zurück zum Journal
            </Link>
            <Link href="/claude-code" className="font-mono text-[13px] uppercase tracking-widest text-gold-light underline decoration-gold-light underline-offset-4 transition-colors hover:text-white">
              Alles zu Claude Code
            </Link>
          </div>
          <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-[13px] uppercase tracking-widest">
            <span className="rounded-full border border-gold-light bg-[#2E2B26] px-3 py-1 text-gold-light">KI-Akademie · Second Brain</span>
            <span className="text-[#E9E4DA]">November 2026</span>
            <span className="text-[#E9E4DA]">8 Min Lesezeit</span>
          </div>
          <h1 className="mb-6 max-w-[1100px] font-instrument text-[clamp(2.5rem,5vw,5rem)] leading-[1.05] text-white">
            Second Brain mit Obsidian und Claude: <span className="italic text-gold-light">damit Claude nie wieder bei null anfängt.</span>
          </h1>
          <p className="max-w-[760px] font-satoshi text-lg leading-relaxed text-[#E9E4DA] md:text-xl">
            Was ein Second Brain ist, wie die drei Werkzeuge zusammenspielen und wie du das Grundgerüst an einem Nachmittag aufbaust. Mit dem Aufbau, mit dem ich selbst jeden Tag arbeite.
          </p>
        </div>
      </section>

      {/* DIE KURZE ANTWORT */}
      <section className="mx-auto w-full max-w-[860px] px-6 pt-16 sm:px-12 md:px-24">
        <div className="rounded-r-lg border-l-2 border-refined-gold bg-cream p-8 md:p-10">
          <p className="mb-5 font-mono text-[13px] uppercase tracking-widest text-[#7A5C18]">Die kurze Antwort vorab</p>
          <p className="font-satoshi text-lg leading-relaxed text-deep-charcoal">
            Ein Second Brain ist ein Ordner mit deinem Wissen in einfachen Textdateien, den Claude lesen und beschreiben darf. <strong>Obsidian</strong> ist das Notizbuch dafür, <strong>Claude Code</strong> der Assistent, der darin arbeitet, und <strong>Gemini Notebook</strong>, früher NotebookLM, recherchiert mit Quellenangaben. Mit acht festen Ordnern und einer kurzen CLAUDE.md steht das Grundgerüst in 60 bis 90 Minuten.
          </p>
        </div>
      </section>

      {/* WAS IST ES */}
      <section className="mx-auto w-full max-w-[820px] px-6 pt-20 sm:px-12 md:px-24">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Was ist ein Second Brain überhaupt?</h2>
            <p className={dropCapClass}>
              Claude fängt jede Sitzung bei null an. Es kennt weder deine Kunden noch deine Projekte noch deinen Stil, solange du ihm keinen Ort gibst, an dem das steht. Genau das ist ein Second Brain: ein zweites Gedächtnis außerhalb deines Kopfes, in dem dein Wissen geordnet liegt.
            </p>
            <p>
              Die Idee stammt von Tiago Forte, der dafür die Methode{" "}
              <a href="https://fortelabs.com/blog/para/" target="_blank" rel="noopener noreferrer">PARA</a> entwickelt hat. Neu ist, dass heute nicht nur du in diesem Gedächtnis liest. Mit Claude Code liest und schreibt auch die KI darin, und das verändert, wie viel du ihr jedes Mal erklären musst.
            </p>
            <p>Wie groß das Interesse ist, zeigen die Suchzahlen: Die Suche nach Obsidian und Claude ist in Deutschland innerhalb eines Jahres von 30 auf 1.900 Anfragen im Monat gestiegen.</p>
          </div>
        </ScrollReveal>
        <Bild bild={helfer} />
      </section>

      {/* DREI WERKZEUGE */}
      <section className="mx-auto w-full max-w-[1100px] px-6 pt-20 sm:px-12 md:px-24">
        <ScrollReveal>
          <div className={`${proseBlock} mx-auto max-w-[820px]`}>
            <h2>Warum Obsidian, Claude Code und Gemini Notebook?</h2>
            <p>Drei Werkzeuge, drei Rollen. Jedes macht eine Sache gut, zusammen ergeben sie ein Gedächtnis, das mitdenkt.</p>
          </div>
        </ScrollReveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {werkzeuge.map((w, i) => (
            <ScrollReveal key={w.name} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-refined-gold/40 bg-[#2E2B26] p-7">
                <w.icon className="mb-4 h-6 w-6 text-gold-light" aria-hidden />
                <p className="font-mono text-[13px] uppercase tracking-widest text-gold-light">{w.rolle}</p>
                <h3 className="mt-1 font-instrument text-2xl text-white">{w.name}</h3>
                <p className="mt-3 font-satoshi text-[16px] leading-relaxed text-[#E9E4DA]">{w.d}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal>
          <div className={`${proseBlock} mx-auto mt-10 max-w-[820px]`}>
            <p>
              Claude ist die Klammer: Es liest deinen Vault, holt sich Recherchen aus Gemini Notebook oder dem Netz und legt das Ergebnis sauber in deinem Vault ab. Du springst nicht mehr zwischen fünf Programmen hin und her.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <PullQuote>Acht Ordner, immer gleich. Darin ist Freiheit, daneben gibt es keinen neunten.</PullQuote>

      {/* AUFBAU */}
      <section className="mx-auto w-full max-w-[1100px] px-6 sm:px-12 md:px-24">
        <ScrollReveal>
          <div className={`${proseBlock} mx-auto max-w-[820px]`}>
            <h2>Wie ist ein Second Brain aufgebaut?</h2>
            <p>
              Ich arbeite mit PARA in acht Ordnern. Die Nummern sorgen dafür, dass sie immer in derselben Reihenfolge stehen. In sechs Monaten weißt du noch, wo etwas liegt, und Claude versteht die Struktur genauso wie du.
            </p>
          </div>
        </ScrollReveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ordner.map((o, i) => (
            <ScrollReveal key={o.n} delay={i * 0.03}>
              <div className="h-full rounded-xl border border-refined-gold/40 bg-cream p-5">
                <p className="font-mono text-[15px] font-semibold text-[#7A5C18] [overflow-wrap:anywhere]">{o.n}</p>
                <h3 className="mt-1 font-instrument text-xl text-deep-charcoal">{o.t}</h3>
                <p className="mt-2 font-satoshi text-[15px] leading-relaxed text-[#57514A]">{o.d}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* EINRICHTEN */}
      <section className="mx-auto w-full max-w-[820px] px-6 pt-20 sm:px-12 md:px-24">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Wie richtest du dein Second Brain ein?</h2>
            <p>
              Fünf Schritte, für die du keine Programmierkenntnisse brauchst. Falls Claude Code noch nicht auf deinem Rechner ist, steht die Installation in meiner <Link href="/blog/claude-code-installieren">Anleitung für Mac und Windows</Link>.
            </p>
          </div>
        </ScrollReveal>
        <Schritte items={schritte} />
        <Bild bild={wegweiser} />
      </section>

      {/* MEIN SYSTEM */}
      <section className="mx-auto w-full max-w-[1100px] px-6 pt-20 sm:px-12 md:px-24">
        <ScrollReveal>
          <div className="rounded-[28px] border border-refined-gold/40 bg-deep-charcoal p-8 shadow-[0_30px_70px_rgba(184,150,62,0.12)] md:p-14">
            <div className="mb-6 flex items-center gap-3">
              <Brain className="h-5 w-5 text-gold-light" aria-hidden />
              <span className="font-mono text-[13px] font-bold uppercase tracking-[0.22em] text-gold-light">Aus meinem Alltag</span>
            </div>
            <h2 className="mb-8 font-instrument text-3xl leading-tight text-white md:text-5xl">
              So sieht mein <span className="italic text-gold-light">Second Brain aus.</span>
            </h2>
            <ul className="flex flex-col gap-4">
              {mein.map((m) => (
                <li key={m.t} className="flex flex-col gap-1 border-t border-[#4A453D] pt-4 sm:flex-row sm:gap-6">
                  <p className="font-instrument text-xl text-gold-light sm:w-56 sm:flex-shrink-0">{m.t}</p>
                  <p className="font-satoshi text-[17px] leading-relaxed text-[#E9E4DA]">{m.d}</p>
                </li>
              ))}
            </ul>
            <p className="mt-8 border-t border-[#4A453D] pt-6 font-satoshi text-[17px] leading-relaxed text-[#E9E4DA]">
              Das Ergebnis: Claude kennt meine Marke, meine Preise und meine laufenden Projekte, ohne dass ich etwas neu erkläre. Wie das im ganzen Geschäft aussieht, zeige ich auf der Seite{" "}
              <Link href="/claude-code" className="text-gold-light underline decoration-gold-light underline-offset-4 hover:text-white">
                Claude Code auf Deutsch
              </Link>
              .
            </p>
          </div>
        </ScrollReveal>
      </section>

      <GoldDivider />

      {/* FEHLER */}
      <section className="mx-auto w-full max-w-[820px] px-6 sm:px-12 md:px-24">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Welche Fehler solltest du vermeiden?</h2>
            <p>Fünf Fehler, die ein Second Brain schnell wieder zur Ablage machen, die keiner öffnet.</p>
          </div>
        </ScrollReveal>
        <Schritte items={fehler} />
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-[900px] px-6 pt-24 sm:px-12 md:px-24">
        <ScrollReveal>
          <p className="mb-4 text-center font-mono text-[13px] uppercase tracking-widest text-[#7A5C18]">Häufige Fragen</p>
          <h2 className="mb-12 text-center font-instrument text-3xl leading-[1.1] text-deep-charcoal md:text-5xl">Was Leser zum Second Brain fragen.</h2>
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
        <p className="mt-6 font-satoshi text-[15px] leading-relaxed text-[#57514A]">
          Quellen: <a href="https://obsidian.md/pricing" target="_blank" rel="noopener noreferrer" className="text-[#7A5C18] underline decoration-refined-gold underline-offset-4">Preise von Obsidian</a> und{" "}
          <a href="https://blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook/" target="_blank" rel="noopener noreferrer" className="text-[#7A5C18] underline decoration-refined-gold underline-offset-4">
            Googles Ankündigung zu Gemini Notebook
          </a>
          , abgerufen am 12. November 2026.
        </p>
      </section>

      {/* EIN CTA */}
      <section className="mx-auto mt-24 w-full max-w-[1000px] px-6 md:px-12">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-refined-gold/40 bg-[#2E2B26] p-10 md:p-16">
            <div className="mb-4 flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-gold-light" aria-hidden />
              <span className="font-mono text-[13px] uppercase tracking-widest text-gold-light">Live-Kurs ab 27. November</span>
            </div>
            <h2 className="mb-6 font-instrument text-3xl text-white md:text-4xl">Dein Second Brain, gemeinsam eingerichtet.</h2>
            <p className="mb-8 max-w-[640px] font-satoshi text-lg leading-relaxed text-[#E9E4DA]">
              Im Kurs richten wir dein Second Brain zusammen ein, mit Obsidian, Gemini Notebook und Claude Code: zwei Live-Workshops und eine Fragestunde, höchstens sechs Plätze. Er startet am 27. November, zum letzten Mal in diesem Jahr.
            </p>
            <Link href="/akademie" className="inline-flex items-center justify-center rounded-full bg-gold-light px-8 py-4 font-satoshi text-[16px] font-semibold text-deep-charcoal transition-colors hover:bg-white">
              Zur Kursseite
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <BlogSpokes slugs={["claude-code-installieren", "claude-code-kosten", "webseiten-bau-mit-claude-anfaenger"]} />
    </main>
  );
}
