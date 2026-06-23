import React from 'react';
import { redirect } from 'next/navigation';
import { AdminSessionProvider } from '@/app/components/admin/AdminSessionProvider';
import { ProductProvider } from '@/app/components/admin/ProductContext';
import { getAdminSession } from './lib/session';

export default async function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();

  if (!session) {
    redirect('/admin-auth/login');
  }

  return (
    <AdminSessionProvider role={session.role} email={session.email}>
      <ProductProvider>
        {children}
      </ProductProvider>
    </AdminSessionProvider>
  );
}
