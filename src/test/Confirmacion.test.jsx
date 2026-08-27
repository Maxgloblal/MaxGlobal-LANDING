import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Confirmacion from '../pages/Confirmacion';

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

    expect(screen.getByText('BCP Soles')).toBeInTheDocument();
    expect(screen.getByText('1947426439033')).toBeInTheDocument();
    expect(screen.getByText('00219400742643903392')).toBeInTheDocument();
    expect(screen.getByText('BBVA Soles')).toBeInTheDocument();
    expect(screen.getByText('0011-0150-0200867749')).toBeInTheDocument();
    expect(screen.getByText('011-150-000200867749-00')).toBeInTheDocument();
    expect(screen.getByText('Max Global Corporation S.A')).toBeInTheDocument();
    expect(screen.getByText('20615864014')).toBeInTheDocument();
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
