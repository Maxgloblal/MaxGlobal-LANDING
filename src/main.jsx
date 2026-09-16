import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/styles.css';

if (!import.meta.env.VITE_SUPABASE_URL) {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #0b0f19; color: #f87171; font-family: sans-serif; padding: 24px; text-align: center;">
        <div style="max-width: 520px; background: #111827; border: 1px solid #ef4444; border-radius: 12px; padding: 32px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5);">
          <h1 style="font-size: 1.5rem; margin-bottom: 12px; color: #f87171;">🔴 Error de Configuración</h1>
          <p style="font-size: 0.95rem; color: #9ca3af; line-height: 1.5; margin-bottom: 0;">
            La variable de entorno <code>VITE_SUPABASE_URL</code> no está configurada. La web no puede operar sin saber a qué base de datos conectar.
          </p>
        </div>
      </div>
    `;
  }
  throw new Error('🔴 Error crítico: VITE_SUPABASE_URL no está configurada. La web no puede cargar sin saber a qué base de datos conectar.');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
