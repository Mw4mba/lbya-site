import { NextResponse, type NextRequest } from 'next/server';
import { withAdminGuard } from '../../_lib/guard';
import { subscribers } from '@/app/components/admin/mockData';

export const GET = withAdminGuard(async (_request, _session) => {
  return NextResponse.json({
    item: subscribers[0] ?? null,
  });
});

export const PATCH = withAdminGuard(async (request: NextRequest) => {
  const body = await request.json().catch(() => ({}));
  return NextResponse.json({ updated: true, payload: body });
});
