"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useSpring } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import Image from "next/image";

type Particle = {
  ox: number; 
  oy: number; 
  r: number;
  g: number;
  b: number;
  a: number;
  vx: number; 
  vy: number; 
  tx: number; // Target arrow X
  ty: number; // Target arrow Y
  shapeType: number; // 0, 1, or 2 for different geometries
  size: number;
  nDist: number; // Normalized distance from center + noise for edge detection
};

export function DissolveParticleHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const layoutRef = useRef({ offsetX: 0, offsetY: 0, drawWidth: 0, drawHeight: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

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

      loadImageAndGenerateParticles();
    };

    const loadImageAndGenerateParticles = () => {
      const img = new window.Image();
      img.crossOrigin = "Anonymous";
      img.src = "/images/sabala-portrait-hero.png";
      img.onload = () => {
        imageRef.current = img;
        generateParticles(img);
        setIsLoaded(true);
      };
    };

    const generateParticles = (img: HTMLImageElement) => {
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;

      const maxWidth = width;
      const maxHeight = height;
      // Increased scaling slightly internally, but because the canvas is wider now it balances perfectly
      const ratio = Math.min(maxWidth / img.width, maxHeight / img.height) * 0.8;
      const drawWidth = Math.floor(img.width * ratio);
      const drawHeight = Math.floor(img.height * ratio);
      
      // Shift him slightly to the left (-30px) for centering better
      const offsetX = Math.floor((width - drawWidth) / 2) - 30;
      const offsetY = Math.floor(height - drawHeight);

      // Store bounds for the crisp image draw
      layoutRef.current = { offsetX, offsetY, drawWidth, drawHeight };

      tempCanvas.width = drawWidth;
      tempCanvas.height = drawHeight;
      tempCtx.drawImage(img, 0, 0, drawWidth, drawHeight);

      const imgData = tempCtx.getImageData(0, 0, drawWidth, drawHeight).data;
      const particles: Particle[] = [];
      
      const isMobile = window.innerWidth < 768;
      // Weniger Dichte für abstrakteres Design
      const gap = isMobile ? 8 : 5; 

      const imgCenterX = drawWidth / 2;
      const imgCenterY = drawHeight / 2;
      const maxDistance = Math.sqrt(imgCenterX * imgCenterX + imgCenterY * imgCenterY);

      for (let y = 0; y < drawHeight; y += gap) {
        for (let x = 0; x < drawWidth; x += gap) {
          const index = (y * drawWidth + x) * 4;
          const r = imgData[index];
          const g = imgData[index + 1];
          const b = imgData[index + 2];
          const a = imgData[index + 3];

          // Nur nicht-transparente Pixel
          if (a > 50) {
            
            // For edge dissolution effect
            const dist = Math.sqrt(Math.pow(x - imgCenterX, 2) + Math.pow(y - imgCenterY, 2));
            let nDist = dist / maxDistance;
            nDist += (Math.random() * 0.3 - 0.15); // Adds noise
            
            // Random scatter vectors (Phase 2) - increased velocity for an epic explosion
            const angle = Math.random() * Math.PI * 2;
            const velocity = 30 + Math.random() * 100; 

            // Random target vectors for a MASSIVE, clear arrow (Phase 3)
            const arrowCenterX = width / 2;
            const arrowCenterY = height * 0.6;
            let tx = 0;
            let ty = 0;
            const rand = Math.random();
            
            if (rand < 0.35) {
              // Arrow Shaft (breit und hoch)
              tx = arrowCenterX + (Math.random() * 60 - 30); // wider shaft
              ty = arrowCenterY - 140 + Math.random() * 140; // 140px height
            } else {
              // Arrow Head (großes klares Dreieck nach unten)
              const headY = Math.random() * 120;
              const headXWidth = 120 - headY; // Breiter oben, spitzt nach unten zu
              tx = arrowCenterX + (Math.random() * headXWidth * 2 - headXWidth);
              ty = arrowCenterY + headY;
            }

            // Abstraktion: Streuen wir den Pfeil etwas mehr, damit er nicht so dicht und blockig ist
            tx += (Math.random() - 0.5) * 30;
            ty += (Math.random() - 0.5) * 30;
            
            particles.push({
              ox: offsetX + x,
              oy: offsetY + y,
              r, g, b, a: a / 255,
              vx: Math.cos(angle) * velocity,
              vy: Math.sin(angle) * velocity,
              tx: tx,
              ty: ty,
              shapeType: Math.floor(Math.random() * 3), // 0: circle, 1: triangle, 2: line
              size: isMobile ? 1.5 : 0.8 + Math.random() * 0.8, // feinere Partikel
              nDist,
            });
          }
        }
      }

      particlesRef.current = particles;
    };

    const drawParticles = () => {
      if (!ctx || !isLoaded) return;
      ctx.clearRect(0, 0, width, height);

      const progress = smoothProgress.get();
      const pCount = particlesRef.current.length;
      
      const pulsePhase = (Date.now() / 1000) % (Math.PI * 2);

      // Phase 1 (0 to 0.2): Draw clear pristine image + early edge dissolve
      if (progress < 0.2 && imageRef.current) {
        let alpha = 1;
        if (progress > 0.1) {
          // Fade out the base image smoothly from 0.1 to 0.2
          alpha = 1 - ((progress - 0.1) / 0.1);
        }
        ctx.globalAlpha = alpha;
        ctx.drawImage(
          imageRef.current, 
          layoutRef.current.offsetX, 
          layoutRef.current.offsetY, 
          layoutRef.current.drawWidth, 
          layoutRef.current.drawHeight
        );
        ctx.globalAlpha = 1;
      }

      // If we are strictly at 0%, don't render particles to save performance
      if (progress < 0.05) return;

      const gR = 184, gG = 150, gB = 62; // The Gold Target

      // threshold mapping: 1.2 at 0 progress -> -0.4 at 0.4 progress.
      const dissolveThreshold = 1.2 - (progress * 4);

      for (let i = 0; i < pCount; i++) {
        const p = particlesRef.current[i];
        let x = p.ox;
        let y = p.oy;
        
        // Final colors will transition to gold based on progress
        let finalR = p.r;
        let finalG = p.g;
        let finalB = p.b;
        let alpha = p.a;
        let pShape = 0; // Starts as solid pixels/circles

        const isDissolved = p.nDist > dissolveThreshold || progress > 0.2;

        // If it's not dissolved yet and we are in the early phase, skip drawing it 
        // because the ctx.drawImage is already showing it.
        if (!isDissolved && progress <= 0.2) {
          continue; 
        }

        // --- POSITION & COLOR LOGIC ---
        
        if (progress <= 0.2) {
          // 0 -> 20%: Edge particles dissolve and drift slightly out
          const depth = Math.min(1, Math.max(0, (p.nDist - dissolveThreshold) * 2));
          x += p.vx * depth * (progress * 2);
          y += p.vy * depth * (progress * 2);
          y -= depth * progress * 30; // subtle upward drift
          
          finalR = p.r * (1 - depth) + gR * depth;
          finalG = p.g * (1 - depth) + gG * depth;
          finalB = p.b * (1 - depth) + gB * depth;
          // Fade in the particle as it breaks off
          alpha = p.a * Math.min(1, progress * 10);
          pShape = p.shapeType; // Zeige geometrische Formen!

        } else if (progress > 0.2 && progress <= 0.45) {
          // 20 -> 45%: Full scatter for all particles
          const scatterT = (progress - 0.2) / 0.25;
          const easeT = 1 - Math.pow(1 - scatterT, 3); // Ease out
          x = p.ox + p.vx * 1.5 * easeT;
          y = p.oy + p.vy * 1.5 * easeT - 20;

          // Transition colors fully to gold
          finalR = p.r * (1 - easeT) + gR * easeT;
          finalG = p.g * (1 - easeT) + gG * easeT;
          finalB = p.b * (1 - easeT) + gB * easeT;
          pShape = p.shapeType; // Bleiben bis hier geometrisch

        } else if (progress > 0.45 && progress <= 0.70) {
          // 45 -> 70%: Morph to Arrow shape
          const morphT = (progress - 0.45) / 0.25;
          const easeT = morphT * morphT * (3 - 2 * morphT); // Smoothstep curve
          
          // Where it was at maximum scatter
          const sx = p.ox + p.vx * 1.5;
          const sy = p.oy + p.vy * 1.5 - 20;

          x = sx + (p.tx - sx) * easeT;
          y = sy + (p.ty - sy) * easeT;
          
          finalR = gR; finalG = gG; finalB = gB;
          pShape = 0; // Werden zu kleinen soliden Punkten für cleanen Pfeil

        } else if (progress > 0.70) {
          // 70 -> 100%: Idle pulse arrow
          x = p.tx;
          y = p.ty;
          const pulseOffset = Math.sin(pulsePhase + (i % 20) * 0.1) * 3;
          y += pulseOffset;
          
          finalR = gR; finalG = gG; finalB = gB;
          pShape = 0;
        }

        ctx.fillStyle = `rgba(${Math.floor(finalR)}, ${Math.floor(finalG)}, ${Math.floor(finalB)}, ${alpha})`;
        ctx.strokeStyle = `rgba(${Math.floor(finalR)}, ${Math.floor(finalG)}, ${Math.floor(finalB)}, ${alpha})`;
        
        // Render current shape
        if (pShape === 0) {
          ctx.beginPath();
          // Pfeil etwas abstrakter und feiner (1.0 Radius statt 2.0)
          const radius = progress > 0.45 ? 1.0 : p.size; 
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        } else if (pShape === 1) {
          // Triangle
          ctx.beginPath();
          ctx.moveTo(x, y - p.size);
          ctx.lineTo(x + p.size * 1.5, y + p.size);
          ctx.lineTo(x - p.size * 1.5, y + p.size);
          ctx.closePath();
          ctx.fill();
        } else if (pShape === 2) {
          // Line
          ctx.lineWidth = p.size;
          ctx.beginPath();
          ctx.moveTo(x - p.size * 2, y - p.size * 2);
          ctx.lineTo(x + p.size * 2, y + p.size * 2);
          ctx.stroke();
        }

      }
    };

    const renderLoop = () => {
      drawParticles();
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    initCanvas();
    window.addEventListener("resize", initCanvas);
    renderLoop();

    return () => {
      window.removeEventListener("resize", initCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLoaded, smoothProgress]);

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-warm-canvas rounded-b-[40px] z-10 shadow-[0_40px_60px_rgba(26,26,24,0.02)]">
      <div className="sticky top-0 h-[100dvh] pt-24 pb-20 px-6 sm:px-12 md:px-24 flex items-center justify-center overflow-hidden">
        <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 h-full">
          
          {/* TEXT CONTENT (LEFT) */}
          <div className="lg:col-span-6 flex flex-col gap-5 z-20 xl:pr-8">
            <ScrollReveal>
              <div className="inline-block px-3 py-1 rounded-full border border-whisper-border bg-pure-surface text-[0.75rem] uppercase tracking-widest font-medium text-warm-steel mb-2 w-max">
                Der meditierende Business-Architekt
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <h1 className="font-instrument text-deep-charcoal leading-[1.1] tracking-[-0.02em] text-[clamp(2rem,4vw,3.5rem)] pb-2 flex flex-col gap-1">
                <span>Klarheit in der <span className="text-refined-gold italic pr-1">Positionierung.</span></span>
                <span>Kraft im <span className="text-refined-gold italic pr-1">Auftritt.</span></span>
                <span>Kunden, die <span className="text-refined-gold italic pr-1">wirklich passen.</span></span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="font-satoshi text-warm-steel text-[1.1rem] leading-[1.6] max-w-[500px]">
                Wir begleiten dich von der Kernbotschaft bis zur fertigen Premium-Website — und bleiben ein Jahr an deiner Seite. Strategie, Branding und Technik aus einer Hand.
              </p>
            </ScrollReveal>
          </div>
          
          {/* CANVAS AREA (RIGHT) */}
          <div 
            className="lg:col-span-6 relative w-full h-[60vh] lg:h-[85vh] flex items-end justify-center mt-8 lg:mt-0"
            style={{ 
              WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%), linear-gradient(to right, black 80%, transparent 100%)",
              WebkitMaskComposite: "source-in",
              maskImage: "linear-gradient(to bottom, black 85%, transparent 100%), linear-gradient(to right, black 80%, transparent 100%)",
              maskComposite: "intersect"
            }}
          >
            <canvas 
              ref={canvasRef} 
              className="absolute inset-0 z-10 w-full h-full pointer-events-none drop-shadow-2xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
