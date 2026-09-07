import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = (
  process.env.VITE_SUPABASE_URL ||
  'https://utlohnidkuvxqppmoevj.supabase.co'
).replace(/\/$/, '');

const SUPABASE_ANON_KEY =
  process.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0bG9obmlka3V2eHFwcG1vZXZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4NzgyMzYsImV4cCI6MjEwMzQ1NDIzNn0.jd0uktH9xcFNEKOErOVUE5UdvbXYqrJncLBsSXE2WvE';

const TARGET_FILE = path.resolve(__dirname, '../src/data/productos-generado.json');

export async function generarCatalogo() {
  console.log('🔄 [generar-catalogo] Consultando catálogo oficial desde Supabase...');

  const endpoint = `${SUPABASE_URL}/rest/v1/producto?activo=eq.true&order=orden.asc`;

  let response;
  try {
    response = await fetch(endpoint, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
  } catch (err) {
    console.error('❌ Error de conexión al consultar Supabase:', err.message);
    console.error('   Verifica tu conexión a internet o el estado del proyecto en Supabase.');
    process.exit(1);
  }

  if (!response.ok) {
    console.error(`❌ Error HTTP al consultar productos: ${response.status} ${response.statusText}`);
    const errorBody = await response.text().catch(() => '');
    if (errorBody) console.error(`   Detalle: ${errorBody}`);
    process.exit(1);
  }

  const productosDb = await response.json();

  if (!Array.isArray(productosDb)) {
    console.error('❌ La respuesta de Supabase no es un arreglo de productos.');
    process.exit(1);
  }

  // Validación estricta por cada producto
  const productosMapeados = productosDb.map((p) => {
    if (!p.slug) {
      console.error(`❌ Producto ID ${p.id} (${p.codigo || 'sin código'}): falta 'slug'.`);
      process.exit(1);
    }
    if (!p.nombre) {
      console.error(`❌ Producto ID ${p.id} (${p.codigo || p.slug}): falta 'nombre'.`);
      process.exit(1);
    }
    if (!p.imagen_url) {
      console.error(`❌ Producto ID ${p.id} (${p.codigo || p.slug}): falta 'imagen_url' (rompería tarjetas de WhatsApp).`);
      process.exit(1);
    }

    return {
      id: p.slug,
      nombre: p.nombre,
      descripcion: p.descripcion || '',
      precioPublico: Math.round(Number(p.precio_lista_cent)) / 100,
      puntos: Number(p.puntos) || 0,
      categoria: p.categoria || 'General',
      presentacion: p.presentacion || null,
      imagen: p.imagen_url,
      activo: p.activo
    };
  });

  // Asegurar directorio destino
  const dir = path.dirname(TARGET_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(TARGET_FILE, JSON.stringify(productosMapeados, null, 2) + '\n', 'utf8');
  console.log(`✓ [generar-catalogo] Catálogo generado con éxito: ${productosMapeados.length} productos activos en ${TARGET_FILE}`);
  return productosMapeados;
}

// Ejecución directa por CLI
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  generarCatalogo().catch((err) => {
    console.error('❌ Error no controlado en generarCatalogo:', err);
    process.exit(1);
  });
}
