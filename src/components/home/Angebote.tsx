import Image from "next/image";
import { ArrowRight, Check, GraduationCap, Mic, Presentation } from "lucide-react";
import { Brackets, GOLD_AUF_HELL, Knopf, Reveal, SektionsKopf, TiltCard, Weiter } from "@/components/akademie/shared";
import { BERATUNG_PREIS, CURRENT_COHORT, KURS_PREIS, KURS_RATE, STATUS_COLOR, STATUS_LABEL, formatTagMonat, kursPunkte } from "@/components/akademie/cohorts";
import { articles } from "@/lib/blog-artikel";

/* Drei Abschnitte der Übersicht auf der Startseite (Iljas Wunsch vom 12.11.2026): der Second-Brain-Kurs,
   die KI-Schulung für Unternehmen und die neuesten Blogartikel. Webdesign-Kurs, Webseiten-Angebot und Show Cases
   kommen aus ihren eigenen Bausteinen. Zahlen, Termine und Preise stehen nur in cohorts.ts und blog-artikel.ts.
   Fließtext in deckenden Farben (Iljas Regel für Leser ab 50: kein Text unter voller Deckkraft). */

const LEISE_HELL = "#4d4842"; // Fließtext auf Creme, Kontrast 8,5 : 1
const LEISE_DUNKEL = "#d9d3c9"; // Fließtext auf Braun und Schwarz, Kontrast 9 : 1 und mehr

/* Second-Brain-Kurs: das buchbare Angebot der Akademie, mit dem Bild aus der Kurswelt. */
export function SecondBrain() {
  return (
    <section id="kurse" className="relative scroll-mt-4 overflow-hidden px-6 py-[7vh]" style={{ background: "var(--cream)" }}>
      <div aria-hidden className="pointer-events-none absolute -left-[12%] top-[8%] h-[60vh] w-[55vw]" style={{ background: "radial-gradient(ellipse, rgba(184,150,62,0.14), transparent 70%)" }} />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 min-[56.25rem]:grid-cols-2 min-[56.25rem]:gap-14">
        <Reveal className="order-2 min-[56.25rem]:order-1">
          <TiltCard hervor={1.02} max={5} radius={16}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl" style={{ border: "1.5px solid rgba(184,150,62,0.45)", boxShadow: "0 30px 70px rgba(120,90,30,0.22), 0 8px 24px rgba(184,150,62,0.14)" }}>
              <Image src="/akademie/ki-library-bg.jpg" alt="Bibliothek, in der ein leuchtendes Netz das Wissen verbindet" fill sizes="(max-width: 900px) 92vw, 540px" className="object-cover" />
              <Brackets color="rgba(212,174,90,0.75)" inset={14} size={16} />
              {CURRENT_COHORT && (
                <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[12.5px] uppercase tracking-[0.14em] text-cream" style={{ background: "rgba(10,8,6,0.85)", border: "1px solid rgba(212,174,90,0.45)" }}>
                  <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: STATUS_COLOR[CURRENT_COHORT.status] }} />
                  {STATUS_LABEL[CURRENT_COHORT.status]}
                </span>
              )}
            </div>
          </TiltCard>
        </Reveal>

        <div className="order-1 min-[56.25rem]:order-2">
          <SektionsKopf
            links
            hell
            zeile={CURRENT_COHORT ? `Live-Kurs · Start ${formatTagMonat(CURRENT_COHORT.start)}` : "Live-Kurs · Termin in Planung"}
            titel={
              <>
                Claude vergisst alles. <span className="block" style={{ color: GOLD_AUF_HELL }}>Dein Second Brain nicht.</span>
              </>
            }
            text={<span style={{ color: LEISE_HELL }}>Nach zwei Live-Workshops kennt Claude dein Wissen, deine Kunden und deine Projekte und fängt nie wieder bei null an.</span>}
          />
          <ul className="mt-5 space-y-2.5">
            {kursPunkte().map((p) => (
              <li key={p} className="flex items-start gap-3 text-[1rem] leading-snug" style={{ color: LEISE_HELL }}>
                <span className="mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-tech-bg">
                  <Check aria-hidden size={13} strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
            <p className="leading-none">
              <span className="font-serif text-[2.4rem] text-deep">{KURS_PREIS} €</span>
              <span className="ml-3 text-[0.95rem]" style={{ color: LEISE_HELL }}>
                oder 2 × {KURS_RATE} €, netto
              </span>
            </p>
            <Knopf href="/akademie">{CURRENT_COHORT ? "Zum Kurs" : "Zur Warteliste"}</Knopf>
          </div>
          <div className="mt-3 flex flex-wrap gap-x-7">
            <Weiter hell href="/beratung">
              Lieber erst reden? Beratungsstunde für {BERATUNG_PREIS}&nbsp;€
            </Weiter>
            <Weiter hell href="/akademie-hub">
              Alle Kurse der KI-Akademie
            </Weiter>
          </div>
        </div>
      </div>
    </section>
  );
}

/* KI-Schulung für Unternehmen: links Text auf Braun, rechts Iljas Foto vor Publikum bis zum Rand. Der Text liegt nie auf dem Bild.
   Belege stehen so auch auf /ueber-mich. Der Knopf springt zum Kontaktformular und wählt dort das Thema vor (#anfrage-team). */
const FORMATE = [
  { Icon: Presentation, name: "Workshop", satz: "Für euer Team, vor Ort oder online." },
  { Icon: GraduationCap, name: "Training", satz: "Über mehrere Termine, mit Übungen dazwischen." },
  { Icon: Mic, name: "Vortrag", satz: "Für euer Event oder eure Führungsrunde." },
];
const SCHULUNGS_THEMEN = ["Claude Code im Team", "KI im Arbeitsalltag", "Second Brain fürs Team", "KI-Agenten"];
const BELEGE = ["KI-Dozent bei KIfiziert", "Zertifizierter digitaler Trainer", "Business-Trainer und Speaker"];

export function KiSchulung() {
  return (
    <section id="ki-schulung" className="relative scroll-mt-4 overflow-hidden" style={{ background: "var(--deep)" }}>
      <div className="grid min-[56.25rem]:min-h-[min(100svh,800px)] min-[56.25rem]:grid-cols-2">
        <div className="relative aspect-[3/2] min-[56.25rem]:order-2 min-[56.25rem]:aspect-auto">
          <Image src="/startseite/ki-schulung-vortrag.jpg" alt="Ilja Krasevskij spricht in einem Seminarraum vor einer Gruppe" fill sizes="(max-width: 900px) 100vw, 50vw" className="object-cover" style={{ objectPosition: "50% 35%" }} />
          {/* Übergang zur Textfläche: am Handy nach unten, am Laptop nach links */}
          <div aria-hidden className="absolute inset-0 min-[56.25rem]:hidden" style={{ background: "linear-gradient(180deg, rgba(46,43,38,0) 62%, rgba(46,43,38,0.95) 100%)" }} />
          <div aria-hidden className="absolute inset-0 hidden min-[56.25rem]:block" style={{ background: "linear-gradient(90deg, rgba(46,43,38,0.9) 0%, rgba(46,43,38,0) 24%)" }} />
        </div>

        <div className="flex flex-col justify-center px-6 pb-[7vh] pt-[3vh] min-[56.25rem]:order-1 min-[56.25rem]:py-[6vh] min-[56.25rem]:pl-[max(1.5rem,calc((100vw_-_72rem)/2))] min-[56.25rem]:pr-12">
          <SektionsKopf
            links
            zeile="Für Unternehmen · KI-Schulung"
            titel={
              <>
                Dein Team lernt KI. <span className="block text-gold-light">Von einem, der damit baut.</span>
              </>
            }
            text={<span style={{ color: LEISE_DUNKEL }}>Als KI-Dozent schule ich Teams in Unternehmen. Wir üben an euren echten Aufgaben, damit KI am nächsten Tag im Arbeitsalltag ankommt.</span>}
          />

          <ul className="mt-6 space-y-3">
            {FORMATE.map(({ Icon, name, satz }, i) => (
              <li key={name}>
                <Reveal delay={i * 0.06} className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full" style={{ border: "1px solid rgba(212,174,90,0.5)", background: "rgba(212,174,90,0.08)" }}>
                    <Icon aria-hidden size={20} strokeWidth={1.7} className="text-gold-light" />
                  </span>
                  <p className="text-[1rem] leading-snug" style={{ color: LEISE_DUNKEL }}>
                    <span className="font-serif text-[1.3rem] text-cream">{name}</span>
                    <span className="block">{satz}</span>
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Themen">
            {SCHULUNGS_THEMEN.map((t) => (
              <li key={t} className="rounded-full px-3.5 py-1.5 text-[0.95rem] text-cream" style={{ border: "1px solid rgba(212,174,90,0.42)", background: "rgba(10,8,6,0.28)" }}>
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-7">
            <Knopf href="#anfrage-team">Anfrage für dein Team</Knopf>
          </div>

          <p className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-[0.95rem]" style={{ color: LEISE_DUNKEL }}>
            {BELEGE.map((b) => (
              <span key={b} className="inline-flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold-light" />
                {b}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}

/* Die drei neuesten Artikel als Bildkarten. Neueste = höchste id in blog-artikel.ts. */
const NEUESTE = [...articles].sort((a, b) => b.id - a.id).slice(0, 3);
const ALLE_ARTIKEL = articles.length + 1; // dazu der große Hauptartikel oben auf /blog

export function NeuImBlog() {
  return (
    <section id="blog" className="relative scroll-mt-4 overflow-hidden px-6 py-[7vh]" style={{ background: "var(--tech-bg)" }}>
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[-10%] h-[70vh] w-[70vw] -translate-x-1/2" style={{ background: "radial-gradient(ellipse, rgba(212,174,90,0.12), transparent 70%)" }} />

      <div className="relative mx-auto max-w-6xl">
        <SektionsKopf
          zeile="Blog · Neu"
          titel={
            <>
              Wissen aus meinem Alltag. <span className="text-gold-light">Zum Nachmachen.</span>
            </>
          }
        />

        <div className="mt-8 grid gap-5 min-[56.25rem]:grid-cols-3">
          {NEUESTE.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.06} className="h-full">
              <TiltCard hervor={1.03} max={5} radius={16} glow="rgba(212,174,90,0.14)" className="h-full">
                <a href={a.slug} className="group flex h-full flex-col overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,174,90,0.38)" }}>
                  <span className="relative block aspect-[16/10] overflow-hidden">
                    <Image src={a.image} alt="" fill sizes="(max-width: 900px) 92vw, 360px" className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]" />
                  </span>
                  <span className="flex flex-1 flex-col p-5">
                    <span className="font-mono text-[12.5px] uppercase tracking-[0.16em] text-gold-light">
                      {a.category} · {a.readTime} Lesezeit
                    </span>
                    <span className="mt-2 font-serif text-[1.4rem] leading-tight text-cream">{a.title}</span>
                    <span className="mt-2 line-clamp-3 text-[0.97rem] leading-snug" style={{ color: LEISE_DUNKEL }}>
                      {a.excerpt}
                    </span>
                    <span className="mt-auto inline-flex items-center gap-2 pt-4 font-semibold text-gold-light">
                      Weiterlesen
                      <ArrowRight aria-hidden size={17} strokeWidth={2.2} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </span>
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center sm:flex-row sm:justify-center sm:gap-8">
          <Weiter href="/blog">Alle {ALLE_ARTIKEL} Artikel</Weiter>
          <Weiter href="/claude-code/startpaket">Kostenlos: das Claude-Code-Startpaket</Weiter>
        </div>
      </div>
    </section>
  );
}
