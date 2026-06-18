"use client";

import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { useLenis } from "lenis/react";

const FRAME_COUNT = 176;
const framePath = (i: number) =>
  `/hero/frames/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;

export default function IljaHeroJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastDrawn = useRef(-1);

  // ── Frames vorladen ───────────────────────────────────────────────
  useEffect(() => {
    // Mobile: kein Frame-Scrub — statisches Portrait reicht, 6.9 MB gespart
    if (window.innerWidth < 768) return;
    let cancelled = false;
    const imgs: HTMLImageElement[] = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = framePath(i);
      if (i === 1) img.onload = () => !cancelled && drawFrame(0);
      imgs[i - 1] = img;
    }
    imagesRef.current = imgs;
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Canvas: ein Frame "cover"-fit zeichnen ────────────────────────
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cw / ch;
    // Fokus-Punkt im Bild (0..1). Auf Mobile (Hochformat) Gesicht rechts holen,
    // damit Ilja im sichtbaren Crop steht; sonst mittig.
    const focusX = cr < 0.85 ? 0.72 : 0.5;
    let dw: number, dh: number, dx: number, dy: number;
    if (cr > ir) {
      dw = cw;
      dh = cw / ir;
      dx = 0;
      dy = (ch - dh) / 2;
    } else {
      dh = ch;
      dw = ch * ir;
      dy = 0;
      dx = cw * 0.5 - dw * focusX;
    }
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
    lastDrawn.current = index;
    canvas.dataset.frame = String(index);
  };

  // ── Scroll → Frame + Overlay-Fade ─────────────────────────────────
  // Lenis kappt native scroll-Events, daher der useLenis-Hook (offizielle
  // Integration): feuert bei jedem Smooth-Scroll-Tick mit echter Position.
  const update = useCallback(() => {
    const clamp = (v: number) => Math.max(0, Math.min(1, v));
    const section = sectionRef.current;
    if (!section) return;
    // Mobile: Overlay bleibt sichtbar (opacity 1), kein Frame-Scrub
    if (window.innerWidth < 768) return;
    const rect = section.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const progress = total > 0 ? clamp(-rect.top / total) : 0;

    const idx = Math.max(
      0,
      Math.min(FRAME_COUNT - 1, Math.round(progress * (FRAME_COUNT - 1)))
    );
    if (idx !== lastDrawn.current) drawFrame(idx);

    // Headline + Hover-Reveal fade weg (0 → 8 % Scroll), dann klick-durchlässig
    const o = clamp(1 - progress / 0.08);
    const ov = overlayRef.current;
    if (ov) {
      ov.style.opacity = String(o);
      ov.style.pointerEvents = o < 0.02 ? "none" : "auto";
    }
    if (cueRef.current) {
      cueRef.current.style.opacity = String(clamp(1 - progress / 0.04));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lenis = useLenis(update);

  // Initialzustand + Fallback, falls Lenis (noch) nicht aktiv ist
  useEffect(() => {
    update();
    if (process.env.NODE_ENV !== "production") {
      (window as unknown as { __lenis?: unknown }).__lenis = lenis;
    }
  }, [update, lenis]);

  // ── Resize: aktuelles Frame neu zeichnen ──────────────────────────
  useEffect(() => {
    const onResize = () => {
      const idx = lastDrawn.current < 0 ? 0 : lastDrawn.current;
      lastDrawn.current = -1;
      drawFrame(idx);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ── Hover-Reveal Maus-Tracking (nur am Anfang sichtbar) ───────────
  useEffect(() => {
    const el = revealRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
      el.style.setProperty("--reveal-radius", "110px");
    };
    const onLeave = () => el.style.setProperty("--reveal-radius", "0px");
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // Auf Mobile: Section auf 100vh reduzieren (kein Scroll-Scrub nötig)
  useEffect(() => {
    const section = sectionRef.current;
    if (section && window.innerWidth < 768) {
      section.style.height = "100vh";
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "500vh", background: "#0A0806" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Scroll-Scrub Canvas (Basis-Ebene, ganze Journey) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ background: "#0A0806" }}
        />

        {/* Hover-Reveal Overlay — deckt Frame 1, fadet beim Scrollen weg */}
        <div
          ref={overlayRef}
          className="absolute inset-0"
          style={
            {
              "--mx": "78%",
              "--my": "62%",
              "--reveal-radius": "0px",
            } as React.CSSProperties
          }
        >
          <div ref={revealRef} className="absolute inset-0">
            <div className="absolute inset-0">
              <Image
                src="/hero/ilja-metal.jpg"
                alt=""
                fill
                priority
                className="object-cover object-[70%_center] md:object-center"
                sizes="100vw"
              />
            </div>
            <div
              className="absolute inset-0 transition-[mask-size] duration-300 ease-out"
              style={{
                WebkitMaskImage:
                  "radial-gradient(circle var(--reveal-radius) at var(--mx) var(--my), transparent 0%, transparent 60%, black 100%)",
                maskImage:
                  "radial-gradient(circle var(--reveal-radius) at var(--mx) var(--my), transparent 0%, transparent 60%, black 100%)",
              }}
            >
              <Image
                src="/hero/ilja-default.png"
                alt="Ilja Krasevskij — Sabala Studios"
                fill
                priority
                className="object-cover object-[70%_center] md:object-center"
                sizes="100vw"
              />
            </div>
          </div>

          {/* Headline */}
          <div className="pointer-events-none absolute inset-0 flex items-center">
            <div className="ml-[5vw] max-w-[62vw]">
              <p className="font-mono text-[12px] uppercase tracking-[0.34em] text-gold">
                Sabala Studios
              </p>
              <h1
                className="mt-7 font-serif text-cream"
                style={{ fontSize: "clamp(2.6rem, 9vw, 8.5rem)", lineHeight: 0.95, letterSpacing: "-0.015em" }}
              >
                Ich bringe
                <br />
                <span className="text-gold-light">KI</span> in dein
                <br />
                Unternehmen.
              </h1>
              <p className="mt-8 max-w-lg text-warm-light/90" style={{ fontSize: "clamp(1.25rem, 2.1vw, 1.7rem)", lineHeight: 1.4 }}>
                Für dich gebaut. Mit dir entwickelt. Dir beigebracht.
              </p>
            </div>
          </div>
        </div>

        {/* Hover-Hinweis, mittig und sichtbar — nur auf Maus-Geräten */}
        <div ref={cueRef} className="mouse-hint pointer-events-none absolute inset-x-0 top-[57%] flex justify-center">
          <span
            className="font-mono text-[13px] tracking-[0.22em] text-gold-light"
            style={{ textShadow: "0 2px 14px rgba(0,0,0,0.75)" }}
          >
            ◉ bewege die maus über mich
          </span>
        </div>
        <style>{`@media (hover: none) { .mouse-hint { display: none } }`}</style>

        {/* Scroll-Cue */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center z-20"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-warm-mid">
            ↓ scroll · komm in meinen Kopf
          </span>
        </div>

        {/* Sanftes Auslaufen am Bottom — das Hero-Bild fadet in den dunklen Boden */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[28vh] z-10"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(10,8,6,0.35) 35%, rgba(10,8,6,0.8) 70%, #0A0806 100%)",
          }}
        />
      </div>
    </section>
  );
}
