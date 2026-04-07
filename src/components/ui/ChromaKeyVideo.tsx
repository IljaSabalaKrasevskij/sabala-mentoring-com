'use client';
import { useRef, useEffect } from 'react';

interface ChromaKeyVideoProps {
  src: string;
  className?: string;
  tolerance?: number;
  softness?: number;
}

export function ChromaKeyVideo({ 
  src, 
  className = '', 
  tolerance = 30, // Increased tolerance to catch MP4 compression artifacts
  softness = 40 
}: ChromaKeyVideoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animationId: number;
    let bgR = -1;
    let bgG = -1;
    let bgB = -1;

    const draw = () => {
      // Keep drawing frame even if video is paused to ensure canvas updates
      if (video.readyState < 2) { // HAVE_CURRENT_DATA
        animationId = requestAnimationFrame(draw);
        return;
      }
      
      // Ensure canvas matches video native dimensions
      if (canvas.width !== video.videoWidth && video.videoWidth > 0) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }

      if (canvas.width === 0) {
        animationId = requestAnimationFrame(draw);
        return;
      }

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = frame.data;
      
      // Sample background color once from top-left corner
      // (X: 10px, Y: 10px to avoid extreme edge artifacts)
      if (bgR === -1 && canvas.width > 10 && canvas.height > 10) {
        const sampleIdx = ((10 * canvas.width) + 10) * 4;
        bgR = data[sampleIdx];
        bgG = data[sampleIdx + 1];
        bgB = data[sampleIdx + 2];
      }

      if (bgR !== -1) {
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i+1];
          const b = data[i+2];
          
          // Calculate Euclidean color distance
          const distance = Math.sqrt(
            Math.pow(r - bgR, 2) + 
            Math.pow(g - bgG, 2) + 
            Math.pow(b - bgB, 2)
          );
          
          if (distance <= tolerance) {
            data[i+3] = 0; // Fully transparent
          } else if (distance <= tolerance + softness) {
            // Smooth alpha falloff for antialiased edges
            const alphaFactor = (distance - tolerance) / softness;
            data[i+3] = Math.max(0, Math.min(255, data[i+3] * alphaFactor)); 
          }
        }
        ctx.putImageData(frame, 0, 0);
      }
      
      if (!video.paused && !video.ended) {
        animationId = requestAnimationFrame(draw);
      }
    };

    const handlePlay = () => {
      cancelAnimationFrame(animationId);
      draw();
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('seeked', draw);
    
    // Kickstart rendering if video is already ready
    if (video.readyState >= 2) {
      draw();
      video.play().catch(() => {});
    }

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('seeked', draw);
      cancelAnimationFrame(animationId);
    };
  }, [tolerance, softness]);

  return (
    <div className={`relative flex justify-center items-center ${className}`}>
      <video 
        ref={videoRef} 
        src={src} 
        autoPlay 
        muted 
        loop 
        playsInline 
        crossOrigin="anonymous" 
        className="absolute w-[1px] h-[1px] opacity-0 pointer-events-none" 
      />
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-contain filter drop-shadow-2xl" 
      />
    </div>
  );
}
