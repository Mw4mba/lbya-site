import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAdminGuard } from '../../_lib/guard';
import { isDashboardPermission } from '@/lib/adminPermissions';
import { logAdminAuditEvent } from '@/lib/adminAudit';

export const PATCH = withAdminGuard(async (request, session) => {
  const segments = request.nextUrl.pathname.split('/');
  const id = segments[segments.length - 1];

  if (!id) {
    return NextResponse.json({ error: 'Missing permission id' }, { status: 400 });
  }

  const body = (await request.json().catch(() => null)) as
    | {
        permissionLevel?: string;
        status?: 'Active' | 'Suspended';
        deepWorkReminderProfile?: string;
      }
    | null;

  if (!body) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const updateData: { permissionLevel?: string; status?: string; deepWorkReminderProfile?: string | null } = {};

  if (body.permissionLevel !== undefined) {
    if (!isDashboardPermission(body.permissionLevel)) {
      return NextResponse.json({ error: 'Invalid permission level' }, { status: 400 });
    }
    updateData.permissionLevel = body.permissionLevel;
  }

  if (body.status !== undefined) {
    if (body.status !== 'Active' && body.status !== 'Suspended') {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }
    updateData.status = body.status;
  }

  if (body.deepWorkReminderProfile !== undefined) {
    const profile = body.deepWorkReminderProfile.trim();
    updateData.deepWorkReminderProfile = profile.length > 0 ? profile : null;
  }

  const updated = await prisma.adminPermission.update({
    where: { id },
    data: updateData,
  });

  await logAdminAuditEvent({
    adminUser: session.email,
    action: 'admin_permission_updated',
    entity: 'AdminPermission',
    entityId: updated.id,
    customer: updated.email,
    details: `Updated permission to ${updated.permissionLevel} and status ${updated.status}`,
  });

  return NextResponse.json({
    item: {
      id: updated.id,
      name: updated.name,
      email: updated.email,
      permissionLevel: updated.permissionLevel,
      status: updated.status,
      invitedDate: updated.invitedDate.toISOString().slice(0, 10),
      lastActive: updated.lastActive ? updated.lastActive.toISOString().slice(0, 10) : 'Never',
      deepWorkReminderProfile: updated.deepWorkReminderProfile,
    },
  });
});

export const DELETE = withAdminGuard(async (request, session) => {
  const segments = request.nextUrl.pathname.split('/');
  const id = segments[segments.length - 1];

  if (!id) {
    return NextResponse.json({ error: 'Missing permission id' }, { status: 400 });
  }

  const deleted = await prisma.adminPermission.delete({ where: { id } });

  await logAdminAuditEvent({
    adminUser: session.email,
    action: 'admin_permission_deleted',
    entity: 'AdminPermission',
    entityId: deleted.id,
    customer: deleted.email,
    details: 'Admin permission record removed',
  });

  return NextResponse.json({ ok: true });
});
