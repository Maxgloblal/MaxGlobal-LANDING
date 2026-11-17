import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight, ChevronLeft, ChevronRight, BadgeCheck, Truck, Wallet, TrendingUp } from 'lucide-react';
import CatalogBanners from '../components/CatalogBanners';
import ProductCard from '../components/ProductCard';
import { EMPRESA, PACKS } from '../config';
import { getProductos, valorEnProducto } from '../data/catalogo';

const PORTADA_BANNERS = [
  {
    id: 'landing-1-marca',
    image: '/images/banners/landing-1-marca.webp',
    imageMobile: '/images/banners/landing-1-marca-movil.webp',
    alt: 'Max Global: Bienestar, nutrición y oportunidad de negocio independiente',
    to: '#como-funciona',
  },
  {
    id: 'landing-2-negocio',
    image: '/images/banners/landing-2-negocio.webp',
    imageMobile: '/images/banners/landing-2-negocio-movil.webp',
    alt: 'Packs de afiliación Max Global: Inicia tu negocio independiente con 50% de descuento en recompras',
    to: '/packs-de-afiliacion',
  },
  {
    id: 'landing-3-linea',
    image: '/images/banners/landing-3-linea.webp',
    imageMobile: '/images/banners/landing-3-linea-movil.webp',
    alt: 'Línea completa de productos naturales Max Global',
    to: '/productos',
  },
];

export default function Portada() {
  const waHeroMsg = 'Hola, quiero información sobre Max Global.';
  const waHeroUrl = `https://wa.me/${EMPRESA.whatsapp}?text=${encodeURIComponent(waHeroMsg)}`;

  // Todos los productos activos
  const allProducts = getProductos();
  // Duplicados para bucle continuo infinito
  const loopProducts = [...allProducts, ...allProducts];

  const marqueeRef = useRef(null);
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

  const scrollMarquee = (direction) => {
    if (marqueeRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      marqueeRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--surface-page)', position: 'relative', overflow: 'hidden' }}>
      {/* 1. Carrusel de 3 banners de marca */}
      <CatalogBanners banners={PORTADA_BANNERS} testIdPrefix="portada-banner" />

      {/* 2. Intro (Hero sin foto, con stats card dinámica) */}
      <section className="mg-intro">
        <div className="mg-container ig">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-2)' }}>
              <div className="mg-ribbon-gold" />
              <span className="mg-eyebrow">Venta directa · Perú</span>
            </div>

            <h1 className="mg-hero-title">
              Un negocio propio <em>con productos que la gente vuelve a comprar</em>
            </h1>

            <p className="lead">
              Max Global es una empresa peruana de venta directa. Te damos el producto, el descuento y el plan de comisiones. Tú construyes tu red.
            </p>

            <div className="bts">
              <Link
                to="/packs-de-afiliacion"
                className="mg-btn-hero-packs"
                data-testid="hero-btn-packs"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
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
                <span>Ver los packs</span>
                <ArrowRight size={18} />
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

          {/* Tarjeta de estadísticas dinámica */}
          <div className="stats" data-testid="portada-stats-card">
            <div>
              <b>{allProducts.length}</b>
              <span>productos</span>
            </div>
            <div>
              <b>50%</b>
              <span>descuento de socio</span>
            </div>
            <div>
              <b>10</b>
              <span>niveles</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Barra de Confianza (Beneficios del Manual de Marca) */}
      <section
        className="mg-trust-section"
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

      {/* 4. Cinta de productos (Reemplaza cuadrícula de 4) */}
      <section
        style={{
          backgroundColor: 'var(--surface-sunken)',
          padding: 'var(--section-y) 0 var(--sp-8)',
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
              marginBottom: 'var(--sp-6)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-2)' }}>
                <div className="mg-ribbon-gold" />
                <span className="mg-eyebrow">Los productos</span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: 'var(--text-strong)' }}>
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
        </div>

        {/* Marquesina continua de productos con ProductCard */}
        <div className="pr-mq-outer">
          <button
            type="button"
            className="pr-arrow pr-arrow-prev"
            onClick={() => scrollMarquee('left')}
            aria-label="Desplazar productos a la izquierda"
          >
            <ChevronLeft size={24} />
          </button>

          <div
            ref={marqueeRef}
            className="pr-mq"
            onMouseEnter={() => setIsMarqueePaused(true)}
            onMouseLeave={() => setIsMarqueePaused(false)}
            onTouchStart={() => setIsMarqueePaused(true)}
            onTouchEnd={() => setIsMarqueePaused(false)}
          >
            <div
              className="pr-in"
              style={{
                animationPlayState: isMarqueePaused ? 'paused' : 'running',
              }}
            >
              {loopProducts.map((prod, idx) => (
                <div key={`${prod.id}-${idx}`} className="pr-mq-card">
                  <ProductCard
                    id={prod.id}
                    name={prod.nombre || prod.name}
                    description={prod.descripcion || prod.description}
                    price={prod.precioPublico || prod.price}
                    points={prod.puntos || prod.points}
                    category={prod.categoria || prod.category}
                    presentation={prod.presentacion || prod.presentation}
                    image={prod.imagen || prod.image}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="pr-arrow pr-arrow-next"
            onClick={() => scrollMarquee('right')}
            aria-label="Desplazar productos a la derecha"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </section>

      {/* 5. Dos caminos (¿Qué quieres hoy?) */}
      <section style={{ padding: 'var(--section-y) 0', position: 'relative' }}>
        <div className="mg-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-2)' }}>
            <div className="mg-ribbon-gold" />
            <span className="mg-eyebrow">Elige tu camino</span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: 'var(--text-strong)' }}>
            ¿Qué quieres hoy?
          </h2>

          <div className="paths">
            {/* Camino 1: Comprar */}
            <Link to="/productos" className="pa" data-testid="camino-comprar">
              <img
                src="/images/landing/mujer-cafe.webp"
                alt="Consumidora disfrutando productos naturales Max Global"
                loading="lazy"
                width="640"
                height="440"
              />
              <div className="in">
                <span className="tag">Quiero comprar</span>
                <strong className="pa-title">Productos naturales</strong>
                <p>Pídelos por WhatsApp y te los enviamos a cualquier parte del Perú.</p>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'var(--brand-gold)',
                    color: 'var(--n-700)',
                    fontFamily: 'var(--font-subtitle)',
                    fontWeight: 700,
                    fontSize: 'var(--fs-sm)',
                    padding: '10px 20px',
                    borderRadius: 'var(--r-pill)',
                  }}
                >
                  <span>Ver productos</span>
                  <ArrowRight size={16} />
                </span>
              </div>
            </Link>

            {/* Camino 2: Emprender */}
            <Link to="/packs-de-afiliacion" className="pa em" data-testid="camino-emprender">
              <img
                src="/images/landing/equipo-azotea.webp"
                alt="Emprendedores socios independientes Max Global"
                loading="lazy"
                width="640"
                height="440"
              />
              <div className="in">
                <span className="tag">Quiero emprender</span>
                <strong className="pa-title">Un negocio propio</strong>
                <p>Compra con descuento de por vida y cobra comisiones hasta 10 niveles.</p>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'var(--brand-gold)',
                    color: 'var(--n-700)',
                    fontFamily: 'var(--font-subtitle)',
                    fontWeight: 700,
                    fontSize: 'var(--fs-sm)',
                    padding: '10px 20px',
                    borderRadius: 'var(--r-pill)',
                  }}
                >
                  <span>Ver los packs</span>
                  <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Empezar toma tres pasos con fotos */}
      <section id="como-funciona" style={{ padding: 'var(--section-y) 0', position: 'relative' }}>
        <div className="mg-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-2)' }}>
            <div className="mg-ribbon-gold" />
            <span className="mg-eyebrow">Cómo funciona</span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: 'var(--text-strong)' }}>
            Empezar toma tres pasos
          </h2>

          <div className="steps s3">
            {/* Paso 1 */}
            <article className="st">
              <div className="si">
                <img
                  src="/images/landing/paso-afiliate.webp"
                  alt="Paso 1: Eliges tu pack de afiliación"
                  loading="lazy"
                  width="400"
                  height="400"
                />
                <span>01</span>
              </div>
              <h3>Eliges tu pack</h3>
              <p>Desde S/. 120. Cada uno incluye producto y define hasta cuántos niveles cobras.</p>
            </article>

            {/* Paso 2 */}
            <article className="st">
              <div className="si">
                <img
                  src="/images/landing/paso-recibe.webp"
                  alt="Paso 2: Recibes tu producto por agencia"
                  loading="lazy"
                  width="400"
                  height="400"
                />
                <span>02</span>
              </div>
              <h3>Recibes tu producto</h3>
              <p>Lo enviamos a tu dirección por agencia, a cualquier parte del Perú.</p>
            </article>

            {/* Paso 3 */}
            <article className="st">
              <div className="si">
                <img
                  src="/images/landing/paso-equipo.webp"
                  alt="Paso 3: Empiezas a construir tu red"
                  loading="lazy"
                  width="400"
                  height="400"
                />
                <span>03</span>
              </div>
              <h3>Empiezas a construir</h3>
              <p>Compartes tu enlace, tu red compra, y cobras según el plan.</p>
            </article>
          </div>
        </div>
      </section>

      {/* 6. Plan de compensación (4 Bonos) + 5 Packs */}
      <section className="packs" id="plan">
        <div className="mg-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-2)' }}>
            <div className="mg-ribbon-gold" />
            <span className="mg-eyebrow" style={{ color: 'var(--brand-gold)' }}>
              Plan de compensación
            </span>
          </div>

          <h2>Las cuatro formas de ganar</h2>

          <p className="lead">
            El plan de compensación de Max Global tiene cuatro bonos. Así funciona cada uno.
          </p>

          <div className="bos">
            <div className="bo">
              <h3>Patrocinio</h3>
              <dl>
                <dt>Cuándo</dt>
                <dd>Cuando alguien de tu red se afilia</dd>
                <dt>Sobre qué</dt>
                <dd>El precio de su pack, hasta 7 niveles</dd>
              </dl>
            </div>

            <div className="bo">
              <h3>Residual</h3>
              <dl>
                <dt>Cuándo</dt>
                <dd>Cada mes</dd>
                <dt>Sobre qué</dt>
                <dd>Las recompras de tu red, hasta 10 niveles</dd>
              </dl>
            </div>

            <div className="bo">
              <h3>Rango</h3>
              <dl>
                <dt>Cuándo</dt>
                <dd>Cada mes que califiques</dd>
                <dt>Sobre qué</dt>
                <dd>El volumen de tu grupo</dd>
              </dl>
            </div>

            <div className="bo">
              <h3>Global</h3>
              <dl>
                <dt>Cuándo</dt>
                <dd>Cada 6 meses</dd>
                <dt>Sobre qué</dt>
                <dd>1% del volumen de toda la compañía</dd>
              </dl>
            </div>
          </div>

          {/* Grilla de los 5 Packs */}
          <div style={{ marginTop: '70px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-2)' }}>
              <div className="mg-ribbon-gold" />
              <span className="mg-eyebrow" style={{ color: 'var(--brand-gold)' }}>
                Packs de afiliación
              </span>
            </div>

            <h2>Elige cómo quieres empezar</h2>

            <div className="pks">
              {PACKS.map((pack) => {
                const valorProd = valorEnProducto(pack);
                const isHighlight = pack.destacado || pack.id === 'gold';

                return (
                  <Link
                    key={pack.id}
                    to={`/registro?pack=${pack.id}`}
                    className={`pk ${isHighlight ? 'hl' : ''}`}
                    data-testid={`pack-card-${pack.id}`}
                  >
                    {pack.etiqueta && <span className="rb">{pack.etiqueta}</span>}
                    <img
                      src={`/images/packs/icono-${pack.id}.svg`}
                      alt={`Insignia de ${pack.nombre}`}
                      width="96"
                      height="96"
                      loading="lazy"
                    />
                    <h3>{pack.nombre}</h3>
                    <b>S/. {pack.precio.toLocaleString('es-PE')}</b>

                    {valorProd ? (
                      <span className="tl">
                        Te llevas S/. {valorProd.toLocaleString('es-PE')} en producto
                      </span>
                    ) : (
                      <span className="tl ph2">&nbsp;</span>
                    )}

                    <p>{pack.lead}</p>
                  </Link>
                );
              })}
            </div>

            <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'center' }}>
              <Link
                to="/packs-de-afiliacion#comisiones"
                data-testid="btn-ver-plan-completo"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
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
                <span>Ver el plan completo</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Empieza hoy (Cierre con foto) */}
      <section className="end" id="cierre">
        <img
          src="/images/landing/cierre.webp"
          alt="Socios celebrando éxito en Max Global"
          loading="lazy"
          width="1280"
          height="520"
        />
        <div className="mg-container wrap">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-2)' }}>
            <div className="mg-ribbon-gold" />
            <span className="mg-eyebrow eb">Únete a Max Global</span>
          </div>

          <h2>Empieza hoy</h2>

          <p>Elige tu pack o escríbenos y te explicamos cómo funciona.</p>

          <div className="bts">
            <Link
              to="/packs-de-afiliacion"
              data-testid="close-btn-packs"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
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
              <span>Ver los packs</span>
              <ArrowRight size={18} />
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
    </div>
  );
}
