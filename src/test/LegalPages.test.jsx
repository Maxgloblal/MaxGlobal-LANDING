import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import PoliticaPrivacidad from '../pages/PoliticaPrivacidad';
import TerminosCondiciones from '../pages/TerminosCondiciones';
import LibroReclamaciones from '../pages/LibroReclamaciones';
import SiteFooter from '../components/SiteFooter';

describe('Legal Pages and Compliance (Ley 32495, Ley 29571, Ley 29733)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders PoliticaPrivacidad with company data, ARCO rights and legal framework', () => {
    render(
      <MemoryRouter>
        <PoliticaPrivacidad />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /política de privacidad/i })).toBeInTheDocument();
    expect(screen.getAllByText(/20615864014/).length).toBeGreaterThan(0);
    expect(screen.getByText(/Ejercicio de Derechos ARCO/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Ley N° 29733/i).length).toBeGreaterThan(0);
  });

  it('renders TerminosCondiciones with independent distributor clause and 70 pts activation', () => {
    render(
      <MemoryRouter>
        <TerminosCondiciones />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /términos y condiciones/i })).toBeInTheDocument();
    expect(screen.getAllByText(/INDEPENDIENTE/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/70 puntos/i)).toBeInTheDocument();
    expect(screen.getAllByText(/no garantiza ningún nivel fijo de ingresos/i).length).toBeGreaterThan(0);
  });

  it('renders LibroReclamaciones form, handles submission and generates correlative tracking code', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <LibroReclamaciones />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /libro de reclamaciones virtual/i })).toBeInTheDocument();
    expect(screen.getAllByText(/15 días hábiles/i).length).toBeGreaterThan(0);

    // Fill form
    await user.type(screen.getByPlaceholderText('Nombres completos'), 'Juan Pérez');
    await user.type(screen.getByPlaceholderText('Número'), '12345678');
    await user.type(screen.getByPlaceholderText('ejemplo@correo.com'), 'juan@ejemplo.com');
    await user.type(screen.getByPlaceholderText('999 999 999'), '987654321');
    await user.type(screen.getByPlaceholderText('Av./Jr./Calle, N°, Urb.'), 'Av. Larco 123');
    await user.type(screen.getByPlaceholderText('Ej: Lima'), 'Lima');
    await user.type(screen.getByPlaceholderText('Ej: Lima / Miraflores'), 'Lima / Miraflores');
    await user.type(screen.getByPlaceholderText(/Café con Moringa/i), 'Café con Moringa');
    await user.type(screen.getByPlaceholderText(/Describe claramente los hechos/i), 'Detalle del reclamo sobre entrega');
    await user.type(screen.getByPlaceholderText(/¿Cuál es la solución que solicitas/i), 'Entrega inmediata del producto');

    // Check confirmation checkbox
    const checkbox = screen.getByLabelText(/Declaro que los datos consignados/i);
    await user.click(checkbox);

    // Submit
    const submitBtn = screen.getByTestId('btn-submit-lr');
    await user.click(submitBtn);

    // Should display confirmation view with LR code
    expect(screen.getByTestId('lr-confirmation-code')).toBeInTheDocument();
    expect(screen.getByText(/LR-2026-/)).toBeInTheDocument();
    expect(screen.getByText(/Constancia de Recepción Oficial/i)).toBeInTheDocument();
  });

  it('SiteFooter renders real links to the 3 legal pages', () => {
    render(
      <MemoryRouter>
        <SiteFooter />
      </MemoryRouter>
    );

    expect(screen.getByTestId('footer-link-terminos')).toHaveAttribute('href', '/terminos-y-condiciones');
    expect(screen.getByTestId('footer-link-privacidad')).toHaveAttribute('href', '/politica-de-privacidad');
    expect(screen.getByTestId('footer-link-libro')).toHaveAttribute('href', '/libro-de-reclamaciones');
  });
});
