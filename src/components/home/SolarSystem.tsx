"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Line } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { SYSTEM, PlanetData } from "./system-data";

/* ─────────────────────────────────────────────────────────────────────────
   Look-Presets — vier Planeten-Ästhetiken zum Live-Durchschalten (Dev)
   ───────────────────────────────────────────────────────────────────────── */
type Look = {
  name: string;
  tint: number;
  glow: number;
  gridAmt: number;
  relief: number;
  rimAmt: number;
  spec: number;
  bloom: number;
  threshold: number;
};

const LOOKS: Look[] = [
  // 1 — aktueller Stand: entsättigter Fels + dezentes Datennetz
  { name: "Stein & Netz", tint: 0.28, glow: 0.0, gridAmt: 1.0, relief: 1.0, rimAmt: 0.25, spec: 0.0, bloom: 0.3, threshold: 0.55 },
  // 2 — flüssiges Gold: satt, metallisch, warmes Eigenleuchten
  { name: "Flüssiges Gold", tint: 0.85, glow: 0.22, gridAmt: 0.35, relief: 0.6, rimAmt: 0.5, spec: 0.9, bloom: 0.6, threshold: 0.4 },
  // 3 — Holo-Glas: digital, starker Rim + helles Netz
  { name: "Holo-Glas", tint: 0.45, glow: 0.1, gridAmt: 1.7, relief: 0.4, rimAmt: 0.95, spec: 0.35, bloom: 0.55, threshold: 0.42 },
  // 4 — Seide matt: clean, sanfter Tag/Nacht-Verlauf, kein Grid
  { name: "Seide Matt", tint: 0.55, glow: 0.06, gridAmt: 0.0, relief: 0.25, rimAmt: 0.35, spec: 0.18, bloom: 0.28, threshold: 0.6 },
];

/* ─────────────────────────────────────────────────────────────────────────
   Shader — holografische Daten-Sphäre
   ───────────────────────────────────────────────────────────────────────── */
const VERT = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec2 vUv;
  varying vec3 vPos;
  varying vec3 vWorld;
  void main() {
    vUv = uv;
    vPos = position;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorld = wp.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);
    vView = normalize(cameraPosition - wp.xyz);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec3 uColor;
  uniform vec3 uDeep;
  uniform float uBright;
  uniform vec2 uGrid;
  uniform float uFresnel;
  uniform vec3 uLight;
  uniform vec3 uHover;
  uniform float uHoverAmt;
  uniform float uHoverR;
  // Look-Switcher Regler
  uniform float uTint;    // Farbtönung der Oberfläche (0 = nackter Fels, 1 = voll Gold)
  uniform float uGlow;    // Eigenleuchten auf der Tagseite
  uniform float uGridAmt; // Stärke des digitalen Netzes
  uniform float uRelief;  // Oberflächen-Relief / Korn (0 = glatt, 1 = rau)
  uniform float uRimAmt;  // Rim-/Fresnel-Stärke
  uniform float uSpec;    // spekulares Highlight (metallisch/flüssig)
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec2 vUv;
  varying vec3 vPos;
  varying vec3 vWorld;

  float hash(vec3 p){ p = fract(p*0.3183099 + vec3(0.1,0.2,0.3)); p *= 17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
  float noise(vec3 x){
    vec3 i = floor(x), f = fract(x); f = f*f*(3.0-2.0*f);
    return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x), mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),
               mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x), mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);
  }
  float fbm(vec3 p){ float v=0.0, a=0.5; for(int i=0;i<6;i++){ v+=a*noise(p); p=p*2.0+vec3(1.7); a*=0.5; } return v; }

  void main(){
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vView);
    vec3 L = normalize(uLight);

    // Tag/Nacht — beleuchtete Seite vs Schatten (das macht "echter Planet")
    float diff = clamp(dot(N, L), 0.0, 1.0);
    float lit = 0.08 + 0.92 * smoothstep(0.0, 0.35, diff);

    // Oberfläche: Fels, per uTint von der Markenfarbe getönt; Relief per uRelief
    float cont = fbm(vPos * 1.6);
    float detail = fbm(vPos * 5.0);
    float grain = fbm(vPos * 11.0); // feine Steinstruktur / Krater
    float land = smoothstep(0.44, 0.62, cont);
    vec3 rockLow = mix(vec3(0.14, 0.13, 0.11), uDeep * 0.7, 0.5);
    vec3 rockHigh = mix(vec3(0.52, 0.48, 0.42), uColor, uTint);
    vec3 surface = mix(rockLow, rockHigh, land);
    surface *= mix(1.0, 0.55 + 0.55 * detail, uRelief); // Höhenrelief
    surface *= mix(1.0, 0.82 + 0.32 * grain, uRelief);  // Korn / Krater

    // digitales Netz als feiner Overlay (langsam fließend)
    vec2 g = abs(fract(vUv * uGrid + vec2(uTime * 0.01, 0.0)) - 0.5);
    float gridline = 1.0 - smoothstep(0.0, 0.045, min(g.x, g.y));

    vec3 col = surface * lit;
    // Grid: dezent, nur als feines Datennetz
    col += uColor * gridline * (0.05 + 0.10 * diff) * uGridAmt;

    // spekulares Highlight — metallisch/flüssig wenn uSpec hoch
    vec3 H = normalize(L + V);
    float spec = pow(clamp(dot(N, H), 0.0, 1.0), 48.0) * uSpec;
    col += uColor * spec * (0.3 + 0.7 * diff);

    // Rim nur am beleuchteten Rand
    float fres = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), uFresnel);
    col += uColor * fres * uRimAmt * (0.2 + 0.8 * diff);

    // Eigenleuchten auf der Tagseite
    col += uColor * diff * uGlow;

    col *= uBright;

    // Hover-Dissolve: Staub-Auflösung an der Cursor-Position
    if (uHoverAmt > 0.001) {
      float hd = distance(vWorld, uHover);
      float infl = smoothstep(uHoverR, 0.0, hd) * uHoverAmt;
      float dn = fbm(vWorld * 9.0 + vec3(0.0, 0.0, uTime * 0.7));
      float cut = infl - dn * 0.92;
      float edge = smoothstep(0.0, 0.10, cut) * (1.0 - smoothstep(0.10, 0.26, cut));
      col += uColor * edge * 2.6; // glühender Staubrand
      if (cut > 0.14) discard;
    }

    gl_FragColor = vec4(col, 1.0);
  }
`;

const ATMO_FRAG = /* glsl */ `
  precision highp float;
  uniform vec3 uColor;
  uniform float uBright;
  uniform vec3 uLight;
  varying vec3 vNormal;
  varying vec3 vView;
  void main(){
    vec3 N = normalize(vNormal);
    float fres = pow(1.0 - clamp(dot(N, normalize(vView)),0.0,1.0), 4.0);
    float lit = clamp(dot(N, normalize(uLight)), 0.0, 1.0);
    gl_FragColor = vec4(uColor * fres * 0.5 * uBright, fres * (0.1 + 0.9 * lit) * 0.4);
  }
`;

/* ─────────────────────────────────────────────────────────────────────────
   Mond — leuchtender Daten-Knoten
   ───────────────────────────────────────────────────────────────────────── */
function Moon({
  radius,
  speed,
  phase,
  size,
  color,
}: {
  radius: number;
  speed: number;
  phase: number;
  size: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + phase;
    if (ref.current)
      ref.current.position.set(Math.cos(t) * radius, Math.sin(t) * radius * 0.32, Math.sin(t) * radius);
  });
  return (
    <mesh ref={ref} raycast={() => null}>
      <sphereGeometry args={[size, 20, 20]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Digitale Annotation — Mono-Label + dünne Verbindungslinie (igloo-Stil)
   ───────────────────────────────────────────────────────────────────────── */
function Annotation({ data, hovered }: { data: PlanetData; hovered: boolean }) {
  const side = data.labelSide;
  const tip: [number, number, number] = [side * data.size * 0.6, data.size * 0.25, data.size * 0.45];
  // Nur der feine Idle-Marker lebt im Canvas. Die volle Beschriftung ist ein DOM-Overlay
  // (siehe ScreenProjector + PlanetLabel) → kein drei-<Html>-Flackern.
  return (
    <group>
      <Line points={[[tip[0] - 0.08, tip[1], tip[2]], [tip[0] + 0.08, tip[1], tip[2]]]} color="#D4AE5A" lineWidth={1} transparent opacity={hovered ? 0 : 0.5} />
      <Line points={[[tip[0], tip[1] - 0.08, tip[2]], [tip[0], tip[1] + 0.08, tip[2]]]} color="#D4AE5A" lineWidth={1} transparent opacity={hovered ? 0 : 0.5} />
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Holografischer Planet
   ───────────────────────────────────────────────────────────────────────── */
function Planet({
  data,
  index,
  focused,
  anyFocused,
  look,
  mobile,
  onSelect,
  onHover,
}: {
  data: PlanetData;
  index: number;
  focused: boolean;
  anyFocused: boolean;
  look: Look;
  mobile: boolean;
  onSelect: (i: number) => void;
  onHover: (i: number | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const dimmed = anyFocused && !focused;
  const moonRadius = data.size + 0.8;

  const light = useMemo(() => new THREE.Vector3(0.55, 0.45, 0.7).normalize(), []);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(data.color) },
      uDeep: { value: new THREE.Color(data.color2) },
      uBright: { value: 1 },
      uGrid: { value: new THREE.Vector2(data.grid[0], data.grid[1]) },
      uFresnel: { value: data.fresnel },
      uLight: { value: light },
      uHover: { value: new THREE.Vector3(0, -999, 0) },
      uHoverAmt: { value: 0 },
      uHoverR: { value: data.size * 0.75 },
      uTint: { value: look.tint },
      uGlow: { value: look.glow },
      uGridAmt: { value: look.gridAmt },
      uRelief: { value: look.relief },
      uRimAmt: { value: look.rimAmt },
      uSpec: { value: look.spec },
    }),
    // look bewusst NICHT in deps — Werte werden pro Frame sanft synchronisiert
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, light]
  );
  const atmoUniforms = useMemo(
    () => ({ uColor: { value: new THREE.Color(data.color) }, uBright: { value: 1 }, uLight: { value: light } }),
    [data, light]
  );

  useFrame((_, delta) => {
    uniforms.uTime.value += delta;
    if (coreRef.current) coreRef.current.rotation.y += delta * 0.1;

    // Look-Werte weich nachziehen (smoothes Morphing zwischen Presets)
    const k = Math.min(1, delta * 4);
    uniforms.uTint.value += (look.tint - uniforms.uTint.value) * k;
    uniforms.uGlow.value += (look.glow - uniforms.uGlow.value) * k;
    uniforms.uGridAmt.value += (look.gridAmt - uniforms.uGridAmt.value) * k;
    uniforms.uRelief.value += (look.relief - uniforms.uRelief.value) * k;
    uniforms.uRimAmt.value += (look.rimAmt - uniforms.uRimAmt.value) * k;
    uniforms.uSpec.value += (look.spec - uniforms.uSpec.value) * k;
    const targetB = dimmed ? 0.28 : 1;
    uniforms.uBright.value += (targetB - uniforms.uBright.value) * Math.min(1, delta * 6);
    atmoUniforms.uBright.value = uniforms.uBright.value;

    // Staub-Auflösung sanft ein-/ausblenden
    const targetH = hovered && !anyFocused ? 1 : 0;
    uniforms.uHoverAmt.value += (targetH - uniforms.uHoverAmt.value) * Math.min(1, delta * 5);

    // Kein Hover-Scale → die Klick-Hülle bleibt stabil. Nur beim Fokus (Klick) skalieren.
    const targetScale = focused ? 1.1 : 1;
    if (groupRef.current) {
      const s = groupRef.current.scale.x;
      groupRef.current.scale.setScalar(s + (targetScale - s) * Math.min(1, delta * 8));
    }
  });

  return (
    <group position={mobile ? data.mPos : data.position}>
      <group ref={groupRef}>
        <mesh ref={coreRef}>
          <sphereGeometry args={[data.size, 128, 128]} />
          <shaderMaterial uniforms={uniforms} vertexShader={VERT} fragmentShader={FRAG} toneMapped={false} />
        </mesh>

        {/* Unsichtbare Klick-/Hover-Hülle — 1.5×, deckt den ganzen sichtbaren Planeten inkl. Glow ab */}
        <mesh
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            onHover(index);
          }}
          onPointerOut={() => {
            setHovered(false);
            onHover(null);
          }}
          onPointerMove={(e) => {
            uniforms.uHover.value.copy(e.point);
          }}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(index);
          }}
        >
          <sphereGeometry args={[data.size * 1.5, 24, 24]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>

        {/* Atmosphären-Halo */}
        <mesh scale={1.09} raycast={() => null}>
          <sphereGeometry args={[data.size, 48, 48]} />
          <shaderMaterial
            uniforms={atmoUniforms}
            vertexShader={VERT}
            fragmentShader={ATMO_FRAG}
            transparent
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>

        {/* Planetarer Ring */}
        {data.ring && (
          <mesh rotation={[Math.PI / 2.3, 0, 0.35]} raycast={() => null}>
            <ringGeometry args={[data.size * 1.5, data.size * 2.0, 160]} />
            <meshBasicMaterial
              color={data.color}
              transparent
              opacity={dimmed ? 0.03 : 0.16}
              side={THREE.DoubleSide}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        )}

        {!anyFocused && <Annotation data={data} hovered={hovered} />}
      </group>

      {/* Orbit-Ring — sehr fein, fast nur angedeutet */}
      <mesh rotation={[Math.PI / 2.1, 0, 0]} raycast={() => null}>
        <ringGeometry args={[moonRadius - 0.008, moonRadius + 0.008, 160]} />
        <meshBasicMaterial
          color={data.color}
          transparent
          opacity={dimmed ? 0.02 : 0.07}
          side={THREE.DoubleSide}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {!dimmed &&
        data.moons.map((m, mi) => (
          <Moon
            key={m.name}
            radius={moonRadius}
            speed={0.22 + mi * 0.05}
            phase={(mi / data.moons.length) * Math.PI * 2}
            size={0.06 + (mi % 2) * 0.015}
            color={data.color}
          />
        ))}
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Kamera-Rig — Maus-Parallax + Dive-In (Planet nach links)
   ───────────────────────────────────────────────────────────────────────── */
function CameraRig({ focusIndex, mobile }: { focusIndex: number | null; mobile: boolean }) {
  const { camera, pointer } = useThree();
  const lookAt = useRef(new THREE.Vector3(0, 0, 0));
  useFrame((_, delta) => {
    const lerp = Math.min(1, delta * 2.2);
    let targetPos: THREE.Vector3;
    let targetLook: THREE.Vector3;
    if (focusIndex !== null) {
      const sp = mobile ? SYSTEM[focusIndex].mPos : SYSTEM[focusIndex].position;
      const p = new THREE.Vector3(...sp);
      const d = SYSTEM[focusIndex].size + 4.0;
      if (mobile) {
        // Panel ist auf Mobile fast Vollbild → einfach gerade reinzoomen, Planet zentriert
        targetPos = new THREE.Vector3(p.x, p.y, p.z + d);
        targetLook = new THREE.Vector3(p.x, p.y, p.z);
      } else {
        // Blickpunkt rechts vom Planeten → Planet rückt nach links, rechts Platz fürs Panel
        targetPos = new THREE.Vector3(p.x + 1.0, p.y + 0.3, p.z + d);
        targetLook = new THREE.Vector3(p.x + 3.6, p.y, p.z);
      }
    } else {
      targetPos = new THREE.Vector3(0, 0, mobile ? 16 : 15);
      targetPos.x += pointer.x * 0.9;
      targetPos.y += pointer.y * 0.6;
      targetLook = new THREE.Vector3(0, 0, 0);
    }
    camera.position.lerp(targetPos, lerp);
    lookAt.current.lerp(targetLook, lerp);
    camera.lookAt(lookAt.current);
  });
  return null;
}

/* ─────────────────────────────────────────────────────────────────────────
   Screen-Projektor — projiziert den gehoverten Planeten auf Pixel und
   positioniert das DOM-Label (ersetzt drei <Html> → kein Flackern)
   ───────────────────────────────────────────────────────────────────────── */
function ScreenProjector({
  hover,
  focusActive,
  mobile,
  labelRef,
}: {
  hover: number | null;
  focusActive: boolean;
  mobile: boolean;
  labelRef: { current: HTMLDivElement | null };
}) {
  const { camera, size } = useThree();
  const v = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    const el = labelRef.current;
    if (!el) return;
    if (hover === null || focusActive) {
      el.style.opacity = "0";
      return;
    }
    const p = SYSTEM[hover];
    const sp = mobile ? p.mPos : p.position;
    v.set(
      sp[0] + p.labelSide * (p.size * 1.15 + 0.45),
      sp[1] + p.size * 0.45 + (p.labelDy || 0),
      sp[2]
    );
    v.project(camera);
    el.style.transform = `translate(${(v.x * 0.5 + 0.5) * size.width}px, ${(-v.y * 0.5 + 0.5) * size.height}px)`;
    el.style.opacity = "1";
  });
  return null;
}

/* ─────────────────────────────────────────────────────────────────────────
   Dauerhafte Mini-Tags unter jedem Planeten — machen ohne Hover sichtbar,
   wofür jeder Planet steht (wichtig auf Mobile, wo es kein Hover gibt).
   Blenden aus, sobald ein Planet fokussiert ist oder das grosse Hover-Label
   diesen Planeten schon beschriftet.
   ───────────────────────────────────────────────────────────────────────── */
function TagProjector({
  tagRefs,
  hover,
  focusActive,
  mobile,
}: {
  tagRefs: { current: (HTMLDivElement | null)[] };
  hover: number | null;
  focusActive: boolean;
  mobile: boolean;
}) {
  const { camera, size } = useThree();
  const v = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    SYSTEM.forEach((p, i) => {
      const el = tagRefs.current[i];
      if (!el) return;
      if (focusActive || hover === i) {
        el.style.opacity = "0";
        return;
      }
      const sp = mobile ? p.mPos : p.position;
      v.set(sp[0], sp[1] - p.size - 0.6, sp[2]);
      v.project(camera);
      el.style.transform = `translate(calc(${(v.x * 0.5 + 0.5) * size.width}px - 50%), ${(-v.y * 0.5 + 0.5) * size.height}px)`;
      el.style.opacity = hover === null ? "1" : "0.35";
    });
  });
  return null;
}

/* Volles Hover-Label — reines DOM, außerhalb des Canvas */
function PlanetLabel({ data }: { data: PlanetData }) {
  const left = data.labelSide < 0;
  return (
    <div
      style={{
        position: "absolute",
        transform: `translate(${left ? "calc(-100% - 16px)" : "16px"}, -50%)`,
        textAlign: left ? "right" : "left",
        fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
        color: "#FAF8F5",
        textShadow: "0 2px 18px rgba(0,0,0,1), 0 0 28px rgba(0,0,0,0.95)",
        lineHeight: 1.35,
        whiteSpace: "nowrap",
      }}
    >
      <div style={{ fontSize: 13, letterSpacing: "0.28em", color: "#D4AE5A" }}>{data.code}</div>
      <div style={{ fontSize: 22, letterSpacing: "0.04em", fontWeight: 500, marginTop: 4 }}>{data.title.toUpperCase()}</div>
      <div style={{ height: 1, width: "100%", background: "rgba(212,174,90,0.45)", margin: "9px 0" }} />
      <div style={{ fontSize: 13, opacity: 0.82, whiteSpace: "normal", maxWidth: 280, fontFamily: "var(--font-instrument-serif), serif", lineHeight: 1.4 }}>
        {data.subtitle}
      </div>
      <div style={{ fontSize: 12, letterSpacing: "0.22em", color: "#D4AE5A", marginTop: 8 }}>
        {left ? "← CLICK TO EXPLORE" : "CLICK TO EXPLORE →"}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Szene
   ───────────────────────────────────────────────────────────────────────── */
function Scene({
  focusIndex,
  hover,
  look,
  mobile,
  labelRef,
  tagRefs,
  onSelect,
  onHover,
}: {
  focusIndex: number | null;
  hover: number | null;
  look: Look;
  mobile: boolean;
  labelRef: { current: HTMLDivElement | null };
  tagRefs: { current: (HTMLDivElement | null)[] };
  onSelect: (i: number) => void;
  onHover: (i: number | null) => void;
}) {
  return (
    <>
      <Stars radius={90} depth={60} count={3200} factor={4} saturation={0} fade speed={0.5} />
      {/* Planeten bleiben statisch an ihrem Platz (keine System-Rotation) → sauber hoverbar */}
      <group>
        {SYSTEM.map((p, i) => (
          <Planet
            key={p.key}
            data={p}
            index={i}
            focused={focusIndex === i}
            anyFocused={focusIndex !== null}
            look={look}
            mobile={mobile}
            onSelect={onSelect}
            onHover={onHover}
          />
        ))}
      </group>
      <ScreenProjector hover={hover} focusActive={focusIndex !== null} mobile={mobile} labelRef={labelRef} />
      <TagProjector tagRefs={tagRefs} hover={hover} focusActive={focusIndex !== null} mobile={mobile} />
      <CameraRig focusIndex={focusIndex} mobile={mobile} />
      <EffectComposer>
        <Bloom intensity={look.bloom} luminanceThreshold={look.threshold} luminanceSmoothing={0.8} mipmapBlur radius={0.55} />
        <Vignette eskil={false} offset={0.22} darkness={0.72} />
      </EffectComposer>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Stealth-Cursor
   ───────────────────────────────────────────────────────────────────────── */
function StealthCursor({ active, hovering }: { active: boolean; hovering: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (ref.current) ref.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return (
    <div ref={ref} className="pointer-events-none fixed left-0 top-0 z-30" style={{ opacity: active ? 1 : 0, transition: "opacity 0.25s" }}>
      <div
        style={{
          position: "absolute",
          transform: "translate(-50%, -50%)",
          width: hovering ? 46 : 24,
          height: hovering ? 46 : 24,
          borderRadius: "50%",
          border: `1px solid rgba(212,174,90,${hovering ? 0.9 : 0.5})`,
          transition: "width 0.2s, height 0.2s, border-color 0.2s",
        }}
      />
      <div style={{ position: "absolute", transform: "translate(-50%, -50%)", width: 3, height: 3, borderRadius: "50%", background: "#FAF8F5" }} />
      {hovering && (
        <div
          style={{
            position: "absolute",
            transform: "translate(-50%, -50%)",
            top: 38,
            fontFamily: "ui-monospace, monospace",
            fontSize: 9,
            letterSpacing: "0.2em",
            color: "#D4AE5A",
            whiteSpace: "nowrap",
          }}
        >
          EXPLORE
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Cosmic-Stage-Panel — digitales Detail rechts, Planet links
   ───────────────────────────────────────────────────────────────────────── */
function CornerBrackets() {
  const c = "rgba(184,150,62,0.6)";
  const L = 20;
  const common = { position: "absolute" as const, width: L, height: L };
  return (
    <>
      <div style={{ ...common, top: 0, left: 0, borderTop: `1.5px solid ${c}`, borderLeft: `1.5px solid ${c}` }} />
      <div style={{ ...common, top: 0, right: 0, borderTop: `1.5px solid ${c}`, borderRight: `1.5px solid ${c}` }} />
      <div style={{ ...common, bottom: 0, left: 0, borderBottom: `1.5px solid ${c}`, borderLeft: `1.5px solid ${c}` }} />
      <div style={{ ...common, bottom: 0, right: 0, borderBottom: `1.5px solid ${c}`, borderRight: `1.5px solid ${c}` }} />
    </>
  );
}

function DetailPanel({ planet, onClose }: { planet: PlanetData; onClose: () => void }) {
  return (
    <motion.div
      key={planet.key}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ type: "spring", damping: 30, stiffness: 230 }}
      className="pointer-events-auto absolute right-[5vw] top-1/2 w-[min(90vw,460px)] -translate-y-1/2"
    >
      <div
        className="relative px-9 py-10"
        style={{
          background: "linear-gradient(160deg, rgba(16,12,7,0.78), rgba(8,6,4,0.66))",
          border: "1px solid rgba(184,150,62,0.25)",
          backdropFilter: "blur(18px)",
          boxShadow: "0 0 70px rgba(184,150,62,0.1), inset 0 0 50px rgba(0,0,0,0.55)",
        }}
      >
        <CornerBrackets />

        {/* Kopfzeile */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{planet.code}</span>
          <button
            type="button"
            onClick={onClose}
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-warm-mid transition-colors hover:text-cream"
          >
            [ close ]
          </button>
        </div>

        <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.28em] text-warm-mid">{planet.subtitle}</p>
        <h3 className="mt-2 font-serif text-[2.6rem] leading-[1.05] text-cream">{planet.title}</h3>

        {/* Pitch — spricht den ICP an */}
        <p className="mt-5 text-[0.95rem] leading-relaxed text-warm-light/85">{planet.pitch}</p>

        {/* Angebote mit Hover-Effekt → Unterseiten */}
        <div className="mt-8 border-t border-white/10">
          {planet.moons.map((m, i) => (
            <Link
              key={m.name}
              href={m.href}
              className="group relative block overflow-hidden border-b border-white/10"
            >
              {/* Hover-Füllung schiebt von links rein */}
              <span className="absolute inset-0 -translate-x-full bg-gold/8 transition-transform duration-300 ease-out group-hover:translate-x-0" />
              <span className="relative flex items-center gap-4 py-4 pl-1 transition-[padding] duration-300 group-hover:pl-4">
                <span className="font-mono text-[10px] text-gold/70">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1">
                  <span className="block font-medium text-warm-light transition-colors group-hover:text-cream">
                    {m.name}
                  </span>
                  <span className="block text-[0.8rem] text-warm-mid">{m.desc}</span>
                </span>
                <span className="font-mono text-gold opacity-0 -translate-x-2 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>

        <Link
          href={planet.href}
          className="mt-9 inline-flex w-fit items-center gap-2 rounded-full bg-gold-light px-6 py-3 font-mono text-xs uppercase tracking-[0.1em] text-tech-bg transition-colors hover:bg-gold"
        >
          {planet.cta}
          <span>→</span>
        </Link>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Haupt-Sektion
   ───────────────────────────────────────────────────────────────────────── */
export default function SolarSystem() {
  const [mounted, setMounted] = useState(false);
  const [focus, setFocus] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [inside, setInside] = useState(false);
  const [mobile, setMobile] = useState(false);
  const labelRef = useRef<HTMLDivElement>(null);
  const tagRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const onR = () => setMobile(window.innerWidth < 768);
    onR();
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);

  const selected = useMemo(() => (focus !== null ? SYSTEM[focus] : null), [focus]);
  const hovered = useMemo(() => (hover !== null ? SYSTEM[hover] : null), [hover]);
  const look = LOOKS[3]; // Seide Matt als Standard (Dev-Switcher entfernt)

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ background: "#0A0806", cursor: inside ? "none" : "auto" }}
      onPointerEnter={() => setInside(true)}
      onPointerLeave={() => {
        setInside(false);
        setHover(null);
      }}
    >
      <div className="absolute inset-0 z-0">
        {mounted && (
          <Canvas
            camera={{ position: [0, 0, mobile ? 16 : 15], fov: 50 }}
            dpr={mobile ? [1, 1.5] : [1, 2]}
            gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
            onPointerMissed={() => setFocus(null)}
            style={{ background: "#0A0806" }}
          >
            <Scene focusIndex={focus} hover={hover} look={look} mobile={mobile} labelRef={labelRef} tagRefs={tagRefs} onSelect={setFocus} onHover={setHover} />
          </Canvas>
        )}
      </div>

      {/* Hover-Label als DOM-Overlay — vom ScreenProjector per Transform positioniert */}
      <div ref={labelRef} className="pointer-events-none fixed left-0 top-0 z-30" style={{ opacity: 0, transition: "opacity 0.18s ease", willChange: "transform" }}>
        {hovered && <PlanetLabel data={hovered} />}
      </div>

      {/* Dauerhafte Angebots-Tags unter den Planeten — vom TagProjector positioniert */}
      {SYSTEM.map((p, i) => (
        <div
          key={`tag-${p.key}`}
          ref={(el) => {
            tagRefs.current[i] = el;
          }}
          className="pointer-events-none fixed left-0 top-0 z-20 flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-1.5"
          style={{
            opacity: 0,
            transition: "opacity 0.25s ease",
            willChange: "transform",
            background: "rgba(10,8,6,0.55)",
            border: `1px solid ${p.color}55`,
            backdropFilter: "blur(6px)",
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: p.color, boxShadow: `0 0 8px ${p.color}` }} />
          <span
            style={{
              fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#EDE8E0",
              textShadow: "0 1px 10px rgba(0,0,0,0.9)",
            }}
          >
            {p.tag}
          </span>
        </div>
      ))}

      <div className="pointer-events-none absolute inset-0 z-10">
        <AnimatePresence mode="wait">
          {selected && <DetailPanel planet={selected} onClose={() => setFocus(null)} />}
        </AnimatePresence>
      </div>

      <StealthCursor active={inside} hovering={hover !== null} />
    </section>
  );
}
