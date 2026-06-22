import React from 'react';
import type { PackageTier } from '../content/products';

// No price prop or slot by design: packages show calls to action only (brief section 6).
export default function PackageTierCard({
  tier,
  featured = false,
  ctaHref = '/contact',
}: {
  tier: PackageTier;
  featured?: boolean;
  ctaHref?: string;
}) {
  return (
    <div
      className={`flex flex-col h-full bg-white p-8 rounded-sm shadow-lg hover:shadow-2xl transition-all duration-500 ${
        featured ? 'border-2 border-[#2E7D32]' : 'border border-[#2E7D32]/10'
      }`}
    >
      <h3 className="text-xl font-semibold text-[#2E7D32] mb-2">{tier.name}</h3>
      <p className="text-sm text-[#37474F]/60 mb-4 font-medium">{tier.bestFor}</p>
      <p className="text-[#37474F]/80 leading-relaxed mb-6 font-light">{tier.positioning}</p>

      <ul className="space-y-3 mb-8 flex-1">
        {tier.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3 text-[#37474F]">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#2E7D32] shrink-0" />
            <span className="font-light text-sm leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href={ctaHref}
        className={`mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-sm transition-all ${
          featured
            ? 'bg-[#2E7D32] text-white hover:bg-[#1b5e20] shadow-lg hover:shadow-xl'
            : 'border-2 border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white'
        }`}
      >
        <span>{tier.cta}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </div>
  );
}
