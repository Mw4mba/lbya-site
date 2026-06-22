import { NextResponse } from 'next/server';
import { withAdminGuard } from '../../_lib/guard';
import { quoteRequests } from '@/app/components/admin/mockData';

export const GET = withAdminGuard(
  async () => {
    return NextResponse.json({
      report: 'quotes',
      total: quoteRequests.length,
      generatedAt: new Date().toISOString(),
    });
  },
  ['super-admin', 'sales-admin']
);
