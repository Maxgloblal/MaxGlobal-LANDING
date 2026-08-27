import { test, expect } from '@playwright/test';

test.describe('Registro and Confirmacion Flow (P-04 & P-05) E2E', () => {
  test('should display registration form with pack preselected and handle form submission', async ({ page }) => {
    await page.goto('/registro?pack=gold&ref=MG-00888');

    // Título y aviso
    await expect(page.locator('h1')).toContainText('Regístrate para afiliarte');
    await expect(page.locator('text=No se cobra nada en este paso.')).toBeVisible();

    // Comprobar que el pack gold está seleccionado y el refCode se llenó
    await expect(page.locator('[data-testid="select-pack"]')).toHaveValue('gold');
    await expect(page.locator('[data-testid="input-patrocinador"]')).toHaveValue('MG-00888');

    // Botón de submit deshabilitado sin consentimiento
    const submitBtn = page.locator('[data-testid="btn-submit-registro"]');
    await expect(submitBtn).toBeDisabled();

    // Completar formulario
    await page.fill('[data-testid="input-nombre"]', 'Lucía Mendoza');
    await page.fill('[data-testid="input-dni"]', '71234567');
    await page.fill('[data-testid="input-telefono"]', '998877665');
    await page.fill('[data-testid="input-email"]', 'lucia@ejemplo.com');
    await page.selectOption('[data-testid="select-departamento"]', 'Arequipa');
    await page.fill('[data-testid="input-provincia"]', 'Arequipa');
    await page.fill('[data-testid="input-direccion"]', 'Calle Mercaderes 450');

    // Aceptar consentimiento
    await page.click('[data-testid="checkbox-consent"]');
    await expect(submitBtn).toBeEnabled();

    // Enviar formulario
    await submitBtn.click();

    // Validar redirección a Confirmación
    await expect(page).toHaveURL(/.*confirmacion/);
    await expect(page.locator('h1')).toContainText('Ya recibimos tus datos');
    await expect(page.locator('text=Registro recibido')).toBeVisible();

    // Validar cuentas bancarias oficiales y RUC
    await expect(page.locator('text=1947426439033')).toBeVisible();
    await expect(page.locator('text=00219400742643903392')).toBeVisible();
    await expect(page.locator('text=0011-0150-0200867749')).toBeVisible();
    await expect(page.locator('text=20615864014').first()).toBeVisible();

    // Validar botón de enviar voucher por WhatsApp
    const voucherBtn = page.locator('[data-testid="btn-enviar-voucher"]');
    await expect(voucherBtn).toBeVisible();
    const href = await voucherBtn.getAttribute('href');
    expect(href).toContain('https://wa.me/51993516053');
  });
});
