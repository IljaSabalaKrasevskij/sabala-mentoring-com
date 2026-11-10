"use client";

import { useEffect, useRef } from "react";
import ClaudeLogo from "@/components/brand/ClaudeLogo";
import { Knopf, TEXT_AUF_DUNKEL } from "./shared";
import { CURRENT_COHORT, formatTagMonat } from "./cohorts";

/* ─────────────────────────────────────────────────────────────────────────
   AcademyHero — Fullscreen hero with interactive triangle-mesh canvas orb.
   - Background: library image (ki-library-bg.jpg)
   - Dark radial mask erases the baked-in orb
   - Canvas draws a golden wireframe sphere + glow; particles scatter on hover
   Der Text steht fertig im HTML und blendet per CSS ein (`.cs-rise`): sichtbar auch ohne JavaScript.
   Die Kugel rechnet nur, solange der Kopf im Bild ist, und steht still bei „Bewegung reduzieren“.
   ───────────────────────────────────────────────────────────────────────── */

/* Verzögerung fürs Einblenden per CSS, gestaffelt wie im Kopf der Kursseite. */
const EIN = (delay: number) => ({ "--cs-d": `${delay}s` }) as React.CSSProperties;

export default function AcademyHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const c = canvas;
    const ctx = c.getContext("2d")!;

    let W = 0, H = 0;
    let mx = -9999, my = -9999;
    let pts: { x: number; y: number; ox: number; oy: number; vx: number; vy: number }[] = [];
    let raf = 0;

    // Gold
    const GR = 201, GG = 166, GB = 86;

    function initPts() {
      pts = [];
      const cx = W * 0.5;
      const cy = H * 0.42;
      const R  = Math.min(W, H) * 0.20;

      for (let i = 0; i < 52; i++) {
        const t     = i / 52;
        const phi   = Math.acos(1 - 2 * t);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        const r     = R * (0.72 + Math.random() * 0.32);
        const x     = cx + r * Math.sin(phi) * Math.cos(theta);
        const y     = cy + r * 0.80 * Math.sin(phi) * Math.sin(theta);
        pts.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 });
      }
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2;
        const r = R * (0.90 + Math.random() * 0.20);
        const x = cx + r * Math.cos(a), y = cy + r * 0.80 * Math.sin(a);
        pts.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 });
      }
    }

    function resize() {
      W = c.width  = window.innerWidth;
      H = c.height = window.innerHeight;
      initPts();
      if (ruhig) render();
    }

    function update() {
      for (const p of pts) {
        p.vx += (p.ox - p.x) * 0.032;
        p.vy += (p.oy - p.y) * 0.032;
        if (mx > -9000) {
          const dx = p.x - mx, dy = p.y - my;
          const d  = Math.hypot(dx, dy);
          const R0 = 130;
          if (d < R0 && d > 0.1) {
            const f = Math.pow((R0 - d) / R0, 2) * 2.6;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
          }
        }
        p.vx *= 0.87; p.vy *= 0.87;
        p.x  += p.vx; p.y  += p.vy;
      }
    }

    function render() {
      ctx.clearRect(0, 0, W, H);
      const cx   = W * 0.5, cy = H * 0.42;
      const R    = Math.min(W, H) * 0.20;
      const CONN = R * 0.95;
      const n    = pts.length;
      const md   = pts.map(p => Math.hypot(p.x - mx, p.y - my));

      // Central glow
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.4);
      g.addColorStop(0.00, `rgba(${GR},${GG},${GB},0.26)`);
      g.addColorStop(0.40, `rgba(${GR},${GG},${GB},0.09)`);
      g.addColorStop(0.80, `rgba(${GR},${GG},${GB},0.03)`);
      g.addColorStop(1.00, `rgba(${GR},${GG},${GB},0.00)`);
      ctx.beginPath();
      ctx.ellipse(cx, cy, R * 1.4, R * 1.1, 0, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();

      // Lines
      ctx.lineCap = "round";
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d > CONN) continue;
          const prox = 1 - d / CONN;
          const near = Math.min(md[i], md[j]) < 130;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(${GR},${GG},${GB},${prox * (near ? 0.32 : 0.13)})`;
          ctx.lineWidth   = near ? 0.6 : 0.4;
          ctx.stroke();
        }
      }

      // Nodes
      for (let i = 0; i < n; i++) {
        const p    = pts[i];
        const near = md[i] < 110;
        if (near) {
          const h = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 10);
          h.addColorStop(0, `rgba(${GR},${GG},${GB},0.16)`);
          h.addColorStop(1, `rgba(${GR},${GG},${GB},0.00)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
          ctx.fillStyle = h; ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, near ? 2.4 : 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GR},${GG},${GB},${near ? 0.85 : 0.45})`;
        ctx.fill();
      }
    }

    function loop() {
      if (window.scrollY < H) { update(); render(); }
      raf = requestAnimationFrame(loop);
    }
    const ruhig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const onLeave = () => { mx = -9999; my = -9999; };

    resize();
    window.addEventListener("resize", resize);
    if (!ruhig) {
      window.addEventListener("mousemove", onMove);
      document.addEventListener("mouseleave", onLeave);
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section className="relative overflow-hidden" style={{ height: "100vh", minHeight: 600 }}>
      {/* Layer 1 — Library background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/akademie/ki-library-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 38%",
          filter: "blur(2.5px) brightness(0.82) saturate(0.96)",
          transform: "scale(1.06)",
        }}
      />

      {/* Layer 2 — Dark radial mask to erase the baked-in orb */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 44% 46% at 50% 43%, rgba(4,2,1,0.94) 0%, rgba(4,2,1,0.74) 38%, rgba(4,2,1,0.34) 70%, rgba(4,2,1,0.00) 100%)",
        }}
      />

      {/* Layer 3 — Bottom fade for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,4,2,0.45) 0%, transparent 28%, transparent 52%, rgba(6,4,2,0.82) 80%, rgba(6,4,2,0.97) 100%)",
        }}
      />

      {/* Layer 4 — Interactive canvas */}
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0" style={{ zIndex: 2 }} />

      {/* Layer 5 — Text content */}
      <div className="absolute inset-0 flex flex-col items-center justify-end px-6 pb-[7vh] text-center" style={{ zIndex: 3 }}>
        <p className="cs-rise font-mono text-[12.5px] uppercase tracking-[0.28em] text-gold-light">Sabala KI Academy</p>
        <p
          className="cs-rise mt-3 flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[12.5px] uppercase tracking-[0.14em]"
          style={{ border: "1px solid rgba(212,174,90,0.35)", background: "rgba(212,174,90,0.07)", color: TEXT_AUF_DUNKEL, ...EIN(0.05) }}
        >
          <ClaudeLogo size={15} />
          {/* Am Handy die kurze Fassung, sonst bricht das Schild in zwei Zeilen */}
          <span className="sm:hidden">Live mit Claude Code</span>
          <span className="hidden sm:inline">Live mit Claude · primär Claude Code</span>
        </p>

        <h1 className="cs-rise mt-5 max-w-[860px] text-balance font-serif text-cream" style={{ fontSize: "clamp(2.4rem, 5.2vw, 4.6rem)", lineHeight: 1.05, textShadow: "0 2px 30px rgba(0,0,0,0.7)", ...EIN(0.1) }}>
          KI, die im Dienstleister-Alltag wirklich liefert. <span className="text-gold-light">Live mit Claude.</span>
        </h1>

        <p className="cs-rise mt-5 max-w-xl text-pretty text-[1.06rem] leading-relaxed min-[56.25rem]:text-[1.12rem]" style={{ color: "rgba(250,248,245,0.86)", ...EIN(0.16) }}>
          Live-Trainings für Dienstleister im B2B. Du baust mit Claude und Claude Code erprobte Setups auf, die ab dem nächsten Kundenprojekt Zeit sparen.
        </p>

        <div className="cs-rise mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row" style={EIN(0.22)}>
          <Knopf href="#einstieg">Deinen Einstieg finden</Knopf>
          <Knopf zweit href="/akademie">
            {CURRENT_COHORT ? `Kurs ab ${formatTagMonat(CURRENT_COHORT.start)}` : "Zum Second-Brain-Kurs"}
          </Knopf>
        </div>
      </div>
    </section>
  );
}
