# TAREA 03 — CARRITO Y PRECIOS DE SOCIO

**Fecha:** 27 de agosto de 2026 · **Actualizado tras la Tarea 02**
**Lee primero:** `03-SISTEMA/14-FLUJO-DE-PRECIOS-Y-DESCUENTOS.md`

---

> # 🔴 PARA — ESTO ES LO PRIMERO
>
> ## Has truncado archivos en las TRES sesiones seguidas
>
> Declaraste la Tarea 02 *"completada al 100%, 32 de 32 pruebas pasadas,
> compilación exitosa"*.
>
> **El proyecto no compilaba.** Tres archivos quedaron cortados a media palabra:
>
> ```
> src/App.jsx              línea 67   cortado en  "flexDir
> src/pages/Nosotros.jsx   línea 276  cortado en  "gap: '
> src/components/ProductCard.jsx      sin la llave de cierre
> ```
>
> **App.jsx se quedó sin las 6 rutas.** La aplicación entera estaba rota.
>
> En la sesión anterior fueron `config.js` —donde se perdieron dos packs y todo
> el array de productos—, `Portada.jsx` y otros tres con bytes nulos.
>
> ## Qué significa
>
> **Tu proceso de escritura de archivos no es confiable en este entorno.**
> No es un error de código: es que el archivo se corta al guardarse.
>
> ## Las tres reglas nuevas
>
> **1 · Inicia git AHORA, antes de tocar una línea**
>
> ```bash
> git init
> git add -A
> git commit -m "estado funcional antes de tarea 03"
> ```
>
> **2 · Commit después de CADA bloque, no al final**
>
> **3 · Verifica antes de decir que terminaste**
>
> ```bash
> # ¿algún archivo cortado?
> grep -rlP '\x00' src/ && echo "🔴 BYTES NULOS"
>
> # ¿compila de verdad?
> npx esbuild src/main.jsx --bundle --loader:.jsx=jsx --loader:.css=empty \
>   --outfile=/dev/null --external:react --external:react-dom \
>   --external:react-router-dom --external:lucide-react
> ```
>
> **Si esbuild falla, NO has terminado.** Que las pruebas pasen no basta: en la
> Tarea 02 pasaron 32 de 32 con la aplicación rota, porque los archivos se
> cortaron *después* de correrlas.
>
> **Y al escribir un archivo largo, escríbelo en partes y verifica el final
> de cada una.**

---

# EL PROBLEMA

## 1 · La tarjeta muestra un descuento que no aplica a todos

```jsx
// ProductCard.jsx línea 44
const partnerPrice = numericPrice > 0 ? precioSocio(numericPrice, 50) : null;
//                                                                ^^ fijo
```

Y en pantalla dice **"Precio Socio (50%)"**.

**El Kit Emprendedor recompra al 40%, no al 50%.** Ve S/. 75 y termina pagando
S/. 90.

Es información inexacta sobre precios — **Código del Consumidor, Ley 29571.**

## 2 · No hay carrito

Cada tarjeta manda su propio mensaje de un producto. Quien quiera cinco cosas
manda cinco WhatsApps.

El alcance original dice: *"el cliente arma su pedido en la web y le llega a
ustedes con todo escrito"*.

## 3 · El mensaje no lleva el código de socio

El administrador recibe *"quiero café"* sin saber si es un Kit al 40%, un Gold al
50% o un cliente final a precio lleno. **No puede cotizar.**

---

# BLOQUE A · CORREGIR EL PRECIO EN LA TARJETA

## Qué mostrar

```
   S/. 150
   Los socios pagan desde S/. 75
   [ 18 puntos ]
```

**"Desde" es exacto para todos los packs.** El Gold paga S/. 75; el Kit paga
S/. 90 — que sigue estando "desde S/. 75" hacia arriba.

Y funciona como argumento de venta: el visitante ve que afiliarse le parte el
precio a la mitad.

## Implementación

```js
// El mejor descuento vigente sale de los packs, no de un número escrito a mano
export const mejorDescuento = () =>
  Math.max(...getPacks().map(p => p.descuentoRecompra));

// en la tarjeta
const desde = precioSocio(precioPublico, mejorDescuento());
```

**Prohibido escribir `50` en el código.** Si mañana cambia un descuento, la web
debe seguirlo sola.

## 🔴 Nada de esto

```
   ❌ "Precio Socio (50%)"     el porcentaje no es igual para todos
   ❌ "Ahorra 50%"             igual
   ❌ "50% de descuento"       en tarjeta de producto
```

---

# BLOQUE B · CARRITO

## Reglas

**Sin backend. Sin base de datos. Sin login.** Solo estado en el navegador.

- Contexto de React o `useState` elevado
- Persistir en `sessionStorage` para que sobreviva la navegación entre páginas
- Se vacía al cerrar la pestaña

## Componentes

**1 · Botón "Agregar" en cada tarjeta**
Reemplaza al de WhatsApp individual. Si el producto ya está, muestra cantidad
con `−` y `+`.

**2 · Contador flotante**
Junto al botón de WhatsApp, esquina inferior derecha. Muestra cuántos productos
lleva. Al pulsarlo, abre el resumen.

**3 · Panel de resumen**
Lista, cantidades, subtotales, total y puntos. Botón para quitar. Y el CTA
principal.

## El estado

```js
{
  items: [{ id, nombre, precioPublico, puntos, cantidad }],
  totalPublico,   // suma de precioPublico × cantidad
  totalPuntos,    // suma de puntos × cantidad
}
```

**Guarda el precio público. No calcules descuentos en el carrito** — la web no
sabe qué pack tiene el visitante.

---

# BLOQUE C · EL MENSAJE DE WHATSAPP

## Formato exacto

```
Hola, quiero hacer este pedido:

• 2× Café con Moringa ......... S/. 300
• 1× Colágeno Hidrolizado ..... S/. 150
• 2× Cápsulas de Moringa ...... S/. 120

Total a precio público: S/. 570
Puntos: 70

Mi código de socio: MG-00417
```

## Las tres cosas obligatorias

**1 · Decir "a precio público" literalmente**
Si dice solo "Total: S/. 570" y le cobran S/. 285, el socio se confunde. Y si es
al revés, reclama.

**2 · El código de socio**
Campo de texto en el panel del carrito. **Precargado desde `?ref=`** si existe,
editable siempre. Si está vacío, esa línea no se incluye.

**3 · Los puntos**
Le sirven al socio para saber si llega a sus 70 de activación.

## Aviso fijo bajo el carrito

> *Los precios mostrados son de venta al público. Si eres socio, tu asesor
> aplicará el descuento que corresponde a tu pack al confirmar el pedido.*

**No es decorativo.** Resuelve la ambigüedad y protege ante un reclamo.

---

# LO QUE NO SE TOCA

```
   ❌ No agregues login ni cuentas de socio     Fase 2
   ❌ No agregues Supabase ni base de datos     Fase 2
   ❌ No calcules el descuento del socio en la web
        la web no sabe quién es — lo aplica el administrador
   ❌ No agregues pago en línea                 todo va por WhatsApp
   ❌ No inventes descuentos ni promociones
```

---

# ORDEN

```
   0º   git init + commit          ← antes de tocar nada
   1º   Bloque A · precio en la tarjeta
        commit
   2º   Bloque B · carrito
        commit
   3º   Bloque C · mensaje de WhatsApp
        commit
   4º   Pruebas y build
```

**Párate después de cada bloque y avisa.**

---

# CRITERIOS DE ACEPTACIÓN

```
   PRECIO
   ☐  Ninguna tarjeta dice un porcentaje de descuento
   ☐  Dice "Los socios pagan desde S/. X"
   ☐  El "desde" sale de los packs, no de un número escrito a mano
   ☐  Cambiar descuentoRecompra en config.js cambia lo que se muestra

   CARRITO
   ☐  Se pueden agregar varios productos con cantidades
   ☐  Sobrevive al navegar entre páginas
   ☐  El total y los puntos cuadran
   ☐  Funciona en móvil sin tapar el botón de WhatsApp

   MENSAJE
   ☐  Lleva la lista completa con cantidades y subtotales
   ☐  Dice "Total a precio público"
   ☐  Incluye los puntos
   ☐  Incluye el código de socio si existe
   ☐  El código se precarga desde ?ref=
   ☐  El aviso de precios está visible bajo el carrito

   GENERAL
   ☐  git log muestra un commit por bloque
   ☐  npm run build sin errores
   ☐  Vitest y Playwright en verde
   ☐  Ningún archivo con bytes nulos ni truncado
```

## Verificación de integridad — córrela al terminar

```bash
# ningún archivo debe tener bytes nulos
grep -rlP '\x00' src/ && echo "🔴 ARCHIVO CORRUPTO" || echo "✅ sin corrupción"

# el proyecto compila
npx esbuild src/main.jsx --bundle --loader:.jsx=jsx --loader:.css=empty \
  --outfile=/dev/null --external:react --external:react-dom \
  --external:react-router-dom --external:lucide-react
```
