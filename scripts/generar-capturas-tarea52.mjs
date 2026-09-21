import { chromium } from '@playwright/test';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CAPTURAS_DIR = path.resolve(__dirname, '..', '00-INSTRUCCIONES', 'capturas-t52');
const PORT = 4174;
const BASE_URL = `http://127.0.0.1:${PORT}`;

async function main() {
  console.log('--- Iniciando generador de capturas para TAREA-52 ---');

  if (!fs.existsSync(CAPTURAS_DIR)) {
    fs.mkdirSync(CAPTURAS_DIR, { recursive: true });
  }

  // 1. Iniciar servidor Vite preview
  console.log(`Iniciando servidor Vite preview en ${BASE_URL}...`);
  const preview = spawn('cmd.exe', ['/c', 'npx', 'vite', 'preview', '--port', String(PORT), '--host', '127.0.0.1'], {
    cwd: path.resolve(__dirname, '..')
  });

  preview.stdout.on('data', (d) => {
    console.log('[preview stdout]', d.toString().trim());
  });
  preview.stderr.on('data', (d) => {
    console.log('[preview stderr]', d.toString().trim());
  });

  // Esperar a que el servidor esté activo
  console.log('Esperando a que el servidor preview responda...');
  for (let i = 0; i < 15; i++) {
    await new Promise((r) => setTimeout(r, 1000));
    try {
      const res = await fetch(BASE_URL);
      if (res.ok) {
        console.log('✓ Servidor preview listo y respondiendo HTTP 200.');
        break;
      }
    } catch (e) {
      // reintentar
    }
  }

  const browser = await chromium.launch({ headless: true });

  try {
    // 1 · Cabecera botón Ingresar (Desktop)
    console.log('1. Generando captura 03-cabecera-boton-ingresar-desktop.png...');
    const desktopContext = await browser.newContext({
      viewport: { width: 1280, height: 800 }
    });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto(`${BASE_URL}/`);
    await desktopPage.waitForLoadState('networkidle');
    await desktopPage.waitForSelector('[data-testid="head-ingresar"]', { timeout: 10000 });

    const headerDesktop = desktopPage.locator('header').first();
    const pathHeadDesktop = path.join(CAPTURAS_DIR, '03-cabecera-boton-ingresar-desktop.png');
    await headerDesktop.screenshot({ path: pathHeadDesktop });
    console.log('✓ Captura guardada:', pathHeadDesktop);

    // 2 · Cabecera menú móvil Ingresar
    console.log('2. Generando captura 04-cabecera-menu-movil-ingresar.png...');
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 }
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(`${BASE_URL}/`);
    await mobilePage.waitForLoadState('networkidle');

    // Abrir menú hamburguesa móvil
    const btnHamburguesa = mobilePage.locator('header button[aria-label*="menú" i], header button[aria-label*="menu" i]').first();
    await btnHamburguesa.click();
    await mobilePage.waitForSelector('[data-testid="mobile-nav-ingresar"]', { timeout: 10000 });
    await mobilePage.waitForTimeout(300);

    const pathMobileMenu = path.join(CAPTURAS_DIR, '04-cabecera-menu-movil-ingresar.png');
    await mobilePage.screenshot({ path: pathMobileMenu });
    console.log('✓ Captura guardada:', pathMobileMenu);

    // 3 · Pie de página enlace Ingresar
    console.log('3. Generando captura 05-pie-enlace-ingresar.png...');
    const footerElement = desktopPage.locator('footer').first();
    await footerElement.scrollIntoViewIfNeeded();
    await desktopPage.waitForSelector('[data-testid="footer-link-ingresar"]', { timeout: 10000 });
    const pathFooter = path.join(CAPTURAS_DIR, '05-pie-enlace-ingresar.png');
    await footerElement.screenshot({ path: pathFooter });
    console.log('✓ Captura guardada:', pathFooter);

    // 4 · Registro con ref bloqueado
    console.log('4. Generando captura 01-registro-con-ref-bloqueado.png...');
    await desktopPage.goto(`${BASE_URL}/registro?ref=MG00012`);
    await desktopPage.waitForLoadState('networkidle');
    await desktopPage.waitForSelector('[data-testid="mensaje-patrocinador-bloqueado"]', { timeout: 10000 });

    const formSectionConRef = desktopPage.locator('form').first();
    await formSectionConRef.scrollIntoViewIfNeeded();
    await desktopPage.waitForTimeout(400);
    const pathRegConRef = path.join(CAPTURAS_DIR, '01-registro-con-ref-bloqueado.png');
    await formSectionConRef.screenshot({ path: pathRegConRef });
    console.log('✓ Captura guardada:', pathRegConRef);

    // 5 · Registro sin ref editable
    console.log('5. Generando captura 02-registro-sin-ref-editable.png...');
    const sinRefContext = await browser.newContext({
      viewport: { width: 1280, height: 800 }
    });
    const sinRefPage = await sinRefContext.newPage();
    await sinRefPage.goto(`${BASE_URL}/registro`);
    await sinRefPage.waitForLoadState('networkidle');
    await sinRefPage.waitForSelector('[data-testid="input-patrocinador"]', { timeout: 10000 });

    const formSectionSinRef = sinRefPage.locator('form').first();
    await formSectionSinRef.scrollIntoViewIfNeeded();
    await sinRefPage.waitForTimeout(400);
    const pathRegSinRef = path.join(CAPTURAS_DIR, '02-registro-sin-ref-editable.png');
    await formSectionSinRef.screenshot({ path: pathRegSinRef });
    console.log('✓ Captura guardada:', pathRegSinRef);

    // 6 · Confirmación con botones de copiar cuenta bancaria (RF-172)
    console.log('6. Generando captura 06-confirmacion-botones-copiar.png...');
    await desktopPage.goto(`${BASE_URL}/confirmacion`);
    await desktopPage.waitForLoadState('networkidle');
    await desktopPage.waitForSelector('[data-testid="btn-copiar-cuenta-0"]', { timeout: 10000 });
    const cuentasSection = desktopPage.locator('section').nth(1);
    await cuentasSection.scrollIntoViewIfNeeded();
    await desktopPage.waitForTimeout(400);
    const pathConfirmacion = path.join(CAPTURAS_DIR, '06-confirmacion-botones-copiar.png');
    await cuentasSection.screenshot({ path: pathConfirmacion });
    console.log('✓ Captura guardada:', pathConfirmacion);

    await desktopContext.close();
    await mobileContext.close();
    await sinRefContext.close();
    console.log('✓ Todas las capturas se generaron correctamente en:', CAPTURAS_DIR);
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
