import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useSearchParams } from 'react-router-dom';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import WhatsAppFab from './components/WhatsAppFab';
import CartFab from './components/CartFab';
import CartDrawer from './components/CartDrawer';
import { CartProvider } from './context/CartContext';
import Portada from './pages/Portada';
import Productos from './pages/Productos';
import ProductoDetalle from './pages/ProductoDetalle';
import Packs from './pages/Packs';
import Registro from './pages/Registro';
import Confirmacion from './pages/Confirmacion';
import Nosotros from './pages/Nosotros';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad';
import TerminosCondiciones from './pages/TerminosCondiciones';
import LibroReclamaciones from './pages/LibroReclamaciones';
import NoEncontrado from './pages/NoEncontrado';
import { getProducto } from './data/catalogo';

// Captura y persiste el código de referido (?ref=MG-XXXXX) en sessionStorage
function RefTracker() {
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) {
      sessionStorage.setItem('mg_ref', ref);
    }
  }, [searchParams]);
  return null;
}

// Actualiza el título del documento, metatags de robots, canónica, descripción y JSON-LD de producto
function RouteManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    const titles = {
      '/': 'Max Global Corporation — Salud, Bienestar y Emprendimiento',
      '/productos': 'Nuestros Productos — Catálogo Oficial | Max Global',
      '/packs-de-afiliacion': 'Packs de Afiliación — Elige tu Plan | Max Global',
      '/registro': 'Registro de Afiliación | Max Global',
      '/confirmacion': 'Registro Recibido — Confirmación | Max Global',
      '/nosotros': 'Sobre Nosotros — Max Global Corporation',
      '/terminos-y-condiciones': 'Términos y Condiciones | Max Global Corporation',
      '/politica-de-privacidad': 'Política de Privacidad | Max Global Corporation',
      '/libro-de-reclamaciones': 'Libro de Reclamaciones | Max Global Corporation',
    };

    let title = titles[pathname];
    let isKnownRoute = Boolean(title);
    let currentProd = null;

    // Manejo de ruta dinámica de detalle de producto
    if (pathname.startsWith('/productos/') && pathname !== '/productos') {
      const prodId = pathname.replace('/productos/', '');
      const prod = getProducto(prodId);
      if (prod) {
        title = `${prod.nombre} | Max Global Corporation`;
        currentProd = prod;
        isKnownRoute = true;
      }
    }

    document.title = title || '404 — Página no encontrada | Max Global Corporation';

    // 1. Control de indexación SEO
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }

    if (
      pathname === '/registro' ||
      pathname === '/confirmacion' ||
      pathname === '/libro-de-reclamaciones' ||
      !isKnownRoute
    ) {
      robotsMeta.setAttribute('content', 'noindex, nofollow');
    } else {
      robotsMeta.setAttribute('content', 'index, follow');
    }

    // 2. Control de URL Canónica (siempre limpia)
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    const cleanPath = pathname.replace(/\/$/, '') || '/';
    canonicalLink.setAttribute('href', `https://maxglobaloficial.com${cleanPath}`);

    // 3. Meta Descripción Dinámica
    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.setAttribute('name', 'description');
      document.head.appendChild(descMeta);
    }

    if (currentProd) {
      const prodDesc = `${currentProd.descripcion}${currentProd.presentacion ? ` ${currentProd.presentacion}.` : ''} S/. ${currentProd.precioPublico}. Envíos a todo el Perú.`;
      descMeta.setAttribute('content', prodDesc);
    } else {
      descMeta.setAttribute(
        'content',
        'Productos naturales de alta calidad con moringa, café y colágeno hidrolizado. Conoce nuestros packs de afiliación, 50% de descuento para socios y comisiones de venta directa en todo el Perú.'
      );
    }

    // 4. Datos Estructurados Schema.org Product (Solo en detalle de producto)
    let schemaScript = document.getElementById('schema-product');
    if (currentProd) {
      const schemaData = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: currentProd.nombre,
        description: currentProd.descripcion,
        image: currentProd.imagen
          ? `https://maxglobaloficial.com${currentProd.imagen}`
          : undefined,
        brand: {
          '@type': 'Brand',
          name: 'Max Global Corporation',
        },
        offers: {
          '@type': 'Offer',
          url: `https://maxglobaloficial.com/productos/${currentProd.id}`,
          price: `${currentProd.precioPublico}.00`,
          priceCurrency: 'PEN',
          availability: 'https://schema.org/InStock',
        },
      };

      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'schema-product';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schemaData);
    } else {
      if (schemaScript) {
        schemaScript.remove();
      }
    }
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <RefTracker />
        <RouteManager />
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <SiteHeader />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Portada />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/productos/:id" element={<ProductoDetalle />} />
              <Route path="/packs-de-afiliacion" element={<Packs />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/confirmacion" element={<Confirmacion />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/terminos-y-condiciones" element={<TerminosCondiciones />} />
              <Route path="/politica-de-privacidad" element={<PoliticaPrivacidad />} />
              <Route path="/libro-de-reclamaciones" element={<LibroReclamaciones />} />
              <Route path="*" element={<NoEncontrado />} />
            </Routes>
          </main>
          <SiteFooter />
          <CartFab />
          <WhatsAppFab />
          <CartDrawer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}
