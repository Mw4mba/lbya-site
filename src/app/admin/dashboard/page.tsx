import React from 'react';
import AdminLayout from '@/app/components/admin/AdminLayout';
import AdminKPICard from '@/app/components/admin/AdminKPICard';
import AdminChartCard from '@/app/components/admin/AdminChartCard';
import { activityFeed, overviewKPIs } from '@/app/components/admin/mockData';

export default function AdminDashboardPage() {
  return (
    <AdminLayout activePath="/admin/dashboard" title="Admin Dashboard" subtitle="Internal command center for subscriptions, finance, and operations">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewKPIs.map((kpi) => (
          <AdminKPICard key={kpi.label} label={kpi.label} value={kpi.value} delta={kpi.delta} />
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <AdminChartCard title="Revenue trend by month" />
        <AdminChartCard title="Subscriber growth" />
        <AdminChartCard title="Plan distribution" />
      </section>

      <section className="rounded-sm border border-[#E3E7E8] bg-white p-5">
        <h3 className="text-lg font-semibold text-[#1F3529]">Recent activity</h3>
        <ul className="mt-3 space-y-2 text-sm text-[#37474F]/82">
          {activityFeed.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#2E7D32]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </AdminLayout>
  );
}
