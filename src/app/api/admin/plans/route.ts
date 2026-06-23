import { NextResponse, type NextRequest } from 'next/server';
import { withAdminGuard } from '../_lib/guard';
import { getAllPlanPricing, upsertPlanPricing } from '@/lib/billingStore';

export const GET = withAdminGuard(
  async () => {
    const plans = await getAllPlanPricing();
    return NextResponse.json({ items: plans, total: plans.length });
  },
  ['super-admin', 'product-admin-operator']
);

export const POST = withAdminGuard(
  async (request: NextRequest) => {
    const body = await request.json().catch(() => ({} as Record<string, unknown>));

    const created = await upsertPlanPricing({
      id: String(body.id ?? `price_${Date.now()}`),
      product: (body.product === 'NBC' ? 'NBC' : 'MCT') as 'NBC' | 'MCT',
      plan: String(body.plan ?? body.name ?? 'Unnamed Plan'),
      status: (body.status === 'Hidden' || body.status === 'Deprecated' ? body.status : 'Active') as
        | 'Active'
        | 'Hidden'
        | 'Deprecated',
      monthlyPrice: String(body.monthlyPrice ?? body.monthly ?? 'Quote'),
      yearlyPrice: String(body.yearlyPrice ?? body.annual ?? 'Quote'),
      seats: String(body.seats ?? 'Custom'),
    });

    return NextResponse.json({ created: true, item: created }, { status: 201 });
  },
  ['super-admin', 'product-admin-operator']
);
