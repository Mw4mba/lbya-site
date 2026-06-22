import React from 'react';
import type { QuoteRequest } from './types';
import StatusBadge from './StatusBadge';

export default function QuoteTable({ rows }: { rows: QuoteRequest[] }) {
  return (
    <div className="overflow-x-auto rounded-sm border border-[#E3E7E8] bg-white">
      <table className="min-w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-[#E3E7E8] bg-[#F5F8F9] text-xs uppercase tracking-[0.08em] text-[#37474F]/62">
            {['Request ID','Company','Contact person','Email','Country','Requested plan','Seats','Requested modules','Message','Status','Created date','Assigned sales admin','Actions'].map((h) => (
              <th key={h} className="px-4 py-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-[#EEF2F3] text-sm text-[#37474F]/84 last:border-b-0">
              <td className="px-4 py-3 font-semibold text-[#1F3529]">{row.id}</td>
              <td className="px-4 py-3">{row.company}</td>
              <td className="px-4 py-3">{row.contactPerson}</td>
              <td className="px-4 py-3">{row.email}</td>
              <td className="px-4 py-3">{row.country}</td>
              <td className="px-4 py-3">{row.requestedPlan}</td>
              <td className="px-4 py-3">{row.seats}</td>
              <td className="px-4 py-3">{row.requestedModules}</td>
              <td className="px-4 py-3">{row.message}</td>
              <td className="px-4 py-3"><StatusBadge value={row.status} /></td>
              <td className="px-4 py-3">{row.createdDate}</td>
              <td className="px-4 py-3">{row.assignedSalesAdmin}</td>
              <td className="px-4 py-3">
                <div className="grid gap-1 text-xs font-semibold text-[#2E7D32]">
                  <button className="text-left">View quote</button>
                  <button className="text-left">Assign sales admin</button>
                  <button className="text-left">Update status</button>
                  <button className="text-left">Create draft offer</button>
                  <button className="text-left">Convert to subscription</button>
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
