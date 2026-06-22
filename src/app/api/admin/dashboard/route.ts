import { NextResponse } from 'next/server';
import { withAdminGuard } from '../_lib/guard';
import { activityFeed, overviewKPIs } from '@/app/components/admin/mockData';

export const GET = withAdminGuard(async (_request, session) => {
  return NextResponse.json({
    kpis: overviewKPIs,
    activity: activityFeed,
    meta: {
      generatedAt: new Date().toISOString(),
      actor: session.email,
      role: session.role,
    },
  });
});
