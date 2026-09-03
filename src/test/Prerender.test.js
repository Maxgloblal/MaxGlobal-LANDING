import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

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

  it('3 · La og:image del café apunta a la imagen webp del café y no a la portada', () => {
    const cafeHtml = fs.readFileSync(path.join(distDir, 'productos/cafe-moringa/index.html'), 'utf8');
    expect(cafeHtml).toMatch(/property="og:image"\s+content="https:\/\/maxglobaloficial\.com\/images\/productos\/cafe-moringa\.webp"/i);
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

