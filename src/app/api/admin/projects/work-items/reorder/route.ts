import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAdminGuard } from '../../../_lib/guard';
import { logAdminAuditEvent } from '@/lib/adminAudit';

function hasProjectWorkItemDelegate(): boolean {
  return typeof (prisma as unknown as { projectWorkItem?: object }).projectWorkItem !== 'undefined';
}

export const PATCH = withAdminGuard(async (request, session) => {
  if (!hasProjectWorkItemDelegate()) {
    return NextResponse.json({ error: 'Project work item persistence is unavailable' }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as
    | {
        order?: Array<{ id: string; rank: number; status?: string }>;
      }
    | null;

  if (!body || !Array.isArray(body.order)) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  try {
    await prisma.$transaction(
      body.order.map((entry) =>
        prisma.projectWorkItem.update({
          where: { id: entry.id },
          data: {
            rank: entry.rank,
            ...(entry.status ? { status: entry.status } : {}),
          },
        })
      )
    );
  } catch {
    return NextResponse.json({ error: 'Project work item persistence is unavailable' }, { status: 503 });
  }

  await logAdminAuditEvent({
    adminUser: session.email,
    action: 'project_work_items_reordered',
    entity: 'ProjectWorkItem',
    entityId: 'batch',
    details: `Reordered ${body.order.length} work items`,
  });

  return NextResponse.json({ ok: true });
});
