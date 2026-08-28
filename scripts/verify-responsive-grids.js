import fs from 'node:fs';
import path from 'node:path';

const srcDir = path.resolve(process.cwd(), 'src');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.jsx')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk(srcDir);
let hasError = false;

console.log('--- Verificando reglas responsivas en archivos con Grid ---');

files.forEach((file) => {
  const content = fs.readFileSync(file, 'utf-8');
  const hasGrid = /gridTemplateColumns|display:\s*['"]grid['"]/.test(content);
  const hasMedia = /@media/.test(content);
  const relPath = path.relative(process.cwd(), file);

  if (hasGrid && !hasMedia) {
    console.error(`🔴 Grid sin @media query encontrado en: ${relPath}`);
    hasError = true;
  }
});

if (!hasError) {
  console.log('✅ Todos los archivos con Grid poseen sus respectivas media queries responsivas.');
} else {
  process.exit(1);
}
