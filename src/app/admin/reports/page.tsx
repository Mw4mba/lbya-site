import React from 'react';
import AdminLayoutV2 from '@/app/components/admin/AdminLayoutV2';
import { adminColors } from '@/app/components/admin/adminDesignTokens';

const reports = [
  { name: 'Revenue Report', description: 'MRR, ARR, and revenue trends', exports: ['CSV', 'Excel', 'PDF'] },
  { name: 'Customer Report', description: 'Subscriber count and status', exports: ['CSV', 'Excel', 'PDF'] },
  { name: 'Invoice Status', description: 'Pending, paid, and overdue invoices', exports: ['CSV', 'Excel', 'PDF'] },
  { name: 'Payment Breakdown', description: 'Payment methods and reconciliation', exports: ['CSV', 'Excel', 'PDF'] },
  { name: 'Tax Report', description: 'VAT and tax compliance', exports: ['CSV', 'Excel', 'PDF'] },
  { name: 'Churn Analysis', description: 'Cancelled subscriptions trends', exports: ['CSV', 'Excel', 'PDF'] },
];

export default function AdminReportsPage() {
  return (
    <AdminLayoutV2
      activePath="/admin/reports"
      title="Reports & Analytics"
      subtitle="Export revenue, customer, invoice, payment, tax, and churn analysis reports."
    >
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <div
            key={report.name}
            className="rounded-lg border p-6"
            style={{
              backgroundColor: adminColors.adminSurface,
              borderColor: adminColors.adminBorder,
            }}
          >
            <p className="text-sm font-semibold" style={{ color: adminColors.adminText }}>
              {report.name}
            </p>
            <p className="text-xs mt-2" style={{ color: adminColors.adminMuted }}>
              {report.description}
            </p>
            <div className="flex gap-2 mt-4">
              {report.exports.map((format) => (
                <button
                  key={format}
                  className="text-xs px-3 py-1 rounded border"
                  style={{
                    borderColor: adminColors.adminBorder,
                    color: adminColors.adminText,
                  }}
                >
                  {format}
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>
    </AdminLayoutV2>
  );
}
