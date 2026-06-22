import React from 'react';
import type { FinanceTransaction } from './types';
import PaymentStatusBadge from './PaymentStatusBadge';

export default function FinanceTransactionTable({ rows }: { rows: FinanceTransaction[] }) {
  return (
    <div className="overflow-x-auto rounded-sm border border-[#E3E7E8] bg-white">
      <table className="min-w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-[#E3E7E8] bg-[#F5F8F9] text-xs uppercase tracking-[0.08em] text-[#37474F]/62">
            {['Transaction ID','Company','Product','Plan','Billing term','Amount','Currency','VAT/tax','Net revenue','Payment method','Status','Payment date','Invoice','Receipt','Refund status','Actions'].map((h) => (
              <th key={h} className="px-4 py-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-[#EEF2F3] text-sm text-[#37474F]/84 last:border-b-0">
              <td className="px-4 py-3 font-semibold text-[#1F3529]">{row.id}</td>
              <td className="px-4 py-3">{row.company}</td>
              <td className="px-4 py-3">{row.product}</td>
              <td className="px-4 py-3">{row.plan}</td>
              <td className="px-4 py-3">{row.billingTerm}</td>
              <td className="px-4 py-3">{row.amount}</td>
              <td className="px-4 py-3">{row.currency}</td>
              <td className="px-4 py-3">{row.vatTax}</td>
              <td className="px-4 py-3">{row.netRevenue}</td>
              <td className="px-4 py-3">{row.paymentMethod}</td>
              <td className="px-4 py-3"><PaymentStatusBadge status={row.status} /></td>
              <td className="px-4 py-3">{row.paymentDate}</td>
              <td className="px-4 py-3">{row.invoiceNumber}</td>
              <td className="px-4 py-3"><a href={row.receiptLink} className="text-[#2E7D32]">Open</a></td>
              <td className="px-4 py-3">{row.refundStatus}</td>
              <td className="px-4 py-3">
                <div className="grid gap-1 text-xs font-semibold text-[#2E7D32]">
                  <button className="text-left">View transaction</button>
                  <button className="text-left">Download receipt</button>
                  <button className="text-left">Download invoice</button>
                  <button className="text-left">Mark invoice as paid</button>
                  <button className="text-left">Issue refund placeholder</button>
                  <button className="text-left">Send payment reminder</button>
                  <button className="text-left">Export CSV</button>
                  <button className="text-left">Export accounting report</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
