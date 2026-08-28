import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { EMPRESA } from '../config';

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    totalItems,
    totalPublico,
    totalPuntos,
    refCode,
    setRefCode,
  } = useCart();

  if (!isOpen) return null;

  // Generación del mensaje exacto de WhatsApp según especificación del Bloque C
  const generateWhatsAppMessage = () => {
    let msg = 'Hola, quiero hacer este pedido:\n\n';

    items.forEach((item) => {
      const subtotal = item.precioPublico * item.cantidad;
      msg += `• ${item.cantidad}× ${item.nombre} ..... S/. ${subtotal}\n`;
    });

    msg += `\nTotal a precio público: S/. ${totalPublico}\n`;
    msg += `Puntos: ${totalPuntos}\n`;

    if (refCode && refCode.trim() !== '') {
      msg += `\nMi código de socio: ${refCode.trim()}`;
    }

    return msg;
  };

  const waText = generateWhatsAppMessage();
  const waUrl = `https://wa.me/${EMPRESA.whatsapp}?text=${encodeURIComponent(waText)}`;

  return (
    <div
      data-testid="cart-drawer-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'flex-end',
        transition: 'opacity 0.2s ease',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeCart();
      }}
    >
      <div
        data-testid="cart-drawer"
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          backgroundColor: 'var(--surface-page)',
          boxShadow: '-8px 0 24px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 10000,
          animation: 'slideInRight 0.25s ease-out',
        }}
      >
        {/* Cabecera del Carrito */}
        <div
          style={{
            padding: 'var(--sp-4) var(--sp-6)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--surface-card)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--r-pill)',
                backgroundColor: 'var(--surface-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gold-700)',
              }}
            >
              <ShoppingBag size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: 'var(--fs-md)', margin: 0, color: 'var(--text-strong)' }}>
                Tu Pedido
              </h2>
              <span style={{ fontSize: 'var(--fs-2xs)', color: 'var(--text-muted)' }}>
                {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
              </span>
            </div>
          </div>

          <button
            onClick={closeCart}
            data-testid="btn-close-cart"
            aria-label="Cerrar carrito"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: 'var(--r-pill)',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Lista de Productos o Estado Vacío */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: 'var(--sp-4) var(--sp-6)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--sp-4)',
          }}
        >
          {items.length === 0 ? (
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: 'var(--sp-8) var(--sp-4)',
                gap: 'var(--sp-4)',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: 'var(--r-pill)',
                  backgroundColor: 'var(--surface-sunken)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-muted)',
                }}
              >
                <ShoppingBag size={28} />
              </div>
              <div>
                <h3 style={{ fontSize: 'var(--fs-md)', color: 'var(--text-strong)', margin: '0 0 4px' }}>
                  Tu carrito está vacío
                </h3>
                <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', maxWidth: '28ch', margin: 0 }}>
                  Explora nuestro catálogo y agrega los productos que deseas pedir.
                </p>
              </div>
              <button
                onClick={closeCart}
                style={{
                  marginTop: 'var(--sp-2)',
                  padding: '10px 20px',
                  backgroundColor: 'var(--brand-gold)',
                  color: 'var(--n-700)',
                  fontWeight: 700,
                  fontSize: 'var(--fs-xs)',
                  border: 'none',
                  borderRadius: 'var(--r-pill)',
                  cursor: 'pointer',
                }}
              >
                Ver productos
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                data-testid={`cart-item-${item.id}`}
                style={{
                  display: 'flex',
                  gap: 'var(--sp-3)',
                  backgroundColor: 'var(--surface-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--r-sm)',
                  padding: 'var(--sp-3)',
                  alignItems: 'center',
                }}
              >
                {/* Miniatura */}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--r-xs)',
                    backgroundColor: 'var(--surface-gold)',
                    border: '1px solid var(--border-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  {item.imagen ? (
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div
                    style={{
                      display: item.imagen ? 'none' : 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ShoppingBag size={18} color="var(--brand-gold)" />
                  </div>
                </div>

                {/* Info y Precio */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4
                    style={{
                      fontSize: 'var(--fs-xs)',
                      fontWeight: 700,
                      color: 'var(--text-strong)',
                      margin: '0 0 2px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.nombre}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-strong)', fontWeight: 700 }}>
                      S/. {item.precioPublico * item.cantidad}
                    </span>
                    <span style={{ fontSize: 'var(--fs-3xs)', color: 'var(--brand-green)', fontWeight: 700 }}>
                      {item.puntos * item.cantidad} pts
                    </span>
                  </div>
                </div>

                {/* Control de Cantidad */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    backgroundColor: 'var(--surface-sunken)',
                    borderRadius: 'var(--r-pill)',
                    padding: '2px',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <button
                    onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                    data-testid={`cart-btn-minus-${item.id}`}
                    aria-label={`Disminuir cantidad de ${item.nombre}`}
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: 'var(--r-pill)',
                      border: 'none',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-strong)',
                    }}
                  >
                    <Minus size={12} />
                  </button>
                  <span
                    data-testid={`cart-item-qty-${item.id}`}
                    style={{
                      fontSize: 'var(--fs-xs)',
                      fontWeight: 700,
                      minWidth: '18px',
                      textAlign: 'center',
                    }}
                  >
                    {item.cantidad}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                    data-testid={`cart-btn-plus-${item.id}`}
                    aria-label={`Aumentar cantidad de ${item.nombre}`}
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: 'var(--r-pill)',
                      border: 'none',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-strong)',
                    }}
                  >
                    <Plus size={12} />
                  </button>
                </div>

                {/* Eliminar Item */}
                <button
                  onClick={() => removeItem(item.id)}
                  data-testid={`cart-btn-remove-${item.id}`}
                  aria-label={`Eliminar ${item.nombre} del carrito`}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--n-400)',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Resumen, Código de Socio y CTA */}
        {items.length > 0 && (
          <div
            style={{
              padding: 'var(--sp-4) var(--sp-6)',
              borderTop: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--surface-card)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--sp-3)',
            }}
          >
            {/* Campo Código de Socio */}
            <div>
              <label
                htmlFor="cart-ref-code"
                style={{
                  display: 'block',
                  fontSize: 'var(--fs-2xs)',
                  fontWeight: 700,
                  color: 'var(--text-strong)',
                  marginBottom: '4px',
                }}
              >
                Mi código de socio (opcional):
              </label>
              <input
                id="cart-ref-code"
                data-testid="input-cart-ref-code"
                type="text"
                value={refCode}
                onChange={(e) => setRefCode(e.target.value)}
                placeholder="Ej: MG-00417"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  fontSize: 'var(--fs-xs)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--r-sm)',
                  backgroundColor: 'var(--surface-page)',
                  color: 'var(--text-strong)',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Totales */}
            <div
              style={{
                backgroundColor: 'var(--surface-sunken)',
                borderRadius: 'var(--r-sm)',
                padding: '10px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
                  Total a precio público:
                </span>
                <span
                  data-testid="cart-total-publico"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--fs-lg)',
                    fontWeight: 700,
                    color: 'var(--text-strong)',
                  }}
                >
                  S/. {totalPublico}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 'var(--fs-2xs)', color: 'var(--text-muted)' }}>
                  Total Puntos acumulados:
                </span>
                <span
                  data-testid="cart-total-puntos"
                  style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--brand-green)' }}
                >
                  {totalPuntos} pts
                </span>
              </div>
            </div>

            {/* Aviso Fijo Legal — Ley 29571 */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-start',
                backgroundColor: 'var(--surface-gold)',
                border: '1px solid var(--border-gold)',
                borderRadius: 'var(--r-xs)',
                padding: '8px 10px',
              }}
            >
              <AlertCircle size={14} color="var(--gold-700)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p
                style={{
                  fontSize: '11px',
                  lineHeight: '1.4',
                  color: 'var(--gold-800, #7A5B18)',
                  margin: 0,
                }}
              >
                Los precios mostrados son de venta al público. Si eres socio, tu asesor aplicará el descuento que corresponde a tu pack al confirmar el pedido.
              </p>
            </div>

            {/* Botón Enviar por WhatsApp */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="btn-cart-whatsapp"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: 'var(--whatsapp)',
                color: '#FFFFFF',
                padding: '12px 16px',
                borderRadius: 'var(--r-pill)',
                fontFamily: 'var(--font-subtitle)',
                fontWeight: 700,
                fontSize: 'var(--fs-sm)',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
                transition: 'background-color var(--dur-fast) var(--ease-out)',
              }}
            >
              <MessageCircle size={18} />
              <span>Enviar pedido por WhatsApp</span>
            </a>

            {/* Vaciar carrito */}
            <button
              onClick={clearCart}
              data-testid="btn-clear-cart"
              style={{
                background: 'none',
                border: 'none',
                fontSize: 'var(--fs-3xs)',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                textAlign: 'center',
                padding: '2px',
                textDecoration: 'underline',
              }}
            >
              Vaciar pedido
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
