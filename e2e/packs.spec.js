import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CAPTURAS_DIR = path.resolve(__dirname, '../00-INSTRUCCIONES/capturas-t75');

test.describe('Packs Page (P-03) E2E — TAREA-75', () => {
  test('should display all 5 packs with correct prices and features', async ({ page }) => {
    await page.goto('/packs-de-afiliacion');

    // Título principal
    await expect(page.locator('h1')).toContainText('Elige cómo quieres empezar');

    // Packs
    const packsGrid = page.locator('#packs');
    await expect(packsGrid.getByRole('heading', { name: 'Kit Emprendedor' })).toBeVisible();
    await expect(packsGrid.getByText('S/ 120').first()).toBeVisible();

    await expect(packsGrid.getByRole('heading', { name: 'Pack Ejecutivo' })).toBeVisible();
    await expect(packsGrid.getByText('S/ 360').first()).toBeVisible();

    await expect(packsGrid.getByRole('heading', { name: 'Pack Gold' })).toBeVisible();
    await expect(packsGrid.getByText('S/ 1,200').first()).toBeVisible();
    await expect(packsGrid.getByText('El más elegido').first()).toBeVisible();

    await expect(packsGrid.getByRole('heading', { name: 'Pack Familiar' })).toBeVisible();
    await expect(packsGrid.getByText('S/ 4,000').first()).toBeVisible();

    await expect(packsGrid.getByRole('heading', { name: 'Pack Empresarial' })).toBeVisible();
    await expect(packsGrid.getByText('S/ 8,000').first()).toBeVisible();
  });

  test('clicking pack CTA navigates to registro with selected pack parameter', async ({ page }) => {
    await page.goto('/packs-de-afiliacion');

    await page.click('[data-testid="btn-select-pack-gold"]');
    await expect(page).toHaveURL(/.*registro\?pack=gold/);
    await expect(page.locator('h1')).toContainText('Regístrate para afiliarte');
  });

  test('displays comparison table and compensation plan', async ({ page }) => {
    await page.goto('/packs-de-afiliacion');

    // Tabla comparativa
    await expect(page.locator('text=Los cinco packs, lado a lado')).toBeVisible();
    await expect(page.locator('table')).toBeVisible();

    // Plan de compensación
    await expect(page.locator('text=Bono de patrocinio')).toBeVisible();
    await expect(page.locator('text=Bono residual').first()).toBeVisible();
    await expect(page.locator('text=puntos personales al mes')).toBeVisible();
    await expect(page.locator('text=10%').first()).toBeVisible();

    // CTA de dudas por WhatsApp
    await expect(page.locator('[data-testid="btn-packs-whatsapp-dudas"]')).toBeVisible();
  });

  test('Bloque 1 & 2: Banner emprende and 5 insignia SVGs load with 0 404 errors', async ({ page }) => {
    const failed404s = [];
    page.on('response', (response) => {
      if (response.status() === 404) {
        failed404s.push(response.url());
      }
    });

    await page.goto('/packs-de-afiliacion');

    // Banner arriba de la página
    const bannerLink = page.locator('[data-testid="banner-emprende-link"]');
    await expect(bannerLink).toBeVisible();
    const bannerImg = bannerLink.locator('img');
    await expect(bannerImg).toHaveAttribute('alt', 'Emprende con Max Global, packs desde S/ 120');

    // Las 5 insignias
    const packIds = ['kit-emprendedor', 'ejecutivo', 'gold', 'familiar', 'empresarial'];
    for (const id of packIds) {
      const card = page.locator(`[data-testid="pack-card-${id}"]`);
      await expect(card).toBeVisible();
      const insignia = card.locator('img.mg-pack-insignia');
      await expect(insignia).toBeVisible();
      await expect(insignia).toHaveAttribute('src', `/images/packs/icono-${id}.svg`);
      await expect(insignia).toHaveAttribute('alt', '');
    }

    expect(failed404s).toEqual([]);
  });

  test('Banner click scrolls smoothly to the packs grid (#packs)', async ({ page }) => {
    await page.goto('/packs-de-afiliacion');
    const bannerLink = page.locator('[data-testid="banner-emprende-link"]');
    await bannerLink.click();

    // Esperar a que el scroll se complete
    await page.waitForTimeout(600);
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(100);

    const gridVisible = await page.locator('#packs').isVisible();
    expect(gridVisible).toBe(true);
  });

  test('All 5 CTA buttons link to /registro?pack=<id>', async ({ page }) => {
    const packIds = ['kit-emprendedor', 'ejecutivo', 'gold', 'familiar', 'empresarial'];
    for (const id of packIds) {
      await page.goto('/packs-de-afiliacion');
      await page.click(`[data-testid="btn-select-pack-${id}"]`);
      await expect(page).toHaveURL(new RegExp(`/registro\\?pack=${id}`));
    }
  });

  test('Layout and Capturas at 390, 1024, 1440 and 1920 px without horizontal scroll', async ({ page }) => {
    const viewports = [
      { width: 390, height: 844, name: '390px' },
      { width: 1024, height: 768, name: '1024px' },
      { width: 1440, height: 900, name: '1440px' },
      { width: 1920, height: 1080, name: '1920px' },
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/packs-de-afiliacion');
      await page.waitForLoadState('networkidle');

      // 1. Verificar ausencia de scroll horizontal
      const noHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1;
      });
      expect(noHorizontalScroll).toBe(true);

      // 2. Captura: Vista Inicial
      await page.screenshot({
        path: path.join(CAPTURAS_DIR, `packs-inicial-${vp.name}.png`),
        fullPage: false,
      });

      // 3. Captura: Grilla Completa
      const gridSection = page.locator('#packs');
      await gridSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);

      await gridSection.screenshot({
        path: path.join(CAPTURAS_DIR, `packs-grilla-${vp.name}.png`),
      });

      // Verificaciones geométricas específicas por ancho
      const cards = await page.locator('[data-testid^="pack-card-"]').all();
      expect(cards.length).toBe(5);

      const boxes = [];
      for (const card of cards) {
        boxes.push(await card.boundingBox());
      }

      if (vp.width >= 1280) {
        // En 1440 y 1920 px: 5 columnas en una sola fila (X creciente, Y alineado)
        for (let i = 0; i < 4; i++) {
          expect(boxes[i].x).toBeLessThan(boxes[i + 1].x);
          // La diferencia en Y entre tarjetas estándar es menor a 5px
          // y respecto a Gold es ~16px (Gold sobresale)
          expect(Math.abs(boxes[i].y - boxes[i + 1].y)).toBeLessThanOrEqual(25);
        }
      } else if (vp.width === 1024) {
        // En 1024 px: 3 en primera fila, 2 en segunda fila CENTRADA
        // Fila 1: cards 0, 1, 2
        expect(boxes[0].x).toBeLessThan(boxes[1].x);
        expect(boxes[1].x).toBeLessThan(boxes[2].x);
        expect(Math.abs(boxes[0].y - boxes[1].y)).toBeLessThanOrEqual(25);

        // Fila 2: cards 3, 4 están debajo
        expect(boxes[3].y).toBeGreaterThan(boxes[0].y + 100);
        expect(boxes[4].y).toBeGreaterThan(boxes[0].y + 100);
        expect(Math.abs(boxes[3].y - boxes[4].y)).toBeLessThanOrEqual(5);

        // Centrado de la fila 2: el centro de cards 3 y 4 coincide con el centro del contenedor
        const gridBox = await page.locator('.mg-packs-grid').boundingBox();
        const centerRow2 = (boxes[3].x + boxes[4].x + boxes[4].width) / 2;
        const centerGrid = gridBox.x + gridBox.width / 2;
        expect(Math.abs(centerRow2 - centerGrid)).toBeLessThanOrEqual(5);
      } else if (vp.width <= 640) {
        // En 390 px: 1 sola columna (Y estrictamente creciente)
        for (let i = 0; i < 4; i++) {
          expect(boxes[i + 1].y).toBeGreaterThan(boxes[i].y + boxes[i].height - 10);
        }

        // Banner en 390px debe tener aspect-ratio ~1/1 (width ≈ height)
        const bannerBox = await page.locator('.mg-carousel-container').boundingBox();
        const bannerRatio = bannerBox.width / bannerBox.height;
        expect(bannerRatio).toBeGreaterThan(0.9);
        expect(bannerRatio).toBeLessThan(1.1);
      }
    }
  });
});
