"use client";

import React, { useMemo, useState } from 'react';
import type { BillingTerm, CheckoutRequestPayload } from '@/lib/billing/types';

const PRODUCT_OPTIONS = [
  { productCode: 'NBC_PROFESSIONAL', planCode: 'NBC_PROFESSIONAL_YEARLY', productName: 'NBC Professional' },
  { productCode: 'NBC_ENTERPRISE', planCode: 'NBC_ENTERPRISE_YEARLY', productName: 'NBC Enterprise' },
  { productCode: 'MCT_PROFESSIONAL', planCode: 'MCT_PROFESSIONAL_YEARLY', productName: 'MCT Professional' },
] as const;

type ProductOption = (typeof PRODUCT_OPTIONS)[number];

const TERM_LABELS: Record<BillingTerm, string> = {
  monthly: 'Monthly',
  yearly: 'Yearly',
  three_years: '3 Years',
};

export default function CartPage() {
  const [selected, setSelected] = useState<ProductOption>(PRODUCT_OPTIONS[0]);
  const [billingTerm, setBillingTerm] = useState<BillingTerm>('yearly');
  const [seats, setSeats] = useState(10);
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = useMemo(() => {
    const base = billingTerm === 'monthly' ? 690 : billingTerm === 'yearly' ? 6900 : 18900;
    const seatsCost = Math.max(seats - 1, 0) * (billingTerm === 'monthly' ? 15 : billingTerm === 'yearly' ? 150 : 390);
    return base + seatsCost;
  }, [billingTerm, seats]);

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const payload: CheckoutRequestPayload = {
        productCode: selected.productCode,
        planCode: selected.planCode,
        billingTerm,
        seats,
        customerEmail: email,
        companyName,
        addOns: [],
        successUrl: `${window.location.origin}/checkout/success`,
        cancelUrl: `${window.location.origin}/checkout/cancel`,
      };

      const response = await fetch('/api/billing/create-checkout-session', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const body = (await response.json()) as { checkoutUrl?: string; error?: string };

      if (!response.ok || !body.checkoutUrl) {
        throw new Error(body.error || 'Unable to start checkout');
      }

      window.location.href = body.checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to start checkout');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7FAF7] px-6 py-16">
      <div className="mx-auto max-w-4xl rounded-sm border border-[#DCE3E0] bg-white p-8">
        <h1 className="text-3xl font-light text-[#1F3529]">Cart / checkout summary</h1>
        <p className="mt-3 text-sm leading-7 text-[#37474F]/80">
          LBYA AB checkout is handled through secure Stripe Checkout with card and Stripe Link where available.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <label className="text-sm text-[#1F3529]">
            Product
            <select
              className="mt-2 w-full rounded-sm border border-[#DCE3E0] px-3 py-2"
              value={selected.planCode}
              onChange={(event) => {
                const next = PRODUCT_OPTIONS.find((item) => item.planCode === event.target.value);
                if (next) setSelected(next);
              }}
            >
              {PRODUCT_OPTIONS.map((product) => (
                <option key={product.planCode} value={product.planCode}>
                  {product.productName}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm text-[#1F3529]">
            Billing term
            <select
              className="mt-2 w-full rounded-sm border border-[#DCE3E0] px-3 py-2"
              value={billingTerm}
              onChange={(event) => setBillingTerm(event.target.value as BillingTerm)}
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="three_years">3 years</option>
            </select>
          </label>

          <label className="text-sm text-[#1F3529]">
            Seats / licenses
            <input
              type="number"
              min={1}
              className="mt-2 w-full rounded-sm border border-[#DCE3E0] px-3 py-2"
              value={seats}
              onChange={(event) => setSeats(Math.max(1, Number(event.target.value) || 1))}
            />
          </label>

          <label className="text-sm text-[#1F3529]">
            Company name
            <input
              className="mt-2 w-full rounded-sm border border-[#DCE3E0] px-3 py-2"
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
            />
          </label>

          <label className="text-sm text-[#1F3529] md:col-span-2">
            Billing email
            <input
              type="email"
              required
              className="mt-2 w-full rounded-sm border border-[#DCE3E0] px-3 py-2"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
        </div>

        <div className="mt-8 rounded-sm border border-[#DCE3E0] bg-[#F7FAF7] p-5 text-sm text-[#37474F]">
          <p><strong>Product:</strong> {selected.productName}</p>
          <p><strong>Plan:</strong> {selected.planCode}</p>
          <p><strong>Billing term:</strong> {TERM_LABELS[billingTerm]}</p>
          <p><strong>Seats:</strong> {seats}</p>
          <p><strong>Add-ons:</strong> None</p>
          <p><strong>Subtotal:</strong> €{subtotal.toLocaleString()}</p>
          <p><strong>Discount:</strong> €0</p>
          <p><strong>Tax/VAT:</strong> Calculated by Stripe where applicable</p>
          <p><strong>Total due today:</strong> €{subtotal.toLocaleString()}</p>
          <p><strong>Renewal amount:</strong> €{subtotal.toLocaleString()}</p>
          <p><strong>Renewal date:</strong> After current billing term period</p>
        </div>

        {error && <p className="mt-4 text-sm text-[#991B1B]">{error}</p>}

        <button
          className="mt-8 rounded-sm bg-[#2E7D32] px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
          onClick={handleCheckout}
          disabled={isLoading || !email}
        >
          {isLoading ? 'Redirecting...' : 'Proceed to secure checkout'}
        </button>
      </div>
    </main>
  );
}
