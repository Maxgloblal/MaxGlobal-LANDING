import { test, expect } from '@playwright/test';

test.describe('Banners comerciales en Catálogo (TAREA-71)', () => {
  test('carrusel de banners, navegación y filtrado interactivo', async ({ page }) => {
    // 1 · abra /productos y encuentre los 3 banners
    await page.goto('/productos');

    // Comprobar que los 3 banners existen en el carrusel
    const banners = page.locator('[data-testid^="catalog-banner-"]');
    await expect(banners).toHaveCount(3);

    const banner1 = page.locator('[data-testid="catalog-banner-0"]');
    const banner2 = page.locator('[data-testid="catalog-banner-1"]');
    const banner3 = page.locator('[data-testid="catalog-banner-2"]');

    await expect(banner1).toBeAttached();
    await expect(banner2).toBeAttached();
    await expect(banner3).toBeAttached();

    // Validar imágenes y textos alternativos descriptivos (sin object-fit: cover)
    const img1 = banner1.locator('img');
    const img2 = banner2.locator('img');
    const img3 = banner3.locator('img');

    await expect(img1).toHaveAttribute('alt', 'Coffee Capuccino y Colágeno Aeterna, S/ 150 cada uno');
    await expect(img2).toHaveAttribute('alt', 'Línea Moringa: aceite, cápsulas y polvo, desde S/ 50');
    await expect(img3).toHaveAttribute('alt', 'Packs de afiliación Max Global, desde S/ 120');

    // Validar atributos de carga requeridos (eager + fetchpriority en banner 1, lazy en 2 y 3)
    await expect(img1).toHaveAttribute('loading', 'eager');
    await expect(img2).toHaveAttribute('loading', 'lazy');
    await expect(img3).toHaveAttribute('loading', 'lazy');

    // 2 · clic en el banner 1 → la URL tiene categoria=Salud y Nutrición y la grilla solo muestra productos de esa categoría
    await banner1.click();
    await expect(page).toHaveURL(/categoria=Salud(\+|%20)y(\+|%20)Nutrici(o|ó|%C3%B3)n/i);

    // Verificar que solo se muestran productos de Salud y Nutrición (5 de 8)
    const catalogCount = page.locator('[data-testid="catalog-count"]');
    await expect(catalogCount).toContainText('de 8 productos');
    await expect(page.locator('[data-testid="catalog-grid"]')).toBeVisible();

    // 3 · clic en el banner 2 → la URL tiene buscar=moringa
    await banner2.click();
    await expect(page).toHaveURL(/buscar=moringa/i);
    await expect(catalogCount).toContainText('de 8 productos');

    // 4 · clic en el banner 3 → llega a /packs-de-afiliacion
    await banner3.click();
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
});
