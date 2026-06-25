"use client";

import React, { useEffect, useMemo, useState } from 'react';
import AdminLayoutV2 from '@/app/components/admin/AdminLayoutV2';
import AdminDataTable from '@/app/components/admin/AdminDataTableV2';
import AdminStatusBadge from '@/app/components/admin/AdminStatusBadgeV2';
import { adminColors } from '@/app/components/admin/adminDesignTokens';
import { mockAdminUsers } from '@/data/mockAdminBilling';
import {
  DASHBOARD_PERMISSION_OPTIONS,
  mapAdminRoleToDashboardPermission,
  type DashboardPermission,
} from '@/lib/adminPermissions';

const mockAccessRecords = [
  { id: '1', customer: 'Jaridafrica Ltd', product: 'MCT', plan: 'Professional', workspace: 'Main', accessStatus: 'Enabled', billingStatus: 'Paid', seats: '58', lastAccess: '2026-06-23' },
  { id: '2', customer: 'NordBuild AB', product: 'NBC', plan: 'Professional', workspace: 'Main', accessStatus: 'Trial Access', billingStatus: 'Pending', seats: '16', lastAccess: '2026-06-20' },
  { id: '3', customer: 'ConstructFlow Inc', product: 'NBC', plan: 'Enterprise', workspace: 'Main', accessStatus: 'Enabled', billingStatus: 'Paid', seats: '32', lastAccess: '2026-06-22' },
];

type ManagedAdminUser = {
  id: string;
  name: string;
  email: string;
  permissionLevel: DashboardPermission;
  status: 'Active' | 'Suspended';
  invitedDate: string;
  lastActive: string;
  deepWorkReminderProfile?: string;
};

const permissionOptions: DashboardPermission[] = DASHBOARD_PERMISSION_OPTIONS;

const defaultDeepWorkReminderProfile = [
  'Power Break Reminder - Deep Engineering Work Mode',
  '',
  'Purpose:',
  'Help engineers maintain focus during long technical work sessions without interrupting deep concentration too often.',
  '',
  'Mode: Deep Engineering Work',
  '',
  'Default cycle:',
  '- Focus time: 90 minutes',
  '- Power break: 10 minutes',
  '- Optional snooze: 10 minutes',
  '- Maximum snoozes: 2',
  '- After 2 snoozes, show a stronger but still respectful reminder',
  '',
  'Login behavior:',
  'When the user logs in, start a 90-minute countdown automatically.',
  '',
  'Reminder message after 90 minutes:',
  '"You have been in deep focus for 90 minutes. Take a 10-minute power break to reset your mind, eyes, and posture."',
  '',
  'Reminder options:',
  '1. Start 10-minute break',
  '2. Snooze for 10 minutes',
  '3. Skip once',
  '4. Switch to Balanced Mode',
  '',
  'Break screen:',
  'Show a 10-minute countdown timer with simple interactive break suggestions.',
  '',
  'Break suggestions:',
  '- Stand up and walk for 2 minutes',
  '- Drink water',
  '- Stretch neck, shoulders, and back',
  '- Look away from the screen',
  '- Take 5 slow breaths',
  '- Avoid checking social media during the break',
  '',
  'End of break message:',
  '"Break complete. Your mind is reset. Ready to return to deep engineering work?"',
  '',
  'Rules:',
  '- Do not interrupt the user before the 90-minute focus period ends.',
  '- Keep notifications calm and non-intrusive.',
  '- Allow the user to snooze, but discourage repeated skipping.',
  '- The reminder should support productivity, not feel like surveillance.',
  '- Track only break status and timer state, not personal productivity or keystrokes.',
  '',
  'Suggested timer states:',
  '- idle',
  '- focus_running',
  '- break_reminder_visible',
  '- break_running',
  '- break_complete',
  '- snoozed',
  '- skipped',
  '',
  'Default settings:',
  'focusDurationMinutes = 90',
  'breakDurationMinutes = 10',
  'snoozeDurationMinutes = 10',
  'maxSnoozes = 2',
  'modeName = "Deep Engineering Work"',
].join('\n');

function formatToday(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function AdminAccessPage() {
  const [users, setUsers] = useState<ManagedAdminUser[]>(
    mockAdminUsers.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      permissionLevel:
        user.role === 'Owner'
          ? 'Full Access'
          : user.role === 'Finance Admin'
            ? 'Billing Admin'
            : user.role === 'Support Admin'
              ? 'Support Access'
              : 'Read Only',
      status: 'Active',
      invitedDate: user.invitedDate,
      lastActive: user.lastActive,
    }))
  );

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [permissionLevel, setPermissionLevel] = useState<DashboardPermission>('Read Only');
  const [deepWorkReminderProfile, setDeepWorkReminderProfile] = useState(defaultDeepWorkReminderProfile);
  const [searchUser, setSearchUser] = useState('');
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/admin/permissions', { method: 'GET' });
        if (!response.ok) {
          throw new Error('Failed to load admin permissions');
        }
        const payload = (await response.json()) as { items: ManagedAdminUser[] };
        if (isMounted && payload.items.length > 0) {
          setUsers(payload.items);
        }
      } catch {
        // Keep mock fallback data if API is unavailable.
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredUsers = useMemo(() => {
    const query = searchUser.trim().toLowerCase();
    if (!query) return users;
    return users.filter((user) =>
      user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)
    );
  }, [users, searchUser]);

  const handleCreateUser = async () => {
    const name = userName.trim();
    const email = userEmail.trim().toLowerCase();

    if (!name || !email) {
      setFormError('Name and email are required.');
      return;
    }

    if (!email.includes('@')) {
      setFormError('Please provide a valid email address.');
      return;
    }

    if (users.some((user) => user.email.toLowerCase() === email)) {
      setFormError('This user already exists.');
      return;
    }

    try {
      const response = await fetch('/api/admin/permissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          permissionLevel,
          deepWorkReminderProfile,
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        setFormError(data.error || 'Unable to create user.');
        return;
      }

      const payload = (await response.json()) as { item: ManagedAdminUser };
      setUsers((prev) => [payload.item, ...prev.filter((u) => u.email !== payload.item.email)]);
      setUserName('');
      setUserEmail('');
      setPermissionLevel('Read Only');
      setDeepWorkReminderProfile(defaultDeepWorkReminderProfile);
      setFormError('');
    } catch {
      const today = formatToday();
      const nextUser: ManagedAdminUser = {
        id: `admin_local_${Date.now()}`,
        name,
        email,
        permissionLevel,
        status: 'Active',
        invitedDate: today,
        lastActive: 'Never',
        deepWorkReminderProfile,
      };
      setUsers((prev) => [nextUser, ...prev]);
      setUserName('');
      setUserEmail('');
      setPermissionLevel('Read Only');
      setDeepWorkReminderProfile(defaultDeepWorkReminderProfile);
      setFormError('');
    }
  };

  const handlePermissionUpdate = async (id: string, level: DashboardPermission) => {
    const previous = users;
    setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, permissionLevel: level } : user)));

    if (!id.startsWith('admin_local_')) {
      try {
        const response = await fetch(`/api/admin/permissions/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ permissionLevel: level }),
        });

        if (!response.ok) {
          setUsers(previous);
        }
      } catch {
        setUsers(previous);
      }
    }
  };

  const handleStatusToggle = async (id: string) => {
    const target = users.find((user) => user.id === id);
    if (!target) return;

    const nextStatus = target.status === 'Active' ? 'Suspended' : 'Active';
    const previous = users;

    setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, status: nextStatus } : user)));

    if (!id.startsWith('admin_local_')) {
      try {
        const response = await fetch(`/api/admin/permissions/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: nextStatus }),
        });

        if (!response.ok) {
          setUsers(previous);
        }
      } catch {
        setUsers(previous);
      }
    }
  };

  const handleRemoveUser = async (id: string) => {
    const previous = users;
    setUsers((prev) => prev.filter((user) => user.id !== id));

    if (!id.startsWith('admin_local_')) {
      try {
        const response = await fetch(`/api/admin/permissions/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          setUsers(previous);
        }
      } catch {
        setUsers(previous);
      }
    }
  };

  return (
    <AdminLayoutV2
      activePath="/admin/access"
      title="Product Access"
      subtitle="Control which customers can access NBC, MCT, enterprise modules, add-ons, workspaces, and secure product environments."
    >
      <section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <input 
            className="rounded-lg border px-4 py-2 text-sm outline-none transition-all"
            style={{ borderColor: adminColors.adminBorder, backgroundColor: adminColors.adminSurface, color: adminColors.adminText }}
            placeholder="Search customer..." 
          />
          <select className="rounded-lg border px-4 py-2 text-sm outline-none transition-all"
            style={{ borderColor: adminColors.adminBorder, backgroundColor: adminColors.adminSurface, color: adminColors.adminText }}>
            <option>All products</option>
            <option>NBC</option>
            <option>MCT</option>
          </select>
          <select className="rounded-lg border px-4 py-2 text-sm outline-none transition-all"
            style={{ borderColor: adminColors.adminBorder, backgroundColor: adminColors.adminSurface, color: adminColors.adminText }}>
            <option>All access statuses</option>
            <option>Enabled</option>
            <option>Trial Access</option>
            <option>Suspended</option>
          </select>
        </div>
      </section>
      <section>
        <AdminDataTable
          columns={[
            { key: 'customer' as const, label: 'Customer', width: '160px' },
            { key: 'product' as const, label: 'Product', width: '80px' },
            { key: 'plan' as const, label: 'Plan', width: '120px' },
            { key: 'workspace' as const, label: 'Workspace', width: '100px' },
            { key: 'seats' as const, label: 'Seats', width: '80px' },
            { key: 'accessStatus' as const, label: 'Access', render: (value: string) => <AdminStatusBadge status={value as any} size="sm" />, width: '120px' },
            { key: 'billingStatus' as const, label: 'Billing', render: (value: string) => <AdminStatusBadge status={value as any} size="sm" />, width: '100px' },
          ]}
          data={mockAccessRecords}
          keyExtractor={(item) => item.id}
          striped
        />
      </section>

      <section>
        <div className="mb-6">
          <h2 className="text-xl font-semibold" style={{ color: adminColors.adminText }}>
            Admin Users & Permission Levels
          </h2>
          <p className="mt-1 text-sm" style={{ color: adminColors.adminMuted }}>
            Create dashboard users and set access levels for operations, billing, and support.
          </p>
          {loading ? (
            <p className="mt-2 text-xs" style={{ color: adminColors.adminSubtle }}>
              Syncing admin permission records...
            </p>
          ) : null}
        </div>

        <div
          className="rounded-lg border p-4"
          style={{
            borderColor: adminColors.adminBorder,
            backgroundColor: adminColors.adminSurface,
          }}
        >
          <div className="grid gap-3 md:grid-cols-4">
            <input
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
              className="rounded-lg border px-4 py-2 text-sm outline-none transition-all"
              style={{ borderColor: adminColors.adminBorder, backgroundColor: '#fff', color: adminColors.adminText }}
              placeholder="Full name"
            />
            <input
              value={userEmail}
              onChange={(event) => setUserEmail(event.target.value)}
              className="rounded-lg border px-4 py-2 text-sm outline-none transition-all"
              style={{ borderColor: adminColors.adminBorder, backgroundColor: '#fff', color: adminColors.adminText }}
              placeholder="email@company.com"
            />
            <select
              value={permissionLevel}
              onChange={(event) => setPermissionLevel(event.target.value as DashboardPermission)}
              className="rounded-lg border px-4 py-2 text-sm outline-none transition-all"
              style={{ borderColor: adminColors.adminBorder, backgroundColor: '#fff', color: adminColors.adminText }}
            >
              {permissionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button
              onClick={handleCreateUser}
              className="rounded-lg px-4 py-2 text-sm font-medium text-white"
              style={{ backgroundColor: adminColors.lbyaGreen }}
            >
              Create User
            </button>

            <div className="md:col-span-4">
              <label
                className="mb-2 block text-xs font-semibold uppercase tracking-wide"
                style={{ color: adminColors.adminMuted }}
              >
                Deep Engineering Work Reminder Profile
              </label>
              <textarea
                value={deepWorkReminderProfile}
                onChange={(event) => setDeepWorkReminderProfile(event.target.value)}
                className="min-h-[280px] w-full rounded-lg border px-4 py-3 text-sm outline-none transition-all"
                style={{ borderColor: adminColors.adminBorder, backgroundColor: '#fff', color: adminColors.adminText }}
                aria-label="Deep Engineering Work reminder profile"
              />
              <p className="mt-2 text-xs" style={{ color: adminColors.adminMuted }}>
                Stored as the default reminder policy template for this admin user.
              </p>
            </div>
          </div>

          {formError ? (
            <p className="mt-3 text-sm" style={{ color: '#B91C1C' }}>
              {formError}
            </p>
          ) : null}
        </div>
      </section>

      <section>
        <div className="mb-4 grid gap-3 md:grid-cols-3">
          <input
            value={searchUser}
            onChange={(event) => setSearchUser(event.target.value)}
            className="rounded-lg border px-4 py-2 text-sm outline-none transition-all"
            style={{ borderColor: adminColors.adminBorder, backgroundColor: adminColors.adminSurface, color: adminColors.adminText }}
            placeholder="Search admin user by name or email..."
          />
        </div>

        <AdminDataTable
          columns={[
            { key: 'name' as const, label: 'Name', width: '160px' },
            { key: 'email' as const, label: 'Email', width: '220px' },
            {
              key: 'permissionLevel' as const,
              label: 'Permission Level',
              width: '180px',
              render: (value: DashboardPermission, row: ManagedAdminUser) => (
                <select
                  value={value}
                  onChange={(event) => handlePermissionUpdate(row.id, event.target.value as DashboardPermission)}
                  className="rounded-md border px-2 py-1 text-xs outline-none"
                  style={{ borderColor: adminColors.adminBorder, color: adminColors.adminText }}
                >
                  {permissionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ),
            },
            {
              key: 'status' as const,
              label: 'Status',
              width: '120px',
              render: (value: string) => <AdminStatusBadge status={value as any} size="sm" />,
            },
            { key: 'lastActive' as const, label: 'Last Active', width: '120px' },
            {
              key: 'id' as const,
              label: 'Actions',
              width: '180px',
              render: (_value: string, row: ManagedAdminUser) => (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusToggle(row.id)}
                    className="rounded-md border px-2 py-1 text-xs"
                    style={{ borderColor: adminColors.adminBorder, color: adminColors.adminText }}
                  >
                    {row.status === 'Active' ? 'Suspend' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleRemoveUser(row.id)}
                    className="rounded-md border px-2 py-1 text-xs"
                    style={{ borderColor: '#FCA5A5', color: '#B91C1C' }}
                  >
                    Remove
                  </button>
                </div>
              ),
            },
          ]}
          data={filteredUsers}
          keyExtractor={(item) => item.id}
          striped
        />
      </section>
    </AdminLayoutV2>
  );
}
