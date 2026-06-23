import { NextResponse } from 'next/server';
import { ADMIN_KEY_COOKIE } from '@/lib/adminAccess';
import type { AdminRole } from '@/app/components/admin/types';

const VALID_ROLES: AdminRole[] = [
  'super-admin',
  'finance-admin',
  'sales-admin',
  'support-admin',
  'product-admin-operator',
];

function getCookieOptions() {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: isProd,
    path: '/',
    maxAge: 60 * 60 * 8,
  };
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as
    | { accessKey?: string; email?: string; role?: string }
    | null;

  if (!body) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const configuredKey = process.env.ADMIN_DASHBOARD_ACCESS_KEY?.trim();
  const providedKey = body.accessKey?.trim() ?? '';

  if (configuredKey) {
    if (!providedKey || providedKey !== configuredKey) {
      return NextResponse.json({ error: 'Invalid admin access key' }, { status: 401 });
    }
  } else if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Admin access key is not configured' }, { status: 500 });
  }

  const role: AdminRole = VALID_ROLES.includes(body.role as AdminRole)
    ? (body.role as AdminRole)
    : 'super-admin';

  const email = (body.email?.trim() || 'internal.admin@lbya.se').toLowerCase();

  const response = NextResponse.json({ ok: true });
  const cookieOptions = getCookieOptions();

  response.cookies.set(ADMIN_KEY_COOKIE, providedKey || 'dev-local-admin', cookieOptions);
  response.cookies.set('lbya_admin_role', role, cookieOptions);
  response.cookies.set('lbya_admin_email', email, cookieOptions);

  return response;
}
