/**
 * Capa intermedia de acceso a datos de productos y packs.
 * Todas las páginas leen de aquí, centralizando la lectura y preparando
 * el terreno para la futura integración con Supabase en la Fase 2.
 */
import PRODUCTOS from './productos-generado.json';
import { PACKS, precioSocio } from '../config';

export const getProductos = () => PRODUCTOS.filter((p) => p.activo !== false);

export const getProducto = (id) =>
  PRODUCTOS.find((p) => p.id === id && p.activo !== false) || null;

export const getProductosRelacionados = (currentId, limit = 3) => {
  const current = getProducto(currentId);
  const allActive = getProductos().filter((p) => p.id !== currentId);
  if (!current) return allActive.slice(0, limit);

  const sameCategory = allActive.filter((p) => p.categoria === current.categoria);
  const otherCategory = allActive.filter((p) => p.categoria !== current.categoria);

  return [...sameCategory, ...otherCategory].slice(0, limit);
};

export const getPacks = () => PACKS.filter((p) => p.activo !== false);

export const getPack = (id) => PACKS.find((p) => p.id === id);

// El mejor descuento vigente sale dinámicamente de los packs
export const mejorDescuento = () =>
  Math.max(...getPacks().map((p) => p.descuentoRecompra || 0));

/**
 * Calcula el valor comercial en producto de un pack según su precio y descuentoEnPack.
 * Regla de negocio:
 *   · si descuentoEnPack es null o 0  →  devuelve null (ej. Kit Emprendedor)
 *   · si no  →  precio / (1 − descuentoEnPack/100), redondeado al sol entero
 */
export const valorEnProducto = (pack) => {
  const p = typeof pack === 'string' ? getPack(pack) : pack;
  if (!p || p.descuentoEnPack == null || p.descuentoEnPack === 0) {
    return null;
  }
  return Math.round(p.precio / (1 - p.descuentoEnPack / 100));
};

export { precioSocio };
