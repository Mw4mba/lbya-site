import { NextResponse } from 'next/server';
import { withAdminGuard } from '../_lib/guard';
import { auditLogs } from '@/app/components/admin/mockData';

export const GET = withAdminGuard(
  async () => {
    return NextResponse.json({ items: auditLogs, total: auditLogs.length });
  },
  ['super-admin', 'finance-admin']
);
