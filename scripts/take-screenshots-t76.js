import { chromium } from '@playwright/test';
import fs from 'fs';

async function capture() {
  const outDir = '00-INSTRUCCIONES/capturas-t76';
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const browser = await chromium.launch();

  // 1. Mobile 390px
  console.log('Capturando 390px...');
  const pageMobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });
  await pageMobile.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  // Wait a moment for images to settle
  await pageMobile.waitForTimeout(1000);
  await pageMobile.screenshot({
    path: `${outDir}/portada-390px.png`,
    fullPage: true,
  });
  console.log(`Guardado ${outDir}/portada-390px.png`);
  await pageMobile.close();

  // 2. Desktop 1440px
  console.log('Capturando 1440px...');
  const pageDesktop = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  await pageDesktop.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  await pageDesktop.waitForTimeout(1000);
  await pageDesktop.screenshot({
    path: `${outDir}/portada-1440px.png`,
    fullPage: true,
  });
  console.log(`Guardado ${outDir}/portada-1440px.png`);
  await pageDesktop.close();

  await browser.close();
  console.log('Capturas completadas con éxito.');
}

capture().catch((err) => {
  console.error('Error capturando pantallas:', err);
  process.exit(1);
});
