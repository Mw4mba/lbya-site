import { NextResponse } from 'next/server';
import { withAdminGuard } from '@/app/api/admin/_lib/guard';
import { getBillingAdminDataset } from '@/lib/billing/store';

export const GET = withAdminGuard(async () => {
  const { payments } = await getBillingAdminDataset();
  return NextResponse.json({ items: payments, total: payments.length });
});
