import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown, CalendarClock, Check, Mail, Percent } from "lucide-react";
import AboutIlja from "@/components/akademie/AboutIlja";
import BonusMaterial from "@/components/akademie/BonusMaterial";
import MemoryDemo from "@/components/akademie/MemoryDemo";
import Werkzeuge from "@/components/akademie/Werkzeuge";
import { FRAGESTUNDE, WORKSHOPS } from "@/components/akademie/ablauf";
import { KURS_PREIS } from "@/components/akademie/cohorts";
import { GOLD_AUF_HELL, Knopf, Reveal, SektionsKopf, TEXT_AUF_DUNKEL, TEXT_AUF_HELL, TiltCard } from "@/components/akademie/shared";
import { Mitgaben } from "@/components/webkurs/Abschnitte";
import Schichten from "@/components/webkurs/Schichten";
import { ANTWORT, RAHMEN, WEBKURS_PREIS } from "@/components/webkurs/daten";
import { KASSE_SB, KASSE_WEB, PREIS_SB, PREIS_WEB, euro } from "./angebot";
import { GutscheinBox, HeroGutscheine, Kaufleiste, MailVorschau, Zaehler } from "./Bewegung";
import "./special-offer.css";

/* Special Offer 2026 (Ilja, 27.11.2026): Angebotsseite für zwei Gutscheine, je ein Platz in einem Kurs 2027 zu 50 %.
   Ilja nach der ersten Fassung: „beide Angebote beschrieben, jeweils 50 %, jeweils mit einem Button … richtig High-End,
   Motion Graphics, wirklich alles rausholen“. Darum stehen beide Kurse vollständig untereinander, mit den bewegten
   Abschnitten der Kursseiten (Terminal, Werkzeug-Karten, Skill-Tafel, sechs Schichten, Code-Bibliothek).
   Hell und dunkel wechseln sich ab. ponytail: nicht im Index, nicht in Sitemap und llms.txt, kein JSON-LD. Die Seite lebt
   von der Rundmail und nur 2026; danach löschen oder per Umleitung auf /akademie-hub schicken. */

const SEITE = "/special-offer-2026";
const EIN = (delay: number) => ({ "--cs-d": `${delay}s` }) as React.CSSProperties;
const ERSPARNIS_BEIDE = KURS_PREIS - PREIS_SB + WEBKURS_PREIS - PREIS_WEB;

const ANGEBOTE = [
  {
    id: "second-brain",
    nr: 1,
    name: "Second Brain mit Claude Code",
    bild: "/newsletter/second-brain-banner.jpg",
    alt: "Dein Second Brain: die lokale Datenbasis, mit der Claude nie vergisst",
    satz: "Claude bekommt ein Gedächtnis: dein Wissen, deine Kunden und deine Projekte an einem Ort.",
    punkte: ["Zwei Live-Workshops und eine Fragestunde per Zoom", "Comet, Gemini Notebook, Obsidian und Claude Code, fertig verbunden", "Fünf Skills, Vorlagen und ein Design-Paket zum Behalten"],
    preis: PREIS_SB,
    statt: KURS_PREIS,
    kasse: KASSE_SB,
  },
  {
    id: "webseiten-kurs",
    nr: 2,
    name: "Webseiten bauen mit Claude Code",
    bild: "/special-offer/deine-webseite-banner.jpg",
    alt: "Deine Webseite: gebaut mit Claude Code, live auf deiner eigenen Domain",
    satz: "In sechs Wochen deine eigene Webseite, live auf deiner Domain. Code und Domain gehören dir.",
    punkte: ["Sechs Workshops, fünf Fragestunden und eine Einzelstunde", "Plan, Gestaltung, Texte, Bewegung, Technik, Google und KI", "Skill-Bibliothek und Code-Bibliothek zum Behalten"],
    preis: PREIS_WEB,
    statt: WEBKURS_PREIS,
    kasse: KASSE_WEB,
  },
] as const;

const LAUFBAND = ["Claude Code", "Obsidian", "Gemini Notebook", "Comet mit Perplexity", "CLAUDE.md", "MCP", "Closing-Routine", "Repo-Vetting", "Humanizer", "GitHub", "Vercel", "Eigene Domain", "Search Console", "SEO", "GEO", "Skill-Bibliothek", "Code-Bibliothek"];

const SCHRITTE: [string, string][] = [
  ["Heute", "Du kaufst deinen Gutschein über die sichere Kasse. Die Rechnung kommt sofort."],
  ["Direkt danach", "Dein Gutscheincode kommt automatisch per Mail."],
  ["2027", "Sobald die Termine stehen, wählst du deinen Termin und gibst den Code an der Kasse ein. Dein Platz ist bezahlt."],
];

const FRAGEN: [string, string][] = [
  ["Wann sind die Kurse 2027?", "Die Termine stehen noch nicht fest. Sobald sie da sind, bekommst du sie per Mail und wählst deinen Termin."],
  ["Wie bekomme ich meinen Gutscheincode?", "Automatisch: Direkt nach dem Kauf kommt eine Mail mit deinem Code und der Rechnung."],
  ["Kann ich mir den Termin aussuchen?", "Ja. Der Gutschein gilt für jeden Termin dieses Kurses in 2027."],
  ["Was ist, wenn 2027 kein Kurs stattfindet?", "Dann bekommst du dein Geld vollständig zurück."],
  ["Kann ich den Gutschein verschenken?", "Ja. Er gilt für eine Person deiner Wahl. Sag mir beim Einlösen einfach, wer kommt."],
  ["Kann ich beide Gutscheine kaufen?", `Ja. Dann sparst du zusammen ${euro(ERSPARNIS_BEIDE)}.`],
  ["Warum stehen die Preise netto da?", "Das Angebot richtet sich an Unternehmen und Selbständige. Die Mehrwertsteuer rechnet die Kasse dazu."],
];

const title = "Special Offer 2026: Kurs-Gutschein für 2027";
const description = `Zwei Angebote für 2027, je 50 % gespart: Second Brain mit Claude Code für ${euro(PREIS_SB)} statt ${euro(KURS_PREIS)}, der Webseiten-Kurs für ${euro(PREIS_WEB)} statt ${euro(WEBKURS_PREIS)}, netto.`;

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false },
  alternates: { canonical: SEITE },
  openGraph: { title, description, url: SEITE, type: "website", locale: "de_DE", siteName: "Sabala Studios", images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Sabala Academy · Special Offer 2026" }] },
};

function Kopf() {
  const fakten = [
    { symbol: Percent, text: "Je 50 % gespart, netto" },
    { symbol: Mail, text: "Dein Code kommt automatisch per Mail" },
    { symbol: CalendarClock, text: "Gilt für jeden Termin 2027" },
  ];
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--tech-bg)" }}>
      <div aria-hidden className="absolute inset-0">
        <Image src="/akademie/ki-library-bg.jpg" alt="" fill priority sizes="100vw" className="object-cover" style={{ opacity: 0.32, objectPosition: "center 42%" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,8,6,0.9) 0%, rgba(10,8,6,0.7) 45%, rgba(10,8,6,0.97) 100%)" }} />
        <div className="so-licht absolute -right-[10%] top-[5%] h-[90%] w-[60%]" style={{ background: "radial-gradient(closest-side, rgba(184,150,62,0.22), transparent)" }} />
      </div>

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 px-6 pb-16 pt-24 sm:px-[6vw] min-[56.25rem]:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] min-[56.25rem]:gap-10 min-[56.25rem]:pb-[8vh] min-[56.25rem]:pt-[max(10vh,5.6rem)]">
        <div>
          <p className="cs-rise font-mono text-[12.5px] uppercase leading-relaxed tracking-[0.2em] text-gold sm:tracking-[0.24em]" style={EIN(0)}>
            Special Offer 2026 · Sabala Academy
          </p>
          <h1 className="cs-rise mt-4 font-serif text-cream" style={{ fontSize: "clamp(2.6rem, 5vw, 4.6rem)", lineHeight: 1.02, ...EIN(0.05) }}>
            <span className="block">Zwei Kurse für 2027.</span>{" "}
            <span className="block text-gold-light">Heute zum halben Preis.</span>
          </h1>
          <p className="cs-rise mt-6 max-w-xl text-pretty text-[1.06rem] leading-relaxed min-[56.25rem]:text-[1.14rem]" style={{ color: "rgba(250,248,245,0.86)", ...EIN(0.12) }}>
            Sichere dir jetzt deinen Platz im Second-Brain-Kurs, im Webseiten-Kurs oder in beiden. Du zahlst heute die Hälfte, 2027 ist dein Platz bezahlt.
          </p>
          <div className="cs-rise mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={EIN(0.18)}>
            <Knopf href="#second-brain">Second Brain ansehen</Knopf>
            <Knopf zweit href="#webseiten-kurs">
              Webseiten-Kurs ansehen
            </Knopf>
          </div>
          <ul className="cs-rise mt-8 grid gap-2.5 sm:grid-cols-3 sm:gap-4" style={EIN(0.24)}>
            {fakten.map(({ symbol: Symbol, text }) => (
              <li key={text} className="flex items-start gap-2.5 text-[0.95rem] leading-snug" style={{ color: TEXT_AUF_DUNKEL }}>
                <Symbol aria-hidden size={18} className="mt-0.5 shrink-0 text-gold" />
                {text}
              </li>
            ))}
          </ul>
          <div className="cs-rise mt-8 flex items-center gap-3" style={EIN(0.3)}>
            <span className="relative h-11 w-11 overflow-hidden rounded-full" style={{ border: "1.5px solid rgba(212,174,90,0.7)" }}>
              <Image src="/akademie/ilja-trainer-2026.jpg" alt="Ilja Krasevskij" fill sizes="44px" className="object-cover object-top" />
            </span>
            <p className="text-[0.95rem] leading-snug" style={{ color: TEXT_AUF_DUNKEL }}>
              Mit <span className="text-cream">Ilja Krasevskij</span>
              <br />
              Trainer seit 19, live per Zoom
            </p>
          </div>
        </div>
        <div className="cs-rise" style={EIN(0.15)}>
          <HeroGutscheine />
        </div>
      </div>
    </section>
  );
}

/* Übersicht: beide Angebote nebeneinander, jedes mit Bild, Nutzen, Preis, Ersparnis und zwei Wegen. */
function Uebersicht() {
  return (
    <section className="relative overflow-hidden px-6 py-[7vh]" style={{ background: "linear-gradient(180deg, var(--cream) 0%, #faf2dd 70%, var(--cream) 100%)" }}>
      <div className="relative mx-auto max-w-6xl">
        <SektionsKopf
          hell
          zeile="Zwei Angebote, je 50 %"
          titel={
            <>
              Such dir deinen Kurs aus. <span style={{ color: GOLD_AUF_HELL }}>Oder nimm beide.</span>
            </>
          }
        />
        <div className="mt-10 grid items-stretch gap-7 md:grid-cols-2">
          {ANGEBOTE.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.1} className="h-full">
              <TiltCard hervor={1.015} max={3} radius={20} className="h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_30px_70px_rgba(46,43,38,0.14)]" style={{ border: "1px solid rgba(184,150,62,0.35)" }}>
                  <div className="relative aspect-[1200/375]">
                    <Image src={a.bild} alt={a.alt} fill sizes="(max-width: 768px) 92vw, 560px" className="object-cover" />
                    <span className="absolute right-4 top-4 rounded-full bg-gold px-3.5 py-1.5 font-mono text-[12.5px] font-bold tracking-[0.12em] text-tech-bg shadow-lg">−50&nbsp;%</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 md:p-8">
                    <p className="font-mono text-[12.5px] uppercase tracking-[0.2em]" style={{ color: GOLD_AUF_HELL }}>Angebot {a.nr}</p>
                    <h3 className="mt-2 font-serif text-[clamp(1.7rem,2.6vw,2.2rem)] leading-tight text-deep">{a.name}</h3>
                    <p className="mt-2 text-[1.02rem] leading-relaxed" style={{ color: TEXT_AUF_HELL }}>{a.satz}</p>
                    <ul className="mt-5 space-y-2.5">
                      {a.punkte.map((p) => (
                        <li key={p} className="flex items-start gap-3 text-[0.98rem] leading-snug text-deep">
                          <span className="mt-[2px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-tech-bg">
                            <Check aria-hidden size={13} strokeWidth={3} />
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-7">
                      <div className="flex flex-wrap items-end gap-x-4 gap-y-1">
                        <span className="font-serif leading-none text-deep" style={{ fontSize: "clamp(2.6rem, 4vw, 3.2rem)" }}>{euro(a.preis)}</span>
                        <span className="pb-1 text-[1.02rem]" style={{ color: TEXT_AUF_HELL }}>
                          statt <span className="line-through">{euro(a.statt)}</span>
                        </span>
                        <span className="ml-auto pb-1 font-semibold" style={{ color: GOLD_AUF_HELL }}>
                          Du sparst <Zaehler bis={a.statt - a.preis} art="euro" />
                        </span>
                      </div>
                      <p className="mt-1.5 text-[0.88rem]" style={{ color: TEXT_AUF_HELL }}>netto zzgl. MwSt. · für Unternehmen und Selbständige</p>
                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <Knopf zweit hell href={`#${a.id}`}>
                          Alles ansehen
                        </Knopf>
                        <Knopf href={a.kasse} neuerTab>
                          Gutschein kaufen
                        </Knopf>
                      </div>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 text-center">
          <p className="text-[1.05rem] text-deep">
            Beide zusammen: <span className="font-semibold">{euro(PREIS_SB + PREIS_WEB)}</span> statt {euro(KURS_PREIS + WEBKURS_PREIS)}.{" "}
            <span className="font-semibold" style={{ color: GOLD_AUF_HELL }}>
              Du sparst <Zaehler bis={ERSPARNIS_BEIDE} art="euro" />.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* Kopf eines Angebots (dunkel): große Nummer im Hintergrund, Versprechen, Kennzahlen, darunter die Bausteine. */
function AngebotKopf({ id, nr, zeile2, titel, gold, satz, zahlen, children }: { id: string; nr: number; zeile2: string; titel: string; gold: string; satz: string; zahlen: [number, string][]; children: React.ReactNode }) {
  return (
    <section id={id} className="relative scroll-mt-0 overflow-hidden px-6 py-[8vh]" style={{ background: "var(--tech-bg)" }}>
      <span aria-hidden className="pointer-events-none absolute -right-[2vw] -top-[6vh] select-none font-serif leading-none" style={{ fontSize: "clamp(14rem, 32vw, 30rem)", color: "transparent", WebkitTextStroke: "1.5px rgba(212,174,90,0.18)" }}>
        0{nr}
      </span>
      <div className="so-licht pointer-events-none absolute -left-[15%] top-[10%] h-[70%] w-[55%]" style={{ background: "radial-gradient(closest-side, rgba(184,150,62,0.16), transparent)" }} />
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-[12.5px] uppercase tracking-[0.24em] text-gold">
            Angebot {nr} · {zeile2}
          </p>
          <h2 className="mt-4 max-w-4xl font-serif text-cream" style={{ fontSize: "clamp(2.3rem, 4.6vw, 3.9rem)", lineHeight: 1.04 }}>
            {titel} <span className="text-gold-light">{gold}</span>
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-[1.08rem] leading-relaxed" style={{ color: TEXT_AUF_DUNKEL }}>
            {satz}
          </p>
        </Reveal>
        <div className="mt-9 grid grid-cols-2 gap-4 md:grid-cols-4">
          {zahlen.map(([zahl, wort], i) => (
            <Reveal key={wort} delay={i * 0.06} className="rounded-2xl px-5 py-4" style={{ background: "rgba(250,248,245,0.04)", border: "1px solid rgba(184,150,62,0.3)" }}>
              <p className="font-serif leading-none text-gold-light" style={{ fontSize: "clamp(2.4rem, 4vw, 3.2rem)" }}>
                <Zaehler bis={zahl} dauer={1.2} />
              </p>
              <p className="mt-1.5 text-[0.98rem] text-cream">{wort}</p>
            </Reveal>
          ))}
        </div>
        {children}
      </div>
    </section>
  );
}

function SecondBrainKopf() {
  const ablauf: [string, string, string][] = [
    ["Workshop 1", WORKSHOPS[0].titel, "Comet mit Perplexity, Gemini Notebook und Obsidian. Dein Wissen landet an einem Ort, auf deinem Rechner."],
    ["Workshop 2", WORKSHOPS[1].titel, "Claude Code, deine CLAUDE.md, die Verbindung zu deinem Wissen und fünf Skills. Ab jetzt weiß Claude, woran ihr arbeitet."],
    ["Fragestunde", FRAGESTUNDE.titel, FRAGESTUNDE.text],
  ];
  return (
    <AngebotKopf
      id="second-brain"
      nr={1}
      zeile2="50 % gespart"
      titel="Second Brain mit Claude Code."
      gold="Claude vergisst nie wieder."
      satz="In zwei Live-Workshops baust du dein eigenes KI-System. Danach kennt Claude dein Wissen, deine Kunden und deine Projekte. Alles liegt auf deinem Rechner und gehört dir."
      zahlen={[[2, "Live-Workshops"], [1, "Fragestunde"], [4, "Werkzeuge"], [5, "Skills"]]}
    >
      <ol className="mt-6 grid gap-4 md:grid-cols-3">
        {ablauf.map(([wann, titel, text], i) => (
          <li key={wann}>
            <Reveal delay={i * 0.08} className="h-full rounded-2xl p-6" style={{ background: "linear-gradient(160deg, rgba(184,150,62,0.14), rgba(250,248,245,0.03) 60%)", border: "1px solid rgba(184,150,62,0.35)" }}>
              <p className="font-mono text-[12.5px] uppercase tracking-[0.18em] text-gold">{wann}</p>
              <p className="mt-2 font-serif text-[1.55rem] leading-tight text-cream">{titel}</p>
              <p className="mt-2 text-[1rem] leading-relaxed" style={{ color: TEXT_AUF_DUNKEL }}>{text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </AngebotKopf>
  );
}

function WebkursKopf() {
  return (
    <AngebotKopf
      id="webseiten-kurs"
      nr={2}
      zeile2="50 % gespart"
      titel="Webseiten bauen mit Claude Code."
      gold="In sechs Wochen live."
      satz="Du baust deine eigene Webseite, Schicht für Schicht. Danach änderst du sie selbst, in Minuten, und verstehst, was dahinter passiert. Code und Domain gehören dir."
      zahlen={[[6, "Wochen"], [6, "Workshops"], [5, "Fragestunden"], [1, "Einzelstunde"]]}
    >
      {/* ponytail: „Gruppe“ fehlt bewusst. Die Teilnehmerzahl nennt Ilja noch nicht (12.11.2026). */}
      <dl className="mt-6 grid gap-4 md:grid-cols-2">
        {RAHMEN.filter(([k]) => k !== "Gruppe").map(([k, v], i) => (
          <Reveal key={k} delay={i * 0.06} className="flex gap-4 rounded-2xl p-5" style={{ background: "rgba(250,248,245,0.04)", border: "1px solid rgba(184,150,62,0.3)" }}>
            <dt className="w-28 shrink-0 font-mono text-[12.5px] uppercase tracking-[0.16em] text-gold">{k}</dt>
            <dd className="text-[1rem] leading-relaxed text-cream">{v}</dd>
          </Reveal>
        ))}
      </dl>
    </AngebotKopf>
  );
}

/* Abschluss eines Angebots: der Gutschein zum Kaufen, auf warmem Grund mit goldener Linie. */
function GutscheinAbschluss({ id }: { id: "second-brain" | "webseiten-kurs" }) {
  return (
    <section id={`gutschein-${id}`} className="relative overflow-hidden px-6 py-[8vh]" style={{ background: "linear-gradient(180deg, #faf2dd 0%, var(--cream) 100%)", borderTop: "1px solid rgba(184,150,62,0.45)" }}>
      <GutscheinBox id={id} />
    </section>
  );
}

/* Laufband: alle Werkzeuge und Skills aus beiden Kursen, ohne JavaScript. Steht still bei „Bewegung reduzieren“. */
function Laufband() {
  const reihe = [...LAUFBAND, ...LAUFBAND];
  return (
    <div className="so-laufband-rahmen relative overflow-hidden py-5" style={{ background: "var(--tech-bg)", borderTop: "1px solid rgba(184,150,62,0.3)", borderBottom: "1px solid rgba(184,150,62,0.3)" }} aria-label="Werkzeuge und Skills in den Kursen">
      <div className="so-laufband">
        {reihe.map((wort, i) => (
          <span key={`${wort}-${i}`} aria-hidden={i >= LAUFBAND.length} className="flex items-center gap-6 pr-6 font-serif text-[1.6rem] text-cream">
            {wort}
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold" />
          </span>
        ))}
      </div>
      <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-24" style={{ background: "linear-gradient(90deg, var(--tech-bg), transparent)" }} />
      <span aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-24" style={{ background: "linear-gradient(270deg, var(--tech-bg), transparent)" }} />
    </div>
  );
}

function Ablauf() {
  return (
    <section id="ablauf" className="relative scroll-mt-4 overflow-hidden px-6 py-[8vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="so-licht pointer-events-none absolute right-[-10%] top-[10%] h-[80%] w-[55%]" style={{ background: "radial-gradient(closest-side, rgba(184,150,62,0.16), transparent)" }} />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 min-[56.25rem]:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <div>
          <SektionsKopf
            links
            zeile="So funktioniert dein Gutschein"
            titel={
              <>
                Heute kaufen. <span className="text-gold-light">2027 lernen.</span>
              </>
            }
          />
          <ol className="relative mt-8 space-y-6 pl-14">
            <span aria-hidden className="absolute bottom-3 left-[19px] top-3 w-px" style={{ background: "linear-gradient(180deg, var(--gold), rgba(184,150,62,0.15))" }} />
            {SCHRITTE.map(([wann, was], i) => (
              <li key={wann} className="relative">
                <Reveal delay={i * 0.12}>
                  <span className="absolute -left-14 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-gold font-serif text-[1.3rem] text-tech-bg shadow-[0_0_30px_rgba(212,174,90,0.45)]">{i + 1}</span>
                  <p className="font-mono text-[12.5px] uppercase tracking-[0.18em] text-gold">{wann}</p>
                  <p className="mt-1.5 text-[1.06rem] leading-relaxed text-cream">{was}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
        <MailVorschau />
      </div>
    </section>
  );
}

function FragenSchluss() {
  return (
    <section className="relative overflow-hidden px-6 pb-[16vh] pt-[8vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="relative mx-auto max-w-3xl">
        <SektionsKopf zeile="Fragen" titel="Was du zum Gutschein wissen willst" />
        <div className="mt-8 space-y-3">
          {FRAGEN.map(([frage, antwort]) => (
            <details key={frage} className="group rounded-xl px-5 py-4" style={{ background: "rgba(250,248,245,0.04)", border: "1px solid rgba(184,150,62,0.3)" }}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[1.06rem] font-semibold text-cream marker:hidden">
                {frage}
                <span aria-hidden className="text-[1.4rem] leading-none text-gold transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-[1.02rem] leading-relaxed" style={{ color: TEXT_AUF_DUNKEL }}>
                {antwort}
              </p>
            </details>
          ))}
        </div>
      </div>

      <div className="relative mx-auto mt-[10vh] max-w-5xl text-center">
        <div className="so-licht pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-[90%] -translate-x-1/2 -translate-y-1/2" style={{ background: "radial-gradient(closest-side, rgba(212,174,90,0.2), transparent)" }} />
        <div className="relative">
          <SektionsKopf
            zeile="Special Offer 2026"
            titel={
              <>
                Nur 2026: <span className="text-gold-light">zwei Kurse zum halben Preis.</span>
              </>
            }
            text="Such dir einen Kurs aus oder nimm beide. Dein Code kommt direkt nach dem Kauf automatisch per Mail."
          />
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            {ANGEBOTE.map((a) => (
              <Knopf key={a.id} href={a.kasse} neuerTab>
                {a.nr === 1 ? "Second Brain" : "Webseiten-Kurs"} · {euro(a.preis)}
              </Knopf>
            ))}
          </div>
          <p className="mt-4 text-[0.9rem]" style={{ color: TEXT_AUF_DUNKEL }}>
            Preise netto zzgl. MwSt. · für Unternehmen und Selbständige
          </p>
          <a href="#second-brain" className="mt-8 inline-flex items-center gap-2 text-[0.98rem] text-gold-light underline-offset-4 hover:underline">
            Noch einmal alles ansehen <ArrowDown aria-hidden size={16} className="rotate-180" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default function SpecialOfferPage() {
  return (
    <main className="flex-1">
      <Kopf />
      <Uebersicht />
      <SecondBrainKopf />
      <MemoryDemo hell />
      <Werkzeuge />
      <BonusMaterial />
      <GutscheinAbschluss id="second-brain" />
      <WebkursKopf />
      <div className="wk">
        {/* Ohne den letzten Satz der Kursseite („Der Termin steht noch nicht fest, die Warteliste ist offen.“). */}
        <Schichten satz={ANTWORT.replace(/ Der Termin steht noch nicht fest.*$/, "")} />
      </div>
      <Laufband />
      <div className="wk">
        <Mitgaben />
      </div>
      <GutscheinAbschluss id="webseiten-kurs" />
      <Ablauf />
      <AboutIlja />
      <FragenSchluss />
      <Kaufleiste />
    </main>
  );
}
