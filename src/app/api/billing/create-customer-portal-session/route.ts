import { NextRequest, NextResponse } from 'next/server';
import { getAdminAppUrl, getStripeServer } from '@/lib/stripe/server';
import { ensureBillingSchema } from '@/lib/billing/store';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => null)) as { customerId?: string } | null;

    if (!body?.customerId) {
      return NextResponse.json({ error: 'customerId is required' }, { status: 400 });
    }

    await ensureBillingSchema();

    const rows = (await prisma.$queryRawUnsafe(
      `SELECT stripe_customer_id as "stripeCustomerId" FROM billing_customers WHERE id = $1 LIMIT 1`,
      body.customerId
    )) as Array<{ stripeCustomerId: string | null }>;

    const stripeCustomerId = rows[0]?.stripeCustomerId;

    if (!stripeCustomerId) {
      return NextResponse.json({ error: 'No Stripe customer found for customerId' }, { status: 404 });
    }

    const stripe = getStripeServer();
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${getAdminAppUrl()}/customers`,
    });

    return NextResponse.json({ portalUrl: portalSession.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create portal session';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
