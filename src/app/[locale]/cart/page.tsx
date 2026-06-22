'use client';

import React, { Suspense, useMemo, useState } from 'react';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import SeatSelector from '@/app/components/subscription/SeatSelector';
import AddOnSelector from '@/app/components/subscription/AddOnSelector';
import CartSummary from '@/app/components/subscription/CartSummary';
import BillingTermToggle from '@/app/components/subscription/BillingTermToggle';
import { pageFrameStyle } from '@/app/components/LayoutFrame';
import { asLocale } from '@/app/content/locale';
import { localizePath } from '@/app/content/paths';
import {
  DEFAULT_CART,
  MCT_SUBSCRIPTION_PLANS,
  type AddOnId,
  type BillingTerm,
  type PlanId,
  getBillingTerm,
  getPlan,
} from '@/app/content/subscriptionFlow';

function CartPageContent() {
  const locale = asLocale(useLocale());
  const searchParams = useSearchParams();
  const product = searchParams.get('product');
  const initialPlan = (searchParams.get('plan') as PlanId | null) ?? DEFAULT_CART.plan;
  const initialTerm = getBillingTerm(searchParams.get('term') ?? undefined);

  const [plan, setPlan] = useState<PlanId>(getPlan(initialPlan).id);
  const [term, setTerm] = useState<BillingTerm>(initialTerm);
  const [seats, setSeats] = useState<number>(DEFAULT_CART.seats);
  const [addOns, setAddOns] = useState<AddOnId[]>([]);

  const selectedPlan = getPlan(plan);

  const addOnLabels = useMemo(() => {
    return addOns.map((item) => item.replace(/-/g, ' '));
  }, [addOns]);

  const toggleAddOn = (id: AddOnId) => {
    setAddOns((previous) => (previous.includes(id) ? previous.filter((entry) => entry !== id) : [...previous, id]));
  };

  const handleContinueCheckout = async () => {
    const safeProduct = product ?? 'mct';
    await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product: safeProduct, plan, term, seats, addOns }),
    });
    window.location.href = localizePath(locale, `/checkout?product=${safeProduct}&plan=${plan}&term=${term}&seats=${seats}`);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-white text-[#1F3529]">
        <Navbar />
        <main className="py-20" style={pageFrameStyle}>
          <section className="rounded-sm border border-[#DCE3E0] bg-white p-8 text-center">
            <h1 className="text-3xl font-semibold">Your cart is empty</h1>
            <p className="mt-3 text-sm text-[#37474F]/72">Select an MCT subscription plan to continue.</p>
            <a href={localizePath(locale, '/subscriptions')} className="mt-6 inline-flex rounded-sm bg-[#2E7D32] px-4 py-2 text-sm font-semibold text-white">Compare plans</a>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#1F3529]">
      <Navbar />
      <main className="py-12" style={pageFrameStyle}>
        <h1 className="text-3xl font-semibold">Cart</h1>
        <p className="mt-2 text-sm text-[#37474F]/72">Need procurement approval or invoice-based payment? Request a formal quote for your organization.</p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-sm border border-[#DCE3E0] bg-[#F4F7F6] p-5">
            <h2 className="text-lg font-semibold">MCT - Malaika Control Tower</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="grid gap-1 text-sm">
                <span>Selected plan</span>
                <select value={plan} onChange={(event) => setPlan(event.target.value as PlanId)} className="rounded-sm border border-[#DCE3E0] px-3 py-2">
                  {MCT_SUBSCRIPTION_PLANS.map((option) => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                  ))}
                </select>
              </label>
              <div className="grid gap-1 text-sm">
                <span>Billing term</span>
                <BillingTermToggle value={term} onChange={setTerm} />
              </div>
              <div className="grid gap-1 text-sm">
                <span>Number of seats/users</span>
                <SeatSelector value={seats} onChange={setSeats} />
              </div>
            </div>

            <div className="mt-5 grid gap-2 text-sm">
              <h3 className="font-semibold text-[#1F3529]">Optional add-ons</h3>
              <AddOnSelector selected={addOns} onToggle={toggleAddOn} />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={handleContinueCheckout} className="rounded-sm bg-[#2E7D32] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1F5B25]">Continue to checkout</button>
              <a href={localizePath(locale, '/checkout?product=mct&plan=enterprise&request=quote')} className="rounded-sm border border-[#2E7D32]/30 px-4 py-2 text-sm font-semibold text-[#2E7D32] hover:bg-[#EAF2E7]">Request a quote</a>
              <a href={localizePath(locale, '/subscriptions')} className="rounded-sm border border-[#DCE3E0] px-4 py-2 text-sm font-semibold text-[#37474F]">Continue browsing</a>
            </div>
          </section>

          <CartSummary plan={selectedPlan.id} term={term} seats={seats} addOnLabels={addOnLabels} addOns={addOns} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function CartPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white text-[#1F3529]">
          <Navbar />
          <main className="py-12" style={pageFrameStyle}>
            <section className="rounded-sm border border-[#DCE3E0] bg-[#F4F7F6] p-5">
              <h1 className="text-3xl font-semibold">Loading cart...</h1>
            </section>
          </main>
          <Footer />
        </div>
      }
    >
      <CartPageContent />
    </Suspense>
  );
}
