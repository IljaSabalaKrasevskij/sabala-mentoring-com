export { cinemaShot, filmAt, stillShot } from "./studio-journey";

export const LONDON_ASSETS = {
  window: "/webseiten/studio-london-v1/exterior-globe-v2.webp",
  reception: "/webseiten/studio-london-v1/reception.webp",
  gallery: "/webseiten/studio-london-v1/gallery.webp",
} as const;

// Enable only reviewed local sequences. Stills remain the network/error fallback.
export const LONDON_FILMS: readonly string[] = [
  "/webseiten/studio-london-v1/entry-globe-v2.mp4",
  "/webseiten/studio-london-v1/gallery-walk.mp4",
];

// One continuous take through the reception doorway, with the work already hung before the host enters the salon.
// A distinct filename prevents cached playback of the rejected wipe montage.
export const SALON_FILMS: readonly string[] = [
  LONDON_FILMS[0],
  "/webseiten/studio-salon-v2/gallery-hung-v4.mp4",
];

// Coordinates are percentages of the approved, uncropped 1672 × 941 plate.
// Image, hit areas and gallery inserts share one plane, including on mobile.
export const WINDOW_OBJECTS = [
  { x: 22.65, y: 49.1, w: 5.1, h: 12.5, shape: "polygon(51% 0, 81% 8%, 97% 25%, 100% 48%, 88% 63%, 57% 75%, 58% 83%, 77% 90%, 84% 100%, 15% 100%, 22% 91%, 44% 83%, 44% 75%, 13% 62%, 0 39%, 8% 17%, 29% 5%)" },
  { x: 28.8, y: 50.8, w: 4.3, h: 7, shape: "polygon(15% 0, 100% 0, 90% 100%, 0 100%)" },
  { x: 34.3, y: 43.1, w: 6, h: 14, shape: "polygon(45% 0, 60% 0, 65% 10%, 90% 20%, 100% 93%, 80% 100%, 20% 100%, 0 93%, 10% 20%, 40% 10%)" },
  { x: 47.2, y: 51.8, w: 4.2, h: 5.8, shape: "inset(0 round 2px)" },
  { x: 51.7, y: 49.8, w: 4.6, h: 11, shape: "ellipse(49% 50% at 50% 50%)" },
  { x: 58.1, y: 56, w: 1.6, h: 6.2, shape: "polygon(35% 0, 70% 0, 100% 30%, 62% 44%, 62% 80%, 90% 80%, 90% 93%, 60% 93%, 60% 100%, 30% 100%, 30% 43%, 0 30%)" },
] as const;
