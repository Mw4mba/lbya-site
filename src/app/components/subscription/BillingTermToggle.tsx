'use client';

import React from 'react';
import type { BillingTerm } from '@/app/content/subscriptionFlow';
import { BILLING_TERMS } from '@/app/content/subscriptionFlow';

export default function BillingTermToggle({
  value,
  onChange,
}: {
  value: BillingTerm;
  onChange: (value: BillingTerm) => void;
}) {
  return (
    <div className="grid grid-cols-3 overflow-hidden rounded-sm border border-[#DCE3E0] bg-white">
      {BILLING_TERMS.map((term) => {
        const active = term.id === value;
        return (
          <button
            key={term.id}
            onClick={() => onChange(term.id)}
            className={`px-3 py-2 text-sm font-semibold transition-colors ${
              active ? 'bg-[#1F3529] text-white' : 'text-[#37474F] hover:bg-[#F4F7F6]'
            }`}
          >
            {term.label}
          </button>
        );
      })}
    </div>
  );
}
