import type Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

export type BillingCustomerRow = {
  id: string;
  organizationId: string | null;
  companyName: string | null;
  contactName: string | null;
  email: string;
  country: string | null;
  vatNumber: string | null;
  stripeCustomerId: string | null;
  createdAt: string;
  updatedAt: string;
};

let ready = false;

export async function ensureBillingSchema(): Promise<void> {
  if (ready) return;

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS billing_customers (
      id TEXT PRIMARY KEY,
      organization_id TEXT,
      company_name TEXT,
      contact_name TEXT,
      email TEXT NOT NULL UNIQUE,
      country TEXT,
      vat_number TEXT,
      stripe_customer_id TEXT UNIQUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS billing_subscriptions (
      id TEXT PRIMARY KEY,
      customer_id TEXT NOT NULL,
      organization_id TEXT,
      product_code TEXT NOT NULL,
      plan_code TEXT NOT NULL,
      billing_term TEXT NOT NULL,
      seats INTEGER NOT NULL,
      status TEXT NOT NULL,
      stripe_subscription_id TEXT NOT NULL UNIQUE,
      stripe_customer_id TEXT NOT NULL,
      stripe_price_id TEXT,
      current_period_start TIMESTAMPTZ,
      current_period_end TIMESTAMPTZ,
      cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS billing_payments (
      id TEXT PRIMARY KEY,
      customer_id TEXT NOT NULL,
      subscription_id TEXT,
      stripe_payment_intent_id TEXT,
      stripe_invoice_id TEXT,
      amount NUMERIC(14,2) NOT NULL,
      currency TEXT NOT NULL,
      status TEXT NOT NULL,
      paid_at TIMESTAMPTZ,
      failed_at TIMESTAMPTZ,
      failure_reason TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS billing_invoices (
      id TEXT PRIMARY KEY,
      customer_id TEXT NOT NULL,
      subscription_id TEXT,
      stripe_invoice_id TEXT NOT NULL UNIQUE,
      invoice_number TEXT,
      hosted_invoice_url TEXT,
      invoice_pdf_url TEXT,
      amount_due NUMERIC(14,2) NOT NULL,
      amount_paid NUMERIC(14,2) NOT NULL,
      currency TEXT NOT NULL,
      status TEXT NOT NULL,
      due_date TIMESTAMPTZ,
      paid_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS billing_product_access (
      id TEXT PRIMARY KEY,
      organization_id TEXT NOT NULL,
      customer_id TEXT NOT NULL,
      subscription_id TEXT,
      product_code TEXT NOT NULL,
      plan_code TEXT NOT NULL,
      status TEXT NOT NULL,
      seats_allowed INTEGER NOT NULL,
      seats_used INTEGER NOT NULL DEFAULT 0,
      starts_at TIMESTAMPTZ,
      ends_at TIMESTAMPTZ,
      reason TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE(customer_id, plan_code)
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS billing_stripe_events (
      id TEXT PRIMARY KEY,
      stripe_event_id TEXT NOT NULL UNIQUE,
      event_type TEXT NOT NULL,
      processed BOOLEAN NOT NULL DEFAULT FALSE,
      processed_at TIMESTAMPTZ,
      payload_json JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS billing_checkout_sessions (
      id TEXT PRIMARY KEY,
      stripe_checkout_session_id TEXT NOT NULL UNIQUE,
      customer_id TEXT NOT NULL,
      organization_id TEXT,
      workspace_id TEXT,
      product_code TEXT NOT NULL,
      plan_code TEXT NOT NULL,
      billing_term TEXT NOT NULL,
      seats INTEGER NOT NULL,
      add_ons_json JSONB NOT NULL DEFAULT '[]'::jsonb,
      status TEXT NOT NULL,
      payment_status TEXT,
      checkout_url TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS billing_audit_logs (
      id TEXT PRIMARY KEY,
      organization_id TEXT,
      customer_id TEXT,
      subscription_id TEXT,
      action TEXT NOT NULL,
      source TEXT NOT NULL,
      actor_user_id TEXT,
      stripe_event_id TEXT,
      metadata_json JSONB,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  ready = true;
}

function id(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
}

export async function getCustomerByEmail(email: string): Promise<BillingCustomerRow | null> {
  await ensureBillingSchema();
  const rows = (await prisma.$queryRawUnsafe(
    `SELECT id, organization_id as "organizationId", company_name as "companyName", contact_name as "contactName", email, country, vat_number as "vatNumber", stripe_customer_id as "stripeCustomerId", created_at as "createdAt", updated_at as "updatedAt"
     FROM billing_customers
     WHERE lower(email) = lower($1)
     LIMIT 1`,
    email
  )) as BillingCustomerRow[];
  return rows[0] ?? null;
}

export async function upsertCustomer(input: {
  email: string;
  companyName?: string;
  organizationId?: string;
  stripeCustomerId?: string;
}): Promise<BillingCustomerRow> {
  await ensureBillingSchema();

  const existing = await getCustomerByEmail(input.email);

  if (!existing) {
    const newId = id('cust');
    await prisma.$executeRawUnsafe(
      `INSERT INTO billing_customers (id, organization_id, company_name, email, stripe_customer_id)
       VALUES ($1, $2, $3, $4, $5)`,
      newId,
      input.organizationId ?? null,
      input.companyName ?? null,
      input.email,
      input.stripeCustomerId ?? null
    );
    const created = await getCustomerByEmail(input.email);
    if (!created) {
      throw new Error('Unable to create customer');
    }
    return created;
  }

  await prisma.$executeRawUnsafe(
    `UPDATE billing_customers
     SET organization_id = COALESCE($2, organization_id),
         company_name = COALESCE($3, company_name),
         stripe_customer_id = COALESCE($4, stripe_customer_id),
         updated_at = NOW()
     WHERE id = $1`,
    existing.id,
    input.organizationId ?? null,
    input.companyName ?? null,
    input.stripeCustomerId ?? null
  );

  const updated = await getCustomerByEmail(input.email);
  if (!updated) throw new Error('Unable to update customer');
  return updated;
}

export async function createCheckoutSessionRecord(input: {
  stripeCheckoutSessionId: string;
  customerId: string;
  organizationId?: string;
  workspaceId?: string;
  productCode: string;
  planCode: string;
  billingTerm: string;
  seats: number;
  addOnsJson: unknown;
  status: string;
  paymentStatus?: string;
  checkoutUrl?: string;
}): Promise<void> {
  await ensureBillingSchema();

  await prisma.$executeRawUnsafe(
    `INSERT INTO billing_checkout_sessions (
      id, stripe_checkout_session_id, customer_id, organization_id, workspace_id,
      product_code, plan_code, billing_term, seats, add_ons_json, status, payment_status, checkout_url
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10::jsonb, $11, $12, $13)
    ON CONFLICT (stripe_checkout_session_id) DO UPDATE SET
      status = EXCLUDED.status,
      payment_status = EXCLUDED.payment_status,
      checkout_url = COALESCE(EXCLUDED.checkout_url, billing_checkout_sessions.checkout_url),
      updated_at = NOW()`,
    id('chk'),
    input.stripeCheckoutSessionId,
    input.customerId,
    input.organizationId ?? null,
    input.workspaceId ?? null,
    input.productCode,
    input.planCode,
    input.billingTerm,
    input.seats,
    JSON.stringify(input.addOnsJson ?? []),
    input.status,
    input.paymentStatus ?? null,
    input.checkoutUrl ?? null
  );
}

export async function getCheckoutStatusBySessionId(sessionId: string): Promise<{
  status: string;
  paymentStatus: string | null;
  customerEmail: string | null;
  subscriptionStatus: string | null;
  productAccessStatus: string | null;
} | null> {
  await ensureBillingSchema();

  const rows = (await prisma.$queryRawUnsafe(
    `SELECT
      cs.status as status,
      cs.payment_status as "paymentStatus",
      c.email as "customerEmail",
      s.status as "subscriptionStatus",
      pa.status as "productAccessStatus"
     FROM billing_checkout_sessions cs
     LEFT JOIN billing_customers c ON c.id = cs.customer_id
     LEFT JOIN billing_subscriptions s ON s.customer_id = cs.customer_id AND s.plan_code = cs.plan_code
     LEFT JOIN billing_product_access pa ON pa.customer_id = cs.customer_id AND pa.plan_code = cs.plan_code
     WHERE cs.stripe_checkout_session_id = $1
     ORDER BY cs.updated_at DESC
     LIMIT 1`,
    sessionId
  )) as Array<{
    status: string;
    paymentStatus: string | null;
    customerEmail: string | null;
    subscriptionStatus: string | null;
    productAccessStatus: string | null;
  }>;

  return rows[0] ?? null;
}

export async function upsertSubscriptionFromStripe(input: {
  customerId: string;
  organizationId?: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  stripePriceId?: string;
  productCode: string;
  planCode: string;
  billingTerm: string;
  seats: number;
  status: string;
  currentPeriodStart?: Date | null;
  currentPeriodEnd?: Date | null;
  cancelAtPeriodEnd?: boolean;
}): Promise<string> {
  await ensureBillingSchema();

  const localSubscriptionId = id('sub');

  await prisma.$executeRawUnsafe(
    `INSERT INTO billing_subscriptions (
      id, customer_id, organization_id, product_code, plan_code, billing_term, seats,
      status, stripe_subscription_id, stripe_customer_id, stripe_price_id,
      current_period_start, current_period_end, cancel_at_period_end
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7,
      $8, $9, $10, $11,
      $12, $13, $14
    )
    ON CONFLICT (stripe_subscription_id) DO UPDATE SET
      status = EXCLUDED.status,
      product_code = EXCLUDED.product_code,
      plan_code = EXCLUDED.plan_code,
      billing_term = EXCLUDED.billing_term,
      seats = EXCLUDED.seats,
      stripe_price_id = COALESCE(EXCLUDED.stripe_price_id, billing_subscriptions.stripe_price_id),
      current_period_start = EXCLUDED.current_period_start,
      current_period_end = EXCLUDED.current_period_end,
      cancel_at_period_end = EXCLUDED.cancel_at_period_end,
      updated_at = NOW()`,
    localSubscriptionId,
    input.customerId,
    input.organizationId ?? null,
    input.productCode,
    input.planCode,
    input.billingTerm,
    input.seats,
    input.status,
    input.stripeSubscriptionId,
    input.stripeCustomerId,
    input.stripePriceId ?? null,
    input.currentPeriodStart ?? null,
    input.currentPeriodEnd ?? null,
    input.cancelAtPeriodEnd ?? false
  );

  const rows = (await prisma.$queryRawUnsafe(
    `SELECT id FROM billing_subscriptions WHERE stripe_subscription_id = $1 LIMIT 1`,
    input.stripeSubscriptionId
  )) as Array<{ id: string }>;

  return rows[0]?.id ?? localSubscriptionId;
}

export async function upsertInvoiceFromStripe(input: {
  customerId: string;
  subscriptionId?: string;
  stripeInvoiceId: string;
  invoiceNumber?: string | null;
  hostedInvoiceUrl?: string | null;
  invoicePdfUrl?: string | null;
  amountDue: number;
  amountPaid: number;
  currency: string;
  status: string;
  dueDate?: Date | null;
  paidAt?: Date | null;
}): Promise<void> {
  await ensureBillingSchema();

  await prisma.$executeRawUnsafe(
    `INSERT INTO billing_invoices (
      id, customer_id, subscription_id, stripe_invoice_id, invoice_number,
      hosted_invoice_url, invoice_pdf_url, amount_due, amount_paid, currency,
      status, due_date, paid_at
    ) VALUES (
      $1, $2, $3, $4, $5,
      $6, $7, $8, $9, $10,
      $11, $12, $13
    )
    ON CONFLICT (stripe_invoice_id) DO UPDATE SET
      invoice_number = COALESCE(EXCLUDED.invoice_number, billing_invoices.invoice_number),
      hosted_invoice_url = COALESCE(EXCLUDED.hosted_invoice_url, billing_invoices.hosted_invoice_url),
      invoice_pdf_url = COALESCE(EXCLUDED.invoice_pdf_url, billing_invoices.invoice_pdf_url),
      amount_due = EXCLUDED.amount_due,
      amount_paid = EXCLUDED.amount_paid,
      currency = EXCLUDED.currency,
      status = EXCLUDED.status,
      due_date = EXCLUDED.due_date,
      paid_at = EXCLUDED.paid_at,
      updated_at = NOW()`,
    id('inv'),
    input.customerId,
    input.subscriptionId ?? null,
    input.stripeInvoiceId,
    input.invoiceNumber ?? null,
    input.hostedInvoiceUrl ?? null,
    input.invoicePdfUrl ?? null,
    input.amountDue,
    input.amountPaid,
    input.currency,
    input.status,
    input.dueDate ?? null,
    input.paidAt ?? null
  );
}

export async function upsertPaymentFromStripe(input: {
  customerId: string;
  subscriptionId?: string;
  stripePaymentIntentId?: string | null;
  stripeInvoiceId?: string | null;
  amount: number;
  currency: string;
  status: string;
  paidAt?: Date | null;
  failedAt?: Date | null;
  failureReason?: string | null;
}): Promise<void> {
  await ensureBillingSchema();

  await prisma.$executeRawUnsafe(
    `INSERT INTO billing_payments (
      id, customer_id, subscription_id, stripe_payment_intent_id, stripe_invoice_id,
      amount, currency, status, paid_at, failed_at, failure_reason
    ) VALUES (
      $1, $2, $3, $4, $5,
      $6, $7, $8, $9, $10, $11
    )`,
    id('pay'),
    input.customerId,
    input.subscriptionId ?? null,
    input.stripePaymentIntentId ?? null,
    input.stripeInvoiceId ?? null,
    input.amount,
    input.currency,
    input.status,
    input.paidAt ?? null,
    input.failedAt ?? null,
    input.failureReason ?? null
  );
}

export async function upsertProductAccess(input: {
  organizationId: string;
  customerId: string;
  subscriptionId?: string;
  productCode: string;
  planCode: string;
  status: string;
  seatsAllowed: number;
  startsAt?: Date | null;
  endsAt?: Date | null;
  reason?: string;
}): Promise<void> {
  await ensureBillingSchema();

  await prisma.$executeRawUnsafe(
    `INSERT INTO billing_product_access (
      id, organization_id, customer_id, subscription_id, product_code, plan_code,
      status, seats_allowed, starts_at, ends_at, reason
    ) VALUES (
      $1, $2, $3, $4, $5, $6,
      $7, $8, $9, $10, $11
    )
    ON CONFLICT (customer_id, plan_code) DO UPDATE SET
      organization_id = EXCLUDED.organization_id,
      subscription_id = EXCLUDED.subscription_id,
      product_code = EXCLUDED.product_code,
      status = EXCLUDED.status,
      seats_allowed = EXCLUDED.seats_allowed,
      starts_at = EXCLUDED.starts_at,
      ends_at = EXCLUDED.ends_at,
      reason = EXCLUDED.reason,
      updated_at = NOW()`,
    id('acc'),
    input.organizationId,
    input.customerId,
    input.subscriptionId ?? null,
    input.productCode,
    input.planCode,
    input.status,
    input.seatsAllowed,
    input.startsAt ?? null,
    input.endsAt ?? null,
    input.reason ?? null
  );
}

export async function getCustomerByStripeCustomerId(stripeCustomerId: string): Promise<BillingCustomerRow | null> {
  await ensureBillingSchema();

  const rows = (await prisma.$queryRawUnsafe(
    `SELECT id, organization_id as "organizationId", company_name as "companyName", contact_name as "contactName", email, country, vat_number as "vatNumber", stripe_customer_id as "stripeCustomerId", created_at as "createdAt", updated_at as "updatedAt"
     FROM billing_customers
     WHERE stripe_customer_id = $1
     LIMIT 1`,
    stripeCustomerId
  )) as BillingCustomerRow[];

  return rows[0] ?? null;
}

export async function getSubscriptionByStripeId(stripeSubscriptionId: string): Promise<{ id: string; customerId: string; planCode: string } | null> {
  await ensureBillingSchema();

  const rows = (await prisma.$queryRawUnsafe(
    `SELECT id, customer_id as "customerId", plan_code as "planCode"
     FROM billing_subscriptions
     WHERE stripe_subscription_id = $1
     LIMIT 1`,
    stripeSubscriptionId
  )) as Array<{ id: string; customerId: string; planCode: string }>;

  return rows[0] ?? null;
}

export async function insertStripeEventIfNew(event: Stripe.Event): Promise<boolean> {
  await ensureBillingSchema();

  const existingRows = (await prisma.$queryRawUnsafe(
    `SELECT stripe_event_id FROM billing_stripe_events WHERE stripe_event_id = $1 LIMIT 1`,
    event.id
  )) as Array<{ stripe_event_id: string }>;

  if (existingRows.length > 0) return false;

  await prisma.$executeRawUnsafe(
    `INSERT INTO billing_stripe_events (id, stripe_event_id, event_type, processed, payload_json)
     VALUES ($1, $2, $3, FALSE, $4::jsonb)`,
    id('evt'),
    event.id,
    event.type,
    JSON.stringify(event)
  );

  return true;
}

export async function markStripeEventProcessed(eventId: string): Promise<void> {
  await ensureBillingSchema();
  await prisma.$executeRawUnsafe(
    `UPDATE billing_stripe_events
     SET processed = TRUE, processed_at = NOW()
     WHERE stripe_event_id = $1`,
    eventId
  );
}

export async function logBillingAudit(input: {
  action: string;
  source: 'stripe' | 'admin' | 'system' | 'website';
  organizationId?: string;
  customerId?: string;
  subscriptionId?: string;
  actorUserId?: string;
  stripeEventId?: string;
  metadataJson?: unknown;
}): Promise<void> {
  await ensureBillingSchema();

  await prisma.$executeRawUnsafe(
    `INSERT INTO billing_audit_logs (
      id, organization_id, customer_id, subscription_id, action, source, actor_user_id, stripe_event_id, metadata_json
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb
    )`,
    id('alog'),
    input.organizationId ?? null,
    input.customerId ?? null,
    input.subscriptionId ?? null,
    input.action,
    input.source,
    input.actorUserId ?? null,
    input.stripeEventId ?? null,
    JSON.stringify(input.metadataJson ?? {})
  );
}

export async function getBillingAdminDataset() {
  await ensureBillingSchema();

  const customers = (await prisma.$queryRawUnsafe(
    `SELECT id, company_name as company, email, stripe_customer_id as "stripeCustomerId", created_at as "createdAt", updated_at as "updatedAt"
     FROM billing_customers
     ORDER BY updated_at DESC`
  )) as Array<Record<string, unknown>>;

  const subscriptions = (await prisma.$queryRawUnsafe(
    `SELECT id, customer_id as "customerId", product_code as product, plan_code as plan,
            billing_term as "billingTerm", seats, status, stripe_subscription_id as "stripeSubscriptionId",
            current_period_end as "currentPeriodEnd", cancel_at_period_end as "cancelAtPeriodEnd",
            updated_at as "updatedAt"
     FROM billing_subscriptions
     ORDER BY updated_at DESC`
  )) as Array<Record<string, unknown>>;

  const payments = (await prisma.$queryRawUnsafe(
    `SELECT id, customer_id as "customerId", amount, currency, status,
            stripe_payment_intent_id as "stripePaymentIntentId", stripe_invoice_id as "stripeInvoiceId",
            paid_at as "paidAt", failure_reason as "failureReason", updated_at as "updatedAt"
     FROM billing_payments
     ORDER BY updated_at DESC`
  )) as Array<Record<string, unknown>>;

  const invoices = (await prisma.$queryRawUnsafe(
    `SELECT id, customer_id as "customerId", stripe_invoice_id as "stripeInvoiceId", invoice_number as "invoiceNumber",
            amount_due as "amountDue", amount_paid as "amountPaid", currency, status,
            due_date as "dueDate", hosted_invoice_url as "hostedInvoiceUrl", invoice_pdf_url as "invoicePdfUrl", updated_at as "updatedAt"
     FROM billing_invoices
     ORDER BY updated_at DESC`
  )) as Array<Record<string, unknown>>;

  const access = (await prisma.$queryRawUnsafe(
    `SELECT id, organization_id as "organizationId", customer_id as "customerId", product_code as product,
            plan_code as plan, seats_used as "seatsUsed", seats_allowed as "seatsAllowed",
            status, subscription_id as "subscriptionId", reason, updated_at as "updatedAt"
     FROM billing_product_access
     ORDER BY updated_at DESC`
  )) as Array<Record<string, unknown>>;

  const audit = (await prisma.$queryRawUnsafe(
    `SELECT id, action, source, stripe_event_id as "stripeEventId", created_at as "createdAt", metadata_json as "metadataJson"
     FROM billing_audit_logs
     ORDER BY created_at DESC
     LIMIT 500`
  )) as Array<Record<string, unknown>>;

  return { customers, subscriptions, payments, invoices, access, audit };
}

export async function updateProductAccessStatus(input: {
  accessId: string;
  status: 'enabled' | 'suspended';
  reason: string;
}): Promise<void> {
  await ensureBillingSchema();

  await prisma.$executeRawUnsafe(
    `UPDATE billing_product_access
     SET status = $2,
         reason = $3,
         updated_at = NOW()
     WHERE id = $1`,
    input.accessId,
    input.status,
    input.reason
  );
}
