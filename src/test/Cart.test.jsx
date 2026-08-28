import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartProvider, useCart } from '../context/CartContext';
import CartDrawer from '../components/CartDrawer';
import CartFab from '../components/CartFab';
import { PRODUCTOS } from '../config';

const prodCafe = PRODUCTOS.find((p) => p.id === 'cafe-moringa') || PRODUCTOS[0];
const prodColageno = PRODUCTOS.find((p) => p.id === 'colageno-hidrolizado') || PRODUCTOS[1];

function TestCartConsumer() {
  const { addItem, totalPublico, totalPuntos, totalItems, openCart } = useCart();
  return (
    <div>
      <button onClick={() => addItem(prodCafe, 2)}>
        Agregar 2 Cafes
      </button>
      <button onClick={() => addItem(prodColageno, 1)}>
        Agregar 1 Colageno
      </button>
      <button onClick={openCart}>Abrir Carrito</button>
      <span data-testid="test-total-items">{totalItems}</span>
      <span data-testid="test-total-publico">{totalPublico}</span>
      <span data-testid="test-total-puntos">{totalPuntos}</span>
    </div>
  );
}

describe('Cart Context and Flow (Bloque B & C)', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('manages cart items, totals, and points correctly', async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <TestCartConsumer />
        <CartFab />
        <CartDrawer />
      </CartProvider>
    );

    // Initial state
    expect(screen.getByTestId('test-total-items')).toHaveTextContent('0');

    // Add items
    await user.click(screen.getByText('Agregar 2 Cafes'));
    expect(screen.getByTestId('test-total-items')).toHaveTextContent('2');
    expect(screen.getByTestId('test-total-publico')).toHaveTextContent(String(prodCafe.precioPublico * 2));
    expect(screen.getByTestId('test-total-puntos')).toHaveTextContent(String(prodCafe.puntos * 2));

    await user.click(screen.getByText('Agregar 1 Colageno'));
    expect(screen.getByTestId('test-total-items')).toHaveTextContent('3');
    expect(screen.getByTestId('test-total-publico')).toHaveTextContent(
      String(prodCafe.precioPublico * 2 + prodColageno.precioPublico)
    );
    expect(screen.getByTestId('test-total-puntos')).toHaveTextContent(
      String(prodCafe.puntos * 2 + prodColageno.puntos)
    );

    // Check fab badge
    expect(screen.getByTestId('cart-fab-badge')).toHaveTextContent('3');
  });

  it('renders CartDrawer with products, quantities and calculates WhatsApp URL with ref code', async () => {
    sessionStorage.setItem('mg_ref', 'MG-00417');
    const user = userEvent.setup();

    render(
      <CartProvider>
        <TestCartConsumer />
        <CartDrawer />
      </CartProvider>
    );

    await user.click(screen.getByText('Agregar 2 Cafes'));
    await user.click(screen.getByText('Abrir Carrito'));

    // Drawer should be visible
    expect(screen.getByTestId('cart-drawer')).toBeInTheDocument();
    expect(screen.getByText(prodCafe.nombre)).toBeInTheDocument();
    expect(screen.getByTestId(`cart-item-qty-${prodCafe.id}`)).toHaveTextContent('2');

    // Ref code input preloaded from sessionStorage
    const refInput = screen.getByTestId('input-cart-ref-code');
    expect(refInput).toHaveValue('MG-00417');

    // Disclaimer visible
    expect(
      screen.getByText(/Los precios mostrados son de venta al público/i)
    ).toBeInTheDocument();

    // Check WhatsApp link format
    const waBtn = screen.getByTestId('btn-cart-whatsapp');
    const href = waBtn.getAttribute('href');
    expect(href).toContain('https://wa.me/');
    expect(decodeURIComponent(href)).toContain(`Total a precio público: S/. ${prodCafe.precioPublico * 2}`);
    expect(decodeURIComponent(href)).toContain(`Puntos: ${prodCafe.puntos * 2}`);
    expect(decodeURIComponent(href)).toContain('Mi código de socio: MG-00417');
  });

  it('allows increasing, decreasing and removing items in drawer', async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <TestCartConsumer />
        <CartDrawer />
      </CartProvider>
    );

    await user.click(screen.getByText('Agregar 2 Cafes'));
    await user.click(screen.getByText('Abrir Carrito'));

    // Increase quantity
    const plusBtn = screen.getByTestId(`cart-btn-plus-${prodCafe.id}`);
    await user.click(plusBtn);
    expect(screen.getByTestId(`cart-item-qty-${prodCafe.id}`)).toHaveTextContent('3');
    expect(screen.getByTestId('cart-total-publico')).toHaveTextContent(`S/. ${prodCafe.precioPublico * 3}`);

    // Decrease quantity
    const minusBtn = screen.getByTestId(`cart-btn-minus-${prodCafe.id}`);
    await user.click(minusBtn);
    expect(screen.getByTestId(`cart-item-qty-${prodCafe.id}`)).toHaveTextContent('2');

    // Remove item
    const removeBtn = screen.getByTestId(`cart-btn-remove-${prodCafe.id}`);
    await user.click(removeBtn);
    expect(screen.getByText('Tu carrito está vacío')).toBeInTheDocument();
  });
});
