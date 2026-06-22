import React from 'react';
import type { Invoice } from './types';
import StatusBadge from './StatusBadge';

export default function InvoiceTable({ rows }: { rows: Invoice[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#37474F]/10 bg-white shadow-sm">
      <table className="min-w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-[#37474F]/8 bg-gradient-to-r from-[#2E7D32]/5 to-transparent text-xs font-bold uppercase tracking-[0.12em] text-[#37474F]/70">
            {['Invoice #','Company','Billing contact','Amount','VAT/tax','Currency','Status','Due date','Payment date','Period','PDF','Send','Actions'].map((h) => (
              <th key={h} className="px-6 py-4">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#37474F]/8">
          {rows.map((row) => (
            <tr key={row.invoiceNumber} className="align-top text-sm text-[#37474F] transition-colors duration-200 hover:bg-[#2E7D32]/3">
              <td className="px-6 py-4 font-bold text-[#2E7D32] font-mono text-xs">{row.invoiceNumber}</td>
              <td className="px-6 py-4 font-medium text-[#37474F]/85">{row.company}</td>
              <td className="px-6 py-4 text-[#37474F]/75">{row.billingContact}</td>
              <td className="px-6 py-4 font-bold text-[#2E7D32]">{row.amount}</td>
              <td className="px-6 py-4 text-[#37474F]/75">{row.vatTax}</td>
              <td className="px-6 py-4 text-[#37474F]/85 font-medium">{row.currency}</td>
              <td className="px-6 py-4"><StatusBadge value={row.status} /></td>
              <td className="px-6 py-4 text-[#37474F]/75 text-xs">{row.dueDate}</td>
              <td className="px-6 py-4 text-[#37474F]/75 text-xs">{row.paymentDate}</td>
              <td className="px-6 py-4 text-[#37474F]/75 text-xs">{row.subscriptionPeriod}</td>
              <td className="px-6 py-4"><button className="text-xs font-bold text-[#2E7D32] hover:text-[#1b5e20] transition-colors">↓</button></td>
              <td className="px-6 py-4"><button className="text-xs font-bold text-[#2E7D32] hover:text-[#1b5e20] transition-colors">✉</button></td>
              <td className="px-6 py-4">
                <button className="text-xs font-bold text-[#37474F]/60 hover:text-[#2E7D32] transition-colors duration-200">More</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
