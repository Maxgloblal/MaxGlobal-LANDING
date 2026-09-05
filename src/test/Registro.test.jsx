import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Registro from '../pages/Registro';
import Confirmacion from '../pages/Confirmacion';

describe('Registro Page (P-04)', () => {
  beforeEach(() => {
    sessionStorage.clear();
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true })
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders all form fields with labels', () => {
    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /regístrate para afiliarte/i })).toBeInTheDocument();
    expect(screen.getByTestId('input-nombre')).toBeInTheDocument();
    expect(screen.getByTestId('input-dni')).toBeInTheDocument();
    expect(screen.getByTestId('input-telefono')).toBeInTheDocument();
    expect(screen.getByTestId('input-email')).toBeInTheDocument();
    expect(screen.getByTestId('select-departamento')).toBeInTheDocument();
    expect(screen.getByTestId('input-provincia')).toBeInTheDocument();
    expect(screen.getByTestId('input-direccion')).toBeInTheDocument();
    expect(screen.getByTestId('select-pack')).toBeInTheDocument();
    expect(screen.getByTestId('input-patrocinador')).toBeInTheDocument();
  });

  it('disables submit button until consent checkbox is checked', async () => {
    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

    const user = userEvent.setup();
    const submitBtn = screen.getByTestId('btn-submit-registro');
    const consentCb = screen.getByTestId('checkbox-consent');

    expect(submitBtn).toBeDisabled();
    expect(screen.getByText(/marca la primera casilla para poder enviar/i)).toBeInTheDocument();

    await user.click(consentCb);
    expect(submitBtn).not.toBeDisabled();
  });

  it('submits form, saves data in sessionStorage and navigates to confirmacion', async () => {
    sessionStorage.setItem('mg_ref', 'MG-00999');

    render(
      <MemoryRouter initialEntries={['/registro?pack=gold']}>
        <Routes>
          <Route path="/registro" element={<Registro />} />
          <Route path="/confirmacion" element={<Confirmacion />} />
        </Routes>
      </MemoryRouter>
    );

    const user = userEvent.setup();

    // Llenar campos requeridos
    await user.type(screen.getByTestId('input-nombre'), 'Carlos Valdivia');
    await user.type(screen.getByTestId('input-dni'), '45892134');
    await user.type(screen.getByTestId('input-telefono'), '987654321');
    await user.type(screen.getByTestId('input-email'), 'carlos@ejemplo.com');
    await user.type(screen.getByTestId('input-provincia'), 'Trujillo');
    await user.type(screen.getByTestId('input-direccion'), 'Av. España 123');

    // Aceptar consentimiento
    await user.click(screen.getByTestId('checkbox-consent'));

    // Enviar
    await user.click(screen.getByTestId('btn-submit-registro'));

    // Verificar redirección asíncrona tras respuesta de la Edge Function
    expect(await screen.findByRole('heading', { name: /ya recibimos tus datos/i })).toBeInTheDocument();

    // Verificar datos en sessionStorage
    const stored = JSON.parse(sessionStorage.getItem('mg_registro') || '{}');
    expect(stored.nombre).toBe('Carlos Valdivia');
    expect(stored.dni).toBe('45892134');
    expect(stored.patrocinador).toBe('MG-00999');
  });
});
