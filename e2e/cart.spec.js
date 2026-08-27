import { test, expect } from '@playwright/test';

test.describe('Shopping Cart & WhatsApp Flow (P-02 / Bloque B & C) E2E', () => {
  test('should add products to cart, update quantities, persist across pages and generate WhatsApp order', async ({ page }) => {
    // Navigate with referral code
    await page.goto('/productos?ref=MG-00417');

    // 1. Agregar Café con Moringa
    const addCafe = page.locator('[data-testid="btn-add-to-cart-cafe-moringa"]');
    await expect(addCafe).toBeVisible();
    await addCafe.click();

    // Drawer should open
    const drawer = page.locator('[data-testid="cart-drawer"]');
    await expect(drawer).toBeVisible();
    await expect(page.locator('[data-testid="cart-item-cafe-moringa"]')).toBeVisible();
    await expect(page.locator('[data-testid="cart-item-qty-cafe-moringa"]')).toHaveText('1');

    // 2. Incrementar cantidad en el drawer
    await page.locator('[data-testid="cart-btn-plus-cafe-moringa"]').click();
    await expect(page.locator('[data-testid="cart-item-qty-cafe-moringa"]')).toHaveText('2');
    await expect(page.locator('[data-testid="cart-total-publico"]')).toContainText('S/. 300');
    await expect(page.locator('[data-testid="cart-total-puntos"]')).toContainText('36 pts');

    // Cerrar drawer
    await page.locator('[data-testid="btn-close-cart"]').click();
    await expect(drawer).not.toBeVisible();

    // 3. Agregar Colágeno desde el catálogo
    await page.locator('[data-testid="btn-add-to-cart-colageno-hidrolizado"]').click();
    await expect(drawer).toBeVisible();
    await expect(page.locator('[data-testid="cart-item-colageno-hidrolizado"]')).toBeVisible();
    await expect(page.locator('[data-testid="cart-total-publico"]')).toContainText('S/. 450');
    await expect(page.locator('[data-testid="cart-total-puntos"]')).toContainText('54 pts');

    // Cerrar drawer y navegar a otra página para comprobar persistencia en sessionStorage
    await page.locator('[data-testid="btn-close-cart"]').click();
    await page.goto('/packs-de-afiliacion');

    // El badge del CartFab debe mostrar 3 items
    const badge = page.locator('[data-testid="cart-fab-badge"]');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveText('3');

    // Abrir drawer desde CartFab
    await page.locator('[data-testid="btn-cart-fab"]').click();
    await expect(drawer).toBeVisible();

    // Verificar código de socio precargado
    const refInput = page.locator('[data-testid="input-cart-ref-code"]');
    await expect(refInput).toHaveValue('MG-00417');

    // Verificar aviso de precios visible
    await expect(
      page.locator('text=Los precios mostrados son de venta al público')
    ).toBeVisible();

    // 4. Verificar URL del botón de WhatsApp
    const waBtn = page.locator('[data-testid="btn-cart-whatsapp"]');
    const href = await waBtn.getAttribute('href');
    expect(href).toContain('https://wa.me/');
    const decodedHref = decodeURIComponent(href);
    expect(decodedHref).toContain('2× Café con Moringa');
    expect(decodedHref).toContain('1× Colágeno Hidrolizado');
    expect(decodedHref).toContain('Total a precio público: S/. 450');
    expect(decodedHref).toContain('Puntos: 54');
    expect(decodedHref).toContain('Mi código de socio: MG-00417');
  });
});
