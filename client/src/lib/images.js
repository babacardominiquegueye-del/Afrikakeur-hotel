// Construit une URL Cloudinary optimisée (f_auto + q_auto:good) pour
// servir la meilleure qualité encodée disponible. Les URLs d'autres
// fournisseurs (Zyrosite, …) sont renvoyées telles quelles.
export function optimizedUrl(url, { width } = {}) {
  if (!url) return '';
  try {
    const u = new URL(url);
    if (!u.hostname.endsWith('cloudinary.com')) return url;
    const parts = u.pathname.split('/');
    const idx = parts.indexOf('upload');
    if (idx === -1) return url;
    let tx = 'f_auto,q_auto:good';
    if (width) tx += `,w_${width},e_sharpen`;
    parts.splice(idx + 1, 0, tx);
    u.pathname = parts.join('/');
    return u.toString();
  } catch {
    return url;
  }
}
