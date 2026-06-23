"use client";

import React from 'react';
import AdminLayoutV2 from '@/app/components/admin/AdminLayoutV2';
import AdminDataTable from '@/app/components/admin/AdminDataTableV2';
import AdminStatusBadge from '@/app/components/admin/AdminStatusBadgeV2';
import { mockCustomers } from '@/data/mockAdminBilling';
import { adminColors } from '@/app/components/admin/adminDesignTokens';

export default function AdminCustomersPage() {
  return (
    <AdminLayoutV2
      activePath="/admin/subscribers"
      title="Customers"
      subtitle="Manage customer accounts, billing contacts, subscriptions, invoices, seats, and product access."
    >
      <section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <input 
            className="rounded-lg border px-4 py-2 text-sm outline-none transition-all"
            style={{
              borderColor: adminColors.adminBorder,
              backgroundColor: adminColors.adminSurface,
              color: adminColors.adminText,
            }}
            placeholder="Search company or email..." 
          />
          <select className="rounded-lg border px-4 py-2 text-sm outline-none transition-all"
            style={{
              borderColor: adminColors.adminBorder,
              backgroundColor: adminColors.adminSurface,
              color: adminColors.adminText,
            }}>
            <option>All statuses</option>
            <option>Active</option>
            <option>Trial</option>
          </select>
          <select className="rounded-lg border px-4 py-2 text-sm outline-none transition-all"
            style={{
              borderColor: adminColors.adminBorder,
              backgroundColor: adminColors.adminSurface,
              color: adminColors.adminText,
            }}>
            <option>All countries</option>
          </select>
          <button
            className="rounded-lg px-4 py-2 text-sm font-medium text-white"
            style={{ backgroundColor: adminColors.lbyaGreen }}
          >
            Export
          </button>
        </div>
      </section>
      <section>
        <AdminDataTable
          columns={[
            { key: 'name' as const, label: 'Contact', width: '160px' },
            { key: 'company' as const, label: 'Company', width: '200px' },
            { key: 'country' as const, label: 'Country', width: '100px' },
            { key: 'activeSubscriptions' as const, label: 'Subscriptions', width: '120px' },
            { key: 'mrr' as const, label: 'MRR', render: (value: number) => `€${value.toLocaleString()}`, width: '120px' },
            { key: 'status' as const, label: 'Status', render: (value: string) => <AdminStatusBadge status={value as any} size="sm" />, width: '140px' },
          ]}
          data={mockCustomers}
          keyExtractor={(item) => item.id}
          striped
        />
      </section>
    </AdminLayoutV2>
  );
}
