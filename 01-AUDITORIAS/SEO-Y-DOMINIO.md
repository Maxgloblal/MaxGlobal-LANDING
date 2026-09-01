# SEO Y DOMINIO — LO QUE QUEDA PENDIENTE DE LA FASE 1

**Fecha:** 27 de agosto de 2026
**Estado:** 🔴 Hay un fallo real, verificado en el código

---

> ## RESUMEN EN UNA FRASE
>
> **Hoy, si compartes un producto por WhatsApp, la tarjeta que se ve es la
> de la portada.** No la del producto. Y eso pasa con las 14 páginas.

---

# 1 · QUÉ ENCONTRÉ

## Lo que pasa hoy

```
   Compartes  maxglobaloficial.com/productos/cafe-moringa
              ↓
   WhatsApp muestra:

   ┌────────────────────────────────────────┐
   │  [ imagen genérica de la portada ]     │
   │                                        │
   │  Max Global Corporation —              │
   │  Salud, Bienestar y Emprendimiento     │
   │                                        │
   │  Productos naturales de moringa y      │
   │  bienestar. Conoce nuestros packs...   │
   └────────────────────────────────────────┘
```

**Debería mostrar la foto del café, el nombre del café y su precio.**

## Por qué pasa

Son dos cosas que se juntan.

**Primera: el sitio es una SPA.** Todas las rutas devuelven **el mismo archivo**:

```
   dist/index.html          ← el único HTML que existe

   /                        →  dist/index.html
   /productos               →  dist/index.html
   /productos/cafe-moringa  →  dist/index.html
   /packs-de-afiliacion     →  dist/index.html
```

Eso está en `_redirects`, `vercel.json` y `.htaccess`. **Es correcto** — así funcionan
las SPA. React lee la URL y decide qué pintar.

**Segunda: las etiquetas de vista previa están fijas en ese HTML.**

```html
<!-- index.html -->
<meta property="og:title"  content="Max Global Corporation — Salud, Bienestar..." />
<meta property="og:image"  content="https://maxglobaloficial.com/images/og-image.jpg" />
<meta property="og:url"    content="https://maxglobaloficial.com/" />
```

**Y ningún archivo de `src/` las toca.** Lo verifiqué:

```bash
grep -rn "og:image\|og:title\|og:url\|twitter:" src/
→ (vacío)
```

## El detalle que lo vuelve irreparable desde React

**El robot de WhatsApp y el de Facebook no ejecutan JavaScript.**

Piden el HTML, leen las etiquetas `og:` y se van. **Nunca ven a React arrancar.**

Por eso no sirve de nada agregar código que cambie las `og:` al navegar: para
cuando ese código corre, el robot ya se fue con la tarjeta de la portada.

---

# 2 · LA SEGUNDA CONSECUENCIA — la canónica

El mismo problema afecta a Google, aunque de forma más suave.

```jsx
// src/App.jsx línea 97 — esto corre en el navegador
canonicalLink.setAttribute('href', `https://maxglobaloficial.com${cleanPath}`);
```

**La canónica correcta se pone con JavaScript.** Pero el HTML crudo que recibe
Google dice, en las 14 páginas:

```html
<link rel="canonical" href="https://maxglobaloficial.com/" />
```

## Qué tan grave es

**Menos que lo de WhatsApp, pero es un riesgo real.**

Googlebot **sí** ejecuta JavaScript, así que en una segunda pasada verá la
canónica correcta. Pero esa segunda pasada puede tardar días o semanas, y la
propia documentación de Google recomienda que la canónica venga en el HTML
inicial. Cuando la del HTML y la del render se contradicen, el comportamiento
no es predecible.

**Traducido:** las 14 páginas de producto pueden tardar mucho en indexarse, o
Google puede tratarlas como copias de la portada durante ese tiempo.

**Y el título y la descripción tienen el mismo problema** — también se ponen
desde React.

---

# 3 · LA SOLUCIÓN — prerenderizado

## La idea

**Generar un HTML de verdad por cada ruta, al compilar.**

```
   ANTES                          DESPUÉS
   dist/index.html                dist/index.html
                                  dist/productos/index.html
                                  dist/productos/cafe-moringa/index.html
                                  dist/productos/colageno-hidrolizado/index.html
                                  dist/packs-de-afiliacion/index.html
                                  ... 14 en total
```

Cada uno con **sus propias** etiquetas `og:`, su canónica, su título y su
descripción **escritos en el HTML**, no puestos por JavaScript.

## Lo importante

**No hay que reescribir el sitio.** React sigue siendo React, y sigue
funcionando igual al navegar. Lo único que cambia es que el primer HTML que
llega ya viene con los datos correctos.

**Es un script que corre después de `npm run build`.** No toca ni una línea de
las páginas.

## Qué debe generar cada página de producto

```html
<title>Coffee Capuccino — Café con moringa y ganoderma | Max Global</title>
<meta name="description" content="Café capuccino instantáneo con moringa y ganoderma. Caja 20 sobres de 18 g. S/. 150." />
<link rel="canonical" href="https://maxglobaloficial.com/productos/cafe-moringa" />

<meta property="og:type"        content="product" />
<meta property="og:url"         content="https://maxglobaloficial.com/productos/cafe-moringa" />
<meta property="og:title"       content="Coffee Capuccino — S/. 150" />
<meta property="og:description" content="Café capuccino instantáneo con moringa y ganoderma. Caja 20 sobres de 18 g." />
<meta property="og:image"       content="https://maxglobaloficial.com/images/og/cafe-moringa.jpg" />
```

**Todo generado desde `config.js`.** Si mañana entra un producto nuevo, su HTML
aparece solo.

## Y hacen falta las imágenes de vista previa

Las fotos de producto son **`.webp` con fondo transparente**. Para WhatsApp eso
no sirve:

```
   ❌ WebP        WhatsApp no lo muestra de forma confiable
   ❌ Transparente   se ve el fondo negro en el modo oscuro
   ❌ Cuadradas   la tarjeta es 1200×630, apaisada
```

**Hay que generar una imagen 1200×630 en JPG por producto**, con la foto
centrada sobre fondo claro. Es un script, no diseño a mano.

> **📌 Esto lo decides tú, Jack.** Son tus fotos y quedamos en que no las toco
> sin preguntar. La propuesta es **no modificar el original** — se genera una
> copia aparte en `public/images/og/`, solo para las vistas previas.

---

# 4 · EL DOMINIO

## El problema hoy

**`maxglobaloficial.com` está escrito a mano en 26 lugares.**

| Archivo | Veces |
|---|---|
| `public/sitemap.xml` | 14 |
| `index.html` | 7 |
| `src/App.jsx` | 3 |
| `public/robots.txt` | 1 |
| `src/config.js` | 1 *(el correo)* |
| Pruebas | 9 más |

**Si el dominio final es otro, hay que corregir 26 sitios sin olvidar ninguno.**
Y olvidar uno significa una canónica apuntando a un dominio que no existe.

## La solución

**Una variable, y todo sale de ahí.**

```
   .env
   VITE_SITE_URL=https://maxglobaloficial.com
```

```js
   // config.js
   export const SITE_URL = import.meta.env.VITE_SITE_URL;
```

Y el `sitemap.xml` **se genera al compilar** desde `config.js`, en vez de
mantenerse a mano. Hoy si agregas un producto tienes que acordarte de editar el
sitemap; eso siempre se olvida.

---

# 5 · LO QUE TIENES QUE DECIDIR TÚ

*Nada de esto lo puedo resolver yo, y todo tiene que estar antes de compilar.*

## 1 · ¿El dominio está comprado?

**Todo el sitio asume `maxglobaloficial.com` y nadie ha confirmado que esté
disponible.** Si está tomado y hay que usar otro, mejor saberlo ahora que
después de publicar.

> **Compruébalo antes de nada.** Si cambia el dominio después de que Google
> indexe, se pierde el posicionamiento ganado y hay que montar redirecciones.

## 2 · ¿Con `www` o sin `www`?

```
   https://maxglobaloficial.com          ← recomiendo esta
   https://www.maxglobaloficial.com
```

**Da igual cuál, pero hay que elegir una y que la otra redirija.** Si las dos
responden, Google ve dos sitios idénticos.

Recomiendo la corta: se escribe más rápido y se ve mejor en una tarjeta de
WhatsApp.

## 3 · ¿Dónde se aloja?

Cambia lo que hay que configurar:

| Hosting | Qué hace falta |
|---|---|
| **Netlify o Vercel** | Ya está resuelto — `_redirects` y `vercel.json` |
| **Hosting compartido con cPanel** | El `.htaccess`, que ya está |

## 4 · El correo

`config.js` dice `contacto@maxglobaloficial.com`. **¿Ese buzón va a existir?**
Un correo publicado que rebota es peor que no poner ninguno.

---

# 6 · EL ORDEN

```
   1º   Confirmar el dominio             ← tú. Bloquea todo lo demás
   2º   Variable única VITE_SITE_URL     ← programación, chico
   3º   Prerenderizado de las 14 rutas   ← programación, el grueso
   4º   Imágenes 1200×630 por producto   ← script, con tu visto bueno
   5º   Sitemap generado, no a mano
   6º   npm run build
   7º   Desplegar
   8º   Probar cada enlace en WhatsApp de verdad
   9º   Google Search Console + sitemap
```

**Del 2 al 5 es una sola tarea de Antigravity.** Es la `TAREA-08`.

---

# 7 · CÓMO SE COMPRUEBA QUE QUEDÓ BIEN

**No basta con que compile.** Estas son las pruebas reales:

## La prueba del robot

```bash
# lo que ve WhatsApp: HTML crudo, sin JavaScript
curl -s https://maxglobaloficial.com/productos/cafe-moringa | grep 'og:title'

# tiene que decir "Coffee Capuccino", NO "Max Global Corporation"
```

## Las herramientas oficiales

```
   Facebook Sharing Debugger    developers.facebook.com/tools/debug/
   Google Rich Results Test     search.google.com/test/rich-results
```

**El Sharing Debugger también sirve para limpiar la caché.** WhatsApp guarda la
tarjeta de un enlace por mucho tiempo; si lo compartes con la versión mala, se
te queda pegada.

> **Por eso conviene probar antes de mandarle el enlace a nadie.** El primer
> enlace que Máximo mande al grupo de socios es el que va a quedar cacheado.

## Y la prueba definitiva

**Mandarte el enlace de un producto a ti mismo por WhatsApp, en el celular.**

Si sale la foto del café con su nombre, funcionó.

---

# 8 · LO QUE NO CAMBIA

```
   ✅ El diseño                      no se toca
   ✅ Los precios y textos           no se tocan
   ✅ Las fotos originales           no se tocan
   ✅ El carrito y el ?ref=          siguen igual
   ✅ Sigue siendo Vite + React      no migramos a Next.js
```

**Es una capa de compilación, no una reconstrucción.**
