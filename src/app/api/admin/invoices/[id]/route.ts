import { NextResponse } from 'next/server';
import { withAdminGuard } from '../../_lib/guard';
import { invoices } from '@/app/components/admin/mockData';

export const GET = withAdminGuard(
  async () => {
    return NextResponse.json({ item: invoices[0] ?? null });
  },
  ['super-admin', 'finance-admin']
);
