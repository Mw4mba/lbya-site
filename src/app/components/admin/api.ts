// Placeholder admin API client. Wire these to real auth/back-end later.

const jsonHeaders = { 'Content-Type': 'application/json' };

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { ...jsonHeaders, ...(init?.headers ?? {}) },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Admin API error ${res.status} at ${url}`);
  }

  return (await res.json()) as T;
}

export const adminApi = {
  overview: () => request('/api/admin/dashboard'),

  subscribers: () => request('/api/admin/subscribers'),
  subscriberById: (id: string) => request(`/api/admin/subscribers/${id}`),
  updateSubscriber: (id: string, payload: unknown) =>
    request(`/api/admin/subscribers/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),
  suspendSubscriber: (id: string) => request(`/api/admin/subscribers/${id}/suspend`, { method: 'POST' }),
  reactivateSubscriber: (id: string) => request(`/api/admin/subscribers/${id}/reactivate`, { method: 'POST' }),

  subscriptions: () => request('/api/admin/subscriptions'),
  changePlan: (id: string, payload: unknown) =>
    request(`/api/admin/subscriptions/${id}/change-plan`, { method: 'PATCH', body: JSON.stringify(payload) }),
  addSeats: (id: string, payload: unknown) =>
    request(`/api/admin/subscriptions/${id}/add-seats`, { method: 'PATCH', body: JSON.stringify(payload) }),
  cancelRenewal: (id: string) => request(`/api/admin/subscriptions/${id}/cancel-renewal`, { method: 'POST' }),
  reactivateSubscription: (id: string) => request(`/api/admin/subscriptions/${id}/reactivate`, { method: 'POST' }),

  transactions: () => request('/api/admin/transactions'),
  transactionById: (id: string) => request(`/api/admin/transactions/${id}`),
  refundTransaction: (id: string, payload: unknown) =>
    request(`/api/admin/transactions/${id}/refund`, { method: 'POST', body: JSON.stringify(payload) }),
  exportTransactions: (payload: unknown) =>
    request('/api/admin/transactions/export', { method: 'POST', body: JSON.stringify(payload) }),

  invoices: () => request('/api/admin/invoices'),
  invoiceById: (id: string) => request(`/api/admin/invoices/${id}`),
  sendInvoice: (id: string) => request(`/api/admin/invoices/${id}/send`, { method: 'POST' }),
  markInvoicePaid: (id: string) => request(`/api/admin/invoices/${id}/mark-paid`, { method: 'POST' }),
  exportInvoices: (payload: unknown) =>
    request('/api/admin/invoices/export', { method: 'POST', body: JSON.stringify(payload) }),

  quotes: () => request('/api/admin/quotes'),
  quoteById: (id: string) => request(`/api/admin/quotes/${id}`),
  updateQuote: (id: string, payload: unknown) =>
    request(`/api/admin/quotes/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),
  convertQuote: (id: string) => request(`/api/admin/quotes/${id}/convert-to-subscription`, { method: 'POST' }),

  plans: () => request('/api/admin/plans'),
  createPlan: (payload: unknown) => request('/api/admin/plans', { method: 'POST', body: JSON.stringify(payload) }),
  updatePlan: (id: string, payload: unknown) =>
    request(`/api/admin/plans/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),
  deletePlan: (id: string) => request(`/api/admin/plans/${id}`, { method: 'DELETE' }),

  addOns: () => request('/api/admin/add-ons'),
  createAddOn: (payload: unknown) => request('/api/admin/add-ons', { method: 'POST', body: JSON.stringify(payload) }),
  updateAddOn: (id: string, payload: unknown) =>
    request(`/api/admin/add-ons/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),

  access: () => request('/api/admin/access'),
  addUser: (payload: unknown) => request('/api/admin/access/add-user', { method: 'POST', body: JSON.stringify(payload) }),
  removeUser: (payload: unknown) => request('/api/admin/access/remove-user', { method: 'POST', body: JSON.stringify(payload) }),
  suspendCompany: (payload: unknown) =>
    request('/api/admin/access/suspend-company', { method: 'POST', body: JSON.stringify(payload) }),
  reactivateCompany: (payload: unknown) =>
    request('/api/admin/access/reactivate-company', { method: 'POST', body: JSON.stringify(payload) }),

  revenueReport: () => request('/api/admin/reports/revenue'),
  subscribersReport: () => request('/api/admin/reports/subscribers'),
  invoicesReport: () => request('/api/admin/reports/invoices'),
  vatReport: () => request('/api/admin/reports/vat'),
  churnReport: () => request('/api/admin/reports/churn'),
  quotesReport: () => request('/api/admin/reports/quotes'),

  auditLogs: () => request('/api/admin/audit-logs'),
};
