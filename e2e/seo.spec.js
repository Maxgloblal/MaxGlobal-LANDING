import { test, expect } from '@playwright/test';
import { PRODUCTOS } from '../src/config.js';

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

  test('should update document title dynamically across routes including product details', async ({ page }) => {
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

    // Product detail route
    const firstProd = PRODUCTOS[0];
    await page.goto(`/productos/${firstProd.id}`);
    await expect(page).toHaveTitle(new RegExp(firstProd.nombre));
  });

  test('should set unique SEO metadata, canonical and Product JSON-LD schema on product pages', async ({ page }) => {
    const prod = PRODUCTOS[0];
    await page.goto(`/productos/${prod.id}?ref=MG-00417`);

    // Title
    await expect(page).toHaveTitle(`${prod.nombre} | Max Global Corporation`);

    // Canonical without query params
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', `https://maxglobaloficial.com/productos/${prod.id}`);

    // Meta description
    const desc = page.locator('meta[name="description"]');
    const descContent = await desc.getAttribute('content');
    expect(descContent).toContain(`S/. ${prod.precioPublico}`);

    // Schema.org Product JSON-LD
    const jsonLdContent = await page.locator('#schema-product').textContent();
    expect(jsonLdContent).not.toBeNull();
    const schema = JSON.parse(jsonLdContent);
    expect(schema['@type']).toBe('Product');
    expect(schema.name).toBe(prod.nombre);
    expect(schema.offers.price).toBe(`${prod.precioPublico}.00`);
    expect(schema.offers.priceCurrency).toBe('PEN');
    expect(schema.offers.availability).toBe('https://schema.org/InStock');
    expect(schema.aggregateRating).toBeUndefined();
    expect(schema.review).toBeUndefined();
    expect(schema.priceValidUntil).toBeUndefined();
  });

  test('should set noindex, nofollow on registro, confirmacion and libro-de-reclamaciones routes and index, follow on public routes', async ({ page }) => {
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

    // Libro de Reclamaciones: noindex, nofollow
    await page.goto('/libro-de-reclamaciones');
    await expect(robots).toHaveAttribute('content', 'noindex, nofollow');

    // Términos y Condiciones: index, follow
    await page.goto('/terminos-y-condiciones');
    await expect(robots).toHaveAttribute('content', 'index, follow');

    // Productos: index, follow
    await page.goto('/productos');
    await expect(robots).toHaveAttribute('content', 'index, follow');

    // Detalle de producto: index, follow
    await page.goto(`/productos/${PRODUCTOS[0].id}`);
    await expect(robots).toHaveAttribute('content', 'index, follow');
  });
});
