'use client';

import React, { createContext, useContext } from 'react';
import type { AdminRole } from './types';

type AdminSession = {
  role: AdminRole;
  email: string;
  name: string;
};

const AdminSessionContext = createContext<AdminSession | null>(null);

export function AdminSessionProvider({
  role,
  email,
  name,
  children,
}: {
  role: AdminRole;
  email: string;
  name: string;
  children: React.ReactNode;
}) {
  return <AdminSessionContext.Provider value={{ role, email, name }}>{children}</AdminSessionContext.Provider>;
}

export function useAdminSession() {
  const ctx = useContext(AdminSessionContext);
  if (!ctx) {
    throw new Error('useAdminSession must be used within AdminSessionProvider');
  }
  return ctx;
}
