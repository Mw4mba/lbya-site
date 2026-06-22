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

export default async function AccountSubscriptionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = asLocale(locale);
  setRequestLocale(activeLocale);

  const session = await getAccountSession();
  if (!session) {
    redirect(localizePath(activeLocale, '/signin?redirect=/account/subscriptions'));
  }

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
          <SubscriptionManagementCard planName="MCT Professional" renewalDate="2027-06-30" paymentStatus="Paid" users={8} />
          <SubscriptionManagementCard planName="MCT Business" renewalDate="2027-09-30" paymentStatus="Invoice requested" users={21} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
