import BillingDataPage from '@/app/components/admin/BillingDataPage';

export default function AdminSubscriptionsPage() {
  return (
    <BillingDataPage
      activePath="/admin/subscriptions"
      title="Subscriptions"
      subtitle="Monitor active, trial, past-due, canceled, and enterprise Stripe subscriptions across LBYA AB products."
      endpoint="/api/admin/billing/subscriptions"
      columns={[
        { key: 'customerId', label: 'Customer', width: '160px' },
        { key: 'product', label: 'Product', width: '100px' },
        { key: 'plan', label: 'Plan', width: '220px' },
        { key: 'billingTerm', label: 'Billing Term', width: '120px' },
        { key: 'seats', label: 'Seats', width: '90px' },
        { key: 'status', label: 'Status', width: '120px' },
        { key: 'currentPeriodEnd', label: 'Current Period End', width: '180px' },
        { key: 'stripeSubscriptionId', label: 'Stripe Subscription ID', width: '220px' },
      ]}
    />
  );
}
