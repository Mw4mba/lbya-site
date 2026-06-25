import type { Locale } from './locale';

export type BillingTerm = 'monthly' | 'annual' | 'three-year';

export type PlanId = 'starter' | 'professional' | 'business' | 'enterprise';

export type AddOnId =
  | 'advanced-analytics'
  | 'api-access'
  | 'custom-document-verification'
  | 'premium-support'
  | 'enterprise-onboarding'
  | 'multi-country-operations-module';

export type SubscriptionPlan = {
  id: PlanId;
  name: string;
  audience: string;
  users: string;
  placeholderPrice: string;
  cta: string;
  recommended?: boolean;
  quoteOnly?: boolean;
  features: string[];
};

export type AddOn = {
  id: AddOnId;
  name: string;
};

export const BILLING_TERMS: Array<{ id: BillingTerm; label: string }> = [
  { id: 'monthly', label: 'Monthly' },
  { id: 'annual', label: 'Annual' },
  { id: 'three-year', label: '3-Year' },
];

export const MCT_SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    audience: 'For small transport teams and early operators',
    users: '1-3 users',
    placeholderPrice: 'From EUR -- / month',
    cta: 'Start with Starter',
    features: [
      'Shipment dashboard',
      'Basic trip tracking',
      'Client and transporter records',
      'Basic document upload',
      'Monthly reports',
      'Email support',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    audience: 'For growing logistics companies',
    users: 'Up to 10 users',
    placeholderPrice: 'From EUR -- / month',
    cta: 'Choose Professional',
    recommended: true,
    features: [
      'Everything in Starter',
      'Transport order management',
      'Driver and truck records',
      'Route and delivery status tracking',
      'Document verification workflow',
      'Basic analytics',
      'Role-based permissions',
      'Priority support',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    audience: 'For established operators and multi-client teams',
    users: 'Up to 30 users',
    placeholderPrice: 'From EUR -- / month',
    cta: 'Choose Business',
    features: [
      'Everything in Professional',
      'Multi-client dashboard',
      'Fleet and transporter performance',
      'Advanced document control',
      'Issue tracking',
      'Finance/order visibility',
      'Custom reports',
      'Team activity logs',
      'API-ready architecture',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    audience: 'For large logistics networks, institutions, and strategic partners',
    users: 'Custom users',
    placeholderPrice: 'Custom',
    cta: 'Contact Sales / Request Quote',
    quoteOnly: true,
    features: [
      'Everything in Business',
      'Multi-branch / multi-country setup',
      'Advanced control tower configuration',
      'Custom workflows',
      'Integration support',
      'Dedicated onboarding',
      'SLA and enterprise support',
      'Invoice/quote-based payment',
    ],
  },
];

export const MCT_ADD_ONS: AddOn[] = [
  { id: 'advanced-analytics', name: 'Advanced Analytics' },
  { id: 'api-access', name: 'API Access' },
  { id: 'custom-document-verification', name: 'Custom Document Verification' },
  { id: 'premium-support', name: 'Premium Support' },
  { id: 'enterprise-onboarding', name: 'Enterprise Onboarding' },
  { id: 'multi-country-operations-module', name: 'Multi-country Operations Module' },
];

export const DEFAULT_CART = {
  product: 'mct',
  plan: 'professional' as PlanId,
  term: 'annual' as BillingTerm,
  seats: 5,
};

export function getPlan(planId: string | undefined): SubscriptionPlan {
  const match = MCT_SUBSCRIPTION_PLANS.find((plan) => plan.id === planId);
  return match ?? MCT_SUBSCRIPTION_PLANS[1];
}

export function getBillingTerm(termId: string | undefined): BillingTerm {
  if (termId === 'monthly' || termId === 'annual' || termId === 'three-year') {
    return termId;
  }
  return DEFAULT_CART.term;
}

export function getCheckoutRedirectPath(locale: Locale) {
  return `/${locale}/cart?product=mct`;
}
