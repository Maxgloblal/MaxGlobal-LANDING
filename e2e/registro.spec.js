import { test, expect } from '@playwright/test';
import { EMPRESA } from '../src/config.js';

test.describe('Registro and Confirmacion Flow (P-04 & P-05) E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Interceptar la llamada a Supabase Edge Function para tests consistentes y rapidos
    await page.route('**/functions/v1/registro-afiliacion', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true, mensaje: 'Solicitud recibida' }),
      });
    });
  });

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

    // Validar cuentas bancarias oficiales y RUC contra la fuente única
    for (const c of EMPRESA.cuentasBancarias) {
      await expect(page.locator(`text=${c.cuenta}`)).toBeVisible();
      await expect(page.locator(`text=${c.cci}`)).toBeVisible();
    }
    await expect(page.locator(`text=${EMPRESA.ruc}`).first()).toBeVisible();

    // Validar botón de enviar voucher por WhatsApp
    const voucherBtn = page.locator('[data-testid="btn-enviar-voucher"]');
    await expect(voucherBtn).toBeVisible();
    const href = await voucherBtn.getAttribute('href');
    expect(href).toContain(`https://wa.me/${EMPRESA.whatsapp}`);
  });

  test('should preserve referral code across page navigation and click Afíliate in header', async ({ page, isMobile }) => {
    // 1. Entrar por portada con referido
    await page.goto('/?ref=MG00012');

    // 2. Comprobar que el header muestra la recomendación (en desktop)
    if (!isMobile) {
      const headRef = page.locator('[data-testid="head-ref"]');
      await expect(headRef).toContainText('Te recomendó: MG00012');
    }

    // 3. El botón Afíliate existe en el header y es visible tanto en desktop como en móvil
    const afiliateBtn = page.locator('[data-testid="head-registro"]');
    await expect(afiliateBtn).toBeVisible();

    // 4. Navegar a /productos (sin ?ref= en la URL)
    if (isMobile) {
      await page.click('[data-testid="nav-burger"]');
      await page.click('[data-testid="mobile-nav-productos"]');
    } else {
      await page.click('[data-testid="nav-productos"]');
    }
    await expect(page).toHaveURL(/.*productos/);

    // 5. Hacer clic en Afíliate en el header (visible directamente sin abrir menú hamburguesa)
    await afiliateBtn.click();
    await expect(page).toHaveURL(/.*registro/);

    // 6. El campo de patrocinador mantiene MG00012
    const sponsorInput = page.locator('[data-testid="input-patrocinador"]');
    await expect(sponsorInput).toHaveValue('MG00012');
  });
});
