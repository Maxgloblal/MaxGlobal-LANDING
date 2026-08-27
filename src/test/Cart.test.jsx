import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartProvider, useCart } from '../context/CartContext';
import CartDrawer from '../components/CartDrawer';
import CartFab from '../components/CartFab';
import ProductCard from '../components/ProductCard';

function TestCartConsumer() {
  const { items, addItem, totalPublico, totalPuntos, totalItems, openCart } = useCart();
  return (
    <div>
      <button
        onClick={() => addItem({ id: 'cafe-moringa', nombre: 'Café con Moringa', precioPublico: 150, puntos: 18, imagen: '' }, 2)}
      >
        Agregar 2 Cafes
      </button>
      <button
        onClick={() => addItem({ id: 'colageno-hidrolizado', nombre: 'Colágeno Hidrolizado', precioPublico: 150, puntos: 18, imagen: '' }, 1)}
      >
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
    expect(screen.getByTestId('test-total-publico')).toHaveTextContent('300');
    expect(screen.getByTestId('test-total-puntos')).toHaveTextContent('36');

    await user.click(screen.getByText('Agregar 1 Colageno'));
    expect(screen.getByTestId('test-total-items')).toHaveTextContent('3');
    expect(screen.getByTestId('test-total-publico')).toHaveTextContent('450');
    expect(screen.getByTestId('test-total-puntos')).toHaveTextContent('54');

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
    expect(screen.getByText('Café con Moringa')).toBeInTheDocument();
    expect(screen.getByTestId('cart-item-qty-cafe-moringa')).toHaveTextContent('2');

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
    expect(decodeURIComponent(href)).toContain('Total a precio público: S/. 300');
    expect(decodeURIComponent(href)).toContain('Puntos: 36');
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
    const plusBtn = screen.getByTestId('cart-btn-plus-cafe-moringa');
    await user.click(plusBtn);
    expect(screen.getByTestId('cart-item-qty-cafe-moringa')).toHaveTextContent('3');
    expect(screen.getByTestId('cart-total-publico')).toHaveTextContent('S/. 450');

    // Decrease quantity
    const minusBtn = screen.getByTestId('cart-btn-minus-cafe-moringa');
    await user.click(minusBtn);
    expect(screen.getByTestId('cart-item-qty-cafe-moringa')).toHaveTextContent('2');

    // Remove item
    const removeBtn = screen.getByTestId('cart-btn-remove-cafe-moringa');
    await user.click(removeBtn);
    expect(screen.getByText('Tu carrito está vacío')).toBeInTheDocument();
  });
});
