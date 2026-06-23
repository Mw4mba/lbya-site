import React from 'react';
import AdminLayoutV2 from '@/app/components/admin/AdminLayoutV2';
import { adminColors } from '@/app/components/admin/adminDesignTokens';

export default function AdminSettingsPage() {
  const settingSections = [
    {
      title: 'Company Billing Identity',
      items: [
        { label: 'Legal Company Name', value: 'LBYA AB' },
        { label: 'Country', value: 'Sweden' },
        { label: 'VAT Number', value: 'SE-556-123-4567' },
        { label: 'Billing Email', value: 'billing@lbya.example' },
      ],
    },
    {
      title: 'Billing Defaults',
      items: [
        { label: 'Default Currency', value: 'EUR' },
        { label: 'Default Billing Term', value: 'Monthly' },
        { label: 'Invoice Payment Terms (days)', value: '30' },
        { label: 'Tax Calculation', value: 'EU VAT' },
      ],
    },
    {
      title: 'Admin Permissions',
      items: [
        { label: 'Owner', value: 'Full access to all features' },
        { label: 'Finance Admin', value: 'Billing, invoices, payments' },
        { label: 'Subscription Manager', value: 'Subscriptions and renewals' },
        { label: 'Support Admin', value: 'Customer access and support' },
      ],
    },
  ];

  return (
    <AdminLayoutV2
      activePath="/admin/settings"
      title="Admin Settings"
      subtitle="Configure billing preferences, invoice numbering, currencies, payment provider settings, notifications, and internal finance controls."
    >
      <section className="space-y-8">
        {settingSections.map((section) => (
          <div
            key={section.title}
            className="rounded-lg border p-6"
            style={{
              backgroundColor: adminColors.adminSurface,
              borderColor: adminColors.adminBorder,
            }}
          >
            <h3 className="text-lg font-semibold mb-6" style={{ color: adminColors.adminText }}>
              {section.title}
            </h3>
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.label} className="flex items-center justify-between border-b" style={{ borderColor: adminColors.adminBorder, paddingBottom: '12px' }}>
                  <label className="text-sm font-medium" style={{ color: adminColors.adminMuted }}>
                    {item.label}
                  </label>
                  <span className="text-sm" style={{ color: adminColors.adminText }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
            <button
              className="mt-6 px-4 py-2 rounded text-sm font-medium"
              style={{
                backgroundColor: adminColors.lbyaGreen,
                color: 'white',
              }}
            >
              Edit Section
            </button>
          </div>
        ))}
      </section>
    </AdminLayoutV2>
  );
}
