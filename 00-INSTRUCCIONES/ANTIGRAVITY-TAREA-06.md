# TAREA 06 — PÁGINA PROPIA POR PRODUCTO

**Fecha:** 27 de agosto de 2026

---

> # ⚠️ ANTES DE EMPEZAR
>
> **`src/components/ProductCard.jsx` volvió a quedar truncado** en tu última
> sesión, después del commit `d3f2a35`. Ya se restauró desde HEAD.
>
> Es la **sexta vez**. Tus commits siempre están bien; lo que queda en disco
> después se corrompe.
>
> ```bash
> git status          # debe estar limpio
> git add -A && git commit -m "estado antes de tarea 06"
> ```
>
> **Commit después de cada bloque**, y antes de decir que terminaste:
>
> ```bash
> grep -rlP '\x00' src/ && echo "🔴 BYTES NULOS"
>
> npx esbuild src/main.jsx --bundle --loader:.jsx=jsx --loader:.css=empty \
>   --outfile=/dev/null --external:react --external:react-dom \
>   --external:react-router-dom --external:lucide-react
> ```

---

# QUÉ SE PIDE

**Una página propia para cada producto**, con su URL, su ficha completa y su
esquema de datos estructurados.

```
   /productos                        el catálogo, ya existe
   /productos/cafe-moringa           ← nuevo
   /productos/colageno-hidrolizado   ← nuevo
   /productos/aceite-moringa         ← nuevo
   /productos/esplendor              ← nuevo
   /productos/aceite-oregano         ← nuevo
   /productos/capsulas-moringa       ← nuevo
   /productos/harina-moringa         ← nuevo
   /productos/perfume-dalba          ← nuevo
```

## Por qué vale la pena

**El sitio pasa de 6 a 14 páginas indexables.** Hoy alguien que busca *"café de
moringa Perú"* no tiene dónde caer: el catálogo entero compite por todas las
palabras a la vez. Con una página por producto, cada una compite por lo suyo.

Y con el esquema `Product` de datos estructurados, Google puede mostrar el precio
y la disponibilidad directamente en los resultados.

---

# BLOQUE A · LA RUTA Y LA PÁGINA

## Ruta

```jsx
<Route path="/productos/:id" element={<ProductoDetalle />} />
```

**El `:id` es el `id` que ya está en `config.js`** — `cafe-moringa`,
`colageno-hidrolizado`, etc. No inventes slugs nuevos.

## Si el id no existe

Muestra la página 404 que ya construiste. **No redirijas al catálogo en
silencio** — si alguien llega a un producto que no existe, tiene que saberlo.

```jsx
const producto = getProducto(id);
if (!producto) return <NoEncontrado />;
```

**Agrega `getProducto(id)` a `src/data/catalogo.js`**, junto a las que ya están.

## Qué muestra la página

*Con los datos que YA existen en `config.js`. No inventes nada.*

```
   ┌──────────────────────────────────────────────────────┐
   │  Inicio › Productos › Coffee Capuccino               │
   ├────────────────────────┬─────────────────────────────┤
   │                        │  SALUD Y NUTRICIÓN          │
   │                        │                             │
   │      [ foto grande ]   │  Coffee Capuccino           │
   │                        │                             │
   │                        │  Café capuccino instantáneo │
   │                        │  con moringa y ganoderma.   │
   │                        │  Para reemplazar tu café    │
   │                        │  de la mañana.              │
   │                        │                             │
   │                        │  Caja 20 sobres de 18 g     │
   │                        │                             │
   │                        │  S/. 150                    │
   │                        │  Los socios pagan desde     │
   │                        │  S/. 75                     │
   │                        │                             │
   │                        │  [ 18 puntos ]              │
   │                        │                             │
   │                        │  [ − ] 1 [ + ]              │
   │                        │  [ Agregar al pedido ]      │
   │                        │  [ Pedir por WhatsApp ]     │
   └────────────────────────┴─────────────────────────────┘
```

**El "desde" sale de `mejorDescuento()`**, igual que en las tarjetas. Nunca un
número escrito a mano.

## Ruta de navegación (breadcrumb)

```
   Inicio  ›  Productos  ›  Coffee Capuccino
```

Los dos primeros son enlaces. **Sirve para que el usuario vuelva y para el SEO.**

## Productos relacionados

Al pie, 3 productos de la **misma categoría**, excluyendo el actual. Si no hay 3,
completa con otros.

---

# BLOQUE B · ENLAZAR DESDE EL CATÁLOGO

En `/productos`, cada tarjeta debe llevar a su página.

## Qué hacer clicable

**La foto y el nombre.** Van dentro de un `<Link>`.

**El botón "Agregar" NO.** Si toda la tarjeta fuera un enlace, agregar al
carrito navegaría sin querer. Mantén el botón separado.

## En la portada

Los productos destacados también enlazan a su página.

---

# BLOQUE C · SEO POR PRODUCTO

**Es la parte que justifica la tarea.** Hazla bien.

## Metadatos por página

```
Título:       Coffee Capuccino — Café con moringa y ganoderma | Max Global
Descripción:  Café capuccino instantáneo con moringa y ganoderma.
              Caja 20 sobres de 18 g. S/. 150. Envíos a todo el Perú.
Robots:       index, follow
Canónica:     https://maxglobaloficial.com/productos/cafe-moringa
```

**Se generan desde `config.js`**, no escritos uno por uno:

```js
document.title = `${producto.nombre} | Max Global Corporation`;
```

## Datos estructurados — uno por producto

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Coffee Capuccino",
  "description": "Café capuccino instantáneo con moringa y ganoderma.",
  "image": "https://maxglobaloficial.com/images/productos/cafe-moringa.webp",
  "brand": { "@type": "Brand", "name": "Max Global Corporation" },
  "offers": {
    "@type": "Offer",
    "url": "https://maxglobaloficial.com/productos/cafe-moringa",
    "price": "150.00",
    "priceCurrency": "PEN",
    "availability": "https://schema.org/InStock"
  }
}
```

**El precio del esquema es el PÚBLICO**, no el de socio. Quien llega desde Google
no es socio.

### 🔴 Prohibido

```
   ❌ AggregateRating     no tenemos reseñas reales
   ❌ Review              igual
   ❌ priceValidUntil     no sabemos hasta cuándo
```

**Inventar reseñas es penalizado por Google y es publicidad engañosa en Perú.**

## Sitemap

Agrega las 8 URLs con prioridad `0.7`:

```xml
<url><loc>https://maxglobaloficial.com/productos/cafe-moringa</loc><priority>0.7</priority></url>
```

**Genéralas desde `config.js` si puedes**, para que agregar un producto no
obligue a editar el sitemap a mano.

---

# BLOQUE D · EL CASO DEL PERFUME DALBA

**Es el único producto sin foto real y sin presentación.**

```js
{
  id: 'perfume-dalba',
  nombre: 'Perfume Dalba',
  presentacion: null,   // sin dato
  ...
}
```

## Cómo se comporta su página

```
   ☐  Muestra el marcador neutro de imagen, no un icono roto
   ☐  NO muestra la línea de presentación — se omite, no se rellena
   ☐  Todo lo demás funciona igual: precio, puntos, carrito, WhatsApp
```

**No inventes una presentación.** Si el dato no está, la línea no aparece.

**Aplica lo mismo a cualquier producto futuro** al que le falte un campo.

---

# LO QUE NO SE TOCA

```
   ❌ No cambies precios ni presentaciones     vienen de las etiquetas reales
   ❌ No inventes descripciones nuevas         usa las de config.js
   ❌ No agregues claims de salud              ver abajo
   ❌ No toques las fotos                      son de Jack
   ❌ Nada de login, Supabase ni motor         Fase 2
```

## 🔴 Recordatorio sobre los claims

El empaque de la Moringa en Polvo dice impreso *"Antiflamatorio · Ideal para
diabéticos · Reduce el colesterol"*.

**Eso no puede aparecer en ninguna página.** Un suplemento no puede atribuirse
propiedades terapéuticas — lo sancionan DIGESA e INDECOPI. Que esté en la bolsa
no lo hace publicable.

---

# ORDEN

```
   0º   commit del estado actual
   1º   Bloque A · ruta y página de detalle
        commit
   2º   Bloque B · enlazar desde catálogo y portada
        commit
   3º   Bloque C · SEO y datos estructurados
        commit
   4º   Bloque D · caso Dalba + pruebas + build
        commit
```

**Párate después de cada bloque.**

---

# CRITERIOS DE ACEPTACIÓN

```
   RUTAS
   ☐  Las 8 páginas responden
   ☐  Un id inexistente muestra el 404, no el catálogo
   ☐  getProducto(id) está en catalogo.js

   CONTENIDO
   ☐  Todo sale de config.js, nada escrito a mano
   ☐  El "desde" usa mejorDescuento()
   ☐  Breadcrumb con enlaces funcionando
   ☐  3 productos relacionados al pie

   NAVEGACIÓN
   ☐  Foto y nombre del catálogo llevan al detalle
   ☐  El botón "Agregar" NO navega
   ☐  Se puede agregar al carrito desde el detalle

   SEO
   ☐  Título y descripción únicos por producto
   ☐  Canónica correcta en cada página
   ☐  JSON-LD Product con precio público
   ☐  Sin AggregateRating ni Review
   ☐  Las 8 URLs en el sitemap

   DALBA
   ☐  Marcador neutro, no icono roto
   ☐  La línea de presentación se omite

   INTEGRIDAD
   ☐  grep -rlP '\x00' src/  no devuelve nada
   ☐  esbuild compila
   ☐  Vitest y Playwright en verde
   ☐  git log muestra un commit por bloque
```
