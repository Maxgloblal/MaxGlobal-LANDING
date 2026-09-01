# AUDITORÍA MÓVIL Y DE CATÁLOGO

**Fecha:** 27 de agosto de 2026

---

> ## POR QUÉ ESTO NO APARECIÓ ANTES — mi error
>
> **Todas mis auditorías anteriores fueron estáticas.** Revisé que el código
> existiera, que compilara, que no tuviera bytes nulos, que los textos fueran
> legales.
>
> **Nunca miré el sitio renderizado, y menos en un ancho de móvil.**
>
> Por eso di la Fase 1 por "terminada" con una tabla desarmada en la portada y
> cuatro páginas sin una sola regla de adaptación móvil.
>
> **Verificar que el código existe no es verificar que funciona.**

---

# 1 · EL BUG QUE VISTE — la tabla de los cuatro bonos

## Qué pasa

```css
/* escritorio */
.mg-row { grid-template-columns: 48px 180px 1fr 1fr; }   ← 4 columnas

/* móvil, ≤900px */
.mg-row { grid-template-columns: 36px 1fr; }             ← 2 columnas
```

**Pero cada fila tiene 4 elementos.** En móvil, los dos últimos bajan a una
segunda fila, y el tercero cae en la columna de **36 píxeles**.

Por eso se ve así:

```
   01   Patrocinio
   Cuando
   alguien        ← 36px de ancho
   de
   tu
   red
   se
   afilia         El precio de su pack, hasta 7 niveles
```

## Cómo debe quedar

En móvil no es una tabla, es una tarjeta:

```
   ┌──────────────────────────────────┐
   │  01   PATROCINIO                 │
   │                                  │
   │  Cuándo                          │
   │  Cuando alguien de tu red        │
   │  se afilia                       │
   │                                  │
   │  Sobre qué                       │
   │  El precio de su pack,           │
   │  hasta 7 niveles                 │
   └──────────────────────────────────┘
```

---

# 2 · LO QUE ENCONTRÉ BUSCANDO MÁS

**No era un caso aislado.** Al revisar todas las páginas apareció el mismo tipo
de problema en varios lugares.

## Cuatro archivos sin NINGUNA regla móvil

| Archivo | Grids fijos | Media queries |
|---|---|---|
| `LibroReclamaciones.jsx` | 4 | **0** |
| `Nosotros.jsx` | 3 | **0** |
| `ProductoDetalle.jsx` | 2 | **0** |
| `SiteFooter.jsx` | 1 | **0** |

**Las tres primeras son páginas nuevas** — legal, nosotros y la de producto que
acabamos de construir. Ninguna se probó en móvil.

## Cinco grids de dos columnas fijas

```
   LibroReclamaciones.jsx:657    gridTemplateColumns: '1fr 1fr'
   Nosotros.jsx:47               gridTemplateColumns: '1fr 1fr'
   Nosotros.jsx:113              gridTemplateColumns: '1fr 1fr'
   Packs.jsx:252                 gridTemplateColumns: '1fr 1fr'
   Registro.jsx:157              gridTemplateColumns: '1fr 1fr'
```

**En una pantalla de 400px, cada columna queda en unos 180px.** Es el mismo
problema de la tabla: el texto se apila y se vuelve ilegible.

**El de `Registro.jsx` es el más grave** — son campos de formulario. Un campo de
180px en un celular es incómodo de llenar, y ahí es donde se capta al socio.

---

# 3 · EL CATÁLOGO NECESITA BUSCADOR Y FILTROS

Hoy `/productos` es una lista plana de 8 tarjetas. Sin buscador, sin categorías,
sin orden.

## Por qué importa ahora

Ya sabemos que **hay más productos que no están en el catálogo** — apareció uno
en las fotos (aceite de moringa en cápsulas de 90 unidades) y en la tienda en
dólares hay otros.

**Con 8 productos una lista plana se tolera. Con 15 o 20 ya no.**

## Lo que hace falta

**Buscador** que filtre por nombre y descripción mientras se escribe.

**Categorías**, que ya existen en `config.js` y no se están usando:

```
   Salud y Nutrición ......... 5 productos
   Cuidado Personal .......... 2
   Perfumería ................ 1
```

**Orden** por precio y por puntos.

**Contador de resultados** y estado vacío cuando nada coincide.

---

# 4 · EL ERROR DE CONSOLA — no es del sitio

```
Uncaught TypeError: Cannot read properties of undefined (reading 'startTime')
    at et.reportAllChanges (<anonymous>:2:19429)
```

**`web-vitals` no es dependencia del proyecto** — no está en `package.json`, ni
en `package-lock.json`, ni en `node_modules`.

El `<anonymous>` indica código inyectado. **Es una extensión de Chrome tuya**,
probablemente la de Web Vitals o Lighthouse.

**Ignóralo.** No aparece para los usuarios.

---

# 5 · LO QUE SÍ ESTABA BIEN

*Para no dar la impresión de que todo está mal.*

| Verificado | Estado |
|---|---|
| Los botones flotantes no se tapan en móvil | ✅ |
| El panel del carrito ocupa el 100% del ancho | ✅ |
| Portada y Packs tienen media queries | ✅ 2 cada una |
| El encabezado se adapta | ✅ |
| Las fotos de producto pesan 40–55 KB | ✅ |
| El recorrido `?ref=` → carrito → WhatsApp funciona | ✅ |

**El problema no es el sitio entero. Son las páginas nuevas**, que se
construyeron sin probar en móvil, y una tabla mal adaptada.

---

# 6 · EL PLAN

```
   BLOQUE A   Arreglar la tabla de los cuatro bonos
   BLOQUE B   Adaptar los 4 archivos sin reglas móviles
   BLOQUE C   Buscador, categorías y orden en el catálogo
   BLOQUE D   Revisión móvil real de las 14 páginas
```

**Detalle en `ANTIGRAVITY-TAREA-07`.**

---

# 7 · Y UN CAMBIO EN CÓMO VERIFICO

**Desde ahora, antes de decir que algo está terminado:**

```
   1. Compila y no tiene archivos corruptos      ← lo que ya hacía
   2. Ningún grid declara menos columnas que hijos tiene
   3. Toda página con grid tiene su media query
   4. Capturas reales a 390px, 768px y 1280px
```

**Los puntos 2 y 3 los puedo automatizar.** El 4 lo tiene que hacer alguien
mirando, y ahí es donde te necesito a ti o a Antigravity con capturas.

Está agregado a `05-CONTROL/MAPA-DE-MANTENIMIENTO`.
