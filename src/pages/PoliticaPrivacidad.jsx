import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EMPRESA } from '../config';

export default function PoliticaPrivacidad() {
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
            <span className="mg-eyebrow">Marco Normativo y Privacidad</span>
          </div>
          <h1 style={{ marginTop: 'var(--sp-3)', fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}>
            Política de Privacidad
          </h1>
          <p style={{ marginTop: 'var(--sp-3)', color: 'var(--text-body)', fontSize: 'var(--fs-sm)' }}>
            Última actualización: 27 de agosto de 2026 &bull; Conforme a la Ley N° 29733 y D.S. 016-2024-JUS
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
          {/* Introducción */}
          <section>
            <p>
              En cumplimiento de la <strong>Ley N° 29733 (Ley de Protección de Datos Personales)</strong> y su reglamento aprobado mediante <strong>D.S. N° 016-2024-JUS</strong>, <strong>{EMPRESA.razonSocial}</strong> pone a disposición de sus usuarios, socios y público general la presente Política de Privacidad, informando de manera clara y transparente sobre el tratamiento y resguardo de sus datos personales.
            </p>
          </section>

          {/* 1. Quién trata tus datos */}
          <section>
            <h2 style={{ fontSize: 'var(--fs-lg)', color: 'var(--text-strong)', marginBottom: 'var(--sp-3)' }}>
              1. Identificación del Responsable del Tratamiento
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li><strong>Razón Social:</strong> {EMPRESA.razonSocial}</li>
              <li><strong>RUC:</strong> {EMPRESA.ruc}</li>
              <li><strong>Domicilio Fiscal:</strong> {EMPRESA.domicilio}</li>
              <li><strong>Correo de Contacto Legal:</strong> <a href={`mailto:${EMPRESA.email}`} style={{ color: 'var(--brand-green)', fontWeight: 700 }}>{EMPRESA.email}</a></li>
              <li><strong>WhatsApp Corporativo:</strong> +{EMPRESA.whatsapp}</li>
            </ul>
          </section>

          {/* 2. Qué datos recopilamos */}
          <section>
            <h2 style={{ fontSize: 'var(--fs-lg)', color: 'var(--text-strong)', marginBottom: 'var(--sp-3)' }}>
              2. Datos Personales Recopilados
            </h2>
            <p>Recopilamos únicamente los datos necesarios para brindar nuestros servicios y gestionar las afiliaciones:</p>
            <ul style={{ paddingLeft: '20px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li><strong>Datos de Identificación:</strong> Nombres, apellidos, tipo y número de documento de identidad (DNI o Carné de Extranjería).</li>
              <li><strong>Datos de Contacto:</strong> Número de celular/WhatsApp y correo electrónico.</li>
              <li><strong>Datos de Ubicación y Entrega:</strong> Departamento, provincia, distrito y dirección detallada de envío.</li>
              <li><strong>Datos Comerciales:</strong> Pack de afiliación seleccionado, pedidos generados y código de patrocinador/referido.</li>
            </ul>
          </section>

          {/* 3. Finalidad del tratamiento */}
          <section>
            <h2 style={{ fontSize: 'var(--fs-lg)', color: 'var(--text-strong)', marginBottom: 'var(--sp-3)' }}>
              3. Finalidad del Tratamiento de Datos
            </h2>
            <p>Tus datos son tratados para las siguientes finalidades explícitas:</p>
            <ul style={{ paddingLeft: '20px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>Gestionar y formalizar tu proceso de registro y afiliación comercial.</li>
              <li>Coordinar el despacho, envío y entrega de tus pedidos de productos a nivel nacional.</li>
              <li>Proveer asesoría personalizada y soporte operativo vía WhatsApp o correo electrónico.</li>
              <li>Cumplir con las obligaciones legales, tributarias y contables vigentes en el Perú.</li>
              <li><em>(Solo si marcaste la casilla opcional de consentimiento comercial):</em> Enviarte promociones, novedades y lanzamientos de productos.</li>
            </ul>
          </section>

          {/* 4. Base legal */}
          <section>
            <h2 style={{ fontSize: 'var(--fs-lg)', color: 'var(--text-strong)', marginBottom: 'var(--sp-3)' }}>
              4. Base Legal del Tratamiento
            </h2>
            <p>
              El tratamiento de tus datos personales se sustenta en tu <strong>consentimiento libre, previo, expreso, inequívoco e informado</strong>, así como en la ejecución de la relación comercial o precontractual entablada con nuestra compañía.
            </p>
          </section>

          {/* 5. Transferencia y confidencialidad */}
          <section>
            <h2 style={{ fontSize: 'var(--fs-lg)', color: 'var(--text-strong)', marginBottom: 'var(--sp-3)' }}>
              5. Destinatarios y Confidencialidad
            </h2>
            <p>
              <strong>{EMPRESA.razonSocial} no vende, no arrienda ni cede tus datos personales a terceros.</strong>
            </p>
            <p style={{ marginTop: '8px' }}>
              Tus datos únicamente podrán ser compartidos con empresas de transporte y courier estrictamente para la entrega de tus productos, o cuando sea legalmente requerido por autoridades competentes.
            </p>
          </section>

          {/* 6. Plazo de conservación */}
          <section>
            <h2 style={{ fontSize: 'var(--fs-lg)', color: 'var(--text-strong)', marginBottom: 'var(--sp-3)' }}>
              6. Plazo de Conservación
            </h2>
            <p>
              Los datos se conservarán durante la vigencia de la relación comercial y por los plazos legalmente exigidos por las normas mercantiles, tributarias y de defensa del consumidor en el Perú.
            </p>
          </section>

          {/* 7. Ejercicio de Derechos ARCO */}
          <section>
            <h2 style={{ fontSize: 'var(--fs-lg)', color: 'var(--text-strong)', marginBottom: 'var(--sp-3)' }}>
              7. Ejercicio de Derechos ARCO
            </h2>
            <p>
              Tienes derecho a ejercer en cualquier momento tus derechos de <strong>Acceso, Rectificación, Cancelación y Oposición (ARCO)</strong>, así como a revocar tu consentimiento para comunicaciones comerciales.
            </p>
            <p style={{ marginTop: '8px' }}>
              Para ejercerlos, remite una solicitud indicando tus nombres completos y DNI a nuestro correo oficial: <a href={`mailto:${EMPRESA.email}?subject=DERECHOS%20ARCO`} style={{ color: 'var(--brand-green)', fontWeight: 700 }}>{EMPRESA.email}</a> con el asunto <em>"DERECHOS ARCO"</em>. Atenderemos tu solicitud dentro de los plazos fijados por la Ley N° 29733.
            </p>
          </section>

          {/* 8. Seguridad de la información */}
          <section>
            <h2 style={{ fontSize: 'var(--fs-lg)', color: 'var(--text-strong)', marginBottom: 'var(--sp-3)' }}>
              8. Medidas de Seguridad
            </h2>
            <p>
              Implementamos rigurosas medidas de seguridad técnicas, organizativas y legales para evitar la alteración, pérdida, acceso no autorizado o uso indebido de tus datos personales.
            </p>
          </section>

          {/* 9. Autoridad de Control */}
          <section>
            <h2 style={{ fontSize: 'var(--fs-lg)', color: 'var(--text-strong)', marginBottom: 'var(--sp-3)' }}>
              9. Autoridad de Control
            </h2>
            <p>
              Si consideras que tus derechos no han sido debidamente atendidos, puedes interponer una reclamación ante la <strong>Autoridad Nacional de Protección de Datos Personales (Ministerio de Justicia y Derechos Humanos)</strong>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
