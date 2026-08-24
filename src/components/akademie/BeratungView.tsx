"use client";

import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Reveal, TiltCard, Brackets, Eyebrow, GoldCTA } from "./shared";

/* ─────────────────────────────────────────────────────────────────────────
   BeratungView — Sales-Page für die Beratungsstunde (Mini-Produkt).
   Aufbau übernommen von der früheren ClaudeStarterView, die dieselbe
   Rolle hatte: Hero mit Bild, ICP-Ansprache, Inhalte, Ablauf, Vorher/Nachher,
   Preis, Abschluss.

   Bewusst NUR Fragen, keine Antworten. Die Fragen wecken den Bedarf,
   die Antworten sind das Produkt. Fragen stammen aus den Session-Analysen
   der Akademie und aus einer Kunden-Feedbackliste, nicht erfunden:
   [[03_Bereiche/Sabala_Mentoring/Beratungsstunde/Fragenkatalog]]
   ───────────────────────────────────────────────────────────────────────── */

// ThriveCart-Checkout, live seit 24.8.2026.
const CHECKOUT = "https://sabala-mentoring.thrivecart.com/sabala-academy-beratungsstunde/";

const PREIS = "97";
const PREIS_REGULAER = "200";
const GUTSCHEIN = "120";
const KURS_PREIS = 397;
// Naechster Second-Brain-Lauf, Quelle: cohorts.ts (second-brain-2026-09-24)
const KURS_TERMIN = "24. September + 2. Oktober";

/* prefers-reduced-motion respektieren. Im UX-Skill Prioritaet 1 (kritisch):
   Parallax und Auto-Rotation koennen bei empfindlichen Nutzern Schwindel ausloesen. */
function useReduzierteBewegung() {
  const [reduziert, setReduziert] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduziert(mq.matches);
    const an = (e: MediaQueryListEvent) => setReduziert(e.matches);
    mq.addEventListener("change", an);
    return () => mq.removeEventListener("change", an);
  }, []);
  return reduziert;
}

const gold = "#b8963e";
const goldLight = "#d4ae5a";

const FUER_DICH = [
  "Du willst deine Webseite mit Claude Code bauen, kommst aber an einer Stelle nicht weiter.",
  "Du hast etwas Fertiges auf dem Rechner und weißt nicht, wie du es online bringst.",
  "Du fragst dich, wo deine Daten landen, sobald du mit KI arbeitest.",
  "Du willst dein Second Brain aufsetzen, aber der erste Schritt fehlt.",
  "Du hast zwanzig Tabs offen und trotzdem keine Antwort auf deine eigentliche Frage.",
];

/* ── Icons: Linien-SVGs im Hausstil, keine Emojis ───────────────────────── */
const st = { fill: "none", stroke: goldLight, strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const I = {
  web: (<svg width="26" height="26" viewBox="0 0 24 24" {...st}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 9h18M6.5 7.1h.01M9 7.1h.01" /></svg>),
  terminal: (<svg width="26" height="26" viewBox="0 0 24 24" {...st}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 9l3 3-3 3M13 15h4" /></svg>),
  deploy: (<svg width="26" height="26" viewBox="0 0 24 24" {...st}><path d="M12 3c3 2.5 4.5 6 4.5 9L12 16l-4.5-4c0-3 1.5-6.5 4.5-9z" /><circle cx="12" cy="9.5" r="1.6" /><path d="M9 17l-2 4 5-2 5 2-2-4" /></svg>),
  recht: (<svg width="26" height="26" viewBox="0 0 24 24" {...st}><path d="M12 3l7 3v6c0 4-3 7.5-7 9-4-1.5-7-5-7-9V6z" /><path d="M9 12l2 2 4-4" /></svg>),
  brain: (<svg width="26" height="26" viewBox="0 0 24 24" {...st}><rect x="7" y="7" width="10" height="10" rx="2.2" /><path d="M9.5 4v3M14.5 4v3M9.5 17v3M14.5 17v3M4 9.5h3M4 14.5h3M17 9.5h3M17 14.5h3" /><circle cx="12" cy="12" r="1.6" /></svg>),
  daten: (<svg width="26" height="26" viewBox="0 0 24 24" {...st}><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" /><circle cx="12" cy="15" r="1.4" /></svg>),
  deck: (<svg width="26" height="26" viewBox="0 0 24 24" {...st}><rect x="3" y="4" width="18" height="12" rx="1.6" /><path d="M12 16v4M8.5 20h7M7 8h6M7 11h9" /></svg>),
  app: (<svg width="26" height="26" viewBox="0 0 24 24" {...st}><rect x="3.5" y="3.5" width="7" height="7" rx="1.4" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.4" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.4" /><path d="M17 13.5v7M13.5 17h7" /></svg>),
  agent: (<svg width="26" height="26" viewBox="0 0 24 24" {...st}><circle cx="6" cy="6" r="2.3" /><circle cx="18" cy="12" r="2.3" /><circle cx="6" cy="18" r="2.3" /><path d="M8 7l8 4M8 17l8-4" /></svg>),
  key: (<svg width="26" height="26" viewBox="0 0 24 24" {...st}><circle cx="8" cy="12" r="4" /><path d="M12 12h9M17 12v3.5M20 12v2.5" /></svg>),
  suche: (<svg width="26" height="26" viewBox="0 0 24 24" {...st}><circle cx="10.5" cy="10.5" r="6" /><path d="M15 15l5 5" /></svg>),
};

/* ── Die Fragen. NUR Fragen, die Antworten sind das Produkt. ───────────── */
const THEMEN: { icon: ReactNode; titel: string; fragen: string[] }[] = [
  { icon: I.web, titel: "Webseiten mit Claude Code", fragen: [
    "Wie baue ich eine Webseite mit KI, die nicht nach KI aussieht?",
    "Woran erkennt man überhaupt, dass eine Seite von einer KI gebaut wurde?",
    "Wie komme ich von der leeren Seite zu einer Struktur, die verkauft?",
    "Wie schreibe ich Texte, die nach mir klingen und nicht nach Marketing?",
    "Woher nehme ich Bilder, wenn ich keine Fotos habe?",
    "Wordpress, Baukasten oder selbst gebaut, was passt zu mir?",
  ]},
  { icon: I.terminal, titel: "Claude Code und Terminal", fragen: [
    "Was ist Claude Code, und wozu brauche ich das Terminal?",
    "Ich habe noch nie ein Terminal benutzt, ist das ein Ausschlusskriterium?",
    "Wann nutze ich den Chat und wann Claude Code?",
    "Wo gehört die CLAUDE.md hin, und was schreibe ich da rein?",
    "Reicht der kostenlose Account, und was kostet mich das im Monat?",
    "Was sind Skills, und wer macht die eigentlich?",
    "Kann ich per Sprache statt Tippen arbeiten?",
  ]},
  { icon: I.deploy, titel: "Online bringen und Deployment", fragen: [
    "Wie bringe ich meine mit Claude gebaute Seite überhaupt online?",
    "Was kostet Hosting, und was brauche ich davon wirklich?",
    "Wie verbinde ich meine Domain damit?",
    "Ich ersetze meine alte Seite, verliere ich meine Google-Rankings?",
    "Was ist Git, und muss ich das verstehen?",
    "Wie ändere ich später etwas, ohne die Seite kaputtzumachen?",
  ]},
  { icon: I.recht, titel: "Rechtssicher betreiben", fragen: [
    "Brauche ich ein Cookie-Banner, und wenn ja, welches?",
    "Wie bringe ich eine Webseite rechtssicher online?",
    "Brauche ich einen Hinweis, dass die Seite mit KI gebaut wurde?",
    "Wo muss ich hosten, damit die Daten in Europa bleiben?",
    "Wie halte ich Passwörter und Schlüssel aus dem Code raus?",
  ]},
  { icon: I.brain, titel: "Second Brain Setup", fragen: [
    "Warum vergisst Claude alles, sobald ich ein neues Fenster öffne?",
    "Wie fange ich an, wenn ich Obsidian noch nie benutzt habe?",
    "Ich habe Obsidian schon, fange ich trotzdem von vorne an?",
    "Wie hole ich meine bestehenden Dokumente da rein?",
    "Kann das auf meiner NAS oder in einer Cloud liegen?",
    "Wie recherchiere ich ein Thema so, dass es danach nutzbar ist?",
  ]},
  { icon: I.daten, titel: "Daten und Datensicherheit", fragen: [
    "Wo landen meine Daten, wenn ich mit Claude arbeite?",
    "Darf ich Kundendaten oder Mandantendaten durch eine KI schicken?",
    "Was bleibt lokal auf meinem Rechner, und was geht ins Netz?",
    "Kann ich Modelle lokal laufen lassen, damit nichts rausgeht?",
    "Können meine Mitarbeiter nur auf bestimmte Bereiche zugreifen?",
  ]},
  { icon: I.deck, titel: "HTML-Präsentationen", fragen: [
    "Wie baue ich Präsentationen mit Claude Code statt mit PowerPoint?",
    "Wie erreiche ich, dass jedes Deck gleich gut aussieht?",
    "Wie wird aus einer Recherche automatisch eine fertige Präsentation?",
    "Kann ich das als PDF weitergeben?",
    "Warum wird bei mir immer etwas abgeschnitten?",
  ]},
  { icon: I.app, titel: "Apps und eigene Werkzeuge", fragen: [
    "Kann ich mir mit Claude Code eine eigene kleine App bauen?",
    "Wo hoste ich so eine App, ohne mir ein Sicherheitsproblem einzukaufen?",
    "Wie schütze ich ein internes Dashboard vor fremdem Zugriff?",
    "Wie verbinde ich meine App mit Daten, die ich schon habe?",
  ]},
  { icon: I.agent, titel: "Agenten und Automatisierung", fragen: [
    "Wie baue ich einen Agenten, der eine Aufgabe wirklich übernimmt?",
    "Was kann ich sinnvoll automatisieren, und wo lohnt es sich nicht?",
    "Kann etwas jeden Tag laufen, ohne dass ich es starte?",
    "Wie verbinde ich Claude mit Kalender oder E-Mail?",
    "Wie lasse ich mehrere Agenten parallel arbeiten?",
  ]},
  { icon: I.key, titel: "Kontrolle und Zugänge", fragen: [
    "Kann ich Texte, Bilder und Preise später selbst ändern?",
    "Bekomme ich am Ende wirklich alle Zugänge?",
    "Was passiert, wenn mein Dienstleister nicht mehr erreichbar ist?",
    "Kann ich später zu jemand anderem wechseln?",
  ]},
  { icon: I.suche, titel: "Gefunden werden", fragen: [
    "Warum findet mich bei Google niemand?",
    "Welche Themen gehören auf welche Seite?",
    "Wie werde ich in ChatGPT, Claude und Google AI Overviews zitiert?",
    "Wie wichtig ist Local SEO für mich?",
    "Wie messe ich, ob meine Seite etwas bringt?",
  ]},
];

const ABLAUF = [
  { n: "01", t: "Du buchst und schickst mir deine Fragen", d: "Nach der Buchung suchst du dir einen Termin und schreibst mir, was dich beschäftigt. Ich bereite mich darauf vor." },
  { n: "02", t: "Wir sprechen eine Stunde", d: "Per Video, Bildschirm geteilt. Ich zeige dir die Dinge live an deinem Fall, statt sie zu beschreiben." },
  { n: "03", t: "Du bekommst alles schriftlich", d: "Danach schicke ich dir die Zusammenfassung mit Links, Tools und den nächsten Schritten." },
];

const EINWAENDE: [string, string][] = [
  ["Brauche ich Vorwissen?",
   "Nein. Sag mir vorher, wo du stehst, dann setze ich dort an. In meinen Kursen saß bisher niemand, der programmieren kann."],
  ["Was, wenn meine Frage gar nicht dabei ist?",
   "Dann ist sie trotzdem willkommen. Die Liste zeigt, was oft gefragt wird, und ist keine Einschränkung."],
  ["Ist das ein verkapptes Verkaufsgespräch?",
   "Nein. Du bekommst eine Stunde Antworten und entscheidest danach frei. Willst du danach, dass ich etwas für dich baue, sprechen wir darüber. Wenn nicht, hast du trotzdem, wofür du bezahlt hast."],
  ["Was, wenn wir die Stunde nicht voll brauchen?",
   "Dann hören wir früher auf. Ich verlängere nichts künstlich. Umgekehrt werfe ich dich auch nicht auf die Minute raus, wenn wir mitten in etwas stecken."],
  ["Wie komme ich an meinen Termin?",
   "Direkt nach dem Kauf bekommst du den Link zur Terminwahl und suchst dir aus, was dir passt. Dazu deinen Gutscheincode."],
  ["Und wenn ich danach doch den Kurs will?",
   "Dann löst du deinen Code über 120 € ein und zahlst 277 € statt 397 €. Der nächste Lauf ist am 24. September und 2. Oktober."],
];

const VORHER = [
  "Zwanzig offene Tabs, und die eigentliche Frage ist noch offen.",
  "Jedes Tutorial setzt an einer anderen Stelle an.",
  "Angst, mit einem Klick etwas kaputtzumachen.",
];
const NACHHER = [
  "Ein klarer nächster Schritt, den du heute noch gehen kannst.",
  "Die Werkzeuge, die du brauchst, und die, die du dir sparst.",
  "Eine schriftliche Zusammenfassung, mit der du morgen weiterarbeitest.",
];

/* Parallax-Bild: bewegt sich beim Scrollen langsamer als die Seite.
   Der Effekt ist bewusst subtil (12%), sonst wirkt es billig. */
function ParallaxBild({
  src, alt, hoehe = "62vh", overlay = 0.55, kinder,
}: { src: string; alt: string; hoehe?: string; overlay?: number; kinder?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduziert = useReduzierteBewegung();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yRoh = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const scaleRoh = useTransform(scrollYProgress, [0, 0.5, 1], [1.14, 1.08, 1.14]);
  const y = reduziert ? "0%" : yRoh;
  const scale = reduziert ? 1.1 : scaleRoh;

  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ height: hoehe }}>
      <motion.div style={{ y, scale, position: "absolute", inset: "-18% -4%" }}>
        <Image src={src} alt={alt} fill className="object-cover" sizes="100vw" />
      </motion.div>
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, rgba(10,8,6,${overlay + 0.2}) 0%, rgba(10,8,6,${overlay - 0.2}) 45%, rgba(10,8,6,0.94) 100%)` }} />
      {kinder && <div className="relative z-10 flex h-full items-center justify-center px-[6vw]">{kinder}</div>}
    </div>
  );
}

/* Zahl, die beim Sichtbarwerden hochzaehlt. Fuer den Gutschein-Betrag. */
function ZaehlZahl({ ziel, dauer = 1100 }: { ziel: number; dauer?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [wert, setWert] = useState(0);
  const [gelaufen, setGelaufen] = useState(false);
  const reduziert = useReduzierteBewegung();

  useEffect(() => {
    if (reduziert) { setWert(ziel); return; }
    const el = ref.current;
    if (!el || gelaufen) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      setGelaufen(true);
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / dauer);
        // ease-out, damit die Zahl am Ende weich einrastet
        setWert(Math.round(ziel * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [ziel, dauer, gelaufen, reduziert]);

  return <span ref={ref}>{wert}</span>;
}

/* Trennlinie zwischen gleichfarbigen Sektionen. Gibt dem Scrollen Takt,
   ohne eine harte Kante zu ziehen. */
function Trenner() {
  return (
    <div aria-hidden className="mx-auto" style={{ maxWidth: 1080, padding: "0 6vw" }}>
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(184,150,62,0.28), transparent)" }} />
    </div>
  );
}

/* EbenenKachel — Tiefe muss im RUHEZUSTAND sichtbar sein, nicht erst beim Hover.
   Auf dem Handy gibt es keinen Hover, und im Standbild sieht man ihn auch nicht.
   Deshalb: sichtbare Elevation, Lichtkante oben, Farbverlauf statt flacher Flaeche,
   grosse Ziffer als Relief. Beim Scrollen versetzen sich die Kacheln leicht
   gegeneinander, das erzeugt Tiefe ohne Zutun des Nutzers.
   Hover legt nur noch etwas drauf. */
function EbenenKachel({
  ziffer, titel, text, index = 0,
}: { ziffer: string; titel: string; text: string; index?: number }) {
  const huelle = useRef<HTMLDivElement>(null);
  const reduziert = useReduzierteBewegung();
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, aktiv: false });

  // Scroll-Versatz: jede Kachel bewegt sich minimal anders, das staffelt die Ebene
  const { scrollYProgress } = useScroll({ target: huelle, offset: ["start end", "end start"] });
  const tiefe = [26, 8, 20][index % 3];
  const yRoh = useTransform(scrollYProgress, [0, 1], [tiefe, -tiefe]);
  const y = reduziert ? 0 : yRoh;

  function bewegen(e: React.MouseEvent) {
    if (reduziert) return;
    const el = huelle.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setT({ rx: (0.5 - py) * 8, ry: (px - 0.5) * 8, gx: px * 100, gy: py * 100, aktiv: true });
  }

  return (
    <motion.div ref={huelle} style={{ y, height: "100%", perspective: 1200 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
        style={{ height: "100%" }}
      >
        <div
          onMouseMove={bewegen}
          onMouseLeave={() => setT((v) => ({ ...v, rx: 0, ry: 0, aktiv: false }))}
          className="relative h-full overflow-hidden"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg) translateY(${t.aktiv ? -8 : 0}px)`,
            transition: t.aktiv ? "transform 0.1s linear" : "transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease-out",
            /* Ruhezustand traegt schon Tiefe: Verlauf, Lichtkante, echter Schlagschatten */
            background: "linear-gradient(160deg, rgba(255,250,242,0.075) 0%, rgba(255,250,242,0.028) 34%, rgba(10,8,6,0.5) 100%)",
            borderTop: "1px solid rgba(255,250,242,0.16)",
            borderLeft: "1px solid rgba(255,250,242,0.07)",
            borderRight: "1px solid rgba(0,0,0,0.5)",
            borderBottom: "1px solid rgba(0,0,0,0.6)",
            boxShadow: t.aktiv
              ? "0 42px 74px -34px rgba(0,0,0,0.95), 0 0 44px -10px rgba(212,174,90,0.42), inset 0 1px 0 rgba(255,255,255,0.12)"
              : "0 26px 52px -26px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.07)",
          }}
        >
          {/* Ziffer als Relief, im Ruhezustand deutlich sichtbar */}
          <span
            aria-hidden
            className="font-serif italic"
            style={{
              position: "absolute", top: -30, right: -10, lineHeight: 1, fontSize: "8rem",
              color: goldLight, opacity: t.aktiv ? 0.22 : 0.13,
              transform: "translateZ(-50px)", transition: "opacity 0.3s ease-out",
              pointerEvents: "none",
              textShadow: "0 2px 24px rgba(0,0,0,0.6)",
            }}
          >
            {ziffer}
          </span>

          {/* Gold-Schimmer unten, gibt der Flaeche Volumen */}
          <span aria-hidden style={{
            position: "absolute", left: 0, right: 0, bottom: 0, height: 90,
            background: "linear-gradient(180deg, transparent, rgba(184,150,62,0.10))",
            pointerEvents: "none",
          }} />

          {/* Cursor-Glow legt beim Hover nach */}
          <span aria-hidden style={{
            position: "absolute", inset: 0,
            background: `radial-gradient(360px circle at ${t.gx}% ${t.gy}%, rgba(212,174,90,0.20), transparent 60%)`,
            opacity: t.aktiv ? 1 : 0, transition: "opacity 0.3s ease-out", pointerEvents: "none",
          }} />

          <div className="relative flex h-full flex-col p-7" style={{ transform: "translateZ(40px)" }}>
            <Brackets color={t.aktiv ? "rgba(212,174,90,0.6)" : "rgba(212,174,90,0.3)"} inset={8} size={10} />
            <span className="font-mono text-[12px] tracking-[0.16em]" style={{ color: goldLight }}>{ziffer}</span>
            <h3 className="mt-3 font-serif text-[1.3rem] leading-tight text-cream">{titel}</h3>
            <p className="mt-3 text-[0.97rem] leading-relaxed" style={{ color: "rgba(250,248,245,0.68)" }}>{text}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* Duenner Gold-Balken oben, zeigt den Lesefortschritt. */
function LeseFortschritt() {
  const { scrollYProgress } = useScroll();
  const breite = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX: breite, transformOrigin: "0%", position: "fixed", top: 0, left: 0, right: 0, height: 2, background: goldLight, zIndex: 60 }}
    />
  );
}

/* Rotierende Frage. Zeigt, was dem Besucher gerade selbst im Kopf herumgeht,
   bevor er die vollstaendige Liste sieht. Pausiert bei Hover. */
function FragenSlideshow({ paare }: { paare: { frage: string; thema: string }[] }) {
  const [i, setI] = useState(0);
  const [pause, setPause] = useState(false);
  const reduziert = useReduzierteBewegung();

  useEffect(() => {
    if (pause || reduziert) return;
    const t = setInterval(() => setI((v) => (v + 1) % paare.length), 3400);
    return () => clearInterval(t);
  }, [pause, reduziert, paare.length]);

  const aktuell = paare[i];

  return (
    <div
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
      className="relative mx-auto max-w-4xl px-6 py-14 md:py-16"
      style={{ background: "rgba(255,250,242,0.03)", border: "1px solid rgba(184,150,62,0.28)" }}
    >
      <Brackets color="rgba(212,174,90,0.45)" inset={10} size={12} />

      <p className="text-center font-mono text-[11px] uppercase tracking-[0.28em]" style={{ color: "rgba(250,248,245,0.42)" }}>
        Geht dir das gerade auch durch den Kopf?
      </p>

      <div className="mt-7 flex min-h-[150px] items-center justify-center md:min-h-[130px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <p className="font-serif leading-[1.2] text-cream" style={{ fontSize: "clamp(1.4rem, 3.2vw, 2.35rem)" }}>
              {aktuell.frage}
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: gold }}>
              {aktuell.thema}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Fortschritt */}
      <div className="mx-auto mt-8 flex max-w-md flex-wrap justify-center gap-1.5">
        {paare.map((_, k) => (
          <button
            key={k}
            type="button"
            aria-label={`Frage ${k + 1}`}
            onClick={() => setI(k)}
            style={{
              height: 2,
              width: k === i ? 26 : 12,
              background: k === i ? goldLight : "rgba(250,248,245,0.2)",
              transition: "width 0.3s, background 0.3s",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function BeratungView() {
  const anzahl = THEMEN.reduce((s, t) => s + t.fragen.length, 0);
  // Je Thema die erste Frage, das ergibt eine Runde durch alle Themengebiete
  const slideshow = THEMEN.map((t) => ({ frage: t.fragen[0], thema: t.titel }));

  return (
    <div style={{ background: "#0a0806" }}>
      <LeseFortschritt />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: "#0a0806" }}>
        <div className="absolute inset-0 z-0">
          <Image src="/hero/ilja-default.png" alt="Ilja Krasevskij" fill priority className="object-cover object-[70%_center] md:object-right" sizes="100vw" />
          {/* Mobil: Verlauf von unten, damit der Text auf dunklem Grund sitzt */}
          <div className="absolute inset-0 md:hidden" style={{ background: "linear-gradient(180deg, rgba(10,8,6,0.80) 0%, rgba(10,8,6,0.86) 40%, rgba(10,8,6,0.93) 70%, rgba(10,8,6,0.98) 100%)" }} />
          <div className="absolute inset-0 hidden md:block" style={{ background: "linear-gradient(to right, rgba(10,8,6,0.95) 0%, rgba(10,8,6,0.76) 34%, rgba(10,8,6,0.36) 54%, transparent 82%)" }} />
        </div>

        <div className="relative z-10 flex min-h-[88vh] flex-col justify-center px-[6vw] py-[12vh]">
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: gold }}>
            Sabala Academy &middot; 1:1 &middot; Einführungsaktion
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }} className="mt-5 max-w-[760px] font-serif leading-[1.06] text-cream" style={{ fontSize: "clamp(2.5rem, 5vw, 3.9rem)", textShadow: "0 2px 30px rgba(10,8,6,0.7)" }}>
            Eine Stunde.
            <br />
            Deine Fragen.
            <br />
            <span style={{ color: gold }}>Klare Antworten.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12 }} className="mt-6 max-w-xl text-base leading-relaxed md:text-lg" style={{ color: "rgba(250,248,245,0.78)" }}>
            Webseiten mit Claude Code, online bringen, dein Second Brain, HTML-Präsentationen,
            eigene Agenten. Du fragst, ich zeige es dir live am Bildschirm.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }} className="mt-8 flex flex-wrap items-stretch gap-3">
            <span className="relative flex flex-col px-5 py-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(184,150,62,0.3)" }}>
              <Brackets color="rgba(184,150,62,0.45)" inset={6} size={8} />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: gold }}>Deine Stunde</span>
              <span className="mt-1 font-serif text-[1.35rem] text-cream">
                €{PREIS} <span className="font-mono text-[13px]" style={{ color: "rgba(250,248,245,0.45)", textDecoration: "line-through" }}>€{PREIS_REGULAER}</span>
              </span>
              <span className="font-mono text-[11px]" style={{ color: "rgba(250,248,245,0.5)" }}>60 Minuten &middot; 1:1 &middot; netto</span>
            </span>
            <span className="relative flex flex-col justify-center px-5 py-3" style={{ background: "rgba(184,150,62,0.10)", border: "1px dashed rgba(184,150,62,0.55)" }}>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: gold }}>Gutschein dazu</span>
              <span className="mt-1 font-serif text-[1.35rem]" style={{ color: goldLight }}>€{GUTSCHEIN}</span>
              <span className="font-mono text-[11px]" style={{ color: "rgba(250,248,245,0.5)" }}>für den Second-Brain-Kurs</span>
            </span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.24 }} className="mt-9 flex flex-wrap items-center gap-5">
            <GoldCTA href="#angebot">Was dich erwartet</GoldCTA>
            <a href={CHECKOUT} className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] transition-colors"
               style={{ color: "rgba(250,248,245,0.6)", textDecoration: "none", borderBottom: "1px solid rgba(250,248,245,0.25)", paddingBottom: 3 }}>
              Direkt buchen
              <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FÜR DICH ─────────────────────────────────────────────────────── */}
      <section className="px-[6vw] py-[14vh]" style={{ background: "radial-gradient(120% 80% at 50% 0%, #14100a 0%, #0c0a07 55%, #0a0806 100%)" }}>
        <div className="mx-auto max-w-3xl">
          <Reveal><Eyebrow center={false}>Das hier ist für dich, wenn</Eyebrow></Reveal>
          <div className="mt-8 flex flex-col gap-4">
            {FUER_DICH.map((line, i) => (
              <Reveal key={line} delay={0.05 + i * 0.05}>
                <div className="flex items-start gap-4">
                  <span className="mt-2.5 h-2 w-2 flex-shrink-0 rounded-full" style={{ background: gold, boxShadow: `0 0 10px ${gold}` }} />
                  <p className="text-[1.15rem] leading-relaxed" style={{ color: "rgba(250,248,245,0.82)" }}>{line}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.35}>
            <p className="mt-10 font-serif text-[1.6rem] leading-snug" style={{ color: gold }}>
              Dann stell die Frage einfach jemandem, der sie schon beantwortet hat.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Parallax-Auftakt zur Fragen-Sektion */}
      <ParallaxBild
        src="/beratung/fragen.jpg"
        alt="Jemand sitzt spätabends am Schreibtisch, umgeben von offenen Fragen"
        hoehe="58vh"
        overlay={0.5}
        kinder={
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl text-center font-serif leading-[1.15] text-cream"
            style={{ fontSize: "clamp(1.5rem, 3.4vw, 2.6rem)", textShadow: "0 2px 30px rgba(10,8,6,0.8)" }}
          >
            Die Antwort steht irgendwo im Netz.<br />
            <span style={{ color: goldLight }}>Nur eben nicht in deinem Kontext.</span>
          </motion.p>
        }
      />

      {/* ── DIE FRAGEN (nur Fragen, Antworten sind das Produkt) ──────────── */}
      <section className="px-[6vw] py-[10vh]" style={{ background: "#0a0806" }}>
        <div className="mx-auto max-w-6xl">
          <Reveal><Eyebrow>{anzahl} Fragen, die mir wirklich gestellt werden</Eyebrow></Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 text-center font-serif text-cream" style={{ fontSize: "clamp(1.9rem, 3.6vw, 3rem)", lineHeight: 1.1 }}>
              Such dir deine raus.<br />
              <span style={{ color: gold }}>Die Antwort bekommst du in der Stunde.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12">
              <FragenSlideshow paare={slideshow} />
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-16 text-center font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: "rgba(250,248,245,0.4)" }}>
              Alle Themengebiete im Überblick
            </p>
          </Reveal>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {THEMEN.map((t, i) => (
              <Reveal key={t.titel} delay={0.04 + (i % 3) * 0.045}>
                <TiltCard max={6} lift={8} glow="rgba(212,174,90,0.24)" style={{
                  height: "100%",
                  background: "linear-gradient(160deg, rgba(255,250,242,0.07) 0%, rgba(255,250,242,0.025) 34%, rgba(10,8,6,0.45) 100%)",
                  borderTop: "1px solid rgba(255,250,242,0.15)",
                  borderLeft: "1px solid rgba(255,250,242,0.06)",
                  borderRight: "1px solid rgba(0,0,0,0.45)",
                  borderBottom: "1px solid rgba(0,0,0,0.55)",
                  boxShadow: "0 24px 46px -24px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.07)",
                }}>
                  <div className="relative flex h-full flex-col overflow-hidden p-7">
                    <Brackets color="rgba(212,174,90,0.28)" inset={8} size={9} />
                    {/* Anzahl als Relief in der Tiefe */}
                    <span aria-hidden className="font-serif italic"
                      style={{ position: "absolute", top: -26, right: -8, fontSize: "6rem", lineHeight: 1, color: goldLight, opacity: 0.12, transform: "translateZ(-40px)", pointerEvents: "none", textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}>
                      {String(t.fragen.length).padStart(2, "0")}
                    </span>
                    <span aria-hidden style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 80, background: "linear-gradient(180deg, transparent, rgba(184,150,62,0.09))", pointerEvents: "none" }} />
                    <div className="relative flex items-center justify-between" style={{ transform: "translateZ(26px)" }}>
                      <span style={{ display: "inline-flex", padding: 9, background: "rgba(212,174,90,0.09)", border: "1px solid rgba(212,174,90,0.22)" }}>{t.icon}</span>
                      <span className="font-mono text-[11px]" style={{ color: "rgba(212,174,90,0.6)" }}>
                        {String(t.fragen.length).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="relative mt-4 font-serif text-[1.35rem] leading-tight text-cream" style={{ transform: "translateZ(20px)" }}>{t.titel}</h3>
                    <ul className="relative mt-4 flex flex-col gap-2.5" style={{ listStyle: "none", padding: 0, margin: 0, transform: "translateZ(14px)" }}>
                      {t.fragen.map((f) => (
                        <li key={f} className="flex items-start gap-2.5">
                          <span className="mt-[7px] h-[3px] w-[3px] flex-shrink-0 rounded-full" style={{ background: goldLight, opacity: 0.75 }} />
                          <span className="text-[0.94rem] leading-snug" style={{ color: "rgba(250,248,245,0.62)" }}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-14 flex flex-col items-center gap-4">
              <p className="text-center text-[1.05rem]" style={{ color: "rgba(250,248,245,0.55)" }}>
                Deine Frage nicht dabei? Schreib sie mir bei der Buchung dazu.
              </p>
              <GoldCTA href={CHECKOUT}>Beratungsstunde buchen &mdash; €{PREIS}</GoldCTA>
              <span className="font-mono text-[11.5px] uppercase tracking-[0.16em]" style={{ color: "rgba(250,248,245,0.42)" }}>
                Termin suchst du dir direkt nach dem Kauf aus
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <Trenner />

      {/* ── SO LÄUFT ES AB ──────────────────────────────────────────────── */}
      <section className="px-[6vw] py-[10vh]" style={{ background: "radial-gradient(120% 80% at 50% 100%, #14100a 0%, #0c0a07 55%, #0a0806 100%)" }}>
        <div className="mx-auto max-w-5xl">
          <Reveal><Eyebrow>So läuft es ab</Eyebrow></Reveal>
          <Reveal delay={0.08}>
            <div className="mx-auto mt-10 max-w-3xl overflow-hidden" style={{ border: "1px solid rgba(184,150,62,0.28)" }}>
              <Image
                src="/beratung/gespraech.jpg"
                alt="Zwei Menschen im Videogespräch, Bildschirm geteilt"
                width={1200}
                height={675}
                className="h-auto w-full"
                style={{ display: "block" }}
              />
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {ABLAUF.map((schritt, i) => (
              <EbenenKachel key={schritt.n} ziffer={schritt.n} titel={schritt.t} text={schritt.d} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── VORHER / NACHHER ────────────────────────────────────────────── */}
      <section className="px-[6vw] py-[10vh]" style={{ background: "#0a0806" }}>
        <div className="mx-auto grid max-w-4xl items-center gap-6 md:grid-cols-2">
          {/* Links liegt zurueck: kleiner, entsaettigt, ohne Glanz */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 0.965 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: "100%" }}
          >
            <div className="relative h-full p-8" style={{
              background: "linear-gradient(160deg, rgba(255,255,255,0.03) 0%, rgba(10,8,6,0.6) 100%)",
              border: "1px solid rgba(255,255,255,0.05)",
              filter: "saturate(0.4)",
              boxShadow: "inset 0 2px 22px rgba(0,0,0,0.6)",
            }}>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "rgba(250,248,245,0.38)" }}>Heute</span>
              <div className="mt-6 flex flex-col gap-4">
                {VORHER.map((v) => (
                  <p key={v} className="text-[1.02rem] leading-relaxed" style={{ color: "rgba(250,248,245,0.44)" }}>{v}</p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Rechts kommt nach vorne */}
          <motion.div
            initial={{ opacity: 0, y: 34, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: "100%", zIndex: 2 }}
          >
            <div className="relative h-full p-8" style={{ background: "linear-gradient(140deg, rgba(184,150,62,0.16) 0%, rgba(20,15,9,0.92) 60%)", border: "1px solid rgba(184,150,62,0.45)", boxShadow: "0 40px 90px -50px rgba(212,174,90,0.6)" }}>
              <Brackets color="rgba(212,174,90,0.4)" inset={8} size={10} />
              <span className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: gold }}>Nach der Stunde</span>
              <div className="relative mt-5 overflow-hidden" style={{ height: 150 }}>
                <Image src="/beratung/klarheit.jpg" alt="Aufgeräumter Schreibtisch im Morgenlicht" fill className="object-cover" sizes="(max-width: 768px) 100vw, 420px" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(20,15,9,0.15) 0%, rgba(20,15,9,0.8) 100%)" }} />
              </div>
              <div className="mt-6 flex flex-col gap-4">
                {NACHHER.map((v) => (
                  <p key={v} className="text-[1.02rem] leading-relaxed" style={{ color: "rgba(250,248,245,0.85)" }}>{v}</p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WER DIR GEGENUEBERSITZT (Authority) ─────────────────────────── */}
      <section className="px-[6vw] py-[13vh]" style={{ background: "radial-gradient(120% 80% at 50% 0%, #14100a 0%, #0c0a07 55%, #0a0806 100%)" }}>
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[0.85fr_1fr] md:gap-14">
          <Reveal>
            <div className="relative overflow-hidden" style={{ border: "1px solid rgba(184,150,62,0.3)" }}>
              <Image
                src="/akademie/ilja-trainer.jpg"
                alt="Ilja Krasevskij beim Training"
                width={720}
                height={900}
                className="h-auto w-full"
                style={{ display: "block" }}
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <Eyebrow center={false}>Wer dir gegenübersitzt</Eyebrow>
              <h2 className="mt-4 font-serif leading-[1.1] text-cream" style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.7rem)" }}>
                Ich baue das, worüber wir sprechen,<br />
                <span style={{ color: gold }}>jeden Tag selbst.</span>
              </h2>
              <p className="mt-6 text-[1.05rem] leading-relaxed" style={{ color: "rgba(250,248,245,0.72)" }}>
                Meine eigene Webseite, meine Kundenprojekte, mein Second Brain mit über zweitausend
                Dateien, meine Präsentationen und die Agenten, die mir Arbeit abnehmen: alles mit
                Claude Code gebaut. Was ich dir zeige, habe ich vorher an meinem eigenen Geschäft
                ausprobiert, inklusive der Umwege.
              </p>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {["Business-Trainer & Speaker", "e-Trainer-Zertifizierung", "KI-Dozent bei KIfiziert", "5 Jahre Avendoo"].map((f) => (
                  <span key={f} className="relative px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.14em]"
                    style={{ color: "rgba(250,248,245,0.7)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(184,150,62,0.28)" }}>
                    <Brackets color="rgba(212,174,90,0.35)" inset={4} size={6} />
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Trenner />

      {/* ── EINWAENDE ───────────────────────────────────────────────────── */}
      <section className="px-[6vw] py-[10vh]" style={{ background: "#0a0806" }}>
        <div className="mx-auto max-w-5xl">
          <Reveal><Eyebrow>Bevor du buchst</Eyebrow></Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 text-center font-serif text-cream" style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.7rem)", lineHeight: 1.1 }}>
              Was du vielleicht noch wissen willst
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {EINWAENDE.map(([q, a], i) => (
              <Reveal key={q} delay={0.05 + (i % 2) * 0.05}>
                <div
                  className="relative h-full overflow-hidden p-7"
                  style={{
                    background: "linear-gradient(160deg, rgba(255,250,242,0.062) 0%, rgba(255,250,242,0.022) 36%, rgba(10,8,6,0.45) 100%)",
                    borderTop: "1px solid rgba(255,250,242,0.13)",
                    borderLeft: "1px solid rgba(255,250,242,0.05)",
                    borderRight: "1px solid rgba(0,0,0,0.45)",
                    borderBottom: "1px solid rgba(0,0,0,0.55)",
                    boxShadow: "0 22px 44px -24px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.06)",
                  }}
                >
                  <Brackets color="rgba(212,174,90,0.26)" inset={8} size={9} />
                  <span aria-hidden style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 70, background: "linear-gradient(180deg, transparent, rgba(184,150,62,0.08))", pointerEvents: "none" }} />

                  <div className="relative flex items-start gap-4">
                    {/* Fragezeichen-Marke statt Aufzaehlungspunkt */}
                    <span aria-hidden className="flex shrink-0 items-center justify-center"
                      style={{ width: 34, height: 34, background: "rgba(212,174,90,0.10)", border: "1px solid rgba(212,174,90,0.3)" }}>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={goldLight} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9.2 9.2a2.9 2.9 0 015.6 1c0 1.9-2.8 2.9-2.8 2.9" />
                        <path d="M12 17.4h.01" />
                      </svg>
                    </span>
                    <h3 className="font-serif text-[1.2rem] leading-snug text-cream">{q}</h3>
                  </div>
                  <p className="relative mt-4 pl-[50px] text-[0.99rem] leading-relaxed" style={{ color: "rgba(250,248,245,0.66)" }}>{a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── GESCHENK: der Gutschein ─────────────────────────────────────── */}
      <section className="px-[6vw] py-[13vh]" style={{ background: "radial-gradient(130% 90% at 50% 20%, #1c1408 0%, #100c07 50%, #0a0806 100%)" }}>
        <div className="mx-auto max-w-5xl">
          <Reveal><Eyebrow>Dein Geschenk obendrauf</Eyebrow></Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 text-center font-serif text-cream" style={{ fontSize: "clamp(2rem, 4.4vw, 3.2rem)", lineHeight: 1.08 }}>
              Du bekommst mehr zurück,<br />
              <span style={{ color: gold }}>als die Stunde dich kostet.</span>
            </h2>
          </Reveal>

          {/* Ticket links, Kursbild rechts */}
          <div className="mt-14 grid items-stretch gap-6 md:grid-cols-[1.05fr_1fr]">
            <Reveal delay={0.12}>
              <div
                className="relative flex h-full flex-col justify-center overflow-hidden px-8 py-12 text-center"
                style={{
                  background: "linear-gradient(150deg, rgba(184,150,62,0.22) 0%, rgba(24,18,10,0.95) 62%)",
                  border: "2px dashed rgba(212,174,90,0.65)",
                  boxShadow: "0 40px 100px -46px rgba(212,174,90,0.75)",
                }}
              >
                <span aria-hidden style={{ position: "absolute", left: -18, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", background: "#120d07" }} />
                <span aria-hidden style={{ position: "absolute", right: -18, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", background: "#120d07" }} />

                <p className="font-mono text-[10.5px] uppercase tracking-[0.3em]" style={{ color: "rgba(250,248,245,0.55)" }}>
                  Rabattcode &middot; Second-Brain-Kurs
                </p>
                <p className="mt-4 font-serif italic leading-none" style={{ fontSize: "clamp(4.5rem, 14vw, 7.5rem)", color: goldLight, textShadow: "0 6px 44px rgba(212,174,90,0.45)" }}>
                  <ZaehlZahl ziel={Number(GUTSCHEIN)} /> €
                </p>
                <div className="mx-auto mt-7 flex max-w-xs items-center justify-center gap-4 pt-6" style={{ borderTop: "1px solid rgba(212,174,90,0.3)" }}>
                  <span className="font-mono text-[1.05rem]" style={{ color: "rgba(250,248,245,0.42)", textDecoration: "line-through" }}>{KURS_PREIS} €</span>
                  <svg width="26" height="12" viewBox="0 0 26 12" fill="none" aria-hidden><path d="M0 6h22M18 1l5 5-5 5" stroke={goldLight} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span className="font-serif text-[2.1rem] leading-none" style={{ color: goldLight }}>{KURS_PREIS - Number(GUTSCHEIN)} €</span>
                </div>
              </div>
            </Reveal>

            {/* Der Kurs, auf den der Gutschein zaehlt */}
            <Reveal delay={0.18}>
              <div className="relative h-full overflow-hidden" style={{ border: "1px solid rgba(184,150,62,0.3)", boxShadow: "0 26px 54px -30px rgba(0,0,0,0.9)" }}>
                <Image src="/akademie/ki-library-bg.jpg" alt="Second-Brain-Kurs" fill className="object-cover" sizes="(max-width: 768px) 100vw, 480px" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,8,6,0.45) 0%, rgba(10,8,6,0.90) 55%, rgba(10,8,6,0.97) 100%)" }} />
                <div className="relative flex h-full flex-col justify-end p-8">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.24em]" style={{ color: gold }}>Einlösbar für</span>
                  <h3 className="mt-3 font-serif text-[1.7rem] leading-tight text-cream">Dein Second Brain</h3>
                  <p className="mt-2 text-[1rem] leading-relaxed" style={{ color: "rgba(250,248,245,0.72)" }}>
                    Zwei Abende live, in denen wir Claude Code gemeinsam einrichten.
                  </p>
                  <p className="mt-4 font-mono text-[12.5px]" style={{ color: goldLight }}>
                    {KURS_TERMIN} &middot; 15&ndash;17:30 Uhr
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Drei Schritte */}
          <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-3">
            {[
              { n: "01", t: "Du buchst die Stunde", d: `${PREIS} € statt ${PREIS_REGULAER} €, netto.` },
              { n: "02", t: "Code und Termin kommen sofort", d: "Direkt nach dem Kauf, zusammen mit deinem Terminlink." },
              { n: "03", t: "Du löst ihn beim Kurs ein", d: `Aus ${KURS_PREIS} € werden ${KURS_PREIS - Number(GUTSCHEIN)} €.` },
            ].map((x, i) => (
              <EbenenKachel key={x.n} ziffer={x.n} titel={x.t} text={x.d} index={i} />
            ))}
          </div>

          <Reveal delay={0.28}>
            <div className="mt-12 flex flex-col items-center gap-3">
              <GoldCTA href={CHECKOUT} large>Beratungsstunde buchen &mdash; €{PREIS}</GoldCTA>
              <span className="font-mono text-[11.5px] uppercase tracking-[0.16em]" style={{ color: "rgba(250,248,245,0.45)" }}>
                Kein Zwang: ohne Kurs behältst du trotzdem alles aus der Stunde
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ABSCHLUSS: Preis mit Gesicht ────────────────────────────────── */}
      <section id="angebot" className="scroll-mt-16 px-[6vw] py-[13vh]" style={{ background: "radial-gradient(120% 80% at 50% 0%, #17110a 0%, #0b0805 55%, #080604 100%)" }}>
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[0.8fr_1fr] md:gap-14">
          {/* Gesicht: man bucht bei einem Menschen, nicht bei einer Seite */}
          <Reveal>
            <div className="relative overflow-hidden" style={{ border: "1px solid rgba(184,150,62,0.32)", boxShadow: "0 30px 64px -34px rgba(0,0,0,0.9)" }}>
              <Image src="/akademie/ilja-trainer.jpg" alt="Ilja Krasevskij" width={640} height={800} className="h-auto w-full" style={{ display: "block" }} />
              <div className="absolute inset-x-0 bottom-0 p-5" style={{ background: "linear-gradient(180deg, transparent, rgba(10,8,6,0.92))" }}>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.22em]" style={{ color: goldLight }}>Deine Stunde mit</p>
                <p className="mt-1 font-serif text-[1.3rem] text-cream">Ilja Krasevskij</p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal><Eyebrow center={false}>Einführungsaktion</Eyebrow></Reveal>
            <Reveal delay={0.06}>
              <div className="mt-5 flex items-end gap-4">
                <span className="font-serif italic leading-none" style={{ fontSize: "clamp(3.4rem, 8vw, 5rem)", color: gold }}>€{PREIS}</span>
                <span className="mb-3 font-mono text-[1.05rem]" style={{ color: "rgba(250,248,245,0.4)", textDecoration: "line-through" }}>€{PREIS_REGULAER}</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-2 pb-8 font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: "rgba(250,248,245,0.45)" }}>
                netto zzgl. MwSt. &middot; für Unternehmen und Selbständige
              </p>
            </Reveal>

            {/* Was drin ist, mit Haken statt Fliesstext */}
            <Reveal delay={0.14}>
              <ul className="flex flex-col gap-3.5" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  "60 Minuten 1:1 per Video, Bildschirm geteilt",
                  "Deinen Termin suchst du dir direkt nach dem Kauf aus",
                  "Schriftliche Zusammenfassung mit Links und Schritten",
                  `Gutschein über ${GUTSCHEIN} € für den Second-Brain-Kurs`,
                ].map((z) => (
                  <li key={z} className="flex items-start gap-3.5">
                    <span aria-hidden className="mt-0.5 flex shrink-0 items-center justify-center"
                      style={{ width: 22, height: 22, background: "rgba(212,174,90,0.12)", border: "1px solid rgba(212,174,90,0.35)" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.5 4.5L19 7" stroke={goldLight} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    <span className="text-[1.02rem] leading-snug" style={{ color: "rgba(250,248,245,0.8)" }}>{z}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <GoldCTA href={CHECKOUT} large>Beratungsstunde buchen &mdash; €{PREIS}</GoldCTA>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
