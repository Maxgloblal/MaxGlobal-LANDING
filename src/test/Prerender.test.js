import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

describe('TAREA-08 · Prerenderizado Estático y Metadatos Open Graph', () => {
  const distDir = path.resolve(__dirname, '../../dist');

  it('1 · Existen los 17 archivos index.html en dist', () => {
    function getFiles(dir, files = []) {
      for (const f of fs.readdirSync(dir)) {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) getFiles(full, files);
        else if (f === 'index.html') files.push(full.replace(/\\/g, '/'));
      }
      return files;
    }
    const all = getFiles(distDir);
    expect(all.length).toBe(17);
  });

  it('2 · El título del café en dist/productos/cafe-moringa es específico del producto', () => {
    const cafeHtml = fs.readFileSync(path.join(distDir, 'productos/cafe-moringa/index.html'), 'utf8');
    expect(cafeHtml).toMatch(/<title>Coffee Capuccino — Max Global<\/title>/i);
  });

  it('3 · La og:image del café apunta a la imagen de Supabase sin dominio local delante', () => {
    const cafeHtml = fs.readFileSync(path.join(distDir, 'productos/cafe-moringa/index.html'), 'utf8');
    const supabaseUrl = (process.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
    if (supabaseUrl) {
      const escapedUrl = supabaseUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      expect(cafeHtml).toMatch(new RegExp(`property="og:image"\\s+content="${escapedUrl}\\/storage\\/v1\\/object\\/public\\/productos\\/cafe-moringa\\.webp"`, 'i'));
    } else {
      expect(cafeHtml).toMatch(/property="og:image"\s+content="https:\/\/[a-z0-9-]+\.supabase\.co\/storage\/v1\/object\/public\/productos\/cafe-moringa\.webp"/i);
    }
    expect(cafeHtml).not.toContain('maxglobaloficial.comhttps');
  });

  it('4 · La og:url de packs apunta a /packs-de-afiliacion', () => {
    const packsHtml = fs.readFileSync(path.join(distDir, 'packs-de-afiliacion/index.html'), 'utf8');
    expect(packsHtml).toMatch(/property="og:url"\s+content="https:\/\/maxglobaloficial\.com\/packs-de-afiliacion"/i);
  });

  it('5 · Únicamente dist/index.html contiene el título de portada', () => {
    function getFiles(dir, files = []) {
      for (const f of fs.readdirSync(dir)) {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) getFiles(full, files);
        else if (f === 'index.html') files.push(full.replace(/\\/g, '/'));
      }
      return files;
    }
    const all = getFiles(distDir);
    const matchPortada = all.filter(f => {
      const content = fs.readFileSync(f, 'utf8');
      return content.includes('Salud, Bienestar y Emprendimiento');
    });
    expect(matchPortada.length).toBe(1);
    expect(matchPortada[0]).toMatch(/dist\/index\.html$/);
  });
});

describe('TAREA-09 · Schema Product y Limpieza Pre-Despliegue', () => {
  const distDir = path.resolve(__dirname, '../../dist');

  it('1 · dist/productos/cafe-moringa/index.html contiene "@type": "Product"', () => {
    const cafeHtml = fs.readFileSync(path.join(distDir, 'productos/cafe-moringa/index.html'), 'utf8');
    expect(cafeHtml).toContain('"@type": "Product"');
  });

  it('2 · ese mismo archivo contiene "price": "150.00"', () => {
    const cafeHtml = fs.readFileSync(path.join(distDir, 'productos/cafe-moringa/index.html'), 'utf8');
    expect(cafeHtml).toContain('"price": "150.00"');
  });

  it('3 · ese mismo archivo contiene "priceCurrency": "PEN"', () => {
    const cafeHtml = fs.readFileSync(path.join(distDir, 'productos/cafe-moringa/index.html'), 'utf8');
    expect(cafeHtml).toContain('"priceCurrency": "PEN"');
  });

  it('4 · el JSON del bloque Product parsea con JSON.parse sin error', () => {
    const cafeHtml = fs.readFileSync(path.join(distDir, 'productos/cafe-moringa/index.html'), 'utf8');
    const scripts = [...cafeHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
    const productScript = scripts.find(s => s[1].includes('"@type": "Product"'));
    expect(productScript).toBeDefined();

    let parsed;
    expect(() => {
      parsed = JSON.parse(productScript[1].trim());
    }).not.toThrow();

    expect(parsed['@context']).toBe('https://schema.org');
    expect(parsed['@type']).toBe('Product');
    expect(parsed.name).toBe('Coffee Capuccino');
    expect(parsed.offers).toBeDefined();
    expect(parsed.offers['@type']).toBe('Offer');
    expect(parsed.offers.price).toBe('150.00');
    expect(parsed.offers.priceCurrency).toBe('PEN');
    expect(parsed.offers.availability).toBe('https://schema.org/InStock');
  });

  it('5 · dist/index.html NO contiene "@type": "Product"', () => {
    const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
    expect(indexHtml).not.toContain('"@type": "Product"');
  });

  it('6 · las 8 fichas tienen bloque Product → contar 8', () => {
    function getFiles(dir, files = []) {
      for (const f of fs.readdirSync(dir)) {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) getFiles(full, files);
        else if (f === 'index.html') files.push(full.replace(/\\/g, '/'));
      }
      return files;
    }
    const all = getFiles(distDir);
    const productFiles = all.filter(f => /dist\/productos\/[^/]+\/index\.html$/.test(f));
    expect(productFiles.length).toBe(8);

    const withProductSchema = productFiles.filter(f => {
      const content = fs.readFileSync(f, 'utf8');
      return content.includes('"@type": "Product"');
    });
    expect(withProductSchema.length).toBe(8);
  });
});

describe('TAREA-23 · La Landing Lee el Catálogo de la Base y Generación Dinámica', () => {
  const distDir = path.resolve(__dirname, '../../dist');
  const catalogoPath = path.resolve(__dirname, '../data/productos-generado.json');
  const sitemapPath = path.join(distDir, 'sitemap.xml');

  // 5 · La og:image de una ficha es la URL de Supabase TAL CUAL, sin el dominio delante
  it('5 · La og:image de una ficha es la URL de Supabase TAL CUAL, sin el dominio delante', () => {
    const cafeHtml = fs.readFileSync(path.join(distDir, 'productos/cafe-moringa/index.html'), 'utf8');
    const matchOg = cafeHtml.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
    expect(matchOg).not.toBeNull();
    const ogImage = matchOg[1];

    const supabaseUrl = (process.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
    if (supabaseUrl) {
      expect(ogImage.startsWith(`${supabaseUrl}/`)).toBe(true);
    } else {
      expect(ogImage).toMatch(/^https:\/\/[a-z0-9-]+\.supabase\.co\//);
    }
    expect(ogImage).not.toContain('maxglobaloficial.comhttps');
    expect(cafeHtml).not.toMatch(/https:\/\/maxglobaloficial\.comhttps:\/\//);

    // Verificar en todas las 8 fichas de producto
    const productDirs = fs.readdirSync(path.join(distDir, 'productos')).filter(d => d !== 'index.html');
    expect(productDirs.length).toBe(8);
    for (const pDir of productDirs) {
      const pHtml = fs.readFileSync(path.join(distDir, `productos/${pDir}/index.html`), 'utf8');
      const pMatch = pHtml.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
      expect(pMatch).not.toBeNull();
      if (supabaseUrl) {
        expect(pMatch[1].startsWith(`${supabaseUrl}/`)).toBe(true);
      } else {
        expect(pMatch[1]).toMatch(/^https:\/\/[a-z0-9-]+\.supabase\.co\//);
      }
      expect(pMatch[1]).not.toContain('maxglobaloficial.comhttps');
    }
  });

  // 6 · El catálogo generado trae los 8 productos activos
  it('6 · El catálogo generado trae los 8 productos activos', () => {
    expect(fs.existsSync(catalogoPath)).toBe(true);
    const productos = JSON.parse(fs.readFileSync(catalogoPath, 'utf8'));
    expect(productos.length).toBe(8);
    for (const p of productos) {
      expect(p.activo).toBe(true);
      expect(p.id).toBeDefined();
      expect(p.nombre).toBeDefined();
      expect(p.imagen).toBeDefined();
      expect(p.precioPublico).toBeGreaterThan(0);
      expect(p.puntos).toBeGreaterThanOrEqual(0);
    }
  });

  // 7 · Si un producto está inactivo en la base, NO sale en el JSON
  it('7 · Si un producto está inactivo en la base, NO sale en el JSON', () => {
    const productos = JSON.parse(fs.readFileSync(catalogoPath, 'utf8'));
    const inactivos = productos.filter(p => p.activo === false);
    expect(inactivos.length).toBe(0);
  });

  // 8 · Si la consulta a Supabase falla, el script sale con código 1
  it('8 · Si la consulta a Supabase falla, el script sale con código 1', () => {
    const scriptPath = path.resolve(__dirname, '../../scripts/generar-catalogo.mjs');
    let exitCode = 0;
    try {
      execSync(`node "${scriptPath}"`, {
        env: { ...process.env, VITE_SUPABASE_URL: 'https://invalido-subdominio-inexistente.supabase.co' },
        stdio: 'pipe'
      });
    } catch (err) {
      exitCode = err.status;
    }
    expect(exitCode).toBe(1);
  });

  // 9 · El sitemap generado lista las 8 fichas de producto
  it('9 · El sitemap generado lista las 8 fichas de producto', () => {
    expect(fs.existsSync(sitemapPath)).toBe(true);
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    const matches = sitemapContent.match(/<loc>https:\/\/maxglobaloficial\.com\/productos\/[^<]+<\/loc>/g) || [];
    expect(matches.length).toBe(8);
  });

  // 10 · El sitemap NO lista /registro ni /confirmacion
  it('10 · El sitemap NO lista /registro ni /confirmacion', () => {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    expect(sitemapContent).not.toContain('/registro</loc>');
    expect(sitemapContent).not.toContain('/confirmacion</loc>');
    expect(sitemapContent).not.toContain('/libro-de-reclamaciones</loc>');
  });

  // 11 · Los nombres del JSON son los de la base: "Coffee Capuccino", no "Café"
  it('11 · Los nombres del JSON son los de la base: "Coffee Capuccino", no "Café"', () => {
    const productos = JSON.parse(fs.readFileSync(catalogoPath, 'utf8'));
    const cafe = productos.find(p => p.id === 'cafe-moringa');
    expect(cafe).toBeDefined();
    expect(cafe.nombre).toBe('Coffee Capuccino');
    expect(cafe.nombre).not.toBe('Café');

    const colageno = productos.find(p => p.id === 'colageno-hidrolizado');
    expect(colageno.nombre).toBe('Colágeno Aeterna');
  });
});


