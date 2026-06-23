import React from 'react';
import AdminLayoutV2 from '@/app/components/admin/AdminLayoutV2';
import { adminColors } from '@/app/components/admin/adminDesignTokens';

const mockNotifications = [
  { id: '1', type: 'warning', message: '3 invoices overdue by 15+ days from Jaridafrica Ltd', timestamp: '2 hours ago' },
  { id: '2', type: 'warning', message: 'Payment failed for NordBuild AB subscription renewal', timestamp: '4 hours ago' },
  { id: '3', type: 'info', message: 'ConstructFlow Inc switched from Monthly to Yearly billing', timestamp: '1 day ago' },
  { id: '4', type: 'warning', message: '2 trial subscriptions expiring in 7 days', timestamp: '1 day ago' },
  { id: '5', type: 'info', message: 'New customer registered: Tech Solutions GmbH', timestamp: '2 days ago' },
];

const getAlertColor = (type: string) => {
  switch(type) {
    case 'warning': return adminColors.warning;
    case 'danger': return adminColors.danger;
    case 'info': return adminColors.info;
    default: return adminColors.info;
  }
};

export default function AdminNotificationsPage() {
  return (
    <AdminLayoutV2
      activePath="/admin/notifications"
      title="System Notifications"
      subtitle="Billing alerts, subscription updates, payment failures, and admin actions."
    >
      <section className="space-y-3">
        {mockNotifications.map((notif) => (
          <div
            key={notif.id}
            className="rounded-lg border p-4 flex items-start gap-3"
            style={{
              backgroundColor: adminColors.adminSurface,
              borderColor: adminColors.adminBorder,
            }}
          >
            <div 
              className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
              style={{ backgroundColor: getAlertColor(notif.type) }}
            />
            <div className="flex-1">
              <p className="text-sm" style={{ color: adminColors.adminText }}>
                {notif.message}
              </p>
              <p className="text-xs mt-2" style={{ color: adminColors.adminMuted }}>
                {notif.timestamp}
              </p>
            </div>
            <button 
              className="text-xs px-2 py-1 rounded border"
              style={{
                borderColor: adminColors.adminBorder,
                color: adminColors.adminText,
              }}
            >
              Dismiss
            </button>
          </div>
        ))}
      </section>
    </AdminLayoutV2>
  );
}
