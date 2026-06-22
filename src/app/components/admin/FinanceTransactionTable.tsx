import React from 'react';
import type { FinanceTransaction } from './types';
import PaymentStatusBadge from './PaymentStatusBadge';

export default function FinanceTransactionTable({ rows }: { rows: FinanceTransaction[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#37474F]/10 bg-white shadow-sm">
      <table className="min-w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-[#37474F]/8 bg-gradient-to-r from-[#2E7D32]/5 to-transparent text-xs font-bold uppercase tracking-[0.12em] text-[#37474F]/70">
            {['TX ID','Company','Product','Plan','Term','Amount','Currency','VAT','Net','Method','Status','Date','Invoice','Receipt','Refund','Actions'].map((h) => (
              <th key={h} className="px-6 py-4 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#37474F]/8">
          {rows.map((row) => (
            <tr key={row.id} className="align-top text-sm text-[#37474F] transition-colors duration-200 hover:bg-[#2E7D32]/3">
              <td className="px-6 py-4 font-bold text-[#2E7D32] font-mono text-xs">{row.id}</td>
              <td className="px-6 py-4 font-medium text-[#37474F]/85">{row.company}</td>
              <td className="px-6 py-4 text-[#37474F]/85">{row.product}</td>
              <td className="px-6 py-4 text-[#2E7D32] font-medium">{row.plan}</td>
              <td className="px-6 py-4 text-[#37474F]/75">{row.billingTerm}</td>
              <td className="px-6 py-4 font-bold text-[#2E7D32]">{row.amount}</td>
              <td className="px-6 py-4 text-[#37474F]/85 font-medium">{row.currency}</td>
              <td className="px-6 py-4 text-[#37474F]/75">{row.vatTax}</td>
              <td className="px-6 py-4 font-medium text-[#2E7D32]">{row.netRevenue}</td>
              <td className="px-6 py-4 text-[#37474F]/75 text-xs">{row.paymentMethod}</td>
              <td className="px-6 py-4"><PaymentStatusBadge status={row.status} /></td>
              <td className="px-6 py-4 text-[#37474F]/75 text-xs">{row.paymentDate}</td>
              <td className="px-6 py-4 text-xs font-mono text-[#37474F]/75">{row.invoiceNumber}</td>
              <td className="px-6 py-4"><a href={row.receiptLink} className="text-xs font-bold text-[#2E7D32] hover:text-[#1b5e20] transition-colors">∆</a></td>
              <td className="px-6 py-4 text-[#37474F]/75 text-xs">{row.refundStatus}</td>
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
