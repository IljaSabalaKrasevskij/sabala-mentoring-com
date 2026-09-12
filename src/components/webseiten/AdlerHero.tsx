"use client";

import { useEffect, useRef, useState } from "react";

/* Adler-Buehne: 64 Einzelbilder einer Kopfdrehung (links -> frontal -> rechts),
   gesteuert von der horizontalen Mausposition. Frames + Canvas statt
   video.currentTime, weil Seeking ruckelt (gemessen 16.8.2026).

   Maus ganz links  = Frame 0   (Adler schaut nach links)
   Maus in der Mitte = Frame 32 (Adler schaut frontal)
   Maus ganz rechts = Frame 63  (Adler schaut nach rechts)

   Ohne Maus (Touch) wandert der Blick langsam von allein. Bei reduzierter
   Bewegung entfaellt nur dieses Pendeln: die Maus-Steuerung ist direkte
   Reaktion auf den Nutzer, keine Animation, die von allein laeuft (Ilja hat
   Reduce Motion an, sonst saehe er nur ein Standbild). Bis alle Frames
   geladen sind, liegt das Poster darunter, damit nichts flackert. */

const FRAMES = 64;
const DIR = "/webseiten/adler";
const ANCHOR_X = 0.5; // Bildanker mittig: der Text sitzt unten links, der Kopf bleibt frei

function src(i: number) {
  return `${DIR}/f${String(i).padStart(3, "0")}.webp`;
}

type Mode = "cover" | "contain";

/* cover:   fuellt 94vh, Adler rechts der Mitte, Text links (Standard-Hero)
   contain: die ganze Szene ohne Beschnitt, Sektion hat exakt 16:9 */
export default function AdlerHero({ children, mode = "cover" }: { children: React.ReactNode; mode?: Mode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hover = window.matchMedia("(hover: hover)").matches;

    const imgs: HTMLImageElement[] = [];
    let loaded = 0;
    let alive = true;
    let target = 0.5;
    let current = 0.5;
    let ty = 0.45, cy = 0.45; // Spotlight folgt auch vertikal

    /* Geld-Spur: Dollarzeichen und Muenzen loesen sich vom Cursor, steigen auf,
       drehen sich und verglühen. Nur auf Hover-Geraeten, direkt mausgesteuert. */
    type Coin = { x: number; y: number; vx: number; vy: number; rot: number; vr: number; size: number; born: number; life: number; kind: 0 | 1 };
    const coins: Coin[] = [];
    let lastSpawn = { x: -999, y: -999 };
    const trail = trailRef.current;
    const tctx = trail?.getContext("2d") ?? null;

    function spawn(x: number, y: number) {
      const dx = x - lastSpawn.x, dy = y - lastSpawn.y;
      if (dx * dx + dy * dy < 14 * 14) return;         // erst ab 14 px Bewegung ein neues Teilchen
      lastSpawn = { x, y };
      if (coins.length > 36) coins.splice(0, coins.length - 36);
      coins.push({
        x, y,
        vx: (Math.random() - 0.5) * 1.4,
        vy: -(0.7 + Math.random() * 1.1),
        rot: (Math.random() - 0.5) * 0.8,
        vr: (Math.random() - 0.5) * 0.06,
        size: 13 + Math.random() * 11,
        born: performance.now(),
        life: 900 + Math.random() * 500,
        kind: Math.random() < 0.7 ? 0 : 1,               // 0 = Dollarzeichen, 1 = Muenze
      });
    }

    function drawCoins(now: number) {
      if (!tctx || !trail) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = trail.clientWidth, h = trail.clientHeight;
      if (trail.width !== Math.round(w * dpr) || trail.height !== Math.round(h * dpr)) {
        trail.width = Math.round(w * dpr); trail.height = Math.round(h * dpr);
      }
      tctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      tctx.clearRect(0, 0, w, h);
      for (let k = coins.length - 1; k >= 0; k--) {
        const c = coins[k];
        const t = (now - c.born) / c.life;
        if (t >= 1) { coins.splice(k, 1); continue; }
        c.x += c.vx; c.y += c.vy; c.vy *= 0.985; c.rot += c.vr;
        const a = t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85;   // kurz einblenden, lang ausklingen
        tctx.save();
        tctx.translate(c.x, c.y); tctx.rotate(c.rot); tctx.globalAlpha = a * 0.95;
        tctx.shadowColor = "rgba(212,174,90,0.9)"; tctx.shadowBlur = 10;
        if (c.kind === 0) {
          tctx.font = `${c.size}px "Instrument Serif", Georgia, serif`;
          tctx.textAlign = "center"; tctx.textBaseline = "middle";
          tctx.fillStyle = "#EAD08A"; tctx.fillText("$", 0, 0);
        } else {
          const r = c.size * 0.42;
          const g = tctx.createRadialGradient(-r * 0.35, -r * 0.35, r * 0.1, 0, 0, r);
          g.addColorStop(0, "#F3DFA0"); g.addColorStop(0.6, "#D4AE5A"); g.addColorStop(1, "#8F6F2A");
          tctx.fillStyle = g; tctx.beginPath(); tctx.arc(0, 0, r, 0, Math.PI * 2); tctx.fill();
          tctx.strokeStyle = "rgba(255,240,200,0.55)"; tctx.lineWidth = 1; tctx.stroke();
          tctx.font = `${r * 1.3}px "Instrument Serif", Georgia, serif`;
          tctx.textAlign = "center"; tctx.textBaseline = "middle"; tctx.fillStyle = "#5A4318"; tctx.fillText("$", 0, 1);
        }
        tctx.restore();
      }
    }
    let drawn = -1;
    let raf = 0;
    const t0 = performance.now();

    function fit() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas!.clientWidth, h = canvas!.clientHeight;
      if (canvas!.width !== Math.round(w * dpr) || canvas!.height !== Math.round(h * dpr)) {
        canvas!.width = Math.round(w * dpr);
        canvas!.height = Math.round(h * dpr);
        drawn = -1;
      }
    }

    function draw(i: number) {
      const img = imgs[i];
      if (!img || !img.complete) return;
      fit();
      const cw = canvas!.width, ch = canvas!.height;
      const s = mode === "contain"
        ? Math.min(cw / img.naturalWidth, ch / img.naturalHeight)   // alles sichtbar
        : Math.max(cw / img.naturalWidth, ch / img.naturalHeight);  // fuellend
      const dw = img.naturalWidth * s, dh = img.naturalHeight * s;
      const dx = (cw - dw) * (mode === "contain" ? 0.5 : ANCHOR_X), dy = (ch - dh) * 0.5;
      ctx!.fillStyle = "#0B0906"; ctx!.fillRect(0, 0, cw, ch);
      ctx!.drawImage(img, dx, dy, dw, dh);
      drawn = i;
    }

    function loop(now: number) {
      if (!alive) return;
      if (!hover && !reduced) {
        // Touch: langsames Pendeln um die Mitte, 14 Sekunden pro Hin und Her
        target = 0.5 + 0.28 * Math.sin(((now - t0) / 14000) * Math.PI * 2);
      }
      current += (target - current) * 0.11;
      cy += (ty - cy) * 0.11;
      const i = Math.round(current * (FRAMES - 1));
      if (i !== drawn) draw(i);
      if (hover) drawCoins(now);
      if (lightRef.current && hover) {
        lightRef.current.style.background =
          `radial-gradient(520px circle at ${current * 100}% ${cy * 100}%, rgba(212,174,90,0.16), rgba(212,174,90,0.05) 35%, transparent 62%)`;
      }
      raf = requestAnimationFrame(loop);
    }

    function onMove(e: MouseEvent) {
      target = Math.min(1, Math.max(0, e.clientX / window.innerWidth));
      const r = canvas!.getBoundingClientRect();
      ty = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
      const y = e.clientY - r.top;
      if (y >= 0 && y <= r.height) spawn(e.clientX - r.left, y);   // nur innerhalb des Heros
    }
    function onLeave() { target = 0.5; }
    function onResize() { fit(); draw(Math.round(current * (FRAMES - 1))); }

    for (let i = 0; i < FRAMES; i++) {
      const img = new Image();
      img.decoding = "async";
      const done = () => {
        loaded++;
        if (loaded === FRAMES && alive) {
          setReady(true);
          if (hover) {
            window.addEventListener("mousemove", onMove, { passive: true });
            document.documentElement.addEventListener("mouseleave", onLeave);
          } else if (reduced) {
            draw(Math.round((FRAMES - 1) / 2)); // Touch + reduzierte Bewegung: Standbild
            return;
          }
          raf = requestAnimationFrame(loop);
        }
      };
      img.onload = done;
      img.onerror = done; // ein fehlendes Frame darf den Effekt nicht komplett blockieren
      img.src = src(i);
      imgs.push(img);
    }
    window.addEventListener("resize", onResize);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [mode]);

  const contain = mode === "contain";
  return (
    <section
      className={`relative flex items-center overflow-hidden px-6 sm:px-10 md:px-16 ${contain ? "" : "min-h-[94vh]"}`}
      style={{ background: "#0B0906", ...(contain ? { aspectRatio: "16 / 9" } : {}) }}
    >
      {/* Poster zuerst (LCP), Canvas blendet darueber, sobald alle Frames da sind */}
      <img
        src={`${DIR}/poster.jpg`}
        alt=""
        aria-hidden
        className={`pointer-events-none absolute inset-0 h-full w-full ${contain ? "object-contain" : "object-cover"}`}
        style={{ objectPosition: contain ? "50% 50%" : `${ANCHOR_X * 100}% 50%` }}
      />
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-700"
        style={{ opacity: ready ? 1 : 0 }}
      />
      {/* Geld-Spur: eigene Leinwand, damit die Frames nicht neu gezeichnet werden muessen */}
      <canvas ref={trailRef} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 2 }} />
      {/* Spotlight an der Maus, mischt sich additiv ins Bild */}
      <div ref={lightRef} aria-hidden className="pointer-events-none absolute inset-0 transition-opacity duration-700" style={{ mixBlendMode: "screen", opacity: ready ? 1 : 0 }} />
      {/* Lesbarkeit NUR unter dem Textblock links unten. Kein Schleier ueber der
          Szene: Tasse, Buch und Tischkante bleiben unangetastet scharf. */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(80% 62% at 6% 92%, rgba(11,9,6,0.86) 0%, rgba(11,9,6,0.55) 38%, rgba(11,9,6,0.16) 62%, transparent 78%)" }} />
      <div className="relative z-10 w-full">{children}</div>
    </section>
  );
}
