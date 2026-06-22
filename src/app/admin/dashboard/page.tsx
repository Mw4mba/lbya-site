"use client";

import React from 'react';
import AdminLayout from '@/app/components/admin/AdminLayout';
import AdminKPICard from '@/app/components/admin/AdminKPICard';
import AdminChartCard from '@/app/components/admin/AdminChartCard';
import { getOverviewKPIs, getActivityFeed } from '@/app/components/admin/mockData';
import { useProduct } from '@/app/components/admin/ProductContext';

export default function AdminDashboardPage() {
  const { activeProduct } = useProduct();
  const overviewKPIs = getOverviewKPIs(activeProduct);
  const activityFeed = getActivityFeed(activeProduct);

  return (
    <AdminLayout
      activePath="/admin/dashboard"
      title="Admin Dashboard"
      subtitle={activeProduct === 'mct' ? 'Supply chain and logistics management' : 'Building Information Modeling control'}
    >
      <section>
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold bg-linear-to-r from-[#2E7D32] to-[#1b5e20] bg-clip-text text-transparent">Key Metrics</h2>
            <p className="mt-2 text-sm font-medium text-[#37474F]/60">Real-time performance indicators</p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-[#2E7D32]/10 px-4 py-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[#2E7D32] animate-pulse" />
            <span className="text-xs font-bold text-[#2E7D32]">Live</span>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {overviewKPIs.map((kpi) => (
            <AdminKPICard key={kpi.label} label={kpi.label} value={kpi.value} delta={kpi.delta} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold bg-linear-to-r from-[#2E7D32] to-[#1b5e20] bg-clip-text text-transparent">Performance Overview</h2>
            <p className="mt-2 text-sm font-medium text-[#37474F]/60">Visualize trends and patterns</p>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <AdminChartCard title={activeProduct === 'mct' ? 'Revenue trend by month' : 'Project pipeline'} />
          <AdminChartCard title={activeProduct === 'mct' ? 'Subscriber growth' : 'Workspace growth'} />
          <AdminChartCard title={activeProduct === 'mct' ? 'Plan distribution' : 'Feature adoption'} />
        </div>
      </section>

      <section>
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h3 className="text-3xl font-bold bg-linear-to-r from-[#2E7D32] to-[#1b5e20] bg-clip-text text-transparent">Recent activity</h3>
            <p className="mt-2 text-sm font-medium text-[#37474F]/60">Latest system events</p>
          </div>
        </div>
        <ul className="rounded-2xl border border-[#2E7D32]/15 bg-linear-to-br from-white via-white to-[#F5F5DC]/40 p-8 shadow-lg">
          {activityFeed.map((item) => (
            <li key={item} className="flex items-start gap-4 rounded-xl p-4 transition-all duration-200 hover:bg-[#2E7D32]/5 group">
              <span className="inline-block h-2 w-2 rounded-full bg-[#2E7D32] animate-pulse shrink-0 mt-2" />
              <span className="text-sm font-medium text-[#37474F]/75 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </AdminLayout>
  );
}
