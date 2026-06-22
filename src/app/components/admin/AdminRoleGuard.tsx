import React from 'react';
import type { AdminRole } from './types';

export function roleCanAccess(currentRole: AdminRole, allowedRoles: AdminRole[]) {
  return allowedRoles.includes(currentRole);
}

export default function AdminRoleGuard({
  role,
  allowed,
  children,
}: {
  role: AdminRole;
  allowed: AdminRole[];
  children: React.ReactNode;
}) {
  if (!roleCanAccess(role, allowed)) {
    return (
      <div className="rounded-sm border border-[#F3C0B8] bg-[#FDECEA] p-5 text-sm text-[#A12A1E]">
        You do not have permission to access this section.
      </div>
    );
  }

  return <>{children}</>;
}
