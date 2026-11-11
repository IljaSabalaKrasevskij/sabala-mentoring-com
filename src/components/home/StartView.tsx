import Image from "next/image";
import CourseGrid from "@/components/akademie/CourseGrid";
import { Brackets, GOLD_AUF_HELL, Knopf, Reveal, SektionsKopf, TEXT_AUF_DUNKEL, TEXT_AUF_HELL, TiltCard, Weiter } from "@/components/akademie/shared";
import { WERKZEUGE } from "@/components/shop/werkzeuge";
import { CASE_STUDIES, CATEGORIES, type CategoryKey } from "@/lib/case-studies";
import Kontakt from "./Kontakt";

/* Startseite: Sabala Studios als Mischung aus drei Dingen (Iljas Vorgabe vom 11.11.2026):
   „How to“ (ich zeige dir, wie es geht), „Build for you“ (ich baue es für dich, samt Webseiten-Service)
   und Show Cases (was schon läuft). Sieben Abschnitte, im Wechsel dunkel und hell, jeder passt in ein Laptop-Fenster:
   Kopf · Show Cases · Selbst lernen · Bauen lassen · Freie Werkzeuge · Der Mensch · Kontakt.

   Die Seite erfindet keine eigenen Zahlen und Preise: Show Cases kommen aus case-studies.ts, Kurs und
   Beratungsstunde aus CourseGrid (cohorts.ts), das Werkzeug aus werkzeuge.ts.
   Der Kopf blendet per CSS ein (`.cs-rise`): sichtbar auch ohne JavaScript. */

const EIN = (delay: number) => ({ "--cs-d": `${delay}s` }) as React.CSSProperties;
const SCHATTEN = "shadow-[0_18px_44px_rgba(46,43,38,0.1)] hover:shadow-[0_34px_70px_rgba(46,43,38,0.22)]";

const fall = (id: string) => CASE_STUDIES.find((c) => c.id === id)!;

/* Drei echte Arbeiten als Stapel im Kopf. Mit der Maus kommt die Karte nach vorn und legt sich gerade hin. */
const STAPEL = [
  { fall: fall("social-media-cockpit"), art: "Eigenes Werkzeug", lage: "left-0 top-[6%] z-[1] w-[60%] -rotate-[7deg]" },
  { fall: fall("rfqtopo"), art: "Kundenwebseite", lage: "right-0 top-0 z-[2] w-[60%] rotate-[5deg]" },
  { fall: fall("stefan-pons"), art: "Kundenwebseite", lage: "bottom-0 left-[16%] z-[3] w-[66%] -rotate-[2deg]" },
];

/* Je Rubrik der Show Cases ein Bild, das für sie steht. Die Zahl dahinter zählt die Seite selbst. */
const RUBRIK_BILD: Record<CategoryKey, string> = {
  webseiten: "yuna-sports-nutrition",
  "agent-os": "sabala-mail",
  "lead-gen": "vega-lead-gen-os",
  weitere: "second-brain",
};

/* Die zwei Wege, bei denen Ilja baut. Überschrift und Satz stammen von der jeweiligen Seite. */
const BAUEN = [
  {
    art: "Webseiten-Service",
    titel: "Design, das verkauft. Und im Kopf bleibt.",
    text: "Premium-Webseiten aus eigenem Code: unter zwei Sekunden geladen, sichtbar bei Google und in KI-Antworten.",
    zusatz: "Der erste Schritt ist eine kostenlose Potenzial-Analyse.",
    bild: fall("cyber-sales").image!,
    bildAlt: "Beispiel einer gebauten Kundenwebseite",
    knopf: "Zum Webseiten-Service",
    href: "/webseiten",
  },
  {
    art: "Mit dir entwickelt",
    titel: "Wir bauen es gemeinsam zu Ende.",
    text: "Du hast ein Projekt angefangen und kommst nicht weiter. Wir bauen es gemeinsam fertig und richten KI so ein, dass sie in deinem Alltag trägt.",
    zusatz: "Für Projekte, Dashboards und Agenten.",
    bild: fall("operations-dashboard").image!,
    bildAlt: "Beispiel eines gebauten KI-Dashboards",
    knopf: "So läuft Co-Development",
    href: "/mitentwickelt",
  },
];

const DENKWEISE = [
  { name: "Critical Thinking", satz: "Ich hinterfrage zuerst, damit du am Ende nicht für falsche Annahmen bezahlst." },
  { name: "Creative Thinking", satz: "Ich suche den Weg, den noch keiner gegangen ist, statt eine Vorlage über dein Projekt zu legen." },
  { name: "Analyse", satz: "Ich schaue auf Substanz und Daten, nicht auf den schnellen Effekt." },
];

function Kopf() {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--tech-bg)" }}>
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 70% at 78% 45%, rgba(184,150,62,0.22), transparent 70%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 45% 50% at 8% 100%, rgba(184,150,62,0.1), transparent 70%)" }} />
      </div>

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 px-6 pb-14 pt-24 sm:px-[6vw] min-[56.25rem]:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] min-[56.25rem]:gap-10 min-[56.25rem]:pb-[8vh] min-[56.25rem]:pt-[max(11vh,5.4rem)]">
        <div>
          <p className="cs-rise text-balance font-mono text-[12.5px] uppercase leading-relaxed tracking-[0.18em] text-gold" style={EIN(0)}>
            Sabala Studios · High-End Creative Web Development
          </p>
          <h1 className="cs-rise mt-4 text-balance font-serif text-cream" style={{ fontSize: "clamp(2.5rem, 4.5vw, 4.1rem)", lineHeight: 1.06, ...EIN(0.05) }}>
            Ich zeige dir, wie es geht. <span className="text-gold-light">Oder ich baue es für dich.</span>
          </h1>
          <p className="cs-rise mt-6 max-w-xl text-pretty text-[1.08rem] leading-relaxed min-[56.25rem]:text-[1.14rem]" style={{ color: "rgba(250,248,245,0.86)", ...EIN(0.12) }}>
            Webseiten, KI-Systeme und Trainings mit Claude Code. Alles, was du hier siehst, ist gebaut und im Einsatz.
          </p>

          <div className="cs-rise mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={EIN(0.18)}>
            <Knopf href="#kurse">Selbst lernen</Knopf>
            <Knopf zweit href="#bauen">
              Bauen lassen
            </Knopf>
          </div>
          <p className="cs-rise mt-3" style={EIN(0.24)}>
            <Weiter href="#showcases">Erst ansehen: {CASE_STUDIES.length} Show Cases</Weiter>
          </p>
        </div>

        {/* Ohne Einblenden: Am Handy ist ein Bild des Stapels der größte Inhalt im ersten Bildschirm. Google misst, wann es zu sehen ist.
            Blendet der Stapel ein, ist er im allerersten Bild noch unsichtbar und zählt erst ein Bild später
            (am 11.11.2026 an der Live-Seite gemessen: im Mittel 2,5 statt 2,2 Sekunden). */}
        <div className="relative mx-auto aspect-[5/4] w-full max-w-[560px]">
          <span aria-hidden className="pointer-events-none absolute -inset-8 rounded-[2rem]" style={{ background: "radial-gradient(ellipse, rgba(184,150,62,0.2), transparent 70%)" }} />
          {STAPEL.map(({ fall: f, art, lage }) => (
            <a
              key={f.id}
              href="/case-studies"
              aria-label={`Show Case ansehen: ${f.title.de}`}
              className={`absolute block overflow-hidden rounded-xl transition-[rotate,scale,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light maus:hover:z-10 maus:hover:rotate-0 maus:hover:scale-[1.07] ${lage}`}
              style={{ border: "1.5px solid rgba(212,174,90,0.5)", boxShadow: "0 26px 60px rgba(0,0,0,0.6), 0 0 40px rgba(184,150,62,0.12)" }}
            >
              <span className="relative block aspect-[16/9]">
                {/* Alle drei laden früh: Am Handy ist eines davon der größte Inhalt im ersten Bildschirm. */}
                <Image src={f.image!} alt="" fill priority sizes="(max-width: 900px) 62vw, 370px" className="object-cover object-top" />
              </span>
              <span className="absolute bottom-2 left-2 rounded-full px-2.5 py-1 font-mono text-[12.5px] uppercase tracking-[0.12em] text-cream" style={{ background: "rgba(10,8,6,0.82)", border: "1px solid rgba(212,174,90,0.45)" }}>
                {art}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Show Cases: je Rubrik eine Karte mit Bild und Anzahl. Der Beweis steht direkt unter dem Kopf. */
function ShowCases() {
  return (
    <section id="showcases" className="relative scroll-mt-4 overflow-hidden px-6 py-[5.5vh]" style={{ background: "var(--cream)" }}>
      <div className="pointer-events-none absolute left-1/2 top-0 h-[45vh] w-[80vw] -translate-x-1/2" style={{ background: "radial-gradient(ellipse at top, rgba(184,150,62,0.14), transparent 70%)" }} />

      <div className="relative mx-auto max-w-6xl">
        <SektionsKopf
          hell
          zeile={`${CASE_STUDIES.length} Show Cases`}
          titel={
            <>
              Alles hier ist gebaut <span style={{ color: GOLD_AUF_HELL }}>und im Einsatz.</span>
            </>
          }
        />

        <div className="mt-7 grid grid-cols-2 gap-3 min-[56.25rem]:grid-cols-4 min-[56.25rem]:gap-5">
          {CATEGORIES.map((r, i) => {
            const bild = fall(RUBRIK_BILD[r.key]);
            const zahl = CASE_STUDIES.filter((c) => c.category === r.key).length;
            return (
              <Reveal key={r.key} delay={i * 0.06} className="h-full">
                <TiltCard hervor={1.03} max={6} radius={16} className={`h-full ${SCHATTEN}`}>
                  <a href="/case-studies" className="flex h-full flex-col overflow-hidden rounded-2xl bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold" style={{ border: "1px solid rgba(184,150,62,0.32)" }}>
                    <span className="relative block aspect-[16/10]" style={{ background: "var(--tech-bg)" }}>
                      <Image src={bild.image!} alt="" fill sizes="(max-width: 900px) 46vw, 270px" className="object-cover object-top" />
                    </span>
                    <span className="flex flex-1 flex-col p-4 min-[56.25rem]:p-5">
                      <span className="font-mono text-[12.5px] uppercase tracking-[0.16em]" style={{ color: GOLD_AUF_HELL }}>
                        {zahl} {zahl === 1 ? "Projekt" : "Projekte"}
                      </span>
                      <span className="mt-1.5 font-serif text-[1.3rem] leading-tight text-deep">{r.label.de}</span>
                      <span className="mt-1.5 hidden text-[0.95rem] leading-snug min-[56.25rem]:block" style={{ color: TEXT_AUF_HELL }}>
                        {r.line.de}
                      </span>
                    </span>
                  </a>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-4 text-center">
          <Weiter hell href="/case-studies">
            Alle Show Cases ansehen
          </Weiter>
        </p>
      </div>
    </section>
  );
}

/* Bauen lassen: der Webseiten-Service und das gemeinsame Fertigbauen, je mit einem Bild aus echter Arbeit. */
function Bauen() {
  return (
    <section id="bauen" className="relative scroll-mt-4 overflow-hidden px-6 py-[5.5vh]" style={{ background: "linear-gradient(180deg, var(--cream) 0%, #faf2dd 55%, var(--cream) 100%)" }}>
      <div className="relative mx-auto max-w-6xl">
        <SektionsKopf
          hell
          zeile="Bauen lassen"
          titel={
            <>
              Oder ich baue es <span style={{ color: GOLD_AUF_HELL }}>für dich.</span>
            </>
          }
        />

        <div className="mt-7 grid items-stretch gap-5 min-[56.25rem]:grid-cols-2">
          {BAUEN.map((b, i) => (
            <Reveal key={b.art} delay={i * 0.08} className="h-full">
              <TiltCard hervor={1.02} max={4} radius={16} className={`h-full ${SCHATTEN}`}>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white" style={{ border: "1px solid rgba(184,150,62,0.32)" }}>
                  <div className="relative h-[150px] shrink-0" style={{ background: "var(--tech-bg)" }}>
                    <Image src={b.bild} alt={b.bildAlt} fill sizes="(max-width: 900px) 92vw, 540px" className="object-cover object-top" />
                    <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,8,6,0) 45%, rgba(10,8,6,0.55) 100%)" }} />
                    <span className="absolute bottom-3 left-4 rounded-full px-3 py-1 font-mono text-[12.5px] uppercase tracking-[0.16em] text-tech-bg" style={{ background: "var(--gold-light)" }}>
                      {b.art}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5 md:p-6">
                    <h3 className="font-serif text-[1.65rem] leading-tight text-deep">{b.titel}</h3>
                    <p className="mt-2 text-[1.02rem] leading-relaxed" style={{ color: TEXT_AUF_HELL }}>
                      {b.text}
                    </p>
                    <p className="mt-1.5 text-[0.95rem] leading-snug text-deep">{b.zusatz}</p>
                    <div className="mt-auto pt-4">
                      <Knopf zweit={i > 0} hell={i > 0} href={b.href}>
                        {b.knopf}
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

/* Freie Werkzeuge: das erste quelloffene Werkzeug aus dem Shop, als kurzes Band. Die Angaben kommen aus werkzeuge.ts. */
function Werkzeug() {
  const w = WERKZEUGE[0];
  return (
    <section className="relative overflow-hidden px-6 py-[6.5vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="pointer-events-none absolute right-[-10vw] top-1/2 h-[70vh] w-[55vw] -translate-y-1/2" style={{ background: "radial-gradient(ellipse, rgba(184,150,62,0.14), transparent 70%)" }} />

      <div className="relative mx-auto grid max-w-6xl items-center gap-9 min-[56.25rem]:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] min-[56.25rem]:gap-14">
        <div>
          <SektionsKopf
            links
            zeile="Freie Werkzeuge"
            titel={
              <>
                Und manches <span className="text-gold-light">schenke ich dir.</span>
              </>
            }
          />
          <Reveal className="mt-5 max-w-xl">
            <p className="text-[1.08rem] leading-relaxed" style={{ color: TEXT_AUF_DUNKEL }}>
              <span className="font-semibold text-cream">{w.name}:</span> {w.satz}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {["Gratis", "Open Source", w.braucht].map((t) => (
                <li key={t} className="rounded-full px-3.5 py-1.5 text-[0.95rem] text-cream" style={{ border: "1px solid rgba(212,174,90,0.45)", background: "rgba(250,248,245,0.05)" }}>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col items-start gap-x-6 gap-y-2 sm:flex-row sm:items-center">
              <Knopf href={w.seite}>{w.name} ansehen</Knopf>
              <Weiter href="/shop">Alle Werkzeuge im Shop</Weiter>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <TiltCard hervor={1.03} max={6} radius={16}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl" style={{ border: "1.5px solid rgba(184,150,62,0.5)", boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(184,150,62,0.14)" }}>
              <Image src={w.bild} alt={w.bildAlt} fill sizes="(max-width: 900px) 92vw, 480px" className="object-cover" />
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}

function Mensch() {
  return (
    <section className="relative overflow-hidden px-6 py-[6vh]" style={{ background: "var(--cream)" }}>
      <div className="pointer-events-none absolute -left-[10%] top-[15%] h-[55vh] w-[55vw]" style={{ background: "radial-gradient(ellipse, rgba(184,150,62,0.16), transparent 70%)" }} />

      <div className="relative mx-auto grid max-w-6xl items-center gap-9 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] md:gap-14">
        {/* Die Breite hängt auch an der Fensterhöhe, damit der Abschnitt ins Laptop-Fenster passt. */}
        <Reveal className="relative mx-auto w-full" style={{ maxWidth: "min(330px, 52vh, 62vw)" }}>
          <span className="pointer-events-none absolute -inset-6 rounded-3xl" style={{ background: "radial-gradient(ellipse, rgba(184,150,62,0.2), transparent 70%)" }} />
          <TiltCard hervor={1.03} max={6} radius={16}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl" style={{ border: "1.5px solid rgba(184,150,62,0.45)", boxShadow: "0 30px 70px rgba(120,90,30,0.24), 0 8px 24px rgba(184,150,62,0.16)" }}>
              <Brackets color="rgba(184,150,62,0.7)" inset={14} size={16} />
              <Image src="/akademie/ilja-trainer-2026.jpg" alt="Ilja Krasevskij" fill sizes="(max-width: 768px) 62vw, 330px" className="object-cover object-center" />
            </div>
          </TiltCard>
        </Reveal>

        <div>
          <SektionsKopf links hell zeile="Der Mensch dahinter" titel="Ich bin Ilja." text="Bevor ich für dich baue, denke ich erst mit dir, weil die beste Technik nichts wert ist, wenn die Idee dahinter nicht stimmt." />
          <ul className="mt-5 space-y-3.5">
            {DENKWEISE.map((d, i) => (
              <li key={d.name}>
                <Reveal delay={i * 0.06} className="flex items-start gap-4">
                  <span aria-hidden className="mt-[0.7em] h-px w-8 shrink-0" style={{ background: "var(--gold)" }} />
                  <p className="text-[1rem] leading-snug" style={{ color: TEXT_AUF_HELL }}>
                    <span className="block font-mono text-[12.5px] uppercase tracking-[0.2em]" style={{ color: GOLD_AUF_HELL }}>
                      {d.name}
                    </span>
                    <span className="mt-1 block">{d.satz}</span>
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="mt-3">
            <Weiter hell href="/ueber-mich">
              Mehr über mich
            </Weiter>
          </p>
        </div>
      </div>
    </section>
  );
}

export default function StartView() {
  return (
    <main className="flex-1">
      <Kopf />
      <ShowCases />
      <CourseGrid startseite />
      <Bauen />
      <Werkzeug />
      <Mensch />
      <Kontakt />
    </main>
  );
}
