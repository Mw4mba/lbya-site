import { NextResponse } from 'next/server';
import { withAdminGuard } from '../../_lib/guard';
import { financeTransactions } from '@/app/components/admin/mockData';

export const GET = withAdminGuard(
  async () => {
    return NextResponse.json({
      report: 'revenue',
      totalTransactions: financeTransactions.length,
      generatedAt: new Date().toISOString(),
    });
  },
  ['super-admin', 'finance-admin']
);
