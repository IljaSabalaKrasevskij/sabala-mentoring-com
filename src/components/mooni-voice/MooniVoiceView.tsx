"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal, TiltCard, Eyebrow, GoldCTA } from "@/components/akademie/shared";

/* Mooni Voice: Premium-Produktseite im Sabala-Hausstil (Hybrid):
   dunkler, immersiver Bernstein-Hero mit animierter Voice-Wave + Cream/Gold-Body
   mit klarer Problem-zu-Loesung-Story. Sabala-Tokens + Bausteine wiederverwendet. */

const AMBER = "#E8A33D";
const AMBER_HI = "#F2C572";
const AMBER_SOFT = "rgba(232,163,61,0.16)";
const DMG_URL = "/downloads/mooni-voice.dmg";
const REPO_URL = "https://github.com/IljaSabalaKrasevskij/mooni-voice";

/* ── Inline-SVG-Icons (Lucide-Stil, einheitlicher Stroke 1.7) ───────────── */
const PATHS: Record<string, string> = {
  layers: "M12 2 2 7l10 5 10-5-10-5Z M2 17l10 5 10-5 M2 12l10 5 10-5",
  lock: "M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0v4",
  zap: "M13 2 3 14h7l-1 8 10-12h-7l1-8Z",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z M14 2v6h6 M9 13h6 M9 17h6",
  cpu: "M6 6h12v12H6z M9 9h6v6H9z M9 2v2 M15 2v2 M9 20v2 M15 20v2 M2 9h2 M2 15h2 M20 9h2 M20 15h2",
  code: "M16 18l6-6-6-6 M8 6l-6 6 6 6",
  cloud: "M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.7-1.5A4 4 0 0 0 6 19h11.5Z M4 4l16 16",
  terminal: "M4 17l6-6-6-6 M12 19h8",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z M12 6v6l4 2",
  mic: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v3",
  github: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-1-2.6c3-.3 6-1.5 6-6.5a5 5 0 0 0-1.4-3.5 4.7 4.7 0 0 0-.1-3.5s-1.1-.3-3.5 1.3a12 12 0 0 0-6.4 0C6.3.7 5.2 1 5.2 1a4.7 4.7 0 0 0-.1 3.5A5 5 0 0 0 3.7 8c0 5 3 6.2 6 6.5a3.4 3.4 0 0 0-1 2.6V21",
};
function Ic({ name, size = 22, color = AMBER, stroke = 1.7 }: { name: string; size?: number; color?: string; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {PATHS[name].split(" M").map((d, i) => (
        <path key={i} d={i === 0 ? d : "M" + d} />
      ))}
    </svg>
  );
}

/* Mooni-Roboterkopf-Logo */
function MooniLogo({ size = 96 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 1024 1024" aria-hidden style={{ filter: "drop-shadow(0 0 24px rgba(232,163,61,0.35))" }}>
      <rect x="100" y="100" width="824" height="824" rx="185" fill="#1E1B2E" />
      <rect x="499" y="219" width="26" height="80" rx="13" fill={AMBER} />
      <circle cx="512" cy="188" r="30" fill={AMBER} />
      <rect x="273" y="295" width="478" height="420" rx="146" fill="#F5F2EC" />
      <polygon points="372,700 372,786 452,706" fill="#F5F2EC" />
      <circle cx="442" cy="470" r="55" fill={AMBER} />
      <circle cx="582" cy="470" r="55" fill={AMBER} />
      <circle cx="423" cy="448" r="19" fill="#fff" />
      <circle cx="563" cy="448" r="19" fill="#fff" />
    </svg>
  );
}

/* ── Voice-Wave: animierte Podcast-Tonspur (Canvas, reduced-motion-sicher) ── */
function drawWave(cx: CanvasRenderingContext2D, w: number, h: number, N: number, t: number, reduce: boolean) {
  const mid = h / 2;
  const bw = w / N;
  cx.clearRect(0, 0, w, h);
  for (let i = 0; i < N; i++) {
    const env = Math.sin((i / (N - 1)) * Math.PI); // höher in der Mitte
    const wave = reduce ? 0.45 : Math.sin(i * 0.38 + t) * 0.5 + Math.sin(i * 0.12 - t * 1.5) * 0.5;
    const amp = (0.1 + Math.abs(wave) * 0.6) * env;
    const bh = Math.max(2, amp * h);
    const x = i * bw + bw * 0.5;
    const g = cx.createLinearGradient(0, mid - bh / 2, 0, mid + bh / 2);
    g.addColorStop(0, "rgba(242,197,114,0.95)");
    g.addColorStop(1, "rgba(232,163,61,0.2)");
    cx.fillStyle = g;
    const bwidth = Math.max(2, bw * 0.42);
    const bx = x - bwidth / 2;
    const by = mid - bh / 2;
    if (typeof cx.roundRect === "function") {
      cx.beginPath();
      cx.roundRect(bx, by, bwidth, bh, bwidth / 2);
      cx.fill();
    } else {
      cx.fillRect(bx, by, bwidth, bh);
    }
  }
}

function VoiceWave({ height = 130 }: { height?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    const cx = cv?.getContext("2d");
    if (!cv || !cx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const N = 72;
    let raf = 0;
    let t = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.max(1, Math.floor(cv.clientWidth * dpr));
      cv.height = Math.max(1, Math.floor(cv.clientHeight * dpr));
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const loop = () => {
      drawWave(cx, cv.clientWidth, cv.clientHeight, N, t, reduce);
      if (!reduce) {
        t += 0.05;
        raf = requestAnimationFrame(loop);
      }
    };
    resize();
    window.addEventListener("resize", resize);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={ref} aria-hidden style={{ width: "100%", height, display: "block" }} />;
}

/* ── App-Fenster-Mockup: zeigt die echte dunkle Mooni-Oberflaeche ────────── */
const NAV = ["Allgemein", "Modelle", "Erweitert", "Verlauf", "Nachbearbeitung", "Info"];
function AppMockup() {
  return (
    <div className="overflow-hidden rounded-2xl" style={{ background: "#15131F", border: "1px solid rgba(232,163,61,0.22)", boxShadow: "0 40px 90px rgba(0,0,0,0.55)" }}>
      <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#1b1827", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
        <span className="mx-auto font-mono text-[11px]" style={{ color: "#8b84a0" }}>Mooni Voice</span>
      </div>
      <div className="flex" style={{ minHeight: 232 }}>
        <div className="hidden w-[40%] flex-col gap-1 p-3 sm:flex" style={{ borderRight: "1px solid rgba(255,255,255,0.05)" }}>
          {NAV.map((n) => {
            const active = n === "Nachbearbeitung";
            return (
              <div key={n} className="rounded-lg px-3 py-2 text-[12px]"
                style={active
                  ? { background: AMBER, color: "#1a1206", fontWeight: 600 }
                  : { color: "#9b93ac" }}>
                {n}
              </div>
            );
          })}
        </div>
        <div className="flex-1 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: AMBER }}>Live-Kontext (Mooni)</p>
          <div className="mt-3 rounded-lg px-3 py-2.5 text-[12px]" style={{ background: "rgba(255,255,255,0.05)", color: "#cfc9da" }}>
            ~/Documents/mooni-context.md
          </div>
          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "#6f6886" }}>Aufnahme</p>
          <div className="mt-3 flex h-[64px] items-center gap-[3px] rounded-lg px-3" style={{ background: "rgba(0,0,0,0.25)" }}>
            {Array.from({ length: 30 }).map((_, i) => (
              <span key={i} className="w-[3px] rounded-full"
                style={{ height: `${10 + Math.abs(Math.sin(i * 0.7)) * 40}px`, background: i % 2 ? AMBER : AMBER_HI, opacity: 0.85 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Cycling-Demo: Stimme landet im jeweiligen Tool ─────────────────────── */
const DEMO = [
  { app: "Terminal", prompt: "~ $ ", text: 'git commit -m "lokale Sprache-zu-Text, endlich"' },
  { app: "Claude Code", prompt: "> ", text: "baue mir eine Vercel-Funktion für die Lead-Erfassung" },
  { app: "LinkedIn", prompt: "", text: "Hey, danke für die Nachricht. Sehr gern, lass uns sprechen." },
  { app: "Mail", prompt: "", text: "Hallo Team, kurzes Update: die Beta läuft rund." },
];
function DemoWindow() {
  const [i, setI] = useState(0);
  const [shown, setShown] = useState("");
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cur = DEMO[i];
    if (reduce) {
      setShown(cur.text);
      const t = setTimeout(() => setI((v) => (v + 1) % DEMO.length), 3200);
      return () => clearTimeout(t);
    }
    setShown("");
    let j = 0;
    let advance: ReturnType<typeof setTimeout>;
    const iv = setInterval(() => {
      j += 1;
      setShown(cur.text.slice(0, j));
      if (j >= cur.text.length) {
        clearInterval(iv);
        advance = setTimeout(() => setI((v) => (v + 1) % DEMO.length), 2000);
      }
    }, 42);
    return () => {
      clearInterval(iv);
      clearTimeout(advance);
    };
  }, [i]);
  const cur = DEMO[i];
  return (
    <div className="overflow-hidden rounded-2xl" style={{ background: "#0a0810", border: "1px solid rgba(232,163,61,0.22)", boxShadow: "0 40px 90px rgba(0,0,0,0.5)" }}>
      <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#13101c", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
        <span className="ml-2 font-mono text-[11px]" style={{ color: "#8b84a0" }}>{cur.app}</span>
      </div>
      <div className="min-h-[150px] px-5 py-5 font-mono text-[13px] leading-relaxed sm:text-sm" style={{ color: "#F5F2EC" }}>
        <span style={{ color: AMBER }}>{cur.prompt}</span>
        <span>{shown}</span>
        <span className="ml-0.5 inline-block h-4 w-2 animate-pulse align-middle" style={{ background: AMBER }} />
        <div className="mt-4 flex items-center gap-2 font-sans text-[12px]" style={{ color: "#8b84a0" }}>
          <Ic name="mic" size={14} />
          höre zu …
        </div>
      </div>
    </div>
  );
}

/* ── Inhalts-Daten ──────────────────────────────────────────────────────── */
const PROBLEMS = [
  { icon: "cloud", title: "Deine Stimme in der Cloud", body: "Die üblichen Diktier-Tools schicken deine Stimme an fremde Server. Bei sensiblen Mails, Code oder Ideen ein echtes Risiko." },
  { icon: "terminal", title: "Kein Diktat, wo du arbeitest", body: "In Claude Code, im Terminal, in Antigravity gibt es schlicht keine Stimme. Genau dort tippst du am meisten." },
  { icon: "clock", title: "Tippen bremst dein Denken", body: "Du denkst schneller, als du tippst. Jede Mail, jede LinkedIn-Antwort kostet Zeit, die der Gedanke nicht hat." },
];
const BENEFITS = [
  { icon: "layers", title: "Überall", body: "Jedes Textfeld, auch die Dev- und KI-Tools, die andere ignorieren: Terminal, Claude Code, Antigravity." },
  { icon: "lock", title: "100 % lokal", body: "Die Erkennung läuft komplett offline auf deinem Mac. Deine Stimme verlässt das Gerät nie." },
  { icon: "zap", title: "Bis zu 3x schneller", body: "Sprechen schlägt Tippen, deutlich. Der Gedanke ist raus, bevor er weg ist." },
  { icon: "file", title: "Kennt deine Wörter", body: "Verknüpf eine lokale Datei (z. B. deine CLAUDE.md), die Mooni live mitliest. Eigennamen und Stil sitzen." },
  { icon: "cpu", title: "Dein Modell", body: "Wähle lokale Modelle (Parakeet, Whisper). Die optionale KI-Politur läuft über dein eigenes Ollama-Modell." },
  { icon: "code", title: "Gratis & Open Source", body: "Kein Abo, kein Konto. Quelloffen unter MIT, ein Fork von Handy (cjpais). Bleibt für immer gratis." },
];
const STEPS = [
  { n: "1", title: "Drücken", body: "In ein beliebiges Textfeld klicken und Option + Leertaste halten. Ein Modell hast du einmalig geladen, alles offline." },
  { n: "2", title: "Sprechen", body: "Sag, was du denkst. Deutsch, Englisch und 23 weitere Sprachen erkennt Mooni automatisch, du darfst sogar mischen." },
  { n: "3", title: "Steht da", body: "Loslassen, und der Text erscheint dort, wo dein Cursor steht. Auf Wunsch poliert ein lokales KI-Modell ihn noch." },
];
const FAQ = [
  { q: "Ist es wirklich privat?", a: "Ja. Die Spracherkennung läuft offline auf deinem Mac. Nichts geht an einen Server." },
  { q: "Welche Sprachen?", a: "Deutsch und Englisch automatisch, plus 23 weitere europäische Sprachen (Parakeet). Mit Whisper Large rund 99 Sprachen." },
  { q: "Nur Mac?", a: "Ja, Mac mit Apple-Chip (M1+), macOS 14 oder neuer. Windows evtl. später." },
  { q: "Was ist die KI-Politur / der Live-Kontext?", a: "Optional: Ein lokales KI-Modell (Ollama) räumt deinen Text auf und kann eine lokale Datei mit deinem Vokabular und Stil live mitlesen. Für Profis; das normale Diktat braucht das nicht." },
  { q: "Kann ich den Code sehen und mitentwickeln?", a: "Ja. Mooni Voice ist Open Source (MIT). Der komplette Quellcode liegt auf GitHub, Pull Requests sind willkommen." },
  { q: "Was, wenn macOS die App als nicht verifiziert meldet?", a: "Normal bei einer freien App. Einmal Rechtsklick auf die App, dann Öffnen. Die App ist quelloffen und ungefährlich." },
];

export default function MooniVoiceView() {
  const [vorname, setVorname] = useState("");
  const [email, setEmail] = useState("");
  const [fax, setFax] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const downloadRef = useRef<HTMLAnchorElement>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      await fetch("/api/mooni-voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vorname, email, fax }),
      });
    } catch {
      /* Leadmagnet: Download nie am Netzwerk scheitern lassen */
    }
    setBusy(false);
    setDone(true);
    setTimeout(() => downloadRef.current?.click(), 300);
  }

  return (
    <main className="overflow-x-hidden" style={{ background: "var(--cream)", color: "var(--deep)" }}>
      {/* ── HERO (dunkel, immersiv, Voice-Wave) ─────────────────────────── */}
      <section className="relative px-6 pb-20 pt-32 text-center" style={{ background: "var(--tech-bg)", color: "#F5F2EC" }}>
        <div className="pointer-events-none absolute left-1/2 top-0 h-[70vh] w-[95vw] -translate-x-1/2" style={{ background: `radial-gradient(ellipse at top, ${AMBER_SOFT}, transparent 62%)` }} />
        <div className="relative mx-auto max-w-3xl">
          <Reveal>
            <div className="animate-float-slow mx-auto mb-7 inline-block">
              <MooniLogo size={100} />
            </div>
          </Reveal>
          <Eyebrow color={AMBER}>Lokal · Open Source · Gratis</Eyebrow>
          <Reveal delay={0.05}>
            <h1 className="mt-5 font-serif leading-[1.02]" style={{ fontSize: "clamp(2.7rem, 7.5vw, 5.2rem)", textShadow: "0 0 32px rgba(232,163,61,0.25)" }}>
              Sprich. Es steht da.<br />Überall.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-lg" style={{ color: "#b8b1c2" }}>
              Mooni Voice macht aus deiner Stimme Text, in jeder App auf dem Mac. Auch dort,
              wo es nie eine Stimme gab: Claude Code, Terminal, Mail, LinkedIn. Komplett offline.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.16}>
          <div className="relative mx-auto mt-10 max-w-2xl">
            <VoiceWave height={130} />
          </div>
        </Reveal>
        <Reveal delay={0.22}>
          <div className="mt-8 flex flex-col items-center gap-5">
            <GoldCTA href="#download" large>Kostenlos holen</GoldCTA>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "#8b84a0" }}>
              <span>100 % lokal</span><span>·</span><span>keine Cloud</span><span>·</span><span>DE &amp; EN</span><span>·</span><span>MIT-Lizenz</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── IN AKTION (Produktbild + Tool-Demo) ─────────────────────────── */}
      <section className="px-6 py-[13vh]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <Eyebrow>So sieht es aus</Eyebrow>
            <Reveal>
              <h2 className="mt-5 font-serif leading-[1.1]" style={{ fontSize: "clamp(2rem, 4.4vw, 3.2rem)" }}>
                Deine Stimme, direkt in den Tools, in denen du lebst.
              </h2>
            </Reveal>
          </div>
          <div className="mt-12 grid items-center gap-6 lg:grid-cols-2">
            <Reveal><AppMockup /></Reveal>
            <Reveal delay={0.08}><DemoWindow /></Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-8 max-w-xl text-center text-[15px]" style={{ color: "var(--warm-mid)" }}>
              Links die App mit deiner verknüpften Live-Kontext-Datei. Rechts, wie der diktierte
              Text live im Terminal, in Claude Code oder einer Mail landet.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── PROBLEM (cream) ─────────────────────────────────────────────── */}
      <section className="px-6 pb-[13vh]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <Eyebrow>Das Problem</Eyebrow>
            <Reveal>
              <h2 className="mt-5 font-serif leading-[1.1]" style={{ fontSize: "clamp(2rem, 4.4vw, 3.2rem)" }}>
                Die Reibung, die du den ganzen Tag nicht mehr bemerkst.
              </h2>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {PROBLEMS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl p-7" style={{ background: "#FFFFFF", border: "1px solid rgba(181,176,168,0.3)" }}>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "rgba(184,150,62,0.10)" }}>
                    <Ic name={p.icon} color="var(--gold)" />
                  </div>
                  <h3 className="font-serif text-xl">{p.title}</h3>
                  <p className="mt-2 text-[15px]" style={{ color: "var(--warm-mid)" }}>{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SO ARBEITEST DU DAMIT (cream) ───────────────────────────────── */}
      <section className="px-6 pb-[13vh]">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <Eyebrow>So arbeitest du damit</Eyebrow>
            <Reveal>
              <h2 className="mt-5 font-serif leading-[1.1]" style={{ fontSize: "clamp(2rem, 4.4vw, 3.2rem)" }}>
                Drücken. Sprechen. Steht da.
              </h2>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.07}>
                <div className="relative h-full overflow-hidden rounded-2xl p-7" style={{ background: "#FFFFFF", border: "1px solid rgba(181,176,168,0.3)" }}>
                  <span className="font-serif text-5xl" style={{ color: "rgba(184,150,62,0.22)" }}>{s.n}</span>
                  <h3 className="mt-2 font-serif text-xl">{s.title}</h3>
                  <p className="mt-2 text-[15px]" style={{ color: "var(--warm-mid)" }}>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS (cream, TiltCards + SVG-Icons) ─────────────────────── */}
      <section className="px-6 pb-[13vh]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <Eyebrow>Warum Mooni Voice</Eyebrow>
            <Reveal>
              <h2 className="mt-5 font-serif leading-[1.1]" style={{ fontSize: "clamp(2rem, 4.4vw, 3.2rem)" }}>
                In deinen Worten, auf deinem Gerät.
              </h2>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.05}>
                <TiltCard className="h-full" radius={18}>
                  <div className="h-full rounded-[18px] p-7" style={{ background: "#FFFFFF", border: "1px solid rgba(181,176,168,0.3)" }}>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "rgba(184,150,62,0.10)" }}>
                      <Ic name={b.icon} color="var(--gold)" />
                    </div>
                    <h3 className="font-serif text-xl">{b.title}</h3>
                    <p className="mt-2 text-[15px]" style={{ color: "var(--warm-mid)" }}>{b.body}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── VERGLEICH (cream) ───────────────────────────────────────────── */}
      <section className="px-6 pb-[13vh]">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <Eyebrow>Der Unterschied</Eyebrow>
            <Reveal>
              <h2 className="mt-5 font-serif leading-[1.1]" style={{ fontSize: "clamp(2rem, 4.4vw, 3.2rem)" }}>
                Lokal und quelloffen, nicht Cloud und Abo.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.05}>
            <div className="mt-10 overflow-x-auto rounded-2xl" style={{ border: "1px solid rgba(181,176,168,0.3)" }}>
              <table className="w-full border-collapse text-left text-[15px]">
                <thead>
                  <tr style={{ color: "var(--warm-mid)" }}>
                    <th scope="col" className="p-4 font-medium"></th>
                    <th scope="col" className="p-4 font-mono text-[12px] uppercase tracking-[0.1em]" style={{ color: "var(--gold)" }}>Mooni Voice</th>
                    <th scope="col" className="p-4 font-medium">Wispr / superwhisper</th>
                    <th scope="col" className="p-4 font-medium">Apple-Diktat</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Preis", "gratis · open source", "Abo", "gratis"],
                    ["Deine Daten", "100 % lokal", "teils Cloud", "Cloud"],
                    ["In Dev-/KI-Tools", "ja", "teils", "nein"],
                    ["Eigenes Vokabular", "ja", "teils", "nein"],
                    ["Modell-Wahl", "ja", "nein", "nein"],
                  ].map((row) => (
                    <tr key={row[0]} style={{ borderTop: "1px solid rgba(181,176,168,0.3)" }}>
                      <th scope="row" className="p-4 font-normal" style={{ color: "var(--warm-mid)" }}>{row[0]}</th>
                      <td className="p-4 font-medium" style={{ background: "rgba(184,150,62,0.06)", color: "var(--deep)" }}>{row[1]}</td>
                      <td className="p-4" style={{ color: "var(--warm-mid)" }}>{row[2]}</td>
                      <td className="p-4" style={{ color: "var(--warm-mid)" }}>{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── DOWNLOAD (dunkel, Voice-Wave-Akzent) ────────────────────────── */}
      <section id="download" className="relative scroll-mt-16 px-6 py-[14vh]" style={{ background: "var(--tech-bg)", color: "#F5F2EC" }}>
        <div className="pointer-events-none absolute left-1/2 top-0 h-[50vh] w-[85vw] -translate-x-1/2" style={{ background: `radial-gradient(ellipse at top, ${AMBER_SOFT}, transparent 68%)` }} />
        <div className="relative mx-auto max-w-md text-center">
          <Eyebrow color={AMBER}>Hol es dir</Eyebrow>
          <h2 className="mt-5 font-serif leading-[1.08]" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", textShadow: "0 0 28px rgba(232,163,61,0.22)" }}>
            Kostenlos. Open Source.<br />Für immer deins.
          </h2>
          <div className="mx-auto mt-7 max-w-[260px] opacity-90">
            <VoiceWave height={56} />
          </div>
          {!done ? (
            <form onSubmit={onSubmit} className="mt-6 text-left">
              <p className="mb-5 text-center text-[15px]" style={{ color: "#b8b1c2" }}>
                Trag dich ein und lade sofort herunter. Gratis und Open Source, du zahlst nie.
              </p>
              <input
                type="text" value={vorname} onChange={(e) => setVorname(e.target.value)}
                placeholder="Dein Name" required autoComplete="given-name" aria-label="Dein Name"
                className="mb-3 w-full rounded-xl px-4 py-3.5 font-sans text-[15px] outline-none transition-colors focus:border-[color:var(--gold)]"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(232,163,61,0.25)", color: "#F5F2EC" }}
              />
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Deine E-Mail" required autoComplete="email" aria-label="Deine E-Mail"
                className="mb-4 w-full rounded-xl px-4 py-3.5 font-sans text-[15px] outline-none transition-colors focus:border-[color:var(--gold)]"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(232,163,61,0.25)", color: "#F5F2EC" }}
              />
              <input type="text" tabIndex={-1} autoComplete="off" value={fax} onChange={(e) => setFax(e.target.value)}
                aria-hidden style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />
              <button
                type="submit" disabled={busy}
                className="w-full rounded-xl py-4 font-sans font-semibold transition-opacity disabled:opacity-60"
                style={{ background: AMBER, color: "#1a1206", letterSpacing: "0.04em" }}
              >
                {busy ? "Moment …" : "Kostenlos herunterladen"}
              </button>
            </form>
          ) : (
            <div className="mt-6">
              <p className="font-serif text-2xl">Danke{vorname ? `, ${vorname}` : ""}.</p>
              <a
                ref={downloadRef} href={DMG_URL} download
                className="mt-5 inline-block w-full rounded-xl py-4 font-sans font-semibold"
                style={{ background: AMBER, color: "#1a1206", letterSpacing: "0.04em" }}
              >
                Mooni Voice herunterladen (.dmg)
              </a>
              <div className="mt-6 text-left font-sans text-[14px] leading-relaxed" style={{ color: "#b8b1c2" }}>
                <p><b style={{ color: "#F5F2EC" }}>1.</b> DMG öffnen, in den Ordner Programme ziehen.</p>
                <p><b style={{ color: "#F5F2EC" }}>2.</b> Erster Start: Rechtsklick auf die App, dann Öffnen.</p>
                <p><b style={{ color: "#F5F2EC" }}>3.</b> Mikrofon + Bedienungshilfen erlauben, Parakeet laden, fertig.</p>
              </div>
            </div>
          )}
          <a
            href={REPO_URL} target="_blank" rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.08em] transition-opacity hover:opacity-80"
            style={{ color: AMBER }}
          >
            <Ic name="github" size={15} color={AMBER} />
            Code auf GitHub ansehen
          </a>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: "#6f6886" }}>
            Open Source · MIT · ein Fork von Handy (cjpais)
          </p>
        </div>
      </section>

      {/* ── FAQ (cream) ─────────────────────────────────────────────────── */}
      <section className="px-6 py-[13vh]">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <Eyebrow>Fragen</Eyebrow>
            <Reveal>
              <h2 className="mt-5 font-serif leading-[1.1]" style={{ fontSize: "clamp(2rem, 4.4vw, 3.2rem)" }}>
                Die ehrlichen Antworten.
              </h2>
            </Reveal>
          </div>
          <div className="mt-10">
            {FAQ.map((f) => (
              <details key={f.q} className="group border-b py-5" style={{ borderColor: "rgba(181,176,168,0.3)" }}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg">
                  {f.q}
                  <span className="font-mono text-xl transition-transform group-open:rotate-45" style={{ color: "var(--gold)" }}>+</span>
                </summary>
                <p className="mt-3 text-[15px]" style={{ color: "var(--warm-mid)" }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
