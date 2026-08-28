import { test, expect } from '@playwright/test';
import { PRODUCTOS } from '../src/config.js';

test.describe('Productos Page (P-02) E2E', () => {
  test('should display all products from config with prices and points', async ({ page }) => {
    await page.goto('/productos');

    // Encabezado
    await expect(page.locator('h1')).toContainText('Nuestros productos');
    await expect(page.locator('text=Como socio, los compras con 50% de descuento.')).toBeVisible();

    // Productos
    for (const prod of PRODUCTOS) {
      await expect(page.getByRole('heading', { name: prod.nombre })).toBeVisible();
      await expect(page.locator(`text=S/. ${prod.precioPublico}`).first()).toBeVisible();
      await expect(page.locator(`text=${prod.puntos} pts`).first()).toBeVisible();
    }
  });

  test('should filter products by search term without accents and persist in URL', async ({ page }) => {
    await page.goto('/productos');

    const searchInput = page.locator('[data-testid="input-buscar-productos"]');
    await searchInput.fill('colageno');

    await expect(page).toHaveURL(/.*buscar=colageno/);
    await expect(page.getByRole('heading', { name: /colágeno aeterna/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /coffee capuccino/i })).not.toBeVisible();

    // Reload preserving search
    await page.reload();
    await expect(searchInput).toHaveValue('colageno');
    await expect(page.getByRole('heading', { name: /colágeno aeterna/i })).toBeVisible();
  });

  test('should filter products by category chip and allow resetting', async ({ page }) => {
    await page.goto('/productos');

    // Click Salud y Nutrición chip
    const saludChip = page.locator('[data-testid="chip-cat-salud-y-nutrición"]');
    await expect(saludChip).toBeVisible();
    await saludChip.click();

    await expect(page).toHaveURL(/.*categoria=Salud\+y\+Nutrici%C3%B3n/);
    await expect(page.locator('[data-testid="catalog-count"]')).toContainText('5 de 8 productos');

    // Reset filters
    await page.click('[data-testid="btn-reset-filtros"]');
    await expect(page.locator('[data-testid="catalog-count"]')).toHaveText('8 productos');
  });

  test('should show empty state and reset button when search has no matches', async ({ page }) => {
    await page.goto('/productos');

    const searchInput = page.locator('[data-testid="input-buscar-productos"]');
    await searchInput.fill('termino-inexistente-12345');

    await expect(page.locator('[data-testid="catalog-empty-state"]')).toBeVisible();
    await expect(page.locator('text=No encontramos productos')).toBeVisible();

    await page.click('[data-testid="btn-empty-clear"]');
    await expect(page.locator('[data-testid="catalog-empty-state"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="catalog-count"]')).toHaveText('8 productos');
  });

  test('clicking product image or name navigates to /productos/:id', async ({ page }) => {
    await page.goto('/productos');

    const firstProd = PRODUCTOS[0];
    const productLink = page.locator(`a[href="/productos/${firstProd.id}"]`).first();
    await expect(productLink).toBeVisible();
    await productLink.click();

    await expect(page).toHaveURL(new RegExp(`/productos/${firstProd.id}`));
    await expect(page.locator('[data-testid="detail-product-name"]')).toHaveText(firstProd.nombre);
  });

  test('clicking Agregar button adds product to cart and opens drawer without navigating', async ({ page }) => {
    await page.goto('/productos?ref=MG-00417');

    const firstProd = PRODUCTOS[0];
    const addBtn = page.locator(`[data-testid="btn-add-to-cart-${firstProd.id}"]`);
    await expect(addBtn).toBeVisible();
    await addBtn.click();

    // Still on /productos
    await expect(page).toHaveURL(/.*productos/);
    await expect(page.locator('[data-testid="cart-drawer"]')).toBeVisible();
    await expect(page.locator(`[data-testid="cart-item-${firstProd.id}"]`)).toBeVisible();
  });

  test('clicking CTA in bottom banner navigates to packs page', async ({ page }) => {
    await page.goto('/productos');

    await expect(page.locator('text=Los socios pagan la mitad')).toBeVisible();
    await page.click('[data-testid="btn-productos-ver-packs"]');

    await expect(page).toHaveURL(/.*packs-de-afiliacion/);
    await expect(page.locator('h1')).toContainText('Elige cómo quieres empezar');
  });
});
