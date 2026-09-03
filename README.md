# SITIO WEB — Landing Pública Max Global Corporation

**Stack:** React 18 + Vite + Tailwind CSS + React Router
**Estado:** 14 páginas terminadas · falta prerenderizar y desplegar ⬜

---

## ARRANQUE RÁPIDO

```bash
npm install
npm run dev          # http://localhost:5173
npx vitest run       # pruebas
npm run build        # build (cuando esté el prerender: ver TAREA-08)
```

---

## RUTAS

```
/                           Portada
/productos                  Catálogo (8 productos)
/productos/:id              Detalle de producto
/packs-de-afiliacion        Los 5 packs con precios
/nosotros                   Quiénes somos
/registro                   Formulario de pre-registro (?ref=CODIGO)
/confirmacion               Post-registro
/terminos-y-condiciones     Legal
/politica-de-privacidad     Legal
/libro-de-reclamaciones     Legal
```

---

## ESTRUCTURA

```
src/
├── pages/            ← una por ruta
├── components/       ← Header, Footer, Carrito, ProductoCard...
├── context/          ← CarritoContext, RefContext
├── data/             ← productos.js · packs.js · config.js
└── styles/           ← CSS global

public/
├── images/           ← fotos de productos y packs
├── fonts/            ← tipografías
└── brand/            ← logos SVG

scripts/
└── prerender.mjs     ← PENDIENTE (TAREA-08)

vercel.json           ← configuración Vercel · SPA routing ✅
_redirects            ← para Netlify · REMOVER antes de desplegar
```

---

## PENDIENTE — TAREA-08

Falta prerenderizar las rutas para que WhatsApp muestre la imagen y título
correctos al compartir un enlace de producto.

Ver instrucción completa: `00-INSTRUCCIONES/TAREA-08-PRERENDER-Y-DESPLIEGUE.md`

**Importante:** Jack desplegará en Vercel (no Netlify).
- `vercel.json` ya existe y está correcto.
- Remover `_redirects` antes de desplegar.

---

## FLUJO DE REFERIDO

```
Socio comparte: maxglobaloficial.com/registro?ref=CODIGO
Visitante llena formulario → submit abre WhatsApp con los datos
El admin registra en el sistema backoffice
(no hay POST a Supabase desde la landing)
```

---

Para documentación completa: ver `../GUIA-CLAUDE/04-LANDING.md`
