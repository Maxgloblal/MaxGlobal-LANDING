# 📋 INFORME TÉCNICO · TAREA 03: CARRITO Y PRECIOS DE SOCIO

**Código de Informe:** `INF-2026-08-27-03`  
**Fecha:** 27 de agosto de 2026  
**Área:** Arquitectura de Precios, Carrito de Compras en Memoria & WhatsApp Workflow  
**Estado:** ✅ Concluido y Verificado al 100%  

---

## 1. Protocolo de Integridad y Versionado

* **Git Initialized:** Repositorio Git inicializado con commit base `estado funcional antes de tarea 03`.
* **Script de Integridad:** `scripts/verify-integrity.js` auditó automáticamente:
  * **0 bytes nulos** en todos los archivos de `src/`.
  * **Compilación sintáctica con `esbuild`** superada sin errores.
* **Commits Registrados:**
  1. `2095d09`: `estado funcional antes de tarea 03`
  2. `7672452`: `bloque a: precio desde dinamico en tarjeta de producto`
  3. `added0c`: `bloque b y c: carrito en memoria, persistencia en sessionStorage y pedido whatsapp con puntos y codigo de socio`

---

## 2. Resumen de Bloques Ejecutados

```
┌───────────────────────────────────────────────────────────────────────────┐
│ 0º Control Git e Integridad de Código                            ✅ LISTO │
│ 1º BLOQUE A · Precio "Desde" en Tarjeta (Dinámico sin 50% fijo)  ✅ LISTO │
│ 2º BLOQUE B · Carrito en Navegador (Contexto + sessionStorage)   ✅ LISTO │
│ 3º BLOQUE C · Mensaje de WhatsApp estructurado y puntos          ✅ LISTO │
│ 4º Verificación final de tests y build de producción             ✅ LISTO │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Detalle de Implementación

### 🏷️ Bloque A · Corrección del Precio en Tarjetas
* **`src/data/catalogo.js`:** Implementación de `mejorDescuento = () => Math.max(...getPacks().map(p => p.descuentoRecompra || 0))`.
* **`src/components/ProductCard.jsx`:**
  * Eliminado el texto fijo "Precio Socio (50%)".
  * Reemplazado por: **"Los socios pagan desde: S/. {partnerPriceFrom}"**.
  * Cumplimiento estricto de la Ley 29571 (protección al consumidor frente a precios inexactos).

### 🛒 Bloque B · Carrito en el Navegador
* **`src/context/CartContext.jsx`:**
  * Estado global sin backend, base de datos ni login.
  * Persistencia reactiva en `sessionStorage` (`'mg_cart'`) para resistir la navegación entre páginas.
  * Se vacía automáticamente al cerrar la pestaña.
  * Mantiene `totalPublico` (a precio público) y `totalPuntos` acumulados.
* **`src/components/CartFab.jsx`:**
  * Botón flotante en esquina inferior derecha (`bottom: 90px, right: 24px`), colocado ergonómicamente sobre el botón de WhatsApp (`bottom: 24px, right: 24px`) sin solapamiento en móvil ni PC.
  * Contador numérico reactivo.
* **`src/components/CartDrawer.jsx`:**
  * Panel lateral slide-over responsive.
  * Controles de cantidad (`−`, `+`, eliminar).
  * Vaciado total de pedido.
  * Aviso legal obligatorio visible.
* **`src/components/ProductCard.jsx`:**
  * Botón "Agregar al pedido".
  * Si el producto ya está en el carrito, se transforma en selector dinámico con `−`, `+` y el conteo de unidades agregadas.

### 📱 Bloque C · Mensaje Estructurado de WhatsApp
* **Formato exacto generado:**
  ```
  Hola, quiero hacer este pedido:

  • 2× Café con Moringa ..... S/. 300
  • 1× Colágeno Hidrolizado ..... S/. 150

  Total a precio público: S/. 450
  Puntos: 54

  Mi código de socio: MG-00417
  ```
* **Características obligatorias:**
  1. Denominación literal: *"Total a precio público"*.
  2. Campo "Mi código de socio" precargado desde `?ref=` y editable.
  3. Desglose de puntos para calificación de activación mensual (70 pts).
  4. Aviso legal fijo visible bajo el carrito.

---

## 4. Matriz de Validación y Pruebas

| Suite de Pruebas | Casos Ejecutados | Resultado |
|---|---|---|
| **Integridad de Código** | 0 bytes nulos + esbuild bundle | 🟢 Aprobado |
| **Vitest Unit Tests** | 35 pruebas unitarias | 🟢 35 / 35 Pasadas (100%) |
| **Playwright E2E Tests** | 40 pruebas de integración (Desktop + Mobile) | 🟢 40 / 40 Pasadas (100%) |
| **Vite Production Build** | Compilación de bundle de producción | 🟢 Exitoso en 3.02s |
