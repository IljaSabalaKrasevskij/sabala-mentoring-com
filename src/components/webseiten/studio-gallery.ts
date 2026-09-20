/** Registered wall openings in the 1672 × 941 salon photograph. Clockwise from top left. */
export type XY = readonly [number, number];
export type Quad = readonly [XY, XY, XY, XY];
export const SALON = { width: 1672, height: 941, image: "/webseiten/studio-salon-v2/salon.webp" };
export const ART_SIZE = [1000, 562.5] as const;
export const GALLERY_STATIONS: { id: string; wall: "left" | "right"; corners: Quad }[] = [
  { id: "rfqtopo", wall: "left", corners: [[32,157],[270,238],[270,442],[32,446]] },
  { id: "yuna-sports-nutrition", wall: "left", corners: [[362,279],[462,310],[462,438],[362,441]] },
  { id: "dielommel", wall: "left", corners: [[521,328],[667,328],[667,438],[521,438]] },
  { id: "vegaleads", wall: "right", corners: [[994,328],[1144,328],[1144,438],[994,438]] },
  { id: "stefan-pons", wall: "right", corners: [[1206,310],[1303,279],[1303,441],[1206,438]] },
  { id: "cyber-sales", wall: "right", corners: [[1398,239],[1637,156],[1637,446],[1398,441]] },
];

/** Solve a projective transform, keeping the viewed plane in front of CSS's camera. */
export function homography(from: Quad, to: Quad): number[] {
  const rows = from.flatMap(([x,y],i) => {
    const [u,v] = to[i];
    return [[x,y,1,0,0,0,-u*x,-u*y,u], [0,0,0,x,y,1,-v*x,-v*y,v]];
  });
  for (let col=0; col<8; col++) {
    let pivot=col;
    for (let r=col+1; r<8; r++) if (Math.abs(rows[r][col])>Math.abs(rows[pivot][col])) pivot=r;
    [rows[col],rows[pivot]]=[rows[pivot],rows[col]];
    const divisor=rows[col][col];
    if (Math.abs(divisor)<1e-12) throw new Error("Degenerate gallery frame");
    for (let c=col; c<9; c++) rows[col][c]/=divisor;
    for (let r=0; r<8; r++) if(r!==col) {
      const factor=rows[r][col];
      for(let c=col; c<9; c++) rows[r][c]-=factor*rows[col][c];
    }
  }
  const matrix=[...rows.map(row=>row[8]),1];
  const center=from.reduce(([x,y],point)=>[x+point[0]/4,y+point[1]/4],[0,0]);
  // Equivalent homographies can have opposite signs. CSS clips negative w,
  // so choose the sign that puts the selected frame in front of the viewer.
  const sign=matrix[6]*center[0]+matrix[7]*center[1]+matrix[8]<0?-1:1;
  return matrix.map(value=>value*sign);
}
export function project(h: readonly number[], [x,y]: XY): XY {
  const z=h[6]*x+h[7]*y+h[8];
  return [(h[0]*x+h[1]*y+h[2])/z,(h[3]*x+h[4]*y+h[5])/z];
}
export function cssMatrix(h: readonly number[]) {
  return `matrix3d(${[h[0],h[3],0,h[6],h[1],h[4],0,h[7],0,0,1,0,h[2],h[5],0,h[8]].join(",")})`;
}
export function artworkMatrix(corners: Quad) {
  return homography([[0,0],[ART_SIZE[0],0],[ART_SIZE[0],ART_SIZE[1]],[0,ART_SIZE[1]]],corners);
}
export function galleryCamera(index: number | null, width: number, height: number): number[] {
  const mobile=width<700;
  if(index===null) {
    const scale=mobile ? width/SALON.width : Math.max(width/SALON.width,height/SALON.height);
    return [scale,0,(width-SALON.width*scale)/2,0,scale,mobile?156:(height-SALON.height*scale)/2,0,0,1];
  }
  const station=GALLERY_STATIONS[index];
  // Keep the work clear of the room header and thumbnail rail on short screens.
  const availableHeight=height <= 650 ? height-296 : height-392;
  const w=mobile ? width-40 : Math.min(width*.51,Math.max(90,availableHeight)*16/9);
  const h=w*9/16;
  const x=mobile?20:station.wall==="left"?width*.065:width-width*.065-w;
  const y=mobile?165:Math.max(112,(height-190-h)/2);
  return homography(station.corners,[[x,y],[x+w,y],[x+w,y+h],[x,y+h]]);
}
/** Move into the central passage before the adjoining consultation room appears. */
export function consultationCamera(width: number, height: number): number[] {
  const scale = Math.max(width / 460, height / 700);
  return [scale, 0, width / 2 - 836 * scale, 0, scale, height / 2 - 455 * scale, 0, 0, 1];
}
export function nextStation(index: number | null, delta: number, count=GALLERY_STATIONS.length) {
  return index===null ? (delta<0?count-1:0) : (index+delta+count)%count;
}

export const GALLERY_COPY = {
  de: {
    title: "Die Galerie.", overview: "Galerieübersicht", hint: "Mit ← und → von Werk zu Werk.",
    welcome: "Hier beginnt die Sammlung.", invitation: "RFQ to PO ist das erste Werk. Schau dich um, ich bin gleich hier.",
    previous: "Vorheriges Werk", next: "Nächstes Werk", live: "Webseite besuchen", caseStudy: "Projekt ansehen",
    back: "Zum Empfang", contact: "Mein Projekt besprechen", select: "Werke in der Galerie", details: "Zum Werk",
    notes: [
      "Eine Geschichte von der Anfrage bis zur Lieferung. Positionierung, Texte, Bildwelt, Web Development und Launch für internationales industrielles Sourcing.",
      "Ein Auftritt auf dem Niveau des Studios. Geschärfte Positionierung, eine eigene Markenwelt und eine Webseite mit Blog und messbaren Kontaktwegen.",
      "Eine klare Stimme für die Begleitung von Familienunternehmen. Positionierung, Texte und Seitenstruktur machen aus einer breiten Beratungspraxis ein verständliches Angebot.",
      "Ein Lead-Radar, das sein Versprechen sichtbar macht. Eigene Bildwelt, Bewegung und eine zweisprachige Webseite mit Anfragen direkt ins eigene System.",
      "Aus zwei Marken wird Klangraum Bodensee. Konzept, Texte, Prototyp und Videos aus dem Studio. Brand Guide von Fleur-Elaine Struik, WordPress-Umsetzung von Christopher Buschor.",
      "Eine Webseite für ein Vertriebssystem in der Cybersecurity. Positionierung, Texte und eine interaktive Geschichte führen von der Gefahr zum ersten Gespräch.",
    ],
  },
  en: {
    title: "The gallery.", overview: "Gallery overview", hint: "Use ← and → to explore the work.",
    welcome: "The collection starts here.", invitation: "RFQ to PO is the first piece. Take a look around. I am right here.",
    previous: "Previous piece", next: "Next piece", live: "Visit the website", caseStudy: "View the project",
    back: "To reception", contact: "Talk about my project", select: "Work in the gallery", details: "About the work",
    notes: [
      "A story from enquiry to delivery. Positioning, copy, imagery, custom web development and launch for an international industrial sourcing business.",
      "A presence that matches the studio. Sharper positioning, its own brand world and a website with a blog and measurable contact paths.",
      "A clear voice for guiding family businesses through change. Positioning, copy and page structure turn a broad practice into an offer people understand.",
      "A lead radar that makes its promise visible. Custom imagery, motion and a bilingual website send enquiries straight into its own system.",
      "Two brands become Klangraum Bodensee. Concept, copy, prototype and video from the studio. Brand guide by Fleur-Elaine Struik, WordPress implementation by Christopher Buschor.",
      "A website for a cybersecurity sales system. Positioning, copy and an interactive story lead from understanding the risk to the first conversation.",
    ],
  },
};
