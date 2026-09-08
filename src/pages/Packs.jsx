import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PackCard from '../components/PackCard';
import { EMPRESA } from '../config';
import { getPacks, valorEnProducto } from '../data/catalogo';

export default function Packs() {
  const navigate = useNavigate();
  const packs = getPacks();

  const handleSelectPack = (packId) => {
    navigate(`/registro?pack=${encodeURIComponent(packId)}`);
  };

  const waDudasMsg = 'Hola, quiero que me expliquen cuál pack me conviene.';
  const waDudasUrl = `https://wa.me/${EMPRESA.whatsapp}?text=${encodeURIComponent(waDudasMsg)}`;

  return (
    <div style={{ backgroundColor: 'var(--surface-page)' }}>
      {/* 1. Hero Section */}
      <section
        id="packs"
        style={{
          background: 'linear-gradient(180deg, var(--gold-50) 0%, var(--n-0) 60%)',
          padding: 'var(--section-y) 0 var(--sp-12)',
        }}
      >
        <div className="mg-container">
          <span className="mg-eyebrow">Packs de afiliación</span>
          <h1
            style={{
              marginTop: 'var(--sp-4)',
              maxWidth: '18ch',
              fontSize: 'var(--fs-4xl)',
            }}
          >
            Elige cómo quieres empezar
          </h1>
          <p
            style={{
              marginTop: 'var(--sp-5)',
              maxWidth: '54ch',
              fontSize: 'var(--fs-md)',
              lineHeight: 'var(--lh-relaxed)',
              color: 'var(--text-body)',
            }}
          >
            Cinco formas de entrar a Max Global. Todas incluyen producto, descuento de por vida y derecho a comisiones. La diferencia está en cuánto alcance tiene tu red.
          </p>
        </div>
      </section>

      {/* 2. Grid de Packs */}
      <section style={{ paddingBottom: 'var(--section-y)' }}>
        <div className="mg-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(214px, 1fr))',
              gap: 'var(--sp-4)',
              paddingTop: '18px',
              alignItems: 'stretch',
            }}
          >
            {packs.map((pack) => (
              <PackCard
                key={pack.id}
                id={pack.id}
                name={pack.nombre}
                price={pack.price || `S/. ${pack.precio.toLocaleString('es-PE')}`}
                lead={pack.lead}
                cta={pack.cta}
                featured={pack.destacado}
                ribbon={pack.ribbon || pack.etiqueta}
                features={pack.beneficios || pack.features}
                valorEnProducto={valorEnProducto(pack)}
                onSelect={handleSelectPack}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Tabla Comparativa Generada Dinámicamente desde PACKS */}
      <section
        style={{
          background: 'var(--surface-sunken)',
          padding: 'var(--section-y) 0',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div className="mg-container">
          <span className="mg-eyebrow">Comparativa</span>
          <h2 style={{ marginTop: 'var(--sp-4)' }}>Los cinco packs, lado a lado</h2>
          <div
            style={{
              marginTop: 'var(--sp-8)',
              overflowX: 'auto',
              background: 'var(--surface-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--r-card)',
            }}
          >
            <table style={{ width: '100%', minWidth: '720px', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th className="mg-cell mg-cell-row" style={{ background: 'var(--surface-card)' }}></th>
                  {packs.map((p) => (
                    <th
                      key={p.id}
                      className={`mg-cell ${p.destacado ? 'mg-cell-gold' : ''}`}
                      style={{
                        fontFamily: 'var(--font-subtitle)',
                        fontWeight: 700,
                        color: 'var(--text-strong)',
                        ...(p.destacado ? { borderTop: '2px solid var(--brand-gold)' } : {}),
                      }}
                    >
                      {p.nombre.replace('Pack ', '').replace(' Emprendedor', '')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="mg-cell mg-cell-row">Precio</td>
                  {packs.map((p) => (
                    <td key={p.id} className={`mg-cell ${p.destacado ? 'mg-cell-gold' : ''}`}>
                      S/. {p.precio.toLocaleString()}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="mg-cell mg-cell-row">Productos</td>
                  {packs.map((p) => (
                    <td key={p.id} className={`mg-cell ${p.destacado ? 'mg-cell-gold' : ''}`}>
                      {p.productos}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="mg-cell mg-cell-row">Descuento de recompra</td>
                  {packs.map((p) => (
                    <td key={p.id} className={`mg-cell ${p.destacado ? 'mg-cell-gold' : ''}`}>
                      {p.descuentoRecompra}%
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="mg-cell mg-cell-row">Niveles de comisión</td>
                  {packs.map((p) => (
                    <td
                      key={p.id}
                      className={`mg-cell ${p.destacado ? 'mg-cell-gold' : ''}`}
                      style={p.nivelesResidual === 0 ? { color: 'var(--text-muted)' } : {}}
                    >
                      {p.nivelesResidual === 0 ? '—' : p.nivelesResidual}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="mg-cell mg-cell-row">Puntos de rango</td>
                  {packs.map((p) => (
                    <td
                      key={p.id}
                      className={`mg-cell ${p.destacado ? 'mg-cell-gold' : ''}`}
                      style={p.puntosRango === 0 ? { color: 'var(--text-muted)' } : {}}
                    >
                      {p.puntosRango === 0 ? '—' : p.puntosRango}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="mg-cell mg-cell-row" style={{ borderBottom: 'none' }}>Bono Global</td>
                  {packs.map((p) => (
                    <td
                      key={p.id}
                      className={`mg-cell ${p.destacado ? 'mg-cell-gold' : ''}`}
                      style={{
                        borderBottom: 'none',
                        color: p.bonoGlobal ? 'var(--text-green)' : 'var(--text-muted)',
                      }}
                    >
                      {p.bonoGlobal ? '✓' : '—'}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: 'var(--sp-4)', fontSize: 'var(--fs-2xs)', color: 'var(--text-muted)' }}>
            Desliza la tabla en horizontal para ver todas las columnas.
          </p>
        </div>
      </section>

      {/* 4. Plan de Compensación */}
      <section id="comisiones" style={{ padding: 'var(--section-y) 0' }}>
        <div className="mg-container">
          <span className="mg-eyebrow">Plan de compensación</span>
          <h2 style={{ marginTop: 'var(--sp-4)' }}>Cómo se pagan las comisiones</h2>
          <p style={{ marginTop: 'var(--sp-5)', maxWidth: '50ch', fontSize: 'var(--fs-md)', lineHeight: 'var(--lh-relaxed)' }}>
            No hay letra chica. Estos son los porcentajes exactos del plan.
          </p>

          <div
            style={{
              marginTop: 'var(--sp-10)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--sp-6)',
              alignItems: 'start',
            }}
          >
            {/* Bono de Patrocinio */}
            <div
              style={{
                background: 'var(--surface-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--r-card)',
                padding: 'var(--sp-8)',
              }}
            >
              <span className="mg-eyebrow" style={{ color: 'var(--text-muted)' }}>Bono de patrocinio</span>
              <h3 style={{ marginTop: 'var(--sp-3)' }}>Cuando alguien de tu red se afilia</h3>
              <div style={{ marginTop: 'var(--sp-6)' }}>
                <div className="mg-lvl"><span>Nivel 1</span><b>20%</b></div>
                <div className="mg-lvl"><span>Nivel 2</span><b>4%</b></div>
                <div className="mg-lvl"><span>Nivel 3</span><b>3%</b></div>
                <div className="mg-lvl"><span>Nivel 4</span><b>2%</b></div>
                <div className="mg-lvl"><span>Nivel 5</span><b>1%</b></div>
                <div className="mg-lvl"><span>Nivel 6</span><b>0.5%</b></div>
                <div className="mg-lvl" style={{ borderBottom: 'none' }}><span>Nivel 7</span><b>0.3%</b></div>
              </div>
              <p style={{ marginTop: 'var(--sp-5)', fontSize: 'var(--fs-sm)', lineHeight: 'var(--lh-normal)', color: 'var(--text-muted)' }}>
                Se calcula sobre el precio del pack que compró esa persona.
              </p>
            </div>

            {/* Bono Residual */}
            <div
              style={{
                background: 'var(--surface-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--r-card)',
                padding: 'var(--sp-8)',
              }}
            >
              <span className="mg-eyebrow" style={{ color: 'var(--text-muted)' }}>Bono residual</span>
              <h3 style={{ marginTop: 'var(--sp-3)' }}>Cuando tu red recompra cada mes</h3>
              <div className="mg-residual-levels" style={{ marginTop: 'var(--sp-6)' }}>
                <div>
                  <div className="mg-lvl"><span>Nivel 1</span><b>40%</b></div>
                  <div className="mg-lvl"><span>Nivel 2</span><b>20%</b></div>
                  <div className="mg-lvl"><span>Nivel 3</span><b>10%</b></div>
                  <div className="mg-lvl"><span>Nivel 4</span><b>5%</b></div>
                  <div className="mg-lvl" style={{ borderBottom: 'none' }}><span>Nivel 5</span><b>3%</b></div>
                </div>
                <div>
                  <div className="mg-lvl"><span>Nivel 6</span><b>2%</b></div>
                  <div className="mg-lvl"><span>Nivel 7</span><b>1%</b></div>
                  <div className="mg-lvl" style={{ borderColor: 'var(--border-gold)' }}>
                    <span style={{ color: 'var(--text-strong)', fontWeight: 700 }}>Nivel 8</span>
                    <b style={{ color: 'var(--text-gold)' }}>10%</b>
                  </div>
                  <div className="mg-lvl"><span>Nivel 9</span><b>5%</b></div>
                  <div className="mg-lvl" style={{ borderBottom: 'none' }}><span>Nivel 10</span><b>1%</b></div>
                </div>
              </div>
              <p style={{ marginTop: 'var(--sp-5)', fontSize: 'var(--fs-sm)', lineHeight: 'var(--lh-normal)', color: 'var(--text-muted)' }}>
                Se calcula sobre los puntos de los productos que compró tu red. <span style={{ color: 'var(--text-strong)', fontWeight: 700 }}>El nivel 8 sube al 10%: es el beneficio de tener el plan de 10 niveles.</span>
              </p>
            </div>

            {/* Requisito de Actividad */}
            <div
              style={{
                background: 'var(--surface-gold)',
                border: '1px solid var(--border-gold)',
                borderRadius: 'var(--r-card)',
                padding: 'var(--sp-8)',
              }}
            >
              <span className="mg-eyebrow">Requisito de actividad</span>
              <h3 style={{ marginTop: 'var(--sp-3)' }}>Para cobrar tienes que estar activo</h3>
              <div style={{ marginTop: 'var(--sp-6)', display: 'flex', alignItems: 'baseline', gap: 'var(--sp-3)' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    textTransform: 'uppercase',
                    letterSpacing: 'var(--ls-display)',
                    fontSize: 'var(--fs-4xl)',
                    lineHeight: 1,
                    color: 'var(--text-strong)',
                  }}
                >
                  70
                </span>
                <span style={{ fontFamily: 'var(--font-subtitle)', fontWeight: 700, fontSize: 'var(--fs-md)', color: 'var(--text-strong)' }}>
                  puntos personales al mes
                </span>
              </div>
              <p style={{ marginTop: 'var(--sp-5)', fontSize: 'var(--fs-sm)', lineHeight: 'var(--lh-relaxed)', color: 'var(--n-600)' }}>
                Cada mes necesitas 70 puntos personales de compra para cobrar tus comisiones. Si un mes no te activas, no cobras ese mes — pero conservas tu red, tus puntos acumulados y tu rango.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bloque Final de Contacto */}
      <section style={{ background: 'var(--surface-inverse)', padding: 'var(--section-y-tight) 0' }}>
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
          <div style={{ maxWidth: '46ch' }}>
            <h3 style={{ color: 'var(--text-on-dark)', fontSize: 'var(--fs-xl)' }}>
              ¿Tienes dudas sobre cuál te conviene?
            </h3>
            <p style={{ marginTop: 'var(--sp-3)', fontSize: 'var(--fs-md)', lineHeight: 'var(--lh-relaxed)', color: 'var(--n-300)' }}>
              Escríbenos y te explicamos sin compromiso.
            </p>
          </div>
          <a
            href={waDudasUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="btn-packs-whatsapp-dudas"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: 'var(--whatsapp)',
              color: '#FFFFFF',
              padding: '14px 24px',
              borderRadius: 'var(--r-pill)',
              fontSize: 'var(--fs-md)',
              fontFamily: 'var(--font-subtitle)',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'var(--t-control)',
              boxShadow: 'var(--shadow-green)',
            }}
          >
            <MessageCircle size={20} color="#FFFFFF" />
            <span>Hablar por WhatsApp</span>
          </a>
        </div>
      </section>

      <style>{`
        .mg-cell {
          padding: 14px 16px;
          font-family: var(--font-body);
          font-size: var(--fs-sm);
          color: var(--text-body);
          border-bottom: 1px solid var(--border-subtle);
          text-align: center;
        }
        .mg-cell-row {
          text-align: left;
          color: var(--text-strong);
          font-weight: 700;
          white-space: nowrap;
        }
        .mg-cell-gold {
          background: var(--gold-50);
          color: var(--text-strong);
          font-weight: 700;
        }
        .mg-lvl {
          display: flex;
          justify-content: space-between;
          gap: var(--sp-6);
          padding: 10px 0;
          border-bottom: 1px solid var(--border-subtle);
          font-family: var(--font-body);
          font-size: var(--fs-sm);
          color: var(--text-body);
        }
        .mg-lvl > b {
          font-family: var(--font-display);
          text-transform: uppercase;
          letter-spacing: var(--ls-display);
          font-weight: 400;
          font-size: var(--fs-lg);
          color: var(--text-strong);
        }
        .mg-residual-levels {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 var(--sp-8);
        }
        @media (max-width: 900px) {
          .mg-packs-grid {
            grid-template-columns: 1fr !important;
            gap: var(--sp-6) !important;
          }
          .mg-table-hint {
            display: block !important;
          }
        }
        @media (max-width: 640px) {
          .mg-residual-levels {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
        }
        @media (max-width: 600px) {
          .mg-cell {
            padding: 10px 12px !important;
            font-size: var(--fs-xs) !important;
          }
          .mg-comisiones-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
