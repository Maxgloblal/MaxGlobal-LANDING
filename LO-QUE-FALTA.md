# LO QUE FALTA PARA PUBLICAR LA LANDING

**Fecha:** 27 de agosto de 2026
**Estado:** las 6 páginas están construidas y funcionando

---

# RESUMEN

```
   ✅  Legal                          RESUELTO 27/08
   🟡  Datos que faltan de Máximo     4
   🟢  Técnico del despliegue         5
```

**Ya no queda nada que programar.** Lo que falta son datos del cliente y el
despliegue.

**Lo que ya está terminado no vuelve a aparecer en este documento.**

---

# ✅ LEGAL — RESUELTO EL 27/08

**Las tres páginas están construidas y verificadas.**

| Página | Ruta | Estado |
|---|---|---|
| Política de Privacidad | `/politica-de-privacidad` | ✅ con RUC, derechos ARCO y cláusula de no cesión |
| Términos y Condiciones | `/terminos-y-condiciones` | ✅ con cláusula de distribuidor independiente |
| Libro de Reclamaciones | `/libro-de-reclamaciones` | ✅ módulo completo |

**El Libro de Reclamaciones** distingue Reclamo de Queja con sus definiciones
legales, contempla apoderado para menores, genera código correlativo
`MG-LR-YYYYMMDD-XXXX`, muestra el plazo de 15 días hábiles, y ofrece descargar
copia, enviar por WhatsApp, correo prellenado e imprimir.

**Los enlaces del pie ya no apuntan a anclas vacías**, y la casilla de
consentimiento del registro enlaza a la política real.

También se agregó el `.htaccess` para Apache, y se actualizaron `robots.txt` y
`sitemap.xml`.

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
   1º   Pedirle los 4 datos a Máximo
   2º   Contratar dominio y hosting
   3º   Recompilar y desplegar
   4º   Probar el enlace en WhatsApp y en un celular real
```

**Nada de esto necesita programación.**

---

# LO QUE NO ENTRA — recordatorio

```
   ❌ Tienda replicada por socio       rechazado el 26/08
   ❌ Login y backoffice del socio     Fase 2
   ❌ Motor de comisiones              Fase 2
   ❌ Pago en línea                    todo va por WhatsApp
   ❌ Facturación electrónica SUNAT    fuera desde la cotización
```
