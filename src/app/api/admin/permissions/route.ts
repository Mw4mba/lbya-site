import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAdminGuard } from '../_lib/guard';
import { isDashboardPermission, type DashboardPermission } from '@/lib/adminPermissions';
import { logAdminAuditEvent } from '@/lib/adminAudit';

function normalizeDate(value: Date | null): string {
  if (!value) {
    return 'Never';
  }
  return value.toISOString().slice(0, 10);
}

function hasAdminPermissionDelegate(): boolean {
  return typeof (prisma as unknown as { adminPermission?: object }).adminPermission !== 'undefined';
}

export const GET = withAdminGuard(async () => {
  if (!hasAdminPermissionDelegate()) {
    return NextResponse.json({ items: [] });
  }

  let rows: Awaited<ReturnType<typeof prisma.adminPermission.findMany>> = [];
  try {
    rows = await prisma.adminPermission.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch {
    return NextResponse.json({ items: [] });
  }

  return NextResponse.json({
    items: rows.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      permissionLevel: row.permissionLevel,
      status: row.status,
      invitedDate: row.invitedDate.toISOString().slice(0, 10),
      lastActive: normalizeDate(row.lastActive),
      deepWorkReminderProfile: row.deepWorkReminderProfile,
    })),
  });
});

export const POST = withAdminGuard(async (request, session) => {
  if (!hasAdminPermissionDelegate()) {
    return NextResponse.json({ error: 'Admin permissions persistence is unavailable' }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as
    | {
        name?: string;
        email?: string;
        permissionLevel?: string;
        deepWorkReminderProfile?: string;
      }
    | null;

  if (!body) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim().toLowerCase();
  const permissionLevel = body.permissionLevel?.trim();
  const deepWorkReminderProfile = body.deepWorkReminderProfile?.trim();

  if (!name || !email || !permissionLevel) {
    return NextResponse.json({ error: 'Name, email, and permission level are required' }, { status: 400 });
  }

  if (!isDashboardPermission(permissionLevel)) {
    return NextResponse.json({ error: 'Invalid permission level' }, { status: 400 });
  }

  let created;
  try {
    created = await prisma.adminPermission.upsert({
      where: { email },
      update: {
        name,
        permissionLevel,
        status: 'Active',
        deepWorkReminderProfile,
      },
      create: {
        name,
        email,
        permissionLevel,
        status: 'Active',
        deepWorkReminderProfile,
      },
    });
  } catch {
    return NextResponse.json({ error: 'Admin permissions persistence is unavailable' }, { status: 503 });
  }

  await logAdminAuditEvent({
    adminUser: session.email,
    action: 'admin_permission_upserted',
    entity: 'AdminPermission',
    entityId: created.id,
    customer: created.email,
    details: `Permission set to ${created.permissionLevel} (${created.status})`,
  });

  return NextResponse.json({
    item: {
      id: created.id,
      name: created.name,
      email: created.email,
      permissionLevel: created.permissionLevel as DashboardPermission,
      status: created.status,
      invitedDate: created.invitedDate.toISOString().slice(0, 10),
      lastActive: normalizeDate(created.lastActive),
      deepWorkReminderProfile: created.deepWorkReminderProfile,
    },
  });
});
