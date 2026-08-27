import React from 'react';
import { FileText, ShieldAlert, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EMPRESA } from '../config';

export default function TerminosCondiciones() {
  return (
    <div style={{ backgroundColor: 'var(--surface-page)', minHeight: '100vh', paddingBottom: 'var(--section-y)' }}>
      {/* Header Legal */}
      <section
        style={{
          background: 'linear-gradient(180deg, var(--gold-50) 0%, var(--surface-page) 100%)',
          padding: 'var(--section-y) 0 var(--sp-8)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div className="mg-container">
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--text-muted)',
              fontSize: 'var(--fs-xs)',
              textDecoration: 'none',
              marginBottom: 'var(--sp-4)',
            }}
          >
            <ArrowLeft size={16} /> Volver al inicio
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-2)' }}>
            <div className="mg-ribbon-gold" />
            <span className="mg-eyebrow">Términos Legales y Comerciales</span>
          </div>
          <h1 style={{ marginTop: 'var(--sp-3)', fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}>
            Términos y Condiciones
          </h1>
          <p style={{ marginTop: 'var(--sp-3)', color: 'var(--text-body)', fontSize: 'var(--fs-sm)' }}>
            Última actualización: 27 de agosto de 2026 &bull; Conforme al Código de Protección y Defensa del Consumidor (Ley N° 29571)
          </p>
        </div>
      </section>

      {/* Contenido Estructurado */}
      <main className="mg-container" style={{ marginTop: 'var(--sp-8)', maxWidth: '820px' }}>
        <div
          style={{
            backgroundColor: 'var(--surface-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--r-card)',
            padding: 'clamp(20px, 4vw, var(--sp-10))',
            boxShadow: 'var(--shadow-xs)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--sp-8)',
            lineHeight: 'var(--lh-relaxed)',
            color: 'var(--text-body)',
            fontSize: 'var(--fs-sm)',
          }}
        >
          {/* 1. Identificación del Titular */}
          <section>
            <h2 style={{ fontSize: 'var(--fs-lg)', color: 'var(--text-strong)', marginBottom: 'var(--sp-3)' }}>
              1. Identificación de la Empresa
            </h2>
            <p>
              El presente sitio web es de propiedad y operación de <strong>{EMPRESA.razonSocial}</strong>, con <strong>RUC N° {EMPRESA.ruc}</strong>, con domicilio legal en {EMPRESA.domicilio}, correo de contacto: <a href={`mailto:${EMPRESA.email}`} style={{ color: 'var(--brand-green)', fontWeight: 700 }}>{EMPRESA.email}</a>.
            </p>
          </section>

          {/* 2. Objeto */}
          <section>
            <h2 style={{ fontSize: 'var(--fs-lg)', color: 'var(--text-strong)', marginBottom: 'var(--sp-3)' }}>
              2. Objeto del Sitio y Ámbito de Aplicación
            </h2>
            <p>
              Los presentes Términos y Condiciones regulan el acceso, navegación y uso del sitio web oficial de Max Global Corporation, así como las solicitudes de compra de productos naturales y los procesos de registro para la afiliación como distribuidores independientes en el territorio de la República del Perú.
            </p>
          </section>

          {/* 3. Afiliación y Packs */}
          <section>
            <h2 style={{ fontSize: 'var(--fs-lg)', color: 'var(--text-strong)', marginBottom: 'var(--sp-3)' }}>
              3. Proceso de Afiliación y Activación
            </h2>
            <ul style={{ paddingLeft: '20px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>Para afiliarse se requiere ser mayor de 18 años, contar con documento de identidad válido (DNI o Carné de Extranjería) y completar el formulario de registro con datos fidedignos.</li>
              <li>El registro a través del sitio web no genera cobro automático. La afiliación se formaliza y activa únicamente una vez validado el comprobante de depósito o transferencia bancaria correspondiente al pack elegido.</li>
              <li>Los packs disponibles y sus beneficios comerciales se detallan en la sección correspondiente del catálogo web.</li>
            </ul>
          </section>

          {/* 4. Naturaleza de la Relación Comercial */}
          <section
            style={{
              backgroundColor: 'var(--surface-gold)',
              border: '1px solid var(--border-gold)',
              borderRadius: 'var(--r-sm)',
              padding: 'var(--sp-5)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <ShieldAlert size={18} color="var(--gold-800, #7A5B18)" />
              <h2 style={{ fontSize: 'var(--fs-md)', color: 'var(--gold-800, #7A5B18)', margin: 0 }}>
                4. Naturaleza de la Relación: Distribuidor Independiente
              </h2>
            </div>
            <p style={{ color: 'var(--gold-800, #7A5B18)', fontSize: 'var(--fs-xs)', margin: 0 }}>
              El socio actúa en todo momento como un <strong>comercializador y distribuidor INDEPENDIENTE</strong>. No existe relación laboral, de subordinación, dependencia ni exclusividad entre el socio y Max Global Corporation S.A. Las comisiones y bonificaciones comerciales derivadas del plan de compensación no constituyen salario ni remuneración laboral, siendo responsabilidad exclusiva del socio el cumplimiento de sus obligaciones tributarias personales.
            </p>
          </section>

          {/* 5. Plan de Compensación y Ausencia de Garantías de Ingresos */}
          <section>
            <h2 style={{ fontSize: 'var(--fs-lg)', color: 'var(--text-strong)', marginBottom: 'var(--sp-3)' }}>
              5. Plan de Compensación y Ganancias
            </h2>
            <p>
              El plan de compensación describe los bonos de patrocinio, residuales, de rango y fondo global aplicables a la red de distribución. Para mantener la condición activa y percibir las bonificaciones del periodo mensual, el socio debe cumplir con la activación mensual de <strong>70 puntos</strong> de recompra.
            </p>
            <p style={{ marginTop: '8px', fontWeight: 700, color: 'var(--text-strong)' }}>
              Aviso Importante: Max Global Corporation no garantiza ningún nivel fijo de ingresos. Los resultados económicos dependen estrictamente del esfuerzo, constancia y volumen de comercialización generado por cada distribuidor independiente.
            </p>
          </section>

          {/* 6. Precios, Moneda y Pedidos */}
          <section>
            <h2 style={{ fontSize: 'var(--fs-lg)', color: 'var(--text-strong)', marginBottom: 'var(--sp-3)' }}>
              6. Precios, Moneda y Pedidos
            </h2>
            <p>
              Todos los precios de venta al público expuestos en el sitio web están expresados en <strong>Soles (S/.)</strong> e incluyen los impuestos de ley aplicables. Los socios acceden a precios de descuento según la categoría del pack activo. Los pedidos se procesan y coordinan de forma directa y personalizada a través del canal oficial de WhatsApp.
            </p>
          </section>

          {/* 7. Despacho y Envío */}
          <section>
            <h2 style={{ fontSize: 'var(--fs-lg)', color: 'var(--text-strong)', marginBottom: 'var(--sp-3)' }}>
              7. Despacho y Envío de Productos
            </h2>
            <p>
              Los productos se despachan mediante agencias de transporte y empresas de courier autorizadas con cobertura nacional en todo el Perú. El costo del envío y los tiempos de tránsito estimados se informan al cliente o socio antes de la confirmación final de la orden.
            </p>
          </section>

          {/* 8. Libro de Reclamaciones */}
          <section>
            <h2 style={{ fontSize: 'var(--fs-lg)', color: 'var(--text-strong)', marginBottom: 'var(--sp-3)' }}>
              8. Atención de Reclamos y Quejas
            </h2>
            <p>
              Conforme a la <strong>Ley N° 32495</strong> y el <strong>Código de Protección y Defensa del Consumidor</strong>, ponemos a disposición de todos nuestros usuarios el <Link to="/libro-de-reclamaciones" style={{ color: 'var(--brand-green)', fontWeight: 700 }}>Libro de Reclamaciones Virtual</Link>, garantizando una respuesta oportuna en un plazo legal máximo de <strong>15 días hábiles</strong>.
            </p>
          </section>

          {/* 9. Legislación y Jurisdicción */}
          <section>
            <h2 style={{ fontSize: 'var(--fs-lg)', color: 'var(--text-strong)', marginBottom: 'var(--sp-3)' }}>
              9. Jurisdicción y Ley Aplicable
            </h2>
            <p>
              Estos Términos y Condiciones se rigen e interpretan bajo las leyes de la República del Perú. Para cualquier controversia, las partes se someten a la competencia de los jueces y tribunales de la ciudad de Lima, Perú.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
