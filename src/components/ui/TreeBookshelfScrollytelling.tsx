"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

const FRAME_COUNT = 189;
const START_FRAME = 1;

function getFramePath(index: number) {
  // Matches ezgif-frame-001.jpg format
  const paddedIndex = index.toString().padStart(3, "0");
  return `/blog-header-sequence/ezgif-frame-${paddedIndex}.jpg`;
}

export default function TreeBookshelfScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // PRELOAD IMAGES
  useEffect(() => {
    let loaded = 0;
    const loadedImages: HTMLImageElement[] = [];

    const loadImages = async () => {
      for (let i = START_FRAME; i <= FRAME_COUNT; i++) {
        const img = new Image();
        img.src = getFramePath(i);
        await new Promise((resolve) => {
          img.onload = () => {
             loaded++;
             loadedImages.push(img);
             setLoadedCount(loaded);
             // We consider it "ready" once at least 15 images are loaded to avoid too long a black screen,
             // although for perfect smoothness, we wait for a good chunk.
             if (loaded === FRAME_COUNT) {
               setImages(loadedImages.sort((a,b) => {
                  const numA = parseInt(a.src.match(/frame-(\d+)/)![1]);
                  const numB = parseInt(b.src.match(/frame-(\d+)/)![1]);
                  return numA - numB;
               }));
               setIsReady(true);
             }
             resolve(true);
          };
          img.onerror = () => resolve(true); // Fallback
        });
      }
    };
    
    loadImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // RENDER CANVAS
  useEffect(() => {
    if (!isReady || images.length === 0 || !canvasRef.current) return;
    
    const context = canvasRef.current.getContext("2d");
    if (!context) return;

    // Draw frame helper
    const drawFrame = (frameIndex: number) => {
       const img = images[Math.min(frameIndex, images.length - 1)];
       if (!img) return;

       const canvas = canvasRef.current;
       if (!canvas) return;

       // Set canvas size matching window or parent
       const { width, height } = canvas.getBoundingClientRect();
       if (canvas.width !== width || canvas.height !== height) {
          // Adjust for Retina displays
          const dpr = window.devicePixelRatio || 1;
          canvas.width = width * dpr;
          canvas.height = height * dpr;
          context.scale(dpr, dpr);
       }

       // Clear with exactly matching background to blend the JPG boundary
       context.fillStyle = "#f5f3ee";
       context.fillRect(0, 0, width, height);

       // CONTAIN logic (Object-fit equivalent)
       const imgRatio = img.width / img.height;
       const canvasRatio = width / height;
       let drawWidth, drawHeight, offsetX, offsetY;

       if (imgRatio > canvasRatio) {
           drawWidth = width;
           drawHeight = width / imgRatio;
           offsetX = 0;
           offsetY = (height - drawHeight) / 2;
       } else {
           drawHeight = height;
           drawWidth = height * imgRatio;
           offsetX = (width - drawWidth) / 2;
           offsetY = 0;
       }

       // Slightly scale up to avoid 1px border bleeding
       context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Sub to framer motion spring update
    const unsubscribe = smoothProgress.on("change", (latestVal) => {
       const frameIndex = Math.floor(latestVal * (images.length - 1));
       // Fast request animation frame wrap
       requestAnimationFrame(() => drawFrame(frameIndex));
    });

    // Draw first frame immediately
    drawFrame(0);

    // Initial resize trigger
    const handleResize = () => drawFrame(Math.floor(smoothProgress.get() * (images.length - 1)));
    window.addEventListener("resize", handleResize);

    return () => {
       unsubscribe();
       window.removeEventListener("resize", handleResize);
    };
  }, [isReady, images, smoothProgress]);

  // TYPOGRAPHY / BEATS OPACITY & TRANSFORM MAPPING
  // The user wants NO text at the beginning. The tree stands alone.
  // Then, towards the end when the tree opens, a core message appears.
  
  // Core Message: Fades in from 50% to 70%, stays visible until 95%, then fades out (or stays, but let's fade it out right before the actual blog section).
  // Actually, keeping it visible until the very end of the scroll (100%) creates a smoother transition to the blog below.
  const opacityEndMessage = useTransform(smoothProgress, [0.4, 0.6, 0.9, 1], [0, 1, 1, 0]);
  const yEndMessage = useTransform(smoothProgress, [0.4, 0.6, 0.9, 1], [30, 0, 0, -30]);

  // Overlay "Scroll to Explore" indicator mapping
  const opacityScrollHint = useTransform(smoothProgress, [0, 0.05], [1, 0]);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-[#f5f3ee]">
      
      {/* LOADING STATE */}
      {!isReady && (
         <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center bg-[#f5f3ee] z-50">
            <h3 className="font-instrument text-2xl text-deep-charcoal mb-4">Der Raum öffnet sich</h3>
            <div className="w-[200px] h-1 bg-warm-steel/20 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-deep-charcoal transition-all duration-300 ease-out" 
                 style={{ width: `${(loadedCount / FRAME_COUNT) * 100}%` }}
               ></div>
            </div>
         </div>
      )}

      {/* STICKY CANVAS CONTAINER */}
      <div className={cn("sticky top-0 h-screen w-full overflow-hidden transition-opacity duration-1000", isReady ? "opacity-100" : "opacity-0")}>
         
         <canvas 
           ref={canvasRef} 
           className="absolute inset-0 w-full h-full object-cover z-0"
         />

         {/* VEO WATERMARK MASK */}
         <div className="absolute bottom-0 right-0 w-64 h-32 bg-gradient-to-tl from-[#f5f3ee] via-[#f5f3ee]/90 to-transparent z-0 pointer-events-none"></div>

         {/* 
            TEXT BEATS 
            Absolute positioned in center
         */}
         <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 pointer-events-none text-deep-charcoal mt-10 md:mt-20">
            
            {/* KERNBOTSCHAFT (End of Animation) */}
            <motion.div style={{ opacity: opacityEndMessage, y: yEndMessage }} className="relative z-10">
               <div className="bg-[#f5f3ee]/85 backdrop-blur-xl border border-whisper-border/50 px-8 py-10 md:px-14 md:py-12 rounded-[2rem] shadow-[0_30px_60px_rgba(26,26,24,0.08)] max-w-3xl mx-auto flex flex-col items-center justify-center">
                 <h2 className="font-instrument text-4xl md:text-5xl lg:text-6xl mb-6 text-[#1a1a18]">
                   Wissen, das Wurzeln schlägt.
                 </h2>
                 <p className="font-satoshi text-lg md:text-xl text-[#3b3b3a] max-w-xl mx-auto leading-relaxed">
                   Tritt ein in eine Umgebung für tiefgreifendes Wachstum. Keine Schablonen, sondern echte Fundamente.
                 </p>
               </div>
            </motion.div>
         </div>

         {/* SCROLL SUBTLE HINT */}
         <motion.div 
           style={{ opacity: opacityScrollHint }} 
           className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
         >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-deep-charcoal/60">Scroll to Explore</span>
            <div className="w-px h-12 bg-gradient-to-b from-deep-charcoal/60 to-transparent animate-pulse"></div>
         </motion.div>

      </div>
    </div>
  );
}
