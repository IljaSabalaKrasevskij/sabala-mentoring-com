import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ClipboardCheck, FileText, Folder, FolderArchive, Lightbulb, Palette, PenLine } from "lucide-react";
import AnmeldeForm from "@/components/akademie/AnmeldeForm";

/* ──────────────────────────────────────────────────────────────────────────
   Leadmagnet „Skill-Paket“ (12.11.2026, Iljas Wunsch: „ein skill paket … für menschliche texte, schönere design und so weiter“).
   Das Formular trägt die Quelle skill-paket. Nach dem Klick in der Bestätigungsmail führt dankeSeite() aus src/lib/quellen.ts
   auf /claude-code/skill-paket/danke, dort liegt der Download. Quellen des Pakets: skillpaket/skill-paket,
   gebaut mit `sh skillpaket/bauen.sh` nach public/downloads/skill-paket.zip.
   Die schlechten Beispielsätze stehen nur im Kasten mit dem Prüfskript (<pre>), damit Prüfungen der Seite sie nicht als Text werten.
   ────────────────────────────────────────────────────────────────────────── */

const site = "https://sabala-mentoring.com";
const url = `${site}/claude-code/skill-paket`;

const bild = {
  src: "/blog/webseiten-bau-mit-claude-anfaenger/cover.jpg",
  alt: "Skizze: aufgeschlagenes Notizbuch mit Entwürfen für eine Webseite, daneben ein Laptop und eine Tasse Kaffee auf dunklem Holz",
};

const title = "Skill-Paket für Claude: menschliche Texte, schöneres Design";
const description =
  "Vier Skills auf Deutsch, die ich selbst nutze: Texte ohne KI-Klang, einfache Erklärungen, hochwertiges Design und der Check vor dem Livegang. Kostenlos.";

export const metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    type: "website",
    url,
    images: [{ url: `${site}${bild.src}`, alt: bild.alt }],
  },
};

// Die echten Ordner im ZIP, in der Reihenfolge, in der sie dort stehen. Ändert sich das Paket, hier nachziehen.
const ordner: { name: string; tiefe: 0 | 1 | 2; ordner?: boolean }[] = [
  { name: "00 Start hier.md", tiefe: 0 },
  { name: "LIZENZ.md", tiefe: 0 },
  { name: "skills", tiefe: 0, ordner: true },
  { name: "menschlich-schreiben", tiefe: 1, ordner: true },
  { name: "einfach-erklaeren", tiefe: 1, ordner: true },
  { name: "schoen-gestalten", tiefe: 1, ordner: true },
  { name: "vor-dem-livegang", tiefe: 1, ordner: true },
  { name: "fuer-die-claude-app", tiefe: 0, ordner: true },
];

const skills = [
  { ordner: "menschlich-schreiben", icon: PenLine, t: "Texte ohne KI-Klang", d: "Konkret, im Fluss, ohne Gedankenstriche und Werbefloskeln. Mit Prüfskript und einer Vorlage für deine eigene Stimme." },
  { ordner: "einfach-erklaeren", icon: Lightbulb, t: "Einfach erklären", d: "Fachthemen so, dass jeder sie versteht und weiß, was er als Nächstes tut. Mit Bauplan für Erklärtexte und Anleitungen zum Nachklicken." },
  { ordner: "schoen-gestalten", icon: Palette, t: "Schöneres Design", d: "Seiten, Folien und PDFs, die hochwertig wirken und für alle lesbar sind, auch für Leser ab 50. Ohne den typischen Look aus dem KI-Baukasten." },
  { ordner: "vor-dem-livegang", icon: ClipboardCheck, t: "Vor dem Livegang prüfen", d: "Texte, Gestaltung, Handy, Google, Formulare und Impressum in einem Durchgang. Mit Prüfskript für jede Adresse und Bericht mit Ampel." },
];

const dazu = [
  { t: "00 Start hier", d: "Installation für Claude Code und die Claude-App, Schritt für Schritt." },
  { t: "fuer-die-claude-app", d: "Jeder Skill als eigene ZIP-Datei zum Hochladen auf claude.ai." },
  { t: "LIZENZ", d: "Woher die Skills kommen und was du damit machen darfst." },
];

const fuerWen = [
  "Du schreibst Texte mit KI und merkst, dass sie nach KI klingen.",
  "Du baust Seiten oder Folien mit Claude und willst, dass sie nach dir aussehen statt nach Vorlage.",
  "Du willst vor dem Veröffentlichen sicher sein, dass Texte, Handy-Ansicht und Impressum stimmen.",
];

const ablauf = [
  { n: "1", t: "Eintragen", d: "Name, Mail-Adresse und Telefonnummer." },
  { n: "2", t: "Mail bestätigen", d: "Ein Klick auf den Link in der Mail." },
  { n: "3", t: "Herunterladen", d: "Der Klick führt dich direkt zum Paket." },
];

const faq = [
  {
    q: "Was kostet das Skill-Paket?",
    a: "Nichts. Du trägst dich mit Name, Mail-Adresse und Telefonnummer ein, bestätigst die Mail und lädst das Paket herunter. Dazu bekommst du meinen Newsletter mit KI-Updates für dein Unternehmen. Abmelden geht jederzeit mit einem Klick.",
  },
  {
    q: "Was ist ein Skill?",
    a: "Eine Anleitung, die Claude liest, wenn sie gebraucht wird. Bittest du Claude um einen Newsletter, nimmt es den Skill fürs Schreiben von selbst. Jeder Skill ist eine einfache Textdatei, die du lesen und ändern kannst.",
  },
  {
    q: "Brauche ich dafür Claude Code?",
    a: "Nein. Die Skills laufen in Claude Code und in der Claude-App auf claude.ai, dort ab dem kostenlosen Plan. In der App lädst du jeden Skill als ZIP-Datei hoch, die Anleitung liegt im Paket. Am meisten holst du in Claude Code heraus, weil das Prüfskript dort auch Seiten auf deinem Rechner prüft.",
  },
  {
    q: "Kann ich die Skills an meine Sprache anpassen?",
    a: "Ja, dafür sind sie da. In der Datei meine-stimme.md trägst du deine Anrede, deine Lieblingswörter, deine eigenen Tabu-Wörter und einen Text ein, der nach dir klingt. Ab dann schreibt Claude in deiner Stimme, und das Prüfskript kennt deine Liste.",
  },
  {
    q: "Darf ich das Paket weitergeben?",
    a: "Nutzen darfst du es für dich, dein Team und deine Kundenprojekte, verändern so viel du willst. Wer es auch haben will, bekommt es kostenlos hier auf dieser Seite, dann hat jeder die neueste Fassung.",
  },
  {
    q: "Wer steckt hinter dem Skill-Paket?",
    a: "Ich bin Ilja Krasevskij. Ich führe mein Geschäft mit Claude Code und zeige Selbständigen und kleinen Teams in der KI-Akademie, wie das geht. In den vier Skills stehen die Regeln, nach denen ich selbst schreibe und baue.",
  },
];

const breadcrumbSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Start", item: site },
    { "@type": "ListItem", position: 2, name: "Claude Code", item: `${site}/claude-code` },
    { "@type": "ListItem", position: 3, name: "Skill-Paket", item: url },
  ],
});

const faqSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export default function SkillPaketSeite() {
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
              <span className="rounded-full border border-gold-light bg-[#2E2B26] px-3 py-1 text-gold-light">Kostenlos · Claude Code und Claude-App</span>
              <span className="text-[#E9E4DA]">Stand November 2026</span>
            </div>
            <h1 className="mb-6 font-instrument text-[clamp(2.5rem,5vw,4.6rem)] leading-[1.05] text-white">
              Menschliche Texte, schöneres Design. <span className="italic text-gold-light">Vier Skills für Claude.</span>
            </h1>
            <p className="mb-10 max-w-[640px] font-satoshi text-lg leading-relaxed text-[#E9E4DA] md:text-xl">
              Vier Skills, die ich selbst so nutze: Claude schreibt ohne KI-Klang, erklärt so, dass jeder es versteht, gestaltet Seiten, die hochwertig wirken, und prüft alles vor dem Veröffentlichen. Auf Deutsch und zum Anpassen an deine Stimme.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <a href="#anfordern" className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-light px-8 py-4 font-satoshi text-[16px] font-semibold text-deep-charcoal transition-colors hover:bg-white">
                Skill-Paket anfordern <ArrowRight className="h-4 w-4" aria-hidden />
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
              <span className="ml-3 truncate font-mono text-[15px] text-[#E9E4DA]">skill-paket</span>
            </div>
            <ul className="px-5 py-5 font-mono text-[15px] leading-[2.1] text-[#E9E4DA]">
              {ordner.map((o, i) => (
                <li key={i} className={`flex items-center gap-3 ${o.tiefe === 1 ? "pl-7" : o.tiefe === 2 ? "pl-14" : ""}`}>
                  {o.ordner ? <Folder className="h-[18px] w-[18px] flex-shrink-0 text-gold-light" aria-hidden /> : <FileText className="h-[18px] w-[18px] flex-shrink-0 text-gold-light" aria-hidden />}
                  <span className="truncate">{o.name}</span>
                </li>
              ))}
            </ul>
            <figcaption className="border-t border-[#3a332a] px-5 py-3 font-mono text-[15px] text-[#BDB5A6]">4 Skills · 2 Prüfskripte · 44 KB</figcaption>
          </figure>
        </div>
      </section>

      {/* DIE KURZE ANTWORT */}
      <section className="mx-auto w-full max-w-[860px] px-6 pt-16 sm:px-12 md:px-24">
        <div className="rounded-r-lg border-l-2 border-refined-gold bg-cream p-8 md:p-10">
          <p className="mb-5 font-mono text-[13px] uppercase tracking-widest text-[#7A5C18]">Die kurze Antwort vorab</p>
          <p className="font-satoshi text-lg leading-relaxed text-deep-charcoal">
            Das Skill-Paket ist ein kostenloser Ordner mit vier Skills für Claude auf Deutsch: menschlich schreiben, einfach erklären, schön gestalten und vor dem Livegang prüfen. Zwei kleine Prüfskripte finden Gedankenstriche, Werbefloskeln und Fehler auf deiner Seite. Es läuft in Claude Code und in der Claude-App, du bekommst es per Mail.
          </p>
        </div>
      </section>

      {/* VORHER UND NACHHER */}
      <section className="mx-auto w-full max-w-[1100px] px-6 pt-20 sm:px-12 md:px-24">
        <ScrollReveal>
          <p className="mb-4 font-mono text-[13px] uppercase tracking-widest text-[#7A5C18]">So arbeitet der Skill</p>
          <h2 className="mb-10 font-instrument text-3xl leading-[1.15] text-deep-charcoal md:text-[2.6rem]">Wie klingt ein Text danach?</h2>
        </ScrollReveal>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <ScrollReveal>
            <div className="h-full overflow-hidden rounded-2xl border border-refined-gold/40 bg-[#15120d]">
              <p className="border-b border-[#3a332a] px-5 py-3 font-mono text-[15px] text-[#E9E4DA]">Vorher: ein typischer KI-Satz, geprüft</p>
              <pre className="whitespace-pre-wrap break-words px-5 py-5 font-mono text-[15px] leading-relaxed text-[#E9E4DA]">
                <code>
                  <span className="text-[#BDB5A6]">$ cat text.md</span>
                  {"\nIn der heutigen schnelllebigen Zeit ist deine Webseite mehr als nur eine Visitenkarte – sie bringt dein Business auf das nächste Level!\n\n"}
                  <span className="text-[#BDB5A6]">$ python3 pruefen.py text.md</span>
                  {"\n"}
                  <span className="text-gold-light">
                    {"Zeile 1  FEHLER  Gedankenstrich „–“\nZeile 1  FEHLER  Wort aus der Liste „nächste Level“\nZeile 1  FEHLER  Wort aus der Liste „In der heutigen schnelllebigen Zeit“\nZeile 1  FEHLER  Wort aus der Liste „mehr als nur“\n4 Fehler, 0 Hinweise."}
                  </span>
                </code>
              </pre>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
            <div className="flex h-full flex-col justify-center rounded-2xl border border-refined-gold/40 bg-cream p-7 md:p-9">
              <p className="mb-4 font-mono text-[13px] uppercase tracking-widest text-[#7A5C18]">Nachher, mit dem Skill</p>
              <p className="font-instrument text-[1.9rem] leading-snug text-deep-charcoal">Deine Webseite hat drei Sekunden. In der Zeit muss klar sein, was du machst und für wen.</p>
              <p className="mt-5 flex items-center gap-3 font-satoshi text-[16px] text-[#57514A]">
                <Check className="h-5 w-5 flex-shrink-0 text-[#7A5C18]" aria-hidden /> Prüfskript: keine Funde.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* WAS DRIN STECKT */}
      <section id="inhalt" className="mx-auto w-full max-w-[1100px] scroll-mt-28 px-6 pt-20 sm:px-12 md:px-24">
        <ScrollReveal>
          <p className="mb-4 font-mono text-[13px] uppercase tracking-widest text-[#7A5C18]">Der Inhalt</p>
          <h2 className="mb-10 font-instrument text-3xl leading-[1.15] text-deep-charcoal md:text-[2.6rem]">Was steckt im Skill-Paket?</h2>
        </ScrollReveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {skills.map((s, i) => (
            <ScrollReveal key={s.ordner} delay={i * 0.05}>
              <div className="flex h-full flex-col rounded-2xl border border-refined-gold/40 bg-cream p-6 md:p-7">
                <s.icon className="mb-4 h-6 w-6 text-[#7A5C18]" aria-hidden />
                <p className="font-mono text-[15px] text-[#7A5C18]">{s.ordner}</p>
                <h3 className="mt-1 font-instrument text-2xl leading-snug text-deep-charcoal">{s.t}</h3>
                <p className="mt-2 font-satoshi text-[16px] leading-relaxed text-[#57514A]">{s.d}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-12 rounded-2xl border border-refined-gold/40 bg-[#2E2B26] p-7 md:p-10">
            <h3 className="mb-6 flex items-center gap-3 font-instrument text-2xl text-white md:text-3xl">
              <FolderArchive className="h-6 w-6 flex-shrink-0 text-gold-light" aria-hidden /> Dazu im Ordner
            </h3>
            <ul className="grid gap-x-10 gap-y-4 md:grid-cols-3">
              {dazu.map((d) => (
                <li key={d.t}>
                  <span className="block font-mono text-[15px] text-gold-light">{d.t}</span>
                  <span className="mt-1 block font-satoshi text-[16px] leading-relaxed text-[#E9E4DA]">{d.d}</span>
                </li>
              ))}
            </ul>
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
              <h2 className="mb-6 font-instrument text-3xl leading-[1.15] text-deep-charcoal md:text-[2.6rem]">Für wen ist das Skill-Paket?</h2>
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
            <h2 className="mb-5 font-instrument text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.1] text-white">Schick mir das Skill-Paket.</h2>
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
            <AnmeldeForm quelle="skill-paket" knopf="Skill-Paket anfordern" />
          </div>
        </div>
      </section>

      {/* FAQ: Die Frage ist die Tippfläche. Innenabstand plus gleich großer negativer Außenabstand macht sie am Handy 44 px hoch, ohne die Abstände zu ändern. */}
      <section className="mx-auto w-full max-w-[900px] px-6 pt-24 sm:px-12 md:px-24">
        <ScrollReveal>
          <p className="mb-4 text-center font-mono text-[13px] uppercase tracking-widest text-[#7A5C18]">Häufige Fragen</p>
          <h2 className="mb-12 text-center font-instrument text-3xl leading-[1.1] text-deep-charcoal md:text-5xl">Was Leser vor dem Download fragen.</h2>
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
        {/* py-3 an den Links im Satz: Tippfläche am Handy 44 px, die Zeile bleibt gleich hoch (Innenabstand zählt bei Text nicht zur Zeilenhöhe). */}
        <p className="mt-12 pb-24 text-center font-satoshi text-[16px] leading-relaxed text-[#57514A]">
          Noch mehr kostenlose Hilfen, darunter das{" "}
          <Link href="/claude-code/startpaket" className="py-3 font-semibold text-[#7A5C18] underline decoration-refined-gold underline-offset-4 hover:text-deep-charcoal">
            Claude-Code-Startpaket
          </Link>
          , findest du unter{" "}
          <Link href="/ressourcen" className="py-3 font-semibold text-[#7A5C18] underline decoration-refined-gold underline-offset-4 hover:text-deep-charcoal">
            Ressourcen
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
