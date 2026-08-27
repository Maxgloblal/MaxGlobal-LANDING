/**
 * Capa intermedia de acceso a datos de productos y packs.
 * Todas las páginas leen de aquí, centralizando la lectura y preparando
 * el terreno para la futura integración con Supabase en la Fase 2.
 */
import { PRODUCTOS, PACKS, precioSocio } from '../config';

export const getProductos = () => PRODUCTOS.filter((p) => p.activo !== false);

export const getPacks = () => PACKS.filter((p) => p.activo !== false);

export const getPack = (id) => PACKS.find((p) => p.id === id);

// El mejor descuento vigente sale dinámicamente de los packs
export const mejorDescuento = () =>
  Math.max(...getPacks().map((p) => p.descuentoRecompra || 0));

export { precioSocio };
