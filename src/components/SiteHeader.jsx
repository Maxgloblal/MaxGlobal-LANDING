import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MessageCircle, Menu, X } from 'lucide-react';
import { EMPRESA } from '../config';

export default function SiteHeader({ active, refName }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [referral, setReferral] = useState(refName || '');

  useEffect(() => {
    if (!referral) {
      const storedRef = sessionStorage.getItem('mg_ref');
      if (storedRef) {
        setReferral(storedRef);
      }
    }
  }, [referral]);

  const refLabel = referral ? `Te recomendó: ${referral}` : '';
  const waMsg = referral
    ? `Hola, quiero información sobre Max Global.\nRef: ${referral}`
    : 'Hola, quiero información sobre Max Global.';
  const waUrl = `https://wa.me/${EMPRESA.whatsapp}?text=${encodeURIComponent(waMsg)}`;

  const navLinkStyle = ({ isActive }) => ({
    border: 'none',
    fontSize: 'var(--fs-sm)',
    color: isActive ? 'var(--text-strong)' : 'var(--text-body)',
    fontWeight: isActive ? 700 : 400,
    textDecoration: 'none',
    transition: 'var(--t-control)',
    padding: '8px 0',
  });

  const mobileNavLinkStyle = ({ isActive }) => ({
    border: 'none',
    fontSize: 'var(--fs-md)',
    color: isActive ? 'var(--brand-gold)' : 'var(--text-strong)',
    fontWeight: isActive ? 700 : 500,
    textDecoration: 'none',
    padding: '12px 14px',
    borderRadius: 'var(--r-sm)',
    backgroundColor: isActive ? 'var(--surface-gold)' : 'transparent',
    display: 'flex',
    alignItems: 'center',
    transition: 'var(--t-control)',
  });

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div
        className="mg-container mg-head-inner"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--sp-6)',
          height: '76px',
        }}
      >
        {/* Logotipo Oficial */}
        <Link
          to="/"
          style={{
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
          }}
        >
          <img
            src="/brand/logo-color-horizontal.png"
            alt="Max Global"
            style={{
              height: '38px',
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </Link>

        {/* Navegación de escritorio */}
        <nav
          className="mg-head-nav"
          style={{
            display: 'flex',
            gap: 'var(--sp-6)',
            alignItems: 'center',
          }}
        >
          <NavLink
            to="/productos"
            data-testid="nav-productos"
            className={({ isActive }) => (isActive ? 'active' : '')}
            style={navLinkStyle}
          >
            Productos
          </NavLink>
          <NavLink
            to="/packs-de-afiliacion"
            data-testid="nav-packs"
            className={({ isActive }) => (isActive ? 'active' : '')}
            style={navLinkStyle}
          >
            Packs
          </NavLink>
          <NavLink
            to="/nosotros"
            data-testid="nav-nosotros"
            className={({ isActive }) => (isActive ? 'active' : '')}
            style={navLinkStyle}
          >
            Nosotros
          </NavLink>
        </nav>

        {/* Indicador de referido en escritorio */}
        {refLabel && (
          <span
            className="mg-head-ref"
            data-testid="head-ref"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-2xs)',
              color: 'var(--text-muted)',
              borderLeft: '1px solid var(--border-subtle)',
              paddingLeft: 'var(--sp-4)',
              whiteSpace: 'nowrap',
            }}
          >
            {refLabel}
          </span>
        )}

        {/* Botón WhatsApp Escritorio */}
        <div
          className="mg-head-wa"
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="head-whatsapp"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--whatsapp)',
              color: '#FFFFFF',
              padding: '10px 20px',
              borderRadius: 'var(--r-pill)',
              fontSize: 'var(--fs-sm)',
              fontFamily: 'var(--font-subtitle)',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'var(--t-control)',
            }}
          >
            <MessageCircle size={18} color="#FFFFFF" />
            <span>Hablar por WhatsApp</span>
          </a>
        </div>

        {/* Botón Menú Hamburguesa (Móvil) */}
        <button
          className="mg-head-burger"
          data-testid="nav-burger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          style={{
            display: 'none',
            marginLeft: 'auto',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '10px',
            borderRadius: 'var(--r-sm)',
            color: 'var(--text-strong)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Menú Desplegable Móvil */}
      {mobileOpen && (
        <div
          data-testid="mobile-menu"
          style={{
            backgroundColor: 'var(--surface-page)',
            borderTop: '1px solid var(--border-subtle)',
            padding: 'var(--sp-4) var(--page-pad-mobile) var(--sp-6)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--sp-2)',
            boxShadow: 'var(--shadow-md)',
            animation: 'fadeIn 200ms ease-out',
          }}
        >
          {refLabel && (
            <div
              data-testid="mobile-head-ref"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--fs-xs)',
                color: 'var(--gold-700)',
                backgroundColor: 'var(--surface-gold)',
                padding: '8px 12px',
                borderRadius: 'var(--r-sm)',
                marginBottom: 'var(--sp-2)',
                fontWeight: 700,
              }}
            >
              {refLabel}
            </div>
          )}
          <NavLink
            to="/productos"
            data-testid="mobile-nav-productos"
            onClick={() => setMobileOpen(false)}
            style={mobileNavLinkStyle}
          >
            Productos
          </NavLink>
          <NavLink
            to="/packs-de-afiliacion"
            data-testid="mobile-nav-packs"
            onClick={() => setMobileOpen(false)}
            style={mobileNavLinkStyle}
          >
            Packs de Afiliación
          </NavLink>
          <NavLink
            to="/nosotros"
            data-testid="mobile-nav-nosotros"
            onClick={() => setMobileOpen(false)}
            style={mobileNavLinkStyle}
          >
            Sobre Nosotros
          </NavLink>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="mobile-nav-whatsapp"
            onClick={() => setMobileOpen(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              backgroundColor: 'var(--whatsapp)',
              color: '#FFFFFF',
              padding: '14px 20px',
              borderRadius: 'var(--r-pill)',
              fontSize: 'var(--fs-md)',
              fontFamily: 'var(--font-subtitle)',
              fontWeight: 700,
              textDecoration: 'none',
              marginTop: 'var(--sp-3)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <MessageCircle size={20} color="#FFFFFF" />
            <span>Hablar por WhatsApp</span>
          </a>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 1060px) {
          .mg-head-ref { display: none !important; }
        }
        @media (max-width: 900px) {
          .mg-head-inner { height: 64px !important; }
          .mg-head-nav, .mg-head-wa, .mg-head-ref { display: none !important; }
          .mg-head-burger { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}
