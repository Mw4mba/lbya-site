import { NextResponse, type NextRequest } from 'next/server';
import { withAdminGuard } from '../_lib/guard';

const addOns = [
  { id: 'advanced-analytics', name: 'Advanced Analytics', active: true },
  { id: 'api-access', name: 'API Access', active: true },
  { id: 'premium-support', name: 'Premium Support', active: true },
];

export const GET = withAdminGuard(
  async () => {
    return NextResponse.json({ items: addOns, total: addOns.length });
  },
  ['super-admin', 'product-admin-operator']
);

export const POST = withAdminGuard(
  async (request: NextRequest) => {
    const body = await request.json().catch(() => ({}));
    return NextResponse.json({ created: true, payload: body }, { status: 201 });
  },
  ['super-admin', 'product-admin-operator']
);
