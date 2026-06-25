import { NextResponse } from 'next/server';
import { withAdminGuard } from '@/app/api/admin/_lib/guard';
import { getBillingAdminDataset } from '@/lib/billing/store';

function toNumber(value: unknown): number {
  const n = Number(value ?? 0);
  return Number.isFinite(n) ? n : 0;
}

export const GET = withAdminGuard(async () => {
  const { subscriptions, payments, invoices, access } = await getBillingAdminDataset();

  const activeSubscriptions = subscriptions.filter((s) => `${s.status}`.toLowerCase() === 'active').length;
  const trialAccounts = subscriptions.filter((s) => `${s.status}`.toLowerCase() === 'trialing').length;
  const failedPayments = payments.filter((p) => `${p.status}`.toLowerCase() === 'failed').length;
  const renewalRisk = subscriptions.filter((s) => ['past_due', 'unpaid', 'incomplete'].includes(`${s.status}`.toLowerCase())).length;
  const outstandingInvoices = invoices
    .filter((i) => !['paid', 'void'].includes(`${i.status}`.toLowerCase()))
    .reduce((acc, i) => acc + toNumber(i.amountDue), 0);
  const productAccessIssues = access.filter((a) => ['suspended', 'disabled', 'manual_review_required'].includes(`${a.status}`.toLowerCase())).length;

  const mrr = subscriptions
    .filter((s) => `${s.status}`.toLowerCase() === 'active')
    .reduce((acc, s) => {
      const term = `${s.billingTerm}`;
      const amount = toNumber((s as Record<string, unknown>).mrr ?? 0);
      if (amount > 0) return acc + amount;
      if (term === 'monthly') return acc + 0;
      if (term === 'yearly') return acc + 0;
      return acc + 0;
    }, 0);

  return NextResponse.json({
    mrr,
    arr: mrr * 12,
    activeSubscriptions,
    trialAccounts,
    failedPayments,
    renewalRisk,
    outstandingInvoices,
    productAccessIssues,
  });
});
