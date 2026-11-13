import { chromium } from '@playwright/test';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CAPTURAS_DIR = path.resolve(__dirname, '..', '00-INSTRUCCIONES', 'capturas-t73');
const PORT = 4176;
const BASE_URL = `http://127.0.0.1:${PORT}`;

async function main() {
  console.log('--- Iniciando generador de capturas y mediciones TAREA-73 ---');

  if (!fs.existsSync(CAPTURAS_DIR)) {
    fs.mkdirSync(CAPTURAS_DIR, { recursive: true });
  }

  // Iniciar servidor Vite
  console.log(`Iniciando servidor Vite en ${BASE_URL}...`);
  const server = spawn('cmd.exe', ['/c', 'npx', 'vite', '--port', String(PORT), '--host', '127.0.0.1'], {
    cwd: path.resolve(__dirname, '..')
  });

  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 1000));
    try {
      const res = await fetch(`${BASE_URL}/productos`);
      if (res.ok) {
        console.log('✓ Servidor listo.');
        break;
      }
    } catch (_) {}
  }

  const browser = await chromium.launch({ headless: true });

  try {
    const measurements = {};

    // 1 · Celular (390 px) SIN hacer scroll
    console.log('1. Captura 390 px (Celular)...');
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(`${BASE_URL}/productos`);
    await mobilePage.waitForLoadState('networkidle');
    await mobilePage.waitForSelector('[data-testid="catalog-banner-0"]', { timeout: 10000 });
    await mobilePage.waitForTimeout(600);

    const mobileBox = await mobilePage.locator('.mg-carousel-container').boundingBox();
    measurements['390px'] = mobileBox ? mobileBox.height : null;

    const path390 = path.join(CAPTURAS_DIR, '01-catalogo-sin-scroll-390px.png');
    await mobilePage.screenshot({ path: path390 });
    console.log(`✓ Guardado 390px. Alto carrusel: ${measurements['390px']} px`);

    // 2 · Escritorio (1440 px) SIN hacer scroll
    console.log('2. Captura 1440 px (Escritorio)...');
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 }
    });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto(`${BASE_URL}/productos`);
    await desktopPage.waitForLoadState('networkidle');
    await desktopPage.waitForSelector('[data-testid="catalog-banner-0"]', { timeout: 10000 });
    await desktopPage.waitForTimeout(600);

    const desktopBox = await desktopPage.locator('.mg-carousel-container').boundingBox();
    measurements['1440px'] = desktopBox ? desktopBox.height : null;

    const path1440 = path.join(CAPTURAS_DIR, '02-catalogo-sin-scroll-1440px.png');
    await desktopPage.screenshot({ path: path1440 });
    console.log(`✓ Guardado 1440px. Alto carrusel: ${measurements['1440px']} px`);

    // 3 · Pantalla ancha (1920 px) SIN hacer scroll
    console.log('3. Captura 1920 px (Pantalla Ancha)...');
    const wideContext = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });
    const widePage = await wideContext.newPage();
    await widePage.goto(`${BASE_URL}/productos`);
    await widePage.waitForLoadState('networkidle');
    await widePage.waitForSelector('[data-testid="catalog-banner-0"]', { timeout: 10000 });
    await widePage.waitForTimeout(600);

    const wideBox = await widePage.locator('.mg-carousel-container').boundingBox();
    measurements['1920px'] = wideBox ? wideBox.height : null;

    const path1920 = path.join(CAPTURAS_DIR, '03-catalogo-sin-scroll-1920px.png');
    await widePage.screenshot({ path: path1920 });
    console.log(`✓ Guardado 1920px. Alto carrusel: ${measurements['1920px']} px`);

    // 4 · Clic en banner 1 mostrando chip activo y grilla filtrada
    console.log('4. Clic en banner 1 (chip activo + grilla)...');
    await desktopPage.locator('[data-testid="catalog-banner-0"]').click();
    await desktopPage.waitForTimeout(800);

    const pathClick = path.join(CAPTURAS_DIR, '04-catalogo-clic-banner1-chip-activo-grilla.png');
    await desktopPage.screenshot({ path: pathClick });
    console.log('✓ Guardado clic banner 1.');

    console.log('----------------------------------------------------');
    console.log('ALTURAS REALES DEL CARRUSEL MEDIDAS:');
    console.log(`  - Viewport  390 px: ${measurements['390px']} px (esperado ~390 px)`);
    console.log(`  - Viewport 1440 px: ${measurements['1440px']} px (esperado ~405 px)`);
    console.log(`  - Viewport 1920 px: ${measurements['1920px']} px (esperado ~540 px)`);
    console.log('----------------------------------------------------');

    process.exit(0);
  } finally {
    await browser.close();
    server.kill();
  }
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
