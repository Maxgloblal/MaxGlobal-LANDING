import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { MessageCircle, AlertCircle } from 'lucide-react';
import { EMPRESA, DEPARTAMENTOS, URL_REGISTRO_EDGE_FUNCTION } from '../config';
import { getPacks, getPack } from '../data/catalogo';

export default function Registro() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const packs = getPacks();

  // Preselección de pack si viene por URL (?pack=gold)
  const initialPack = searchParams.get('pack') || 'gold';
  const initialPatrocinador = searchParams.get('ref') || (typeof window !== 'undefined' ? sessionStorage.getItem('mg_ref') : '') || '';

  const [codigoEnlace, setCodigoEnlace] = useState(initialPatrocinador);
  const esReferidoBloqueado = Boolean(codigoEnlace && codigoEnlace.trim());

  const [formData, setFormData] = useState({
    nombre: '',
    dni: '',
    telefono: '',
    email: '',
    departamento: 'Lima',
    provincia: '',
    direccion: '',
    pack: initialPack,
    patrocinador: initialPatrocinador,
  });

  const [consent, setConsent] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState(null);

  useEffect(() => {
    const urlRef = searchParams.get('ref');
    if (urlRef) {
      sessionStorage.setItem('mg_ref', urlRef);
      setFormData((prev) => ({ ...prev, patrocinador: urlRef }));
      setCodigoEnlace(urlRef);
    } else {
      const storedRef = sessionStorage.getItem('mg_ref');
      if (storedRef) {
        setFormData((prev) => ({ ...prev, patrocinador: storedRef }));
        setCodigoEnlace(storedRef);
      }
    }
    const packParam = searchParams.get('pack');
    if (packParam) {
      setFormData((prev) => ({ ...prev, pack: packParam }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!consent || enviando) return;

    setEnviando(true);
    setErrorEnvio(null);

    // Separar nombres y apellidos si es necesario
    const partesNombre = (formData.nombre || '').trim().split(/\s+/);
    let nombresVal = formData.nombre;
    let apellidosVal = '-';
    if (partesNombre.length > 1) {
      nombresVal = partesNombre.slice(0, -1).join(' ');
      apellidosVal = partesNombre[partesNombre.length - 1];
    }

    const payload = {
      nombres: nombresVal,
      apellidos: apellidosVal,
      documento: formData.dni ? formData.dni.trim() : null,
      telefono: formData.telefono ? formData.telefono.trim() : '',
      email: formData.email ? formData.email.trim() : '',
      departamento: formData.departamento || null,
      provincia: formData.provincia || null,
      direccion: formData.direccion || null,
      pack_codigo: formData.pack,
      ref_codigo: formData.patrocinador ? formData.patrocinador.trim() : null,
      origen: 'landing'
    };

    // Armamos mensaje para enviar a WhatsApp
    const selectedPackObj = getPack(formData.pack) || packs[2] || { nombre: 'Pack Gold', precio: 1200 };
    const waMsg = `Hola, completé mi registro de afiliación:\n- Nombre: ${formData.nombre}\n- DNI: ${formData.dni}\n- Teléfono: ${formData.telefono}\n- Departamento: ${formData.departamento}, ${formData.provincia}\n- Pack: ${selectedPackObj.nombre} (S/. ${selectedPackObj.precio})\n${formData.patrocinador ? `Ref: ${formData.patrocinador}` : ''}`;

    try {
      const resp = await fetch(URL_REGISTRO_EDGE_FUNCTION, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const resJson = await resp.json().catch(() => ({}));

      if (!resp.ok) {
        throw new Error(resJson.error || `Error ${resp.status} al enviar la solicitud.`);
      }

      // Guardamos los datos de registro en sessionStorage para la pantalla de confirmación
      sessionStorage.setItem('mg_registro', JSON.stringify(formData));

      // Si se especificó patrocinador, aseguramos su persistencia
      if (formData.patrocinador) {
        sessionStorage.setItem('mg_ref', formData.patrocinador);
      }

      // Guardamos el mensaje en sessionStorage para la pantalla de confirmación
      sessionStorage.setItem('mg_wa_msg', waMsg);

      // Navegamos a confirmación
      navigate('/confirmacion');
    } catch (err) {
      console.error('Error al enviar formulario de afiliación:', err);
      setErrorEnvio(err.message || 'Hubo un problema de conexión. Puedes completar tu afiliación directamente por WhatsApp.');
    } finally {
      setEnviando(false);
    }
  };

  const waDudasUrl = `https://wa.me/${EMPRESA.whatsapp}?text=${encodeURIComponent('Hola, quiero afiliarme y tengo dudas sobre el pack.')}`;

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: 'var(--r-input)',
    border: '1px solid var(--border-subtle)',
    backgroundColor: 'var(--surface-page)',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--fs-sm)',
    color: 'var(--text-strong)',
    boxSizing: 'border-box',
    outline: 'none',
  };

  const labelStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    fontSize: 'var(--fs-xs)',
    fontFamily: 'var(--font-subtitle)',
    fontWeight: 700,
    color: 'var(--text-strong)',
  };

  const hintStyle = {
    fontSize: 'var(--fs-2xs)',
    color: 'var(--text-muted)',
    fontWeight: 400,
  };

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
          <span className="mg-eyebrow">Afiliación</span>
          <h1 style={{ marginTop: 'var(--sp-4)', fontSize: 'var(--fs-4xl)' }}>
            Regístrate para afiliarte
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
            Completa tus datos y un asesor te contacta por WhatsApp para cerrar tu afiliación.{' '}
            <span style={{ color: 'var(--text-strong)', fontWeight: 700 }}>
              No se cobra nada en este paso.
            </span>
          </p>
        </div>
      </section>

      {/* 2. Formulario y Aside */}
      <section style={{ paddingBottom: 'var(--section-y)' }}>
        <div className="mg-container mg-reg-grid">
          {/* Formulario */}
          <form
            onSubmit={handleSubmit}
            data-testid="form-registro"
            style={{
              backgroundColor: 'var(--surface-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--r-card)',
              padding: 'var(--sp-8)',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <div className="mg-form-grid">
              {/* Nombres y Apellidos */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>
                  <span>Nombres y apellidos *</span>
                  <input
                    type="text"
                    name="nombre"
                    required
                    placeholder="Como figura en tu DNI"
                    value={formData.nombre}
                    onChange={handleChange}
                    style={inputStyle}
                    data-testid="input-nombre"
                  />
                </label>
              </div>

              {/* DNI */}
              <div>
                <label style={labelStyle}>
                  <span>DNI *</span>
                  <input
                    type="text"
                    name="dni"
                    required
                    maxLength={8}
                    inputMode="numeric"
                    placeholder="8 dígitos"
                    value={formData.dni}
                    onChange={handleChange}
                    style={inputStyle}
                    data-testid="input-dni"
                  />
                </label>
              </div>

              {/* Celular / WhatsApp */}
              <div>
                <label style={labelStyle}>
                  <span>Celular / WhatsApp *</span>
                  <input
                    type="tel"
                    name="telefono"
                    required
                    inputMode="tel"
                    placeholder="9 dígitos"
                    value={formData.telefono}
                    onChange={handleChange}
                    style={inputStyle}
                    data-testid="input-telefono"
                  />
                  <span style={hintStyle}>Ahí te escribe el asesor</span>
                </label>
              </div>

              {/* Correo Electrónico */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>
                  <span>Correo electrónico *</span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="tucorreo@ejemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                    style={inputStyle}
                    data-testid="input-email"
                  />
                </label>
              </div>

              {/* Departamento */}
              <div>
                <label style={labelStyle}>
                  <span>Departamento *</span>
                  <select
                    name="departamento"
                    required
                    value={formData.departamento}
                    onChange={handleChange}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    data-testid="select-departamento"
                  >
                    {DEPARTAMENTOS.map((dep) => (
                      <option key={dep} value={dep}>
                        {dep}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {/* Provincia */}
              <div>
                <label style={labelStyle}>
                  <span>Provincia *</span>
                  <input
                    type="text"
                    name="provincia"
                    required
                    placeholder="Tu provincia"
                    value={formData.provincia}
                    onChange={handleChange}
                    style={inputStyle}
                    data-testid="input-provincia"
                  />
                </label>
              </div>

              {/* Dirección de Envío */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>
                  <span>Dirección de envío *</span>
                  <input
                    type="text"
                    name="direccion"
                    required
                    placeholder="Calle, número, referencia"
                    value={formData.direccion}
                    onChange={handleChange}
                    style={inputStyle}
                    data-testid="input-direccion"
                  />
                </label>
              </div>

              {/* Pack de Afiliación */}
              <div>
                <label style={labelStyle}>
                  <span>Pack que te interesa *</span>
                  <select
                    name="pack"
                    required
                    value={formData.pack}
                    onChange={handleChange}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    data-testid="select-pack"
                  >
                    {packs.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nombre} — S/. {p.precio.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {/* Código de Patrocinador */}
              <div>
                <label style={labelStyle}>
                  <span>Código de tu patrocinador</span>
                  <input
                    type="text"
                    name="patrocinador"
                    placeholder="MG-00000"
                    value={formData.patrocinador}
                    onChange={handleChange}
                    readOnly={esReferidoBloqueado}
                    style={{
                      ...inputStyle,
                      ...(esReferidoBloqueado
                        ? {
                            backgroundColor: 'var(--surface-sunken, #F8FAFC)',
                            cursor: 'not-allowed',
                            color: 'var(--text-strong)',
                            borderColor: 'var(--border-subtle)',
                          }
                        : {}),
                    }}
                    data-testid="input-patrocinador"
                  />
                  {esReferidoBloqueado ? (
                    <span
                      data-testid="mensaje-patrocinador-bloqueado"
                      style={{
                        ...hintStyle,
                        color: 'var(--brand-gold, #D1AD68)',
                        fontWeight: 700,
                      }}
                    >
                      Te invitó el socio {formData.patrocinador}
                    </span>
                  ) : (
                    <span style={hintStyle}>Se llena solo si llegaste por un enlace</span>
                  )}
                </label>
              </div>
            </div>

            {/* Checkboxes de Consentimiento */}
            <div
              style={{
                marginTop: 'var(--sp-8)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--sp-4)',
                paddingTop: 'var(--sp-6)',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'var(--sp-3)',
                  cursor: 'pointer',
                  fontSize: 'var(--fs-xs)',
                  lineHeight: 'var(--lh-normal)',
                  color: 'var(--text-body)',
                }}
              >
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  data-testid="checkbox-consent"
                  style={{ marginTop: '3px', accentColor: 'var(--brand-green)' }}
                />
                <span>
                  He leído y acepto los{' '}
                  <a
                    href="/terminos-y-condiciones"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--brand-green)', fontWeight: 700, textDecoration: 'underline' }}
                  >
                    Términos y Condiciones
                  </a>{' '}
                  y la{' '}
                  <a
                    href="/politica-de-privacidad"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--brand-green)', fontWeight: 700, textDecoration: 'underline' }}
                  >
                    Política de Privacidad
                  </a>{' '}
                  y autorizo el tratamiento de mis datos personales para gestionar mi afiliación conforme a la Ley N° 29733.
                </span>
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'var(--sp-3)',
                  cursor: 'pointer',
                  fontSize: 'var(--fs-xs)',
                  lineHeight: 'var(--lh-normal)',
                  color: 'var(--text-body)',
                }}
              >
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  data-testid="checkbox-marketing"
                  style={{ marginTop: '3px', accentColor: 'var(--brand-green)' }}
                />
                <span>Quiero recibir información sobre productos y promociones.</span>
              </label>
            </div>

            {/* Error de envío y salida por WhatsApp de respaldo */}
            {errorEnvio && (
              <div
                style={{
                  marginTop: 'var(--sp-6)',
                  padding: 'var(--sp-4) var(--sp-5)',
                  backgroundColor: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: 'var(--r-card)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--sp-3)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#DC2626' }}>
                  <AlertCircle size={18} />
                  <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 600 }}>{errorEnvio}</span>
                </div>
                <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-body)', margin: 0 }}>
                  No te preocupes: puedes enviar tus datos directamente a nuestro WhatsApp oficial para que un asesor te atienda de inmediato:
                </p>
                <a
                  href={`https://wa.me/${EMPRESA.whatsapp}?text=${encodeURIComponent(`Hola, completé mi registro de afiliación:\n- Nombre: ${formData.nombre}\n- DNI: ${formData.dni}\n- Teléfono: ${formData.telefono}\n- Departamento: ${formData.departamento}, ${formData.provincia}\n- Pack: ${formData.pack}\n${formData.patrocinador ? `Ref: ${formData.patrocinador}` : ''}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    backgroundColor: 'var(--whatsapp)',
                    color: '#FFFFFF',
                    padding: '10px 18px',
                    borderRadius: 'var(--r-pill)',
                    fontFamily: 'var(--font-subtitle)',
                    fontWeight: 700,
                    fontSize: 'var(--fs-sm)',
                    textDecoration: 'none',
                    width: 'fit-content',
                  }}
                >
                  <MessageCircle size={16} color="#FFFFFF" />
                  <span>Enviar datos por WhatsApp</span>
                </a>
              </div>
            )}

            {/* Botón Submit */}
            <div
              style={{
                marginTop: 'var(--sp-8)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--sp-4)',
                alignItems: 'center',
              }}
            >
              <button
                type="submit"
                disabled={!consent || enviando}
                data-testid="btn-submit-registro"
                style={{
                  padding: '14px 28px',
                  borderRadius: 'var(--r-pill)',
                  fontFamily: 'var(--font-subtitle)',
                  fontSize: 'var(--fs-md)',
                  fontWeight: 700,
                  backgroundColor: (consent && !enviando) ? 'var(--brand-gold)' : 'var(--n-200)',
                  color: (consent && !enviando) ? 'var(--n-700)' : 'var(--text-muted)',
                  border: 'none',
                  cursor: (consent && !enviando) ? 'pointer' : 'not-allowed',
                  transition: 'var(--t-control)',
                  boxShadow: (consent && !enviando) ? 'var(--shadow-gold)' : 'none',
                }}
              >
                {enviando ? 'Enviando...' : 'Enviar y hablar con un asesor'}
              </button>

              {!consent && (
                <span style={{ fontSize: 'var(--fs-2xs)', color: 'var(--text-muted)' }}>
                  Marca la primera casilla para poder enviar.
                </span>
              )}
            </div>
          </form>

          {/* Aside Lateral */}
          <aside
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--sp-6)',
              position: 'sticky',
              top: '100px',
            }}
          >
            <div
              style={{
                backgroundColor: 'var(--surface-gold)',
                border: '1px solid var(--border-gold)',
                borderRadius: 'var(--r-card)',
                padding: 'var(--sp-6)',
              }}
            >
              <h4 style={{ fontSize: 'var(--fs-md)', marginBottom: 'var(--sp-3)' }}>
                Qué pasa cuando envías
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
                <p style={{ fontSize: 'var(--fs-sm)', lineHeight: 'var(--lh-normal)', color: 'var(--n-600)' }}>
                  Un asesor te escribe por WhatsApp, confirma tu pack y te dice el costo del envío a tu dirección.
                </p>
                <p style={{ fontSize: 'var(--fs-sm)', lineHeight: 'var(--lh-normal)', color: 'var(--n-600)' }}>
                  Recién ahí se paga. En este formulario no se cobra nada.
                </p>
              </div>
            </div>

            <div
              style={{
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--r-card)',
                padding: 'var(--sp-6)',
                backgroundColor: 'var(--surface-card)',
              }}
            >
              <h4 style={{ fontSize: 'var(--fs-md)', marginBottom: 'var(--sp-2)' }}>
                ¿No sabes qué pack elegir?
              </h4>
              <p style={{ fontSize: 'var(--fs-sm)', lineHeight: 'var(--lh-relaxed)', color: 'var(--text-body)' }}>
                Compara los cinco packs antes de registrarte.
              </p>
              <div
                style={{
                  marginTop: 'var(--sp-5)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--sp-3)',
                }}
              >
                <Link
                  to="/packs-de-afiliacion"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--border-strong)',
                    backgroundColor: 'var(--surface-page)',
                    color: 'var(--text-strong)',
                    padding: '10px 16px',
                    borderRadius: 'var(--r-pill)',
                    fontFamily: 'var(--font-subtitle)',
                    fontWeight: 700,
                    fontSize: 'var(--fs-sm)',
                    textDecoration: 'none',
                    textAlign: 'center',
                  }}
                >
                  Ver los packs
                </Link>
                <a
                  href={waDudasUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    backgroundColor: 'var(--whatsapp)',
                    color: '#FFFFFF',
                    padding: '10px 16px',
                    borderRadius: 'var(--r-pill)',
                    fontFamily: 'var(--font-subtitle)',
                    fontWeight: 700,
                    fontSize: 'var(--fs-sm)',
                    textDecoration: 'none',
                    textAlign: 'center',
                  }}
                >
                  <MessageCircle size={16} color="#FFFFFF" />
                  <span>Hablar por WhatsApp</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <style>{`
        .mg-reg-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: var(--sp-12);
          align-items: start;
        }
        .mg-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--sp-5);
        }
        @media (max-width: 768px) {
          .mg-form-grid {
            grid-template-columns: 1fr !important;
          }
          .mg-reg-grid {
            grid-template-columns: 1fr !important;
            gap: var(--sp-8) !important;
          }
        }
        @media (max-width: 600px) {
          [data-testid="form-registro"] {
            padding: var(--sp-6) var(--sp-4) !important;
          }
          [data-testid="btn-submit-registro"] {
            width: 100% !important;
            text-align: center !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </div>
  );
}
