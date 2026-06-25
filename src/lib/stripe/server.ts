import Stripe from 'stripe';

let stripeInstance: Stripe | null = null;

export function getStripeServer(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }

  if (!stripeInstance) {
    stripeInstance = new Stripe(secretKey);
  }

  return stripeInstance;
}

export function getWebhookSecret(): string {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET is not configured');
  }

  return webhookSecret;
}

export function getAppUrl(): string {
  return process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
}

export function getAdminAppUrl(): string {
  return process.env.ADMIN_APP_URL || `${getAppUrl()}/admin`;
}

export function getStripeCurrency(): string {
  return (process.env.STRIPE_CURRENCY || 'eur').toLowerCase();
}
