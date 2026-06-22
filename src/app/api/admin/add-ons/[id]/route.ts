import { NextResponse, type NextRequest } from 'next/server';
import { withAdminGuard } from '../../_lib/guard';

export const PATCH = withAdminGuard(
  async (request: NextRequest) => {
    const body = await request.json().catch(() => ({}));
    return NextResponse.json({ updated: true, payload: body });
  },
  ['super-admin', 'product-admin-operator']
);
