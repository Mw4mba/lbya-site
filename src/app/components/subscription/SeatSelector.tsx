'use client';

import React from 'react';

export default function SeatSelector({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <div className="inline-flex items-center rounded-sm border border-[#DCE3E0] bg-white">
      <button className="px-3 py-2 text-sm" onClick={() => onChange(Math.max(1, value - 1))} aria-label="Decrease seats">
        -
      </button>
      <span className="min-w-12 border-x border-[#DCE3E0] px-3 py-2 text-center text-sm font-semibold text-[#1F3529]">{value}</span>
      <button className="px-3 py-2 text-sm" onClick={() => onChange(value + 1)} aria-label="Increase seats">
        +
      </button>
    </div>
  );
}
