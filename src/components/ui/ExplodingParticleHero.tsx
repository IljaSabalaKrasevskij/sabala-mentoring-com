"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useSpring } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

type Particle = {
  ox: number; // Origin X
  oy: number; // Origin Y
  color: string; // Original pixel color
  sx: number; // Scatter X
  sy: number; // Scatter Y
  tx: number; // Target arrow X
  ty: number; // Target arrow Y
  shapeType: number; // 0: rect/circle, 1: triangle, 2: line
  size: number;
};

export function ExplodingParticleHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const layoutRef = useRef({ offsetX: 0, offsetY: 0, drawWidth: 0, drawHeight: 0 });

  // Scroll tracking setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth scroll interpolation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true, willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const initCanvas = () => {
      // Setup canvas size
      const parent = canvas.parentElement;
      width = parent?.clientWidth || window.innerWidth / 2;
      height = parent?.clientHeight || window.innerHeight;
      
      // High DPI screens support
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
      img.src = "/images/sabala-portrait-hero.png";
      img.onload = () => {
        imageRef.current = img;
        generateParticles(img);
        setIsLoaded(true);
      };
    };

    const generateParticles = (img: HTMLImageElement) => {
      // We draw the image temporarily to a hidden canvas to extract pixel data
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;

      // Make image take up maximum available height
      const maxWidth = width;
      const maxHeight = height;
      const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
      const drawWidth = img.width * ratio;
      const drawHeight = img.height * ratio;
      
      const offsetX = (width - drawWidth) / 2;
      // Align perfectly to the bottom
      const offsetY = height - drawHeight;

      tempCanvas.width = drawWidth;
      tempCanvas.height = drawHeight;
      tempCtx.drawImage(img, 0, 0, drawWidth, drawHeight);

      const imgData = tempCtx.getImageData(0, 0, drawWidth, drawHeight).data;
      const particles: Particle[] = [];
      
      // Density: gap between sampled pixels (larger = fewer particles, better performance)
      const isMobile = window.innerWidth < 768;
      // Weniger Lücken, um mehr Partikel zu generieren, für ein feineres Grid
      const gap = isMobile ? 12 : 6; 

      layoutRef.current = { offsetX, offsetY, drawWidth, drawHeight }; 

      for (let y = 0; y < drawHeight; y += gap) {
        for (let x = 0; x < drawWidth; x += gap) {
          const index = (y * drawWidth + x) * 4;
          const r = imgData[index];
          const g = imgData[index + 1];
          const b = imgData[index + 2];
          const a = imgData[index + 3];

          if (a > 50) { // Only sample non-transparent pixels
            
            // Random scatter points (explode outwards)
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * (width > height ? width : height) * 0.8;
            
            // Random target points (forming a downward arrow)
            const arrowCenterX = width / 2;
            const arrowCenterY = height * 0.6;
            
            let tx = 0;
            let ty = 0;
            const rand = Math.random();
            
            if (rand < 0.4) {
              // Arrow Shaft
              tx = arrowCenterX + (Math.random() * 20 - 10);
              ty = arrowCenterY - 100 + Math.random() * 100;
            } else {
              // Arrow Head
              const headY = Math.random() * 60;
              // Width depends on Y (triangle)
              const headXWidth = 60 - headY; 
              tx = arrowCenterX + (Math.random() * headXWidth * 2 - headXWidth);
              ty = arrowCenterY + headY;
            }

            particles.push({
              ox: offsetX + x,
              oy: offsetY + y,
              color: `rgba(${r},${g},${b},${a / 255})`,
              sx: (width/2) + Math.cos(angle) * distance,
              sy: (height/2) + Math.sin(angle) * distance,
              tx: tx,
              ty: ty,
              shapeType: Math.floor(Math.random() * 3), // 0, 1, or 2
              size: isMobile ? 3 : 2 + Math.random() * 2,
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

      // Calculate state phases
      
      const pulsePhase = (Date.now() / 1000) % (Math.PI * 2);

      // Phase 1: Draw clear pristine image from 0 - 0.3
      if (progress < 0.3 && imageRef.current) {
        let alpha = 1;
        // Fade out original image between 0.25 and 0.3
        if (progress > 0.25) {
          alpha = 1 - ((progress - 0.25) / 0.05);
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

      // Draw particles if we are in scatter or transition phases
      if (progress > 0.25) {
        let particleAlpha = 1;
        // Fade in particles slowly during the jitter phase
        if (progress < 0.3) {
          particleAlpha = ((progress - 0.25) / 0.05);
        }
        ctx.globalAlpha = particleAlpha;

        for (let i = 0; i < pCount; i++) {
          const p = particlesRef.current[i];
          let x = p.ox;
          let y = p.oy;
          let pColor = p.color;
          let drawShape = 0; 

          if (progress <= 0.3) {
            const jitterMax = Math.max(0, (progress - 0.25) * 50);
            x += (Math.random() * jitterMax - jitterMax/2);
            y += (Math.random() * jitterMax - jitterMax/2);
          } else if (progress > 0.3 && progress <= 0.6) {
            const t = (progress - 0.3) / 0.3; 
            const easeT = 1 - Math.pow(1 - t, 3);
            x = p.ox + (p.sx - p.ox) * easeT;
            y = p.oy + (p.sy - p.oy) * easeT;
            
            if (p.shapeType === 0) pColor = "#B8963E"; 
            else pColor = "#1A1A18"; 
            drawShape = p.shapeType;
            
          } else if (progress > 0.6 && progress <= 0.8) {
            const t = (progress - 0.6) / 0.2; 
            const easeT = t * t * (3 - 2 * t); 
            x = p.sx + (p.tx - p.sx) * easeT;
            y = p.sy + (p.ty - p.sy) * easeT;
            
            if (p.shapeType === 0) pColor = "#B8963E";
            else pColor = "#1A1A18";
            drawShape = p.shapeType;

          } else if (progress > 0.8) {
            x = p.tx;
            y = p.ty;
            
            const pulseOffset = Math.sin(pulsePhase + i * 0.1) * 2;
            y += pulseOffset;
            
            pColor = "#B8963E"; 
            drawShape = 0; 
          }

          ctx.fillStyle = pColor;
          ctx.strokeStyle = pColor;

          if (drawShape === 0) {
            ctx.beginPath();
            ctx.arc(x, y, p.size, 0, Math.PI * 2);
            ctx.fill();
          } else if (drawShape === 1) {
            ctx.beginPath();
            ctx.moveTo(x, y - p.size);
            ctx.lineTo(x + p.size, y + p.size);
            ctx.lineTo(x - p.size, y + p.size);
            ctx.closePath();
            ctx.fill();
          } else if (drawShape === 2) {
            ctx.lineWidth = p.size;
            ctx.beginPath();
            ctx.moveTo(x - p.size * 2, y - p.size * 2);
            ctx.lineTo(x + p.size * 2, y + p.size * 2);
            ctx.stroke();
          }
        }
        ctx.globalAlpha = 1;
      }
    };

    const renderLoop = () => {
      drawParticles();
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    // Initialize
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
          <div className="lg:col-span-7 flex flex-col gap-8 z-20">
            <ScrollReveal>
              <div className="inline-block px-4 py-1.5 rounded-full border border-whisper-border bg-pure-surface text-sm font-medium text-warm-steel mb-4 tracking-wide w-max">
                Der meditierende Business-Architekt
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <h1 className="font-instrument text-deep-charcoal leading-[1.1] tracking-[-0.02em] text-[clamp(2.5rem,6vw,5rem)]">
                Klarheit in der Positionierung.<br/>
                Kraft im{" "}
                <span className="inline-block align-middle mx-1 md:mx-2 overflow-hidden rounded-full w-[1.5em] h-[0.9em] relative translate-y-[-0.05em] shadow-sm">
                  <img 
                    src="/images/sabala-portrait-hero.png" 
                    alt="Ilja Porträt" 
                    className="absolute inset-0 w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700" 
                  />
                </span>{" "}
                Auftritt.<br/>
                Kunden, die wirklich passen.
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-warm-steel text-lg md:text-xl leading-[1.65] max-w-[55ch]">
                Wir begleiten dich von der Kernbotschaft bis zur fertigen Premium-Website — und bleiben ein Jahr an deiner Seite. Strategie, Branding und Technik aus einer Hand.
              </p>
            </ScrollReveal>
          </div>
          
          {/* CANVAS AREA (RIGHT) */}
          <div className="lg:col-span-5 relative w-full h-[60vh] lg:h-[80vh] flex items-center justify-center">
            {/* The Canvas itself */}
            <canvas 
              ref={canvasRef} 
              className="absolute inset-0 z-10 w-full h-full pointer-events-none"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
