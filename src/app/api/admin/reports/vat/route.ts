import { NextResponse } from 'next/server';
import { withAdminGuard } from '../../_lib/guard';

export const GET = withAdminGuard(
  async () => {
    return NextResponse.json({
      report: 'vat',
      amount: 'placeholder',
      generatedAt: new Date().toISOString(),
    });
  },
  ['super-admin', 'finance-admin']
);
