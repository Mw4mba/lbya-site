import { NextResponse } from 'next/server';
import { withAdminGuard } from '../../../_lib/guard';

export const POST = withAdminGuard(async () => {
  return NextResponse.json({ subscriptionReactivated: true });
});
