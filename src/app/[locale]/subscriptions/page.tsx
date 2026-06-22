'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import TrustBadgeRow from '@/app/components/subscription/TrustBadgeRow';
import { pageFrameStyle } from '@/app/components/LayoutFrame';
import { asLocale } from '@/app/content/locale';
import { getMctPackages, type MctPackageSlug } from '@/app/content/mctCommercial';
import { localizePath } from '@/app/content/paths';

const planIdByPackageSlug: Record<MctPackageSlug, 'starter' | 'professional' | 'business' | 'enterprise'> = {
  basic: 'starter',
  professional: 'professional',
  premium: 'business',
  enterprise: 'enterprise',
};

const userOptionsByPackageSlug: Record<MctPackageSlug, number[]> = {
  basic: [1, 3, 5],
  professional: [5, 10, 15],
  premium: [10, 20, 30],
  enterprise: [30, 50, 100],
};

const defaultUsersByPackageSlug: Record<MctPackageSlug, number> = {
  basic: 3,
  professional: 10,
  premium: 20,
  enterprise: 50,
};

export default function SubscriptionsPage() {
  const locale = asLocale(useLocale());
  const packages = getMctPackages(locale);
  const [usersByPackage, setUsersByPackage] = useState<Record<MctPackageSlug, number>>(defaultUsersByPackageSlug);

  const getPlanHref = (slug: MctPackageSlug) => {
    const planId = planIdByPackageSlug[slug];
    if (slug === 'enterprise') {
      return localizePath(locale, '/checkout?product=mct&plan=enterprise&request=quote');
    }
    return localizePath(locale, `/cart?product=mct&plan=${planId}&seats=${usersByPackage[slug]}`);
  };

  return (
    <div className="min-h-screen bg-white text-[#1F3529]">
      <Navbar />
      <main className="py-14" style={pageFrameStyle}>
        <section className="rounded-sm border border-[#DCE3E0] bg-[#F4F7F6] p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2E7D32]">MCT subscriptions</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-tight">Choose the MCT plan that fits your logistics operation</h1>
          <p className="mt-4 max-w-4xl text-base leading-7 text-[#37474F]/78">
            Start with essential transport visibility or scale into a full control tower for multi-client, multi-country logistics operations.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <p className="text-sm text-[#37474F]/72">Commercial package structure is aligned with MCT product packaging. Only users can be adjusted below.</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#plan-grid" className="rounded-sm bg-[#2E7D32] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1F5B25]">Compare plans</a>
            <a href={localizePath(locale, '/checkout?product=mct&plan=enterprise&request=quote')} className="rounded-sm border border-[#2E7D32]/30 px-4 py-2 text-sm font-semibold text-[#2E7D32] hover:bg-[#EAF2E7]">Request enterprise quote</a>
          </div>
          <div className="mt-5">
            <TrustBadgeRow />
          </div>
        </section>

        <section id="plan-grid" className="mt-8 grid gap-5 xl:grid-cols-4">
          {packages.map((pkg) => {
            const isFeatured = pkg.slug === 'professional';
            const isEnterprise = pkg.slug === 'enterprise';
            const availableUserOptions = userOptionsByPackageSlug[pkg.slug];
            return (
              <article
                key={pkg.slug}
                className={`flex min-h-[520px] flex-col rounded-sm border p-6 shadow-[0_20px_60px_rgba(31,53,41,0.08)] ${
                  isFeatured ? 'border-[#2E7D32] bg-[#1F3529] text-white' : 'border-[#DCE3E0] bg-white text-[#1F3529]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-semibold">{pkg.name}</h3>
                    <p className={`mt-2 text-sm ${isFeatured ? 'text-white/76' : 'text-[#37474F]/76'}`}>{pkg.summary}</p>
                  </div>
                  {isFeatured ? <span className="rounded-sm bg-[#A5D6A7] px-2 py-1 text-xs font-semibold text-[#1F3529]">Recommended</span> : null}
                </div>

                <p className={`mt-4 text-lg font-semibold ${isFeatured ? 'text-white' : 'text-[#1F3529]'}`}>{pkg.priceMonthly}</p>
                <p className={`mt-1 text-xs ${isFeatured ? 'text-white/60' : 'text-[#37474F]/62'}`}>{pkg.setupPrice}</p>

                <div className="mt-5 grid gap-2">
                  <label htmlFor={`users-${pkg.slug}`} className={`text-xs font-semibold uppercase tracking-[0.08em] ${isFeatured ? 'text-[#A5D6A7]' : 'text-[#2E7D32]'}`}>
                    Users
                  </label>
                  <select
                    id={`users-${pkg.slug}`}
                    value={usersByPackage[pkg.slug]}
                    onChange={(event) =>
                      setUsersByPackage((previous) => ({
                        ...previous,
                        [pkg.slug]: Number(event.target.value),
                      }))
                    }
                    className={`rounded-sm border px-3 py-2 text-sm outline-none ${
                      isFeatured
                        ? 'border-white/20 bg-[#243C2E] text-white focus:border-[#A5D6A7]'
                        : 'border-[#DCE3E0] bg-white text-[#1F3529] focus:border-[#2E7D32]'
                    }`}
                  >
                    {availableUserOptions.map((count) => (
                      <option key={count} value={count}>{count} users</option>
                    ))}
                  </select>
                </div>

                <ul className="mt-6 grid gap-2">
                  {pkg.features.slice(0, 6).map((feature) => (
                    <li key={feature} className={`flex gap-2 text-sm ${isFeatured ? 'text-white/82' : 'text-[#37474F]/82'}`}>
                      <span className={`mt-2 h-1.5 w-1.5 rounded-full ${isFeatured ? 'bg-[#A5D6A7]' : 'bg-[#2E7D32]'}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={getPlanHref(pkg.slug)}
                  className={`mt-auto inline-flex items-center justify-center rounded-sm px-4 py-3 text-sm font-semibold transition-colors ${
                    isFeatured
                      ? 'bg-white text-[#1F3529] hover:bg-[#A5D6A7]'
                      : isEnterprise
                        ? 'border border-[#2E7D32]/34 text-[#2E7D32] hover:bg-[#F4F7F6]'
                        : 'bg-[#2E7D32] text-white hover:bg-[#1F5B25]'
                  }`}
                >
                  {isEnterprise ? 'Request quote' : 'Continue'}
                </a>
              </article>
            );
          })}
        </section>
      </main>
      <Footer />
    </div>
  );
}
