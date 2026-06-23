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
    label: 'Overview',
    items: [{ label: 'Dashboard', href: '/admin/dashboard', icon: '📊' }],
  },
  {
    label: 'Customers & Subscriptions',
    items: [
      { label: 'Customers', href: '/admin/customers', icon: '👥' },
      { label: 'Subscriptions', href: '/admin/subscriptions', icon: '📝' },
      { label: 'Payments', href: '/admin/payments', icon: '💳' },
      { label: 'Invoices', href: '/admin/invoices', icon: '🧾' },
    ],
  },
  {
    label: 'Products',
    items: [
      { label: 'Plans & Pricing', href: '/admin/plans', icon: '💰' },
      { label: 'Add-ons', href: '/admin/add-ons', icon: '➕' },
      { label: 'Product Access', href: '/admin/access', icon: '🔐' },
    ],
  },
  {
    label: 'Finance',
    items: [
      { label: 'Renewals', href: '/admin/renewals', icon: '🔄' },
      { label: 'Failed Payments', href: '/admin/failed-payments', icon: '⚠️' },
      { label: 'Revenue Analytics', href: '/admin/revenue', icon: '📈' },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'Discounts', href: '/admin/discounts', icon: '🎟️' },
      { label: 'Audit Log', href: '/admin/audit-logs', icon: '📋' },
      { label: 'Admin Users', href: '/admin/users', icon: '👨‍💼' },
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
      }}
    >
      {/* Logo/Brand */}
      <div
        className="flex items-center gap-2 border-b px-6 py-6"
        style={{ borderColor: adminColors.adminBorder }}
      >
        <div
          className="flex h-8 w-8 items-center justify-center rounded font-bold text-white text-sm"
          style={{ backgroundColor: adminColors.lbyaGreen }}
        >
          LA
        </div>
        <div>
          <p
            className="text-sm font-semibold"
            style={{ color: adminColors.adminText }}
          >
            LBYA AB
          </p>
          <p
            className="text-xs"
            style={{ color: adminColors.adminMuted }}
          >
            Admin Console
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-8">
        {navigationGroups.map((group) => (
          <div key={group.label}>
            <p
              className="px-3 text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ color: adminColors.adminSubtle }}
            >
              {group.label}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = activePath === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors duration-150"
                      style={{
                        color: isActive ? adminColors.lbyaGreen : adminColors.adminMuted,
                        backgroundColor: isActive ? adminColors.lbyaGreenSoft : 'transparent',
                        fontWeight: isActive ? 600 : 500,
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
        className="border-t px-4 py-4"
        style={{ borderColor: adminColors.adminBorder }}
      >
        <p
          className="text-xs text-center"
          style={{ color: adminColors.adminSubtle }}
        >
          LBYA AB © 2026
        </p>
      </div>
    </aside>
  );
}
