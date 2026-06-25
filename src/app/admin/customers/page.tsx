import BillingDataPage from '@/app/components/admin/BillingDataPage';

export default function AdminCustomersBillingPage() {
  return (
    <BillingDataPage
      activePath="/admin/customers"
      title="Customers"
      subtitle="Stripe-linked customer records for LBYA AB billing operations."
      endpoint="/api/admin/billing/customers"
      columns={[
        { key: 'id', label: 'Customer ID', width: '160px' },
        { key: 'company', label: 'Company', width: '220px' },
        { key: 'email', label: 'Email', width: '220px' },
        { key: 'stripeCustomerId', label: 'Stripe Customer', width: '220px' },
        { key: 'updatedAt', label: 'Updated', width: '180px' },
      ]}
    />
  );
}
