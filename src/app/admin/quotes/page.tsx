import React from 'react';
import AdminLayout from '@/app/components/admin/AdminLayout';
import AdminRoleGuard from '@/app/components/admin/AdminRoleGuard';
import QuoteTable from '@/app/components/admin/QuoteTable';
import { quoteRequests } from '@/app/components/admin/mockData';
import { getAdminSession } from '@/app/admin/lib/session';

export default async function AdminQuotesPage() {
  const session = await getAdminSession();

  return (
    <AdminLayout activePath="/admin/quotes" title="Quotes & Enterprise Requests" subtitle="Manage quote lifecycle and conversion to subscriptions">
      <AdminRoleGuard role={session?.role ?? 'support-admin'} allowed={['super-admin', 'sales-admin']}>
        <QuoteTable rows={quoteRequests} />
      </AdminRoleGuard>
    </AdminLayout>
  );
}
