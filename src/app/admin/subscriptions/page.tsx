import React from 'react';
import AdminLayout from '@/app/components/admin/AdminLayout';
import SubscribersTable from '@/app/components/admin/SubscribersTable';
import { subscribers } from '@/app/components/admin/mockData';

export default function AdminSubscriptionsPage() {
  return (
    <AdminLayout activePath="/admin/subscriptions" title="Subscription Management" subtitle="Plan changes, seats, cancellations, and renewals">
      <section className="rounded-2xl border border-[#2E7D32]/20 bg-gradient-to-r from-[#2E7D32]/8 to-transparent p-6">
        <p className="text-sm font-medium text-[#37474F]/80">💡 Use this section to manage plan changes, add/remove seats, cancel renewals, and trigger reactivation for active subscriptions.</p>
      </section>
      <section className="rounded-2xl border border-[#37474F]/10 bg-white p-8 shadow-sm">
        <h3 className="mb-6 text-lg font-bold text-[#2E7D32]">Search & Filter</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <input 
            className="rounded-lg border border-[#37474F]/15 bg-[#F5F5DC] px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#2E7D32] focus:bg-white focus:ring-2 focus:ring-[#2E7D32]/15" 
            placeholder="Search..." 
          />
          <select className="rounded-lg border border-[#37474F]/15 bg-[#F5F5DC] px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#2E7D32] focus:bg-white focus:ring-2 focus:ring-[#2E7D32]/15">
            <option>Subscription status</option>
          </select>
          <select className="rounded-lg border border-[#37474F]/15 bg-[#F5F5DC] px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#2E7D32] focus:bg-white focus:ring-2 focus:ring-[#2E7D32]/15">
            <option>Current plan</option>
          </select>
          <input 
            type="date"
            className="rounded-lg border border-[#37474F]/15 bg-[#F5F5DC] px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#2E7D32] focus:bg-white focus:ring-2 focus:ring-[#2E7D32]/15" 
          />
        </div>
      </section>
      <SubscribersTable rows={subscribers} />
    </AdminLayout>
  );
}
