import React from 'react';
import AdminLayoutV2 from '@/app/components/admin/AdminLayoutV2';
import AdminDataTable from '@/app/components/admin/AdminDataTableV2';
import AdminStatusBadge from '@/app/components/admin/AdminStatusBadgeV2';
import { mockPayments } from '@/data/mockAdminBilling';
import { adminColors } from '@/app/components/admin/adminDesignTokens';

export default function AdminPaymentsPage() {
  return (
    <AdminLayoutV2
      activePath="/admin/payments"
      title="Payments"
      subtitle="Track successful, pending, failed, refunded, disputed, and manually reconciled payments."
    >
      <section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <input 
            className="rounded-lg border px-4 py-2 text-sm outline-none transition-all"
            style={{ borderColor: adminColors.adminBorder, backgroundColor: adminColors.adminSurface, color: adminColors.adminText }}
            placeholder="Search payment..." 
          />
          <select className="rounded-lg border px-4 py-2 text-sm outline-none transition-all"
            style={{ borderColor: adminColors.adminBorder, backgroundColor: adminColors.adminSurface, color: adminColors.adminText }}>
            <option>All statuses</option>
            <option>Succeeded</option>
            <option>Failed</option>
            <option>Pending</option>
          </select>
          <select className="rounded-lg border px-4 py-2 text-sm outline-none transition-all"
            style={{ borderColor: adminColors.adminBorder, backgroundColor: adminColors.adminSurface, color: adminColors.adminText }}>
            <option>All methods</option>
            <option>Card</option>
            <option>Bank Transfer</option>
          </select>
          <select className="rounded-lg border px-4 py-2 text-sm outline-none transition-all"
            style={{ borderColor: adminColors.adminBorder, backgroundColor: adminColors.adminSurface, color: adminColors.adminText }}>
            <option>Currency</option>
            <option>EUR</option>
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
            { key: 'id' as const, label: 'Payment ID', width: '120px' },
            { key: 'date' as const, label: 'Date', width: '120px' },
            { key: 'customer' as const, label: 'Customer', width: '180px' },
            { key: 'amount' as const, label: 'Amount', render: (value: number) => `€${value}`, width: '100px' },
            { key: 'method' as const, label: 'Method', width: '120px' },
            { key: 'status' as const, label: 'Status', render: (value: string) => <AdminStatusBadge status={value as any} size="sm" />, width: '120px' },
          ]}
          data={mockPayments}
          keyExtractor={(item) => item.id}
          striped
        />
      </section>
    </AdminLayoutV2>
  );
}
