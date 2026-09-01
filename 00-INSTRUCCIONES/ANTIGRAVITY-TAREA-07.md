# TAREA 07 — MÓVIL Y CATÁLOGO

**Fecha:** 27 de agosto de 2026
**Lee primero:** `AUDITORIA-MOVIL.md` de esta carpeta.

---

> # ⚠️ ANTES DE EMPEZAR
>
> **Seis archivos volvieron a quedar truncados** tras la Tarea 06. Ya se
> restauraron desde HEAD. Es la octava vez.
>
> ```bash
> git status
> git add -A && git commit -m "estado antes de tarea 07"
> ```
>
> **Commit después de cada bloque.** Y antes de decir que terminaste:
>
> ```bash
> grep -rlP '\x00' src/ && echo "🔴 BYTES NULOS"
>
> npx esbuild src/main.jsx --bundle --loader:.jsx=jsx --loader:.css=empty \
>   --outfile=/dev/null --external:react --external:react-dom \
>   --external:react-router-dom --external:lucide-react
> ```

---

# EL PROBLEMA

**El sitio se ve roto en móvil**, y el catálogo no tiene forma de buscar nada.

Se dio la Fase 1 por terminada sin haber probado una sola pantalla en 390px.

---

# BLOQUE A · LA TABLA DE LOS CUATRO BONOS 🔴

## El bug

En `Portada.jsx`, cada `.mg-row` tiene **4 elementos**:

```jsx
<div className="mg-row">
  <span className="mg-num">01</span>
  <span>Patrocinio</span>
  <span>Cuando alguien de tu red se afilia</span>
  <span>El precio de su pack, hasta 7 niveles</span>
</div>
```

Pero el CSS de móvil declara **2 columnas**:

```css
@media (max-width: 900px) {
  .mg-row { grid-template-columns: 36px 1fr; }
}
```

**El tercer elemento cae en la columna de 36px** y el texto se apila letra por
letra.

## Cómo arreglarlo

**En móvil no es una tabla, es una tarjeta apilada.**

```css
@media (max-width: 900px) {
  .mg-row {
    display: flex;
    flex-direction: column;
    gap: var(--sp-2);
    padding: var(--sp-5) 0;
  }
  .mg-row > span:nth-child(1),
  .mg-row > span:nth-child(2) {
    display: inline-block;
  }
}
```

**El número y el título en la misma línea; las dos descripciones debajo, a ancho
completo.**

## Y agrega las etiquetas

En móvil, sin las cabeceras de la tabla, los dos textos quedan sin contexto.
**Ponles su rótulo:**

```
   01   PATROCINIO

   Cuándo
   Cuando alguien de tu red se afilia

   Sobre qué
   El precio de su pack, hasta 7 niveles
```

**Los rótulos solo se ven en móvil.** En escritorio la tabla ya los tiene arriba.

---

# BLOQUE B · LAS 4 PÁGINAS SIN REGLAS MÓVILES

**Estos archivos tienen grids fijos y cero media queries:**

```
   src/pages/LibroReclamaciones.jsx    4 grids
   src/pages/Nosotros.jsx              3 grids
   src/pages/ProductoDetalle.jsx       2 grids
   src/components/SiteFooter.jsx       1 grid
```

## La regla general

**Todo `gridTemplateColumns: '1fr 1fr'` debe pasar a una columna bajo 768px.**

En una pantalla de 400px, dos columnas dan 180px cada una. Ahí el texto se apila
igual que en la tabla.

## Los cinco casos concretos

| Archivo | Línea | Qué es | Qué debe pasar |
|---|---|---|---|
| `LibroReclamaciones.jsx` | 657 | Campos del formulario | 1 columna bajo 768px |
| `Nosotros.jsx` | 47 | Misión y visión | 1 columna bajo 768px |
| `Nosotros.jsx` | 113 | Bloques institucionales | 1 columna bajo 768px |
| `Packs.jsx` | 252 | Escalas de comisión | 1 columna bajo 640px |
| `Registro.jsx` | 157 | 🔴 Campos del formulario | 1 columna bajo 768px |

> **El de `Registro.jsx` es el más importante.** Son los campos donde se capta al
> socio. Un campo de 180px en un celular es incómodo y se abandona.

## ProductoDetalle

La foto y la información están lado a lado. **En móvil: foto arriba, datos
abajo**, ambos a ancho completo.

## SiteFooter

Las columnas de enlaces deben apilarse. En pantallas muy angostas, una sola
columna.

---

# BLOQUE C · BUSCADOR Y FILTROS EN EL CATÁLOGO

## Lo que hay que agregar a `/productos`

```
   ┌──────────────────────────────────────────┐
   │  🔍  Buscar producto...                  │
   ├──────────────────────────────────────────┤
   │  [ Todos 8 ]  [ Salud 5 ]  [ Cuidado 2 ] │
   │  [ Perfumería 1 ]                        │
   ├──────────────────────────────────────────┤
   │  Ordenar: [ Nombre ▾ ]                   │
   │                                          │
   │  8 productos                             │
   └──────────────────────────────────────────┘
```

## 1 · Buscador

Filtra por **nombre y descripción** mientras se escribe. Sin distinguir
mayúsculas ni tildes.

```js
const normalizar = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
```

**Sin tildes importa:** alguien va a escribir "colageno" sin acento.

Con botón para limpiar cuando hay texto.

## 2 · Categorías

**Las categorías ya están en `config.js`.** No inventes ninguna — sácalas de los
productos:

```js
const categorias = [...new Set(getProductos().map(p => p.categoria))];
```

**Con el número de productos de cada una.** Si mañana se agrega un producto de
una categoría nueva, el filtro aparece solo.

## 3 · Orden

```
   Nombre (A-Z)
   Precio: menor a mayor
   Precio: mayor a menor
   Puntos: mayor a menor
```

## 4 · Contador y estado vacío

```
   8 productos          cuando no hay filtro
   3 de 8 productos     cuando sí lo hay

   Si nada coincide:
   "No encontramos productos con «xyz»"
   [ Ver todos los productos ]
```

## Reglas

**Todo en el navegador.** Son 8 productos, no hace falta backend ni paginación.

**Los filtros van en la URL** como parámetros:

```
   /productos?buscar=colageno&categoria=salud-y-nutricion
```

Así el filtro se puede compartir por WhatsApp y sobrevive a recargar la página.

**En móvil el buscador va fijo arriba** al hacer scroll. Las categorías, en fila
con desplazamiento horizontal.

---

# BLOQUE D · REVISIÓN MÓVIL DE VERDAD

**No basta con que compile.** Abre cada página en el navegador a **390px** y
míralas.

## Las 14 páginas

```
   /                          /productos/cafe-moringa
   /productos                 /productos/colageno-hidrolizado
   /packs-de-afiliacion       /productos/aceite-moringa
   /registro                  /productos/esplendor
   /confirmacion              /productos/aceite-oregano
   /nosotros                  /productos/capsulas-moringa
   /terminos-y-condiciones    /productos/harina-moringa
   /politica-de-privacidad    /productos/perfume-dalba
   /libro-de-reclamaciones    (404)
```

## Qué mirar en cada una

```
   ☐  Ningún texto se apila en columna angosta
   ☐  Nada se sale por el costado (sin scroll horizontal)
   ☐  Los botones se pueden tocar cómodamente (44px mínimo)
   ☐  Los campos de formulario ocupan el ancho completo
   ☐  Las tablas se convierten en tarjetas
   ☐  El carrito y el botón de WhatsApp no tapan contenido
```

## Verificación automática que puedes correr

```bash
# ningún grid debe declarar menos columnas que hijos tiene
grep -rn "gridTemplateColumns: '1fr 1fr'" src/ | while read l; do
  echo "revisar: $l"
done

# toda página con grid debe tener media query
for f in src/pages/*.jsx src/components/*.jsx; do
  g=$(grep -c "gridTemplateColumns" "$f")
  m=$(grep -c "@media" "$f")
  [ "$g" != "0" ] && [ "$m" = "0" ] && echo "🔴 sin media query: $f"
done
```

**Las dos deben salir limpias al terminar.**

---

# LO QUE NO SE TOCA

```
   ❌ No cambies el diseño de escritorio     está aprobado
   ❌ No cambies precios, textos ni fotos
   ❌ No agregues librerías de UI            el sistema de diseño ya está
   ❌ No agregues paginación                 son 8 productos
   ❌ Nada de login, Supabase ni motor       Fase 2
```

---

# ORDEN

```
   0º   commit del estado actual
   1º   Bloque A · la tabla de los bonos      ← el más visible
        commit
   2º   Bloque B · las 4 páginas sin reglas
        commit
   3º   Bloque C · buscador y filtros
        commit
   4º   Bloque D · revisión de las 14 páginas
        commit
```

**Párate después de cada bloque.**

---

# CRITERIOS DE ACEPTACIÓN

```
   TABLA DE BONOS
   ☐  En 390px se ve como tarjeta apilada, no como tabla rota
   ☐  Ningún texto en columna de 36px
   ☐  Los rótulos "Cuándo" y "Sobre qué" solo en móvil
   ☐  En escritorio se ve igual que antes

   PÁGINAS MÓVILES
   ☐  Los 4 archivos tienen sus media queries
   ☐  Ningún '1fr 1fr' sobrevive bajo 768px
   ☐  Los campos de Registro ocupan el ancho completo
   ☐  ProductoDetalle: foto arriba, datos abajo

   CATÁLOGO
   ☐  El buscador filtra por nombre y descripción
   ☐  Funciona sin tildes
   ☐  Las categorías salen de config.js, con su conteo
   ☐  Orden por nombre, precio y puntos
   ☐  Contador de resultados
   ☐  Estado vacío con botón para limpiar
   ☐  Los filtros van en la URL y sobreviven a recargar

   REVISIÓN
   ☐  Las 14 páginas revisadas a 390px
   ☐  Sin scroll horizontal en ninguna
   ☐  Las dos verificaciones automáticas salen limpias

   INTEGRIDAD
   ☐  grep -rlP '\x00' src/  no devuelve nada
   ☐  esbuild compila
   ☐  Vitest y Playwright en verde
   ☐  git log con un commit por bloque
```
