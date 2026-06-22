import React from 'react';
import AdminLayout from '@/app/components/admin/AdminLayout';
import AdminRoleGuard from '@/app/components/admin/AdminRoleGuard';
import PlanEditorCard from '@/app/components/admin/PlanEditorCard';
import PricingEditorCard from '@/app/components/admin/PricingEditorCard';
import { getAdminSession } from '@/app/admin/lib/session';

const planConfigs = [
  {
    plan: 'Starter',
    description: 'For small pilots and early onboarding.',
    monthly: '59 EUR',
    annual: '590 EUR',
    triYear: '1590 EUR',
    seats: '5',
    extraSeat: '9 EUR',
    features: ['Core compliance workflows', 'Basic analytics', 'Email support'],
    addOns: 'Premium support',
    status: 'Active',
  },
  {
    plan: 'Enterprise',
    description: 'For large organizations and multi-region deployments.',
    monthly: 'Quote only',
    annual: 'Quote only',
    triYear: 'Quote only',
    seats: 'Custom',
    extraSeat: 'Custom',
    features: ['All modules', 'API access', 'Custom onboarding'],
    addOns: 'All add-ons',
    status: 'Active',
  },
];

export default async function AdminPlansPage() {
  const session = await getAdminSession();

  return (
    <AdminLayout activePath="/admin/plans" title="Plans & Pricing" subtitle="Configure product plans and commercial packaging">
      <AdminRoleGuard role={session?.role ?? 'support-admin'} allowed={['super-admin', 'product-admin-operator']}>
        {/* Pricing Management */}
        <PricingEditorCard />

        {/* Plan Editor Cards */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-[#1F3529] mb-4">Plan Configurations</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {planConfigs.map((plan) => (
              <PlanEditorCard key={plan.plan} {...plan} />
            ))}
          </div>
        </div>
      </AdminRoleGuard>
    </AdminLayout>
  );
}
