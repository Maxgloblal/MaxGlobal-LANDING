import { chromium } from '@playwright/test';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ARTIFACTS_DIR = 'C:/Users/JACK FRANKLIN/.gemini/antigravity/brain/40ef2375-139c-4272-b918-b189e60d52d6';

async function main() {
  console.log('--- Iniciando generador de capturas para TAREA-34 ---');

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
    // 1 · El header con el botón, en escritorio
    console.log('1. Generando captura Header Escritorio...');
    const desktopContext = await browser.newContext({
      viewport: { width: 1280, height: 800 }
    });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto('http://localhost:4174/?ref=MG00012');
    await desktopPage.waitForLoadState('networkidle');
    await desktopPage.waitForSelector('[data-testid="head-registro"]');

    const headerDesktop = desktopPage.locator('header').first();
    const pathDesktop = path.join(ARTIFACTS_DIR, 'header-escritorio.png');
    await headerDesktop.screenshot({ path: pathDesktop });
    console.log('✓ Captura 1 guardada:', pathDesktop);

    // 2 · El header en móvil a 390px, con el botón visible
    console.log('2. Generando captura Header Móvil 390px...');
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 }
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('http://localhost:4174/?ref=MG00012');
    await mobilePage.waitForLoadState('networkidle');
    await mobilePage.waitForSelector('[data-testid="head-registro"]');

    const headerMobile = mobilePage.locator('header').first();
    const pathMobile = path.join(ARTIFACTS_DIR, 'header-movil-390px.png');
    await headerMobile.screenshot({ path: pathMobile });
    console.log('✓ Captura 2 guardada:', pathMobile);

    // 3 · El formulario mostrando el patrocinador tras haber navegado por el sitio
    console.log('3. Generando captura Formulario tras navegación...');
    // Desde escritorio, navegar a /productos
    console.log('   Navegando a /productos...');
    await desktopPage.goto('http://localhost:4174/productos');
    await desktopPage.waitForLoadState('networkidle');

    // Ahora hacer clic en el botón "Afíliate" en el header para ir a /registro
    console.log('   Haciendo clic en botón Afíliate...');
    const btnAfiliate = desktopPage.locator('[data-testid="head-registro"]').first();
    await btnAfiliate.click();
    await desktopPage.waitForLoadState('networkidle');
    await desktopPage.waitForURL('**/registro');

    // Esperar a que el campo patrocinador esté poblado
    const inputPatrocinador = desktopPage.locator('[data-testid="input-patrocinador"]');
    await inputPatrocinador.waitFor({ state: 'visible' });
    const valorPatrocinador = await inputPatrocinador.inputValue();
    console.log('   Valor en input-patrocinador tras navegación:', valorPatrocinador);

    // Scroll hasta el formulario y capturar el formulario
    const formSection = desktopPage.locator('form').first();
    await formSection.scrollIntoViewIfNeeded();
    await desktopPage.waitForTimeout(500);

    const pathForm = path.join(ARTIFACTS_DIR, 'formulario-patrocinador-navegado.png');
    await formSection.screenshot({ path: pathForm });
    console.log('✓ Captura 3 guardada:', pathForm);

    console.log('Todas las capturas de TAREA-34 se generaron exitosamente.');
    await desktopContext.close();
    await mobileContext.close();
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
