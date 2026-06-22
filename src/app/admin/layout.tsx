import React from 'react';
import { notFound } from 'next/navigation';
import { AdminSessionProvider } from '@/app/components/admin/AdminSessionProvider';
import { getAdminSession } from './lib/session';

export default async function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();

  if (!session) {
    notFound();
  }

  return (
    <AdminSessionProvider role={session.role} email={session.email}>
      {children}
    </AdminSessionProvider>
  );
}
