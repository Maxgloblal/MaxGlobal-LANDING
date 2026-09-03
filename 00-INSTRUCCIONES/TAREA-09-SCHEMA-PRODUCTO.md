# TAREA-09 · SCHEMA DE PRODUCTO Y LIMPIEZA PRE-DESPLIEGUE

**Para:** Antigravity
**Escrita:** 3 de septiembre de 2026
**Se ejecuta ANTES de desplegar. Es lo último de la Fase 1.**

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
**Commit después de CADA bloque, no al final.**

---

# EL PROBLEMA, EN UNA FRASE

Las 8 páginas de producto tienen las etiquetas `og:` correctas —eso ya lo
arregló la TAREA-08— pero **su único dato estructurado es el de la empresa**.

```
   dist/productos/cafe-moringa/index.html
   @type: Organization      ✅ presente
   @type: Product           ❌ NO EXISTE
```

Sin `Product`, Google no sabe que eso es un producto con precio. El resultado
sale como un enlace de texto pelado, sin precio ni foto dentro del resultado.

**Verificado el 3/09 leyendo el HTML de `dist/`, no el código fuente.**

---

# BLOQUE 1 · ELIMINAR EL SOBRANTE DE NETLIFY

`public/_redirects` es configuración de Netlify. El despliegue es en **Vercel**,
que usa `vercel.json`. El archivo se copia a `dist/` en cada build y no sirve
para nada.

```bash
git rm public/_redirects
```

**Por qué se borra y no se deja "por si acaso":** dos archivos de routing que
dicen cosas distintas es exactamente cómo se pierde media hora cuando algo
falla en producción.

**Commit.**

---

# BLOQUE 2 · SCHEMA `Product` EN LAS 8 FICHAS

Se modifica **solo** `scripts/prerender.mjs`. No se toca ningún componente de
React ni ninguna página.

## Qué hace hoy el script

Lee `dist/index.html`, reemplaza `<title>`, `description`, `canonical`, las
`og:` y las `twitter:`, y escribe un `index.html` por ruta. Las rutas de
producto salen de `PRODUCTOS` en `src/config.js`.

## Qué hay que agregarle

Para **las rutas de producto únicamente**, inyectar un segundo bloque
`application/ld+json` **justo antes de `</head>`**, sin tocar el bloque
`Organization` que ya existe.

El JSON, por producto:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name":        "<p.nombre>",
  "description": "<p.descripcion>",
  "image":       "<DOMINIO><p.imagen>",
  "sku":         "<p.id>",
  "category":    "<p.categoria>",
  "brand": { "@type": "Brand", "name": "Max Global Corporation" },
  "offers": {
    "@type": "Offer",
    "url": "<DOMINIO>/productos/<p.id>",
    "priceCurrency": "PEN",
    "price": "<p.precioPublico con 2 decimales>",
    "availability": "https://schema.org/InStock",
    "seller": { "@type": "Organization", "name": "Max Global Corporation" }
  }
}
```

## Reglas de este bloque

```
   1 · El precio es precioPublico, NUNCA el precio de socio.
       Café: "150.00"  ·  no 75.
       El precio de socio no va en el schema: es condicional
       a estar afiliado, y declararlo como precio de venta al
       público es publicidad engañosa.

   2 · La descripción va SIN cortar a 155 caracteres.
       Ese recorte es solo para la meta description.
       El schema lleva la descripción completa.

   3 · El JSON se genera con JSON.stringify sobre un objeto.
       NO se arma concatenando strings: una comilla dentro de
       una descripción rompe el JSON y Google descarta el bloque
       entero sin avisar.

   4 · Usar el DOMINIO ya definido en la línea 10 del script.
       No escribir la URL a mano.
```

## 🔴 LO QUE NO SE INVENTA

```
   ❌ aggregateRating   no hay reseñas reales. Inventarlas es
                        motivo de penalización manual de Google
   ❌ review            igual
   ❌ priceValidUntil   no hay fecha de vigencia definida
   ❌ gtin / mpn        no existen esos códigos
```

Si el dato no existe, la propiedad no va. Un schema con 6 campos ciertos vale
más que uno con 12 donde 6 son inventados.

**Commit.**

---

# BLOQUE 3 · PRUEBA QUE LO RESPALDE

En `src/test/Prerender.test.js`, agregar casos que lean el HTML **generado en
`dist/`** —no el código fuente— y comprueben:

```
   1 · dist/productos/cafe-moringa/index.html contiene "@type": "Product"
   2 · ese mismo archivo contiene "price": "150.00"
   3 · ese mismo archivo contiene "priceCurrency": "PEN"
   4 · el JSON del bloque Product parsea con JSON.parse sin error
   5 · dist/index.html NO contiene "@type": "Product"
       (la portada no es un producto)
   6 · las 8 fichas tienen bloque Product → contar 8
```

**El caso 4 es el que importa.** Un JSON roto se ve perfecto a simple vista y
Google lo descarta en silencio.

**Commit.**

---

# BLOQUE 4 · VERIFICACIÓN

Correr y **pegar la salida literal de las cuatro**:

```bash
npm run build

# 1 · cuántas fichas tienen schema de producto  → debe decir 8
grep -l '"@type": "Product"' dist/productos/*/index.html | wc -l

# 2 · el precio del café  → debe decir "150.00"
grep -o '"price": "[^"]*"' dist/productos/cafe-moringa/index.html

# 3 · la portada NO debe tener Product  → debe decir 0
grep -c '"@type": "Product"' dist/index.html

# 4 · _redirects ya no existe  → debe decir "no existe"
test -f dist/_redirects && echo "TODAVIA EXISTE" || echo "no existe"
```

Después, validar un bloque en el validador oficial de Google:
`https://search.google.com/test/rich-results` pegando el HTML de
`dist/productos/cafe-moringa/index.html`.

**Pegar el resultado: cuántos elementos válidos y cuántos errores.**

---

# LO QUE ENTREGAS

```
   1 · La salida literal de las 4 verificaciones del bloque 4
   2 · El resultado del validador de Google
   3 · git status --short vacío, pegado literal
   4 · npx vitest run en verde
```

---

# LO QUE NO SE TOCA

```
   ❌ Las etiquetas og: y twitter:     ya verificadas en la TAREA-08
   ❌ El bloque Organization           se queda como está
   ❌ src/config.js                    los datos no cambian
   ❌ Las páginas de React             ni una línea
   ❌ El diseño, el carrito, el WhatsApp con ?ref=
   ❌ vercel.json                      queda como está
```

---

# FUERA DE ESTA TAREA — para que quede claro

```
   ⬜ Conectar el catálogo a Supabase
      Es la TAREA-10. Requiere migración de columnas, poblar las 8
      filas y que el prerender consulte la base en build.
      NO se empieza acá.

   ⬜ Organization → LocalBusiness
      BLOQUEADO: LocalBusiness exige dirección de calle real y
      EMPRESA.domicilio solo dice "Lima, Perú". Se hace cuando
      Máximo dé la dirección exacta. No se inventa.

   ⬜ llms.txt
      NO se hace. Google publicó el 15/05/2026 que no lo usa para
      AI Overviews ni AI Mode. Adopción real: 10% y sin crecer.
```

**Terminada esta tarea, la landing se despliega.**
