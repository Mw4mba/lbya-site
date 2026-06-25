import { NextResponse } from 'next/server';
import { withAdminGuard } from '@/app/api/admin/_lib/guard';
import { getApplicationDetailById, updateApplicationRequest } from '@/lib/applications/store';
import {
  APPLICATION_PRIORITIES,
  APPLICATION_STATUSES,
  type ApplicationPriority,
  type ApplicationStatus,
} from '@/lib/applications/types';

function readApplicationId(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);
  const idx = parts.findIndex((part) => part === 'applications');
  return idx >= 0 ? parts[idx + 1] || '' : '';
}

export const GET = withAdminGuard(async (request) => {
  const applicationId = readApplicationId(request.nextUrl.pathname);
  if (!applicationId) {
    return NextResponse.json({ error: 'Missing application id' }, { status: 400 });
  }

  const detail = await getApplicationDetailById(applicationId);
  if (!detail) {
    return NextResponse.json({ error: 'Application not found' }, { status: 404 });
  }

  return NextResponse.json(detail);
});

export const PATCH = withAdminGuard(async (request, session) => {
  const applicationId = readApplicationId(request.nextUrl.pathname);
  if (!applicationId) {
    return NextResponse.json({ error: 'Missing application id' }, { status: 400 });
  }

  const payload = (await request.json().catch(() => null)) as
    | {
        status?: string;
        priority?: string;
        assignedToUserId?: string | null;
        tagsJson?: unknown;
        internalNotesJson?: unknown;
        relatedCustomerId?: string | null;
        relatedOrganizationId?: string | null;
        relatedSubscriptionId?: string | null;
        relatedProductAccessId?: string | null;
      }
    | null;

  if (!payload) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const statusValue = payload.status;
  const priorityValue = payload.priority;

  const status =
    typeof statusValue === 'string' && APPLICATION_STATUSES.includes(statusValue as ApplicationStatus)
      ? (statusValue as ApplicationStatus)
      : undefined;

  const priority =
    typeof priorityValue === 'string' && APPLICATION_PRIORITIES.includes(priorityValue as ApplicationPriority)
      ? (priorityValue as ApplicationPriority)
      : undefined;

  const updated = await updateApplicationRequest(
    applicationId,
    {
      ...payload,
      status,
      priority,
    },
    session.email
  );
  if (!updated) {
    return NextResponse.json({ error: 'Application not found' }, { status: 404 });
  }

  return NextResponse.json({ ok: true, item: updated });
});
