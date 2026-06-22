import React from 'react';
import AdminLayout from '@/app/components/admin/AdminLayout';
import AdminRoleGuard from '@/app/components/admin/AdminRoleGuard';
import AuditLogTable from '@/app/components/admin/AuditLogTable';
import { auditLogs } from '@/app/components/admin/mockData';
import { getAdminSession } from '@/app/admin/lib/session';

export default async function AdminAuditLogsPage() {
  const session = await getAdminSession();

  return (
    <AdminLayout activePath="/admin/audit-logs" title="Audit Logs" subtitle="Track privileged actions and finance changes">
      <AdminRoleGuard role={session?.role ?? 'support-admin'} allowed={['super-admin', 'finance-admin']}>
        <AuditLogTable rows={auditLogs} />
      </AdminRoleGuard>
    </AdminLayout>
  );
}
