import React from 'react';
import type { Invoice } from './types';
import StatusBadge from './StatusBadge';

export default function InvoiceTable({ rows }: { rows: Invoice[] }) {
  return (
    <div className="overflow-x-auto rounded-sm border border-[#E3E7E8] bg-white">
      <table className="min-w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-[#E3E7E8] bg-[#F5F8F9] text-xs uppercase tracking-[0.08em] text-[#37474F]/62">
            {['Invoice #','Company','Billing contact','Amount','VAT/tax','Currency','Status','Due date','Payment date','Subscription period','Download PDF','Send invoice','Actions'].map((h) => (
              <th key={h} className="px-4 py-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.invoiceNumber} className="border-b border-[#EEF2F3] text-sm text-[#37474F]/84 last:border-b-0">
              <td className="px-4 py-3 font-semibold text-[#1F3529]">{row.invoiceNumber}</td>
              <td className="px-4 py-3">{row.company}</td>
              <td className="px-4 py-3">{row.billingContact}</td>
              <td className="px-4 py-3">{row.amount}</td>
              <td className="px-4 py-3">{row.vatTax}</td>
              <td className="px-4 py-3">{row.currency}</td>
              <td className="px-4 py-3"><StatusBadge value={row.status} /></td>
              <td className="px-4 py-3">{row.dueDate}</td>
              <td className="px-4 py-3">{row.paymentDate}</td>
              <td className="px-4 py-3">{row.subscriptionPeriod}</td>
              <td className="px-4 py-3"><button className="text-[#2E7D32]">Download</button></td>
              <td className="px-4 py-3"><button className="text-[#2E7D32]">Send</button></td>
              <td className="px-4 py-3">
                <div className="grid gap-1 text-xs font-semibold text-[#2E7D32]">
                  <button className="text-left">Generate invoice</button>
                  <button className="text-left">Send invoice by email</button>
                  <button className="text-left">Download invoice PDF</button>
                  <button className="text-left">Mark as paid</button>
                  <button className="text-left">Create credit note placeholder</button>
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
