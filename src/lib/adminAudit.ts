import { prisma } from '@/lib/prisma';

type AdminAuditInput = {
  adminUser: string;
  action: string;
  entity: string;
  entityId: string;
  customer?: string;
  details: string;
  source?: string;
  status?: 'Success' | 'Failed' | 'Pending';
};

export async function logAdminAuditEvent(input: AdminAuditInput): Promise<void> {
  try {
    await prisma.adminAuditEvent.create({
      data: {
        adminUser: input.adminUser,
        action: input.action,
        entity: input.entity,
        entityId: input.entityId,
        customer: input.customer,
        details: input.details,
        source: input.source ?? 'Admin Console',
        status: input.status ?? 'Success',
      },
    });
  } catch {
    // Keep primary admin actions non-blocking if audit storage is unavailable.
  }
}
