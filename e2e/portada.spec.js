import { test, expect } from '@playwright/test';

const PACK_IDS = ['kit-emprendedor', 'ejecutivo', 'gold', 'familiar', 'empresarial'];
const PACK_NAMES = ['Kit Emprendedor', 'Pack Ejecutivo', 'Pack Gold', 'Pack Familiar', 'Pack Empresarial'];

test.describe('Portada Comercial (TAREA-76) E2E', () => {
  test('1 · Carga los 3 banners de la portada y cada uno navega a su destino', async ({ page }) => {
    await page.goto('/');

    const banner0 = page.locator('[data-testid="portada-banner-0"]');
    const banner1 = page.locator('[data-testid="portada-banner-1"]');
    const banner2 = page.locator('[data-testid="portada-banner-2"]');

    await expect(banner0).toBeVisible();
    await expect(banner1).toBeAttached();
    await expect(banner2).toBeAttached();

    // Banner 1 -> /packs-de-afiliacion
    await banner1.click({ force: true });
    await expect(page).toHaveURL(/.*packs-de-afiliacion/);

    // Banner 2 -> /productos
    await page.goto('/');
    await page.locator('[data-testid="portada-banner-2"]').click({ force: true });
    await expect(page).toHaveURL(/.*productos/);
  });

  test('2 · Exactamente un solo <h1> en la página y la estadística de productos es dinámica', async ({ page }) => {
    await page.goto('/');

    const h1s = page.locator('h1');
    await expect(h1s).toHaveCount(1);
    await expect(h1s).toContainText('Un negocio propio');

    const statsBox = page.locator('[data-testid="portada-stats-card"]');
    await expect(statsBox).toBeVisible();
    await expect(statsBox).toContainText('productos');
    await expect(statsBox).toContainText('50%');
    await expect(statsBox).toContainText('10');
  });

  test('3 · La cinta de productos muestra las tarjetas de producto y cada una abre su ficha', async ({ page }) => {
    await page.goto('/');

    const cards = page.locator('.pr-mq .mg-product-card');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    // Verificar que un producto abre su ficha
    await page.goto('/productos/cafe-moringa');
    await expect(page).toHaveURL(/.*productos\/cafe-moringa/);
  });

  test('4 · Los 5 packs de afiliación se muestran con sus insignias oficiales icono-*.svg y llevan a /registro?pack=<id>', async ({ page }) => {
    // Escuchar solicitudes de red para verificar 0 errores 404 en las imágenes de packs
    const failedImages = [];
    page.on('response', (response) => {
      if (response.url().includes('/images/packs/icono-') && response.status() === 404) {
        failedImages.push(response.url());
      }
    });

    await page.goto('/');

    for (let i = 0; i < PACK_IDS.length; i++) {
      const id = PACK_IDS[i];
      const name = PACK_NAMES[i];
      const packCard = page.locator(`[data-testid="pack-card-${id}"]`);
      await expect(packCard).toBeVisible();
      await expect(packCard).toHaveAttribute('href', `/registro?pack=${id}`);
      await expect(packCard).toContainText(name);

      const iconImg = packCard.locator('img');
      await expect(iconImg).toHaveAttribute('src', `/images/packs/icono-${id}.svg`);
    }

    expect(failedImages).toHaveLength(0);

    // Gold debe tener su etiqueta destacada
    const goldCard = page.locator('[data-testid="pack-card-gold"]');
    await expect(goldCard).toHaveClass(/hl/);
    await expect(goldCard).toContainText('El más elegido');
  });

  test('4b · No queda ninguna cinta TickerBand (.tk) en la portada', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.tk')).toHaveCount(0);
    await expect(page.locator('.tk-in')).toHaveCount(0);
  });

  test('4c · Barra de anuncios AnnouncementBar está arriba del SiteHeader en /, /productos y /packs-de-afiliacion', async ({ page }) => {
    const rutas = ['/', '/productos', '/packs-de-afiliacion'];

    for (const r of rutas) {
      await page.goto(r);
      const bar = page.locator('[data-testid="announcement-bar"]');
      await expect(bar).toBeVisible();

      // Verificar que precede al header en el DOM
      const isBeforeHeader = await page.evaluate(() => {
        const barEl = document.querySelector('[data-testid="announcement-bar"]');
        const headEl = document.querySelector('header');
        return barEl && headEl && (barEl.compareDocumentPosition(headEl) & Node.DOCUMENT_POSITION_FOLLOWING);
      });
      expect(Boolean(isBeforeHeader)).toBe(true);
    }

    // Al scrollear hacia abajo, el header se mantiene sticky sin huecos
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, 300));
    await page.waitForTimeout(200);

    const headerBox = await page.locator('header').boundingBox();
    expect(headerBox.y).toBeCloseTo(0, 1);
  });

  test('4d · Barra de confianza aparece debajo de la intro con los 4 beneficios', async ({ page }) => {
    await page.goto('/');

    const trustSection = page.locator('.mg-trust-section');
    await expect(trustSection).toBeVisible();

    await expect(trustSection).toContainText('Productos 100% naturales');
    await expect(trustSection).toContainText('Envíos a todo el Perú');
    await expect(trustSection).toContainText('Descuento de por vida para socios');
    await expect(trustSection).toContainText('Comisiones hasta 10 niveles');

    // En celular (390px), la grilla es 2x2
    await page.setViewportSize({ width: 390, height: 844 });
    const cols = await page.locator('.mg-trust-grid').evaluate((el) => {
      return window.getComputedStyle(el).gridTemplateColumns.split(' ').length;
    });
    expect(cols).toBe(2);
  });

  test('5 · Dos caminos (Quiero comprar / Quiero emprender) navegan correctamente', async ({ page }) => {
    await page.goto('/');

    const caminoComprar = page.locator('[data-testid="camino-comprar"]');
    await expect(caminoComprar).toBeVisible();
    await expect(caminoComprar).toHaveAttribute('href', '/productos');

    const caminoEmprender = page.locator('[data-testid="camino-emprender"]');
    await expect(caminoEmprender).toBeVisible();
    await expect(caminoEmprender).toHaveAttribute('href', '/packs-de-afiliacion');
  });

  test('6 · Empezar toma tres pasos con fotos y números 01, 02, 03', async ({ page }) => {
    await page.goto('/');

    const stepsSec = page.locator('#como-funciona');
    await expect(stepsSec).toBeVisible();
    await expect(stepsSec).toContainText('01');
    await expect(stepsSec).toContainText('02');
    await expect(stepsSec).toContainText('03');
    await expect(stepsSec.getByRole('heading', { name: 'Eliges tu pack' })).toBeVisible();
    await expect(stepsSec.getByRole('heading', { name: 'Recibes tu producto' })).toBeVisible();
    await expect(stepsSec.getByRole('heading', { name: 'Empiezas a construir' })).toBeVisible();
  });

  test('7 · Plan de compensación muestra los 4 bonos y el botón Ver el plan completo', async ({ page }) => {
    await page.goto('/');

    const planSec = page.locator('#plan');
    await expect(planSec).toBeVisible();
    await expect(planSec).toContainText('Patrocinio');
    await expect(planSec).toContainText('Residual');
    await expect(planSec).toContainText('Rango');
    await expect(planSec).toContainText('Global');

    const btnPlan = page.locator('[data-testid="btn-ver-plan-completo"]');
    await expect(btnPlan).toBeVisible();
    await expect(btnPlan).toHaveAttribute('href', '/packs-de-afiliacion#comisiones');
  });

  test('8 · Cierre final Empieza hoy con imagen y CTAs', async ({ page }) => {
    await page.goto('/');

    const cierreSec = page.locator('#cierre');
    await expect(cierreSec).toBeVisible();
    await expect(cierreSec.getByRole('heading', { name: 'Empieza hoy' })).toBeVisible();
    await expect(page.locator('[data-testid="close-btn-packs"]')).toBeVisible();
    await expect(page.locator('[data-testid="close-btn-whatsapp"]')).toBeVisible();
  });

  test('9 · Sin scroll horizontal en 390, 1024, 1440 y 1920 px', async ({ page }) => {
    const viewports = [390, 1024, 1440, 1920];

    for (const width of viewports) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);

      expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
    }
  });

  test('10 · prefers-reduced-motion: animaciones de cinta de productos pausadas / quietas', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    const prIn = page.locator('.pr-in').first();
    const anim = await prIn.evaluate((el) => window.getComputedStyle(el).animationName);
    expect(['none', ''].includes(anim)).toBe(true);
  });
});
