// Central API config — reads from .env (Astro exposes PUBLIC_* vars)
export const API_BASE =
  (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_API_URL) ||
  'http://localhost:4000';
