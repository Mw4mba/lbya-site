import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAdminGuard } from '../../_lib/guard';
import { logAdminAuditEvent } from '@/lib/adminAudit';

const VALID_STATUSES = ['Backlog', 'Planned', 'In progress', 'Review', 'Done'];
const VALID_PRIORITIES = ['Low', 'Medium', 'High'];

function hasProjectWorkItemDelegate(): boolean {
  return typeof (prisma as unknown as { projectWorkItem?: object }).projectWorkItem !== 'undefined';
}

export const GET = withAdminGuard(async () => {
  if (!hasProjectWorkItemDelegate()) {
    return NextResponse.json({ items: [] });
  }

  let items: Awaited<ReturnType<typeof prisma.projectWorkItem.findMany>> = [];
  try {
    items = await prisma.projectWorkItem.findMany({
      orderBy: [{ rank: 'asc' }, { createdAt: 'asc' }],
    });
  } catch {
    return NextResponse.json({ items: [] });
  }

  return NextResponse.json({
    items: items.map((item) => ({
      id: item.id,
      project: item.project,
      title: item.title,
      owner: item.owner,
      dueDate: item.dueDate.toISOString().slice(0, 10),
      effort: item.effort,
      priority: item.priority,
      status: item.status,
      rank: item.rank,
    })),
  });
});

export const POST = withAdminGuard(async (request, session) => {
  if (!hasProjectWorkItemDelegate()) {
    return NextResponse.json({ error: 'Project work item persistence is unavailable' }, { status: 503 });
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
      }
    | null;

  if (!body) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const project = body.project?.trim();
  const title = body.title?.trim();
  const owner = body.owner?.trim();
  const dueDate = body.dueDate?.trim();
  const effort = Number(body.effort ?? 0);
  const priority = body.priority?.trim();
  const status = body.status?.trim();

  if (!project || !title || !owner || !dueDate || !priority || !status) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  if (!VALID_PRIORITIES.includes(priority) || !VALID_STATUSES.includes(status) || effort <= 0) {
    return NextResponse.json({ error: 'Invalid payload values' }, { status: 400 });
  }

  let created;
  try {
    const maxRank = await prisma.projectWorkItem.aggregate({
      _max: { rank: true },
    });

    created = await prisma.projectWorkItem.create({
      data: {
        project,
        title,
        owner,
        dueDate: new Date(dueDate),
        effort,
        priority,
        status,
        rank: (maxRank._max.rank ?? 0) + 1,
      },
    });
  } catch {
    return NextResponse.json({ error: 'Project work item persistence is unavailable' }, { status: 503 });
  }

  await logAdminAuditEvent({
    adminUser: session.email,
    action: 'project_work_item_created',
    entity: 'ProjectWorkItem',
    entityId: created.id,
    customer: created.project,
    details: `Work item "${created.title}" created in ${created.status}`,
  });

  return NextResponse.json({
    item: {
      id: created.id,
      project: created.project,
      title: created.title,
      owner: created.owner,
      dueDate: created.dueDate.toISOString().slice(0, 10),
      effort: created.effort,
      priority: created.priority,
      status: created.status,
      rank: created.rank,
    },
  });
});
