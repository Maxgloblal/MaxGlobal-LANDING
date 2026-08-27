import { test, expect } from '@playwright/test';

test.describe('SEO, Metatags & Canonical URL (P-07) E2E', () => {
  test('should have canonical link pointing to base URL without params', async ({ page }) => {
    await page.goto('/?ref=MG-00123');

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', 'https://maxglobaloficial.com/');
  });

  test('should have meta description, open graph tags and favicon', async ({ page }) => {
    await page.goto('/');

    // Meta description
    const desc = page.locator('meta[name="description"]');
    await expect(desc).toHaveAttribute('content', /moringa/i);

    // Open Graph
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /Max Global Corporation/i);

    const ogUrl = page.locator('meta[property="og:url"]');
    await expect(ogUrl).toHaveAttribute('content', 'https://maxglobaloficial.com/');

    // Favicon
    const favicon = page.locator('link[rel="icon"]').first();
    await expect(favicon).toHaveAttribute('href', /favicon/);
  });

  test('should update document title dynamically across routes', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Max Global Corporation — Salud, Bienestar y Emprendimiento/);

    await page.goto('/productos');
    await expect(page).toHaveTitle(/Nuestros Productos/);

    await page.goto('/packs-de-afiliacion');
    await expect(page).toHaveTitle(/Packs de Afiliación/);

    await page.goto('/registro');
    await expect(page).toHaveTitle(/Registro de Afiliación/);

    await page.goto('/confirmacion');
    await expect(page).toHaveTitle(/Registro Recibido/);

    await page.goto('/nosotros');
    await expect(page).toHaveTitle(/Sobre Nosotros/);
  });

  test('should set noindex, nofollow on registro and confirmacion routes and index, follow on public routes', async ({ page }) => {
    // Portada: index, follow
    await page.goto('/');
    const robots = page.locator('meta[name="robots"]');
    await expect(robots).toHaveAttribute('content', 'index, follow');

    // Registro: noindex, nofollow
    await page.goto('/registro');
    await expect(robots).toHaveAttribute('content', 'noindex, nofollow');

    // Confirmacion: noindex, nofollow
    await page.goto('/confirmacion');
    await expect(robots).toHaveAttribute('content', 'noindex, nofollow');

    // Productos: index, follow
    await page.goto('/productos');
    await expect(robots).toHaveAttribute('content', 'index, follow');
  });
});
