import {
  APPLICATION_PRIORITIES,
  APPLICATION_SOURCES,
  APPLICATION_STATUSES,
  APPLICATION_TYPES,
  PROJECT_SECTORS,
  type ApplicationPriority,
  type ApplicationRequest,
  type ApplicationSource,
  type ApplicationStatus,
  type ApplicationType,
} from './types';

export type ApplicationPayload = Partial<ApplicationRequest> & {
  applicationType?: string;
  source?: string;
  status?: string;
  priority?: string;
};

const allowedCvExtensions = ['.pdf', '.doc', '.docx'];

function trimOrUndefined(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const normalized = value.trim();
  return normalized.length ? normalized : undefined;
}

function parseNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}

function ensureEnum<T extends string>(value: unknown, allowed: readonly T[], fieldName: string): T {
  if (typeof value !== 'string' || !allowed.includes(value as T)) {
    throw new Error(`Invalid ${fieldName}`);
  }
  return value as T;
}

export function validateApplicationPayload(payload: ApplicationPayload) {
  const applicationType = ensureEnum<ApplicationType>(payload.applicationType, APPLICATION_TYPES, 'applicationType');
  const source = ensureEnum<ApplicationSource>(payload.source, APPLICATION_SOURCES, 'source');

  const status = payload.status
    ? ensureEnum<ApplicationStatus>(payload.status, APPLICATION_STATUSES, 'status')
    : 'new';

  const priority = payload.priority
    ? ensureEnum<ApplicationPriority>(payload.priority, APPLICATION_PRIORITIES, 'priority')
    : 'medium';

  const firstName = trimOrUndefined(payload.firstName);
  const lastName = trimOrUndefined(payload.lastName);
  const email = trimOrUndefined(payload.email)?.toLowerCase();

  if (!firstName) throw new Error('First name is required');
  if (!lastName) throw new Error('Last name is required');
  if (!email || !email.includes('@')) throw new Error('Valid email is required');

  const consentAccepted = Boolean(payload.consentAccepted);
  if (!consentAccepted) {
    throw new Error('Consent is required');
  }

  const projectSector = trimOrUndefined(payload.projectSector);
  if (projectSector && !PROJECT_SECTORS.includes(projectSector as (typeof PROJECT_SECTORS)[number])) {
    throw new Error('Invalid project sector');
  }

  const cvFileId = trimOrUndefined(payload.cvFileId);
  if (cvFileId) {
    const lower = cvFileId.toLowerCase();
    const allowed = allowedCvExtensions.some((ext) => lower.endsWith(ext));
    if (!allowed) {
      throw new Error('CV upload must be a PDF or Word document reference');
    }
  }

  return {
    applicationType,
    source,
    status,
    priority,
    firstName,
    lastName,
    email,
    phone: trimOrUndefined(payload.phone),
    companyName: trimOrUndefined(payload.companyName),
    organizationName: trimOrUndefined(payload.organizationName),
    jobTitle: trimOrUndefined(payload.jobTitle),
    country: trimOrUndefined(payload.country),
    city: trimOrUndefined(payload.city),
    website: trimOrUndefined(payload.website),
    preferredContactMethod: trimOrUndefined(payload.preferredContactMethod),
    productCode: trimOrUndefined(payload.productCode) as ApplicationRequest['productCode'],
    projectSector: projectSector as ApplicationRequest['projectSector'],
    assetType: trimOrUndefined(payload.assetType),
    industrySector: trimOrUndefined(payload.industrySector),
    companySize: trimOrUndefined(payload.companySize),
    numberOfUsers: parseNumber(payload.numberOfUsers),
    expectedUsage: trimOrUndefined(payload.expectedUsage),
    billingInterest: trimOrUndefined(payload.billingInterest),
    preferredPackage: trimOrUndefined(payload.preferredPackage),
    expectedTimeline: trimOrUndefined(payload.expectedTimeline),
    currentToolsJson: payload.currentToolsJson ?? undefined,
    cdePlatformUsed: trimOrUndefined(payload.cdePlatformUsed),
    issuePlatformUsed: trimOrUndefined(payload.issuePlatformUsed),
    interestType: trimOrUndefined(payload.interestType),
    projectType: trimOrUndefined(payload.projectType),
    mainChallenge: trimOrUndefined(payload.mainChallenge),
    message: trimOrUndefined(payload.message),
    university: trimOrUndefined(payload.university),
    studyProgram: trimOrUndefined(payload.studyProgram),
    degreeLevel: trimOrUndefined(payload.degreeLevel),
    expectedThesisPeriod: trimOrUndefined(payload.expectedThesisPeriod),
    supervisorName: trimOrUndefined(payload.supervisorName),
    supervisorEmail: trimOrUndefined(payload.supervisorEmail),
    researchInterest: trimOrUndefined(payload.researchInterest),
    studentTeamSize: trimOrUndefined(payload.studentTeamSize),
    roleAppliedFor: trimOrUndefined(payload.roleAppliedFor),
    linkedInUrl: trimOrUndefined(payload.linkedInUrl),
    portfolioUrl: trimOrUndefined(payload.portfolioUrl),
    cvFileId,
    coverMessage: trimOrUndefined(payload.coverMessage),
    expectedAvailability: trimOrUndefined(payload.expectedAvailability),
    locationPreference: trimOrUndefined(payload.locationPreference),
    assignedToUserId: trimOrUndefined(payload.assignedToUserId),
    internalNotesJson: payload.internalNotesJson ?? [],
    tagsJson: payload.tagsJson ?? [],
    relatedCustomerId: trimOrUndefined(payload.relatedCustomerId),
    relatedOrganizationId: trimOrUndefined(payload.relatedOrganizationId),
    relatedSubscriptionId: trimOrUndefined(payload.relatedSubscriptionId),
    relatedProductAccessId: trimOrUndefined(payload.relatedProductAccessId),
    consentAccepted,
    consentAcceptedAt: new Date(),
  };
}

const WINDOW_MS = 10 * 60 * 1000;
const LIMIT_PER_WINDOW = 20;
const ipBucket = new Map<string, number[]>();

export function assertRateLimit(ip: string) {
  const now = Date.now();
  const timestamps = ipBucket.get(ip) ?? [];
  const active = timestamps.filter((stamp) => now - stamp < WINDOW_MS);

  if (active.length >= LIMIT_PER_WINDOW) {
    throw new Error('Rate limit exceeded. Please try again later.');
  }

  active.push(now);
  ipBucket.set(ip, active);
}

export function assertNotSpam(payload: ApplicationPayload) {
  const trap = trimOrUndefined((payload as Record<string, unknown>).websiteField);
  if (trap) {
    throw new Error('Spam detected');
  }

  const message = trimOrUndefined(payload.message) || trimOrUndefined(payload.coverMessage) || '';
  if (message.length > 0 && message.length < 5) {
    throw new Error('Please provide a more detailed message');
  }
}
