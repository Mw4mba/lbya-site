"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminColors } from '@/app/components/admin/adminDesignTokens';
import Wordmark from '@/app/components/Wordmark';

const roles = [
  'super-admin',
  'finance-admin',
  'sales-admin',
  'support-admin',
  'product-admin-operator',
] as const;

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('internal.admin@lbya.se');
  const [role, setRole] = useState<(typeof roles)[number]>('super-admin');
  const [accessKey, setAccessKey] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          role,
          accessKey,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({ error: 'Login failed' }));
        throw new Error(payload.error || 'Login failed');
      }

      router.push('/admin/dashboard-v2');
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{
        background:
          'radial-gradient(1200px circle at 10% 10%, #EAF6EE 0%, #FAFAFA 45%, #F5F5F5 100%)',
      }}
    >
      <div
        className="w-full max-w-md rounded-xl border p-8"
        style={{
          backgroundColor: adminColors.adminSurface,
          borderColor: adminColors.adminBorder,
          boxShadow: '0 24px 64px rgba(17, 17, 17, 0.12)',
        }}
      >
        <div className="mb-14 flex items-center justify-center">
          <Wordmark
            src="/logoC.svg"
            className="h-40 w-full max-w-2xl"
            priority
            sizes="1200px"
          />
        </div>

        <form className="mt-10 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-[0.08em]" style={{ color: adminColors.adminMuted }}>
              Admin Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
              style={{
                borderColor: adminColors.adminBorder,
                color: adminColors.adminText,
                backgroundColor: adminColors.adminSurface,
              }}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-[0.08em]" style={{ color: adminColors.adminMuted }}>
              Admin Role
            </label>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value as (typeof roles)[number])}
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
              style={{
                borderColor: adminColors.adminBorder,
                color: adminColors.adminText,
                backgroundColor: adminColors.adminSurface,
              }}
            >
              {roles.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-[0.08em]" style={{ color: adminColors.adminMuted }}>
              Access Key
            </label>
            <input
              type="password"
              value={accessKey}
              onChange={(event) => setAccessKey(event.target.value)}
              placeholder="Enter admin access key"
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
              style={{
                borderColor: adminColors.adminBorder,
                color: adminColors.adminText,
                backgroundColor: adminColors.adminSurface,
              }}
            />
          </div>

          {error ? (
            <p className="rounded-lg border px-3 py-2 text-sm" style={{ color: adminColors.danger, borderColor: '#FECACA' }}>
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
            style={{
              backgroundColor: submitting ? '#6BAA7A' : adminColors.lbyaGreen,
            }}
          >
            {submitting ? 'Signing in...' : 'Sign in to Admin'}
          </button>
        </form>
      </div>
    </div>
  );
}
