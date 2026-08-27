# TAREA 04 — LAS TRES PÁGINAS LEGALES

**Fecha:** 27 de agosto de 2026
**Es lo último que bloquea la publicación.**

---

> # ANTES DE EMPEZAR
>
> **1 · Verifica que el repositorio esté limpio**
>
> ```bash
> git status
> git log --oneline | head -3
> ```
>
> Si hay archivos `.lock` en `.git/`, bórralos antes de seguir.
>
> **2 · Commit del estado actual**
>
> ```bash
> git add -A && git commit -m "estado antes de tarea 04"
> ```
>
> **3 · Recuerda el protocolo de verificación**
>
> Has truncado archivos en las cuatro sesiones anteriores. **Commit después de
> cada página**, y antes de decir que terminaste:
>
> ```bash
> grep -rlP '\x00' src/ && echo "🔴 BYTES NULOS"
>
> npx esbuild src/main.jsx --bundle --loader:.jsx=jsx --loader:.css=empty \
>   --outfile=/dev/null --external:react --external:react-dom \
>   --external:react-router-dom --external:lucide-react
> ```
>
> **Si esbuild falla, no has terminado.** Las pruebas en verde no prueban nada
> si el archivo se cortó después de correrlas.

---

# EL PROBLEMA

**Los tres enlaces legales del pie de página no llevan a ninguna parte.**

```jsx
// SiteFooter.jsx
<a href="#terminos">Términos y condiciones</a>      ← ancla vacía
<a href="#privacidad">Política de privacidad</a>    ← ancla vacía
<a>Libro de Reclamaciones</a>                       ← sin destino
```

**Sin estas tres páginas el sitio no puede publicarse en Perú.**

Y hay algo peor: el formulario de registro tiene una casilla que dice *"He leído
y acepto la Política de Privacidad"*. **Está haciendo aceptar un documento que no
existe**, lo que invalida el consentimiento bajo el D.S. 016-2024-JUS.

## Los textos ya están escritos

**No los redactes tú.** Están en `08-LEGAL/02-TEXTOS-PARA-EL-SITIO.md`:

| Página | Sección del documento |
|---|---|
| Política de Privacidad | 2 |
| Términos y Condiciones | 3 |
| Libro de Reclamaciones | 4 |

**Úsalos tal cual.** Si algo falta, déjalo marcado como pendiente — no inventes
cláusulas legales.

---

# BLOQUE A · POLÍTICA DE PRIVACIDAD

**Ruta:** `/politica-de-privacidad`

Página de texto simple. Usa el sistema de diseño existente: contenedor, títulos
con la tipografía de display, cuerpo legible.

**Ancho de lectura cómodo** — no dejes el texto a todo el ancho de la pantalla.

## Enlazarla desde donde toca

```jsx
// SiteFooter.jsx
<Link to="/politica-de-privacidad">Política de privacidad</Link>

// Registro.jsx — dentro del texto de la casilla
He leído y acepto la <Link to="/politica-de-privacidad">Política de
Privacidad</Link> y autorizo el tratamiento de mis datos personales…
```

**El enlace dentro de la casilla es obligatorio.** No se puede aceptar algo que
no se puede leer.

## Metadatos

```
Título:  Política de Privacidad | Max Global Corporation
Robots:  index, follow
```

---

# BLOQUE B · TÉRMINOS Y CONDICIONES

**Ruta:** `/terminos-y-condiciones`

Mismo tratamiento. Enlazar desde el pie.

```
Título:  Términos y Condiciones | Max Global Corporation
Robots:  index, follow
```

> **Nota:** estos son los términos de uso **del sitio web**. Los *términos de
> afiliación* —el contrato entre Max Global y sus socios— los tiene que redactar
> un abogado y **no van en esta tarea**.

---

# BLOQUE C · LIBRO DE RECLAMACIONES 🔴

**Ruta:** `/libro-de-reclamaciones`

**No es una página de texto: es un formulario con reglas legales.**

## Campos obligatorios

**Del consumidor**

```
   Nombre completo · DNI · Domicilio · Correo · Teléfono
   Si es menor de edad: datos del apoderado
```

**Del bien o servicio**

```
   Tipo:  ( ) Producto   ( ) Servicio
   Descripción
   Monto reclamado  (opcional)
```

**Del reclamo — 🔴 la distinción importa**

```
   ( ) RECLAMO   disconformidad con el producto o servicio
   ( ) QUEJA     malestar con la atención recibida
```

**Son cosas distintas por ley.** El formulario tiene que explicar la diferencia,
no solo listarlas.

```
   Detalle de lo ocurrido
   Pedido del consumidor
```

## Lo que pasa al enviar

```
   1.  Se genera un código correlativo    MG-LR-0001, MG-LR-0002…
   2.  Se muestra en pantalla al consumidor
   3.  Se le manda copia a su correo
   4.  Le llega copia a Max Global
   5.  Se muestra el plazo de respuesta: 15 días hábiles
```

## ⚠️ El problema del correo — decisión necesaria

Los puntos 3 y 4 necesitan **enviar correos de verdad**. Eso requiere un servicio
de correo transaccional, **y no estaba en la cotización**.

**Implementa la versión sin costo:**

```
   Al enviar el formulario:
   1. Genera el código y muéstralo en pantalla, bien visible
   2. Muestra el aviso: "Guarda este código. Te responderemos
      en un plazo de 15 días hábiles."
   3. Arma un mensaje de WhatsApp con TODO el contenido del reclamo
      y ábrelo hacia el número de Max Global
   4. Ofrece un botón "Descargar mi reclamo" que genere un archivo
      de texto con los datos, para que el consumidor conserve copia
```

**Eso cumple el espíritu de la norma** —queda registro y el consumidor tiene su
copia— sin agregar infraestructura no cotizada.

**Deja el código preparado** para que cuando haya servicio de correo sea cambiar
una función, no rehacer el módulo.

## El código correlativo

Sin base de datos, guárdalo en `localStorage` con la fecha:

```
   MG-LR-20260827-0001
```

**Documenta en el código que esto es provisional** y que en la Fase 2 el
correlativo debe venir del servidor.

## Metadatos

```
Título:  Libro de Reclamaciones | Max Global Corporation
Robots:  noindex
```

*Un formulario no aporta nada al buscador.*

## El icono en el pie

Por norma debe estar **visible, no escondido**. Ya tiene el icono de libro —
mantenlo y ahora enlázalo a la ruta real.

---

# ORDEN

```
   0º   git commit del estado actual
   1º   Bloque A · Política de Privacidad      → commit
   2º   Bloque B · Términos y Condiciones      → commit
   3º   Bloque C · Libro de Reclamaciones      → commit
   4º   Actualizar sitemap.xml y robots.txt
   5º   npm run build + pruebas
```

**Párate después de cada bloque.**

---

# CRITERIOS DE ACEPTACIÓN

```
   RUTAS
   ☐  /politica-de-privacidad responde
   ☐  /terminos-y-condiciones responde
   ☐  /libro-de-reclamaciones responde
   ☐  Ningún enlace del pie apunta a # vacío
   ☐  La casilla del registro enlaza a la política

   CONTENIDO
   ☐  El texto sale de 08-LEGAL/02-TEXTOS-PARA-EL-SITIO
   ☐  No se inventó ninguna cláusula legal
   ☐  Lo que falta está marcado como pendiente, no rellenado

   LIBRO DE RECLAMACIONES
   ☐  Distingue Reclamo de Queja y explica la diferencia
   ☐  Genera código correlativo y lo muestra
   ☐  Indica el plazo de 15 días hábiles
   ☐  El consumidor puede conservar copia
   ☐  El reclamo le llega a Max Global
   ☐  Enlace visible en el pie, con su icono

   SEO
   ☐  Privacidad y Términos: index, follow
   ☐  Libro de Reclamaciones: noindex
   ☐  sitemap.xml incluye las dos primeras
   ☐  robots.txt bloquea /libro-de-reclamaciones

   INTEGRIDAD
   ☐  grep -rlP '\x00' src/ no devuelve nada
   ☐  esbuild compila sin errores
   ☐  git log muestra un commit por bloque
```

---

# LO QUE NO SE TOCA

```
   ❌ No redactes cláusulas legales nuevas
   ❌ No agregues servicio de correo ni backend
   ❌ No toques las imágenes                    son de Jack
   ❌ No modifiques las 6 páginas existentes
   ❌ Nada de login, Supabase ni motor          Fase 2
```

**Después de esta tarea la landing está lista para publicar**, a falta de los
datos que tiene que entregar el cliente.
