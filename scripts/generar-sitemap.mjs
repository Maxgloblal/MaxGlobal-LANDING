import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');
const DOMINIO = (process.env.SITE_URL || 'https://maxglobaloficial.com').replace(/\/$/, '');

const PRODUCTOS_PATH = path.resolve(__dirname, '../src/data/productos-generado.json');

export function generarSitemap() {
  console.log('🔄 [generar-sitemap] Generando sitemap.xml dinámico...');

  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }

  // 1. Rutas fijas con sus prioridades
  const rutasFijas = [
    { ruta: '/', priority: '1.0' },
    { ruta: '/packs-de-afiliacion', priority: '0.9' },
    { ruta: '/productos', priority: '0.8' },
    { ruta: '/nosotros', priority: '0.5' },
    { ruta: '/terminos-y-condiciones', priority: '0.3' },
    { ruta: '/politica-de-privacidad', priority: '0.3' }
  ];

  // 2. Cargar productos generados
  let productos = [];
  if (fs.existsSync(PRODUCTOS_PATH)) {
    try {
      productos = JSON.parse(fs.readFileSync(PRODUCTOS_PATH, 'utf8'));
    } catch (err) {
      console.error('❌ Error al parsear productos-generado.json:', err.message);
      process.exit(1);
    }
  } else {
    console.error('❌ Error: src/data/productos-generado.json no existe. Ejecuta generar-catalogo primero.');
    process.exit(1);
  }

  // Rutas de productos activos
  const rutasProductos = productos
    .filter((p) => p.activo !== false)
    .map((p) => ({
      ruta: `/productos/${p.id}`,
      priority: '0.7'
    }));

  const todasLasRutas = [...rutasFijas, ...rutasProductos];

  // 3. Validación de exclusión estricta (Disallow en robots.txt)
  const rutasProhibidas = ['/registro', '/confirmacion', '/libro-de-reclamaciones'];
  for (const item of todasLasRutas) {
    if (rutasProhibidas.some((prohibida) => item.ruta === prohibida || item.ruta.startsWith(`${prohibida}/`))) {
      console.error(`❌ Intento de incluir ruta prohibida por robots.txt en el sitemap: ${item.ruta}`);
      process.exit(1);
    }
  }

  // 4. Construcción del XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const item of todasLasRutas) {
    const loc = `${DOMINIO}${item.ruta}`;
    xml += `  <url><loc>${loc}</loc><priority>${item.priority}</priority></url>\n`;
  }

  xml += '</urlset>\n';

  const sitemapDist = path.join(DIST_DIR, 'sitemap.xml');
  fs.writeFileSync(sitemapDist, xml, 'utf8');

  // Asegurar que public/sitemap.xml también exista para desarrollo y control de versiones
  const publicDir = path.resolve(__dirname, '../public');
  if (fs.existsSync(publicDir)) {
    const sitemapPublic = path.join(publicDir, 'sitemap.xml');
    fs.writeFileSync(sitemapPublic, xml, 'utf8');
  }

  console.log(`✓ [generar-sitemap] Sitemap dinámico generado con éxito: ${todasLasRutas.length} URLs en dist/sitemap.xml y public/sitemap.xml`);
  console.log(`   · Rutas fijas: ${rutasFijas.length}`);
  console.log(`   · Fichas de productos activos: ${rutasProductos.length}`);

  return sitemapDist;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  generarSitemap();
}
