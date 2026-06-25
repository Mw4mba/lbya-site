import BillingDataPage from '@/app/components/admin/BillingDataPage';

export default function AdminBillingAuditLogPage() {
  return (
    <BillingDataPage
      activePath="/admin/audit-log"
      title="Billing Audit Log"
      subtitle="Traceable billing actions from Stripe, website checkout, admin operations, and system automation."
      endpoint="/api/admin/billing/audit-log"
      columns={[
        { key: 'id', label: 'Event ID', width: '160px' },
        { key: 'action', label: 'Action', width: '220px' },
        { key: 'source', label: 'Source', width: '100px' },
        { key: 'stripeEventId', label: 'Stripe Event', width: '220px' },
        { key: 'createdAt', label: 'Created', width: '180px' },
      ]}
    />
  );
}
