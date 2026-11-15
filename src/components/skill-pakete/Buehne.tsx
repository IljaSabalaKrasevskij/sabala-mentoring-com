"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Html, Lightformer, RoundedBox, Sparkles, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { PAKETE, type PaketId } from "./daten";

/* ─────────────────────────────────────────────────────────────────────────
   3D-Bühne der Skill-Pakete (Iljas Wunsch, 15.11.2026: „wirklich 3D-Elemente“).
   Mooni schwebt in der Mitte, die Pakete kreisen um ihn (so viele, wie in daten.ts stehen). Beim Weiterscrollen
   (fokus → 1) stellen sich die drei Pakete des gewählten Berufs in eine Reihe, die Deckel klappen auf, Licht
   fällt heraus und die Skills steigen als Karten nach oben. Die übrigen Pakete umkreisen Mooni als kleine
   Trabanten. Wechselt der Beruf, tauschen die Pakete die Plätze.

   Technik wie Mooni auf der Startseite (ValuesManifesto): three.js über @react-three/fiber, rechnet nur,
   solange die Bühne zu sehen ist (`aktiv`). Der Entpacker für das Modell liegt lokal unter /draco,
   es geht keine Anfrage an fremde Server. Alle Bewegung läuft in EINER Schleife über Referenzen,
   React zeichnet beim Scrollen nichts neu.
   Das Leuchten ist gemalt (Flächen mit weichem Verlauf, die Licht addieren), kein Nachbearbeiten des Bildes:
   Das hält die Bühne durchsichtig und am Handy schnell.
   Zeichnungen der Symbole: Lucide (ISC-Lizenz), dieselben Symbole wie in den Karten darunter.
   ───────────────────────────────────────────────────────────────────────── */

const MOONI = "/mooni/mooni-robot.glb";
const DRACO = "/draco/";
/* Das Modell schaut von Haus aus zur Seite. So gedreht, schaut Mooni nach vorn. */
const MOONI_BLICK = -Math.PI / 2;
const TAU = Math.PI * 2;
/* Neigung der Bahn: Je Einheit Radius liegt ein Paket vorn so viel tiefer und so viel näher. */
const BAHN_Y = 0.127;
const BAHN_Z = 0.62;
/* Höhe der Bahnmitte. Mooni steht mit den Füßen darauf. */
const BAHN_HOEHE = -0.76;
const BAHN_NEIGUNG = Math.atan2(BAHN_Z, -BAHN_Y);
const BAHN_TIEFE = Math.hypot(BAHN_Y, BAHN_Z);

/** Wird von der Seite beschrieben: 0 = alle Pakete kreisen um Mooni, 1 = die drei Pakete des Setups stehen in einer Reihe. */
export type Steuer = { fokus: number };

type Props = {
  steuer: React.RefObject<Steuer>;
  /** Die drei Pakete des gewählten Berufs, in der Reihenfolge, in der man sie nutzt. */
  setup: PaketId[];
  aktiv: boolean;
  /** „Bewegung reduzieren“: kein Kreisen, kein Schweben, Wechsel ohne Fahrt. */
  ruhig: boolean;
  onPaket: (id: PaketId) => void;
};

const ZEICHEN: Record<PaketId, string> = {
  texte:
    '<path d="M13 21h8"/><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>',
  design:
    '<path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".9" fill="#fff"/><circle cx="17.5" cy="10.5" r=".9" fill="#fff"/><circle cx="6.5" cy="12.5" r=".9" fill="#fff"/><circle cx="8.5" cy="7.5" r=".9" fill="#fff"/>',
  seo: '<path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/>',
  recherche: '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
  social:
    '<path d="M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/><path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14"/><path d="M8 6v8"/>',
  entwicklung: '<path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>',
};

/* Kurze Namen für die Schilder unter den Paketen: Auf der Bühne ist wenig Platz. */
const KURZ: Record<PaketId, string> = Object.fromEntries(PAKETE.map((p) => [p.id, p.kurz])) as Record<PaketId, string>;

/** Weißes Symbol auf Schwarz, als Maske für die Goldprägung auf der Schachtel. */
function zeichenTextur(inhalt: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="-4 -4 32 32" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="-4" y="-4" width="32" height="32" fill="#000" stroke="none"/>${inhalt}</svg>`;
  const t = new THREE.TextureLoader().load(`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`);
  t.anisotropy = 8;
  return t;
}

function leinen(b: number, h: number, malen: (x: CanvasRenderingContext2D) => void) {
  const c = document.createElement("canvas");
  c.width = b;
  c.height = h;
  malen(c.getContext("2d")!);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Eine Skill-Karte: cremefarbenes Blatt mit Goldkante und ein paar Zeilen. Lesen muss man sie nicht, die Namen stehen in der Seite. */
const kartenTextur = () =>
  leinen(256, 352, (x) => {
    x.fillStyle = "#F6EEDB";
    x.fillRect(0, 0, 256, 352);
    x.fillStyle = "#C9A24B";
    x.fillRect(0, 0, 256, 36);
    x.fillStyle = "#3a3329";
    x.fillRect(28, 74, 150, 16);
    x.fillStyle = "#b9ad96";
    for (const [y, b] of [[118, 200], [146, 176], [174, 190], [202, 120]]) x.fillRect(28, y, b, 9);
    x.strokeStyle = "#C9A24B";
    x.lineWidth = 6;
    x.strokeRect(3, 3, 250, 346);
  });

/** Weicher runder Schein: in der Mitte hell, zum Rand durchsichtig. */
const scheinTextur = () =>
  leinen(128, 128, (x) => {
    const g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(255,255,255,0.42)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    x.fillStyle = g;
    x.fillRect(0, 0, 128, 128);
  });

/** Lichtkegel aus der offenen Schachtel: unten hell, nach oben und zu den Seiten weich aus. */
const strahlTextur = () =>
  leinen(64, 128, (x) => {
    const hoch = x.createLinearGradient(0, 128, 0, 0);
    hoch.addColorStop(0, "rgba(255,255,255,1)");
    hoch.addColorStop(0.5, "rgba(255,255,255,0.3)");
    hoch.addColorStop(1, "rgba(255,255,255,0)");
    x.fillStyle = hoch;
    x.fillRect(0, 0, 64, 128);
    x.globalCompositeOperation = "destination-in";
    const quer = x.createLinearGradient(0, 0, 64, 0);
    quer.addColorStop(0, "rgba(0,0,0,0)");
    quer.addColorStop(0.5, "rgba(0,0,0,1)");
    quer.addColorStop(1, "rgba(0,0,0,0)");
    x.fillStyle = quer;
    x.fillRect(0, 0, 64, 128);
  });

/* Gemalter Schein: durchsichtige Fläche, deren Licht sich zum Bild dahinter addiert. */
const LICHT = { transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, side: THREE.DoubleSide } as const;

function Mooni({ gruppe }: { gruppe: React.RefObject<THREE.Group | null> }) {
  const { scene } = useGLTF(MOONI, DRACO);
  const modell = useMemo(() => {
    const s = scene.clone(true);
    const box = new THREE.Box3().setFromObject(s);
    const groesse = new THREE.Vector3();
    const mitte = new THREE.Vector3();
    box.getSize(groesse);
    box.getCenter(mitte);
    const k = 2.3 / (groesse.y || 1);
    s.scale.setScalar(k);
    s.position.set(-mitte.x * k, -mitte.y * k, -mitte.z * k);
    return s;
  }, [scene]);
  return (
    <group ref={gruppe} scale={0.001}>
      <group rotation-y={MOONI_BLICK}>
        <primitive object={modell} />
      </group>
    </group>
  );
}
useGLTF.preload(MOONI, DRACO);

function Szene({ steuer, setup, ruhig, onPaket }: Omit<Props, "aktiv">) {
  const { viewport } = useThree();
  const wurzel = useRef<THREE.Group>(null);
  const mooni = useRef<THREE.Group>(null);
  const hof = useRef<THREE.Mesh>(null);
  const bahn = useRef<THREE.Group>(null);
  const boden = useRef<THREE.Mesh>(null);
  const lampe = useRef<THREE.PointLight>(null);
  const kisten = useRef<(THREE.Group | null)[]>([]);
  const deckel = useRef<(THREE.Group | null)[]>([]);
  const karten = useRef<(THREE.Group | null)[][]>(PAKETE.map(() => []));
  const schilder = useRef<(HTMLDivElement | null)[]>([]);
  const nummern = useRef<(HTMLSpanElement | null)[]>([]);
  // Stoffe, deren Helligkeit sich bewegt, stehen unten in der Szene und werden über diese Griffe geändert.
  const linien = useRef<(THREE.LineBasicMaterial | null)[]>([]);
  const bahnSchein = useRef<THREE.MeshBasicMaterial>(null);
  const bodenSchein = useRef<THREE.MeshBasicMaterial>(null);
  const praegung = useRef<(THREE.MeshStandardMaterial | null)[]>([]);
  const glimmen = useRef<(THREE.MeshBasicMaterial | null)[]>([]);
  const strahl = useRef<(THREE.MeshBasicMaterial | null)[]>([]);
  const z = useRef({ f: 0, zeit: 0, drehung: 0, winkel: PAKETE.map((_, i) => Math.PI / 2 + (i * TAU) / PAKETE.length), offen: PAKETE.map(() => 0), hover: -1, mooni: 0 });

  // Geteilte Stoffe und Bilder, die sich nie ändern: Lack, Gold, Karte, das Licht im Inneren, die Masken der Prägung.
  const stoff = useMemo(
    () => ({
      lack: new THREE.MeshPhysicalMaterial({ color: "#2a1f13", roughness: 0.3, metalness: 0.25, clearcoat: 1, clearcoatRoughness: 0.14, envMapIntensity: 1.5 }),
      gold: new THREE.MeshStandardMaterial({ color: "#D9B45F", metalness: 1, roughness: 0.22, envMapIntensity: 1.6 }),
      karte: new THREE.MeshBasicMaterial({ map: kartenTextur(), toneMapped: false, side: THREE.DoubleSide }),
      innen: PAKETE.map((p) => new THREE.MeshBasicMaterial({ color: p.farbe, toneMapped: false })),
      schein: scheinTextur(),
      strahl: strahlTextur(),
      zeichen: PAKETE.map((p) => zeichenTextur(ZEICHEN[p.id])),
    }),
    [],
  );

  // Die Bahn als feine Linie, einmal ganz und einmal enger.
  const ring = useMemo(() => {
    const punkte = Array.from({ length: 96 }, (_, i) => {
      const w = (i / 96) * TAU;
      return new THREE.Vector3(Math.cos(w), -BAHN_Y * Math.sin(w), BAHN_Z * Math.sin(w));
    });
    return new THREE.BufferGeometry().setFromPoints(punkte);
  }, []);

  // Rang im Setup (0, 1, 2) oder -1 für die Pakete, die nicht dazugehören.
  const rang = useMemo(() => PAKETE.map((p) => setup.indexOf(p.id)), [setup]);
  const uebrig = Math.max(1, PAKETE.length - setup.length);

  useFrame((state, dtRoh) => {
    const dt = Math.min(dtRoh, 0.05);
    const s = z.current;
    const t = state.clock.elapsedTime;
    const k = (lambda: number) => (ruhig ? 1 : 1 - Math.exp(-lambda * dt));
    s.zeit += dt;

    const ziel = THREE.MathUtils.clamp(steuer.current?.fokus ?? 0, 0, 1);
    s.f += (ziel - s.f) * k(5);
    const e = s.f * s.f * (3 - 2 * s.f);

    // Maßstab: entworfen für eine Bühne von 4,9 × 4,15 Einheiten. Kleinere Bühnen schrumpfen alles gemeinsam.
    const u = THREE.MathUtils.clamp(Math.min(viewport.width / 4.9, viewport.height / 4.15), 0.5, 1.5);
    const halbB = viewport.width / u / 2;
    const halbH = viewport.height / u / 2;
    if (wurzel.current) {
      wurzel.current.scale.setScalar(u);
      wurzel.current.rotation.y += (state.pointer.x * 0.1 - wurzel.current.rotation.y) * k(3);
      wurzel.current.rotation.x += (-state.pointer.y * 0.045 - wurzel.current.rotation.x) * k(3);
    }

    // Bahn: dreht sich langsam, in der Reihe steht sie still.
    if (!ruhig) s.drehung += dt * 0.16 * (1 - e);
    const R = THREE.MathUtils.clamp(halbB - 0.55, 1.35, 2.1);
    const S = THREE.MathUtils.clamp(halbB * 0.56, 1.1, 1.62);
    // Die Reihe hängt am unteren Rand der Bühne, Mooni am oberen: So passen auch die Schilder in ein flaches Fenster.
    const reiheY = -halbH + 1.28;
    const mooniY = 0.3 + (halbH - 0.62 - 0.3) * e;
    let hinten = 0;

    if (bahn.current) bahn.current.scale.setScalar(R);
    for (const l of linien.current) if (l) l.opacity = 0.42 * (1 - e);
    if (bahnSchein.current) bahnSchein.current.opacity = 0.5 * (1 - e);
    if (bodenSchein.current) bodenSchein.current.opacity = 0.62 * e;
    if (boden.current) {
      boden.current.position.y = reiheY - 0.44 * (S / 1.62);
      // Der Schein läuft innerhalb der Bühne aus, sonst sähe man ihre Kante.
      boden.current.scale.set(Math.min(S * 3.2, halbB * 1.9), 2.2, 1);
    }

    PAKETE.forEach((_, i) => {
      const g = kisten.current[i];
      if (!g) return;
      const r = rang[i];

      // Winkel auf dem kürzesten Weg zum Platz
      const zielW = Math.PI / 2 + (i * TAU) / PAKETE.length + s.drehung;
      let d = (zielW - s.winkel[i]) % TAU;
      if (d > Math.PI) d -= TAU;
      if (d < -Math.PI) d += TAU;
      s.winkel[i] += d * k(3.2);
      const w = s.winkel[i];
      const vorn = Math.sin(w);
      const schweb = ruhig ? 0 : Math.sin(t * 1.1 + i * 1.7) * 0.05;
      // Auftritt: Die Pakete kommen nacheinander.
      const auf = ruhig ? 1 : THREE.MathUtils.smoothstep(s.zeit, 0.3 + i * 0.11, 1.2 + i * 0.11);

      // A: Bahn um Mooni, knapp über der Scheibe
      const ax = R * Math.cos(w);
      const ay = BAHN_HOEHE + 0.27 - BAHN_Y * R * vorn + schweb;
      const az = BAHN_Z * R * vorn;
      const as = 0.6;
      const ary = -Math.cos(w) * 0.55;

      // B: Reihe der drei Pakete. Die übrigen umkreisen Mooni als kleine Trabanten.
      let bx: number, by: number, bz: number, bs: number, bry: number;
      if (r >= 0) {
        bx = (r - 1) * S;
        by = reiheY + schweb * 0.4;
        bz = 0.3;
        bs = S / 1.62;
        bry = (1 - r) * 0.2;
      } else {
        const wk = (hinten++ / uebrig) * TAU + 0.6 + (ruhig ? 0 : t * 0.3);
        bx = Math.cos(wk) * 1.5;
        by = mooniY - 0.12 + Math.sin(wk) * 0.14 + schweb;
        bz = -1.1 + Math.sin(wk) * 0.8;
        bs = 0.3;
        bry = Math.PI / 2 - wk;
      }
      g.position.set(ax + (bx - ax) * e, ay + (by - ay) * e, az + (bz - az) * e);
      g.scale.setScalar(Math.max((as + (bs - as) * e) * auf, 0.001));
      g.rotation.set(0.2 - 0.07 * e, ary + (bry - ary) * e, 0);

      // Deckel, Licht und Karten
      const offenZiel = s.hover === i || (r >= 0 && e > 0.55) ? 1 : 0;
      s.offen[i] += (offenZiel - s.offen[i]) * k(4.5);
      const o = s.offen[i];
      const dk = deckel.current[i];
      if (dk) dk.rotation.x = -o * 1.18;
      karten.current[i].forEach((kg, j) => {
        if (!kg) return;
        const oj = THREE.MathUtils.clamp(o * 1.25 - j * 0.12, 0, 1);
        kg.position.set((j - 1) * 0.3, 0.04 + oj * (0.5 + (1 - Math.abs(j - 1)) * 0.07), -0.05 + (1 - j) * 0.02);
        kg.rotation.set(-0.1, 0, (1 - j) * 0.16 * oj);
      });
      // In der Reihe treten die Pakete zurück, die nicht zum Setup gehören.
      const matt = r < 0 ? e : 0;
      const pr = praegung.current[i];
      if (pr) {
        pr.emissiveIntensity = (0.6 + o * 0.5) * (1 - 0.6 * matt);
        pr.opacity = 1 - 0.4 * matt;
      }
      const gl = glimmen.current[i];
      if (gl) gl.opacity = (0.3 + o * 0.25) * (1 - 0.7 * matt);
      const st = strahl.current[i];
      if (st) st.opacity = o * 0.6;

      // Schild: in der Reihe für die drei Pakete, sonst nur unter dem Paket, über dem die Maus steht
      const schild = schilder.current[i];
      if (schild) {
        const sicht = r >= 0 ? Math.max(THREE.MathUtils.clamp((e - 0.55) / 0.3, 0, 1), s.hover === i ? 1 : 0) : s.hover === i && e < 0.5 ? 1 : 0;
        schild.style.opacity = String(sicht);
      }
      // Die Nummer gilt für die Reihenfolge im Setup. Solange die Pakete kreisen, steht nur der Name da.
      const nr = nummern.current[i];
      if (nr) nr.style.display = e > 0.5 ? "flex" : "none";
    });

    // Mooni: in der Mitte der Bahn, in der Reihe kleiner und oben, mit Blick auf die Pakete
    const m = mooni.current;
    if (m) {
      s.mooni += (1 - s.mooni) * k(2.2);
      const ms = (1 + (0.56 - 1) * e) * s.mooni;
      const mBob = ruhig ? 0 : Math.sin(t * 0.8) * 0.06;
      m.position.set(0, mooniY + mBob, -1.1 * e);
      m.scale.setScalar(Math.max(ms, 0.001));
      m.rotation.y += (state.pointer.x * 0.35 - m.rotation.y) * k(3);
      m.rotation.x += (0.18 * e - state.pointer.y * 0.12 - m.rotation.x) * k(3);
      if (hof.current) {
        hof.current.position.set(0, mooniY, -1.1 * e - 0.9);
        hof.current.scale.setScalar(Math.max(4.2 * ms, 0.001));
      }
    }

    // Eine Lampe wandert über die Szene: Lack und Gold bekommen wandernde Glanzlichter.
    if (lampe.current && !ruhig) lampe.current.position.set(Math.cos(t * 0.45) * 3.2, 1.7, 2.4 + Math.sin(t * 0.45) * 1.4);
  });

  return (
    <group ref={wurzel}>
      <pointLight ref={lampe} position={[2.6, 1.7, 3]} intensity={16} distance={10} decay={2} color="#ffe0a8" />

      {/* Bahn: leuchtende Scheibe und zwei feine Linien, liegen schräg im Raum */}
      <group ref={bahn} position={[0, BAHN_HOEHE, 0]}>
        {[1, 0.68].map((weite, n) => (
          <lineLoop key={weite} geometry={ring} scale={weite}>
            <lineBasicMaterial
              ref={(m) => {
                linien.current[n] = m;
              }}
              color="#D4AE5A"
              transparent
              opacity={0.42}
              depthWrite={false}
            />
          </lineLoop>
        ))}
        <mesh rotation-x={BAHN_NEIGUNG} scale={[1, BAHN_TIEFE, 1]} renderOrder={-2}>
          <planeGeometry args={[2.3, 2.3]} />
          <meshBasicMaterial ref={bahnSchein} map={stoff.schein} color="#C99A3C" opacity={0.5} {...LICHT} />
        </mesh>
      </group>
      {/* Boden unter der Reihe */}
      <mesh ref={boden} rotation-x={-Math.PI / 2} position={[0, -1.3, 0.3]} renderOrder={-2}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial ref={bodenSchein} map={stoff.schein} color="#C99A3C" opacity={0} {...LICHT} />
      </mesh>
      {/* Lichthof hinter Mooni */}
      <mesh ref={hof} renderOrder={-3}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={stoff.schein} color="#E6C879" opacity={0.3} {...LICHT} />
      </mesh>

      <Suspense fallback={null}>
        <Mooni gruppe={mooni} />
      </Suspense>

      {PAKETE.map((p, i) => (
        <group
          key={p.id}
          scale={0.001}
          ref={(g) => {
            kisten.current[i] = g;
          }}
          onPointerOver={(ev) => {
            ev.stopPropagation();
            z.current.hover = i;
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            if (z.current.hover === i) z.current.hover = -1;
            document.body.style.cursor = "";
          }}
          onClick={(ev) => {
            ev.stopPropagation();
            onPaket(p.id);
          }}
        >
          {/* Schachtel: Lack, zwei Goldbänder, vier Füße */}
          <RoundedBox args={[1.2, 0.84, 0.9]} radius={0.07} smoothness={4} material={stoff.lack} />
          <RoundedBox args={[1.216, 0.06, 0.916]} radius={0.02} smoothness={2} position={[0, 0.29, 0]} material={stoff.gold} />
          <RoundedBox args={[1.216, 0.034, 0.916]} radius={0.014} smoothness={2} position={[0, -0.35, 0]} material={stoff.gold} />
          {[-1, 1].flatMap((fx) =>
            [-1, 1].map((fz) => (
              <mesh key={`${fx}${fz}`} position={[fx * 0.5, -0.44, fz * 0.36]} material={stoff.gold}>
                <sphereGeometry args={[0.05, 12, 8]} />
              </mesh>
            )),
          )}
          {/* Goldprägung auf der Vorderseite, dahinter ein Glimmen in der Farbe des Pakets */}
          <mesh position={[0, -0.03, 0.4515]}>
            <planeGeometry args={[0.98, 0.6]} />
            <meshBasicMaterial
              ref={(m) => {
                glimmen.current[i] = m;
              }}
              map={stoff.schein}
              color={p.farbe}
              opacity={0.3}
              {...LICHT}
            />
          </mesh>
          <mesh position={[0, -0.03, 0.4525]}>
            <planeGeometry args={[0.5, 0.5]} />
            <meshStandardMaterial
              ref={(m) => {
                praegung.current[i] = m;
              }}
              color={p.farbe}
              emissive={p.farbe}
              emissiveIntensity={0.6}
              metalness={1}
              roughness={0.3}
              alphaMap={stoff.zeichen[i]}
              transparent
              depthWrite={false}
              polygonOffset
              polygonOffsetFactor={-2}
            />
          </mesh>
          {/* Öffnung: leuchtet in der Farbe des Pakets, sobald der Deckel aufgeht */}
          <mesh position={[0, 0.4215, 0]} rotation={[-Math.PI / 2, 0, 0]} material={stoff.innen[i]}>
            <planeGeometry args={[1.04, 0.74]} />
          </mesh>
          <mesh position={[0, 1.12, -0.16]} renderOrder={1}>
            <planeGeometry args={[1.2, 1.4]} />
            <meshBasicMaterial
              ref={(m) => {
                strahl.current[i] = m;
              }}
              map={stoff.strahl}
              color={p.farbe}
              opacity={0}
              {...LICHT}
            />
          </mesh>
          {/* Drei Skills als Karten */}
          {[0, 1, 2].map((j) => (
            <group
              key={j}
              ref={(g) => {
                karten.current[i][j] = g;
              }}
            >
              <mesh material={stoff.karte} renderOrder={2}>
                <planeGeometry args={[0.46, 0.63]} />
              </mesh>
            </group>
          ))}
          {/* Deckel, hinten angeschlagen */}
          <group
            position={[0, 0.42, -0.45]}
            ref={(g) => {
              deckel.current[i] = g;
            }}
          >
            <RoundedBox args={[1.28, 0.2, 0.98]} radius={0.06} smoothness={4} position={[0, 0.1, 0.45]} material={stoff.lack} />
            <RoundedBox args={[1.292, 0.03, 0.992]} radius={0.012} smoothness={2} position={[0, 0.03, 0.45]} material={stoff.gold} />
            <RoundedBox args={[0.5, 0.012, 0.5]} radius={0.005} smoothness={2} position={[0, 0.204, 0.45]} material={stoff.gold} />
          </group>
          {/* Schild */}
          <Html position={[0, -0.6, 0.5]} center zIndexRange={[5, 0]} style={{ pointerEvents: "none" }}>
            <div
              ref={(el) => {
                schilder.current[i] = el;
              }}
              style={{
                opacity: 0,
                display: "flex",
                alignItems: "center",
                gap: 8,
                whiteSpace: "nowrap",
                fontFamily: "var(--font-satoshi), system-ui",
                fontSize: 15,
                fontWeight: 600,
                color: "#FAF8F5",
                textShadow: "0 1px 10px rgba(0,0,0,0.9)",
              }}
            >
              {rang[i] >= 0 && (
                <span
                  ref={(el) => {
                    nummern.current[i] = el;
                  }}
                  style={{ display: "none", height: 26, width: 26, alignItems: "center", justifyContent: "center", borderRadius: 999, background: "#D4AE5A", color: "#0A0806", fontSize: 15, fontWeight: 700 }}
                >
                  {rang[i] + 1}
                </span>
              )}
              {KURZ[p.id]}
            </div>
          </Html>
        </group>
      ))}

      <Sparkles count={56} scale={[7.5, 4.6, 4]} size={2.6} speed={ruhig ? 0 : 0.28} color="#E6C879" opacity={0.8} />
    </group>
  );
}

export default function Buehne({ aktiv, ...rest }: Props) {
  return (
    <Canvas
      frameloop={aktiv ? "always" : "never"}
      camera={{ position: [0, 0.3, 7], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ touchAction: "pan-y" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3.5, 5, 4]} intensity={2.6} color="#fff4dc" />
      <directionalLight position={[-4, 2, 2.5]} intensity={1.1} color="#F2E2B8" />
      <directionalLight position={[0, 3.5, -5]} intensity={2.4} color="#E6C879" />
      {/* Spiegelungen für Lack und Gold aus eigenen Lichtflächen, ohne Bilddatei von einem fremden Server */}
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={3} color="#fff1d6" position={[0, 4.5, 3]} scale={[9, 3, 1]} rotation-x={-Math.PI / 2.4} />
        <Lightformer form="rect" intensity={2} color="#d4ae5a" position={[-5, 1, 1]} scale={[2, 5, 1]} rotation-y={Math.PI / 2} />
        <Lightformer form="rect" intensity={1.8} color="#ffd9a0" position={[5, 0.5, 2]} scale={[2, 4, 1]} rotation-y={-Math.PI / 2} />
        <Lightformer form="rect" intensity={1.2} color="#fff6e6" position={[0, 0.5, 7]} scale={[7, 2.2, 1]} />
      </Environment>
      <Szene {...rest} />
    </Canvas>
  );
}
