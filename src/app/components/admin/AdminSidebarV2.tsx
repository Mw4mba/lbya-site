"use client";

import React from 'react';
import Link from 'next/link';
import { adminColors, adminSpacing } from './adminDesignTokens';

interface NavGroup {
  label: string;
  items: NavItem[];
}

interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

interface AdminSidebarProps {
  activePath: string;
}

const navigationGroups: NavGroup[] = [
  {
    label: 'Control Center',
    items: [{ label: 'Dashboard', href: '/admin/dashboard-v2', icon: '📊' }],
  },
  {
    label: 'Customers & Billing',
    items: [
      { label: 'Customers', href: '/admin/customers', icon: '👥' },
      { label: 'Subscriptions', href: '/admin/subscriptions', icon: '📝' },
      { label: 'Invoices', href: '/admin/invoices', icon: '🧾' },
      { label: 'Payments', href: '/admin/payments', icon: '💳' },
      { label: 'Failed Payments', href: '/admin/failed-payments', icon: '⚠️' },
      { label: 'Renewals', href: '/admin/renewals', icon: '🔁' },
      { label: 'Revenue', href: '/admin/revenue', icon: '💶' },
    ],
  },
  {
    label: 'Products',
    items: [
      { label: 'Plans & Pricing', href: '/admin/plans', icon: '💰' },
      { label: 'Add-ons', href: '/admin/add-ons', icon: '➕' },
      { label: 'Product Access', href: '/admin/product-access', icon: '🔐' },
    ],
  },
  {
    label: 'Operations & Insights',
    items: [
      { label: 'Applications & Requests', href: '/admin/applications', icon: '🗂️' },
      { label: 'Project Management', href: '/admin/projects', icon: '📌' },
      { label: 'Quotes & Requests', href: '/admin/quotes', icon: '📋' },
      { label: 'Reports & Analytics', href: '/admin/reports', icon: '📈' },
      { label: 'Notifications', href: '/admin/notifications', icon: '🔔' },
    ],
  },
  {
    label: 'Administration',
    items: [
      { label: 'Audit Log', href: '/admin/audit-log', icon: '📋' },
      { label: 'Admin Users', href: '/admin/access', icon: '👨‍💼' },
      { label: 'Settings', href: '/admin/settings', icon: '⚙️' },
    ],
  },
];

export default function AdminSidebar({ activePath }: AdminSidebarProps) {
  return (
    <aside
      className="hidden h-screen overflow-y-auto border-r lg:flex lg:flex-col"
      style={{
        backgroundColor: adminColors.adminSurface,
        borderColor: adminColors.adminBorder,
        width: '260px',
        boxShadow: '1px 0 3px rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* Brand */}
      <div
        className="flex items-center border-b px-6 py-6"
        style={{ borderColor: adminColors.adminBorder }}
      >
        <div
          className="w-full rounded-xl px-4 py-3"
          style={{
            backgroundColor: adminColors.lbyaGreenDark,
            border: `1px solid ${adminColors.lbyaGreen}`,
            boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 6px 16px rgba(6, 78, 31, 0.14)`,
          }}
        >
          <img
            src="/lbya-wordmark.png"
            alt="LBYA"
            className="block h-12 w-full object-contain"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-8 space-y-7">
        {navigationGroups.map((group) => (
          <div key={group.label}>
            <p
              className="px-4 text-xs font-bold uppercase tracking-wider mb-4"
              style={{ color: adminColors.adminSubtle }}
            >
              {group.label}
            </p>
            <ul className="space-y-2">
              {group.items.map((item) => {
                const isActive = activePath === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:shadow-sm"
                      style={{
                        color: isActive ? adminColors.lbyaGreen : adminColors.adminMuted,
                        backgroundColor: isActive ? adminColors.lbyaGreenSoft : 'transparent',
                        borderLeft: isActive ? `3px solid ${adminColors.lbyaGreen}` : '3px solid transparent',
                        paddingLeft: isActive ? 'calc(1rem - 3px)' : '1rem',
                      }}
                    >
                      {item.icon && <span className="text-base">{item.icon}</span>}
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div
        className="border-t px-4 py-5"
        style={{ borderColor: adminColors.adminBorder }}
      >
        <p
          className="text-xs text-center font-medium"
          style={{ color: adminColors.adminSubtle }}
        >
          LBYA AB © 2026
        </p>
      </div>
    </aside>
  );
}
