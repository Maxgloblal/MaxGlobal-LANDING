# LO QUE FALTA PARA PUBLICAR LA LANDING

**Fecha:** 27 de agosto de 2026
**Estado:** las 6 páginas están construidas y funcionando

---

# RESUMEN

```
   🔴  Bloquea la publicación         3 cosas   ← todas legales
   🟡  Datos que faltan de Máximo     4
   🟢  Técnico del despliegue         5
```

**Lo que ya está terminado no vuelve a aparecer en este documento.**

---

# 🔴 BLOQUEA LA PUBLICACIÓN — LEGAL

> **Esto no es opcional.** Sin estas tres cosas el sitio no puede estar en
> internet en Perú.

## 1 · Libro de Reclamaciones virtual — **obligatorio con sanción**

**Ley 32495.** Todo comercio electrónico en Perú debe tenerlo.

**Hoy el enlace del pie no lleva a ninguna parte.**

No es una página de texto: **es un módulo completo.**

| Qué necesita | Detalle |
|---|---|
| Formulario | Datos del consumidor, del bien o servicio, y el detalle del reclamo |
| Distinción | **Queja** y **Reclamo** son cosas distintas por ley |
| Código único | Cada registro genera un código correlativo |
| Copia al consumidor | Se le envía por correo |
| Copia a la empresa | Llega al correo de Max Global |
| Plazo visible | 15 días hábiles para responder |
| Conservación | 2 años |

**Los textos ya están redactados** en `08-LEGAL/02-TEXTOS-PARA-EL-SITIO`,
sección 4.

> ⚠️ **Ojo con el envío de correos.** El módulo necesita mandar dos correos por
> cada reclamo. Eso requiere un servicio de correo transaccional, y **no estaba
> en la cotización**. La alternativa sin costo es que el formulario abra un
> correo prellenado o llegue por WhatsApp — menos elegante, pero cumple.

## 2 · Página de Términos y Condiciones

**Hoy el enlace apunta a `#terminos`** — un ancla vacía.

**Base:** Ley 29571. Texto redactado en `08-LEGAL/02-TEXTOS-PARA-EL-SITIO`,
sección 3.

## 3 · Página de Política de Privacidad

**Hoy el enlace apunta a `#privacidad`** — otra ancla vacía.

**Y esto es más grave de lo que parece:** la casilla de consentimiento del
formulario de registro dice *"He leído y acepto la Política de Privacidad"*.

**Está haciendo aceptar un documento que no existe.** Eso invalida el
consentimiento bajo el D.S. 016-2024-JUS.

Texto redactado en `08-LEGAL/02-TEXTOS-PARA-EL-SITIO`, sección 2.

---

# 🟡 DATOS QUE FALTAN DE MÁXIMO

*No bloquean el desarrollo, pero sí la publicación con información veraz.*

| # | Qué | Por qué importa |
|---|---|---|
| 1 | **Las 8 presentaciones de producto** | Hoy dicen "Caja 30 sobres", "Pote 500g"… **ninguna la dio él**. Si el cliente pide una caja de 30 y llega otra cosa, es información engañosa |
| 2 | **Qué es "Esplendor"** | Solo sabemos precio y puntos. La descripción actual es un marcador |
| 3 | **Registro sanitario** | La portada dice *"Productos con registro sanitario"*. **Si no lo tienen vigente, hay que quitar la frase** |
| 4 | **Misión, visión y valores** | La página Nosotros usa un borrador propuesto, marcado como tal en el código |

> **El punto 3 es responsabilidad mía**: yo escribí esa frase en el documento de
> copy. Es una afirmación de cumplimiento ante DIGESA y hay que confirmarla o
> sacarla.

---

# 🟢 TÉCNICO — ANTES DE PUBLICAR

| # | Qué | Notas |
|---|---|---|
| 1 | **Dominio y hosting** | `maxglobaloficial.com`. **Fuera de la cotización** |
| 2 | **`.htaccess` si va a Apache** | Sin él, las rutas dan 404. Está en `AUDITORIA-WEB`. Para Netlify y Vercel ya está resuelto |
| 3 | **Recompilar** | El `dist/` es de las 12:57 y el código cambió a las 14:05 |
| 4 | **Probar el enlace en WhatsApp** | Que la tarjeta de vista previa se vea bien. Es lo que más se va a ver del sitio |
| 5 | **Google Search Console** | Dar de alta el sitio y enviar el `sitemap.xml` |

## Y una prueba que vale por todas

**Abrir el sitio en un celular real, con datos móviles, no con WiFi.**

El tráfico va a llegar de WhatsApp, en celular, muchas veces con señal mala. Es
la única prueba que refleja al usuario verdadero.

---

# ✅ LO QUE YA ESTÁ TERMINADO

*Para que quede claro cuánto falta de verdad: poco.*

| Área | Estado |
|---|---|
| Las 6 páginas | ✅ construidas y navegables |
| Carrito con varios productos | ✅ persiste entre páginas |
| Mensaje de WhatsApp | ✅ lista, total público, puntos y código de socio |
| Precios | ✅ *"Los socios pagan desde"*, calculado desde los packs |
| Enlace de referido `?ref=` | ✅ se captura y viaja hasta el WhatsApp |
| Consentimiento de datos | ✅ dos casillas separadas, como exige la norma |
| Identificación en el pie | ✅ razón social, RUC y domicilio |
| SEO técnico | ✅ metadatos, canónica, `robots.txt`, `sitemap.xml`, JSON-LD |
| Vista previa de WhatsApp | ✅ imagen 1200×630 |
| Imágenes | ✅ 8 productos en 117 KB · hero con transparencia en 262 KB |
| Rutas en producción | ✅ `_redirects` y `vercel.json` |
| Pruebas | ✅ 35 unitarias · 40 de navegador |

**Sin promesas de ganancia · sin propiedades curativas · sin "hasta 55%".**

---

# EL ORDEN QUE CONVIENE

```
   1º   Las 3 páginas legales          ← es lo único que bloquea
   2º   Pedirle los 4 datos a Máximo
   3º   Recompilar y desplegar
   4º   Probar el enlace en WhatsApp y en un celular real
```

**Lo primero es lo único que necesita programación.** El resto son datos y
despliegue.

---

# LO QUE NO ENTRA — recordatorio

```
   ❌ Tienda replicada por socio       rechazado el 26/08
   ❌ Login y backoffice del socio     Fase 2
   ❌ Motor de comisiones              Fase 2
   ❌ Pago en línea                    todo va por WhatsApp
   ❌ Facturación electrónica SUNAT    fuera desde la cotización
```
