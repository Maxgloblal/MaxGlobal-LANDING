import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ShoppingBag, MessageCircle, Plus, Minus, Leaf, CheckCircle2 } from 'lucide-react';
import { getProducto, getProductosRelacionados, mejorDescuento, precioSocio } from '../data/catalogo';
import { EMPRESA } from '../config';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import NoEncontrado from './NoEncontrado';

export default function ProductoDetalle() {
  const { id } = useParams();
  const producto = getProducto(id);

  if (!producto) {
    return <NoEncontrado />;
  }

  const [cantidad, setCantidad] = useState(1);
  const [imgError, setImgError] = useState(false);
  const [refCode, setRefCode] = useState('');

  let cart = null;
  try {
    cart = useCart();
  } catch {
    cart = null;
  }

  useEffect(() => {
    const storedRef = sessionStorage.getItem('mg_ref');
    if (storedRef) {
      setRefCode(storedRef);
    }
  }, []);

  const maxDiscount = mejorDescuento();
  const partnerPriceFrom = precioSocio(producto.precioPublico, maxDiscount);
  const relacionados = getProductosRelacionados(producto.id, 3);

  // Mensaje directo para WhatsApp
  const waMsg = `Hola Max Global, deseo consultar y pedir ${cantidad}× ${producto.nombre} (Total público: S/. ${producto.precioPublico * cantidad}, ${producto.puntos * cantidad} pts)${refCode ? ` - Mi código de socio: ${refCode}` : ''}.`;
  const waUrl = `https://wa.me/${EMPRESA.whatsapp}?text=${encodeURIComponent(waMsg)}`;

  return (
    <div style={{ backgroundColor: 'var(--surface-page)', minHeight: '85vh' }}>
      {/* 1. Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        style={{
          padding: 'var(--sp-4) 0',
          borderBottom: '1px solid var(--border-subtle)',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div className="mg-container">
          <ol
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              fontSize: 'var(--fs-xs)',
              color: 'var(--text-muted)',
            }}
          >
            <li>
              <Link
                to="/"
                style={{
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  transition: 'color var(--dur-fast) var(--ease-out)',
                }}
              >
                Inicio
              </Link>
            </li>
            <li aria-hidden="true" style={{ display: 'flex', alignItems: 'center' }}>
              <ChevronRight size={14} color="var(--border-subtle)" />
            </li>
            <li>
              <Link
                to="/productos"
                style={{
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  transition: 'color var(--dur-fast) var(--ease-out)',
                }}
              >
                Productos
              </Link>
            </li>
            <li aria-hidden="true" style={{ display: 'flex', alignItems: 'center' }}>
              <ChevronRight size={14} color="var(--border-subtle)" />
            </li>
            <li aria-current="page" style={{ color: 'var(--text-strong)', fontWeight: 700 }}>
              {producto.nombre}
            </li>
          </ol>
        </div>
      </nav>

      {/* 2. Ficha del Producto */}
      <section style={{ padding: 'var(--section-y) 0' }}>
        <div className="mg-container">
          <div className="mg-detail-grid">
            {/* Columna Izquierda: Imagen Grande */}
            <div
              className="mg-detail-img-box"
              style={{
                borderRadius: 'var(--r-card)',
                backgroundColor: producto.imagen && !imgError ? '#F8F9FA' : 'var(--surface-gold)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-sm)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '360px',
                maxHeight: '480px',
                position: 'relative',
              }}
            >
              {producto.imagen && !imgError ? (
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  data-testid="detail-product-img"
                  style={{
                    width: '100%',
                    height: '100%',
                    maxHeight: '480px',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div
                  data-testid="detail-product-placeholder"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    padding: 'var(--sp-8)',
                    textAlign: 'center',
                  }}
                >
                  <Leaf size={48} color="var(--brand-gold)" />
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--fs-sm)',
                      letterSpacing: 'var(--ls-wide)',
                      textTransform: 'uppercase',
                      color: 'var(--gold-700)',
                      fontWeight: 700,
                    }}
                  >
                    100% Natural · Max Global
                  </span>
                </div>
              )}
            </div>

            {/* Columna Derecha: Información y Acciones */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Categoría */}
              {producto.categoria && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', marginBottom: 'var(--sp-2)' }}>
                  <div className="mg-ribbon-gold" />
                  <span className="mg-eyebrow" data-testid="detail-category">
                    {producto.categoria}
                  </span>
                </div>
              )}

              {/* Nombre y Puntos */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: 'var(--sp-3)',
                  marginBottom: 'var(--sp-3)',
                }}
              >
                <h1
                  data-testid="detail-product-name"
                  style={{
                    fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                    color: 'var(--text-strong)',
                    margin: 0,
                    lineHeight: 'var(--lh-tight)',
                  }}
                >
                  {producto.nombre}
                </h1>
                {producto.puntos !== undefined && (
                  <span
                    data-testid="detail-points"
                    style={{
                      backgroundColor: 'var(--surface-green)',
                      color: 'var(--green-600)',
                      border: '1px solid var(--border-green)',
                      padding: '4px 12px',
                      borderRadius: 'var(--r-pill)',
                      fontSize: 'var(--fs-xs)',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {producto.puntos} pts
                  </span>
                )}
              </div>

              {/* Presentación (Solo si está definida) */}
              {producto.presentacion && (
                <div
                  data-testid="detail-presentation"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: 'var(--fs-sm)',
                    color: 'var(--text-muted)',
                    marginBottom: 'var(--sp-4)',
                    fontWeight: 600,
                  }}
                >
                  <span>Presentación:</span>
                  <span style={{ color: 'var(--text-strong)' }}>{producto.presentacion}</span>
                </div>
              )}

              {/* Descripción */}
              <p
                data-testid="detail-description"
                style={{
                  fontSize: 'var(--fs-md)',
                  lineHeight: 'var(--lh-relaxed)',
                  color: 'var(--text-body)',
                  marginBottom: 'var(--sp-6)',
                }}
              >
                {producto.descripcion}
              </p>

              {/* Cuadro de Precios */}
              <div
                style={{
                  backgroundColor: 'var(--surface-sunken)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--r-md)',
                  padding: 'var(--sp-5)',
                  marginBottom: 'var(--sp-6)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--sp-2)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)' }}>Precio al público:</span>
                  <span
                    data-testid="detail-price-publico"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--fs-2xl)',
                      color: 'var(--text-strong)',
                      letterSpacing: 'var(--ls-display)',
                    }}
                  >
                    S/. {producto.precioPublico}
                  </span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    paddingTop: 'var(--sp-2)',
                    borderTop: '1px dashed var(--border-subtle)',
                  }}
                >
                  <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--brand-green)', fontWeight: 700 }}>
                    Los socios pagan desde:
                  </span>
                  <span
                    data-testid="detail-price-partner"
                    style={{
                      fontSize: 'var(--fs-lg)',
                      color: 'var(--brand-green)',
                      fontWeight: 800,
                    }}
                  >
                    S/. {partnerPriceFrom}
                  </span>
                </div>
              </div>

              {/* Selector de Cantidad y Botones de Acción */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
                {/* Selector de Cantidad */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)' }}>
                  <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-body)', fontWeight: 600 }}>Cantidad:</span>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--r-sm)',
                      padding: '2px',
                    }}
                  >
                    <button
                      onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                      data-testid="detail-btn-minus"
                      aria-label="Disminuir cantidad"
                      style={{
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 'none',
                        background: 'transparent',
                        color: 'var(--text-strong)',
                        cursor: 'pointer',
                      }}
                    >
                      <Minus size={16} />
                    </button>
                    <span
                      data-testid="detail-qty-display"
                      style={{
                        minWidth: '36px',
                        textAlign: 'center',
                        fontWeight: 700,
                        fontSize: 'var(--fs-sm)',
                      }}
                    >
                      {cantidad}
                    </span>
                    <button
                      onClick={() => setCantidad(cantidad + 1)}
                      data-testid="detail-btn-plus"
                      aria-label="Aumentar cantidad"
                      style={{
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 'none',
                        background: 'transparent',
                        color: 'var(--text-strong)',
                        cursor: 'pointer',
                      }}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Botones */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-3)', marginTop: 'var(--sp-2)' }}>
                  <button
                    onClick={() => {
                      if (cart) {
                        cart.addItem(producto, cantidad);
                        cart.openCart();
                      }
                    }}
                    data-testid="detail-btn-add-cart"
                    style={{
                      flex: '1 1 200px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      backgroundColor: 'var(--brand-gold)',
                      color: 'var(--n-700)',
                      fontFamily: 'var(--font-subtitle)',
                      fontSize: 'var(--fs-md)',
                      fontWeight: 700,
                      padding: '14px 24px',
                      borderRadius: 'var(--r-sm)',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: 'var(--shadow-gold)',
                      transition: 'var(--t-control)',
                    }}
                  >
                    <ShoppingBag size={20} />
                    <span>Agregar al pedido</span>
                  </button>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="detail-btn-whatsapp"
                    style={{
                      flex: '1 1 200px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      backgroundColor: 'var(--brand-green)',
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-subtitle)',
                      fontSize: 'var(--fs-md)',
                      fontWeight: 700,
                      padding: '14px 24px',
                      borderRadius: 'var(--r-sm)',
                      textDecoration: 'none',
                      transition: 'var(--t-control)',
                    }}
                  >
                    <MessageCircle size={20} />
                    <span>Pedir por WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Productos Relacionados */}
      {relacionados.length > 0 && (
        <section
          style={{
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid var(--border-subtle)',
            padding: 'var(--section-y) 0',
          }}
        >
          <div className="mg-container">
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-3)' }}>
              <div className="mg-ribbon-gold" />
              <span className="mg-eyebrow">Catálogo</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', marginBottom: 'var(--sp-6)' }}>
              Productos relacionados
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: 'var(--sp-6)',
              }}
            >
              {relacionados.map((rel) => (
                <ProductCard
                  key={rel.id}
                  id={rel.id}
                  name={rel.nombre}
                  description={rel.descripcion}
                  price={rel.precioPublico}
                  points={rel.puntos}
                  category={rel.categoria}
                  presentation={rel.presentacion}
                  image={rel.imagen}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        .mg-detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(24px, 5vw, 56px);
          align-items: start;
        }
        @media (max-width: 768px) {
          .mg-detail-grid {
            grid-template-columns: 1fr !important;
            gap: var(--sp-6) !important;
          }
          .mg-detail-img-box {
            min-height: 280px !important;
            max-height: 360px !important;
          }
          [data-testid="detail-btn-add-cart"],
          [data-testid="detail-btn-whatsapp"] {
            width: 100% !important;
            flex: 1 1 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
