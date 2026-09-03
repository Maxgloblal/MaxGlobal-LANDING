import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Confirmacion from '../pages/Confirmacion';
import { EMPRESA } from '../config';

describe('Confirmacion Page (P-05)', () => {
  it('renders confirmation header and green badge', () => {
    render(
      <MemoryRouter>
        <Confirmacion />
      </MemoryRouter>
    );

    expect(screen.getByText('Registro recibido')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /ya recibimos tus datos/i })).toBeInTheDocument();
  });

  it('renders official BCP and BBVA accounts and RUC', () => {
    render(
      <MemoryRouter>
        <Confirmacion />
      </MemoryRouter>
    );

    for (const c of EMPRESA.cuentasBancarias) {
      expect(screen.getByText(c.banco)).toBeInTheDocument();
      expect(screen.getByText(c.cuenta)).toBeInTheDocument();
      expect(screen.getByText(c.cci)).toBeInTheDocument();
    }
    expect(screen.getAllByText(EMPRESA.razonSocial).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(EMPRESA.ruc)).toBeInTheDocument();
  });

  it('renders the 4 next steps', () => {
    render(
      <MemoryRouter>
        <Confirmacion />
      </MemoryRouter>
    );

    expect(screen.getByText('Confirmamos tu pago')).toBeInTheDocument();
    expect(screen.getByText('Preparamos y despachamos tu pedido')).toBeInTheDocument();
    expect(screen.getByText('Te mandamos el número de guía de transporte')).toBeInTheDocument();
    expect(screen.getByText('Recibes tus accesos oficiales al sistema')).toBeInTheDocument();
  });
});
