# INSTRUCCIONES PARA ANTIGRAVITY — LANDING MAX GLOBAL

**Última actualización:** 27 de agosto de 2026

---

> # LEE ESTO ANTES DE PROPONER NADA
>
> **Tu trabajo en esta carpeta es UNO SOLO:** convertir los diseños ya
> terminados de esta carpeta en una web real con Vite + React.
>
> **NO vas a construir** el motor de comisiones, ni los datos semilla, ni el
> backoffice, ni el panel de administración, ni la base de datos.
>
> Si leíste los documentos del proyecto y viste el plan completo con motor de
> comisiones y red simulada: **eso es otra fase, en otro repositorio, y no es
> ahora.** Ignóralo mientras trabajes acá.

---

# 1 · QUÉ HAY EN ESTA CARPETA

Los diseños están **terminados**. Salieron de Claude Design y ya tienen el
sistema de diseño de la marca aplicado.

```
   P-01 Portada v2.dc.html      ← usar la v2, no la primera
   P-02 Productos.dc.html
   P-03 Packs.dc.html            ← la pantalla más importante
   P-04 Registro.dc.html
   P-05 Confirmacion.dc.html
   P-06 Nosotros.dc.html

   SiteHeader.dc.html            ← componente compartido
   SiteFooter.dc.html            ← componente compartido

   _ds/                          ← 🔴 EL SISTEMA DE DISEÑO. No lo toques
   support.js                    ← runtime de vista previa. NO va a producción
```

## Qué es cada cosa

**Los `.dc.html`** son exportaciones de Claude Design. Usan etiquetas propias
(`<x-dc>`, `<dc-import>`, `<helmet>`) y variables `{{ asi }}`. **No son HTML
normal** — hay que traducirlos a React.

**`_ds/`** contiene los tokens CSS de la marca: colores, tipografía, espaciado,
elevación y movimiento. Además trae las tipografías originales.

**`support.js`** es el runtime que hace que los `.dc.html` se vean en el
navegador durante la vista previa. **No se copia al proyecto final.**

---

# 2 · 🔴 REGLAS QUE NO SE ROMPEN

## 1 · Los tokens CSS se conservan tal cual

Los archivos de `_ds/*/tokens/` se copian al proyecto **sin reescribirlos**.

**Prohibido convertirlos a Tailwind, a styled-components o a objetos JS.** Ese
sistema de diseño es la marca, salió del brandbook, y va a servir también para
el backoffice de la Fase 2.

```css
/* Así se usan, y así se quedan */
color: var(--text-strong);
background: var(--gold-400);
padding: var(--sp-6);
```

## 2 · El diseño no se "mejora"

Si algo te parece que quedaría mejor de otra forma, **no lo cambies**. Estos
diseños fueron revisados y aprobados. Tu trabajo es reproducirlos fielmente.

Si ves un problema real —algo roto, un contraste que falla, un layout que se
rompe en móvil— **avísalo, no lo arregles por tu cuenta.**

## 3 · Las imágenes las pone Jack

**No generes imágenes, no busques imágenes de banco, no inventes ilustraciones.**

Donde falte una imagen, deja un marcador con las dimensiones exactas y un
comentario:

```jsx
{/* IMAGEN PENDIENTE — Jack la provee
    Ubicación: portada, columna derecha
    Tamaño: 640×720, formato WebP
    Contenido: producto sobre fondo blanco */}
<div className="img-placeholder" style={{aspectRatio:'640/720'}} />
```

## 4 · Nada de backend

**En esta fase no hay Supabase, ni base de datos, ni autenticación, ni API.**

El formulario de registro por ahora **no envía a ningún lado**: valida en el
navegador y arma el mensaje de WhatsApp. Nada más.

## 5 · Los textos no se cambian

El copy de los diseños está revisado y tiene restricciones legales. **No lo
reescribas, no lo "mejores", no le agregues frases de venta.**

Hay tres cosas que **nunca** pueden aparecer en el sitio:

```
   ❌ Cualquier promesa de ganancias  ("gana S/. X al mes")
   ❌ Cualquier propiedad curativa    ("cura", "previene", "trata")
   ❌ La frase "hasta 55% de descuento"
```

Las dos primeras las sanciona INDECOPI. La tercera es incorrecta: el socio
recompra al 50%.

---

# 3 · CÓMO TRADUCIR LOS `.dc.html`

## Estructura de un archivo

```html
<x-dc>
  <helmet>
    <link rel="stylesheet" href="_ds/.../tokens/colors.css">
    <style> /* estilos propios de la página */ </style>
  </helmet>

  <dc-import name="SiteHeader" active="packs" phone="{{ phone }}"></dc-import>

  <section> ... contenido ... </section>

  <dc-import name="SiteFooter"></dc-import>
</x-dc>
```

## Equivalencias

| En el `.dc.html` | En React |
|---|---|
| `<x-dc>` | El componente de la página. Se descarta la etiqueta |
| `<helmet>` con `<link>` | Importar los CSS una sola vez en `main.jsx` |
| `<helmet>` con `<style>` | Módulo CSS de esa página, o CSS global con prefijo |
| `<dc-import name="SiteHeader">` | `<SiteHeader />` |
| `active="packs"` | `<SiteHeader active="packs" />` |
| `{{ phone }}` | prop o valor de configuración |
| `style="..."` | `style={{...}}` en camelCase |
| `class=` | `className=` |
| Iconos `lucide` por CDN | `import { X } from 'lucide-react'` |

## Las variables que aparecen

```
   phone        refName      refCode      refLabel     active
   packs        fKit         fEjecutivo   fGold        fFamiliar
   fEmpresarial goRegistro   spanTwo
   consent      toggleConsent    consentHint   notConsented
   marketing    toggleMarketing  onSubmit      departamentos
```

**Las de datos** (`packs`, `phone`, `departamentos`) salen de un archivo de
configuración.
**Las de estado** (`consent`, `marketing`, `active`) son `useState`.
**Las de acción** (`onSubmit`, `toggleConsent`, `goRegistro`) son funciones.

---

# 4 · STACK Y ESTRUCTURA

```
   Vite + React + React Router
   CSS plano con los tokens del _ds
```

**Sin Tailwind, sin librerías de componentes, sin framework de animación.**
El sistema de diseño ya está resuelto.

```
   src/
     main.jsx
     App.jsx                 rutas
     config.js               🔴 teléfono, packs, productos, cuentas
     styles/
       tokens/               copiados de _ds, sin modificar
       styles.css            copiado de _ds
     components/
       SiteHeader.jsx
       SiteFooter.jsx
       WhatsAppFab.jsx
     pages/
       Portada.jsx           /
       Productos.jsx         /productos
       Packs.jsx             /packs-de-afiliacion
       Registro.jsx          /registro
       Confirmacion.jsx      /confirmacion
       Nosotros.jsx          /nosotros
   public/
     fonts/                  .woff2 convertidas
     img/                    Jack las provee
```

## Las rutas — exactas

```
   /                        Portada
   /productos               Productos
   /packs-de-afiliacion     Packs      ← la URL lleva la palabra clave
   /registro                Registro
   /confirmacion            Confirmación
   /nosotros                Nosotros
```

## `config.js` — todo lo variable en un solo lugar

Los datos que faltan del cliente van acá como marcadores visibles:

```js
export const EMPRESA = {
  razonSocial: 'PENDIENTE',
  ruc: 'PENDIENTE',
  domicilio: 'PENDIENTE',
  whatsapp: 'PENDIENTE',
  banco: { nombre:'PENDIENTE', cuenta:'0198789899', cci:'PENDIENTE', titular:'PENDIENTE' },
};
```

**No inventes datos de relleno que parezcan reales.** Que se note que falta.

---

# 5 · EL ENLACE DE REFERIDO

Cada socio comparte `maxglobaloficial.com/?ref=MG-00417`.

**Comportamiento:**

1. Al cargar cualquier página, leer `?ref=` de la URL
2. Guardarlo en `sessionStorage`
3. Mantenerlo en todas las páginas mientras dure la visita
4. Precargarlo en el campo de patrocinador del registro
5. Incluirlo en el mensaje de WhatsApp

**En el encabezado**, si hay referido, mostrar discretamente: *"Te recomendó:
María T."*

## 🔴 Y la canónica

En la portada, siempre:

```html
<link rel="canonical" href="https://maxglobaloficial.com/">
```

**Sin esto, cada socio genera una URL distinta y Google las cuenta como
contenido duplicado.** Con cientos de socios eso hunde el posicionamiento.

---

# 6 · EL BOTÓN DE WHATSAPP

**Es el elemento más importante de todo el sitio.** No hay pago en línea: todo
termina en WhatsApp.

```js
const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
```

**Formato del mensaje desde el catálogo:**

```
Hola, quiero pedir:
- 2× Café de Moringa (S/. 300)
- 1× Colágeno (S/. 150)

Total: S/. 450
Ref: MG-00417
```

**Desde la página de packs:**

```
Hola, me interesa el Pack Gold (S/. 1,200).
Ref: MG-00417
```

**Botón flotante** en todas las páginas, esquina inferior derecha en móvil.

---

# 7 · CÓMO VAMOS A TRABAJAR

**Jack te va a dar los prompts de a poco y revisa cada entrega.**
No adelantes trabajo que no se te pidió.

```
   Paso 1   Andamiaje del proyecto + tokens + fuentes .woff2
   Paso 2   SiteHeader y SiteFooter
   Paso 3   P-03 Packs          ← la más importante, primero
   Paso 4   P-01 Portada
   Paso 5   P-02 Productos
   Paso 6   P-04, P-05, P-06
   Paso 7   SEO, metadatos y revisión final
```

**Al terminar cada paso, párate y espera.** No sigas al siguiente.

## Al entregar cada página, di

```
   ✅ Qué hiciste
   ⚠️ Qué te faltó y por qué
   📌 Qué necesitas de Jack (imágenes, datos, decisiones)
   🔍 Qué te pareció dudoso del diseño original
```

---

# 8 · LO PRIMERO — PASO 1

```
   1. Crear el proyecto Vite + React
   2. Instalar react-router-dom y lucide-react
   3. Copiar _ds/*/tokens/*.css y styles.css a src/styles/
      SIN MODIFICARLOS
   4. Convertir los 5 .ttf a .woff2 y actualizar fonts.css
      (pesan de 3 a 5 veces menos)
   5. Crear config.js con los marcadores PENDIENTE
   6. Montar las 6 rutas con páginas vacías
   7. Verificar que los tokens cargan: una caja con
      background: var(--gold-400) debe verse dorada
```

**No copies `support.js`.** Es solo para la vista previa.

**Para de acá y avisa.**

---

# 9 · CRITERIOS DE ACEPTACIÓN

```
   ☐  Se ve igual que el .dc.html original en escritorio y móvil
   ☐  Los tokens CSS están sin modificar
   ☐  Las fuentes son .woff2
   ☐  El ?ref= sobrevive la navegación entre páginas
   ☐  El botón de WhatsApp arma bien el mensaje
   ☐  Un solo H1 por página
   ☐  Texto alternativo en las imágenes
   ☐  Sin promesas de ganancias en ningún texto
   ☐  Sin propiedades curativas en ningún producto
   ☐  En ningún lado dice "hasta 55%"
   ☐  Libro de Reclamaciones visible en el pie
   ☐  Portada bajo 1 MB
   ☐  Sin errores en la consola
```

---

# 10 · DOCUMENTOS DE APOYO

*Solo si necesitas contexto. **No los uses para ampliar tu alcance.***

| Necesito | Está en |
|---|---|
| Sistema de diseño y reglas | `06-MARCA/02-CLAUDE-DESIGN/00-BRIEF-MAESTRO` |
| Copy exacto de cada página | `06-MARCA/02-CLAUDE-DESIGN/01-COPY-Y-PANTALLAS` |
| Metadatos y SEO | `06-MARCA/02-CLAUDE-DESIGN/02-SEO-Y-ESTRUCTURA` |
| Requisitos de la web pública | `03-SISTEMA/08-RF-WEB-PUBLICA` |
| Reglas del negocio | `00-EMPEZAR-AQUI/06-DOCUMENTO-MAESTRO` |

> **El documento maestro y el schema describen el sistema completo, incluido el
> motor de comisiones. Eso NO es parte de este trabajo.** Está acá solo para que
> entiendas de qué habla la web, no para que lo construyas.
