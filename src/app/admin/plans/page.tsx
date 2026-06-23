import React from 'react';
import AdminLayoutV2 from '@/app/components/admin/AdminLayoutV2';
import { adminColors } from '@/app/components/admin/adminDesignTokens';
import { getAllPlanPricing } from '@/lib/billingStore';

export default async function AdminPlansPage() {
  const plans = await getAllPlanPricing();

  return (
    <AdminLayoutV2
      activePath="/admin/plans"
      title="Plans & Pricing"
      subtitle="Manage subscription plans, billing terms, base prices, seat rules, add-on availability, and enterprise package settings."
    >
      <section>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: adminColors.lbyaGreen }}>
            Create Plan
          </button>
          <button className="px-4 py-2 rounded-lg text-sm font-medium border" style={{ borderColor: adminColors.adminBorder, color: adminColors.adminText }}>
            Import Pricing
          </button>
        </div>
      </section>

      <section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={`${p.product}-${p.plan}`}
              className="rounded-lg border p-6"
              style={{
                backgroundColor: adminColors.adminSurface,
                borderColor: adminColors.adminBorder,
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs font-medium" style={{ color: adminColors.adminMuted }}>
                    {p.product}
                  </p>
                  <p className="text-lg font-semibold mt-1" style={{ color: adminColors.adminText }}>
                    {p.plan}
                  </p>
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded" style={{ backgroundColor: adminColors.lbyaGreenSoft, color: adminColors.lbyaGreen }}>
                  {p.status}
                </span>
              </div>

              <div className="space-y-3 mt-6">
                <div>
                  <p className="text-xs" style={{ color: adminColors.adminMuted }}>Monthly</p>
                  <p className="text-sm font-semibold" style={{ color: adminColors.adminText }}>{p.monthlyPrice}</p>
                </div>
                <div>
                  <p className="text-xs" style={{ color: adminColors.adminMuted }}>Yearly</p>
                  <p className="text-sm font-semibold" style={{ color: adminColors.adminText }}>{p.yearlyPrice}</p>
                </div>
                <div>
                  <p className="text-xs" style={{ color: adminColors.adminMuted }}>Included Seats</p>
                  <p className="text-sm font-semibold" style={{ color: adminColors.adminText }}>{p.seats}</p>
                </div>
              </div>

              <button
                className="mt-6 w-full px-3 py-2 rounded text-sm font-medium border"
                style={{
                  borderColor: adminColors.adminBorder,
                  color: adminColors.adminText,
                }}
              >
                Edit Plan
              </button>
            </div>
          ))}
        </div>
      </section>
    </AdminLayoutV2>
  );
}
