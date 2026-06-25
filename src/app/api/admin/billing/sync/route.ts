import { NextResponse } from 'next/server';
import { withAdminGuard } from '@/app/api/admin/_lib/guard';
import { getStripeServer } from '@/lib/stripe/server';
import { logBillingAudit } from '@/lib/billing/store';

export const POST = withAdminGuard(async (_, session) => {
  const stripe = getStripeServer();

  // Lightweight sync: verifies Stripe connectivity and fetches recent objects.
  const [customers, subscriptions, invoices] = await Promise.all([
    stripe.customers.list({ limit: 25 }),
    stripe.subscriptions.list({ limit: 25 }),
    stripe.invoices.list({ limit: 25 }),
  ]);

  await logBillingAudit({
    action: 'admin_sync_from_stripe',
    source: 'admin',
    actorUserId: session.email,
    metadataJson: {
      customersFetched: customers.data.length,
      subscriptionsFetched: subscriptions.data.length,
      invoicesFetched: invoices.data.length,
    },
  });

  return NextResponse.json({
    ok: true,
    customersFetched: customers.data.length,
    subscriptionsFetched: subscriptions.data.length,
    invoicesFetched: invoices.data.length,
  });
});
