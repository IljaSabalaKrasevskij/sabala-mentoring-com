import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Sparkles, Terminal, AppWindow, Globe, KeyRound, Laptop, FolderOpen } from "lucide-react";
import { BlogSpokes } from "@/components/blog/BlogSpokes";
import { dropCapClass, GoldDivider, PullQuote } from "@/components/blog/BlogProse";

const slug = "claude-code-installieren";
const site = "https://sabala-mentoring.com";
const url = `${site}/blog/${slug}`;
const datePublished = "2026-11-11";

const cover = {
  src: `/blog/${slug}/cover.jpg`,
  alt: "Skizze: eine Frau öffnet an einem Holzschreibtisch zum ersten Mal ihren Laptop, daneben eine Tasse und ein Zettel mit vier Kästchen zum Abhaken",
};
const ohneTerminal = {
  src: `/blog/${slug}/ohne-terminal.jpg`,
  alt: "Skizze: ein älterer Mann arbeitet lächelnd am Küchentisch mit einer einfachen App mit Ordnern auf dem Laptop, Morgenlicht und Pflanzen am Fenster",
};
const wegweiser = {
  src: `/blog/${slug}/wegweiser.jpg`,
  alt: "Skizze: ein kleiner Holzwegweiser mit leeren Pfeilen auf einem Schreibtisch, dahinter heftet jemand einen kurzen Zettel an eine Pinnwand",
};

const title = "Claude Code installieren: Anleitung für Mac und Windows";
const description =
  "Claude Code in zehn Minuten installieren: die Befehle für Mac und Windows, der Weg ohne Terminal, der erste Start und die häufigsten Fehler.";

export const metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description: "Ein Befehl, eine Anmeldung, ein Ordner. Dazu der Weg ohne Terminal und die Lösung für die häufigsten Fehler.",
    type: "article",
    publishedTime: datePublished,
    url,
    images: [{ url: `${site}${cover.src}`, width: 1280, height: 720, alt: cover.alt }],
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

type Schritt = { t: string; d: string; code?: string };

const macSchritte: Schritt[] = [
  { t: "Terminal öffnen", d: "Drück Cmd und Leertaste, tipp Terminal und drück Enter. Es öffnet sich ein Fenster, in das du Befehle schreibst." },
  { t: "Den Befehl einfügen", d: "Kopier die Zeile, füg sie ins Terminal ein und drück Enter. Der Installer legt Claude Code in deinem Benutzerordner ab.", code: "curl -fsSL https://claude.ai/install.sh | bash" },
  { t: "Prüfen, ob es geklappt hat", d: "Öffne ein neues Terminal-Fenster und frag die Version ab. Steht dort eine Nummer, ist alles da.", code: "claude --version" },
  { t: "Im Projektordner starten", d: "Wechsel mit cd in den Ordner, in dem Claude arbeiten soll, und starte Claude Code.", code: "cd ~/Documents/meine-webseite\nclaude" },
  { t: "Anmelden", d: "Beim ersten Start öffnet sich der Browser. Du meldest dich mit deinem Claude-Konto an, danach geht es im Terminal weiter." },
];

const winSchritte: Schritt[] = [
  { t: "PowerShell öffnen", d: "Drück die Windows-Taste, tipp PowerShell und öffne sie. Administratorrechte brauchst du nicht." },
  { t: "Den Befehl einfügen", d: "Kopier die Zeile, füg sie in PowerShell ein und drück Enter.", code: "irm https://claude.ai/install.ps1 | iex" },
  { t: "Git für Windows dazunehmen", d: "Claude Code läuft auch ohne. Mit Git für Windows kann es aber Befehle in der Bash ausführen, so wie auf dem Mac. Anthropic empfiehlt es." },
  { t: "Prüfen und starten", d: "Öffne ein neues PowerShell-Fenster, prüf die Version, wechsel in deinen Projektordner und tipp claude. Die Anmeldung läuft wie auf dem Mac über den Browser.", code: "claude --version\ncd $HOME\\Documents\\meine-webseite\nclaude" },
];

const fehler: Schritt[] = [
  {
    t: "command not found: claude",
    d: "Der Ordner mit Claude Code fehlt in deinem Pfad. Auf dem Mac trägt diese Zeile ihn ein, danach öffnest du ein neues Terminal. Auf Windows nimmst du den Ordner %USERPROFILE%\\.local\\bin in die Umgebungsvariable Path auf und öffnest PowerShell neu.",
    code: "echo 'export PATH=\"$HOME/.local/bin:$PATH\"' >> ~/.zshrc",
  },
  { t: "Eine Fehlermeldung mit < oder XmlDocument", d: "Statt des Installers kam eine Webseite zurück. Meist steckt ein Firmennetz, ein Proxy oder ein Filter dahinter. Probier es in einem anderen Netz oder frag deine IT." },
  { t: "Fehler 403 beim Herunterladen", d: "Das Netz blockiert den Download, oder du bist in einem Land, in dem Anthropic Claude nicht anbietet." },
  { t: "Windows verlangt Git für Windows oder PowerShell", d: "Installier Git für Windows oder starte die Installation aus PowerShell heraus." },
  { t: "Im Zweifel: claude doctor", d: "Der Befehl prüft deine Installation und deine Einstellungen und schlägt Lösungen vor. Er ändert dabei nichts.", code: "claude doctor" },
];

const voraussetzungen = [
  { icon: KeyRound, t: "Ein bezahltes Claude-Abo", d: "Pro, Max, Ultra, Team oder Enterprise. Der kostenlose Plan enthält Claude Code nicht. Alternativ geht ein API-Konto mit Abrechnung nach Verbrauch." },
  { icon: Laptop, t: "Einen passenden Rechner", d: "macOS 13 oder neuer, Windows 10 ab Version 1809, Ubuntu ab 20.04 oder Debian ab 10, dazu mindestens 4 GB Arbeitsspeicher." },
  { icon: Globe, t: "Internet und ein unterstütztes Land", d: "Claude Code arbeitet online. Deutschland, Österreich und die Schweiz gehören zu den Ländern, in denen Anthropic Claude anbietet." },
  { icon: FolderOpen, t: "Einen Ordner für dein Projekt", d: "Claude arbeitet immer in einem Ordner. Leg dir zum Beispiel einen für deine Webseite an, bevor du startest." },
];

const wege = [
  { icon: Terminal, t: "Im Terminal", d: "Ein Befehl, und Claude Code läuft auf Mac, Windows oder Linux. Der schnellste Weg und der mit den meisten Möglichkeiten." },
  { icon: AppWindow, t: "In der Desktop-App", d: "Die Claude-App für Mac und Windows hat einen eigenen Bereich für Code. Du wählst einen Ordner und schreibst los, ganz ohne Terminal." },
  { icon: Globe, t: "Im Browser", d: "Unter claude.ai/code läuft Claude Code in der Cloud. Dafür verbindest du ein Projekt, das auf GitHub liegt." },
];

const befehle = [
  { k: "/init", d: "Legt die CLAUDE.md für dein Projekt an, mit den wichtigsten Regeln." },
  { k: "/clear", d: "Startet eine neue Unterhaltung. Die alte holst du mit /resume zurück." },
  { k: "/compact", d: "Fasst einen langen Verlauf zusammen und schafft wieder Platz." },
  { k: "/model", d: "Wechselt das Modell, zum Beispiel zu Sonnet für einfache Aufgaben." },
  { k: "/usage", d: "Zeigt, wie viel von deinem Kontingent schon verbraucht ist." },
  { k: "Shift + Tab", d: "Stellt um, wie viel Claude ohne Rückfrage tun darf." },
];

const faq = [
  {
    q: "Kann ich Claude Code kostenlos nutzen?",
    a: "Nein. Der kostenlose Claude-Plan enthält Claude Code nicht. Am günstigsten ist Pro für 20 US-Dollar im Monat, bei Jahreszahlung 17 Dollar im Monat, jeweils ohne Steuer. Alternativ nutzt du ein API-Konto in der Claude Console und zahlst nach Verbrauch. Welcher Weg sich für dich rechnet, zeige ich im Artikel zu den Kosten von Claude Code.",
  },
  {
    q: "Brauche ich Programmierkenntnisse für die Installation?",
    a: "Nein. Du kopierst einen Befehl, fügst ihn ein und drückst Enter. Wer das Terminal gar nicht mag, nimmt die Claude-Desktop-App: Dort arbeitest du in einem normalen Fenster, und die Installation im Terminal fällt weg. Für die Arbeit danach hilft es, wenn du weißt, was Dateien und Ordner sind. Mehr Technik braucht es für den Anfang nicht.",
  },
  {
    q: "Läuft Claude Code auf meinem Rechner?",
    a: "Wenn du macOS 13 oder neuer hast, Windows 10 ab Version 1809 oder Windows 11, ja. Unter Linux laufen Ubuntu ab 20.04 und Debian ab 10. Anthropic nennt mindestens 4 GB Arbeitsspeicher und eine Internetverbindung. Ein besonders schneller Rechner ist nicht nötig, denn die eigentliche Rechenarbeit passiert auf den Servern von Anthropic.",
  },
  {
    q: "Brauche ich Node.js?",
    a: "Nur wenn du über npm installierst, dann Node.js ab Version 22. Der empfohlene Installer, Homebrew, WinGet und die Desktop-App kommen ohne Node.js aus. Wenn du unsicher bist, nimm einfach den Befehl aus dieser Anleitung, dann musst du dich um Node.js nicht kümmern.",
  },
  {
    q: "Gibt es Claude Code in Deutschland, Österreich und der Schweiz?",
    a: "Ja. Alle drei Länder stehen auf der Liste der Regionen, in denen Anthropic Claude anbietet, und damit auch Claude Code. Du brauchst ein Konto, ein bezahltes Abo und eine Internetverbindung. Die vollständige Liste steht in den Richtlinien zu den unterstützten Regionen bei Anthropic.",
  },
  {
    q: "Was ist der Unterschied zwischen Terminal und Desktop-App?",
    a: "Es ist dasselbe Claude Code mit demselben Abo. Im Terminal tippst du Befehle in ein Textfenster, in der Desktop-App arbeitest du im Bereich Code mit einer Ordnerauswahl und normalen Fenstern. Für den Einstieg ist die Desktop-App oft angenehmer. Das Terminal lohnt sich, sobald du Anleitungen aus dem Netz nachbaust oder eigene Werkzeuge anschließt.",
  },
  {
    q: "Wie deinstalliere ich Claude Code wieder?",
    a: "Bei der empfohlenen Installation löschst du zwei Dinge in deinem Benutzerordner: die Datei claude im Ordner .local/bin und den Ordner .local/share/claude. Hast du über Homebrew, WinGet oder npm installiert, entfernst du Claude Code mit dem passenden Befehl dieses Paketmanagers. Deine Projekte und deine CLAUDE.md-Dateien bleiben dabei erhalten.",
  },
];

const articleSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Claude Code installieren: Schritt für Schritt für Mac und Windows",
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
  name: "Claude Code auf dem Mac installieren",
  inLanguage: "de-DE",
  tool: [{ "@type": "HowToTool", name: "Terminal" }],
  step: macSchritte.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.t,
    text: s.code ? `${s.d} Befehl: ${s.code.replace("\n", " und dann ")}` : s.d,
  })),
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

const inlineCode = "rounded bg-warm-light px-1.5 py-0.5 font-mono text-[15px] text-deep-charcoal [overflow-wrap:anywhere]";

export default function ClaudeCodeInstallierenPage() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-pure-surface pb-32 selection:bg-refined-gold selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleSchemaJson.replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: howToSchemaJson.replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchemaJson.replace(/</g, "\\u003c") }} />

      <div className="w-full bg-[#2E2B26] pt-24 md:pt-32" />

      {/* HERO: ohne Einblenden, damit der größte Inhalt sofort steht */}
      <section className="relative flex min-h-[min(100vw,760px)] w-full flex-col justify-end overflow-hidden bg-[#1a1612] md:min-h-[min(calc(100vw*9/21),760px)]">
        <Image src={cover.src} alt={cover.alt} fill priority sizes="100vw" className="object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0a] via-[#1a1612]/85 to-[#1a1612]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0c0a]/90 via-[#1a1612]/50 to-transparent" />
        <div className="relative z-10 w-full max-w-[1400px] px-6 pb-16 pt-8 sm:px-12 md:px-24 md:pb-24">
          <div className="mb-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link href="/blog" className="inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-widest text-[#E9E4DA] transition-colors hover:text-gold-light">
              <ArrowLeft className="h-4 w-4" /> Zurück zum Journal
            </Link>
          </div>
          <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-[13px] uppercase tracking-widest">
            <span className="rounded-full border border-gold-light bg-[#2E2B26] px-3 py-1 text-gold-light">KI-Akademie · Anleitung</span>
            <span className="text-[#E9E4DA]">November 2026</span>
            <span className="text-[#E9E4DA]">8 Min Lesezeit</span>
          </div>
          <h1 className="mb-6 max-w-[1100px] font-instrument text-[clamp(2.5rem,5vw,5rem)] leading-[1.05] text-white">
            Claude Code installieren: <span className="italic text-gold-light">Schritt für Schritt, für Mac und Windows.</span>
          </h1>
          <p className="max-w-[760px] font-satoshi text-lg leading-relaxed text-[#E9E4DA] md:text-xl">
            Ein Befehl, eine Anmeldung, ein Ordner. Hier findest du die ganze Anleitung, die Abkürzung ohne Terminal und die Lösung für die Fehler, die fast jeder einmal sieht.
          </p>
        </div>
      </section>

      {/* DIE KURZE ANTWORT */}
      <section className="mx-auto w-full max-w-[860px] px-6 pt-16 sm:px-12 md:px-24">
        <div className="rounded-r-lg border-l-2 border-refined-gold bg-cream p-8 md:p-10">
          <p className="mb-5 font-mono text-[13px] uppercase tracking-widest text-[#7A5C18]">Die kurze Antwort vorab</p>
          <p className="font-satoshi text-lg leading-relaxed text-deep-charcoal">
            Auf dem Mac fügst du im Terminal <code className={inlineCode}>curl -fsSL https://claude.ai/install.sh | bash</code> ein, auf Windows in PowerShell <code className={inlineCode}>irm https://claude.ai/install.ps1 | iex</code>. Danach öffnest du deinen Projektordner, tippst <code className={inlineCode}>claude</code> und meldest dich im Browser an. Du brauchst ein bezahltes Claude-Abo, der kostenlose Plan enthält Claude Code nicht.
          </p>
        </div>
      </section>

      {/* VORAUSSETZUNGEN */}
      <section className="mx-auto w-full max-w-[1100px] px-6 pt-20 sm:px-12 md:px-24">
        <ScrollReveal>
          <div className={`${proseBlock} mx-auto max-w-[820px]`}>
            <h2>Was brauchst du, bevor du anfängst?</h2>
            <p className={dropCapClass}>
              Rund 6.600 Mal im Monat sucht jemand in Deutschland, wie man Claude Code installiert, fast dreimal so oft wie vor einem Jahr. Aus meinen Kursen weiß ich, was am Anfang am meisten bremst: das Terminal, das schwarze Fenster, in das man Befehle tippt. Darum zeige ich dir hier beide Wege, den mit einem Befehl im Terminal und den ohne Terminal über die Desktop-App.
            </p>
            <p>Vorher klären wir vier Dinge. Wenn die stehen, ist die eigentliche Installation eine Sache von Minuten.</p>
          </div>
        </ScrollReveal>
        <div className="mx-auto mt-8 grid max-w-[1000px] gap-4 sm:grid-cols-2">
          {voraussetzungen.map((v, i) => (
            <ScrollReveal key={v.t} delay={i * 0.05}>
              <div className="h-full rounded-xl border border-refined-gold/40 bg-cream p-6">
                <v.icon className="mb-3 h-6 w-6 text-[#7A5C18]" aria-hidden />
                <h3 className="font-instrument text-xl text-deep-charcoal">{v.t}</h3>
                <p className="mt-2 font-satoshi text-[16px] leading-relaxed text-[#57514A]">{v.d}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal>
          <div className={`${proseBlock} mx-auto mt-8 max-w-[820px]`}>
            <p>Welcher Plan zu deiner Arbeit passt, steht in meinem Artikel <Link href="/blog/claude-code-kosten">Was kostet Claude Code?</Link></p>
          </div>
        </ScrollReveal>
      </section>

      {/* OHNE TERMINAL */}
      <section className="mx-auto w-full max-w-[1100px] px-6 pt-16 sm:px-12 md:px-24">
        <ScrollReveal>
          <div className={`${proseBlock} mx-auto max-w-[820px]`}>
            <h2>Geht es auch ohne Terminal?</h2>
            <p>Ja. Claude Code gibt es auf drei Wegen, und alle drei nutzen dasselbe Werkzeug mit demselben Abo. Der Unterschied ist das Fenster, in dem du arbeitest.</p>
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
        <ScrollReveal>
          <div className={`${proseBlock} mx-auto mt-10 max-w-[820px]`}>
            <p>
              Für die Desktop-App lädst du die Claude-App für Mac oder Windows, meldest dich an und wechselst in den Bereich <strong>Code</strong>. Dort wählst du den Ordner, in dem Claude arbeiten soll, und beschreibst deine Aufgabe in normalen Sätzen. Node.js oder eine Installation im Terminal brauchst du dafür nicht. Die genaue Anleitung steht in der{" "}
              <a href="https://code.claude.com/docs/en/desktop-quickstart" target="_blank" rel="noopener noreferrer">offiziellen Kurzanleitung von Anthropic</a>.
            </p>
            <p>Ich arbeite selbst meist in der Desktop-App, weil ich dort mehrere Sitzungen nebeneinander sehe. Das Terminal lohnt sich trotzdem: Viele Anleitungen im Netz gehen davon aus, und für manche Werkzeuge ist es der direkte Weg.</p>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="relative mx-auto mt-10 aspect-[16/9] max-w-[1000px] overflow-hidden rounded-2xl border border-refined-gold/30">
            <Image src={ohneTerminal.src} alt={ohneTerminal.alt} fill sizes="(min-width: 1100px) 1000px, 100vw" className="object-cover" />
          </div>
        </ScrollReveal>
      </section>

      <PullQuote>Das schwarze Fenster ist die größte Hürde. Danach wird es leicht.</PullQuote>

      {/* MAC */}
      <section className="mx-auto w-full max-w-[820px] px-6 sm:px-12 md:px-24">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Wie installierst du Claude Code auf dem Mac?</h2>
            <p>Du brauchst macOS 13 oder neuer. Fünf Schritte, dann läuft Claude Code.</p>
          </div>
        </ScrollReveal>
        <Schritte items={macSchritte} />
      </section>

      {/* WINDOWS */}
      <section className="mx-auto w-full max-w-[820px] px-6 pt-20 sm:px-12 md:px-24">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Wie installierst du Claude Code auf Windows?</h2>
            <p>Du brauchst Windows 10 ab Version 1809 oder Windows 11. Auch hier reicht ein Befehl.</p>
          </div>
        </ScrollReveal>
        <Schritte items={winSchritte} />
        <ScrollReveal>
          <div className={`${proseBlock} mt-8`}>
            <p>Arbeitest du lieber in der klassischen Eingabeaufforderung (CMD), nimmst du diesen Befehl:</p>
          </div>
          <Codeblock code="curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd" />
        </ScrollReveal>
      </section>

      {/* ANDERE WEGE */}
      <section className="mx-auto w-full max-w-[1100px] px-6 pt-16 sm:px-12 md:px-24">
        <ScrollReveal>
          <div className="rounded-[28px] border border-refined-gold/40 bg-deep-charcoal p-8 shadow-[0_30px_70px_rgba(184,150,62,0.12)] md:p-14">
            <div className="mb-6 flex items-center gap-3">
              <Terminal className="h-5 w-5 text-gold-light" aria-hidden />
              <span className="font-mono text-[13px] font-bold uppercase tracking-[0.22em] text-gold-light">Für Fortgeschrittene</span>
            </div>
            <h2 className="mb-6 font-instrument text-3xl leading-tight text-white md:text-5xl">
              Andere Wege: <span className="italic text-gold-light">Homebrew, WinGet und npm.</span>
            </h2>
            <p className="max-w-[760px] font-satoshi text-[17px] leading-relaxed text-[#E9E4DA]">
              Wer schon mit einem Paketmanager arbeitet, kann Claude Code auch darüber holen. Diese Wege aktualisieren sich nicht von selbst, Updates holst du dir dann selbst.
            </p>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-refined-gold/40 bg-[#15120d] p-6 font-mono text-[15px] leading-relaxed md:p-8">
              <p className="text-[#BDB5A6]"># Mac mit Homebrew</p>
              <p className="mb-5 text-gold-light">brew install --cask claude-code</p>
              <p className="text-[#BDB5A6]"># Windows mit WinGet, Updates mit winget upgrade</p>
              <p className="mb-5 text-gold-light">winget install Anthropic.ClaudeCode</p>
              <p className="text-[#BDB5A6]"># npm, braucht Node.js 22 oder neuer, nie mit sudo</p>
              <p className="text-gold-light">npm install -g @anthropic-ai/claude-code</p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <GoldDivider />

      {/* ERSTER START */}
      <section className="mx-auto w-full max-w-[820px] px-6 sm:px-12 md:px-24">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Was passiert beim ersten Start?</h2>
            <p className={dropCapClass}>
              Beim ersten Start in einem Ordner fragt Claude Code, ob du diesem Ordner vertraust. Bestätige das nur für Ordner, die du kennst, denn Claude darf darin lesen und, mit deiner Erlaubnis, schreiben und Befehle ausführen.
            </p>
            <p>
              Danach tippst du <code>/init</code>. Claude sieht sich deinen Ordner an und schreibt eine <strong>CLAUDE.md</strong>: eine kurze Datei mit den wichtigsten Regeln für dein Projekt, zum Beispiel wie es gebaut und getestet wird. Claude liest sie bei jedem Start. Gibt es schon eine, macht <code>/init</code> nur Verbesserungsvorschläge.
            </p>
            <p>
              Mein Tipp aus dem Alltag: Halte sie kurz. Meine eigene CLAUDE.md beginnt mit dem Satz <em>Diese Datei ist ein Wegweiser, kein Lager.</em> Sie sagt Claude nur, wo es nachschauen soll, alles andere liegt in eigenen Dateien. Regeln, die für alle deine Projekte gelten, schreibst du in die Datei <code>~/.claude/CLAUDE.md</code> in deinem Benutzerordner.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="relative mx-auto mt-10 aspect-[16/9] max-w-[1000px] overflow-hidden rounded-2xl border border-refined-gold/30">
            <Image src={wegweiser.src} alt={wegweiser.alt} fill sizes="(min-width: 1100px) 1000px, 100vw" className="object-cover" />
          </div>
        </ScrollReveal>
      </section>

      {/* BEFEHLE */}
      <section className="mx-auto w-full max-w-[1100px] px-6 pt-20 sm:px-12 md:px-24">
        <ScrollReveal>
          <div className={`${proseBlock} mx-auto max-w-[820px]`}>
            <h2>Welche Befehle brauchst du in der ersten Woche?</h2>
            <p>Sechs Befehle reichen für den Anfang. Alle anderen zeigt dir <code>/help</code>.</p>
          </div>
        </ScrollReveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* FEHLER */}
      <section className="mx-auto w-full max-w-[820px] px-6 pt-20 sm:px-12 md:px-24">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Was tun, wenn etwas nicht klappt?</h2>
            <p>
              Das sind die häufigsten Meldungen bei der Installation, mit den Lösungen aus der{" "}
              <a href="https://code.claude.com/docs/en/troubleshoot-install" target="_blank" rel="noopener noreferrer">offiziellen Fehlerhilfe von Anthropic</a>.
            </p>
          </div>
        </ScrollReveal>
        <Schritte items={fehler} />
      </section>

      {/* UPDATES */}
      <section className="mx-auto w-full max-w-[820px] px-6 pt-20 sm:px-12 md:px-24">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Wie bleibt Claude Code aktuell?</h2>
            <p>
              Hast du mit dem Befehl von oben installiert, aktualisiert sich Claude Code im Hintergrund von selbst, die neue Version ist beim nächsten Start da. Willst du sofort aktualisieren, tippst du <code>claude update</code>. Bei Homebrew, WinGet und npm holst du Updates selbst.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-[900px] px-6 pt-24 sm:px-12 md:px-24">
        <ScrollReveal>
          <p className="mb-4 text-center font-mono text-[13px] uppercase tracking-widest text-[#7A5C18]">Häufige Fragen</p>
          <h2 className="mb-12 text-center font-instrument text-3xl leading-[1.1] text-deep-charcoal md:text-5xl">Was Leser vor der Installation fragen.</h2>
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
              <span className="font-mono text-[13px] uppercase tracking-widest text-gold-light">Gemeinsam einrichten</span>
            </div>
            <h2 className="mb-6 font-instrument text-3xl text-white md:text-4xl">Wir richten Claude Code zusammen ein.</h2>
            <p className="mb-8 max-w-[640px] font-satoshi text-lg leading-relaxed text-[#E9E4DA]">
              In der Beratungsstunde teilst du deinen Bildschirm, und wir gehen die Installation gemeinsam durch, bis Claude Code bei dir läuft. Danach weißt du, wie du es für deine eigene Arbeit einsetzt. 60 Minuten per Video, mit Gutschein für den Second-Brain-Kurs.
            </p>
            <Link href="/beratung" className="inline-flex items-center justify-center rounded-full bg-gold-light px-8 py-4 font-satoshi text-[16px] font-semibold text-deep-charcoal transition-colors hover:bg-white">
              Zur Beratungsstunde
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <BlogSpokes slugs={["claude-code-kosten", "webseiten-bau-mit-claude-anfaenger", "claude-code-weniger-code-ponytail"]} />
    </main>
  );
}
