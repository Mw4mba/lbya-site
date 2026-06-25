import { NextResponse } from 'next/server';
import { withAdminGuard } from '../_lib/guard';
import { auditLogs } from '@/app/components/admin/mockData';
import { mockAuditEvents } from '@/data/mockAdminBilling';
import { prisma } from '@/lib/prisma';

export const GET = withAdminGuard(
  async () => {
    try {
      const events = await prisma.adminAuditEvent.findMany({
        orderBy: { timestamp: 'desc' },
        take: 200,
      });

      return NextResponse.json({
        items: events.map((event) => ({
          id: event.id,
          timestamp: event.timestamp.toISOString(),
          adminUser: event.adminUser,
          action: event.action,
          entity: event.entity,
          entityId: event.entityId,
          customer: event.customer,
          details: event.details,
          source: event.source,
          status: event.status,
        })),
        total: events.length,
      });
    } catch {
      const fallback = mockAuditEvents.length > 0 ? mockAuditEvents : auditLogs;
      return NextResponse.json({ items: fallback, total: fallback.length });
    }
  },
  ['super-admin', 'finance-admin']
);
