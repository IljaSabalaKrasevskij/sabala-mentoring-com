"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";

type FloatingParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
  baseAlpha: number;
};

export function VideoParticleHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    const particles: FloatingParticle[] = [];

    const initCanvas = () => {
      const parent = canvas.parentElement;
      width = parent?.clientWidth || window.innerWidth / 2;
      height = parent?.clientHeight || window.innerHeight;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      initParticles();
    };

    const initParticles = () => {
      particles.length = 0;
      const isMobile = window.innerWidth < 768;
      const particleCount = isMobile ? 25 : 50;

      for (let i = 0; i < particleCount; i++) {
        // Colors: #B8963E (Gold) and #C9A84C (Light Gold)
        const isLightGold = Math.random() > 0.5;
        const color = isLightGold ? "201, 168, 76" : "184, 150, 62";
        const baseAlpha = 0.3 + Math.random() * 0.5; // 0.3 to 0.8
        
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5, // Slow floating
          vy: (Math.random() - 0.5) * 0.5,
          size: 2 + Math.random() * 4,     // 2px to 6px
          color: color,
          alpha: baseAlpha,
          baseAlpha: baseAlpha,
          pulseSpeed: 0.02 + Math.random() * 0.03,
        });
      }
    };

    const renderLoop = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges smoothly
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Pulse alpha
        p.alpha = p.baseAlpha + Math.sin(Date.now() * p.pulseSpeed * 0.1) * 0.2;
        if (p.alpha < 0.1) p.alpha = 0.1;

        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    initCanvas();
    window.addEventListener("resize", initCanvas);
    renderLoop();

    return () => {
      window.removeEventListener("resize", initCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-[100dvh] pt-32 pb-20 px-6 sm:px-12 md:px-24 flex items-center justify-center bg-night-foundation rounded-b-[40px] z-10 shadow-[0_40px_60px_rgba(26,26,24,0.02)] overflow-hidden">
      
      {/* Background Glow to complement the gold */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-refined-gold/5 via-night-foundation to-night-foundation pointer-events-none"></div>

      <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* TEXT CONTENT (LEFT) */}
        <div className="lg:col-span-6 xl:col-span-5 flex flex-col gap-6 z-20">
          <ScrollReveal>
            <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-night-secondary mb-2 tracking-wide w-max">
              Der meditierende Business-Architekt
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h1 className="font-instrument text-night-text leading-[1.1] tracking-[-0.02em] text-[clamp(2.5rem,5.5vw,4.5rem)]">
              Klarheit in der Positionierung.<br/>
              Kraft im{" "}
              <span className="inline-block align-middle mx-1 md:mx-2 overflow-hidden rounded-[40px] w-[2em] h-[0.9em] relative translate-y-[-0.05em] shadow-sm border border-white/10">
                <Image 
                  src="/images/sabala-portrait-hero.png" 
                  alt="Ilja Porträt" 
                  fill
                  className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700" 
                />
              </span>{" "}
              Auftritt.<br/>
              Kunden, die wirklich passen.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-night-secondary/80 text-lg md:text-xl leading-[1.7] max-w-[48ch] font-light">
              Wir begleiten dich von der Kernbotschaft bis zur fertigen Premium-Website — und bleiben ein Jahr an deiner Seite. Strategie, Branding und Technik aus einer Hand.
            </p>
          </ScrollReveal>
        </div>
        
        {/* VIDEO & CANVAS VISUAL (RIGHT) */}
        <div className="lg:col-span-6 xl:col-span-7 relative w-full h-[60vh] lg:h-[85vh] flex items-center justify-center mt-8 lg:mt-0">
          
          <ScrollReveal delay={0.3} className="w-full h-full relative">
            {/* The Video Element */}
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="absolute inset-0 w-full h-full object-contain mix-blend-screen opacity-90 scale-105"
            >
              <source src="/videos/sabala-hero-gold.mp4" type="video/mp4" />
            </video>

            {/* Canvas Overlay for Extra Particles */}
            <canvas 
              ref={canvasRef} 
              className="absolute inset-0 z-10 w-full h-full pointer-events-none mix-blend-screen"
            />
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
