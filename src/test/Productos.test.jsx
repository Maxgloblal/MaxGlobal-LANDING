import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Productos from '../pages/Productos';
import { PRODUCTOS } from '../config';

describe('Productos Page (P-02)', () => {
  it('renders hero title and catalog description', () => {
    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    expect(screen.getByText('Catálogo')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /nuestros productos/i })).toBeInTheDocument();
    expect(screen.getByText(/como socio, los compras con 50% de descuento/i)).toBeInTheDocument();
  });

  it('renders all products from the catalog dynamically', () => {
    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    PRODUCTOS.forEach((prod) => {
      expect(screen.getByRole('heading', { name: prod.nombre })).toBeInTheDocument();
    });
  });

  it('renders prices and points correctly for each product in catalog', () => {
    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    PRODUCTOS.forEach((prod) => {
      expect(screen.getAllByText(`S/. ${prod.precioPublico}`).length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText(`${prod.puntos} pts`).length).toBeGreaterThanOrEqual(1);
    });
  });

  it('renders the bottom banner Los socios pagan la mitad with CTA to packs', () => {
    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /los socios pagan la mitad/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /ver los packs de afiliación/i })).toHaveAttribute(
      'href',
      '/packs-de-afiliacion'
    );
  });
});
