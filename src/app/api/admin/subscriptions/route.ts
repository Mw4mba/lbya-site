import { NextResponse } from 'next/server';
import { withAdminGuard } from '../_lib/guard';
import { subscribers } from '@/app/components/admin/mockData';

export const GET = withAdminGuard(async () => {
  return NextResponse.json({
    items: subscribers.map((s) => ({
      id: s.id,
      companyName: s.companyName,
      currentPlan: s.currentPlan,
      seats: s.seats,
      status: s.subscriptionStatus,
      renewalDate: s.renewalDate,
    })),
  });
});
