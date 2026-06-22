import React from 'react';
import AdminLayout from '@/app/components/admin/AdminLayout';
import AdminRoleGuard from '@/app/components/admin/AdminRoleGuard';
import FinanceTransactionTable from '@/app/components/admin/FinanceTransactionTable';
import { financeTransactions } from '@/app/components/admin/mockData';
import { getAdminSession } from '@/app/admin/lib/session';

export default async function AdminFinancePage() {
  const session = await getAdminSession();

  return (
    <AdminLayout activePath="/admin/finance" title="Finance & Transactions" subtitle="Revenue, payments, refunds, and accounting exports">
      <AdminRoleGuard role={session?.role ?? 'support-admin'} allowed={['super-admin', 'finance-admin']}>
        <FinanceTransactionTable rows={financeTransactions} />
      </AdminRoleGuard>
    </AdminLayout>
  );
}
