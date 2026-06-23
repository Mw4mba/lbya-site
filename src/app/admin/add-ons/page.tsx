import React from 'react';
import AdminLayoutV2 from '@/app/components/admin/AdminLayoutV2';
import { adminColors } from '@/app/components/admin/adminDesignTokens';

export default function AdminAddOnsPage() {
  const addOns = [
    { name: 'Advanced Analytics', description: 'Premium reporting and insights', price: 'EUR 49/month', status: 'Active' },
    { name: 'Custom Reports', description: 'Bespoke reporting workflows', price: 'EUR 99/month', status: 'Active' },
    { name: 'Priority Support', description: '24/7 dedicated support', price: 'EUR 199/month', status: 'Active' },
    { name: 'Secure Offline Setup', description: 'On-premise deployment', price: 'Quote', status: 'Active' },
    { name: 'Custom Integrations', description: 'API and webhook setup', price: 'EUR 299/month', status: 'Active' },
  ];

  return (
    <AdminLayoutV2
      activePath="/admin/add-ons"
      title="Add-ons"
      subtitle="Manage optional modules, services, and add-on availability across plans."
    >
      <section>
        <button className="px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: adminColors.lbyaGreen }}>
          Create Add-on
        </button>
      </section>

      <section>
        <div className="grid gap-4">
          {addOns.map((addon) => (
            <div
              key={addon.name}
              className="rounded-lg border p-4 flex items-start justify-between"
              style={{
                backgroundColor: adminColors.adminSurface,
                borderColor: adminColors.adminBorder,
              }}
            >
              <div className="flex-1">
                <p className="font-semibold" style={{ color: adminColors.adminText }}>
                  {addon.name}
                </p>
                <p className="text-sm mt-1" style={{ color: adminColors.adminMuted }}>
                  {addon.description}
                </p>
              </div>
              <div className="flex items-center gap-4 ml-4">
                <div className="text-right">
                  <p className="text-sm font-medium" style={{ color: adminColors.adminText }}>
                    {addon.price}
                  </p>
                  <span className="text-xs font-medium px-2 py-1 rounded mt-2 inline-block" style={{ backgroundColor: adminColors.lbyaGreenSoft, color: adminColors.lbyaGreen }}>
                    {addon.status}
                  </span>
                </div>
                <button className="px-3 py-1 text-sm rounded border" style={{ borderColor: adminColors.adminBorder, color: adminColors.adminText }}>
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AdminLayoutV2>
  );
}
