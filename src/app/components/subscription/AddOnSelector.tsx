'use client';

import React from 'react';
import { MCT_ADD_ONS, type AddOnId } from '@/app/content/subscriptionFlow';

export default function AddOnSelector({
  selected,
  onToggle,
}: {
  selected: AddOnId[];
  onToggle: (id: AddOnId) => void;
}) {
  return (
    <div className="grid gap-2">
      {MCT_ADD_ONS.map((addOn) => {
        const active = selected.includes(addOn.id);
        return (
          <label key={addOn.id} className="flex items-center gap-2 rounded-sm border border-[#DCE3E0] bg-white px-3 py-2 text-sm text-[#37474F]">
            <input type="checkbox" checked={active} onChange={() => onToggle(addOn.id)} />
            <span>{addOn.name}</span>
          </label>
        );
      })}
    </div>
  );
}
