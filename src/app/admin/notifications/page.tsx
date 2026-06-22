import React from 'react';
import AdminLayout from '@/app/components/admin/AdminLayout';
import { notifications } from '@/app/components/admin/mockData';

export default function AdminNotificationsPage() {
  return (
    <AdminLayout activePath="/admin/notifications" title="System Notifications" subtitle="Critical billing and subscription alerts">
      <section className="rounded-2xl border border-[#37474F]/10 bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#2E7D32]">Recent Alerts</h2>
          <span className="text-xs font-bold uppercase tracking-widest text-[#37474F]/60">{notifications.length} notifications</span>
        </div>
        <ul className="space-y-3">
          {notifications.map((item, idx) => (
            <li key={idx} className="flex items-start gap-4 rounded-lg border border-[#37474F]/8 bg-gradient-to-r from-[#F5F5DC]/50 to-transparent p-4 transition-all duration-200 hover:border-[#D97706]/30 hover:bg-[#D97706]/5">
              <div className="mt-1.5 h-2.5 w-2.5 rounded-full bg-[#D97706] flex-shrink-0" />
              <span className="text-sm text-[#37474F]/85 leading-relaxed font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </AdminLayout>
  );
}
