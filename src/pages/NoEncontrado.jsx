import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function NoEncontrado() {
  return (
    <div
      style={{
        backgroundColor: 'var(--surface-page)',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--section-y-loose) 0',
      }}
    >
      <div className="mg-container" style={{ maxWidth: '600px', textAlign: 'center' }}>
        {/* Número 404 con diseño de marca */}
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4.5rem, 12vw, 7.5rem)',
            color: 'var(--brand-gold)',
            lineHeight: 1,
            marginBottom: 'var(--sp-2)',
            letterSpacing: 'var(--ls-display)',
            textShadow: '0 4px 20px rgba(209, 173, 104, 0.25)',
          }}
        >
          404
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-4)' }}>
          <div className="mg-ribbon-gold" />
          <span className="mg-eyebrow">Página no encontrada</span>
          <div className="mg-ribbon-gold" />
        </div>

        <h1
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
            color: 'var(--text-strong)',
            marginBottom: 'var(--sp-4)',
          }}
        >
          Esta página no existe
        </h1>

        <p
          style={{
            fontSize: 'var(--fs-md)',
            lineHeight: 'var(--lh-relaxed)',
            color: 'var(--text-body)',
            marginBottom: 'var(--sp-8)',
          }}
        >
          Puede que el enlace esté mal escrito o que la página se haya movido.
        </p>

        {/* Botones de acción */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--sp-4)',
            justifyContent: 'center',
          }}
        >
          <Link
            to="/"
            data-testid="btn-404-home"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              backgroundColor: 'var(--brand-gold)',
              color: 'var(--n-700)',
              fontFamily: 'var(--font-subtitle)',
              fontWeight: 700,
              fontSize: 'var(--fs-sm)',
              padding: '14px 24px',
              borderRadius: 'var(--r-pill)',
              textDecoration: 'none',
              boxShadow: 'var(--shadow-gold)',
              transition: 'transform var(--dur-fast) var(--ease-out)',
            }}
          >
            <ArrowLeft size={18} />
            <span>Ir al inicio</span>
          </Link>

          <Link
            to="/productos"
            data-testid="btn-404-productos"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              backgroundColor: 'var(--surface-sunken)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-strong)',
              fontFamily: 'var(--font-subtitle)',
              fontWeight: 700,
              fontSize: 'var(--fs-sm)',
              padding: '14px 24px',
              borderRadius: 'var(--r-pill)',
              textDecoration: 'none',
              transition: 'background-color var(--dur-fast) var(--ease-out)',
            }}
          >
            <ShoppingBag size={18} />
            <span>Ver los productos</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
