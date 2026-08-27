import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Portada from '../pages/Portada';

describe('Portada Page (P-01 v2)', () => {
  it('renders hero title and subtitle', () => {
    render(
      <MemoryRouter>
        <Portada />
      </MemoryRouter>
    );

    expect(screen.getByText('Venta directa · Perú')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /un negocio propio/i })).toBeInTheDocument();
    expect(screen.getByText(/con productos que la gente vuelve a comprar/i)).toBeInTheDocument();
  });

  it('renders floating stats box with 8 productos, 50% and 10 niveles', () => {
    render(
      <MemoryRouter>
        <Portada />
      </MemoryRouter>
    );

    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('productos')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText('descuento de socio')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('niveles')).toBeInTheDocument();
  });

  it('renders the 3 steps to start', () => {
    render(
      <MemoryRouter>
        <Portada />
      </MemoryRouter>
    );

    expect(screen.getByText('Empezar toma tres pasos')).toBeInTheDocument();
    expect(screen.getAllByText('01').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('heading', { name: /eliges tu pack/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /recibes tu producto/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /empiezas a construir/i })).toBeInTheDocument();
  });

  it('renders the 4 ways to earn', () => {
    render(
      <MemoryRouter>
        <Portada />
      </MemoryRouter>
    );

    expect(screen.getByText('Las cuatro formas de ganar')).toBeInTheDocument();
    expect(screen.getByText('Patrocinio')).toBeInTheDocument();
    expect(screen.getByText('Residual')).toBeInTheDocument();
    expect(screen.getByText('Rango')).toBeInTheDocument();
    expect(screen.getByText('Global')).toBeInTheDocument();
  });

  it('renders final close banner Empieza hoy', () => {
    render(
      <MemoryRouter>
        <Portada />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /empieza hoy/i })).toBeInTheDocument();
  });
});
