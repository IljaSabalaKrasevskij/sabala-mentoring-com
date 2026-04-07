'use client';
import { useRef, useEffect, CSSProperties } from 'react';

interface SlowVideoProps {
  src: string;
  className?: string;
  style?: CSSProperties;
  playbackRate?: number;
}

export function SlowVideo({ src, className = '', style = {}, playbackRate = 1.0 }: SlowVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  return (
    <video 
      ref={videoRef}
      src={src}
      autoPlay 
      muted 
      loop 
      playsInline
      className={className}
      style={style}
    />
  );
}
