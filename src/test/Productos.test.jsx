import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Productos from '../pages/Productos';

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

  it('renders all 8 products from the catalog', () => {
    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'Café con Moringa' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Colágeno Hidrolizado' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Aceite de Moringa' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Esplendor' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Aceite de Orégano' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Cápsulas de Moringa' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Harina de Moringa' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Perfume Dalba' })).toBeInTheDocument();
  });

  it('renders prices and points correctly', () => {
    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    expect(screen.getAllByText('S/. 150').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText('18 pts').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText('14 pts').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('8 pts').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('6 pts')).toBeInTheDocument();
    expect(screen.getByText('10 pts')).toBeInTheDocument();
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
