'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

// Konfiguration
const FRAME_COUNT = 96;
const FRAME_PATH = (index: number) => `/frames/muni-universe/frame_${String(index).padStart(4, '0')}.webp`;

export default function VideoScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedScale, setLoadedScale] = useState(0);

  // Framer Motion Hook für den Scroll-Fortschritt relativ zum Container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Preload Images
  useEffect(() => {
    let loaded = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loaded++;
        setLoadedScale(loaded / FRAME_COUNT);
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  // Zeichne den spezifischen Frame
  useEffect(() => {
    if (images.length === 0 || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initiales Zeichnen von Frame 1
    if (images[0] && images[0].complete) {
      // Setze Canvas-Auflösung basierend auf dem Bild
      canvas.width = images[0].naturalWidth || 1920;
      canvas.height = images[0].naturalHeight || 1080;
      ctx.drawImage(images[0], 0, 0, canvas.width, canvas.height);
    }

    // Subscribe auf framer-motion Update
    const unsubscribe = scrollYProgress.on('change', (latestProgress) => {
      // frameIndex = prozentualer Fortschritt * maximale Anzahl Frames
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.floor(latestProgress * FRAME_COUNT))
      );

      const targetImage = images[frameIndex];
      
      if (targetImage && targetImage.complete) {
        // requestAnimationFrame nutzen
        requestAnimationFrame(() => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(targetImage, 0, 0, canvas.width, canvas.height);
        });
      }
    });

    return () => unsubscribe();
  }, [images, scrollYProgress]);

  // Text-Einblendungen vorbereiten (Schritt 3 deines Prompts)
  const text1Opacity = useTransform(scrollYProgress, [0.1, 0.2, 0.3, 0.4], [0, 1, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0.1, 0.2], [50, 0]);

  const text2Opacity = useTransform(scrollYProgress, [0.6, 0.7, 0.8, 0.9], [0, 1, 1, 0]);
  const text2Y = useTransform(scrollYProgress, [0.6, 0.7], [50, 0]);

  return (
    // Die Sektion ist 400vh (bzw 300vh auf Mobile) hoch.
    <section ref={containerRef} className="relative w-full h-[300vh] md:h-[400vh] bg-[#2E2B26] z-30">
      
      {/* Sticky Container */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
        
        {/* Glow-Hintergrund für das Canvas */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-refined-gold/10 via-transparent to-transparent opacity-50 blur-[100px] pointer-events-none"></div>

        <canvas
          ref={canvasRef}
          className="w-full max-w-[1400px] h-auto aspect-video object-contain"
        />

        {/* Text-Overlays (werden rein/raus gescrollt) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <motion.div 
             style={{ opacity: text1Opacity, y: text1Y }} 
             className="absolute max-w-2xl px-6 text-center"
           >
             <h3 className="text-4xl md:text-5xl font-instrument text-white mb-4 drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">Die Matrix betreten.</h3>
             <p className="text-xl text-white/80 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">Erlebe die tiefe Verbindung zwischen digitaler Klarheit und spirituellem Wachstum.</p>
           </motion.div>

           <motion.div 
             style={{ opacity: text2Opacity, y: text2Y }} 
             className="absolute max-w-2xl px-6 text-center"
           >
             <h3 className="text-4xl md:text-5xl font-instrument text-refined-gold mb-4 drop-shadow-[0_0_20px_rgba(184,150,62,0.8)]">Mühelose Synchronität.</h3>
             <p className="text-xl text-white/80 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">Lass die Systeme die Last tragen, damit du den Raum halten kannst.</p>
           </motion.div>
        </div>

        {/* Ladebalken für die Frames */}
        {loadedScale < 1 && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
             <div 
               className="h-full bg-refined-gold transition-all duration-300 ease-out"
               style={{ width: `${loadedScale * 100}%` }}
             />
          </div>
        )}
      </div>

    </section>
  );
}
