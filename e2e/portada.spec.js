import { test, expect } from '@playwright/test';

test.describe('Portada Page (P-01 v2) E2E', () => {
  test('should display full hero section and stats', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('h1')).toContainText('Un negocio propio');
    await expect(page.locator('text=con productos que la gente vuelve a comprar')).toBeVisible();

    // Estadísticas flotantes
    await expect(page.locator('text=8').first()).toBeVisible();
    await expect(page.locator('text=50%').first()).toBeVisible();
    await expect(page.locator('text=10').first()).toBeVisible();
    await expect(page.locator('text=descuento de socio').first()).toBeVisible();
  });

  test('should display trust bar and 3 steps to start', async ({ page }) => {
    await page.goto('/');

    // Barra de confianza
    await expect(page.locator('text=Productos 100% naturales')).toBeVisible();
    await expect(page.locator('text=Envíos a todo el Perú')).toBeVisible();

    // 3 Pasos
    await expect(page.locator('text=Empezar toma tres pasos')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Eliges tu pack' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Recibes tu producto' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Empiezas a construir' })).toBeVisible();
  });

  test('should display product carousel and compensation preview', async ({ page }) => {
    await page.goto('/');

    // Carrusel de productos
    await expect(page.locator('text=Los productos').first()).toBeVisible();
    await expect(page.locator('text=Ver el catálogo completo')).toBeVisible();

    // Las cuatro formas de ganar
    await expect(page.locator('text=Las cuatro formas de ganar')).toBeVisible();
    await expect(page.locator('text=Patrocinio').first()).toBeVisible();
    await expect(page.locator('text=Residual').first()).toBeVisible();
    await expect(page.locator('text=Rango').first()).toBeVisible();
    await expect(page.locator('text=Global').first()).toBeVisible();

    // Banner de cierre
    await expect(page.getByRole('heading', { name: 'Empieza hoy' })).toBeVisible();
  });

  test('clicking hero CTAs navigates to packs or opens whatsapp', async ({ page }) => {
    await page.goto('/');

    await page.click('[data-testid="hero-btn-packs"]');
    await expect(page).toHaveURL(/.*packs-de-afiliacion/);
    await expect(page.locator('h1')).toContainText('Elige cómo quieres empezar');
  });
});
