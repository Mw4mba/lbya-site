"use client";

import React, { useEffect, useState } from 'react';
import AdminLayoutV2 from '@/app/components/admin/AdminLayoutV2';
import { adminColors } from '@/app/components/admin/adminDesignTokens';

type RevenuePayload = {
  mrr: number;
  arr: number;
  revenueYtd: number;
  paymentCount: number;
};

function formatEuro(value: number): string {
  const sign = value < 0 ? '-' : '';
  const [intPart, decimalPart] = Math.abs(value).toFixed(2).split('.');
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `€${sign}${grouped}.${decimalPart}`;
}

export default function AdminRevenuePage() {
  const [data, setData] = useState<RevenuePayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let disposed = false;

    const load = async () => {
      try {
        const response = await fetch('/api/admin/billing/revenue', { cache: 'no-store' });
        if (!response.ok) throw new Error(`Request failed (${response.status})`);
        const payload = (await response.json()) as RevenuePayload;
        if (!disposed) {
          setData(payload);
          setError(null);
        }
      } catch (err) {
        if (!disposed) {
          setError(err instanceof Error ? err.message : 'Unable to load revenue data');
        }
      }
    };

    load();
    return () => {
      disposed = true;
    };
  }, []);

  const cards = [
    { label: 'Monthly Recurring Revenue', value: data ? formatEuro(data.mrr) : '-' },
    { label: 'Annual Recurring Revenue', value: data ? formatEuro(data.arr) : '-' },
    { label: 'Revenue (YTD)', value: data ? formatEuro(data.revenueYtd) : '-' },
    { label: 'Successful Payments', value: data ? String(data.paymentCount) : '-' },
  ];

  return (
    <AdminLayoutV2
      activePath="/admin/revenue"
      title="Revenue"
      subtitle="Revenue and recurring billing metrics for LBYA AB Stripe-connected subscriptions."
    >
      {error && (
        <section className="rounded-lg border p-4" style={{ borderColor: '#FECACA', backgroundColor: '#FEF2F2', color: '#991B1B' }}>
          {error}
        </section>
      )}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <article
            key={card.label}
            className="rounded-lg border p-5"
            style={{ borderColor: adminColors.adminBorder, backgroundColor: adminColors.adminSurface }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.08em]" style={{ color: adminColors.adminMuted }}>
              {card.label}
            </p>
            <p className="mt-3 text-2xl font-semibold" style={{ color: adminColors.lbyaGreen }}>
              {card.value}
            </p>
          </article>
        ))}
      </section>
    </AdminLayoutV2>
  );
}
