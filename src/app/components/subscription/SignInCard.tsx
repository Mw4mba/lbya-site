'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Locale } from '@/app/content/locale';
import { localizePath } from '@/app/content/paths';

export default function SignInCard({ locale, redirectPath }: { locale: Locale; redirectPath: string }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const target = useMemo(() => {
    if (!redirectPath || !redirectPath.startsWith('/')) {
      return localizePath(locale, '/cart?product=mct');
    }
    return localizePath(locale, redirectPath);
  }, [locale, redirectPath]);

  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const safeEmail = email.trim() || 'account@lbya.se';
    document.cookie = `lbya_auth_email=${encodeURIComponent(safeEmail)}; path=/; max-age=2592000; samesite=lax`;
    router.push(target);
  };

  return (
    <div className="w-full max-w-md rounded-sm border border-[#DCE3E0] bg-white p-7 shadow-[0_20px_60px_rgba(31,53,41,0.12)]">
      <div className="mb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2E7D32]">LBYA AB</p>
        <h1 className="mt-3 text-2xl font-semibold text-[#1F3529]">Sign in to continue to MCT</h1>
        <p className="mt-2 text-sm text-[#37474F]/74">
          Access your MCT workspace, subscriptions, invoices, users, and billing settings.
        </p>
      </div>

      <form className="grid gap-4" onSubmit={handleSignIn}>
        <label className="grid gap-1 text-sm text-[#37474F]">
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="rounded-sm border border-[#DCE3E0] px-3 py-2.5 outline-none focus:border-[#2E7D32]"
          />
        </label>

        <label className="grid gap-1 text-sm text-[#37474F]">
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="rounded-sm border border-[#DCE3E0] px-3 py-2.5 outline-none focus:border-[#2E7D32]"
          />
        </label>

        <button type="submit" className="rounded-sm bg-[#2E7D32] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1F5B25]">
          Continue / Sign in
        </button>
      </form>

      <div className="mt-4 flex items-center justify-between text-xs text-[#37474F]/74">
        <a href={localizePath(locale, '/create-account')} className="hover:text-[#2E7D32]">Create account</a>
        <a href={localizePath(locale, '/signin')} className="hover:text-[#2E7D32]">Forgot password?</a>
      </div>

      <div className="mt-5 grid gap-2">
        <button className="rounded-sm border border-[#DCE3E0] px-3 py-2 text-sm font-medium text-[#1F3529]">Sign in with Google</button>
        <button className="rounded-sm border border-[#DCE3E0] px-3 py-2 text-sm font-medium text-[#1F3529]">Sign in with Microsoft</button>
      </div>

      <p className="mt-5 rounded-sm border border-[#DCE3E0] bg-[#F4F7F6] p-3 text-xs leading-5 text-[#37474F]">
        Your account gives you access to subscriptions, invoices, users, and platform settings.
      </p>
    </div>
  );
}
