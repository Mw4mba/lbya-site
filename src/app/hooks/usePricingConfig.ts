import { useState, useEffect } from 'react';
import {
  MCT_PRICING_STRUCTURE,
  MCT_ADD_ON_PRICING,
  BILLING_TERM_MULTIPLIERS,
} from '@/app/lib/pricingCalculator';
import type { MctPackageSlug } from '@/app/content/mctCommercial';
import type { BillingTerm, AddOnId } from '@/app/content/subscriptionFlow';

/**
 * Hook to get current pricing (from localStorage or defaults)
 * Automatically updates when storage changes in other tabs/windows
 */
export function usePricingConfig() {
  const [packagePrices, setPackagePrices] = useState<
    Record<
      MctPackageSlug,
      {
        basePricePerUserMonthly: number;
        setupCost: number;
      }
    >
  >(() => {
    if (typeof window === 'undefined') {
      // SSR fallback
      return Object.entries(MCT_PRICING_STRUCTURE).reduce(
        (acc, [slug, config]) => {
          acc[slug as MctPackageSlug] = {
            basePricePerUserMonthly: config.basePricePerUserMonthly,
            setupCost: config.setupCost,
          };
          return acc;
        },
        {} as Record<
          MctPackageSlug,
          {
            basePricePerUserMonthly: number;
            setupCost: number;
          }
        >
      );
    }

    const saved = localStorage.getItem('mct_package_prices');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fall back to defaults
      }
    }

    return Object.entries(MCT_PRICING_STRUCTURE).reduce(
      (acc, [slug, config]) => {
        acc[slug as MctPackageSlug] = {
          basePricePerUserMonthly: config.basePricePerUserMonthly,
          setupCost: config.setupCost,
        };
        return acc;
      },
      {} as Record<
        MctPackageSlug,
        {
          basePricePerUserMonthly: number;
          setupCost: number;
        }
      >
    );
  });

  const [addOnPrices, setAddOnPrices] = useState<Record<AddOnId, number>>(() => {
    if (typeof window === 'undefined') {
      return { ...MCT_ADD_ON_PRICING };
    }

    const saved = localStorage.getItem('mct_addon_prices');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fall back to defaults
      }
    }
    return { ...MCT_ADD_ON_PRICING };
  });

  const [billingMultipliers, setBillingMultipliers] = useState<Record<BillingTerm, number>>(() => {
    if (typeof window === 'undefined') {
      return { ...BILLING_TERM_MULTIPLIERS };
    }

    const saved = localStorage.getItem('mct_billing_multipliers');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fall back to defaults
      }
    }
    return { ...BILLING_TERM_MULTIPLIERS };
  });

  // Listen for storage changes (updates from other tabs/windows or admin dashboard)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedPrices = localStorage.getItem('mct_package_prices');
      if (savedPrices) {
        try {
          setPackagePrices(JSON.parse(savedPrices));
        } catch {
          // Ignore parse errors
        }
      }

      const savedAddOns = localStorage.getItem('mct_addon_prices');
      if (savedAddOns) {
        try {
          setAddOnPrices(JSON.parse(savedAddOns));
        } catch {
          // Ignore parse errors
        }
      }

      const savedMultipliers = localStorage.getItem('mct_billing_multipliers');
      if (savedMultipliers) {
        try {
          setBillingMultipliers(JSON.parse(savedMultipliers));
        } catch {
          // Ignore parse errors
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return {
    packagePrices,
    addOnPrices,
    billingMultipliers,
  };
}
