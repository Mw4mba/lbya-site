import React from 'react';
import AdminLayoutV2 from '@/app/components/admin/AdminLayoutV2';
import AdminDataTable from '@/app/components/admin/AdminDataTableV2';
import AdminStatusBadge from '@/app/components/admin/AdminStatusBadgeV2';
import { mockSubscriptions } from '@/data/mockAdminBilling';
import { adminColors } from '@/app/components/admin/adminDesignTokens';

export default function AdminSubscriptionsPage() {
  return (
    <AdminLayoutV2
      activePath="/admin/subscriptions"
      title="Subscriptions"
      subtitle="Monitor active, trial, past-due, cancelled, and enterprise subscriptions across LBYA AB products."
    >
      <section
        className="rounded-lg border p-4"
        style={{
          borderColor: adminColors.lbyaGreenLight,
          backgroundColor: adminColors.lbyaGreenSoft,
        }}
      >
        <p className="text-sm font-medium" style={{ color: adminColors.lbyaGreen }}>
          💡 Manage plan changes, add/remove seats, renewals, and reactivations.
        </p>
      </section>
      <section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <input 
            className="rounded-lg border px-4 py-2 text-sm outline-none transition-all"
            style={{ borderColor: adminColors.adminBorder, backgroundColor: adminColors.adminSurface, color: adminColors.adminText }}
            placeholder="Search subscriptions..." 
          />
          <select className="rounded-lg border px-4 py-2 text-sm outline-none transition-all"
            style={{ borderColor: adminColors.adminBorder, backgroundColor: adminColors.adminSurface, color: adminColors.adminText }}>
            <option>All statuses</option>
            <option>Active</option>
            <option>Trial</option>
            <option>Past Due</option>
          </select>
          <select className="rounded-lg border px-4 py-2 text-sm outline-none transition-all"
            style={{ borderColor: adminColors.adminBorder, backgroundColor: adminColors.adminSurface, color: adminColors.adminText }}>
            <option>All products</option>
            <option>NBC</option>
            <option>MCT</option>
          </select>
          <button className="rounded-lg px-4 py-2 text-sm font-medium text-white" style={{ backgroundColor: adminColors.lbyaGreen }}>
            Export
          </button>
        </div>
      </section>
      <section>
        <AdminDataTable
          columns={[
            { key: 'customer' as const, label: 'Customer', width: '180px' },
            { key: 'product' as const, label: 'Product', width: '80px' },
            { key: 'plan' as const, label: 'Plan', width: '180px' },
            { key: 'seats' as const, label: 'Seats', width: '80px' },
            { key: 'billingTerm' as const, label: 'Billing Term', width: '120px' },
            { key: 'amount' as const, label: 'Amount', render: (value: number, row: any) => `€${value} ${row.currency}`, width: '120px' },
            { key: 'status' as const, label: 'Status', render: (value: string) => <AdminStatusBadge status={value as any} size="sm" />, width: '120px' },
          ]}
          data={mockSubscriptions}
          keyExtractor={(item) => item.id}
          striped
        />
      </section>
    </AdminLayoutV2>
  );
}
