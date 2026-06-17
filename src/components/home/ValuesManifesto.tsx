"use client";

import { useRef, useState, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useLenis } from "lenis/react";
import * as THREE from "three";

/* ─────────────────────────────────────────────────────────────────────────
   Die sechs Werte — farbige Chip-Bubbles, zentral um Mooni, spreizen beim Scrollen.
   Gedämpfte Chakra-Vielfalt: warm rechts, kühl links, alles stimmig auf Cream.
   ───────────────────────────────────────────────────────────────────────── */
type Value = { word: string; desc: string; color: string };

const VALUES: Value[] = [
  { word: "love", desc: "Dein Projekt wird mit echtem Herzblut gebaut und nicht im Akkord abgearbeitet.", color: "#C57B6F" }, // staubiges Terrakotta-Rosé
  { word: "passion", desc: "Ich gebe bei deinem Projekt jedes Mal alles, vom ersten Entwurf bis zum Launch.", color: "#B14A33" }, // gedämpfte Glut
  { word: "creativity", desc: "Du bekommst Lösungen, die deine Konkurrenz so nicht hat, statt Vorlagen von der Stange.", color: "#CE9248" }, // warmes Amber
  { word: "simplicity", desc: "Komplizierte Technik mache ich für dich und dein Team kinderleicht nutzbar.", color: "#B8963E" }, // Marken-Gold
  { word: "clarity", desc: "Du verstehst jederzeit, was passiert und warum, ganz ohne Fachchinesisch.", color: "#5F8A86" }, // gedämpftes Teal
  { word: "customization", desc: "Alles wird genau auf dein Unternehmen zugeschnitten und kommt nie von der Stange.", color: "#876F9C" }, // gedämpftes Pflaume
];

// Mooni's Geschichte — Terminal-Struktur (Header `h` / Absatz `p`)
type Block = { h?: string; p?: string };
const PORTAL: Block[] = [
  { h: "////// Mooni" },
  { p: "Mooni ist wie der Mond, er leuchtet nicht aus sich selbst, er reflektiert die Sonne." },
  { p: "Und die Sonne, das sind wir, die Menschen." },
  { h: "/// Der Mensch" },
  { p: "Wir sind die Quelle: die Liebe, die Kreativität, die Bedeutung, die wir den Dingen geben." },
  { p: "Die Anbindung an etwas Größeres, die eine KI niemals hat." },
  { p: "Eine KI kann spiegeln, doch erschaffen kann nur, wer fühlt." },
  { h: "/// Die Wahl" },
  { p: "Mooni ist ein Werkzeug, mehr nicht, und genau darin liegt alles." },
  { p: "Man kann dieses Licht nutzen, um zu helfen und den Menschen zu dienen, oder um zu zerstören und dem Ego zu folgen." },
  { p: "Die Technik entscheidet das nicht, wir entscheiden das." },
  { h: "/// Warum" },
  { p: "Für mich ist Mooni eine Verlängerung von mir selbst, ein Weg, der Welt mit echten Projekten und Lösungen wirklich zu dienen, statt nur zu beeindrucken." },
  { p: "Mein erster eigener Avatar, in 3D erschaffen, und das hier ist erst der Anfang." },
  { p: "Ilja" },
];

/* HUD-Eck-Brackets — gibt Chips/Buttons einen „digitalen Rahmen" */
function Brackets({ color, inset = 4, size = 7 }: { color: string; inset?: number; size?: number }) {
  const b = inset;
  const w = size;
  return (
    <>
      <span style={{ position: "absolute", top: b, left: b, width: w, height: w, borderTop: `1.5px solid ${color}`, borderLeft: `1.5px solid ${color}` }} />
      <span style={{ position: "absolute", top: b, right: b, width: w, height: w, borderTop: `1.5px solid ${color}`, borderRight: `1.5px solid ${color}` }} />
      <span style={{ position: "absolute", bottom: b, left: b, width: w, height: w, borderBottom: `1.5px solid ${color}`, borderLeft: `1.5px solid ${color}` }} />
      <span style={{ position: "absolute", bottom: b, right: b, width: w, height: w, borderBottom: `1.5px solid ${color}`, borderRight: `1.5px solid ${color}` }} />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Mooni — echtes 3D-Modell (GLB): startet gross, schrumpft beim Scrollen
   ───────────────────────────────────────────────────────────────────────── */
function MooniModel({ progress, hovered }: { progress: number; hovered: boolean }) {
  const { scene } = useGLTF("/mooni/mooni.glb", true);
  const groupRef = useRef<THREE.Group>(null);

  const model = useMemo(() => {
    const s = scene.clone(true);
    const box = new THREE.Box3().setFromObject(s);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const k = 2.7 / (size.y || 1);
    s.scale.setScalar(k);
    s.position.set(-center.x * k, -center.y * k, -center.z * k);
    return s;
  }, [scene]);

  useFrame(({ clock, pointer }, delta) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.08;
    const targetYaw = progress * Math.PI * 1.4 + pointer.x * 0.28;
    groupRef.current.rotation.y += (targetYaw - groupRef.current.rotation.y) * Math.min(1, delta * 4);
    groupRef.current.rotation.x += (-pointer.y * 0.1 - groupRef.current.rotation.x) * Math.min(1, delta * 4);
    const scrollScale = 1 - progress * 0.42; // gross -> kleiner (1.0 -> 0.58)
    const targetS = (hovered ? 1.05 : 1) * scrollScale;
    const cs = groupRef.current.scale.x;
    groupRef.current.scale.setScalar(cs + (targetS - cs) * Math.min(1, delta * 6));
  });

  return (
    <group ref={groupRef}>
      <primitive object={model} />
    </group>
  );
}
useGLTF.preload("/mooni/mooni.glb", true);

/* ─────────────────────────────────────────────────────────────────────────
   Portal — „in Mooni's Kopf": grosser dunkler Mooni-Hintergrund, Terminal-Story
   ───────────────────────────────────────────────────────────────────────── */
const GLYPHS = "01MOONI<>{}[]#*/\\=+アイウエオカキクケコ░▒▓".split("");

/* Mooni als dunkles, langsam drehendes 3D-Modell im Portal-Hintergrund (igloo-Feeling) */
function PortalMooniScene() {
  const { scene } = useGLTF("/mooni/mooni.glb", true);
  const ref = useRef<THREE.Group>(null);
  const model = useMemo(() => {
    const s = scene.clone(true);
    const box = new THREE.Box3().setFromObject(s);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const k = 5.6 / (size.y || 1);
    s.scale.setScalar(k);
    s.position.set(-center.x * k, -center.y * k, -center.z * k);
    return s;
  }, [scene]);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.09;
  });
  return (
    <group ref={ref}>
      <primitive object={model} />
    </group>
  );
}

function PortalMooniBG() {
  return (
    <Canvas camera={{ position: [0, 0, 9], fov: 38 }} dpr={[1, 1.5]} gl={{ alpha: true }} style={{ pointerEvents: "none" }}>
      {/* sehr dunkel: Mooni als Silhouette mit Gold/Cyan-Glanzkante */}
      <ambientLight intensity={0.12} />
      <directionalLight position={[2, 3, -5]} intensity={1.6} color="#E6C879" />
      <directionalLight position={[-4, 1, 2]} intensity={0.5} color="#5BD6D0" />
      <Suspense fallback={null}>
        <PortalMooniScene />
      </Suspense>
    </Canvas>
  );
}

function HeadPortal({ onClose }: { onClose: () => void }) {
  const columns = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        left: (i / 20) * 100 + (i % 2 === 0 ? 0.6 : -0.6),
        delay: -((i * 1.37) % 7),
        dur: 7 + ((i * 1.7) % 6),
        chars: Array.from({ length: 16 }, (_, j) => GLYPHS[(i * 7 + j * 3) % GLYPHS.length]).join(""),
      })),
    []
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[2147483646]" style={{ background: "#060503", animation: "p-fade .45s ease-out both" }} onClick={onClose}>
      {/* Mooni als echtes, dunkles 3D-Modell im Hintergrund — digitales Innenleben, langsam drehend */}
      <div className="pointer-events-none absolute inset-0">
        <PortalMooniBG />
      </div>
      {/* Dunkel-Verlauf: links dunkler für Text-Lesbarkeit, Mooni schimmert rechts/mittig durch */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(4,3,2,0.94) 0%, rgba(4,3,2,0.55) 58%, rgba(4,3,2,0.8) 100%)" }} />
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(circle at 62% 46%, transparent 28%, rgba(4,3,2,0.7) 86%)" }} />

      {/* Matrix-Glyphen-Regen (dezent) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ maskImage: "radial-gradient(circle at 50% 45%, black, transparent 80%)" }}>
        {columns.map((c, i) => (
          <div
            key={i}
            className="absolute top-0 font-mono"
            style={{ left: `${c.left}%`, fontSize: 13, lineHeight: 1.25, color: "rgba(212,174,90,0.12)", writingMode: "vertical-rl", letterSpacing: "0.15em", animation: `p-fall ${c.dur}s linear ${c.delay}s infinite` }}
          >
            {c.chars}
          </div>
        ))}
      </div>

      {/* feine Pixel-Koernung (immer an) + Scanline-Sweep */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0 1px, transparent 1px 2px), repeating-linear-gradient(90deg, rgba(255,255,255,0.5) 0 1px, transparent 1px 2px)",
          opacity: 0.045,
          mixBlendMode: "overlay",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 h-24" style={{ background: "linear-gradient(rgba(212,174,90,0.06), transparent)", animation: "p-scan 6s linear infinite" }} />

      {/* MOONI-Wortmarke oben links */}
      <span className="pointer-events-none absolute left-8 top-7 font-mono text-lg tracking-[0.3em]" style={{ color: "#EFE4CB", textShadow: "0 0 18px rgba(212,174,90,0.4)" }}>
        MOONI
      </span>

      {/* Close oben rechts (igloo-Stil) */}
      <button type="button" onClick={onClose} className="absolute right-8 top-7 z-10">
        <span className="relative inline-block px-5 py-2 font-mono text-[11px] uppercase tracking-[0.25em]" style={{ color: "#C9BFA6" }}>
          <Brackets color="rgba(212,174,90,0.6)" inset={0} size={9} />
          Close
        </span>
      </button>

      {/* Inhalt — scrollbar, linksbündige Spalte (Mooni schimmert rechts dahinter) */}
      <div className="relative z-[5] h-full overflow-y-auto">
        <div className="mr-auto max-w-2xl px-8 py-[13vh] md:pl-[8vw] md:pr-8 font-mono" onClick={(e) => e.stopPropagation()}>
          {PORTAL.map((b, i) =>
            b.h ? (
              <p
                key={i}
                className="mb-3 mt-11 text-[13px] tracking-[0.22em] first:mt-0"
                style={{ color: "rgba(212,174,90,0.6)", animation: "p-rise .55s ease-out both", animationDelay: `${0.12 + i * 0.04}s` }}
              >
                {b.h}
              </p>
            ) : (
              <p
                key={i}
                className="glint mb-2.5 text-[1.18rem] leading-relaxed"
                style={{ animation: "p-rise .55s ease-out both", animationDelay: `${0.12 + i * 0.04}s` }}
              >
                {b.p}
              </p>
            )
          )}
        </div>
      </div>

      <style>{`
        @keyframes p-fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes p-fall { from { transform: translateY(-100%) } to { transform: translateY(100vh) } }
        @keyframes p-scan { from { transform: translateY(-100%) } to { transform: translateY(1100%) } }
        @keyframes p-rise { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
        .glint {
          background-image: linear-gradient(100deg, #CCC1A4 0%, #FFF7E0 50%, #CCC1A4 100%);
          background-size: 240% 100%;
          background-position: 135% 0;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          transition: background-position .6s ease, text-shadow .3s ease;
        }
        .glint:hover {
          background-position: -35% 0;
          text-shadow: 0 0 18px rgba(212,174,90,0.30);
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Haupt-Sektion
   ───────────────────────────────────────────────────────────────────────── */
export default function ValuesManifesto() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [mooniHover, setMooniHover] = useState(false);
  const [portal, setPortal] = useState(false);
  const [vp, setVp] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useLenis(() => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const scrolled = Math.min(Math.max(-rect.top, 0), total);
    setP(total > 0 ? scrolled / total : 0);
  });

  // Animation in den ersten 62 % — danach Lese-Pause (Dwell)
  const a = Math.min(1, p / 0.62);
  const radius = 24 + a * 16; // vmin
  const rx = radius * 1.18; // breiter horizontal
  const ry = radius * 0.9; // flacher vertikal

  // Pixel-Geometrie für die digitalen Fäden
  const vmin = Math.min(vp.w, vp.h) / 100;
  const cx = vp.w / 2;
  const cy = vp.h / 2;

  return (
    <section ref={wrapRef} className="relative" style={{ height: "460vh", background: "var(--cream)" }}>
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* warmer Halo hinter Mooni */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: "58vmin", height: "58vmin", background: "radial-gradient(circle, rgba(184,150,62,0.16), rgba(184,150,62,0.04) 45%, transparent 70%)" }}
        />

        {/* Digitale Fäden — Verbindung von Mooni zu jeder Bubble (nur Desktop) */}
        {vp.w > 0 && (
          <svg className="pointer-events-none absolute inset-0 z-[5] hidden md:block" width={vp.w} height={vp.h}>
            {VALUES.map((v, i) => {
              const angle = (-90 + i * 60) * (Math.PI / 180);
              const tf = 0.74; // Faden endet VOR der Bubble (kein Durchqueren)
              const ex = cx + Math.cos(angle) * rx * vmin * tf;
              const ey = cy + Math.sin(angle) * ry * vmin * tf;
              return (
                <g key={v.word}>
                  <line x1={cx} y1={cy} x2={ex} y2={ey} stroke={v.color} strokeOpacity={0.4} strokeWidth={1.3} strokeDasharray="2 7" style={{ animation: "thread-flow 1.1s linear infinite" }} />
                  <circle cx={ex} cy={ey} r={4} fill={v.color} opacity={0.92} style={{ filter: `drop-shadow(0 0 6px ${v.color})` }} />
                </g>
              );
            })}
          </svg>
        )}

        {/* Mooni zentral */}
        <div className="absolute inset-0 z-10">
          <Canvas camera={{ position: [0, 0, 7], fov: 40 }} dpr={[1, 2]} gl={{ alpha: true }}>
            <ambientLight intensity={0.85} />
            <directionalLight position={[4, 6, 5]} intensity={2.6} />
            <directionalLight position={[-5, 2, 3]} intensity={1.1} color="#F2E2B8" />
            <directionalLight position={[0, 3, -6]} intensity={1.7} color="#ffffff" />
            <Suspense fallback={null}>
              <group
                onPointerOver={(e) => {
                  e.stopPropagation();
                  setMooniHover(true);
                }}
                onPointerOut={() => setMooniHover(false)}
                onClick={(e) => {
                  e.stopPropagation();
                  setPortal(true);
                }}
              >
                <MooniModel progress={a} hovered={mooniHover} />
              </group>
            </Suspense>
          </Canvas>
        </div>

        {/* Eyebrow */}
        <p className="pointer-events-none absolute left-1/2 top-[2.5vh] z-20 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.35em]" style={{ color: "var(--warm-mid)" }}>
          It&apos;s all about
        </p>

        {/* ───── Desktop: radiale 3D-Chips, spreizen mit Scroll ───── */}
        <div className="hidden md:contents">
          {VALUES.map((v, i) => {
            const angle = (-90 + i * 60) * (Math.PI / 180);
            const x = Math.cos(angle) * rx;
            const y = Math.sin(angle) * ry;
            const isHot = hovered === i;
            return (
              <div
                key={v.word}
                className="absolute left-1/2 top-1/2 z-20 flex flex-col items-center text-center"
                style={{ transform: `translate(calc(-50% + ${x}vmin), calc(-50% + ${y}vmin))`, transition: "transform 0.12s linear" }}
              >
                <button
                  type="button"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setHovered(hovered === i ? null : i)}
                  className="relative flex items-center gap-2.5 transition-all duration-300 ease-out"
                  style={{
                    padding: "11px 22px",
                    borderRadius: 13,
                    background: isHot ? v.color : "linear-gradient(180deg, #ffffff, #f1ece2)",
                    border: `1.5px solid ${v.color}`,
                    boxShadow: isHot
                      ? `0 18px 40px ${v.color}70, 0 5px 14px rgba(0,0,0,0.28)`
                      : `0 13px 28px rgba(80,60,20,0.22), 0 3px 0 ${v.color}40, inset 0 1px 0 rgba(255,255,255,0.95)`,
                    transform: isHot ? "translateY(-4px) scale(1.05)" : "translateY(0) scale(1)",
                  }}
                >
                  <Brackets color={isHot ? "#ffffff" : v.color} />
                  <span style={{ width: 9, height: 9, borderRadius: "50%", background: isHot ? "#fff" : v.color, boxShadow: `0 0 10px ${v.color}`, flex: "none" }} />
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.2rem, 2.5vw, 2.05rem)", lineHeight: 1, color: isHot ? "#fff" : v.color }}>
                    {v.word}
                  </span>
                </button>
                {isHot && (
                  <div
                    className={`absolute left-1/2 z-30 w-[min(74vw,300px)] -translate-x-1/2 rounded-2xl p-5 text-center ${y < 0 ? "bottom-full mb-4" : "top-full mt-4"}`}
                    style={{
                      background: "rgba(255,255,255,0.95)",
                      border: `1.5px solid ${v.color}`,
                      boxShadow: `0 24px 50px ${v.color}45, 0 8px 22px rgba(0,0,0,0.14)`,
                      backdropFilter: "blur(10px)",
                      animation: "value-pop 0.22s cubic-bezier(0.16,1,0.3,1) both",
                    }}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: v.color }}>
                      {v.word}
                    </span>
                    <p className="mt-2 text-[1.02rem] font-medium leading-relaxed" style={{ color: "#3A332C" }}>
                      {v.desc}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ───── Mobile: zentrierte Tab-Leiste + Detail-Panel ───── */}
        <div className="md:hidden absolute inset-x-0 bottom-[8vh] z-20 mx-auto w-full max-w-[340px] px-4">
          {/* Hauch von Backdrop für Lesbarkeit, lässt Mooni leicht durchschimmern */}
          <div className="pointer-events-none absolute inset-x-[-30vw] -bottom-[10vh] -top-[10vh] -z-10" style={{ background: "radial-gradient(ellipse at center, rgba(250,248,245,0.92), rgba(250,248,245,0.6) 55%, rgba(250,248,245,0) 85%)" }} />

          {/* Detail-Panel oben (über den Chips) — sanft animiert beim Tap */}
          {hovered !== null && (
            <div
              key={`detail-${hovered}`}
              className="mb-3 rounded-2xl p-4 text-center"
              style={{
                background: "rgba(255,255,255,0.96)",
                border: `1.5px solid ${VALUES[hovered].color}`,
                boxShadow: `0 18px 38px ${VALUES[hovered].color}40, 0 6px 16px rgba(0,0,0,0.1)`,
                backdropFilter: "blur(8px)",
                animation: "value-pop-mobile 0.24s cubic-bezier(0.16,1,0.3,1) both",
              }}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: VALUES[hovered].color }}>
                {VALUES[hovered].word}
              </span>
              <p className="mt-1.5 text-[0.95rem] font-medium leading-snug" style={{ color: "#3A332C" }}>
                {VALUES[hovered].desc}
              </p>
            </div>
          )}

          {/* 2×3 Chip-Grid — breitere Boxen, klar lesbar */}
          <div className="grid grid-cols-2 gap-2.5">
            {VALUES.map((v, i) => {
              const isHot = hovered === i;
              return (
                <button
                  key={v.word}
                  type="button"
                  onClick={() => setHovered(hovered === i ? null : i)}
                  className="relative flex items-center justify-center gap-2 px-3 py-3 transition-all duration-200"
                  style={{
                    borderRadius: 12,
                    background: isHot ? v.color : "linear-gradient(180deg, #ffffff, #f3eee4)",
                    border: `1.5px solid ${v.color}`,
                    boxShadow: isHot
                      ? `0 10px 24px ${v.color}66`
                      : `0 6px 14px rgba(80,60,20,0.2), inset 0 1px 0 rgba(255,255,255,0.9)`,
                    transform: isHot ? "scale(1.04)" : "scale(1)",
                  }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: isHot ? "#fff" : v.color, boxShadow: `0 0 8px ${v.color}`, flex: "none" }} />
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.05rem", lineHeight: 1, color: isHot ? "#fff" : v.color }}>
                    {v.word}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Easter-Egg: klein, oben rechts, dezent cyan — wer's findet, klickt Mooni */}
        <button
          type="button"
          onClick={() => setPortal(true)}
          className="absolute right-6 top-6 z-20 font-mono text-[10px] tracking-[0.22em] transition-opacity"
          style={{ color: "#5BD6D0", opacity: mooniHover ? 0.95 : 0.4 }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = mooniHover ? "0.95" : "0.4")}
        >
          ◉ ping_mooni
        </button>
      </div>

      {/* Übergang in die dunkle Planeten-Sektion */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-[28vh] w-full" style={{ background: "linear-gradient(to bottom, rgba(250,248,245,0), var(--tech-bg))" }} />

      <style>{`@keyframes thread-flow { to { stroke-dashoffset: -9 } } @keyframes value-pop { from { opacity: 0; transform: translate(-50%, 8px) } to { opacity: 1; transform: translate(-50%, 0) } } @keyframes value-pop-mobile { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: translateY(0) } }`}</style>

      {portal && <HeadPortal onClose={() => setPortal(false)} />}
    </section>
  );
}
