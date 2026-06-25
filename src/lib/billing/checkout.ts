import type Stripe from 'stripe';
import { ADDON_PRICING_EUR, CATALOG_PRICING_EUR, STRIPE_ADDON_PRICE_MAP, STRIPE_PRICE_MAP } from '@/lib/billing/priceMap';
import type { BillingTerm, CheckoutRequestPayload, ProductCode } from '@/lib/billing/types';

const PLAN_CODE_TO_PRODUCT: Record<string, Exclude<ProductCode, 'ADD_ON'>> = {
  MCT_BASIC_MONTHLY: 'MCT_BASIC',
  MCT_BASIC_YEARLY: 'MCT_BASIC',
  MCT_BASIC_THREE_YEARS: 'MCT_BASIC',
  MCT_PROFESSIONAL_MONTHLY: 'MCT_PROFESSIONAL',
  MCT_PROFESSIONAL_YEARLY: 'MCT_PROFESSIONAL',
  MCT_PROFESSIONAL_THREE_YEARS: 'MCT_PROFESSIONAL',
  MCT_ENTERPRISE_MONTHLY: 'MCT_ENTERPRISE',
  MCT_ENTERPRISE_YEARLY: 'MCT_ENTERPRISE',
  MCT_ENTERPRISE_THREE_YEARS: 'MCT_ENTERPRISE',
  NBC_ESSENTIAL_MONTHLY: 'NBC_ESSENTIAL',
  NBC_ESSENTIAL_YEARLY: 'NBC_ESSENTIAL',
  NBC_ESSENTIAL_THREE_YEARS: 'NBC_ESSENTIAL',
  NBC_PROFESSIONAL_MONTHLY: 'NBC_PROFESSIONAL',
  NBC_PROFESSIONAL_YEARLY: 'NBC_PROFESSIONAL',
  NBC_PROFESSIONAL_THREE_YEARS: 'NBC_PROFESSIONAL',
  NBC_ENTERPRISE_MONTHLY: 'NBC_ENTERPRISE',
  NBC_ENTERPRISE_YEARLY: 'NBC_ENTERPRISE',
  NBC_ENTERPRISE_THREE_YEARS: 'NBC_ENTERPRISE',
  NBC_SECURE_OFFLINE_MONTHLY: 'NBC_SECURE_OFFLINE',
  NBC_SECURE_OFFLINE_YEARLY: 'NBC_SECURE_OFFLINE',
  NBC_SECURE_OFFLINE_THREE_YEARS: 'NBC_SECURE_OFFLINE',
};

export function assertCheckoutPayload(input: unknown): CheckoutRequestPayload {
  const payload = input as CheckoutRequestPayload;

  if (!payload || typeof payload !== 'object') {
    throw new Error('Invalid payload');
  }

  if (!payload.customerEmail || !payload.customerEmail.includes('@')) {
    throw new Error('customerEmail is required');
  }

  if (!payload.planCode || !payload.productCode) {
    throw new Error('productCode and planCode are required');
  }

  if (!['monthly', 'yearly', 'three_years'].includes(payload.billingTerm)) {
    throw new Error('Invalid billing term');
  }

  if (!Number.isInteger(payload.seats) || payload.seats < 1 || payload.seats > 10000) {
    throw new Error('Seats must be between 1 and 10000');
  }

  return payload;
}

export function resolveProductCode(planCode: string, productCode: ProductCode): Exclude<ProductCode, 'ADD_ON'> {
  if (productCode === 'ADD_ON') {
    throw new Error('ADD_ON cannot be used as primary product');
  }

  const mapped = PLAN_CODE_TO_PRODUCT[planCode];
  if (!mapped) return productCode;

  if (mapped !== productCode) {
    throw new Error('planCode does not match productCode');
  }

  return mapped;
}

export function resolveStripePriceId(productCode: Exclude<ProductCode, 'ADD_ON'>, billingTerm: BillingTerm): string {
  const priceId = STRIPE_PRICE_MAP[productCode]?.[billingTerm];
  if (!priceId) throw new Error('No Stripe price configured for selected plan');
  return priceId;
}

export function resolveAddOnPriceId(addOnCode: string, billingTerm: BillingTerm): string {
  const priceId = STRIPE_ADDON_PRICE_MAP[addOnCode]?.[billingTerm];
  if (!priceId) {
    throw new Error(`No Stripe add-on price configured for ${addOnCode}`);
  }
  return priceId;
}

export function calculateServerCheckoutSummary(payload: CheckoutRequestPayload): {
  subtotalEur: number;
  renewalEur: number;
  lineItems: Array<Stripe.Checkout.SessionCreateParams.LineItem>;
} {
  const productCode = resolveProductCode(payload.planCode, payload.productCode);
  const termPricing = CATALOG_PRICING_EUR[productCode][payload.billingTerm];

  const base = termPricing.basePriceEur;
  const seatsCost = Math.max(payload.seats - 1, 0) * termPricing.seatPriceEur;

  let addOnTotal = 0;
  const addOnLines: Array<Stripe.Checkout.SessionCreateParams.LineItem> = [];

  for (const addOn of payload.addOns ?? []) {
    if (!addOn.addOnCode || !Number.isInteger(addOn.quantity) || addOn.quantity < 1) {
      throw new Error('Invalid add-on selection');
    }

    const addOnUnit = ADDON_PRICING_EUR[addOn.addOnCode]?.[payload.billingTerm];
    if (typeof addOnUnit !== 'number') {
      throw new Error(`Unsupported add-on ${addOn.addOnCode}`);
    }

    addOnTotal += addOnUnit * addOn.quantity;

    addOnLines.push({
      price: resolveAddOnPriceId(addOn.addOnCode, payload.billingTerm),
      quantity: addOn.quantity,
    });
  }

  const subtotalEur = base + seatsCost + addOnTotal;

  const lineItems: Array<Stripe.Checkout.SessionCreateParams.LineItem> = [
    {
      price: resolveStripePriceId(productCode, payload.billingTerm),
      quantity: payload.seats,
    },
    ...addOnLines,
  ];

  return {
    subtotalEur,
    renewalEur: subtotalEur,
    lineItems,
  };
}

export function mapStripeSubscriptionStatus(status: Stripe.Subscription.Status): string {
  const value = status.toLowerCase();
  if (value === 'trialing') return 'trialing';
  if (value === 'active') return 'active';
  if (value === 'incomplete') return 'incomplete';
  if (value === 'past_due') return 'past_due';
  if (value === 'unpaid') return 'unpaid';
  if (value === 'canceled') return 'canceled';
  if (value === 'paused') return 'paused';
  return 'expired';
}
