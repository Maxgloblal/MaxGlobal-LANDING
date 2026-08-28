# LO QUE FALTA PARA PUBLICAR LA LANDING

**Fecha:** 27 de agosto de 2026
**Estado:** las 6 páginas están construidas y funcionando

---

# RESUMEN

```
   ✅  Programación                   TERMINADA 27/08
   ✅  Legal · fotos · presentaciones RESUELTO
   🟢  Solo queda desplegar
```

**La Fase 1 está cerrada.** No queda nada que programar.

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
| ~~1~~ | ~~Las 8 presentaciones~~ | ✅ **RESUELTO 27/08.** Leídas de las etiquetas de las fotos oficiales |
| ~~2~~ | ~~Qué es Esplendor~~ | ✅ **RESUELTO.** Es LAL Esplendor, lágrimas humectantes en gotas, 15 ml |
| ~~3~~ | ~~Registro sanitario~~ | ✅ **RESUELTO.** Frase retirada por indicación de Jack |
| ~~4~~ | ~~Misión, visión y valores~~ | ✅ **YA ESTABAN** en el deck pág. 2. Aplicadas el 27/08 |
| **5** | **Presentación del Perfume Dalba** | 📌 Único dato que falta. No hay foto ni ficha |

> **El punto 3 es responsabilidad mía**: yo escribí esa frase en el documento de
> copy. Es una afirmación de cumplimiento ante DIGESA y hay que confirmarla o
> sacarla.

---

---

# MENSAJE PARA MÁXIMO — copiar tal cual

```
Máximo, la web ya está lista. Solo me faltan 3 datos tuyos
para publicarla:

1. LAS PRESENTACIONES DE CADA PRODUCTO
   Necesito saber cómo viene cada uno para no poner algo
   equivocado en la web. Por ejemplo:

   Café con Moringa ....... ¿caja de cuántos sobres?
   Colágeno ............... ¿pote de cuántos gramos?
   Aceite de Moringa ...... ¿frasco de cuántos ml?
   Aceite de Orégano ...... ¿de cuántos ml?
   Cápsulas de Moringa .... ¿cuántas cápsulas trae?
   Harina de Moringa ...... ¿bolsa de cuántos gramos?
   Perfume Dalba .......... ¿de cuántos ml?

2. QUÉ ES EXACTAMENTE "ESPLENDOR"
   De ese solo tengo el precio (S/. 120) y los puntos (14),
   pero no sé qué es ni para qué sirve.

3. REGISTRO SANITARIO
   En la web dice "Productos con registro sanitario".
   ¿Todos lo tienen vigente? Si alguno no, lo saco del texto
   para evitarte un problema con INDECOPI.

Con esos 3 datos actualizamos los textos y publicamos.

(La misión y visión ya las tomé de tu deck institucional,
están puestas tal cual en la sección Nosotros.)
```

## Por qué ese mensaje pide lo que pide

**El punto 1 no es un capricho.** Hoy la web dice "Caja 30 sobres", "Pote 500g" y
cinco más que **nadie confirmó**. Si un cliente pide la caja de 30 y le llega
otra cosa, eso es información engañosa bajo el Código del Consumidor.

**El punto 3 protege a Máximo, no a nosotros.** Afirmar registro sanitario sin
tenerlo vigente es exactamente lo que INDECOPI sanciona.

---

---

# 🔍 AUDITORÍA FUNCIONAL — 27/08, 19:00

*Se revisó el recorrido completo del usuario, no solo el código.*

## ✅ El flujo funciona de punta a punta

```
   Alguien entra por  maxglobaloficial.com/?ref=MG-00417
            ↓
   El código se guarda en sessionStorage
            ↓
   Navega, agrega productos al carrito — el código sobrevive
            ↓
   Va a Registro: el campo patrocinador YA VIENE LLENO
            ↓
   Envía → se arma el mensaje de WhatsApp con sus datos y el pack
            ↓
   Confirmación: ve las 2 cuentas bancarias y el botón de WhatsApp
```

**Verificado en el código, paso por paso.** El `?ref=` no se pierde en ningún
punto del recorrido.

## ✅ Lo que se revisó y está bien

| Verificación | Resultado |
|---|---|
| Marcadores `TODO` o `Lorem` sin resolver | Ninguno |
| Un solo `H1` por página | ✅ *(el Libro tiene 2 pero son pantallas alternas)* |
| Todas las imágenes con `alt` | ✅ |
| Enlaces vacíos o `href="#"` | Ninguno |
| Carrito vacío tiene su estado | ✅ *"Tu carrito está vacío"* |
| Los botones flotantes no se tapan | ✅ WhatsApp abajo, carrito 90px arriba |
| Sitemap incluye las 6 páginas indexables | ✅ |
| Confirmación muestra las 2 cuentas bancarias | ✅ BCP y BBVA |

---

# 🟢 DOS COSAS MENORES QUE SÍ CONVIENE ARREGLAR

## 1 · El `dist/` está desactualizado

```
   dist   27/08  18:12
   src    27/08  18:57     ← la misión y visión no están compiladas
```

**Solución:** `npm run build`

## ~~2 · Las URLs inexistentes devuelven la portada~~ ✅ RESUELTO

Se construyó la página 404 con `noindex, nofollow`. El `RouteManager` comprueba
`!isKnownRoute`, así que cualquier URL inventada queda fuera del índice.

<details><summary>Texto original</summary>

### Las URLs inexistentes devolvían la portada con estado 200

```jsx
<Route path="*" element={<Portada />} />
```

Si alguien entra a `maxglobaloficial.com/cualquier-cosa`, ve la portada y el
servidor responde **200 OK** en vez de 404.

**Por qué importa:** Google puede indexar URLs fantasma como si fueran páginas
reales. Es contenido duplicado de la portada.

**Es un detalle**, no bloquea publicar. Pero conviene una página 404 propia con
un enlace de vuelta al inicio.

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
   1º   Pedirle los 3 datos a Máximo
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
