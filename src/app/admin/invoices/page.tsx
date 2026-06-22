import React from 'react';
import AdminLayout from '@/app/components/admin/AdminLayout';
import AdminRoleGuard from '@/app/components/admin/AdminRoleGuard';
import InvoiceTable from '@/app/components/admin/InvoiceTable';
import { invoices } from '@/app/components/admin/mockData';
import { getAdminSession } from '@/app/admin/lib/session';

export default async function AdminInvoicesPage() {
  const session = await getAdminSession();

  return (
    <AdminLayout activePath="/admin/invoices" title="Invoice Management" subtitle="Generate, send, and reconcile invoices">
      <AdminRoleGuard role={session?.role ?? 'support-admin'} allowed={['super-admin', 'finance-admin']}>
        <InvoiceTable rows={invoices} />
      </AdminRoleGuard>
    </AdminLayout>
  );
}
