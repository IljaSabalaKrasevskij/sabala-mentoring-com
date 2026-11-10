/* Baut den Trainingsablauf des Second-Brain-Kurses als PDF (A4 quer, 5 Seiten).

     node scripts/trainingsablauf.mjs

   Inhalt:   src/components/akademie/ablauf.ts, dieselbe Quelle wie die Kursseite /akademie.
             Text dort ändern, dann dieses Skript neu laufen lassen.
   Ergebnis: public/akademie/second-brain-trainingsablauf.pdf (Adresse steht in ablauf.ts als ABLAUF_PDF)

   Das PDF ist ohne Datum und ohne Preis geschrieben, damit es für jeden Lauf gilt.

   Schriften: Inter, JetBrains Mono und Instrument Serif als TTF von diesem Rechner (alle frei lizenziert, OFL).
   Satoshi steht bewusst NICHT im PDF: seine Lizenz verbietet das Beschneiden der Schrift, und beim Einbetten
   in ein PDF beschneidet Chrome jede Schrift auf die benutzten Zeichen.

   Druck-Regeln (~/.claude/skills/_shared/pdf-checks/README.md): kein weicher Schatten, kein filter, keine
   opacity, kein "transparent" in Verläufen, Bilder als JPEG, Maße in mm. Am Ende läuft die gemeinsame
   PDF-Prüfung, bei einem Befund endet das Skript mit Fehler.

   Playwright liegt global (npm i -g playwright), nicht im Projekt. */

import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { ABLAUF_PDF, DESIGN_PAKET, FRAGESTUNDE, SKILLS, VORLAGEN, WERKZEUGE, WORKSHOPS } from "../src/components/akademie/ablauf.ts";

const root = path.resolve(import.meta.dirname, "..");
const heim = os.homedir();
const url = (p) => pathToFileURL(p).href;

const SCHRIFTEN = [
  ["Inter", 400, `${heim}/Code/sabala-data/kifiziert-decks/fonts/Inter-400.ttf`],
  ["Inter", 500, `${heim}/Code/sabala-data/kifiziert-decks/fonts/Inter-500.ttf`],
  ["Inter", 600, `${heim}/Code/sabala-data/kifiziert-decks/fonts/Inter-600.ttf`],
  ["JetBrains Mono", 500, `${heim}/Code/sabala-data/kifiziert-decks/fonts/JetBrainsMono-500.ttf`],
  ["Instrument Serif", 400, `${heim}/Library/Fonts/InstrumentSerif-Regular.ttf`],
];
const fehlt = SCHRIFTEN.map(([, , datei]) => datei).filter((d) => !existsSync(d));
if (fehlt.length) {
  console.error(`ABBRUCH: Schrift fehlt auf diesem Rechner:\n  ${fehlt.join("\n  ")}`);
  process.exit(1);
}

const globalRoot = execFileSync("npm", ["root", "-g"]).toString().trim();
const { chromium } = (await import(url(path.join(globalRoot, "playwright/index.js")))).default;

/* ---------- Bausteine ---------- */

const text = (s) => s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

/* Symbole aus lucide-react (liegt im Projekt), als SVG ins Dokument geschrieben. */
async function symbol(name) {
  const { __iconNode } = await import(url(path.join(root, `node_modules/lucide-react/dist/esm/icons/${name}.mjs`)));
  const kinder = __iconNode.map(([tag, a]) => `<${tag} ${Object.entries(a).filter(([k]) => k !== "key").map(([k, v]) => `${k}="${v}"`).join(" ")}/>`).join("");
  return `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${kinder}</svg>`;
}
const S = Object.fromEntries(await Promise.all(["users", "compass", "flame", "flag", "file-text", "cable", "brain", "blocks", "life-buoy", "check", "gift", "laptop", "video", "calendar-days", ...[...SKILLS, ...VORLAGEN, ...DESIGN_PAKET].map((p) => p.symbol)].map(async (n) => [n, await symbol(n)])));

const browser = await chromium.launch();

/* Die drei Logos haben Verläufe mit Durchsicht. Die malt die macOS Vorschau im PDF falsch,
   darum werden sie hier einmal auf Creme fotografiert und als JPEG eingebettet. */
async function logoAlsJpeg(datei) {
  const seite = await browser.newPage({ viewport: { width: 96, height: 96 }, deviceScaleFactor: 4 });
  /* Als data-URL: eine per setContent gefüllte Seite darf keine file://-Bilder laden. */
  const svg = readFileSync(path.join(root, "public/akademie/logos", datei)).toString("base64");
  await seite.setContent(`<body style="margin:0;width:96px;height:96px;display:grid;place-items:center;background:#faf8f5"><img src="data:image/svg+xml;base64,${svg}" style="width:60px;height:60px"></body>`);
  const geladen = await seite.evaluate(async () => { const b = document.querySelector("img"); await b.decode().catch(() => {}); return b.naturalWidth > 0; });
  if (!geladen) throw new Error(`Logo lässt sich nicht laden: ${datei}`);
  const bild = await seite.screenshot({ type: "jpeg", quality: 93 });
  await seite.close();
  return `<img class="platte" src="data:image/jpeg;base64,${bild.toString("base64")}" alt="">`;
}
const PLATTE = {
  comet: `<span class="platte">${S.compass}</span>`,
  notebooklm: await logoAlsJpeg("notebooklm.svg"),
  obsidian: await logoAlsJpeg("obsidian.svg"),
  claude: await logoAlsJpeg("claude.svg"),
};
const SCHRITT_SYMBOL = { Ankommen: S.users, Abschluss: S.flag, Firecrawl: S.flame, "Deine CLAUDE.md": S["file-text"], "MCP-Verbindungen": S.cable, "Fünf Skills": S.blocks };

const SEITEN = 3 + WORKSHOPS.length;
const fuss = (nr, links = "Dein Second Brain · Trainingsablauf") => `<footer class="fuss mono"><span>${links}</span><span>${nr} / ${SEITEN}</span></footer>`;

/* ---------- Seite 1: Titel ---------- */

const titel = `
<section class="seite dunkel">
  <img class="hg" src="${url(path.join(root, "public/akademie/ki-library-bg.jpg"))}" alt="">
  <div class="schleier"></div>
  <p class="mono gold oben"><span>Sabala Academy · Live-Kurs</span><span class="matt">Trainingsablauf</span></p>
  <h1>Dein Second Brain.<br><span class="hellgold">Der Trainingsablauf.</span></h1>
  <p class="lead">Zwei Live-Workshops mit je 2,5 Stunden, dazu eine Fragestunde. Am Ende kennt Claude dein Wissen, deine Kunden und deine Projekte, und jede Session beginnt dort, wo die letzte aufgehört hat.</p>
  <ul class="fakten">
    <li>${S.video}Live per Zoom, du richtest alles selbst mit ein</li>
    <li>${S.users}Kleine Runde, maximal 6 Plätze</li>
    <li>${S.laptop}Für Mac und Windows</li>
  </ul>
  <p class="mono hellgold reihe">Vier Werkzeuge. Einmal richtig verbunden. Ein System.</p>
  <div class="kacheln">
    ${WERKZEUGE.map((w) => `
    <div class="kachel">
      <div class="kopf">${PLATTE[w.id]}<span class="mono matt klein">Workshop ${w.workshop}</span></div>
      <p class="mono hellgold klein">${text(w.rolle)}</p>
      <h3>${text(w.name)}</h3>
      <p class="zusatz">${text(w.zusatz)}</p>
      <p class="wofuer">${text(w.text)}</p>
    </div>`).join("")}
  </div>
  ${fuss(1, "sabala-mentoring.com/akademie")}
</section>`;

/* ---------- Seiten 2 und 3: je ein Workshop ---------- */

const workshop = (w) => `
<section class="seite hell">
  <p class="mono dunkelgold">${text(w.art)}, mit einer Pause</p>
  <h2>${text(w.titel)}</h2>
  <p class="mit">Mit ${text(w.mit)}</p>
  <div class="schritte">
    ${w.schritte.map((s, i) => `
    <div class="schritt ${s.art}">
      ${s.id ? PLATTE[s.id] : `<span class="platte rund">${SCHRITT_SYMBOL[s.name] ?? S.check}</span>`}
      <div>
        <p class="mono dunkelgold klein">Schritt ${i + 1}</p>
        <h3>${text(s.name)}</h3>
        <p>${text(s.text)}</p>
      </div>
    </div>`).join("")}
  </div>
  <div class="danach">
    <p class="mono dunkelgold">Danach hast du</p>
    <ul>${w.danach.map((d) => `<li>${S.check}<span>${text(d)}</span></li>`).join("")}</ul>
  </div>
  ${fuss(w.nr + 1)}
</section>`;

/* ---------- Seite 4: Skills und Bonus-Material ---------- */

const posten = (liste) => `<ul class="posten">${liste.map((p) => `<li><span class="symbol">${S[p.symbol]}</span><p><b>${text(p.name)}</b>${text(p.text)}</p></li>`).join("")}</ul>`;

const material = `
<section class="seite hell">
  <p class="mono dunkelgold">Skills und Bonus-Material</p>
  <h2>Fünf Skills, fertige Vorlagen, ein Design-Paket.</h2>
  <div class="material">
    <div class="tafel">
      <p class="mono hellgold">Richten wir im Kurs gemeinsam ein</p>
      <h3>Fünf Skills für Claude</h3>
      ${posten(SKILLS)}
      <p class="regel"><b>Meine goldene Regel:</b> Erst prüfen, dann installieren. Immer.</p>
    </div>
    <div class="karten">
      <div class="karte">
        <p class="mono dunkelgold">Bekommst du dazu</p>
        <h3>Vorlagen und Prompts</h3>
        ${posten(VORLAGEN)}
      </div>
      <div class="karte geschenk">
        <span class="farbkarte">${["#0a0806", "#2e2b26", "#8a6a1f", "#b8963e", "#d4ae5a", "#faf8f5"].map((f) => `<i style="background:${f}"></i>`).join("")}</span>
        <p class="mono dunkelgold">Bonus, geschenkt</p>
        <h3>Dein Design-Paket</h3>
        ${posten(DESIGN_PAKET)}
      </div>
    </div>
  </div>
  ${fuss(WORKSHOPS.length + 2)}
</section>`;

/* ---------- Seite 5: Fragestunde, was du brauchst, Trainer ----------
   Die drei Punkte unter „Das brauchst du“ stehen auch in den Fragen der Kursseite (fragen.ts). */

const schluss = `
<section class="seite dunkel">
  <img class="hg" src="${url(path.join(root, "public/akademie/ki-library-bg.jpg"))}" alt="">
  <div class="schleier dicht"></div>
  <p class="mono gold oben"><span>Der ganze Weg</span><span class="matt">Trainingsablauf</span></p>
  <div class="weg">
    <div class="halt live"><b>Workshop 1</b><span>2,5 Stunden live</span></div>
    <div class="halt"><span>Üben mit deiner Aufgabe</span></div>
    <div class="halt live"><b>Workshop 2</b><span>2,5 Stunden live</span></div>
    <div class="halt"><span>Arbeiten mit deinem Setup</span></div>
    <div class="halt live"><b>Fragestunde</b><span>1 Stunde live</span></div>
  </div>
  <div class="spalten">
    <div class="netz">
      <span class="platte rund">${S["life-buoy"]}</span>
      <div>
        <p class="mono dunkelgold">${text(FRAGESTUNDE.art)}</p>
        <h2>${text(FRAGESTUNDE.titel)}</h2>
        <p>${text(FRAGESTUNDE.text)}</p>
        <p class="drin">${S.check}Im Preis enthalten</p>
      </div>
    </div>
    <div class="trainer">
      <img src="${url(path.join(root, "public/akademie/ilja-trainer-2026.jpg"))}" alt="">
      <div>
        <p class="mono hellgold">Dein Trainer</p>
        <h3>Ilja Krasevskij</h3>
        <p>Zertifizierter digitaler Trainer und KI-Dozent. Ich mache es vor, du machst es nach, und wir stellen sicher, dass es bei dir läuft.</p>
      </div>
    </div>
    <div>
      <p class="mono hellgold">Das brauchst du</p>
      <ul class="liste">
        <li>${S.check}<span>Einen Rechner mit Mac oder Windows</span></li>
        <li>${S.check}<span>Claude Code Pro für den zweiten Workshop</span></li>
        <li>${S.check}<span>Zweimal 2,5 Stunden Zeit, live dabei. Der Kurs ist kein Aufzeichnungsprodukt.</span></li>
      </ul>
    </div>
    <div>
      <p class="mono hellgold">Bonus obendrauf</p>
      <p class="bonus">${S.gift}<span>Der ganze Code meines Social Media Cockpits, geschenkt. Damit planst du deinen Content im eigenen Kalender, mit Claude Code.</span></p>
    </div>
  </div>
  <div class="platz">
    <p class="mono hellgold">${S["calendar-days"]}Termine, Preis und dein Platz</p>
    <p class="adresse">sabala-mentoring.com/akademie</p>
  </div>
  ${fuss(SEITEN, "Stand November 2026")}
</section>`;

/* ---------- Gestaltung ---------- */

const css = `
${SCHRIFTEN.map(([familie, gewicht, datei]) => `@font-face { font-family: "${familie}"; font-weight: ${gewicht}; src: url("${url(datei)}") format("truetype"); font-display: block; }`).join("\n")}
@page { size: A4 landscape; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font: 400 10.6pt/1.46 "Inter", sans-serif; color: #4a463f; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
ul { list-style: none; }
p, li { text-wrap: pretty; } /* kein einzelnes Wort allein in der letzten Zeile */
.seite { position: relative; width: 297mm; height: 210mm; overflow: hidden; break-after: page; padding: 15mm 18mm 11mm; display: flex; flex-direction: column; }
.seite:last-child { break-after: auto; }
.seite > * { position: relative; }
.hell { background: #faf8f5; }
.dunkel { background: #0a0806; color: #d9d4cb; }
h1, h2, h3 { font-family: "Instrument Serif", serif; font-weight: 400; }
.mono { font: 500 8pt/1.35 "JetBrains Mono", monospace; letter-spacing: .15em; text-transform: uppercase; }
.klein { font-size: 7pt; }
.gold { color: #b8963e; } .hellgold { color: #d4ae5a; } .dunkelgold { color: #8a6a1f; } .matt { color: #a8a297; }
.ic { width: 5mm; height: 5mm; flex: none; }
.fuss { margin-top: auto; padding-top: 5mm; display: flex; justify-content: space-between; color: #a8a297; }
.hell .fuss { color: #8a8378; }
.platte { width: 13mm; height: 13mm; flex: none; border-radius: 3mm; background: #faf8f5; color: #0a0806; display: flex; align-items: center; justify-content: center; }
.platte .ic { width: 7.5mm; height: 7.5mm; }
.platte.rund { border-radius: 50%; background: #f3ead2; color: #8a6a1f; }

/* Seiten 1 und 4: die Bibliothek als Bild, stark abgedunkelt */
.hg { position: absolute !important; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.schleier { position: absolute !important; inset: 0; background: linear-gradient(180deg, rgba(10,8,6,.93) 0%, rgba(10,8,6,.76) 48%, rgba(10,8,6,.97) 100%); }
.schleier.dicht { background: linear-gradient(180deg, rgba(10,8,6,.9) 0%, rgba(10,8,6,.93) 100%); }
.oben { display: flex; justify-content: space-between; }

/* Seite 1 */
h1 { margin-top: 13mm; font-size: 50pt; line-height: 1.02; color: #faf8f5; }
.lead { margin-top: 6mm; max-width: 172mm; font-size: 13.5pt; line-height: 1.45; color: #e6e1d8; }
.fakten { margin-top: 6mm; display: flex; gap: 9mm; font-size: 10.6pt; color: #d9d4cb; }
.fakten li { display: flex; align-items: center; gap: 2.5mm; }
.fakten .ic { color: #b8963e; }
.reihe { margin-top: auto; }
.kacheln { margin-top: 4mm; display: flex; gap: 4mm; }
.kachel { flex: 1; padding: 5mm; border-radius: 3mm; background: #15110b; border: .3mm solid #6b5a2c; }
.kachel .kopf { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4mm; }
.kachel .klein { letter-spacing: .08em; }
.kachel h3 { margin-top: .8mm; font-size: 18pt; line-height: 1.1; color: #faf8f5; }
.zusatz { font-size: 9pt; color: #a8a297; }
.wofuer { margin-top: 2.6mm; font-size: 9.7pt; line-height: 1.42; color: #d9d4cb; }

/* Seiten 2 und 3 */
h2 { margin-top: 2.2mm; font-size: 31pt; line-height: 1.06; color: #2e2b26; }
.mit { margin-top: 1.5mm; font-size: 12.5pt; color: #6f685e; }
.schritte { margin-top: 6mm; display: grid; grid-template-columns: repeat(3, 1fr); gap: 4.5mm; }
.schritt { display: flex; gap: 4mm; min-height: 45mm; padding: 5mm; border-radius: 3mm; background: #ffffff; border: .3mm solid #e0d2ab; }
.schritt.rahmen { background: #f1ece3; border-color: #e4ddd0; }
.schritt.rahmen .platte.rund { background: #ffffff; }
.schritt h3 { margin-top: .8mm; font-size: 16pt; line-height: 1.12; color: #2e2b26; }
.schritt h3 + p { margin-top: 1.6mm; font-size: 10.2pt; line-height: 1.4; }
.danach { margin-top: 4.5mm; padding: 4.6mm 6mm; border-radius: 3mm; background: #f6edd4; border: .3mm solid #d9c58d; }
.danach ul { margin-top: 2.8mm; display: grid; grid-template-columns: repeat(3, 1fr); gap: 6mm; }
.danach li { display: flex; gap: 2.5mm; font-size: 11pt; line-height: 1.38; font-weight: 500; color: #2e2b26; }
.danach .ic { margin-top: .5mm; color: #8a6a1f; }

/* Seite 4: Skills und Bonus-Material */
.material { margin-top: 6mm; display: grid; grid-template-columns: 1.08fr 1fr; gap: 5mm; }
.tafel { display: flex; flex-direction: column; padding: 7mm; border-radius: 3mm; background: #0a0806; border: .3mm solid #6b5a2c; color: #d9d4cb; }
.tafel h3 { margin-top: 1.4mm; font-size: 23pt; line-height: 1.1; color: #faf8f5; }
.posten { margin-top: 3.5mm; }
.posten li { display: flex; align-items: flex-start; gap: 4mm; padding: 1.6mm 0; }
.posten .symbol { width: 10mm; height: 10mm; flex: none; display: flex; align-items: center; justify-content: center; border-radius: 2.4mm; background: #2a2212; color: #d4ae5a; }
.posten .symbol .ic { width: 5.4mm; height: 5.4mm; }
.posten p { font-size: 10.6pt; line-height: 1.38; }
.posten b { display: block; font-weight: 600; font-size: 12pt; color: #faf8f5; }
.regel { margin-top: auto; padding: 3.6mm 4.6mm; border-radius: 2.4mm; background: #1f190d; border: .3mm solid #6b5a2c; font-size: 10.8pt; color: #faf8f5; }
.regel b { font-weight: 600; color: #d4ae5a; }
.karten { display: grid; gap: 4mm; }
.karte { position: relative; padding: 5mm 7mm; border-radius: 3mm; background: #ffffff; border: .3mm solid #e0d2ab; }
.karte.geschenk { background: #f6edd4; border-color: #d9c58d; }
.karte h3 { margin-top: 1.2mm; font-size: 21pt; line-height: 1.1; color: #2e2b26; }
.karte .symbol { background: #f3ead2; color: #8a6a1f; }
.karte.geschenk .symbol { background: #ffffff; }
.karte .posten b { color: #2e2b26; }
.farbkarte { position: absolute; right: 7mm; top: 5mm; display: flex; gap: 1.6mm; }
.farbkarte i { width: 5mm; height: 5mm; border-radius: 50%; border: .25mm solid #cdbf9c; }

/* Seite 5 */
.weg { margin-top: 8mm; display: flex; }
.halt { position: relative; flex: 1; padding-top: 8mm; text-align: center; font-size: 9.6pt; color: #a8a297; border-top: .4mm dotted #8a6a1f; }
.halt::before { content: ""; position: absolute; top: -1.7mm; left: 50%; margin-left: -1.5mm; width: 3mm; height: 3mm; border-radius: 50%; background: #0a0806; border: .4mm solid #b8963e; }
.halt.live::before { top: -2.7mm; margin-left: -2.5mm; width: 5mm; height: 5mm; background: #d4ae5a; border-color: #d4ae5a; }
.halt b { display: block; font: 400 15pt/1.1 "Instrument Serif", serif; color: #faf8f5; }
.halt:not(.live) { padding-top: 10.6mm; }
.spalten { margin-top: 8mm; display: grid; grid-template-columns: 1.12fr .88fr; gap: 7mm 11mm; }
.netz { display: flex; gap: 5mm; padding: 6mm; border-radius: 3mm; background: #f6edd4; border: .3mm solid #d9c58d; color: #4a463f; }
.netz .platte.rund { background: #ffffff; }
.netz h2 { margin-top: 1.2mm; font-size: 25pt; }
.netz h2 + p { margin-top: 2mm; font-size: 10.8pt; }
.drin { margin-top: 3mm; display: flex; align-items: center; gap: 2.5mm; font-weight: 600; color: #2e2b26; }
.drin .ic { color: #8a6a1f; }
.trainer { display: flex; gap: 6mm; align-items: center; }
.trainer img { width: 36mm; height: 45mm; flex: none; object-fit: cover; border-radius: 3mm; border: .3mm solid #6b5a2c; }
.trainer h3 { margin-top: 1mm; font-size: 21pt; line-height: 1.1; color: #faf8f5; }
.trainer h3 + p { margin-top: 2mm; font-size: 10.4pt; color: #d9d4cb; }
.liste { margin-top: 1.5mm; }
.liste li { display: flex; gap: 3mm; padding: 2.3mm 0; border-bottom: .25mm solid #3a321f; font-size: 10.8pt; color: #e6e1d8; }
.liste li:last-child { border-bottom: none; }
.liste .ic, .bonus .ic { margin-top: .3mm; color: #b8963e; }
.bonus { margin-top: 3.8mm; display: flex; gap: 3mm; font-size: 10.8pt; color: #e6e1d8; }
.platz { margin-top: auto; padding: 5.5mm 7mm; border-radius: 3mm; background: #15110b; border: .4mm solid #b8963e; display: flex; justify-content: space-between; align-items: center; }
.platz .mono { display: flex; align-items: center; gap: 2.5mm; }
.adresse { font: 400 22pt/1.1 "Instrument Serif", serif; color: #d4ae5a; }
.platz + .fuss { margin-top: 0; }
`;

const html = `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>Dein Second Brain: Trainingsablauf</title><style>${css}</style></head><body>${titel}${WORKSHOPS.map(workshop).join("")}${material}${schluss}</body></html>`;

/* ---------- Bauen und prüfen ---------- */

const htmlDatei = path.join(mkdtempSync(path.join(os.tmpdir(), "trainingsablauf-")), "trainingsablauf.html");
writeFileSync(htmlDatei, html);
const pdf = path.join(root, "public", ABLAUF_PDF);

const seite = await browser.newPage();
await seite.goto(url(htmlDatei), { waitUntil: "load" });
await seite.evaluate(() => document.fonts.ready);
/* Läuft Text über den Seitenrand, würde er im PDF still abgeschnitten. Lieber hier abbrechen. */
const zuVoll = await seite.evaluate(() => [...document.querySelectorAll(".seite")].map((s, i) => (s.scrollHeight > s.clientHeight + 1 || s.scrollWidth > s.clientWidth + 1 ? `Seite ${i + 1}: ${s.scrollHeight - s.clientHeight} px zu hoch` : null)).filter(Boolean));
if (zuVoll.length) {
  console.error(`ABBRUCH: Inhalt passt nicht auf die Seite.\n  ${zuVoll.join("\n  ")}\n  Quelle zum Ansehen: ${htmlDatei}`);
  await browser.close();
  process.exit(1);
}
await seite.pdf({ path: pdf, preferCSSPageSize: true, printBackground: true });
await browser.close();
console.log(`geschrieben: ${pdf}`);

const pruefung = `
import sys
sys.path.insert(0, ${JSON.stringify(path.join(heim, ".claude/skills/_shared/pdf-checks"))})
import pdf_pruefen
befunde = pdf_pruefen.pruefen(sys.argv[1]) + pdf_pruefen.css_risiken(open(sys.argv[2], encoding="utf-8").read())
pdf_pruefen.merken(sys.argv[1], befunde)
print("PDF-Pruefung: " + ("alles gruen" if not befunde else "\\n  " + "\\n  ".join(befunde)))
sys.exit(1 if befunde else 0)
`;
try {
  execFileSync("python3", ["-c", pruefung, pdf, htmlDatei], { stdio: "inherit" });
} catch {
  console.error(`Quelle zum Ansehen: ${htmlDatei}`);
  process.exit(1);
}
