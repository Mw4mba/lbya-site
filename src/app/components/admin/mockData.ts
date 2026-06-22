import type {
  AccessRecord,
  AuditLog,
  FinanceTransaction,
  Invoice,
  KPIItem,
  QuoteRequest,
  Subscriber,
} from './types';
import type { Product } from './ProductContext';

// MCT (Malaika Control Tower) - Supply Chain & Logistics
export const mctOverviewKPIs: KPIItem[] = [
  { label: 'Total subscribers', value: '184' },
  { label: 'Active subscriptions', value: '141' },
  { label: 'Trial users', value: '19' },
  { label: 'MRR (placeholder)', value: 'EUR 42,500' },
  { label: 'ARR (placeholder)', value: 'EUR 510,000' },
  { label: 'Pending invoices', value: '12' },
  { label: 'Failed payments', value: '7' },
  { label: 'Cancelled subscriptions', value: '9' },
  { label: 'New customers this month', value: '16' },
  { label: 'Quote requests', value: '23' },
  { label: 'Total revenue (placeholder)', value: 'EUR 1,240,000' },
  { label: 'VAT/tax collected (placeholder)', value: 'EUR 188,000' },
];

// NBC (Nayeli BIM Control) - Building Information Modeling
export const nbcOverviewKPIs: KPIItem[] = [
  { label: 'Total subscribers', value: '48' },
  { label: 'Active subscriptions', value: '38' },
  { label: 'Trial users', value: '8' },
  { label: 'MRR (placeholder)', value: 'EUR 12,800' },
  { label: 'ARR (placeholder)', value: 'EUR 153,600' },
  { label: 'Pending invoices', value: '3' },
  { label: 'Failed payments', value: '1' },
  { label: 'Cancelled subscriptions', value: '2' },
  { label: 'New customers this month', value: '4' },
  { label: 'Quote requests', value: '7' },
  { label: 'Total revenue (placeholder)', value: 'EUR 384,000' },
  { label: 'VAT/tax collected (placeholder)', value: 'EUR 57,600' },
];

export function getOverviewKPIs(product: Product): KPIItem[] {
  return product === 'mct' ? mctOverviewKPIs : nbcOverviewKPIs;
}

export const mctActivityFeed = [
  'New subscription created for Kivu Logistics',
  'Payment received for Jaridafrica Ltd',
  'Invoice generated for NordBuild AB',
  'Quote requested by Atlas Engineering',
  'Subscription cancelled by Metro Infra Group',
  'User added to company account: BlueGrid Transport',
  'Failed payment detected for Structura Hub',
];

export const nbcActivityFeed = [
  'BIM project workspace created for ConstructFlow',
  'Model collaboration enabled for Nordic Architecture',
  'Payment received from BuildTech Systems',
  'Design review scheduled for GeoStructure Inc',
  'Trial access granted to ArchiPlan Studio',
  'Data sync completed for EuroBuilders Ltd',
  'API integration configured for SmartConstruction',
];

export function getActivityFeed(product: Product): string[] {
  return product === 'mct' ? mctActivityFeed : nbcActivityFeed;
}

export const mctSubscribers: Subscriber[] = [
  {
    id: 'sub_001',
    companyName: 'Jaridafrica Ltd',
    mainContact: 'Aline Mukasa',
    email: 'aline@jaridafrica.example',
    country: 'Rwanda',
    vatNumber: 'RW-201-8822',
    currentPlan: 'Enterprise',
    seats: 58,
    subscriptionStatus: 'Active',
    billingTerm: 'Annual',
    renewalDate: '2027-02-12',
    paymentStatus: 'Paid',
    createdDate: '2025-11-08',
  },
  {
    id: 'sub_002',
    companyName: 'NordBuild AB',
    mainContact: 'Sara Lindholm',
    email: 'sara@nordbuild.example',
    country: 'Sweden',
    vatNumber: 'SE-992-771',
    currentPlan: 'Professional',
    seats: 16,
    subscriptionStatus: 'Trial',
    billingTerm: 'Monthly',
    renewalDate: '2026-07-18',
    paymentStatus: 'Pending',
    createdDate: '2026-06-04',
  },
  {
    id: 'sub_003',
    companyName: 'Atlas Engineering',
    mainContact: 'Samir Ben Youssef',
    email: 'samir@atlaseng.example',
    country: 'Morocco',
    vatNumber: 'MA-7882-110',
    currentPlan: 'Business',
    seats: 24,
    subscriptionStatus: 'Past due',
    billingTerm: 'Monthly',
    renewalDate: '2026-06-27',
    paymentStatus: 'Failed',
    createdDate: '2026-01-14',
  },
];

export const nbcSubscribers: Subscriber[] = [
  {
    id: 'nbc_sub_001',
    companyName: 'ConstructFlow Inc',
    mainContact: 'Johan Eriksson',
    email: 'johan@constructflow.example',
    country: 'Sweden',
    vatNumber: 'SE-556-701',
    currentPlan: 'Enterprise',
    seats: 32,
    subscriptionStatus: 'Active',
    billingTerm: 'Annual',
    renewalDate: '2027-03-15',
    paymentStatus: 'Paid',
    createdDate: '2026-03-15',
  },
  {
    id: 'nbc_sub_002',
    companyName: 'Nordic Architecture Studio',
    mainContact: 'Ingrid Bergman',
    email: 'ingrid@nordicarch.example',
    country: 'Norway',
    vatNumber: 'NO-998-221',
    currentPlan: 'Professional',
    seats: 12,
    subscriptionStatus: 'Active',
    billingTerm: 'Monthly',
    renewalDate: '2026-07-10',
    paymentStatus: 'Paid',
    createdDate: '2026-04-10',
  },
  {
    id: 'nbc_sub_003',
    companyName: 'BuildTech Systems',
    mainContact: 'Marco Rossi',
    email: 'marco@buildtech.example',
    country: 'Italy',
    vatNumber: 'IT-02883920999',
    currentPlan: 'Professional',
    seats: 8,
    subscriptionStatus: 'Trial',
    billingTerm: 'Monthly',
    renewalDate: '2026-07-20',
    paymentStatus: 'Pending',
    createdDate: '2026-06-20',
  },
];

export function getSubscribers(product: Product): Subscriber[] {
  return product === 'mct' ? mctSubscribers : nbcSubscribers;
}

export const mctFinanceTransactions: FinanceTransaction[] = [
  {
    id: 'txn_1001',
    company: 'Jaridafrica Ltd',
    product: 'MCT',
    plan: 'Enterprise',
    billingTerm: 'Annual',
    amount: '24000',
    currency: 'EUR',
    vatTax: '4800',
    netRevenue: '19200',
    paymentMethod: 'Card token (provider)',
    status: 'Paid',
    paymentDate: '2026-06-01',
    invoiceNumber: 'INV-2026-1001',
    receiptLink: '#',
    refundStatus: 'No refund',
  },
  {
    id: 'txn_1002',
    company: 'Atlas Engineering',
    product: 'MCT',
    plan: 'Business',
    billingTerm: 'Monthly',
    amount: '890',
    currency: 'EUR',
    vatTax: '178',
    netRevenue: '712',
    paymentMethod: 'Bank transfer',
    status: 'Awaiting bank transfer',
    paymentDate: '-',
    invoiceNumber: 'INV-2026-1002',
    receiptLink: '#',
    refundStatus: 'N/A',
  },
];

export const nbcFinanceTransactions: FinanceTransaction[] = [
  {
    id: 'txn_2001',
    company: 'ConstructFlow Inc',
    product: 'NBC',
    plan: 'Enterprise',
    billingTerm: 'Annual',
    amount: '18000',
    currency: 'EUR',
    vatTax: '3600',
    netRevenue: '14400',
    paymentMethod: 'Card token (provider)',
    status: 'Paid',
    paymentDate: '2026-05-15',
    invoiceNumber: 'INV-NBC-2001',
    receiptLink: '#',
    refundStatus: 'No refund',
  },
  {
    id: 'txn_2002',
    company: 'Nordic Architecture Studio',
    product: 'NBC',
    plan: 'Professional',
    billingTerm: 'Monthly',
    amount: '450',
    currency: 'EUR',
    vatTax: '90',
    netRevenue: '360',
    paymentMethod: 'Card token (provider)',
    status: 'Paid',
    paymentDate: '2026-06-10',
    invoiceNumber: 'INV-NBC-2002',
    receiptLink: '#',
    refundStatus: 'No refund',
  },
];

export function getFinanceTransactions(product: Product): FinanceTransaction[] {
  return product === 'mct' ? mctFinanceTransactions : nbcFinanceTransactions;
}

export const mctInvoices: Invoice[] = [
  {
    invoiceNumber: 'INV-2026-1001',
    company: 'Jaridafrica Ltd',
    billingContact: 'Aline Mukasa',
    amount: '24000',
    vatTax: '4800',
    currency: 'EUR',
    status: 'Paid',
    dueDate: '2026-06-14',
    paymentDate: '2026-06-01',
    subscriptionPeriod: '2026-06-01 to 2027-05-31',
  },
  {
    invoiceNumber: 'INV-2026-1002',
    company: 'Atlas Engineering',
    billingContact: 'Samir Ben Youssef',
    amount: '890',
    vatTax: '178',
    currency: 'EUR',
    status: 'Sent',
    dueDate: '2026-06-28',
    paymentDate: '-',
    subscriptionPeriod: '2026-06',
  },
];

export const nbcInvoices: Invoice[] = [
  {
    invoiceNumber: 'INV-NBC-2001',
    company: 'ConstructFlow Inc',
    billingContact: 'Johan Eriksson',
    amount: '18000',
    vatTax: '3600',
    currency: 'EUR',
    status: 'Paid',
    dueDate: '2026-05-29',
    paymentDate: '2026-05-15',
    subscriptionPeriod: '2026-05-15 to 2027-05-14',
  },
  {
    invoiceNumber: 'INV-NBC-2002',
    company: 'Nordic Architecture Studio',
    billingContact: 'Ingrid Bergman',
    amount: '450',
    vatTax: '90',
    currency: 'EUR',
    status: 'Paid',
    dueDate: '2026-06-24',
    paymentDate: '2026-06-10',
    subscriptionPeriod: '2026-06',
  },
];

export function getInvoices(product: Product): Invoice[] {
  return product === 'mct' ? mctInvoices : nbcInvoices;
}

export const mctQuoteRequests: QuoteRequest[] = [
  {
    id: 'Q-2082',
    company: 'Metro Infra Group',
    contactPerson: 'Karim Nadeem',
    email: 'karim@metroinfra.example',
    country: 'UAE',
    requestedPlan: 'Enterprise',
    seats: 95,
    requestedModules: 'Advanced Analytics, API Access',
    message: 'Need integration with internal compliance workflow.',
    status: 'In discussion',
    createdDate: '2026-06-07',
    assignedSalesAdmin: 'Nadia S.',
  },
  {
    id: 'Q-2085',
    company: 'BlueGrid Transport',
    contactPerson: 'Mira Aalto',
    email: 'mira@bluegrid.example',
    country: 'Finland',
    requestedPlan: 'Business',
    seats: 35,
    requestedModules: 'Premium Support',
    message: 'Looking for regional rollout in Q3.',
    status: 'New',
    createdDate: '2026-06-18',
    assignedSalesAdmin: 'Unassigned',
  },
];

export const nbcQuoteRequests: QuoteRequest[] = [
  {
    id: 'Q-NBC-101',
    company: 'GeoStructure Inc',
    contactPerson: 'Andreas Mueller',
    email: 'andreas@geostructure.example',
    country: 'Switzerland',
    requestedPlan: 'Enterprise',
    seats: 50,
    requestedModules: 'Advanced 3D Tools, Collaboration Hub',
    message: 'Complex infrastructure project requiring advanced BIM features.',
    status: 'Quote sent',
    createdDate: '2026-06-05',
    assignedSalesAdmin: 'Thomas K.',
  },
  {
    id: 'Q-NBC-103',
    company: 'ArchiPlan Studio',
    contactPerson: 'Elena Rossi',
    email: 'elena@archiplan.example',
    country: 'Italy',
    requestedPlan: 'Professional',
    seats: 15,
    requestedModules: 'Rendering Engine',
    message: 'Interested in NBC for residential and commercial projects.',
    status: 'In discussion',
    createdDate: '2026-06-16',
    assignedSalesAdmin: 'Carlo M.',
  },
];

export function getQuoteRequests(product: Product): QuoteRequest[] {
  return product === 'mct' ? mctQuoteRequests : nbcQuoteRequests;
}

export const mctAccessRecords: AccessRecord[] = [
  {
    company: 'Jaridafrica Ltd',
    activeUsers: 52,
    purchasedSeats: 58,
    usedSeats: 52,
    availableSeats: 6,
    productAccess: 'MCT Enterprise',
    accessStatus: 'Active',
    lastLogin: '2026-06-21 08:12',
    adminContact: 'aline@jaridafrica.example',
  },
  {
    company: 'Atlas Engineering',
    activeUsers: 21,
    purchasedSeats: 24,
    usedSeats: 21,
    availableSeats: 3,
    productAccess: 'MCT Business',
    accessStatus: 'Limited',
    lastLogin: '2026-06-20 17:41',
    adminContact: 'samir@atlaseng.example',
  },
];

export const nbcAccessRecords: AccessRecord[] = [
  {
    company: 'ConstructFlow Inc',
    activeUsers: 28,
    purchasedSeats: 32,
    usedSeats: 28,
    availableSeats: 4,
    productAccess: 'NBC Enterprise',
    accessStatus: 'Active',
    lastLogin: '2026-06-21 14:23',
    adminContact: 'johan@constructflow.example',
  },
  {
    company: 'Nordic Architecture Studio',
    activeUsers: 10,
    purchasedSeats: 12,
    usedSeats: 10,
    availableSeats: 2,
    productAccess: 'NBC Professional',
    accessStatus: 'Active',
    lastLogin: '2026-06-21 09:15',
    adminContact: 'ingrid@nordicarch.example',
  },
];

export function getAccessRecords(product: Product): AccessRecord[] {
  return product === 'mct' ? mctAccessRecords : nbcAccessRecords;
}

// Backward compatibility exports for when product context is not available
export const overviewKPIs = mctOverviewKPIs;
export const activityFeed = mctActivityFeed;
export const subscribers = mctSubscribers;
export const financeTransactions = mctFinanceTransactions;
export const invoices = mctInvoices;
export const quoteRequests = mctQuoteRequests;
export const accessRecords = mctAccessRecords;

export const notifications = [
  'Failed payment: Atlas Engineering',
  'Invoice overdue: INV-2026-0934',
  'Subscription renewal in 7 days: NordBuild AB',
  'Trial ending in 3 days: BIMWorks Studio',
  'Enterprise quote waiting: Q-2085',
  'Suspicious account activity: NorthRail Systems',
  'Customer exceeded seat limit: BlueGrid Transport',
  'Manual bank transfer awaiting confirmation: INV-2026-1002',
];

export const auditLogs: AuditLog[] = [
  {
    dateTime: '2026-06-21 10:34',
    adminUser: 'super.admin@lbya.se',
    action: 'Subscription cancelled',
    company: 'Metro Infra Group',
    previousValue: 'Active',
    newValue: 'Cancelled',
    ipDevice: '192.168.0.10 / Chrome',
  },
  {
    dateTime: '2026-06-21 12:02',
    adminUser: 'finance.admin@lbya.se',
    action: 'Invoice marked as paid',
    company: 'Jaridafrica Ltd',
    previousValue: 'Sent',
    newValue: 'Paid',
    ipDevice: '192.168.0.22 / Edge',
  },
];
