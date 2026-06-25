import { NextResponse } from 'next/server';
import { withAdminGuard } from '@/app/api/admin/_lib/guard';
import { getBillingAdminDataset } from '@/lib/billing/store';

function num(value: unknown): number {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

export const GET = withAdminGuard(async () => {
  const { payments, subscriptions } = await getBillingAdminDataset();

  const succeededPayments = payments.filter((p) => `${p.status}`.toLowerCase() === 'succeeded');
  const revenueYtd = succeededPayments.reduce((acc, p) => acc + num(p.amount), 0);
  const mrr = subscriptions
    .filter((s) => `${s.status}`.toLowerCase() === 'active' && `${s.billingTerm}` === 'monthly')
    .reduce((acc, s) => acc + num((s as Record<string, unknown>).mrr), 0);

  const arr = mrr * 12;

  return NextResponse.json({
    mrr,
    arr,
    revenueYtd,
    paymentCount: succeededPayments.length,
  });
});
