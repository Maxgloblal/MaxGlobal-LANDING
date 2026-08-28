import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheck, Truck, Wallet, TrendingUp, MessageCircle, ArrowRight, Leaf, Shield, Award, Sparkles, Sprout, CheckCircle2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { EMPRESA } from '../config';
import { getProductos } from '../data/catalogo';

export default function Portada() {
  const waHeroMsg = 'Hola, quiero información sobre Max Global.';
  const waHeroUrl = `https://wa.me/${EMPRESA.whatsapp}?text=${encodeURIComponent(waHeroMsg)}`;

  // Exactamente 4 productos en cuadrícula de 2 líneas
  const previewProducts = getProductos().slice(0, 4);

  return (
    <div style={{ backgroundColor: 'var(--surface-page)', position: 'relative', overflow: 'hidden' }}>
      {/* 1. Hero Section con Elementos Botánicos & Diseños de Alto Impacto */}
      <section
        style={{
          position: 'relative',
          background: 'linear-gradient(180deg, var(--gold-50) 0%, #FFFFFF 85%, var(--surface-sunken) 100%)',
          padding: 'var(--section-y-loose) 0 0',
          overflow: 'hidden',
        }}
      >
        {/* Resplandores de luz ambiental (Solo Desktop) */}
        <div
          className="mg-bg-aurora mg-glow-gold"
          style={{ top: '-80px', left: '-60px', width: '420px', height: '420px' }}
        />
        <div
          className="mg-bg-aurora mg-glow-green"
          style={{ top: '20%', right: '-60px', width: '450px', height: '450px' }}
        />

        {/* Motivo Botánico Decorativo 1: Rama de Moringa (Solo Desktop) */}
        <svg
          className="mg-botanical-bg"
          style={{
            position: 'absolute',
            top: '20px',
            left: '-20px',
            width: '360px',
            height: '360px',
            opacity: 0.16,
            pointerEvents: 'none',
            zIndex: 0,
          }}
          viewBox="0 0 300 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 280 Q90 180 180 60 Q220 20 270 10"
            stroke="var(--brand-gold)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <ellipse cx="90" cy="190" rx="22" ry="12" transform="rotate(-35 90 190)" fill="var(--brand-green)" />
          <ellipse cx="130" cy="150" rx="24" ry="13" transform="rotate(40 130 150)" fill="var(--brand-gold)" />
          <ellipse cx="160" cy="110" rx="20" ry="11" transform="rotate(-30 160 110)" fill="var(--brand-green)" />
          <ellipse cx="200" cy="70" rx="22" ry="12" transform="rotate(45 200 70)" fill="var(--brand-gold)" />
          <ellipse cx="240" cy="35" rx="18" ry="10" transform="rotate(-20 240 35)" fill="var(--brand-green)" />
          <circle cx="270" cy="10" r="8" fill="var(--brand-gold)" />
        </svg>

        {/* Motivo Botánico Decorativo 2: Hojas y Flores de Crecimiento (Solo Desktop) */}
        <svg
          className="mg-botanical-bg"
          style={{
            position: 'absolute',
            top: '80px',
            right: '4%',
            width: '380px',
            height: '380px',
            opacity: 0.15,
            pointerEvents: 'none',
            zIndex: 0,
          }}
          viewBox="0 0 300 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M280 280 C200 240 120 160 80 40"
            stroke="var(--brand-green)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <ellipse cx="210" cy="220" rx="26" ry="14" transform="rotate(25 210 220)" fill="var(--brand-gold)" />
          <ellipse cx="160" cy="160" rx="24" ry="13" transform="rotate(-40 160 160)" fill="var(--brand-green)" />
          <ellipse cx="115" cy="100" rx="22" ry="12" transform="rotate(30 115 100)" fill="var(--brand-gold)" />
          <ellipse cx="80" cy="40" rx="20" ry="10" transform="rotate(-30 80 40)" fill="var(--brand-green)" />
          <circle cx="75" cy="35" r="7" fill="var(--brand-gold)" />
        </svg>

        <div className="mg-container mg-hero" style={{ position: 'relative', zIndex: 1 }}>
          {/* Bloque Textual */}
          <div className="mg-hero-text">
            {/* Insignia Botánica Flotante Destacada */}
            <div className="mg-hero-badge mg-animate-float">
              <Sprout size={16} color="var(--brand-green)" />
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--fs-2xs)',
                  fontWeight: 700,
                  letterSpacing: 'var(--ls-wide)',
                  color: 'var(--gold-700)',
                  textTransform: 'uppercase',
                }}
              >
                Superalimentos & Red de Éxito
              </span>
            </div>

            <div className="mg-hero-eyebrow-wrap" style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
              <div className="mg-ribbon-gold" />
              <span className="mg-eyebrow">Venta directa · Perú</span>
            </div>

            <h1
              className="mg-hero-title"
              style={{
                marginTop: 'var(--sp-4)',
                lineHeight: '1.02',
                maxWidth: '15ch',
              }}
            >
              Un negocio propio
            </h1>

            <p
              className="mg-hero-subtitle"
              style={{
                marginTop: 'var(--sp-3)',
                fontFamily: 'var(--font-subtitle)',
                fontWeight: 700,
                lineHeight: 'var(--lh-snug)',
                color: 'var(--text-strong)',
                maxWidth: '26ch',
              }}
            >
              con productos que la gente vuelve a comprar
            </p>

            <p
              className="mg-hero-desc"
              style={{
                marginTop: 'var(--sp-5)',
                maxWidth: '48ch',
                fontSize: 'var(--fs-md)',
                lineHeight: 'var(--lh-relaxed)',
                color: 'var(--text-body)',
              }}
            >
              Max Global es una empresa peruana de venta directa. Te damos el producto, el descuento y el plan de comisiones. Tú construyes tu red.
            </p>

            <div
              className="mg-hero-actions"
              style={{
                marginTop: 'var(--sp-7)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--sp-3)',
              }}
            >
              <Link
                to="/packs-de-afiliacion"
                className="mg-btn-hero-packs"
                data-testid="hero-btn-packs"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'var(--brand-gold)',
                  color: 'var(--n-700)',
                  fontFamily: 'var(--font-subtitle)',
                  fontWeight: 700,
                  fontSize: 'var(--fs-md)',
                  padding: '14px 28px',
                  borderRadius: 'var(--r-pill)',
                  border: 'none',
                  textDecoration: 'none',
                  transition: 'var(--t-control)',
                  boxShadow: 'var(--shadow-gold)',
                }}
              >
                Ver los packs
              </Link>

              <a
                href={waHeroUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mg-btn-hero-wa"
                data-testid="hero-btn-whatsapp"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--whatsapp)',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-subtitle)',
                  fontWeight: 700,
                  fontSize: 'var(--fs-md)',
                  padding: '14px 24px',
                  borderRadius: 'var(--r-pill)',
                  textDecoration: 'none',
                  transition: 'var(--t-control)',
                  boxShadow: '0 4px 14px rgba(27, 167, 65, 0.25)',
                }}
              >
                <MessageCircle size={20} color="#FFFFFF" />
                <span>Hablar por WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Bloque Visual: Fotografía de Producto + Barra de Estadísticas */}
          <div className="mg-hero-visual" style={{ position: 'relative' }}>
            <div className="mg-hero-img-wrap">
              <img
                src="/images/hero-products.webp"
                alt="Productos naturales Max Global"
                className="mg-hero-img"
              />
            </div>

            <div className="mg-stats">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'center' }}>
                <span className="mg-stat-val">8</span>
                <span className="mg-stat-lbl">productos</span>
              </div>
              <div className="mg-stat-sep"></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'center' }}>
                <span className="mg-stat-val">50%</span>
                <span className="mg-stat-lbl">descuento de socio</span>
              </div>
              <div className="mg-stat-sep"></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'center' }}>
                <span className="mg-stat-val">10</span>
                <span className="mg-stat-lbl">niveles</span>
              </div>
            </div>
          </div>
        </div>

        {/* Separador de Ola Orgánica Fluida */}
        <div className="mg-wave-divider" style={{ marginTop: 'var(--sp-8)' }}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z"
              fill="var(--surface-sunken)"
            />
          </svg>
        </div>
      </section>

      {/* 2. Barra de Confianza (Beneficios Verbatim del Manual de Marca) */}
      <section
        style={{
          backgroundColor: 'var(--surface-sunken)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: 'var(--sp-6) 0 var(--sp-8)',
          position: 'relative',
        }}
      >
        <div className="mg-container">
          <div className="mg-trust-grid">
            <div className="mg-trust-card">
              <div className="mg-badge-3d-green">
                <BadgeCheck size={26} color="#FFFFFF" strokeWidth={2.4} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: 'var(--fs-sm)', color: 'var(--text-strong)' }}>
                  Productos 100% naturales
                </strong>
              </div>
            </div>

            <div className="mg-trust-card">
              <div className="mg-badge-3d-gold">
                <Truck size={26} color="#FFFFFF" strokeWidth={2.4} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: 'var(--fs-sm)', color: 'var(--text-strong)' }}>
                  Envíos a todo el Perú
                </strong>
              </div>
            </div>

            <div className="mg-trust-card">
              <div className="mg-badge-3d-green">
                <Wallet size={26} color="#FFFFFF" strokeWidth={2.4} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: 'var(--fs-sm)', color: 'var(--text-strong)' }}>
                  Descuento de por vida para socios
                </strong>
              </div>
            </div>

            <div className="mg-trust-card">
              <div className="mg-badge-3d-gold">
                <TrendingUp size={26} color="#FFFFFF" strokeWidth={2.4} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: 'var(--fs-sm)', color: 'var(--text-strong)' }}>
                  Comisiones hasta 10 niveles
                </strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Sección de Tres Pasos con Tarjetas Luxury */}
      <section style={{ padding: 'var(--section-y) 0', position: 'relative' }}>
        {/* Glow de fondo (Solo Desktop) */}
        <div
          className="mg-bg-aurora mg-glow-gold"
          style={{ top: '15%', right: '-60px', width: '360px', height: '360px' }}
        />

        <div className="mg-container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-2)' }}>
            <div className="mg-ribbon-gold" />
            <span className="mg-eyebrow">Cómo funciona</span>
          </div>

          <h2 style={{ marginTop: 'var(--sp-3)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: 'var(--text-strong)' }}>
            Empezar toma tres pasos
          </h2>

          <div
            style={{
              marginTop: 'var(--sp-10)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--sp-6)',
            }}
          >
            {/* Paso 1 */}
            <div className="mg-luxury-card" style={{ padding: 'var(--sp-8)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--sp-5)' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--fs-3xl)',
                    color: 'var(--brand-gold)',
                    lineHeight: 1,
                  }}
                >
                  01
                </span>
                <div className="mg-badge-3d-gold">
                  <Wallet size={22} color="#FFFFFF" strokeWidth={2.4} />
                </div>
              </div>
              <h3 style={{ fontSize: 'var(--fs-lg)', color: 'var(--text-strong)', marginBottom: 'var(--sp-2)' }}>
                Eliges tu pack
              </h3>
              <p style={{ fontSize: 'var(--fs-sm)', lineHeight: 'var(--lh-relaxed)', color: 'var(--text-body)' }}>
                Desde S/. 120. Cada uno incluye producto y define hasta cuántos niveles cobras.
              </p>
            </div>

            {/* Paso 2 */}
            <div className="mg-luxury-card" style={{ padding: 'var(--sp-8)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--sp-5)' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--fs-3xl)',
                    color: 'var(--brand-green)',
                    lineHeight: 1,
                  }}
                >
                  02
                </span>
                <div className="mg-badge-3d-green">
                  <Truck size={22} color="#FFFFFF" strokeWidth={2.4} />
                </div>
              </div>
              <h3 style={{ fontSize: 'var(--fs-lg)', color: 'var(--text-strong)', marginBottom: 'var(--sp-2)' }}>
                Recibes tu producto
              </h3>
              <p style={{ fontSize: 'var(--fs-sm)', lineHeight: 'var(--lh-relaxed)', color: 'var(--text-body)' }}>
                Lo enviamos a tu dirección por agencia, a cualquier parte del Perú.
              </p>
            </div>

            {/* Paso 3 */}
            <div className="mg-luxury-card" style={{ padding: 'var(--sp-8)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--sp-5)' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--fs-3xl)',
                    color: 'var(--brand-gold)',
                    lineHeight: 1,
                  }}
                >
                  03
                </span>
                <div className="mg-badge-3d-gold">
                  <TrendingUp size={22} color="#FFFFFF" strokeWidth={2.4} />
                </div>
              </div>
              <h3 style={{ fontSize: 'var(--fs-lg)', color: 'var(--text-strong)', marginBottom: 'var(--sp-2)' }}>
                Empiezas a construir
              </h3>
              <p style={{ fontSize: 'var(--fs-sm)', lineHeight: 'var(--lh-relaxed)', color: 'var(--text-body)' }}>
                Compartes tu enlace, tu red compra, y cobras según el plan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Tira de 4 Productos (Cuadros de 2 Líneas, Sin Scroll Horizontal) */}
      <section
        style={{
          backgroundColor: 'var(--surface-sunken)',
          padding: 'var(--section-y) 0',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div className="mg-container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: 'var(--sp-4)',
              marginBottom: 'var(--sp-8)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-2)' }}>
                <div className="mg-ribbon-gold" />
                <span className="mg-eyebrow">Los productos</span>
              </div>
              <h2 style={{ marginTop: 'var(--sp-2)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: 'var(--text-strong)' }}>
                Nuestros productos
              </h2>
            </div>
            <Link
              to="/productos"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-subtitle)',
                fontWeight: 700,
                fontSize: 'var(--fs-sm)',
                color: 'var(--brand-gold)',
                textDecoration: 'none',
              }}
            >
              <span>Ver el catálogo completo</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Cuadrícula de 4 Productos en 2 Líneas (2x2) Sin Scroll Horizontal */}
          <div className="mg-products-2x2">
            {previewProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                id={prod.id}
                name={prod.name}
                price={prod.price}
                points={prod.points}
                category={prod.category}
                presentation={prod.presentation}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Las Cuatro Formas de Ganar (Dark Emerald Luxury) */}
      <section
        style={{
          position: 'relative',
          background: 'linear-gradient(145deg, #0A2214 0%, #041008 100%)',
          color: 'var(--text-on-dark)',
          padding: 'var(--section-y-loose) 0',
          overflow: 'hidden',
        }}
      >
        {/* Glow sutil en modo oscuro (Solo Desktop) */}
        <div
          className="mg-bg-aurora"
          style={{
            top: '15%',
            right: '-8%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(209, 173, 104, 0.16) 0%, transparent 70%)',
          }}
        />

        <div className="mg-container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-2)' }}>
            <div className="mg-ribbon-gold" />
            <span className="mg-eyebrow" style={{ color: 'var(--brand-gold)' }}>
              Plan de compensación
            </span>
          </div>

          <h2
            style={{
              marginTop: 'var(--sp-3)',
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              color: 'var(--text-on-dark)',
            }}
          >
            Las cuatro formas de ganar
          </h2>

          <p
            style={{
              marginTop: 'var(--sp-4)',
              maxWidth: '54ch',
              fontSize: 'var(--fs-md)',
              lineHeight: 'var(--lh-relaxed)',
              color: 'var(--n-300)',
            }}
          >
            El plan de compensación de Max Global tiene cuatro bonos. Así funciona cada uno.
          </p>

          <div style={{ marginTop: 'var(--sp-10)' }}>
            <div className="mg-row">
              <span className="mg-num">01</span>
              <span style={{ fontFamily: 'var(--font-subtitle)', fontWeight: 700, fontSize: 'var(--fs-lg)', color: 'var(--text-on-dark)' }}>
                Patrocinio
              </span>
              <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--n-300)', lineHeight: 'var(--lh-normal)' }}>
                Cuando alguien de tu red se afilia
              </span>
              <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--n-300)', lineHeight: 'var(--lh-normal)' }}>
                El precio de su pack, hasta 7 niveles
              </span>
            </div>

            <div className="mg-row">
              <span className="mg-num">02</span>
              <span style={{ fontFamily: 'var(--font-subtitle)', fontWeight: 700, fontSize: 'var(--fs-lg)', color: 'var(--text-on-dark)' }}>
                Residual
              </span>
              <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--n-300)', lineHeight: 'var(--lh-normal)' }}>
                Cada mes
              </span>
              <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--n-300)', lineHeight: 'var(--lh-normal)' }}>
                Las recompras de tu red, hasta 10 niveles
              </span>
            </div>

            <div className="mg-row">
              <span className="mg-num">03</span>
              <span style={{ fontFamily: 'var(--font-subtitle)', fontWeight: 700, fontSize: 'var(--fs-lg)', color: 'var(--text-on-dark)' }}>
                Rango
              </span>
              <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--n-300)', lineHeight: 'var(--lh-normal)' }}>
                Cada mes que califiques
              </span>
              <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--n-300)', lineHeight: 'var(--lh-normal)' }}>
                El volumen de tu grupo
              </span>
            </div>

            <div className="mg-row" style={{ borderBottom: '1px solid rgba(255,255,255,.14)' }}>
              <span className="mg-num">04</span>
              <span style={{ fontFamily: 'var(--font-subtitle)', fontWeight: 700, fontSize: 'var(--fs-lg)', color: 'var(--text-on-dark)' }}>
                Global
              </span>
              <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--n-300)', lineHeight: 'var(--lh-normal)' }}>
                Cada 6 meses
              </span>
              <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--n-300)', lineHeight: 'var(--lh-normal)' }}>
                1% del volumen de toda la compañía
              </span>
            </div>
          </div>

          <div style={{ marginTop: 'var(--sp-10)' }}>
            <Link
              to="/packs-de-afiliacion#comisiones"
              data-testid="btn-ver-plan-completo"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--brand-gold)',
                color: 'var(--n-700)',
                fontFamily: 'var(--font-subtitle)',
                fontWeight: 700,
                fontSize: 'var(--fs-md)',
                padding: '14px 28px',
                borderRadius: 'var(--r-pill)',
                textDecoration: 'none',
                transition: 'var(--t-control)',
                boxShadow: 'var(--shadow-gold)',
              }}
            >
              Ver el plan completo
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Banner de Cierre (Empieza hoy) con Acabado Oro */}
      <section style={{ padding: 'var(--section-y) 0', position: 'relative' }}>
        <div
          className="mg-container mg-close"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 'var(--sp-10)',
            alignItems: 'center',
            background: 'linear-gradient(135deg, var(--gold-50) 0%, rgba(255, 255, 255, 0.95) 50%, var(--surface-gold) 100%)',
            border: '2px solid var(--brand-gold)',
            borderRadius: 'var(--r-pack)',
            padding: 'clamp(var(--sp-8), 4vw, var(--sp-12))',
            boxShadow: '0 16px 40px rgba(209, 173, 104, 0.22)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Resplandor decorativo (Solo Desktop) */}
          <div
            className="mg-bg-aurora mg-glow-gold"
            style={{ top: '-40px', right: '-40px', width: '260px', height: '260px' }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-2)' }}>
              <div className="mg-ribbon-gold" />
              <span className="mg-eyebrow">Únete a Max Global</span>
            </div>
            <h2 style={{ fontSize: 'var(--fs-3xl)', color: 'var(--text-strong)' }}>Empieza hoy</h2>
            <p style={{ marginTop: 'var(--sp-3)', fontSize: 'var(--fs-md)', lineHeight: 'var(--lh-relaxed)', color: 'var(--n-600)', maxWidth: '44ch' }}>
              Elige tu pack o escríbenos y te explicamos cómo funciona.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-3)', position: 'relative', zIndex: 1 }}>
            <Link
              to="/packs-de-afiliacion"
              data-testid="close-btn-packs"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--brand-gold)',
                color: 'var(--n-700)',
                fontFamily: 'var(--font-subtitle)',
                fontWeight: 700,
                fontSize: 'var(--fs-md)',
                padding: '14px 28px',
                borderRadius: 'var(--r-pill)',
                border: 'none',
                textDecoration: 'none',
                transition: 'var(--t-control)',
                boxShadow: 'var(--shadow-gold)',
              }}
            >
              Ver los packs
            </Link>

            <a
              href={waHeroUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="close-btn-whatsapp"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: 'var(--whatsapp)',
                color: '#FFFFFF',
                fontFamily: 'var(--font-subtitle)',
                fontWeight: 700,
                fontSize: 'var(--fs-md)',
                padding: '14px 24px',
                borderRadius: 'var(--r-pill)',
                textDecoration: 'none',
                transition: 'var(--t-control)',
                boxShadow: '0 4px 14px rgba(27, 167, 65, 0.25)',
              }}
            >
              <MessageCircle size={20} color="#FFFFFF" />
              <span>Hablar por WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Media Queries & Responsive Overrides */}
      <style>{`
        /* Desktop */
        .mg-hero {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: var(--sp-10);
          align-items: center;
        }
        .mg-hero-text {
          order: 1;
        }
        .mg-hero-visual {
          order: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .mg-hero-img-wrap {
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .mg-hero-img {
          width: 100%;
          max-width: 480px;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 20px 35px rgba(0, 0, 0, 0.14));
          transition: transform 300ms ease;
        }
        .mg-stats {
          margin-top: var(--sp-6);
          display: inline-flex;
          align-items: center;
          gap: var(--sp-6);
          background-color: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
          border: 1.5px solid var(--brand-gold);
          border-radius: var(--r-card);
          padding: 16px 28px;
          box-shadow: 0 12px 30px rgba(209, 173, 104, 0.22);
        }
        .mg-stat-val {
          font-family: var(--font-display);
          font-size: var(--fs-2xl);
          color: var(--brand-gold);
          font-weight: 700;
          line-height: 1;
        }
        .mg-stat-lbl {
          font-family: var(--font-body);
          font-size: var(--fs-3xs);
          letter-spacing: var(--ls-wide);
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .mg-stat-sep {
          width: 1px;
          height: 32px;
          background-color: var(--border-subtle);
        }

        .mg-trust-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--sp-5);
          align-items: stretch;
        }

        /* 4 Formas de Ganar Filas */
        .mg-row {
          display: grid;
          grid-template-columns: 48px 180px 1fr 1fr;
          gap: var(--sp-6);
          align-items: center;
          padding: var(--sp-6) 0;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
        }
        .mg-num {
          font-family: var(--font-display);
          font-size: var(--fs-2xl);
          color: var(--brand-gold);
        }

        /* Mobile Adjustments */
        @media (max-width: 900px) {
          .mg-hero {
            display: flex;
            flex-direction: column;
            gap: var(--sp-5);
            text-align: center;
          }
          .mg-hero-badge {
            margin-inline: auto;
          }
          .mg-hero-eyebrow-wrap {
            justify-content: center;
          }
          .mg-hero-title {
            max-width: 100% !important;
            margin-inline: auto;
          }
          .mg-hero-subtitle {
            max-width: 100% !important;
            margin-inline: auto;
          }
          .mg-hero-desc {
            max-width: 100% !important;
            margin-inline: auto;
          }
          .mg-hero-actions {
            justify-content: center;
          }
          .mg-hero-actions > a {
            width: 100%;
            justify-content: center;
          }

          .mg-trust-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--sp-4);
          }

          .mg-row {
            grid-template-columns: 36px 1fr;
            gap: var(--sp-2);
          }
          .mg-close {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .mg-close > div {
            justify-content: center;
          }
          .mg-close a {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 540px) {
          .mg-trust-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
