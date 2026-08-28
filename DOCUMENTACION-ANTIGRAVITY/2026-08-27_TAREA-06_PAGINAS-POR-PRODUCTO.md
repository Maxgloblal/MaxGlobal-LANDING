# 📋 INFORME TÉCNICO · TAREA 06: PÁGINA PROPIA POR PRODUCTO
**Código:** `INF-2026-08-27-06`  
**Fecha:** 27 de agosto de 2026  
**Proyecto:** Max Global Corporation — Sitio Web Landings (Fase 1)  
**Estado:** ✅ COMPLETADO AL 100%

---

## 🎯 1. Objetivo de la Tarea
Implementar la infraestructura completa de páginas individuales por producto (`/productos/:id`) para los 8 productos del catálogo, expandiendo el sitio de 6 a 14 páginas indexables para posicionamiento orgánico en Google, integrando breadcrumbs, productos relacionados, esquema estructurado JSON-LD `Product` de Schema.org, mapa del sitio actualizado y gestión de excepciones (omisión elegante para *Perfume Dalba*).

---

## 🛠️ 2. Detalle de Implementación por Bloques

### 📦 Bloque A · Ruta y Página de Detalle (`/productos/:id`)
* **Acceso Centralizado a Datos:** `src/data/catalogo.js` actualizado con `getProducto(id)` y `getProductosRelacionados(currentId, limit = 3)`.
* **Componente `src/pages/ProductoDetalle.jsx`:**
  * **Breadcrumbs:** `Inicio › Productos › {producto.nombre}` con enlaces navegables.
  * **Ficha de Producto:** Imagen destacada en alta resolución, nombre, categoría, puntos de volumen, presentación oficial y descripción.
  * **Precios Dinámicos:** Precio al público y precio de socio calculado con `mejorDescuento()` y `precioSocio()`.
  * **Acciones:** Selector de cantidad, botón para añadir al carrito abriendo el drawer y botón de pedido directo por WhatsApp con código `?ref=` precargado.
  * **Productos Relacionados:** 3 productos de la misma categoría sugeridos al pie.
  * **Error 404:** Si el ID no existe en el catálogo, muestra el componente `<NoEncontrado />` con código de estado/meta noindex.

---

### 🔗 Bloque B · Enlaces desde Catálogo y Portada
* **`ProductCard.jsx`:**
  * La imagen y el título del producto ahora están envueltos en un `<Link to="/productos/${id}">`.
  * El botón `[ Agregar al pedido ]` y el controlador de cantidad permanecen independientes, permitiendo agregar productos al carrito sin navegar accidentalmente.

---

### 🌐 Bloque C · SEO por Producto y Schema.org JSON-LD
* **Metadatos por Producto:**
  * Título dinámico: `{producto.nombre} | Max Global Corporation`.
  * Meta descripción dinámica con precio público y *"Envíos a todo el Perú"*.
  * URL Canónica estricta sin parámetros: `https://maxglobaloficial.com/productos/${id}`.
  * Metatag `<meta name="robots" content="index, follow" />`.
* **Esquema JSON-LD `Product`:**
  * Inyectado en el `<head>` con `name`, `description`, `image`, `brand` y oferta pública en PEN (`availability: InStock`).
  * Sin claims engañosos (sin `AggregateRating` ni `Review` falsas).
* **Sitemap XML (`public/sitemap.xml`):**
  * Se incorporaron las 8 URLs de producto con prioridad `0.7`.

---

### 🌺 Bloque D · Manejo del Perfume Dalba y Compilación
* **Comportamiento Específico:**
  * Al carecer de presentación oficial, la línea se omite limpiamente en el diseño sin dejar espacios en blanco ni textos ficticios.
  * Muestra el placeholder botánico neutro de Max Global con diseño prémium y sin icono roto.
  * Funcionalidad completa para agregar al carrito o pedir por WhatsApp.
* **Compilación de Producción:**
  * Generación de `dist/` en 2.91s con todos los artefactos de Apache (`.htaccess`), Netlify (`_redirects`), robots, sitemap e imágenes.

---

## 📊 3. Matriz de Validación Técnica

| Criterio | Resultado | Estado |
|---|---|---|
| **Auditoría de Integridad de Archivos** | 0 bytes nulos en `src/` + bundle `esbuild` sintáctico | 🟢 Superado |
| **Vitest Unit Tests** | **45 de 45 pasados** (100%) | 🟢 Verde |
| **Playwright E2E Tests** | **54 de 54 pasados** (Desktop Chromium + Mobile Chrome) | 🟢 Verde |
| **Build Vite Producción** | Generación de chunks optimizados sin advertencias | 🟢 Listo |
| **Control de Versiones Git** | Commits atómicos registrados por cada bloque en `master` | 🟢 Sincronizado |

---

## 📜 4. Historial de Commits de la Tarea 06
1. `bc67754`: `estado antes de tarea 06`
2. `3f546b8`: `feat(productos): ruta y pagina de detalle de producto /productos/:id con 404 y breadcrumb`
3. `a91368a`: `feat(productos): enlazar foto y titulo de productcard a /productos/:id`
4. `294a309`: `feat(seo): metadatos unicos, schema product json-ld y sitemap con 8 productos`
