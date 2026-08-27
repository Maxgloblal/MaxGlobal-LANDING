import { test, expect } from '@playwright/test';

test.describe('Nosotros Page (P-06) E2E', () => {
  test('should display company information and contact channels', async ({ page }) => {
    await page.goto('/nosotros');

    await expect(page.locator('h1')).toContainText('Max Global Corporation');
    await expect(page.locator('text=Empresa peruana de venta directa').first()).toBeVisible();

    // Bloques
    await expect(page.getByRole('heading', { name: 'Qué hacemos' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Nuestros valores' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Cómo llegar a nosotros' })).toBeVisible();

    // Canales de contacto
    await expect(page.locator('text=contacto@maxglobaloficial.com').first()).toBeVisible();
    await expect(page.locator('text=20615864014').first()).toBeVisible();

    // Botón de WhatsApp
    const waBtn = page.locator('[data-testid="btn-nosotros-whatsapp"]');
    await expect(waBtn).toBeVisible();
    const href = await waBtn.getAttribute('href');
    expect(href).toContain('https://wa.me/51993516053');

    // Botón de Libro de Reclamaciones
    await expect(page.locator('[data-testid="btn-libro-reclamaciones"]')).toBeVisible();
  });
});
