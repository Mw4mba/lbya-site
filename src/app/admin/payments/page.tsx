import BillingDataPage from '@/app/components/admin/BillingDataPage';

export default function AdminPaymentsBillingPage() {
  return (
    <BillingDataPage
      activePath="/admin/payments"
      title="Payments"
      subtitle="Card and Stripe Link payment outcomes synchronized from Stripe webhooks."
      endpoint="/api/admin/billing/payments"
      columns={[
        { key: 'id', label: 'Payment ID', width: '160px' },
        { key: 'customerId', label: 'Customer', width: '160px' },
        { key: 'amount', label: 'Amount', width: '120px' },
        { key: 'currency', label: 'Currency', width: '90px' },
        { key: 'status', label: 'Status', width: '120px' },
        { key: 'stripePaymentIntentId', label: 'Stripe Payment ID', width: '220px' },
        { key: 'failureReason', label: 'Failure Reason', width: '220px' },
      ]}
    />
  );
}
