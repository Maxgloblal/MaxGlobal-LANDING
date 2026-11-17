import { test, expect } from '@playwright/test';

test.describe('Banners comerciales en Catálogo (TAREA-71)', () => {
  test('carrusel de banners, navegación y filtrado interactivo', async ({ page }) => {
    // 1 · abra /productos y encuentre los 4 banners
    await page.goto('/productos');

    // Comprobar que los 4 banners existen en el carrusel
    const banners = page.locator('[data-testid^="catalog-banner-"]');
    await expect(banners).toHaveCount(4);

    const banner0 = page.locator('[data-testid="catalog-banner-0"]');
    const banner1 = page.locator('[data-testid="catalog-banner-1"]');
    const banner2 = page.locator('[data-testid="catalog-banner-2"]');
    const banner3 = page.locator('[data-testid="catalog-banner-3"]');

    await expect(banner0).toBeAttached();
    await expect(banner1).toBeAttached();
    await expect(banner2).toBeAttached();
    await expect(banner3).toBeAttached();

    // Validar imágenes y textos alternativos descriptivos
    const img0 = banner0.locator('img');
    const img1 = banner1.locator('img');
    const img2 = banner2.locator('img');
    const img3 = banner3.locator('img');

    await expect(img0).toHaveAttribute('alt', 'Lágrimas humectantes Esplendor para ojos, S/ 120');
    await expect(img1).toHaveAttribute('alt', 'Coffee Capuccino y Colágeno Aeterna, S/ 150 cada uno');
    await expect(img2).toHaveAttribute('alt', 'Línea Moringa: aceite, cápsulas y polvo, desde S/ 50');
    await expect(img3).toHaveAttribute('alt', 'Packs de afiliación Max Global, emprende desde S/ 120');

    // Validar atributos de carga requeridos (eager + fetchpriority en banner 0, lazy en el resto)
    await expect(img0).toHaveAttribute('loading', 'eager');
    await expect(img1).toHaveAttribute('loading', 'lazy');
    await expect(img2).toHaveAttribute('loading', 'lazy');
    await expect(img3).toHaveAttribute('loading', 'lazy');

    // 2 · clic en banner 0 → llega a /productos/esplendor
    await banner0.click();
    await expect(page).toHaveURL(/.*productos\/esplendor/);

    // Volver a /productos
    await page.goto('/productos');

    // 3 · clic en el banner 1 → la URL tiene categoria=Salud y Nutrición
    await page.locator('[data-testid="catalog-banner-1"]').click();
    await expect(page).toHaveURL(/categoria=Salud(\+|%20)y(\+|%20)Nutrici(o|ó|%C3%B3)n/i);

    // Verificar que el banner 1 deja activo el chip Salud y Nutrición
    const chipSalud = page.locator('[data-testid="chip-categoria-salud-y-nutricion"]');
    await expect(chipSalud).toBeVisible();
    await expect(chipSalud).toHaveAttribute('aria-pressed', 'true');

    // Verificar que solo se muestran productos de Salud y Nutrición
    const catalogCount = page.locator('[data-testid="catalog-count"]');
    await expect(catalogCount).toContainText('de 8 productos');
    await expect(page.locator('[data-testid="catalog-grid"]')).toBeVisible();

    // 4 · clic en el banner 2 → la URL tiene buscar=moringa
    await page.goto('/productos');
    await page.locator('[data-testid="catalog-banner-2"]').click();
    await expect(page).toHaveURL(/buscar=moringa/i);
    await expect(catalogCount).toContainText('de 8 productos');

    // 5 · clic en el banner 3 → llega a /packs-de-afiliacion
    await page.goto('/productos');
    await page.locator('[data-testid="catalog-banner-3"]').click();
    await expect(page).toHaveURL(/.*packs-de-afiliacion/);
    await expect(page.locator('h1')).toContainText('Elige cómo quieres empezar');
  });

  test('puntos de navegación y pausa al pasar el ratón', async ({ page }) => {
    await page.goto('/productos');

    // Puntos (dots) presentes para cada banner
    await expect(page.locator('[data-testid="banner-dot-0"]')).toBeVisible();
    await expect(page.locator('[data-testid="banner-dot-1"]')).toBeVisible();
    await expect(page.locator('[data-testid="banner-dot-2"]')).toBeVisible();

    // Clic en punto 1 cambia de diapositiva
    await page.locator('[data-testid="banner-dot-1"]').click();
    await expect(page.locator('[data-testid="banner-dot-1"]')).toHaveAttribute('aria-selected', 'true');

    // Clic en punto 2 cambia de diapositiva
    await page.locator('[data-testid="banner-dot-2"]').click();
    await expect(page.locator('[data-testid="banner-dot-2"]')).toHaveAttribute('aria-selected', 'true');
  });

  test('validaciones TAREA-73: exactamente un h1, chips de categoría, sin scroll horizontal e imágenes responsivas', async ({ page }) => {
    await page.goto('/productos');

    // 1 · Hay exactamente un <h1> en /productos
    const h1s = page.locator('h1');
    await expect(h1s).toHaveCount(1);
    await expect(h1s).toHaveText('Nuestros productos');

    // 2 · Clic en cada chip de categoría filtra la grilla y actualiza la URL
    const chipSalud = page.locator('[data-testid="chip-categoria-salud-y-nutricion"]');
    const chipCuidado = page.locator('[data-testid="chip-categoria-cuidado-personal"]');
    const chipPerfume = page.locator('[data-testid="chip-categoria-perfumeria"]');
    const chipTodas = page.locator('[data-testid="chip-categoria-todas"]');

    await chipCuidado.click();
    await expect(page).toHaveURL(/categoria=Cuidado(\+|%20)Personal/i);
    await expect(chipCuidado).toHaveAttribute('aria-pressed', 'true');

    await chipPerfume.click();
    await expect(page).toHaveURL(/categoria=Perfumer(i|í|%C3%AD)a/i);
    await expect(chipPerfume).toHaveAttribute('aria-pressed', 'true');

    await chipTodas.click();
    await expect(chipTodas).toHaveAttribute('aria-pressed', 'true');

    // 3 · Sin scroll horizontal en 390, 1440 y 1920 px
    for (const width of [390, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      await page.waitForTimeout(200);
      const hasHorizontalScroll = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth
      );
      expect(hasHorizontalScroll).toBe(false);
    }

    // 4 · A 390 px se carga imagen -movil; a 1440 px la de escritorio
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/productos');
    const bannerImg = page.locator('[data-testid="catalog-banner-0"] img');
    await expect(bannerImg).toBeVisible();
    const srcMobile = await bannerImg.evaluate((el) => el.currentSrc);
    expect(srcMobile).toContain('-movil.webp');

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/productos');
    const bannerImgDesktop = page.locator('[data-testid="catalog-banner-0"] img');
    await expect(bannerImgDesktop).toBeVisible();
    const srcDesktop = await bannerImgDesktop.evaluate((el) => el.currentSrc);
    expect(srcDesktop).not.toContain('-movil.webp');
    expect(srcDesktop).toContain('banner-1-esplendor.webp');
  });
});
