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
import Packs from './pages/Packs';
import Registro from './pages/Registro';
import Confirmacion from './pages/Confirmacion';
import Nosotros from './pages/Nosotros';

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

// Actualiza el título del documento, metatags de robots (noindex en registro y confirmación) y restablece el scroll
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
    };

    document.title = titles[pathname] || 'Max Global Corporation';

    // Control de indexación SEO: No indexar formularios ni pantallas de confirmación
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (pathname === '/registro' || pathname === '/confirmacion') {
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.setAttribute('name', 'robots');
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.setAttribute('content', 'noindex, nofollow');
    } else {
      if (robotsMeta) {
        robotsMeta.setAttribute('content', 'index, follow');
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
              <Route path="/packs-de-afiliacion" element={<Packs />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/confirmacion" element={<Confirmacion />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="*" element={<Portada />} />
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
