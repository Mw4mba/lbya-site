import React from 'react';
import type { AdminRole } from './types';

export default function AdminTopbar({
  title,
  subtitle,
  role,
  email,
}: {
  title: string;
  subtitle?: string;
  role: AdminRole;
  email: string;
}) {
  return (
    <header className="border-b border-[#E3E7E8] bg-white px-6 py-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#1F3529]">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-[#37474F]/66">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-3">
          <input
            placeholder="Search customers, invoices, transactions"
            className="w-72 border border-[#DCE1E2] px-3 py-2 text-sm outline-none focus:border-[#2E7D32]"
          />
          <button className="relative rounded-sm border border-[#DCE1E2] px-3 py-2 text-sm font-semibold text-[#37474F]">
            Alerts
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[#D97706]" />
          </button>
          <div className="rounded-sm border border-[#DCE1E2] px-3 py-2 text-xs text-[#37474F]">
            <p className="font-semibold text-[#1F3529]">{email}</p>
            <p>{role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
