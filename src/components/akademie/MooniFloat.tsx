"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

/* ─────────────────────────────────────────────────────────────────────────
   MooniFloat — der 3D-Mooni als wiederkehrendes Brand-Element. Schwebt sanft,
   dreht sich leicht zur Maus. Bewusst leichtgewichtig (komprimiertes GLB, Draco).
   ───────────────────────────────────────────────────────────────────────── */

// 270° um Y = Vorderseite/Gesicht zur Kamera (per Offscreen-Render verifiziert)
const FRONT_YAW = Math.PI * 1.5;

function MooniRobot({ targetSize = 2.4 }: { targetSize?: number }) {
  const { scene } = useGLTF("/mooni/mooni-robot.glb", true);
  const ref = useRef<THREE.Group>(null);

  // einmalig: normalisieren (auf targetSize skalieren, zentrieren)
  const model = useMemo(() => {
    const s = scene.clone(true);
    const box = new THREE.Box3().setFromObject(s);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const k = targetSize / (size.y || 1);
    s.scale.setScalar(k);
    s.position.set(-center.x * k, -center.y * k, -center.z * k);
    return s;
  }, [scene, targetSize]);

  const inited = useRef(false);
  useFrame(({ clock, pointer }, delta) => {
    if (!ref.current) return;
    // Startausrichtung: 270° = Vorderseite zur Kamera (verifiziert per Offscreen-Render), kein Lade-Spin
    if (!inited.current) {
      ref.current.rotation.y = FRONT_YAW;
      inited.current = true;
    }
    const t = clock.elapsedTime;
    ref.current.position.y = Math.sin(t * 0.9) * 0.1;
    const targetYaw = FRONT_YAW + Math.sin(t * 0.25) * 0.18 + pointer.x * 0.35;
    ref.current.rotation.y += (targetYaw - ref.current.rotation.y) * Math.min(1, delta * 3);
    ref.current.rotation.x += (-pointer.y * 0.12 - ref.current.rotation.x) * Math.min(1, delta * 3);
  });

  return (
    <group ref={ref}>
      <primitive object={model} />
    </group>
  );
}
useGLTF.preload("/mooni/mooni-robot.glb", true);

export default function MooniFloat({ targetSize = 2.4, className }: { targetSize?: number; className?: string }) {
  return (
    <Canvas className={className} camera={{ position: [0, 0, 6], fov: 40 }} dpr={[1, 2]} gl={{ alpha: true }}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 6, 5]} intensity={2.4} />
      <directionalLight position={[-5, 2, 3]} intensity={1.0} color="#F2E2B8" />
      <directionalLight position={[0, 3, -6]} intensity={1.4} color="#ffffff" />
      <Suspense fallback={null}>
        <MooniRobot targetSize={targetSize} />
      </Suspense>
    </Canvas>
  );
}
