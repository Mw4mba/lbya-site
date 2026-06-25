import React from 'react';
import { redirect } from 'next/navigation';
import { AdminSessionProvider } from '@/app/components/admin/AdminSessionProvider';
import { ProductProvider } from '@/app/components/admin/ProductContext';
import { getAdminSession } from './lib/session';

export default async function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();
  const isDev = process.env.NODE_ENV !== 'production';

  if (!session && !isDev) {
    redirect('/admin-auth/login');
  }

  const role = session?.role ?? 'super-admin';
  const email = session?.email ?? 'internal.admin@lbya.se';
  const name = session?.name ?? 'Administrator';

  return (
    <AdminSessionProvider role={role} email={email} name={name}>
      <ProductProvider>
        {children}
      </ProductProvider>
    </AdminSessionProvider>
  );
}
