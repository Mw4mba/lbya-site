import { prisma } from '@/lib/prisma';
import {
  ensureBillingSchema,
  logBillingAudit,
  upsertCustomer,
  upsertProductAccess,
} from '@/lib/billing/store';
import type {
  ApplicationPriority,
  ApplicationProductCode,
  ApplicationRequest,
  ApplicationStatus,
  ApplicationType,
  ProductAccessLifecycleStatus,
} from './types';

let ready = false;

function id(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
}

type ApplicationFilter = {
  applicationType?: string;
  productCode?: string;
  status?: string;
  priority?: string;
  country?: string;
  projectSector?: string;
  assignedToUserId?: string;
  createdFrom?: string;
  createdTo?: string;
  search?: string;
};

type UpdatableApplicationFields = {
  status?: ApplicationStatus;
  priority?: ApplicationPriority;
  assignedToUserId?: string | null;
  tagsJson?: unknown;
  internalNotesJson?: unknown;
  relatedCustomerId?: string | null;
  relatedOrganizationId?: string | null;
  relatedSubscriptionId?: string | null;
  relatedProductAccessId?: string | null;
};

export type ApplicationNote = {
  id: string;
  applicationId: string;
  note: string;
  createdBy: string;
  createdAt: Date;
};

export type ApplicationDetail = {
  request: ApplicationRequest;
  notes: ApplicationNote[];
  auditLogs: Array<{
    id: string;
    action: string;
    source: string;
    actorUserId: string | null;
    createdAt: Date;
    metadataJson: unknown;
  }>;
};

function rowToApplicationRequest(row: Record<string, unknown>): ApplicationRequest {
  return {
    id: String(row.id),
    applicationType: row.applicationType as ApplicationType,
    source: row.source as ApplicationRequest['source'],
    productCode: (row.productCode as ApplicationProductCode | null) ?? undefined,
    status: row.status as ApplicationStatus,
    priority: row.priority as ApplicationPriority,
    firstName: String(row.firstName ?? ''),
    lastName: String(row.lastName ?? ''),
    email: String(row.email ?? ''),
    phone: (row.phone as string | null) ?? undefined,
    companyName: (row.companyName as string | null) ?? undefined,
    organizationName: (row.organizationName as string | null) ?? undefined,
    jobTitle: (row.jobTitle as string | null) ?? undefined,
    country: (row.country as string | null) ?? undefined,
    city: (row.city as string | null) ?? undefined,
    website: (row.website as string | null) ?? undefined,
    preferredContactMethod: (row.preferredContactMethod as string | null) ?? undefined,
    projectSector: (row.projectSector as ApplicationRequest['projectSector'] | null) ?? undefined,
    assetType: (row.assetType as string | null) ?? undefined,
    industrySector: (row.industrySector as string | null) ?? undefined,
    companySize: (row.companySize as string | null) ?? undefined,
    numberOfUsers: typeof row.numberOfUsers === 'number' ? row.numberOfUsers : undefined,
    expectedUsage: (row.expectedUsage as string | null) ?? undefined,
    billingInterest: (row.billingInterest as string | null) ?? undefined,
    preferredPackage: (row.preferredPackage as string | null) ?? undefined,
    expectedTimeline: (row.expectedTimeline as string | null) ?? undefined,
    currentToolsJson: row.currentToolsJson ?? undefined,
    cdePlatformUsed: (row.cdePlatformUsed as string | null) ?? undefined,
    issuePlatformUsed: (row.issuePlatformUsed as string | null) ?? undefined,
    interestType: (row.interestType as string | null) ?? undefined,
    projectType: (row.projectType as string | null) ?? undefined,
    mainChallenge: (row.mainChallenge as string | null) ?? undefined,
    message: (row.message as string | null) ?? undefined,
    university: (row.university as string | null) ?? undefined,
    studyProgram: (row.studyProgram as string | null) ?? undefined,
    degreeLevel: (row.degreeLevel as string | null) ?? undefined,
    expectedThesisPeriod: (row.expectedThesisPeriod as string | null) ?? undefined,
    supervisorName: (row.supervisorName as string | null) ?? undefined,
    supervisorEmail: (row.supervisorEmail as string | null) ?? undefined,
    researchInterest: (row.researchInterest as string | null) ?? undefined,
    studentTeamSize: (row.studentTeamSize as string | null) ?? undefined,
    roleAppliedFor: (row.roleAppliedFor as string | null) ?? undefined,
    linkedInUrl: (row.linkedInUrl as string | null) ?? undefined,
    portfolioUrl: (row.portfolioUrl as string | null) ?? undefined,
    cvFileId: (row.cvFileId as string | null) ?? undefined,
    coverMessage: (row.coverMessage as string | null) ?? undefined,
    expectedAvailability: (row.expectedAvailability as string | null) ?? undefined,
    locationPreference: (row.locationPreference as string | null) ?? undefined,
    assignedToUserId: (row.assignedToUserId as string | null) ?? undefined,
    internalNotesJson: row.internalNotesJson ?? undefined,
    tagsJson: row.tagsJson ?? undefined,
    statusHistoryJson: row.statusHistoryJson ?? undefined,
    relatedCustomerId: (row.relatedCustomerId as string | null) ?? undefined,
    relatedOrganizationId: (row.relatedOrganizationId as string | null) ?? undefined,
    relatedSubscriptionId: (row.relatedSubscriptionId as string | null) ?? undefined,
    relatedProductAccessId: (row.relatedProductAccessId as string | null) ?? undefined,
    consentAccepted: Boolean(row.consentAccepted),
    consentAcceptedAt: (row.consentAcceptedAt as Date | null) ?? undefined,
    createdAt: new Date(String(row.createdAt)),
    updatedAt: new Date(String(row.updatedAt)),
  };
}

export async function ensureApplicationsSchema(): Promise<void> {
  if (ready) return;

  await ensureBillingSchema();

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS application_requests (
      id TEXT PRIMARY KEY,
      application_type TEXT NOT NULL,
      source TEXT NOT NULL,
      product_code TEXT,
      status TEXT NOT NULL,
      priority TEXT NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      company_name TEXT,
      organization_name TEXT,
      job_title TEXT,
      country TEXT,
      city TEXT,
      website TEXT,
      preferred_contact_method TEXT,
      project_sector TEXT,
      asset_type TEXT,
      industry_sector TEXT,
      company_size TEXT,
      number_of_users INTEGER,
      expected_usage TEXT,
      billing_interest TEXT,
      preferred_package TEXT,
      expected_timeline TEXT,
      current_tools_json JSONB,
      cde_platform_used TEXT,
      issue_platform_used TEXT,
      interest_type TEXT,
      project_type TEXT,
      main_challenge TEXT,
      message TEXT,
      university TEXT,
      study_program TEXT,
      degree_level TEXT,
      expected_thesis_period TEXT,
      supervisor_name TEXT,
      supervisor_email TEXT,
      research_interest TEXT,
      student_team_size TEXT,
      role_applied_for TEXT,
      linkedin_url TEXT,
      portfolio_url TEXT,
      cv_file_id TEXT,
      cover_message TEXT,
      expected_availability TEXT,
      location_preference TEXT,
      assigned_to_user_id TEXT,
      internal_notes_json JSONB,
      tags_json JSONB,
      status_history_json JSONB NOT NULL DEFAULT '[]'::jsonb,
      related_customer_id TEXT,
      related_organization_id TEXT,
      related_subscription_id TEXT,
      related_product_access_id TEXT,
      consent_accepted BOOLEAN NOT NULL DEFAULT FALSE,
      consent_accepted_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS application_request_notes (
      id TEXT PRIMARY KEY,
      application_id TEXT NOT NULL,
      note TEXT NOT NULL,
      created_by TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await prisma.$executeRawUnsafe(
    `CREATE INDEX IF NOT EXISTS idx_application_requests_status ON application_requests(status)`
  );
  await prisma.$executeRawUnsafe(
    `CREATE INDEX IF NOT EXISTS idx_application_requests_type ON application_requests(application_type)`
  );
  await prisma.$executeRawUnsafe(
    `CREATE INDEX IF NOT EXISTS idx_application_requests_product ON application_requests(product_code)`
  );
  await prisma.$executeRawUnsafe(
    `CREATE INDEX IF NOT EXISTS idx_application_requests_created ON application_requests(created_at DESC)`
  );

  ready = true;
}

export async function createApplicationRequest(input: Omit<ApplicationRequest, 'id' | 'createdAt' | 'updatedAt'>) {
  await ensureApplicationsSchema();

  const applicationId = id('app');
  const nowIso = new Date().toISOString();
  const statusHistory = [
    {
      status: input.status,
      at: nowIso,
      by: 'website',
      note: 'Application created from website flow',
    },
  ];

  await prisma.$executeRawUnsafe(
    `INSERT INTO application_requests (
      id, application_type, source, product_code, status, priority,
      first_name, last_name, email, phone,
      company_name, organization_name, job_title, country, city, website,
      preferred_contact_method, project_sector, asset_type, industry_sector,
      company_size, number_of_users, expected_usage, billing_interest, preferred_package, expected_timeline,
      current_tools_json, cde_platform_used, issue_platform_used, interest_type, project_type, main_challenge, message,
      university, study_program, degree_level, expected_thesis_period, supervisor_name, supervisor_email, research_interest, student_team_size,
      role_applied_for, linkedin_url, portfolio_url, cv_file_id, cover_message, expected_availability, location_preference,
      assigned_to_user_id, internal_notes_json, tags_json, status_history_json,
      related_customer_id, related_organization_id, related_subscription_id, related_product_access_id,
      consent_accepted, consent_accepted_at
    ) VALUES (
      $1, $2, $3, $4, $5, $6,
      $7, $8, $9, $10,
      $11, $12, $13, $14, $15, $16,
      $17, $18, $19, $20,
      $21, $22, $23, $24, $25, $26,
      $27::jsonb, $28, $29, $30, $31, $32, $33,
      $34, $35, $36, $37, $38, $39, $40, $41,
      $42, $43, $44, $45, $46, $47, $48,
      $49, $50::jsonb, $51::jsonb, $52::jsonb,
      $53, $54, $55, $56,
      $57, $58
    )`,
    applicationId,
    input.applicationType,
    input.source,
    input.productCode ?? null,
    input.status,
    input.priority,
    input.firstName,
    input.lastName,
    input.email,
    input.phone ?? null,
    input.companyName ?? null,
    input.organizationName ?? null,
    input.jobTitle ?? null,
    input.country ?? null,
    input.city ?? null,
    input.website ?? null,
    input.preferredContactMethod ?? null,
    input.projectSector ?? null,
    input.assetType ?? null,
    input.industrySector ?? null,
    input.companySize ?? null,
    input.numberOfUsers ?? null,
    input.expectedUsage ?? null,
    input.billingInterest ?? null,
    input.preferredPackage ?? null,
    input.expectedTimeline ?? null,
    JSON.stringify(input.currentToolsJson ?? {}),
    input.cdePlatformUsed ?? null,
    input.issuePlatformUsed ?? null,
    input.interestType ?? null,
    input.projectType ?? null,
    input.mainChallenge ?? null,
    input.message ?? null,
    input.university ?? null,
    input.studyProgram ?? null,
    input.degreeLevel ?? null,
    input.expectedThesisPeriod ?? null,
    input.supervisorName ?? null,
    input.supervisorEmail ?? null,
    input.researchInterest ?? null,
    input.studentTeamSize ?? null,
    input.roleAppliedFor ?? null,
    input.linkedInUrl ?? null,
    input.portfolioUrl ?? null,
    input.cvFileId ?? null,
    input.coverMessage ?? null,
    input.expectedAvailability ?? null,
    input.locationPreference ?? null,
    input.assignedToUserId ?? null,
    JSON.stringify(input.internalNotesJson ?? []),
    JSON.stringify(input.tagsJson ?? []),
    JSON.stringify(statusHistory),
    input.relatedCustomerId ?? null,
    input.relatedOrganizationId ?? null,
    input.relatedSubscriptionId ?? null,
    input.relatedProductAccessId ?? null,
    input.consentAccepted,
    input.consentAcceptedAt ?? null
  );

  await logBillingAudit({
    action: 'application_created',
    source: 'website',
    actorUserId: input.email,
    metadataJson: {
      applicationId,
      applicationType: input.applicationType,
      source: input.source,
      productCode: input.productCode ?? null,
    },
  });

  return getApplicationRequestById(applicationId);
}

async function getApplicationRows(): Promise<ApplicationRequest[]> {
  await ensureApplicationsSchema();

  const rows = (await prisma.$queryRawUnsafe(
    `SELECT
      id,
      application_type as "applicationType",
      source,
      product_code as "productCode",
      status,
      priority,
      first_name as "firstName",
      last_name as "lastName",
      email,
      phone,
      company_name as "companyName",
      organization_name as "organizationName",
      job_title as "jobTitle",
      country,
      city,
      website,
      preferred_contact_method as "preferredContactMethod",
      project_sector as "projectSector",
      asset_type as "assetType",
      industry_sector as "industrySector",
      company_size as "companySize",
      number_of_users as "numberOfUsers",
      expected_usage as "expectedUsage",
      billing_interest as "billingInterest",
      preferred_package as "preferredPackage",
      expected_timeline as "expectedTimeline",
      current_tools_json as "currentToolsJson",
      cde_platform_used as "cdePlatformUsed",
      issue_platform_used as "issuePlatformUsed",
      interest_type as "interestType",
      project_type as "projectType",
      main_challenge as "mainChallenge",
      message,
      university,
      study_program as "studyProgram",
      degree_level as "degreeLevel",
      expected_thesis_period as "expectedThesisPeriod",
      supervisor_name as "supervisorName",
      supervisor_email as "supervisorEmail",
      research_interest as "researchInterest",
      student_team_size as "studentTeamSize",
      role_applied_for as "roleAppliedFor",
      linkedin_url as "linkedInUrl",
      portfolio_url as "portfolioUrl",
      cv_file_id as "cvFileId",
      cover_message as "coverMessage",
      expected_availability as "expectedAvailability",
      location_preference as "locationPreference",
      assigned_to_user_id as "assignedToUserId",
      internal_notes_json as "internalNotesJson",
      tags_json as "tagsJson",
      status_history_json as "statusHistoryJson",
      related_customer_id as "relatedCustomerId",
      related_organization_id as "relatedOrganizationId",
      related_subscription_id as "relatedSubscriptionId",
      related_product_access_id as "relatedProductAccessId",
      consent_accepted as "consentAccepted",
      consent_accepted_at as "consentAcceptedAt",
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM application_requests
    ORDER BY created_at DESC`
  )) as Array<Record<string, unknown>>;

  return rows.map(rowToApplicationRequest);
}

function includesInsensitive(source: string | undefined, value: string): boolean {
  return (source ?? '').toLowerCase().includes(value.toLowerCase());
}

export async function listApplicationRequests(filters: ApplicationFilter = {}) {
  const all = await getApplicationRows();

  const filtered = all.filter((item) => {
    if (filters.applicationType && item.applicationType !== filters.applicationType) return false;
    if (filters.productCode && item.productCode !== filters.productCode) return false;
    if (filters.status && item.status !== filters.status) return false;
    if (filters.priority && item.priority !== filters.priority) return false;
    if (filters.country && item.country !== filters.country) return false;
    if (filters.projectSector && item.projectSector !== filters.projectSector) return false;
    if (filters.assignedToUserId && item.assignedToUserId !== filters.assignedToUserId) return false;

    if (filters.createdFrom) {
      const fromDate = new Date(filters.createdFrom);
      if (!Number.isNaN(fromDate.getTime()) && item.createdAt < fromDate) return false;
    }

    if (filters.createdTo) {
      const toDate = new Date(filters.createdTo);
      if (!Number.isNaN(toDate.getTime()) && item.createdAt > toDate) return false;
    }

    if (filters.search) {
      const query = filters.search.toLowerCase();
      const haystack = [
        item.firstName,
        item.lastName,
        item.email,
        item.companyName,
        item.organizationName,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      if (!haystack.includes(query)) return false;
    }

    return true;
  });

  const summary = {
    total: filtered.length,
    newApplications: filtered.filter((item) => item.status === 'new').length,
    inReview: filtered.filter((item) => item.status === 'in_review').length,
    qualifiedLeads: filtered.filter((item) => item.status === 'qualified').length,
    pilotDiscussions: filtered.filter((item) => item.status === 'pilot_discussion').length,
    enterpriseRequests: filtered.filter((item) => item.applicationType === 'nbc_enterprise_introduction').length,
    academicPilotRequests: filtered.filter((item) => item.applicationType === 'nbc_academic_pilot').length,
    careerApplications: filtered.filter((item) => item.applicationType === 'career_application').length,
    convertedToCustomers: filtered.filter((item) => item.status === 'converted_to_customer').length,
  };

  return { items: filtered, summary };
}

export async function getApplicationRequestById(applicationId: string): Promise<ApplicationRequest | null> {
  await ensureApplicationsSchema();

  const rows = (await prisma.$queryRawUnsafe(
    `SELECT
      id,
      application_type as "applicationType",
      source,
      product_code as "productCode",
      status,
      priority,
      first_name as "firstName",
      last_name as "lastName",
      email,
      phone,
      company_name as "companyName",
      organization_name as "organizationName",
      job_title as "jobTitle",
      country,
      city,
      website,
      preferred_contact_method as "preferredContactMethod",
      project_sector as "projectSector",
      asset_type as "assetType",
      industry_sector as "industrySector",
      company_size as "companySize",
      number_of_users as "numberOfUsers",
      expected_usage as "expectedUsage",
      billing_interest as "billingInterest",
      preferred_package as "preferredPackage",
      expected_timeline as "expectedTimeline",
      current_tools_json as "currentToolsJson",
      cde_platform_used as "cdePlatformUsed",
      issue_platform_used as "issuePlatformUsed",
      interest_type as "interestType",
      project_type as "projectType",
      main_challenge as "mainChallenge",
      message,
      university,
      study_program as "studyProgram",
      degree_level as "degreeLevel",
      expected_thesis_period as "expectedThesisPeriod",
      supervisor_name as "supervisorName",
      supervisor_email as "supervisorEmail",
      research_interest as "researchInterest",
      student_team_size as "studentTeamSize",
      role_applied_for as "roleAppliedFor",
      linkedin_url as "linkedInUrl",
      portfolio_url as "portfolioUrl",
      cv_file_id as "cvFileId",
      cover_message as "coverMessage",
      expected_availability as "expectedAvailability",
      location_preference as "locationPreference",
      assigned_to_user_id as "assignedToUserId",
      internal_notes_json as "internalNotesJson",
      tags_json as "tagsJson",
      status_history_json as "statusHistoryJson",
      related_customer_id as "relatedCustomerId",
      related_organization_id as "relatedOrganizationId",
      related_subscription_id as "relatedSubscriptionId",
      related_product_access_id as "relatedProductAccessId",
      consent_accepted as "consentAccepted",
      consent_accepted_at as "consentAcceptedAt",
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM application_requests
    WHERE id = $1
    LIMIT 1`,
    applicationId
  )) as Array<Record<string, unknown>>;

  return rows[0] ? rowToApplicationRequest(rows[0]) : null;
}

export async function getApplicationDetailById(applicationId: string): Promise<ApplicationDetail | null> {
  const request = await getApplicationRequestById(applicationId);
  if (!request) return null;

  const notesRows = (await prisma.$queryRawUnsafe(
    `SELECT
      id,
      application_id as "applicationId",
      note,
      created_by as "createdBy",
      created_at as "createdAt"
    FROM application_request_notes
    WHERE application_id = $1
    ORDER BY created_at DESC`,
    applicationId
  )) as Array<Record<string, unknown>>;

  const notes: ApplicationNote[] = notesRows.map((row) => ({
    id: String(row.id),
    applicationId: String(row.applicationId),
    note: String(row.note),
    createdBy: String(row.createdBy),
    createdAt: new Date(String(row.createdAt)),
  }));

  const auditRows = (await prisma.$queryRawUnsafe(
    `SELECT
      id,
      action,
      source,
      actor_user_id as "actorUserId",
      created_at as "createdAt",
      metadata_json as "metadataJson"
    FROM billing_audit_logs
    WHERE metadata_json ->> 'applicationId' = $1
    ORDER BY created_at DESC
    LIMIT 200`,
    applicationId
  )) as Array<Record<string, unknown>>;

  const auditLogs = auditRows.map((row) => ({
    id: String(row.id),
    action: String(row.action),
    source: String(row.source),
    actorUserId: (row.actorUserId as string | null) ?? null,
    createdAt: new Date(String(row.createdAt)),
    metadataJson: row.metadataJson,
  }));

  return { request, notes, auditLogs };
}

export async function updateApplicationRequest(
  applicationId: string,
  patch: UpdatableApplicationFields,
  actorUserId: string
) {
  await ensureApplicationsSchema();

  const current = await getApplicationRequestById(applicationId);
  if (!current) return null;

  const nextStatus = patch.status ?? current.status;
  const nextPriority = patch.priority ?? current.priority;
  const nextAssignedTo = patch.assignedToUserId === undefined ? current.assignedToUserId ?? null : patch.assignedToUserId;
  const nextTags = patch.tagsJson === undefined ? current.tagsJson ?? [] : patch.tagsJson;
  const nextInternalNotes = patch.internalNotesJson === undefined ? current.internalNotesJson ?? [] : patch.internalNotesJson;

  const nextRelatedCustomerId =
    patch.relatedCustomerId === undefined ? current.relatedCustomerId ?? null : patch.relatedCustomerId;
  const nextRelatedOrganizationId =
    patch.relatedOrganizationId === undefined ? current.relatedOrganizationId ?? null : patch.relatedOrganizationId;
  const nextRelatedSubscriptionId =
    patch.relatedSubscriptionId === undefined ? current.relatedSubscriptionId ?? null : patch.relatedSubscriptionId;
  const nextRelatedProductAccessId =
    patch.relatedProductAccessId === undefined ? current.relatedProductAccessId ?? null : patch.relatedProductAccessId;

  const statusAppend =
    patch.status && patch.status !== current.status
      ? [
          {
            status: patch.status,
            at: new Date().toISOString(),
            by: actorUserId,
            note: 'Status updated by admin',
          },
        ]
      : [];

  await prisma.$executeRawUnsafe(
    `UPDATE application_requests
     SET
      status = $2,
      priority = $3,
      assigned_to_user_id = $4,
      tags_json = $5::jsonb,
      internal_notes_json = $6::jsonb,
      related_customer_id = $7,
      related_organization_id = $8,
      related_subscription_id = $9,
      related_product_access_id = $10,
      status_history_json = CASE WHEN $11::jsonb = '[]'::jsonb THEN status_history_json ELSE status_history_json || $11::jsonb END,
      updated_at = NOW()
     WHERE id = $1`,
    applicationId,
    nextStatus,
    nextPriority,
    nextAssignedTo,
    JSON.stringify(nextTags ?? []),
    JSON.stringify(nextInternalNotes ?? []),
    nextRelatedCustomerId,
    nextRelatedOrganizationId,
    nextRelatedSubscriptionId,
    nextRelatedProductAccessId,
    JSON.stringify(statusAppend)
  );

  await logBillingAudit({
    action: 'application_updated',
    source: 'admin',
    actorUserId,
    metadataJson: {
      applicationId,
      status: nextStatus,
      priority: nextPriority,
      assignedToUserId: nextAssignedTo,
    },
  });

  return getApplicationRequestById(applicationId);
}

export async function addApplicationNote(applicationId: string, note: string, actorUserId: string) {
  await ensureApplicationsSchema();

  await prisma.$executeRawUnsafe(
    `INSERT INTO application_request_notes (id, application_id, note, created_by)
     VALUES ($1, $2, $3, $4)`,
    id('anote'),
    applicationId,
    note,
    actorUserId
  );

  await logBillingAudit({
    action: 'application_note_added',
    source: 'admin',
    actorUserId,
    metadataJson: { applicationId, note },
  });

  return getApplicationDetailById(applicationId);
}

export async function assignApplication(applicationId: string, assigneeUserId: string, actorUserId: string) {
  const updated = await updateApplicationRequest(
    applicationId,
    {
      assignedToUserId: assigneeUserId,
      status: 'in_review',
    },
    actorUserId
  );

  await logBillingAudit({
    action: 'application_assigned',
    source: 'admin',
    actorUserId,
    metadataJson: { applicationId, assigneeUserId },
  });

  return updated;
}

export async function archiveApplication(applicationId: string, actorUserId: string) {
  return updateApplicationRequest(applicationId, { status: 'archived' }, actorUserId);
}

export async function convertApplicationToCustomer(applicationId: string, actorUserId: string) {
  const application = await getApplicationRequestById(applicationId);
  if (!application) return null;

  const customer = await upsertCustomer({
    email: application.email,
    companyName: application.companyName ?? application.organizationName ?? undefined,
    organizationId: application.relatedOrganizationId,
  });

  const updated = await updateApplicationRequest(
    applicationId,
    {
      relatedCustomerId: customer.id,
      status: 'converted_to_customer',
    },
    actorUserId
  );

  await logBillingAudit({
    action: 'application_converted_to_customer',
    source: 'admin',
    actorUserId,
    customerId: customer.id,
    metadataJson: {
      applicationId,
      customerId: customer.id,
      email: customer.email,
    },
  });

  return updated;
}

export async function createProductAccessFromApplication(
  applicationId: string,
  actorUserId: string,
  accessStatus: ProductAccessLifecycleStatus = 'pending'
) {
  const application = await getApplicationRequestById(applicationId);
  if (!application) return null;

  const customer = application.relatedCustomerId
    ? { id: application.relatedCustomerId, email: application.email }
    : await upsertCustomer({
        email: application.email,
        companyName: application.companyName ?? application.organizationName ?? undefined,
        organizationId: application.relatedOrganizationId,
      });

  const organizationId = application.relatedOrganizationId ?? `org_${customer.id}`;
  const productCode = application.productCode ?? 'GENERAL';
  const planCode =
    (application.preferredPackage || `${application.applicationType}_pending`).toLowerCase().replace(/\s+/g, '_');

  await upsertProductAccess({
    organizationId,
    customerId: customer.id,
    productCode,
    planCode,
    status: accessStatus,
    seatsAllowed: Math.max(application.numberOfUsers ?? 1, 1),
    reason: `Created from application ${application.id}`,
  });

  await ensureBillingSchema();
  const accessRows = (await prisma.$queryRawUnsafe(
    `SELECT id FROM billing_product_access WHERE customer_id = $1 AND plan_code = $2 LIMIT 1`,
    customer.id,
    planCode
  )) as Array<{ id: string }>;

  const relatedProductAccessId = accessRows[0]?.id ?? null;

  const updated = await updateApplicationRequest(
    applicationId,
    {
      relatedCustomerId: customer.id,
      relatedOrganizationId: organizationId,
      relatedProductAccessId,
      status: application.status === 'new' ? 'in_review' : application.status,
    },
    actorUserId
  );

  await logBillingAudit({
    action: 'application_product_access_created',
    source: 'admin',
    actorUserId,
    customerId: customer.id,
    metadataJson: {
      applicationId,
      relatedProductAccessId,
      productCode,
      accessStatus,
    },
  });

  return updated;
}

export function getApplicationConfirmationCopy(applicationType: ApplicationType) {
  if (applicationType === 'nbc_early_access') {
    return {
      title: 'Thank you for your interest in NBC.',
      body: 'Your early access request has been received by LBYA AB and will be reviewed for selected pilot or enterprise discussions.',
    };
  }

  if (applicationType === 'nbc_academic_pilot') {
    return {
      title: 'Thank you for applying to the NBC Academic Pilot Program.',
      body: 'LBYA AB will review your academic background, research interest, and project fit.',
    };
  }

  if (applicationType === 'career_application') {
    return {
      title: 'Thank you for your application.',
      body: 'LBYA AB will review your profile and contact you if there is a strong match.',
    };
  }

  return {
    title: 'Thank you. Your request has been received by LBYA AB.',
    body: 'We will review your information and contact you if the request matches the current product, pilot, academic, or enterprise discussion stage.',
  };
}

export const notificationPlaceholders = {
  customerConfirmationSubject: 'Your request has been received by LBYA AB',
  customerConfirmationBody:
    'Thank you for contacting LBYA AB. We have received your request and will review it carefully.',
  adminNotificationSubject: 'New application received',
  adminNotificationBody:
    'A new application has been submitted through the LBYA AB website. Review it in the Admin Dashboard.',
};

export const statusColorMap: Record<ApplicationStatus, string> = {
  new: 'bg-blue-100 text-blue-700',
  in_review: 'bg-orange-100 text-orange-700',
  qualified: 'bg-emerald-100 text-emerald-700',
  not_qualified: 'bg-slate-200 text-slate-700',
  contacted: 'bg-blue-100 text-blue-700',
  meeting_scheduled: 'bg-violet-100 text-violet-700',
  pilot_discussion: 'bg-violet-100 text-violet-700',
  proposal_sent: 'bg-orange-100 text-orange-700',
  approved: 'bg-emerald-100 text-emerald-700',
  rejected: 'bg-red-100 text-red-700',
  converted_to_customer: 'bg-emerald-100 text-emerald-700',
  archived: 'bg-slate-200 text-slate-700',
};
