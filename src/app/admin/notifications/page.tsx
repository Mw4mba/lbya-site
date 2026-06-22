import React from 'react';
import AdminLayout from '@/app/components/admin/AdminLayout';
import { notifications } from '@/app/components/admin/mockData';

export default function AdminNotificationsPage() {
  return (
    <AdminLayout activePath="/admin/notifications" title="System Notifications" subtitle="Critical billing and subscription alerts">
      <section className="rounded-sm border border-[#E3E7E8] bg-white p-5">
        <ul className="space-y-2 text-sm text-[#37474F]/82">
          {notifications.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#D97706]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </AdminLayout>
  );
}
