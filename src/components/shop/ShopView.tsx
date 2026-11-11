import Image from "next/image";
import { Check, Eye, Gift, Wrench } from "lucide-react";
import { GOLD_AUF_HELL, HEBT, Knopf, Reveal, SektionsKopf, TEXT_AUF_DUNKEL, TEXT_AUF_HELL, TiltCard, Weiter } from "@/components/akademie/shared";
import { WERKZEUGE } from "./werkzeuge";

/* Shop /shop: nur noch quelloffene, kostenlose Werkzeuge. Vier kurze Abschnitte im Aussehen der Akademie-Seiten,
   jeder passt in ein Laptop-Fenster: Kopf · die Werkzeuge · was Open Source für dich heißt · wie es weitergeht.
   Die Werkzeuge stehen in werkzeuge.ts. Die Seite braucht kein eigenes JavaScript: Der Kopf blendet per CSS ein
   (`.cs-rise`), Karten und Knöpfe kommen aus den gemeinsamen Bausteinen. */

const EIN = (delay: number) => ({ "--cs-d": `${delay}s` }) as React.CSSProperties;

const HEISST = [
  { symbol: Gift, titel: "Es kostet nichts.", text: "Kein Preis, kein Abo. Du lädst es herunter und nutzt es." },
  { symbol: Eye, titel: "Du siehst, was es tut.", text: "Der ganze Code liegt offen bei GitHub. Jeder kann nachlesen, was mit seinen Daten passiert." },
  { symbol: Wrench, titel: "Du darfst es anpassen.", text: "Die Lizenz erlaubt dir, das Werkzeug zu verändern und weiterzugeben. Verbesserungen sind willkommen." },
];

const WEITER = [
  { titel: "Im Shop", text: "holst du dir ein Werkzeug für deinen Einstieg." },
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
          Sabala AI Shop · Open Source
        </p>
        <h1 className="cs-rise mt-5 text-balance font-serif text-cream" style={{ fontSize: "clamp(2.5rem, 5vw, 4.3rem)", lineHeight: 1.05, ...EIN(0.05) }}>
          Werkzeuge aus meiner Arbeit. <span className="text-gold-light">Gratis für dich.</span>
        </h1>
        <p className="cs-rise mx-auto mt-6 max-w-2xl text-pretty text-[1.08rem] leading-relaxed min-[56.25rem]:text-[1.14rem]" style={{ color: "rgba(250,248,245,0.86)", ...EIN(0.12) }}>
          Was ich für meinen eigenen Alltag mit KI baue und freigebe, liegt hier. Quelloffen, kostenlos, zum Herunterladen.
        </p>
        <div className="cs-rise mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center" style={EIN(0.18)}>
          <Knopf href="#werkzeuge">Zu den Werkzeugen</Knopf>
          <Knopf zweit href="/case-studies">
            Was ich sonst noch baue
          </Knopf>
        </div>
      </div>
    </section>
  );
}

/* Je Werkzeug eine breite Karte: links das Bild, rechts Nutzen, Eckdaten und die zwei Wege (Seite, Quellcode). */
function Werkzeuge() {
  return (
    <section id="werkzeuge" className="relative scroll-mt-4 overflow-hidden px-6 py-[5vh]" style={{ background: "var(--cream)" }}>
      <div className="pointer-events-none absolute left-1/2 top-0 h-[45vh] w-[80vw] -translate-x-1/2" style={{ background: "radial-gradient(ellipse at top, rgba(184,150,62,0.14), transparent 70%)" }} />

      <div className="relative mx-auto max-w-6xl">
        <SektionsKopf
          hell
          zeile="Die Werkzeuge"
          titel={
            <>
              Den Anfang macht <span style={{ color: GOLD_AUF_HELL }}>{WERKZEUGE[0].name}.</span>
            </>
          }
          text="Ich stelle hier nach und nach mehr ein, damit mehr Menschen damit arbeiten können."
        />

        <div className="mt-8 space-y-6">
          {WERKZEUGE.map((w) => (
            <Reveal key={w.name}>
              <TiltCard hervor={1.015} max={3} radius={20} className="shadow-[0_18px_44px_rgba(46,43,38,0.1)] hover:shadow-[0_34px_70px_rgba(46,43,38,0.22)]">
                <article className="grid overflow-hidden rounded-[20px] bg-white min-[56.25rem]:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]" style={{ border: "1px solid rgba(184,150,62,0.32)" }}>
                  <div className="relative aspect-[16/10] min-[56.25rem]:aspect-auto" style={{ background: "var(--tech-bg)" }}>
                    <Image src={w.bild} alt={w.bildAlt} fill sizes="(max-width: 900px) 92vw, 490px" className="object-cover" />
                    <span className="absolute left-4 top-4 rounded-full px-3.5 py-1.5 font-mono text-[12.5px] uppercase tracking-[0.16em] text-tech-bg" style={{ background: "var(--gold-light)" }}>
                      Gratis
                    </span>
                  </div>

                  <div className="flex flex-col p-6 md:p-8">
                    <p className="font-mono text-[12.5px] uppercase tracking-[0.18em]" style={{ color: GOLD_AUF_HELL }}>
                      {w.art} · Open Source
                    </p>
                    <h3 className="mt-2 font-serif text-[2.1rem] leading-tight text-deep">{w.name}</h3>
                    <p className="mt-2 text-[1.06rem] leading-relaxed" style={{ color: TEXT_AUF_HELL }}>
                      {w.satz}
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {w.punkte.map((p) => (
                        <li key={p} className="flex items-start gap-3 text-[1rem] leading-snug text-deep">
                          <span className="mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-tech-bg">
                            <Check aria-hidden size={13} strokeWidth={3} />
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-[0.95rem] leading-snug" style={{ color: TEXT_AUF_HELL }}>
                      Braucht: {w.braucht}. Lizenz: {w.lizenz}.
                    </p>
                    <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
                      <Knopf href={w.seite}>{w.name} ansehen</Knopf>
                      <Knopf zweit hell neuerTab href={w.code}>
                        Code bei GitHub
                      </Knopf>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function OpenSource() {
  return (
    <section className="relative overflow-hidden px-6 py-[7vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="pointer-events-none absolute left-1/2 top-[-10%] h-[70vh] w-[70vw] -translate-x-1/2" style={{ background: "radial-gradient(ellipse, rgba(212,174,90,0.11), transparent 70%)" }} />

      <div className="relative mx-auto max-w-6xl">
        <SektionsKopf
          zeile="Open Source"
          titel={
            <>
              Was das für dich <span className="text-gold-light">heißt.</span>
            </>
          }
        />

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {HEISST.map(({ symbol: Symbol, titel, text }, i) => (
            <Reveal key={titel} delay={i * 0.07}>
              <TiltCard hervor={1.03} max={6} radius={16} glow="rgba(212,174,90,0.16)" className="group/karte h-full p-6 md:p-7" style={{ background: "linear-gradient(160deg, rgba(184,150,62,0.16) 0%, rgba(24,18,10,0.92) 62%)", border: "1px solid rgba(212,174,90,0.38)" }}>
                <div className="[transform-style:preserve-3d]">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-full text-gold-light ${HEBT}`} style={{ background: "rgba(212,174,90,0.14)", border: "1px solid rgba(212,174,90,0.4)" }}>
                    <Symbol aria-hidden size={22} strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-5 font-serif text-[1.55rem] leading-tight text-cream">{titel}</h3>
                  <p className="mt-2.5 text-[1rem] leading-relaxed" style={{ color: TEXT_AUF_DUNKEL }}>
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
              Vom Werkzeug <span style={{ color: GOLD_AUF_HELL }}>zum eigenen System.</span>
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
                  <p className="text-[1rem] leading-snug" style={{ color: TEXT_AUF_HELL }}>
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

export default function ShopView() {
  return (
    <main className="flex-1">
      <Kopf />
      <Werkzeuge />
      <OpenSource />
      <WieWeiter />
    </main>
  );
}
