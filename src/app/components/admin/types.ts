export type AdminRole =
  | 'super-admin'
  | 'finance-admin'
  | 'sales-admin'
  | 'support-admin'
  | 'product-admin-operator';

export type SubscriptionStatus =
  | 'Active'
  | 'Trial'
  | 'Pending payment'
  | 'Past due'
  | 'Cancelled'
  | 'Suspended'
  | 'Enterprise quote'
  | 'Manual invoice';

export type PaymentStatus =
  | 'Paid'
  | 'Pending'
  | 'Failed'
  | 'Refunded'
  | 'Partially refunded'
  | 'Cancelled'
  | 'Invoice requested'
  | 'Awaiting bank transfer';

export type InvoiceStatus =
  | 'Draft'
  | 'Sent'
  | 'Paid'
  | 'Overdue'
  | 'Cancelled'
  | 'Refunded'
  | 'Credit note issued';

export type QuoteStatus =
  | 'New'
  | 'Contacted'
  | 'In discussion'
  | 'Quote sent'
  | 'Accepted'
  | 'Rejected'
  | 'Converted to subscription';

export type CustomerType =
  | 'Transporter'
  | 'Logistics operator'
  | 'Freight forwarder'
  | 'Institution'
  | 'Enterprise client'
  | 'Pilot user'
  | 'Internal/demo';

export type KPIItem = {
  label: string;
  value: string;
  delta?: string;
};

export type Subscriber = {
  id: string;
  companyName: string;
  mainContact: string;
  email: string;
  country: string;
  vatNumber: string;
  currentPlan: 'Starter' | 'Professional' | 'Business' | 'Enterprise';
  seats: number;
  subscriptionStatus: SubscriptionStatus;
  billingTerm: 'Monthly' | 'Annual' | '3-year';
  renewalDate: string;
  paymentStatus: PaymentStatus;
  createdDate: string;
};

export type FinanceTransaction = {
  id: string;
  company: string;
  product: string;
  plan: string;
  billingTerm: string;
  amount: string;
  currency: string;
  vatTax: string;
  netRevenue: string;
  paymentMethod: string;
  status: PaymentStatus;
  paymentDate: string;
  invoiceNumber: string;
  receiptLink: string;
  refundStatus: string;
};

export type Invoice = {
  invoiceNumber: string;
  company: string;
  billingContact: string;
  amount: string;
  vatTax: string;
  currency: string;
  status: InvoiceStatus;
  dueDate: string;
  paymentDate: string;
  subscriptionPeriod: string;
};

export type QuoteRequest = {
  id: string;
  company: string;
  contactPerson: string;
  email: string;
  country: string;
  requestedPlan: string;
  seats: number;
  requestedModules: string;
  message: string;
  status: QuoteStatus;
  createdDate: string;
  assignedSalesAdmin: string;
};

export type AccessRecord = {
  company: string;
  activeUsers: number;
  purchasedSeats: number;
  usedSeats: number;
  availableSeats: number;
  productAccess: string;
  accessStatus: 'Active' | 'Suspended' | 'Limited';
  lastLogin: string;
  adminContact: string;
};

export type AuditLog = {
  dateTime: string;
  adminUser: string;
  action: string;
  company: string;
  previousValue: string;
  newValue: string;
  ipDevice: string;
};
