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

  test('clicking Agregar button adds product to cart and opens drawer', async ({ page }) => {
    await page.goto('/productos?ref=MG-00417');

    const firstProd = PRODUCTOS[0];
    const addBtn = page.locator(`[data-testid="btn-add-to-cart-${firstProd.id}"]`);
    await expect(addBtn).toBeVisible();
    await addBtn.click();

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
