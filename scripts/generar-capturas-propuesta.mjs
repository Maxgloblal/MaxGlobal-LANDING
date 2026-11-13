import { chromium } from '@playwright/test';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CAPTURAS_DIR = path.resolve(__dirname, '..', '00-INSTRUCCIONES', 'capturas-propuesta');
const PORT = 4178;
const BASE_URL = `http://127.0.0.1:${PORT}`;

async function main() {
  if (!fs.existsSync(CAPTURAS_DIR)) {
    fs.mkdirSync(CAPTURAS_DIR, { recursive: true });
  }

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
    // 1 · Desktop (1440 px) Initial View
    console.log('1. Captura 1440px inicial...');
    const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await desktopPage.goto(`${BASE_URL}/productos`, { waitUntil: 'networkidle' });
    await desktopPage.screenshot({ path: path.join(CAPTURAS_DIR, '01-desktop-inicial-1440px.png') });

    // 2 · Desktop (1440 px) Grilla de Productos
    console.log('2. Captura 1440px grilla...');
    await desktopPage.evaluate(() => {
      const el = document.querySelector('[data-testid="products-grid"]');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await desktopPage.waitForTimeout(400);
    await desktopPage.screenshot({ path: path.join(CAPTURAS_DIR, '02-desktop-grilla-1440px.png') });
    await desktopPage.close();

    // 3 · Mobile (390 px) Initial View
    console.log('3. Captura 390px inicial...');
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(`${BASE_URL}/productos`, { waitUntil: 'networkidle' });
    await mobilePage.screenshot({ path: path.join(CAPTURAS_DIR, '03-mobile-inicial-390px.png') });

    // 4 · Mobile (390 px) Grilla
    console.log('4. Captura 390px grilla...');
    await mobilePage.evaluate(() => {
      const el = document.querySelector('[data-testid="products-grid"]');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await mobilePage.waitForTimeout(400);
    await mobilePage.screenshot({ path: path.join(CAPTURAS_DIR, '04-mobile-grilla-390px.png') });
    await mobilePage.close();

    console.log('✓ Capturas generadas con éxito en:', CAPTURAS_DIR);
  } finally {
    await browser.close();
    server.kill();
    try {
      spawn('cmd.exe', ['/c', 'taskkill', '/F', '/IM', 'node.exe', '/T']);
    } catch (_) {}
  }
}

main().catch(console.error);
