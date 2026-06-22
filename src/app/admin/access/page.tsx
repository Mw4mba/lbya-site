import React from 'react';
import AdminLayout from '@/app/components/admin/AdminLayout';
import AccessManagementTable from '@/app/components/admin/AccessManagementTable';
import AdminRoleGuard from '@/app/components/admin/AdminRoleGuard';
import { accessRecords } from '@/app/components/admin/mockData';
import { getAdminSession } from '@/app/admin/lib/session';

export default async function AdminAccessPage() {
  const session = await getAdminSession();

  return (
    <AdminLayout activePath="/admin/access" title="Access Management" subtitle="Seats, users, and account access controls">
      <AdminRoleGuard
        role={session?.role ?? 'support-admin'}
        allowed={['super-admin', 'support-admin', 'product-admin-operator']}
      >
        <AccessManagementTable rows={accessRecords} />
      </AdminRoleGuard>
    </AdminLayout>
  );
}
