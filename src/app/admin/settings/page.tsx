import React from 'react';
import AdminLayout from '@/app/components/admin/AdminLayout';
import AdminRoleGuard from '@/app/components/admin/AdminRoleGuard';
import { getAdminSession } from '@/app/admin/lib/session';

export default async function AdminSettingsPage() {
  const session = await getAdminSession();

  return (
    <AdminLayout activePath="/admin/settings" title="Admin Settings" subtitle="Roles, permissions, tax defaults, and finance integrations">
      <AdminRoleGuard role={session?.role ?? 'support-admin'} allowed={['super-admin']}>
        <section className="rounded-sm border border-[#E3E7E8] bg-white p-5">
          <h3 className="text-lg font-semibold text-[#1F3529]">Role and permission matrix</h3>
          <ul className="mt-4 space-y-2 text-sm text-[#37474F]/82">
            <li>Super Admin: Full access</li>
            <li>Finance Admin: Billing, invoices, transactions</li>
            <li>Sales Admin: Quotes, enterprise requests</li>
            <li>Support Admin: Access and account support</li>
            <li>Product Admin/Operator: Plans and add-ons</li>
          </ul>
        </section>
      </AdminRoleGuard>
    </AdminLayout>
  );
}
