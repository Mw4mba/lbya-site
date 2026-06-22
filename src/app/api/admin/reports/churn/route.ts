import { NextResponse } from 'next/server';
import { withAdminGuard } from '../../_lib/guard';

export const GET = withAdminGuard(async () => {
  return NextResponse.json({
    report: 'churn',
    churnRate: 'placeholder',
    generatedAt: new Date().toISOString(),
  });
});
