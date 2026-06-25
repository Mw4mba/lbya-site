export type DashboardPermission =
  | 'Full Access'
  | 'Billing Admin'
  | 'Project Management'
  | 'Support Access'
  | 'Read Only';

export const DASHBOARD_PERMISSION_OPTIONS: DashboardPermission[] = [
  'Full Access',
  'Billing Admin',
  'Project Management',
  'Support Access',
  'Read Only',
];

export function mapAdminRoleToDashboardPermission(role: string): DashboardPermission {
  switch (role) {
    case 'super-admin':
      return 'Full Access';
    case 'finance-admin':
      return 'Billing Admin';
    case 'product-admin-operator':
      return 'Project Management';
    case 'support-admin':
      return 'Support Access';
    default:
      return 'Read Only';
  }
}

export function canManageProjects(permission: DashboardPermission): boolean {
  return permission === 'Full Access' || permission === 'Project Management';
}

export function isDashboardPermission(value: string): value is DashboardPermission {
  return DASHBOARD_PERMISSION_OPTIONS.includes(value as DashboardPermission);
}
