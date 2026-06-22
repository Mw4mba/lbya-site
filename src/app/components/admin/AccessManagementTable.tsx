import React from 'react';
import type { AccessRecord } from './types';
import StatusBadge from './StatusBadge';

export default function AccessManagementTable({ rows }: { rows: AccessRecord[] }) {
  return (
    <div className="overflow-x-auto rounded-sm border border-[#E3E7E8] bg-white">
      <table className="min-w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-[#E3E7E8] bg-[#F5F8F9] text-xs uppercase tracking-[0.08em] text-[#37474F]/62">
            {['Company','Active users','Purchased seats','Used seats','Available seats','Product access','Access status','Last login','Admin contact','Actions'].map((h) => (
              <th key={h} className="px-4 py-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.company} className="border-b border-[#EEF2F3] text-sm text-[#37474F]/84 last:border-b-0">
              <td className="px-4 py-3 font-semibold text-[#1F3529]">{row.company}</td>
              <td className="px-4 py-3">{row.activeUsers}</td>
              <td className="px-4 py-3">{row.purchasedSeats}</td>
              <td className="px-4 py-3">{row.usedSeats}</td>
              <td className="px-4 py-3">{row.availableSeats}</td>
              <td className="px-4 py-3">{row.productAccess}</td>
              <td className="px-4 py-3"><StatusBadge value={row.accessStatus} /></td>
              <td className="px-4 py-3">{row.lastLogin}</td>
              <td className="px-4 py-3">{row.adminContact}</td>
              <td className="px-4 py-3">
                <div className="grid gap-1 text-xs font-semibold text-[#2E7D32]">
                  <button className="text-left">Add user</button>
                  <button className="text-left">Remove user</button>
                  <button className="text-left">Reset access</button>
                  <button className="text-left">Suspend company</button>
                  <button className="text-left">Reactivate company</button>
                  <button className="text-left">Change admin user</button>
                  <button className="text-left">View login activity</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
