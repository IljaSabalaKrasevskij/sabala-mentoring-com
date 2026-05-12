import { chromium } from "/Users/iljakrasevskij/npm-global/lib/node_modules/playwright/index.mjs";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const URL = 'http://127.0.0.1:8765/Sabala-Outreach-Agent-2026-05-10.html';
const OUT_DIR = path.join(__dirname, 'screenshots-audit');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch({ args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
const page = await ctx.newPage();

await page.route('**/*', (route) => {
  const u = route.request().url();
  if (u.includes('fonts.googleapis.com') || u.includes('api.fontshare.com') || u.includes('fonts.gstatic.com')) {
    route.abort();
  } else { route.continue(); }
});

console.log(`Loading ${URL}`);
await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.waitForSelector('.slide', { timeout: 15000 });
await page.waitForTimeout(2500);

const totalSlides = await page.$$eval('.slide', els => els.length);
console.log(`${totalSlides} Slides`);

const audit = [];
for (let i = 0; i < totalSlides; i++) {
  await page.$$eval('.slide', (slides, idx) => {
    slides[idx].scrollIntoView({ behavior: 'instant', block: 'start' });
  }, i);
  await page.waitForTimeout(900);

  const info = await page.$$eval('.slide', (slides, idx) => {
    const s = slides[idx];
    const sh = s.scrollHeight, vh = window.innerHeight;
    const h = s.querySelector('h1, h2, .cover-title, .slide-title, .big-quote');
    return {
      scrollHeight: sh, viewportH: vh,
      overflow: sh > vh + 5,
      overflowAmount: sh - vh,
      heading: h ? h.textContent.trim().substring(0, 70) : '(none)'
    };
  }, i);

  const padded = String(i + 1).padStart(2, '0');
  await page.screenshot({ path: path.join(OUT_DIR, `${padded}.png`), fullPage: false });
  const mark = info.overflow ? `OVERFLOW +${info.overflowAmount}px` : 'OK';
  console.log(`  [${padded}] ${mark.padEnd(20)} ${info.heading}`);
  audit.push({ slide: i+1, ...info });
}

await browser.close();
fs.writeFileSync(path.join(OUT_DIR, '_audit.json'), JSON.stringify(audit, null, 2));

const issues = audit.filter(a => a.overflow);
console.log(`\nResult: ${audit.length} slides, ${issues.length} overflow`);
issues.forEach(i => console.log(`  Slide ${i.slide}: +${i.overflowAmount}px - ${i.heading}`));
