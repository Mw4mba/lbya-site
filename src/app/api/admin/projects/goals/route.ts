import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAdminGuard } from '../../_lib/guard';
import { logAdminAuditEvent } from '@/lib/adminAudit';

const VALID_GOAL_STATUSES = ['Planned', 'In progress', 'At risk', 'Completed'];

function hasProjectGoalDelegate(): boolean {
  return typeof (prisma as unknown as { projectGoal?: object }).projectGoal !== 'undefined';
}

export const GET = withAdminGuard(async () => {
  if (!hasProjectGoalDelegate()) {
    return NextResponse.json({ items: [] });
  }

  let goals: Awaited<ReturnType<typeof prisma.projectGoal.findMany>> = [];
  try {
    goals = await prisma.projectGoal.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch {
    return NextResponse.json({ items: [] });
  }

  return NextResponse.json({
    items: goals.map((goal) => ({
      id: goal.id,
      title: goal.title,
      owner: goal.owner,
      targetDate: goal.targetDate.toISOString().slice(0, 10),
      progress: goal.progress,
      status: goal.status,
    })),
  });
});

export const POST = withAdminGuard(async (request, session) => {
  if (!hasProjectGoalDelegate()) {
    return NextResponse.json({ error: 'Project goals persistence is unavailable' }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as
    | {
        title?: string;
        owner?: string;
        targetDate?: string;
      }
    | null;

  if (!body) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const title = body.title?.trim();
  const owner = body.owner?.trim();
  const targetDate = body.targetDate?.trim();

  if (!title || !owner || !targetDate) {
    return NextResponse.json({ error: 'Title, owner, and target date are required' }, { status: 400 });
  }

  let created;
  try {
    created = await prisma.projectGoal.create({
      data: {
        title,
        owner,
        targetDate: new Date(targetDate),
        progress: 0,
        status: 'Planned',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Project goals persistence is unavailable' }, { status: 503 });
  }

  await logAdminAuditEvent({
    adminUser: session.email,
    action: 'project_goal_created',
    entity: 'ProjectGoal',
    entityId: created.id,
    customer: created.owner,
    details: `Goal "${created.title}" created`,
  });

  return NextResponse.json({
    item: {
      id: created.id,
      title: created.title,
      owner: created.owner,
      targetDate: created.targetDate.toISOString().slice(0, 10),
      progress: created.progress,
      status: created.status,
    },
  });
});
