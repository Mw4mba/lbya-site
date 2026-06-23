"use client";

import React from 'react';
import AdminLayoutV2 from '@/app/components/admin/AdminLayoutV2';
import AdminDataTable from '@/app/components/admin/AdminDataTableV2';
import AdminStatusBadge from '@/app/components/admin/AdminStatusBadgeV2';
import { adminColors } from '@/app/components/admin/adminDesignTokens';

const mockAccessRecords = [
  { id: '1', customer: 'Jaridafrica Ltd', product: 'MCT', plan: 'Professional', workspace: 'Main', accessStatus: 'Enabled', billingStatus: 'Paid', seats: '58', lastAccess: '2026-06-23' },
  { id: '2', customer: 'NordBuild AB', product: 'NBC', plan: 'Professional', workspace: 'Main', accessStatus: 'Trial Access', billingStatus: 'Pending', seats: '16', lastAccess: '2026-06-20' },
  { id: '3', customer: 'ConstructFlow Inc', product: 'NBC', plan: 'Enterprise', workspace: 'Main', accessStatus: 'Enabled', billingStatus: 'Paid', seats: '32', lastAccess: '2026-06-22' },
];

export default function AdminAccessPage() {
  return (
    <AdminLayoutV2
      activePath="/admin/access"
      title="Product Access"
      subtitle="Control which customers can access NBC, MCT, enterprise modules, add-ons, workspaces, and secure product environments."
    >
      <section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <input 
            className="rounded-lg border px-4 py-2 text-sm outline-none transition-all"
            style={{ borderColor: adminColors.adminBorder, backgroundColor: adminColors.adminSurface, color: adminColors.adminText }}
            placeholder="Search customer..." 
          />
          <select className="rounded-lg border px-4 py-2 text-sm outline-none transition-all"
            style={{ borderColor: adminColors.adminBorder, backgroundColor: adminColors.adminSurface, color: adminColors.adminText }}>
            <option>All products</option>
            <option>NBC</option>
            <option>MCT</option>
          </select>
          <select className="rounded-lg border px-4 py-2 text-sm outline-none transition-all"
            style={{ borderColor: adminColors.adminBorder, backgroundColor: adminColors.adminSurface, color: adminColors.adminText }}>
            <option>All access statuses</option>
            <option>Enabled</option>
            <option>Trial Access</option>
            <option>Suspended</option>
          </select>
        </div>
      </section>
      <section>
        <AdminDataTable
          columns={[
            { key: 'customer' as const, label: 'Customer', width: '160px' },
            { key: 'product' as const, label: 'Product', width: '80px' },
            { key: 'plan' as const, label: 'Plan', width: '120px' },
            { key: 'workspace' as const, label: 'Workspace', width: '100px' },
            { key: 'seats' as const, label: 'Seats', width: '80px' },
            { key: 'accessStatus' as const, label: 'Access', render: (value: string) => <AdminStatusBadge status={value as any} size="sm" />, width: '120px' },
            { key: 'billingStatus' as const, label: 'Billing', render: (value: string) => <AdminStatusBadge status={value as any} size="sm" />, width: '100px' },
          ]}
          data={mockAccessRecords}
          keyExtractor={(item) => item.id}
          striped
        />
      </section>
    </AdminLayoutV2>
  );
}
