/**
 * MCT Pricing Calculator
 * Calculates subscription costs based on package, users, add-ons, and billing term
 */

import type { BillingTerm, AddOnId } from '@/app/content/subscriptionFlow';
import type { MctPackageSlug } from '@/app/content/mctCommercial';

/**
 * Base pricing structure in USD per month
 * Prices are per user for variable-user packages, or flat for enterprise
 */
export const MCT_PRICING_STRUCTURE: Record<MctPackageSlug, {
  basePricePerUserMonthly: number;
  minUsers: number;
  setupCost: number;
  description: string;
}> = {
  basic: {
    basePricePerUserMonthly: 250,
    minUsers: 1,
    setupCost: 1500,
    description: 'Starting price USD 750 / month (3 users baseline)',
  },
  professional: {
    basePricePerUserMonthly: 150,
    minUsers: 1,
    setupCost: 3000,
    description: 'Starting price USD 1,500 / month (10 users baseline)',
  },
  premium: {
    basePricePerUserMonthly: 150,
    minUsers: 1,
    setupCost: 7500,
    description: 'Starting price USD 3,000 / month (20 users baseline)',
  },
  enterprise: {
    basePricePerUserMonthly: 100,
    minUsers: 30,
    setupCost: 10000,
    description: 'Starting price USD 5,000 / month (50+ users baseline)',
  },
};

/**
 * Add-on pricing in USD per month
 */
export const MCT_ADD_ON_PRICING: Record<AddOnId, number> = {
  'advanced-analytics': 200,
  'api-access': 300,
  'custom-document-verification': 150,
  'premium-support': 500,
  'enterprise-onboarding': 2000,
  'multi-country-operations-module': 400,
};

/**
 * Billing term multipliers (annual discount, 3-year commitment discount)
 * monthly = 1x (no discount)
 * annual = 0.9x (10% discount, prepaid for 12 months)
 * three-year = 0.75x (25% discount, prepaid for 36 months)
 */
export const BILLING_TERM_MULTIPLIERS: Record<BillingTerm, number> = {
  monthly: 1.0,
  annual: 0.9,
  'three-year': 0.75,
};

/**
 * Calculate monthly subscription cost before setup
 */
export function calculateMonthlyBaseCost(
  packageSlug: MctPackageSlug,
  userCount: number,
  selectedAddOns: AddOnId[],
  customPricing?: {
    packagePrices?: Record<MctPackageSlug, { basePricePerUserMonthly: number; minUsers: number; setupCost: number; description: string }>;
    addOnPrices?: Record<AddOnId, number>;
  }
): number {
  const packagePricingConfig = customPricing?.packagePrices || MCT_PRICING_STRUCTURE;
  const addOnPricingConfig = customPricing?.addOnPrices || MCT_ADD_ON_PRICING;

  const packagePricing = packagePricingConfig[packageSlug];
  const baseUserCost = packagePricing.basePricePerUserMonthly * Math.max(userCount, packagePricing.minUsers);
  const addOnsCost = selectedAddOns.reduce((sum, addOnId) => sum + addOnPricingConfig[addOnId], 0);
  return baseUserCost + addOnsCost;
}

/**
 * Calculate total subscription cost for a billing term
 */
export function calculateTotalCost(
  packageSlug: MctPackageSlug,
  userCount: number,
  selectedAddOns: AddOnId[],
  billingTerm: BillingTerm,
  customPricing?: {
    packagePrices?: Record<MctPackageSlug, { basePricePerUserMonthly: number; minUsers: number; setupCost: number; description: string }>;
    addOnPrices?: Record<AddOnId, number>;
    billingMultipliers?: Record<BillingTerm, number>;
  }
): {
  monthlyBaseCost: number;
  monthlyAfterDiscount: number;
  billingTermMonths: number;
  billingTermMultiplier: number;
  recurringCost: number;
  setupCost: number;
  totalCost: number;
} {
  const packagePricingConfig = customPricing?.packagePrices || MCT_PRICING_STRUCTURE;
  const billingMultipliersConfig = customPricing?.billingMultipliers || BILLING_TERM_MULTIPLIERS;

  const packagePricing = packagePricingConfig[packageSlug];
  const monthlyBaseCost = calculateMonthlyBaseCost(packageSlug, userCount, selectedAddOns, customPricing);
  const multiplier = billingMultipliersConfig[billingTerm];
  const monthlyAfterDiscount = monthlyBaseCost * multiplier;

  const billingTermMonths = billingTerm === 'monthly' ? 1 : billingTerm === 'annual' ? 12 : 36;
  const recurringCost = monthlyAfterDiscount * billingTermMonths;
  const setupCost = packagePricing.setupCost;
  const totalCost = recurringCost + setupCost;

  return {
    monthlyBaseCost,
    monthlyAfterDiscount,
    billingTermMonths,
    billingTermMultiplier: multiplier,
    recurringCost,
    setupCost,
    totalCost,
  };
}

/**
 * USD to EUR exchange rate
 * Can be updated to reflect current market rates
 */
export const USD_TO_EUR_RATE = 0.92;

/**
 * Convert USD to EUR
 */
export function convertUsdToEur(amountUsd: number): number {
  return amountUsd * USD_TO_EUR_RATE;
}

/**
 * Format currency for display (EUR as primary, USD as indicator)
 */
export function formatCurrency(amountUsd: number, decimals: number = 0): string {
  const amountEur = convertUsdToEur(amountUsd);
  return `EUR ${amountEur.toFixed(decimals)} (USD ${amountUsd.toFixed(decimals)})`;
}

/**
 * Format EUR currency for display with USD indicator
 */
export function formatEUR(amountEur: number, amountUsd?: number, decimals: number = 0): string {
  if (amountUsd !== undefined) {
    return `EUR ${amountEur.toFixed(decimals)} (USD ${amountUsd.toFixed(decimals)})`;
  }
  // If only EUR provided, show just EUR
  return `EUR ${amountEur.toFixed(decimals)}`;
}

/**
 * Format just EUR without indicator
 */
export function formatEUROnly(amountEur: number, decimals: number = 0): string {
  return `EUR ${amountEur.toFixed(decimals)}`;
}

/**
 * Format just USD without indicator (legacy)
 */
export function formatUSDOnly(amountUsd: number, decimals: number = 0): string {
  return `USD ${amountUsd.toFixed(decimals)}`;
}

/**
 * Calculate price per user per month
 */
export function calculatePricePerUserPerMonth(
  packageSlug: MctPackageSlug,
  userCount: number,
  selectedAddOns: AddOnId[],
  billingTerm: BillingTerm,
  customPricing?: {
    packagePrices?: Record<MctPackageSlug, { basePricePerUserMonthly: number; minUsers: number; setupCost: number; description: string }>;
    addOnPrices?: Record<AddOnId, number>;
    billingMultipliers?: Record<BillingTerm, number>;
  }
): number {
  const monthlyAfterDiscount = calculateTotalCost(
    packageSlug,
    userCount,
    selectedAddOns,
    billingTerm,
    customPricing
  ).monthlyAfterDiscount;
  return monthlyAfterDiscount / Math.max(userCount, 1);
}

/**
 * Calculate price breakdown for display
 */
export function getPriceBreakdown(
  packageSlug: MctPackageSlug,
  userCount: number,
  selectedAddOns: AddOnId[],
  billingTerm: BillingTerm,
  customPricing?: {
    packagePrices?: Record<MctPackageSlug, { basePricePerUserMonthly: number; minUsers: number; setupCost: number; description: string }>;
    addOnPrices?: Record<AddOnId, number>;
    billingMultipliers?: Record<BillingTerm, number>;
  }
): {
  baseUserCostMonthly: number;
  addOnsCostMonthly: number;
  totalMonthlyBefore: number;
  discountPercent: number;
  totalMonthlyAfter: number;
  totalForBillingTerm: number;
  setupCost: number;
  grandTotal: number;
} {
  const packagePricingConfig = customPricing?.packagePrices || MCT_PRICING_STRUCTURE;
  const addOnPricingConfig = customPricing?.addOnPrices || MCT_ADD_ON_PRICING;
  const billingMultipliersConfig = customPricing?.billingMultipliers || BILLING_TERM_MULTIPLIERS;

  const packagePricing = packagePricingConfig[packageSlug];
  const effectiveUserCount = Math.max(userCount, packagePricing.minUsers);
  const baseUserCostMonthly = packagePricing.basePricePerUserMonthly * effectiveUserCount;
  const addOnsCostMonthly = selectedAddOns.reduce((sum, addOnId) => sum + addOnPricingConfig[addOnId], 0);
  const totalMonthlyBefore = baseUserCostMonthly + addOnsCostMonthly;
  const multiplier = billingMultipliersConfig[billingTerm];
  const discountPercent = (1 - multiplier) * 100;
  const totalMonthlyAfter = totalMonthlyBefore * multiplier;
  const billingTermMonths = billingTerm === 'monthly' ? 1 : billingTerm === 'annual' ? 12 : 36;
  const totalForBillingTerm = totalMonthlyAfter * billingTermMonths;
  const setupCost = packagePricing.setupCost;
  const grandTotal = totalForBillingTerm + setupCost;

  return {
    baseUserCostMonthly,
    addOnsCostMonthly,
    totalMonthlyBefore,
    discountPercent,
    totalMonthlyAfter,
    totalForBillingTerm,
    setupCost,
    grandTotal,
  };
}
