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
