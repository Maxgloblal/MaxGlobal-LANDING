import { test, expect } from '@playwright/test';

test.describe('Productos Page (P-02) E2E', () => {
  test('should display all 8 products with prices and points', async ({ page }) => {
    await page.goto('/productos');

    // Encabezado
    await expect(page.locator('h1')).toContainText('Nuestros productos');
    await expect(page.locator('text=Como socio, los compras con 50% de descuento.')).toBeVisible();

    // Productos
    await expect(page.getByRole('heading', { name: 'Café con Moringa' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Colágeno Hidrolizado' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Aceite de Moringa' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Esplendor' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Aceite de Orégano' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Cápsulas de Moringa' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Harina de Moringa' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Perfume Dalba' })).toBeVisible();

    // Puntos
    await expect(page.locator('text=18 pts').first()).toBeVisible();
    await expect(page.locator('text=14 pts').first()).toBeVisible();
    await expect(page.locator('text=8 pts').first()).toBeVisible();
    await expect(page.locator('text=6 pts')).toBeVisible();
    await expect(page.locator('text=10 pts')).toBeVisible();
  });

  test('clicking Agregar button adds product to cart and opens drawer', async ({ page }) => {
    await page.goto('/productos?ref=MG-00417');

    const cafeBtn = page.locator('[data-testid="btn-add-to-cart-cafe-moringa"]');
    await expect(cafeBtn).toBeVisible();
    await cafeBtn.click();

    await expect(page.locator('[data-testid="cart-drawer"]')).toBeVisible();
    await expect(page.locator('[data-testid="cart-item-cafe-moringa"]')).toBeVisible();
  });

  test('clicking CTA in bottom banner navigates to packs page', async ({ page }) => {
    await page.goto('/productos');

    await expect(page.locator('text=Los socios pagan la mitad')).toBeVisible();
    await page.click('[data-testid="btn-productos-ver-packs"]');

    await expect(page).toHaveURL(/.*packs-de-afiliacion/);
    await expect(page.locator('h1')).toContainText('Elige cómo quieres empezar');
  });
});
