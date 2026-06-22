'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Locale } from '@/app/content/locale';
import { localizePath } from '@/app/content/paths';

export default function CreateAccountCard({
  locale,
  redirectPath,
}: {
  locale: Locale;
  redirectPath: string;
}) {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const target = useMemo(() => {
    if (!redirectPath || !redirectPath.startsWith('/')) {
      return localizePath(locale, '/checkout');
    }
    return localizePath(locale, redirectPath);
  }, [locale, redirectPath]);

  const handleCreateAccount = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError(null);
    const safeEmail = email.trim().toLowerCase() || 'account@lbya.se';
    const safeName = fullName.trim() || 'LBYA User';

    // Placeholder auth flow until identity provider is connected.
    document.cookie = `lbya_auth_email=${encodeURIComponent(safeEmail)}; path=/; max-age=2592000; samesite=lax`;
    document.cookie = `lbya_auth_name=${encodeURIComponent(safeName)}; path=/; max-age=2592000; samesite=lax`;

    router.push(target);
  };

  return (
    <div className="w-full max-w-md rounded-sm border border-[#DCE3E0] bg-white p-7 shadow-[0_20px_60px_rgba(31,53,41,0.12)]">
      <div className="mb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2E7D32]">LBYA AB</p>
        <h1 className="mt-3 text-2xl font-semibold text-[#1F3529]">Create your account</h1>
        <p className="mt-2 text-sm text-[#37474F]/74">
          Set up access to MCT subscriptions, invoicing, users, and billing controls.
        </p>
      </div>

      <form className="grid gap-4" onSubmit={handleCreateAccount}>
        <label className="grid gap-1 text-sm text-[#37474F]">
          <span>Full name</span>
          <input
            type="text"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            required
            className="rounded-sm border border-[#DCE3E0] px-3 py-2.5 outline-none focus:border-[#2E7D32]"
          />
        </label>

        <label className="grid gap-1 text-sm text-[#37474F]">
          <span>Work email</span>
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

        <label className="grid gap-1 text-sm text-[#37474F]">
          <span>Confirm password</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
            className="rounded-sm border border-[#DCE3E0] px-3 py-2.5 outline-none focus:border-[#2E7D32]"
          />
        </label>

        {error ? (
          <p className="rounded-sm border border-[#F2C2C2] bg-[#FFF1F1] px-3 py-2 text-xs text-[#9F2A2A]">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          className="rounded-sm bg-[#2E7D32] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1F5B25]"
        >
          Create account
        </button>
      </form>

      <div className="mt-4 flex items-center justify-between text-xs text-[#37474F]/74">
        <a href={localizePath(locale, '/signin')} className="hover:text-[#2E7D32]">
          Already have an account? Sign in
        </a>
      </div>

      <p className="mt-5 rounded-sm border border-[#DCE3E0] bg-[#F4F7F6] p-3 text-xs leading-5 text-[#37474F]">
        This sign-up flow is active for site access and checkout continuity. Identity provider integration can be added later without changing the user journey.
      </p>
    </div>
  );
}