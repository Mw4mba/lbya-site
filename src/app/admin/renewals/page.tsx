import BillingDataPage from '@/app/components/admin/BillingDataPage';

export default function AdminRenewalsPage() {
  return (
    <BillingDataPage
      activePath="/admin/renewals"
      title="Renewals"
      subtitle="Upcoming renewals and renewal-risk subscriptions sourced from Stripe-connected billing records."
      endpoint="/api/admin/billing/renewals"
      columns={[
        { key: 'customerId', label: 'Customer', width: '160px' },
        { key: 'product', label: 'Product', width: '120px' },
        { key: 'plan', label: 'Plan', width: '220px' },
        { key: 'billingTerm', label: 'Billing Term', width: '120px' },
        { key: 'status', label: 'Status', width: '120px' },
        { key: 'currentPeriodEnd', label: 'Current Period End', width: '180px' },
        { key: 'stripeSubscriptionId', label: 'Stripe Subscription ID', width: '220px' },
      ]}
    />
  );
}
