import { NextRequest, NextResponse } from 'next/server';
import { assertCheckoutPayload, calculateServerCheckoutSummary, resolveProductCode } from '@/lib/billing/checkout';
import { createCheckoutSessionRecord, logBillingAudit, upsertCustomer } from '@/lib/billing/store';
import { getAppUrl, getStripeServer } from '@/lib/stripe/server';

export async function POST(request: NextRequest) {
  try {
    const payload = assertCheckoutPayload(await request.json());
    const stripe = getStripeServer();

    const productCode = resolveProductCode(payload.planCode, payload.productCode);
    const { lineItems } = calculateServerCheckoutSummary(payload);

    const customer = await upsertCustomer({
      email: payload.customerEmail,
      companyName: payload.companyName,
      organizationId: payload.organizationId,
    });

    let stripeCustomerId = customer.stripeCustomerId;

    if (!stripeCustomerId) {
      const stripeCustomer = await stripe.customers.create({
        email: payload.customerEmail,
        name: payload.companyName,
        metadata: {
          localCustomerId: customer.id,
          source: 'lbya_website_cart',
        },
      });

      stripeCustomerId = stripeCustomer.id;

      await upsertCustomer({
        email: payload.customerEmail,
        companyName: payload.companyName,
        organizationId: payload.organizationId,
        stripeCustomerId,
      });
    }

    const appUrl = getAppUrl();
    const successUrl = payload.successUrl || `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = payload.cancelUrl || `${appUrl}/checkout/cancel`;

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: stripeCustomerId,
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      customer_update: {
        address: 'auto',
        name: 'auto',
      },
      metadata: {
        organizationId: payload.organizationId || 'unknown_org',
        workspaceId: payload.workspaceId || '',
        productCode,
        planCode: payload.planCode,
        billingTerm: payload.billingTerm,
        seats: String(payload.seats),
        addOnsJson: JSON.stringify(payload.addOns ?? []),
        source: 'lbya_website_cart',
      },
      subscription_data: {
        metadata: {
          organizationId: payload.organizationId || 'unknown_org',
          workspaceId: payload.workspaceId || '',
          productCode,
          planCode: payload.planCode,
          billingTerm: payload.billingTerm,
          seats: String(payload.seats),
          addOnsJson: JSON.stringify(payload.addOns ?? []),
          source: 'lbya_website_cart',
        },
      },
    });

    await createCheckoutSessionRecord({
      stripeCheckoutSessionId: session.id,
      customerId: customer.id,
      organizationId: payload.organizationId,
      workspaceId: payload.workspaceId,
      productCode,
      planCode: payload.planCode,
      billingTerm: payload.billingTerm,
      seats: payload.seats,
      addOnsJson: payload.addOns ?? [],
      status: 'created',
      paymentStatus: session.payment_status ?? 'unpaid',
      checkoutUrl: session.url ?? undefined,
    });

    await logBillingAudit({
      action: 'checkout_session_created',
      source: 'website',
      organizationId: payload.organizationId,
      customerId: customer.id,
      metadataJson: {
        stripeCheckoutSessionId: session.id,
        productCode,
        planCode: payload.planCode,
        billingTerm: payload.billingTerm,
        seats: payload.seats,
      },
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create checkout session';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
