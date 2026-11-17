import { chromium } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, '../00-INSTRUCCIONES/capturas-t77');

async function main() {
  const browser = await chromium.launch();

  // 1. Desktop 1440px
  {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Captura arriba: AnnouncementBar + SiteHeader + Hero Banners
    await page.screenshot({
      path: path.join(outputDir, 'portada-top-1440px.png'),
      clip: { x: 0, y: 0, width: 1440, height: 500 },
    });
    console.log('✓ portada-top-1440px.png capturada');

    // Captura Barra de Confianza + Intro
    const trustSection = page.locator('.mg-trust-section');
    await trustSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await trustSection.screenshot({
      path: path.join(outputDir, 'portada-confianza-1440px.png'),
    });
    console.log('✓ portada-confianza-1440px.png capturada');

    // Captura seccion packs (#plan)
    const planSection = page.locator('#plan');
    await planSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await planSection.screenshot({
      path: path.join(outputDir, 'portada-packs-1440px.png'),
    });
    console.log('✓ portada-packs-1440px.png capturada');

    await page.close();
  }

  // 2. Mobile 390px
  {
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
    });
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Captura arriba: AnnouncementBar + SiteHeader + Hero Banners
    await page.screenshot({
      path: path.join(outputDir, 'portada-top-390px.png'),
      clip: { x: 0, y: 0, width: 390, height: 450 },
    });
    console.log('✓ portada-top-390px.png capturada');

    // Captura Barra de Confianza (2x2 grid en celular)
    const trustSection = page.locator('.mg-trust-section');
    await trustSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await trustSection.screenshot({
      path: path.join(outputDir, 'portada-confianza-390px.png'),
    });
    console.log('✓ portada-confianza-390px.png capturada');

    // Captura seccion packs (#plan)
    const planSection = page.locator('#plan');
    await planSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await planSection.screenshot({
      path: path.join(outputDir, 'portada-packs-390px.png'),
    });
    console.log('✓ portada-packs-390px.png capturada');

    await page.close();
  }

  await browser.close();
  console.log('Todas las capturas se generaron correctamente en:', outputDir);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
