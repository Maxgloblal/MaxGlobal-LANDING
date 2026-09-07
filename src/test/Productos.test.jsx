import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Productos from '../pages/Productos';
import PRODUCTOS from '../data/productos-generado.json';

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
    expect(screen.getByTestId('catalog-count')).toHaveTextContent(`${PRODUCTOS.length} productos`);
  });

  it('filters products by search term ignoring accents and case', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    const input = screen.getByTestId('input-buscar-productos');
    await user.type(input, 'colageno'); // Without accent

    expect(screen.getByRole('heading', { name: /colágeno aeterna/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /coffee capuccino/i })).toBeNull();
    expect(screen.getByTestId('catalog-count')).toHaveTextContent(`1 de ${PRODUCTOS.length} productos`);
  });

  it('filters products by category dropdown selector', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    const select = screen.getByTestId('select-categoria-productos');
    await user.selectOptions(select, 'Salud y Nutrición');

    const saludProds = PRODUCTOS.filter((p) => p.categoria === 'Salud y Nutrición');
    expect(screen.getByTestId('catalog-count')).toHaveTextContent(`${saludProds.length} de ${PRODUCTOS.length} productos`);
  });

  it('shows empty state when no product matches search', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    const input = screen.getByTestId('input-buscar-productos');
    await user.type(input, 'termino-totalmente-inexistente');

    expect(screen.getByTestId('catalog-empty-state')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /no encontramos productos/i })).toBeInTheDocument();

    // Click clear button
    const clearBtn = screen.getByTestId('btn-empty-clear');
    await user.click(clearBtn);

    expect(screen.queryByTestId('catalog-empty-state')).toBeNull();
    expect(screen.getByTestId('catalog-count')).toHaveTextContent(`${PRODUCTOS.length} productos`);
  });

  it('links product card image and title to /productos/:id', () => {
    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    const firstProd = PRODUCTOS[0];
    const productLinks = screen.getAllByRole('link', { name: new RegExp(firstProd.nombre, 'i') });
    expect(productLinks.some((l) => l.getAttribute('href') === `/productos/${firstProd.id}`)).toBe(true);
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
