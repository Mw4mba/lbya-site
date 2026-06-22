import { NextResponse } from 'next/server';
import { withAdminGuard } from '../../_lib/guard';
import { subscribers } from '@/app/components/admin/mockData';

export const GET = withAdminGuard(async () => {
  return NextResponse.json({
    report: 'subscribers',
    total: subscribers.length,
    generatedAt: new Date().toISOString(),
  });
});
