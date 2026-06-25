import { NextResponse } from 'next/server';
import { withAdminGuard } from '@/app/api/admin/_lib/guard';
import { assignApplication } from '@/lib/applications/store';

function getId(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);
  const idx = parts.findIndex((part) => part === 'applications');
  return idx >= 0 ? parts[idx + 1] || '' : '';
}

export const POST = withAdminGuard(async (request, session) => {
  const applicationId = getId(request.nextUrl.pathname);
  if (!applicationId) {
    return NextResponse.json({ error: 'Missing application id' }, { status: 400 });
  }

  const payload = (await request.json().catch(() => null)) as { assignedToUserId?: string } | null;
  const assignedToUserId = payload?.assignedToUserId?.trim();
  if (!assignedToUserId) {
    return NextResponse.json({ error: 'assignedToUserId is required' }, { status: 400 });
  }

  const updated = await assignApplication(applicationId, assignedToUserId, session.email);
  if (!updated) {
    return NextResponse.json({ error: 'Application not found' }, { status: 404 });
  }

  return NextResponse.json({ ok: true, item: updated });
});
