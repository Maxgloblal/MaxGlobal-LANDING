import { chromium } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, '../00-INSTRUCCIONES/capturas-t78');

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

    // Full page
    await page.screenshot({
      path: path.join(outputDir, 'portada-completa-1440px.png'),
      fullPage: true,
    });
    console.log('✓ portada-completa-1440px.png capturada');

    // Intro + stats (clamp h1, stats card)
    await page.screenshot({
      path: path.join(outputDir, 'portada-intro-1440px.png'),
      clip: { x: 0, y: 0, width: 1440, height: 900 },
    });
    console.log('✓ portada-intro-1440px.png capturada');

    // Cinta de productos (alturas uniformes)
    const cintaSection = page.locator('.pr-mq-outer');
    await cintaSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await cintaSection.screenshot({
      path: path.join(outputDir, 'portada-cinta-1440px.png'),
    });
    console.log('✓ portada-cinta-1440px.png capturada');

    // ¿Qué quieres hoy? (caminos)
    const caminosSection = page.locator('.paths');
    await caminosSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await caminosSection.screenshot({
      path: path.join(outputDir, 'portada-caminos-1440px.png'),
    });
    console.log('✓ portada-caminos-1440px.png capturada');

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

    // Full page mobile
    await page.screenshot({
      path: path.join(outputDir, 'portada-completa-390px.png'),
      fullPage: true,
    });
    console.log('✓ portada-completa-390px.png capturada');

    // Intro + stats en 1 fila
    const statsCard = page.locator('[data-testid="portada-stats-card"]');
    await statsCard.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(outputDir, 'portada-intro-stats-390px.png'),
      clip: { x: 0, y: 400, width: 390, height: 500 },
    });
    console.log('✓ portada-intro-stats-390px.png capturada');

    // Pasos (aspect-ratio 4:3)
    const pasosSection = page.locator('.steps.s3');
    await pasosSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await pasosSection.screenshot({
      path: path.join(outputDir, 'portada-pasos-390px.png'),
    });
    console.log('✓ portada-pasos-390px.png capturada');

    // Packs (Empresarial centrado)
    const packsSection = page.locator('#plan');
    await packsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await packsSection.screenshot({
      path: path.join(outputDir, 'portada-packs-390px.png'),
    });
    console.log('✓ portada-packs-390px.png capturada');

    await page.close();
  }

  await browser.close();
  console.log('Todas las capturas de TAREA-78 generadas en:', outputDir);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
