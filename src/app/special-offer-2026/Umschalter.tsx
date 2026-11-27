"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { Check, Compass } from "lucide-react";
import { GOLD_AUF_HELL, Knopf, Reveal, SektionsKopf, TEXT_AUF_DUNKEL, TEXT_AUF_HELL, Weiter } from "@/components/akademie/shared";
import { DESIGN_PAKET, FRAGESTUNDE, SKILLS, VORLAGEN, WERKZEUGE, WORKSHOPS } from "@/components/akademie/ablauf";
import { KURS_PREIS } from "@/components/akademie/cohorts";
import { KURS_PFAD, MITGABEN, RAHMEN, SCHICHTEN, WEBKURS_PREIS, WERKZEUGE as WEB_WERKZEUGE } from "@/components/webkurs/daten";
import { KASSE_SB, KASSE_WEB, PREIS_SB, PREIS_WEB, euro } from "./angebot";

/* Abschnitt 3 der Gutschein-Seite: zwei Reiter, darunter alles, was im gewählten Kurs drin ist, mit Preis und Kauf-Knopf.
   Die Inhalte lesen aus den Daten der beiden Kursseiten. Der gewählte Reiter steht in der Adresse (#second-brain,
   #webseiten-kurs): so öffnen die Knöpfe im Kopf direkt den richtigen Kurs, und der Reiter überlebt das Neuladen. */

type Kurs = "second-brain" | "webseiten-kurs";

function useKurs(): Kurs {
  const hash = useSyncExternalStore(
    (melden) => {
      addEventListener("hashchange", melden);
      return () => removeEventListener("hashchange", melden);
    },
    () => location.hash,
    () => "",
  );
  return hash === "#webseiten-kurs" ? "webseiten-kurs" : "second-brain";
}

function waehle(kurs: Kurs) {
  history.replaceState(null, "", `#${kurs}`);
  dispatchEvent(new HashChangeEvent("hashchange"));
}

const REITER: { id: Kurs; name: string; preis: number; statt: number }[] = [
  { id: "second-brain", name: "Second Brain mit Claude Code", preis: PREIS_SB, statt: KURS_PREIS },
  { id: "webseiten-kurs", name: "Webseiten bauen mit Claude Code", preis: PREIS_WEB, statt: WEBKURS_PREIS },
];

const LOGO: Partial<Record<(typeof WERKZEUGE)[number]["id"], string>> = {
  notebooklm: "/akademie/logos/notebooklm.svg",
  obsidian: "/akademie/logos/obsidian.svg",
  claude: "/akademie/logos/claude.svg",
};

function Zwischentitel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-7 font-mono text-[12.5px] uppercase tracking-[0.18em]" style={{ color: GOLD_AUF_HELL }}>
      {children}
    </p>
  );
}

function Haken({ punkte }: { punkte: string[] }) {
  return (
    <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
      {punkte.map((p) => (
        <li key={p} className="flex items-start gap-2.5 text-[0.98rem] leading-snug text-deep">
          <span className="mt-[2px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-gold text-tech-bg">
            <Check aria-hidden size={12} strokeWidth={3} />
          </span>
          {p}
        </li>
      ))}
    </ul>
  );
}

function SecondBrain() {
  const ablauf: [string, string, string][] = [
    ["Workshop 1", WORKSHOPS[0].titel, `${WERKZEUGE.filter((w) => w.workshop === 1).map((w) => (w.id === "comet" ? `${w.name} ${w.zusatz}` : w.name)).join(", ").replace(/, ([^,]*)$/, " und $1")}.`],
    ["Workshop 2", WORKSHOPS[1].titel, "Claude Code, deine CLAUDE.md, die Verbindung zu deinem Wissen und fünf Skills."],
    ["Fragestunde", FRAGESTUNDE.titel, FRAGESTUNDE.text],
  ];
  return (
    <>
      <h3 className="font-serif text-[clamp(1.8rem,3vw,2.3rem)] leading-tight text-deep">Second Brain mit Claude Code</h3>
      <p className="mt-2 max-w-2xl text-[1.04rem] leading-relaxed" style={{ color: TEXT_AUF_HELL }}>
        Dein eigenes KI-System, das sich alles merkt. Wir richten es zusammen ein, live per Zoom.
      </p>

      <Zwischentitel>So läuft der Kurs</Zwischentitel>
      <ol className="mt-3 grid gap-3 md:grid-cols-3">
        {ablauf.map(([wann, titel, text]) => (
          <li key={wann} className="rounded-xl bg-white/80 p-4" style={{ border: "1px solid rgba(184,150,62,0.3)" }}>
            <p className="font-mono text-[12.5px] uppercase tracking-[0.16em]" style={{ color: GOLD_AUF_HELL }}>{wann}</p>
            <p className="mt-1 font-serif text-[1.25rem] leading-tight text-deep">{titel}</p>
            <p className="mt-1.5 text-[0.95rem] leading-snug" style={{ color: TEXT_AUF_HELL }}>{text}</p>
          </li>
        ))}
      </ol>

      <Zwischentitel>Deine Werkzeuge, fertig verbunden</Zwischentitel>
      <ul className="mt-3 flex flex-wrap gap-2.5">
        {WERKZEUGE.map((w) => (
          <li key={w.id} className="flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[0.95rem] text-deep" style={{ border: "1px solid rgba(184,150,62,0.35)" }}>
            {LOGO[w.id] ? <Image src={LOGO[w.id]!} alt="" width={18} height={18} /> : <Compass aria-hidden size={18} className="text-gold" />}
            {w.name} <span style={{ color: TEXT_AUF_HELL }}>· {w.rolle}</span>
          </li>
        ))}
      </ul>

      <Zwischentitel>Was du behältst</Zwischentitel>
      <Haken punkte={[`${SKILLS.length} Skills: ${SKILLS.map((s) => s.name).join(", ")}`, ...VORLAGEN.map((v) => v.name), ...DESIGN_PAKET.map((d) => d.name)]} />

      <p className="mt-7 border-l-2 border-gold pl-4 font-serif text-[1.35rem] leading-snug text-deep">
        Am Ende fragst du Claude, woran ihr gearbeitet habt. <span style={{ color: GOLD_AUF_HELL }}>Und er weiß es.</span>
      </p>
    </>
  );
}

function Webkurs() {
  return (
    <>
      <h3 className="font-serif text-[clamp(1.8rem,3vw,2.3rem)] leading-tight text-deep">Webseiten bauen mit Claude Code</h3>
      <p className="mt-2 max-w-2xl text-[1.04rem] leading-relaxed" style={{ color: TEXT_AUF_HELL }}>
        In sechs Wochen baust du deine eigene Webseite und stellst sie selbst online. Schicht für Schicht, live per Zoom.
      </p>

      <Zwischentitel>Sechs Wochen, sechs Schichten</Zwischentitel>
      <ol className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SCHICHTEN.map((s, i) => (
          <li key={s.name} className="rounded-xl bg-white/80 p-4" style={{ border: "1px solid rgba(184,150,62,0.3)" }}>
            <p className="font-mono text-[12.5px] uppercase tracking-[0.16em]" style={{ color: GOLD_AUF_HELL }}>Woche {i + 1}</p>
            <p className="mt-1 font-serif text-[1.25rem] leading-tight text-deep">{s.name}</p>
            <p className="mt-1.5 text-[0.95rem] leading-snug" style={{ color: TEXT_AUF_HELL }}>{s.text}</p>
          </li>
        ))}
      </ol>

      <Zwischentitel>Der Rahmen</Zwischentitel>
      {/* ponytail: „Gruppe“ fehlt bewusst. Die Teilnehmerzahl nennt Ilja noch nicht (12.11.2026). */}
      <dl className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
        {RAHMEN.filter(([k]) => k !== "Gruppe").map(([k, v]) => (
          <div key={k} className="text-[0.98rem] leading-snug text-deep">
            <dt className="inline font-semibold">{k}: </dt>
            <dd className="inline" style={{ color: TEXT_AUF_HELL }}>{v}</dd>
          </div>
        ))}
      </dl>

      <Zwischentitel>Was du behältst</Zwischentitel>
      <Haken punkte={MITGABEN.map(([name, text]) => `${name}: ${text}`)} />

      <p className="mt-6 text-[0.95rem]" style={{ color: TEXT_AUF_HELL }}>
        Werkzeuge: {WEB_WERKZEUGE.map(([w]) => w).join(" · ")}
      </p>

      <p className="mt-7 border-l-2 border-gold pl-4 font-serif text-[1.35rem] leading-snug text-deep">
        Deine Webseite, live auf deiner Domain. <span style={{ color: GOLD_AUF_HELL }}>Code und Domain gehören dir.</span>
      </p>
    </>
  );
}

/* Rechte Spalte: Bild und Gutschein mit Preis, im Look der Gutschein-Karten (dunkel, gestrichelter Goldrand). */
function Gutschein({ kurs }: { kurs: Kurs }) {
  const sb = kurs === "second-brain";
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl" style={{ border: "1px solid rgba(184,150,62,0.4)" }}>
        <Image
          src={sb ? "/case-studies/second-brain.jpg" : "/akademie/webkurs/bibliothek/kopf-zwei-takt.webp"}
          alt={sb ? "Ein Second Brain als Sternkarte: Notizen, Skills und Erinnerungen rund um Claude" : "Der Kopf einer Webseite, gebaut mit Claude Code"}
          fill
          sizes="(max-width: 1024px) 92vw, 420px"
          className="object-cover object-top"
        />
      </div>
      {/* Deckender dunkler Grund: Auf dem hellen Kasten wurde ein durchscheinender Goldverlauf zu blass für die goldene Schrift. */}
      <div className="rounded-2xl p-6" style={{ background: "linear-gradient(150deg, #4a3a1a 0%, #1c150b 45%, #0f0b06 100%)", border: "2px dashed rgba(212,174,90,0.65)" }}>
        <p className="font-mono text-[12.5px] uppercase tracking-[0.18em] text-gold-light">Gutschein für 2027</p>
        <p className="mt-2 leading-none">
          <span className="font-serif text-gold-light" style={{ fontSize: "clamp(2.8rem, 5vw, 3.4rem)" }}>{euro(sb ? PREIS_SB : PREIS_WEB)}</span>
          <span className="ml-3 text-[1.05rem] text-cream">
            statt <span className="line-through decoration-[rgba(250,248,245,0.6)]">{euro(sb ? KURS_PREIS : WEBKURS_PREIS)}</span>
          </span>
        </p>
        <p className="mt-2 text-[0.9rem] leading-snug" style={{ color: TEXT_AUF_DUNKEL }}>
          netto zzgl. MwSt. · für Unternehmen und Selbständige
        </p>
        <p className="mt-3 text-[0.97rem] leading-snug text-cream">Der Code kommt direkt nach dem Kauf per Mail und gilt für jeden Termin 2027.</p>
        <div className="mt-5">
          <Knopf href={sb ? KASSE_SB : KASSE_WEB} neuerTab breit>
            Gutschein {sb ? "Second Brain" : "Webseiten-Kurs"} kaufen
          </Knopf>
        </div>
        <p className="mt-3 text-center">
          <Weiter href={sb ? "/akademie" : KURS_PFAD}>Kursseite ansehen</Weiter>
        </p>
      </div>
    </div>
  );
}

export default function Umschalter() {
  const kurs = useKurs();
  return (
    <section id="kurse" className="relative overflow-hidden px-6 py-[6.5vh]" style={{ background: "var(--cream)" }}>
      <span id="second-brain" className="absolute top-0 block scroll-mt-2" aria-hidden />
      <span id="webseiten-kurs" className="absolute top-0 block scroll-mt-2" aria-hidden />
      <div className="relative mx-auto max-w-6xl">
        <SektionsKopf
          hell
          zeile="Zwei Gutscheine"
          titel={
            <>
              Such dir deinen Kurs aus. <span style={{ color: GOLD_AUF_HELL }}>Du zahlst die Hälfte.</span>
            </>
          }
        />

        <div role="tablist" aria-label="Kurs wählen" className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
          {REITER.map((r) => {
            const an = r.id === kurs;
            return (
              <button
                key={r.id}
                role="tab"
                id={`reiter-${r.id}`}
                aria-selected={an}
                aria-controls="kurs-inhalt"
                onClick={() => waehle(r.id)}
                className={`min-h-[64px] rounded-xl px-5 py-3 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${an ? "bg-tech-bg text-cream" : "bg-white text-deep hover:bg-[#f6efdd]"}`}
                style={{ border: an ? "2px solid var(--gold)" : "1px solid rgba(184,150,62,0.4)" }}
              >
                <span className="block font-serif text-[1.25rem] leading-tight">{r.name}</span>
                <span className={`mt-0.5 block text-[0.95rem] ${an ? "text-gold-light" : ""}`} style={an ? undefined : { color: GOLD_AUF_HELL }}>
                  {euro(r.preis)} statt {euro(r.statt)}
                </span>
              </button>
            );
          })}
        </div>

        <Reveal className="mt-8">
          <div
            id="kurs-inhalt"
            role="tabpanel"
            aria-labelledby={`reiter-${kurs}`}
            className="grid gap-8 rounded-2xl bg-[#fcfaf4] p-6 shadow-[0_24px_60px_rgba(46,43,38,0.12)] md:p-9 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]"
            style={{ border: "1px solid rgba(184,150,62,0.3)" }}
          >
            <div>{kurs === "second-brain" ? <SecondBrain /> : <Webkurs />}</div>
            <Gutschein kurs={kurs} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
