'use client';

import React, { useState, useEffect } from 'react';
import {
  MCT_PRICING_STRUCTURE,
  MCT_ADD_ON_PRICING,
  BILLING_TERM_MULTIPLIERS,
  formatCurrency,
  convertUsdToEur,
} from '@/app/lib/pricingCalculator';
import type { MctPackageSlug } from '@/app/content/mctCommercial';
import type { BillingTerm, AddOnId } from '@/app/content/subscriptionFlow';

export default function PricingEditorCard() {
  const [packagePrices, setPackagePrices] = useState<
    Record<
      MctPackageSlug,
      {
        basePricePerUserMonthly: number;
        setupCost: number;
      }
    >
  >(() => {
    // Load from localStorage or use defaults
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

  const [saved, setSaved] = useState(false);

  const handlePackagePriceChange = (packageSlug: MctPackageSlug, field: 'basePricePerUserMonthly' | 'setupCost', value: number) => {
    setPackagePrices((prev) => ({
      ...prev,
      [packageSlug]: {
        ...prev[packageSlug],
        [field]: value,
      },
    }));
    setSaved(false);
  };

  const handleAddOnPriceChange = (addOnId: AddOnId, value: number) => {
    setAddOnPrices((prev) => ({
      ...prev,
      [addOnId]: value,
    }));
    setSaved(false);
  };

  const handleBillingMultiplierChange = (billingTerm: BillingTerm, value: number) => {
    setBillingMultipliers((prev) => ({
      ...prev,
      [billingTerm]: value,
    }));
    setSaved(false);
  };

  const handleSave = async () => {
    localStorage.setItem('mct_package_prices', JSON.stringify(packagePrices));
    localStorage.setItem('mct_addon_prices', JSON.stringify(addOnPrices));
    localStorage.setItem('mct_billing_multipliers', JSON.stringify(billingMultipliers));

    // TODO: Call API to persist to backend
    // await fetch('/api/admin/pricing', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     packagePrices,
    //     addOnPrices,
    //     billingMultipliers,
    //   }),
    // });

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all prices to defaults?')) {
      setPackagePrices(
        Object.entries(MCT_PRICING_STRUCTURE).reduce(
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
        )
      );
      setAddOnPrices({ ...MCT_ADD_ON_PRICING });
      setBillingMultipliers({ ...BILLING_TERM_MULTIPLIERS });
      setSaved(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Package Pricing */}
      <section className="rounded-sm border border-[#DCE3E0] bg-white p-6">
        <h3 className="text-lg font-semibold text-[#1F3529] mb-4">Package Base Pricing</h3>
        <div className="space-y-4">
          {(['basic', 'professional', 'premium', 'enterprise'] as MctPackageSlug[]).map((slug) => (
            <div key={slug} className="border border-[#E3E7E8] rounded-sm p-4 bg-[#F5F8F9]">
              <h4 className="font-semibold text-[#1F3529] capitalize mb-3">{slug}</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-[#37474F] mb-1">
                    Price per user per month
                  </label>
                  <div className="flex items-center gap-2 mb-1">
                    <input
                      type="number"
                      min="0"
                      step="10"
                      value={packagePrices[slug].basePricePerUserMonthly}
                      onChange={(e) =>
                        handlePackagePriceChange(slug, 'basePricePerUserMonthly', parseFloat(e.target.value) || 0)
                      }
                      className="flex-1 rounded-sm border border-[#DCE3E0] px-3 py-2 text-[#1F3529] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                    />
                  </div>
                  <p className="text-xs text-[#37474F]/60">
                    EUR {convertUsdToEur(packagePrices[slug].basePricePerUserMonthly).toFixed(0)} (USD {packagePrices[slug].basePricePerUserMonthly})
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#37474F] mb-1">
                    Setup cost
                  </label>
                  <div className="flex items-center gap-2 mb-1">
                    <input
                      type="number"
                      min="0"
                      step="100"
                      value={packagePrices[slug].setupCost}
                      onChange={(e) =>
                        handlePackagePriceChange(slug, 'setupCost', parseFloat(e.target.value) || 0)
                      }
                      className="flex-1 rounded-sm border border-[#DCE3E0] px-3 py-2 text-[#1F3529] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                    />
                  </div>
                  <p className="text-xs text-[#37474F]/60">
                    EUR {convertUsdToEur(packagePrices[slug].setupCost).toFixed(0)} (USD {packagePrices[slug].setupCost})
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add-on Pricing */}
      <section className="rounded-sm border border-[#DCE3E0] bg-white p-6">
        <h3 className="text-lg font-semibold text-[#1F3529] mb-4">Add-on Monthly Pricing</h3>
        <div className="space-y-3">
          {Object.entries(addOnPrices).map(([addOnId, price]) => (
            <div key={addOnId} className="flex flex-col gap-2 pb-3 border-b border-[#E3E7E8]">
              <div>
                <label className="block text-sm font-medium text-[#37474F] capitalize">
                  {addOnId.replace(/-/g, ' ')}
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  step="10"
                  value={price}
                  onChange={(e) =>
                    handleAddOnPriceChange(addOnId as AddOnId, parseFloat(e.target.value) || 0)
                  }
                  className="flex-1 rounded-sm border border-[#DCE3E0] px-3 py-2 text-[#1F3529] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                />
              </div>
              <p className="text-xs text-[#37474F]/60">
                EUR {convertUsdToEur(price).toFixed(0)} (USD {price})
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Billing Term Multipliers */}
      <section className="rounded-sm border border-[#DCE3E0] bg-white p-6">
        <h3 className="text-lg font-semibold text-[#1F3529] mb-4">Billing Term Discounts</h3>
        <div className="space-y-4">
          {(['monthly', 'annual', 'three-year'] as BillingTerm[]).map((term) => {
            const multiplier = billingMultipliers[term];
            const discountPercent = (1 - multiplier) * 100;
            return (
              <div key={term} className="border border-[#E3E7E8] rounded-sm p-4 bg-[#F5F8F9]">
                <label className="block text-sm font-medium text-[#37474F] mb-2 capitalize">
                  {term === 'monthly' ? 'Monthly (no discount)' : term === 'annual' ? 'Annual (12 months)' : '3-Year (36 months)'}
                </label>
                <div className="flex items-end gap-4">
                  <div className="flex-1">
                    <label className="block text-xs text-[#37474F]/60 mb-1">Multiplier (0.0 - 1.0)</label>
                    <input
                      type="number"
                      min="0"
                      max="1"
                      step="0.05"
                      value={multiplier.toFixed(2)}
                      onChange={(e) =>
                        handleBillingMultiplierChange(term, parseFloat(e.target.value) || 1.0)
                      }
                      className="w-full rounded-sm border border-[#DCE3E0] px-3 py-2 text-[#1F3529] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                    />
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-[#1F3529]">{(multiplier * 100).toFixed(0)}%</div>
                    <div className="text-xs text-[#2E7D32]">{discountPercent > 0 ? `-${discountPercent.toFixed(0)}%` : 'Base'}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Action buttons */}
      <div className="flex gap-3 justify-end">
        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-sm border border-[#DCE3E0] bg-white text-[#1F3529] font-semibold hover:bg-[#F5F8F9] transition"
        >
          Reset to defaults
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-sm bg-[#2E7D32] text-white font-semibold hover:bg-[#27632a] transition"
        >
          {saved ? '✓ Saved' : 'Save Changes'}
        </button>
      </div>

      {/* Info box */}
      <div className="rounded-sm bg-[#E3F2FD] border border-[#90CAF9] p-4 text-sm text-[#1565C0]">
        <strong>Note:</strong> Pricing changes are saved to browser storage. Integrate with backend API to persist these
        changes to your database.
      </div>
    </div>
  );
}
