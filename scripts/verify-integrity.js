import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('--- 1. Comprobando bytes nulos en src/ ---');
let nullByteFound = false;

function checkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      checkDir(fullPath);
    } else if (entry.isFile()) {
      const buffer = fs.readFileSync(fullPath);
      if (buffer.includes(0)) {
        console.error(`🔴 BYTE NULO ENCONTRADO EN: ${fullPath}`);
        nullByteFound = true;
      }
    }
  }
}

checkDir('src');

if (nullByteFound) {
  console.error('❌ FALLO: Se encontraron archivos corruptos con bytes nulos.');
  process.exit(1);
} else {
  console.log('✅ CERO bytes nulos en src/.');
}

console.log('--- 2. Comprobando compilación con esbuild ---');
try {
  execSync(
    'npx esbuild src/main.jsx --bundle --loader:.jsx=jsx --loader:.css=empty --outfile=esbuild-temp.js --external:react --external:react-dom --external:react-router-dom --external:lucide-react',
    { stdio: 'pipe' }
  );
  if (fs.existsSync('esbuild-temp.js')) {
    fs.unlinkSync('esbuild-temp.js');
  }
  console.log('✅ esbuild compiló src/main.jsx sin errores sintácticos.');
} catch (err) {
  console.error('❌ FALLO en esbuild:', err.stderr ? err.stderr.toString() : err.message);
  process.exit(1);
}

console.log('--- 3. Verificación de integridad SUPERADA con éxito ---');
