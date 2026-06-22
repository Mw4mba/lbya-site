import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import {
  ADMIN_KEY_COOKIE,
  ADMIN_KEY_HEADER,
  isAdminFeatureEnabled,
  isAdminRequestAuthorized,
} from './lib/adminAccess';

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/admin')) {
    const enabled = isAdminFeatureEnabled({
      nodeEnv: process.env.NODE_ENV,
      adminDashboardEnabled: process.env.ADMIN_DASHBOARD_ENABLED,
      adminPreviewEnabled: process.env.NEXT_PUBLIC_ADMIN_PREVIEW,
      configuredAccessKey: process.env.ADMIN_DASHBOARD_ACCESS_KEY,
      providedAccessKey: undefined,
    });

    if (!enabled) {
      return new NextResponse('Not Found', { status: 404 });
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

    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except API, Next internals, and files with an extension.
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};
