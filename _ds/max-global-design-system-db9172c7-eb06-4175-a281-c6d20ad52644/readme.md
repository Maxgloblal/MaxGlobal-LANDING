# Max Global — Design System

Sistema de diseño de **Max Global Corporation**, empresa peruana de venta directa de productos naturales de salud y cosmética: moringa, café, colágeno y aceites. La venta no ocurre en tiendas: pasa por una red de socios distribuidores que compran a precio de socio, revenden y cobran comisión. Ese modelo condiciona todo el sistema — hay dos públicos y dos superficies:

| Superficie | Para quién | Qué tiene que lograr |
|---|---|---|
| **Web pública** (`ui_kits/web/`) | Consumidor final y aspirante a socio | Explicar los productos, dar confianza sanitaria y captar socios |
| **Panel de socios** (`ui_kits/panel/`) | Socio distribuidor activo | Registrar pedidos, seguir comisiones y acompañar a su red |

## Fuentes recibidas

Todo lo que hay aquí se construyó a partir de estos materiales entregados por el usuario. No hubo repositorio de código, archivo de Figma, capturas del producto real ni deck.

- Paleta: Dorado `#D1AD68` (principal), Verde `#1BA741` (secundario), Blanco `#FFFFFF` (fondo).
- Tipografías, archivos `.ttf` originales: **Agus Sans** (títulos, un solo peso y **solo mayúsculas** — ver Visual foundations) y **Caviar Dreams** (cuerpo y subtítulos: Regular, Bold, Italic, Bold Italic). Copiados a `assets/fonts/`.
- Logotipos, PNG originales: horizontal en color, en negro y en blanco; isotipo en color. Copiados a `assets/logos/`.
- Contexto de negocio, tono y carácter visual: respondidos por el usuario en formulario (dorado sobre blanco con el verde como acento; trato de "tú"; sin modo oscuro).

Lo que **no** existe todavía y está marcado como reserva en los kits: fotografía de producto y de marca, plan de compensación real, set de iconos propio, y cualquier dato de negocio (los números que se ven son ejemplos verosímiles, no cifras de la empresa).

---

## Content fundamentals

**Trato.** Segunda persona del singular, siempre. "Déjanos tus datos y te llamamos", "Tienes hasta el 31 para registrar pedidos". La empresa habla en primera del plural cuando se compromete a algo ("te avisamos cuando salga de almacén"), nunca para presumir. No se usa "usted" ni en el panel ni en la web.

**Español de Perú, neutro pero local.** "Celular" no "móvil", "recojo en almacén" no "recogida", "S/" antes del importe con espacio (`S/ 89.00`), departamentos por su nombre (Lima, La Libertad, Piura). Fechas en formato corto y minúscula: `28 ago`, `16–31 ago`.

**Frases cortas, verbo primero.** Los botones son acciones en primera persona del deseo o imperativas: "Quiero ser socio", "Confirmar pedido", "Ver catálogo", "Enviar mis datos". Nunca "Enviar" a secas ni "Click aquí". Máximo cuatro palabras.

**Titulares con una idea y algo de calle.** Van en Agus Sans, sin punto final, y suenan a persona: "Lo natural llega mejor de mano de alguien", "Tres pasos para empezar", "Tu negocio, tus números, en un solo lugar". Se evita el lenguaje de folleto de suplementos ("potencia tu bienestar", "desbloquea tu mejor versión") y toda promesa médica.

**Honestidad sanitaria por delante.** Cuando se habla de producto se nombra lo verificable: registro sanitario, lote, presentación, origen de la materia prima. Nunca se afirma que el producto cura, previene o reemplaza un tratamiento.

**Casing.** El texto se **escribe** siempre en frase capital ("Nuevo pedido", no "Nuevo Pedido"); la caja alta la aplica el CSS, no el redactor. Van en MAYÚSCULAS por `text-transform`: todos los titulares en Agus Sans (es una fuente solo-mayúsculas, ver más abajo), los antetítulos dorados (`.mg-eyebrow`, tracking `0.16em`) y las etiquetas de estado (`Badge`, 11px). Todo lo demás queda en caja mixta.

**Titulares cortos.** Como los titulares se renderizan en caja alta, no pasan de seis palabras ni de tres líneas. Un texto largo (una cita, un párrafo destacado) no puede ir en Agus Sans: se pone en Caviar Dreams.

**Metadatos, en frío.** Ayudas y captions describen el hecho, no lo adornan: "Lo usamos para tus pedidos", "vs. julio", "Lima, 24–48 h".

**Errores: qué pasó y qué hacer.** "No pudimos cobrar — revisa los datos de tu tarjeta". Nunca "¡Ups!", nunca culpar al usuario, nunca códigos técnicos en la cara.

**Emoji: no.** Ni en la web, ni en el panel, ni en los avisos. Los glifos de Lucide cubren ese trabajo. Los únicos caracteres unicode admitidos como signo son `·` (separador de metadatos), `×` (cerrar y cantidad: `3×`), `↑ ↓` (variación en `StatCard`), `«»` (citas de testimonio) y `–` (rangos de fecha).

---

## Visual foundations

**Reparto del color: 70 / 22 / 8.** El blanco (y los neutros cálidos) es el lienzo y ocupa la mayor parte de cualquier vista. El dorado `#D1AD68` es el color de la acción y del acento: botones principales, antetítulos, subrayado de pestaña activa, fila activa del menú, números de paso. El verde `#1BA741` puntúa: confirma (checkbox marcado, switch activo, botón de confirmar), señala lo natural y marca lo positivo (variación al alza, estado "Enviado"). El verde nunca es fondo de una sección completa, y nunca hay dos botones dorados juntos.

**Neutros cálidos, jamás azulados.** La escala de grises se inclina al crema (`#FAFAF8 → #1C1B19`). El "negro" de la marca es `#1C1B19`, no `#000`. Cualquier gris frío rompe la temperatura del dorado.

**Tipografía en tres voces.**

1. **Agus Sans — solo MAYÚSCULAS.** El archivo entregado es una fuente de caja alta: sus casillas minúsculas contienen glifos alternos (la "a" dibuja Λ, la "r" dibuja Γ), así que **todo texto en `--font-display` lleva `text-transform: uppercase`** — sin excepción. Un solo peso, tracking positivo `0.02em` (la caja alta necesita aire, no el tracking negativo habitual), interlineado apretado (1.06 en el hero, 1.2 en secciones). Se usa en titulares de 31px o más, en cifras y en precios. Máximo seis palabras.
2. **Caviar Dreams Bold (`--font-subtitle`) — títulos en caja mixta.** Todo lo que sea título pero no pueda ir en caja alta: nombre de producto, título de diálogo, cabecera del panel, títulos de tarjeta, `h3`/`h4`, citas largas. Tracking 0.
3. **Caviar Dreams Regular — cuerpo.** Geométrica y redonda, interlineado generoso (1.7 en párrafos de la web, 1.5 en interfaz).

El orden del par se repite siempre: antetítulo dorado en mayúsculas → titular en Agus Sans mayúsculas → entradilla en Caviar Dreams. Escala 1.25, de 76px a 11px.

**Fondos.** El fondo por defecto es blanco plano. Se permite exactamente un degradado en todo el sistema: el vertical crema→blanco del hero (`--gold-50` a `--n-0`). Las secciones se separan alternando blanco y `--surface-sunken` (`#FAFAF8`). Hay dos bloques a sangre en negro cálido (`--surface-inverse`) por pieza como máximo: testimonio y pie. No hay texturas, ni patrones repetidos, ni ilustraciones dibujadas, ni grano. Cuando falta fotografía se deja un marco `--surface-gold` con una nota en mayúsculas pequeñas; no se inventan imágenes.

**Imagen de marca (cuando llegue).** Cálida, luz natural de día, producto sobre superficies claras, piel real y manos visibles — el modelo es persona a persona. Nada de blanco y negro, nada de fondos negros de estudio, nada de saturación de suplemento deportivo.

**Radios.** Tarjetas y marcos de imagen 16px; diálogos 24px; campos de formulario 10px; casillas 4px; botones, badges, tags y avatares en pill/círculo. El contraste entre el campo (10px) y el botón (pill) es deliberado y no se debe uniformar.

**Bordes.** Un hairline de 1px en `--border-subtle` (`#E4E2DB`) delimita casi todo. El borde de 2px solo aparece como subrayado de pestaña activa, en dorado. Las tarjetas nunca llevan borde de un solo lado en color — ese patrón está prohibido.

**Sombras: cálidas y difusas.** Basadas en `rgba(28,27,25,·)`, nunca en negro puro ni en azul. Cuatro niveles neutros (`xs` para tarjetas en reposo, `sm` por defecto, `md` en hover y modales, `lg` en diálogos) y dos tintadas (`--shadow-gold`, `--shadow-green`) reservadas al hover de un botón sólido. No hay sombras internas decorativas; el único inset es el hairline (`--shadow-inset-hair`).

**Hover.** Los sólidos **oscurecen** un paso (dorado 400→500, verde 400→500) y ganan su sombra tintada; nunca se aclaran ni cambian de opacidad. Los `outline` se rellenan con su tinte suave (`--surface-gold`) y el borde sube a `--gold-400`. Los `ghost` toman `--surface-muted`. Las tarjetas interactivas suben 2px (`--lift-hover`), pasan a `--shadow-md` y su borde se vuelve dorado.

**Press.** Escala a `.985` (`--press-scale`). Sin cambio de color adicional, sin hundimiento con inset.

**Foco.** Anillo de 3px verde translúcido (`--ring-focus`) por defecto; `--ring-focus-gold` solo cuando el elemento enfocado ya es verde. Nunca `outline: none` sin sustituto.

**Movimiento.** Discreto y corto: 80ms para color de un glifo, 140ms para controles, 220ms para superficies, 360ms para barras de avance, 600ms para entradas al hacer scroll. Una sola curva, `cubic-bezier(.2,0,.2,1)`. **Sin rebotes, sin muelles, sin rotaciones.** Se respeta `prefers-reduced-motion` anulando todas las duraciones.

**Transparencia y desenfoque.** Dos usos, ni uno más: la cabecera fija de la web (`--glass-bg` blanco al 82% + `blur(12px)`) y el velo del modal (`rgba(28,27,25,.42)` + el mismo blur). No hay tarjetas de vidrio ni paneles translúcidos.

**Degradados de protección.** Cuando haya texto sobre fotografía se usa `--scrim-dark` (transparente→negro cálido al 72%, de arriba abajo) para pie de imagen, o una cápsula sólida (`Badge`) si el texto es corto. No se aclara la foto con un velo blanco.

**Layout.** Contenedor de 1200px máximo, con 48px de aire lateral en escritorio y 20px en móvil. Rejilla base de 4px; medianil de 24px. Ritmo vertical de sección: 64px (compacta), 96px (por defecto), 128px (respiro). El único elemento fijo de la web es la cabecera (76px); en el panel son fijos el menú lateral (248px) y la cabecera (68px), y el resumen del pedido queda *sticky*. Los párrafos no pasan de 46–56 caracteres de ancho.

**Alturas de control.** 34 / 44 / 54px. El objetivo táctil nunca baja de 44px.

---

## Iconography

**Set:** [Lucide](https://lucide.dev), cargado desde CDN (`https://unpkg.com/lucide@0.460.0/dist/umd/lucide.js`) y envuelto en el componente `Icon`.

**Esto es una sustitución y hay que confirmarla.** La marca no entregó set de iconos propio, ni fuente de iconos, ni SVGs. Lucide se eligió porque su trazo geométrico y sus extremos redondeados acompañan la redondez de Caviar Dreams y del isotipo MG. Si Max Global tiene un set propio, hay que reemplazarlo.

**Reglas de uso.**
- Trazo `1.75`, extremos y uniones redondeados. No se mezclan iconos rellenos con los de trazo.
- Tamaños: 16px dentro de una línea de texto o campo, 18–20px en controles y menús, 22–24px en tarjetas de beneficio dentro de un círculo `--surface-gold` de 44px.
- Color: heredan `currentColor`. En bloques de beneficio van dorados (`--gold-600`); en el menú y la cabecera toman el color del texto; en `StatCard` van en `--brand-gold`.
- Nunca se usa un icono como decoración suelta ni se rellena con degradado.
- **Emoji jamás.** Los caracteres unicode admitidos como signo están listados en Content fundamentals.
- El isotipo MG (`assets/logos/maxglobal-isotipo-color.png`) es lo único que hace de "icono de marca": favicon, avatar de la empresa, sello. No se redibuja ni se recorta.
- No se dibujan SVGs a mano para sustituir un icono que falte; si Lucide no lo tiene, se busca otra metáfora que sí exista.

**Glifos que ya usa el sistema:** `home`, `package`, `plus-circle`, `users`, `user-plus`, `wallet`, `banknote`, `share-2`, `trending-up`, `search`, `bell`, `mail`, `lock`, `hash`, `user`, `menu`, `heart`, `send`, `arrow-right`, `check`, `badge-check`, `leaf`, `truck`, `info`.

---

## Índice

### Raíz
| Archivo | Qué es |
|---|---|
| `styles.css` | **Punto de entrada.** Solo `@import`s; es el único archivo que enlaza un consumidor |
| `readme.md` | Este documento |
| `SKILL.md` | Cabecera para usar este sistema como Agent Skill |
| `thumbnail.html` | Mosaico de marca del sistema |

### `tokens/`
`fonts.css` (`@font-face` de Agus Sans y Caviar Dreams) · `colors.css` (escalas dorado/verde/neutros, semánticos, alias de superficie, texto y borde) · `typography.css` (familias, escala 1.25, interlineados, tracking, roles) · `spacing.css` (escala de 4px, contenedor, ritmo de sección, alturas de control) · `elevation.css` (radios, bordes, sombras, anillos de foco, velos, vidrio) · `motion.css` (duraciones, curvas, transiciones, lift y press) · `base.css` (reset mínimo, encabezados, enlaces, `.mg-eyebrow`, `.mg-container`).

### `components/`
| Grupo | Componentes |
|---|---|
| `core/` | **Button**, **IconButton**, **Icon**, **Badge**, **Tag**, **Card**, **Avatar** |
| `forms/` | **Input**, **Textarea**, **Select**, **Checkbox**, **Radio**, **Switch** |
| `navigation/` | **Tabs**, **SidebarNav**, **Breadcrumb** |
| `feedback/` | **Dialog**, **Toast**, **Tooltip**, **ProgressBar** |
| `data/` | **StatCard**, **DataTable** |
| `commerce/` | **ProductCard**, **PackCard**, **PointsBadge**, **WhatsAppButton** |
| `brand/` | **Logo** |

Cada componente lleva su `.d.ts` (contrato de props) y su `.prompt.md` (cuándo usarlo, ejemplo y variantes). Cada carpeta tiene una tarjeta `*.card.html` con sus estados.

**Adiciones intencionales.** La marca solo entregó color, tipografía y logo — no había inventario de componentes que copiar, así que el set es el estándar mínimo para las dos superficies pedidas. Estas piezas se añadieron por necesidad concreta: `Icon` (envoltorio de Lucide, porque no hay set propio), `Logo` (para que nadie reconstruya la marca a mano), `ProductCard`, `StatCard`, `DataTable`, `SidebarNav` y `ProgressBar` (el catálogo y el panel de socios no se pueden armar sin ellos), y `WhatsAppButton`, `PackCard` y `PointsBadge` (ver la advertencia de abajo).

> **Atención — tres componentes sin brief verificado.** `WhatsAppButton`, `PackCard` y `PointsBadge` se escribieron a partir de un brief que ya no consta en el proyecto: no hay archivo fuente que respalde sus valores (packs, puntos de rango, cierre por WhatsApp). Sus contratos de props son sólidos, pero **los ejemplos de sus `.prompt.md` contienen datos sin confirmar** (nombres de pack, precios, "Café de Moringa", códigos de referido). Verifícalos contra el brief real antes de usarlos en producción, o bórralos. Si Max Global tiene ya un producto en código, este inventario debe revisarse contra él.

### `guidelines/`
23 tarjetas de fundamentos, agrupadas en la pestaña Design System como **Colors** (dorado, verde, neutros, semánticos, superficies, texto y enlaces), **Type** (Agus Sans, la regla de solo-mayúsculas, escala de titulares, subtítulos en Caviar Dreams Bold, Caviar Dreams, escala de cuerpo, antetítulo y pareja), **Spacing** (escala, ritmo de sección, alturas de control), **Effects** (radios, sombras, foco y presión, movimiento) y **Brand** (logotipo, aire y tamaño mínimo, reparto del color).

### `ui_kits/`
- `web/` — landing pública. Ver `ui_kits/web/README.md`.
- `panel/` — panel de socios. Ver `ui_kits/panel/README.md`.

### `assets/`
`logos/` — cuatro PNG originales: `maxglobal-horizontal-color.png`, `-negro`, `-blanco`, `maxglobal-isotipo-color.png`.
`fonts/` — `AgusSans-Regular.ttf`, `CaviarDreams.ttf`, `CaviarDreams_Bold.ttf`, `CaviarDreams_Italic.ttf`, `CaviarDreams_BoldItalic.ttf`.

No hay fotografía ni ilustración: no se entregó ninguna y no se generó nada.
