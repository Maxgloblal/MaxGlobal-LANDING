import React, { useState, useEffect } from 'react';

const ANNOUNCEMENTS = [
  'Envíos a todo el Perú',
  'Descuento de por vida para socios',
  'Packs desde S/ 120',
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [prefersReduced, setPrefersReduced] = useState(false);

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

  // Rotación con fundido en móvil cada 4s
  useEffect(() => {
    if (prefersReduced) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
        setFade(true);
      }, 400);
    }, 4000);

    return () => clearInterval(interval);
  }, [prefersReduced]);

  return (
    <aside
      className="mg-announcement-bar"
      aria-label="Anuncios importantes"
      data-testid="announcement-bar"
    >
      <div className="mg-container mg-announcement-inner">
        {/* Escritorio (>= 900 px): Los 3 quietos a la vez, separados por punto medio */}
        <div className="mg-announcement-desktop" data-testid="announcement-desktop">
          <span>{ANNOUNCEMENTS[0]}</span>
          <span className="mg-announcement-dot" aria-hidden="true">·</span>
          <span>{ANNOUNCEMENTS[1]}</span>
          <span className="mg-announcement-dot" aria-hidden="true">·</span>
          <span>{ANNOUNCEMENTS[2]}</span>
        </div>

        {/* Móvil (< 900 px): Uno a la vez con fundido suave */}
        <div
          className="mg-announcement-mobile"
          data-testid="announcement-mobile"
          style={{
            opacity: fade ? 1 : 0,
            transition: prefersReduced ? 'none' : 'opacity 400ms ease-in-out',
          }}
        >
          <span>{ANNOUNCEMENTS[currentIndex]}</span>
        </div>
      </div>
    </aside>
  );
}
