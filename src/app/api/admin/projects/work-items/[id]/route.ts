import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAdminGuard } from '../../../_lib/guard';
import { logAdminAuditEvent } from '@/lib/adminAudit';

const VALID_STATUSES = ['Backlog', 'Planned', 'In progress', 'Review', 'Done'];
const VALID_PRIORITIES = ['Low', 'Medium', 'High'];

function hasProjectWorkItemDelegate(): boolean {
  return typeof (prisma as unknown as { projectWorkItem?: object }).projectWorkItem !== 'undefined';
}

export const PATCH = withAdminGuard(async (request, session) => {
  if (!hasProjectWorkItemDelegate()) {
    return NextResponse.json({ error: 'Project work item persistence is unavailable' }, { status: 503 });
  }

  const segments = request.nextUrl.pathname.split('/');
  const id = segments[segments.length - 1];

  if (!id) {
    return NextResponse.json({ error: 'Missing work item id' }, { status: 400 });
  }

  const body = (await request.json().catch(() => null)) as
    | {
        project?: string;
        title?: string;
        owner?: string;
        dueDate?: string;
        effort?: number;
        priority?: string;
        status?: string;
        rank?: number;
      }
    | null;

  if (!body) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const data: {
    project?: string;
    title?: string;
    owner?: string;
    dueDate?: Date;
    effort?: number;
    priority?: string;
    status?: string;
    rank?: number;
  } = {};

  if (body.project !== undefined) data.project = body.project.trim();
  if (body.title !== undefined) data.title = body.title.trim();
  if (body.owner !== undefined) data.owner = body.owner.trim();
  if (body.dueDate !== undefined) data.dueDate = new Date(body.dueDate);
  if (body.effort !== undefined) data.effort = Math.max(1, Number(body.effort));
  if (body.rank !== undefined) data.rank = Number(body.rank);

  if (body.priority !== undefined) {
    if (!VALID_PRIORITIES.includes(body.priority)) {
      return NextResponse.json({ error: 'Invalid priority' }, { status: 400 });
    }
    data.priority = body.priority;
  }

  if (body.status !== undefined) {
    if (!VALID_STATUSES.includes(body.status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }
    data.status = body.status;
  }

  let updated;
  try {
    updated = await prisma.projectWorkItem.update({
      where: { id },
      data,
    });
  } catch {
    return NextResponse.json({ error: 'Project work item persistence is unavailable' }, { status: 503 });
  }

  await logAdminAuditEvent({
    adminUser: session.email,
    action: 'project_work_item_updated',
    entity: 'ProjectWorkItem',
    entityId: updated.id,
    customer: updated.project,
    details: `Work item "${updated.title}" updated (status: ${updated.status})`,
  });

  return NextResponse.json({
    item: {
      id: updated.id,
      project: updated.project,
      title: updated.title,
      owner: updated.owner,
      dueDate: updated.dueDate.toISOString().slice(0, 10),
      effort: updated.effort,
      priority: updated.priority,
      status: updated.status,
      rank: updated.rank,
    },
  });
});

export const DELETE = withAdminGuard(async (request, session) => {
  if (!hasProjectWorkItemDelegate()) {
    return NextResponse.json({ error: 'Project work item persistence is unavailable' }, { status: 503 });
  }

  const segments = request.nextUrl.pathname.split('/');
  const id = segments[segments.length - 1];

  if (!id) {
    return NextResponse.json({ error: 'Missing work item id' }, { status: 400 });
  }

  let deleted;
  try {
    deleted = await prisma.projectWorkItem.delete({ where: { id } });
  } catch {
    return NextResponse.json({ error: 'Project work item persistence is unavailable' }, { status: 503 });
  }

  await logAdminAuditEvent({
    adminUser: session.email,
    action: 'project_work_item_deleted',
    entity: 'ProjectWorkItem',
    entityId: deleted.id,
    customer: deleted.project,
    details: `Work item "${deleted.title}" deleted`,
  });

  return NextResponse.json({ ok: true });
});
