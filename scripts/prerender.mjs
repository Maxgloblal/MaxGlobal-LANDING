import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PRODUCTOS } from '../src/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');

const DOMINIO = (process.env.SITE_URL || 'https://maxglobaloficial.com').replace(/\/$/, '');

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const RUTAS_ESTATICAS = [
  {
    ruta: '/productos',
    title: 'Productos naturales — Max Global',
    description: 'Catálogo de moringa, colágeno y bienestar. Envíos a todo el Perú.',
    ogImage: `${DOMINIO}/images/og-image.jpg`,
    ogUrl: `${DOMINIO}/productos`
  },
  {
    ruta: '/packs-de-afiliacion',
    title: 'Packs de afiliación — Max Global',
    description: 'Cinco packs para empezar tu negocio, desde S/. 120.',
    ogImage: `${DOMINIO}/images/og-image.jpg`,
    ogUrl: `${DOMINIO}/packs-de-afiliacion`
  },
  {
    ruta: '/nosotros',
    title: 'Nosotros — Max Global',
    description: 'Quiénes somos y por qué elegir Max Global Corporation.',
    ogImage: `${DOMINIO}/images/og-image.jpg`,
    ogUrl: `${DOMINIO}/nosotros`
  },
  {
    ruta: '/registro',
    title: 'Regístrate — Max Global',
    description: 'Afíliate y empieza tu negocio con Max Global.',
    ogImage: `${DOMINIO}/images/og-image.jpg`,
    ogUrl: `${DOMINIO}/registro`
  },
  {
    ruta: '/confirmacion',
    title: 'Confirmación — Max Global',
    description: 'Tu pedido fue recibido.',
    ogImage: `${DOMINIO}/images/og-image.jpg`,
    ogUrl: `${DOMINIO}/confirmacion`
  },
  {
    ruta: '/terminos-y-condiciones',
    title: 'Términos y Condiciones — Max Global',
    description: 'Términos de uso y afiliación.',
    ogImage: `${DOMINIO}/images/og-image.jpg`,
    ogUrl: `${DOMINIO}/terminos-y-condiciones`
  },
  {
    ruta: '/politica-de-privacidad',
    title: 'Política de Privacidad — Max Global',
    description: 'Cómo tratamos tus datos personales. Ley 29733.',
    ogImage: `${DOMINIO}/images/og-image.jpg`,
    ogUrl: `${DOMINIO}/politica-de-privacidad`
  },
  {
    ruta: '/libro-de-reclamaciones',
    title: 'Libro de Reclamaciones — Max Global',
    description: 'Libro de reclamaciones virtual.',
    ogImage: `${DOMINIO}/images/og-image.jpg`,
    ogUrl: `${DOMINIO}/libro-de-reclamaciones`
  }
];

const RUTAS_PRODUCTOS = PRODUCTOS.filter((p) => p.activo).map((p) => {
  const descRaw = p.descripcion || '';
  const desc = descRaw.length > 155 ? descRaw.slice(0, 152) + '...' : descRaw;
  return {
    ruta: `/productos/${p.id}`,
    title: `${p.nombre} — Max Global`,
    description: desc,
    ogImage: `${DOMINIO}${p.imagen}`,
    ogUrl: `${DOMINIO}/productos/${p.id}`
  };
});

const TODAS_LAS_RUTAS = [...RUTAS_ESTATICAS, ...RUTAS_PRODUCTOS];

function prerender() {
  const templatePath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('❌ Error: dist/index.html no existe. Ejecuta vite build primero.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(templatePath, 'utf8');
  let procesadas = 0;

  for (const item of TODAS_LAS_RUTAS) {
    const canonicalUrl = `${DOMINIO}${item.ruta}`;
    let html = baseHtml;

    // 1. Reemplazar <title>
    html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(item.title)}</title>`);

    // 2. Reemplazar meta description
    html = html.replace(
      /<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta name="description" content="${escapeHtml(item.description)}" />`
    );

    // 3. Reemplazar canonical URL
    html = html.replace(
      /<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i,
      `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`
    );

    // 4. Reemplazar Open Graph
    html = html.replace(
      /<meta\s+property=["']og:url["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta property="og:url" content="${escapeHtml(item.ogUrl)}" />`
    );
    html = html.replace(
      /<meta\s+property=["']og:title["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta property="og:title" content="${escapeHtml(item.title)}" />`
    );
    html = html.replace(
      /<meta\s+property=["']og:description["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta property="og:description" content="${escapeHtml(item.description)}" />`
    );
    html = html.replace(
      /<meta\s+property=["']og:image["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta property="og:image" content="${escapeHtml(item.ogImage)}" />`
    );

    // 5. Reemplazar Twitter Cards
    html = html.replace(
      /<meta\s+name=["']twitter:url["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta name="twitter:url" content="${escapeHtml(item.ogUrl)}" />`
    );
    html = html.replace(
      /<meta\s+name=["']twitter:title["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta name="twitter:title" content="${escapeHtml(item.title)}" />`
    );
    html = html.replace(
      /<meta\s+name=["']twitter:description["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta name="twitter:description" content="${escapeHtml(item.description)}" />`
    );
    html = html.replace(
      /<meta\s+name=["']twitter:image["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta name="twitter:image" content="${escapeHtml(item.ogImage)}" />`
    );

    // Crear directorio de destino
    const targetDir = path.join(DIST_DIR, item.ruta.replace(/^\//, ''));
    fs.mkdirSync(targetDir, { recursive: true });

    // Guardar index.html
    const targetFile = path.join(targetDir, 'index.html');
    fs.writeFileSync(targetFile, html, 'utf8');
    procesadas++;
  }

  console.log(`✓ Prerenderizado completado: ${procesadas} páginas generadas en dist/ (+ 1 index.html raíz = ${procesadas + 1} archivos HTML).`);
}

prerender();
