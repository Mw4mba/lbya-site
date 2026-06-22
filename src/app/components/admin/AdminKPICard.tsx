import React from 'react';

export default function AdminKPICard({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta?: string;
}) {
  return (
    <article className="rounded-sm border border-[#E3E7E8] bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#37474F]/58">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-[#1F3529]">{value}</p>
      {delta ? <p className="mt-2 text-xs text-[#2E7D32]">{delta}</p> : null}
    </article>
  );
}
