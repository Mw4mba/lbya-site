import React from 'react';
import type { MatrixRow, PackageTier } from '../content/products';

// Cards-first on mobile, comparison table on larger screens (brief section 7 developer note).
export default function FeatureMatrix({
  rows,
  tiers,
}: {
  rows: MatrixRow[];
  tiers: PackageTier[];
}) {
  const tierNames = tiers.map((t) => t.name);
  // Contract: `tiers` must be supplied in this order (basic -> enterprise). Keys are
  // sliced to the number of tiers so a shorter list never renders undefined cells.
  const tierKeys: (keyof MatrixRow)[] = (['basic', 'professional', 'premium', 'enterprise'] as (keyof MatrixRow)[]).slice(
    0,
    tiers.length
  );

  return (
    <div>
      {/* Table view: medium screens and up */}
      <div className="hidden md:block overflow-x-auto rounded-sm border border-[#2E7D32]/10">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-[#2E7D32] text-white">
              <th className="sticky left-0 bg-[#2E7D32] px-6 py-4 font-semibold text-sm">Feature</th>
              {tierNames.map((name) => (
                <th key={name} className="px-6 py-4 font-semibold text-sm whitespace-nowrap">
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={row.feature} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F5F5DC]/60'}>
                <th
                  scope="row"
                  className={`sticky left-0 px-6 py-4 font-medium text-sm text-[#2E7D32] ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-[#F5F5DC]/60'
                  }`}
                >
                  {row.feature}
                </th>
                {tierKeys.map((key) => (
                  <td key={key} className="px-6 py-4 text-sm text-[#37474F]/80 font-light">
                    {row[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards view: small screens */}
      <div className="md:hidden space-y-8">
        {tiers.map((tier, tierIdx) => (
          <div key={tier.name} className="rounded-sm border border-[#2E7D32]/10 overflow-hidden">
            <h3 className="bg-[#2E7D32] text-white px-5 py-3 font-semibold text-sm">{tier.name}</h3>
            <dl className="divide-y divide-[#2E7D32]/10">
              {rows.map((row) => (
                <div key={row.feature} className="flex justify-between gap-4 px-5 py-3">
                  <dt className="text-sm font-medium text-[#2E7D32]">{row.feature}</dt>
                  <dd className="text-sm text-[#37474F]/80 font-light text-right">
                    {row[tierKeys[tierIdx]]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
