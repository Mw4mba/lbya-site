import React from 'react';
import type { BillingTerm, SubscriptionPlan } from '@/app/content/subscriptionFlow';

export default function SubscriptionPlanCard({
  plan,
  term,
  href,
}: {
  plan: SubscriptionPlan;
  term: BillingTerm;
  href: string;
}) {
  return (
    <article
      className={`flex min-h-[520px] flex-col rounded-sm border p-6 shadow-[0_20px_60px_rgba(31,53,41,0.08)] ${
        plan.recommended ? 'border-[#2E7D32] bg-[#1F3529] text-white' : 'border-[#DCE3E0] bg-white text-[#1F3529]'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-2xl font-semibold">{plan.name}</h3>
          <p className={`mt-2 text-sm ${plan.recommended ? 'text-white/76' : 'text-[#37474F]/76'}`}>{plan.audience}</p>
        </div>
        {plan.recommended ? <span className="rounded-sm bg-[#A5D6A7] px-2 py-1 text-xs font-semibold text-[#1F3529]">Recommended</span> : null}
      </div>

      <p className={`mt-4 text-sm font-semibold uppercase tracking-[0.1em] ${plan.recommended ? 'text-[#A5D6A7]' : 'text-[#2E7D32]'}`}>
        {plan.users}
      </p>
      <p className={`mt-2 text-2xl font-semibold ${plan.recommended ? 'text-white' : 'text-[#1F3529]'}`}>{plan.placeholderPrice}</p>
      <p className={`mt-1 text-xs ${plan.recommended ? 'text-white/60' : 'text-[#37474F]/62'}`}>Billing term: {term}</p>

      <ul className="mt-6 grid gap-2">
        {plan.features.map((feature) => (
          <li key={feature} className={`flex gap-2 text-sm ${plan.recommended ? 'text-white/82' : 'text-[#37474F]/82'}`}>
            <span className={`mt-2 h-1.5 w-1.5 rounded-full ${plan.recommended ? 'bg-[#A5D6A7]' : 'bg-[#2E7D32]'}`} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href={href}
        className={`mt-auto inline-flex items-center justify-center rounded-sm px-4 py-3 text-sm font-semibold transition-colors ${
          plan.recommended
            ? 'bg-white text-[#1F3529] hover:bg-[#A5D6A7]'
            : plan.quoteOnly
              ? 'border border-[#2E7D32]/34 text-[#2E7D32] hover:bg-[#F4F7F6]'
              : 'bg-[#2E7D32] text-white hover:bg-[#1F5B25]'
        }`}
      >
        {plan.cta}
      </a>
    </article>
  );
}
