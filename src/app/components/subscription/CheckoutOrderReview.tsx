'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { localizePath } from '@/app/content/paths';
import type { Locale } from '@/app/content/locale';

export default function CheckoutOrderReview({ locale }: { locale: Locale }) {
  const router = useRouter();
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);

  const canSubmit = acceptTerms && acceptPrivacy;

  const handlePlaceOrder = async () => {
    if (!canSubmit) return;
    await fetch('/api/checkout/session', { method: 'POST' });
    router.push(localizePath(locale, '/account/subscriptions'));
  };

  return (
    <section className="rounded-sm border border-[#DCE3E0] bg-white p-5">
      <h2 className="text-lg font-semibold text-[#1F3529]">Order review</h2>
      <div className="mt-4 grid gap-1 text-sm text-[#37474F]">
        <div className="flex justify-between"><span>Subtotal</span><span>EUR --</span></div>
        <div className="flex justify-between"><span>VAT/tax</span><span>EUR --</span></div>
        <div className="flex justify-between font-semibold text-[#1F3529]"><span>Total</span><span>EUR --</span></div>
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
        disabled={!canSubmit}
        className="mt-4 w-full rounded-sm bg-[#2E7D32] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1F5B25] disabled:cursor-not-allowed disabled:bg-[#A7B8AE]"
      >
        Place order
      </button>
      <p className="mt-3 text-xs leading-5 text-[#37474F]/66">
        After purchase, you can manage users, billing, invoices, renewal settings, and product access from your LBYA account.
      </p>
    </section>
  );
}
