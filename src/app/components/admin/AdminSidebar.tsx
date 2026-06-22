import React from 'react';

type SidebarItem = { label: string; href: string };

const items: SidebarItem[] = [
  { label: 'Overview', href: '/admin/dashboard' },
  { label: 'Subscribers', href: '/admin/subscribers' },
  { label: 'Subscriptions', href: '/admin/subscriptions' },
  { label: 'Finance', href: '/admin/finance' },
  { label: 'Invoices', href: '/admin/invoices' },
  { label: 'Quotes', href: '/admin/quotes' },
  { label: 'Plans & Pricing', href: '/admin/plans' },
  { label: 'Add-ons', href: '/admin/add-ons' },
  { label: 'Access Management', href: '/admin/access' },
  { label: 'Notifications', href: '/admin/notifications' },
  { label: 'Reports', href: '/admin/reports' },
  { label: 'Audit Logs', href: '/admin/audit-logs' },
  { label: 'Settings', href: '/admin/settings' },
];

export default function AdminSidebar({ activePath }: { activePath: string }) {
  return (
    <aside className="sticky top-0 h-screen border-r border-[#E3E7E8] bg-white px-4 py-6">
      <div className="mb-6 border-b border-[#E3E7E8] pb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2E7D32]">LBYA Admin</p>
        <h2 className="mt-2 text-lg font-semibold text-[#1F3529]">MCT Control Center</h2>
      </div>
      <nav className="space-y-1">
        {items.map((item) => {
          const isActive = activePath === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              className={`block rounded-sm px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#E8F5E9] text-[#1F5B25]'
                  : 'text-[#37474F]/78 hover:bg-[#F2F5F5] hover:text-[#1F3529]'
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
