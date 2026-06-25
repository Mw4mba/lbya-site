import { NextResponse } from 'next/server';
import { withAdminGuard } from '@/app/api/admin/_lib/guard';
import { getBillingAdminDataset } from '@/lib/billing/store';

export const GET = withAdminGuard(async () => {
  const { payments } = await getBillingAdminDataset();
  const items = payments.filter((item) => `${item.status}`.toLowerCase() === 'failed');
  return NextResponse.json({ items, total: items.length });
});
