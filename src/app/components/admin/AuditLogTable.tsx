import React from 'react';
import type { AuditLog } from './types';

export default function AuditLogTable({ rows }: { rows: AuditLog[] }) {
  return (
    <div className="overflow-x-auto rounded-sm border border-[#E3E7E8] bg-white">
      <table className="min-w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-[#E3E7E8] bg-[#F5F8F9] text-xs uppercase tracking-[0.08em] text-[#37474F]/62">
            {['Date/time','Admin user','Action','Customer/company','Previous value','New value','IP/device'].map((h) => (
              <th key={h} className="px-4 py-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={`${row.dateTime}-${idx}`} className="border-b border-[#EEF2F3] text-sm text-[#37474F]/84 last:border-b-0">
              <td className="px-4 py-3">{row.dateTime}</td>
              <td className="px-4 py-3">{row.adminUser}</td>
              <td className="px-4 py-3 font-semibold text-[#1F3529]">{row.action}</td>
              <td className="px-4 py-3">{row.company}</td>
              <td className="px-4 py-3">{row.previousValue}</td>
              <td className="px-4 py-3">{row.newValue}</td>
              <td className="px-4 py-3">{row.ipDevice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
