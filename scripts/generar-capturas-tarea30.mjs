import { chromium } from '@playwright/test';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ARTIFACTS_DIR = 'C:/Users/JACK FRANKLIN/.gemini/antigravity/brain/eb6cc98b-fe3e-4cdc-b756-6f5c3a63541a';

async function main() {
  console.log('--- Iniciando generador de capturas para TAREA-30 ---');

  // 1. Iniciar servidor Vite preview en puerto 4174
  console.log('Iniciando servidor Vite preview en puerto 4174...');
  const preview = spawn('npx.cmd', ['vite', 'preview', '--port', '4174'], {
    shell: true,
    stdio: 'pipe',
    cwd: path.resolve(__dirname, '..')
  });

  await new Promise((resolve) => {
    preview.stdout.on('data', (d) => {
      const msg = d.toString();
      if (msg.includes('4174') || msg.includes('ready') || msg.includes('Local:')) resolve();
    });
    setTimeout(resolve, 3000);
  });

  const browser = await chromium.launch({ headless: true });

  try {
    const context = await browser.newContext({
      viewport: { width: 1366, height: 900 }
    });
    const page = await context.newPage();

    console.log('Navegando a http://localhost:4174/packs-de-afiliacion ...');
    await page.goto('http://localhost:4174/packs-de-afiliacion');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Buscar tarjeta Gold
    const goldHeading = page.getByRole('heading', { name: 'Pack Gold', exact: true });
    await goldHeading.waitFor({ state: 'visible', timeout: 5000 });
    // Subir al contenedor de la tarjeta
    const goldCard = goldHeading.locator('xpath=ancestor::div[contains(@style, "border-radius")][1]');

    const pathGold = path.join(ARTIFACTS_DIR, 'captura-pack-gold-con-valor.png');
    await goldCard.screenshot({ path: pathGold });
    console.log('✓ Captura Gold guardada:', pathGold);

    // Buscar tarjeta Kit Emprendedor
    const kitHeading = page.getByRole('heading', { name: 'Kit Emprendedor', exact: true });
    await kitHeading.waitFor({ state: 'visible', timeout: 5000 });
    const kitCard = kitHeading.locator('xpath=ancestor::div[contains(@style, "border-radius")][1]');

    const pathKit = path.join(ARTIFACTS_DIR, 'captura-pack-kit-sin-valor.png');
    await kitCard.screenshot({ path: pathKit });
    console.log('✓ Captura Kit guardada:', pathKit);

    // Captura del grid de packs completo
    const gridPacks = page.locator('section:has(h3:has-text("Pack Gold"))').first();
    const pathGrid = path.join(ARTIFACTS_DIR, 'captura-packs-comparativa-grid.png');
    await gridPacks.screenshot({ path: pathGrid });
    console.log('✓ Captura Grid guardada:', pathGrid);

    console.log('Todas las capturas se generaron correctamente.');
  } finally {
    await browser.close();
    preview.kill('SIGTERM');
    try {
      process.kill(-preview.pid);
    } catch (e) {}
  }
}

main().catch((err) => {
  console.error('Error generando capturas:', err);
  process.exit(1);
});