import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProductos } from '../data/catalogo';

export default function Productos() {
  const productos = getProductos();

  return (
    <div style={{ backgroundColor: 'var(--surface-page)' }}>
      {/* 1. Hero Section */}
      <section
        style={{
          position: 'relative',
          background: 'linear-gradient(180deg, var(--gold-50) 0%, var(--surface-page) 100%)',
          padding: 'var(--section-y-loose) 0 var(--section-y)',
          overflow: 'hidden',
        }}
      >
        {/* Glow de fondo */}
        <div
          className="mg-bg-aurora mg-glow-gold"
          style={{ top: '-40px', right: '-40px', width: '280px', height: '280px' }}
        />

        <div className="mg-container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-2)' }}>
            <div className="mg-ribbon-gold" />
            <span className="mg-eyebrow">Catálogo</span>
          </div>
          <h1 style={{ marginTop: 'var(--sp-3)', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}>
            Nuestros productos
          </h1>
          <p
            style={{
              marginTop: 'var(--sp-4)',
              maxWidth: '56ch',
              fontSize: 'var(--fs-md)',
              lineHeight: 'var(--lh-relaxed)',
              color: 'var(--text-body)',
            }}
          >
            Productos naturales de consumo diario. Los precios que ves son los de venta al público.{' '}
            <span style={{ color: 'var(--text-strong)', fontWeight: 700 }}>
              Como socio, los compras con 50% de descuento.
            </span>
          </p>
        </div>
      </section>

      {/* 2. Grid de Productos */}
      <section style={{ paddingBottom: 'var(--section-y)' }}>
        <div
          className="mg-container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'var(--sp-6)',
          }}
        >
          {productos.map((prod) => (
            <ProductCard
              key={prod.id}
              id={prod.id}
              name={prod.nombre}
              description={prod.descripcion}
              price={prod.precioPublico}
              points={prod.puntos}
              category={prod.categoria}
              presentation={prod.presentacion}
              image={prod.imagen}
            />
          ))}
        </div>
      </section>

      {/* 3. Banner Informativo para Socios */}
      <section
        style={{
          backgroundColor: 'var(--surface-page)',
          borderTop: '2px solid var(--brand-gold)',
          padding: 'var(--section-y-tight) 0',
          position: 'relative',
        }}
      >
        <div
          className="mg-container"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--sp-8)',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ maxWidth: '52ch' }}>
            <h3 style={{ fontSize: 'var(--fs-xl)' }}>Los socios pagan la mitad</h3>
            <p style={{ marginTop: 'var(--sp-3)', fontSize: 'var(--fs-md)', lineHeight: 'var(--lh-relaxed)' }}>
              Con cualquier pack desde S/. 360 compras todos estos productos con{' '}
              <span style={{ color: 'var(--text-strong)', fontWeight: 700 }}>
                50% de descuento, de por vida
              </span>.
            </p>
          </div>
          <Link
            to="/packs-de-afiliacion"
            data-testid="btn-productos-ver-packs"
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
            Ver los packs de afiliación
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 600px) {
          .mg-container > a, [data-testid="btn-productos-ver-packs"] {
            width: 100% !important;
            text-align: center !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </div>
  );
}
