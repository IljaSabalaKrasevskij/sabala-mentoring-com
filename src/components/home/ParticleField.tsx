"use client";

import { useEffect, useRef } from "react";

type Props = { density?: number; className?: string };

type P = {
  x: number;
  y: number;
  s: number;
  sh: number;
  c: string;
  a: number;
  tw: number;
  vx: number;
  vy: number;
};

export default function ParticleField({ density = 280, className }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = ["#B8963E", "#D4AE5A", "#E8C877", "#FAF8F5"];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let parts: P[] = [];

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      parts = [];
      for (let i = 0; i < density; i++) {
        parts.push({
          x: Math.random() * w,
          y: Math.random() * h,
          s: 1.2 + Math.random() * 3.2,
          sh: (Math.random() * 4) | 0,
          c: colors[(Math.random() * colors.length) | 0],
          a: 0.15 + Math.random() * 0.7,
          tw: Math.random() * 6.28,
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1,
        });
      }
    };

    const shape = (p: P) => {
      const s = p.s;
      if (p.sh === 0) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, s * 0.6, 0, 6.283);
        ctx.fill();
      } else if (p.sh === 1) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y - s);
        ctx.lineTo(p.x + s, p.y + s);
        ctx.lineTo(p.x - s, p.y + s);
        ctx.closePath();
        ctx.fill();
      } else if (p.sh === 2) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y - s);
        ctx.lineTo(p.x + s, p.y);
        ctx.lineTo(p.x, p.y + s);
        ctx.lineTo(p.x - s, p.y);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.fillRect(p.x - s * 0.5, p.y - s * 0.5, s, s);
      }
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.globalAlpha = p.a * (0.55 + 0.45 * Math.sin(t * 0.001 + p.tw));
        ctx.fillStyle = p.c;
        shape(p);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    resize();
    seed();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        ctx.globalAlpha = p.a;
        ctx.fillStyle = p.c;
        shape(p);
      }
      ctx.globalAlpha = 1;
    } else {
      raf = requestAnimationFrame(draw);
    }

    const onResize = () => {
      resize();
      seed();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      className={className}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}
