import React from 'react';

export default function StatusBadge({ value }: { value: string }) {
  const normalized = value.toLowerCase();

  let classes = 'bg-[#37474F]/8 text-[#37474F] border-[#37474F]/15';
  if (normalized.includes('active') || normalized.includes('paid') || normalized.includes('accepted')) {
    classes = 'bg-[#2E7D32]/12 text-[#1b5e20] border-[#2E7D32]/25 font-semibold';
  } else if (normalized.includes('pending') || normalized.includes('trial') || normalized.includes('draft')) {
    classes = 'bg-[#D97706]/12 text-[#92400E] border-[#D97706]/25 font-semibold';
  } else if (normalized.includes('failed') || normalized.includes('overdue') || normalized.includes('cancel') || normalized.includes('suspend')) {
    classes = 'bg-[#DC2626]/12 text-[#7F1D1D] border-[#DC2626]/25 font-semibold';
  }

  return <span className={`inline-flex rounded-lg border px-3 py-1.5 text-xs transition-colors duration-200 ${classes}`}>{value}</span>;
}
