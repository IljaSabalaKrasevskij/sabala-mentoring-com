"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type ComponentType } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useReducedMotion,
} from "motion/react";
import {
  Copy, CircleHelp, Workflow, Meh,
  Route, Blocks, PackageCheck, Sparkles,
  Brain, Compass, Rocket, Zap, Eye, ShieldCheck, ArrowRight,
  Feather, SlidersHorizontal,
} from "lucide-react";
import SabalaLogo from "@/components/brand/SabalaLogo";
import ClaudeLogo from "@/components/brand/ClaudeLogo";
import ShaderBackground from "@/components/ui/shader-background";
import AnimatedRingBackground from "@/components/ui/animated-ring-background";
import CyberneticGridShader from "@/components/ui/cybernetic-grid-shader";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */
const CHECKOUT_URL = "https://sabala-mentoring.thrivecart.com/sabalas-webdesign-os/";
const PRICE = "147";
type Icon = ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */
// Fähigkeiten, nicht Tool-Namen: was das Setup KANN.
const CAPABILITIES = [
  "Konkurrenz-Analyse", "Seiten-Röntgen", "161 Farbpaletten", "57 Font-Paare",
  "Premium-Politur", "Anti-Slop-Frontend", "Echte 3D-Szenen", "Scroll-Animationen",
  "Seidiges Scrollen", "Bild-Generierung", "Video-Generierung", "Inspirations-Bibliothek",
  "Dein Design-Guide", "Menschliche Texte", "Sicherheits-Check", "Auto-Deploy", "Code-Review", "Komponenten-System",
];

const BEFORE: { icon: Icon; t: string }[] = [
  { icon: Copy, t: "Du tippst los und bekommst eine Seite, die wie tausend andere aussieht." },
  { icon: CircleHelp, t: "Welche Schritte, welche Reihenfolge? Du suchst alles selbst zusammen." },
  { icon: Workflow, t: "3D, Animation, Sicherheit, Deploy: jedes Thema ein neues Kaninchenloch." },
  { icon: Meh, t: "Am Ende ist es solide. Aber nicht besonders." },
];
const AFTER: { icon: Icon; t: string }[] = [
  { icon: Route, t: "Du beschreibst dein Ziel und hast einen klaren Ablauf statt Rätselraten." },
  { icon: Blocks, t: "Die passenden Fähigkeiten werden automatisch als Basis herangezogen." },
  { icon: PackageCheck, t: "Analyse, Inspiration, 3D, Sicherheit, Deploy: alles ist vorbereitet." },
  { icon: Sparkles, t: "Am Ende hast du eine deutlich bessere Grundlage, um in deinem Stil weiterzubauen." },
];

// Tabs: Nutzen-Titel statt Tool-Namen.
type Tab = { key: string; label: string; headline: string; items: { name: string; desc: string }[] };
const TABS: Tab[] = [
  { key: "analyse", label: "Analysieren", headline: "Verstehe jede Webseite", items: [
    { name: "Seiten röntgen", desc: "Jede Seite tief analysieren und sehen, wie die Besten gebaut sind." },
    { name: "1:1 nachbauen", desc: "Eine URL eingeben, den ganzen Aufbau erkennen und sauber nachbauen." },
    { name: "Konkurrenz in Minuten", desc: "Wettbewerber durchleuchten: Copy, Pricing, Trust, Technik." },
  ]},
  { key: "design", label: "Design & Stil", headline: "Premium statt Baukasten", items: [
    { name: "161 Paletten, 57 Font-Paare", desc: "Dein Stil, fundiert gewählt statt geraten." },
    { name: "Anti-Slop-Frontend", desc: "Ergebnisse, die nicht nach KI-Baukasten aussehen." },
    { name: "Premium-Politur", desc: "Mikro-Details, die eine Seite teuer wirken lassen." },
    { name: "Menschliche Texte", desc: "Copy, die nicht nach KI klingt, sondern nach dir." },
    { name: "Dein Design-Guide", desc: "Hast du keinen, entsteht er im Gespräch mit dir." },
  ]},
  { key: "motion", label: "3D & Motion", headline: "Tiefe, die man fühlt", items: [
    { name: "Echte 3D-Szenen", desc: "Hero-Planeten, Produkt-Viewer, Scroll-Scrub im Web." },
    { name: "Motion mit Sinn", desc: "Scroll-Animationen, Reveals, Parallax. Bewegung, nicht Deko." },
    { name: "Seidiges Scrollen", desc: "Das Gefühl der teuersten Seiten im Netz." },
  ]},
  { key: "inspiration", label: "Inspiration", headline: "Nie wieder leeres Blatt", items: [
    { name: "Kuratierte Quellen", desc: "Die besten Seiten nach Kategorie als Fundament." },
    { name: "Bilder auf Zuruf", desc: "Hero-Bilder, Hintergründe, Mockups in deinem Stil." },
    { name: "Cinematic Videos", desc: "Bewegte Hero-Loops, selbst erzeugt." },
  ]},
  { key: "security", label: "Sicherheit", headline: "Sauber live gehen", items: [
    { name: "Lücken-Check vor Launch", desc: "Automatische Prüfung, bevor irgendwer die Seite sieht." },
    { name: "Bausteine geprüft", desc: "Jeder fremde Baustein wird geprüft, bevor er reinkommt." },
    { name: "Setup bleibt gesund", desc: "Wöchentlicher Check, dass alles weiter funktioniert." },
  ]},
  { key: "deploy", label: "Deploy", headline: "Von der Idee bis online", items: [
    { name: "Ein Befehl, live", desc: "Von lokal bis online, mit allen Checks." },
    { name: "Code-Review automatisch", desc: "Bugs, Performance, Sauberkeit vor jedem Schritt." },
    { name: "Klare Anleitung", desc: "Was wann zu tun ist. Kein Rätselraten." },
  ]},
];

const SHOWCASE = [
  { img: "/case-studies/sabala-mentoring.jpg", name: "Sabala Mentoring", host: "sabala-mentoring.com", url: "https://sabala-mentoring.com" },
  { img: "/case-studies/dielommel.jpg", name: "Stefanie Lommel", host: "dielommel.de", url: "https://dielommel.de" },
  { img: "/case-studies/connecting-herzkreative.jpg", name: "Connecting Herzkreative", host: "connecting-herzkreative.com", url: "https://connecting-herzkreative.com" },
  { img: "/case-studies/operations-dashboard.jpg", name: "Operations-Dashboard", host: "internes Agenten-Tool", url: "/case-studies" },
];

const STATS = [
  { v: 25, suffix: "+", label: "Fähigkeiten, verzahnt" },
  { v: 161, suffix: "", label: "Farbpaletten parat" },
  { v: 1, suffix: " Std", label: "bis du startklar bist" },
  { v: 4, suffix: "", label: "Live-Seiten damit gebaut" },
];

const IMAGINATION: { icon: Icon; t: string; d: string }[] = [
  { icon: Brain, t: "Deine Vision", d: "Du weißt, wie es sich anfühlen soll. Das ist der Anfang von allem." },
  { icon: Compass, t: "Inspiration als Vorlage", d: "Die besten Seiten der Welt als Fundament, nicht als Kopie." },
  { icon: Sparkles, t: "Fähigkeiten, die greifen", d: "Analyse, Design, 3D, Deploy verbinden sich zu deinem Ergebnis." },
];

const TRANSFORM: { icon: Icon; t: string }[] = [
  { icon: Rocket, t: "Du lieferst in Tagen, nicht in Wochen." },
  { icon: Eye, t: "Deine Seiten sehen aus wie Premium-Studio-Arbeit." },
  { icon: Zap, t: "Du bist nicht mehr abhängig von Vorlagen." },
  { icon: ShieldCheck, t: "Du gewinnst Kunden mit dem, was du zeigst." },
];

const STEPS = [
  { t: "Download & entpacken", d: "Du lädst das Paket und öffnest den Ordner. Zwei Minuten." },
  { t: "Briefing einfügen", d: "Du kopierst einen fertigen Text in Claude Code. Mehr tippst du nicht." },
  { t: "Claude richtet ein", d: "Voraussetzungen, Fähigkeiten, Keys: alles geführt. Du beantwortest nur Fragen." },
  { t: "Dein Design-Guide entsteht", d: "Hast du einen, importiert Claude ihn. Hast du keinen, baut er einen mit dir." },
];

const PRINCIPLES: { icon: Icon; t: string; d: string }[] = [
  { icon: Feather, t: "Simplicity", d: "Ein Download, ein Einfügen, ein geführtes Setup. Kein Vorwissen nötig." },
  { icon: Eye, t: "Clarity", d: "Jede Fähigkeit mit klarer Anleitung: wann du sie brauchst und wie sie wirkt." },
  { icon: SlidersHorizontal, t: "Customization", d: "Dein Design-Guide, deine Marke, deine Dateien. Das Setup dreht sich zu dir." },
];

const VALUESTACK = [
  "25+ kuratierte Fähigkeiten, getestet und ineinandergreifend",
  "Geführtes 60-Minuten-Setup statt Trial-and-Error",
  "Kuratierte Inspirationsquellen plus 3D- und Motion-Wissen",
  "Dein eigener Design-Guide, mit dir gebaut",
  "Alle Updates inklusive",
];

const FAQ = [
  { q: "Brauche ich Programmier-Kenntnisse?", a: "Nein. Du fügst einen Text in Claude Code ein, der Rest passiert geführt. Du beantwortest Fragen, Claude baut." },
  { q: "Sind das nicht teils kostenlose Fähigkeiten?", a: "Einiges gibt es einzeln, ja. Der Wert ist die Auswahl, das Verzahnen und das geführte Setup, damit alles zusammen funktioniert. Du sparst dir Wochen Suchen und Ausprobieren." },
  { q: "Baut das meine Webseite komplett fertig?", a: "Nein, und das verspreche ich auch nicht. Du bekommst die Fähigkeiten und einen klaren Ablauf, damit du auf einem deutlich besseren Niveau startest und in deinem Stil weiterbaust. Den letzten Schliff machst du." },
  { q: "Brauche ich noch andere Tools?", a: "Das Setup läuft in Claude Code, dafür brauchst du ein Claude-Abo (Pro oder höher). Manche Fähigkeiten nutzen externe Dienste wie Web-Recherche oder Bild-Generierung. Die meisten haben Gratis-Kontingente, ein paar kosten extra. Du entscheidest, was du nutzt." },
  { q: "Funktioniert das mit meiner eigenen Marke?", a: "Ja. Beim Setup legst du deinen Design-Guide an. Hast du schon einen, importiert Claude ihn. Hast du keinen, baut Claude im Gespräch mit dir einen." },
  { q: "Wie lange dauert die Einrichtung?", a: "Etwa eine Stunde. Einmal, dann ist alles startklar." },
  { q: "Bekomme ich Updates?", a: "Ja. Das Paket wächst weiter, du bekommst neue Versionen ohne Aufpreis." },
];

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */
function AuroraMesh() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="wd-aurora-a absolute -left-[15%] -top-[20%] h-[70vh] w-[70vh] rounded-full blur-[90px]" style={{ background: "radial-gradient(circle, rgba(184,150,62,0.20), transparent 65%)" }} />
      <div className="wd-aurora-b absolute -right-[10%] top-[20%] h-[60vh] w-[60vh] rounded-full blur-[100px]" style={{ background: "radial-gradient(circle, rgba(212,174,90,0.16), transparent 65%)" }} />
      <div className="wd-grain absolute inset-0 opacity-[0.06] mix-blend-overlay" />
    </div>
  );
}

function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <div className={`cs-reveal${className ? ` ${className}` : ""}`} style={delay ? ({ animationDelay: `${delay}s` } as CSSProperties) : undefined}>
      {children}
    </div>
  );
}

function MagneticCTA({ href, children, tone = "gold", className = "", newTab = false }: { href: string; children: ReactNode; tone?: "gold" | "dark" | "cream"; className?: string; newTab?: boolean }) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 14 });
  const sy = useSpring(y, { stiffness: 200, damping: 14 });
  const tones: Record<string, string> = { gold: "bg-gold-light text-tech-bg", dark: "bg-deep-charcoal text-cream", cream: "bg-cream text-tech-bg" };
  const cls = `inline-flex items-center justify-center rounded-full px-8 py-4 font-satoshi text-base font-semibold ${tones[tone]} ${className}`;
  function move(e: React.PointerEvent) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  }
  function leave() { x.set(0); y.set(0); }
  const extra = newTab ? { target: "_blank", rel: "noopener noreferrer" } : {};
  if (!mounted || reduce) return <Link href={href} className={cls} {...extra}>{children}</Link>;
  return (
    <motion.a ref={ref} href={href} {...extra} onPointerMove={move} onPointerLeave={leave} style={{ x: sx, y: sy }} className={`${cls} transition-[filter] hover:brightness-105`}>
      {children}
    </motion.a>
  );
}

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [n, setN] = useState(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0; const dur = 1100; let startT = 0;
    const tick = (t: number) => { if (!startT) startT = t; const p = Math.min(1, (t - startT) / dur); setN(Math.round((1 - Math.pow(1 - p, 3)) * value)); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value]);
  const display = !mounted || reduce ? value : n;
  return (
    <div ref={ref} className="text-center">
      <p className="font-instrument text-[clamp(2.6rem,6vw,4rem)] leading-none text-gold-light">{display}{suffix}</p>
      <p className="mt-3 font-satoshi text-[13px] leading-snug text-warm-light/60">{label}</p>
    </div>
  );
}

function SpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  function move(e: React.PointerEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  }
  return (
    <div ref={ref} onPointerMove={move} className={`group relative overflow-hidden ${className}`} style={{ "--mx": "50%", "--my": "0%" } as CSSProperties}>
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(280px circle at var(--mx) var(--my), rgba(212,174,90,0.16), transparent 70%)" }} />
      <div className="relative">{children}</div>
    </div>
  );
}

/** Donut-Abdeckungs-Chart: 6 Bau-Phasen als Gold-Segmente. Statisch gezeichnet (immer sichtbar). */
const PHASES = [
  { label: "Analyse", c: "#D4AE5A" },
  { label: "Design & Stil", c: "#C9A04E" },
  { label: "3D & Motion", c: "#B8963E" },
  { label: "Inspiration", c: "#D4AE5A" },
  { label: "Sicherheit", c: "#C9A04E" },
  { label: "Deploy", c: "#B8963E" },
];
function CoverageDonut() {
  const R = 80, C = 2 * Math.PI * R, seg = C / 6, gap = 14, arc = seg - gap;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[18rem]">
      <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
        <circle cx="100" cy="100" r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="13" />
        {PHASES.map((p, i) => (
          <circle key={p.label} cx="100" cy="100" r={R} fill="none" stroke={p.c} strokeWidth="13" strokeLinecap="round"
            strokeDasharray={`${arc} ${C - arc}`} strokeDashoffset={-(i * seg)} />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-instrument text-[3.2rem] leading-none text-cream">6</span>
        <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-warm-light/55">Phasen<br />abgedeckt</span>
      </div>
    </div>
  );
}

/** Stilisierte Claude-Code-Eingabe-Maske: zeigt, wie simpel der Ablauf ist. */
function ClaudeCodeMock() {
  const lines = [
    { mark: "✓", t: "Stil aus deinem Design-Guide gewählt" },
    { mark: "✓", t: "Grundstruktur mit Tiefe gebaut" },
    { mark: "✓", t: "Sauber geprüft, bereit zum Weiterbauen" },
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-gold-light/20 bg-[#0d0a07] shadow-[0_40px_100px_-50px_rgba(0,0,0,0.9)]">
      {/* Fenster-Leiste */}
      <div className="flex items-center gap-2 border-b border-white/8 bg-white/[0.03] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-soft-stone/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-soft-stone/35" />
        <span className="h-2.5 w-2.5 rounded-full bg-soft-stone/25" />
        <span className="ml-3 font-mono text-[11px] text-warm-light/40">Claude Code · ~/mein-projekt</span>
      </div>
      {/* Verlauf */}
      <div className="space-y-3.5 px-5 py-6 font-mono text-[12.5px]">
        <p className="text-cream">
          <span className="text-gold-light">&gt;</span> Bau mir eine ruhige, hochwertige Portfolio-Seite.
        </p>
        <p className="text-warm-light/40">Setup aktiv · die passenden Fähigkeiten greifen ineinander</p>
        {lines.map((l) => (
          <p key={l.t} className="flex items-center gap-2.5 text-warm-light/75">
            <span className="text-gold-light">{l.mark}</span> {l.t}
          </p>
        ))}
      </div>
      {/* Eingabe-Maske */}
      <div className="flex items-center gap-3 border-t border-white/8 bg-white/[0.02] px-4 py-3.5">
        <span className="flex-1 font-mono text-[12.5px] text-warm-light/35">
          Beschreibe deine nächste Idee
          <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-gold-light align-middle" />
        </span>
        <span className="flex h-8 w-8 items-center justify-center rounded-lg text-tech-bg" style={{ background: "linear-gradient(135deg, #D4AE5A, #B8963E)" }}>
          <ArrowRight size={16} strokeWidth={2.4} />
        </span>
      </div>
    </div>
  );
}

/** Section-Hintergrund: KI-Bild + Scrim (dunkel) bzw. heller Schleier (light) fuer Lesbarkeit. */
function SectionBg({ src, opacity = 0.5, dark = false }: { src: string; opacity?: number; dark?: boolean }) {
  return (
    <>
      <Image src={src} alt="" aria-hidden fill sizes="100vw" className="object-cover" style={{ opacity }} />
      {dark ? (
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,8,6,0.72), rgba(10,8,6,0.58) 50%, rgba(10,8,6,0.85))" }} />
      ) : (
        <div aria-hidden className="absolute inset-0" style={{ background: "rgba(250,248,245,0.62)" }} />
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* "Was drin ist": vertikale Tabs mit Auto-Play + animiertem Panel    */
/* ------------------------------------------------------------------ */
const WD_AUTO_MS = 6000;

function WhatsInside() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = TABS[active];

  const go = (i: number) => {
    if (i === active) return;
    setDir(i > active ? 1 : -1);
    setActive(i);
  };

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setDir(1);
      setActive((p) => (p + 1) % TABS.length);
    }, WD_AUTO_MS);
    return () => clearInterval(id);
  }, [active, paused]);

  const variants = {
    enter: (d: number) => ({ y: d > 0 ? "6%" : "-6%", opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: (d: number) => ({ y: d > 0 ? "-6%" : "6%", opacity: 0 }),
  };

  return (
    <div
      className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Links: vertikale, nummerierte Tabs mit Auto-Play-Fortschritt */}
      <div className="flex flex-col lg:col-span-5">
        {TABS.map((tab, i) => {
          const isActive = i === active;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => go(i)}
              aria-pressed={isActive}
              className={cn(
                "group relative flex items-start gap-4 border-t border-gold-light/12 py-6 pl-6 text-left transition-colors duration-500 first:border-0",
                isActive ? "text-cream" : "text-warm-light/45 hover:text-warm-light/80"
              )}
            >
              <span className="absolute bottom-0 left-0 top-0 w-[2px] bg-gold-light/15">
                {isActive && (
                  <motion.span
                    key={`wd-prog-${i}-${paused}`}
                    className="absolute left-0 top-0 w-full origin-top bg-gold-light"
                    initial={{ height: "0%" }}
                    animate={paused ? { height: "0%" } : { height: "100%" }}
                    transition={{ duration: WD_AUTO_MS / 1000, ease: "linear" }}
                  />
                )}
              </span>
              <span className="mt-2 font-mono text-[10px] tabular-nums opacity-50">{`/0${i + 1}`}</span>
              <div className="flex flex-1 flex-col">
                <span className="font-instrument text-[clamp(1.5rem,2.6vw,2.2rem)] leading-tight tracking-tight">
                  {tab.label}
                </span>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                      className="overflow-hidden"
                    >
                      <span className="block pt-2 font-satoshi text-[15px] leading-relaxed text-gold-light/80">
                        {tab.headline}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </button>
          );
        })}
      </div>

      {/* Rechts: grosses animiertes Panel mit echten Skills + Brand-Backdrop */}
      <div className="lg:col-span-7">
        <div className="relative min-h-[32rem] overflow-hidden rounded-3xl border border-gold-light/15 bg-white/[0.02] md:min-h-[36rem] md:rounded-[2.5rem]">
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.div
              key={active}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ y: { type: "spring", stiffness: 260, damping: 32 }, opacity: { duration: 0.4 } }}
              className="absolute inset-0 flex flex-col"
            >
              {/* schmaler Illustrations-Header (KI, im Brand-Stil) */}
              <div className="relative h-36 w-full shrink-0 overflow-hidden md:h-48">
                <Image src={`/webdesign-os/tab-${TABS[active].key}.jpg`} alt="" fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" />
                <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(12,10,7,0.15) 0%, rgba(12,10,7,0.5) 55%, #0c0a07 100%)" }} />
                <h3 className="absolute bottom-5 left-8 right-8 font-instrument text-[clamp(1.6rem,3vw,2.4rem)] leading-tight text-cream drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
                  {t.headline}
                </h3>
              </div>
              {/* Inhalt */}
              <div className="flex-1 px-8 py-8 md:px-12 md:py-10" style={{ background: "#0c0a07" }}>
                <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
                  {t.items.map((sk, idx) => (
                    <div key={sk.name} className="border-t border-gold-light/12 pt-4">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-[10px] tabular-nums text-gold-light/50">{`0${idx + 1}`}</span>
                        <p className="font-instrument text-[1.2rem] leading-tight text-cream">{sk.name}</p>
                      </div>
                      <p className="mt-1.5 pl-7 font-satoshi text-[14px] leading-relaxed text-warm-light/60">{sk.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* View                                                                */
/* ------------------------------------------------------------------ */
export default function WebDesignOsView() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <div className="overflow-x-clip bg-warm-canvas text-deep-charcoal selection:bg-refined-gold selection:text-white">
      <motion.div aria-hidden className="fixed left-0 right-0 top-0 z-[55] h-[2px] origin-left bg-gradient-to-r from-refined-gold to-gold-light" style={{ scaleX: mounted ? progress : 0 }} />

      {/* ============================ HERO (Foto) ============================ */}
      <section className="relative flex min-h-[100dvh] items-center overflow-hidden px-6 pt-28 pb-20 sm:px-10 md:px-16" style={{ background: "var(--tech-bg)" }}>
        <Image src="/hero/ilja-metal.jpg" alt="Ilja Krasevskij, Sabala Studios" fill priority sizes="100vw" className="object-cover object-[66%_50%] md:object-[100%_50%]" />
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(10,8,6,0.95) 0%, rgba(10,8,6,0.86) 36%, rgba(10,8,6,0.46) 66%, rgba(10,8,6,0.12) 100%)" }} />
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(10,8,6,0.7), transparent 42%)" }} />
        <div className="relative mx-auto w-full max-w-6xl">
          <div className="max-w-xl">
            <div className="cs-rise flex items-center gap-3">
              <SabalaLogo size={38} light />
              <span className="font-mono text-[12px] uppercase tracking-[0.34em] text-gold-light">Sabala Studios</span>
            </div>
            <p className="cs-rise mt-12 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.32em] text-gold-light" style={{ "--cs-d": "0.08s" } as CSSProperties}>
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-gold-light" />
              Für Claude Code
            </p>
            <h1 className="cs-rise mt-6 font-instrument text-cream" style={{ fontSize: "clamp(2.9rem, 7vw, 6rem)", lineHeight: 0.97, letterSpacing: "-0.015em", "--cs-d": "0.14s" } as CSSProperties}>
              Dein Setup für
              <br />
              <span className="italic text-gold-light/90">bessere Webseiten.</span>
            </h1>
            <p className="cs-rise mt-8 max-w-md font-satoshi text-warm-light/85" style={{ fontSize: "clamp(1.02rem, 1.8vw, 1.22rem)", lineHeight: 1.55, "--cs-d": "0.2s" } as CSSProperties}>
              25+ Fähigkeiten, mit denen ich Premium-Webseiten baue. In einer Stunde eingerichtet und auf deinen Brand-Guide und deine Dateien zugeschnitten.
            </p>
            <div className="cs-rise mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center" style={{ "--cs-d": "0.26s" } as CSSProperties}>
              <MagneticCTA href="#kaufen" tone="gold">Jetzt holen · {PRICE}&nbsp;&euro;</MagneticCTA>
              <a href="#drin" className="font-satoshi text-base text-warm-light/70 underline-offset-4 hover:text-gold-light hover:underline">Was ist drin?</a>
            </div>
            <p className="cs-rise mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-warm-light/45" style={{ "--cs-d": "0.32s" } as CSSProperties}>
              Sofort als Download · Einmalzahlung · alle Updates inklusive
            </p>
          </div>
        </div>
      </section>

      {/* ====================== CAPABILITY-MARQUEE ====================== */}
      <section aria-hidden className="overflow-hidden border-y border-gold-light/10 bg-[#14100c] py-6 [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]">
        <div className="flex w-max wd-marquee-track-r gap-3 pr-3">
          {[...CAPABILITIES, ...CAPABILITIES].map((s, i) => (
            <span key={`a${i}`} className="whitespace-nowrap rounded-full border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.015] px-4 py-1.5 font-mono text-[12px] tracking-wide text-warm-light/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_4px_14px_-4px_rgba(0,0,0,0.6)] backdrop-blur-sm">{s}</span>
          ))}
        </div>
        <div className="mt-3 flex w-max wd-marquee-track-l gap-3 pr-3">
          {[...CAPABILITIES.slice().reverse(), ...CAPABILITIES.slice().reverse()].map((s, i) => (
            <span key={`b${i}`} className="whitespace-nowrap rounded-full border border-white/[0.07] bg-gradient-to-b from-white/[0.05] to-white/[0.01] px-4 py-1.5 font-mono text-[12px] tracking-wide text-warm-light/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_4px_14px_-4px_rgba(0,0,0,0.6)] backdrop-blur-sm">{s}</span>
          ))}
        </div>
      </section>

      {/* ====================== IDENTIFIKATION (Pain + grosses Cover) ====================== */}
      <section className="relative overflow-hidden px-6 py-24 sm:px-10 md:px-16 md:py-32" style={{ background: "var(--tech-bg)" }}>
        <SectionBg src="/webdesign-os/backdrop-2.jpg" opacity={0.4} dark />
        <AuroraMesh />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(212,174,90,0.24), transparent 68%)" }} />
            <Image src="/webdesign-os/cover-3d.png" alt="Das Sabala Web Design OS Paket" width={1600} height={1600} priority className="relative mx-auto w-full max-w-[40rem] drop-shadow-[0_45px_95px_rgba(0,0,0,0.55)]" />
          </Reveal>
          <Reveal className="relative">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold-light">Kennst du das?</p>
            <h2 className="mt-5 font-instrument text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.06] tracking-tight text-cream">
              Du baust mit Claude&nbsp;Code, aber es sieht aus wie überall.
            </h2>
            <p className="mt-7 max-w-md font-satoshi text-[17px] leading-relaxed text-warm-light/70">
              Du sitzt dran, gibst Anweisung um Anweisung, und am Ende steht wieder so eine Seite, die man schon hundertmal gesehen hat. Sauber, aber austauschbar. Und du fragst dich, wie andere es schaffen, dass ihre Seiten sofort hochwertig wirken.
            </p>
            <p className="mt-5 max-w-md font-satoshi text-[17px] leading-relaxed text-warm-light/70">
              Der Unterschied ist kein Talent und kein Geheimnis. Es sind die richtigen Werkzeuge in der richtigen Reihenfolge. Die habe ich über Jahre an Erfahrung gesammelt und in vielen Monaten tiefer Arbeit mit Claude Code zu einem Setup verdichtet, mit dem ich heute jede Sabala-Seite baue.
            </p>
            <a href="#drin" className="mt-9 inline-block font-satoshi text-base text-gold-light underline-offset-4 hover:underline">Was drin ist &rarr;</a>
          </Reveal>
        </div>
      </section>

      {/* ====================== BEFORE / AFTER (Gold-Wellen + Glas-3D) ====================== */}
      <section className="relative overflow-hidden px-6 py-24 sm:px-10 md:px-16 md:py-32" style={{ background: "var(--tech-bg)" }}>
        <ShaderBackground className="absolute inset-0 h-full w-full opacity-90" />
        {/* Vignette: Wellen ruhiger an den Raendern, Karten lesbar */}
        <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(130% 90% at 50% 45%, transparent 26%, rgba(10,8,6,0.66) 100%)" }} />
        <div aria-hidden className="absolute inset-x-0 top-0 h-32" style={{ background: "linear-gradient(180deg, var(--tech-bg), transparent)" }} />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-32" style={{ background: "linear-gradient(0deg, var(--tech-bg), transparent)" }} />
        <div className="relative z-10 mx-auto max-w-6xl" style={{ perspective: "1600px" }}>
          <Reveal className="mb-16 max-w-2xl">
            <h2 className="font-instrument text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.05] tracking-tight text-cream">
              Vom braven Ergebnis zur Seite, die hängen bleibt.
            </h2>
          </Reveal>
          <div className="relative grid items-stretch gap-6 md:grid-cols-2 md:gap-10">
            {/* Transformations-Pfeil (Desktop) */}
            <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 md:block">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-light/40 bg-tech-bg/80 text-gold-light shadow-[0_10px_30px_-8px_rgba(0,0,0,0.7)] backdrop-blur-md">
                <ArrowRight size={20} strokeWidth={2} />
              </span>
            </div>
            {/* Vorher (gedaempft, zurueckgesetzt) */}
            <Reveal>
              <div className="h-full rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-9 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_50px_-30px_rgba(0,0,0,0.7)] backdrop-blur-md md:p-11">
                <p className="mb-7 font-mono text-[11px] uppercase tracking-[0.28em] text-warm-light/45">Vorher</p>
                <ul className="space-y-6">
                  {BEFORE.map(({ icon: Ico, t }) => (
                    <li key={t} className="flex items-start gap-4">
                      <span className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-warm-light/45 ring-1 ring-white/5">
                        <Ico size={22} strokeWidth={1.5} />
                      </span>
                      <span className="font-satoshi text-[15px] leading-relaxed text-warm-light/55">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            {/* Nachher (premium, tritt hervor) */}
            <Reveal delay={0.12}>
              <SpotlightCard className="h-full rounded-[1.8rem] border border-gold-light/35 bg-white/[0.06] p-9 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_50px_120px_-40px_rgba(184,150,62,0.5),0_30px_70px_-40px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-transform duration-500 will-change-transform hover:-translate-y-1.5 md:p-11">
                <div aria-hidden className="pointer-events-none absolute -right-10 -top-12 h-44 w-44 rounded-full blur-2xl" style={{ background: "radial-gradient(circle, rgba(212,174,90,0.30), transparent 70%)" }} />
                <p className="relative mb-7 font-mono text-[11px] uppercase tracking-[0.28em] text-gold-light">Nachher</p>
                <ul className="relative space-y-6">
                  {AFTER.map(({ icon: Ico, t }) => (
                    <li key={t} className="flex items-start gap-4">
                      <span className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-tech-bg shadow-[0_10px_24px_-8px_rgba(184,150,62,0.75)]" style={{ background: "linear-gradient(135deg, #D4AE5A, #B8963E)" }}>
                        <Ico size={22} strokeWidth={2} />
                      </span>
                      <span className="font-satoshi text-[15px] leading-relaxed text-cream">{t}</span>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ====================== WAS DRIN IST (DUNKEL, Tabs) ====================== */}
      <section id="drin" className="relative overflow-hidden px-6 py-24 sm:px-10 md:px-16 md:py-32" style={{ background: "linear-gradient(180deg, #1C1814 0%, #0A0806 100%)" }}>
        <SectionBg src="/webdesign-os/backdrop-3.jpg" opacity={0.5} dark />
        <AuroraMesh />
        <div className="relative mx-auto max-w-6xl">
          <Reveal className="mb-12 max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold-light">Was drin ist</p>
            <h2 className="mt-5 font-instrument text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.05] tracking-tight text-cream">
              Alles für den ganzen Weg. In einem Setup.
            </h2>
          </Reveal>
          <WhatsInside />
        </div>
      </section>

      {/* ====================== SHOWCASE (Browser-Peek) ====================== */}
      <section className="px-6 py-24 sm:px-10 md:px-16 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-4 max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#8A6E1F]">Webseiten wie Sabala</p>
            <h2 className="mt-5 font-instrument text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.05] tracking-tight">Gebaut mit genau diesem Setup.</h2>
          </Reveal>
          <Reveal className="mb-14 max-w-xl">
            <p className="font-satoshi text-[17px] leading-relaxed text-warm-steel">
              Vier echte Seiten, live im Netz, alle mit diesem Setup gebaut. Das Werkzeug bekommst du eins zu eins.
              Den letzten Schliff machst du selbst, aber du startest nie wieder bei null.
            </p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {SHOWCASE.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.06}>
                <a href={p.url} target={p.url.startsWith("http") ? "_blank" : undefined} rel={p.url.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group block overflow-hidden rounded-2xl border border-deep-charcoal/10 bg-pure-surface shadow-[0_18px_50px_-30px_rgba(46,43,38,0.5)] transition-shadow hover:shadow-[0_28px_70px_-30px_rgba(184,150,62,0.45)]">
                  <div className="flex items-center gap-2 border-b border-deep-charcoal/8 bg-[#f4f0ea] px-4 py-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-soft-stone/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-soft-stone/40" />
                    <span className="h-2.5 w-2.5 rounded-full bg-soft-stone/30" />
                    <span className="ml-3 truncate rounded-full bg-white px-3 py-0.5 font-mono text-[10.5px] text-warm-steel">{p.host}</span>
                  </div>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={p.img} alt={p.name} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:object-bottom" />
                  </div>
                  <div className="flex items-center justify-between gap-3 px-6 py-5">
                    <p className="font-instrument text-xl text-deep-charcoal">{p.name}</p>
                    <span aria-hidden className="font-satoshi text-sm text-refined-gold transition-transform group-hover:translate-x-1">ansehen &rarr;</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== ABDECKUNG (Donut + Stats, dunkel + Backdrop) ====================== */}
      <section className="relative overflow-hidden px-6 py-24 sm:px-10 md:px-16 md:py-32" style={{ background: "var(--tech-bg)" }}>
        <Image src="/webdesign-os/backdrop-1.jpg" alt="" aria-hidden fill sizes="100vw" className="object-cover opacity-[0.6]" />
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,8,6,0.7), rgba(10,8,6,0.55) 50%, rgba(10,8,6,0.8))" }} />
        <AuroraMesh />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid items-center gap-14 md:grid-cols-[0.85fr_1fr]">
            {/* Donut + Legende */}
            <Reveal>
              <CoverageDonut />
              <div className="mx-auto mt-8 grid max-w-[18rem] grid-cols-2 gap-x-6 gap-y-2.5">
                {PHASES.map((p) => (
                  <span key={p.label} className="flex items-center gap-2 font-satoshi text-[12.5px] text-warm-light/65">
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: p.c }} />
                    {p.label}
                  </span>
                ))}
              </div>
            </Reveal>
            {/* Headline + Stats */}
            <div>
              <Reveal className="mb-10 max-w-md">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold-light">Der ganze Weg</p>
                <h2 className="mt-5 font-instrument text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.06] tracking-tight text-cream">
                  Jede Phase abgedeckt. In einem Setup.
                </h2>
                <p className="mt-5 font-satoshi text-[16px] leading-relaxed text-warm-light/65">
                  Von der ersten Analyse bis zum Live-Gang: alle sechs Phasen greifen ineinander, statt
                  dass du sie einzeln zusammensuchst.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="grid grid-cols-2 gap-x-8 gap-y-10 border-t border-gold-light/12 pt-10">
                  {STATS.map((s) => <StatCounter key={s.label} value={s.v} suffix={s.suffix} label={s.label} />)}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== PREIS (frueh: nach Proof-Cluster) ====================== */}
      <section id="kaufen" className="relative overflow-hidden px-6 py-24 sm:px-10 md:px-16 md:py-32" style={{ background: "linear-gradient(180deg, #2E2B26 0%, #0A0806 100%)" }}>
        <SectionBg src="/webdesign-os/backdrop-5.jpg" opacity={0.5} dark />
        <AuroraMesh />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Buch/Paket gross links */}
          <Reveal className="relative order-2 lg:order-1">
            <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(212,174,90,0.26), transparent 68%)" }} />
            <Image src="/webdesign-os/cover-3d.png" alt="Das Sabala Web Design OS Paket" width={1600} height={1600} className="relative mx-auto w-full max-w-[36rem] drop-shadow-[0_45px_95px_rgba(0,0,0,0.6)]" />
          </Reveal>
          {/* Preis-Karte rechts, kraftvoll, mit Ring dahinter */}
          <Reveal className="relative order-1 lg:order-2">
            {/* Rotierender Gold-Ring hinter der Karte (transparent, kreisrund) */}
            <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(135vw,840px)] -translate-x-1/2 -translate-y-1/2 opacity-90">
              <AnimatedRingBackground />
            </div>
            <div className="relative rounded-[2rem] border border-gold-light/45 p-10 text-center shadow-[0_45px_120px_-40px_rgba(184,150,62,0.55),0_30px_80px_-50px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.10)] backdrop-blur-md md:p-12" style={{ background: "linear-gradient(160deg, rgba(40,36,30,0.55) 0%, rgba(10,8,6,0.42) 100%)" }}>
              <p className="inline-block rounded-full border border-gold-light/40 bg-gold-light/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.28em] text-gold-light">Sabala Web Design OS</p>
              <ul className="mx-auto mt-8 max-w-sm space-y-3.5 text-left">
                {VALUESTACK.map((v) => (
                  <li key={v} className="flex gap-3 font-satoshi text-[15px] leading-snug text-warm-light/90">
                    <span aria-hidden className="mt-0.5 text-gold-light">&#10003;</span>{v}
                  </li>
                ))}
              </ul>
              <div aria-hidden className="mx-auto mt-9 h-px w-full max-w-sm" style={{ background: "linear-gradient(90deg, transparent, rgba(212,174,90,0.4) 50%, transparent)" }} />
              <p className="mx-auto mt-7 max-w-sm font-satoshi text-[14px] leading-relaxed text-warm-light/65">
                Den Stack selbst zusammenzusuchen kostet dich Wochenenden. Das Setup kostet einmal:
              </p>
              <p className="mt-4 font-instrument text-[5.5rem] leading-none text-cream drop-shadow-[0_2px_20px_rgba(212,174,90,0.25)]">{PRICE}&nbsp;&euro;</p>
              <p className="mt-3 font-satoshi text-sm text-gold-light/80">Einmalzahlung · alle Updates inklusive</p>
              <div className="mt-9">
                <MagneticCTA href={CHECKOUT_URL} tone="gold" newTab>Jetzt holen</MagneticCTA>
              </div>
              <p className="mx-auto mt-6 max-w-sm font-satoshi text-[14px] leading-relaxed text-warm-light/70">
                Sofort als Download. In einer Stunde startklar, auf deine Marke zugeschnitten.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================== IMAGINATION (Kern-Botschaft, dunkel) ====================== */}
      <section className="relative overflow-hidden px-6 py-24 sm:px-10 md:px-16 md:py-32" style={{ background: "var(--tech-bg)" }}>
        <Image src="/webdesign-os/backdrop-2.jpg" alt="" aria-hidden fill sizes="100vw" className="object-cover opacity-50" />
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,8,6,0.82), rgba(10,8,6,0.7) 50%, rgba(10,8,6,0.9))" }} />
        <AuroraMesh />
        <div className="relative mx-auto max-w-5xl">
          <Reveal className="mx-auto mb-16 max-w-3xl text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold-light">Der wichtigste Skill</p>
            <h2 className="mt-6 bg-gradient-to-br from-[#EAD08A] via-[#D4AE5A] to-[#B8963E] bg-clip-text font-instrument text-[clamp(2.7rem,8vw,5.8rem)] uppercase leading-[0.92] tracking-[0.01em] text-transparent text-balance drop-shadow-[0_2px_34px_rgba(212,174,90,0.22)]">
              Deine Vorstellungskraft
            </h2>
            <p className="mt-4 font-instrument text-[clamp(1.4rem,3vw,2.2rem)] leading-tight text-cream">
              Das Setup verstärkt sie.
            </p>
            <p className="mx-auto mt-8 max-w-2xl font-satoshi text-[17px] leading-relaxed text-warm-light/70">
              Diese Fähigkeiten bauen nichts ohne dich. Du sagst Claude Code, was du willst, nimmst die besten
              Seiten als Vorlage, und alles greift ineinander. Heraus kommt eine Seite, die heraussticht und
              wirklich deine ist.
            </p>
            <p className="mx-auto mt-6 max-w-xl font-instrument text-[clamp(1.2rem,2.4vw,1.7rem)] leading-snug text-gold-light">
              Keine Vorstellungskraft, kein besonderes Ergebnis. Mit ihr wird das Setup zum Hebel.
            </p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {IMAGINATION.map(({ icon: Ico, t, d }, i) => (
              <Reveal key={t} delay={i * 0.1}>
                <SpotlightCard className="h-full rounded-[1.4rem] border border-gold-light/15 bg-white/[0.03] p-8">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-tech-bg shadow-[0_10px_26px_-10px_rgba(184,150,62,0.8)]" style={{ background: "linear-gradient(135deg, #D4AE5A, #B8963E)" }}>
                    <Ico size={26} strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-5 font-instrument text-xl text-cream">{t}</h3>
                  <p className="mt-2 font-satoshi text-[15px] leading-relaxed text-warm-light/65">{d}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== SO LAEUFT'S AB (visuell: Maske + Stepper) ====================== */}
      <section className="relative overflow-hidden px-6 py-24 sm:px-10 md:px-16 md:py-32" style={{ background: "#EFE9E0" }}>
        <SectionBg src="/webdesign-os/light-2.jpg" opacity={0.4} />
        <div className="relative mx-auto max-w-6xl">
          <Reveal className="mb-14 max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#8A6E1F]">So einfach läuft es ab</p>
            <h2 className="mt-5 font-instrument text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.05] tracking-tight">In einer Stunde startklar.</h2>
            <p className="mt-5 max-w-xl font-satoshi text-[17px] leading-relaxed text-warm-steel">Du fügst ein Briefing in Claude Code ein, beantwortest ein paar Fragen, fertig. Du sprichst mit Claude, der Rest läuft geführt.</p>
          </Reveal>
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            {/* Eingabe-Maske */}
            <Reveal>
              <ClaudeCodeMock />
            </Reveal>
            {/* Stepper: gestaffelte Reveal-Animation + sich zeichnende Linie */}
            <Reveal delay={0.1}>
              <motion.ol
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                variants={{ show: { transition: { staggerChildren: 0.16 } } }}
                className="relative space-y-9"
              >
                <motion.span
                  aria-hidden
                  className="absolute left-[27px] top-5 bottom-5 w-px origin-top bg-gradient-to-b from-refined-gold/50 via-refined-gold/25 to-refined-gold/5"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
                {STEPS.map((s, i) => (
                  <motion.li
                    key={s.t}
                    variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex items-start gap-5"
                  >
                    <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-refined-gold/45 bg-[#EFE9E0] font-instrument text-2xl text-refined-gold shadow-[0_6px_20px_-12px_rgba(184,150,62,0.55)]">
                      {i + 1}
                    </span>
                    <div className="pt-2.5">
                      <h3 className="font-instrument text-xl text-deep-charcoal">{s.t}</h3>
                      <p className="mt-1.5 font-satoshi text-[15px] leading-relaxed text-warm-steel">{s.d}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ol>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ====================== VORAUSSETZUNG: CLAUDE CODE ====================== */}
      <section className="relative overflow-hidden border-y border-deep-charcoal/8 bg-pure-surface px-6 py-20 sm:px-10 md:px-16 md:py-24">
        <SectionBg src="/webdesign-os/light-2.jpg" opacity={0.35} />
        <Reveal className="relative mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-5">
            <ClaudeLogo size={38} />
            <span className="font-instrument text-2xl text-soft-stone">&times;</span>
            <SabalaLogo size={38} />
          </div>
          <h2 className="mt-8 font-instrument text-[clamp(1.8rem,3.6vw,2.8rem)] leading-tight text-deep-charcoal">Läuft in Claude Code.</h2>
          <p className="mx-auto mt-5 max-w-xl font-satoshi text-[16px] leading-relaxed text-warm-steel">
            Das Setup arbeitet in Claude Code, der KI-Entwicklungsumgebung von Anthropic. Du brauchst ein Claude-Abo
            (Pro oder höher). Hast du das, bist du in einer Stunde startklar.
          </p>
        </Reveal>
      </section>

      {/* ====================== DREI PRINZIPIEN ====================== */}
      <section className="relative overflow-hidden px-6 py-24 sm:px-10 md:px-16 md:py-32" style={{ background: "var(--tech-bg)" }}>
        <SectionBg src="/webdesign-os/backdrop-4.jpg" opacity={0.5} dark />
        <AuroraMesh />
        <div className="relative mx-auto max-w-5xl">
          <Reveal className="mb-16 text-center">
            <h2 className="font-instrument text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.05] tracking-tight text-cream">Warum es sich anders anfühlt.</h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {PRINCIPLES.map(({ icon: Ico, t, d }, i) => (
              <Reveal key={t} delay={i * 0.1}>
                <SpotlightCard className="h-full rounded-[1.4rem] border border-gold-light/15 bg-white/[0.03] p-8">
                  <motion.div
                    aria-hidden
                    animate={{ y: [0, -7, 0] }}
                    transition={{ duration: 3.2 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                    className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-gold-light/30 bg-gold-light/10 text-gold-light shadow-[inset_0_1px_0_rgba(212,174,90,0.15)]"
                  >
                    <Ico size={26} strokeWidth={1.6} />
                  </motion.div>
                  <h3 className="font-instrument text-2xl text-gold-light">{t}</h3>
                  <p className="mt-3 font-satoshi text-[15px] leading-relaxed text-warm-light/70">{d}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== TRANSFORMATION + FOUNDER ====================== */}
      <section className="relative overflow-hidden px-6 py-24 sm:px-10 md:px-16 md:py-32">
        <SectionBg src="/webdesign-os/light-1.jpg" opacity={0.32} />
        <div className="relative mx-auto max-w-6xl">
          <Reveal className="mb-14 max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#8A6E1F]">Was sich ändert</p>
            <h2 className="mt-5 font-instrument text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.06] tracking-tight">Wenn du so arbeitest.</h2>
          </Reveal>
          <div className="grid gap-12 md:grid-cols-[1fr_0.85fr] md:items-center">
            {/* Future benefits */}
            <div className="grid gap-4 sm:grid-cols-2">
              {TRANSFORM.map(({ icon: Ico, t }, i) => (
                <Reveal key={t} delay={i * 0.07}>
                  <div className="h-full rounded-2xl border border-deep-charcoal/10 bg-pure-surface p-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl text-tech-bg shadow-[0_10px_24px_-10px_rgba(184,150,62,0.75)]" style={{ background: "linear-gradient(135deg, #D4AE5A, #B8963E)" }}>
                      <Ico size={23} strokeWidth={1.9} />
                    </span>
                    <p className="mt-5 font-satoshi text-[15.5px] leading-snug text-deep-charcoal">{t}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            {/* Founder (Farbe) */}
            <Reveal delay={0.12}>
              <figure className="rounded-[1.8rem] border border-deep-charcoal/8 bg-pure-surface p-8 shadow-[0_30px_80px_-46px_rgba(46,43,38,0.5)]">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-1 ring-refined-gold/30">
                    <Image src="/ilja-portrait.png" alt="Ilja Krasevskij" fill sizes="64px" className="object-cover" />
                  </div>
                  <figcaption>
                    <p className="font-satoshi text-lg text-deep-charcoal">Ilja Krasevskij</p>
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-warm-steel">Sabala Studios</p>
                  </figcaption>
                </div>
                <blockquote className="mt-6 font-instrument text-[1.5rem] leading-[1.4] text-deep-charcoal/90">
                  {"„"}Ich gebe dir kein Tutorial. Ich gebe dir mein Werkzeug.{"“"}
                </blockquote>
                <div className="mt-7">
                  <MagneticCTA href={CHECKOUT_URL} tone="dark" newTab>Jetzt holen · {PRICE}&nbsp;&euro;</MagneticCTA>
                </div>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ====================== FAQ ====================== */}
      <section className="relative overflow-hidden px-6 py-24 sm:px-10 md:px-16 md:py-28" style={{ background: "#0A0806" }}>
        {/* Cybernetic-Grid als unterste Layer */}
        <CyberneticGridShader className="absolute inset-0 h-full w-full opacity-55" />
        {/* CRT-Scanlines + Gold-Glow oben */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent 0 2px, rgba(0,0,0,0.35) 2px 4px)" }} />
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(120% 80% at 50% 0%, rgba(184,150,62,0.12), transparent 60%)" }} />
        <div className="relative mx-auto max-w-2xl">
          <Reveal className="mb-12 text-center">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto mb-6 w-28 md:w-32"
            >
              <Image src="/webdesign-os/mooni-pixel.png" alt="Mooni, der Sabala-Pixel-Bot" width={576} height={576} className="mx-auto h-auto w-full [image-rendering:pixelated]" />
            </motion.div>
            <p className="font-pixel text-[10px] tracking-wider text-gold-light/70">&gt; BONUS LEVEL</p>
            <h2 className="font-pixel mt-5 text-[clamp(1.7rem,5vw,2.6rem)] leading-none text-gold-light drop-shadow-[3px_3px_0_rgba(0,0,0,0.7)]">FAQ</h2>
            <p className="mt-5 font-mono text-[12px] uppercase tracking-[0.2em] text-warm-light/55">Häufige Fragen, schnell beantwortet</p>
          </Reveal>
          <div className="space-y-4">
            {FAQ.map((f) => (
              <details key={f.q} className="group border-2 border-gold-light/40 bg-[#14100c] p-5 shadow-[5px_5px_0_0_rgba(184,150,62,0.45)] transition-all open:border-gold-light/70 open:shadow-[2px_2px_0_0_rgba(184,150,62,0.75)] md:p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-mono text-[13px] uppercase tracking-wide text-gold-light marker:hidden">
                  <span>{f.q}</span>
                  <span aria-hidden className="font-pixel shrink-0 text-[12px] text-gold-light transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 font-satoshi text-[14.5px] leading-relaxed text-warm-light/70">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
