"use client";

import React from 'react';
import AdminLayoutV2 from '@/app/components/admin/AdminLayoutV2';
import AdminMetricCard from '@/app/components/admin/AdminMetricCard';
import { adminOverviewKPIs } from '@/data/mockAdminBilling';
import { adminColors } from '@/app/components/admin/adminDesignTokens';

export default function AdminDashboardPage() {
  return (
    <AdminLayoutV2
      activePath="/admin/dashboard"
      title="Dashboard Overview"
      subtitle="Performance indicators and system health"
    >
      <section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {adminOverviewKPIs.map((kpi) => (
            <AdminMetricCard
              key={kpi.label}
              label={kpi.label}
              value={kpi.value}
              trend={kpi.trend}
              description={kpi.description}
            />
          ))}
        </div>
      </section>

      <section>
        <div
          className="rounded-lg border p-8"
          style={{
            backgroundColor: adminColors.adminSurface,
            borderColor: adminColors.adminBorder,
          }}
        >
          <h3 className="text-lg font-semibold mb-6" style={{ color: adminColors.adminText }}>
            Quick Actions
          </h3>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <button
              className="px-4 py-3 rounded-lg text-sm font-medium text-white"
              style={{ backgroundColor: adminColors.lbyaGreen }}
            >
              Add Customer
            </button>
            <button
              className="px-4 py-3 rounded-lg text-sm font-medium border"
              style={{ borderColor: adminColors.adminBorder, color: adminColors.adminText }}
            >
              Create Invoice
            </button>
            <button
              className="px-4 py-3 rounded-lg text-sm font-medium border"
              style={{ borderColor: adminColors.adminBorder, color: adminColors.adminText }}
            >
              View Reports
            </button>
            <button
              className="px-4 py-3 rounded-lg text-sm font-medium border"
              style={{ borderColor: adminColors.adminBorder, color: adminColors.adminText }}
            >
              Export Data
            </button>
          </div>
        </div>
      </section>
    </AdminLayoutV2>
  );
}
