/**
 * LBYA AB Admin Console Mock Data
 * Comprehensive fictional subscription, billing, and finance data
 */

export interface AdminKPI {
  label: string;
  value: string;
  trend?: number;
  description: string;
}

export interface Customer {
  id: string;
  name: string;
  company: string;
  country: string;
  billingEmail: string;
  products: string[];
  activeSubscriptions: number;
  mrr: number;
  status: 'Active' | 'Trial' | 'Past Due' | 'Suspended' | 'Cancelled' | 'Enterprise Review';
  lastPaymentDate: string | null;
  owner: string;
}

export interface Subscription {
  id: string;
  customer: string;
  product: 'NBC' | 'MCT';
  plan: string;
  billingTerm: 'Monthly' | 'Yearly' | '3-Year' | 'Custom Enterprise';
  seats: number;
  addOns: string[];
  startDate: string;
  renewalDate: string;
  amount: number;
  currency: string;
  status: 'Active' | 'Trial' | 'Past Due' | 'Paused' | 'Cancelled' | 'Expired' | 'Manual Review' | 'Enterprise Contract';
}

export interface Payment {
  id: string;
  date: string;
  customer: string;
  invoice: string;
  product: string;
  amount: number;
  currency: string;
  method: string;
  provider: string;
  status: 'Succeeded' | 'Pending' | 'Failed' | 'Refunded' | 'Partially Refunded' | 'Manual Transfer' | 'Reconciled' | 'Disputed';
  failureReason?: string;
}

export interface Invoice {
  id: string;
  number: string;
  customer: string;
  product: string;
  plan: string;
  billingPeriod: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  currency: string;
  vat: number;
  status: 'Draft' | 'Sent' | 'Paid' | 'Partially Paid' | 'Overdue' | 'Void' | 'Refunded' | 'Manual Review';
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'Owner' | 'Finance Admin' | 'Subscription Manager' | 'Support Admin' | 'Product Admin' | 'Read Only';
  invitedDate: string;
  lastActive: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  adminUser: string;
  action: string;
  entity: string;
  entityId: string;
  customer?: string;
  details: string;
  source: string;
  status: 'Success' | 'Failed' | 'Pending';
}

export const adminOverviewKPIs: AdminKPI[] = [
  {
    label: 'Monthly Recurring Revenue',
    value: '€24,800',
    trend: 12.4,
    description: 'Estimated recurring subscription revenue from active products.',
  },
  {
    label: 'Annual Recurring Revenue',
    value: '€297,600',
    trend: 8.2,
    description: 'Annualized recurring revenue based on current subscriptions.',
  },
  {
    label: 'Active Subscriptions',
    value: '179',
    trend: 5.1,
    description: 'Total active, trial, and enterprise subscriptions.',
  },
  {
    label: 'Trial Accounts',
    value: '27',
    trend: -2.3,
    description: 'Customers currently in trial period.',
  },
  {
    label: 'Failed Payments',
    value: '8',
    trend: 0,
    description: 'Payments requiring retry or manual intervention.',
  },
  {
    label: 'Renewal Risk',
    value: '12',
    trend: 3.1,
    description: 'Subscriptions at risk of non-renewal.',
  },
  {
    label: 'Outstanding Invoices',
    value: '€15,240',
    trend: 2.5,
    description: 'Unpaid invoices past their due date.',
  },
  {
    label: 'Product Access Issues',
    value: '3',
    trend: -1.0,
    description: 'Billing-access mismatches requiring review.',
  },
];

export const mockCustomers: Customer[] = [
  {
    id: 'cust_001',
    name: 'Aline Mukasa',
    company: 'Jaridafrica Ltd',
    country: 'Rwanda',
    billingEmail: 'billing@jaridafrica.example',
    products: ['MCT', 'NBC'],
    activeSubscriptions: 2,
    mrr: 2400,
    status: 'Active',
    lastPaymentDate: '2026-06-15',
    owner: 'Sarah Chen',
  },
  {
    id: 'cust_002',
    name: 'Sara Lindholm',
    company: 'NordBuild AB',
    country: 'Sweden',
    billingEmail: 'finance@nordbuild.example',
    products: ['NBC'],
    activeSubscriptions: 1,
    mrr: 1200,
    status: 'Trial',
    lastPaymentDate: '2026-05-20',
    owner: 'James Wilson',
  },
  {
    id: 'cust_003',
    name: 'Samir Ben Youssef',
    company: 'Atlas Engineering',
    country: 'Morocco',
    billingEmail: 'accounting@atlaseng.example',
    products: ['MCT'],
    activeSubscriptions: 1,
    mrr: 1800,
    status: 'Past Due',
    lastPaymentDate: '2026-04-10',
    owner: 'Maria Gonzalez',
  },
  {
    id: 'cust_004',
    name: 'Johan Eriksson',
    company: 'ConstructFlow Inc',
    country: 'Sweden',
    billingEmail: 'billing@constructflow.example',
    products: ['NBC'],
    activeSubscriptions: 1,
    mrr: 3200,
    status: 'Active',
    lastPaymentDate: '2026-06-10',
    owner: 'Sarah Chen',
  },
  {
    id: 'cust_005',
    name: 'Ingrid Bergman',
    company: 'Nordic Architecture Studio',
    country: 'Norway',
    billingEmail: 'finance@nordicarch.example',
    products: ['NBC'],
    activeSubscriptions: 1,
    mrr: 1600,
    status: 'Active',
    lastPaymentDate: '2026-06-05',
    owner: 'Michael Roberts',
  },
  {
    id: 'cust_006',
    name: 'Ahmed Hassan',
    company: 'BuildTech Systems',
    country: 'Egypt',
    billingEmail: 'accounting@buildtech.example',
    products: ['MCT'],
    activeSubscriptions: 1,
    mrr: 2800,
    status: 'Active',
    lastPaymentDate: '2026-06-12',
    owner: 'Sarah Chen',
  },
  {
    id: 'cust_007',
    name: 'Lisa Müller',
    company: 'GeoStructure Inc',
    country: 'Germany',
    billingEmail: 'billing@geostructure.example',
    products: ['NBC'],
    activeSubscriptions: 1,
    mrr: 900,
    status: 'Trial',
    lastPaymentDate: '2026-05-15',
    owner: 'James Wilson',
  },
  {
    id: 'cust_008',
    name: 'Carlos Ruiz',
    company: 'ArchiPlan Studio',
    country: 'Spain',
    billingEmail: 'finance@archiplan.example',
    products: ['NBC'],
    activeSubscriptions: 1,
    mrr: 1400,
    status: 'Suspended',
    lastPaymentDate: '2026-03-15',
    owner: 'Maria Gonzalez',
  },
];

export const mockSubscriptions: Subscription[] = [
  {
    id: 'sub_001',
    customer: 'Jaridafrica Ltd',
    product: 'MCT',
    plan: 'MCT Professional',
    billingTerm: 'Yearly',
    seats: 58,
    addOns: ['Advanced Analytics', 'Custom Reports'],
    startDate: '2025-02-12',
    renewalDate: '2027-02-12',
    amount: 2400,
    currency: 'EUR',
    status: 'Active',
  },
  {
    id: 'sub_002',
    customer: 'Jaridafrica Ltd',
    product: 'NBC',
    plan: 'NBC Enterprise',
    billingTerm: 'Yearly',
    seats: 32,
    addOns: ['Secure Offline Setup'],
    startDate: '2025-08-01',
    renewalDate: '2026-08-01',
    amount: 3600,
    currency: 'EUR',
    status: 'Active',
  },
  {
    id: 'sub_003',
    customer: 'NordBuild AB',
    product: 'NBC',
    plan: 'NBC Professional',
    billingTerm: 'Monthly',
    seats: 16,
    addOns: [],
    startDate: '2026-06-04',
    renewalDate: '2026-07-18',
    amount: 1200,
    currency: 'EUR',
    status: 'Trial',
  },
  {
    id: 'sub_004',
    customer: 'Atlas Engineering',
    product: 'MCT',
    plan: 'MCT Business',
    billingTerm: 'Monthly',
    seats: 24,
    addOns: [],
    startDate: '2026-01-14',
    renewalDate: '2026-06-27',
    amount: 1800,
    currency: 'EUR',
    status: 'Past Due',
  },
  {
    id: 'sub_005',
    customer: 'ConstructFlow Inc',
    product: 'NBC',
    plan: 'NBC Enterprise',
    billingTerm: 'Yearly',
    seats: 32,
    addOns: ['Custom Integrations', 'Priority Support'],
    startDate: '2026-03-15',
    renewalDate: '2027-03-15',
    amount: 3200,
    currency: 'EUR',
    status: 'Active',
  },
  {
    id: 'sub_006',
    customer: 'Nordic Architecture Studio',
    product: 'NBC',
    plan: 'NBC Professional',
    billingTerm: 'Monthly',
    seats: 12,
    addOns: [],
    startDate: '2026-04-10',
    renewalDate: '2026-07-10',
    amount: 1600,
    currency: 'EUR',
    status: 'Active',
  },
  {
    id: 'sub_007',
    customer: 'BuildTech Systems',
    product: 'MCT',
    plan: 'MCT Professional',
    billingTerm: 'Yearly',
    seats: 40,
    addOns: ['Advanced Analytics'],
    startDate: '2026-02-01',
    renewalDate: '2027-02-01',
    amount: 2800,
    currency: 'EUR',
    status: 'Active',
  },
];

export const mockPayments: Payment[] = [
  {
    id: 'pay_001',
    date: '2026-06-15',
    customer: 'Jaridafrica Ltd',
    invoice: 'INV-2026-0642',
    product: 'MCT',
    amount: 2400,
    currency: 'EUR',
    method: 'Bank Transfer',
    provider: 'Stripe',
    status: 'Succeeded',
  },
  {
    id: 'pay_002',
    date: '2026-06-12',
    customer: 'BuildTech Systems',
    invoice: 'INV-2026-0641',
    product: 'MCT',
    amount: 2800,
    currency: 'EUR',
    method: 'Card',
    provider: 'Stripe',
    status: 'Succeeded',
  },
  {
    id: 'pay_003',
    date: '2026-06-10',
    customer: 'ConstructFlow Inc',
    invoice: 'INV-2026-0640',
    product: 'NBC',
    amount: 3200,
    currency: 'EUR',
    method: 'Bank Transfer',
    provider: 'Stripe',
    status: 'Succeeded',
  },
  {
    id: 'pay_004',
    date: '2026-06-20',
    customer: 'Atlas Engineering',
    invoice: 'INV-2026-0639',
    product: 'MCT',
    amount: 1800,
    currency: 'EUR',
    method: 'Card',
    provider: 'Stripe',
    status: 'Failed',
    failureReason: 'Card declined',
  },
  {
    id: 'pay_005',
    date: '2026-06-18',
    customer: 'NordBuild AB',
    invoice: 'INV-2026-0638',
    product: 'NBC',
    amount: 1200,
    currency: 'EUR',
    method: 'Card',
    provider: 'Stripe',
    status: 'Pending',
  },
];

export const mockInvoices: Invoice[] = [
  {
    id: 'inv_001',
    number: 'INV-2026-0642',
    customer: 'Jaridafrica Ltd',
    product: 'MCT',
    plan: 'MCT Professional',
    billingPeriod: 'Feb 2027 - Feb 2028',
    issueDate: '2026-12-15',
    dueDate: '2027-01-15',
    amount: 2400,
    currency: 'EUR',
    vat: 504,
    status: 'Sent',
  },
  {
    id: 'inv_002',
    number: 'INV-2026-0641',
    customer: 'BuildTech Systems',
    product: 'MCT',
    plan: 'MCT Professional',
    billingPeriod: 'Feb 2027 - Feb 2028',
    issueDate: '2026-01-15',
    dueDate: '2026-02-15',
    amount: 2800,
    currency: 'EUR',
    vat: 588,
    status: 'Paid',
  },
  {
    id: 'inv_003',
    number: 'INV-2026-0640',
    customer: 'ConstructFlow Inc',
    product: 'NBC',
    plan: 'NBC Enterprise',
    billingPeriod: 'Mar 2027 - Mar 2028',
    issueDate: '2026-03-01',
    dueDate: '2026-04-01',
    amount: 3200,
    currency: 'EUR',
    vat: 672,
    status: 'Paid',
  },
  {
    id: 'inv_004',
    number: 'INV-2026-0639',
    customer: 'Atlas Engineering',
    product: 'MCT',
    plan: 'MCT Business',
    billingPeriod: 'June 2026',
    issueDate: '2026-06-01',
    dueDate: '2026-06-27',
    amount: 1800,
    currency: 'EUR',
    vat: 378,
    status: 'Overdue',
  },
  {
    id: 'inv_005',
    number: 'INV-2026-0638',
    customer: 'NordBuild AB',
    product: 'NBC',
    plan: 'NBC Professional',
    billingPeriod: 'June 2026',
    issueDate: '2026-06-04',
    dueDate: '2026-07-04',
    amount: 1200,
    currency: 'EUR',
    vat: 252,
    status: 'Sent',
  },
];

export const mockAdminUsers: AdminUser[] = [
  {
    id: 'admin_001',
    email: 'sarah@lbya.example',
    name: 'Sarah Chen',
    role: 'Owner',
    invitedDate: '2025-06-01',
    lastActive: '2026-06-23',
  },
  {
    id: 'admin_002',
    email: 'james@lbya.example',
    name: 'James Wilson',
    role: 'Finance Admin',
    invitedDate: '2025-08-15',
    lastActive: '2026-06-22',
  },
  {
    id: 'admin_003',
    email: 'maria@lbya.example',
    name: 'Maria Gonzalez',
    role: 'Subscription Manager',
    invitedDate: '2025-10-20',
    lastActive: '2026-06-20',
  },
  {
    id: 'admin_004',
    email: 'michael@lbya.example',
    name: 'Michael Roberts',
    role: 'Support Admin',
    invitedDate: '2026-01-10',
    lastActive: '2026-06-18',
  },
];

export const mockAuditEvents: AuditEvent[] = [
  {
    id: 'audit_001',
    timestamp: '2026-06-23T10:30:00Z',
    adminUser: 'Sarah Chen',
    action: 'customer_created',
    entity: 'Customer',
    entityId: 'cust_009',
    customer: 'NewTech Solutions',
    details: 'New customer account created',
    source: 'Admin Console',
    status: 'Success',
  },
  {
    id: 'audit_002',
    timestamp: '2026-06-23T09:15:00Z',
    adminUser: 'James Wilson',
    action: 'subscription_created',
    entity: 'Subscription',
    entityId: 'sub_008',
    customer: 'Jaridafrica Ltd',
    details: 'New MCT subscription created for annual billing',
    source: 'Admin Console',
    status: 'Success',
  },
  {
    id: 'audit_003',
    timestamp: '2026-06-22T14:45:00Z',
    adminUser: 'Maria Gonzalez',
    action: 'plan_changed',
    entity: 'Subscription',
    entityId: 'sub_004',
    customer: 'Atlas Engineering',
    details: 'Upgraded from Business to Enterprise plan',
    source: 'Admin Console',
    status: 'Success',
  },
  {
    id: 'audit_004',
    timestamp: '2026-06-22T11:20:00Z',
    adminUser: 'James Wilson',
    action: 'payment_marked_paid',
    entity: 'Payment',
    entityId: 'pay_005',
    customer: 'NordBuild AB',
    details: 'Manual payment reconciliation',
    source: 'Admin Console',
    status: 'Success',
  },
  {
    id: 'audit_005',
    timestamp: '2026-06-21T16:00:00Z',
    adminUser: 'Sarah Chen',
    action: 'invoice_sent',
    entity: 'Invoice',
    entityId: 'inv_006',
    customer: 'ConstructFlow Inc',
    details: 'Invoice sent to billing email',
    source: 'Admin Console',
    status: 'Success',
  },
];

export const revenueTrendData = [
  { month: 'Jan', mRR: 18500, aRR: 222000 },
  { month: 'Feb', mRR: 19200, aRR: 230400 },
  { month: 'Mar', mRR: 20100, aRR: 241200 },
  { month: 'Apr', mRR: 21500, aRR: 258000 },
  { month: 'May', mRR: 23200, aRR: 278400 },
  { month: 'Jun', mRR: 24800, aRR: 297600 },
];

export const subscriptionMixData = [
  { name: 'MCT Professional', value: 45, revenue: 10800 },
  { name: 'MCT Enterprise', value: 12, revenue: 8400 },
  { name: 'NBC Enterprise', value: 38, revenue: 11200 },
  { name: 'NBC Professional', value: 56, revenue: 8960 },
  { name: 'Trial', value: 27, revenue: 0 },
];

export const paymentStatusData = [
  { status: 'Succeeded', count: 127, value: '€267,400' },
  { status: 'Pending', count: 8, value: '€14,200' },
  { status: 'Failed', count: 8, value: '€15,840' },
  { status: 'Refunded', count: 2, value: '€2,400' },
];
