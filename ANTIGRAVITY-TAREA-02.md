# TAREA 02 — FUENTE ÚNICA DE DATOS, NOSOTROS Y CIERRE DE AUDITORÍA

**Fecha:** 27 de agosto de 2026
**Antes de empezar:** lee `AUDITORIA-WEB.md` de esta misma carpeta.

---

> # LO MÁS IMPORTANTE DE ESTA TAREA
>
> **Los datos de productos y packs están duplicados en tres lugares.**
>
> Eso hay que arreglarlo antes que nada, porque Máximo va a tener un panel para
> administrar sus productos y **ese panel sería inútil** si la web tiene los
> precios escritos a mano dentro de los componentes.
>
> El resto de la tarea es menor al lado de esto.

---

# BLOQUE A · 🔴 FUENTE ÚNICA DE DATOS

## El problema

Los mismos datos viven en tres sitios y pueden desincronizarse en silencio:

```
   src/config.js          PRODUCTOS[]  y  PACKS[]          ← debería ser el único
   src/pages/Productos.jsx    productsWithDescriptions[]   ← copia hardcodeada
   src/pages/Packs.jsx        packsData[]                  ← copia hardcodeada
                              + la tabla comparativa con precios escritos a mano
```

**Ejemplo de lo que ya puede pasar hoy:** si alguien corrige el precio del café en
`config.js`, la página de productos sigue mostrando el viejo. Nadie se entera
hasta que un cliente reclama.

> Este proyecto ya perdió una semana por un desfase de precios entre documentos.
> **No lo repitamos dentro del código.**

## Lo que hay que hacer

**1 · `config.js` es la única fuente. Punto.**

Borra `productsWithDescriptions` de `Productos.jsx` y `packsData` de `Packs.jsx`.
Ambas páginas importan de `config.js` y renderizan desde ahí.

**2 · Mueve al `config.js` todo lo que falte**

Los arrays hardcodeados tienen campos que `config.js` no tiene todavía —
descripciones, textos de beneficios, etiquetas. **Muévelos, no los dupliques.**

```js
// PRODUCTOS — estructura completa
{
  id: 'cafe-moringa',
  nombre: 'Café con Moringa',
  descripcion: '...',
  precioPublico: 150,
  precioSocio: 75,
  puntos: 18,
  categoria: 'Salud y Nutrición',
  presentacion: 'Caja 30 sobres',   // ⚠️ ver nota abajo
  imagen: '/images/productos/cafe-moringa.webp',
  activo: true,
}

// PACKS — estructura completa
{
  id: 'gold',
  nombre: 'Pack Gold',
  precio: 1200,
  puntosRango: 150,
  productos: '13 Productos',
  nivelesResidual: 10,
  patrocinioNiveles: '7 Niveles',
  descuentoRecompra: 50,
  beneficios: ['...', '...'],       // lo que hoy está en features[]
  destacado: true,
  etiqueta: 'Más Elegido',
  descripcion: '...',
  activo: true,
}
```

**3 · La tabla comparativa de packs se genera sola**

En `Packs.jsx` la tabla tiene los precios escritos celda por celda. **Recórrela
desde `PACKS`.** Si mañana entra un pack nuevo, la tabla debe aparecer sola.

**4 · Precio de socio calculado, no escrito**

```js
// ❌ mal — se puede desincronizar
precioSocio: 75

// ✅ bien — sale del precio público y el descuento
export const precioSocio = (p, dto = 50) => Math.round(p * (1 - dto / 100));
```

**Regla de negocio:** el precio público es el dato; el del socio se calcula
aplicando su `descuentoRecompra`. Nunca al revés.

**5 · Añade `activo: true/false`**

Para que el panel pueda dar de baja un producto sin borrarlo. Las páginas filtran
por `activo`.

## Cómo dejarlo listo para el panel de administración

**No construyas el panel. Solo prepara el terreno para que después sea barato.**

Crea `src/data/catalogo.js` como capa intermedia:

```js
import { PRODUCTOS, PACKS } from '../config';

export const getProductos = () => PRODUCTOS.filter(p => p.activo !== false);
export const getPacks     = () => PACKS.filter(p => p.activo !== false);
export const getPack      = (id) => PACKS.find(p => p.id === id);
```

Las páginas llaman a estas funciones, **nunca a `config.js` directamente.**

**Por qué importa:** cuando exista el panel, esas tres funciones pasan a leer de
Supabase y **ninguna página cambia**. Sin esta capa, habría que tocar todos los
componentes.

> ⚠️ **No instales Supabase ahora. No agregues async. No pongas estados de carga.**
> Solo la capa de funciones, síncrona, leyendo de `config.js`.

## ⚠️ Sobre las presentaciones de producto

Las presentaciones que pusiste —"Caja 30 sobres", "Pote 500g", etc.— **no las dio
el cliente.** Están en `config.js` como marcadores hasta que Máximo confirme.

**Déjalas, pero marca cada una:**

```js
presentacion: 'Caja 30 sobres',   // ⚠️ SIN CONFIRMAR por el cliente
```

Lo mismo con `Esplendor Facial` y su categoría `Cosmética`: **no sabemos qué es
ese producto.** Márcalo igual.

---

# BLOQUE B · PÁGINA NOSOTROS

Hoy la página no tiene contenido real. Máximo todavía no entregó misión, visión
ni valores.

**No los inventes.** Abajo hay un borrador redactado para que él lo apruebe o lo
corrija. Úsalo tal cual y déjalo marcado como propuesta en un comentario del
código.

## Contenido a usar

### Bloque 1 · Quiénes somos

> ## Max Global Corporation
>
> Somos una empresa peruana de venta directa. Distribuimos productos naturales de
> salud y cuidado personal a través de una red de socios en todo el país.
>
> No tenemos tiendas. Nuestro canal son las personas: hombres y mujeres que
> construyen su propio negocio recomendando productos que ellos mismos consumen.

### Bloque 2 · Qué hacemos

> Trabajamos con dos líneas: **salud y nutrición** —moringa, café y colágeno— y
> **cuidado personal** —aceites, cosmética y perfumería—.
>
> Cada socio compra con descuento permanente, revende a su precio y construye una
> red por la que recibe comisiones según nuestro plan de compensación.

### Bloque 3 · Cómo trabajamos

*Tres columnas con icono:*

| Título | Texto |
|---|---|
| **Producto primero** | El negocio se sostiene en gente que consume y recompra, no en afiliar por afiliar. |
| **Reglas claras** | Los porcentajes del plan están publicados. Cada socio puede verificar su cálculo. |
| **Alcance nacional** | Enviamos a todo el Perú por agencia de transporte. |

### Bloque 4 · Datos de la empresa

Desde `EMPRESA` en `config.js`: razón social, RUC, domicilio, contacto y el
enlace al **Libro de Reclamaciones**.

## 🔴 Lo que NO puede aparecer en esta página

```
   ❌ Años de trayectoria       ← no sabemos cuántos
   ❌ Cantidad de socios        ← publicidad engañosa sin respaldo
   ❌ Premios o certificaciones ← no nos consta ninguno
   ❌ Fotos de equipo genéricas ← Jack provee las reales, o no van
   ❌ "Líderes del mercado" y similares
```

**Todo lo anterior es publicidad engañosa bajo la Ley 29571 si no se puede
probar.**

## Nota de código obligatoria

Pon esto arriba del archivo:

```jsx
/*
 * ⚠️ CONTENIDO PROPUESTO — pendiente de aprobación de Max Global.
 * Redactado a partir de hechos verificables del proyecto.
 * No agregar años de trayectoria, cantidad de socios, premios ni
 * certificaciones: sin respaldo documental es publicidad engañosa (Ley 29571).
 */
```

---

# BLOQUE C · CERRAR LA AUDITORÍA

*Detalle completo en `AUDITORIA-WEB.md`.*

| # | Qué | Notas |
|---|---|---|
| 1 | **Recompilar** | El `dist/` está viejo, no tiene los arreglos |
| 2 | **Correr las pruebas** | `npx vitest run` y `npx playwright test` |
| 3 | **Sacar de `public/brand/`** `perfil-logo.png` y `perfil-simbolo.png` | 2.5 MB que se copian al `dist` y **ningún componente los usa** |
| 4 | **Actualizar las pruebas** | Al mover los datos a `config.js` varios tests van a romper |
| 5 | **`noindex` por página** | Instalar `react-helmet-async` para registro y confirmación |

## Sobre el punto 5

Hoy `index.html` tiene un solo `<meta name="robots">` global. El `robots.txt` ya
bloquea el rastreo de `/registro` y `/confirmacion`, así que **esto no es
urgente** — hazlo al final si queda tiempo.

## Sobre el punto 3

**No los borres.** Muévelos fuera de `public/`. Son recursos de marca que Jack
puede querer a mano, pero no deben viajar en cada compilación.

---

# BLOQUE D · IMÁGENES DE PRODUCTO

Hoy las tarjetas no tienen foto de producto.

**No generes ni busques imágenes.** Prepara la estructura y deja marcadores:

```
   public/images/productos/
     cafe-moringa.webp
     colageno-hidrolizado.webp
     aceite-moringa.webp
     esplendor.webp
     aceite-oregano.webp
     capsulas-moringa.webp
     harina-moringa.webp
     perfume-dalba.webp
```

**Formato:** cuadradas, 800×800, WebP, fondo blanco o transparente.

En `ProductCard`, si el archivo no existe, mostrar un marcador neutro con la
proporción correcta — **no un icono roto**.

**Jack provee las fotos.**

---

# ORDEN DE TRABAJO

```
   1º   Bloque A · fuente única de datos     ← lo más importante
   2º   Bloque C · puntos 1, 2 y 3
   3º   Bloque B · página Nosotros
   4º   Bloque D · estructura de imágenes
   5º   Bloque C · puntos 4 y 5
```

**Después de cada bloque, párate y avisa.** No encadenes.

---

# CRITERIOS DE ACEPTACIÓN

```
   FUENTE ÚNICA
   ☐  Ningún precio escrito a mano fuera de config.js
   ☐  Productos.jsx y Packs.jsx importan de src/data/catalogo.js
   ☐  La tabla comparativa se genera recorriendo PACKS
   ☐  El precio de socio se calcula, no se escribe
   ☐  Cambiar un precio en config.js se refleja en TODAS las páginas
   ☐  Las presentaciones sin confirmar están marcadas con comentario

   NOSOTROS
   ☐  Usa el copy propuesto, sin agregados
   ☐  Sin años, sin cantidad de socios, sin premios
   ☐  Libro de Reclamaciones enlazado
   ☐  Nota de "contenido propuesto" en el código

   CIERRE
   ☐  npm run build sin errores
   ☐  Vitest y Playwright en verde
   ☐  perfil-logo.png y perfil-simbolo.png fuera de public/
   ☐  Sin errores en la consola del navegador
```

---

# LO QUE SIGUE FUERA DE ALCANCE

*No lo construyas, aunque lo veas mencionado en los documentos del proyecto.*

```
   ❌ El panel de administración          es la Fase 2
   ❌ Supabase, base de datos, login      Fase 2
   ❌ El motor de comisiones              Fase 2
   ❌ Tienda replicada por socio          rechazado el 26/08
   ❌ Carrito con pago en línea           todo va por WhatsApp
```

**El Bloque A prepara el terreno para el panel. No es construirlo.**
