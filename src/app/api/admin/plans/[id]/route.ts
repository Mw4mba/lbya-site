import { NextResponse, type NextRequest } from 'next/server';
import { withAdminGuard } from '../../_lib/guard';
import { deletePlanPricingById, updatePlanPricingById } from '@/lib/billingStore';

export const PATCH = withAdminGuard(
  async (request: NextRequest, _session) => {
    const id = request.nextUrl.pathname.split('/').pop() ?? '';
    const body = await request.json().catch(() => ({} as Record<string, unknown>));

    const updated = await updatePlanPricingById(id, {
      product: body.product === 'NBC' || body.product === 'MCT' ? (body.product as 'NBC' | 'MCT') : undefined,
      plan: typeof body.plan === 'string' ? body.plan : undefined,
      status:
        body.status === 'Active' || body.status === 'Hidden' || body.status === 'Deprecated'
          ? (body.status as 'Active' | 'Hidden' | 'Deprecated')
          : undefined,
      monthlyPrice: typeof body.monthlyPrice === 'string' ? body.monthlyPrice : undefined,
      yearlyPrice: typeof body.yearlyPrice === 'string' ? body.yearlyPrice : undefined,
      seats: typeof body.seats === 'string' ? body.seats : undefined,
    });

    if (!updated) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    }

    return NextResponse.json({ updated: true, item: updated });
  },
  ['super-admin', 'product-admin-operator']
);

export const DELETE = withAdminGuard(
  async (request: NextRequest) => {
    const id = request.nextUrl.pathname.split('/').pop() ?? '';
    await deletePlanPricingById(id);
    return new NextResponse(null, { status: 204 });
  },
  ['super-admin', 'product-admin-operator']
);
