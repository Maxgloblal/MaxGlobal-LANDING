import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { EMPRESA } from '../config';

export default function SiteFooter() {
  const empresaInfo = `${EMPRESA.razonSocial !== 'PENDIENTE' ? EMPRESA.razonSocial : '[Razón social]'} · RUC ${EMPRESA.ruc !== 'PENDIENTE' ? EMPRESA.ruc : '[número]'} · ${EMPRESA.domicilio !== 'PENDIENTE' ? EMPRESA.domicilio : '[domicilio fiscal]'}`;

  const linkStyle = {
    border: 'none',
    fontSize: 'var(--fs-sm)',
    color: 'var(--text-body)',
    textDecoration: 'none',
    transition: 'var(--t-control)',
  };

  return (
    <footer
      style={{
        background: 'var(--surface-page)',
        borderTop: '1px solid var(--border-subtle)',
        padding: 'var(--section-y-tight) 0 var(--sp-10)',
      }}
    >
      <div className="mg-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: 'var(--sp-8)',
          }}
        >
          {/* Columna 1: Marca */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="/brand/logo-color-horizontal.png"
                alt="Max Global Corporation"
                style={{
                  height: '36px',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>
            <p
              style={{
                marginTop: 'var(--sp-4)',
                fontSize: 'var(--fs-sm)',
                lineHeight: 'var(--lh-relaxed)',
                color: 'var(--text-muted)',
                maxWidth: '34ch',
              }}
            >
              Empresa peruana de venta directa de productos naturales.
            </p>
          </div>

          {/* Columna 2: Productos */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
            <span className="mg-eyebrow" style={{ color: 'var(--text-muted)' }}>
              Productos
            </span>
            <Link to="/productos" style={linkStyle}>
              Catálogo
            </Link>
            <Link to="/productos" style={linkStyle}>
              Cómo comprar
            </Link>
          </div>

          {/* Columna 3: Afiliación */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
            <span className="mg-eyebrow" style={{ color: 'var(--text-muted)' }}>
              Afiliación
            </span>
            <Link to="/packs-de-afiliacion" style={linkStyle}>
              Packs
            </Link>
            <Link to="/packs-de-afiliacion#comisiones" style={linkStyle}>
              Cómo funciona
            </Link>
            <Link to="/registro" style={linkStyle}>
              Registro
            </Link>
          </div>

          {/* Columna 4: Legal */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
            <span className="mg-eyebrow" style={{ color: 'var(--text-muted)' }}>
              Legal
            </span>
            <Link to="/terminos-y-condiciones" data-testid="footer-link-terminos" style={linkStyle}>
              Términos y condiciones
            </Link>
            <Link to="/politica-de-privacidad" data-testid="footer-link-privacidad" style={linkStyle}>
              Política de privacidad
            </Link>
            <Link
              to="/libro-de-reclamaciones"
              data-testid="footer-link-libro"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--r-sm)',
                padding: '8px 12px',
                fontSize: 'var(--fs-sm)',
                color: 'var(--text-strong)',
                fontWeight: 700,
                textDecoration: 'none',
                width: 'fit-content',
                marginTop: 'var(--sp-1)',
              }}
            >
              <BookOpen size={16} color="var(--brand-gold)" />
              <span>Libro de Reclamaciones</span>
            </Link>
          </div>
        </div>

        {/* Barra inferior */}
        <div
          style={{
            marginTop: 'var(--sp-10)',
            paddingTop: 'var(--sp-6)',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--sp-2) var(--sp-6)',
            justifyContent: 'space-between',
          }}
        >
          <p style={{ fontSize: 'var(--fs-2xs)', color: 'var(--text-muted)' }}>
            {empresaInfo}
          </p>
          <p style={{ fontSize: 'var(--fs-2xs)', color: 'var(--text-muted)' }}>
            © 2026 Max Global Corporation
          </p>
        </div>
      </div>
    </footer>
  );
}
