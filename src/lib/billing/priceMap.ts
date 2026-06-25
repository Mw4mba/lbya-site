import type { BillingTerm, ProductCode } from '@/lib/billing/types';

const parseNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const STRIPE_PRICE_MAP: Record<Exclude<ProductCode, 'ADD_ON'>, Record<BillingTerm, string>> = {
  MCT_BASIC: {
    monthly: process.env.STRIPE_PRICE_MCT_BASIC_MONTHLY ?? 'price_mct_basic_monthly',
    yearly: process.env.STRIPE_PRICE_MCT_BASIC_YEARLY ?? 'price_mct_basic_yearly',
    three_years: process.env.STRIPE_PRICE_MCT_BASIC_THREE_YEARS ?? 'price_mct_basic_3years',
  },
  MCT_PROFESSIONAL: {
    monthly: process.env.STRIPE_PRICE_MCT_PROFESSIONAL_MONTHLY ?? 'price_mct_professional_monthly',
    yearly: process.env.STRIPE_PRICE_MCT_PROFESSIONAL_YEARLY ?? 'price_mct_professional_yearly',
    three_years: process.env.STRIPE_PRICE_MCT_PROFESSIONAL_THREE_YEARS ?? 'price_mct_professional_3years',
  },
  MCT_ENTERPRISE: {
    monthly: process.env.STRIPE_PRICE_MCT_ENTERPRISE_MONTHLY ?? 'price_mct_enterprise_monthly',
    yearly: process.env.STRIPE_PRICE_MCT_ENTERPRISE_YEARLY ?? 'price_mct_enterprise_yearly',
    three_years: process.env.STRIPE_PRICE_MCT_ENTERPRISE_THREE_YEARS ?? 'price_mct_enterprise_3years',
  },
  NBC_ESSENTIAL: {
    monthly: process.env.STRIPE_PRICE_NBC_ESSENTIAL_MONTHLY ?? 'price_nbc_essential_monthly',
    yearly: process.env.STRIPE_PRICE_NBC_ESSENTIAL_YEARLY ?? 'price_nbc_essential_yearly',
    three_years: process.env.STRIPE_PRICE_NBC_ESSENTIAL_THREE_YEARS ?? 'price_nbc_essential_3years',
  },
  NBC_PROFESSIONAL: {
    monthly: process.env.STRIPE_PRICE_NBC_PROFESSIONAL_MONTHLY ?? 'price_nbc_professional_monthly',
    yearly: process.env.STRIPE_PRICE_NBC_PROFESSIONAL_YEARLY ?? 'price_nbc_professional_yearly',
    three_years: process.env.STRIPE_PRICE_NBC_PROFESSIONAL_THREE_YEARS ?? 'price_nbc_professional_3years',
  },
  NBC_ENTERPRISE: {
    monthly: process.env.STRIPE_PRICE_NBC_ENTERPRISE_MONTHLY ?? 'price_nbc_enterprise_monthly',
    yearly: process.env.STRIPE_PRICE_NBC_ENTERPRISE_YEARLY ?? 'price_nbc_enterprise_yearly',
    three_years: process.env.STRIPE_PRICE_NBC_ENTERPRISE_THREE_YEARS ?? 'price_nbc_enterprise_3years',
  },
  NBC_SECURE_OFFLINE: {
    monthly: process.env.STRIPE_PRICE_NBC_SECURE_OFFLINE_MONTHLY ?? 'price_nbc_secure_offline_monthly',
    yearly: process.env.STRIPE_PRICE_NBC_SECURE_OFFLINE_YEARLY ?? 'price_nbc_secure_offline_yearly',
    three_years: process.env.STRIPE_PRICE_NBC_SECURE_OFFLINE_THREE_YEARS ?? 'price_nbc_secure_offline_3years',
  },
};

export const STRIPE_ADDON_PRICE_MAP: Record<string, Record<BillingTerm, string>> = {
  NBC_INSIGHT_STUDIO: {
    monthly: process.env.STRIPE_PRICE_ADDON_NBC_INSIGHT_STUDIO_MONTHLY ?? 'price_nbc_insight_studio_monthly',
    yearly: process.env.STRIPE_PRICE_ADDON_NBC_INSIGHT_STUDIO_YEARLY ?? 'price_nbc_insight_studio_yearly',
    three_years: process.env.STRIPE_PRICE_ADDON_NBC_INSIGHT_STUDIO_THREE_YEARS ?? 'price_nbc_insight_studio_3years',
  },
};

export const CATALOG_PRICING_EUR: Record<Exclude<ProductCode, 'ADD_ON'>, Record<BillingTerm, { basePriceEur: number; seatPriceEur: number }>> = {
  MCT_BASIC: {
    monthly: { basePriceEur: parseNumber(process.env.PRICE_MCT_BASIC_MONTHLY, 290), seatPriceEur: parseNumber(process.env.PRICE_MCT_BASIC_MONTHLY_SEAT, 8) },
    yearly: { basePriceEur: parseNumber(process.env.PRICE_MCT_BASIC_YEARLY, 2900), seatPriceEur: parseNumber(process.env.PRICE_MCT_BASIC_YEARLY_SEAT, 80) },
    three_years: { basePriceEur: parseNumber(process.env.PRICE_MCT_BASIC_THREE_YEARS, 7900), seatPriceEur: parseNumber(process.env.PRICE_MCT_BASIC_THREE_YEARS_SEAT, 220) },
  },
  MCT_PROFESSIONAL: {
    monthly: { basePriceEur: parseNumber(process.env.PRICE_MCT_PROFESSIONAL_MONTHLY, 590), seatPriceEur: parseNumber(process.env.PRICE_MCT_PROFESSIONAL_MONTHLY_SEAT, 12) },
    yearly: { basePriceEur: parseNumber(process.env.PRICE_MCT_PROFESSIONAL_YEARLY, 5900), seatPriceEur: parseNumber(process.env.PRICE_MCT_PROFESSIONAL_YEARLY_SEAT, 120) },
    three_years: { basePriceEur: parseNumber(process.env.PRICE_MCT_PROFESSIONAL_THREE_YEARS, 15900), seatPriceEur: parseNumber(process.env.PRICE_MCT_PROFESSIONAL_THREE_YEARS_SEAT, 330) },
  },
  MCT_ENTERPRISE: {
    monthly: { basePriceEur: parseNumber(process.env.PRICE_MCT_ENTERPRISE_MONTHLY, 990), seatPriceEur: parseNumber(process.env.PRICE_MCT_ENTERPRISE_MONTHLY_SEAT, 20) },
    yearly: { basePriceEur: parseNumber(process.env.PRICE_MCT_ENTERPRISE_YEARLY, 9900), seatPriceEur: parseNumber(process.env.PRICE_MCT_ENTERPRISE_YEARLY_SEAT, 200) },
    three_years: { basePriceEur: parseNumber(process.env.PRICE_MCT_ENTERPRISE_THREE_YEARS, 26900), seatPriceEur: parseNumber(process.env.PRICE_MCT_ENTERPRISE_THREE_YEARS_SEAT, 550) },
  },
  NBC_ESSENTIAL: {
    monthly: { basePriceEur: parseNumber(process.env.PRICE_NBC_ESSENTIAL_MONTHLY, 390), seatPriceEur: parseNumber(process.env.PRICE_NBC_ESSENTIAL_MONTHLY_SEAT, 10) },
    yearly: { basePriceEur: parseNumber(process.env.PRICE_NBC_ESSENTIAL_YEARLY, 3900), seatPriceEur: parseNumber(process.env.PRICE_NBC_ESSENTIAL_YEARLY_SEAT, 100) },
    three_years: { basePriceEur: parseNumber(process.env.PRICE_NBC_ESSENTIAL_THREE_YEARS, 10500), seatPriceEur: parseNumber(process.env.PRICE_NBC_ESSENTIAL_THREE_YEARS_SEAT, 260) },
  },
  NBC_PROFESSIONAL: {
    monthly: { basePriceEur: parseNumber(process.env.PRICE_NBC_PROFESSIONAL_MONTHLY, 690), seatPriceEur: parseNumber(process.env.PRICE_NBC_PROFESSIONAL_MONTHLY_SEAT, 15) },
    yearly: { basePriceEur: parseNumber(process.env.PRICE_NBC_PROFESSIONAL_YEARLY, 6900), seatPriceEur: parseNumber(process.env.PRICE_NBC_PROFESSIONAL_YEARLY_SEAT, 150) },
    three_years: { basePriceEur: parseNumber(process.env.PRICE_NBC_PROFESSIONAL_THREE_YEARS, 18900), seatPriceEur: parseNumber(process.env.PRICE_NBC_PROFESSIONAL_THREE_YEARS_SEAT, 390) },
  },
  NBC_ENTERPRISE: {
    monthly: { basePriceEur: parseNumber(process.env.PRICE_NBC_ENTERPRISE_MONTHLY, 1290), seatPriceEur: parseNumber(process.env.PRICE_NBC_ENTERPRISE_MONTHLY_SEAT, 20) },
    yearly: { basePriceEur: parseNumber(process.env.PRICE_NBC_ENTERPRISE_YEARLY, 12900), seatPriceEur: parseNumber(process.env.PRICE_NBC_ENTERPRISE_YEARLY_SEAT, 200) },
    three_years: { basePriceEur: parseNumber(process.env.PRICE_NBC_ENTERPRISE_THREE_YEARS, 34900), seatPriceEur: parseNumber(process.env.PRICE_NBC_ENTERPRISE_THREE_YEARS_SEAT, 550) },
  },
  NBC_SECURE_OFFLINE: {
    monthly: { basePriceEur: parseNumber(process.env.PRICE_NBC_SECURE_OFFLINE_MONTHLY, 0), seatPriceEur: parseNumber(process.env.PRICE_NBC_SECURE_OFFLINE_MONTHLY_SEAT, 0) },
    yearly: { basePriceEur: parseNumber(process.env.PRICE_NBC_SECURE_OFFLINE_YEARLY, 0), seatPriceEur: parseNumber(process.env.PRICE_NBC_SECURE_OFFLINE_YEARLY_SEAT, 0) },
    three_years: { basePriceEur: parseNumber(process.env.PRICE_NBC_SECURE_OFFLINE_THREE_YEARS, 0), seatPriceEur: parseNumber(process.env.PRICE_NBC_SECURE_OFFLINE_THREE_YEARS_SEAT, 0) },
  },
};

export const ADDON_PRICING_EUR: Record<string, Record<BillingTerm, number>> = {
  NBC_INSIGHT_STUDIO: {
    monthly: parseNumber(process.env.PRICE_ADDON_NBC_INSIGHT_STUDIO_MONTHLY, 190),
    yearly: parseNumber(process.env.PRICE_ADDON_NBC_INSIGHT_STUDIO_YEARLY, 1900),
    three_years: parseNumber(process.env.PRICE_ADDON_NBC_INSIGHT_STUDIO_THREE_YEARS, 4900),
  },
};
