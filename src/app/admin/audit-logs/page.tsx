"use client";

import React, { useEffect, useMemo, useState } from 'react';
import AdminLayoutV2 from '@/app/components/admin/AdminLayoutV2';
import AdminDataTable from '@/app/components/admin/AdminDataTableV2';
import AdminStatusBadge from '@/app/components/admin/AdminStatusBadgeV2';
import { mockAuditEvents } from '@/data/mockAdminBilling';
import { adminColors } from '@/app/components/admin/adminDesignTokens';

type AuditStatus = 'Success' | 'Failed' | 'Pending';

type AuditEventRow = {
  id: string;
  timestamp: string;
  adminUser: string;
  action: string;
  entity?: string;
  entityId?: string;
  customer?: string;
  details: string;
  source?: string;
  status: AuditStatus;
};

const QUICK_FILTERS = [
  { key: 'all', label: 'All Events', match: () => true },
  { key: 'permissions', label: 'Permission Events', match: (event: AuditEventRow) => event.action.startsWith('admin_permission_') },
  { key: 'goal-events', label: 'Goal Events', match: (event: AuditEventRow) => event.action.startsWith('project_goal_') },
  { key: 'work-item-events', label: 'Work Item Events', match: (event: AuditEventRow) => event.action.startsWith('project_work_item_') },
];

export default function AdminAuditLogsPage() {
  const [events, setEvents] = useState<AuditEventRow[]>(mockAuditEvents);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAction, setSelectedAction] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'Success' | 'Failed' | 'Pending'>('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [activeQuickFilter, setActiveQuickFilter] = useState('all');

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const response = await fetch('/api/admin/audit-logs');
        if (!response.ok) return;
        const payload = (await response.json()) as { items?: AuditEventRow[] };
        if (isMounted && payload.items?.length) {
          setEvents(payload.items);
        }
      } catch {
        // Keep mock fallback if API is unavailable.
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const actionOptions = useMemo(() => {
    const uniqueActions = Array.from(new Set(events.map((event) => event.action))).sort();
    return uniqueActions;
  }, [events]);

  const filteredEvents = useMemo(() => {
    const quickFilter = QUICK_FILTERS.find((item) => item.key === activeQuickFilter) ?? QUICK_FILTERS[0];

    return events
      .filter((event) => quickFilter.match(event))
      .filter((event) => {
        if (selectedAction === 'all') return true;
        return event.action === selectedAction;
      })
      .filter((event) => {
        if (selectedStatus === 'all') return true;
        return event.status === selectedStatus;
      })
      .filter((event) => {
        if (!selectedDate) return true;
        const eventDate = event.timestamp.slice(0, 10);
        return eventDate === selectedDate;
      })
      .filter((event) => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return true;

        return (
          event.adminUser.toLowerCase().includes(query) ||
          event.action.toLowerCase().includes(query) ||
          (event.customer || '').toLowerCase().includes(query) ||
          event.details.toLowerCase().includes(query) ||
          (event.entity || '').toLowerCase().includes(query)
        );
      })
      .map((event) => ({
        ...event,
        statusBadge:
          event.status === 'Success'
            ? 'Active'
            : event.status === 'Failed'
              ? 'Failed'
              : 'Pending',
      }));
  }, [events, activeQuickFilter, selectedAction, selectedStatus, selectedDate, searchQuery]);

  const handleExport = () => {
    const headers = ['timestamp', 'adminUser', 'action', 'entity', 'entityId', 'customer', 'details', 'source', 'status'];
    const lines = filteredEvents.map((event) =>
      [
        event.timestamp,
        event.adminUser,
        event.action,
        event.entity || '',
        event.entityId || '',
        event.customer || '',
        event.details,
        event.source || 'Admin Console',
        event.status,
      ]
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(',')
    );

    const csvContent = [headers.join(','), ...lines].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `audit-log-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayoutV2
      activePath="/admin/audit-logs"
      title="Audit Log"
      subtitle="Track subscription, billing, payment, access, pricing, and admin-user actions."
    >
      <section>
        <div className="flex flex-wrap gap-2">
          {QUICK_FILTERS.map((quickFilter) => {
            const isActive = activeQuickFilter === quickFilter.key;
            return (
              <button
                key={quickFilter.key}
                onClick={() => setActiveQuickFilter(quickFilter.key)}
                className="rounded-md border px-3 py-1 text-xs font-medium"
                style={{
                  borderColor: isActive ? adminColors.lbyaGreen : adminColors.adminBorder,
                  color: isActive ? adminColors.lbyaGreen : adminColors.adminMuted,
                  backgroundColor: isActive ? adminColors.lbyaGreenSoft : adminColors.adminSurface,
                }}
              >
                {quickFilter.label}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="rounded-lg border px-4 py-2 text-sm outline-none transition-all"
            style={{ borderColor: adminColors.adminBorder, backgroundColor: adminColors.adminSurface, color: adminColors.adminText }}
            placeholder="Search by admin, action, customer, or details..."
          />
          <select
            value={selectedAction}
            onChange={(event) => setSelectedAction(event.target.value)}
            className="rounded-lg border px-4 py-2 text-sm outline-none transition-all"
            style={{ borderColor: adminColors.adminBorder, backgroundColor: adminColors.adminSurface, color: adminColors.adminText }}
          >
            <option value="all">All actions</option>
            {actionOptions.map((action) => (
              <option key={action} value={action}>
                {action}
              </option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(event) => setSelectedStatus(event.target.value as 'all' | 'Success' | 'Failed' | 'Pending')}
            className="rounded-lg border px-4 py-2 text-sm outline-none transition-all"
            style={{ borderColor: adminColors.adminBorder, backgroundColor: adminColors.adminSurface, color: adminColors.adminText }}
          >
            <option value="all">All statuses</option>
            <option value="Success">Success</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
          <input
            type="date"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
            className="rounded-lg border px-4 py-2 text-sm outline-none transition-all"
            style={{ borderColor: adminColors.adminBorder, backgroundColor: adminColors.adminSurface, color: adminColors.adminText }}
          />
          <button
            className="rounded-lg px-4 py-2 text-sm font-medium text-white"
            style={{ backgroundColor: adminColors.lbyaGreen }}
            onClick={handleExport}
          >
            Export
          </button>
        </div>
      </section>
      <section>
        <AdminDataTable
          columns={[
            { key: 'timestamp' as const, label: 'Date/Time', width: '160px' },
            { key: 'adminUser' as const, label: 'Admin User', width: '140px' },
            { key: 'action' as const, label: 'Action', width: '160px' },
            { key: 'customer' as const, label: 'Customer', width: '160px' },
            { key: 'details' as const, label: 'Details', width: '240px' },
            {
              key: 'statusBadge' as const,
              label: 'Status',
              render: (value: string) => <AdminStatusBadge status={value as any} size="sm" />,
              width: '100px',
            },
          ]}
          data={filteredEvents as any}
          keyExtractor={(_item, index) => `audit-log-${index}`}
          striped
        />
      </section>
    </AdminLayoutV2>
  );
}
