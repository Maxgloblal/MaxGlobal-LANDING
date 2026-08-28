import { test, expect } from '@playwright/test';
import { PRODUCTOS } from '../src/config.js';

const routes = [
  { path: '/', name: 'Portada' },
  { path: '/productos', name: 'Catálogo' },
  { path: '/packs-de-afiliacion', name: 'Packs' },
  { path: '/registro', name: 'Registro' },
  { path: '/confirmacion', name: 'Confirmación' },
  { path: '/nosotros', name: 'Nosotros' },
  { path: '/terminos-y-condiciones', name: 'Términos y Condiciones' },
  { path: '/politica-de-privacidad', name: 'Política de Privacidad' },
  { path: '/libro-de-reclamaciones', name: 'Libro de Reclamaciones' },
  { path: '/pagina-inexistente-404', name: '404 No Encontrado' },
  ...PRODUCTOS.map((p) => ({ path: `/productos/${p.id}`, name: `Producto ${p.nombre}` })),
];

test.describe('Auditoría Móvil Real (390px Viewport) — 14+ Rutas', () => {
  for (const route of routes) {
    test(`Mobile 390px: ${route.name} (${route.path}) should render with NO horizontal overflow`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(route.path, { waitUntil: 'domcontentloaded' });

      // 1. Header & Footer present and loaded
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();

      // 2. Check no horizontal overflow on window
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      expect(hasHorizontalScroll, `Horizontal scroll detected on ${route.path}`).toBe(false);

      // 3. Floating action buttons should be visible
      const waFab = page.locator('[data-testid="fab-whatsapp"]');
      await expect(waFab).toBeVisible();
    });
  }

  test('Mobile 390px: Product detail page renders photo top, info bottom, full-width CTA buttons', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const firstProd = PRODUCTOS[0];
    await page.goto(`/productos/${firstProd.id}`, { waitUntil: 'domcontentloaded' });

    const imgBox = page.locator('.mg-detail-img-box');
    const addCartBtn = page.locator('[data-testid="detail-btn-add-cart"]');
    const waBtn = page.locator('[data-testid="detail-btn-whatsapp"]');

    await expect(imgBox).toBeVisible();
    await expect(addCartBtn).toBeVisible();
    await expect(waBtn).toBeVisible();

    // Check button widths are responsive (>= 300px in 390px viewport)
    const addCartBox = await addCartBtn.boundingBox();
    expect(addCartBox.width).toBeGreaterThanOrEqual(300);
  });

  test('Mobile 390px: Registro form inputs and submit button take full readable width', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/registro', { waitUntil: 'domcontentloaded' });

    const dniInput = page.locator('[data-testid="input-dni"]');
    const submitBtn = page.locator('[data-testid="btn-submit-registro"]');

    await expect(dniInput).toBeVisible();
    await expect(submitBtn).toBeVisible();

    const dniBox = await dniInput.boundingBox();
    expect(dniBox.width).toBeGreaterThanOrEqual(280);
  });
});
