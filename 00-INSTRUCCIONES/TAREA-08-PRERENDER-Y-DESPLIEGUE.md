# TAREA-08 · PRERENDERIZADO Y DESPLIEGUE DE LA LANDING

**Para:** Antigravity
**Escrita:** 28 de agosto de 2026
**Cierra la Fase 1.**

> **Esto no depende del dominio.** Vercel da un subdominio gratis al desplegar.
> Se sube hoy, se le muestra a Máximo hoy, y el día que
> `maxglobaloficial.com` esté listo se conecta en cinco minutos sin tocar
> una línea de código.
>
> **Deploy: Vercel** (no Netlify). `vercel.json` ya existe. Sin `_redirects`.

---

## 🔴 REGLA DE REPORTE

La salida se **pega literal**. Al terminar, siempre:

```bash
git status --short
grep -rlP '\x00' src/ scripts/
npm run build
npx vitest run
```

**Si `git status --short` no está vacío, la tarea no está terminada.**

---

# EL PROBLEMA, EN UNA FRASE

La landing es una SPA: **las 10 rutas devuelven el mismo `index.html`** con las
etiquetas `og:` fijas de la portada, y **el robot de WhatsApp no ejecuta
JavaScript**.

```
   Alguien comparte  maxglobaloficial.com/productos/cafe-moringa
   WhatsApp muestra  "Max Global Corporation — Salud, Bienestar..."
                     con la foto de la portada

   Debería mostrar   "Coffee Capuccino — Max Global"
                     con la foto del café
```

**Ya se dio esto por resuelto una vez sin verificarlo.** Esta vez se comprueba
leyendo el HTML generado en `dist/`, no el código fuente.

---

# BLOQUE 1 · EL SCRIPT DE PRERENDERIZADO

Crea `scripts/prerender.mjs`.

## 🔴 Sin Puppeteer, sin navegador, sin dependencias nuevas

Las rutas son fijas y sus `og:` son estáticas. **No hace falta renderizar
React.** El script:

```
   1 · lee dist/index.html — el que ya generó vite build
   2 · por cada ruta, reemplaza <title>, description y las og:
   3 · escribe dist/<ruta>/index.html
```

Eso es todo. Unas 60 líneas.

## Las rutas y sus metas

Sácalas de `src/config.js`, **no las escribas a mano**.

| Ruta | title | description |
|---|---|---|
| `/` | *la que ya existe* | *la que ya existe* |
| `/productos` | Productos naturales — Max Global | Catálogo de moringa, colágeno y bienestar. Envíos a todo el Perú. |
| `/packs-de-afiliacion` | Packs de afiliación — Max Global | Cinco packs para empezar tu negocio, desde S/. 120. |
| `/nosotros` | Nosotros — Max Global | Quiénes somos y por qué elegir Max Global Corporation. |
| `/registro` | Regístrate — Max Global | Afíliate y empieza tu negocio con Max Global. |
| `/confirmacion` | Confirmación — Max Global | Tu pedido fue recibido. |
| `/terminos-y-condiciones` | Términos y Condiciones — Max Global | Términos de uso y afiliación. |
| `/politica-de-privacidad` | Política de Privacidad — Max Global | Cómo tratamos tus datos personales. Ley 29733. |
| `/libro-de-reclamaciones` | Libro de Reclamaciones — Max Global | Libro de reclamaciones virtual. |

## Y una por producto

`PRODUCTOS` de `src/config.js` tiene los 8 activos con `id`, `nombre`,
`descripcion` e `imagen`.

```
   ruta          /productos/{id}
   title         {nombre} — Max Global
   description   {descripcion}   ← recortada a 155 caracteres
   og:image      https://<dominio>{imagen}
   og:url        https://<dominio>/productos/{id}
```

## 🔴 Escapa el HTML

Un nombre o descripción con comillas o `&` rompe el atributo y deja la etiqueta
inservible. Escapa `& < > "` antes de insertar.

## 🔴 El dominio va en una constante, arriba del archivo

```js
const DOMINIO = process.env.SITE_URL || 'https://maxglobaloficial.com';
```

Así el día que se despliegue en el subdominio de Vercel se pasa por variable
de entorno y no se toca el código.

## Conéctalo al build

```json
"build": "vite build && node scripts/prerender.mjs"
```

**Commit.**

---

# BLOQUE 2 · VERIFICAR EL HTML SERVIDO — NO EL CÓDIGO

**Esta es la parte que se saltó la vez pasada.**

```bash
npm run build

# 1 · ¿existen los 17 archivos?
find dist -name "index.html" | sort

# 2 · el título del café — tiene que decir Coffee Capuccino
grep -o "<title>[^<]*</title>" dist/productos/cafe-moringa/index.html

# 3 · la og:image del café — NO puede ser og-image.jpg
grep -o 'og:image" content="[^"]*"' dist/productos/cafe-moringa/index.html

# 4 · la og:url de packs
grep -o 'og:url" content="[^"]*"' dist/packs-de-afiliacion/index.html

# 5 · 🔴 ninguna página que no sea la portada puede tener el título de portada
grep -rl "Salud, Bienestar y Emprendimiento" dist --include=index.html
```

**La consulta 5 tiene que devolver únicamente `dist/index.html`.**
Si aparece cualquier otra, el prerenderizado no funcionó.

**Pega la salida de las cinco.**

**Commit.**

---

# BLOQUE 3 · QUE LAS RUTAS SIGAN FUNCIONANDO AL NAVEGAR

Prerenderizar no puede romper la navegación del lado del cliente.

```
   Entrar directo a /productos/cafe-moringa   → carga y muestra el producto
   Navegar desde la portada                    → sigue funcionando igual
   Una ruta inventada /asdf                    → muestra el 404 de la app
```

Vercel sirve primero el archivo real si existe. Pero confírma que las rutas
prerenderizadas carguen correctamente con Playwright a 390px y en escritorio.
(No hay `dist/_redirects` — el repo usa `vercel.json`.)

**Commit.**

---

# BLOQUE 4 · DESPLEGAR EN VERCEL

## Vercel, con el subdominio gratis

`vercel.json` ya existe en la raíz con la regla de SPA routing. No hay `_redirects` — el repo está limpio.

Jack sube directamente desde la interfaz de Vercel (no Antigravity):
```
   Framework preset:   Vite
   Build command:      npm run build
   Output directory:   dist
   Variable de entorno: SITE_URL = https://<lo-que-asigne>.vercel.app
```

**No esperes el dominio.** Se despliega con el subdominio y listo.

Si lo despliega Antigravity por CLI:
```bash
npx vercel --prod
# cuando pregunte el output directory: dist
# cuando pregunte el build command: npm run build
```

## Después del despliegue, la prueba de verdad

```
   1 · Abre el sitio en el celular
   2 · Copia el enlace de UN PRODUCTO y mándalo por WhatsApp
   3 · Mira la tarjeta que aparece
```

**Tiene que salir el nombre y la foto de ese producto.** Si sale la portada,
no está resuelto — da igual lo que digan los greps.

> WhatsApp cachea las vistas previas. Si probaste el enlace antes del arreglo,
> usa `?v=2` al final para forzar que lo vuelva a leer.

**Manda la captura de la tarjeta de WhatsApp en el reporte.**

**Commit.**

---

# LO QUE ENTREGAS

```
   1 · La salida literal de las 5 verificaciones del bloque 2
   2 · La URL del sitio desplegado
   3 · La captura de la tarjeta de WhatsApp de un producto
   4 · git status --short vacío, pegado literal
```

---

# LO QUE NO SE TOCA

```
   ❌ El diseño          está aprobado
   ❌ El catálogo        está verificado contra las etiquetas
   ❌ Los textos legales están redactados
   ❌ El carrito y el WhatsApp con ?ref=   funcionan
```

**Esta tarea solo agrega HTML prerenderizado y despliega. Nada más.**
