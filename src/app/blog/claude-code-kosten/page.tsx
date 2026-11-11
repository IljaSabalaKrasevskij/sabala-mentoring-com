import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Sparkles, Wallet, Clock, Users, Bot } from "lucide-react";
import { CountUp } from "@/components/blog/CountUp";
import { BlogSpokes } from "@/components/blog/BlogSpokes";
import { dropCapClass, GoldDivider, PullQuote } from "@/components/blog/BlogProse";

const slug = "claude-code-kosten";
const site = "https://sabala-mentoring.com";
const url = `${site}/blog/${slug}`;
const datePublished = "2026-11-11";
const preisStand = "11. November 2026";

// ponytail: Platzhalter aus den Kosten-Artikeln, bis eigene Illustrationen freigegeben sind
const cover = {
  src: "/blog/baukasten-vs-eigene-webseite-kosten-2026/cover.jpg",
  alt: "Skizze: eine goldene Waage, links Münzen, rechts eine Krone, auf hellem Papier",
};
const zweitesBild = {
  src: "/blog/was-kostet-ki-webseite/cover.jpg",
  alt: "Skizze: ein aufgeschlagenes Rechnungsbuch mit Münzen und Füller auf einem dunklen Schreibtisch",
};

const title = "Was kostet Claude Code? Pro, Max, Team und API im Vergleich";
const description =
  "Was Claude Code wirklich kostet: alle Pläne von Pro bis Enterprise, was die Nutzungsgrenzen bedeuten, wann sich die API lohnt und wie du sparst.";

export const metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description: "Von 17 Dollar im Monat bis zur Abrechnung nach Verbrauch: welcher Plan zu welcher Arbeit passt.",
    type: "article",
    publishedTime: datePublished,
    url,
    images: [{ url: `${site}${cover.src}`, width: 1800, height: 972, alt: cover.alt }],
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

// Quelle: claude.com/pricing, abgerufen am 11.11.2026. Preise in USD pro Monat, ohne Steuer.
const plaene = [
  { name: "Free", gruppe: "allein", preis: "0 $", jahr: "", code: false, fuer: "Chatten und ausprobieren", detail: "Claude Code ist nicht enthalten." },
  { name: "Pro", gruppe: "allein", preis: "20 $", jahr: "17 $ im Monat bei Jahreszahlung", code: true, fuer: "Lernen und kleinere Projekte", detail: "Das Grundkontingent, an dem sich die anderen Pläne messen." },
  { name: "Max", gruppe: "allein", preis: "100 $", jahr: "", code: true, fuer: "Täglich mehrere Stunden bauen", detail: "Fünfmal so viel Nutzung wie Pro, pro fünf Stunden und pro Woche." },
  { name: "Ultra", gruppe: "allein", preis: "200 $", jahr: "", code: true, fuer: "Den ganzen Tag mit mehreren Sitzungen", detail: "Zehnmal so viel Nutzung wie Pro pro Woche." },
  { name: "Team Standard", gruppe: "team", preis: "25 $ pro Platz", jahr: "20 $ pro Platz bei Jahreszahlung", code: true, fuer: "Teams von 2 bis 150 Personen", detail: "Mehr Nutzung als Pro, Claude Code und Cowork sind dabei." },
  { name: "Team Premium", gruppe: "team", preis: "125 $ pro Platz", jahr: "100 $ pro Platz bei Jahreszahlung", code: true, fuer: "Für alle im Team, die viel bauen", detail: "Fünfmal so viel Nutzung wie ein Standard-Platz." },
  { name: "Enterprise", gruppe: "team", preis: "20 $ pro Platz", jahr: "bei Jahreszahlung, dazu die Nutzung nach API-Preisen", code: true, fuer: "Firmen ab 20 Plätzen", detail: "Der Verbrauch wird zusätzlich abgerechnet." },
];

const gruppen = [
  { id: "allein", titel: "Für dich allein" },
  { id: "team", titel: "Für Teams und Firmen" },
];

const zahlen = [
  { wert: 17, label: "im Monat für Pro", sub: "bei Jahreszahlung, sonst 20 $" },
  { wert: 100, label: "im Monat für Max", sub: "fünfmal so viel Nutzung wie Pro" },
  { wert: 200, label: "im Monat für Ultra", sub: "zehnmal so viel wie Pro pro Woche" },
  { wert: 13, label: "pro Arbeitstag über die API", sub: "Schnitt in Firmen laut Anthropic" },
];

// Quelle: platform.claude.com/docs/en/about-claude/pricing, abgerufen am 11.11.2026, USD pro Million Tokens.
const api = [
  { m: "Sonnet 5.5", ein: "2 $", aus: "10 $", wann: "die meisten Aufgaben" },
  { m: "Opus 5.5", ein: "4 $", aus: "20 $", wann: "schwierige und lange Aufgaben" },
  { m: "Haiku 5.5", ein: "0,10 $", aus: "0,50 $", wann: "kleine, schnelle Aufgaben (Preis bis 100.000 Tokens pro Anfrage)" },
];

const wahl = [
  { t: "Du willst Claude Code kennenlernen", d: "Nimm Pro. Für die ersten Wochen und ein Projekt nach dem anderen reicht das." },
  { t: "Du baust jeden Tag mehrere Stunden", d: "Nimm Max, spätestens wenn du bei Pro mehrmals pro Woche an die Grenze kommst." },
  { t: "Du arbeitest den ganzen Tag mit mehreren Sitzungen", d: "Nimm Ultra. Du bekommst zehnmal so viel Nutzung wie mit Pro pro Woche." },
  { t: "Ihr arbeitet zu zweit oder im Team", d: "Nimm Team Standard, für alle, die viel bauen, Team Premium. Jeder Platz hat sein eigenes Kontingent, die Abrechnung läuft zentral." },
  { t: "Ein Agent soll ohne dich arbeiten", d: "Nimm ein API-Konto. Du zahlst nur, was der Agent verbraucht, und setzt dir in der Console eine Obergrenze." },
];

const tipps = [
  { k: "/clear", d: "zwischen zwei Aufgaben. Ein langer Verlauf wird bei jeder Antwort mitgelesen und zählt mit." },
  { k: "/model", d: "für Sonnet statt Opus. Laut Anthropic schafft Sonnet die meisten Programmieraufgaben gut und kostet weniger." },
  { k: "/effort", d: "für einfache Aufgaben senken. Weniger Nachdenken heißt weniger Verbrauch." },
  { k: "CLAUDE.md", d: "kurz halten. Claude liest sie bei jedem Start." },
  { k: "/usage", d: "im Blick behalten. Der Befehl zeigt dir, wie viel du schon verbraucht hast." },
];

const faq = [
  {
    q: "Ist Claude Code kostenlos?",
    a: "Nein. Der kostenlose Claude-Plan enthält Claude Code nicht. Der günstigste Weg ist Pro für 20 US-Dollar im Monat, bei Jahreszahlung 17 Dollar im Monat. Alternativ zahlst du über ein API-Konto nach Verbrauch. Anthropic nennt alle Preise ohne Steuer, den Endbetrag siehst du an der Kasse.",
  },
  {
    q: "Was kostet Claude Code im Monat?",
    a: "Für eine Person zwischen 17 und 200 US-Dollar im Monat, je nach Plan: Pro, Max oder Ultra. Im Team kostet ein Platz zwischen 20 und 125 Dollar. Über die API zahlst du nach Verbrauch, Anthropic nennt aus Firmen im Schnitt 150 bis 250 Dollar pro Entwickler und Monat. Alle Preise verstehen sich ohne Steuer.",
  },
  {
    q: "Reicht Pro für Claude Code?",
    a: "Zum Lernen und für kleinere Projekte ja. Pro hat ein Fenster von fünf Stunden und eine Grenze pro Woche, beide geteilt mit dem Claude-Chat. Wer jeden Tag mehrere Stunden baut, stößt damit regelmäßig an die Grenze und wechselt zu Max oder Ultra. Hochstufen kannst du jederzeit.",
  },
  {
    q: "Was passiert, wenn mein Limit erreicht ist?",
    a: "Du hast vier Möglichkeiten: warten, bis sich das Fenster wieder öffnet, auf einen größeren Plan wechseln, Nutzungskredite dazukaufen oder Guthaben aus einem API-Konto nutzen. Wie viel du schon verbraucht hast, zeigt dir in Claude Code jederzeit der Befehl /usage.",
  },
  {
    q: "Lohnt sich Max oder Ultra?",
    a: "Wenn du Claude Code jeden Tag mehrere Stunden nutzt, ja. Max gibt dir fünfmal so viel Nutzung wie Pro, Ultra zehnmal so viel pro Woche. Zähl einfach mit, wie oft du bei Pro an die Grenze kommst. Passiert das mehrmals pro Woche, kostet dich die Wartezeit mehr als der Aufpreis.",
  },
  {
    q: "Kann ich Claude Code mit einem API-Schlüssel nutzen?",
    a: "Ja. Mit einem Konto in der Claude Console zahlst du pro Token, also für jedes Stück Text, das Claude liest oder schreibt. Sonnet 5.5 kostet 2 Dollar pro Million Eingabe-Tokens und 10 Dollar pro Million Ausgabe-Tokens. Das lohnt sich vor allem für Agenten, die ohne dich laufen, und wenn du nur selten arbeitest.",
  },
  {
    q: "Gibt es Preise in Euro?",
    a: "Anthropic nennt seine Preise in US-Dollar und ohne Steuer. Was du am Ende zahlst, inklusive der Steuer, die für dich gilt, zeigt dir die Kasse beim Abschluss. Schau dort vor dem Kauf auf den Endbetrag.",
  },
];

const articleSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Was kostet Claude Code? Alle Pläne mit echten Zahlen",
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
    { "@type": "ListItem", position: 3, name: "Was kostet Claude Code?", item: url },
  ],
});

const faqSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

// Lesbarkeit für Leser ab 50: dunkle Fließtext-Farbe, Links in dunklem Gold, keine halb durchsichtige Schrift.
const proseBlock =
  "prose prose-lg max-w-none font-satoshi leading-[1.8] text-[#57514A] prose-headings:font-instrument prose-headings:font-normal prose-headings:text-deep-charcoal prose-strong:text-deep-charcoal prose-a:text-[#7A5C18] prose-a:underline prose-a:decoration-refined-gold prose-a:underline-offset-4 hover:prose-a:text-deep-charcoal prose-h2:text-3xl md:prose-h2:text-[2.6rem] prose-h2:mt-4 prose-h2:mb-6 prose-h2:leading-[1.15] prose-p:mb-6 prose-li:mb-2 prose-code:before:content-none prose-code:after:content-none prose-code:rounded prose-code:bg-warm-light prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal prose-code:text-deep-charcoal";

export default function ClaudeCodeKostenPage() {
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
            <Link href="/blog" className="inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-widest text-[#E9E4DA] transition-colors hover:text-gold-light">
              <ArrowLeft className="h-4 w-4" /> Zurück zum Journal
            </Link>
            <Link href="/claude-code" className="font-mono text-[13px] uppercase tracking-widest text-gold-light underline decoration-gold-light underline-offset-4 transition-colors hover:text-white">
              Alles zu Claude Code
            </Link>
          </div>
          <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-[13px] uppercase tracking-widest">
            <span className="rounded-full border border-gold-light bg-[#2E2B26] px-3 py-1 text-gold-light">KI-Akademie · Kosten</span>
            <span className="text-[#E9E4DA]">November 2026</span>
            <span className="text-[#E9E4DA]">8 Min Lesezeit</span>
          </div>
          <h1 className="mb-6 max-w-[1100px] font-instrument text-[clamp(2.5rem,5vw,5rem)] leading-[1.05] text-white">
            Was kostet Claude Code? <span className="italic text-gold-light">Alle Pläne mit echten Zahlen.</span>
          </h1>
          <p className="max-w-[760px] font-satoshi text-lg leading-relaxed text-[#E9E4DA] md:text-xl">
            Von 17 Dollar im Monat bis zur Abrechnung nach Verbrauch: welcher Plan zu welcher Arbeit passt, was die Grenzen bedeuten und wo du sparst.
          </p>
        </div>
      </section>

      {/* DIE KURZE ANTWORT */}
      <section className="mx-auto w-full max-w-[860px] px-6 pt-16 sm:px-12 md:px-24">
        <div className="rounded-r-lg border-l-2 border-refined-gold bg-cream p-8 md:p-10">
          <p className="mb-5 font-mono text-[13px] uppercase tracking-widest text-[#7A5C18]">Die kurze Antwort vorab</p>
          <p className="font-satoshi text-lg leading-relaxed text-deep-charcoal">
            Claude Code steckt in jedem bezahlten Claude-Plan. <strong>Pro</strong> kostet 20 US-Dollar im Monat, bei Jahreszahlung 17, und reicht zum Lernen und für kleinere Projekte. Wer täglich viele Stunden baut, nimmt <strong>Max</strong> für 100 oder <strong>Ultra</strong> für 200 Dollar. Über die API zahlst du nach Verbrauch, in Firmen laut Anthropic im Schnitt rund 13 Dollar pro Arbeitstag.
          </p>
        </div>
      </section>

      {/* PLAENE */}
      <section className="mx-auto w-full max-w-[1100px] px-6 pt-20 sm:px-12 md:px-24">
        <ScrollReveal>
          <div className={`${proseBlock} mx-auto max-w-[820px]`}>
            <h2>Welche Pläne enthalten Claude Code?</h2>
            <p className={dropCapClass}>
              Vor einem Jahr haben in Deutschland 40 Menschen im Monat nach dem Preis von Claude Code gesucht. Heute sind es 2.900, dazu kommen 8.100 Suchen auf Englisch. Die gute Nachricht: Die Antwort passt auf eine Seite. Hier sind alle Pläne mit den Zahlen von Anthropic, Stand {preisStand}.
            </p>
          </div>
        </ScrollReveal>
        {gruppen.map((g) => (
          <div key={g.id} className="mt-10">
            <h3 className="mb-4 font-instrument text-2xl text-deep-charcoal">{g.titel}</h3>
            <div className={`grid gap-4 sm:grid-cols-2 ${g.id === "team" ? "lg:grid-cols-3" : ""}`}>
          {plaene.filter((p) => p.gruppe === g.id).map((p, i) => (
            <ScrollReveal key={p.name} delay={i * 0.04} className={`h-full ${p.name === "Enterprise" ? "sm:col-span-2 lg:col-span-1" : ""}`}>
              <div className={`h-full rounded-2xl border p-6 ${p.code ? "border-refined-gold/40 bg-cream" : "border-[#D8D2C6] bg-white"}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <h3 className="font-instrument text-2xl text-deep-charcoal">{p.name}</h3>
                  <span className={`font-mono text-[13px] uppercase tracking-widest ${p.code ? "text-[#7A5C18]" : "text-[#57514A]"}`}>
                    {p.code ? "mit Claude Code" : "ohne Claude Code"}
                  </span>
                </div>
                <p className="mt-3 font-instrument text-3xl text-[#7A5C18]">{p.preis}</p>
                {p.jahr && <p className="font-satoshi text-[15px] leading-snug text-[#57514A]">{p.jahr}</p>}
                <p className="mt-3 font-satoshi text-[16px] leading-relaxed text-deep-charcoal">
                  <strong>{p.fuer}.</strong> {p.detail}
                </p>
              </div>
            </ScrollReveal>
          ))}
            </div>
          </div>
        ))}
        <p className="mx-auto mt-5 max-w-[820px] font-satoshi text-[15px] leading-relaxed text-[#57514A]">
          Preise in US-Dollar pro Monat und ohne Steuer, Stand {preisStand}. Quelle:{" "}
          <a href="https://claude.com/pricing" target="_blank" rel="noopener noreferrer" className="text-[#7A5C18] underline decoration-refined-gold underline-offset-4">
            claude.com/pricing
          </a>
          .
        </p>
      </section>

      {/* ZAHLEN */}
      <section className="mx-auto w-full max-w-[1100px] px-6 pt-16 sm:px-12 md:px-24">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {zahlen.map((z, i) => (
            <ScrollReveal key={z.label} delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-2xl border border-refined-gold/40 bg-[#2E2B26] p-6 md:p-7">
                <span className="mb-2 font-instrument text-4xl leading-none text-gold-light md:text-5xl">
                  <CountUp to={z.wert} suffix=" $" />
                </span>
                <span className="mb-1 font-satoshi text-[15px] font-semibold text-white">{z.label}</span>
                <span className="font-satoshi text-[15px] leading-snug text-[#E9E4DA]">{z.sub}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* GRENZEN */}
      <section className="mx-auto w-full max-w-[820px] px-6 pt-20 sm:px-12 md:px-24">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Was bedeuten die Nutzungsgrenzen?</h2>
            <p className={dropCapClass}>
              Bei Pro und Max gelten zwei Grenzen: ein Fenster von fünf Stunden und eine Grenze pro Woche. Beide teilst du dir mit dem normalen Claude-Chat. Was du morgens im Chat verbrauchst, fehlt dir am Nachmittag in Claude Code. Bei Ultra nennt Anthropic nur noch eine Wochengrenze, im Team hat jeder Platz sein eigenes Kontingent.
            </p>
            <p>Ist das Kontingent aufgebraucht, hast du vier Möglichkeiten:</p>
            <ul>
              <li>warten, bis sich das Fenster wieder öffnet,</li>
              <li>auf einen größeren Plan wechseln,</li>
              <li>Nutzungskredite dazukaufen, in Claude Code mit dem Befehl <code>/usage-credits</code>,</li>
              <li>Guthaben aus einem API-Konto in der Claude Console nutzen.</li>
            </ul>
            <p>
              Wie viel du schon verbraucht hast, zeigt dir jederzeit <code>/usage</code>. Die Einzelheiten stehen in der{" "}
              <a href="https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan" target="_blank" rel="noopener noreferrer">Hilfe von Anthropic zu Claude Code mit Pro und Max</a>.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <GoldDivider />

      {/* ABO ODER API */}
      <section className="mx-auto w-full max-w-[820px] px-6 sm:px-12 md:px-24">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Abo oder API: was rechnet sich für dich?</h2>
            <p>
              Statt eines Abos kannst du Claude Code auch über ein API-Konto in der Claude Console nutzen. Dann zahlst du pro Token. Ein Token ist ein Stück Text, grob ein kurzes Wort oder ein Teil davon. Gezahlt wird für das, was Claude liest (Eingabe), und für das, was es schreibt (Ausgabe), jeweils pro Million Tokens:
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="mt-2 overflow-x-auto rounded-2xl border border-refined-gold/40">
            <table className="w-full min-w-[560px] border-collapse text-left font-satoshi text-[16px]">
              <thead className="bg-[#2E2B26] text-white">
                <tr>
                  <th className="px-5 py-4 font-semibold">Modell</th>
                  <th className="px-5 py-4 font-semibold">Eingabe</th>
                  <th className="px-5 py-4 font-semibold">Ausgabe</th>
                  <th className="px-5 py-4 font-semibold">Gut für</th>
                </tr>
              </thead>
              <tbody>
                {api.map((r) => (
                  <tr key={r.m} className="border-t border-refined-gold/30 bg-cream">
                    <td className="px-5 py-4 font-semibold text-deep-charcoal">{r.m}</td>
                    <td className="px-5 py-4 text-deep-charcoal">{r.ein}</td>
                    <td className="px-5 py-4 text-deep-charcoal">{r.aus}</td>
                    <td className="px-5 py-4 text-[#57514A]">{r.wann}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 font-satoshi text-[15px] leading-relaxed text-[#57514A]">
            US-Dollar pro Million Tokens, Stand {preisStand}. Quelle:{" "}
            <a href="https://platform.claude.com/docs/en/about-claude/pricing" target="_blank" rel="noopener noreferrer" className="text-[#7A5C18] underline decoration-refined-gold underline-offset-4">
              Preisliste der Claude-Plattform
            </a>
            .
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <div className={`${proseBlock} mt-8`}>
            <p>
              Was Claude schon gelesen hat, speichert es zwischen. Beim nächsten Lesen kostet das nur einen Bruchteil, bei Sonnet 5.5 zum Beispiel 0,10 $ statt 2 $ pro Million Tokens.
            </p>
            <p>
              Und was heißt das im Alltag? Anthropic nennt aus Firmen im Schnitt rund 13 Dollar pro Entwickler und aktivem Arbeitstag, im Monat 150 bis 250 Dollar. 90 Prozent bleiben unter 30 Dollar am Tag. Bei diesen Werten ist ein Pro-Abo schon nach zwei Arbeitstagen im Monat bezahlt. Die Zahlen stehen in der{" "}
              <a href="https://code.claude.com/docs/en/costs" target="_blank" rel="noopener noreferrer">Kostenseite der Claude-Code-Doku</a>.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <PullQuote>Für die tägliche Arbeit ist das Abo fast immer günstiger. Die API lohnt sich, wenn Claude ohne dich arbeitet.</PullQuote>

      <section className="mx-auto w-full max-w-[1100px] px-6 sm:px-12 md:px-24">
        <ScrollReveal>
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-refined-gold/30">
            <Image src={zweitesBild.src} alt={zweitesBild.alt} fill sizes="(min-width: 1100px) 1000px, 100vw" className="object-cover" />
          </div>
        </ScrollReveal>
      </section>

      {/* WELCHER PLAN */}
      <section className="mx-auto w-full max-w-[820px] px-6 pt-20 sm:px-12 md:px-24">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Welcher Plan passt zu dir?</h2>
            <p>Fünf typische Fälle, und was ich dir jeweils raten würde:</p>
          </div>
        </ScrollReveal>
        <ol className="mt-8 flex flex-col gap-4">
          {wahl.map((w, i) => (
            <li key={w.t}>
              <ScrollReveal delay={i * 0.04}>
                <div className="flex gap-5 rounded-r-2xl border-l-4 border-refined-gold bg-cream py-6 pl-6 pr-6 md:pl-8">
                  <span className="w-8 flex-shrink-0 font-instrument text-4xl leading-none text-[#7A5C18]">{i + 1}</span>
                  <div>
                    <h3 className="font-instrument text-2xl leading-snug text-deep-charcoal">{w.t}</h3>
                    <p className="mt-2 font-satoshi text-[17px] leading-relaxed text-[#57514A]">{w.d}</p>
                  </div>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </section>

      {/* WAS ICH NUTZE */}
      <section className="mx-auto w-full max-w-[820px] px-6 pt-20 sm:px-12 md:px-24">
        <ScrollReveal>
          <div className={proseBlock}>
            <h2>Was nutze ich selbst?</h2>
            <p>
              Ich arbeite jeden Tag mit Claude Code, oft mit mehreren Sitzungen gleichzeitig: an Webseiten, an meinem Mailprogramm, an meinem Second Brain. Dafür reicht Pro nicht, deshalb nutze ich einen der großen Pläne. Teilnehmern meiner Kurse rate ich trotzdem zu Pro für den Anfang. Hochstufen kannst du jederzeit, und nach ein paar Wochen weißt du, wie viel du wirklich brauchst.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* SPAREN */}
      <section className="mx-auto w-full max-w-[1100px] px-6 pt-20 sm:px-12 md:px-24">
        <ScrollReveal>
          <div className="rounded-[28px] border border-refined-gold/40 bg-deep-charcoal p-8 shadow-[0_30px_70px_rgba(184,150,62,0.12)] md:p-14">
            <div className="mb-6 flex items-center gap-3">
              <Wallet className="h-5 w-5 text-gold-light" aria-hidden />
              <span className="font-mono text-[13px] font-bold uppercase tracking-[0.22em] text-gold-light">Mehr aus deinem Plan holen</span>
            </div>
            <h2 className="mb-8 font-instrument text-3xl leading-tight text-white md:text-5xl">
              So sparst du <span className="italic text-gold-light">bei jedem Plan.</span>
            </h2>
            <ul className="flex flex-col gap-4">
              {tipps.map((t) => (
                <li key={t.k} className="flex flex-col gap-1 border-t border-[#4A453D] pt-4 sm:flex-row sm:gap-5">
                  <code className="w-32 flex-shrink-0 font-mono text-[16px] font-semibold text-gold-light">{t.k}</code>
                  <p className="font-satoshi text-[17px] leading-relaxed text-[#E9E4DA]">{t.d}</p>
                </li>
              ))}
            </ul>
            <p className="mt-8 border-t border-[#4A453D] pt-6 font-satoshi text-[17px] leading-relaxed text-[#E9E4DA]">
              Noch ein Hebel: Lass Claude weniger Code schreiben. Das kostenlose Plugin Ponytail spart im Praxistest rund 20 Prozent der Kosten.{" "}
              <Link href="/blog/claude-code-weniger-code-ponytail" className="text-gold-light underline decoration-gold-light underline-offset-4 hover:text-white">
                Wie das geht, steht hier.
              </Link>
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* KLEINE ORIENTIERUNG */}
      <section className="mx-auto w-full max-w-[1100px] px-6 pt-16 sm:px-12 md:px-24">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Clock, t: "Planbar", d: "Ein Abo kostet jeden Monat gleich viel. Gut, wenn du selbst täglich damit arbeitest." },
            { icon: Users, t: "Fürs Team", d: "Team-Plätze bündeln Abrechnung und Verwaltung, jeder hat sein eigenes Kontingent." },
            { icon: Bot, t: "Für Agenten", d: "Die API rechnet nach Verbrauch ab. Gut für Abläufe, die ohne dich laufen." },
          ].map((k, i) => (
            <ScrollReveal key={k.t} delay={i * 0.05}>
              <div className="h-full rounded-xl border border-refined-gold/40 bg-cream p-6">
                <k.icon className="mb-3 h-6 w-6 text-[#7A5C18]" aria-hidden />
                <h3 className="font-instrument text-xl text-deep-charcoal">{k.t}</h3>
                <p className="mt-2 font-satoshi text-[16px] leading-relaxed text-[#57514A]">{k.d}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-[900px] px-6 pt-24 sm:px-12 md:px-24">
        <ScrollReveal>
          <p className="mb-4 text-center font-mono text-[13px] uppercase tracking-widest text-[#7A5C18]">Häufige Fragen</p>
          <h2 className="mb-12 text-center font-instrument text-3xl leading-[1.1] text-deep-charcoal md:text-5xl">Was Leser zu den Kosten fragen.</h2>
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
              <span className="font-mono text-[13px] uppercase tracking-widest text-gold-light">Den richtigen Plan finden</span>
            </div>
            <h2 className="mb-6 font-instrument text-3xl text-white md:text-4xl">Welcher Plan passt zu deiner Arbeit?</h2>
            <p className="mb-8 max-w-[640px] font-satoshi text-lg leading-relaxed text-[#E9E4DA]">
              In der Beratungsstunde schauen wir auf deine Aufgaben und rechnen durch, welcher Plan sich für dich lohnt. Danach richten wir Claude Code gemeinsam bei dir ein. 60 Minuten per Video, mit Gutschein für den Second-Brain-Kurs.
            </p>
            <Link href="/beratung" className="inline-flex items-center justify-center rounded-full bg-gold-light px-8 py-4 font-satoshi text-[16px] font-semibold text-deep-charcoal transition-colors hover:bg-white">
              Zur Beratungsstunde
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <BlogSpokes slugs={["claude-code-installieren", "claude-code-weniger-code-ponytail", "webseiten-bau-mit-claude-anfaenger"]} />
    </main>
  );
}
