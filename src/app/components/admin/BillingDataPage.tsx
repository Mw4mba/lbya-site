"use client";

import React, { useEffect, useState } from 'react';
import AdminLayoutV2 from '@/app/components/admin/AdminLayoutV2';
import AdminDataTable from '@/app/components/admin/AdminDataTableV2';
import { adminColors } from '@/app/components/admin/adminDesignTokens';

type Column = {
  key: string;
  label: string;
  width?: string;
};

type BillingDataPageProps = {
  activePath: string;
  title: string;
  subtitle: string;
  endpoint: string;
  columns: Column[];
};

type BillingApiResponse = {
  items: Array<Record<string, unknown>>;
  total: number;
};

function getStripeObjectPath(stripeId: string): string | null {
  if (stripeId.startsWith('cus_')) return `customers/${stripeId}`;
  if (stripeId.startsWith('sub_')) return `subscriptions/${stripeId}`;
  if (stripeId.startsWith('pi_')) return `payments/${stripeId}`;
  if (stripeId.startsWith('in_')) return `invoices/${stripeId}`;
  if (stripeId.startsWith('evt_')) return `events/${stripeId}`;
  return null;
}

function getStripeDashboardBase(): string {
  const publishable = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
  return publishable.includes('pk_test_')
    ? 'https://dashboard.stripe.com/test'
    : 'https://dashboard.stripe.com';
}

export default function BillingDataPage({
  activePath,
  title,
  subtitle,
  endpoint,
  columns,
}: BillingDataPageProps) {
  const [items, setItems] = useState<Array<Record<string, unknown>>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch(endpoint, { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`);
        }

        const payload = (await response.json()) as BillingApiResponse;
        if (!cancelled) {
          setItems(payload.items || []);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load data');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [endpoint, refreshToken]);

  const handleSync = async () => {
    const confirmed = window.confirm('Sync latest Stripe customers, subscriptions, and invoices now?');
    if (!confirmed) return;

    setSyncMessage(null);
    setIsSyncing(true);

    try {
      const response = await fetch('/api/admin/billing/sync', { method: 'POST' });
      const payload = (await response.json()) as {
        ok?: boolean;
        customersFetched?: number;
        subscriptionsFetched?: number;
        invoicesFetched?: number;
        error?: string;
      };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || 'Stripe sync failed');
      }

      setSyncMessage(
        `Stripe sync complete: ${payload.customersFetched ?? 0} customers, ${payload.subscriptionsFetched ?? 0} subscriptions, ${payload.invoicesFetched ?? 0} invoices.`
      );
      setRefreshToken((previous) => previous + 1);
    } catch (syncError) {
      setSyncMessage(syncError instanceof Error ? syncError.message : 'Stripe sync failed');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <AdminLayoutV2 activePath={activePath} title={title} subtitle={subtitle}>
      <section className="flex flex-wrap items-center gap-3">
        <button
          className="rounded-sm bg-[#1F3529] px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white disabled:opacity-60"
          onClick={handleSync}
          disabled={isSyncing}
        >
          {isSyncing ? 'Syncing...' : 'Sync from Stripe'}
        </button>
        {syncMessage && (
          <p className="text-xs" style={{ color: syncMessage.toLowerCase().includes('failed') ? '#991B1B' : '#1F3529' }}>
            {syncMessage}
          </p>
        )}
      </section>

      {error && (
        <section
          className="rounded-lg border p-4"
          style={{ borderColor: '#FECACA', backgroundColor: '#FEF2F2', color: '#991B1B' }}
        >
          {error}
        </section>
      )}

      {isLoading ? (
        <section
          className="rounded-lg border p-6 text-sm"
          style={{ borderColor: adminColors.adminBorder, backgroundColor: adminColors.adminSurface, color: adminColors.adminMuted }}
        >
          Loading billing data...
        </section>
      ) : (
        <section>
          <AdminDataTable
            columns={columns.map((col) => ({
              key: col.key as never,
              label: col.label,
              width: col.width,
              render: (value: unknown) => {
                if (typeof value === 'string' && col.key.toLowerCase().includes('stripe')) {
                  const stripePath = getStripeObjectPath(value);
                  if (stripePath) {
                    return (
                      <a
                        href={`${getStripeDashboardBase()}/${stripePath}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-[#1F3529] underline decoration-[#1F3529]/40 underline-offset-2"
                      >
                        <span>{value}</span>
                        <span aria-hidden="true">↗</span>
                      </a>
                    );
                  }
                }

                if (typeof value === 'string' && col.key.toLowerCase().includes('url') && value.startsWith('http')) {
                  return (
                    <a href={value} target="_blank" rel="noreferrer" className="text-[#1F3529] underline decoration-[#1F3529]/40 underline-offset-2">
                      Open link
                    </a>
                  );
                }

                if (typeof value === 'boolean') return value ? 'Yes' : 'No';
                if (value === null || value === undefined || value === '') return '-';
                return String(value);
              },
            }))}
            data={items}
            keyExtractor={(item, index) => String(item.id ?? `${index}`)}
            striped
          />
        </section>
      )}
    </AdminLayoutV2>
  );
}
