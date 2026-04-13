import { API_BASE } from './config.js';

/**
 * Calls POST /api/billing/checkout and redirects the browser to Stripe.
 *
 * @param {'PRO' | 'MAX'} plan
 * @param {string} token  JWT obtained after login/register
 */
export async function startCheckout(plan, token) {
  const origin     = window.location.origin;
  const successUrl = `${origin}/success`;
  const cancelUrl  = `${origin}/cancel`;

  const res = await fetch(`${API_BASE}/api/billing/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ plan, successUrl, cancelUrl }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || data.message || 'Error al iniciar el proceso de pago');
  }

  if (!data.url) {
    throw new Error('El servidor no devolvió una URL de pago');
  }

  // Hard redirect — takes the user to Stripe Checkout
  window.location.href = data.url;
}
