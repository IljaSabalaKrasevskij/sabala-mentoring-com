import Image from "next/image";
import { Check, CodeXml, Gift, Mail, Palette, PenLine, Sparkles, Wrench } from "lucide-react";
import { GOLD_AUF_HELL, HEBT, Knopf, Reveal, SektionsKopf, TiltCard, Weiter } from "@/components/akademie/shared";
import { RESSOURCEN, type Ressource } from "./ressourcen";

/* Ressourcen /ressourcen (bis 12.11.2026 „Shop“): kostenlose Leadmagnete. Vier kurze Abschnitte im Aussehen der
   Akademie-Seiten, jeder passt in ein Laptop-Fenster: Kopf · die Ressourcen · was es kostet · wie es weitergeht.
   Die Ressourcen stehen in ressourcen.ts. Jede Karte führt zum Formular auf der Seite der Ressource.
   Kein eigenes JavaScript: Der Kopf blendet per CSS ein (`.cs-rise`), Karten und Knöpfe kommen aus den gemeinsamen
   Bausteinen. Lesefarben deckend (Leser ab 50, keine blasse Schrift). */

const EIN = (delay: number) => ({ "--cs-d": `${delay}s` }) as React.CSSProperties;
const TEXT_HELL = "#57514A";
const TEXT_DUNKEL = "#E9E4DA";

const KOSTET = [
  { symbol: Gift, titel: "Kein Preis.", text: "Kein Abo, keine Kasse. Du trägst dich mit Name, Mail-Adresse und Telefonnummer ein und lädst es herunter." },
  { symbol: Mail, titel: "Post von mir.", text: "Mit deinem Häkchen schreibe ich dir, wenn es Neues gibt: KI-Updates, neue Kurse und Termine. Abmelden geht mit einem Klick." },
  { symbol: Wrench, titel: "Zum Anpassen.", text: "Vorlagen und Skills sind zum Verändern da. Mooni Voice ist Open Source, der ganze Code liegt offen bei GitHub." },
];

const WEITER = [
  { titel: "Mit den Ressourcen", text: "startest du allein, in deinem Tempo." },
  { titel: "In der KI-Akademie", text: "lernst du, wie alles zusammenspielt.", ziel: { text: "Zur KI-Akademie", href: "/akademie-hub" } },
  { titel: "Gemeinsam", text: "bauen wir es direkt in dein Unternehmen.", ziel: { text: "Mit dir entwickelt", href: "/mitentwickelt" } },
];

function Kopf() {
  return (
    <section className="relative overflow-hidden px-6 pb-[9vh] pt-[15vh]" style={{ background: "var(--tech-bg)" }}>
      <div aria-hidden className="absolute inset-0">
        <Image src="/akademie/ki-library-bg.jpg" alt="" fill priority sizes="100vw" className="object-cover" style={{ opacity: 0.32, objectPosition: "center 40%" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,8,6,0.93) 0%, rgba(10,8,6,0.78) 50%, rgba(10,8,6,0.97) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 60% at 50% 45%, rgba(184,150,62,0.18), transparent 70%)" }} />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="cs-rise font-mono text-[12.5px] uppercase leading-relaxed tracking-[0.24em] text-gold" style={EIN(0)}>
          Ressourcen · Kostenlos
        </p>
        <h1 className="cs-rise mt-5 text-balance font-serif text-cream" style={{ fontSize: "clamp(2.5rem, 5vw, 4.3rem)", lineHeight: 1.05, ...EIN(0.05) }}>
          Was ich selbst nutze. <span className="text-gold-light">Gratis für dich.</span>
        </h1>
        <p className="cs-rise mx-auto mt-6 max-w-2xl text-pretty text-[1.08rem] leading-relaxed min-[56.25rem]:text-[1.14rem]" style={{ color: TEXT_DUNKEL, ...EIN(0.12) }}>
          Startpaket, Werkzeuge und Vorlagen aus meiner täglichen Arbeit mit KI. Du trägst dich ein und lädst sie herunter.
        </p>
        <div className="cs-rise mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center" style={EIN(0.18)}>
          <Knopf href="#ressourcen">Zu den Ressourcen</Knopf>
          <Knopf zweit href="/case-studies">
            Was ich sonst noch baue
          </Knopf>
        </div>
      </div>
    </section>
  );
}

/* Was noch kommt: ruhige Fläche mit drei Symbolen statt Bild, keine Strichrahmen. Die Symbole stehen unter der Zone
   des Etiketts „Kommt bald“, damit sie sich bei flachem Fenster (Bild 120 px hoch) nicht überdecken. */
function Bald() {
  return (
    <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 80% at 50% 60%, rgba(184,150,62,0.2), transparent 75%)" }}>
      <div className="absolute inset-x-0 bottom-0 top-[52px] flex items-center justify-center gap-3">
        {[PenLine, Sparkles, Palette].map((Symbol, i) => (
          <span key={i} className="flex h-12 w-12 items-center justify-center rounded-full text-gold-light" style={{ background: "rgba(212,174,90,0.14)", border: "1px solid rgba(212,174,90,0.45)" }}>
            <Symbol size={22} strokeWidth={1.7} />
          </span>
        ))}
      </div>
    </div>
  );
}

/* Je Ressource eine Karte: oben das Bild, darunter Nutzen, Punkte und der Weg zum Formular. */
function Karte({ r }: { r: Ressource }) {
  return (
    <TiltCard hervor={1.015} max={3} radius={20} className="h-full shadow-[0_18px_44px_rgba(46,43,38,0.1)] hover:shadow-[0_34px_70px_rgba(46,43,38,0.22)]">
      <article className="flex h-full flex-col overflow-hidden rounded-[20px] bg-white" style={{ border: "1px solid rgba(184,150,62,0.32)" }}>
        <div className="relative shrink-0" style={{ height: "clamp(120px, calc(100svh - 540px), 200px)", background: "var(--tech-bg)" }}>
          {r.bild ? (
            <Image src={r.bild.src} alt={r.bild.alt} fill sizes="(min-width: 1024px) 360px, 92vw" className={r.bild.ganz ? "object-contain" : "object-cover"} style={{ objectPosition: "center 30%" }} />
          ) : (
            <Bald />
          )}
          <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[12.5px] uppercase tracking-[0.16em] text-tech-bg" style={{ background: "var(--gold-light)" }}>
            {r.kommt && <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: "#f5c542", boxShadow: "0 0 0 2px rgba(10,8,6,0.55)" }} />}
            {r.kommt ? "Kommt bald" : "Gratis"}
          </span>
          {r.code && (
            <a
              href={r.code}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Quellcode von ${r.name} bei GitHub`}
              title="Quellcode bei GitHub"
              className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-gold-light transition-colors hover:bg-gold hover:text-tech-bg"
              style={{ background: "rgba(10,8,6,0.72)", border: "1px solid rgba(212,174,90,0.6)" }}
            >
              <CodeXml aria-hidden size={20} strokeWidth={1.9} />
            </a>
          )}
        </div>

        <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
          <p className="font-mono text-[12.5px] uppercase tracking-[0.16em]" style={{ color: GOLD_AUF_HELL }}>
            {r.art}
          </p>
          <h3 className="mt-1.5 font-serif text-[1.75rem] leading-tight text-deep">{r.name}</h3>
          <p className="mt-2 text-[1rem] leading-relaxed" style={{ color: TEXT_HELL }}>
            {r.satz}
          </p>
          <ul className="mt-3 space-y-1.5">
            {r.punkte.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[1rem] leading-snug text-deep">
                <span className="mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-tech-bg">
                  <Check aria-hidden size={13} strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
          {/* Was noch kommt, bekommt nur einen leisen Textlink, alles andere den goldenen Knopf zum Formular. */}
          <div className="mt-auto pt-5">
            {r.kommt ? (
              <Weiter hell href={`${r.seite}#${r.formular}`}>
                {r.knopf}
              </Weiter>
            ) : (
              <Knopf href={`${r.seite}#${r.formular}`}>{r.knopf}</Knopf>
            )}
          </div>
        </div>
      </article>
    </TiltCard>
  );
}

function Ressourcen() {
  return (
    <section id="ressourcen" className="relative scroll-mt-4 overflow-hidden px-6 py-[5vh]" style={{ background: "var(--cream)" }}>
      <div className="pointer-events-none absolute left-1/2 top-0 h-[45vh] w-[80vw] -translate-x-1/2" style={{ background: "radial-gradient(ellipse at top, rgba(184,150,62,0.14), transparent 70%)" }} />

      <div className="relative mx-auto max-w-6xl">
        <SektionsKopf
          hell
          zeile="Die Ressourcen"
          titel={
            <>
              Was bekommst du <span style={{ color: GOLD_AUF_HELL }}>kostenlos?</span>
            </>
          }
        />

        <div className="mt-7 grid gap-6 lg:grid-cols-3">
          {RESSOURCEN.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.07} className="h-full">
              <Karte r={r} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Kostet() {
  return (
    <section className="relative overflow-hidden px-6 py-[7vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="pointer-events-none absolute left-1/2 top-[-10%] h-[70vh] w-[70vw] -translate-x-1/2" style={{ background: "radial-gradient(ellipse, rgba(212,174,90,0.11), transparent 70%)" }} />

      <div className="relative mx-auto max-w-6xl">
        <SektionsKopf
          zeile="Kostenlos heißt"
          titel={
            <>
              Was kostet dich das? <span className="text-gold-light">Deine Mail-Adresse.</span>
            </>
          }
        />

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {KOSTET.map(({ symbol: Symbol, titel, text }, i) => (
            <Reveal key={titel} delay={i * 0.07}>
              <TiltCard hervor={1.03} max={6} radius={16} glow="rgba(212,174,90,0.16)" className="group/karte h-full p-6 md:p-7" style={{ background: "linear-gradient(160deg, rgba(184,150,62,0.16) 0%, rgba(24,18,10,0.92) 62%)", border: "1px solid rgba(212,174,90,0.38)" }}>
                <div className="[transform-style:preserve-3d]">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-full text-gold-light ${HEBT}`} style={{ background: "rgba(212,174,90,0.14)", border: "1px solid rgba(212,174,90,0.4)" }}>
                    <Symbol aria-hidden size={22} strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-5 font-serif text-[1.55rem] leading-tight text-cream">{titel}</h3>
                  <p className="mt-2.5 text-[1rem] leading-relaxed" style={{ color: TEXT_DUNKEL }}>
                    {text}
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WieWeiter() {
  return (
    <section className="relative overflow-hidden px-6 py-[7vh]" style={{ background: "linear-gradient(180deg, var(--cream) 0%, #faf2dd 55%, var(--cream) 100%)" }}>
      <div className="relative mx-auto max-w-6xl">
        <SektionsKopf
          hell
          zeile="So geht es weiter"
          titel={
            <>
              Von der Vorlage <span style={{ color: GOLD_AUF_HELL }}>zum eigenen System.</span>
            </>
          }
        />

        <ol className="mt-8 grid gap-x-10 gap-y-7 md:grid-cols-3">
          {WEITER.map((s, i) => (
            <li key={s.titel}>
              <Reveal delay={i * 0.07} className="flex items-start gap-4">
                <span aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-serif text-[1.4rem] leading-none" style={{ background: "rgba(184,150,62,0.14)", border: "1px solid rgba(184,150,62,0.45)", color: GOLD_AUF_HELL }}>
                  {i + 1}
                </span>
                <div>
                  <p className="text-[1rem] leading-snug" style={{ color: TEXT_HELL }}>
                    <span className="block font-serif text-[1.4rem] leading-tight text-deep">{s.titel}</span>
                    <span className="mt-1 block">{s.text}</span>
                  </p>
                  {s.ziel && (
                    <Weiter hell href={s.ziel.href}>
                      {s.ziel.text}
                    </Weiter>
                  )}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-col items-start gap-x-6 gap-y-1 border-t pt-6 md:flex-row md:items-center md:justify-between" style={{ borderColor: "rgba(184,150,62,0.4)" }}>
          <p className="max-w-3xl text-pretty text-[1.04rem] leading-relaxed text-deep">Neugierig, was ich mir für meine eigene Arbeit gebaut habe? In den Case Studies zeige ich es.</p>
          <Weiter hell href="/case-studies">
            Zu den Case Studies
          </Weiter>
        </div>
      </div>
    </section>
  );
}

export default function RessourcenView() {
  return (
    <main className="flex-1">
      <Kopf />
      <Ressourcen />
      <Kostet />
      <WieWeiter />
    </main>
  );
}
