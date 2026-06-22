import { NextResponse } from 'next/server';
import { withAdminGuard } from '../_lib/guard';
import { accessRecords } from '@/app/components/admin/mockData';

export const GET = withAdminGuard(
  async () => {
    return NextResponse.json({ items: accessRecords, total: accessRecords.length });
  },
  ['super-admin', 'support-admin', 'product-admin-operator']
);
