import { chromium } from "/Users/iljakrasevskij/npm-global/lib/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage();
console.log("Browser launched OK");
await page.goto('https://example.com');
const title = await page.title();
console.log("Title:", title);
await browser.close();
console.log("Test passed");
