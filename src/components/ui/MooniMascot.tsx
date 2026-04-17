"use client";

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Lade das Modell vor, damit es direkt im Cache liegt
useGLTF.preload('/models/mooni.glb');

function MooniModel() {
  const { scene } = useGLTF('/models/mooni.glb');
  const groupRef = useRef<THREE.Group>(null);
  
  // R3F Bug-Fix: Erlaube das Rendern der kompletten Hierarchie, auch wenn Teile das Kamera-Frustum kurz verlassen
  React.useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.frustumCulled = false;
        }
      });
    }
  }, [scene]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Sichere Pointer-Daten
    let { x, y } = state.pointer;
    if (isNaN(x)) x = 0;
    if (isNaN(y)) y = 0;

    // Ziel-Rotation berechnen
    const targetRotX = y * -0.3;
    const targetRotY = (x * 0.5);

    // Sanfte Interpolation auf das ganze Group-Objekt
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.1);
  });

  return (
    <group ref={groupRef}>
      <primitive 
        object={scene} 
        scale={2.8} 
        position={[0, -0.4, 0]} 
        rotation={[0, -Math.PI / 2, 0]} 
      />
    </group>
  );
}

function Loader() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color="#b8963e" wireframe />
    </mesh>
  );
}

export default function MooniMascot() {
  return (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center relative cursor-crosshair">
      {/* Kamera leicht zurückgesetzt, Fov leicht vergrößert für garantierten Viewport Fit */}
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 40 }}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        dpr={1}
      >
        {/* Beleuchtung exakt nach Prompt Vorgabe */}
        <ambientLight intensity={0.4} color={0xffffff} />
        <directionalLight position={[2, 3, 2]} intensity={1.2} color={0xfff5e6} />
        <directionalLight position={[-2, 1, -1]} intensity={0.3} color={0xb8963e} />
        <directionalLight position={[0, 2, -3]} intensity={0.5} color={0xffffff} />

        <Suspense fallback={<Loader />}>
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <MooniModel />
          </Float>
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
