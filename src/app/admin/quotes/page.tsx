"use client";

import React from 'react';
import AdminLayoutV2 from '@/app/components/admin/AdminLayoutV2';
import AdminDataTable from '@/app/components/admin/AdminDataTableV2';
import AdminStatusBadge from '@/app/components/admin/AdminStatusBadgeV2';
import { adminColors } from '@/app/components/admin/adminDesignTokens';

const mockQuotes = [
  { id: '1', customer: 'Tech Solutions GmbH', product: 'MCT', plan: 'Enterprise', value: 'EUR 2,400', validity: '30 days', status: 'Pending', createdDate: '2026-06-20' },
  { id: '2', customer: 'Digital Innovations Ltd', product: 'NBC', plan: 'Enterprise', value: 'EUR 3,600', validity: '30 days', status: 'Accepted', createdDate: '2026-06-15' },
  { id: '3', customer: 'BuildTech Solutions', product: 'MCT', plan: 'Custom', value: 'EUR 4,200', validity: '7 days', status: 'Expired', createdDate: '2026-06-10' },
];

export default function AdminQuotesPage() {
  return (
    <AdminLayoutV2
      activePath="/admin/quotes"
      title="Quotes & Enterprise Requests"
      subtitle="Manage quote lifecycle, pricing customizations, and conversion to subscriptions."
    >
      <section>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: adminColors.lbyaGreen }}>
            Create Quote
          </button>
        </div>
      </section>

      <section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <input 
            className="rounded-lg border px-4 py-2 text-sm outline-none transition-all"
            style={{ borderColor: adminColors.adminBorder, backgroundColor: adminColors.adminSurface, color: adminColors.adminText }}
            placeholder="Search by company..." 
          />
          <select className="rounded-lg border px-4 py-2 text-sm outline-none transition-all"
            style={{ borderColor: adminColors.adminBorder, backgroundColor: adminColors.adminSurface, color: adminColors.adminText }}>
            <option>Quote status</option>
            <option>Pending</option>
            <option>Accepted</option>
            <option>Expired</option>
          </select>
          <select className="rounded-lg border px-4 py-2 text-sm outline-none transition-all"
            style={{ borderColor: adminColors.adminBorder, backgroundColor: adminColors.adminSurface, color: adminColors.adminText }}>
            <option>Requested plan</option>
            <option>Enterprise</option>
            <option>Custom</option>
          </select>
          <input 
            type="date"
            className="rounded-lg border px-4 py-2 text-sm outline-none transition-all"
            style={{ borderColor: adminColors.adminBorder, backgroundColor: adminColors.adminSurface, color: adminColors.adminText }}
          />
        </div>
      </section>

      <section>
        <AdminDataTable
          columns={[
            { key: 'customer' as const, label: 'Customer', width: '160px' },
            { key: 'product' as const, label: 'Product', width: '80px' },
            { key: 'plan' as const, label: 'Plan', width: '120px' },
            { key: 'value' as const, label: 'Value', width: '120px' },
            { key: 'createdDate' as const, label: 'Created', width: '100px' },
            { key: 'validity' as const, label: 'Validity', width: '100px' },
            { key: 'status' as const, label: 'Status', render: (value: string) => <AdminStatusBadge status={value as any} size="sm" />, width: '100px' },
          ]}
          data={mockQuotes}
          keyExtractor={(item) => item.id}
          striped
        />
      </section>
    </AdminLayoutV2>
  );
}
