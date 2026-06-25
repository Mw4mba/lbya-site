export type ResourceArea = {
  id: string;
  title: string;
  description: string;
  cta: string;
  href: string;
};

export type NbcInsightArticle = {
  id: string;
  category: string;
  title: string;
  readTime: string;
  tags: string[];
  summary: string;
};

export type ResourceProblem = {
  id: string;
  problem: string;
  whyItMatters: string;
  nbcResponse: string;
  relatedFeatures: string[];
};

export type NbcIntegration = {
  id: string;
  name: string;
  category: string;
  status: string;
  description: string;
  nbcUseCase: string;
  workflowType: string;
};

export type ResearchPillar = {
  id: string;
  title: string;
  summary: string;
};

export type GuideTopic = {
  id: string;
  title: string;
  summary: string;
};

export const resourceAreas: ResourceArea[] = [
  {
    id: 'insights',
    title: 'Insights',
    description: 'Short articles on delivery readiness, information trust, project evidence, issue ownership, and digital delivery control.',
    cta: 'Read insights',
    href: '/resources/insights',
  },
  {
    id: 'problem-library',
    title: 'Problem Library',
    description: 'A structured view of the recurring problems NBC is designed to address, from siloed project data to weak evidence before approval.',
    cta: 'Explore problems',
    href: '/resources/problem-library',
  },
  {
    id: 'integrations',
    title: 'Integrations',
    description: 'A view of the tools, file formats, and platforms NBC is designed to work alongside instead of replacing.',
    cta: 'View integrations',
    href: '/resources/integrations',
  },
  {
    id: 'research-thesis',
    title: 'Research & Thesis',
    description: 'Academic directions connected to BIM readiness, evidence-control, explainable validation, and decision support.',
    cta: 'View research',
    href: '/resources/research-thesis',
  },
  {
    id: 'help-guides',
    title: 'Help & Guides',
    description: 'Simple explanations of Readiness Passports, Decision Gates, Evidence Packs, Information Trust, and file verification levels.',
    cta: 'Open guides',
    href: '/resources/help-guides',
  },
];

export const nbcInsightArticles: NbcInsightArticle[] = [
  {
    id: 'bim-data-silos',
    category: 'Information control',
    title: 'Why BIM data still gets trapped in silos',
    readTime: '6 min read',
    tags: ['OpenBIM', 'Interoperability', 'Information Trust'],
    summary:
      'Project information often lives across authoring tools, CDEs, issue trackers, spreadsheets, reports, and emails. NBC helps teams understand what is reliable, complete, and ready for decision.',
  },
  {
    id: 'late-stage-compliance',
    category: 'Readiness',
    title: 'The cost of checking requirements too late',
    readTime: '5 min read',
    tags: ['Compliance', 'Decision Gates', 'Rework'],
    summary:
      'When information requirements are checked too late, teams risk redesign, delays, and unclear approvals. NBC uses readiness indicators and decision gates to surface problems earlier.',
  },
  {
    id: 'model-quality',
    category: 'Model control',
    title: 'Model quality is no longer optional',
    readTime: '5 min read',
    tags: ['Model Health', 'Validation', 'Governance'],
    summary:
      'A model can look complete while still missing the information needed for coordination, review, construction documentation, or handover.',
  },
  {
    id: 'mep-data-quality',
    category: 'Information trust',
    title: 'Why MEP data quality matters across the value chain',
    readTime: '6 min read',
    tags: ['MEP', 'Data Quality', 'Handover'],
    summary:
      'MEP systems contain complex information that affects coordination, procurement, asset data, handover, and operations. NBC helps make missing or unreliable information visible.',
  },
  {
    id: 'secure-bim-validation',
    category: 'Secure projects',
    title: 'Why secure BIM workflows matter for critical infrastructure',
    readTime: '6 min read',
    tags: ['Secure Offline', 'Critical Infrastructure', 'Data Control'],
    summary:
      'Some public, transport, energy, healthcare, and security-sensitive projects require controlled environments. NBC is cloud-first, but designed with future secure offline workflows in mind.',
  },
  {
    id: 'evidence-pack',
    category: 'Evidence',
    title: 'From BIM status to decision evidence',
    readTime: '4 min read',
    tags: ['Evidence Pack', 'Audit Trail', 'Decision Support'],
    summary:
      'Dashboards show status. Decisions require proof. NBC Evidence Packs are designed to collect readiness, issues, verification, audit logs, and reviewer notes into one controlled package.',
  },
  {
    id: 'no-black-box-validation',
    category: 'Trust',
    title: 'No black box validation',
    readTime: '5 min read',
    tags: ['Explainability', 'Rule Sets', 'Trust'],
    summary:
      'BIM professionals need to know why a score exists. NBC helps make readiness indicators explainable, traceable, reviewable, and linked to evidence.',
  },
  {
    id: 'what-changed',
    category: 'Project memory',
    title: 'The most important review question: what changed?',
    readTime: '4 min read',
    tags: ['Project Memory', 'Reviews', 'Coordination'],
    summary:
      'Many meetings start by reconstructing what changed. NBC Project Memory is designed to show new files, changed scores, reopened issues, updated gates, accepted risks, and generated evidence.',
  },
];

export const resourceProblems: ResourceProblem[] = [
  {
    id: 'siloed-bim-data',
    problem: 'Siloed BIM data',
    whyItMatters:
      'Project information is spread across models, documents, issue trackers, reports, and email. Teams struggle to know which information is current, complete, and ready.',
    nbcResponse:
      'NBC acts as an information trust layer that summarises readiness, evidence, and decision status across project information.',
    relatedFeatures: ['Information Trust', 'File Verification', 'Evidence Pack', 'Project Memory'],
  },
  {
    id: 'late-requirement-checks',
    problem: 'Late requirement checks',
    whyItMatters:
      'Requirements checked too late can create redesign, delays, and weak approval confidence.',
    nbcResponse:
      'Decision Gates and Readiness Passports help surface readiness problems before key milestones.',
    relatedFeatures: ['Decision Gates', 'Readiness Passport', 'No Black Box Validation'],
  },
  {
    id: 'issue-overload',
    problem: 'Issue overload',
    whyItMatters:
      'Large projects can generate many issues. Without decision-focused prioritisation, teams spend time managing lists instead of resolving blockers.',
    nbcResponse:
      'NBC highlights decision blockers, overdue issues, responsible parties, and next actions.',
    relatedFeatures: ['Issue Intelligence', 'Recommended Next Action', 'Decision Readiness'],
  },
  {
    id: 'weak-evidence-before-approval',
    problem: 'Weak evidence before approval',
    whyItMatters:
      'Teams often review or approve packages without a clear record of what was checked, what remained open, and who accepted the risk.',
    nbcResponse:
      'Evidence Packs collect readiness status, issue registers, score explanations, audit trails, and reviewer notes.',
    relatedFeatures: ['Evidence Pack', 'Project Memory', 'Audit Trail'],
  },
  {
    id: 'unclear-model-trust',
    problem: 'Unclear model trust',
    whyItMatters:
      'A model can look complete visually while still containing missing data, inconsistent naming, poor classification, or incomplete handover information.',
    nbcResponse:
      'NBC separates visual model presence from information trust using model health, verification levels, rule-set results, and explanation details.',
    relatedFeatures: ['Model Validation', 'Information Trust', 'No Black Box Validation'],
  },
];

export const nbcIntegrations: NbcIntegration[] = [
  {
    id: 'ifc',
    name: 'IFC',
    category: 'OpenBIM foundation',
    status: 'Priority',
    description: 'Priority format for structured model verification and readiness workflows.',
    nbcUseCase: 'Model validation, Information Trust, Readiness Passports, Decision Gates, and Evidence Packs.',
    workflowType: 'Core file upload',
  },
  {
    id: 'bcf',
    name: 'BCF / BCFZIP',
    category: 'OpenBIM foundation',
    status: 'Priority',
    description: 'Open issue exchange format for BIM coordination workflows.',
    nbcUseCase: 'Issue Intelligence, decision blockers, Project Memory, and responsibility tracking.',
    workflowType: 'Import / export',
  },
  {
    id: 'ids',
    name: 'IDS',
    category: 'OpenBIM foundation',
    status: 'Priority',
    description: 'Information requirements workflow for structured and explainable checking.',
    nbcUseCase: 'Requirement checks, rule-set versioning, and No Black Box Validation.',
    workflowType: 'Rule-set / requirement workflow',
  },
  {
    id: 'xlsx',
    name: 'Excel / XLSX',
    category: 'Reporting & analytics',
    status: 'Priority',
    description: 'Registers, issue lists, requirement tables, and project control data.',
    nbcUseCase: 'Import issue registers, readiness checklists, evidence logs, and review data.',
    workflowType: 'Import / export',
  },
  {
    id: 'pdf',
    name: 'PDF Reports',
    category: 'Reporting & analytics',
    status: 'Priority',
    description: 'Reports and formal review documents used as project evidence.',
    nbcUseCase: 'Track reports as evidence and include them in Evidence Packs.',
    workflowType: 'Evidence tracking',
  },
  {
    id: 'revit',
    name: 'Autodesk Revit',
    category: 'Authoring tools',
    status: 'File-based workflow',
    description: 'Initial workflow through IFC export and controlled file upload.',
    nbcUseCase: 'Use IFC exports from Revit for model validation, file verification, and readiness checks.',
    workflowType: 'IFC export / future adapter',
  },
  {
    id: 'autodesk-construction-cloud',
    name: 'Autodesk Construction Cloud / Forma',
    category: 'CDE & document platforms',
    status: 'Planned',
    description: 'Potential future connection for project files, review packages, and readiness evidence.',
    nbcUseCase: 'Bring project data into NBC for readiness passports, evidence packs, and decision gates.',
    workflowType: 'Future API / file-based workflow first',
  },
  {
    id: 'bimcollab',
    name: 'BIMcollab',
    category: 'Issue management',
    status: 'Planned',
    description: 'Potential issue synchronization and BCF workflows for project coordination.',
    nbcUseCase: 'Import BCF issues and identify decision blockers, overdue responsibilities, and readiness impact.',
    workflowType: 'BCF import/export / future API',
  },
  {
    id: 'solibri',
    name: 'Solibri',
    category: 'Model checking',
    status: 'Planned',
    description: 'Potential import of validation outputs as evidence, reports, or rule-check summaries.',
    nbcUseCase: 'Use model checking results as source evidence inside NBC Evidence Packs and Project Memory.',
    workflowType: 'Report import / future connector',
  },
  {
    id: 'dalux',
    name: 'Dalux',
    category: 'CDE & document platforms',
    status: 'Planned',
    description: 'Potential connection for BIM coordination, field information, and project issue workflows.',
    nbcUseCase: 'Use project issue and model information to support readiness and evidence control.',
    workflowType: 'Future API / file-based workflow first',
  },
  {
    id: 'sharepoint',
    name: 'Microsoft SharePoint',
    category: 'Storage',
    status: 'Planned',
    description: 'Potential document storage and project file access for enterprise teams.',
    nbcUseCase: 'Use controlled files and document evidence for reports, readiness passports, and evidence packs.',
    workflowType: 'Future API / manual upload first',
  },
  {
    id: 'power-bi',
    name: 'Microsoft Power BI',
    category: 'Reporting & analytics',
    status: 'Planned',
    description: 'Potential export or connection for NBC readiness and evidence data.',
    nbcUseCase: 'Support portfolio analytics for readiness, issue trends, and Information Trust.',
    workflowType: 'Data export / future connector',
  },
];

export const researchPillars: ResearchPillar[] = [
  {
    id: 'readiness-passport',
    title: 'Readiness Passport',
    summary: 'How can a project readiness view make model and information state easier to trust before a review or handover?',
  },
  {
    id: 'decision-gates',
    title: 'Decision Gates',
    summary: 'How can milestone checks surface blockers early enough to reduce rework and approval risk?',
  },
  {
    id: 'evidence-pack',
    title: 'Evidence Pack',
    summary: 'How can project evidence be assembled so reviewers can see what was checked, by whom, and with what result?',
  },
  {
    id: 'no-black-box-validation',
    title: 'No Black Box Validation',
    summary: 'How can scoring and verification stay explainable so BIM teams can audit the outcome instead of trusting a hidden result?',
  },
];

export const guideTopics: GuideTopic[] = [
  {
    id: 'readiness-passport',
    title: 'What is a Readiness Passport?',
    summary: 'A concise view of whether the project information is ready for the next control point.',
  },
  {
    id: 'decision-gates',
    title: 'How Decision Gates work',
    summary: 'Decision gates turn checks into a milestone view that highlights blockers and approvals.',
  },
  {
    id: 'evidence-packs',
    title: 'How Evidence Packs support reviews',
    summary: 'Evidence packs bundle readiness, issue context, and review notes into one controlled record.',
  },
  {
    id: 'information-trust',
    title: 'Understanding Information Trust',
    summary: 'Information trust explains whether project data is complete, reliable, and ready to use.',
  },
  {
    id: 'verification-depth',
    title: 'Why verification depth depends on file type',
    summary: 'Different formats allow different levels of checking, so NBC adapts depth to the file in front of it.',
  },
  {
    id: 'cde-compatibility',
    title: 'How NBC works with existing CDEs',
    summary: 'NBC complements current project systems and uses the existing workflow as its source of control.',
  },
  {
    id: 'client-friendly-mode',
    title: 'How client-friendly mode translates BIM information',
    summary: 'Client-friendly views reduce technical noise and show the decision point in clear language.',
  },
];