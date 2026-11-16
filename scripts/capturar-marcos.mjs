import { chromium } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ARTIFACTS_DIR = 'C:/Users/JACK FRANKLIN/.gemini/antigravity/brain/53be3dec-a167-4231-93aa-3eb8aed07746';
const HTML_PATH = `file:///${ARTIFACTS_DIR}/propuestas-marcos.html`.replace(/\\/g, '/');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1200, height: 950 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  console.log('Navegando a propuestas-marcos.html...');
  await page.goto(HTML_PATH, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Opción 1
  console.log('Capturando Opción 1...');
  await page.click('#btn-opcion1');
  await page.waitForTimeout(600);
  const phone1 = await page.$('.w-\\[375px\\]');
  if (phone1) {
    await phone1.screenshot({ path: path.join(ARTIFACTS_DIR, 'marcos-opcion1-clean.png') });
  }

  // Opción 2
  console.log('Capturando Opción 2...');
  await page.click('#btn-opcion2');
  await page.waitForTimeout(600);
  const phone2 = await page.$('.w-\\[375px\\]');
  if (phone2) {
    await phone2.screenshot({ path: path.join(ARTIFACTS_DIR, 'marcos-opcion2-dorado.png') });
  }

  // Opción 3
  console.log('Capturando Opción 3...');
  await page.click('#btn-opcion3');
  await page.waitForTimeout(600);
  const phone3 = await page.$('.w-\\[375px\\]');
  if (phone3) {
    await phone3.screenshot({ path: path.join(ARTIFACTS_DIR, 'marcos-opcion3-edge.png') });
  }

  await browser.close();
  console.log('✓ Capturas completadas.');
}

main().catch(console.error);
