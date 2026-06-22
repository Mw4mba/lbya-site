'use client';

import React from 'react';
import type { BillingTerm, PlanId, AddOnId } from '@/app/content/subscriptionFlow';
import { getPlan } from '@/app/content/subscriptionFlow';
import {
  getPriceBreakdown,
  convertUsdToEur,
  formatEUROnly,
} from '@/app/lib/pricingCalculator';
import type { MctPackageSlug } from '@/app/content/mctCommercial';

// Map old plan IDs to MCT package slugs
const planToPackageMap: Record<PlanId, MctPackageSlug> = {
  starter: 'basic',
  professional: 'professional',
  business: 'premium',
  enterprise: 'enterprise',
};

export default function CartSummary({
  plan,
  term,
  seats,
  addOnLabels,
  addOns = [],
}: {
  plan: PlanId;
  term: BillingTerm;
  seats: number;
  addOnLabels: string[];
  addOns?: AddOnId[];
}) {
  const selectedPlan = getPlan(plan);
  const packageSlug = planToPackageMap[plan];

  // Calculate pricing in USD then convert to EUR
  const breakdown = getPriceBreakdown(
    packageSlug,
    seats,
    addOns,
    term
  );

  const subtotalEur = convertUsdToEur(breakdown.totalForBillingTerm);
  const setupEur = convertUsdToEur(breakdown.setupCost);
  const totalBeforeTaxEur = subtotalEur + setupEur;
  
  // Swedish VAT is 25%
  const vatRate = 0.25;
  const vatAmount = totalBeforeTaxEur * vatRate;
  const totalWithVatEur = totalBeforeTaxEur + vatAmount;

  return (
    <aside className="rounded-sm border border-[#DCE3E0] bg-white p-5">
      <h2 className="text-lg font-semibold text-[#1F3529]">Cart summary</h2>
      <dl className="mt-4 grid gap-2 text-sm text-[#37474F]">
        <div className="flex justify-between gap-4"><dt>Product</dt><dd>MCT - Malaika Control Tower</dd></div>
        <div className="flex justify-between gap-4"><dt>Selected plan</dt><dd>{selectedPlan.name}</dd></div>
        <div className="flex justify-between gap-4"><dt>Billing term</dt><dd>{term === 'monthly' ? 'Monthly' : term === 'annual' ? 'Annual (12 months)' : '3-Year (36 months)'}</dd></div>
        <div className="flex justify-between gap-4"><dt>Seats/users</dt><dd>{seats}</dd></div>
        <div className="grid gap-1"><dt>Optional add-ons</dt><dd>{addOnLabels.length ? addOnLabels.join(', ') : 'None selected'}</dd></div>
      </dl>

      <div className="mt-4 border-t border-[#E4EBE8] pt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-[#37474F]/72">
            {term === 'monthly' ? 'Monthly recurring' : term === 'annual' ? '12-month recurring' : '36-month recurring'}
          </span>
          <span className="font-semibold">{formatEUROnly(subtotalEur)}</span>
        </div>
        
        {setupEur > 0 && (
          <div className="flex justify-between">
            <span className="text-[#37474F]/72">One-time setup fee</span>
            <span className="font-semibold">{formatEUROnly(setupEur)}</span>
          </div>
        )}

        <div className="flex justify-between py-2 border-t border-[#E4EBE8]">
          <span>Subtotal (before tax)</span>
          <span className="font-semibold">{formatEUROnly(totalBeforeTaxEur)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-[#37474F]/72">Swedish VAT (25%)</span>
          <span className="font-semibold text-[#2E7D32]">{formatEUROnly(vatAmount)}</span>
        </div>

        <div className="flex justify-between font-bold text-[#1F3529] text-base pt-2 border-t border-[#E4EBE8]">
          <span>Total due today</span>
          <span className="text-[#2E7D32]">{formatEUROnly(totalWithVatEur)}</span>
        </div>
      </div>

      <div className="mt-4 text-xs text-[#37474F]/60 bg-[#F4F7F6] p-3 rounded-sm">
        Exchange rate: 1 USD = 0.92 EUR (indicative)
      </div>
    </aside>
  );
}
