# TAREA 05 — CIERRE DE LA LANDING

**Fecha:** 27 de agosto de 2026
**Es la última tarea de la Fase 1.** Después de esto la web queda lista.

---

> # QUÉ CAMBIÓ DESDE TU ÚLTIMA SESIÓN
>
> **Jack entregó las fotos reales de los productos** y con sus etiquetas se
> corrigieron los datos que estaban inventados.
>
> **Ya se hicieron estos cambios en `config.js` y en `public/images/productos/`.
> No los rehagas.** Tu trabajo es que el sitio los muestre bien y cerrar.
>
> ## Lo que se corrigió
>
> **Tres productos cambiaron de nombre**, porque así se llaman de verdad:
>
> | Antes decía | Nombre real de la etiqueta |
> |---|---|
> | Café con Moringa | **Coffee Capuccino** *(moringa y ganoderma)* |
> | Colágeno Hidrolizado | **Colágeno Aeterna** |
> | Harina de Moringa | **Moringa en Polvo** |
> | Esplendor Facial | **Esplendor — Lágrimas Humectantes** |
>
> **Las 8 presentaciones estaban todas mal.** Ahora salen de las etiquetas:
> el café son 20 sobres de 18 g, no 30 · el colágeno es 150 g, no 500 · la
> moringa en polvo es 200 g, no 250 · el aceite de moringa es 50 ml, no 30.
>
> **Se retiró "Productos con registro sanitario"** de la barra de confianza de la
> portada, por indicación de Jack. Ahora dice *"Productos 100% naturales"*.
>
> **Se subieron 7 fotos reales** a `public/images/productos/`, a 800×800 y entre
> 40 y 55 KB cada una.

---

# ⚠️ ANTES DE EMPEZAR

**Hay un `.git/index.lock` bloqueando el repositorio.** Bórralo:

```
   .git/index.lock
```

Después:

```bash
git add -A
git commit -m "fotos reales de producto y presentaciones corregidas"
```

## Y el protocolo de siempre

Has truncado archivos en las **cinco** sesiones anteriores. Commit por bloque, y
antes de decir que terminaste:

```bash
grep -rlP '\x00' src/ && echo "🔴 BYTES NULOS"

npx esbuild src/main.jsx --bundle --loader:.jsx=jsx --loader:.css=empty \
  --outfile=/dev/null --external:react --external:react-dom \
  --external:react-router-dom --external:lucide-react
```

**Si esbuild falla, no has terminado.**

---

# BLOQUE A · ARREGLAR LAS PRUEBAS

**Al cambiar los nombres de producto, varias pruebas quedaron rotas.** Buscan
texto que ya no existe.

## Archivos afectados

```
   src/test/Cart.test.jsx          líneas 15, 20, 82
   src/test/Productos.test.jsx     líneas 27, 28, 33
   src/test/LegalPages.test.jsx    línea 62
   e2e/cart.spec.js                línea 8 y siguientes
```

## Cómo arreglarlas — bien, no rápido

**No cambies el texto viejo por el nuevo a mano.** Eso vuelve a romperse la
próxima vez que un producto cambie de nombre.

**Las pruebas deben leer de `config.js`:**

```js
import { PRODUCTOS } from '../config';

const cafe = PRODUCTOS.find(p => p.id === 'cafe-moringa');
expect(screen.getByRole('heading', { name: cafe.nombre })).toBeInTheDocument();
```

**Así, si mañana el producto cambia de nombre, la prueba sigue pasando** — y si
desaparece del catálogo, falla como debe.

---

# BLOQUE B · QUE LAS FOTOS SE VEAN

Las 7 imágenes ya están en `public/images/productos/` con el nombre que espera
`config.js`.

## Qué verificar

```
   ☐  Las 7 fotos se ven en /productos
   ☐  Se ven en las tarjetas de la portada
   ☐  Se ven dentro del carrito
   ☐  Perfume Dalba, que no tiene foto real, muestra el marcador neutro
      y NO un icono roto
```

## Si algo no carga

Revisa que la ruta de `config.js` coincida con el archivo real. **No renombres
las imágenes** — ajusta la ruta si hace falta.

---

# BLOQUE C · PÁGINA 404

**Hoy cualquier URL inexistente muestra la portada** con estado 200:

```jsx
<Route path="*" element={<Portada />} />
```

**El problema:** `maxglobaloficial.com/cualquier-cosa` devuelve la portada como
si fuera una página real. Google puede indexar URLs fantasma como contenido
duplicado.

## Qué construir

Una página simple, con el sistema de diseño de siempre:

```
   404

   Esta página no existe

   Puede que el enlace esté mal escrito o que
   la página se haya movido.

   [ Ir al inicio ]   [ Ver los productos ]
```

**Metadatos:** `noindex, nofollow`.

**No la agregues al sitemap.**

```jsx
<Route path="*" element={<NoEncontrado />} />
```

---

# BLOQUE D · COMPILAR Y CERRAR

```bash
npm run build
npx vitest run
npx playwright test
```

## Verifica que el build tenga todo

```
   dist/
     .htaccess          ← para Apache
     _redirects         ← para Netlify
     robots.txt
     sitemap.xml
     images/productos/  ← las 7 fotos
     favicon-32.png · favicon-180.png · favicon-512.png
```

---

# LO QUE NO SE TOCA

```
   ❌ No cambies los precios          están confirmados por el cliente
   ❌ No cambies las presentaciones    salen de las etiquetas reales
   ❌ No toques las imágenes           son de Jack
   ❌ No agregues claims de salud      ver abajo, es importante
   ❌ Nada de login, Supabase ni motor  Fase 2
```

## 🔴 Sobre los claims de salud — léelo

El empaque de la Moringa en Polvo dice, impreso:

> *"Antiflamatorio · Ideal para diabéticos · Reduce el colesterol"*

**Eso NO puede aparecer en la web.** Un suplemento alimenticio no puede
atribuirse propiedades terapéuticas — lo sancionan DIGESA e INDECOPI.

**Que esté impreso en la bolsa no lo hace publicable.** Si ves esas frases en
alguna foto o etiqueta, no las transcribas.

---

# ORDEN

```
   0º   borrar .git/index.lock + commit
   1º   Bloque A · pruebas leyendo de config
        commit
   2º   Bloque B · verificar las fotos
        commit
   3º   Bloque C · página 404
        commit
   4º   Bloque D · build y pruebas
        commit
```

**Párate después de cada bloque.**

---

# CRITERIOS DE ACEPTACIÓN

```
   PRUEBAS
   ☐  Ninguna prueba tiene nombres de producto escritos a mano
   ☐  Todas leen de config.js
   ☐  Vitest en verde
   ☐  Playwright en verde

   FOTOS
   ☐  Las 7 se ven en productos, portada y carrito
   ☐  Perfume Dalba muestra marcador neutro, no icono roto

   404
   ☐  /cualquier-cosa muestra la página 404
   ☐  noindex, nofollow
   ☐  No está en el sitemap
   ☐  Tiene enlaces de vuelta

   CIERRE
   ☐  npm run build sin errores
   ☐  dist/ tiene .htaccess, _redirects, robots.txt, sitemap.xml y las fotos
   ☐  grep -rlP '\x00' src/  no devuelve nada
   ☐  esbuild compila
   ☐  git log muestra un commit por bloque
```

---

**Con esto la Fase 1 queda cerrada.** Lo único que falta después es que Jack
contrate el dominio y suba el `dist/`.
