import React from 'react';
import type { Subscriber } from './types';
import PaymentStatusBadge from './PaymentStatusBadge';
import SubscriptionStatusBadge from './SubscriptionStatusBadge';

export default function SubscribersTable({ rows }: { rows: Subscriber[] }) {
  return (
    <div className="overflow-x-auto rounded-sm border border-[#E3E7E8] bg-white">
      <table className="min-w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-[#E3E7E8] bg-[#F5F8F9] text-xs uppercase tracking-[0.08em] text-[#37474F]/62">
            <th className="px-4 py-3">Company</th>
            <th className="px-4 py-3">Main contact</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Country</th>
            <th className="px-4 py-3">VAT/org no.</th>
            <th className="px-4 py-3">Plan</th>
            <th className="px-4 py-3">Seats</th>
            <th className="px-4 py-3">Subscription status</th>
            <th className="px-4 py-3">Billing term</th>
            <th className="px-4 py-3">Renewal</th>
            <th className="px-4 py-3">Payment</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-[#EEF2F3] align-top text-sm text-[#37474F]/84 last:border-b-0">
              <td className="px-4 py-3 font-semibold text-[#1F3529]">{row.companyName}</td>
              <td className="px-4 py-3">{row.mainContact}</td>
              <td className="px-4 py-3">{row.email}</td>
              <td className="px-4 py-3">{row.country}</td>
              <td className="px-4 py-3">{row.vatNumber}</td>
              <td className="px-4 py-3">{row.currentPlan}</td>
              <td className="px-4 py-3">{row.seats}</td>
              <td className="px-4 py-3"><SubscriptionStatusBadge status={row.subscriptionStatus} /></td>
              <td className="px-4 py-3">{row.billingTerm}</td>
              <td className="px-4 py-3">{row.renewalDate}</td>
              <td className="px-4 py-3"><PaymentStatusBadge status={row.paymentStatus} /></td>
              <td className="px-4 py-3">{row.createdDate}</td>
              <td className="px-4 py-3">
                <div className="grid gap-1 text-xs font-semibold text-[#2E7D32]">
                  <a href={`/admin/subscribers/${row.id}`}>View customer</a>
                  <button className="text-left">Edit company information</button>
                  <button className="text-left">Change plan</button>
                  <button className="text-left">Add/remove seats</button>
                  <button className="text-left">Suspend access</button>
                  <button className="text-left">Reactivate access</button>
                  <button className="text-left">Cancel renewal</button>
                  <button className="text-left">Send payment reminder</button>
                  <button className="text-left">Download invoice</button>
                  <button className="text-left">View payment history</button>
                  <button className="text-left">Add internal note</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
