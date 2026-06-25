import { NextResponse } from 'next/server';
import { createApplicationRequest, getApplicationConfirmationCopy, notificationPlaceholders } from '@/lib/applications/store';
import { assertNotSpam, assertRateLimit, validateApplicationPayload } from '@/lib/applications/validation';

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get('x-forwarded-for') || '';
    const ip = forwardedFor.split(',')[0]?.trim() || 'unknown';
    assertRateLimit(ip);

    const payload = (await request.json().catch(() => null)) as Record<string, unknown> | null;
    if (!payload) {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    assertNotSpam(payload);
    const validated = validateApplicationPayload(payload);

    const created = await createApplicationRequest(validated);
    if (!created) {
      throw new Error('Unable to create application');
    }

    const confirmation = getApplicationConfirmationCopy(created.applicationType);

    return NextResponse.json({
      ok: true,
      applicationId: created.id,
      status: created.status,
      confirmation,
      emailPlaceholders: notificationPlaceholders,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to submit application';
    const status =
      message.toLowerCase().includes('rate limit')
        ? 429
        : message.toLowerCase().includes('invalid') || message.toLowerCase().includes('required') || message.toLowerCase().includes('spam')
          ? 400
          : 500;

    return NextResponse.json({ error: message }, { status });
  }
}
