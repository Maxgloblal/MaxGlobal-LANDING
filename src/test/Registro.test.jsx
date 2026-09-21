import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Registro from '../pages/Registro';
import Confirmacion from '../pages/Confirmacion';
import App from '../App';

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

  it('4 · entrando por /registro?ref=MG00012, el formulario manda MG00012', async () => {
    render(
      <MemoryRouter initialEntries={['/registro?ref=MG00012']}>
        <Routes>
          <Route path="/registro" element={<Registro />} />
          <Route path="/confirmacion" element={<Confirmacion />} />
        </Routes>
      </MemoryRouter>
    );

    const user = userEvent.setup();
    const inputPatrocinador = screen.getByTestId('input-patrocinador');
    expect(inputPatrocinador).toHaveValue('MG00012');
    expect(inputPatrocinador).toHaveAttribute('readonly');
    expect(inputPatrocinador).not.toBeDisabled();
    expect(screen.getByTestId('mensaje-patrocinador-bloqueado')).toHaveTextContent('Te invitó el socio MG00012');

    await user.type(screen.getByTestId('input-nombre'), 'Pedro Gomez');
    await user.type(screen.getByTestId('input-dni'), '12345678');
    await user.type(screen.getByTestId('input-telefono'), '987123456');
    await user.type(screen.getByTestId('input-email'), 'pedro@ejemplo.com');
    await user.type(screen.getByTestId('input-provincia'), 'Cusco');
    await user.type(screen.getByTestId('input-direccion'), 'Av. Sol 100');
    await user.click(screen.getByTestId('checkbox-consent'));
    await user.click(screen.getByTestId('btn-submit-registro'));

    expect(globalThis.fetch).toHaveBeenCalled();
    const body = JSON.parse(globalThis.fetch.mock.calls[0][1].body);
    expect(body.ref_codigo).toBe('MG00012');
  });

  it('5 · entrando por /?ref=MG00012, navegando a /productos y de ahi a /registro, el formulario SIGUE mandando MG00012', async () => {
    window.history.pushState({}, '', '/?ref=MG00012');
    render(<App />);

    const user = userEvent.setup();

    // Navegar a /productos
    const productosLink = screen.getByTestId('nav-productos');
    await user.click(productosLink);

    // Navegar a /registro mediante boton Afíliate del header
    const afiliateBtn = screen.getByTestId('head-registro');
    await user.click(afiliateBtn);

    // Comprobar que el patrocinador sigue siendo MG00012
    const patrocinadorInput = screen.getByTestId('input-patrocinador');
    expect(patrocinadorInput).toHaveValue('MG00012');

    // Llenar campos requeridos y enviar
    await user.type(screen.getByTestId('input-nombre'), 'Elena Ramos');
    await user.type(screen.getByTestId('input-dni'), '44332211');
    await user.type(screen.getByTestId('input-telefono'), '912345678');
    await user.type(screen.getByTestId('input-email'), 'elena@ejemplo.com');
    await user.type(screen.getByTestId('input-provincia'), 'Arequipa');
    await user.type(screen.getByTestId('input-direccion'), 'Calle Luna 456');
    await user.click(screen.getByTestId('checkbox-consent'));
    await user.click(screen.getByTestId('btn-submit-registro'));

    // Verificar que fetch se llamo con ref_codigo: 'MG00012'
    expect(globalThis.fetch).toHaveBeenCalled();
    const body = JSON.parse(globalThis.fetch.mock.calls[0][1].body);
    expect(body.ref_codigo).toBe('MG00012');
  });

  it('6 · un ?ref= nuevo reemplaza al guardado', () => {
    sessionStorage.setItem('mg_ref', 'MG00012');

    render(
      <MemoryRouter initialEntries={['/registro?ref=MG99999']}>
        <Routes>
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('input-patrocinador')).toHaveValue('MG99999');
    expect(sessionStorage.getItem('mg_ref')).toBe('MG99999');
  });

  it('7 · sin ningun ?ref=, el formulario manda vacio y el registro queda como directo de empresa', async () => {
    render(
      <MemoryRouter initialEntries={['/registro']}>
        <Routes>
          <Route path="/registro" element={<Registro />} />
          <Route path="/confirmacion" element={<Confirmacion />} />
        </Routes>
      </MemoryRouter>
    );

    const user = userEvent.setup();
    const inputPatrocinador = screen.getByTestId('input-patrocinador');
    expect(inputPatrocinador).toHaveValue('');
    expect(inputPatrocinador).not.toHaveAttribute('readonly');
    expect(inputPatrocinador).not.toBeDisabled();
    expect(screen.queryByTestId('mensaje-patrocinador-bloqueado')).not.toBeInTheDocument();

    // Puede escribir un código manualmente
    await user.type(inputPatrocinador, 'MG-MANUAL');
    expect(inputPatrocinador).toHaveValue('MG-MANUAL');
    await user.clear(inputPatrocinador);

    await user.type(screen.getByTestId('input-nombre'), 'Ana Torres');
    await user.type(screen.getByTestId('input-dni'), '87654321');
    await user.type(screen.getByTestId('input-telefono'), '955443322');
    await user.type(screen.getByTestId('input-email'), 'ana@ejemplo.com');
    await user.type(screen.getByTestId('input-provincia'), 'Lima');
    await user.type(screen.getByTestId('input-direccion'), 'Jr. Union 200');
    await user.click(screen.getByTestId('checkbox-consent'));
    await user.click(screen.getByTestId('btn-submit-registro'));

    expect(globalThis.fetch).toHaveBeenCalled();
    const body = JSON.parse(globalThis.fetch.mock.calls[0][1].body);
    expect(body.ref_codigo).toBeNull();
  });

  it('8 · el ref se guarda en sessionStorage y NO sobrevive en localStorage', () => {
    render(
      <MemoryRouter initialEntries={['/registro?ref=MG00012']}>
        <Routes>
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </MemoryRouter>
    );

    expect(sessionStorage.getItem('mg_ref')).toBe('MG00012');
    expect(localStorage.getItem('mg_ref')).toBeNull();
  });
});
