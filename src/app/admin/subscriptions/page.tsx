import React from 'react';
import AdminLayout from '@/app/components/admin/AdminLayout';
import SubscribersTable from '@/app/components/admin/SubscribersTable';
import { subscribers } from '@/app/components/admin/mockData';

export default function AdminSubscriptionsPage() {
  return (
    <AdminLayout activePath="/admin/subscriptions" title="Subscription Management" subtitle="Plan changes, seats, cancellations, and renewals">
      <section className="rounded-sm border border-[#E3E7E8] bg-white p-4 text-sm text-[#37474F]/78">
        Use this section to manage changes to plan, add seats, cancel renewals, and trigger reactivation.
      </section>
      <SubscribersTable rows={subscribers} />
    </AdminLayout>
  );
}
