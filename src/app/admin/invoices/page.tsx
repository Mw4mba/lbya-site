import BillingDataPage from '@/app/components/admin/BillingDataPage';

export default function AdminInvoicesPage() {
  return (
    <BillingDataPage
      activePath="/admin/invoices"
      title="Invoices"
      subtitle="Stripe invoices with status, due dates, and hosted invoice links for LBYA AB customers."
      endpoint="/api/admin/billing/invoices"
      columns={[
        { key: 'customerId', label: 'Customer', width: '160px' },
        { key: 'invoiceNumber', label: 'Invoice Number', width: '160px' },
        { key: 'amountDue', label: 'Amount Due', width: '120px' },
        { key: 'amountPaid', label: 'Amount Paid', width: '120px' },
        { key: 'currency', label: 'Currency', width: '90px' },
        { key: 'status', label: 'Status', width: '120px' },
        { key: 'dueDate', label: 'Due Date', width: '170px' },
        { key: 'invoicePdfUrl', label: 'Invoice PDF', width: '220px' },
        { key: 'hostedInvoiceUrl', label: 'Hosted Invoice', width: '220px' },
      ]}
    />
  );
}
