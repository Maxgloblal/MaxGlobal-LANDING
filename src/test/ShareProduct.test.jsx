import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProductoDetalle from '../pages/ProductoDetalle';
import ProductCard from '../components/ProductCard';
import ShareModal from '../components/ShareModal';
import { CartProvider } from '../context/CartContext';

describe('Funcionalidad de Compartir Productos', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.restoreAllMocks();
  });

  const dummyProduct = {
    id: 'aceite-moringa',
    nombre: 'Aceite de Moringa',
    precioPublico: 120,
    presentacion: 'Frasco gotero 50 ml',
    descripcion: 'Aceite de moringa 100% natural, de uso tópico.',
    imagen: 'https://example.com/aceite.webp',
  };

  it('1 · ShareModal renderiza la información del producto y botones de acción', () => {
    render(
      <ShareModal
        isOpen={true}
        onClose={() => {}}
        producto={dummyProduct}
      />
    );

    expect(screen.getByTestId('share-modal-title')).toBeInTheDocument();
    expect(screen.getByText('Aceite de Moringa')).toBeInTheDocument();
    expect(screen.getByText('Frasco gotero 50 ml')).toBeInTheDocument();
    expect(screen.getByText('S/. 120')).toBeInTheDocument();

    expect(screen.getByTestId('btn-share-whatsapp')).toBeInTheDocument();
    expect(screen.getByTestId('btn-copy-link')).toBeInTheDocument();
  });

  it('2 · ShareModal utiliza el código de referido guardado en sessionStorage', () => {
    sessionStorage.setItem('mg_ref', 'MG-00417');

    render(
      <ShareModal
        isOpen={true}
        onClose={() => {}}
        producto={dummyProduct}
      />
    );

    const input = screen.getByTestId('input-ref-code');
    expect(input.value).toBe('MG-00417');

    const preview = screen.getByTestId('share-url-preview');
    expect(preview.textContent).toContain('ref=MG-00417');

    const waLink = screen.getByTestId('btn-share-whatsapp');
    expect(waLink.getAttribute('href')).toContain('ref%3DMG-00417');
    expect(decodeURIComponent(waLink.getAttribute('href'))).toContain('ref=MG-00417');
  });

  it('3 · Permite al socio escribir o cambiar su código y actualiza la URL y sessionStorage', () => {
    render(
      <ShareModal
        isOpen={true}
        onClose={() => {}}
        producto={dummyProduct}
      />
    );

    const input = screen.getByTestId('input-ref-code');
    fireEvent.change(input, { target: { value: 'MG-99999' } });

    expect(sessionStorage.getItem('mg_ref')).toBe('MG-99999');

    const preview = screen.getByTestId('share-url-preview');
    expect(preview.textContent).toContain('ref=MG-99999');

    const waLink = screen.getByTestId('btn-share-whatsapp');
    expect(decodeURIComponent(waLink.getAttribute('href'))).toContain('ref=MG-99999');
  });

  it('4 · En ProductoDetalle se muestra el botón "Compartir este producto" y abre el modal', async () => {
    render(
      <CartProvider>
        <MemoryRouter initialEntries={['/productos/aceite-moringa']}>
          <Routes>
            <Route path="/productos/:id" element={<ProductoDetalle />} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    );

    const shareBtn = screen.getByTestId('detail-btn-share');
    expect(shareBtn).toBeInTheDocument();

    // El modal no debe estar visible inicialmente
    expect(screen.queryByTestId('share-modal-title')).not.toBeInTheDocument();

    // Al hacer clic, se abre el modal
    fireEvent.click(shareBtn);
    expect(screen.getByTestId('share-modal-title')).toBeInTheDocument();

    // Al hacer clic en cerrar, se oculta
    const closeBtn = screen.getByTestId('btn-close-share-modal');
    fireEvent.click(closeBtn);
    expect(screen.queryByTestId('share-modal-title')).not.toBeInTheDocument();
  });

  it('5 · En ProductCard del catálogo existe el botón rápido de compartir', () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <ProductCard
            id="cafe-moringa"
            nombre="Coffee Capuccino"
            precioPublico={150}
            presentacion="Caja 20 sobres de 18 g"
            descripcion="Café capuccino con moringa."
          />
        </MemoryRouter>
      </CartProvider>
    );

    const cardShareBtn = screen.getByTestId('btn-card-share-cafe-moringa');
    expect(cardShareBtn).toBeInTheDocument();

    fireEvent.click(cardShareBtn);
    expect(screen.getByTestId('share-modal-title')).toBeInTheDocument();
    expect(screen.getAllByText('Coffee Capuccino').length).toBeGreaterThanOrEqual(2);
  });

  it('6 · El mensaje de WhatsApp no contiene promesas curativas ni precios erróneos', () => {
    render(
      <ShareModal
        isOpen={true}
        onClose={() => {}}
        producto={dummyProduct}
      />
    );

    const waLink = screen.getByTestId('btn-share-whatsapp');
    const href = decodeURIComponent(waLink.getAttribute('href'));

    // Sin promesas curativas
    expect(href.toLowerCase()).not.toContain('cura');
    expect(href.toLowerCase()).not.toContain('sana');
    expect(href.toLowerCase()).not.toContain('tratamiento');

    // Con datos exactos del producto
    expect(href).toContain('Aceite de Moringa');
    expect(href).toContain('S/. 120');
    expect(href).toContain('/productos/aceite-moringa');
  });

  it('7 · Copiar enlace invoca clipboard o muestra estado visual de copiado', async () => {
    // Mock navigator.clipboard
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(
      <ShareModal
        isOpen={true}
        onClose={() => {}}
        producto={dummyProduct}
      />
    );

    const copyBtn = screen.getByTestId('btn-copy-link');
    fireEvent.click(copyBtn);

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalled();
      expect(screen.getByText(/¡Enlace copiado al portapapeles!/i)).toBeInTheDocument();
    });
  });
});
