import React from 'react';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';
import AdminLayoutV2 from '@/app/components/admin/AdminLayoutV2';
import { adminColors } from '@/app/components/admin/adminDesignTokens';
import { getAllPlanPricing } from '@/lib/billingStore';
import { asLocale, type Locale } from '@/app/content/locale';

function getCommercialPackageHref(locale: Locale, product: 'NBC' | 'MCT', plan: string): string {
  const localePrefix = `/${locale}`;
  const normalizedPlan = plan.toLowerCase();

  if (product === 'MCT') {
    if (normalizedPlan.includes('enterprise')) return `${localePrefix}/products/mct/enterprise`;
    if (normalizedPlan.includes('business')) return `${localePrefix}/products/mct/premium`;
    if (normalizedPlan.includes('professional')) return `${localePrefix}/products/mct/professional`;
    if (normalizedPlan.includes('basic') || normalizedPlan.includes('essential')) return `${localePrefix}/products/mct/basic`;
    return `${localePrefix}/products/mct`;
  }

  if (normalizedPlan.includes('enterprise')) return `${localePrefix}/products/nbc?plan=enterprise#packages`;
  if (normalizedPlan.includes('professional')) return `${localePrefix}/products/nbc?plan=professional#packages`;
  if (normalizedPlan.includes('essential') || normalizedPlan.includes('basic')) return `${localePrefix}/products/nbc?plan=essential#packages`;
  return `${localePrefix}/products/nbc#packages`;
}

export default async function AdminPlansPage() {
  const locale = asLocale(await getLocale());
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

              <Link
                href={getCommercialPackageHref(locale, p.product, p.plan)}
                className="mt-3 inline-flex w-full items-center justify-center rounded px-3 py-2 text-sm font-medium"
                style={{
                  backgroundColor: adminColors.lbyaGreenSoft,
                  color: adminColors.lbyaGreen,
                }}
              >
                View Website Package
              </Link>
            </div>
          ))}
        </div>
      </section>
    </AdminLayoutV2>
  );
}
