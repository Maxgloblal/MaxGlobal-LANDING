import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

const CART_STORAGE_KEY = 'mg_cart';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const stored = sessionStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);
  const [refCode, setRefCode] = useState(() => {
    return sessionStorage.getItem('mg_ref') || '';
  });

  // Guardar en sessionStorage ante cualquier cambio en items
  useEffect(() => {
    try {
      sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Manejo seguro si sessionStorage está deshabilitado
    }
  }, [items]);

  // Sincronizar refCode si cambia en sessionStorage
  useEffect(() => {
    const handleStorage = () => {
      const currentRef = sessionStorage.getItem('mg_ref');
      if (currentRef && currentRef !== refCode) {
        setRefCode(currentRef);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [refCode]);

  const addItem = (product, qty = 1) => {
    const numericPrice = typeof product.precioPublico === 'number'
      ? product.precioPublico
      : parseInt(String(product.precioPublico || product.price || 0).replace(/\D/g, ''), 10) || 0;

    const numericPoints = typeof product.puntos === 'number'
      ? product.puntos
      : parseInt(String(product.puntos || product.points || 0).replace(/\D/g, ''), 10) || 0;

    const prodId = product.id;
    const prodName = product.nombre || product.name || 'Producto';
    const prodImage = product.imagen || product.image || '';

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === prodId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          cantidad: updated[existingIndex].cantidad + qty,
        };
        return updated;
      }
      return [
        ...prevItems,
        {
          id: prodId,
          nombre: prodName,
          precioPublico: numericPrice,
          puntos: numericPoints,
          imagen: prodImage,
          cantidad: qty,
        },
      ];
    });
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, cantidad: newQty } : item
      )
    );
  };

  const removeItem = (productId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemQuantity = (productId) => {
    const found = items.find((item) => item.id === productId);
    return found ? found.cantidad : 0;
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const totalItems = items.reduce((sum, item) => sum + item.cantidad, 0);
  const totalPublico = items.reduce(
    (sum, item) => sum + item.precioPublico * item.cantidad,
    0
  );
  const totalPuntos = items.reduce(
    (sum, item) => sum + item.puntos * item.cantidad,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        getItemQuantity,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        totalItems,
        totalPublico,
        totalPuntos,
        refCode,
        setRefCode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe utilizarse dentro de un CartProvider');
  }
  return context;
}
