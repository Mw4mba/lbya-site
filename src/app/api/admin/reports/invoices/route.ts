import { NextResponse } from 'next/server';
import { withAdminGuard } from '../../_lib/guard';
import { invoices } from '@/app/components/admin/mockData';

export const GET = withAdminGuard(
  async () => {
    return NextResponse.json({
      report: 'invoices',
      total: invoices.length,
      generatedAt: new Date().toISOString(),
    });
  },
  ['super-admin', 'finance-admin']
);
