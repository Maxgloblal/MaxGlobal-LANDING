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

export { precioSocio };
