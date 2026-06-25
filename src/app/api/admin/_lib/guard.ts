import { NextRequest, NextResponse } from 'next/server';
import type { AdminRole } from '@/app/components/admin/types';
import { ADMIN_KEY_COOKIE, ADMIN_KEY_HEADER, isAdminRequestAuthorized } from '@/lib/adminAccess';

const VALID_ROLES: AdminRole[] = [
  'super-admin',
  'finance-admin',
  'sales-admin',
  'support-admin',
  'product-admin-operator',
];

type AdminApiSession = {
  role: AdminRole;
  email: string;
};

type GuardedHandler = (request: NextRequest, session: AdminApiSession) => Promise<Response> | Response;

function getSessionFromRequest(request: NextRequest): AdminApiSession {
  const roleCookie = request.cookies.get('lbya_admin_role')?.value;
  const emailCookie = request.cookies.get('lbya_admin_email')?.value;

  const role = VALID_ROLES.includes(roleCookie as AdminRole)
    ? (roleCookie as AdminRole)
    : 'super-admin';

  return {
    role,
    email: emailCookie?.trim() || 'internal.admin@lbya.se',
  };
}

export function withAdminGuard(handler: GuardedHandler, allowedRoles?: AdminRole[]) {
  return async function guardedRoute(request: NextRequest) {
    const isDev = process.env.NODE_ENV !== 'production';

    if (isDev) {
      const session = getSessionFromRequest(request);

      if (allowedRoles && !allowedRoles.includes(session.role)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }

      return handler(request, session);
    }

    const providedAccessKey =
      request.headers.get(ADMIN_KEY_HEADER) ?? request.cookies.get(ADMIN_KEY_COOKIE)?.value;

    const authorized = isAdminRequestAuthorized({
      nodeEnv: process.env.NODE_ENV,
      adminDashboardEnabled: process.env.ADMIN_DASHBOARD_ENABLED,
      adminPreviewEnabled: process.env.NEXT_PUBLIC_ADMIN_PREVIEW,
      configuredAccessKey: process.env.ADMIN_DASHBOARD_ACCESS_KEY,
      providedAccessKey,
    });

    if (!authorized) {
      return new NextResponse('Not Found', { status: 404 });
    }

    const session = getSessionFromRequest(request);

    if (allowedRoles && !allowedRoles.includes(session.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return handler(request, session);
  };
}
