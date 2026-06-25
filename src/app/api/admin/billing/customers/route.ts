import { NextResponse } from 'next/server';
import { withAdminGuard } from '@/app/api/admin/_lib/guard';
import { getBillingAdminDataset } from '@/lib/billing/store';

export const GET = withAdminGuard(async () => {
  const { customers } = await getBillingAdminDataset();
  return NextResponse.json({ items: customers, total: customers.length });
});
