"use client";

import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   AcademyHero — Fullscreen hero with interactive triangle-mesh canvas orb.
   - Background: library image (ki-library-bg.jpg)
   - Dark radial mask erases the baked-in orb
   - Canvas draws a golden wireframe sphere + glow; particles scatter on hover
   ───────────────────────────────────────────────────────────────────────── */

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
    }

    function update() {
      for (const p of pts) {
        p.vx += (p.ox - p.x) * 0.038;
        p.vy += (p.oy - p.y) * 0.038;
        if (mx > -9000) {
          const dx = p.x - mx, dy = p.y - my;
          const d  = Math.hypot(dx, dy);
          if (d < 150 && d > 0.1) {
            const f = Math.pow((150 - d) / 150, 1.6) * 8;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
          }
        }
        p.vx *= 0.83; p.vy *= 0.83;
        p.x  += p.vx; p.y  += p.vy;
      }
    }

    function render() {
      ctx.clearRect(0, 0, W, H);
      const cx   = W * 0.5, cy = H * 0.42;
      const R    = Math.min(W, H) * 0.20;
      const CONN = R * 1.15;
      const n    = pts.length;
      const md   = pts.map(p => Math.hypot(p.x - mx, p.y - my));

      // Central glow
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.4);
      g.addColorStop(0.00, `rgba(${GR},${GG},${GB},0.38)`);
      g.addColorStop(0.40, `rgba(${GR},${GG},${GB},0.13)`);
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
          const near = Math.min(md[i], md[j]) < 150;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(${GR},${GG},${GB},${prox * (near ? 0.75 : 0.28)})`;
          ctx.lineWidth   = near ? 0.9 : 0.5;
          ctx.stroke();
        }
      }

      // Nodes
      for (let i = 0; i < n; i++) {
        const p    = pts[i];
        const near = md[i] < 120;
        if (near) {
          const h = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 14);
          h.addColorStop(0, `rgba(${GR},${GG},${GB},0.30)`);
          h.addColorStop(1, `rgba(${GR},${GG},${GB},0.00)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, 14, 0, Math.PI * 2);
          ctx.fillStyle = h; ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, near ? 3.2 : 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GR},${GG},${GB},${near ? 1 : 0.6})`;
        ctx.fill();
      }
    }

    function loop() {
      update(); render();
      raf = requestAnimationFrame(loop);
    }

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const onLeave = () => { mx = -9999; my = -9999; };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section className="relative overflow-hidden" style={{ height: "100vh", minHeight: 560 }}>
      {/* Layer 1 — Library background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/akademie/ki-library-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 38%",
        }}
      />

      {/* Layer 2 — Dark radial mask to erase the baked-in orb */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 28% 30% at 50% 43%, rgba(4,2,1,0.96) 0%, rgba(4,2,1,0.78) 45%, rgba(4,2,1,0.00) 100%)",
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
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }} />

      {/* Layer 5 — Text content */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-end text-center"
        style={{ zIndex: 3, padding: "0 24px 72px" }}
      >
        <p
          className="font-mono text-[12px] tracking-[0.28em] uppercase mb-4"
          style={{ color: "#C9A656" }}
        >
          Sabala KI Academy
        </p>

        <h1
          className="font-serif"
          style={{
            fontFamily: "var(--font-instrument-serif), Georgia, serif",
            fontSize: "clamp(38px, 5.5vw, 76px)",
            fontWeight: 400,
            color: "#FAF8F5",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            maxWidth: 820,
            textShadow: "0 2px 30px rgba(0,0,0,0.7)",
          }}
        >
          KI-Tools, die wirklich funktionieren —{" "}
          <em style={{ color: "#C9A656", fontStyle: "italic" }}>live erklärt.</em>
        </h1>

        <p
          className="mt-5"
          style={{
            fontSize: "clamp(15px, 1.8vw, 18px)",
            color: "rgba(250,248,245,0.62)",
            maxWidth: 520,
            lineHeight: 1.65,
            fontWeight: 300,
            fontFamily: "var(--font-geist-sans, system-ui)",
          }}
        >
          Live-Trainings mit echtem Praxisbezug. Erprobte Setups, die du sofort
          in deinem Business einsetzen kannst.
        </p>

        <div className="mt-9 flex gap-4 items-center">
          <a
            href="#kurse"
            style={{
              padding: "14px 36px",
              background: "#C9A656",
              color: "#0A0806",
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.05em",
              textDecoration: "none",
              display: "inline-block",
              transition: "background 0.25s",
            }}
            onMouseEnter={e => ((e.target as HTMLElement).style.background = "#D4B86A")}
            onMouseLeave={e => ((e.target as HTMLElement).style.background = "#C9A656")}
          >
            Kurse entdecken
          </a>
          <a
            href="/akademie"
            style={{
              padding: "13px 28px",
              border: "1px solid rgba(201,166,86,0.45)",
              color: "rgba(250,248,245,0.72)",
              fontSize: 13,
              letterSpacing: "0.05em",
              textDecoration: "none",
              display: "inline-block",
              transition: "all 0.25s",
            }}
            onMouseEnter={e => {
              const el = e.target as HTMLElement;
              el.style.borderColor = "#C9A656";
              el.style.color = "#C9A656";
            }}
            onMouseLeave={e => {
              const el = e.target as HTMLElement;
              el.style.borderColor = "rgba(201,166,86,0.45)";
              el.style.color = "rgba(250,248,245,0.72)";
            }}
          >
            Nächster Start
          </a>
        </div>

        {/* Scroll hint */}
        <div
          className="mt-9 flex flex-col items-center gap-2 opacity-30"
          style={{ animation: "academyScroll 2.8s ease-in-out infinite" }}
        >
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
            <rect x="1" y="1" width="14" height="18" rx="7" stroke="white" strokeOpacity="0.7" strokeWidth="1.2" />
            <circle cx="8" cy="6" r="2" fill="white" fillOpacity="0.7" />
          </svg>
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white">Scrollen</span>
        </div>
      </div>

      <style>{`
        @keyframes academyScroll {
          0%, 100% { transform: translateY(0); opacity: 0.30; }
          50%       { transform: translateY(5px); opacity: 0.55; }
        }
      `}</style>
    </section>
  );
}
