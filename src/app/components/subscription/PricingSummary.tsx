import React from 'react';
import {
  calculateTotalCost,
  getPriceBreakdown,
  formatCurrency,
  calculatePricePerUserPerMonth,
} from '@/app/lib/pricingCalculator';
import type { BillingTerm, AddOnId } from '@/app/content/subscriptionFlow';
import type { MctPackageSlug } from '@/app/content/mctCommercial';

interface PricingSummaryProps {
  packageSlug: MctPackageSlug;
  userCount: number;
  selectedAddOns: AddOnId[];
  billingTerm: BillingTerm;
  locale?: string;
}

export default function PricingSummary({
  packageSlug,
  userCount,
  selectedAddOns,
  billingTerm,
}: PricingSummaryProps) {
  const breakdown = getPriceBreakdown(packageSlug, userCount, selectedAddOns, billingTerm);
  const pricePerUserPerMonth = calculatePricePerUserPerMonth(packageSlug, userCount, selectedAddOns, billingTerm);

  return (
    <div className="rounded-sm border border-[#DCE3E0] bg-[#F4F7F6] p-6 space-y-5">
      <h3 className="text-lg font-semibold text-[#1F3529]">Price breakdown</h3>

      {/* Base user cost */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-[#37474F]/78">
          Base cost ({userCount} user{userCount !== 1 ? 's' : ''})
        </span>
        <span className="font-semibold text-[#1F3529]">{formatCurrency(breakdown.baseUserCostMonthly)}</span>
      </div>

      {/* Add-ons cost */}
      {breakdown.addOnsCostMonthly > 0 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#37474F]/78">Add-ons ({selectedAddOns.length})</span>
          <span className="font-semibold text-[#1F3529]">{formatCurrency(breakdown.addOnsCostMonthly)}</span>
        </div>
      )}

      {/* Monthly subtotal before discount */}
      <div className="border-t border-[#DCE3E0] pt-3 flex items-center justify-between text-sm">
        <span className="text-[#37474F]/72">Monthly subtotal</span>
        <span className="font-semibold text-[#1F3529]">{formatCurrency(breakdown.totalMonthlyBefore)}</span>
      </div>

      {/* Billing term discount */}
      {breakdown.discountPercent > 0 && (
        <div className="flex items-center justify-between text-sm bg-[#E8F5E9] px-3 py-2 rounded-sm">
          <span className="text-[#2E7D32]">
            {billingTerm === 'annual' ? '12-month' : '36-month'} commitment discount ({breakdown.discountPercent.toFixed(0)}%)
          </span>
          <span className="font-semibold text-[#2E7D32]">-{formatCurrency(breakdown.totalMonthlyBefore - breakdown.totalMonthlyAfter)}</span>
        </div>
      )}

      {/* Monthly after discount */}
      <div className="flex items-center justify-between text-base">
        <span className="font-semibold text-[#1F3529]">Monthly ({billingTerm})</span>
        <span className="font-bold text-[#2E7D32]">{formatCurrency(breakdown.totalMonthlyAfter)}</span>
      </div>

      {/* Total for billing term */}
      <div className="border-t border-[#DCE3E0] pt-3 flex items-center justify-between">
        <span className="text-sm text-[#37474F]/72">
          {billingTerm === 'monthly' ? 'Monthly' : billingTerm === 'annual' ? '12-month' : '36-month'} recurring cost
        </span>
        <span className="text-lg font-bold text-[#1F3529]">{formatCurrency(breakdown.totalForBillingTerm)}</span>
      </div>

      {/* Setup cost */}
      {breakdown.setupCost > 0 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#37474F]/72">One-time setup</span>
          <span className="font-semibold text-[#1F3529]">{formatCurrency(breakdown.setupCost)}</span>
        </div>
      )}

      {/* Grand total */}
      <div className="border-2 border-[#2E7D32] bg-white rounded-sm p-4 flex items-center justify-between">
        <span className="font-semibold text-[#1F3529]">Total cost</span>
        <span className="text-2xl font-bold text-[#2E7D32]">{formatCurrency(breakdown.grandTotal)}</span>
      </div>

      {/* Price per user per month */}
      <div className="bg-[#E8F5E9] rounded-sm px-3 py-2 flex items-center justify-between text-sm">
        <span className="text-[#2E7D32]">Price per user per month</span>
        <span className="font-semibold text-[#2E7D32]">{formatCurrency(pricePerUserPerMonth, 2)}</span>
      </div>
    </div>
  );
}
