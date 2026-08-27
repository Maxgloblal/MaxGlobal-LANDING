import { test, expect } from '@playwright/test';

test.describe('Packs Page (P-03) E2E', () => {
  test('should display all 5 packs with correct prices and features', async ({ page }) => {
    await page.goto('/packs-de-afiliacion');

    // Título principal
    await expect(page.locator('h1')).toContainText('Elige cómo quieres empezar');

    // Packs
    await expect(page.getByRole('heading', { name: 'Kit Emprendedor' })).toBeVisible();
    await expect(page.getByText('S/. 120').first()).toBeVisible();

    await expect(page.getByRole('heading', { name: 'Pack Ejecutivo' })).toBeVisible();
    await expect(page.getByText('S/. 360').first()).toBeVisible();

    await expect(page.getByRole('heading', { name: 'Pack Gold' })).toBeVisible();
    await expect(page.getByText('S/. 1,200').first()).toBeVisible();
    await expect(page.getByText('El más elegido').first()).toBeVisible();

    await expect(page.getByRole('heading', { name: 'Pack Familiar' })).toBeVisible();
    await expect(page.getByText('S/. 4,000').first()).toBeVisible();

    await expect(page.getByRole('heading', { name: 'Pack Empresarial' })).toBeVisible();
    await expect(page.getByText('S/. 8,000').first()).toBeVisible();
  });

  test('clicking pack CTA navigates to registro with selected pack parameter', async ({ page }) => {
    await page.goto('/packs-de-afiliacion');

    await page.click('[data-testid="btn-select-pack-gold"]');
    await expect(page).toHaveURL(/.*registro\?pack=gold/);
    await expect(page.locator('h1')).toContainText('Regístrate para afiliarte');
  });

  test('displays comparison table and compensation plan', async ({ page }) => {
    await page.goto('/packs-de-afiliacion');

    // Tabla comparativa
    await expect(page.locator('text=Los cinco packs, lado a lado')).toBeVisible();
    await expect(page.locator('table')).toBeVisible();

    // Plan de compensación
    await expect(page.locator('text=Bono de patrocinio')).toBeVisible();
    await expect(page.locator('text=Bono residual').first()).toBeVisible();
    await expect(page.locator('text=puntos personales al mes')).toBeVisible();
    await expect(page.locator('text=10%').first()).toBeVisible();

    // CTA de dudas por WhatsApp
    await expect(page.locator('[data-testid="btn-packs-whatsapp-dudas"]')).toBeVisible();
  });
});
