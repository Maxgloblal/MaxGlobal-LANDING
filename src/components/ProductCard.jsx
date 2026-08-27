import React, { useState, useEffect } from 'react';
import { MessageCircle, Sparkles, Leaf, ShieldCheck } from 'lucide-react';
import { EMPRESA } from '../config';
import { precioSocio, mejorDescuento } from '../data/catalogo';

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
  phone,
  waMessage,
}) {
  const [refCode, setRefCode] = useState('');

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

  const targetPhone = phone || EMPRESA.whatsapp;
  const defaultMsg = waMessage || `Hola, quiero pedir ${displayName} (${formattedPrice}).`;
  const finalMsg = refCode ? `${defaultMsg}\nRef: ${refCode}` : defaultMsg;
  const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(finalMsg)}`;

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
      {/* Imagen / Placeholder con Sello de Calidad */}
      <div
        style={{
          width: '100%',
          height: '180px',
          borderRadius: 'var(--r-md)',
          backgroundColor: 'var(--surface-gold)',
          border: '1px solid var(--border-gold)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 'var(--sp-3)',
          marginBottom: 'var(--sp-3)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {displayImage ? (
          <img
            src={displayImage}
            alt={displayName}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            onError={(e) => {
              // Si la imagen falla al cargar, mostrar el placeholder neutro
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : null}

        {/* Placeholder neutro cuando no hay imagen o falla */}
        <div
          style={{
            display: displayImage ? 'none' : 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Leaf size={28} color="var(--brand-gold)" />
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

        {/* Badge 100% Natural */}
        <div
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(4px)',
            borderRadius: 'var(--r-pill)',
            padding: '2px 8px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '9px',
            fontWeight: 700,
            color: 'var(--brand-green)',
            border: '1px solid var(--border-green)',
          }}
        >
          <ShieldCheck size={12} />
          <span>ORIGINAL</span>
        </div>
      </div>

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
          {displayName}
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

      {/* Llamada a la acción — todo el pedido va por WhatsApp */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-testid={`btn-order-wa-${id}`}
        aria-label={`Pedir ${displayName} por WhatsApp`}
        style={{
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          backgroundColor: 'var(--whatsapp)',
          color: '#FFFFFF',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-sm)',
          fontWeight: 700,
          textDecoration: 'none',
          padding: '12px 16px',
          borderRadius: 'var(--r-sm)',
          transition: 'background-color var(--dur-fast) var(--ease-out)',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--whatsapp-dark)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--whatsapp)'; }}
      >
        <MessageCircle size={18} aria-hidden="true" />
        Pedir por WhatsApp
      </a>
    </div>
  );
}
