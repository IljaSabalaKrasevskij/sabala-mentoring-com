/* Rendert die Webinar-Banner aus scripts/webinar-banner.html.
   Datum und Uhrzeit kommen aus src/components/webinar/config.ts, damit es
   nur EINE Terminquelle gibt. Termin geaendert? Skript neu laufen lassen:

     node scripts/webinar-banner.mjs

   Ergebnis:
     public/webinar/linkedin-event.png   1776x444  (LinkedIn-Event-Cover)
     public/webinar/linkedin-post.png    1200x627  (Feed-Post und OG-Image)

   Playwright liegt global (npm i -g playwright), nicht im Projekt. */

import { execSync } from "node:child_process";
import { readFileSync, mkdirSync } from "node:fs";
import { pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const globalRoot = execSync("npm root -g").toString().trim();
const { chromium } = (await import(pathToFileURL(path.join(globalRoot, "playwright/index.js")).href)).default;

/* Termin aus der config.ts fischen. Bewusst per Regex statt Import: die Datei
   ist TS und haengt an den Next-Pfad-Aliassen. */
const cfg = readFileSync(path.join(root, "src/components/webinar/config.ts"), "utf8");
const pick = (key) => cfg.match(new RegExp(`${key}:\\s*"([^"]+)"`))?.[1] ?? "";
const weekday = pick("weekday");
const datum = `${weekday.slice(0, 2).toUpperCase()} · ${pick("date").toUpperCase()} · ${pick("time").replace(" Uhr", "")}`;

/* Wache gegen den Fehler vom 27.8.2026: die Banner lagen drei Wochen mit einem
   bereits vergangenen Termin im Ordner und waeren fast so hochgeladen worden.
   Lieber hier abbrechen als ein Bild mit totem Datum ins Netz stellen. */
const startIso = pick("iso");
if (startIso && new Date(startIso) < new Date()) {
  console.error(`\nABBRUCH: der Termin in config.ts liegt in der Vergangenheit (${startIso}).`);
  console.error("Erst den Termin setzen, dann die Banner rendern.\n");
  process.exit(1);
}

/* LinkedIn-Event will 16:9. Die frueher hier stehenden 1776x444 sind das ALTE
   Event-Cover, LinkedIn beschneidet sie heute. Feed-Posts bleiben bei 1200x627. */
/* datum: false = evergreen. Das LinkedIn-Event zeigt Datum und Uhrzeit in seiner
   eigenen Oberflaeche direkt unter dem Cover. Im Bild waere es doppelt und muesste
   bei jedem Lauf neu gerendert werden. Der Feed-Post hat diese Anzeige nicht,
   dort traegt das Datum echte Information. */
const VARIANTEN = [
  { v: "event", w: 1280, h: 720, out: "linkedin-event.png", datum: false },
  { v: "post", w: 1200, h: 627, out: "linkedin-post.png", datum: true },
];

const outDir = path.join(root, "public/webinar");
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
for (const { v, w, h, out, datum: zeigeDatum } of VARIANTEN) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
  await page.goto(`${pathToFileURL(path.join(root, "scripts/webinar-banner.html")).href}?v=${v}`, {
    waitUntil: "networkidle",
  });
  await page.evaluate(({ d, zeigen }) => {
    const el = document.getElementById("datum");
    if (!el) return;
    if (zeigen) el.textContent = d;
    else el.remove();          // ganz raus, damit kein leerer Kasten stehen bleibt
  }, { d: datum, zeigen: zeigeDatum });
  await page.waitForTimeout(400); // Webfonts sicher gezeichnet
  await page.locator(".stage").screenshot({ path: path.join(outDir, out) });
  await page.close();
  console.log(`${out}  ${w}x${h}  ${zeigeDatum ? `(${datum})` : "(evergreen, ohne Datum)"}`);
}
await browser.close();
