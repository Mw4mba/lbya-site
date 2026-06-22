import { NextResponse, type NextRequest } from 'next/server';
import { withAdminGuard } from '../../_lib/guard';

export const POST = withAdminGuard(
  async (request: NextRequest) => {
    const body = await request.json().catch(() => ({}));
    return NextResponse.json({ exported: true, format: body?.format ?? 'csv' });
  },
  ['super-admin', 'finance-admin']
);
