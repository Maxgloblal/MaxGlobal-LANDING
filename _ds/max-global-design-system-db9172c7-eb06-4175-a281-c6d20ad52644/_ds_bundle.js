/* @ds-bundle: {"format":4,"namespace":"MaxGlobalDesignSystem_db9172","components":[{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"PackCard","sourcePath":"components/commerce/PackCard.jsx"},{"name":"PointsBadge","sourcePath":"components/commerce/PointsBadge.jsx"},{"name":"ProductCard","sourcePath":"components/commerce/ProductCard.jsx"},{"name":"WhatsAppButton","sourcePath":"components/commerce/WhatsAppButton.jsx"},{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"StatCard","sourcePath":"components/data/StatCard.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"ProgressBar","sourcePath":"components/feedback/ProgressBar.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Breadcrumb","sourcePath":"components/navigation/Breadcrumb.jsx"},{"name":"SidebarNav","sourcePath":"components/navigation/SidebarNav.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/brand/Logo.jsx":"5a4c9c8db0c2","components/commerce/PackCard.jsx":"1d644dee7093","components/commerce/PointsBadge.jsx":"dbc7faf77543","components/commerce/ProductCard.jsx":"125c58d42f20","components/commerce/WhatsAppButton.jsx":"3f7dcffd9c68","components/core/Avatar.jsx":"0d2b976a04ae","components/core/Badge.jsx":"7365fcbc19b8","components/core/Button.jsx":"a2c31edae8a5","components/core/Card.jsx":"30be7c21d6b2","components/core/Icon.jsx":"a7bee88a295a","components/core/IconButton.jsx":"a09625292cad","components/core/Tag.jsx":"68a70683a7b0","components/data/DataTable.jsx":"15745cf882b3","components/data/StatCard.jsx":"eee3a84a8033","components/feedback/Dialog.jsx":"77b692882524","components/feedback/ProgressBar.jsx":"84ca54db287c","components/feedback/Toast.jsx":"73b5d0b44647","components/feedback/Tooltip.jsx":"ade86bc52e50","components/forms/Checkbox.jsx":"70549da34aa4","components/forms/Input.jsx":"90cff8d9a018","components/forms/Radio.jsx":"748a7d5db320","components/forms/Select.jsx":"cfe6c00b21dc","components/forms/Switch.jsx":"9b6782f1f5ed","components/forms/Textarea.jsx":"d849e5e07a3c","components/navigation/Breadcrumb.jsx":"a6356d206b40","components/navigation/SidebarNav.jsx":"443f61e7f8eb","components/navigation/Tabs.jsx":"f3a8db026397","ui_kits/panel/Login.jsx":"ebf6486dab4d","ui_kits/panel/Shell.jsx":"0f634e38b2a4","ui_kits/panel/Vistas.jsx":"6b49d1e9d097","ui_kits/web/Catalogo.jsx":"4a4823797ae8","ui_kits/web/Header.jsx":"df824b4ab07e","ui_kits/web/Hero.jsx":"187865433f7e","ui_kits/web/SerSocio.jsx":"88049c8bb563"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MaxGlobalDesignSystem_db9172 = window.MaxGlobalDesignSystem_db9172 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const FILES = {
  'horizontal-color': 'assets/logos/maxglobal-horizontal-color.png',
  'horizontal-negro': 'assets/logos/maxglobal-horizontal-negro.png',
  'horizontal-blanco': 'assets/logos/maxglobal-horizontal-blanco.png',
  'isotipo-color': 'assets/logos/maxglobal-isotipo-color.png'
};

/** Marca Max Global. Ajusta window.MG_ASSET_BASE a la ruta relativa hasta la raíz del sistema. */
function Logo({
  variant = 'horizontal-color',
  height = 32,
  base,
  style,
  ...rest
}) {
  const root = base ?? (typeof window !== 'undefined' && window.MG_ASSET_BASE) ?? '.';
  return /*#__PURE__*/React.createElement("img", _extends({
    src: root + '/' + FILES[variant],
    alt: "Max Global",
    style: {
      height,
      width: 'auto',
      display: 'block',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/commerce/PackCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function PackCard({
  name,
  price,
  lead,
  features = [],
  cta = 'Elegir pack',
  ribbon,
  featured = false,
  onSelect,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--mg-blanco)',
      borderRadius: 'var(--r-pack)',
      border: featured ? '2px solid var(--mg-dorado)' : '1px solid var(--mg-gris-200)',
      padding: featured ? 'var(--sp-8) var(--sp-6) var(--sp-6)' : 'var(--sp-6)',
      marginTop: featured && ribbon ? 0 : undefined,
      boxShadow: featured ? 'var(--shadow-md)' : hover ? 'var(--shadow-lift)' : 'none',
      transform: hover && !featured ? 'translateY(-4px)' : 'none',
      transition: 'var(--t-surface)',
      ...style
    }
  }, rest), ribbon && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 0,
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'var(--mg-dorado)',
      color: 'var(--mg-gris-900)',
      borderRadius: 'var(--r-badge)',
      padding: '6px 16px',
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--fs-3xs)',
      letterSpacing: 'var(--ls-wide)',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap'
    }
  }, ribbon), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-subtitle)',
      fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--fs-md)',
      color: 'var(--mg-gris-900)'
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-3xl)',
      letterSpacing: 'var(--ls-display)',
      color: 'var(--mg-gris-900)',
      lineHeight: 1.1,
      marginTop: 'var(--sp-2)'
    }
  }, price), lead && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--fs-sm)',
      lineHeight: 'var(--lh-normal)',
      color: 'var(--mg-gris-900)',
      marginTop: 'var(--sp-3)'
    }
  }, lead), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 'var(--sp-4) 0 0',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-3)',
      flex: 1
    }
  }, features.map((f, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: 'flex',
      gap: 'var(--sp-3)',
      alignItems: 'flex-start',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-sm)',
      lineHeight: 'var(--lh-normal)',
      color: f.muted ? 'var(--text-muted)' : 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 18,
      height: 18,
      flex: '0 0 auto',
      marginTop: 2,
      borderRadius: 'var(--r-pill)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: f.muted ? 'var(--mg-gris-200)' : 'var(--success-soft)',
      color: f.muted ? 'var(--text-muted)' : 'var(--mg-verde-oscuro)',
      fontSize: 11,
      fontWeight: 700
    }
  }, f.muted ? '–' : '✓'), /*#__PURE__*/React.createElement("span", null, f.text)))), /*#__PURE__*/React.createElement("button", {
    onClick: onSelect,
    style: {
      marginTop: 'var(--sp-6)',
      minHeight: 'var(--control-h-md)',
      width: '100%',
      borderRadius: 'var(--r-control)',
      cursor: 'pointer',
      transition: 'var(--t-control)',
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--fs-sm)',
      letterSpacing: '0.01em',
      padding: '0 var(--sp-5)',
      ...(featured ? {
        background: hover ? 'var(--mg-dorado-oscuro)' : 'var(--mg-dorado)',
        color: hover ? '#fff' : 'var(--mg-gris-900)',
        border: '1px solid transparent'
      } : {
        background: hover ? 'var(--mg-gris-50)' : 'transparent',
        color: 'var(--mg-dorado-oscuro)',
        border: '1px solid var(--mg-dorado-claro)'
      })
    }
  }, cta));
}
Object.assign(__ds_scope, { PackCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/PackCard.jsx", error: String((e && e.message) || e) }); }

// components/commerce/PointsBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function PointsBadge({
  points,
  size = 'md',
  style,
  ...rest
}) {
  const S = size === 'sm' ? {
    padding: '3px 9px',
    fontSize: 'var(--fs-3xs)'
  } : {
    padding: '5px 12px',
    fontSize: 'var(--fs-2xs)'
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      background: 'var(--mg-verde)',
      color: '#fff',
      borderRadius: 'var(--r-badge)',
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--fw-bold)',
      whiteSpace: 'nowrap',
      ...S,
      ...style
    }
  }, rest), points, " ", points === 1 ? 'punto' : 'puntos');
}
Object.assign(__ds_scope, { PointsBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/PointsBadge.jsx", error: String((e && e.message) || e) }); }

// components/commerce/WhatsAppButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const WA_PATH = 'M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2Zm5.8 14.18c-.25.7-1.45 1.33-1.99 1.38-.55.05-1.06.24-3.58-.94-2.52-1.18-4.09-3.87-4.22-4.05-.13-.18-1-1.4-1-2.67 0-1.27.66-1.9.9-2.16.23-.26.5-.32.67-.32.17 0 .34 0 .49.01.16.01.37-.06.58.44.21.5.71 1.73.77 1.86.06.13.1.28.01.45-.09.18-.13.29-.26.44-.13.15-.28.34-.4.46-.13.13-.27.27-.12.53.15.26.66 1.09 1.42 1.76.97.87 1.79 1.14 2.05 1.27.26.13.41.11.56-.07.15-.18.65-.76.82-1.02.17-.26.35-.22.58-.13.23.09 1.47.69 1.72.82.25.13.42.19.48.3.06.11.06.63-.19 1.33Z';
function WhatsAppButton({
  size = 'md',
  fullWidth = false,
  floating = false,
  message,
  phone = '51999999999',
  children = 'Pedir por WhatsApp',
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const href = 'https://wa.me/' + phone + (message ? '?text=' + encodeURIComponent(message) : '');
  const S = {
    sm: {
      minHeight: 'var(--control-h-sm)',
      padding: '0 var(--sp-4)',
      fontSize: 'var(--fs-xs)',
      icon: 16
    },
    md: {
      minHeight: 'var(--control-h-md)',
      padding: '0 var(--sp-6)',
      fontSize: 'var(--fs-sm)',
      icon: 18
    },
    lg: {
      minHeight: 'var(--control-h-lg)',
      padding: 'var(--sp-4) var(--sp-8)',
      fontSize: 'var(--fs-md)',
      icon: 20
    }
  }[size];
  if (floating) {
    return /*#__PURE__*/React.createElement("a", _extends({
      href: href,
      target: "_blank",
      rel: "noopener",
      "aria-label": "Escribir por WhatsApp",
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      style: {
        position: 'fixed',
        bottom: 'var(--sp-5)',
        right: 'var(--sp-5)',
        zIndex: 45,
        width: 58,
        height: 58,
        borderRadius: 'var(--r-pill)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        background: hover ? 'var(--whatsapp-dark)' : 'var(--whatsapp)',
        color: '#fff',
        boxShadow: 'var(--shadow-lg)',
        transition: 'var(--t-control)',
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement("svg", {
      width: "30",
      height: "30",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("path", {
      d: WA_PATH
    })));
  }
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    target: "_blank",
    rel: "noopener",
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: fullWidth ? 'flex' : 'inline-flex',
      width: fullWidth ? '100%' : undefined,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--sp-2)',
      background: hover ? 'var(--whatsapp-dark)' : 'var(--whatsapp)',
      color: '#fff',
      border: 'none',
      borderRadius: 'var(--r-control)',
      textDecoration: 'none',
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: '0.01em',
      lineHeight: 1.3,
      textAlign: 'center',
      transition: 'var(--t-control)',
      minHeight: S.minHeight,
      padding: S.padding,
      fontSize: S.fontSize,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("svg", {
    width: S.icon,
    height: S.icon,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    style: {
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: WA_PATH
  })), children);
}
Object.assign(__ds_scope, { WhatsAppButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/WhatsAppButton.jsx", error: String((e && e.message) || e) }); }

// components/commerce/ProductCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ProductCard({
  name,
  description,
  price,
  points,
  badge,
  imageSrc,
  waMessage,
  phone,
  onAdd,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: 'var(--mg-blanco)',
      border: '1px solid var(--mg-gris-200)',
      borderRadius: 'var(--r-card)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'var(--t-surface)',
      transform: hover ? 'translateY(-4px)' : 'none',
      boxShadow: hover ? 'var(--shadow-lift)' : 'none',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '1 / 1',
      background: 'var(--mg-gris-50)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }
  }, imageSrc ? /*#__PURE__*/React.createElement("img", {
    src: imageSrc,
    alt: name,
    loading: "lazy",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      padding: '12%'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-3xs)',
      color: 'var(--text-muted)',
      letterSpacing: 'var(--ls-wide)',
      textTransform: 'uppercase',
      textAlign: 'center',
      padding: '0 12%'
    }
  }, "Foto del producto", /*#__PURE__*/React.createElement("br", null), "pendiente"), badge && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 'var(--sp-3)',
      left: 'var(--sp-3)',
      background: 'var(--mg-dorado)',
      color: 'var(--mg-gris-900)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-3xs)',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: 'var(--ls-wide)',
      textTransform: 'uppercase',
      padding: '4px 10px',
      borderRadius: 'var(--r-badge)'
    }
  }, badge)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--sp-5)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-2)',
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-subtitle)',
      fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--fs-md)',
      color: 'var(--mg-gris-900)',
      lineHeight: 'var(--lh-snug)'
    }
  }, name), description && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-2xs)',
      lineHeight: 'var(--lh-normal)',
      color: 'var(--text-muted)'
    }
  }, description), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--sp-3)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--sp-3)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-xl)',
      letterSpacing: 'var(--ls-display)',
      color: 'var(--mg-gris-900)'
    }
  }, price), points != null && /*#__PURE__*/React.createElement(__ds_scope.PointsBadge, {
    points: points,
    size: "sm"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--sp-4)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.WhatsAppButton, {
    size: "sm",
    fullWidth: true,
    phone: phone,
    message: waMessage,
    onClick: onAdd
  }, "Pedir por WhatsApp"))));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: 28,
  md: 36,
  lg: 48
};
function Avatar({
  name = '',
  src,
  size = 'md',
  tone = 'gold',
  style,
  ...rest
}) {
  const px = typeof size === 'number' ? size : SIZES[size];
  const initials = name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  const palette = tone === 'green' ? {
    background: 'var(--green-50)',
    color: 'var(--green-600)'
  } : {
    background: 'var(--gold-100)',
    color: 'var(--gold-700)'
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      width: px,
      height: px,
      borderRadius: '50%',
      overflow: 'hidden',
      flex: '0 0 auto',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--fw-bold)',
      fontSize: Math.round(px * 0.36),
      letterSpacing: '0.02em',
      ...palette,
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  gold: {
    background: 'var(--gold-100)',
    color: 'var(--gold-700)'
  },
  green: {
    background: 'var(--green-50)',
    color: 'var(--green-600)'
  },
  neutral: {
    background: 'var(--surface-muted)',
    color: 'var(--text-body)'
  },
  warning: {
    background: 'var(--warning-soft)',
    color: 'var(--warning)'
  },
  danger: {
    background: 'var(--danger-soft)',
    color: 'var(--danger)'
  },
  info: {
    background: 'var(--info-soft)',
    color: 'var(--info)'
  },
  solidGreen: {
    background: 'var(--brand-green)',
    color: 'var(--text-on-green)'
  },
  solidGold: {
    background: 'var(--brand-gold)',
    color: 'var(--text-on-gold)'
  }
};
function Badge({
  tone = 'gold',
  dot = false,
  style,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--sp-2)',
      padding: '4px 10px',
      borderRadius: 'var(--r-pill)',
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--fs-3xs)',
      letterSpacing: 'var(--ls-wide)',
      textTransform: 'uppercase',
      ...TONES[tone],
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'currentColor'
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const VARIANTS = {
  primary: {
    background: 'var(--mg-dorado)',
    color: 'var(--mg-gris-900)',
    border: '1px solid var(--mg-dorado)'
  },
  secondary: {
    background: 'var(--brand-green)',
    color: 'var(--text-on-green)',
    border: '1px solid var(--brand-green)'
  },
  outline: {
    background: 'transparent',
    color: 'var(--text-gold)',
    border: '1px solid var(--border-gold)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-strong)',
    border: '1px solid transparent'
  },
  dark: {
    background: 'var(--surface-inverse)',
    color: 'var(--text-on-dark)',
    border: '1px solid var(--surface-inverse)'
  }
};
const SIZES = {
  sm: {
    minHeight: 'var(--control-h-sm)',
    padding: '0 var(--sp-5)',
    fontSize: 'var(--fs-xs)'
  },
  md: {
    minHeight: 'var(--control-h-md)',
    padding: '0 var(--sp-6)',
    fontSize: 'var(--fs-sm)'
  },
  lg: {
    minHeight: 'var(--control-h-lg)',
    padding: 'var(--sp-4) var(--sp-8)',
    fontSize: 'var(--fs-md)'
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  iconLeft,
  iconRight,
  style,
  children,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const v = VARIANTS[variant] || VARIANTS.primary;
  const hoverStyle = !disabled && hover ? {
    primary: {
      background: 'var(--mg-dorado-oscuro)',
      borderColor: 'var(--mg-dorado-oscuro)',
      color: '#fff',
      boxShadow: 'var(--shadow-gold)'
    },
    secondary: {
      background: 'var(--mg-verde-oscuro)',
      borderColor: 'var(--mg-verde-oscuro)',
      boxShadow: 'var(--shadow-green)'
    },
    outline: {
      background: 'var(--surface-gold)',
      borderColor: 'var(--gold-400)'
    },
    ghost: {
      background: 'var(--surface-muted)'
    },
    dark: {
      background: 'var(--n-600)',
      borderColor: 'var(--n-600)'
    }
  }[variant] : null;
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      display: fullWidth ? 'flex' : 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--sp-2)',
      width: fullWidth ? '100%' : undefined,
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: '0.01em',
      lineHeight: 1.3,
      borderRadius: 'var(--r-control)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      textAlign: 'center',
      transition: 'var(--t-control)',
      whiteSpace: 'nowrap',
      opacity: disabled ? 0.45 : 1,
      transform: press && !disabled ? 'var(--press-scale)' : 'none',
      ...v,
      ...SIZES[size],
      ...hoverStyle,
      ...style
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  variant = 'raised',
  interactive = false,
  padding = 'var(--sp-6)',
  style,
  children,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const base = {
    raised: {
      background: 'var(--surface-card)',
      border: 'var(--border-card)',
      boxShadow: 'var(--shadow-sm)'
    },
    flat: {
      background: 'var(--surface-card)',
      border: 'var(--border-card)',
      boxShadow: 'none'
    },
    sunken: {
      background: 'var(--surface-sunken)',
      border: '1px solid transparent',
      boxShadow: 'none'
    },
    gold: {
      background: 'var(--surface-gold)',
      border: '1px solid var(--border-gold)',
      boxShadow: 'none'
    },
    inverse: {
      background: 'var(--surface-inverse)',
      border: '1px solid var(--surface-inverse)',
      boxShadow: 'var(--shadow-md)',
      color: 'var(--text-on-dark)'
    }
  }[variant];
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      borderRadius: 'var(--r-card)',
      padding,
      transition: 'var(--t-surface)',
      ...base,
      ...(interactive && hover ? {
        transform: 'var(--lift-hover)',
        boxShadow: 'var(--shadow-md)',
        borderColor: 'var(--border-gold)'
      } : null),
      cursor: interactive ? 'pointer' : undefined,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Envoltorio sobre Lucide (CDN). Requiere <script src="https://unpkg.com/lucide@latest"> en la página. */
function Icon({
  name,
  size = 20,
  strokeWidth = 1.75,
  color = 'currentColor',
  style,
  ...rest
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const lucide = typeof window !== 'undefined' ? window.lucide : null;
    if (!ref.current || !lucide || !lucide.icons) return;
    const key = name.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
    const node = lucide.icons[key] || lucide.icons[name];
    if (!node) {
      ref.current.innerHTML = '';
      return;
    }
    ref.current.innerHTML = lucide.createElement(node).outerHTML;
    const svg = ref.current.firstChild;
    if (svg) {
      svg.setAttribute('width', size);
      svg.setAttribute('height', size);
      svg.setAttribute('stroke-width', strokeWidth);
      svg.setAttribute('stroke', color);
    }
  }, [name, size, strokeWidth, color]);
  return /*#__PURE__*/React.createElement("span", _extends({
    ref: ref,
    "aria-hidden": "true",
    style: {
      display: 'inline-flex',
      width: size,
      height: size,
      flex: '0 0 auto',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: 32,
  md: 40,
  lg: 48
};
function IconButton({
  variant = 'ghost',
  size = 'md',
  label,
  disabled = false,
  style,
  children,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const px = SIZES[size] || SIZES.md;
  const base = {
    ghost: {
      background: 'transparent',
      color: 'var(--text-body)',
      border: '1px solid transparent'
    },
    outline: {
      background: 'var(--surface-card)',
      color: 'var(--text-strong)',
      border: '1px solid var(--border-subtle)'
    },
    gold: {
      background: 'var(--brand-gold)',
      color: 'var(--text-on-gold)',
      border: '1px solid var(--brand-gold)'
    },
    green: {
      background: 'var(--brand-green)',
      color: 'var(--text-on-green)',
      border: '1px solid var(--brand-green)'
    }
  }[variant];
  const hoverStyle = !disabled && hover ? {
    ghost: {
      background: 'var(--surface-muted)'
    },
    outline: {
      borderColor: 'var(--border-gold)',
      background: 'var(--surface-gold)'
    },
    gold: {
      background: 'var(--gold-500)'
    },
    green: {
      background: 'var(--green-500)'
    }
  }[variant] : null;
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    title: label,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: px,
      height: px,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--r-pill)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'var(--t-control)',
      opacity: disabled ? 0.45 : 1,
      padding: 0,
      ...base,
      ...hoverStyle,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tag({
  selected = false,
  onRemove,
  style,
  children,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--sp-2)',
      padding: '6px 12px',
      borderRadius: 'var(--r-pill)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-xs)',
      background: selected ? 'var(--surface-gold)' : 'var(--surface-card)',
      color: selected ? 'var(--gold-700)' : 'var(--text-body)',
      border: '1px solid ' + (selected ? 'var(--gold-300)' : hover ? 'var(--border-strong)' : 'var(--border-subtle)'),
      transition: 'var(--t-control)',
      cursor: 'pointer',
      ...style
    }
  }, rest), children, onRemove && /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onRemove(e);
    },
    "aria-label": "Quitar",
    style: {
      border: 'none',
      background: 'none',
      padding: 0,
      cursor: 'pointer',
      color: 'inherit',
      opacity: .6,
      fontSize: 14,
      lineHeight: 1
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function DataTable({
  columns = [],
  rows = [],
  caption,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: 'var(--surface-card)',
      border: 'var(--border-card)',
      borderRadius: 'var(--r-card)',
      overflow: 'hidden',
      ...style
    }
  }, rest), caption && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--sp-4) var(--sp-5)',
      borderBottom: '1px solid var(--border-subtle)',
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--fs-sm)',
      color: 'var(--text-strong)'
    }
  }, caption), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    style: {
      textAlign: c.align || 'left',
      padding: 'var(--sp-3) var(--sp-5)',
      background: 'var(--surface-sunken)',
      borderBottom: '1px solid var(--border-subtle)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-3xs)',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: 'var(--ls-wide)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, c.label)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    style: {
      textAlign: c.align || 'left',
      padding: 'var(--sp-4) var(--sp-5)',
      borderBottom: i === rows.length - 1 ? 'none' : '1px solid var(--border-subtle)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-sm)',
      color: 'var(--text-body)',
      verticalAlign: 'middle'
    }
  }, r[c.key])))))));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/data/StatCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function StatCard({
  label,
  value,
  delta,
  deltaTone = 'up',
  caption,
  icon,
  style,
  ...rest
}) {
  const up = deltaTone === 'up';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: 'var(--surface-card)',
      border: 'var(--border-card)',
      borderRadius: 'var(--r-card)',
      padding: 'var(--sp-5)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-2)',
      boxShadow: 'var(--shadow-xs)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--sp-3)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-3xs)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--brand-gold)',
      display: 'inline-flex'
    }
  }, icon)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-2xl)',
      color: 'var(--text-strong)',
      letterSpacing: 'var(--ls-display)',
      textTransform: 'uppercase',
      lineHeight: 1.1
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 'var(--sp-2)'
    }
  }, delta && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-2xs)',
      fontWeight: 'var(--fw-bold)',
      color: up ? 'var(--green-500)' : 'var(--danger)'
    }
  }, up ? '↑' : '↓', " ", delta), caption && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-2xs)',
      color: 'var(--text-muted)'
    }
  }, caption)));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function Dialog({
  open = false,
  title,
  description,
  onClose,
  footer,
  width = 460,
  children
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    "aria-label": title,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 60,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--sp-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(28,27,25,.42)',
      backdropFilter: 'var(--glass-blur)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      maxWidth: width,
      background: 'var(--surface-card)',
      borderRadius: 'var(--r-xl)',
      boxShadow: 'var(--shadow-lg)',
      border: 'var(--border-card)',
      padding: 'var(--sp-8)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-4)'
    }
  }, onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Cerrar",
    style: {
      position: 'absolute',
      top: 'var(--sp-4)',
      right: 'var(--sp-4)',
      width: 32,
      height: 32,
      borderRadius: '50%',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: 'var(--text-muted)',
      fontSize: 18,
      lineHeight: 1
    }
  }, "\xD7"), title && /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-subtitle)',
      fontSize: 'var(--fs-lg)',
      color: 'var(--text-strong)',
      margin: 0,
      fontWeight: 700,
      paddingRight: 'var(--sp-8)'
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-sm)',
      color: 'var(--text-body)',
      lineHeight: 'var(--lh-normal)',
      margin: 0
    }
  }, description), children, footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--sp-3)',
      justifyContent: 'flex-end',
      marginTop: 'var(--sp-2)'
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ProgressBar({
  value = 0,
  max = 100,
  label,
  caption,
  tone = 'gold',
  height = 8,
  style,
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  const fill = tone === 'green' ? 'var(--brand-green)' : 'var(--brand-gold)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-2)',
      ...style
    }
  }, rest), (label || caption) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 'var(--sp-3)'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-xs)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--text-strong)'
    }
  }, label), caption && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-2xs)',
      color: 'var(--text-muted)'
    }
  }, caption)), /*#__PURE__*/React.createElement("div", {
    role: "progressbar",
    "aria-valuenow": value,
    "aria-valuemax": max,
    style: {
      height,
      borderRadius: 'var(--r-pill)',
      background: 'var(--surface-muted)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: pct + '%',
      height: '100%',
      borderRadius: 'var(--r-pill)',
      background: fill,
      transition: 'width var(--dur-slow) var(--ease-out)'
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  success: {
    icon: '✓',
    color: 'var(--green-600)',
    bg: 'var(--success-soft)',
    border: 'var(--green-200)'
  },
  info: {
    icon: 'i',
    color: 'var(--info)',
    bg: 'var(--info-soft)',
    border: '#CBE0EA'
  },
  warning: {
    icon: '!',
    color: 'var(--warning)',
    bg: 'var(--warning-soft)',
    border: '#EFD9AE'
  },
  danger: {
    icon: '!',
    color: 'var(--danger)',
    bg: 'var(--danger-soft)',
    border: '#EFC8C1'
  }
};
function Toast({
  tone = 'success',
  title,
  message,
  onClose,
  style,
  ...rest
}) {
  const t = TONES[tone];
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    style: {
      display: 'flex',
      gap: 'var(--sp-3)',
      alignItems: 'flex-start',
      background: 'var(--surface-card)',
      border: '1px solid ' + t.border,
      borderRadius: 'var(--r-md)',
      boxShadow: 'var(--shadow-md)',
      padding: 'var(--sp-4)',
      minWidth: 300,
      maxWidth: 420,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 22,
      height: 22,
      flex: '0 0 auto',
      borderRadius: '50%',
      background: t.bg,
      color: t.color,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--fw-bold)',
      fontSize: 12
    }
  }, t.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, title && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--fs-xs)',
      color: 'var(--text-strong)'
    }
  }, title), message && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-2xs)',
      color: 'var(--text-body)',
      lineHeight: 'var(--lh-normal)'
    }
  }, message)), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Cerrar",
    style: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      color: 'var(--text-muted)',
      fontSize: 16,
      lineHeight: 1,
      padding: 0
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tooltip({
  content,
  placement = 'top',
  children,
  style,
  ...rest
}) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top: {
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginBottom: 8
    },
    bottom: {
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginTop: 8
    },
    left: {
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginRight: 8
    },
    right: {
      left: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginLeft: 8
    }
  }[placement];
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      position: 'relative',
      display: 'inline-flex',
      ...style
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
    onFocus: () => setShow(true),
    onBlur: () => setShow(false)
  }, rest), children, show && /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      zIndex: 40,
      ...pos,
      background: 'var(--surface-inverse)',
      color: 'var(--text-on-dark)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-3xs)',
      lineHeight: 1.4,
      padding: '6px 10px',
      borderRadius: 'var(--r-sm)',
      whiteSpace: 'nowrap',
      boxShadow: 'var(--shadow-md)'
    }
  }, content));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  label,
  description,
  checked,
  onChange,
  disabled = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      gap: 'var(--sp-3)',
      alignItems: description ? 'flex-start' : 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 20,
      height: 20,
      flex: '0 0 auto',
      borderRadius: 'var(--r-xs)',
      border: '1px solid ' + (checked ? 'var(--brand-green)' : 'var(--border-strong)'),
      background: checked ? 'var(--brand-green)' : 'var(--surface-card)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'var(--t-control)',
      marginTop: description ? 2 : 0
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 5,
      borderLeft: '2px solid #fff',
      borderBottom: '2px solid #fff',
      rotate: '-45deg',
      marginTop: -3
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-sm)',
      color: 'var(--text-strong)'
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-2xs)',
      color: 'var(--text-muted)'
    }
  }, description)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  hint,
  error,
  iconLeft,
  suffix,
  id,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const autoId = React.useId ? React.useId() : 'mg-input';
  const inputId = id || autoId;
  const borderColor = error ? 'var(--danger)' : focus ? 'var(--border-focus)' : 'var(--border-subtle)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-2)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-xs)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--text-strong)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--sp-2)',
      height: 'var(--control-h-md)',
      padding: '0 var(--sp-4)',
      background: 'var(--surface-card)',
      border: '1px solid ' + borderColor,
      borderRadius: 'var(--r-input)',
      transition: 'var(--t-control)',
      boxShadow: focus ? error ? '0 0 0 3px rgba(194,64,47,.22)' : 'var(--ring-focus)' : 'none'
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      display: 'inline-flex'
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-sm)',
      color: 'var(--text-strong)'
    }
  }, rest)), suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 'var(--fs-xs)'
    }
  }, suffix)), (error || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-2xs)',
      color: error ? 'var(--danger)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Radio({
  label,
  description,
  checked,
  onChange,
  name,
  value,
  disabled = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      gap: 'var(--sp-3)',
      alignItems: description ? 'flex-start' : 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 20,
      height: 20,
      flex: '0 0 auto',
      borderRadius: '50%',
      border: '1px solid ' + (checked ? 'var(--brand-green)' : 'var(--border-strong)'),
      background: 'var(--surface-card)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'var(--t-control)',
      marginTop: description ? 2 : 0
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: 'var(--brand-green)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-sm)',
      color: 'var(--text-strong)'
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-2xs)',
      color: 'var(--text-muted)'
    }
  }, description)));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  label,
  hint,
  error,
  options = [],
  placeholder,
  id,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const autoId = React.useId ? React.useId() : 'mg-select';
  const selId = id || autoId;
  const borderColor = error ? 'var(--danger)' : focus ? 'var(--border-focus)' : 'var(--border-subtle)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-2)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: selId,
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-xs)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--text-strong)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: selId,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: 'none',
      width: '100%',
      height: 'var(--control-h-md)',
      padding: '0 var(--sp-10) 0 var(--sp-4)',
      background: 'var(--surface-card)',
      border: '1px solid ' + borderColor,
      borderRadius: 'var(--r-input)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-sm)',
      color: 'var(--text-strong)',
      outline: 'none',
      transition: 'var(--t-control)',
      cursor: 'pointer',
      boxShadow: focus ? 'var(--ring-focus)' : 'none'
    }
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder), options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: 'var(--sp-4)',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 8,
      height: 8,
      borderRight: '1.5px solid var(--text-muted)',
      borderBottom: '1.5px solid var(--text-muted)',
      rotate: '45deg',
      marginTop: -3,
      pointerEvents: 'none'
    }
  })), (error || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-2xs)',
      color: error ? 'var(--danger)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Switch({
  label,
  checked = false,
  onChange,
  disabled = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--sp-3)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch",
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 44,
      height: 26,
      flex: '0 0 auto',
      borderRadius: 'var(--r-pill)',
      padding: 3,
      background: checked ? 'var(--brand-green)' : 'var(--n-300)',
      transition: 'var(--t-control)',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: '50%',
      background: '#fff',
      boxShadow: 'var(--shadow-xs)',
      transform: checked ? 'translateX(18px)' : 'translateX(0)',
      transition: 'transform var(--dur-fast) var(--ease-standard)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-sm)',
      color: 'var(--text-strong)'
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Textarea({
  label,
  hint,
  error,
  rows = 4,
  id,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const autoId = React.useId ? React.useId() : 'mg-textarea';
  const taId = id || autoId;
  const borderColor = error ? 'var(--danger)' : focus ? 'var(--border-focus)' : 'var(--border-subtle)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-2)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: taId,
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-xs)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--text-strong)'
    }
  }, label), /*#__PURE__*/React.createElement("textarea", _extends({
    id: taId,
    rows: rows,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      resize: 'vertical',
      padding: 'var(--sp-3) var(--sp-4)',
      background: 'var(--surface-card)',
      border: '1px solid ' + borderColor,
      borderRadius: 'var(--r-input)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-sm)',
      color: 'var(--text-strong)',
      lineHeight: 'var(--lh-normal)',
      outline: 'none',
      transition: 'var(--t-control)',
      boxShadow: focus ? 'var(--ring-focus)' : 'none'
    }
  }, rest)), (error || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-2xs)',
      color: error ? 'var(--danger)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumb.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Breadcrumb({
  items = [],
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    "aria-label": "Ruta",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--sp-2)',
      flexWrap: 'wrap',
      ...style
    }
  }, rest), items.map((it, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      color: 'var(--n-300)',
      fontSize: 'var(--fs-2xs)'
    }
  }, "/"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-2xs)',
      color: i === items.length - 1 ? 'var(--text-strong)' : 'var(--text-muted)',
      fontWeight: i === items.length - 1 ? 'var(--fw-bold)' : 'var(--fw-regular)'
    }
  }, it.label))));
}
Object.assign(__ds_scope, { Breadcrumb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumb.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SidebarNav.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SidebarNav({
  items = [],
  value,
  onChange,
  footer,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-1)',
      ...style
    }
  }, rest), items.map(it => {
    if (it.section) return /*#__PURE__*/React.createElement("div", {
      key: 's-' + it.section,
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--fs-3xs)',
        letterSpacing: 'var(--ls-eyebrow)',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        padding: 'var(--sp-5) var(--sp-3) var(--sp-2)'
      }
    }, it.section);
    const on = it.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: it.value,
      onClick: () => onChange && onChange(it.value),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--sp-3)',
        width: '100%',
        padding: '10px var(--sp-3)',
        borderRadius: 'var(--r-md)',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'var(--t-control)',
        background: on ? 'var(--surface-gold)' : 'transparent',
        color: on ? 'var(--gold-700)' : 'var(--text-body)',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--fs-sm)',
        fontWeight: on ? 'var(--fw-bold)' : 'var(--fw-regular)'
      }
    }, it.icon, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, it.label), it.badge != null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--fs-3xs)',
        fontWeight: 'var(--fw-bold)',
        background: 'var(--brand-green)',
        color: '#fff',
        borderRadius: 'var(--r-pill)',
        padding: '2px 7px'
      }
    }, it.badge));
  }), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 'var(--sp-4)'
    }
  }, footer));
}
Object.assign(__ds_scope, { SidebarNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SidebarNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tabs({
  items = [],
  value,
  onChange,
  variant = 'underline',
  style,
  ...rest
}) {
  const active = value ?? (items[0] && items[0].value);
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    style: {
      display: 'flex',
      gap: variant === 'pill' ? 'var(--sp-2)' : 'var(--sp-6)',
      borderBottom: variant === 'underline' ? '1px solid var(--border-subtle)' : 'none',
      ...style
    }
  }, rest), items.map(it => {
    const on = it.value === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.value,
      role: "tab",
      "aria-selected": on,
      onClick: () => onChange && onChange(it.value),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--sp-2)',
        cursor: 'pointer',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--fs-sm)',
        fontWeight: on ? 'var(--fw-bold)' : 'var(--fw-regular)',
        transition: 'var(--t-control)',
        border: 'none',
        ...(variant === 'underline' ? {
          background: 'none',
          padding: '0 0 var(--sp-3)',
          marginBottom: -1,
          color: on ? 'var(--text-strong)' : 'var(--text-muted)',
          borderBottom: '2px solid ' + (on ? 'var(--brand-gold)' : 'transparent')
        } : {
          background: on ? 'var(--surface-gold)' : 'transparent',
          padding: '8px 16px',
          borderRadius: 'var(--r-pill)',
          color: on ? 'var(--gold-700)' : 'var(--text-muted)'
        })
      }
    }, it.icon, it.label, it.count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--fs-3xs)',
        color: 'var(--text-muted)'
      }
    }, it.count));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/panel/Login.jsx
try { (() => {
const {
  Logo,
  Input,
  Button,
  Checkbox,
  Card,
  Icon
} = window.MaxGlobalDesignSystem_db9172;
function Login({
  onEntrar
}) {
  const [recordar, setRecordar] = React.useState(true);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--sp-10)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "var(--sp-10)",
    style: {
      width: '100%',
      maxWidth: 420,
      boxShadow: 'var(--shadow-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-6)'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "horizontal-color",
    height: 30
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-2)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-2xl)',
      color: 'var(--text-strong)',
      letterSpacing: 'var(--ls-display)',
      textTransform: 'uppercase'
    }
  }, "Panel de socios"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-sm)',
      color: 'var(--text-muted)'
    }
  }, "Ingresa con el c\xF3digo que te dio tu patrocinador.")), /*#__PURE__*/React.createElement(Input, {
    label: "C\xF3digo de socio",
    defaultValue: "MG-04821",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "hash",
      size: 16
    })
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Contrase\xF1a",
    type: "password",
    defaultValue: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "lock",
      size: 16
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--sp-4)'
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "Recordarme",
    checked: recordar,
    onChange: e => setRecordar(e.target.checked)
  }), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      fontSize: 'var(--fs-2xs)'
    }
  }, "Olvid\xE9 mi contrase\xF1a")), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    fullWidth: true,
    onClick: onEntrar
  }, "Ingresar")))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-inverse)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 'var(--sp-5)',
      padding: 'var(--sp-16)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-3xs)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--gold-300)'
    }
  }, "Quincena del 16 al 31 de agosto"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-3xl)',
      lineHeight: 'var(--lh-snug)',
      letterSpacing: 'var(--ls-display)',
      textTransform: 'uppercase',
      color: 'var(--text-on-dark)',
      maxWidth: '20ch'
    }
  }, "Tu negocio, tus n\xFAmeros, en un solo lugar"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-sm)',
      lineHeight: 'var(--lh-relaxed)',
      color: 'var(--n-300)',
      maxWidth: '38ch'
    }
  }, "Registra pedidos, sigue tus comisiones y acompa\xF1a a los socios que patrocinas.")));
}
Object.assign(window, {
  Login
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/panel/Login.jsx", error: String((e && e.message) || e) }); }

// ui_kits/panel/Shell.jsx
try { (() => {
const {
  Logo,
  SidebarNav,
  Icon,
  Avatar,
  IconButton,
  Badge
} = window.MaxGlobalDesignSystem_db9172;
function PanelShell({
  vista,
  onVista,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '248px 1fr',
      minHeight: '100vh',
      background: 'var(--surface-sunken)'
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      background: 'var(--surface-card)',
      borderRight: '1px solid var(--border-subtle)',
      padding: 'var(--sp-5) var(--sp-4)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 var(--sp-2) var(--sp-4)'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "horizontal-color",
    height: 26
  })), /*#__PURE__*/React.createElement(SidebarNav, {
    value: vista,
    onChange: onVista,
    items: [{
      section: 'Mi negocio'
    }, {
      value: 'inicio',
      label: 'Inicio',
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "home",
        size: 18
      })
    }, {
      value: 'pedidos',
      label: 'Pedidos',
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "package",
        size: 18
      }),
      badge: 3
    }, {
      value: 'nuevo',
      label: 'Nuevo pedido',
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "plus-circle",
        size: 18
      })
    }, {
      section: 'Mi red'
    }, {
      value: 'red',
      label: 'Socios',
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "users",
        size: 18
      })
    }, {
      value: 'comisiones',
      label: 'Comisiones',
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "wallet",
        size: 18
      })
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 'var(--sp-5)',
      borderTop: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--sp-3)'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Rosa Quispe",
    tone: "green"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-xs)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--text-strong)'
    }
  }, "Rosa Quispe"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-3xs)',
      color: 'var(--text-muted)'
    }
  }, "Socia oro \xB7 Trujillo")))), /*#__PURE__*/React.createElement("main", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      height: 68,
      flex: '0 0 auto',
      background: 'var(--surface-card)',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--sp-4)',
      padding: '0 var(--sp-8)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-subtitle)',
      fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--fs-md)',
      color: 'var(--text-strong)'
    }
  }, {
    inicio: 'Inicio',
    pedidos: 'Pedidos',
    nuevo: 'Nuevo pedido',
    red: 'Mi red de socios',
    comisiones: 'Comisiones'
  }[vista]), /*#__PURE__*/React.createElement(Badge, {
    tone: "green",
    dot: true,
    style: {
      marginLeft: 'var(--sp-2)'
    }
  }, "Quincena abierta"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--sp-2)'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "Buscar"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 18
  })), /*#__PURE__*/React.createElement(IconButton, {
    label: "Avisos"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 18
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: 'var(--sp-8)',
      minWidth: 0
    }
  }, children)));
}
Object.assign(window, {
  PanelShell
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/panel/Shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/panel/Vistas.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  StatCard,
  DataTable,
  Card,
  Badge,
  Avatar,
  Button,
  ProgressBar,
  Icon,
  Tabs,
  Tag,
  ProductCard,
  Input,
  Select,
  Textarea,
  Switch,
  Breadcrumb
} = window.MaxGlobalDesignSystem_db9172;
function Inicio({
  onVista
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 'var(--sp-4)'
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "Comisi\xF3n quincenal",
    value: "S/ 2,410",
    delta: "12%",
    caption: "vs. anterior",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "wallet",
      size: 18
    })
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Pedidos",
    value: "38",
    delta: "4%",
    deltaTone: "down",
    caption: "este mes",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "package",
      size: 18
    })
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Socios activos",
    value: "17",
    delta: "2",
    caption: "nuevos",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "users",
      size: 18
    })
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Volumen de red",
    value: "S/ 18,940",
    delta: "9%",
    caption: "agosto",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "trending-up",
      size: 18
    })
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.6fr 1fr',
      gap: 'var(--sp-4)'
    }
  }, /*#__PURE__*/React.createElement(DataTable, {
    caption: "\xDAltimos pedidos",
    columns: [{
      key: 'cliente',
      label: 'Cliente'
    }, {
      key: 'prod',
      label: 'Productos'
    }, {
      key: 'estado',
      label: 'Estado'
    }, {
      key: 'total',
      label: 'Total',
      align: 'right'
    }],
    rows: [{
      cliente: /*#__PURE__*/React.createElement(Cli, {
        n: "Rosa Quispe"
      }),
      prod: 'Moringa · Colágeno',
      estado: /*#__PURE__*/React.createElement(Badge, {
        tone: "green",
        dot: true
      }, "Enviado"),
      total: 'S/ 178.00'
    }, {
      cliente: /*#__PURE__*/React.createElement(Cli, {
        n: "Luis Vargas"
      }),
      prod: 'Café Max 3 u.',
      estado: /*#__PURE__*/React.createElement(Badge, {
        tone: "warning"
      }, "Por pagar"),
      total: 'S/ 96.00'
    }, {
      cliente: /*#__PURE__*/React.createElement(Cli, {
        n: "Ana Torres"
      }),
      prod: 'Aceite de coco',
      estado: /*#__PURE__*/React.createElement(Badge, {
        tone: "neutral"
      }, "Preparando"),
      total: 'S/ 45.00'
    }, {
      cliente: /*#__PURE__*/React.createElement(Cli, {
        n: "Mario Ruiz"
      }),
      prod: 'Moringa en polvo',
      estado: /*#__PURE__*/React.createElement(Badge, {
        tone: "green",
        dot: true
      }, "Entregado"),
      total: 'S/ 65.00'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-4)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-5)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--fs-sm)',
      color: 'var(--text-strong)'
    }
  }, "Camino al siguiente rango"), /*#__PURE__*/React.createElement(ProgressBar, {
    label: "Volumen personal",
    caption: "S/ 3,200 de S/ 5,000",
    value: 3200,
    max: 5000
  }), /*#__PURE__*/React.createElement(ProgressBar, {
    label: "Socios patrocinados",
    caption: "Meta cumplida",
    value: 100,
    tone: "green"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    onClick: () => onVista('comisiones'),
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 16
    })
  }, "Ver detalle")), /*#__PURE__*/React.createElement(Card, {
    variant: "gold",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-2)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-subtitle)',
      fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--fs-md)',
      color: 'var(--gold-800)'
    }
  }, "Cierre de quincena"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-sm)',
      lineHeight: 'var(--lh-normal)',
      color: 'var(--gold-700)'
    }
  }, "Tienes hasta el 31 a las 6 p.m. para registrar pedidos de esta quincena.")))));
}
function Cli({
  n
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--sp-3)'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: n,
    size: "sm"
  }), n);
}
function Pedidos() {
  const [tab, setTab] = React.useState('todos');
  const todas = [{
    id: '#4821',
    cliente: 'Rosa Quispe',
    fecha: '28 ago',
    estado: 'Enviado',
    tono: 'green',
    total: 'S/ 178.00'
  }, {
    id: '#4820',
    cliente: 'Luis Vargas',
    fecha: '28 ago',
    estado: 'Por pagar',
    tono: 'warning',
    total: 'S/ 96.00'
  }, {
    id: '#4816',
    cliente: 'Ana Torres',
    fecha: '27 ago',
    estado: 'Preparando',
    tono: 'neutral',
    total: 'S/ 45.00'
  }, {
    id: '#4811',
    cliente: 'Mario Ruiz',
    fecha: '26 ago',
    estado: 'Entregado',
    tono: 'green',
    total: 'S/ 65.00'
  }, {
    id: '#4802',
    cliente: 'Julia Mendoza',
    fecha: '25 ago',
    estado: 'Anulado',
    tono: 'danger',
    total: 'S/ 119.00'
  }];
  const filtradas = tab === 'todos' ? todas : todas.filter(p => tab === 'pendientes' ? ['Por pagar', 'Preparando'].includes(p.estado) : p.estado === 'Entregado');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-5)'
    }
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    items: [{
      label: 'Mi negocio'
    }, {
      label: 'Pedidos'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--sp-4)'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    value: tab,
    onChange: setTab,
    items: [{
      value: 'todos',
      label: 'Todos',
      count: todas.length
    }, {
      value: 'pendientes',
      label: 'Pendientes'
    }, {
      value: 'entregados',
      label: 'Entregados'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      width: 260
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Buscar por cliente o c\xF3digo",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 16
    })
  }))), /*#__PURE__*/React.createElement(DataTable, {
    columns: [{
      key: 'id',
      label: 'Pedido'
    }, {
      key: 'cliente',
      label: 'Cliente'
    }, {
      key: 'fecha',
      label: 'Fecha'
    }, {
      key: 'estado',
      label: 'Estado'
    }, {
      key: 'total',
      label: 'Total',
      align: 'right'
    }],
    rows: filtradas.map(p => ({
      id: /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--fs-xs)',
          color: 'var(--text-strong)'
        }
      }, p.id),
      cliente: /*#__PURE__*/React.createElement(Cli, {
        n: p.cliente
      }),
      fecha: p.fecha,
      estado: /*#__PURE__*/React.createElement(Badge, {
        tone: p.tono,
        dot: p.tono === 'green'
      }, p.estado),
      total: /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 'var(--fw-bold)',
          color: 'var(--text-strong)'
        }
      }, p.total)
    }))
  }));
}
function NuevoPedido({
  onConfirmar
}) {
  const [carrito, setCarrito] = React.useState([{
    name: 'Moringa en cápsulas',
    price: 89,
    qty: 1
  }]);
  const productos = [{
    family: 'Moringa',
    name: 'Moringa en cápsulas',
    price: 'S/ 89.00',
    unit: 'frasco de 60',
    num: 89
  }, {
    family: 'Café',
    name: 'Café Max con ganoderma',
    price: 'S/ 39.00',
    unit: 'caja de 20',
    num: 39
  }, {
    family: 'Colágeno',
    name: 'Colágeno hidrolizado',
    price: 'S/ 119.00',
    unit: 'bolsa de 300 g',
    num: 119
  }];
  const total = carrito.reduce((s, i) => s + i.price * i.qty, 0);
  const agregar = p => setCarrito(c => {
    const ex = c.find(i => i.name === p.name);
    return ex ? c.map(i => i.name === p.name ? {
      ...i,
      qty: i.qty + 1
    } : i) : [...c, {
      name: p.name,
      price: p.num,
      qty: 1
    }];
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 360px',
      gap: 'var(--sp-6)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--sp-2)'
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    selected: true
  }, "Todo"), /*#__PURE__*/React.createElement(Tag, null, "Moringa"), /*#__PURE__*/React.createElement(Tag, null, "Caf\xE9"), /*#__PURE__*/React.createElement(Tag, null, "Col\xE1geno"), /*#__PURE__*/React.createElement(Tag, null, "Aceites")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'var(--sp-4)'
    }
  }, productos.map(p => /*#__PURE__*/React.createElement(ProductCard, _extends({
    key: p.name
  }, p, {
    onAdd: () => agregar(p)
  }))))), /*#__PURE__*/React.createElement(Card, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-4)',
      position: 'sticky',
      top: 'var(--sp-6)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-subtitle)',
      fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--fs-md)',
      color: 'var(--text-strong)'
    }
  }, "Pedido en curso"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-3)'
    }
  }, carrito.map(i => /*#__PURE__*/React.createElement("div", {
    key: i.name,
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 'var(--sp-3)',
      fontSize: 'var(--fs-sm)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-2xs)'
    }
  }, i.qty, "\xD7"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      color: 'var(--text-body)'
    }
  }, i.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--fw-bold)',
      color: 'var(--text-strong)'
    }
  }, "S/ ", (i.price * i.qty).toFixed(2))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border-subtle)',
      paddingTop: 'var(--sp-4)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-4)'
    }
  }, /*#__PURE__*/React.createElement(Select, {
    label: "Cliente",
    placeholder: "Elige o crea",
    options: [{
      value: 'rosa',
      label: 'Rosa Quispe'
    }, {
      value: 'luis',
      label: 'Luis Vargas'
    }]
  }), /*#__PURE__*/React.createElement(Textarea, {
    label: "Nota para el reparto",
    rows: 2,
    placeholder: "Referencia de la direcci\xF3n"
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "Cobrar al entregar",
    checked: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      borderTop: '1px solid var(--border-subtle)',
      paddingTop: 'var(--sp-4)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-2xs)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "Total"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-2xl)',
      letterSpacing: 'var(--ls-display)',
      color: 'var(--text-strong)'
    }
  }, "S/ ", total.toFixed(2))), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    fullWidth: true,
    variant: "secondary",
    onClick: onConfirmar
  }, "Confirmar pedido")));
}
function Red() {
  const socios = [['Ana Torres', 'Directa', 'Socia plata', 'S/ 3,120', 'green'], ['Mario Ruiz', 'Directa', 'Socio bronce', 'S/ 1,480', 'green'], ['Julia Mendoza', 'Nivel 2', 'Socia bronce', 'S/ 940', 'neutral'], ['Carlos Ríos', 'Nivel 2', 'Socio inicial', 'S/ 320', 'warning']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'var(--sp-4)'
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "Socios directos",
    value: "6",
    delta: "1",
    caption: "este mes",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "user-plus",
      size: 18
    })
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Red total",
    value: "17",
    caption: "dos niveles",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "users",
      size: 18
    })
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Volumen de red",
    value: "S/ 18,940",
    delta: "9%",
    caption: "agosto",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "trending-up",
      size: 18
    })
  })), /*#__PURE__*/React.createElement(DataTable, {
    caption: "Socios que patrocinas",
    columns: [{
      key: 'n',
      label: 'Socio'
    }, {
      key: 'rel',
      label: 'Relación'
    }, {
      key: 'rango',
      label: 'Rango'
    }, {
      key: 'vol',
      label: 'Volumen',
      align: 'right'
    }, {
      key: 'est',
      label: 'Actividad'
    }],
    rows: socios.map(([n, rel, rango, vol, tono]) => ({
      n: /*#__PURE__*/React.createElement(Cli, {
        n: n
      }),
      rel,
      rango: /*#__PURE__*/React.createElement(Badge, {
        tone: "gold"
      }, rango),
      vol: /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 'var(--fw-bold)',
          color: 'var(--text-strong)'
        }
      }, vol),
      est: /*#__PURE__*/React.createElement(Badge, {
        tone: tono,
        dot: tono === 'green'
      }, tono === 'green' ? 'Activo' : tono === 'warning' ? 'Bajo' : 'Sin ventas')
    }))
  }));
}
function Comisiones() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'var(--sp-4)'
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "Por liquidar",
    value: "S/ 2,410",
    caption: "quincena en curso",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "wallet",
      size: 18
    })
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Pagado en agosto",
    value: "S/ 4,820",
    delta: "12%",
    caption: "vs. julio",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "banknote",
      size: 18
    })
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Comisi\xF3n de red",
    value: "S/ 1,190",
    delta: "9%",
    caption: "dos niveles",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "share-2",
      size: 18
    })
  })), /*#__PURE__*/React.createElement(DataTable, {
    caption: "Liquidaciones",
    columns: [{
      key: 'per',
      label: 'Periodo'
    }, {
      key: 'ped',
      label: 'Pedidos',
      align: 'center'
    }, {
      key: 'propia',
      label: 'Venta propia',
      align: 'right'
    }, {
      key: 'red',
      label: 'Red',
      align: 'right'
    }, {
      key: 'est',
      label: 'Estado'
    }],
    rows: [{
      per: '16–31 ago',
      ped: 18,
      propia: 'S/ 1,220',
      red: 'S/ 1,190',
      est: /*#__PURE__*/React.createElement(Badge, {
        tone: "warning"
      }, "Por liquidar")
    }, {
      per: '01–15 ago',
      ped: 20,
      propia: 'S/ 1,640',
      red: 'S/ 1,080',
      est: /*#__PURE__*/React.createElement(Badge, {
        tone: "green",
        dot: true
      }, "Pagada")
    }, {
      per: '16–31 jul',
      ped: 15,
      propia: 'S/ 1,180',
      red: 'S/ 820',
      est: /*#__PURE__*/React.createElement(Badge, {
        tone: "green",
        dot: true
      }, "Pagada")
    }]
  }));
}
Object.assign(window, {
  Inicio,
  Pedidos,
  NuevoPedido,
  Red,
  Comisiones
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/panel/Vistas.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/Catalogo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  ProductCard,
  Tag,
  Button,
  Icon
} = window.MaxGlobalDesignSystem_db9172;
const PRODUCTOS = [{
  family: 'Moringa',
  name: 'Moringa en cápsulas',
  price: 'S/ 89.00',
  unit: 'frasco de 60',
  badge: 'Más vendido'
}, {
  family: 'Café',
  name: 'Café Max con ganoderma',
  price: 'S/ 39.00',
  unit: 'caja de 20 sobres'
}, {
  family: 'Colágeno',
  name: 'Colágeno hidrolizado',
  price: 'S/ 119.00',
  unit: 'bolsa de 300 g',
  badge: 'Nuevo'
}, {
  family: 'Aceites',
  name: 'Aceite de coco extra virgen',
  price: 'S/ 45.00',
  unit: 'frasco de 500 ml'
}, {
  family: 'Moringa',
  name: 'Moringa en polvo',
  price: 'S/ 65.00',
  unit: 'bolsa de 250 g'
}, {
  family: 'Aceites',
  name: 'Aceite de sacha inchi',
  price: 'S/ 58.00',
  unit: 'frasco de 250 ml'
}];
function Catalogo({
  onAdd
}) {
  const [filtro, setFiltro] = React.useState('Todo');
  const familias = ['Todo', 'Moringa', 'Café', 'Colágeno', 'Aceites'];
  const visibles = filtro === 'Todo' ? PRODUCTOS : PRODUCTOS.filter(p => p.family === filtro);
  return /*#__PURE__*/React.createElement("section", {
    id: "productos",
    style: {
      background: 'var(--surface-sunken)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--page-max)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--page-pad-desktop)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 'var(--sp-8)',
      marginBottom: 'var(--sp-8)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-3)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mg-eyebrow"
  }, "Cat\xE1logo"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-3xl)',
      letterSpacing: 'var(--ls-display)',
      textTransform: 'uppercase',
      color: 'var(--text-strong)',
      margin: 0
    }
  }, "Cuatro familias, un mismo est\xE1ndar")), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 16
    })
  }, "Ver cat\xE1logo completo")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--sp-2)',
      marginBottom: 'var(--sp-6)'
    }
  }, familias.map(f => /*#__PURE__*/React.createElement(Tag, {
    key: f,
    selected: filtro === f,
    onClick: () => setFiltro(f)
  }, f))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'var(--sp-5)'
    }
  }, visibles.map(p => /*#__PURE__*/React.createElement(ProductCard, _extends({
    key: p.name
  }, p, {
    onAdd: () => onAdd && onAdd(p)
  }))))));
}
Object.assign(window, {
  Catalogo,
  PRODUCTOS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/Catalogo.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/Header.jsx
try { (() => {
const {
  Button,
  Logo,
  Icon
} = window.MaxGlobalDesignSystem_db9172;
function SiteHeader({
  onNav
}) {
  const links = ['Productos', 'Cómo funciona', 'Ser socio', 'Contacto'];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 30,
      background: 'var(--glass-bg)',
      backdropFilter: 'var(--glass-blur)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--page-max)',
      margin: '0 auto',
      padding: '0 var(--page-pad-desktop)',
      height: 76,
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--sp-8)',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "horizontal-color",
    height: 30
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 'var(--sp-6)',
      marginLeft: 'var(--sp-6)',
      minWidth: 0,
      overflow: 'hidden'
    }
  }, links.map(l => /*#__PURE__*/React.createElement("button", {
    key: l,
    onClick: () => onNav && onNav(l),
    style: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-sm)',
      color: 'var(--text-body)',
      padding: 0
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--sp-3)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "user",
      size: 16
    }),
    onClick: () => onNav && onNav('panel')
  }, "Panel de socios"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm"
  }, "Quiero ser socio"))));
}
function SiteFooter() {
  const cols = [{
    t: 'Productos',
    items: ['Moringa', 'Café', 'Colágeno', 'Aceites']
  }, {
    t: 'Red de socios',
    items: ['Cómo empezar', 'Plan de compensación', 'Panel de socios']
  }, {
    t: 'Empresa',
    items: ['Quiénes somos', 'Certificaciones', 'Contacto']
  }];
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--surface-inverse)',
      color: 'var(--text-on-dark)',
      paddingTop: 'var(--sp-16)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--page-max)',
      margin: '0 auto',
      padding: '0 var(--page-pad-desktop)',
      display: 'grid',
      gridTemplateColumns: '1.4fr repeat(3, 1fr)',
      gap: 'var(--sp-10)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-4)'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "horizontal-blanco",
    height: 28
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-sm)',
      lineHeight: 'var(--lh-relaxed)',
      opacity: .72,
      maxWidth: '30ch'
    }
  }, "Productos naturales de salud y cosm\xE9tica, de persona a persona, en todo el Per\xFA.")), cols.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.t,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-3)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-3xs)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--gold-300)'
    }
  }, c.t), c.items.map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      fontSize: 'var(--fs-sm)',
      opacity: .72
    }
  }, i))))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--page-max)',
      margin: 'var(--sp-12) auto 0',
      padding: 'var(--sp-6) var(--page-pad-desktop)',
      borderTop: '1px solid rgba(255,255,255,.12)',
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 'var(--fs-2xs)',
      opacity: .55
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Max Global Corporation"), /*#__PURE__*/React.createElement("span", null, "Lima, Per\xFA")));
}
Object.assign(window, {
  SiteHeader,
  SiteFooter
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/Hero.jsx
try { (() => {
const {
  Button,
  Icon,
  Badge
} = window.MaxGlobalDesignSystem_db9172;
function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'linear-gradient(180deg, var(--gold-50) 0%, var(--n-0) 100%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--page-max)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--page-pad-desktop)',
      display: 'grid',
      gridTemplateColumns: '1.05fr .95fr',
      gap: 'var(--sp-16)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-5)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mg-eyebrow"
  }, "Salud natural \xB7 Per\xFA"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-5xl)',
      lineHeight: 'var(--lh-tight)',
      letterSpacing: 'var(--ls-display)',
      textTransform: 'uppercase',
      color: 'var(--text-strong)',
      margin: 0
    }
  }, "Lo natural llega mejor de mano de alguien"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-md)',
      lineHeight: 'var(--lh-relaxed)',
      color: 'var(--text-body)',
      maxWidth: '46ch'
    }
  }, "Moringa, caf\xE9, col\xE1geno y aceites que puedes tomar todos los d\xEDas. No los encuentras en tiendas: te los lleva un socio distribuidor que responde por lo que vende."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--sp-3)',
      marginTop: 'var(--sp-2)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 18
    })
  }, "Quiero ser socio"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "outline"
  }, "Ver productos")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--sp-6)',
      marginTop: 'var(--sp-4)'
    }
  }, [['Socios activos', '4,200+'], ['Ciudades', '38'], ['Años en Perú', '11']].map(([l, v]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-xl)',
      letterSpacing: 'var(--ls-display)',
      color: 'var(--text-strong)'
    }
  }, v), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-2xs)',
      color: 'var(--text-muted)'
    }
  }, l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '4 / 5',
      borderRadius: 'var(--r-xl)',
      background: 'var(--gold-100)',
      border: '1px solid var(--border-gold)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-2xs)',
      letterSpacing: 'var(--ls-wide)',
      textTransform: 'uppercase',
      color: 'var(--gold-600)'
    }
  }, "Foto de marca \u2014 pendiente de entrega"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 'var(--sp-5)',
      left: 'var(--sp-5)'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "solidGreen",
    dot: true
  }, "Registro sanitario DIGEMID")))));
}
function Beneficios() {
  const items = [['leaf', 'Fórmulas de origen natural', 'Materia prima peruana y andina, sin colorantes ni saborizantes añadidos.'], ['badge-check', 'Registro sanitario vigente', 'Cada lote llega con su código de registro y fecha de vencimiento visible.'], ['truck', 'Reparto en 24–48 h', 'Lima al día siguiente; provincias por agencia, con seguimiento.'], ['users', 'Un socio que responde', 'Detrás de cada pedido hay una persona con nombre, no un formulario.']];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--page-max)',
      margin: '0 auto',
      padding: 'var(--section-y-tight) var(--page-pad-desktop)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 'var(--sp-5)'
    }
  }, items.map(([icon, t, d]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-3)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 'var(--r-pill)',
      background: 'var(--surface-gold)',
      color: 'var(--gold-600)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 22
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-subtitle)',
      fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--fs-md)',
      color: 'var(--text-strong)',
      lineHeight: 'var(--lh-snug)'
    }
  }, t), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-sm)',
      lineHeight: 'var(--lh-normal)',
      color: 'var(--text-muted)'
    }
  }, d)))));
}
Object.assign(window, {
  Hero,
  Beneficios
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/SerSocio.jsx
try { (() => {
const {
  Button,
  Card,
  Icon,
  Badge,
  Input,
  Select,
  Checkbox
} = window.MaxGlobalDesignSystem_db9172;
function ComoFunciona() {
  const pasos = [['Te registras con un socio', 'Un socio activo te presenta y te acompaña desde el primer pedido.'], ['Eliges tu paquete inicial', 'Productos para consumir y para mostrar. Sin cuotas mensuales.'], ['Vendes y ganas comisión', 'Cobras al entregar. Tu comisión se liquida cada quincena.']];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--page-max)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--page-pad-desktop)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.25fr',
      gap: 'var(--sp-16)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-4)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mg-eyebrow"
  }, "C\xF3mo funciona"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-3xl)',
      letterSpacing: 'var(--ls-display)',
      textTransform: 'uppercase',
      color: 'var(--text-strong)',
      margin: 0
    }
  }, "Tres pasos para empezar"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-sm)',
      lineHeight: 'var(--lh-relaxed)',
      color: 'var(--text-muted)'
    }
  }, "No necesitas experiencia previa ni local. Necesitas usar el producto y saber contarlo.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-4)'
    }
  }, pasos.map(([t, d], i) => /*#__PURE__*/React.createElement(Card, {
    key: t,
    variant: "flat",
    style: {
      display: 'flex',
      gap: 'var(--sp-5)',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 38,
      flex: '0 0 auto',
      borderRadius: 'var(--r-pill)',
      background: 'var(--brand-gold)',
      color: 'var(--text-on-gold)',
      fontFamily: 'var(--font-display)',
      letterSpacing: 'var(--ls-display)',
      fontSize: 'var(--fs-md)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, i + 1), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-subtitle)',
      fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--fs-md)',
      color: 'var(--text-strong)'
    }
  }, t), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-sm)',
      lineHeight: 'var(--lh-normal)',
      color: 'var(--text-muted)'
    }
  }, d)))))));
}
function Testimonio() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-inverse)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 900,
      margin: '0 auto',
      padding: 'var(--section-y) var(--page-pad-desktop)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-3xs)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--gold-300)'
    }
  }, "Socia desde 2019 \xB7 Trujillo"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-subtitle)',
      fontWeight: 'var(--fw-regular)',
      fontSize: 'var(--fs-xl)',
      lineHeight: 'var(--lh-snug)',
      color: 'var(--text-on-dark)',
      margin: 'var(--sp-5) 0 var(--sp-6)'
    }
  }, "\xABEmpec\xE9 comprando moringa para mi mam\xE1. Hoy tengo catorce clientas fijas y un ingreso que no depend\xEDa de nadie m\xE1s.\xBB"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-sm)',
      color: 'var(--n-300)'
    }
  }, "Rosa Quispe")));
}
function FormularioSocio({
  onSubmit,
  enviado
}) {
  const [acepta, setAcepta] = React.useState(false);
  return /*#__PURE__*/React.createElement("section", {
    id: "ser-socio",
    style: {
      maxWidth: 'var(--page-max)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--page-pad-desktop)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--sp-16)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-4)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mg-eyebrow"
  }, "Ser socio"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-3xl)',
      letterSpacing: 'var(--ls-display)',
      textTransform: 'uppercase',
      color: 'var(--text-strong)',
      margin: 0
    }
  }, "D\xE9janos tus datos y te llamamos"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-md)',
      lineHeight: 'var(--lh-relaxed)',
      color: 'var(--text-body)',
      maxWidth: '40ch'
    }
  }, "Un socio de tu zona te explica el plan, los precios de socio y el paquete con el que conviene empezar."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--sp-2)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "gold"
  }, "Sin cuota mensual"), /*#__PURE__*/React.createElement(Badge, {
    tone: "gold"
  }, "Comisi\xF3n quincenal"), /*#__PURE__*/React.createElement(Badge, {
    tone: "gold"
  }, "Precios de socio"))), /*#__PURE__*/React.createElement(Card, {
    padding: "var(--sp-8)",
    style: {
      boxShadow: 'var(--shadow-md)'
    }
  }, enviado ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-3)',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 'var(--r-pill)',
      background: 'var(--success-soft)',
      color: 'var(--green-600)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 22
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-subtitle)',
      fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--fs-lg)',
      color: 'var(--text-strong)'
    }
  }, "Listo, te escribimos hoy"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-sm)',
      color: 'var(--text-muted)'
    }
  }, "Un socio de tu zona te contacta por WhatsApp en el d\xEDa.")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-4)'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Nombre y apellido",
    placeholder: "Rosa Quispe"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--sp-4)'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Celular",
    placeholder: "999 999 999"
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Departamento",
    placeholder: "Elige uno",
    options: [{
      value: 'lima',
      label: 'Lima'
    }, {
      value: 'la-libertad',
      label: 'La Libertad'
    }, {
      value: 'cusco',
      label: 'Cusco'
    }, {
      value: 'piura',
      label: 'Piura'
    }]
  })), /*#__PURE__*/React.createElement(Select, {
    label: "\xBFQu\xE9 te interesa m\xE1s?",
    placeholder: "Elige una opci\xF3n",
    options: [{
      value: 'consumo',
      label: 'Consumir los productos'
    }, {
      value: 'vender',
      label: 'Vender y ganar comisión'
    }, {
      value: 'ambos',
      label: 'Las dos cosas'
    }]
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Acepto que me contacten por WhatsApp",
    checked: acepta,
    onChange: e => setAcepta(e.target.checked)
  }), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    fullWidth: true,
    disabled: !acepta,
    onClick: onSubmit
  }, "Enviar mis datos")))));
}
Object.assign(window, {
  ComoFunciona,
  Testimonio,
  FormularioSocio
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/SerSocio.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.PackCard = __ds_scope.PackCard;

__ds_ns.PointsBadge = __ds_scope.PointsBadge;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.WhatsAppButton = __ds_scope.WhatsAppButton;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Breadcrumb = __ds_scope.Breadcrumb;

__ds_ns.SidebarNav = __ds_scope.SidebarNav;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
