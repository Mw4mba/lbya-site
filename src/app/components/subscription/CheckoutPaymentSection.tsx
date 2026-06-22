'use client';

import React, { useState } from 'react';
import type { PlanId } from '@/app/content/subscriptionFlow';

export default function CheckoutPaymentSection({ plan }: { plan: PlanId }) {
  const enterpriseLike = plan === 'enterprise' || plan === 'business';
  const [method, setMethod] = useState('card');

  return (
    <section className="rounded-sm border border-[#DCE3E0] bg-white p-5">
      <h2 className="text-lg font-semibold text-[#1F3529]">Payment method</h2>
      <div className="mt-4 grid gap-2 text-sm text-[#37474F]">
        <label className="flex items-center gap-2 rounded-sm border border-[#DCE3E0] px-3 py-2">
          <input type="radio" name="payment" checked={method === 'card'} onChange={() => setMethod('card')} />
          <span>Card payment</span>
        </label>
        <label className={`flex items-center gap-2 rounded-sm border px-3 py-2 ${enterpriseLike ? 'border-[#DCE3E0]' : 'border-[#ECEFEE] text-[#37474F]/45'}`}>
          <input type="radio" name="payment" disabled={!enterpriseLike} checked={method === 'invoice'} onChange={() => setMethod('invoice')} />
          <span>Bank transfer / invoice request</span>
        </label>
        <label className={`flex items-center gap-2 rounded-sm border px-3 py-2 ${enterpriseLike ? 'border-[#DCE3E0]' : 'border-[#ECEFEE] text-[#37474F]/45'}`}>
          <input type="radio" name="payment" disabled={!enterpriseLike} checked={method === 'quote'} onChange={() => setMethod('quote')} />
          <span>Request quote</span>
        </label>
      </div>
      <p className="mt-3 text-xs leading-5 text-[#37474F]/66">
        Enterprise purchases may require manual approval, invoice setup, or a custom quote.
      </p>
    </section>
  );
}
