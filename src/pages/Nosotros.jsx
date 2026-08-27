import React from 'react';
import { BookOpen, MessageCircle, Mail, MapPin, Sparkles, Award, ShieldCheck, HeartHandshake } from 'lucide-react';
import { EMPRESA } from '../config';

export default function Nosotros() {
  const waContactMsg = 'Hola, quiero contactar con Max Global.';
  const waUrl = `https://wa.me/${EMPRESA.whatsapp}?text=${encodeURIComponent(waContactMsg)}`;

  return (
    <div style={{ backgroundColor: 'var(--surface-page)' }}>
      {/* 1. Hero Section */}
      <section
        style={{
          background: 'linear-gradient(180deg, var(--gold-50) 0%, var(--surface-page) 100%)',
          padding: 'var(--section-y) 0 var(--sp-12)',
        }}
      >
        <div className="mg-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-2)' }}>
            <div className="mg-ribbon-gold" />
            <span className="mg-eyebrow">La empresa</span>
          </div>
          <h1 style={{ marginTop: 'var(--sp-3)', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}>
            Max Global Corporation
          </h1>
          <p
            style={{
              marginTop: 'var(--sp-4)',
              maxWidth: '54ch',
              fontSize: 'var(--fs-md)',
              lineHeight: 'var(--lh-relaxed)',
              color: 'var(--text-body)',
            }}
          >
            Empresa peruana de venta directa de productos naturales, superalimentos y bienestar.
          </p>
        </div>
      </section>

      {/* 2. Bloques de Información Institucional */}
      <section style={{ paddingBottom: 'var(--section-y)' }}>
        <div
          className="mg-container mg-nos-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--sp-8)',
            alignItems: 'stretch',
          }}
        >
          {/* Qué hacemos */}
          <div
            style={{
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--r-card)',
              padding: 'var(--sp-8)',
              backgroundColor: 'var(--surface-card)',
              boxShadow: 'var(--shadow-xs)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--sp-3)' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--r-pill)',
                    backgroundColor: 'var(--surface-green)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--brand-green)',
                  }}
                >
                  <Sparkles size={18} />
                </div>
                <h3 style={{ fontSize: 'var(--fs-xl)', margin: 0 }}>Qué hacemos</h3>
              </div>
              <p
                style={{
                  marginTop: 'var(--sp-4)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--fs-sm)',
                  lineHeight: 'var(--lh-relaxed)',
                  color: 'var(--text-body)',
                }}
              >
                Desarrollamos y comercializamos productos naturales y superalimentos de consumo diario orientados a la salud, el bienestar y el cuidado personal, distribuidos mediante un modelo de venta directa y comercio colaborativo en todo el Perú.
              </p>
            </div>
            <p
              style={{
                marginTop: 'var(--sp-6)',
                fontSize: 'var(--fs-xs)',
                fontWeight: 700,
                color: 'var(--brand-green)',
                letterSpacing: 'var(--ls-wide)',
                textTransform: 'uppercase',
              }}
            >
              Consumo Diario &bull; Bienestar Natural &bull; Venta Directa
            </p>
          </div>

          {/* Nuestros Pilares / Valores */}
          <div
            style={{
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--r-card)',
              padding: 'var(--sp-8)',
              backgroundColor: 'var(--surface-card)',
              boxShadow: 'var(--shadow-xs)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--sp-3)' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--r-pill)',
                    backgroundColor: 'var(--surface-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold-700)',
                  }}
                >
                  <ShieldCheck size={18} />
                </div>
                <h3 style={{ fontSize: 'var(--fs-xl)', margin: 0 }}>Nuestros valores y principios</h3>
              </div>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 'var(--sp-4) 0 0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--sp-4)',
                }}
              >
                <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--brand-gold)', fontWeight: 700, marginTop: '2px' }}>&bull;</span>
                  <div style={{ fontSize: 'var(--fs-sm)', lineHeight: 'var(--lh-normal)', color: 'var(--text-body)' }}>
                    <strong style={{ color: 'var(--text-strong)' }}>Calidad y Nutrición:</strong> Insumos naturales y superalimentos como la moringa en presentaciones prácticas de consumo diario.
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--brand-gold)', fontWeight: 700, marginTop: '2px' }}>&bull;</span>
                  <div style={{ fontSize: 'var(--fs-sm)', lineHeight: 'var(--lh-normal)', color: 'var(--text-body)' }}>
                    <strong style={{ color: 'var(--text-strong)' }}>Oportunidad Real:</strong> Un modelo de distribución transparente con márgenes y comisiones claras desde el primer día.
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--brand-gold)', fontWeight: 700, marginTop: '2px' }}>&bull;</span>
                  <div style={{ fontSize: 'var(--fs-sm)', lineHeight: 'var(--lh-normal)', color: 'var(--text-body)' }}>
                    <strong style={{ color: 'var(--text-strong)' }}>Comercio Formal:</strong> Emisión de comprobantes, registros formales y respaldo corporativo en cada operación.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Emblema Oficial e Identidad de Marca */}
          <div
            style={{
              gridColumn: '1 / -1',
              backgroundColor: 'var(--surface-gold)',
              border: '1px solid var(--border-gold)',
              borderRadius: 'var(--r-card)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: 'var(--sp-8) var(--sp-6)',
              overflow: 'hidden',
            }}
          >
            <img
              src="/brand/logo-color-horizontal.png"
              alt="Max Global Corporation Identidad Oficial"
              style={{
                maxHeight: '72px',
                width: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.06))',
              }}
            />
          </div>
        </div>
      </section>

      {/* 3. Canales de Contacto */}
      <section
        style={{
          backgroundColor: 'var(--surface-sunken)',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: 'var(--section-y) 0',
        }}
      >
        <div className="mg-container">
          <span className="mg-eyebrow">Contacto</span>
          <h2 style={{ marginTop: 'var(--sp-4)', fontSize: 'var(--fs-3xl)' }}>
            Cómo llegar a nosotros
          </h2>

          <div
            className="mg-nos-grid"
            style={{
              marginTop: 'var(--sp-10)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 'var(--sp-6)',
            }}
          >
            {/* WhatsApp */}
            <div
              style={{
                backgroundColor: 'var(--surface-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--r-card)',
                padding: 'var(--sp-6)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--sp-4)',
              }}
            >
              <span className="mg-eyebrow" style={{ color: 'var(--text-muted)' }}>
                WhatsApp
              </span>
              <p style={{ fontSize: 'var(--fs-sm)', lineHeight: 'var(--lh-normal)', color: 'var(--text-body)' }}>
                Es el canal directo por el que atendemos pedidos y afiliaciones en todo el Perú.
              </p>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="btn-nosotros-whatsapp"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--whatsapp)',
                  color: '#FFFFFF',
                  padding: '10px 18px',
                  borderRadius: 'var(--r-pill)',
                  fontFamily: 'var(--font-subtitle)',
                  fontWeight: 700,
                  fontSize: 'var(--fs-sm)',
                  textDecoration: 'none',
                  alignSelf: 'flex-start',
                }}
              >
                <MessageCircle size={16} color="#FFFFFF" />
                <span>Escribir por WhatsApp</span>
              </a>
            </div>

            {/* Correo Electrónico */}
            <div
              style={{
                backgroundColor: 'var(--surface-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--r-card)',
                padding: 'var(--sp-6)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--sp-4)',
              }}
            >
              <span className="mg-eyebrow" style={{ color: 'var(--text-muted)' }}>
                Correo
              </span>
              <p style={{ fontSize: 'var(--fs-sm)', lineHeight: 'var(--lh-normal)', color: 'var(--text-body)' }}>
                Para consultas administrativas y documentación.
              </p>
              <a
                href={`mailto:${EMPRESA.email}`}
                data-testid="btn-nosotros-email"
                style={{
                  fontFamily: 'var(--font-subtitle)',
                  fontWeight: 700,
                  fontSize: 'var(--fs-sm)',
                  color: 'var(--brand-gold-dark, var(--gold-600))',
                  textDecoration: 'none',
                  alignSelf: 'flex-start',
                }}
              >
                {EMPRESA.email}
              </a>
            </div>

            {/* Libro de Reclamaciones — obligatorio por Ley 32495 */}
            <div
              style={{
                backgroundColor: 'var(--surface-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--r-card)',
                padding: 'var(--sp-6)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--sp-4)',
              }}
            >
              <span className="mg-eyebrow" style={{ color: 'var(--text-muted)' }}>
                Libro de Reclamaciones
              </span>
              <p style={{ fontSize: 'var(--fs-sm)', lineHeight: 'var(--lh-normal)', color: 'var(--text-body)' }}>
                Conforme al Código de Protección y Defensa del Consumidor, puedes
                registrar tu queja o reclamo en nuestro libro virtual.
              </p>
              <a
                href="/libro-de-reclamaciones"
                data-testid="btn-libro-reclamaciones"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1px solid var(--border-subtle)',
                  padding: '10px 18px',
                  borderRadius: 'var(--r-pill)',
                  fontFamily: 'var(--font-subtitle)',
                  fontWeight: 700,
                  fontSize: 'var(--fs-sm)',
                  color: 'var(--text-strong)',
                  textDecoration: 'none',
                  alignSelf: 'flex-start',
                }}
              >
                <BookOpen size={16} aria-hidden="true" />
                <span>Abrir el libro</span>
              </a>
            </div>
          </div>

          {/* Datos de la empresa — obligatorio por Ley 29571 */}
          <div
            style={{
              marginTop: 'var(--sp-10)',
              paddingTop: 'var(--sp-6)',
              borderTop: '1px solid var(--border-subtle)',
              fontSize: 'var(--fs-xs)',
              color: 'var(--text-muted)',
              lineHeight: 'var(--lh-normal)',
            }}
          >
            {EMPRESA.razonSocial} · RUC {EMPRESA.ruc} · {EMPRESA.domicilio}
          </div>
        </div>
      </section>
    </div>
  );
}
