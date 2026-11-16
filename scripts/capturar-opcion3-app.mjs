import { chromium } from '@playwright/test';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ARTIFACTS_DIR = 'C:/Users/JACK FRANKLIN/.gemini/antigravity/brain/53be3dec-a167-4231-93aa-3eb8aed07746';
const PORT = 4189;
const BASE_URL = `http://127.0.0.1:${PORT}`;

async function main() {
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
    // 1. Mobile (390 px) Scrolled to Grid
    console.log('Capturando Mobile 390px con Opción 3...');
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(`${BASE_URL}/productos`, { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(600);

    await mobilePage.evaluate(() => {
      const el = document.querySelector('[data-testid="catalog-grid"]');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await mobilePage.waitForTimeout(600);
    await mobilePage.screenshot({ path: path.join(ARTIFACTS_DIR, '08-mobile-fotos-actualizadas.png') });
    await mobilePage.close();

    // 2. Desktop (1440 px)
    console.log('Capturando Desktop 1440px con Opción 3...');
    const desktopPage = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1.5,
    });
    await desktopPage.goto(`${BASE_URL}/productos`, { waitUntil: 'networkidle' });
    await desktopPage.waitForTimeout(600);
    await desktopPage.evaluate(() => {
      const el = document.querySelector('[data-testid="catalog-grid"]');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await desktopPage.waitForTimeout(600);
    await desktopPage.screenshot({ path: path.join(ARTIFACTS_DIR, '09-desktop-fotos-actualizadas.png') });
    await desktopPage.close();

    console.log('✓ Capturas de Opción 3 generadas.');
  } finally {
    await browser.close();
    server.kill();
    try {
      spawn('cmd.exe', ['/c', 'taskkill', '/F', '/IM', 'node.exe', '/T']);
    } catch (_) {}
  }
}

main().catch(console.error);
