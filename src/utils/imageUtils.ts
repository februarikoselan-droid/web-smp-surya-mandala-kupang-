/**
 * Image path normalization and error fallback utilities for SMPS Surya Mandala
 */

export const FALLBACK_IMAGE = '/images/hero_smp_surya_mandala_1793208894892.jpg';

export function normalizeImageUrl(url?: string | null): string {
  if (!url) return FALLBACK_IMAGE;
  let cleanUrl = url.trim();
  if (cleanUrl.startsWith('/src/assets/images/')) {
    cleanUrl = cleanUrl.replace('/src/assets/images/', '/images/');
  }
  return cleanUrl;
}

export function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackSrc: string = FALLBACK_IMAGE
) {
  const target = event.currentTarget;
  // If target already attempted fallback, load inline SVG to guarantee never showing broken icon
  if (target.dataset.triedFallback === 'true') {
    target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="%23f5f5f4"><rect width="600" height="400" fill="%23f5f5f4"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="20" fill="%2378716c">SMPS SURYA MANDALA KUPANG</text><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23a8a29e">Dokumentasi Sekolah Rakyat NTT</text></svg>';
    return;
  }
  target.dataset.triedFallback = 'true';
  target.src = fallbackSrc;
}
