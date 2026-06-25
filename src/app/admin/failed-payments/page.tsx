import BillingDataPage from '@/app/components/admin/BillingDataPage';

export default function AdminFailedPaymentsPage() {
  return (
    <BillingDataPage
      activePath="/admin/failed-payments"
      title="Failed Payments"
      subtitle="Payments that require retry, customer follow-up, or manual review in LBYA AB billing operations."
      endpoint="/api/admin/billing/failed-payments"
      columns={[
        { key: 'id', label: 'Payment ID', width: '160px' },
        { key: 'customerId', label: 'Customer', width: '160px' },
        { key: 'amount', label: 'Amount', width: '120px' },
        { key: 'currency', label: 'Currency', width: '90px' },
        { key: 'status', label: 'Status', width: '120px' },
        { key: 'failureReason', label: 'Failure Reason', width: '220px' },
        { key: 'updatedAt', label: 'Last Updated', width: '180px' },
      ]}
    />
  );
}
