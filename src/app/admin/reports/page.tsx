import React from 'react';
import AdminLayout from '@/app/components/admin/AdminLayout';
import ReportExportButton from '@/app/components/admin/ReportExportButton';

const reportItems = [
  'Revenue report',
  'Subscriber status report',
  'Invoice status report',
  'Payment method breakdown',
  'VAT/tax report',
  'Churn report',
  'Quote conversion report',
  'Top customers by revenue',
  'MRR/ARR trend placeholder',
  'Country-wise customer distribution',
];

export default function AdminReportsPage() {
  return (
    <AdminLayout activePath="/admin/reports" title="Reports & Analytics" subtitle="Export operational and financial analytics reports">
      <section className="rounded-sm border border-[#E3E7E8] bg-white p-5">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {reportItems.map((item) => (
            <article key={item} className="rounded-sm border border-[#E3E7E8] bg-[#F9FCFC] p-4">
              <h3 className="text-sm font-semibold text-[#1F3529]">{item}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                <ReportExportButton label={item} format="CSV" />
                <ReportExportButton label={item} format="Excel placeholder" />
                <ReportExportButton label={item} format="PDF placeholder" />
              </div>
            </article>
          ))}
        </div>
      </section>
    </AdminLayout>
  );
}
