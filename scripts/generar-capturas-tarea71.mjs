import { chromium } from '@playwright/test';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CAPTURAS_DIR = path.resolve(__dirname, '..', '00-INSTRUCCIONES', 'capturas-t71');
const PORT = 4175;
const BASE_URL = `http://127.0.0.1:${PORT}`;

async function main() {
  console.log('--- Iniciando generador de capturas para TAREA-71 ---');

  if (!fs.existsSync(CAPTURAS_DIR)) {
    fs.mkdirSync(CAPTURAS_DIR, { recursive: true });
  }

  // 1. Iniciar servidor Vite preview o dev
  console.log(`Iniciando servidor Vite en ${BASE_URL}...`);
  const server = spawn('cmd.exe', ['/c', 'npx', 'vite', '--port', String(PORT), '--host', '127.0.0.1'], {
    cwd: path.resolve(__dirname, '..')
  });

  server.stdout.on('data', (d) => {
    // console.log('[server stdout]', d.toString().trim());
  });
  server.stderr.on('data', (d) => {
    // console.log('[server stderr]', d.toString().trim());
  });

  // Esperar a que el servidor responda
  console.log('Esperando a que el servidor responda...');
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 1000));
    try {
      const res = await fetch(`${BASE_URL}/productos`);
      if (res.ok) {
        console.log('✓ Servidor listo y respondiendo HTTP 200.');
        break;
      }
    } catch (_) {}
  }

  const browser = await chromium.launch({ headless: true });

  try {
    // 1 · Captura Escritorio (1440 px) con Banner 1 visible
    console.log('1. Generando captura 01-catalogo-banner1-escritorio-1440px.png...');
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 }
    });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto(`${BASE_URL}/productos`);
    await desktopPage.waitForLoadState('networkidle');
    await desktopPage.waitForSelector('[data-testid="catalog-banner-0"]', { timeout: 10000 });
    await desktopPage.waitForTimeout(500);

    const pathDesktop = path.join(CAPTURAS_DIR, '01-catalogo-banner1-escritorio-1440px.png');
    await desktopPage.screenshot({ path: pathDesktop });
    console.log('✓ Captura guardada:', pathDesktop);

    // 2 · Captura Celular (390 px) con Banner 1 visible
    console.log('2. Generando captura 02-catalogo-banner1-celular-390px.png...');
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(`${BASE_URL}/productos`);
    await mobilePage.waitForLoadState('networkidle');
    await mobilePage.waitForSelector('[data-testid="catalog-banner-0"]', { timeout: 10000 });
    await mobilePage.waitForTimeout(500);

    const pathMobile = path.join(CAPTURAS_DIR, '02-catalogo-banner1-celular-390px.png');
    await mobilePage.screenshot({ path: pathMobile });
    console.log('✓ Captura guardada:', pathMobile);

    // 3 · Captura tras clic en Banner 1 mostrando la grilla filtrada
    console.log('3. Generando captura 03-catalogo-clic-banner1-grilla-filtrada.png...');
    const clickBanner1 = desktopPage.locator('[data-testid="catalog-banner-0"]');
    await clickBanner1.click();
    await desktopPage.waitForTimeout(800); // espera scroll y filtrado

    const pathFiltered = path.join(CAPTURAS_DIR, '03-catalogo-clic-banner1-grilla-filtrada.png');
    await desktopPage.screenshot({ path: pathFiltered });
    console.log('✓ Captura guardada:', pathFiltered);

    console.log('✅ Todas las capturas de la TAREA-71 generadas con éxito en:', CAPTURAS_DIR);
    process.exit(0);
  } finally {
    await browser.close();
    server.kill();
  }
}

main().catch((err) => {
  console.error('Error generando capturas:', err);
  process.exit(1);
});
