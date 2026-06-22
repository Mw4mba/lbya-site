import React from 'react';

export default function StatusBadge({ value }: { value: string }) {
  const normalized = value.toLowerCase();

  let classes = 'bg-gray-100 text-gray-700 border-gray-200';
  if (normalized.includes('active') || normalized.includes('paid') || normalized.includes('accepted')) {
    classes = 'bg-[#E8F5E9] text-[#1F5B25] border-[#B7DEB9]';
  } else if (normalized.includes('pending') || normalized.includes('trial') || normalized.includes('draft')) {
    classes = 'bg-[#FFF8E1] text-[#8A6200] border-[#F2DC9B]';
  } else if (normalized.includes('failed') || normalized.includes('overdue') || normalized.includes('cancel') || normalized.includes('suspend')) {
    classes = 'bg-[#FDECEA] text-[#A12A1E] border-[#F3C0B8]';
  }

  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${classes}`}>{value}</span>;
}
