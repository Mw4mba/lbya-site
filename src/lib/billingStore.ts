import { prisma } from '@/lib/prisma';
import { mockClientAccountSubscriptions, packagePricingCatalog } from '@/data/mockAdminBilling';

export type PlanPricingRecord = {
  id: string;
  product: 'NBC' | 'MCT';
  plan: string;
  status: 'Active' | 'Hidden' | 'Deprecated';
  monthlyPrice: string;
  yearlyPrice: string;
  seats: string;
};

export type AccountSubscriptionWithPricing = {
  id: string;
  accountEmail: string;
  plan: string;
  renewalDate: string;
  paymentStatus: string;
  users: number;
  monthlyPrice: string;
  yearlyPrice: string;
};

let initialized = false;

async function ensureBillingTables() {
  if (initialized) return;

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS plan_pricing (
      id TEXT PRIMARY KEY,
      product TEXT NOT NULL,
      plan TEXT NOT NULL UNIQUE,
      status TEXT NOT NULL,
      monthly_price TEXT NOT NULL,
      yearly_price TEXT NOT NULL,
      seats TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS account_subscriptions (
      id TEXT PRIMARY KEY,
      account_email TEXT NOT NULL,
      plan TEXT NOT NULL,
      renewal_date TEXT NOT NULL,
      payment_status TEXT NOT NULL,
      users INTEGER NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await prisma.$executeRawUnsafe(
    `CREATE INDEX IF NOT EXISTS idx_account_subscriptions_email ON account_subscriptions(account_email)`
  );

  const planCountRows = (await prisma.$queryRawUnsafe(
    'SELECT COUNT(*) as count FROM plan_pricing'
  )) as Array<{ count: number }>;

  if ((planCountRows[0]?.count ?? 0) === 0) {
    for (const plan of packagePricingCatalog) {
      await prisma.$executeRawUnsafe(
        `INSERT OR IGNORE INTO plan_pricing (id, product, plan, status, monthly_price, yearly_price, seats)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        plan.id,
        plan.product,
        plan.plan,
        plan.status,
        plan.monthlyPrice,
        plan.yearlyPrice,
        plan.seats
      );
    }
  }

  const accountCountRows = (await prisma.$queryRawUnsafe(
    'SELECT COUNT(*) as count FROM account_subscriptions'
  )) as Array<{ count: number }>;

  if ((accountCountRows[0]?.count ?? 0) === 0) {
    for (const sub of mockClientAccountSubscriptions) {
      await prisma.$executeRawUnsafe(
        `INSERT OR IGNORE INTO account_subscriptions (id, account_email, plan, renewal_date, payment_status, users)
         VALUES (?, ?, ?, ?, ?, ?)`,
        sub.id,
        sub.accountEmail,
        sub.plan,
        sub.renewalDate,
        sub.paymentStatus,
        sub.users
      );
    }
  }

  initialized = true;
}

export async function getAllPlanPricing(): Promise<PlanPricingRecord[]> {
  await ensureBillingTables();

  const rows = (await prisma.$queryRawUnsafe(
    `SELECT id, product, plan, status, monthly_price, yearly_price, seats
     FROM plan_pricing
     ORDER BY product ASC, plan ASC`
  )) as Array<{
    id: string;
    product: 'NBC' | 'MCT';
    plan: string;
    status: 'Active' | 'Hidden' | 'Deprecated';
    monthly_price: string;
    yearly_price: string;
    seats: string;
  }>;

  return rows.map((row) => ({
    id: row.id,
    product: row.product,
    plan: row.plan,
    status: row.status,
    monthlyPrice: row.monthly_price,
    yearlyPrice: row.yearly_price,
    seats: row.seats,
  }));
}

export async function upsertPlanPricing(record: PlanPricingRecord): Promise<PlanPricingRecord> {
  await ensureBillingTables();

  await prisma.$executeRawUnsafe(
    `INSERT INTO plan_pricing (id, product, plan, status, monthly_price, yearly_price, seats, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
     ON CONFLICT(id) DO UPDATE SET
       product = excluded.product,
       plan = excluded.plan,
       status = excluded.status,
       monthly_price = excluded.monthly_price,
       yearly_price = excluded.yearly_price,
       seats = excluded.seats,
       updated_at = CURRENT_TIMESTAMP`,
    record.id,
    record.product,
    record.plan,
    record.status,
    record.monthlyPrice,
    record.yearlyPrice,
    record.seats
  );

  return record;
}

export async function updatePlanPricingById(
  id: string,
  changes: Partial<Omit<PlanPricingRecord, 'id'>>
): Promise<PlanPricingRecord | null> {
  await ensureBillingTables();

  const existingRows = (await prisma.$queryRawUnsafe(
    `SELECT id, product, plan, status, monthly_price, yearly_price, seats
     FROM plan_pricing
     WHERE id = ?
     LIMIT 1`,
    id
  )) as Array<{
    id: string;
    product: 'NBC' | 'MCT';
    plan: string;
    status: 'Active' | 'Hidden' | 'Deprecated';
    monthly_price: string;
    yearly_price: string;
    seats: string;
  }>;

  const existing = existingRows[0];
  if (!existing) return null;

  const nextRecord: PlanPricingRecord = {
    id: existing.id,
    product: changes.product ?? existing.product,
    plan: changes.plan ?? existing.plan,
    status: changes.status ?? existing.status,
    monthlyPrice: changes.monthlyPrice ?? existing.monthly_price,
    yearlyPrice: changes.yearlyPrice ?? existing.yearly_price,
    seats: changes.seats ?? existing.seats,
  };

  return upsertPlanPricing(nextRecord);
}

export async function deletePlanPricingById(id: string): Promise<void> {
  await ensureBillingTables();
  await prisma.$executeRawUnsafe('DELETE FROM plan_pricing WHERE id = ?', id);
}

export async function getAccountSubscriptionsWithPricing(
  email: string
): Promise<AccountSubscriptionWithPricing[]> {
  await ensureBillingTables();

  const rows = (await prisma.$queryRawUnsafe(
    `SELECT
      s.id as id,
      s.account_email as account_email,
      s.plan as plan,
      s.renewal_date as renewal_date,
      s.payment_status as payment_status,
      s.users as users,
      COALESCE(p.monthly_price, 'N/A') as monthly_price,
      COALESCE(p.yearly_price, 'N/A') as yearly_price
     FROM account_subscriptions s
     LEFT JOIN plan_pricing p ON p.plan = s.plan
     WHERE lower(s.account_email) = lower(?)
     ORDER BY s.renewal_date ASC`,
    email
  )) as Array<{
    id: string;
    account_email: string;
    plan: string;
    renewal_date: string;
    payment_status: string;
    users: number;
    monthly_price: string;
    yearly_price: string;
  }>;

  return rows.map((row) => ({
    id: row.id,
    accountEmail: row.account_email,
    plan: row.plan,
    renewalDate: row.renewal_date,
    paymentStatus: row.payment_status,
    users: Number(row.users),
    monthlyPrice: row.monthly_price,
    yearlyPrice: row.yearly_price,
  }));
}