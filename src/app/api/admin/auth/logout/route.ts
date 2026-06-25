import { NextResponse } from 'next/server';
import { ADMIN_KEY_COOKIE } from '@/lib/adminAccess';

export async function POST() {
  const response = NextResponse.json({ ok: true });

  const clearCookie = {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  };

  response.cookies.set(ADMIN_KEY_COOKIE, '', clearCookie);
  response.cookies.set('lbya_admin_role', '', clearCookie);
  response.cookies.set('lbya_admin_email', '', clearCookie);
  response.cookies.set('lbya_admin_name', '', clearCookie);

  return response;
}
