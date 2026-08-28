import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, X, SlidersHorizontal, PackageSearch } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getProductos } from '../data/catalogo';

// Normaliza texto eliminando acentos/diacríticos y pasando a minúsculas
const normalizar = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export default function Productos() {
  const [searchParams, setSearchParams] = useSearchParams();
  const allProducts = getProductos();

  const searchTerm = searchParams.get('buscar') || '';
  const selectedCategory = searchParams.get('categoria') || '';
  const sortBy = searchParams.get('orden') || 'nombre';

  // Categorías dinámicas extraídas del catálogo
  const categories = [...new Set(allProducts.map((p) => p.categoria).filter(Boolean))];

  const updateFilters = (updates) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, val]) => {
      if (val) {
        next.set(key, val);
      } else {
        next.delete(key);
      }
    });
    setSearchParams(next, { replace: true });
  };

  const handleClearFilters = () => {
    const next = new URLSearchParams(searchParams);
    next.delete('buscar');
    next.delete('categoria');
    setSearchParams(next, { replace: true });
  };

  // Filtrado en memoria
  const filtered = allProducts.filter((prod) => {
    if (selectedCategory && prod.categoria !== selectedCategory) {
      return false;
    }
    if (searchTerm.trim()) {
      const term = normalizar(searchTerm.trim());
      const nameNorm = normalizar(prod.nombre);
      const descNorm = normalizar(prod.descripcion);
      const catNorm = normalizar(prod.categoria);
      return nameNorm.includes(term) || descNorm.includes(term) || catNorm.includes(term);
    }
    return true;
  });

  // Ordenamiento
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'precio-asc') return a.precioPublico - b.precioPublico;
    if (sortBy === 'precio-desc') return b.precioPublico - a.precioPublico;
    if (sortBy === 'puntos-desc') return (b.puntos || 0) - (a.puntos || 0);
    return a.nombre.localeCompare(b.nombre, 'es');
  });

  const isFiltered = Boolean(searchTerm.trim() || selectedCategory);

  return (
    <div style={{ backgroundColor: 'var(--surface-page)', minHeight: '85vh' }}>
      {/* 1. Hero Section */}
      <section
        style={{
          position: 'relative',
          background: 'linear-gradient(180deg, var(--gold-50) 0%, var(--surface-page) 100%)',
          padding: 'var(--section-y-loose) 0 var(--sp-6)',
          overflow: 'hidden',
        }}
      >
        {/* Glow de fondo */}
        <div
          className="mg-bg-aurora mg-glow-gold"
          style={{ top: '-40px', right: '-40px', width: '280px', height: '280px' }}
        />

        <div className="mg-container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-2)' }}>
            <div className="mg-ribbon-gold" />
            <span className="mg-eyebrow">Catálogo</span>
          </div>
          <h1 style={{ marginTop: 'var(--sp-3)', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}>
            Nuestros productos
          </h1>
          <p
            style={{
              marginTop: 'var(--sp-4)',
              maxWidth: '56ch',
              fontSize: 'var(--fs-md)',
              lineHeight: 'var(--lh-relaxed)',
              color: 'var(--text-body)',
            }}
          >
            Productos naturales de consumo diario. Los precios que ves son los de venta al público.{' '}
            <span style={{ color: 'var(--text-strong)', fontWeight: 700 }}>
              Como socio, los compras con 50% de descuento.
            </span>
          </p>
        </div>
      </section>

      {/* 2. Barra de Filtros, Buscador y Categorías */}
      <section className="mg-catalog-filters-section" style={{ paddingBottom: 'var(--sp-8)' }}>
        <div className="mg-container">
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--r-card)',
              padding: 'var(--sp-5)',
              boxShadow: 'var(--shadow-xs)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--sp-4)',
            }}
          >
            {/* Fila Superior: Buscador + Selector de Orden */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--sp-4)',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {/* Buscador con Input */}
              <div
                style={{
                  position: 'relative',
                  flex: '1 1 280px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Search
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '14px',
                    color: 'var(--text-muted)',
                    pointerEvents: 'none',
                  }}
                />
                <input
                  type="text"
                  placeholder="Buscar por nombre o ingrediente..."
                  value={searchTerm}
                  onChange={(e) => updateFilters({ buscar: e.target.value })}
                  data-testid="input-buscar-productos"
                  style={{
                    width: '100%',
                    padding: '12px 38px 12px 42px',
                    borderRadius: 'var(--r-pill)',
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--surface-page)',
                    fontSize: 'var(--fs-sm)',
                    fontFamily: 'var(--font-body)',
                    color: 'var(--text-strong)',
                    outline: 'none',
                    transition: 'border-color var(--dur-fast) var(--ease-out)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--brand-gold)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  }}
                />
                {searchTerm && (
                  <button
                    onClick={() => updateFilters({ buscar: '' })}
                    data-testid="btn-limpiar-busqueda"
                    aria-label="Limpiar búsqueda"
                    style={{
                      position: 'absolute',
                      right: '12px',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '4px',
                    }}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Selector de Orden */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  flex: '0 0 auto',
                }}
              >
                <SlidersHorizontal size={16} color="var(--text-muted)" />
                <label
                  htmlFor="select-orden"
                  style={{
                    fontSize: 'var(--fs-xs)',
                    color: 'var(--text-muted)',
                    fontWeight: 600,
                  }}
                >
                  Ordenar por:
                </label>
                <select
                  id="select-orden"
                  value={sortBy}
                  onChange={(e) => updateFilters({ orden: e.target.value })}
                  data-testid="select-orden-productos"
                  style={{
                    padding: '10px 14px',
                    borderRadius: 'var(--r-sm)',
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--surface-page)',
                    fontSize: 'var(--fs-sm)',
                    fontFamily: 'var(--font-body)',
                    color: 'var(--text-strong)',
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                >
                  <option value="nombre">Nombre (A-Z)</option>
                  <option value="precio-asc">Precio: menor a mayor</option>
                  <option value="precio-desc">Precio: mayor a menor</option>
                  <option value="puntos-desc">Puntos: mayor a menor</option>
                </select>
              </div>
            </div>

            {/* Fila Inferior: Chips de Categorías (Scroll Horizontal en Móvil) */}
            <div
              className="mg-categories-scroll"
              style={{
                display: 'flex',
                gap: '8px',
                overflowX: 'auto',
                paddingBottom: '4px',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {/* Chip Todos */}
              <button
                onClick={() => updateFilters({ categoria: '' })}
                data-testid="chip-cat-todos"
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--r-pill)',
                  border: selectedCategory === '' ? '1px solid var(--brand-gold)' : '1px solid var(--border-subtle)',
                  backgroundColor: selectedCategory === '' ? 'var(--brand-gold)' : 'var(--surface-page)',
                  color: selectedCategory === '' ? 'var(--n-700)' : 'var(--text-body)',
                  fontFamily: 'var(--font-subtitle)',
                  fontWeight: 700,
                  fontSize: 'var(--fs-xs)',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'var(--t-control)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>Todos</span>
                <span
                  style={{
                    backgroundColor: selectedCategory === '' ? 'rgba(0,0,0,0.12)' : 'var(--border-subtle)',
                    padding: '2px 6px',
                    borderRadius: 'var(--r-pill)',
                    fontSize: '10px',
                  }}
                >
                  {allProducts.length}
                </span>
              </button>

              {/* Chips por Categoría */}
              {categories.map((cat) => {
                const count = allProducts.filter((p) => p.categoria === cat).length;
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => updateFilters({ categoria: isSelected ? '' : cat })}
                    data-testid={`chip-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 'var(--r-pill)',
                      border: isSelected ? '1px solid var(--brand-gold)' : '1px solid var(--border-subtle)',
                      backgroundColor: isSelected ? 'var(--brand-gold)' : 'var(--surface-page)',
                      color: isSelected ? 'var(--n-700)' : 'var(--text-body)',
                      fontFamily: 'var(--font-subtitle)',
                      fontWeight: 700,
                      fontSize: 'var(--fs-xs)',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      transition: 'var(--t-control)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>{cat}</span>
                    <span
                      style={{
                        backgroundColor: isSelected ? 'rgba(0,0,0,0.12)' : 'var(--border-subtle)',
                        padding: '2px 6px',
                        borderRadius: 'var(--r-pill)',
                        fontSize: '10px',
                      }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Contador de Resultados */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: 'var(--fs-xs)',
                color: 'var(--text-muted)',
                paddingTop: 'var(--sp-2)',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              <span data-testid="catalog-count">
                {isFiltered
                  ? `${sorted.length} de ${allProducts.length} productos`
                  : `${allProducts.length} productos`}
              </span>
              {isFiltered && (
                <button
                  onClick={handleClearFilters}
                  data-testid="btn-reset-filtros"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--brand-gold-dark, var(--gold-700))',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: 'var(--fs-xs)',
                    textDecoration: 'underline',
                  }}
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Grid de Productos o Estado Vacío */}
      <section style={{ paddingBottom: 'var(--section-y)' }}>
        <div className="mg-container">
          {sorted.length > 0 ? (
            <div
              data-testid="catalog-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: 'var(--sp-6)',
              }}
            >
              {sorted.map((prod) => (
                <ProductCard
                  key={prod.id}
                  id={prod.id}
                  name={prod.nombre}
                  description={prod.descripcion}
                  price={prod.precioPublico}
                  points={prod.puntos}
                  category={prod.categoria}
                  presentation={prod.presentacion}
                  image={prod.imagen}
                />
              ))}
            </div>
          ) : (
            <div
              data-testid="catalog-empty-state"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--r-card)',
                border: '1px dashed var(--border-subtle)',
                padding: 'var(--sp-12) var(--sp-6)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--sp-4)',
              }}
            >
              <PackageSearch size={48} color="var(--brand-gold)" />
              <h3 style={{ fontSize: 'var(--fs-xl)', color: 'var(--text-strong)', margin: 0 }}>
                No encontramos productos
              </h3>
              <p style={{ maxWidth: '44ch', fontSize: 'var(--fs-sm)', color: 'var(--text-muted)', margin: 0 }}>
                No hay coincidencias para {searchTerm ? `«${searchTerm}»` : 'la categoría seleccionada'}. Intenta con otro término o limpia los filtros.
              </p>
              <button
                onClick={handleClearFilters}
                data-testid="btn-empty-clear"
                style={{
                  marginTop: 'var(--sp-2)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'var(--brand-gold)',
                  color: 'var(--n-700)',
                  fontFamily: 'var(--font-subtitle)',
                  fontWeight: 700,
                  fontSize: 'var(--fs-sm)',
                  padding: '12px 24px',
                  borderRadius: 'var(--r-pill)',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-gold)',
                }}
              >
                Ver todos los productos
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 4. Banner Informativo para Socios */}
      <section
        style={{
          backgroundColor: 'var(--surface-page)',
          borderTop: '2px solid var(--brand-gold)',
          padding: 'var(--section-y-tight) 0',
          position: 'relative',
        }}
      >
        <div
          className="mg-container"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--sp-8)',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ maxWidth: '52ch' }}>
            <h3 style={{ fontSize: 'var(--fs-xl)' }}>Los socios pagan la mitad</h3>
            <p style={{ marginTop: 'var(--sp-3)', fontSize: 'var(--fs-md)', lineHeight: 'var(--lh-relaxed)' }}>
              Con cualquier pack desde S/. 360 compras todos estos productos con{' '}
              <span style={{ color: 'var(--text-strong)', fontWeight: 700 }}>
                50% de descuento, de por vida
              </span>.
            </p>
          </div>
          <Link
            to="/packs-de-afiliacion"
            data-testid="btn-productos-ver-packs"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--brand-gold)',
              color: 'var(--n-700)',
              fontFamily: 'var(--font-subtitle)',
              fontWeight: 700,
              fontSize: 'var(--fs-md)',
              padding: '14px 28px',
              borderRadius: 'var(--r-pill)',
              textDecoration: 'none',
              transition: 'var(--t-control)',
              boxShadow: 'var(--shadow-gold)',
            }}
          >
            Ver los packs de afiliación
          </Link>
        </div>
      </section>

      <style>{`
        .mg-categories-scroll::-webkit-scrollbar {
          height: 4px;
        }
        .mg-categories-scroll::-webkit-scrollbar-thumb {
          background-color: var(--border-subtle);
          borderRadius: 4px;
        }
        @media (max-width: 768px) {
          .mg-catalog-filters-section {
            position: sticky;
            top: 70px;
            z-index: 20;
            background-color: var(--surface-page);
            padding-top: var(--sp-2);
          }
        }
        @media (max-width: 600px) {
          .mg-container > a, [data-testid="btn-productos-ver-packs"] {
            width: 100% !important;
            text-align: center !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </div>
  );
}
