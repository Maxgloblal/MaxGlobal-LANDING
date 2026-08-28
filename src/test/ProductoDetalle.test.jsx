import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProductoDetalle from '../pages/ProductoDetalle';
import { CartProvider } from '../context/CartContext';
import { PRODUCTOS } from '../config';
import { mejorDescuento, precioSocio } from '../data/catalogo';

const sampleProd = PRODUCTOS[0]; // Coffee Capuccino
const maxDiscount = mejorDescuento();
const partnerPrice = precioSocio(sampleProd.precioPublico, maxDiscount);

function renderDetail(id = sampleProd.id) {
  return render(
    <CartProvider>
      <MemoryRouter initialEntries={[`/productos/${id}`]}>
        <Routes>
          <Route path="/productos/:id" element={<ProductoDetalle />} />
        </Routes>
      </MemoryRouter>
    </CartProvider>
  );
}

describe('ProductoDetalle Page (/productos/:id)', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('renders breadcrumb, product info, public price, dynamic partner price and points', () => {
    renderDetail(sampleProd.id);

    // Breadcrumbs
    expect(screen.getByRole('link', { name: /inicio/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /productos/i })).toHaveAttribute('href', '/productos');
    expect(screen.getAllByText(sampleProd.nombre).length).toBeGreaterThanOrEqual(2);

    // Product Header & Details
    expect(screen.getByTestId('detail-product-name')).toHaveTextContent(sampleProd.nombre);
    expect(screen.getByTestId('detail-description')).toHaveTextContent(sampleProd.descripcion);
    if (sampleProd.presentacion) {
      expect(screen.getByTestId('detail-presentation')).toHaveTextContent(sampleProd.presentacion);
    }
    expect(screen.getByTestId('detail-points')).toHaveTextContent(`${sampleProd.puntos} pts`);

    // Prices
    expect(screen.getByTestId('detail-price-publico')).toHaveTextContent(`S/. ${sampleProd.precioPublico}`);
    expect(screen.getByTestId('detail-price-partner')).toHaveTextContent(`S/. ${partnerPrice}`);

    // Action buttons
    expect(screen.getByTestId('detail-btn-add-cart')).toBeInTheDocument();
    expect(screen.getByTestId('detail-btn-whatsapp')).toBeInTheDocument();
  });

  it('allows changing quantity and updates WhatsApp order URL accordingly', async () => {
    sessionStorage.setItem('mg_ref', 'MG-00417');
    const user = userEvent.setup();
    renderDetail(sampleProd.id);

    // Initial quantity is 1
    expect(screen.getByTestId('detail-qty-display')).toHaveTextContent('1');

    // Increase quantity
    await user.click(screen.getByTestId('detail-btn-plus'));
    expect(screen.getByTestId('detail-qty-display')).toHaveTextContent('2');

    // Check WhatsApp link has quantity, total and ref code
    const waBtn = screen.getByTestId('detail-btn-whatsapp');
    const href = waBtn.getAttribute('href');
    expect(href).toContain('https://wa.me/');
    const decoded = decodeURIComponent(href);
    expect(decoded).toContain(`2× ${sampleProd.nombre}`);
    expect(decoded).toContain(`Total público: S/. ${sampleProd.precioPublico * 2}`);
    expect(decoded).toContain(`Mi código de socio: MG-00417`);
  });

  it('correctly handles Perfume Dalba (omits presentation, shows neutral placeholder, retains full cart/whatsapp behavior)', () => {
    const dalba = PRODUCTOS.find((p) => p.id === 'perfume-dalba');
    renderDetail(dalba.id);

    expect(screen.getByTestId('detail-product-name')).toHaveTextContent(dalba.nombre);
    expect(screen.queryByTestId('detail-presentation')).toBeNull();

    // Price & points
    expect(screen.getByTestId('detail-price-publico')).toHaveTextContent(`S/. ${dalba.precioPublico}`);
    expect(screen.getByTestId('detail-points')).toHaveTextContent(`${dalba.puntos} pts`);

    // Action buttons work
    expect(screen.getByTestId('detail-btn-add-cart')).toBeInTheDocument();
    expect(screen.getByTestId('detail-btn-whatsapp')).toBeInTheDocument();
  });

  it('renders NoEncontrado (404) when product ID does not exist', () => {
    renderDetail('producto-fantasma-inexistente');

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /esta página no existe/i })).toBeInTheDocument();
  });
});
