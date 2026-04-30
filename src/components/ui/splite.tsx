'use client'

import React, { Suspense, lazy, Component, ErrorInfo, ReactNode } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

class SplineErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean}> {
  constructor(props: {children: ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Spline 3D Model could not load (WebGL disabled by browser):', error);
  }

  render() {
    if (this.state.hasError) {
      // Graceful fallback if WebGL fails: A subtle animated aesthetic glow instead of a crash!
      return (
        <div className="w-full h-full relative flex items-center justify-center">
           <div className="absolute w-[60%] h-[60%] bg-refined-gold/20 rounded-full blur-[80px] animate-pulse mix-blend-screen"></div>
           <div className="absolute w-[40%] h-[40%] bg-white/10 rounded-full blur-[60px] animate-pulse mix-blend-screen delay-700"></div>
        </div>
      );
    }
    return this.props.children;
  }
}

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <SplineErrorBoundary>
      <Suspense 
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <span className="loader text-warm-steel font-geist text-sm tracking-widest uppercase animate-pulse">Lade System...</span>
          </div>
        }
      >
        <Spline
          scene={scene}
          className={className}
        />
      </Suspense>
    </SplineErrorBoundary>
  )
}
