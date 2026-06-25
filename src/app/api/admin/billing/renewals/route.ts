import { NextResponse } from 'next/server';
import { withAdminGuard } from '@/app/api/admin/_lib/guard';
import { getBillingAdminDataset } from '@/lib/billing/store';

export const GET = withAdminGuard(async () => {
  const { subscriptions } = await getBillingAdminDataset();
  const items = subscriptions
    .filter((item) => ['active', 'past_due', 'unpaid'].includes(`${item.status}`.toLowerCase()))
    .sort((a, b) => new Date(`${a.currentPeriodEnd ?? ''}`).getTime() - new Date(`${b.currentPeriodEnd ?? ''}`).getTime());

  return NextResponse.json({ items, total: items.length });
});
