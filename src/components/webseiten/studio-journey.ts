/** Shared choreography. Distances are in metres, progress is reversible (0…1). */
export type Point3 = [number, number, number];
export type HoverAnchor = { x: number; y: number };
export type Room = "window" | "reception" | "gallery";

/** Nur die Schluessel. Texte der Exponate stehen je Sprache in studio-texte.ts. */
export const EXHIBITS = [
  { id: "position" }, { id: "story" }, { id: "design" }, { id: "technology" }, { id: "systems" }, { id: "ownership" },
] as const;

export const GALLERY_IDS = ["rfqtopo", "yuna-sports-nutrition", "dielommel", "vegaleads", "stefan-pons", "cyber-sales"];
/** Abstand von i zur Mitte im Ring, kuerzester Weg. Beispiel n=6, mitte=0: i=5 gibt -1. */
export function caseSlot(i: number, active: number, n: number) {
  const d = ((i - active) % n + n) % n;
  return d > n / 2 ? d - n : d;
}

export const ROOM_PROGRESS: Record<Room, number> = { window: 0, reception: 0.47, gallery: 0.94 };
export const APPROACH_SCREENS = .95;
export const RECEPTION_SCREENS = APPROACH_SCREENS + ROOM_PROGRESS.reception * 5;
export const GALLERY_READING_SCREENS = .45;
export const GALLERY_WALK_SCREENS = 3.2;
export const GALLERY_ARRIVAL_SCREENS = RECEPTION_SCREENS + GALLERY_READING_SCREENS + GALLERY_WALK_SCREENS;
export const clamp = (x: number, a = 0, b = 1) => Math.max(a, Math.min(b, x));
export const ease = (x: number) => { const t = clamp(x); return t * t * (3 - 2 * t); };
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
export const mixPoint = (a: Point3, b: Point3, t: number): Point3 => [mix(a[0], b[0], t), mix(a[1], b[1], t), mix(a[2], b[2], t)];

const SHOTS: { at: number; position: Point3; target: Point3 }[] = [
  { at: 0, position: [0, 2.75, 12.6], target: [0, 2.65, 0] },
  { at: 0.09, position: [0.2, 2.65, 11.4], target: [0, 2.5, 0] },
  { at: 0.21, position: [4, 2.3, 4.4], target: [4, 2.1, -2] },
  { at: 0.32, position: [4, 2.2, -1.8], target: [-0.5, 2.1, -7.3] },
  { at: 0.43, position: [1.4, 2.15, -3.65], target: [-1.65, 2.05, -7.5] },
  { at: 0.53, position: [1.4, 2.15, -3.65], target: [-1.65, 2.05, -7.5] },
  { at: 0.66, position: [3.65, 2.2, -8.2], target: [3.5, 2.3, -14] },
  { at: 0.77, position: [3.5, 2.3, -12.5], target: [0, 2.7, -22.4] },
  { at: 0.9, position: [0, 2.55, -16.3], target: [0, 2.65, -23.5] },
  { at: 1, position: [0, 2.55, -16.3], target: [0, 2.65, -23.5] },
];

export function cameraShot(progress: number) {
  const p = clamp(progress);
  const index = SHOTS.findIndex((shot) => shot.at >= p);
  if (index <= 0) return { position: SHOTS[0].position, target: SHOTS[0].target };
  const a = SHOTS[index - 1], b = SHOTS[index];
  const t = ease((p - a.at) / (b.at - a.at));
  return { position: mixPoint(a.position, b.position, t), target: mixPoint(a.target, b.target, t) };
}

export function roomAt(progress: number): Room {
  return progress < 0.37 ? "window" : progress < 0.79 ? "reception" : "gallery";
}

export function doorAngle(progress: number) { return -ease((progress - 0.13) / 0.09) * Math.PI * 0.56; }

export function eaglePosition(progress: number): Point3 {
  if (progress < 0.41) return mixPoint([-4, 0, -9], [-1.65, 0, -7.9], ease((progress - 0.28) / 0.13));
  if (progress < 0.57) return [-1.65, 0, -7.9];
  if (progress < 0.66) return mixPoint([-1.65, 0, -7.9], [3.5, 0, -9.3], ease((progress - 0.57) / 0.09));
  if (progress < 0.79) return mixPoint([3.5, 0, -9.3], [3.5, 0, -16], ease((progress - 0.66) / 0.13));
  return mixPoint([3.5, 0, -16], [-3.8, 0, -20.8], ease((progress - 0.79) / 0.11));
}

/** Photographic room transitions and scroll-controlled film timing. */
export function filmAt(value: number) {
  const p = clamp(value);
  const index = p >= .535 ? 1 : 0;
  const start = index === 0 ? .105 : .535;
  const end = index === 0 ? .405 : .88;
  const time = clamp((p - start) / (end - start));
  return { index, time, opacity: ease(time / .035) * ease((1 - time) / .035), active: p > start && p < end };
}

export function cinemaShot(value: number, reduced = false) {
  const p = clamp(value);
  const entry = ease((p - .10) / .25);
  const firstBlend = ease((p - .27) / .135);
  const exit = ease((p - .535) / .25);
  const secondBlend = ease((p - .70) / .18);
  // Bei Reduce Motion stand die Fahrt bis 12.9.2026 komplett still, die Sektion
  // wirkte dadurch kaputt. Jetzt bleiben 12 Prozent der Bewegung stehen: genug,
  // damit Scrollen sichtbar etwas tut, zu wenig fuer den Zoom, vor dem die
  // Einstellung schuetzen soll. Der Raumwechsel laeuft ohnehin ueber Deckkraft.
  const k = reduced ? .12 : 1;
  return {
    window: { opacity: 1 - firstBlend, scale: 1 + entry * 1.8 * k, x: -entry * 67 * k },
    reception: { opacity: firstBlend * (1 - secondBlend), scale: 1 + (.12 - firstBlend * .12 + exit * 1.7) * k, x: -exit * 88 * k },
    gallery: { opacity: secondBlend, scale: 1 + (.12 - secondBlend * .12) * k, x: 0 },
    door: ease((p - .14) / .11) * (reduced ? .5 : 1),
  };
}

export function stillShot(room: Room) {
  return { window: room === "window" ? 1 : 0, reception: room === "reception" ? 1 : 0, gallery: room === "gallery" ? 1 : 0 };
}

export function journeyProgress(screens: number, galleryOpen: boolean) {
  if (!galleryOpen || screens < RECEPTION_SCREENS) return clamp((screens - APPROACH_SCREENS) / 5, 0, .48);
  // The invitation stays readable before the next scroll-controlled walk begins.
  const walk = clamp((screens - RECEPTION_SCREENS - GALLERY_READING_SCREENS) / GALLERY_WALK_SCREENS);
  return mix(ROOM_PROGRESS.reception, ROOM_PROGRESS.gallery, walk);
}

/** Close view holds for inspection, then blends into the existing entry film. */
export function windowView(screens: number, progress: number, pointer = 0, reduced = false, mobile = false) {
  const arrival = ease(screens / .85);
  const departure = ease((progress - .105) / .135);
  const strength = arrival * (1 - departure);
  if (reduced) return { scale: 1, x: 0, y: 0, strength };
  const scale = 1 + (mobile ? .18 : .58) * strength;
  const pan = clamp(pointer, -1, 1) * (mobile ? 2 : 4.5) * strength;
  return { scale, x: 7 * scale * strength - pan, y: -3 * strength, strength };
}
