# Max Global Corporation — Web Pública

Web pública oficial de Max Global Corporation.

## Stack tecnológico

- React 18
- Vite
- React Router

## Arranque y comandos

Instalación de dependencias:
```bash
npm install
```

Servidor de desarrollo:
```bash
npm run dev
```

Compilación para producción (incluye prerenderizado estático):
```bash
npm run build
```

Ejecución de pruebas unitarias y de integración:
```bash
npx vitest run
```

Ejecución de pruebas de extremo a extremo (E2E):
```bash
npx playwright test
```

## Estructura del proyecto

- `src/`: Código fuente de la aplicación React.
  - `components/`: Componentes reutilizables de la interfaz (encabezado, pie de página, carrito lateral, botón de WhatsApp).
  - `pages/`: Componentes correspondientes a cada página y vista del sitio.
  - `context/`: Contextos globales de estado (gestión del carrito de compras).
  - `styles/`: Sistema de diseño corporativo y tokens CSS (colores, tipografía, espaciado).
  - `test/`: Pruebas automatizadas de componentes y páginas con Vitest y Testing Library.
  - `config.js`: Archivo central de configuración de la empresa, productos, packs y cuentas bancarias.
- `public/`: Archivos estáticos servidos directamente por el servidor web.
  - `brand/`: Logotipos e isotipos corporativos.
  - `fonts/`: Archivos de fuentes tipográficas locales en formato WOFF2.
  - `images/`: Fotografías de catálogo y recursos visuales en formato WebP.
- `scripts/`: Scripts de compilación y post-procesamiento.
  - `prerender.mjs`: Script post-build que genera los archivos HTML estáticos para cada ruta con metadatos SEO y Schema.org.
- `e2e/`: Pruebas de integración de extremo a extremo automatizadas con Playwright.

## Páginas y rutas

Rutas principales:
- `/`: Portada institucional y propuesta de valor
- `/productos`: Catálogo general de productos
- `/packs-de-afiliacion`: Detalle y precios de los packs de afiliación
- `/nosotros`: Misión, visión e historia corporativa
- `/registro`: Formulario de registro de nuevos socios
- `/confirmacion`: Confirmación de recepción de datos y cuentas bancarias para abono

Páginas legales y normativas:
- `/terminos-y-condiciones`: Términos y condiciones de uso y afiliación
- `/politica-de-privacidad`: Política de privacidad y tratamiento de datos personales
- `/libro-de-reclamaciones`: Libro de reclamaciones virtual conforme a ley

Fichas individuales de producto (`/productos/:id`):
- `/productos/cafe-moringa`: Coffee Capuccino
- `/productos/colageno-hidrolizado`: Colágeno Aeterna
- `/productos/aceite-moringa`: Aceite de Moringa
- `/productos/esplendor`: Esplendor — Lágrimas Humectantes
- `/productos/aceite-oregano`: Aceite de Orégano
- `/productos/capsulas-moringa`: Cápsulas de Moringa
- `/productos/harina-moringa`: Moringa en Polvo
- `/productos/perfume-dalba`: Perfume Dalba

Ruta de error:
- `*`: Página 404 (recurso no encontrado)

## Despliegue en producción

El sitio está configurado para desplegarse en Vercel mediante el archivo de configuración `vercel.json`.

- Comando de build: `npm run build`
- Directorio de salida: `dist`
- Enrutamiento: Reglas de reescritura SPA definidas en `vercel.json` con soporte para archivos HTML prerenderizados.

## Dónde se cambian los datos

Cualquier cambio de información debe realizarse en su respectiva fuente oficial para evitar discrepancias:

- Precios y productos: `src/config.js` (constante `PRODUCTOS`). El precio declarado es el precio de venta al público; el precio de socio se calcula de manera automática según las reglas de negocio.
- Cuentas bancarias: `src/config.js` (constante `EMPRESA.cuentasBancarias`). La página de confirmación y las pruebas leen directamente de este arreglo. Si se añade, modifica o elimina una cuenta bancaria, se refleja automáticamente en todo el sistema.
- Packs de afiliación: `src/config.js` (constante `PACKS`). Contiene nombres, precios, beneficios y configuraciones de cada pack.
- Datos institucionales (RUC, razón social, teléfono, WhatsApp): `src/config.js` (objeto `EMPRESA`).
- Textos legales y normativos: Archivos en `src/pages/` (`TerminosCondiciones.jsx`, `PoliticaPrivacidad.jsx`, `LibroReclamaciones.jsx`).

## Nota del prerenderizado

El comando de compilación (`npm run build`) ejecuta automáticamente `scripts/prerender.mjs` tras el empaquetado de Vite. Este script lee las rutas y productos definidos en `src/config.js` y genera un archivo `index.html` estático individual para cada ruta dentro del directorio `dist/`.

Esto garantiza que rastreadores de motores de búsqueda como Google y aplicaciones de mensajería como WhatsApp lean las etiquetas Open Graph, Twitter Cards y datos estructurados JSON-LD (`Product` y `Organization`) específicos de cada página sin depender de la ejecución previa de JavaScript en el cliente. No debe eliminarse el archivo `scripts/prerender.mjs` ni modificarse el script de build en `package.json`.
