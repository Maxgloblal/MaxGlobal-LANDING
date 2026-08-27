# AUDITORÍA DE LA LANDING

**Fecha:** 27 de agosto de 2026
**Auditó:** Claude · **Construyó:** Antigravity
**Estado:** 4 fallas críticas encontradas · 3 corregidas · 1 pendiente de Jack

---

# RESUMEN EN UNA TABLA

| | Cantidad |
|---|---|
| 🔴 Rompían algo en producción | **4** |
| 🟡 Faltaban del checklist | **5** |
| 🔵 Datos inventados sin respaldo | **3** |
| ✅ Correcto y verificado | 12 |

**Lo bueno:** las reglas de negocio están bien. Precios, packs, el bono del Kit y
las prohibiciones legales se respetaron.

**Lo malo:** el sitio no se podía publicar así. Las rutas daban 404 y la vista
previa de WhatsApp —lo más importante de este proyecto— estaba rota.

---

# 🔴 CRÍTICO 1 · Las rutas daban 404 — CORREGIDO

**Es la falla más grave y la que más daño hacía.**

El sitio es una SPA con React Router. Sin configuración del servidor, entrar
directo a `maxglobaloficial.com/packs-de-afiliacion` o simplemente **recargar la
página** devuelve 404.

```
   El socio comparte:  maxglobaloficial.com/packs-de-afiliacion?ref=MG-00417
   El prospecto abre:  404 NOT FOUND
```

**Todo el modelo de este negocio son enlaces compartidos por WhatsApp.** Sin
esto, la mitad de los enlaces mueren.

**Corregido:** se crearon `public/_redirects` (Netlify) y `vercel.json` (Vercel).

> Si se despliega en otro hosting —Hostinger, cPanel, Apache— hace falta un
> `.htaccess`. Está en la sección de despliegue al final.

---

# 🔴 CRÍTICO 2 · La imagen de portada pesaba 1.3 MB — CORREGIDO

```
   hero-products.webp
   Antes:   4096 × 4096 px   ·   1,296 KB
   Ahora:   1600 × 1600 px   ·     134 KB     ← 90% menos
```

Una imagen de 4096px no la necesita ninguna pantalla. El objetivo era mantener
la portada bajo 1 MB y **solo esa imagen se lo comía entero**.

El tráfico de este negocio llega de WhatsApp, en celular, muchas veces con datos
móviles. Un megabyte de más son varios segundos de espera.

---

# 🔴 CRÍTICO 3 · La vista previa de WhatsApp estaba rota — CORREGIDO

**Este era el punto que marqué como el más importante de todo el SEO**, porque
esa tarjeta se va a ver miles de veces cada vez que un socio comparta su enlace.

`og:image` apuntaba a la imagen del hero: **4096×4096 y 1.3 MB**.

WhatsApp espera aproximadamente **1200×630** y descarta las imágenes muy pesadas.
Resultado: la tarjeta salía sin imagen o recortada.

**Corregido:** se generó `public/images/og-image.jpg` — 1200×630, 63 KB, con el
logo y el producto. Se agregaron `og:image:width` y `og:image:height`.

> ⚠️ **Verifica esto tú antes de avisarle a los socios.** Pega el enlace en un
> chat de WhatsApp contigo mismo y mira cómo se ve.

---

# 🔴 CRÍTICO 4 · Preloads a fuentes inexistentes — CORREGIDO

`index.html` precargaba tres tipografías. **Dos no existían:**

| Pedía | Existe |
|---|---|
| `AgusSans-Bold.woff2` | ❌ solo hay `AgusSans-Regular.woff2` |
| `CaviarDreams-Bold.woff2` | ❌ es `CaviarDreams_Bold.woff2` — con guion bajo |
| `CaviarDreams.woff2` | ✅ |

Dos peticiones 404 en cada carga de página, y el navegador desperdiciando
prioridad alta en archivos que no llegan.

**Corregido:** los tres preloads apuntan a archivos reales.

---

# 🟡 FALTABAN DEL CHECKLIST — CORREGIDOS

| # | Qué faltaba | Estado |
|---|---|---|
| 1 | `robots.txt` | ✅ creado, con `Disallow` en registro y confirmación |
| 2 | `sitemap.xml` | ✅ creado, con las 4 páginas indexables |
| 3 | Datos estructurados JSON-LD | ✅ `Organization` agregado en `index.html` |
| 4 | Favicon cuadrado | ✅ generados 32, 180 y 512 px |
| 5 | `noindex` en registro y confirmación | ⚠️ **parcial** — ver abajo |

## ⚠️ El `noindex` sigue pendiente

Al ser una SPA, `index.html` tiene un solo `<meta name="robots">` global. Cambiar
el título por página se resolvió con `document.title`, pero **el meta robots no
cambia**.

El `robots.txt` que creé bloquea el rastreo de `/registro` y `/confirmacion`, que
cubre el 90% del caso. Para hacerlo bien haría falta `react-helmet-async`.

**No es urgente.** Un formulario indexado no hace daño real.

---

# 🔵 DATOS INVENTADOS — REVISAR CON MÁXIMO

**Antigravity completó información que nadie le dio.** No es malicia: rellenó
huecos para que el diseño se viera terminado. Pero son datos que van a estar
publicados.

## 1 · Las presentaciones de los productos

| Producto | Dice la web | ¿Confirmado? |
|---|---|---|
| Café con Moringa | Caja 30 sobres | ❌ inventado |
| Colágeno Hidrolizado | Pote 500g | ❌ inventado |
| Aceite de Moringa | Frasco gotero 30ml | ❌ inventado |
| Esplendor Facial | Frasco 50ml | ❌ inventado |
| Aceite de Orégano | Frasco gotero 15ml | ❌ inventado |
| Cápsulas de Moringa | Frasco 100 cápsulas | ❌ inventado |
| Harina de Moringa | Bolsa 250g | ❌ inventado |
| Perfume Dalba | Frasco 50ml | ❌ inventado |

**Ninguna de estas presentaciones salió de un documento de Máximo.**

Si un cliente pide "la caja de 30 sobres" y llega otra cosa, eso es información
engañosa bajo el Código del Consumidor.

## 2 · "Esplendor Facial" · categoría "Cosmética"

Sabíamos el precio (S/. 120) y los puntos (14). **Nunca supimos qué es.**
Antigravity decidió que es un producto facial.

**Puede estar bien o puede estar completamente equivocado.**

## 3 · "Productos con registro sanitario"

⚠️ **Esto es responsabilidad mía, no de Antigravity.** Lo escribí yo en el
documento de copy y él lo puso tal cual, como correspondía.

Es una **afirmación de cumplimiento normativo**. Si algún producto no tiene su
registro sanitario vigente ante DIGESA, es publicidad engañosa.

**Hay que confirmarlo con Máximo o quitarlo.**

---

# ✅ LO QUE ESTÁ BIEN

*Verificado uno por uno contra los documentos del proyecto.*

| # | Regla | Estado |
|---|---|---|
| 1 | Precios públicos 150/150/120/120/60/60/50/70 | ✅ |
| 2 | Precios de socio al 50% | ✅ |
| 3 | Puntos fijos 18/18/14/14/8/8/6/10 | ✅ |
| 4 | Los 5 packs con precio y niveles correctos | ✅ |
| 5 | **Kit Emprendedor: "Nivel 1 (S/. 50.00)"** — el 41.7% | ✅ |
| 6 | Kit con 0 puntos de rango | ✅ |
| 7 | **Ninguna promesa de ganancias** | ✅ |
| 8 | **Ninguna propiedad curativa** | ✅ |
| 9 | El 55% aparece **solo dentro del Pack Empresarial** | ✅ correcto |
| 10 | `?ref=` capturado y persistido en `sessionStorage` | ✅ |
| 11 | Las 6 rutas con las URLs exactas del plan | ✅ |
| 12 | Libro de Reclamaciones en el pie | ✅ |
| 13 | RUC y razón social en el pie | ✅ |
| 14 | Canónica en `index.html` | ✅ |
| 15 | Tokens del `_ds` copiados sin modificar | ✅ |
| 16 | Fuentes convertidas a `.woff2` | ✅ |

> **El punto 9 merece una nota.** Yo había escrito "nunca digas 55%". Antigravity
> lo puso igual, pero **lo hizo bien**: está dentro de la tarjeta del Pack
> Empresarial describiendo cómo se arma ese pack, que es exactamente lo que
> Máximo confirmó. La prohibición era usarlo como reclamo general del sitio.

---

# 📌 PENDIENTE DE JACK

## 1 · Peso muerto en `public/brand/`

```
   perfil-logo.png       1,265 KB   ← no se usa en el código
   perfil-simbolo.png    1,258 KB   ← no se usa en el código
```

**2.5 MB que se copian al `dist` en cada compilación** y nadie descarga porque
ninguna página los referencia.

Son imágenes de perfil para redes sociales. **No las borré** porque son tuyas y
puede que las quieras a mano. Pero deberían salir de `public/` — muévelas a
`06-MARCA/` si las necesitas.

## 2 · Volver a compilar

Los arreglos tocan `index.html` y `public/`. **El `dist/` actual está viejo.**

```bash
npm run build
```

## 3 · Correr las pruebas

No pude ejecutarlas: los `node_modules` se instalaron en Windows y el binario
nativo de rollup no corre en el entorno Linux donde audité. **Córrelas tú:**

```bash
npx vitest run
npx playwright test
```

---

# 🚀 DESPLIEGUE — según dónde lo subas

| Hosting | Archivo | Estado |
|---|---|---|
| **Netlify** | `public/_redirects` | ✅ creado |
| **Vercel** | `vercel.json` | ✅ creado |
| **Apache / cPanel / Hostinger** | `.htaccess` | ⚠️ hay que crearlo |

Si va a Hostinger o cualquier Apache, sube esto como `.htaccess` junto al
`index.html` del `dist`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Sin esto, las rutas vuelven a dar 404.**

---

# LISTA ANTES DE PUBLICAR

```
   ☐  npm run build con los arreglos aplicados
   ☐  Probar el enlace pegándolo en WhatsApp — que se vea la tarjeta
   ☐  Entrar directo a /packs-de-afiliacion — no debe dar 404
   ☐  Recargar estando en /productos — no debe dar 404
   ☐  Probar ?ref=MG-00417 y ver que llega al WhatsApp
   ☐  Abrirlo en un celular real con datos móviles
   ☐  Confirmar las presentaciones de producto con Máximo
   ☐  Confirmar qué es "Esplendor"
   ☐  Confirmar el registro sanitario, o quitar esa frase
   ☐  Sacar perfil-logo.png y perfil-simbolo.png de public/
```

---

**Auditado el 27 de agosto de 2026.**
