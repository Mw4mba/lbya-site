import { NextRequest, NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { mapStripeSubscriptionStatus } from '@/lib/billing/checkout';
import {
  createCheckoutSessionRecord,
  getCustomerByStripeCustomerId,
  getSubscriptionByStripeId,
  insertStripeEventIfNew,
  logBillingAudit,
  markStripeEventProcessed,
  upsertInvoiceFromStripe,
  upsertPaymentFromStripe,
  upsertProductAccess,
  upsertSubscriptionFromStripe,
} from '@/lib/billing/store';
import { getStripeServer, getWebhookSecret } from '@/lib/stripe/server';

function getUnixTimestampField(object: unknown, field: string): number | null {
  const value = (object as Record<string, unknown>)[field];
  return typeof value === 'number' ? value : null;
}

export async function POST(request: NextRequest) {
  const stripe = getStripeServer();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return new NextResponse('Missing stripe-signature header', { status: 400 });
  }

  const payload = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, getWebhookSecret());
  } catch {
    return new NextResponse('Invalid webhook signature', { status: 400 });
  }

  const shouldProcess = await insertStripeEventIfNew(event);
  if (!shouldProcess) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const stripeCustomerId = typeof session.customer === 'string' ? session.customer : null;
        if (!stripeCustomerId) break;

        const customer = await getCustomerByStripeCustomerId(stripeCustomerId);
        if (!customer) break;

        await createCheckoutSessionRecord({
          stripeCheckoutSessionId: session.id,
          customerId: customer.id,
          organizationId: session.metadata?.organizationId,
          workspaceId: session.metadata?.workspaceId,
          productCode: session.metadata?.productCode ?? 'UNKNOWN',
          planCode: session.metadata?.planCode ?? 'UNKNOWN',
          billingTerm: session.metadata?.billingTerm ?? 'yearly',
          seats: Number(session.metadata?.seats ?? '1'),
          addOnsJson: JSON.parse(session.metadata?.addOnsJson ?? '[]'),
          status: 'completed',
          paymentStatus: session.payment_status ?? 'pending',
          checkoutUrl: session.url ?? undefined,
        });

        await logBillingAudit({
          action: 'checkout_completed',
          source: 'stripe',
          organizationId: session.metadata?.organizationId,
          customerId: customer.id,
          stripeEventId: event.id,
          metadataJson: { stripeCheckoutSessionId: session.id },
        });

        break;
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const stripeCustomerId = typeof subscription.customer === 'string' ? subscription.customer : null;
        if (!stripeCustomerId) break;

        const customer = await getCustomerByStripeCustomerId(stripeCustomerId);
        if (!customer) break;

        const seats = subscription.items.data.reduce((acc, item) => acc + (item.quantity ?? 1), 0) || 1;
        const currentPeriodStartUnix = getUnixTimestampField(subscription, 'current_period_start');
        const currentPeriodEndUnix = getUnixTimestampField(subscription, 'current_period_end');

        const subscriptionId = await upsertSubscriptionFromStripe({
          customerId: customer.id,
          organizationId: subscription.metadata?.organizationId || customer.organizationId || undefined,
          stripeCustomerId,
          stripeSubscriptionId: subscription.id,
          stripePriceId: subscription.items.data[0]?.price?.id,
          productCode: subscription.metadata?.productCode ?? 'UNKNOWN',
          planCode: subscription.metadata?.planCode ?? 'UNKNOWN',
          billingTerm: subscription.metadata?.billingTerm ?? 'yearly',
          seats,
          status: mapStripeSubscriptionStatus(subscription.status),
          currentPeriodStart: currentPeriodStartUnix ? new Date(currentPeriodStartUnix * 1000) : null,
          currentPeriodEnd: currentPeriodEndUnix ? new Date(currentPeriodEndUnix * 1000) : null,
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
        });

        const mappedStatus = mapStripeSubscriptionStatus(subscription.status);
        const accessStatus = mappedStatus === 'active' || mappedStatus === 'trialing'
          ? 'pending'
          : mappedStatus === 'past_due'
            ? 'suspended'
            : 'disabled';

        await upsertProductAccess({
          organizationId: subscription.metadata?.organizationId || customer.organizationId || 'unknown_org',
          customerId: customer.id,
          subscriptionId,
          productCode: subscription.metadata?.productCode?.startsWith('MCT') ? 'MCT' : 'NBC',
          planCode: subscription.metadata?.planCode ?? 'UNKNOWN',
          status: accessStatus,
          seatsAllowed: seats,
          startsAt: currentPeriodStartUnix ? new Date(currentPeriodStartUnix * 1000) : null,
          endsAt: currentPeriodEndUnix ? new Date(currentPeriodEndUnix * 1000) : null,
          reason: mappedStatus,
        });

        await logBillingAudit({
          action: `subscription_${event.type.split('.').pop()}`,
          source: 'stripe',
          organizationId: subscription.metadata?.organizationId || customer.organizationId || undefined,
          customerId: customer.id,
          subscriptionId,
          stripeEventId: event.id,
          metadataJson: {
            stripeSubscriptionId: subscription.id,
            status: mappedStatus,
          },
        });

        break;
      }
      case 'invoice.paid':
      case 'invoice.payment_failed':
      case 'invoice.finalized':
      case 'invoice.voided': {
        const invoice = event.data.object as Stripe.Invoice;
        const stripeCustomerId = typeof invoice.customer === 'string' ? invoice.customer : null;
        if (!stripeCustomerId) break;

        const customer = await getCustomerByStripeCustomerId(stripeCustomerId);
        if (!customer) break;

        const invoiceSubscription = (invoice as unknown as { subscription?: string | null }).subscription;
        const stripeSubscriptionId = typeof invoiceSubscription === 'string' ? invoiceSubscription : null;
        const localSub = stripeSubscriptionId ? await getSubscriptionByStripeId(stripeSubscriptionId) : null;

        await upsertInvoiceFromStripe({
          customerId: customer.id,
          subscriptionId: localSub?.id,
          stripeInvoiceId: invoice.id,
          invoiceNumber: invoice.number ?? null,
          hostedInvoiceUrl: invoice.hosted_invoice_url ?? null,
          invoicePdfUrl: invoice.invoice_pdf ?? null,
          amountDue: (invoice.amount_due ?? 0) / 100,
          amountPaid: (invoice.amount_paid ?? 0) / 100,
          currency: invoice.currency ?? 'eur',
          status: invoice.status ?? 'open',
          dueDate: invoice.due_date ? new Date(invoice.due_date * 1000) : null,
          paidAt: invoice.status_transitions?.paid_at
            ? new Date(invoice.status_transitions.paid_at * 1000)
            : null,
        });

        if (event.type === 'invoice.paid' || event.type === 'invoice.payment_failed') {
          const invoicePaymentIntent = (invoice as unknown as { payment_intent?: string | null }).payment_intent;

          await upsertPaymentFromStripe({
            customerId: customer.id,
            subscriptionId: localSub?.id,
            stripePaymentIntentId: typeof invoicePaymentIntent === 'string' ? invoicePaymentIntent : null,
            stripeInvoiceId: invoice.id,
            amount: ((event.type === 'invoice.paid' ? invoice.amount_paid : invoice.amount_due) ?? 0) / 100,
            currency: invoice.currency ?? 'eur',
            status: event.type === 'invoice.paid' ? 'succeeded' : 'failed',
            paidAt: event.type === 'invoice.paid' ? new Date() : null,
            failedAt: event.type === 'invoice.payment_failed' ? new Date() : null,
            failureReason:
              event.type === 'invoice.payment_failed'
                ? (invoice.last_finalization_error?.message ?? 'Payment failed')
                : null,
          });

          if (localSub) {
            await upsertProductAccess({
              organizationId: customer.organizationId || 'unknown_org',
              customerId: customer.id,
              subscriptionId: localSub.id,
              productCode: localSub.planCode.startsWith('MCT') ? 'MCT' : 'NBC',
              planCode: localSub.planCode,
              status: event.type === 'invoice.paid' ? 'enabled' : 'suspended',
              seatsAllowed: 1,
              reason: event.type === 'invoice.paid' ? 'invoice_paid' : 'payment_failed',
            });
          }
        }

        await logBillingAudit({
          action: event.type.replace('.', '_'),
          source: 'stripe',
          organizationId: customer.organizationId || undefined,
          customerId: customer.id,
          subscriptionId: localSub?.id,
          stripeEventId: event.id,
          metadataJson: {
            stripeInvoiceId: invoice.id,
            status: invoice.status,
          },
        });

        break;
      }
      case 'payment_intent.succeeded':
      case 'payment_intent.payment_failed': {
        const intent = event.data.object as Stripe.PaymentIntent;
        const stripeCustomerId = typeof intent.customer === 'string' ? intent.customer : null;
        if (!stripeCustomerId) break;

        const customer = await getCustomerByStripeCustomerId(stripeCustomerId);
        if (!customer) break;

        await upsertPaymentFromStripe({
          customerId: customer.id,
          stripePaymentIntentId: intent.id,
          amount: (intent.amount_received || intent.amount || 0) / 100,
          currency: intent.currency || 'eur',
          status: event.type === 'payment_intent.succeeded' ? 'succeeded' : 'failed',
          paidAt: event.type === 'payment_intent.succeeded' ? new Date() : null,
          failedAt: event.type === 'payment_intent.payment_failed' ? new Date() : null,
          failureReason:
            event.type === 'payment_intent.payment_failed'
              ? intent.last_payment_error?.message ?? 'Payment failed'
              : null,
        });

        await logBillingAudit({
          action: event.type.replace('.', '_'),
          source: 'stripe',
          organizationId: customer.organizationId || undefined,
          customerId: customer.id,
          stripeEventId: event.id,
          metadataJson: { stripePaymentIntentId: intent.id },
        });

        break;
      }
      default:
        break;
    }

    await markStripeEventProcessed(event.id);
    return NextResponse.json({ received: true });
  } catch (error) {
    await logBillingAudit({
      action: 'stripe_webhook_processing_failed',
      source: 'system',
      stripeEventId: event.id,
      metadataJson: {
        error: error instanceof Error ? error.message : 'Unknown webhook error',
        eventType: event.type,
      },
    });

    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
