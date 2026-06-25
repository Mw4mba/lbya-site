import { NextResponse } from 'next/server';
import { withAdminGuard } from '@/app/api/admin/_lib/guard';
import { logBillingAudit, updateProductAccessStatus } from '@/lib/billing/store';

export const PATCH = withAdminGuard(async (request, session) => {
  const pathSegments = request.nextUrl.pathname.split('/').filter(Boolean);
  const productAccessIndex = pathSegments.findIndex((part) => part === 'product-access');
  const id = productAccessIndex >= 0 ? pathSegments[productAccessIndex + 1] : '';

  if (!id) {
    return NextResponse.json({ error: 'Missing product access id' }, { status: 400 });
  }

  const body = (await request.json().catch(() => null)) as
    | { status?: 'enabled' | 'suspended'; reason?: string }
    | null;

  if (!body?.status || !['enabled', 'suspended'].includes(body.status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  const reason = (body.reason || '').trim();
  if (!reason) {
    return NextResponse.json({ error: 'Reason is required' }, { status: 400 });
  }

  await updateProductAccessStatus({
    accessId: id,
    status: body.status,
    reason,
  });

  await logBillingAudit({
    action: body.status === 'suspended' ? 'product_access_suspended' : 'product_access_enabled',
    source: 'admin',
    actorUserId: session.email,
    metadataJson: { accessId: id, reason },
  });

  return NextResponse.json({ ok: true });
});
