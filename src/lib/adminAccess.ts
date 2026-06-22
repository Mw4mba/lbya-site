export const ADMIN_KEY_HEADER = 'x-lbya-admin-key';
export const ADMIN_KEY_COOKIE = 'lbya_admin_key';

type AccessPolicyInput = {
  nodeEnv: string | undefined;
  adminDashboardEnabled: string | undefined;
  adminPreviewEnabled: string | undefined;
  configuredAccessKey: string | undefined;
  providedAccessKey: string | undefined;
};

export function isAdminFeatureEnabled(input: AccessPolicyInput): boolean {
  return (
    input.adminDashboardEnabled === 'true' ||
    input.adminPreviewEnabled === 'true' ||
    input.nodeEnv !== 'production'
  );
}

export function isAdminRequestAuthorized(input: AccessPolicyInput): boolean {
  if (!isAdminFeatureEnabled(input)) {
    return false;
  }

  const configuredKey = input.configuredAccessKey?.trim();

  // In local/dev environments, allow access when no shared key is configured.
  if (!configuredKey) {
    return input.nodeEnv !== 'production';
  }

  const provided = input.providedAccessKey?.trim();
  return Boolean(provided && provided === configuredKey);
}
