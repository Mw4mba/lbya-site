import { NextResponse } from 'next/server';
import { withAdminGuard } from '../../_lib/guard';
import { financeTransactions } from '@/app/components/admin/mockData';

export const GET = withAdminGuard(
  async () => {
    return NextResponse.json({ item: financeTransactions[0] ?? null });
  },
  ['super-admin', 'finance-admin']
);
