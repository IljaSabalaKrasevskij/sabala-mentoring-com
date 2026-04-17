'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useSpring } from 'framer-motion';

interface InlineFrameSequenceProps {
  frameCount: number;
  framePathPattern: string; // e.g. "/frames/fuelle-geld/ezgif-frame-{index}.jpg"
  padLength?: number; // default 3
  className?: string;
}

export function InlineFrameSequence({ frameCount, framePathPattern, padLength = 3, className = "" }: InlineFrameSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Scroll tracking exactly when the element is visible on screen
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"] // Starts when top enters screen, ends when bottom leaves
  });

  // Smooth scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Preload Images
  useEffect(() => {
    let loaded = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const indexStr = String(i).padStart(padLength, '0');
        img.src = framePathPattern.replace('{index}', indexStr);
        img.onload = () => {
          loaded++;
          if (loaded === frameCount) setIsLoaded(true);
        };
        loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [frameCount, framePathPattern, padLength]);

  // Canvas Drawing
  useEffect(() => {
    if (!isLoaded || images.length === 0 || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = images[0].naturalWidth || 1080;
    canvas.height = images[0].naturalHeight || 1080;

    // Subscribe to scroll updates
    const unsubscribe = smoothProgress.on('change', (latestProgress) => {
      const frameIndex = Math.min(
        frameCount - 1,
        Math.max(0, Math.floor(latestProgress * frameCount))
      );

      const targetImage = images[frameIndex];
      
      if (targetImage && targetImage.complete) {
        requestAnimationFrame(() => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          const scale = Math.max(canvas.width / targetImage.width, canvas.height / targetImage.height);
          const x = (canvas.width / 2) - (targetImage.width / 2) * scale;
          const y = (canvas.height / 2) - (targetImage.height / 2) * scale;
          
          ctx.drawImage(targetImage, x, y, targetImage.width * scale, targetImage.height * scale);
        });
      }
    });

    return () => unsubscribe();
  }, [images, isLoaded, smoothProgress, frameCount]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-refined-gold/20 border-t-refined-gold animate-spin"></div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover transition-opacity duration-1000"
        style={{ opacity: isLoaded ? 1 : 0 }}
      />
    </div>
  );
}
