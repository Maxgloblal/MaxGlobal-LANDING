import React from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PackCard({
  id,
  name,
  price,
  lead,
  features = [],
  cta = 'Elegir Pack',
  featured = false,
  ribbon = '',
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

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: featured ? 'var(--surface-gold)' : 'var(--surface-card)',
        border: featured ? '2px solid var(--brand-gold)' : '1px solid var(--border-subtle)',
        borderRadius: 'var(--r-pack)',
        padding: 'var(--sp-6)',
        boxShadow: featured ? 'var(--shadow-gold)' : 'var(--shadow-xs)',
        transition: 'var(--t-surface)',
        height: '100%',
        boxSizing: 'border-box',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = featured ? 'var(--shadow-md)' : 'var(--shadow-sm)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = featured ? 'var(--shadow-gold)' : 'var(--shadow-xs)';
      }}
    >
      {/* Ribbon / Badge si es destacado */}
      {ribbon && (
        <div
          style={{
            position: 'absolute',
            top: '-12px',
            right: '20px',
            backgroundColor: 'var(--brand-gold)',
            color: 'var(--n-700)',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-2xs)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 'var(--ls-wide)',
            padding: '4px 12px',
            borderRadius: 'var(--r-pill)',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          {ribbon}
        </div>
      )}

      {/* Cabecera del Pack */}
      <div>
        <h3
          style={{
            fontSize: 'var(--fs-lg)',
            color: 'var(--text-strong)',
            marginBottom: 'var(--sp-2)',
          }}
        >
          {name}
        </h3>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-3xl)',
            color: 'var(--text-strong)',
            letterSpacing: 'var(--ls-display)',
            textTransform: 'uppercase',
            marginBottom: 'var(--sp-2)',
          }}
        >
          {price}
        </div>
        <p
          style={{
            fontSize: 'var(--fs-xs)',
            color: 'var(--text-muted)',
            lineHeight: 'var(--lh-normal)',
            minHeight: '36px',
            marginBottom: 'var(--sp-5)',
          }}
        >
          {lead}
        </p>
      </div>

      <hr
        style={{
          border: 'none',
          borderTop: '1px solid var(--border-subtle)',
          margin: '0 0 var(--sp-5) 0',
        }}
      />

      {/* Lista de Características */}
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
              fontSize: 'var(--fs-xs)',
              lineHeight: 'var(--lh-normal)',
              color: feat.muted ? 'var(--text-muted)' : 'var(--text-body)',
            }}
          >
            <span
              style={{
                color: feat.muted ? 'var(--n-400)' : 'var(--green-500)',
                flexShrink: 0,
                marginTop: '2px',
                display: 'inline-flex',
              }}
            >
              <Check size={14} strokeWidth={2.5} />
            </span>
            <span>{feat.text}</span>
          </li>
        ))}
      </ul>

      {/* Botón CTA */}
      <button
        onClick={handleSelect}
        data-testid={`btn-select-pack-${id || 'pack'}`}
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: 'var(--r-pill)',
          fontFamily: 'var(--font-subtitle)',
          fontSize: 'var(--fs-sm)',
          fontWeight: 700,
          border: featured ? 'none' : '1px solid var(--border-strong)',
          backgroundColor: featured ? 'var(--brand-gold)' : 'var(--surface-page)',
          color: featured ? 'var(--n-700)' : 'var(--text-strong)',
          cursor: 'pointer',
          transition: 'var(--t-control)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={(e) => {
          if (featured) {
            e.currentTarget.style.backgroundColor = 'var(--gold-500)';
          } else {
            e.currentTarget.style.backgroundColor = 'var(--surface-gold)';
            e.currentTarget.style.borderColor = 'var(--brand-gold)';
          }
        }}
        onMouseLeave={(e) => {
          if (featured) {
            e.currentTarget.style.backgroundColor = 'var(--brand-gold)';
          } else {
            e.currentTarget.style.backgroundColor = 'var(--surface-page)';
            e.currentTarget.style.borderColor = 'var(--border-strong)';
          }
        }}
      >
        {cta}
      </button>
    </div>
  );
}
