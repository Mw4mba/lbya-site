import React from 'react';
import AdminLayout from '@/app/components/admin/AdminLayout';
import AdminRoleGuard from '@/app/components/admin/AdminRoleGuard';
import AddOnEditorCard from '@/app/components/admin/AddOnEditorCard';
import { getAdminSession } from '@/app/admin/lib/session';

export default async function AdminAddOnsPage() {
  const session = await getAdminSession();

  return (
    <AdminLayout activePath="/admin/add-ons" title="Add-ons Management" subtitle="Manage optional modules and add-on lifecycle">
      <AdminRoleGuard role={session?.role ?? 'support-admin'} allowed={['super-admin', 'product-admin-operator']}>
        <AddOnEditorCard />
      </AdminRoleGuard>
    </AdminLayout>
  );
}
