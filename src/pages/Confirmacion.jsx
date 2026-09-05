import React from 'react';
import { Check, MessageCircle } from 'lucide-react';
import { EMPRESA } from '../config';

export default function Confirmacion() {
  const waVoucherMsg = 'Hola, aquí les envío mi voucher de pago.';
  const storedWaMsg = typeof window !== 'undefined' ? sessionStorage.getItem('mg_wa_msg') : null;
  const initialMsg = storedWaMsg ? `${storedWaMsg}\n\nAdjunto mi voucher de pago.` : waVoucherMsg;
  const waUrl = `https://wa.me/${EMPRESA.whatsapp}?text=${encodeURIComponent(initialMsg)}`;

  return (
    <div style={{ backgroundColor: 'var(--surface-page)' }}>
      {/* 1. Hero Section */}
      <section
        style={{
          background: 'linear-gradient(180deg, var(--gold-50) 0%, var(--n-0) 80%)',
          padding: 'var(--section-y) 0 var(--sp-12)',
        }}
      >
        <div className="mg-container">
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--surface-green)',
              border: '1px solid var(--border-green)',
              color: 'var(--text-green)',
              borderRadius: 'var(--r-pill)',
              padding: '6px 14px',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-2xs)',
              fontWeight: 700,
              letterSpacing: 'var(--ls-wide)',
              textTransform: 'uppercase',
            }}
          >
            <Check size={14} strokeWidth={2.5} />
            Registro recibido
          </span>

          <h1 style={{ marginTop: 'var(--sp-5)', fontSize: 'var(--fs-4xl)' }}>
            Ya recibimos tus datos
          </h1>

          <p
            style={{
              marginTop: 'var(--sp-5)',
              maxWidth: '56ch',
              fontSize: 'var(--fs-md)',
              lineHeight: 'var(--lh-relaxed)',
              color: 'var(--text-body)',
            }}
          >
            Recibimos tu solicitud. Un asesor te va a contactar por WhatsApp para coordinar el pago y activar tu cuenta.
          </p>
        </div>
      </section>

      {/* 2. Cuentas e Instrucciones */}
      <section style={{ paddingBottom: 'var(--section-y)' }}>
        <div className="mg-container mg-conf-grid">
          {/* Tarjeta de Pago */}
          <div
            style={{
              backgroundColor: 'var(--surface-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--r-card)',
              padding: 'var(--sp-8)',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <h3 style={{ fontSize: 'var(--fs-xl)', color: 'var(--text-strong)' }}>
              Cómo pagar
            </h3>
            <p style={{ marginTop: 'var(--sp-3)', fontSize: 'var(--fs-sm)', lineHeight: 'var(--lh-relaxed)', color: 'var(--text-body)' }}>
              Cuando el asesor confirme tu pedido, deposita en las cuentas oficiales de la empresa:
            </p>

            {/* Cuentas Bancarias Oficiales */}
            {EMPRESA.cuentasBancarias.map((cuenta, idx) => (
              <div
                key={cuenta.cuenta}
                style={{
                  marginTop: idx === 0 ? 'var(--sp-6)' : 'var(--sp-4)',
                  backgroundColor: 'var(--surface-sunken)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--r-card)',
                  padding: 'var(--sp-6)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-subtitle)',
                    fontWeight: 700,
                    fontSize: 'var(--fs-sm)',
                    color: 'var(--brand-gold)',
                    marginBottom: 'var(--sp-3)',
                  }}
                >
                  {idx === 0
                    ? `Cuenta Principal (${cuenta.banco.split(' ')[0]})`
                    : idx === 1
                    ? `Cuenta Alternativa (${cuenta.banco.split(' ')[0]})`
                    : `Cuenta (${cuenta.banco.split(' ')[0]})`}
                </div>
                <div className="mg-dato">
                  <span>Banco</span>
                  <span>{cuenta.banco}</span>
                </div>
                <div className="mg-dato">
                  <span>Número de Cuenta</span>
                  <span style={{ userSelect: 'all' }}>{cuenta.cuenta}</span>
                </div>
                <div className="mg-dato">
                  <span>CCI (Interbancario)</span>
                  <span style={{ userSelect: 'all' }}>{cuenta.cci}</span>
                </div>
                <div className="mg-dato" style={idx === 0 ? undefined : { borderBottom: 'none' }}>
                  <span>Titular</span>
                  <span>{cuenta.titular}</span>
                </div>
                {idx === 0 && (
                  <div className="mg-dato" style={{ borderBottom: 'none' }}>
                    <span>RUC</span>
                    <span>{EMPRESA.ruc}</span>
                  </div>
                )}
              </div>
            ))}

            <p style={{ marginTop: 'var(--sp-5)', fontSize: 'var(--fs-sm)', lineHeight: 'var(--lh-relaxed)', color: 'var(--text-body)' }}>
              Guarda tu voucher o comprobante y mándalo por WhatsApp.
            </p>

            <div style={{ marginTop: 'var(--sp-6)' }}>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="btn-enviar-voucher"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--whatsapp)',
                  color: '#FFFFFF',
                  padding: '14px 24px',
                  borderRadius: 'var(--r-pill)',
                  fontFamily: 'var(--font-subtitle)',
                  fontWeight: 700,
                  fontSize: 'var(--fs-md)',
                  textDecoration: 'none',
                  transition: 'var(--t-control)',
                }}
              >
                <MessageCircle size={20} color="#FFFFFF" />
                <span>Enviar mi voucher por WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Tarjeta Qué pasa después */}
          <div
            style={{
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--r-card)',
              padding: 'var(--sp-8)',
              backgroundColor: 'var(--surface-card)',
            }}
          >
            <h3 style={{ fontSize: 'var(--fs-xl)', color: 'var(--text-strong)' }}>
              Qué pasa después
            </h3>
            <div style={{ marginTop: 'var(--sp-6)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
              <div style={{ display: 'flex', gap: 'var(--sp-4)', alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    textTransform: 'uppercase',
                    letterSpacing: 'var(--ls-display)',
                    fontSize: 'var(--fs-lg)',
                    color: 'var(--brand-gold)',
                    lineHeight: 1,
                    minWidth: '20px',
                  }}
                >
                  1
                </span>
                <span style={{ fontSize: 'var(--fs-sm)', lineHeight: 'var(--lh-normal)', color: 'var(--text-strong)' }}>
                  Confirmamos tu pago
                </span>
              </div>

              <div style={{ display: 'flex', gap: 'var(--sp-4)', alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    textTransform: 'uppercase',
                    letterSpacing: 'var(--ls-display)',
                    fontSize: 'var(--fs-lg)',
                    color: 'var(--brand-gold)',
                    lineHeight: 1,
                    minWidth: '20px',
                  }}
                >
                  2
                </span>
                <span style={{ fontSize: 'var(--fs-sm)', lineHeight: 'var(--lh-normal)', color: 'var(--text-strong)' }}>
                  Preparamos y despachamos tu pedido
                </span>
              </div>

              <div style={{ display: 'flex', gap: 'var(--sp-4)', alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    textTransform: 'uppercase',
                    letterSpacing: 'var(--ls-display)',
                    fontSize: 'var(--fs-lg)',
                    color: 'var(--brand-gold)',
                    lineHeight: 1,
                    minWidth: '20px',
                  }}
                >
                  3
                </span>
                <span style={{ fontSize: 'var(--fs-sm)', lineHeight: 'var(--lh-normal)', color: 'var(--text-strong)' }}>
                  Te mandamos el número de guía de transporte
                </span>
              </div>

              <div style={{ display: 'flex', gap: 'var(--sp-4)', alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    textTransform: 'uppercase',
                    letterSpacing: 'var(--ls-display)',
                    fontSize: 'var(--fs-lg)',
                    color: 'var(--brand-gold)',
                    lineHeight: 1,
                    minWidth: '20px',
                  }}
                >
                  4
                </span>
                <span style={{ fontSize: 'var(--fs-sm)', lineHeight: 'var(--lh-normal)', color: 'var(--text-strong)' }}>
                  Recibes tus accesos oficiales al sistema
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .mg-conf-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: var(--sp-8);
          align-items: start;
        }
        .mg-dato {
          display: flex;
          justify-content: space-between;
          gap: var(--sp-6);
          padding: 10px 0;
          border-bottom: 1px solid var(--border-subtle);
          font-family: var(--font-body);
          font-size: var(--fs-sm);
        }
        .mg-dato > span:first-child {
          color: var(--text-muted);
        }
        .mg-dato > span:last-child {
          color: var(--text-strong);
          font-weight: 700;
        }
        @media (max-width: 768px) {
          .mg-conf-grid {
            grid-template-columns: 1fr !important;
            gap: var(--sp-6) !important;
          }
        }
        @media (max-width: 500px) {
          .mg-dato {
            flex-direction: column !important;
            gap: 2px !important;
          }
          [data-testid="btn-enviar-voucher"] {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </div>
  );
}
