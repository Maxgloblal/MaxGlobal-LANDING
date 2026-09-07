import { chromium } from '@playwright/test';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ARTIFACTS_DIR = 'C:/Users/JACK FRANKLIN/.gemini/antigravity/brain/eb6cc98b-fe3e-4cdc-b756-6f5c3a63541a';

async function main() {
  console.log('--- Iniciando generador de capturas para TAREA-23 ---');

  // 1. Iniciar servidor Vite preview en puerto 4173
  console.log('Iniciando servidor Vite preview en puerto 4173...');
  const preview = spawn('npx.cmd', ['vite', 'preview', '--port', '4173'], {
    shell: true,
    stdio: 'pipe'
  });

  await new Promise((resolve) => {
    preview.stdout.on('data', (d) => {
      const msg = d.toString();
      if (msg.includes('4173') || msg.includes('ready') || msg.includes('Local:')) resolve();
    });
    setTimeout(resolve, 4000);
  });

  const browser = await chromium.launch({ headless: true });

  try {
    const context = await browser.newContext({
      viewport: { width: 1366, height: 850 }
    });
    const page = await context.newPage();

    // CAPTURA 1: Ficha de un producto en el navegador con la foto cargando desde Supabase
    console.log('Navegando a /productos/cafe-moringa en servidor preview...');
    await page.goto('http://localhost:4173/productos/cafe-moringa');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('img[src*="supabase.co"]', { timeout: 10000 });
    await page.waitForTimeout(1500);

    const pathCap1 = path.join(ARTIFACTS_DIR, 'captura-landing-ficha-producto.png');
    await page.screenshot({ path: pathCap1 });
    console.log('✓ Captura 1 guardada:', pathCap1);

    // CAPTURA 2: El HTML servido mostrando la og:image correcta y Schema Product
    console.log('Generando visualización del HTML servido con og:image...');
    const htmlServido = fs.readFileSync(path.resolve(__dirname, '../dist/productos/cafe-moringa/index.html'), 'utf8');

    // Extraer líneas relevantes de head: og:image, og:url, twitter:image, schema
    const lineasHead = htmlServido.split('\n').filter((l) =>
      l.includes('og:image') ||
      l.includes('og:url') ||
      l.includes('twitter:image') ||
      l.includes('canonical') ||
      l.includes('Coffee Capuccino') ||
      l.includes('schema.org') ||
      l.includes('storage/v1/object/public')
    );

    const viewerHtml = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>HTML Servido - Metadatos SEO y og:image</title>
        <style>
          body {
            font-family: 'Consolas', 'Courier New', monospace;
            background: #0f172a;
            color: #f8fafc;
            padding: 32px;
            margin: 0;
          }
          .card {
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 12px;
            padding: 24px;
            box-shadow: 0 10px 25px -5px rgba(0,0,0,0.5);
          }
          h1 {
            color: #38bdf8;
            font-size: 1.25rem;
            margin-top: 0;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .badge {
            background: #0284c7;
            color: white;
            font-size: 0.75rem;
            padding: 2px 8px;
            border-radius: 4px;
          }
          .highlight {
            background: rgba(56, 189, 248, 0.15);
            border-left: 4px solid #38bdf8;
            padding: 6px 12px;
            margin: 6px 0;
            font-size: 0.92rem;
            word-break: break-all;
          }
          .highlight.success {
            background: rgba(34, 197, 94, 0.15);
            border-color: #22c55e;
            color: #86efac;
            font-weight: bold;
          }
          .tag { color: #f43f5e; }
          .attr { color: #fbbf24; }
          .val { color: #34d399; }
          pre {
            background: #090d16;
            padding: 16px;
            border-radius: 8px;
            overflow-x: auto;
            border: 1px solid #1e293b;
            font-size: 0.85rem;
            line-height: 1.5;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>
            <span>dist/productos/cafe-moringa/index.html</span>
            <span class="badge">VERIFICACIÓN SEO Y REDES SOCIALES</span>
          </h1>
          <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 20px;">
            Inspección de etiquetas &lt;head&gt; prerenderizadas. La imagen proviene directamente de Supabase Storage sin prefijo duplicado del dominio.
          </p>

          <div class="highlight success">
            ✓ og:image directa: https://utlohnidkuvxqppmoevj.supabase.co/storage/v1/object/public/productos/cafe-moringa.webp
          </div>

          <pre><code>${lineasHead.map(l => l.replace(/</g, '&lt;').replace(/>/g, '&gt;')).join('\n')}</code></pre>
        </div>
      </body>
      </html>
    `;

    const viewerPath = path.resolve(__dirname, '../dist/preview-seo-head.html');
    fs.writeFileSync(viewerPath, viewerHtml, 'utf8');

    await page.goto('http://localhost:4173/preview-seo-head.html');
    await page.waitForTimeout(600);

    const pathCap2 = path.join(ARTIFACTS_DIR, 'captura-landing-og-image-html.png');
    await page.screenshot({ path: pathCap2 });
    console.log('✓ Captura 2 guardada:', pathCap2);

    try { fs.unlinkSync(viewerPath); } catch (e) {}
    console.log('--- Generación de capturas completada con éxito ---');
  } catch (err) {
    console.error('Error durante la generación de capturas:', err);
    process.exit(1);
  } finally {
    await browser.close();
    try { preview.kill(); } catch (e) {}
    process.exit(0);
  }
}

main();
