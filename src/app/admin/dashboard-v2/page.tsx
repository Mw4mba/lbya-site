"use client";

import React from 'react';
import AdminLayoutV2 from '@/app/components/admin/AdminLayoutV2';
import AdminMetricCard from '@/app/components/admin/AdminMetricCard';
import AdminDataTable from '@/app/components/admin/AdminDataTableV2';
import AdminStatusBadge from '@/app/components/admin/AdminStatusBadgeV2';
import {
  adminOverviewKPIs,
  mockCustomers,
  mockSubscriptions,
  mockPayments,
  mockInvoices,
} from '@/data/mockAdminBilling';
import { adminColors } from '@/app/components/admin/adminDesignTokens';

export default function AdminDashboardV2Page() {
  return (
    <AdminLayoutV2
      activePath="/admin/dashboard"
      title="Subscription & Finance Control"
      subtitle="Manage customers, subscriptions, invoices, payments, billing terms, product access, revenue visibility, and internal finance controls across LBYA AB digital products."
    >
      {/* Primary Actions */}
      <section>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{
              backgroundColor: adminColors.lbyaGreen,
              color: 'white',
            }}
          >
            Add Customer
          </button>
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
            style={{
              borderColor: adminColors.adminBorder,
              color: adminColors.adminText,
            }}
          >
            Create Subscription
          </button>
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
            style={{
              borderColor: adminColors.adminBorder,
              color: adminColors.adminText,
            }}
          >
            Generate Invoice
          </button>
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
            style={{
              borderColor: adminColors.adminBorder,
              color: adminColors.adminText,
            }}
          >
            Export Report
          </button>
        </div>
      </section>

      {/* KPI Grid */}
      <section>
        <div className="mb-6">
          <h2
            className="text-xl font-semibold"
            style={{ color: adminColors.adminText }}
          >
            Key Performance Indicators
          </h2>
          <p
            className="mt-1 text-sm"
            style={{ color: adminColors.adminMuted }}
          >
            Real-time metrics for LBYA AB subscriptions and revenue
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {adminOverviewKPIs.slice(0, 8).map((kpi) => (
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

      {/* Recent Customers */}
      <section>
        <div className="mb-6">
          <h2
            className="text-xl font-semibold"
            style={{ color: adminColors.adminText }}
          >
            Recent Customers
          </h2>
          <p
            className="mt-1 text-sm"
            style={{ color: adminColors.adminMuted }}
          >
            Latest customer accounts and their subscription status
          </p>
        </div>
        <AdminDataTable
          columns={[
            {
              key: 'company' as const,
              label: 'Company',
              width: '200px',
            },
            {
              key: 'country' as const,
              label: 'Country',
              width: '120px',
            },
            {
              key: 'activeSubscriptions' as const,
              label: 'Subscriptions',
              width: '120px',
            },
            {
              key: 'mrr' as const,
              label: 'MRR',
              render: (value: number) => `€${value.toLocaleString()}`,
              width: '120px',
            },
            {
              key: 'status' as const,
              label: 'Status',
              render: (value: string) => (
                <AdminStatusBadge
                  status={value as any}
                  size="sm"
                />
              ),
              width: '120px',
            },
          ]}
          data={mockCustomers.slice(0, 5)}
          keyExtractor={(item) => item.id}
          striped
        />
      </section>

      {/* Recent Subscriptions */}
      <section>
        <div className="mb-6">
          <h2
            className="text-xl font-semibold"
            style={{ color: adminColors.adminText }}
          >
            Recent Subscriptions
          </h2>
          <p
            className="mt-1 text-sm"
            style={{ color: adminColors.adminMuted }}
          >
            Latest subscription activations and renewals
          </p>
        </div>
        <AdminDataTable
          columns={[
            {
              key: 'customer' as const,
              label: 'Customer',
              width: '180px',
            },
            {
              key: 'product' as const,
              label: 'Product',
              width: '80px',
            },
            {
              key: 'plan' as const,
              label: 'Plan',
              width: '180px',
            },
            {
              key: 'seats' as const,
              label: 'Seats',
              width: '80px',
            },
            {
              key: 'amount' as const,
              label: 'Amount',
              render: (value: number, row: any) => `€${value} ${row.currency}`,
              width: '120px',
            },
            {
              key: 'status' as const,
              label: 'Status',
              render: (value: string) => (
                <AdminStatusBadge
                  status={value as any}
                  size="sm"
                />
              ),
              width: '120px',
            },
          ]}
          data={mockSubscriptions.slice(0, 5)}
          keyExtractor={(item) => item.id}
          striped
        />
      </section>

      {/* Payment Status Overview */}
      <section>
        <div className="mb-6">
          <h2
            className="text-xl font-semibold"
            style={{ color: adminColors.adminText }}
          >
            Payment Status Overview
          </h2>
          <p
            className="mt-1 text-sm"
            style={{ color: adminColors.adminMuted }}
          >
            Breakdown of payment statuses and amounts
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { status: 'Succeeded', value: '127', amount: '€267,400' },
            { status: 'Pending', value: '8', amount: '€14,200' },
            { status: 'Failed', value: '8', amount: '€15,840' },
            { status: 'Refunded', value: '2', amount: '€2,400' },
          ].map((item) => (
            <div
              key={item.status}
              className="rounded-lg border p-4"
              style={{
                backgroundColor: adminColors.adminSurface,
                borderColor: adminColors.adminBorder,
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: adminColors.adminMuted }}
                  >
                    {item.status}
                  </p>
                  <p
                    className="mt-1 text-lg font-semibold"
                    style={{ color: adminColors.adminText }}
                  >
                    {item.value}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: adminColors.adminSubtle }}
                  >
                    {item.amount}
                  </p>
                </div>
                <AdminStatusBadge
                  status={item.status as any}
                  size="sm"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Invoices */}
      <section>
        <div className="mb-6">
          <h2
            className="text-xl font-semibold"
            style={{ color: adminColors.adminText }}
          >
            Recent Invoices
          </h2>
          <p
            className="mt-1 text-sm"
            style={{ color: adminColors.adminMuted }}
          >
            Latest invoices and their payment status
          </p>
        </div>
        <AdminDataTable
          columns={[
            {
              key: 'number' as const,
              label: 'Invoice #',
              width: '120px',
            },
            {
              key: 'customer' as const,
              label: 'Customer',
              width: '180px',
            },
            {
              key: 'issueDate' as const,
              label: 'Issue Date',
              width: '120px',
            },
            {
              key: 'amount' as const,
              label: 'Amount',
              render: (value: number, row: any) => `€${value}`,
              width: '100px',
            },
            {
              key: 'status' as const,
              label: 'Status',
              render: (value: string) => (
                <AdminStatusBadge
                  status={value as any}
                  size="sm"
                />
              ),
              width: '120px',
            },
          ]}
          data={mockInvoices.slice(0, 5)}
          keyExtractor={(item) => item.id}
          striped
        />
      </section>
    </AdminLayoutV2>
  );
}
