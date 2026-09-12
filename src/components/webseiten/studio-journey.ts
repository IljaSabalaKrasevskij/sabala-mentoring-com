/** Shared choreography. Distances are in metres, progress is reversible (0…1). */
export type Point3 = [number, number, number];
export type HoverAnchor = { x: number; y: number };
export type Room = "window" | "reception" | "gallery";

export const EXHIBITS = [
  { id: "position", object: "Das Dossier", title: "Die richtigen Menschen erkennen sich.", label: "Positionierung", text: "Für wen du da bist. Was du veränderst. Warum gerade du. Wir bringen dein Angebot auf einen klaren Punkt.", proof: "Positionierung für RFQ to PO und Stefanie Lommel.", model: "dossier" },
  { id: "story", object: "Das Manuskript", title: "Eine Geschichte, die weiterführt.", label: "Storytelling", text: "Deine Sprache, ein roter Faden und ein verständlicher nächster Schritt. Aus einzelnen Leistungen wird eine Geschichte, der man folgen kann.", proof: "RFQ to PO: Your RFQ. Verified. Delivered.", model: "pen" },
  { id: "design", object: "Das Maßjackett", title: "Dein Auftritt so gut wie deine Arbeit.", label: "Design", text: "Eine eigene Bildwelt, bewusste Typografie und Gestaltung bis ins Detail. Damit man die Qualität deiner Arbeit schon vor dem Gespräch erkennt.", proof: "Eigene Markenwelten für YUNA und RFQ to PO.", model: "jacket" },
  { id: "technology", object: "Das Notebook", title: "Der Eindruck hält auch dem Klick stand.", label: "Webseite", text: "Dein Auftritt in eigenem Code. Für kleine und große Bildschirme gebaut, für Suchmaschinen strukturiert und mit messbaren Kontaktwegen.", proof: "Eigener Code, Suchmaschinen-Anbindung und Analytics bei YUNA.", model: "laptop" },
  { id: "systems", object: "Das Planetarium", title: "Hinter dem Auftritt geht es weiter.", label: "Systeme", text: "Anfragen erfassen, Informationen ordnen, nächste Schritte vorbereiten. Wir entwickeln die Abläufe, die dein Geschäft hinter der Webseite braucht.", proof: "Vega Leads und Fleurs Lead-Agent.", model: "orrery" },
  { id: "ownership", object: "Der Schlüssel", title: "Dein Unternehmen. Dein Eigentum.", label: "Eigentum", text: "Domain, Hosting und Code in deinem Besitz. Du bekommst einen Auftritt, über den du selbst bestimmen kannst.", proof: "Bei RFQ to PO liegen Domain, Hosting und Repo bei der Kundin.", model: "key" },
] as const;

export const SERVICES = [
  { title: "Positionierung & Geschichte", text: "Klar sagen, warum du die richtige Wahl bist.", detail: "Wir schärfen dein Angebot, deine Zielgruppe und die Geschichte, die beides verbindet.", exhibit: 0 },
  { title: "Webseite & Design", text: "Die Qualität deiner Arbeit sichtbar machen.", detail: "Wir übersetzen deine Substanz in Bildwelt, Design und eine Webseite in eigenem Code.", exhibit: 2 },
  { title: "Systeme dahinter", text: "Den nächsten Schritt gleich mitdenken.", detail: "Wir verbinden den Auftritt mit den Abläufen, die aus Interesse eine bearbeitete Anfrage machen.", exhibit: 4 },
] as const;

export const GALLERY_IDS = ["rfqtopo", "yuna-sports-nutrition", "dielommel", "vegaleads", "stefan-pons", "cyber-sales"];
/** Abstand von i zur Mitte im Ring, kuerzester Weg. Beispiel n=6, mitte=0: i=5 gibt -1. */
export function caseSlot(i: number, active: number, n: number) {
  const d = ((i - active) % n + n) % n;
  return d > n / 2 ? d - n : d;
}

export const ROOM_PROGRESS: Record<Room, number> = { window: 0, reception: 0.47, gallery: 0.94 };
export const APPROACH_SCREENS = .95;
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
  return clamp((screens - APPROACH_SCREENS) / 5, 0, galleryOpen ? 1 : .48);
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
