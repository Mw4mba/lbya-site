import { NextResponse } from 'next/server';
import { withAdminGuard } from '@/app/api/admin/_lib/guard';
import { archiveApplication } from '@/lib/applications/store';

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

  const updated = await archiveApplication(applicationId, session.email);
  if (!updated) {
    return NextResponse.json({ error: 'Application not found' }, { status: 404 });
  }

  return NextResponse.json({ ok: true, item: updated });
});
