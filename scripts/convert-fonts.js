import fs from 'fs';
import path from 'path';
import ttf2woff2 from 'ttf2woff2';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputDir = path.resolve(__dirname, '../_ds/max-global-design-system-db9172c7-eb06-4175-a281-c6d20ad52644/assets/fonts');
const outputDir = path.resolve(__dirname, '../public/fonts');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.ttf'));

for (const file of files) {
  const inputPath = path.join(inputDir, file);
  const outputFile = file.replace(/\.ttf$/, '.woff2');
  const outputPath = path.join(outputDir, outputFile);
  
  const inputBuffer = fs.readFileSync(inputPath);
  const outputBuffer = ttf2woff2(inputBuffer);
  fs.writeFileSync(outputPath, outputBuffer);
  
  const inKb = (inputBuffer.length / 1024).toFixed(1);
  const outKb = (outputBuffer.length / 1024).toFixed(1);
  console.log(`Converted: ${file} (${inKb} KB) -> ${outputFile} (${outKb} KB)`);
}
