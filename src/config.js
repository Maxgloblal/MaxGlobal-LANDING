/**
 * Max Global Corporation — Configuración global del sitio web
 * Fuente única de datos oficial de la empresa, productos y packs.
 */

// Helper para calcular precio de socio (Regla de negocio: el precio público es el dato, el de socio se calcula)
export const precioSocio = (p, dto = 50) => Math.round(p * (1 - dto / 100));

export const EMPRESA = {
  nombreComercial: 'Max Global Corporation',
  razonSocial: 'Max Global Corporation S.A',
  ruc: '20615864014',
  domicilio: 'Lima, Perú',
  telefono: '993516053',
  whatsapp: '51993516053',
  whatsappDisplay: '+51 993 516 053',
  email: 'contacto@maxglobaloficial.com',
  cuentasBancarias: [
    {
      banco: 'BCP Soles',
      cuenta: '1947426439033',
      cci: '00219400742643903392',
      titular: 'Max Global Corporation S.A',
    },
    {
      banco: 'BBVA Soles',
      cuenta: '0011-0150-0200867749',
      cci: '011-150-000200867749-00',
      titular: 'Max Global Corporation S.A',
    },
  ],
  // Referencia rápida al banco principal
  banco: {
    nombre: 'BCP Soles',
    cuenta: '1947426439033',
    cci: '00219400742643903392',
    titular: 'Max Global Corporation S.A',
  },
};

// Endpoint oficial de la Edge Function para recepción de solicitudes públicas de afiliación
const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
export const URL_REGISTRO_EDGE_FUNCTION = `${SUPABASE_URL}/functions/v1/registro-afiliacion`;

export const DEPARTAMENTOS = [
  'Amazonas', 'Áncash', 'Apurímac', 'Arequipa', 'Ayacucho',
  'Cajamarca', 'Callao', 'Cusco', 'Huancavelica', 'Huánuco',
  'Ica', 'Junín', 'La Libertad', 'Lambayeque', 'Lima',
  'Loreto', 'Madre de Dios', 'Moquegua', 'Pasco', 'Piura',
  'Puno', 'San Martín', 'Tacna', 'Tumbes', 'Ucayali'
];

/* ============================================================
 * PACKS DE AFILIACIÓN
 * Campos canónicos únicamente. NO agregar alias duplicados
 * (name/price/features): se desincronizan en silencio.
 * ============================================================ */
export const PACKS = [
  {
    id: 'kit-emprendedor',
    nombre: 'Kit Emprendedor',
    precio: 120,
    puntosRango: 0,
    productos: '1 producto',
    nivelesResidual: 0,
    patrocinioNiveles: 'Nivel 1 (S/. 50.00)',
    descuentoRecompra: 40,
    descuentoEnPack: null,
    bonoGlobal: false,
    destacado: false,
    etiqueta: null,
    lead: 'Para probar el producto y empezar de a poco.',
    cta: 'Empezar con el Kit',
    descripcion: 'Inicia tu experiencia y prueba la calidad de nuestros productos.',
    beneficios: [
      { text: '1 producto incluido' },
      { text: '40% de descuento en tus recompras' },
      { text: 'Puedes invitar a otros Kit Emprendedor' },
      { text: 'Sin comisiones por niveles', muted: true },
    ],
    activo: true,
  },
  {
    id: 'ejecutivo',
    nombre: 'Pack Ejecutivo',
    precio: 360,
    puntosRango: 70,
    productos: '4 productos',
    nivelesResidual: 5,
    patrocinioNiveles: '3 Niveles',
    descuentoRecompra: 50,
    descuentoEnPack: 40,
    bonoGlobal: false,
    destacado: false,
    etiqueta: null,
    lead: 'El primer paso con comisiones reales.',
    cta: 'Elegir Ejecutivo',
    descripcion: 'Puntaje de activación del primer mes ya cubierto.',
    beneficios: [
      { text: '4 productos incluidos' },
      { text: '50% de descuento de por vida' },
      { text: 'Comisiones hasta 5 niveles' },
      { text: '70 puntos que cubren tu primer mes activo' },
    ],
    activo: true,
  },
  {
    id: 'gold',
    nombre: 'Pack Gold',
    precio: 1200,
    puntosRango: 150,
    productos: '13 productos',
    nivelesResidual: 10,
    patrocinioNiveles: '7 Niveles',
    descuentoRecompra: 50,
    descuentoEnPack: 40,
    bonoGlobal: true,
    destacado: true,
    etiqueta: 'El más elegido',
    lead: 'El plan completo. El que eligen la mayoría.',
    cta: 'Elegir Gold',
    descripcion: 'El pack más equilibrado para constructores de red: acceso a los 10 niveles de residual y al Bono Global.',
    beneficios: [
      { text: '13 productos incluidos' },
      { text: '50% de descuento de por vida' },
      { text: 'Comisiones hasta 10 niveles — el alcance máximo' },
      { text: '150 puntos de rango' },
      { text: 'Participas del Bono Global semestral' },
    ],
    activo: true,
  },
  {
    id: 'familiar',
    nombre: 'Pack Familiar',
    precio: 4000,
    puntosRango: 400,
    productos: 'Armado libre',
    nivelesResidual: 10,
    patrocinioNiveles: '7 Niveles',
    descuentoRecompra: 50,
    // Confirmado por Max Global el 27/08/2026:
    // "el pack de 4000 para armar su pack al 50%"
    descuentoEnPack: 50,
    bonoGlobal: true,
    destacado: false,
    etiqueta: null,
    lead: 'Arma tu propio pedido.',
    cta: 'Elegir Familiar',
    descripcion: 'Eliges libremente los productos hasta completar S/. 4,000, con 50% de descuento.',
    beneficios: [
      { text: 'Eliges tus productos con 50% de descuento hasta completar S/. 4,000' },
      { text: '50% de descuento de por vida en tus recompras' },
      { text: 'Comisiones hasta 10 niveles' },
      { text: '400 puntos de rango' },
      { text: 'Participas del Bono Global semestral' },
    ],
    activo: true,
  },
  {
    id: 'empresarial',
    nombre: 'Pack Empresarial',
    precio: 8000,
    puntosRango: 800,
    productos: 'Armado libre',
    nivelesResidual: 10,
    patrocinioNiveles: '7 Niveles',
    descuentoRecompra: 50,
    descuentoEnPack: 55,
    bonoGlobal: true,
    destacado: false,
    etiqueta: null,
    lead: 'Para quien va a manejar volumen.',
    cta: 'Elegir Empresarial',
    descripcion: 'Máximo volumen y el mejor descuento de armado del catálogo.',
    beneficios: [
      { text: 'Armas tu pedido con 55% de descuento' },
      { text: '50% de descuento de por vida en tus recompras' },
      { text: 'Comisiones hasta 10 niveles' },
      { text: '800 puntos de rango' },
      { text: 'Participas del Bono Global semestral' },
    ],
    activo: true,
  },
];

