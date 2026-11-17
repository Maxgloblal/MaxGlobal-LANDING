import React from 'react';

const ITEMS = [
  'Productos 100% naturales',
  'Envíos a todo el Perú',
  'Descuento de por vida para socios',
  'Comisiones hasta 10 niveles',
  'Packs desde S/ 120',
  'Venta directa en todo el Perú',
];

export default function TickerBand({ dark = false, variant }) {
  const isDark = dark || variant === 'dark';
  const displayItems = [...ITEMS, ...ITEMS];

  return (
    <div
      className={`tk ${isDark ? 'dk' : ''}`}
      aria-hidden="true"
      data-testid={isDark ? 'ticker-band-dark' : 'ticker-band-gold'}
    >
      <div className="tk-in">
        {displayItems.map((item, idx) => (
          <React.Fragment key={idx}>
            <span>{item}</span>
            <i>✦</i>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
