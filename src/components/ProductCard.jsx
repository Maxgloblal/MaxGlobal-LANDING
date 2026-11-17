import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Plus, Minus, Leaf, ShieldCheck, Share2 } from 'lucide-react';
import { EMPRESA } from '../config';
import { precioSocio, mejorDescuento } from '../data/catalogo';
import { useCart } from '../context/CartContext';
import ShareModal from './ShareModal';

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
  showDescription = false,
}) {
  const [refCode, setRefCode] = useState('');
  const [imgError, setImgError] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

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
  const rawImage = imagen || image;
  const localImage = id ? `/images/productos/${id}.webp` : null;
  const [currentImg, setCurrentImg] = useState(localImage || rawImage);

  useEffect(() => {
    setCurrentImg(id ? `/images/productos/${id}.webp` : rawImage);
    setImgError(false);
  }, [id, rawImage]);

  const handleImgError = () => {
    if (currentImg !== rawImage && rawImage) {
      setCurrentImg(rawImage);
    } else {
      setImgError(true);
    }
  };

  useEffect(() => {
    const storedRef = sessionStorage.getItem('mg_ref');
    if (storedRef) {
      setRefCode(storedRef);
    }
  }, []);

  const numericPrice = typeof rawPrice === 'string' ? parseInt(rawPrice.replace(/\D/g, ''), 10) || 0 : typeof rawPrice === 'number' ? rawPrice : 0;
  const formattedPrice = typeof rawPrice === 'string' ? rawPrice.replace(/S\/\.\s*/g, 'S/ ') : `S/ ${numericPrice}`;
  
  // El mejor descuento vigente sale de los packs dinámicamente
  const maxDiscount = mejorDescuento();
  const partnerPriceFrom = numericPrice > 0 ? precioSocio(numericPrice, maxDiscount) : null;

  const qtyInCart = cart ? cart.getItemQuantity(id) : 0;

  return (
    <div
      data-testid={`product-card-${id}`}
      className="mg-product-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        borderRadius: '16px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
        overflow: 'hidden',
        padding: 0,
        transition: 'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)',
        minWidth: 0,
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.borderColor = 'rgba(209, 173, 104, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.06)';
        e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
      }}
    >
      {/* 1. Imagen de Borde a Borde (Edge-to-Edge) con Overlays */}
      <div
        className="mg-card-media-wrap"
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1',
          overflow: 'hidden',
          backgroundColor: '#F8F9FA',
        }}
      >
        <Link
          to={`/productos/${id}`}
          style={{
            textDecoration: 'none',
            borderBottom: 'none',
            display: 'block',
            width: '100%',
            height: '100%',
          }}
          aria-label={`Ver detalles de ${displayName}`}
        >
          {currentImg && !imgError ? (
            <img
              src={currentImg}
              alt={displayName}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.4s var(--ease-out)',
              }}
              onError={handleImgError}
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
                  textAlign: 'center',
                }}
              >
                Bienestar Natural<br />Max Global
              </span>
            </div>
          )}
        </Link>

        {/* Badge flotante de Puntos (Top-Left sobre la foto) */}
        {displayPoints !== undefined && (
          <span
            className="mg-points-badge"
            style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              zIndex: 3,
              backgroundColor: 'rgba(26, 26, 24, 0.85)',
              color: '#FFFFFF',
              padding: '2px 8px',
              borderRadius: 'var(--r-pill)',
              fontSize: '10px',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              backdropFilter: 'blur(4px)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
              border: 'none',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}
          >
            {displayPoints} pts
          </span>
        )}

        {/* Botón flotante para compartir producto (Top-Right sobre la foto) */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsShareOpen(true);
          }}
          data-testid={`btn-card-share-${id}`}
          aria-label={`Compartir ${displayName}`}
          title="Compartir producto"
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            zIndex: 4,
            width: '28px',
            height: '28px',
            borderRadius: 'var(--r-circle)',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            transition: 'all var(--dur-fast) var(--ease-out)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--gold-800)';
            e.currentTarget.style.backgroundColor = '#FFFFFF';
            e.currentTarget.style.transform = 'scale(1.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-muted)';
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.92)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <Share2 size={14} />
        </button>
      </div>

      {/* 2. Cuerpo de Contenido con Padding */}
      <div
        className="mg-card-body"
        style={{
          padding: '10px 12px 4px',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        {/* Categoría a ancho completo (sin cortes) */}
        {displayCategory && (
          <span
            className="mg-eyebrow"
            style={{
              fontSize: '10px',
              color: 'var(--gold-800, #a0740b)',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '2px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {displayCategory}
          </span>
        )}

        {/* Nombre a ancho completo (reserva 2 líneas y corta a 2 líneas máximo) */}
        <h3
          className="mg-product-card-title"
          style={{
            fontSize: 'var(--fs-md)',
            color: 'var(--text-strong)',
            margin: '0 0 2px',
            lineHeight: '1.3',
            height: '2.6em',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          <Link
            to={`/productos/${id}`}
            style={{
              color: 'inherit',
              textDecoration: 'none',
              borderBottom: 'none',
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

        {/* Presentación */}
        {displayPresentation && (
          <p
            className="mg-product-card-presentation"
            style={{
              fontSize: 'var(--fs-2xs)',
              color: 'var(--text-muted)',
              marginBottom: '6px',
            }}
          >
            {displayPresentation}
          </p>
        )}

        {/* Descripción (oculta por defecto en el catálogo para diseño limpio y alturas uniformes) */}
        {showDescription && displayDesc && (
          <p
            style={{
              fontSize: 'var(--fs-xs)',
              lineHeight: 'var(--lh-normal)',
              color: 'var(--text-body)',
              marginBottom: 'var(--sp-4)',
              flexGrow: 1,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            title={displayDesc}
          >
            {displayDesc}
          </p>
        )}
      </div>

      {/* 3. Precios y Botón de Acción */}
      <div
        className="mg-card-footer"
        style={{
          padding: '0 12px 12px',
          marginTop: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Precios: Desencajonados con divisor fino */}
        <div
          className="mg-card-price-box"
          style={{
            borderTop: '1px solid #F1F0EB',
            paddingTop: '6px',
            paddingBottom: '8px',
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: '6px',
            marginBottom: '8px',
          }}
        >
          {/* Precio Público */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
              <span className="mg-label-desktop">Público: </span>
              <span className="mg-label-mobile">Púb: </span>
            </span>
            <span
              className="mg-card-price-publico"
              style={{
                fontSize: '11px',
                color: 'var(--text-muted)',
                textDecoration: 'line-through',
              }}
            >
              {formattedPrice}
            </span>
          </div>

          {/* Precio Socio */}
          {partnerPriceFrom && (
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', textAlign: 'right' }}>
              <span style={{ fontSize: '10px', color: 'var(--brand-green)', fontWeight: 700 }}>
                <span className="mg-label-desktop">Los socios pagan desde: </span>
                <span className="mg-label-mobile">Socio </span>
              </span>
              <span
                className="mg-card-price-socio"
                style={{
                  fontSize: '13px',
                  color: 'var(--brand-green)',
                  fontWeight: 900,
                }}
              >
                S/ {partnerPriceFrom}
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
                  imagen: currentImg,
                });
                cart.openCart();
              }
            }}
            data-testid={`btn-add-to-cart-${id}`}
            data-test-order-btn={`btn-order-wa-${id}`}
            aria-label={`Agregar ${displayName} al pedido`}
            className="mg-card-btn-add"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              backgroundColor: '#1A1A18',
              color: '#FFFFFF',
              fontFamily: 'var(--font-subtitle)',
              fontSize: 'var(--fs-sm)',
              fontWeight: 700,
              border: 'none',
              padding: '10px 14px',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.12)',
              transition: 'background-color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2D2D29';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#1A1A18';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <ShoppingBag size={15} color="var(--brand-gold)" aria-hidden="true" />
            <span className="mg-label-desktop">Agregar al pedido</span>
            <span className="mg-label-mobile">Agregar</span>
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

      {/* Modal de Compartir */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        producto={{
          id,
          nombre: displayName,
          precioPublico: numericPrice,
          presentacion: displayPresentation,
          descripcion: displayDesc,
          imagen: currentImg,
        }}
      />
    </div>
  );
}
