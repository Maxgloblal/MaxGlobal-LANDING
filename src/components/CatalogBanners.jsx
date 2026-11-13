import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

const BANNERS = [
  {
    id: 'banner-cafe-colageno',
    image: '/images/banners/banner-1-cafe-colageno.webp',
    imageMobile: '/images/banners/banner-1-cafe-colageno-movil.webp',
    alt: 'Coffee Capuccino y Colágeno Aeterna, S/ 150 cada uno',
    to: '/productos?categoria=Salud y Nutrición',
    targetFilter: { categoria: 'Salud y Nutrición', buscar: '' },
  },
  {
    id: 'banner-linea-moringa',
    image: '/images/banners/banner-2-linea-moringa.webp',
    imageMobile: '/images/banners/banner-2-linea-moringa-movil.webp',
    alt: 'Línea Moringa: aceite, cápsulas y polvo, desde S/ 50',
    to: '/productos?buscar=moringa',
    targetFilter: { buscar: 'moringa', categoria: '' },
  },
  {
    id: 'banner-packs',
    image: '/images/banners/banner-3-packs.webp',
    imageMobile: '/images/banners/banner-3-packs-movil.webp',
    alt: 'Packs de afiliación Max Global, desde S/ 120',
    to: '/packs-de-afiliacion',
    targetFilter: null,
  },
];

export default function CatalogBanners({ updateFilters }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const trackRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Detección de prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mql.matches);

    const handleChange = (e) => setPrefersReduced(e.matches);
    if (mql.addEventListener) {
      mql.addEventListener('change', handleChange);
      return () => mql.removeEventListener('change', handleChange);
    } else if (mql.addListener) {
      mql.addListener(handleChange);
      return () => mql.removeListener(handleChange);
    }
  }, []);

  // Función para desplazarse a una diapositiva específica
  const scrollToSlide = useCallback((index, smooth = true) => {
    if (!trackRef.current) return;
    const width = trackRef.current.clientWidth;
    trackRef.current.scrollTo({
      left: index * width,
      behavior: smooth && !prefersReduced ? 'smooth' : 'auto',
    });
  }, [prefersReduced]);

  // Intervalo de auto-avance cada 6 segundos
  useEffect(() => {
    if (isPaused || prefersReduced) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % BANNERS.length;
        scrollToSlide(next, true);
        return next;
      });
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused, prefersReduced, scrollToSlide]);

  // Mantener la posición al cambiar tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      scrollToSlide(currentIndex, false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex, scrollToSlide]);

  // Manejar scroll táctil / snap nativo
  const handleScroll = () => {
    if (!trackRef.current) return;
    const { scrollLeft, clientWidth } = trackRef.current;
    if (clientWidth > 0) {
      const idx = Math.round(scrollLeft / clientWidth);
      if (idx >= 0 && idx < BANNERS.length && idx !== currentIndex) {
        setCurrentIndex(idx);
      }
    }
  };

  // Gestos táctiles
  const handleTouchStart = (e) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      const next = (currentIndex + 1) % BANNERS.length;
      setCurrentIndex(next);
      scrollToSlide(next, true);
    } else if (diff < -45) {
      const prev = (currentIndex - 1 + BANNERS.length) % BANNERS.length;
      setCurrentIndex(prev);
      scrollToSlide(prev, true);
    }
    setIsPaused(false);
  };

  // Manejo de clic en banners interactivos
  const handleBannerClick = (e, banner) => {
    if (banner.targetFilter) {
      e.preventDefault();
      if (typeof updateFilters === 'function') {
        updateFilters(banner.targetFilter);
      }
      const grid = document.getElementById('catalogo-grilla');
      if (grid && typeof grid.scrollIntoView === 'function') {
        grid.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const goToSlide = (idx) => {
    setCurrentIndex(idx);
    scrollToSlide(idx, true);
  };

  return (
    <section
      className="mg-catalog-banners-section"
      aria-label="Banners comerciales y promociones"
      style={{
        padding: 0,
        margin: 0,
        width: '100%',
        backgroundColor: 'var(--surface-page)',
      }}
    >
      <div className="mg-carousel-container">
        {/* Carrusel de Diapositivas */}
        <div
          ref={trackRef}
          className="mg-carousel-track"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onScroll={handleScroll}
        >
          {BANNERS.map((banner, idx) => (
            <Link
              key={banner.id}
              to={banner.to}
              data-testid={`catalog-banner-${idx}`}
              onClick={(e) => handleBannerClick(e, banner)}
              style={{
                flex: '0 0 100%',
                width: '100%',
                height: '100%',
                scrollSnapAlign: 'start',
                scrollSnapStop: 'always',
                display: 'block',
                textDecoration: 'none',
                position: 'relative',
                cursor: 'pointer',
              }}
              aria-label={banner.alt}
            >
              <picture style={{ display: 'block', width: '100%', height: '100%' }}>
                <source media="(max-width: 640px)" srcSet={banner.imageMobile} />
                <img
                  src={banner.image}
                  alt={banner.alt}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  fetchPriority={idx === 0 ? 'high' : undefined}
                  width="2560"
                  height="720"
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    objectFit: 'contain',
                  }}
                />
              </picture>
            </Link>
          ))}
        </div>

        {/* Puntos de Navegación (Dots) */}
        <div
          className="mg-carousel-dots"
          role="tablist"
          aria-label="Selector de diapositivas"
        >
          {BANNERS.map((b, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Ir al banner ${idx + 1}: ${b.alt}`}
                data-testid={`banner-dot-${idx}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  goToSlide(idx);
                }}
                style={{
                  width: isActive ? '24px' : '8px',
                  height: '8px',
                  borderRadius: 'var(--r-pill)',
                  backgroundColor: isActive ? 'var(--brand-gold)' : 'rgba(255, 255, 255, 0.75)',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: prefersReduced ? 'none' : 'all 0.3s ease',
                  outline: 'none',
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
