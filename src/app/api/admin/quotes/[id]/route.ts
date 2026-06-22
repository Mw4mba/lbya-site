import { NextResponse, type NextRequest } from 'next/server';
import { withAdminGuard } from '../../_lib/guard';
import { quoteRequests } from '@/app/components/admin/mockData';

export const GET = withAdminGuard(
  async () => {
    return NextResponse.json({ item: quoteRequests[0] ?? null });
  },
  ['super-admin', 'sales-admin']
);

export const PATCH = withAdminGuard(
  async (request: NextRequest) => {
    const body = await request.json().catch(() => ({}));
    return NextResponse.json({ updated: true, payload: body });
  },
  ['super-admin', 'sales-admin']
);
