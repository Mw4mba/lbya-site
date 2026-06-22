'use client';

import React, { Suspense } from 'react';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import SignInCard from '@/app/components/subscription/SignInCard';
import { asLocale } from '@/app/content/locale';
import { pageFrameStyle } from '@/app/components/LayoutFrame';

function SignInPageContent() {
  const locale = asLocale(useLocale());
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') ?? '/checkout';

  return (
    <div className="min-h-screen bg-white text-[#1F3529]">
      <Navbar />
      <main className="relative overflow-hidden py-20" style={pageFrameStyle}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(46,125,50,0.12),transparent_40%),radial-gradient(circle_at_84%_8%,rgba(55,71,79,0.1),transparent_42%),linear-gradient(120deg,rgba(165,214,167,0.08)_0%,rgba(255,255,255,0.94)_38%,rgba(129,212,250,0.1)_100%)]" />
        <div className="relative flex justify-center">
          <SignInCard locale={locale} redirectPath={redirectPath} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white text-[#1F3529]">
          <Navbar />
          <main className="py-20" style={pageFrameStyle}>
            <div className="mx-auto max-w-md rounded-sm border border-[#DCE3E0] bg-white p-7 text-center shadow-[0_20px_60px_rgba(31,53,41,0.12)]">
              <h1 className="text-2xl font-semibold">Loading sign-in...</h1>
            </div>
          </main>
          <Footer />
        </div>
      }
    >
      <SignInPageContent />
    </Suspense>
  );
}
