import fs from 'fs';
import path from 'path';

function getFiles(dir, files = []) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) getFiles(full, files);
    else if (f === 'index.html') files.push(full.replace(/\\/g, '/'));
  }
  return files;
}

console.log('=== 1 · EXISTEN LOS 17 ARCHIVOS ===');
const all = getFiles('dist').sort();
console.log(`Total encontrados: ${all.length}`);
all.forEach(f => console.log(f));

console.log('\n=== 2 · EL TITULO DEL CAFE ===');
const cafeHtml = fs.readFileSync('dist/productos/cafe-moringa/index.html', 'utf8');
const mTitle = cafeHtml.match(/<title>[^<]*<\/title>/i);
console.log(mTitle ? mTitle[0] : 'NO ENCONTRADO');

console.log('\n=== 3 · LA OG:IMAGE DEL CAFE ===');
const mImg = cafeHtml.match(/property="og:image"\s+content="[^"]*"/i);
console.log(mImg ? mImg[0] : 'NO ENCONTRADO');

console.log('\n=== 4 · LA OG:URL DE PACKS ===');
const packsHtml = fs.readFileSync('dist/packs-de-afiliacion/index.html', 'utf8');
const mUrl = packsHtml.match(/property="og:url"\s+content="[^"]*"/i);
console.log(mUrl ? mUrl[0] : 'NO ENCONTRADO');

console.log('\n=== 5 · BUSQUEDA DE TITULO DE PORTADA ===');
const matchPortada = all.filter(f => {
  const content = fs.readFileSync(f, 'utf8');
  return content.includes('Salud, Bienestar y Emprendimiento');
});
matchPortada.forEach(f => console.log(f));
