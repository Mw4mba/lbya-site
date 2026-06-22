import React from 'react';
import AdminLayout from '@/app/components/admin/AdminLayout';
import SubscribersTable from '@/app/components/admin/SubscribersTable';
import { subscribers } from '@/app/components/admin/mockData';

export default function AdminSubscribersPage() {
  return (
    <AdminLayout activePath="/admin/subscribers" title="Subscriber Management" subtitle="Search, filter, and administer customer subscriptions">
      <section className="rounded-sm border border-[#E3E7E8] bg-white p-4">
        <div className="grid gap-3 md:grid-cols-4">
          <input className="border border-[#DCE1E2] px-3 py-2 text-sm" placeholder="Search by company, email, invoice" />
          <select className="border border-[#DCE1E2] px-3 py-2 text-sm"><option>Filter by plan</option></select>
          <select className="border border-[#DCE1E2] px-3 py-2 text-sm"><option>Filter by status</option></select>
          <select className="border border-[#DCE1E2] px-3 py-2 text-sm"><option>Filter by country</option></select>
        </div>
      </section>
      <SubscribersTable rows={subscribers} />
    </AdminLayout>
  );
}
