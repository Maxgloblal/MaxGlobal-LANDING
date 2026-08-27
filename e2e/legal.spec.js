import { test, expect } from '@playwright/test';

test.describe('Legal Pages, Compliance & Libro de Reclamaciones E2E', () => {
  test('should navigate to Terminos y Condiciones and display all legal clauses', async ({ page }) => {
    await page.goto('/terminos-y-condiciones');
    await expect(page.locator('h1')).toContainText('Términos y Condiciones');
    await expect(page.locator('text=Distribuidor INDEPENDIENTE').first()).toBeVisible();
    await expect(page.locator('text=70 puntos').first()).toBeVisible();
  });

  test('should navigate to Politica de Privacidad and display ARCO rights and company details', async ({ page }) => {
    await page.goto('/politica-de-privacidad');
    await expect(page.locator('h1')).toContainText('Política de Privacidad');
    await expect(page.locator('text=20615864014').first()).toBeVisible();
    await expect(page.locator('text=Ejercicio de Derechos ARCO')).toBeVisible();
  });

  test('should submit a claim in Libro de Reclamaciones and display official confirmation code', async ({ page }) => {
    await page.goto('/libro-de-reclamaciones');
    await expect(page.locator('h1')).toContainText('Libro de Reclamaciones Virtual');

    // Fill form
    await page.fill('input[name="nombres"]', 'Carlos Mendoza');
    await page.fill('input[name="numeroDoc"]', '87654321');
    await page.fill('input[name="email"]', 'carlos@ejemplo.com');
    await page.fill('input[name="telefono"]', '912345678');
    await page.fill('input[name="domicilio"]', 'Av. Javier Prado Este 450');
    await page.fill('input[name="departamento"]', 'Lima');
    await page.fill('input[name="provincia"]', 'Lima / San Isidro');
    await page.fill('input[name="descripcionBien"]', 'Café con Moringa - Caja 30 sobres');
    await page.fill('textarea[name="detalle"]', 'Producto no entregado en el plazo acordado');
    await page.fill('textarea[name="pedido"]', 'Reenvío prioritario del pedido');

    // Check declaration
    await page.check('input[name="declaracion"]');

    // Submit
    await page.click('[data-testid="btn-submit-lr"]');

    // Verification
    const code = page.locator('[data-testid="lr-confirmation-code"]');
    await expect(code).toBeVisible();
    await expect(code).toContainText('LR-2026-');

    await expect(page.locator('text=Constancia de Recepción Oficial')).toBeVisible();
    await expect(page.locator('text=15 días hábiles')).toBeVisible();

    // Check action buttons
    await expect(page.locator('[data-testid="btn-lr-email-copy"]')).toBeVisible();
    await expect(page.locator('[data-testid="btn-lr-whatsapp"]')).toBeVisible();
  });

  test('footer links navigate correctly to all 3 legal pages', async ({ page }) => {
    await page.goto('/');

    await page.click('[data-testid="footer-link-terminos"]');
    await expect(page).toHaveURL(/.*terminos-y-condiciones/);

    await page.click('[data-testid="footer-link-privacidad"]');
    await expect(page).toHaveURL(/.*politica-de-privacidad/);

    await page.click('[data-testid="footer-link-libro"]');
    await expect(page).toHaveURL(/.*libro-de-reclamaciones/);
  });
});
