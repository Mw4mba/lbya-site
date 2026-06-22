import React from 'react';

export default function PlanEditorCard({
  plan,
  description,
  monthly,
  annual,
  triYear,
  seats,
  extraSeat,
  features,
  addOns,
  status,
}: {
  plan: string;
  description: string;
  monthly: string;
  annual: string;
  triYear: string;
  seats: string;
  extraSeat: string;
  features: string[];
  addOns: string;
  status: string;
}) {
  return (
    <article className="rounded-sm border border-[#E3E7E8] bg-white p-5">
      <h3 className="text-lg font-semibold text-[#1F3529]">{plan}</h3>
      <p className="mt-2 text-sm text-[#37474F]/76">{description}</p>
      <div className="mt-4 grid gap-2 text-sm text-[#37474F]/82 md:grid-cols-2">
        <p><span className="font-semibold text-[#1F3529]">Monthly:</span> {monthly}</p>
        <p><span className="font-semibold text-[#1F3529]">Annual:</span> {annual}</p>
        <p><span className="font-semibold text-[#1F3529]">3-year:</span> {triYear}</p>
        <p><span className="font-semibold text-[#1F3529]">Included seats:</span> {seats}</p>
        <p><span className="font-semibold text-[#1F3529]">Extra seat:</span> {extraSeat}</p>
        <p><span className="font-semibold text-[#1F3529]">Add-ons:</span> {addOns}</p>
        <p><span className="font-semibold text-[#1F3529]">Status:</span> {status}</p>
      </div>
      <ul className="mt-4 space-y-2">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-[#37474F]/80">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#2E7D32]" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-[#2E7D32]">
        <button>Create plan</button>
        <button>Edit plan</button>
        <button>Archive plan</button>
        <button>Mark as recommended</button>
        <button>Enable/disable checkout</button>
        <button>Enable quote-only mode</button>
      </div>
    </article>
  );
}
