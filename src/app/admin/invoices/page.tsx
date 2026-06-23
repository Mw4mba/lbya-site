import React from 'react';
import AdminLayoutV2 from '@/app/components/admin/AdminLayoutV2';
import AdminDataTable from '@/app/components/admin/AdminDataTableV2';
import AdminStatusBadge from '@/app/components/admin/AdminStatusBadgeV2';
import { mockInvoices } from '@/data/mockAdminBilling';
import { adminColors } from '@/app/components/admin/adminDesignTokens';

export default function AdminInvoicesPage() {
  return (
    <AdminLayoutV2
      activePath="/admin/invoices"
      title="Invoices"
      subtitle="Create, review, send, download, reconcile, and track customer invoices."
    >
      <section>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: adminColors.lbyaGreen }}>
            Generate Invoice
          </button>
          <button className="px-4 py-2 rounded-lg text-sm font-medium border" style={{ borderColor: adminColors.adminBorder, color: adminColors.adminText }}>
            Export
          </button>
        </div>
      </section>
      <section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <input 
            className="rounded-lg border px-4 py-2 text-sm outline-none transition-all"
            style={{ borderColor: adminColors.adminBorder, backgroundColor: adminColors.adminSurface, color: adminColors.adminText }}
            placeholder="Search invoice number..." 
          />
          <select className="rounded-lg border px-4 py-2 text-sm outline-none transition-all"
            style={{ borderColor: adminColors.adminBorder, backgroundColor: adminColors.adminSurface, color: adminColors.adminText }}>
            <option>All statuses</option>
            <option>Paid</option>
            <option>Overdue</option>
            <option>Draft</option>
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
            { key: 'number' as const, label: 'Invoice #', width: '120px' },
            { key: 'customer' as const, label: 'Customer', width: '180px' },
            { key: 'issueDate' as const, label: 'Issue Date', width: '120px' },
            { key: 'dueDate' as const, label: 'Due Date', width: '120px' },
            { key: 'amount' as const, label: 'Amount', render: (value: number) => `€${value}`, width: '100px' },
            { key: 'vat' as const, label: 'VAT', render: (value: number) => `€${value}`, width: '80px' },
            { key: 'status' as const, label: 'Status', render: (value: string) => <AdminStatusBadge status={value as any} size="sm" />, width: '120px' },
          ]}
          data={mockInvoices}
          keyExtractor={(item) => item.id}
          striped
        />
      </section>
    </AdminLayoutV2>
  );
}
