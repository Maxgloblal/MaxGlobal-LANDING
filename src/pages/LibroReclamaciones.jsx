import React, { useState } from 'react';
import { BookOpen, CheckCircle, AlertCircle, ArrowLeft, Printer, Mail, MessageCircle, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EMPRESA } from '../config';

export default function LibroReclamaciones() {
  const [formData, setFormData] = useState({
    nombres: '',
    tipoDoc: 'DNI',
    numeroDoc: '',
    domicilio: '',
    departamento: '',
    provincia: '',
    email: '',
    telefono: '',
    esMenor: false,
    nombreApoderado: '',
    dniApoderado: '',
    tipoBien: 'Producto',
    montoReclamado: '',
    descripcionBien: '',
    tipoReclamacion: 'Reclamo',
    detalle: '',
    pedido: '',
    declaracion: false,
  });

  const [submittedCode, setSubmittedCode] = useState(null);
  const [submissionDate, setSubmissionDate] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.declaracion) {
      setErrorMsg('Debes confirmar que los datos consignados son verdaderos para enviar la hoja de reclamación.');
      return;
    }

    // Generar correlativo único
    const currentYear = new Date().getFullYear();
    const storedCount = parseInt(localStorage.getItem('mg_lr_count') || '100', 10) + 1;
    localStorage.setItem('mg_lr_count', String(storedCount));
    const generatedCode = `LR-${currentYear}-${String(storedCount).padStart(4, '0')}`;

    const now = new Date();
    const dateFormatted = now.toLocaleString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    setSubmittedCode(generatedCode);
    setSubmissionDate(dateFormatted);
    setErrorMsg('');
    window.scrollTo(0, 0);
  };

  // En caso de reclamo enviado con éxito:
  if (submittedCode) {
    const emailSubject = encodeURIComponent(`Hoja de Reclamación Virtual ${submittedCode} - ${formData.nombres}`);
    const emailBody = encodeURIComponent(
      `CONSTANCIA DE REGISTRO EN EL LIBRO DE RECLAMACIONES VIRTUAL\n\n` +
      `Código: ${submittedCode}\n` +
      `Fecha: ${submissionDate}\n` +
      `Empresa: ${EMPRESA.razonSocial} (RUC: ${EMPRESA.ruc})\n\n` +
      `CONSUMIDOR: ${formData.nombres} (${formData.tipoDoc} ${formData.numeroDoc})\n` +
      `Correo: ${formData.email} | Tel: ${formData.telefono}\n` +
      `Domicilio: ${formData.domicilio} - ${formData.provincia}, ${formData.departamento}\n\n` +
      `BIEN: ${formData.tipoBien} - Monto: S/. ${formData.montoReclamado || '0.00'}\n` +
      `Descripción: ${formData.descripcionBien}\n\n` +
      `TIPO: ${formData.tipoReclamacion.toUpperCase()}\n` +
      `Detalle: ${formData.detalle}\n` +
      `Pedido del consumidor: ${formData.pedido}\n\n` +
      `Plazo legal de respuesta: Máximo 15 días hábiles conforme a la Ley N° 32495.`
    );
    const mailtoUrl = `mailto:${EMPRESA.email}?cc=${encodeURIComponent(formData.email)}&subject=${emailSubject}&body=${emailBody}`;

    const waMsg = encodeURIComponent(
      `Hola Max Global, acabo de registrar la Hoja de Reclamación *${submittedCode}* a nombre de *${formData.nombres}*.`
    );
    const waUrl = `https://wa.me/${EMPRESA.whatsapp}?text=${waMsg}`;

    return (
      <div style={{ backgroundColor: 'var(--surface-page)', minHeight: '100vh', padding: 'var(--section-y) 0' }}>
        <div className="mg-container" style={{ maxWidth: '680px' }}>
          <div
            style={{
              backgroundColor: 'var(--surface-card)',
              border: '1px solid var(--border-green)',
              borderRadius: 'var(--r-card)',
              padding: 'clamp(24px, 5vw, var(--sp-10))',
              boxShadow: 'var(--shadow-md)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: 'var(--r-pill)',
                backgroundColor: 'var(--surface-green)',
                color: 'var(--brand-green)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--sp-4)',
              }}
            >
              <CheckCircle size={36} />
            </div>

            <span className="mg-eyebrow" style={{ color: 'var(--brand-green)' }}>
              Constancia de Recepción Oficial
            </span>
            <h1 style={{ fontSize: 'var(--fs-2xl)', marginTop: 'var(--sp-2)', color: 'var(--text-strong)' }}>
              {formData.tipoReclamacion} Registrado
            </h1>

            <div
              style={{
                backgroundColor: 'var(--surface-sunken)',
                border: '1px dashed var(--border-gold)',
                borderRadius: 'var(--r-sm)',
                padding: 'var(--sp-4)',
                margin: 'var(--sp-6) 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
                Código de seguimiento único:
              </span>
              <strong
                data-testid="lr-confirmation-code"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--fs-2xl)',
                  color: 'var(--brand-gold-dark, #A8833E)',
                  letterSpacing: '1px',
                }}
              >
                {submittedCode}
              </strong>
              <span style={{ fontSize: 'var(--fs-2xs)', color: 'var(--text-muted)' }}>
                Fecha y hora: {submissionDate}
              </span>
            </div>

            <div style={{ textAlign: 'left', fontSize: 'var(--fs-sm)', lineHeight: 'var(--lh-relaxed)', color: 'var(--text-body)', marginBottom: 'var(--sp-6)' }}>
              <p>
                Hemos recibido satisfactoriamente tu <strong>{formData.tipoReclamacion.toLowerCase()}</strong>. Conforme a la <strong>Ley N° 32495</strong> y las disposiciones de INDECOPI, <strong>{EMPRESA.razonSocial}</strong> brindará respuesta formal a través de tu correo electrónico (<em>{formData.email}</em>) en un plazo legal máximo de <strong>15 días hábiles</strong>.
              </p>
            </div>

            {/* Acciones */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
              <a
                href={mailtoUrl}
                data-testid="btn-lr-email-copy"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--brand-green)',
                  color: '#FFFFFF',
                  padding: '12px 20px',
                  borderRadius: 'var(--r-pill)',
                  fontWeight: 700,
                  fontSize: 'var(--fs-sm)',
                  textDecoration: 'none',
                }}
              >
                <Mail size={18} />
                <span>Enviar copia digital a mi correo</span>
              </a>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="btn-lr-whatsapp"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--whatsapp)',
                  color: '#FFFFFF',
                  padding: '12px 20px',
                  borderRadius: 'var(--r-pill)',
                  fontWeight: 700,
                  fontSize: 'var(--fs-sm)',
                  textDecoration: 'none',
                }}
              >
                <MessageCircle size={18} />
                <span>Notificar registro por WhatsApp</span>
              </a>

              <button
                onClick={() => window.print()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--surface-sunken)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-strong)',
                  padding: '10px 20px',
                  borderRadius: 'var(--r-pill)',
                  fontWeight: 600,
                  fontSize: 'var(--fs-xs)',
                  cursor: 'pointer',
                }}
              >
                <Printer size={16} />
                <span>Imprimir o Guardar en PDF</span>
              </button>

              <Link
                to="/"
                style={{
                  marginTop: 'var(--sp-2)',
                  fontSize: 'var(--fs-xs)',
                  color: 'var(--text-muted)',
                  textDecoration: 'underline',
                }}
              >
                Volver a la página principal
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--surface-page)', minHeight: '100vh', paddingBottom: 'var(--section-y)' }}>
      {/* Header */}
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
            <span className="mg-eyebrow">Atención al Consumidor</span>
          </div>
          <h1 style={{ marginTop: 'var(--sp-3)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>
            Libro de Reclamaciones Virtual
          </h1>
          <p style={{ marginTop: 'var(--sp-2)', color: 'var(--text-body)', fontSize: 'var(--fs-sm)' }}>
            Conforme a lo establecido en el Código de Protección y Defensa del Consumidor (Ley N° 29571) y la Ley N° 32495.
          </p>
          <div style={{ marginTop: 'var(--sp-3)', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
            <strong>{EMPRESA.razonSocial}</strong> &bull; RUC {EMPRESA.ruc} &bull; {EMPRESA.domicilio}
          </div>
        </div>
      </section>

      {/* Formulario */}
      <main className="mg-container" style={{ marginTop: 'var(--sp-8)', maxWidth: '780px' }}>
        <form
          onSubmit={handleSubmit}
          data-testid="form-libro-reclamaciones"
          style={{
            backgroundColor: 'var(--surface-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--r-card)',
            padding: 'clamp(20px, 4vw, var(--sp-10))',
            boxShadow: 'var(--shadow-xs)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--sp-8)',
          }}
        >
          {errorMsg && (
            <div
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid #EF4444',
                color: '#DC2626',
                padding: '10px 14px',
                borderRadius: 'var(--r-sm)',
                fontSize: 'var(--fs-xs)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* 1. Identificación del Consumidor */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--sp-4)' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--surface-gold)', color: 'var(--gold-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '12px' }}>1</div>
              <h2 style={{ fontSize: 'var(--fs-md)', color: 'var(--text-strong)', margin: 0 }}>
                Identificación del Consumidor Reclamante
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--sp-4)' }}>
              <div>
                <label className="mg-label">Nombres y Apellidos *</label>
                <input
                  type="text"
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleChange}
                  required
                  placeholder="Nombres completos"
                  className="mg-input"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '8px' }}>
                <div>
                  <label className="mg-label">Tipo Doc *</label>
                  <select
                    name="tipoDoc"
                    value={formData.tipoDoc}
                    onChange={handleChange}
                    className="mg-input"
                  >
                    <option value="DNI">DNI</option>
                    <option value="CE">C.E.</option>
                    <option value="Pasaporte">Pasaporte</option>
                  </select>
                </div>
                <div>
                  <label className="mg-label">N° Documento *</label>
                  <input
                    type="text"
                    name="numeroDoc"
                    value={formData.numeroDoc}
                    onChange={handleChange}
                    required
                    placeholder="Número"
                    className="mg-input"
                  />
                </div>
              </div>

              <div>
                <label className="mg-label">Correo Electrónico *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="ejemplo@correo.com"
                  className="mg-input"
                />
              </div>

              <div>
                <label className="mg-label">Teléfono / Celular *</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  placeholder="999 999 999"
                  className="mg-input"
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label className="mg-label">Domicilio Completo *</label>
                <input
                  type="text"
                  name="domicilio"
                  value={formData.domicilio}
                  onChange={handleChange}
                  required
                  placeholder="Av./Jr./Calle, N°, Urb."
                  className="mg-input"
                />
              </div>

              <div>
                <label className="mg-label">Departamento *</label>
                <input
                  type="text"
                  name="departamento"
                  value={formData.departamento}
                  onChange={handleChange}
                  required
                  placeholder="Ej: Lima"
                  className="mg-input"
                />
              </div>

              <div>
                <label className="mg-label">Provincia / Distrito *</label>
                <input
                  type="text"
                  name="provincia"
                  value={formData.provincia}
                  onChange={handleChange}
                  required
                  placeholder="Ej: Lima / Miraflores"
                  className="mg-input"
                />
              </div>

              <div style={{ gridColumn: '1 / -1', marginTop: '4px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--fs-xs)', color: 'var(--text-body)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="esMenor"
                    checked={formData.esMenor}
                    onChange={handleChange}
                  />
                  <span>El reclamante es menor de edad</span>
                </label>
              </div>

              {formData.esMenor && (
                <>
                  <div>
                    <label className="mg-label">Nombre del Padre o Apoderado *</label>
                    <input
                      type="text"
                      name="nombreApoderado"
                      value={formData.nombreApoderado}
                      onChange={handleChange}
                      required={formData.esMenor}
                      placeholder="Nombres completos"
                      className="mg-input"
                    />
                  </div>
                  <div>
                    <label className="mg-label">DNI del Padre o Apoderado *</label>
                    <input
                      type="text"
                      name="dniApoderado"
                      value={formData.dniApoderado}
                      onChange={handleChange}
                      required={formData.esMenor}
                      placeholder="DNI apoderado"
                      className="mg-input"
                    />
                  </div>
                </>
              )}
            </div>
          </section>

          {/* 2. Identificación del Bien Contratado */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--sp-4)' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--surface-gold)', color: 'var(--gold-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '12px' }}>2</div>
              <h2 style={{ fontSize: 'var(--fs-md)', color: 'var(--text-strong)', margin: 0 }}>
                Identificación del Bien Contratado
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
              <div style={{ display: 'flex', gap: 'var(--sp-6)', alignItems: 'center' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--fs-sm)', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="tipoBien"
                    value="Producto"
                    checked={formData.tipoBien === 'Producto'}
                    onChange={handleChange}
                  />
                  <span>Producto</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--fs-sm)', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="tipoBien"
                    value="Servicio"
                    checked={formData.tipoBien === 'Servicio'}
                    onChange={handleChange}
                  />
                  <span>Servicio</span>
                </label>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--sp-4)' }}>
                <div>
                  <label className="mg-label">Monto Reclamado (S/.)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="montoReclamado"
                    value={formData.montoReclamado}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="mg-input"
                  />
                </div>
                <div>
                  <label className="mg-label">Descripción del Producto o Servicio *</label>
                  <input
                    type="text"
                    name="descripcionBien"
                    value={formData.descripcionBien}
                    onChange={handleChange}
                    required
                    placeholder="Ej: Café con Moringa / Pack Afiliación"
                    className="mg-input"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 3. Detalle de la Reclamación */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--sp-4)' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--surface-gold)', color: 'var(--gold-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '12px' }}>3</div>
              <h2 style={{ fontSize: 'var(--fs-md)', color: 'var(--text-strong)', margin: 0 }}>
                Detalle de la Reclamación y Pedido
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 'var(--sp-4)',
                  backgroundColor: 'var(--surface-sunken)',
                  padding: 'var(--sp-3)',
                  borderRadius: 'var(--r-sm)',
                }}
              >
                <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <input
                      type="radio"
                      name="tipoReclamacion"
                      value="Reclamo"
                      checked={formData.tipoReclamacion === 'Reclamo'}
                      onChange={handleChange}
                    />
                    <strong style={{ fontSize: 'var(--fs-sm)' }}>RECLAMO</strong>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', paddingLeft: '20px' }}>
                    Disconformidad relacionada a los productos o servicios adquiridos.
                  </span>
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <input
                      type="radio"
                      name="tipoReclamacion"
                      value="Queja"
                      checked={formData.tipoReclamacion === 'Queja'}
                      onChange={handleChange}
                    />
                    <strong style={{ fontSize: 'var(--fs-sm)' }}>QUEJA</strong>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', paddingLeft: '20px' }}>
                    Malestar o descontento respecto a la atención recibida.
                  </span>
                </label>
              </div>

              <div>
                <label className="mg-label">Detalle de los Hechos *</label>
                <textarea
                  name="detalle"
                  value={formData.detalle}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Describe claramente los hechos ocurridos..."
                  className="mg-input"
                  style={{ width: '100%', resize: 'vertical' }}
                />
              </div>

              <div>
                <label className="mg-label">Pedido Concreto del Consumidor *</label>
                <textarea
                  name="pedido"
                  value={formData.pedido}
                  onChange={handleChange}
                  required
                  rows={2}
                  placeholder="¿Cuál es la solución que solicitas?"
                  className="mg-input"
                  style={{ width: '100%', resize: 'vertical' }}
                />
              </div>
            </div>
          </section>

          {/* Declaración y Consentimiento */}
          <div
            style={{
              paddingTop: 'var(--sp-4)',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--sp-3)',
            }}
          >
            <label style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: 'var(--fs-xs)', color: 'var(--text-body)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="declaracion"
                checked={formData.declaracion}
                onChange={handleChange}
                required
                style={{ marginTop: '2px' }}
              />
              <span>
                Declaro que los datos consignados en la presente hoja de reclamación son verdaderos y autorizo a {EMPRESA.razonSocial} a remitir la respuesta formal al correo electrónico proporcionado.
              </span>
            </label>

            <div
              style={{
                fontSize: '11px',
                color: 'var(--text-muted)',
                lineHeight: '1.4',
                backgroundColor: 'var(--surface-sunken)',
                padding: '8px 12px',
                borderRadius: 'var(--r-xs)',
              }}
            >
              * La formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para denunciar ante INDECOPI. El plazo de atención legal es de máximo <strong>15 días hábiles</strong>.
            </div>
          </div>

          <button
            type="submit"
            data-testid="btn-submit-lr"
            style={{
              backgroundColor: 'var(--brand-gold)',
              color: 'var(--n-700)',
              fontWeight: 700,
              fontSize: 'var(--fs-md)',
              padding: '14px 28px',
              borderRadius: 'var(--r-pill)',
              border: 'none',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'background-color var(--dur-fast) var(--ease-out)',
            }}
          >
            <BookOpen size={18} />
            <span>Registrar Hoja de Reclamación</span>
          </button>
        </form>
      </main>
    </div>
  );
}
