"use client";

import React from 'react';
import AdminLayoutV2 from '@/app/components/admin/AdminLayoutV2';
import AdminDataTable from '@/app/components/admin/AdminDataTableV2';
import AdminStatusBadge from '@/app/components/admin/AdminStatusBadgeV2';
import { mockAuditEvents } from '@/data/mockAdminBilling';
import { adminColors } from '@/app/components/admin/adminDesignTokens';

export default function AdminAuditLogsPage() {
  return (
    <AdminLayoutV2
      activePath="/admin/audit-logs"
      title="Audit Log"
      subtitle="Track subscription, billing, payment, access, pricing, and admin-user actions."
    >
      <section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <input 
            className="rounded-lg border px-4 py-2 text-sm outline-none transition-all"
            style={{ borderColor: adminColors.adminBorder, backgroundColor: adminColors.adminSurface, color: adminColors.adminText }}
            placeholder="Search by admin or entity..." 
          />
          <select className="rounded-lg border px-4 py-2 text-sm outline-none transition-all"
            style={{ borderColor: adminColors.adminBorder, backgroundColor: adminColors.adminSurface, color: adminColors.adminText }}>
            <option>All actions</option>
            <option>customer_created</option>
            <option>subscription_created</option>
            <option>payment_marked_paid</option>
          </select>
          <input 
            type="date"
            className="rounded-lg border px-4 py-2 text-sm outline-none transition-all"
            style={{ borderColor: adminColors.adminBorder, backgroundColor: adminColors.adminSurface, color: adminColors.adminText }}
          />
          <button className="rounded-lg px-4 py-2 text-sm font-medium text-white" style={{ backgroundColor: adminColors.lbyaGreen }}>
            Export
          </button>
        </div>
      </section>
      <section>
        <AdminDataTable
          columns={[
            { key: 'timestamp' as const, label: 'Date/Time', width: '160px' },
            { key: 'adminUser' as const, label: 'Admin User', width: '140px' },
            { key: 'action' as const, label: 'Action', width: '160px' },
            { key: 'customer' as const, label: 'Customer', width: '160px' },
            { key: 'details' as const, label: 'Details', width: '240px' },
            { key: 'status' as const, label: 'Status', render: (value: string) => <AdminStatusBadge status={value as any} size="sm" />, width: '100px' },
          ]}
          data={mockAuditEvents}
          keyExtractor={(item) => item.id}
          striped
        />
      </section>
    </AdminLayoutV2>
  );
}
