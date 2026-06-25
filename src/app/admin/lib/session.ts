import { cookies } from 'next/headers';
import type { AdminRole } from '@/app/components/admin/types';
import { ADMIN_KEY_COOKIE, isAdminRequestAuthorized } from '@/lib/adminAccess';

const ROLE_FALLBACK: AdminRole = 'super-admin';
const EMAIL_FALLBACK = 'internal.admin@lbya.se';
const NAME_FALLBACK = 'Administrator';

const VALID_ROLES: AdminRole[] = [
  'super-admin',
  'finance-admin',
  'sales-admin',
  'support-admin',
  'product-admin-operator',
];

export type AdminSession = {
  role: AdminRole;
  email: string;
  name: string;
};

function deriveNameFromEmail(email: string): string {
  const localPart = email.split('@')[0] || '';
  const cleaned = localPart.replace(/[._-]+/g, ' ').trim();
  return cleaned || NAME_FALLBACK;
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const providedAccessKey = cookieStore.get(ADMIN_KEY_COOKIE)?.value;

  const authorized = isAdminRequestAuthorized({
    nodeEnv: process.env.NODE_ENV,
    adminDashboardEnabled: process.env.ADMIN_DASHBOARD_ENABLED,
    adminPreviewEnabled: process.env.NEXT_PUBLIC_ADMIN_PREVIEW,
    configuredAccessKey: process.env.ADMIN_DASHBOARD_ACCESS_KEY,
    providedAccessKey,
  });

  if (!authorized) {
    return null;
  }

  const roleCookie = cookieStore.get('lbya_admin_role')?.value;
  const emailCookie = cookieStore.get('lbya_admin_email')?.value;
  const nameCookie = cookieStore.get('lbya_admin_name')?.value;

  const role = VALID_ROLES.includes(roleCookie as AdminRole) ? (roleCookie as AdminRole) : ROLE_FALLBACK;
  const email = emailCookie?.trim() || EMAIL_FALLBACK;
  const name = nameCookie?.trim() || deriveNameFromEmail(email);

  return { role, email, name };
}
