import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Plus, Minus, Leaf, ShieldCheck } from 'lucide-react';
import { EMPRESA } from '../config';
import { precioSocio, mejorDescuento } from '../data/catalogo';
import { useCart } from '../context/CartContext';

export default function ProductCard({
  id,
  name,
  nombre,
  description,
  descripcion,
  price,
  precioPublico,
  points,
  puntos,
  category,
  categoria,
  presentation,
  presentacion,
  image,
  imagen,
}) {
  const [refCode, setRefCode] = useState('');
  const [imgError, setImgError] = useState(false);

  let cart = null;
  try {
    cart = useCart();
  } catch {
    cart = null;
  }

  const displayName = nombre || name;
  const displayDesc = descripcion || description;
  const rawPrice = precioPublico !== undefined ? precioPublico : price;
  const displayPoints = puntos !== undefined ? puntos : points;
  const displayCategory = categoria || category;
  const displayPresentation = presentacion || presentation;
  const displayImage = imagen || image;

  useEffect(() => {
    const storedRef = sessionStorage.getItem('mg_ref');
    if (storedRef) {
      setRefCode(storedRef);
    }
  }, []);

  const numericPrice = typeof rawPrice === 'string' ? parseInt(rawPrice.replace(/\D/g, ''), 10) || 0 : typeof rawPrice === 'number' ? rawPrice : 0;
  const formattedPrice = typeof rawPrice === 'string' ? rawPrice : `S/. ${numericPrice}`;
  
  // El mejor descuento vigente sale de los packs dinámicamente
  const maxDiscount = mejorDescuento();
  const partnerPriceFrom = numericPrice > 0 ? precioSocio(numericPrice, maxDiscount) : null;

  const qtyInCart = cart ? cart.getItemQuantity(id) : 0;

  return (
    <div
      data-testid={`product-card-${id}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--r-card)',
        padding: 'clamp(12px, 2.5vw, var(--sp-5))',
        boxShadow: 'var(--shadow-xs)',
        transition: 'var(--t-surface)',
        minWidth: 0,
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(209, 173, 104, 0.18)';
        e.currentTarget.style.borderColor = 'var(--border-gold)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
        e.currentTarget.style.borderColor = 'var(--border-subtle)';
      }}
    >
      {/* Imagen del Producto con Enlace al Detalle */}
      <Link
        to={`/productos/${id}`}
        style={{
          textDecoration: 'none',
          display: 'block',
          width: '100%',
          borderRadius: 'var(--r-md)',
          overflow: 'hidden',
          marginBottom: 'var(--sp-3)',
        }}
        aria-label={`Ver detalles de ${displayName}`}
      >
        <div
          style={{
            width: '100%',
            height: '210px',
            borderRadius: 'var(--r-md)',
            backgroundColor: displayImage && !imgError ? '#F8F9FA' : 'var(--surface-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {displayImage && !imgError ? (
            <img
              src={displayImage}
              alt={displayName}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                borderRadius: 'var(--r-md)',
              }}
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                width: '100%',
                height: '100%',
                padding: 'var(--sp-3)',
              }}
            >
              <Leaf size={32} color="var(--brand-gold)" />
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--fs-3xs)',
                  letterSpacing: 'var(--ls-wide)',
                  textTransform: 'uppercase',
                  color: 'var(--gold-700)',
                  lineHeight: 'var(--lh-normal)',
                  fontWeight: 700,
                }}
              >
                100% Natural<br />Max Global
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Categoría */}
      {displayCategory && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: 'var(--sp-1)' }}>
          <span
            className="mg-eyebrow"
            style={{ fontSize: 'var(--fs-3xs)' }}
          >
            {displayCategory}
          </span>
        </div>
      )}

      {/* Nombre y Puntos */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 'var(--sp-2)',
          marginBottom: 'var(--sp-2)',
        }}
      >
        <h3
          style={{
            fontSize: 'var(--fs-md)',
            color: 'var(--text-strong)',
            margin: 0,
            lineHeight: 'var(--lh-snug)',
          }}
        >
          <Link
            to={`/productos/${id}`}
            style={{
              color: 'inherit',
              textDecoration: 'none',
              transition: 'color var(--dur-fast) var(--ease-out)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--brand-gold)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'inherit';
            }}
          >
            {displayName}
          </Link>
        </h3>
        {displayPoints !== undefined && (
          <span
            style={{
              backgroundColor: 'var(--surface-green)',
              color: 'var(--green-600)',
              border: '1px solid var(--border-green)',
              padding: '2px 8px',
              borderRadius: 'var(--r-pill)',
              fontSize: 'var(--fs-2xs)',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}
          >
            {displayPoints} pts
          </span>
        )}
      </div>

      {/* Presentación */}
      {displayPresentation && (
        <p
          style={{
            fontSize: 'var(--fs-2xs)',
            color: 'var(--text-muted)',
            marginBottom: 'var(--sp-2)',
          }}
        >
          {displayPresentation}
        </p>
      )}

      {/* Descripción */}
      {displayDesc && (
        <p
          style={{
            fontSize: 'var(--fs-xs)',
            lineHeight: 'var(--lh-normal)',
            color: 'var(--text-body)',
            marginBottom: 'var(--sp-4)',
            flexGrow: 1,
          }}
        >
          {displayDesc}
        </p>
      )}

      {/* Precios: Público y Los socios pagan desde */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--surface-sunken)',
          padding: '8px 12px',
          borderRadius: 'var(--r-sm)',
          marginBottom: 'var(--sp-3)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontSize: 'var(--fs-2xs)', color: 'var(--text-muted)' }}>Público:</span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              textTransform: 'uppercase',
              letterSpacing: 'var(--ls-display)',
              fontSize: 'var(--fs-md)',
              color: 'var(--text-strong)',
            }}
          >
            {formattedPrice}
          </span>
        </div>
        {partnerPriceFrom && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '2px' }}>
            <span style={{ fontSize: 'var(--fs-2xs)', color: 'var(--brand-green)', fontWeight: 600 }}>Los socios pagan desde:</span>
            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--brand-green)', fontWeight: 700 }}>
              S/. {partnerPriceFrom}
            </span>
          </div>
        )}
      </div>

      {/* Botón Carrito: Agregar o Selector de Cantidad */}
      {qtyInCart === 0 ? (
        <button
          onClick={() => {
            if (cart) {
              cart.addItem({
                id,
                nombre: displayName,
                precioPublico: numericPrice,
                puntos: displayPoints,
                imagen: displayImage,
              });
              cart.openCart();
            }
          }}
          data-testid={`btn-add-to-cart-${id}`}
          data-test-order-btn={`btn-order-wa-${id}`}
          aria-label={`Agregar ${displayName} al pedido`}
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            backgroundColor: 'var(--brand-gold)',
            color: 'var(--n-700)',
            fontFamily: 'var(--font-subtitle)',
            fontSize: 'var(--fs-sm)',
            fontWeight: 700,
            border: 'none',
            padding: '12px 16px',
            borderRadius: 'var(--r-sm)',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-gold)',
            transition: 'background-color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--gold-400)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--brand-gold)';
            e.currentTarget.style.transform = 'none';
          }}
        >
          <ShoppingBag size={18} aria-hidden="true" />
          <span>Agregar al pedido</span>
        </button>
      ) : (
        <div
          data-testid={`card-qty-controller-${id}`}
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--surface-gold)',
            border: '1px solid var(--border-gold)',
            borderRadius: 'var(--r-sm)',
            padding: '4px 6px',
          }}
        >
          <button
            onClick={() => cart && cart.updateQuantity(id, qtyInCart - 1)}
            data-testid={`btn-card-minus-${id}`}
            aria-label={`Disminuir cantidad de ${displayName}`}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--r-xs)',
              border: 'none',
              backgroundColor: '#FFFFFF',
              color: 'var(--text-strong)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}
          >
            <Minus size={14} />
          </button>

          <button
            onClick={() => cart && cart.openCart()}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 'var(--fs-xs)',
              fontWeight: 700,
              color: 'var(--gold-800, #7A5B18)',
              padding: '0 4px',
            }}
          >
            {qtyInCart} en el pedido
          </button>

          <button
            onClick={() => cart && cart.updateQuantity(id, qtyInCart + 1)}
            data-testid={`btn-card-plus-${id}`}
            aria-label={`Aumentar cantidad de ${displayName}`}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--r-xs)',
              border: 'none',
              backgroundColor: '#FFFFFF',
              color: 'var(--text-strong)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}
          >
            <Plus size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
