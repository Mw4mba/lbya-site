import { NextResponse } from 'next/server';
import { withAdminGuard } from '../_lib/guard';
import { quoteRequests } from '@/app/components/admin/mockData';

export const GET = withAdminGuard(
  async () => {
    return NextResponse.json({ items: quoteRequests, total: quoteRequests.length });
  },
  ['super-admin', 'sales-admin']
);
