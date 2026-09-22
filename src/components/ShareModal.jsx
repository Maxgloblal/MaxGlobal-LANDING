import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Copy, Check, Share2, Sparkles } from 'lucide-react';

export default function ShareModal({ isOpen, onClose, producto }) {
  if (!isOpen || !producto) return null;

  const [refCode, setRefCode] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const storedRef = sessionStorage.getItem('mg_ref');
    if (storedRef) {
      setRefCode(storedRef);
    }
  }, [isOpen]);

  // Actualiza sessionStorage si el usuario modifica su código de socio
  const handleRefChange = (val) => {
    const clean = val.trim();
    setRefCode(clean);
    if (clean) {
      sessionStorage.setItem('mg_ref', clean);
    } else {
      sessionStorage.removeItem('mg_ref');
    }
  };

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://maxglobaloficial.com';
  const cleanRef = refCode.trim();
  const shareUrl = cleanRef
    ? `${origin}/productos/${producto.id}?ref=${encodeURIComponent(cleanRef)}`
    : `${origin}/productos/${producto.id}`;

  const waText = `¡Hola! Te recomiendo este producto de Max Global Corporation:

🌿 *${producto.nombre}* — S/. ${producto.precioPublico}
${producto.descripcion ? `${producto.descripcion}\n` : ''}${producto.presentacion ? `Presentación: ${producto.presentacion}\n` : ''}
👉 Conoce más o pídela aquí:
${shareUrl}`;

  const waShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(waText)}`;

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        // Fallback para navegadores antiguos
        const input = document.createElement('input');
        input.value = shareUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Error al copiar al portapapeles:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator?.share) {
      try {
        await navigator.share({
          title: `${producto.nombre} — Max Global`,
          text: `🌿 ${producto.nombre} (S/. ${producto.precioPublico}) en Max Global Corporation`,
          url: shareUrl,
        });
      } catch (err) {
        // Si el usuario canceló, no hacer nada
        if (err.name !== 'AbortError') {
          console.error('Error en Web Share API:', err);
        }
      }
    }
  };

  const hasNativeShare = typeof navigator !== 'undefined' && Boolean(navigator?.share);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
      data-testid="share-modal-backdrop"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(26, 26, 26, 0.65)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--sp-4)',
        zIndex: 9999,
        animation: 'fadeIn 0.2s ease-out',
      }}
    >
      <div
        data-testid="share-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--r-card)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-lg, 0 20px 40px rgba(0,0,0,0.2))',
          width: '100%',
          maxWidth: '460px',
          padding: 'var(--sp-6)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--sp-4)',
          position: 'relative',
        }}
      >
        {/* Cabecera del Modal */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--r-circle)',
                backgroundColor: 'var(--surface-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gold-700)',
              }}
            >
              <Share2 size={16} />
            </div>
            <h3
              id="share-modal-title"
              data-testid="share-modal-title"
              style={{
                fontSize: 'var(--fs-lg)',
                color: 'var(--text-strong)',
                margin: 0,
                fontWeight: 700,
              }}
            >
              Compartir producto
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar modal de compartir"
            data-testid="btn-close-share-modal"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              padding: '6px',
              borderRadius: 'var(--r-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Mini Ficha Resumen del Producto */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--sp-3)',
            backgroundColor: 'var(--surface-page, #F8F9FA)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--r-md)',
            padding: 'var(--sp-3)',
          }}
        >
          {producto.imagen ? (
            <img
              src={producto.imagen}
              alt={producto.nombre}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: 'var(--r-sm)',
                objectFit: 'cover',
                backgroundColor: '#FFFFFF',
              }}
            />
          ) : (
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: 'var(--r-sm)',
                backgroundColor: 'var(--surface-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gold-700)',
              }}
            >
              <Sparkles size={20} />
            </div>
          )}

          <div style={{ flex: 1, minWidth: 0 }}>
            <h4
              style={{
                margin: 0,
                fontSize: 'var(--fs-sm)',
                fontWeight: 700,
                color: 'var(--text-strong)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {producto.nombre}
            </h4>
            {producto.presentacion && (
              <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
                {producto.presentacion}
              </span>
            )}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '2px' }}>
              <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>Público:</span>
              <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--text-strong)' }}>
                S/. {producto.precioPublico}
              </span>
            </div>
          </div>
        </div>

        {/* Sección de Código de Patrocinador / Socio */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            backgroundColor: 'var(--surface-sunken)',
            padding: 'var(--sp-3)',
            borderRadius: 'var(--r-md)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <label
            htmlFor="input-ref-code"
            style={{
              fontSize: 'var(--fs-xs)',
              fontWeight: 700,
              color: 'var(--text-strong)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>Código de socio distribuidor:</span>
            {cleanRef && (
              <span style={{ color: 'var(--brand-green)', fontWeight: 600 }}>
                ✓ Activo en el enlace
              </span>
            )}
          </label>
          <input
            id="input-ref-code"
            data-testid="input-ref-code"
            type="text"
            value={refCode}
            onChange={(e) => handleRefChange(e.target.value)}
            placeholder="Ej: MG-00417 (opcional)"
            style={{
              padding: '8px 12px',
              fontSize: 'var(--fs-sm)',
              borderRadius: 'var(--r-sm)',
              border: '1px solid var(--border-subtle)',
              fontFamily: 'var(--font-body)',
              color: 'var(--text-strong)',
              backgroundColor: '#FFFFFF',
              outline: 'none',
            }}
          />
          <span style={{ fontSize: 'var(--fs-3xs)', color: 'var(--text-muted)' }}>
            Si ingresas tu código, los pedidos y registros generados desde tu enlace se asociarán a tu red.
          </span>
        </div>

        {/* Botones de Acción para Compartir */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
          {/* Botón WhatsApp */}
          <a
            href={waShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="btn-share-whatsapp"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              backgroundColor: 'var(--brand-green)',
              color: '#FFFFFF',
              padding: '12px 16px',
              borderRadius: 'var(--r-sm)',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: 'var(--fs-sm)',
              transition: 'transform var(--dur-fast) var(--ease-out)',
            }}
          >
            <MessageCircle size={18} />
            <span>Compartir por WhatsApp</span>
          </a>

          {/* Botón Copiar Enlace */}
          <button
            onClick={handleCopy}
            data-testid="btn-copy-link"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              backgroundColor: copied ? 'var(--surface-green)' : '#FFFFFF',
              color: copied ? 'var(--green-700)' : 'var(--text-strong)',
              border: copied ? '1px solid var(--border-green)' : '1px solid var(--border-subtle)',
              padding: '12px 16px',
              borderRadius: 'var(--r-sm)',
              fontWeight: 700,
              fontSize: 'var(--fs-sm)',
              cursor: 'pointer',
              transition: 'all var(--dur-fast) var(--ease-out)',
            }}
          >
            {copied ? <Check size={18} color="var(--green-600)" /> : <Copy size={18} />}
            <span>{copied ? '¡Enlace copiado al portapapeles!' : 'Copiar enlace con código'}</span>
          </button>

          {/* Botón Compartir Nativo (solo si el navegador lo soporta) */}
          {hasNativeShare && (
            <button
              onClick={handleNativeShare}
              data-testid="btn-native-share"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: 'transparent',
                color: 'var(--gold-700)',
                border: '1px solid var(--border-gold)',
                padding: '10px 16px',
                borderRadius: 'var(--r-sm)',
                fontWeight: 600,
                fontSize: 'var(--fs-xs)',
                cursor: 'pointer',
              }}
            >
              <Share2 size={16} />
              <span>Otras opciones (Nativo del celular)</span>
            </button>
          )}
        </div>

        {/* Vista previa de la URL */}
        <div
          style={{
            fontSize: 'var(--fs-3xs)',
            color: 'var(--text-muted)',
            backgroundColor: 'var(--surface-page)',
            padding: '6px 10px',
            borderRadius: 'var(--r-xs)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            border: '1px dashed var(--border-subtle)',
          }}
        >
          <span style={{ fontWeight: 600 }}>Enlace: </span>
          <span data-testid="share-url-preview">{shareUrl}</span>
        </div>
      </div>
    </div>
  );
}
