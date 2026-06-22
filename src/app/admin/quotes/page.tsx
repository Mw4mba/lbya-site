import React from 'react';
import AdminLayout from '@/app/components/admin/AdminLayout';
import AdminRoleGuard from '@/app/components/admin/AdminRoleGuard';
import QuoteTable from '@/app/components/admin/QuoteTable';
import { quoteRequests } from '@/app/components/admin/mockData';
import { getAdminSession } from '@/app/admin/lib/session';

export default async function AdminQuotesPage() {
  const session = await getAdminSession();

  return (
    <AdminLayout activePath="/admin/quotes" title="Quotes & Enterprise Requests" subtitle="Manage quote lifecycle and conversion to subscriptions">
      <AdminRoleGuard role={session?.role ?? 'support-admin'} allowed={['super-admin', 'sales-admin']}>
        <section className="rounded-2xl border border-[#37474F]/10 bg-white p-8 shadow-sm">
          <h3 className="mb-6 text-lg font-bold text-[#2E7D32]">Search & Filter</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <input 
              className="rounded-lg border border-[#37474F]/15 bg-[#F5F5DC] px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#2E7D32] focus:bg-white focus:ring-2 focus:ring-[#2E7D32]/15" 
              placeholder="Search by company..." 
            />
            <select className="rounded-lg border border-[#37474F]/15 bg-[#F5F5DC] px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#2E7D32] focus:bg-white focus:ring-2 focus:ring-[#2E7D32]/15">
              <option>Quote status</option>
            </select>
            <select className="rounded-lg border border-[#37474F]/15 bg-[#F5F5DC] px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#2E7D32] focus:bg-white focus:ring-2 focus:ring-[#2E7D32]/15">
              <option>Requested plan</option>
            </select>
            <select className="rounded-lg border border-[#37474F]/15 bg-[#F5F5DC] px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#2E7D32] focus:bg-white focus:ring-2 focus:ring-[#2E7D32]/15">
              <option>Validity</option>
            </select>
            <input 
              type="date"
              className="rounded-lg border border-[#37474F]/15 bg-[#F5F5DC] px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#2E7D32] focus:bg-white focus:ring-2 focus:ring-[#2E7D32]/15" 
            />
          </div>
        </section>
        <QuoteTable rows={quoteRequests} />
      </AdminRoleGuard>
    </AdminLayout>
  );
}
