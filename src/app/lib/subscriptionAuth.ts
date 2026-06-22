import { cookies } from 'next/headers';

export type AccountSession = {
  email: string;
};

export async function getAccountSession(): Promise<AccountSession | null> {
  const cookieStore = await cookies();
  const email = cookieStore.get('lbya_auth_email')?.value?.trim();
  if (!email) return null;
  return { email };
}
