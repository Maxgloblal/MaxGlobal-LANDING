import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { EMPRESA } from '../config';

export default function WhatsAppFab({ message }) {
  const [refCode, setRefCode] = useState('');

  useEffect(() => {
    const storedRef = sessionStorage.getItem('mg_ref');
    if (storedRef) {
      setRefCode(storedRef);
    }
  }, []);

  const defaultMsg = message || 'Hola, quiero información sobre Max Global.';
  const finalMsg = refCode ? `${defaultMsg}\nRef: ${refCode}` : defaultMsg;
  const waUrl = `https://wa.me/${EMPRESA.whatsapp}?text=${encodeURIComponent(finalMsg)}`;

  return (
    <>
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="mg-fab"
        style={{
          position: 'fixed',
          bottom: 'calc(var(--sp-4) + env(safe-area-inset-bottom, 0px))',
          right: 'var(--sp-4)',
          zIndex: 999,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--sp-2)',
          backgroundColor: 'var(--whatsapp)',
          color: '#FFFFFF',
          padding: '12px 18px',
          borderRadius: 'var(--r-pill)',
          boxShadow: '0 8px 24px rgba(27, 167, 65, 0.35)',
          border: 'none',
          fontSize: 'var(--fs-sm)',
          fontFamily: 'var(--font-subtitle)',
          fontWeight: 700,
          textDecoration: 'none',
          transition: 'var(--t-control)',
          cursor: 'pointer',
        }}
      >
        <MessageCircle size={24} color="#FFFFFF" />
        <span className="mg-fab-text">Pedir por WhatsApp</span>
      </a>

      <style>{`
        @media (max-width: 640px) {
          .mg-fab {
            width: 52px !important;
            height: 52px !important;
            padding: 0 !important;
            border-radius: 50% !important;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25) !important;
          }
          .mg-fab-text {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
