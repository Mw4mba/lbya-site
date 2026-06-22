import React from 'react';
import { redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import CheckoutAccountSection from '@/app/components/subscription/CheckoutAccountSection';
import CheckoutPaymentSection from '@/app/components/subscription/CheckoutPaymentSection';
import CheckoutOrderReview from '@/app/components/subscription/CheckoutOrderReview';
import TrustBadgeRow from '@/app/components/subscription/TrustBadgeRow';
import { pageFrameStyle } from '@/app/components/LayoutFrame';
import { asLocale } from '@/app/content/locale';
import { localizePath } from '@/app/content/paths';
import { getPlan, getBillingTerm } from '@/app/content/subscriptionFlow';
import { getAccountSession } from '@/app/lib/subscriptionAuth';

type CheckoutProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ product?: string; plan?: string; term?: string; seats?: string; request?: string }>;
};

export default async function CheckoutPage({ params, searchParams }: CheckoutProps) {
  const { locale } = await params;
  const activeLocale = asLocale(locale);
  setRequestLocale(activeLocale);

  const session = await getAccountSession();
  if (!session) {
    redirect(localizePath(activeLocale, '/signin?redirect=/checkout'));
  }

  const query = await searchParams;
  const selectedPlan = getPlan(query.plan);
  const selectedTerm = getBillingTerm(query.term);
  const selectedSeats = Number(query.seats) > 0 ? Number(query.seats) : 5;

  return (
    <div className="min-h-screen bg-white text-[#1F3529]">
      <Navbar />
      <main className="py-12" style={pageFrameStyle}>
        <section className="rounded-sm border border-[#DCE3E0] bg-[#F4F7F6] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2E7D32]">Secure subscription checkout</p>
          <h1 className="mt-2 text-3xl font-semibold">Checkout</h1>
          <p className="mt-3 text-sm leading-7 text-[#37474F]/75">
            An LBYA account is required to complete your subscription purchase and manage billing, users, and product access.
          </p>
          <div className="mt-4"><TrustBadgeRow /></div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-5">
            <CheckoutAccountSection email={session.email} />

            <section className="rounded-sm border border-[#DCE3E0] bg-white p-5">
              <h2 className="text-lg font-semibold text-[#1F3529]">Subscription summary</h2>
              <dl className="mt-4 grid gap-1 text-sm text-[#37474F]">
                <div className="flex justify-between"><dt>Product</dt><dd>MCT - Malaika Control Tower</dd></div>
                <div className="flex justify-between"><dt>Plan</dt><dd>{selectedPlan.name}</dd></div>
                <div className="flex justify-between"><dt>Billing term</dt><dd>{selectedTerm}</dd></div>
                <div className="flex justify-between"><dt>Number of users/seats</dt><dd>{selectedSeats}</dd></div>
                <div className="flex justify-between"><dt>Renewal date placeholder</dt><dd>2027-06-30</dd></div>
                <div className="flex justify-between"><dt>Auto-renewal placeholder</dt><dd>Enabled</dd></div>
              </dl>
            </section>

            <CheckoutPaymentSection plan={selectedPlan.id} />
          </div>

          <CheckoutOrderReview locale={activeLocale} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
