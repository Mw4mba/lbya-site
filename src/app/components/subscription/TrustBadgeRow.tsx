import React from 'react';

const TRUST_BADGES = [
  'Secure checkout',
  'Invoice-ready',
  'VAT-ready',
  'Enterprise support',
  'User access management',
];

export default function TrustBadgeRow() {
  return (
    <div className="flex flex-wrap gap-2">
      {TRUST_BADGES.map((item) => (
        <span key={item} className="rounded-sm border border-[#DCE3E0] bg-white px-3 py-1.5 text-xs font-semibold text-[#1F3529]">
          {item}
        </span>
      ))}
    </div>
  );
}
