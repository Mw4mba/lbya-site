import React from 'react';
import type { Subscriber } from './types';
import PaymentStatusBadge from './PaymentStatusBadge';
import SubscriptionStatusBadge from './SubscriptionStatusBadge';

export default function SubscribersTable({ rows }: { rows: Subscriber[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#37474F]/10 bg-white shadow-sm">
      <table className="min-w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-[#37474F]/8 bg-linear-to-r from-[#2E7D32]/5 to-transparent text-xs font-bold uppercase tracking-[0.12em] text-[#37474F]/70">
            <th className="px-6 py-4">Company</th>
            <th className="px-6 py-4">Main contact</th>
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4">Country</th>
            <th className="px-6 py-4">VAT/org no.</th>
            <th className="px-6 py-4">Plan</th>
            <th className="px-6 py-4">Seats</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Term</th>
            <th className="px-6 py-4">Renewal</th>
            <th className="px-6 py-4">Payment</th>
            <th className="px-6 py-4">Created</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#37474F]/8">
          {rows.map((row) => (
            <tr key={row.id} className="align-top text-sm text-[#37474F] transition-colors duration-200 hover:bg-[#2E7D32]/3">
              <td className="px-6 py-4 font-bold text-[#2E7D32]">{row.companyName}</td>
              <td className="px-6 py-4 text-[#37474F]/85">{row.mainContact}</td>
              <td className="px-6 py-4 text-[#37474F]/75 font-mono text-xs">{row.email}</td>
              <td className="px-6 py-4 text-[#37474F]/85">{row.country}</td>
              <td className="px-6 py-4 text-[#37474F]/75 font-mono text-xs">{row.vatNumber}</td>
              <td className="px-6 py-4 font-medium text-[#2E7D32]">{row.currentPlan}</td>
              <td className="px-6 py-4 font-medium text-[#37474F]">{row.seats}</td>
              <td className="px-6 py-4"><SubscriptionStatusBadge status={row.subscriptionStatus} /></td>
              <td className="px-6 py-4 text-[#37474F]/85">{row.billingTerm}</td>
              <td className="px-6 py-4 text-[#37474F]/75 text-xs">{row.renewalDate}</td>
              <td className="px-6 py-4"><PaymentStatusBadge status={row.paymentStatus} /></td>
              <td className="px-6 py-4 text-[#37474F]/75 text-xs">{row.createdDate}</td>
              <td className="px-6 py-4">
                <div className="flex flex-col gap-2">
                  <a href={`/admin/subscribers/${row.id}`} className="inline-flex items-center text-xs font-bold text-[#2E7D32] hover:text-[#1b5e20] transition-colors duration-200">View →</a>
                  <button className="text-left text-xs font-medium text-[#37474F]/60 hover:text-[#2E7D32] transition-colors duration-200">More</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
