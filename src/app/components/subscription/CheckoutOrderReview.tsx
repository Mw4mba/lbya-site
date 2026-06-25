'use client';

import React, { useState } from 'react';
import type { Locale } from '@/app/content/locale';
import type { CheckoutRequestPayload } from '@/lib/billing/types';

type CheckoutOrderReviewProps = {
  locale: Locale;
  checkoutPayload: CheckoutRequestPayload;
  subtotalEur: number;
  renewalEur: number;
};

export default function CheckoutOrderReview({
  locale,
  checkoutPayload,
  subtotalEur,
  renewalEur,
}: CheckoutOrderReviewProps) {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const canSubmit = acceptTerms && acceptPrivacy;

  const handlePlaceOrder = async () => {
    if (!canSubmit) return;
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/billing/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(checkoutPayload),
      });

      const body = (await response.json()) as { checkoutUrl?: string; error?: string };
      if (!response.ok || !body.checkoutUrl) {
        throw new Error(body.error || 'Unable to create secure checkout session');
      }

      window.location.href = body.checkoutUrl;
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to create secure checkout session');
      setIsSubmitting(false);
    }
  };

  return (
    <section className="rounded-sm border border-[#DCE3E0] bg-white p-5">
      <h2 className="text-lg font-semibold text-[#1F3529]">Order review</h2>
      <div className="mt-4 grid gap-1 text-sm text-[#37474F]">
        <div className="flex justify-between"><span>Locale</span><span>{locale.toUpperCase()}</span></div>
        <div className="flex justify-between"><span>Subtotal</span><span>€{subtotalEur.toLocaleString()}</span></div>
        <div className="flex justify-between"><span>VAT/tax</span><span>Calculated in Stripe</span></div>
        <div className="flex justify-between font-semibold text-[#1F3529]"><span>Total due today</span><span>€{subtotalEur.toLocaleString()}</span></div>
        <div className="flex justify-between"><span>Renewal amount</span><span>€{renewalEur.toLocaleString()}</span></div>
      </div>

      <label className="mt-4 flex items-start gap-2 text-xs text-[#37474F]">
        <input type="checkbox" checked={acceptTerms} onChange={(event) => setAcceptTerms(event.target.checked)} />
        <span>I accept the subscription and billing terms.</span>
      </label>
      <label className="mt-2 flex items-start gap-2 text-xs text-[#37474F]">
        <input type="checkbox" checked={acceptPrivacy} onChange={(event) => setAcceptPrivacy(event.target.checked)} />
        <span>I accept the privacy policy and account processing terms.</span>
      </label>

      <button
        onClick={handlePlaceOrder}
        disabled={!canSubmit || isSubmitting}
        className="mt-4 w-full rounded-sm bg-[#2E7D32] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1F5B25] disabled:cursor-not-allowed disabled:bg-[#A7B8AE]"
      >
        {isSubmitting ? 'Redirecting to Stripe...' : 'Proceed to secure checkout'}
      </button>
      {submitError && <p className="mt-3 text-xs text-[#991B1B]">{submitError}</p>}
      <p className="mt-3 text-xs leading-5 text-[#37474F]/66">
        After purchase, you can manage users, billing, invoices, renewal settings, and product access from your LBYA account.
      </p>
    </section>
  );
}
