"use client";

import React, { useEffect, useState } from 'react';
import AdminLayoutV2 from '@/app/components/admin/AdminLayoutV2';
import AdminDataTable from '@/app/components/admin/AdminDataTableV2';
import { adminColors } from '@/app/components/admin/adminDesignTokens';

type ProductAccessRow = {
  id: string;
  organizationId: string | null;
  product: string;
  plan: string;
  seatsUsed: number;
  seatsAllowed: number;
  status: string;
  subscriptionId: string | null;
  reason: string | null;
  updatedAt?: string;
};

export default function AdminProductAccessBillingPage() {
  const [items, setItems] = useState<ProductAccessRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch('/api/admin/billing/product-access', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`);
        }

        const payload = (await response.json()) as { items: ProductAccessRow[] };
        if (!cancelled) {
          setItems(payload.items || []);
          setError(null);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : 'Unable to load product access records');
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
  }, [refreshToken]);

  const syncFromStripe = async () => {
    const confirmed = window.confirm('Sync latest Stripe records before managing product access?');
    if (!confirmed) return;

    setIsSyncing(true);
    setSyncMessage(null);
    try {
      const response = await fetch('/api/admin/billing/sync', { method: 'POST' });
      const payload = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || 'Stripe sync failed');
      }

      setSyncMessage('Stripe sync complete. Product access records can now be reviewed.');
      setRefreshToken((previous) => previous + 1);
    } catch (syncError) {
      setSyncMessage(syncError instanceof Error ? syncError.message : 'Stripe sync failed');
    } finally {
      setIsSyncing(false);
    }
  };

  const setAccessStatus = async (row: ProductAccessRow, nextStatus: 'enabled' | 'suspended') => {
    const verb = nextStatus === 'suspended' ? 'Suspend' : 'Enable';
    const confirmed = window.confirm(`${verb} access for ${row.organizationId || row.id}?`);
    if (!confirmed) return;

    const reasonInput = window.prompt(`${verb} reason (required):`, row.reason || '');
    if (!reasonInput || !reasonInput.trim()) {
      window.alert('A reason is required to continue.');
      return;
    }

    const response = await fetch(`/api/admin/billing/product-access/${row.id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: nextStatus, reason: reasonInput.trim() }),
    });

    const payload = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
    if (!response.ok || !payload.ok) {
      window.alert(payload.error || `Unable to ${verb.toLowerCase()} access.`);
      return;
    }

    setRefreshToken((previous) => previous + 1);
  };

  return (
    <AdminLayoutV2
      activePath="/admin/product-access"
      title="Product Access"
      subtitle="Access activation, suspension, and review states linked to paid Stripe billing events."
    >
      <section className="flex flex-wrap items-center gap-3">
        <button
          className="rounded-sm bg-[#1F3529] px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white disabled:opacity-60"
          onClick={syncFromStripe}
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
        <section className="rounded-lg border p-4" style={{ borderColor: '#FECACA', backgroundColor: '#FEF2F2', color: '#991B1B' }}>
          {error}
        </section>
      )}

      {isLoading ? (
        <section className="rounded-lg border p-6 text-sm" style={{ borderColor: adminColors.adminBorder, backgroundColor: adminColors.adminSurface, color: adminColors.adminMuted }}>
          Loading product access records...
        </section>
      ) : (
        <section>
          <AdminDataTable
            columns={[
              { key: 'organizationId', label: 'Organization', width: '180px' },
              { key: 'product', label: 'Product', width: '120px' },
              { key: 'plan', label: 'Plan', width: '220px' },
              { key: 'seatsUsed', label: 'Seats Used', width: '110px' },
              { key: 'seatsAllowed', label: 'Seats Allowed', width: '120px' },
              { key: 'status', label: 'Access Status', width: '140px' },
              { key: 'reason', label: 'Reason', width: '220px' },
              {
                key: 'id',
                label: 'Actions',
                width: '240px',
                render: (_value, row) => {
                  const record = row as ProductAccessRow;
                  const isSuspended = `${record.status}`.toLowerCase() === 'suspended';

                  return (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setAccessStatus(record, 'enabled')}
                        disabled={!isSuspended}
                        className="rounded-sm border border-[#2E7D32]/40 px-2.5 py-1 text-xs font-semibold text-[#2E7D32] disabled:opacity-40"
                      >
                        Enable
                      </button>
                      <button
                        onClick={() => setAccessStatus(record, 'suspended')}
                        disabled={isSuspended}
                        className="rounded-sm border border-[#991B1B]/40 px-2.5 py-1 text-xs font-semibold text-[#991B1B] disabled:opacity-40"
                      >
                        Suspend
                      </button>
                    </div>
                  );
                },
              },
            ]}
            data={items}
            keyExtractor={(item) => item.id}
            striped
          />
        </section>
      )}
    </AdminLayoutV2>
  );
}
