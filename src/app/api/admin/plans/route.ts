import { NextResponse, type NextRequest } from 'next/server';
import { withAdminGuard } from '../_lib/guard';

const plans = [
  { id: 'starter', name: 'Starter', monthly: '59', annual: '590', active: true },
  { id: 'professional', name: 'Professional', monthly: '149', annual: '1490', active: true },
  { id: 'business', name: 'Business', monthly: '389', annual: '3890', active: true },
  { id: 'enterprise', name: 'Enterprise', monthly: 'quote', annual: 'quote', active: true },
];

export const GET = withAdminGuard(
  async () => {
    return NextResponse.json({ items: plans, total: plans.length });
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
