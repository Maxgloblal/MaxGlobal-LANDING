import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartFab() {
  const { totalItems, toggleCart } = useCart();

  return (
    <button
      onClick={toggleCart}
      data-testid="btn-cart-fab"
      aria-label={`Ver pedido (${totalItems} productos)`}
      style={{
        position: 'fixed',
        bottom: '90px',
        right: '24px',
        width: '56px',
        height: '56px',
        borderRadius: 'var(--r-pill)',
        backgroundColor: 'var(--brand-gold)',
        color: 'var(--n-700)',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(209, 173, 104, 0.45)',
        cursor: 'pointer',
        zIndex: 990,
        transition: 'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.08)';
        e.currentTarget.style.boxShadow = '0 12px 28px rgba(209, 173, 104, 0.55)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(209, 173, 104, 0.45)';
      }}
    >
      <ShoppingBag size={24} />
      {totalItems > 0 && (
        <span
          data-testid="cart-fab-badge"
          style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            backgroundColor: 'var(--brand-green)',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 800,
            borderRadius: 'var(--r-pill)',
            minWidth: '22px',
            height: '22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 5px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.25)',
            border: '2px solid #FFFFFF',
          }}
        >
          {totalItems}
        </span>
      )}
    </button>
  );
}
