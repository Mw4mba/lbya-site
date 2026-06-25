import { NextResponse } from 'next/server';
import { withAdminGuard } from '@/app/api/admin/_lib/guard';
import { listApplicationRequests } from '@/lib/applications/store';

export const GET = withAdminGuard(async (request) => {
  const searchParams = request.nextUrl.searchParams;

  const { items, summary } = await listApplicationRequests({
    applicationType: searchParams.get('applicationType') ?? undefined,
    productCode: searchParams.get('productCode') ?? undefined,
    status: searchParams.get('status') ?? undefined,
    priority: searchParams.get('priority') ?? undefined,
    country: searchParams.get('country') ?? undefined,
    projectSector: searchParams.get('projectSector') ?? undefined,
    assignedToUserId: searchParams.get('assignedToUserId') ?? undefined,
    createdFrom: searchParams.get('createdFrom') ?? undefined,
    createdTo: searchParams.get('createdTo') ?? undefined,
    search: searchParams.get('search') ?? undefined,
  });

  return NextResponse.json({ items, summary, total: items.length });
});
