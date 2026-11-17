import React from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { valorEnProducto as calcularValor } from '../data/catalogo';

export default function PackCard({
  id,
  name,
  price,
  lead,
  features = [],
  cta = 'Elegir Pack',
  featured = false,
  ribbon = '',
  valorEnProducto: valorEnProductoProp,
  pack,
  onSelect,
}) {
  const navigate = useNavigate();

  const handleSelect = () => {
    if (onSelect) {
      onSelect(id);
    } else {
      navigate(`/registro?pack=${encodeURIComponent(id || '')}`);
    }
  };

  const valor =
    valorEnProductoProp !== undefined
      ? valorEnProductoProp
      : pack
      ? calcularValor(pack)
      : id
      ? calcularValor(id)
      : null;

  return (
    <div
      className={`mg-pack-card ${featured ? 'mg-pack-card-gold' : ''}`}
      data-testid={`pack-card-${id || 'pack'}`}
    >
      {/* Ribbon / Badge si es destacado (centrado arriba) */}
      {ribbon && (
        <div className="mg-pack-ribbon">
          {ribbon}
        </div>
      )}

      {/* 1. Insignia: Arriba de todo en cada tarjeta, centrada */}
      <img
        src={`/images/packs/icono-${id}.svg`}
        alt=""
        className="mg-pack-insignia"
        width="112"
        height="112"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />

      {/* 2. Nombre (centrado) */}
      <h3
        style={{
          fontSize: 'var(--fs-lg)',
          color: featured ? 'var(--n-0)' : 'var(--text-strong)',
          marginBottom: 'var(--sp-2)',
          textAlign: 'center',
          fontWeight: 700,
        }}
      >
        {name}
      </h3>

      {/* 3. Precio (centrado) */}
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--fs-3xl)',
          color: featured ? 'var(--brand-gold)' : 'var(--text-strong)',
          letterSpacing: 'var(--ls-display)',
          textTransform: 'uppercase',
          marginBottom: 'var(--sp-2)',
          textAlign: 'center',
          lineHeight: 1.1,
        }}
      >
        {price}
      </div>

      {/* 4. "Te llevas S/ X en producto" (pill, centered) */}
      {valor != null && (
        <div style={{ textAlign: 'center', marginBottom: 'var(--sp-3)' }}>
          <span
            style={{
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: 'var(--r-pill)',
              backgroundColor: 'var(--gold-50)',
              color: 'var(--gold-700)',
              fontSize: 'var(--fs-xs)',
              fontWeight: 700,
              lineHeight: 'var(--lh-normal)',
            }}
          >
            Te llevas S/. {valor.toLocaleString('es-PE')} en producto
          </span>
        </div>
      )}

      {/* 5. Frase corta (lead) */}
      <p
        style={{
          fontSize: 'var(--fs-sm)',
          color: featured ? 'var(--n-200)' : 'var(--text-muted)',
          lineHeight: 'var(--lh-normal)',
          minHeight: '38px',
          marginBottom: 'var(--sp-5)',
          textAlign: 'center',
        }}
      >
        {lead}
      </p>

      {/* 6. Beneficios (color #3A3733, 16px mínimo, line-height 1.5; en Gold texto claro) */}
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: '0 0 var(--sp-6) 0',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--sp-3)',
          flex: 1,
        }}
      >
        {features.map((feat, idx) => (
          <li
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'var(--sp-2)',
              fontSize: '16px',
              lineHeight: 1.5,
              color: feat.muted
                ? 'var(--n-400)'
                : featured
                ? 'var(--n-50)'
                : '#3A3733',
            }}
          >
            <span
              style={{
                color: feat.muted
                  ? 'var(--n-400)'
                  : featured
                  ? 'var(--brand-gold)'
                  : 'var(--green-500)',
                flexShrink: 0,
                marginTop: '3px',
                display: 'inline-flex',
              }}
            >
              <Check size={16} strokeWidth={2.5} />
            </span>
            <span>{feat.text}</span>
          </li>
        ))}
      </ul>

      {/* 7. Botón CTA pegado abajo */}
      <button
        onClick={handleSelect}
        data-testid={`btn-select-pack-${id || 'pack'}`}
        className={`mg-pack-btn ${featured ? 'mg-pack-btn-gold' : 'mg-pack-btn-default'}`}
      >
        {cta}
      </button>
    </div>
  );
}
