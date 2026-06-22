"use client";

import React from 'react';
import { useProduct, type Product } from './ProductContext';

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
  const { activeProduct, setActiveProduct, productLabel } = useProduct();

  const handleProductSwitch = (product: Product) => {
    setActiveProduct(product);
  };

  return (
    <aside className="sticky top-0 h-screen border-r border-[#2E7D32]/10 bg-linear-to-b from-white via-[#F5F5DC]/20 to-white/80 px-6 py-10 shadow-2xl backdrop-blur-sm">
      <div className="mb-8 border-b border-[#2E7D32]/15 pb-6">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#2E7D32]/70">LBYA Admin</p>
        <h2 className="mt-3 bg-linear-to-r from-[#2E7D32] to-[#1b5e20] bg-clip-text text-xl font-black text-transparent">
          {productLabel(activeProduct)}
        </h2>
        <p className="mt-2 text-xs font-medium text-[#37474F]/60">
          {activeProduct === 'mct' ? '✓ Commercialized' : '🔄 Early Stage'}
        </p>
      </div>

      <div className="mb-8 space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#37474F]/60">Switch Product</p>
        <button
          onClick={() => handleProductSwitch('mct')}
          className={`w-full rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-300 ${
            activeProduct === 'mct'
              ? 'bg-linear-to-r from-[#2E7D32] to-[#1b5e20] text-white shadow-md'
              : 'bg-white/40 text-[#37474F]/70 border border-[#2E7D32]/10 hover:bg-[#2E7D32]/8'
          }`}
        >
          Malaika Control Tower
        </button>
        <button
          onClick={() => handleProductSwitch('nbc')}
          className={`w-full rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-300 ${
            activeProduct === 'nbc'
              ? 'bg-linear-to-r from-[#2E7D32] to-[#1b5e20] text-white shadow-md'
              : 'bg-white/40 text-[#37474F]/70 border border-[#2E7D32]/10 hover:bg-[#2E7D32]/8'
          }`}
        >
          Nayeli BIM Control
        </button>
      </div>

      <nav className="space-y-2">
        {items.map((item) => {
          const isActive = activePath === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              className={`group relative flex items-center rounded-xl px-5 py-3.5 text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? 'bg-linear-to-r from-[#2E7D32] to-[#1b5e20] text-white shadow-lg before:absolute before:inset-0 before:rounded-xl before:bg-white/10 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100'
                  : 'text-[#37474F]/70 hover:bg-[#2E7D32]/8 hover:text-[#2E7D32]'
              }`}
            >
              <span className="relative z-10">{item.label}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
