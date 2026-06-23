import React from 'react';
import { redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import SubscriptionManagementCard from '@/app/components/subscription/SubscriptionManagementCard';
import TrustBadgeRow from '@/app/components/subscription/TrustBadgeRow';
import { pageFrameStyle } from '@/app/components/LayoutFrame';
import { asLocale } from '@/app/content/locale';
import { localizePath } from '@/app/content/paths';
import { getAccountSession } from '@/app/lib/subscriptionAuth';
import { getAccountSubscriptionsWithPricing } from '@/lib/billingStore';

export default async function AccountSubscriptionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = asLocale(locale);
  setRequestLocale(activeLocale);

  const session = await getAccountSession();
  if (!session) {
    redirect(localizePath(activeLocale, '/signin?redirect=/account/subscriptions'));
  }

  const accountSubscriptionsWithPricing = await getAccountSubscriptionsWithPricing(session.email);

  return (
    <div className="min-h-screen bg-white text-[#1F3529]">
      <Navbar />
      <main className="py-12" style={pageFrameStyle}>
        <section className="rounded-sm border border-[#DCE3E0] bg-[#F4F7F6] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2E7D32]">LBYA account</p>
          <h1 className="mt-2 text-3xl font-semibold">Subscription management</h1>
          <p className="mt-3 text-sm text-[#37474F]/74">
            Manage active subscriptions, users, billing, invoices, and renewal settings for your MCT workspace.
          </p>
          <div className="mt-4"><TrustBadgeRow /></div>
        </section>

        <div className="mt-6 grid gap-4">
          {accountSubscriptionsWithPricing.length > 0 ? (
            accountSubscriptionsWithPricing.map((subscription) => (
              <div key={subscription.id}>
                <SubscriptionManagementCard
                  planName={subscription.plan}
                  renewalDate={subscription.renewalDate}
                  paymentStatus={subscription.paymentStatus}
                  users={subscription.users}
                />
                <div className="mt-2 rounded-sm border border-[#DCE3E0] bg-[#F8FBF9] px-4 py-3 text-sm text-[#37474F]">
                  Linked pricing: <span className="font-semibold text-[#1F3529]">{subscription.monthlyPrice}</span> monthly,{' '}
                  <span className="font-semibold text-[#1F3529]">{subscription.yearlyPrice}</span> yearly.
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-sm border border-[#DCE3E0] bg-white p-5 text-sm text-[#37474F]">
              No subscriptions are currently linked to this account.
            </div>
          )}
        </div>

        <section className="mt-6 rounded-sm border border-[#DCE3E0] bg-white p-5 shadow-[0_18px_50px_rgba(31,53,41,0.08)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2E7D32]">Billing & invoices</p>
              <h2 className="mt-1 text-xl font-semibold text-[#1F3529]">Manage billing in your client account</h2>
              <p className="mt-2 text-sm text-[#37474F]/74">
                Update billing contacts, download invoices, review payment history, and request invoice changes.
              </p>
            </div>
            <div className="flex gap-2">
              <button className="rounded-sm border border-[#DCE3E0] px-3 py-2 text-sm font-semibold text-[#1F3529] hover:bg-[#F4F7F6]">
                Update billing profile
              </button>
              <button className="rounded-sm bg-[#2E7D32] px-3 py-2 text-sm font-semibold text-white hover:bg-[#1F5B25]">
                Download all invoices
              </button>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full border border-[#DCE3E0] text-sm">
              <thead className="bg-[#F4F7F6] text-left text-[#1F3529]">
                <tr>
                  <th className="px-3 py-2 font-semibold">Invoice</th>
                  <th className="px-3 py-2 font-semibold">Period</th>
                  <th className="px-3 py-2 font-semibold">Status</th>
                  <th className="px-3 py-2 font-semibold">Amount</th>
                  <th className="px-3 py-2 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="text-[#37474F]">
                {[
                  { id: 'INV-2026-0912', period: 'Jun 2026', status: 'Paid', amount: 'EUR 2,490' },
                  { id: 'INV-2026-0876', period: 'May 2026', status: 'Paid', amount: 'EUR 2,490' },
                  { id: 'INV-2026-0833', period: 'Apr 2026', status: 'Paid', amount: 'EUR 2,180' },
                ].map((invoice) => (
                  <tr key={invoice.id} className="border-t border-[#DCE3E0]">
                    <td className="px-3 py-2 font-medium text-[#1F3529]">{invoice.id}</td>
                    <td className="px-3 py-2">{invoice.period}</td>
                    <td className="px-3 py-2">{invoice.status}</td>
                    <td className="px-3 py-2">{invoice.amount}</td>
                    <td className="px-3 py-2">
                      <button className="text-sm font-semibold text-[#2E7D32] hover:text-[#1F5B25]">Download PDF</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
