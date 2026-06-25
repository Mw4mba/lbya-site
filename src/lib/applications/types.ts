export type ApplicationType =
  | 'mct_subscription_interest'
  | 'mct_demo_request'
  | 'nbc_early_access'
  | 'nbc_enterprise_introduction'
  | 'nbc_pilot_project'
  | 'nbc_academic_pilot'
  | 'nbc_thesis_research'
  | 'partnership_request'
  | 'career_application'
  | 'general_business_request';

export type ApplicationSource =
  | 'website'
  | 'product_page'
  | 'academic_pilot_page'
  | 'careers_page'
  | 'contact_page'
  | 'admin_created';

export type ApplicationProductCode = 'MCT' | 'NBC' | 'LBYA_BIM' | 'GENERAL';

export type ApplicationStatus =
  | 'new'
  | 'in_review'
  | 'qualified'
  | 'not_qualified'
  | 'contacted'
  | 'meeting_scheduled'
  | 'pilot_discussion'
  | 'proposal_sent'
  | 'approved'
  | 'rejected'
  | 'converted_to_customer'
  | 'archived';

export type ApplicationPriority = 'low' | 'medium' | 'high' | 'urgent';

export type ApplicationProjectSector =
  | 'real_estate'
  | 'infrastructure'
  | 'industry'
  | 'mixed_multi_sector'
  | 'custom';

export type ProductAccessLifecycleStatus =
  | 'pending'
  | 'enabled'
  | 'disabled'
  | 'suspended'
  | 'expired'
  | 'manual_review_required';

export type ApplicationRequest = {
  id: string;
  applicationType: ApplicationType;
  source: ApplicationSource;
  productCode?: ApplicationProductCode;
  status: ApplicationStatus;
  priority: ApplicationPriority;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  companyName?: string;
  organizationName?: string;
  jobTitle?: string;
  country?: string;
  city?: string;
  website?: string;
  preferredContactMethod?: string;
  projectSector?: ApplicationProjectSector;
  assetType?: string;
  industrySector?: string;
  companySize?: string;
  numberOfUsers?: number;
  expectedUsage?: string;
  billingInterest?: string;
  preferredPackage?: string;
  expectedTimeline?: string;
  currentToolsJson?: unknown;
  cdePlatformUsed?: string;
  issuePlatformUsed?: string;
  interestType?: string;
  projectType?: string;
  mainChallenge?: string;
  message?: string;
  university?: string;
  studyProgram?: string;
  degreeLevel?: string;
  expectedThesisPeriod?: string;
  supervisorName?: string;
  supervisorEmail?: string;
  researchInterest?: string;
  studentTeamSize?: string;
  roleAppliedFor?: string;
  linkedInUrl?: string;
  portfolioUrl?: string;
  cvFileId?: string;
  coverMessage?: string;
  expectedAvailability?: string;
  locationPreference?: string;
  assignedToUserId?: string;
  internalNotesJson?: unknown;
  tagsJson?: unknown;
  statusHistoryJson?: unknown;
  relatedCustomerId?: string;
  relatedOrganizationId?: string;
  relatedSubscriptionId?: string;
  relatedProductAccessId?: string;
  consentAccepted: boolean;
  consentAcceptedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

export const APPLICATION_TYPES: ApplicationType[] = [
  'mct_subscription_interest',
  'mct_demo_request',
  'nbc_early_access',
  'nbc_enterprise_introduction',
  'nbc_pilot_project',
  'nbc_academic_pilot',
  'nbc_thesis_research',
  'partnership_request',
  'career_application',
  'general_business_request',
];

export const APPLICATION_SOURCES: ApplicationSource[] = [
  'website',
  'product_page',
  'academic_pilot_page',
  'careers_page',
  'contact_page',
  'admin_created',
];

export const APPLICATION_STATUSES: ApplicationStatus[] = [
  'new',
  'in_review',
  'qualified',
  'not_qualified',
  'contacted',
  'meeting_scheduled',
  'pilot_discussion',
  'proposal_sent',
  'approved',
  'rejected',
  'converted_to_customer',
  'archived',
];

export const APPLICATION_PRIORITIES: ApplicationPriority[] = ['low', 'medium', 'high', 'urgent'];

export const PROJECT_SECTORS: ApplicationProjectSector[] = [
  'real_estate',
  'infrastructure',
  'industry',
  'mixed_multi_sector',
  'custom',
];

export const STATUS_BADGE_COLOR: Record<ApplicationStatus, string> = {
  new: '#2563EB',
  in_review: '#EA580C',
  qualified: '#15803D',
  not_qualified: '#6B7280',
  contacted: '#2563EB',
  meeting_scheduled: '#7E22CE',
  pilot_discussion: '#7E22CE',
  proposal_sent: '#EA580C',
  approved: '#15803D',
  rejected: '#B91C1C',
  converted_to_customer: '#15803D',
  archived: '#6B7280',
};

export const APPLICATION_TYPE_LABELS: Record<ApplicationType, string> = {
  mct_subscription_interest: 'MCT subscription interest',
  mct_demo_request: 'Product demo request',
  nbc_early_access: 'NBC early access',
  nbc_enterprise_introduction: 'NBC enterprise introduction',
  nbc_pilot_project: 'Pilot project request',
  nbc_academic_pilot: 'NBC academic pilot',
  nbc_thesis_research: 'NBC thesis/research collaboration',
  partnership_request: 'Partnership request',
  career_application: 'Career application',
  general_business_request: 'General business request',
};
