import { test, expect } from '@playwright/test';

test.describe('Landing Site Navigation and Layout', () => {
  test('should load portada with header, footer and tokens', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('img[alt="Max Global"]').first()).toBeVisible();
    await expect(page.locator('h1')).toContainText('Un negocio propio');
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('[aria-label="Contactar por WhatsApp"]')).toBeVisible();
  });

  test('should navigate across pages correctly', async ({ page, isMobile }) => {
    await page.goto('/');

    if (isMobile) {
      // Navegación en móvil mediante menú hamburguesa
      await page.click('[data-testid="nav-burger"]');
      await page.click('[data-testid="mobile-nav-productos"]');
      await expect(page).toHaveURL(/.*productos/);
      await expect(page.locator('h1')).toContainText(/nuestros productos/i);

      await page.click('[data-testid="nav-burger"]');
      await page.click('[data-testid="mobile-nav-packs"]');
      await expect(page).toHaveURL(/.*packs-de-afiliacion/);
      await expect(page.locator('h1')).toContainText(/elige cómo quieres empezar/i);

      await page.click('[data-testid="nav-burger"]');
      await page.click('[data-testid="mobile-nav-nosotros"]');
      await expect(page).toHaveURL(/.*nosotros/);
      await expect(page.locator('h1')).toContainText(/max global corporation/i);
    } else {
      // Navegación en escritorio mediante barra superior
      await page.click('[data-testid="nav-productos"]');
      await expect(page).toHaveURL(/.*productos/);
      await expect(page.locator('h1')).toContainText(/nuestros productos/i);

      await page.click('[data-testid="nav-packs"]');
      await expect(page).toHaveURL(/.*packs-de-afiliacion/);
      await expect(page.locator('h1')).toContainText(/elige cómo quieres empezar/i);

      await page.click('[data-testid="nav-nosotros"]');
      await expect(page).toHaveURL(/.*nosotros/);
      await expect(page.locator('h1')).toContainText(/max global corporation/i);
    }
  });

  test('should capture and preserve ?ref= in sessionStorage', async ({ page }) => {
    await page.goto('/?ref=MG-00417');

    const storedRef = await page.evaluate(() => sessionStorage.getItem('mg_ref'));
    expect(storedRef).toBe('MG-00417');
  });

  test('should display 404 page for unknown URLs with noindex and navigation back', async ({ page }) => {
    await page.goto('/url-fantasma-no-existe');
    await expect(page.locator('text=404')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Esta página no existe');

    const robots = page.locator('meta[name="robots"]');
    await expect(robots).toHaveAttribute('content', 'noindex, nofollow');

    // Click Ir al inicio
    await page.click('[data-testid="btn-404-home"]');
    await expect(page).toHaveURL(/\/$/);
  });
});
