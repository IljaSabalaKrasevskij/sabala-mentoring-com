"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring } from "motion/react";
import { createContext, useContext, useState } from "react";
import BenefitGallery from "@/components/webseiten/BenefitGallery";
import styles from "./WebseitenView.module.css";
import AdlerHero from "@/components/webseiten/AdlerHero";
import StudioJourney from "@/components/webseiten/StudioJourney";
import AnalysisForm from "@/components/webseiten/AnalysisForm";
import { AnalysisSessionProvider } from "@/components/webseiten/AnalysisSession";
import { caseSlot } from "@/components/webseiten/studio-journey";
import { SonarGrid } from "@/components/ui/SonarGrid";
import { TEXTE, ANDERE_SPRACHE, type Lang } from "./texte";
import {
  ShieldCheck, Scan,
  FileSearch, Radar, MessagesSquare, ListChecks, ArrowRight, ArrowDown,
  ChevronLeft, ChevronRight, MoveUpRight,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────
   /webseiten — Sales-Page v6 (12.9.2026)

   Galerie und Beratungsraum am 14.9.2026 nach Freigabe aus dem Labor uebernommen.
   Das Labor bleibt mit noindex als eigene Vorschau verfuegbar.

   Aufbau: Adler-Hero fuehrt ins Schaufenster, nicht in die Analyse. Dann der
   begehbare Rundgang (Schaufenster, Empfang, Galerie), Werthebel, Fuer wen,
   die Arbeiten als gerahmtes Karussell, Prozess und Fundament, danach erst
   die kostenlose Potenzial-Analyse, dann Pflege, FAQ und Finale.

   Design: Londoner Material aus einer Quelle, schwebende Messingtafeln fuer
   die Werthebel und offene Kompositionen danach. Kulissen aus KIE hinter
   Werthebel, Fundament und Finale. Pflege MIT Preisen (70 / 249 / auf Anfrage, netto,
   B2B-Hinweis), Dashboard als Iljas Cockpit erzaehlt, nicht als Upsell.

   Kleines du, keine Em-Dashes, keine Ausrufezeichen, nur echte Zahlen.
   Keine deutschen Anfuehrungszeichen im JSX (Turbopack-Falle), Zitate mit »«.
   Fotos: /public/webseiten/ilja-*.jpg (EXIF gestrippt, Repo ist public).
   ───────────────────────────────────────────────────────────────────────── */

const EASE = [0.16, 1, 0.3, 1] as const;

/* Die Texte liegen in texte.ts, zweisprachig und in derselben Form. Der Kontext
   spart, sie durch zwölf Unterkomponenten durchzureichen. */
const SpracheContext = createContext<{ T: typeof TEXTE.de; lang: Lang }>({ T: TEXTE.de, lang: "de" });
const useT = () => useContext(SpracheContext);

/* ── Londoner Material ──────────────────────────────────────────────────
   Eine Quelle fuer die ganze Seite, damit Schaufenster und Sektionen
   dieselbe Sprache sprechen: gebuerstetes Messing, lackiertes dunkles Holz,
   Haarlinien statt Raender, kaum Rundungen. Ein Rahmen ist eckig. */

const MESSING = "linear-gradient(147deg, #c8ab73 0%, #7d6235 22%, #f0dcae 48%, #8a6f3c 64%, #d8bd84 86%, #6f5730 100%)";

/** Foto-Kulisse hinter einer Sektion. Dunkel gehalten und mit Schleier, damit
    heller Text darauf lesbar bleibt (Bilder aus KIE, 12.9.2026). */
function Kulisse({ bild, position = "center", staerke = 0.44 }: { bild: string; position?: string; staerke?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <Image src={`/webseiten/sektionen/${bild}.webp`} alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: position, opacity: staerke }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,8,6,0.88), rgba(10,8,6,0.6) 42%, rgba(10,8,6,0.94))" }} />
    </div>
  );
}

/** Warmes Licht von oben, wie die Bildleuchte ueber dem Rahmen im Saal. */
function Deckenlicht({ hoehe = "52vh" }: { hoehe?: string }) {
  return <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 w-[92vw] max-w-5xl -translate-x-1/2" style={{ height: hoehe, background: "radial-gradient(ellipse at top, rgba(184,150,62,0.15), transparent 68%)" }} />;
}

/** Messing-Haarlinie als Trenner. */
function Messinglinie({ breite = "6rem", className = "" }: { breite?: string; className?: string }) {
  return <div aria-hidden className={`h-px ${className}`} style={{ width: breite, background: "linear-gradient(90deg, transparent, rgba(184,150,62,0.7), transparent)" }} />;
}

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.6, delay, ease: EASE },
});

/* ── Daten ─────────────────────────────────────────────────────────────── */


/* Nur die Symbole bleiben hier, die Worte stehen in texte.ts. */

const STACK_ICONS = [FileSearch, Radar, MessagesSquare, ListChecks];

/* Eine Liste, Reihenfolge ist die Reihenfolge im Karussell. rfqtopo steht vorn. */
/* Bilder und Adressen der Arbeiten. Beschreibung und Rolle kommen aus texte.ts,
   die Reihenfolge ist in beiden Dateien dieselbe. */
const ARBEIT_MEDIEN = [
  { img: "/case-studies/rfqtopo.jpg", label: "rfqtopo.com", url: "https://rfqtopo.com" },
  { img: "/case-studies/yuna.jpg", label: "yuna-sports-nutrition.com", url: "https://yuna-sports-nutrition.com" },
  { img: "/case-studies/stefan-pons.jpg", label: "stefanpons.de", url: "https://stefanpons.de" },
  { img: "/case-studies/vegaleads.jpg", label: "vegaleads.ai", url: "https://vegaleads.ai" },
  { img: "/case-studies/dielommel.jpg", label: "dielommel.de", url: "https://dielommel.de" },
  { img: "/case-studies/cyber-sales.jpg", label: "cyber-sales.de", url: "https://cyber-sales.de" },
  { img: "/case-studies/sabala-mentoring.jpg", label: "sabala-mentoring.com", url: "https://sabala-mentoring.com" },
];

const PROZESS_ICONS = [FileSearch, Scan, ShieldCheck];


/* Drei Stufen, drei Raeume aus dem Rundgang als Bild. Basis ist Betrieb,
   Wachstum enthaelt Iljas Zeit, Partner ist die Zusammenarbeit auf Anfrage. */
/* Drei Stufen, drei Raeume aus dem Rundgang als Bild.
   Regel fuer Wachstum: alles darin laeuft entweder automatisch oder ist hart
   gedeckelt. Die Beispiele in Klammern SIND der Vertrag, sie halten das Wort
   "klein" fest. Alles, was Bauzeit kostet, gehoert in Partner. */
const PFLEGE_MEDIEN = [
  { price: "70", bild: "/webseiten/studio-london-v1/exterior.webp", highlight: false },
  { price: "249", bild: "/webseiten/studio-london-v1/reception.webp", highlight: true },
  { price: null, bild: "/webseiten/studio-london-v1/gallery.webp", highlight: false },
];

/* Fuenf Fragen, in der Reihenfolge, in der sie im Kopf auftauchen: erst der
   Preis, dann die Zeit, dann der erste Schritt, dann der Einwand, zuletzt die
   Frage, die bei einem Einzelnen niemand ausspricht. */

/* ── Schema.org (GEO): Service + Pflege-Preise + FAQ ───────────────────── */
const SITE = "https://sabala-mentoring.com";

// Jede Sprachfassung beschreibt sich selbst: eigene URL und @id, Texte aus texte.ts.
// Bis 13.9.2026 lieferte /en/websites hier den deutschen Service-Block mit der deutschen URL.
const schemaFuer = (lang: Lang) => {
  const T = TEXTE[lang];
  const S = T.schema;
  const url = `${SITE}${lang === "de" ? "/webseiten" : "/en/websites"}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: S.serviceName,
        serviceType: S.serviceType,
        url,
        provider: { "@id": `${SITE}/#organization` },
        description: S.serviceDescription,
        availableLanguage: lang,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: S.katalogName,
          itemListElement: [
            {
              "@type": "Offer",
              name: S.analyseName,
              price: 0,
              priceCurrency: "EUR",
              description: S.analyseBeschreibung,
            },
            {
              "@type": "Offer",
              name: S.basisName,
              description: S.basisBeschreibung,
              priceSpecification: { "@type": "UnitPriceSpecification", price: 70, priceCurrency: "EUR", valueAddedTaxIncluded: false, unitText: S.einheit },
            },
            {
              "@type": "Offer",
              name: S.wachstumName,
              description: S.wachstumBeschreibung,
              priceSpecification: { "@type": "UnitPriceSpecification", price: 249, priceCurrency: "EUR", valueAddedTaxIncluded: false, unitText: S.einheit },
            },
            {
              "@type": "Offer",
              name: S.partnerName,
              // Kein fester Preis mehr: Umfang haengt am Projekt, deshalb auf Anfrage.
              description: S.partnerBeschreibung,
            },
          ],
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: T.faq.fragen.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
};

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function WebseitenView({ lang, galleryVariant = "salon", isLab = false }: { lang: Lang; galleryVariant?: "classic" | "salon"; isLab?: boolean }) {
  return (
    <SpracheContext.Provider value={{ T: TEXTE[lang], lang }}>
    <AnalysisSessionProvider>
    <Sprachschalter isLab={isLab} />
    <main className="flex-1" style={{ background: "var(--cream)" }}>
      {/* statisches Objekt, kein User-Input; < wird nach Next-Doku escaped */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFuer(lang)).replace(/</g, "\\u003c") }} />
      <ScrollRail />
      <Hero />
      <Marquee />
      <Schaufenster galleryVariant={galleryVariant} />
      <Werthebel />
      <FuerWen />
      <Galerie />
      {/* Prozess und Fundament stehen seit 12.9.2026 VOR der Analyse: erst zeigen,
          wie gearbeitet wird und worauf es steht, dann nach der Anfrage fragen. */}
      <Prozess />
      <Fundament />
      <Analyse />
      <Pflege />
      <Faq />
      <Finale />
      <style>{`
        @keyframes ws-spin { to { transform: rotate(360deg); } }
        .ws-spin { animation: ws-spin 22s linear infinite; }
        @keyframes ws-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-12px) } }
        @keyframes ws-plate { from { opacity: 0; transform: translateY(9px) } to { opacity: 1; transform: none } }
        .ws-ghost {
          -webkit-text-stroke: 1px rgba(184,150,62,0.28);
          color: transparent;
          user-select: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .ws-spin { animation: none; }
          [style*="ws-plate"] { animation: none !important; }
        }
      `}</style>
    </main>
    </AnalysisSessionProvider>
    </SpracheContext.Provider>
  );
}

/** Wechsel in die andere Sprache. Ein echter Link auf die andere Route, kein
    Umschalten im Zustand: nur so kann Google beide Fassungen sehen. */
function Sprachschalter({ isLab }: { isLab: boolean }) {
  const { lang } = useT();
  const andere = ANDERE_SPRACHE[lang];
  return (
    <Link
      href={isLab ? `/webseiten-labor?lang=${andere.lang}` : andere.pfad}
      hrefLang={andere.lang}
      lang={andere.lang}
      aria-label={andere.lang === "en" ? "Switch to English" : "Auf Deutsch wechseln"}
      className="fixed right-20 top-4 z-40 inline-flex h-12 min-w-12 items-center justify-center rounded-full px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold-light)] sm:right-6 sm:top-24 sm:h-auto sm:min-w-0 sm:rounded-none sm:px-4"
      style={{ border: "1px solid rgba(184,150,62,0.45)", background: "rgba(10,8,6,0.72)", color: "var(--gold-light)", backdropFilter: "blur(10px)" }}
    >
      <span className="sm:hidden" aria-hidden="true">{andere.lang.toUpperCase()}</span>
      <span className="hidden sm:inline" aria-hidden="true">{andere.label}</span>
    </Link>
  );
}

/* ── Scroll-Rail: laeuft rechts an der Seite mit (Desktop) ─────────────── */
const RAIL_IDS = ["schaufenster", "hebel", "methode", "arbeiten", "prozess", "fundament", "analyse", "pflege", "faq"];

function ScrollRail() {
  const { T } = useT();
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  return (
    <div data-page-rail className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block" aria-hidden>
      <div className="relative flex flex-col items-center gap-4 py-3">
        <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2" style={{ background: "rgba(184,150,62,0.18)" }} />
        <motion.span
          className="absolute inset-y-0 left-1/2 w-px origin-top -translate-x-1/2"
          style={{ background: "linear-gradient(to bottom, var(--gold-light), var(--gold))", scaleY }}
        />
        {RAIL_IDS.map((id, i) => (
          <a key={id} href={`#${id}`} className="group pointer-events-auto relative flex items-center" aria-label={T.rail[i]}>
            <span className="block h-2 w-2 rounded-full transition-transform duration-300 group-hover:scale-150" style={{ background: "var(--gold)", boxShadow: "0 0 0 3px rgba(250,248,245,0.6)" }} />
            <span className="absolute right-5 whitespace-nowrap rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "rgba(10,8,6,0.9)", color: "var(--gold-light)", border: "1px solid rgba(184,150,62,0.3)" }}>
              {T.rail[i]}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ── Drehendes CTA-Siegel ──────────────────────────────────────────────── */
function SpinBadge({ className = "" }: { className?: string }) {
  const { T } = useT();
  return (
    <a href="#analyse" className={`group relative block h-32 w-32 ${className}`} aria-label={T.hero.siegelLabel}>
      <svg viewBox="0 0 120 120" className="ws-spin h-full w-full" aria-hidden>
        <defs>
          <path id="ws-circ" d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" />
        </defs>
        <text fill="var(--gold-light)" style={{ fontSize: 10.2, fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.22em" }}>
          <textPath href="#ws-circ">POTENZIAL-ANALYSE · KOSTENLOS · CHECK ·</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110" style={{ background: "var(--gold-light)", color: "var(--tech-bg)" }}>
        <ArrowDown size={20} strokeWidth={2.2} aria-hidden />
      </span>
    </a>
  );
}

/* ── 1 · Hero: Adler-Buehne, Blick folgt der Maus ─────────────────────── */
function Hero() {
  return (
    <AdlerHero>
      <HeroText />
    </AdlerHero>
  );
}

/* Weniger ist mehr: Kicker, Headline, ein Satz, ein Button. Sonst nichts.
   Der Text traegt einen eigenen Schatten, damit das Bild ohne Overlay auskommt. */
const SCHATTEN = "0 2px 24px rgba(11,9,6,0.85), 0 1px 4px rgba(11,9,6,0.7)";

function HeroText() {
  const { T } = useT();
  return (
    <div className="flex min-h-[94vh] w-full flex-col justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} className="mx-auto w-full max-w-7xl">
        <div className="max-w-lg" style={{ textShadow: SCHATTEN }}>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">{T.hero.eyebrow}</p>
          <h1 className="mt-5 font-serif text-cream" style={{ fontSize: "clamp(2.4rem, 5vw, 4.4rem)", lineHeight: 1.04, letterSpacing: "-0.015em" }}>{T.hero.zeile1}<br />
            <em className="not-italic" style={{ color: "var(--gold-light)" }}>{T.hero.zeile2}</em>
          </h1>
          <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-warm-light/85">{T.hero.sub}</p>
          {/* Fuehrt ins Schaufenster, nicht in die Analyse: erst schauen, dann anfragen. */}
          <a href="#schaufenster" className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-gold-light px-7 py-3.5 font-mono text-[12px] uppercase tracking-[0.14em] text-tech-bg transition-colors hover:bg-gold" style={{ textShadow: "none" }}>{T.hero.cta}<ArrowRight size={14} aria-hidden />
          </a>
        </div>
      </motion.div>
    </div>
  );
}

/* ── 2 · Marquee (mitlaufendes Band) ───────────────────────────────────── */
function Marquee() {
  const { T } = useT();
  const row = [...T.marquee, ...T.marquee];
  return (
    <section aria-hidden className="overflow-hidden py-5" style={{ background: "var(--tech-bg)", borderTop: "1px solid rgba(184,150,62,0.2)", borderBottom: "1px solid rgba(184,150,62,0.2)" }}>
      <div className="wd-marquee-track-l flex w-max items-center">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center">
            {row.map((m, i) => (
              <span key={`${half}-${i}`} className="flex items-center gap-6 pr-6 font-mono text-[12px] uppercase tracking-[0.3em] text-gold-light/80">
                {m}
                <span className="h-1 w-1 rounded-full" style={{ background: "var(--gold)" }} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 3 · Schaufenster (Metapher + Pain) ────────────────────────────────── */
function Schaufenster({ galleryVariant }: { galleryVariant: "classic" | "salon" }) {
  // Zusammenhängender 3D-Rundgang: Schaufenster, Empfang, ausgewählte Arbeiten.
  const { lang } = useT();
  return <StudioJourney lang={lang} galleryVariant={galleryVariant} />;
}

/* ── 4 · Werthebel (ROI-Kette) ─────────────────────────────────────────── */
function Werthebel() {
  const { T } = useT();
  return (
    <section id="hebel" aria-labelledby="benefits-heading" className={`${styles.section} ${styles.benefits}`}>
      <Kulisse bild="werthebel" position="center 42%" staerke={0.58} />
      <Deckenlicht />
      <div className={styles.inner}>
        <div className={styles.benefitHeader}>
          <div>
            <p className={styles.eyebrow}>{T.werthebel.eyebrow}</p>
            <h2 id="benefits-heading" className={styles.heading}>{T.werthebel.headline}</h2>
          </div>
          <p className={styles.intro}>{T.werthebel.intro}</p>
        </div>
        <BenefitGallery benefits={T.werthebel.hebel} />
        <div className={styles.result}>
          <p>{T.werthebel.ergebnisLabel}</p>
          <p className={styles.resultStatement}>{T.werthebel.ergebnis}</p>
          <p className={styles.resultNote}>{T.werthebel.ergebnisText}</p>
        </div>
      </div>
    </section>
  );
}

/* ── 5 · Für wen (ICP + Angebot, auf dem Adler) ───────────────────────── */

function FuerWen() {
  const { T } = useT();
  return (
    <section id="methode" className={`${styles.section} ${styles.audience}`}>
      <div className={`${styles.inner} ${styles.audienceGrid}`}>
        <figure className={styles.portrait}>
          <div className={styles.portraitImage}>
            <Image src="/webseiten/adler-stills/frontal-portraet-4zu5.webp" alt={T.fuerWen.bildAlt} fill sizes="(min-width: 1024px) 42vw, (min-width: 640px) 580px, 92vw" className="object-cover object-top" />
          </div>
          <figcaption>
            <blockquote>{T.fuerWen.zitat}</blockquote>
            <p>{T.fuerWen.zitatName}</p>
          </figcaption>
        </figure>
        <div className={styles.audienceCopy}>
          <p className={styles.eyebrow}>{T.fuerWen.eyebrow}</p>
          <h2 className={styles.heading}>{T.fuerWen.headline}</h2>
          <p className={styles.audienceLead}>{T.fuerWen.lead}</p>
          <div className={styles.criteria}>
            <h3>{T.fuerWen.tafel}</h3>
            <ul>{T.fuerWen.fuerDich.map((text) => <li key={text}>{text}</li>)}</ul>
          </div>
          <p className={styles.audienceNote}>{T.fuerWen.absage}</p>
        </div>
      </div>
    </section>
  );
}

/* ── 6 · Galerie (Proof, 3D-Tilt + Overlay) ────────────────────────────── */
/* Goldrahmen wie im Saal: gebuersteter Messingverlauf, innen eine dunkle Kante,
   darin das Bild. Kein Kachel-Look, sondern ein gerahmtes Bild an der Wand. */
const RAHMEN = {
  padding: "clamp(7px, 0.9vw, 13px)",
  background: "linear-gradient(147deg, #c8ab73 0%, #7d6235 22%, #f0dcae 48%, #8a6f3c 64%, #d8bd84 86%, #6f5730 100%)",
  boxShadow: "0 34px 60px rgba(0,0,0,0.62), 0 2px 0 rgba(255,240,205,0.28) inset, 0 -2px 0 rgba(60,44,18,0.55) inset",
};

function ArbeitRahmen({ img, label, aktiv }: { img: string; label: string; aktiv: boolean }) {
  return (
    <div style={RAHMEN}>
      <div className="relative aspect-[16/9] overflow-hidden" style={{ background: "linear-gradient(158deg, #221a12, #0d0b08)", boxShadow: "0 0 0 1px rgba(30,22,10,0.85), inset 0 0 26px rgba(0,0,0,0.75)" }}>
        <Image src={img} alt={label} fill sizes="(min-width: 1024px) 60vw, 92vw" className="object-cover object-top" loading="eager" priority={aktiv} />
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(142deg, rgba(255,229,179,0.07), transparent 42%, rgba(0,0,0,0.1))" }} />
      </div>
    </div>
  );
}

function Galerie() {
  const [aktiv, setAktiv] = useState(0);
  const { T } = useT();
  const ARBEIT = ARBEIT_MEDIEN.map((m, i) => ({ ...m, ...T.galerie.arbeiten[i] }));
  const anzahl = ARBEIT.length;
  const weiter = (d: number) => setAktiv((v) => (v + d + anzahl) % anzahl);
  const a = ARBEIT[aktiv];

  return (
    <section id="arbeiten" className="relative scroll-mt-20 overflow-hidden px-6 py-[18vh]" style={{ background: "var(--tech-bg)" }}>
      {/* warmes Licht von oben, wie die Bildleuchte ueber dem Rahmen */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[55vh] w-[92vw] max-w-5xl -translate-x-1/2" style={{ background: "radial-gradient(ellipse at top, rgba(184,150,62,0.16), transparent 68%)" }} />

      <div className="relative mx-auto max-w-6xl">
        <motion.div {...rise()} className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">{T.galerie.eyebrow}</p>
            <h2 className="mt-5 font-serif leading-[1.08] text-cream" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}>{T.galerie.headline}</h2>
          </div>
          <Link href="/case-studies" className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] text-gold-light transition-colors hover:text-cream">{T.galerie.alleCases}<ArrowRight size={14} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Buehne: die gewaehlte Arbeit gross, je eine angeschnitten daneben */}
        <motion.div {...rise(0.06)} className="relative mt-20 flex items-center gap-5 sm:gap-9">
          <button type="button" onClick={() => weiter(-1)} aria-label={T.galerie.vorherige} className="z-20 grid h-11 w-11 shrink-0 place-items-center rounded-full transition-colors" style={{ border: "1px solid rgba(184,150,62,0.4)", background: "rgba(10,8,6,0.72)", color: "var(--gold-light)" }}>
            <ChevronLeft size={19} aria-hidden />
          </button>

          <div className="relative flex-1" style={{ height: "clamp(210px, 40vw, 520px)" }}>
            {ARBEIT.map((w, i) => {
              const slot = caseSlot(i, aktiv, anzahl);
              const weg = Math.abs(slot) > 1;
              return (
                <div key={w.label} aria-hidden={slot !== 0} className="absolute left-1/2 top-1/2 w-[76%] sm:w-[68%]"
                  style={{
                    transform: `translate(-50%,-50%) translateX(${slot * 62}%) scale(${slot === 0 ? 1 : 0.72})`,
                    opacity: weg ? 0 : slot === 0 ? 1 : 0.4,
                    zIndex: slot === 0 ? 10 : 5,
                    filter: slot === 0 ? "none" : "saturate(0.65)",
                    pointerEvents: weg ? "none" : "auto",
                    transition: "transform .62s cubic-bezier(0.16,1,0.3,1), opacity .5s ease, filter .5s ease",
                  }}>
                  {slot === 0 ? (
                    <a href={w.url} target="_blank" rel="noopener noreferrer" className="block" aria-label={`${w.label} live ansehen`}>
                      <ArbeitRahmen img={w.img} label={w.label} aktiv />
                    </a>
                  ) : (
                    <button type="button" tabIndex={-1} onClick={() => setAktiv(i)} className="block w-full cursor-pointer" aria-label={`${w.label} auswählen`}>
                      <ArbeitRahmen img={w.img} label={w.label} aktiv={false} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <button type="button" onClick={() => weiter(1)} aria-label={T.galerie.naechste} className="z-20 grid h-11 w-11 shrink-0 place-items-center rounded-full transition-colors" style={{ border: "1px solid rgba(184,150,62,0.4)", background: "rgba(10,8,6,0.72)", color: "var(--gold-light)" }}>
            <ChevronRight size={19} aria-hidden />
          </button>
        </motion.div>

        {/* Messingschild unter dem Bild, wie im Museum */}
        <div className="relative mx-auto mt-14 max-w-2xl text-center" key={a.label} style={{ animation: "ws-plate .45s cubic-bezier(0.16,1,0.3,1) both" }}>
          <div aria-hidden className="mx-auto h-px w-24" style={{ background: "linear-gradient(90deg, transparent, rgba(184,150,62,0.65), transparent)" }} />
          {a.badge && (
            <span className="mt-6 inline-block px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: "var(--gold-light)", border: "1px solid rgba(184,150,62,0.4)" }}>{a.badge}</span>
          )}
          <p className="mt-5 font-serif text-cream" style={{ fontSize: "clamp(1.5rem, 3vw, 2.3rem)" }}>{a.label}</p>
          <p className="mt-3 text-[1.05rem] leading-relaxed text-warm-light/80">{a.note}</p>
          <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-warm-light/45">{a.rolle}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <a href={a.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] text-gold-light transition-colors hover:text-cream">{T.galerie.liveAnsehen}<MoveUpRight size={14} aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5" />
            </a>
            <Link href="/case-studies" className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] text-warm-light/55 transition-colors hover:text-cream">{T.galerie.caseStudy}<ArrowRight size={13} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Position im Rundgang */}
          <div className="mt-9 flex items-center justify-center gap-2.5" role="tablist" aria-label={T.rail[3]}>
            {ARBEIT.map((w, i) => (
              <button key={w.label} type="button" role="tab" aria-selected={i === aktiv} aria-label={w.label} onClick={() => setAktiv(i)}
                className="h-1.5 transition-all duration-500"
                style={{ width: i === aktiv ? 26 : 6, background: i === aktiv ? "var(--gold-light)" : "rgba(184,150,62,0.3)" }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 7 · Analyse (das eine Angebot + Formular) ─────────────────────────── */
function Analyse() {
  const { T, lang } = useT();

  return (
    <section id="analyse" className="scroll-mt-20 px-6 py-[13vh]">
      <div className="mx-auto max-w-6xl">
        {/* Dunkle Buehne mit Gold-Rahmen: der eine Conversion-Moment der Seite */}
        <motion.div
          {...rise()}
          className="relative overflow-hidden px-7 py-12 md:px-14 md:py-16"
          style={{ background: "var(--tech-bg)", border: "1px solid rgba(212,174,90,0.5)", boxShadow: "0 50px 60px rgba(80,60,20,0.35)" }}
        >
          <div aria-hidden className="pointer-events-none absolute -top-16 left-1/2 h-[120%] w-[70%] -translate-x-1/2" style={{ background: "conic-gradient(from 180deg at 50% 0%, transparent 42%, rgba(212,174,90,0.13) 50%, transparent 58%)" }} />
          <div aria-hidden className="wd-grain pointer-events-none absolute inset-0 opacity-15" />

          <div className="relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            {/* Angebots-Stack */}
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold-light">{T.analyse.eyebrow}</p>
              <h2 className="mt-5 font-serif leading-[1.06] text-cream" style={{ fontSize: "clamp(2.3rem, 5vw, 3.9rem)" }}>{T.analyse.headline}</h2>
              <p className="mt-5 max-w-lg text-[1.06rem] leading-relaxed text-warm-light/75">{T.analyse.lead}</p>

              <div className="mt-9 space-y-4">
                {T.analyse.stack.map((a, i) => { const Icon = STACK_ICONS[i]; return (
                  <motion.div key={a.term} {...rise(0.05 + i * 0.07)} className="flex items-start gap-4 p-5" style={{ background: "linear-gradient(158deg, rgba(41,33,22,0.9), rgba(15,12,9,0.96))", border: "1px solid rgba(184,150,62,0.25)" }}>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center" style={{ background: "rgba(184,150,62,0.14)", border: "1px solid rgba(184,150,62,0.4)" }}>
                      <Icon size={19} strokeWidth={1.9} className="text-gold-light" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-serif text-[1.22rem] text-cream">{a.term}</h3>
                      <p className="mt-1 text-[0.93rem] leading-relaxed text-warm-light/65">{a.line}</p>
                    </div>
                  </motion.div>
                ); })}
              </div>

              <motion.p {...rise(0.35)} className="mt-7 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-gold-light/90">
                <ShieldCheck size={15} aria-hidden />{T.analyse.siegel}</motion.p>
            </div>

            {/* Formular */}
            <div className="lg:pt-2">
              <motion.div {...rise(0.12)} className="p-5 sm:p-7 md:p-9" style={{ background: "rgba(250,248,245,0.035)", border: "1px solid rgba(184,150,62,0.35)" }}>
                <AnalysisForm lang={lang} />
              </motion.div>

              {/* Vertrauens-Anker: echte Person. Vorher ein 56-px-Adlerkopf neben
                  dem Satz "Du sprichst direkt mit mir". Jetzt ein Portraet im
                  Messingrahmen, im Studio aufgenommen statt am Schreibtisch. */}
              <motion.div {...rise(0.2)} className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="shrink-0" style={{ padding: "4px", background: MESSING, boxShadow: "0 18px 44px rgba(0,0,0,0.5)" }}>
                  <div className="relative h-[11rem] w-[8.8rem] overflow-hidden sm:h-[13rem] sm:w-[10.4rem]" style={{ background: "#0B0906" }}>
                    <Image src="/webseiten/sektionen/ilja-im-studio.webp" alt={T.analyse.personAlt} fill sizes="(min-width: 640px) 167px, 141px" className="object-cover object-top" />
                  </div>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold-light">{T.analyse.person}</p>
                  <p className="mt-3 text-[1rem] leading-relaxed text-warm-light/80">{T.analyse.personText}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── 8 · Prozess (drei Schritte, eine Reihe) ───────────────────────────── */
function Prozess() {
  const { T } = useT();
  return (
    <section id="prozess" className={`${styles.section} ${styles.process}`}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{T.prozess.eyebrow}</p>
        <h2 className={styles.heading}>{T.prozess.headline}</h2>
        <ol className={styles.steps}>
          {T.prozess.schritte.map((step, index) => {
            const Icon = PROZESS_ICONS[index];
            return (
              <li className={styles.step} key={step.term}>
                <span className={styles.stepIcon}><Icon size={22} strokeWidth={1.5} aria-hidden="true" /></span>
                <div className={styles.stepCopy}>
                  <div className={styles.stepMeta}>
                    <span className={styles.stepNumber} aria-hidden="true">0{index + 1}</span>
                    {step.tag && <span className={styles.stepTag}>{step.tag}</span>}
                  </div>
                  <h3>{step.term}</h3>
                  <p>{step.line}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ── 9 · Fundament (Trust-Band) ────────────────────────────────────────── */
function Fundament() {
  const { T } = useT();
  return (
    <section id="fundament" className={`${styles.section} ${styles.foundation}`}>
      <Kulisse bild="fundament" position="center 55%" staerke={0.38} />
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{T.fundament.eyebrow}</p>
        <h2 className={styles.heading}>{T.fundament.headline}</h2>
        <div className={styles.facts}>
          {T.fundament.punkte.map((fact) => (
            <article className={styles.fact} key={fact.term}>
              <p className={styles.stat}>{fact.stat}</p>
              <div>
                <h3>{fact.term}</h3>
                <p className={styles.factDescription}>{fact.line}</p>
              </div>
            </article>
          ))}
        </div>
        <p className={styles.foundationNote}>{T.fundament.fussnote}</p>
      </div>
    </section>
  );
}

/* ── 10 · Pflege (drei Stufen, MIT Preisen) + Cockpit ──────────────────── */
function Pflege() {
  const { T } = useT();
  return (
    <section id="pflege" className="relative scroll-mt-20 overflow-hidden px-6 py-[13vh]">
      {/* Radar hinter der Wartungssektion: das Punktfeld antwortet auf jeden
          Klick mit einem Ring. Passt zur Sache, Pflege heisst hinschauen.
          Zurueckhaltend gehalten, damit die Karten vorne bleiben. */}
      <SonarGrid
        aria-hidden
        className="pointer-events-auto absolute inset-0 hidden md:block"
        color="var(--gold)"
        spacing={30}
        dotRadius={1.3}
        baseOpacity={0.14}
        pingEvery={3.6}
        speed={210}
        ringWidth={120}
        amplitude={2.6}
        maxRings={4}
        pingArea={[0.1, 0.15, 0.9, 0.85]}
      />
      <div className="relative mx-auto max-w-6xl">
        <motion.div {...rise()} className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">{T.pflege.eyebrow}</p>
          <h2 className="mt-5 font-serif leading-[1.08]" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#2A2520" }}>{T.pflege.headline}</h2>
          <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed" style={{ color: "#46403A" }}>{T.pflege.lead}</p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PFLEGE_MEDIEN.map((m, i) => { const p = { ...m, ...T.pflege.stufen[i] }; return (
            <motion.article
              key={p.term}
              {...rise(i * 0.1)}
              className={`group relative ${p.highlight ? "md:-translate-y-4" : ""}`}
              style={{ padding: "clamp(5px, 0.55vw, 8px)", background: MESSING, boxShadow: p.highlight ? "0 34px 60px rgba(80,60,20,0.34)" : "0 22px 54px rgba(80,60,20,0.2)" }}
            >
              {p.highlight && (
                <span className="absolute -top-3.5 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ background: MESSING, color: "#2A2117" }}>{T.pflege.meistGewaehlt}</span>
              )}

              {/* Raum aus dem Rundgang als Grund. Der Preis steht IMMER im Fluss,
                  nie hinter einem Hover: eine Preiskarte, die ihren Preis erst beim
                  Zeigen verraet, verliert jeden Handy-Besucher. Die Bewegung liegt
                  stattdessen im Bild und in der Messingfuge ueber dem Preis. */}
              <div className="relative flex h-full min-h-[34rem] flex-col overflow-hidden">
                <Image src={p.bild} alt={p.alt} fill sizes="(min-width: 768px) 33vw, 92vw" className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]" />
                <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,7,5,0.97) 30%, rgba(8,7,5,0.74) 58%, rgba(8,7,5,0.3))" }} />

                <div className="relative flex h-full flex-col justify-end p-7">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold-light/80">{p.kurz}</p>
                  <h3 className="mt-3 font-serif text-[2rem] leading-none text-cream">{p.term}</h3>
                  <Messinglinie breite="2.5rem" className="mt-5" />
                  <ul className="mt-5 space-y-2.5">
                    {p.punkte.map((t) => (
                      <li key={t} className="flex items-start gap-3 text-[0.92rem] leading-snug text-warm-light/80">
                        <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ background: "var(--gold-light)" }} />{t}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 font-serif text-[0.98rem] italic leading-snug text-warm-light/60">{p.line}</p>

                  <div className="relative mt-7 pt-6">
                    <span aria-hidden className="absolute left-0 top-0 h-px w-10 transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" style={{ background: MESSING }} />
                    <div className="flex flex-wrap items-end justify-between gap-4">
                      <div>
                        {p.price ? (
                          <>
                            <span className="font-serif text-[2.4rem] leading-none text-cream">{p.price} €</span>
                            <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.14em] text-warm-light/55">{T.pflege.imMonat}</span>
                          </>
                        ) : (
                          <span className="font-serif text-[1.9rem] leading-none text-cream">{T.pflege.aufAnfrage}</span>
                        )}
                      </div>
                      <a href="#analyse" className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-transform duration-300 group-hover:translate-x-0.5" style={{ background: "var(--gold-light)", color: "var(--tech-bg)" }}>
                        {p.cta} <ArrowRight size={13} aria-hidden />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ); })}
        </div>

        <motion.p {...rise(0.18)} className="mx-auto mt-10 max-w-2xl text-center text-[0.95rem] leading-relaxed" style={{ color: "#6E665C" }}>{T.pflege.nichtEnthalten}</motion.p>

        <motion.p {...rise(0.2)} className="mx-auto mt-8 max-w-xl text-center font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em]" style={{ color: "#9A8F7E" }}>{T.pflege.nettoHinweis}</motion.p>

      </div>
    </section>
  );
}

/* ── 11 · FAQ ──────────────────────────────────────────────────────────── */
function Faq() {
  const { T } = useT();
  // Nichts steht beim Laden offen, der Besucher klickt selbst auf das Plus.
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="relative scroll-mt-20 overflow-hidden px-6 py-[16vh]" style={{ background: "var(--tech-bg)" }}>
      <Deckenlicht hoehe="60vh" />

      {/* Zwei echte Spalten statt Vollflaechen-Hintergrund plus Einrueckung:
          vorher klebte der Tresen am linken Fensterrand und die Tafel am
          rechten, dazwischen stand eine leere schwarze Flaeche. */}
      <div className="relative mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[0.82fr_1fr] lg:gap-14">
        <motion.figure {...rise()} className="relative lg:sticky lg:top-24" style={{ padding: "clamp(4px, 0.5vw, 7px)", background: MESSING, boxShadow: "0 26px 60px rgba(0,0,0,0.6)" }}>
          <div className="relative aspect-[4/3] lg:aspect-[3/4]" style={{ background: "#0B0906" }}>
            <Image src="/webseiten/sektionen/faq-tresen.webp" alt={T.faq.bildAlt} fill sizes="(min-width: 1024px) 38vw, 92vw" className="object-cover object-[58%_40%]" />
            <figcaption className="absolute inset-x-0 bottom-0 p-6" style={{ background: "linear-gradient(to top, rgba(11,9,6,0.94), transparent)" }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold-light">{T.faq.bildLabel}</p>
            </figcaption>
          </div>
        </motion.figure>

        <div>
        <motion.div {...rise()}>
          <span className="inline-flex items-center gap-2.5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-gold-light" style={{ border: "1px solid rgba(184,150,62,0.5)" }}>
            <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--gold-light)" }} />{T.faq.badge}</span>
          <h2 className="mt-7 font-serif leading-[1.06] text-cream" style={{ fontSize: "clamp(2.1rem, 4.6vw, 3.5rem)" }}>{T.faq.zeile1}<br />
            <span className="text-gold-light">{T.faq.zeile2}</span>
          </h2>
          <Messinglinie breite="4rem" className="mt-8" />
        </motion.div>

        {/* Eine Tafel im Messingrahmen, die Fragen als Zeilen darin.
            Die offene Zeile liegt im Ladengruen (#17261f aus dem Rundgang). */}
        <motion.div {...rise(0.1)} className="mt-12" style={{ padding: "clamp(5px, 0.55vw, 8px)", background: MESSING, boxShadow: "0 34px 60px rgba(0,0,0,0.6)" }}>
          <div style={{ background: "linear-gradient(158deg, rgba(26,21,14,0.98), rgba(11,9,7,0.99))" }}>
            {T.faq.fragen.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} style={{ borderTop: i === 0 ? "none" : "1px solid rgba(184,150,62,0.22)" }}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group relative flex w-full items-center gap-5 px-6 py-6 text-left transition-colors md:px-8"
                    style={{ background: isOpen ? "#17261f" : "transparent" }}
                  >
                    {/* Messingkante links, faehrt beim Oeffnen auf volle Hoehe */}
                    <span aria-hidden className="absolute left-0 top-1/2 w-[3px] -translate-y-1/2 transition-all duration-500" style={{ height: isOpen ? "100%" : "0%", background: MESSING }} />
                    <span className="shrink-0 font-mono text-[11px] tracking-[0.2em]" style={{ color: isOpen ? "var(--gold-light)" : "rgba(184,150,62,0.5)" }}>
                      0{i + 1}
                    </span>
                    <span className="flex-1 font-serif text-[1.15rem] leading-snug transition-colors md:text-[1.3rem]" style={{ color: isOpen ? "var(--cream)" : "rgba(240,232,216,0.78)" }}>
                      {f.q}
                    </span>
                    <span aria-hidden className="shrink-0 font-serif text-[1.5rem] leading-none transition-transform duration-300" style={{ color: "var(--gold-light)", transform: isOpen ? "rotate(45deg)" : "none" }}>
                      +
                    </span>
                  </button>
                  <div className="grid transition-[grid-template-rows] duration-400 ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", background: isOpen ? "#17261f" : "transparent" }}>
                    <div className="overflow-hidden">
                      <p className="px-6 pb-7 pl-[3.4rem] text-[0.99rem] leading-relaxed text-warm-light/75 md:px-8 md:pl-[4.4rem]">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.p {...rise(0.2)} className="mt-8 font-serif text-[1.05rem] italic leading-snug text-warm-light/55">{T.faq.schluss}</motion.p>
        </div>
      </div>
    </section>
  );
}

/* ── 12 · Finale (ein CTA, ein Funnel) ─────────────────────────────────── */
function Finale() {
  const { T } = useT();
  return (
    <section id="finale" className="relative overflow-hidden px-6 py-[15vh]" style={{ background: "var(--tech-bg)" }}>
      <Kulisse bild="finale" position="center 60%" staerke={0.5} />
      <Image src="/webseiten/adler-stills/frontal-banner-21zu9.webp" alt="" aria-hidden fill sizes="100vw" className="object-cover object-top opacity-35" />
      <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,8,6,0.55), rgba(10,8,6,0.85) 60%, rgba(10,8,6,0.97))" }} />
      <div aria-hidden className="wd-aurora-a pointer-events-none absolute -left-1/4 top-0 h-[60vh] w-[60vw] rounded-full" style={{ background: "radial-gradient(circle, rgba(184,150,62,0.14), transparent 65%)" }} />
      <div aria-hidden className="wd-aurora-b pointer-events-none absolute -right-1/4 bottom-0 h-[60vh] w-[60vw] rounded-full" style={{ background: "radial-gradient(circle, rgba(184,150,62,0.10), transparent 65%)" }} />

      <motion.div {...rise()} className="relative mx-auto max-w-3xl text-center">
        <div className="mx-auto mb-8 flex justify-center">
          <SpinBadge />
        </div>
        <h2 className="font-serif leading-[1.05] text-cream" style={{ fontSize: "clamp(2.6rem, 6.4vw, 5.2rem)", letterSpacing: "-0.01em" }}>{T.finale.headline}</h2>
        <p className="mx-auto mt-7 max-w-xl text-[1.15rem] leading-relaxed text-warm-light/80">{T.finale.lead}</p>
        <div className="mt-10">
          <a href="#analyse" className="inline-flex items-center gap-2.5 rounded-full bg-gold-light px-10 py-4 font-mono text-sm uppercase tracking-[0.12em] text-tech-bg transition-colors hover:bg-gold">{T.finale.cta}<ArrowRight size={16} aria-hidden />
          </a>
        </div>
        <p className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-warm-light/45">
          <span>{T.finale.siegel[0]}</span>
          <span aria-hidden className="h-1 w-1 rounded-full" style={{ background: "var(--gold)" }} />
          <span>{T.finale.siegel[1]}</span>
          <span aria-hidden className="h-1 w-1 rounded-full" style={{ background: "var(--gold)" }} />
          <span>{T.finale.siegel[2]}</span>
        </p>
      </motion.div>
    </section>
  );
}
