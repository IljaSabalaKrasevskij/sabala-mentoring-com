const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generateCover() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Set viewport to 3000x3000
  await page.setViewport({
    width: 3000,
    height: 3000,
    deviceScaleFactor: 1,
  });

  // The actual URL or file to render
  const htmlPath = path.join(__dirname, '..', 'public', 'podcast-cover.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

  // Save JPG
  const outJpgPath = path.join(__dirname, '..', 'public', 'Business_Beyond_Mind_Cover.jpg');
  await page.screenshot({ path: outJpgPath, type: 'jpeg', quality: 95 });
  console.log('Saved:', outJpgPath);

  // Save PNG
  const outPngPath = path.join(__dirname, '..', 'public', 'Business_Beyond_Mind_Cover.png');
  await page.screenshot({ path: outPngPath, type: 'png' });
  console.log('Saved:', outPngPath);

  await browser.close();
}

generateCover().catch(console.error);
