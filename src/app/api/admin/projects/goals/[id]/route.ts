import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAdminGuard } from '../../../_lib/guard';
import { logAdminAuditEvent } from '@/lib/adminAudit';

const VALID_GOAL_STATUSES = ['Planned', 'In progress', 'At risk', 'Completed'];

function hasProjectGoalDelegate(): boolean {
  return typeof (prisma as unknown as { projectGoal?: object }).projectGoal !== 'undefined';
}

export const PATCH = withAdminGuard(async (request, session) => {
  if (!hasProjectGoalDelegate()) {
    return NextResponse.json({ error: 'Project goals persistence is unavailable' }, { status: 503 });
  }

  const segments = request.nextUrl.pathname.split('/');
  const id = segments[segments.length - 1];

  if (!id) {
    return NextResponse.json({ error: 'Missing goal id' }, { status: 400 });
  }

  const body = (await request.json().catch(() => null)) as
    | {
        title?: string;
        owner?: string;
        targetDate?: string;
        progress?: number;
        status?: string;
      }
    | null;

  if (!body) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const data: {
    title?: string;
    owner?: string;
    targetDate?: Date;
    progress?: number;
    status?: string;
  } = {};

  if (body.title !== undefined) data.title = body.title.trim();
  if (body.owner !== undefined) data.owner = body.owner.trim();
  if (body.targetDate !== undefined) data.targetDate = new Date(body.targetDate);
  if (body.progress !== undefined) data.progress = Math.min(100, Math.max(0, Number(body.progress)));
  if (body.status !== undefined) {
    if (!VALID_GOAL_STATUSES.includes(body.status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }
    data.status = body.status;
  }

  let updated;
  try {
    updated = await prisma.projectGoal.update({
      where: { id },
      data,
    });
  } catch {
    return NextResponse.json({ error: 'Project goals persistence is unavailable' }, { status: 503 });
  }

  await logAdminAuditEvent({
    adminUser: session.email,
    action: 'project_goal_updated',
    entity: 'ProjectGoal',
    entityId: updated.id,
    customer: updated.owner,
    details: `Goal "${updated.title}" updated`,
  });

  return NextResponse.json({
    item: {
      id: updated.id,
      title: updated.title,
      owner: updated.owner,
      targetDate: updated.targetDate.toISOString().slice(0, 10),
      progress: updated.progress,
      status: updated.status,
    },
  });
});

export const DELETE = withAdminGuard(async (request, session) => {
  if (!hasProjectGoalDelegate()) {
    return NextResponse.json({ error: 'Project goals persistence is unavailable' }, { status: 503 });
  }

  const segments = request.nextUrl.pathname.split('/');
  const id = segments[segments.length - 1];

  if (!id) {
    return NextResponse.json({ error: 'Missing goal id' }, { status: 400 });
  }

  let deleted;
  try {
    deleted = await prisma.projectGoal.delete({ where: { id } });
  } catch {
    return NextResponse.json({ error: 'Project goals persistence is unavailable' }, { status: 503 });
  }

  await logAdminAuditEvent({
    adminUser: session.email,
    action: 'project_goal_deleted',
    entity: 'ProjectGoal',
    entityId: deleted.id,
    customer: deleted.owner,
    details: `Goal "${deleted.title}" deleted`,
  });

  return NextResponse.json({ ok: true });
});
