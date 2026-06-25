import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAdminGuard } from '../../_lib/guard';
import { mapAdminRoleToDashboardPermission } from '@/lib/adminPermissions';

export const GET = withAdminGuard(async (_request, session) => {
  const email = session.email.toLowerCase();
  try {
    const existing = await prisma.adminPermission.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json({
        item: {
          id: existing.id,
          email: existing.email,
          name: existing.name,
          permissionLevel: existing.permissionLevel,
          status: existing.status,
        },
      });
    }
  } catch {
    // Fallback below keeps the UI usable before DB migrations are applied.
  }

  const fallbackPermission = mapAdminRoleToDashboardPermission(session.role);
  return NextResponse.json({
    item: {
      id: null,
      email,
      name: session.email,
      permissionLevel: fallbackPermission,
      status: 'Active',
    },
  });
});
