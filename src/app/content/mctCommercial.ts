import { asLocale, type Locale } from './locale';

export type MctPackageSlug = 'basic' | 'professional' | 'premium' | 'enterprise';

export const mctPackageOrder: MctPackageSlug[] = ['basic', 'professional', 'premium', 'enterprise'];

export type MctNavItem = {
  label: string;
  href: string;
  key: 'overview' | 'pricing' | MctPackageSlug | 'integrations';
};

export type MctPackageDetail = {
  slug: MctPackageSlug;
  name: string;
  eyebrow: string;
  seoTitle: string;
  metaDescription: string;
  shortLabel: string;
  heroTitle: string;
  heroBody: string;
  summary: string;
  priceMonthly: string;
  setupPrice: string;
  priceBasis: string;
  bestFor: string[];
  enables: { title: string; body: string }[];
  features: string[];
  configuration: { label: string; value: string }[];
  proof: string;
  primaryCta: string;
  secondaryCta: string;
};

export type MctPricingCopy = {
  seoTitle: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  body: string;
  monthlyLabel: string;
  setupLabel: string;
  basisLabel: string;
  learnMoreCta: string;
  demoCta: string;
  comparisonEyebrow: string;
  comparisonHeading: string;
  comparisonBody: string;
  noteHeading: string;
  noteBody: string;
  featureRows: {
    feature: string;
    basic: string;
    professional: string;
    premium: string;
    enterprise: string;
  }[];
  finalHeading: string;
  finalBody: string;
};

export type MctIntegrationsCopy = {
  seoTitle: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  body: string;
  primaryCta: string;
  categoriesEyebrow: string;
  categoriesHeading: string;
  categoriesBody: string;
  categories: { title: string; body: string; examples: string[] }[];
  exchangeEyebrow: string;
  exchangeHeading: string;
  exchangeBody: string;
  exchangeOptions: { title: string; body: string }[];
  rulesEyebrow: string;
  rulesHeading: string;
  rulesBody: string;
  rules: { title: string; body: string }[];
  finalHeading: string;
  finalBody: string;
};

const pricingByLocale = {
  en: {
    basic: { monthly: 'Starting price USD 750 / month', setup: 'Setup starting price USD 1,500' },
    professional: { monthly: 'Starting price USD 1,500 / month', setup: 'Setup starting price USD 3,000' },
    premium: { monthly: 'Starting price USD 3,000 / month', setup: 'Setup starting price USD 7,500' },
    enterprise: { monthly: 'Starting price USD 5,000 / month', setup: 'Setup starting price USD 10,000' },
  },
  sv: {
    basic: { monthly: 'Startpris 750 USD / månad', setup: 'Startpris för uppstart 1 500 USD' },
    professional: { monthly: 'Startpris 1 500 USD / månad', setup: 'Startpris för uppstart 3 000 USD' },
    premium: { monthly: 'Startpris 3 000 USD / månad', setup: 'Startpris för uppstart 7 500 USD' },
    enterprise: { monthly: 'Startpris 5 000 USD / månad', setup: 'Startpris för uppstart 10 000 USD' },
  },
  fr: {
    basic: { monthly: 'Prix de départ 750 USD / mois', setup: 'Prix de départ pour la mise en place : 1 500 USD' },
    professional: { monthly: 'Prix de départ 1 500 USD / mois', setup: 'Prix de départ pour la mise en place : 3 000 USD' },
    premium: { monthly: 'Prix de départ 3 000 USD / mois', setup: 'Prix de départ pour la mise en place : 7 500 USD' },
    enterprise: { monthly: 'Prix de départ 5 000 USD / mois', setup: 'Prix de départ pour la mise en place : 10 000 USD' },
  },
  de: {
    basic: { monthly: 'Starting price USD 750 / month', setup: 'Setup starting price USD 1,500' },
    professional: { monthly: 'Starting price USD 1,500 / month', setup: 'Setup starting price USD 3,000' },
    premium: { monthly: 'Starting price USD 3,000 / month', setup: 'Setup starting price USD 7,500' },
    enterprise: { monthly: 'Starting price USD 5,000 / month', setup: 'Setup starting price USD 10,000' },
  },
} satisfies Record<Locale, Record<MctPackageSlug, { monthly: string; setup: string }>>;

const priceBasisByLocale: Record<Locale, string> = {
  en: 'Final pricing depends on users, workflows, transport modes, data volume, document controls, reporting, integrations, and operational support.',
  sv: 'Slutligt pris beror på användare, arbetsflöden, transportslag, datavolym, dokumentkontroller, rapportering, integrationer och operativ support.',
  fr: 'Le prix final dépend des utilisateurs, des flux de travail, des modes de transport, du volume de données, des contrôles documentaires, des rapports, des intégrations et du support opérationnel.',
  de: 'Der endgültige Preis hängt von Nutzern, Workflows, Transportarten, Datenvolumen, Dokumentenkontrollen, Reporting, Integrationen und operativer Unterstützung ab.',
};

const navByLocale: Record<Locale, MctNavItem[]> = {
  en: [
    { key: 'overview', label: 'Overview', href: '/products/mct' },
    { key: 'pricing', label: 'Pricing', href: '/products/mct/pricing' },
    { key: 'basic', label: 'Basic', href: '/products/mct/basic' },
    { key: 'professional', label: 'Professional', href: '/products/mct/professional' },
    { key: 'premium', label: 'Premium', href: '/products/mct/premium' },
    { key: 'enterprise', label: 'Enterprise', href: '/products/mct/enterprise' },
    { key: 'integrations', label: 'Integrations', href: '/products/mct/integrations' },
  ],
  sv: [
    { key: 'overview', label: 'Översikt', href: '/products/mct' },
    { key: 'pricing', label: 'Priser', href: '/products/mct/pricing' },
    { key: 'basic', label: 'Basic', href: '/products/mct/basic' },
    { key: 'professional', label: 'Professional', href: '/products/mct/professional' },
    { key: 'premium', label: 'Premium', href: '/products/mct/premium' },
    { key: 'enterprise', label: 'Enterprise', href: '/products/mct/enterprise' },
    { key: 'integrations', label: 'Integrationer', href: '/products/mct/integrations' },
  ],
  fr: [
    { key: 'overview', label: 'Aperçu', href: '/products/mct' },
    { key: 'pricing', label: 'Tarifs', href: '/products/mct/pricing' },
    { key: 'basic', label: 'Basic', href: '/products/mct/basic' },
    { key: 'professional', label: 'Professional', href: '/products/mct/professional' },
    { key: 'premium', label: 'Premium', href: '/products/mct/premium' },
    { key: 'enterprise', label: 'Enterprise', href: '/products/mct/enterprise' },
    { key: 'integrations', label: 'Intégrations', href: '/products/mct/integrations' },
  ],
  de: [
    { key: 'overview', label: 'Überblick', href: '/products/mct' },
    { key: 'pricing', label: 'Preise', href: '/products/mct/pricing' },
    { key: 'basic', label: 'Basic', href: '/products/mct/basic' },
    { key: 'professional', label: 'Professional', href: '/products/mct/professional' },
    { key: 'premium', label: 'Premium', href: '/products/mct/premium' },
    { key: 'enterprise', label: 'Enterprise', href: '/products/mct/enterprise' },
    { key: 'integrations', label: 'Integrationen', href: '/products/mct/integrations' },
  ],
};

const packageDetailsByLocale: Record<Locale, Record<MctPackageSlug, MctPackageDetail>> = {
  en: {
    basic: {
      slug: 'basic',
      name: 'MCT Basic',
      eyebrow: 'Package page',
      seoTitle: 'MCT Basic | Structured Logistics Control for Small Teams',
      metaDescription: 'MCT Basic helps small logistics teams move from informal coordination to structured transport requests, document storage, simple statuses, and basic reporting.',
      shortLabel: 'Small teams',
      heroTitle: 'A clean starting point for structured logistics coordination.',
      heroBody: 'Basic is for teams that have outgrown chats, folders, and spreadsheets but do not yet need a complex operating setup. It gives them one place to register transport work, keep documents together, and follow simple statuses.',
      summary: 'Move from informal coordination to a more reliable workflow without adding unnecessary complexity.',
      priceMonthly: pricingByLocale.en.basic.monthly,
      setupPrice: pricingByLocale.en.basic.setup,
      priceBasis: priceBasisByLocale.en,
      bestFor: [
        'Small logistics teams starting to organize operations digitally.',
        'Companies that need a central place for requests, documents, and basic status updates.',
        'Early pilots that need structure before scaling to more users, transporters, or routes.',
      ],
      enables: [
        { title: 'Central request records', body: 'Capture route, cargo, timing, client, transporter, and status in one controlled record.' },
        { title: 'Basic document organization', body: 'Store key transport documents in structured categories so teams can find evidence faster.' },
        { title: 'Simple operating visibility', body: 'See active requests, pending documents, assigned tasks, and simple progress indicators.' },
        { title: 'Basic reporting', body: 'Generate practical weekly or monthly summaries for management or client updates.' },
      ],
      features: [
        'Transport request registration',
        'Basic client and transporter records',
        'Document upload and storage',
        'Manual verification checklist',
        'Basic request status tracking',
        'Simple active-request dashboard',
        'Exportable summary report',
        'Email support and onboarding guidance',
      ],
      configuration: [
        { label: 'Users', value: 'Small team access, with final user count defined during setup.' },
        { label: 'Workflows', value: 'Basic statuses, document lists, and simple tasks.' },
        { label: 'Dashboards', value: 'Standard dashboard with limited customization.' },
        { label: 'Support', value: 'Email support and onboarding guidance.' },
      ],
      proof: 'Best when the first priority is discipline: fewer scattered files, clearer status, and a more trustworthy operating record.',
      primaryCta: 'Start with Basic',
      secondaryCta: 'Compare packages',
    },
    professional: {
      slug: 'professional',
      name: 'MCT Professional',
      eyebrow: 'Package page',
      seoTitle: 'MCT Professional | Accountability and Document Control',
      metaDescription: 'MCT Professional supports growing logistics operations with team responsibilities, document control, quote comparison, evidence logs, and operational reporting.',
      shortLabel: 'Growing operations',
      heroTitle: 'Accountability and document control for growing operations.',
      heroBody: 'Professional is for teams coordinating more people, transporters, truck packs, documents, and quotes. It adds stronger responsibility, clearer document follow-up, and a better record of operational decisions.',
      summary: 'Turn basic visibility into accountable coordination for day-to-day logistics work.',
      priceMonthly: pricingByLocale.en.professional.monthly,
      setupPrice: pricingByLocale.en.professional.setup,
      priceBasis: priceBasisByLocale.en,
      bestFor: [
        'Growing coordinators, brokers, or logistics teams managing recurring transport requests.',
        'Operations that need clearer ownership for documents, quotes, and status follow-up.',
        'Teams that need structured reports and evidence logs before work scales further.',
      ],
      enables: [
        { title: 'Team responsibility', body: 'Assign work, clarify ownership, and reduce the “who is handling this?” problem.' },
        { title: 'Transporter and truck records', body: 'Keep transporter profiles, truck details, permit information, and document status in one controlled database.' },
        { title: 'Document control', body: 'Monitor missing files, expiry dates, verification notes, and unresolved document items.' },
        { title: 'Quote coordination', body: 'Compare quotes with readiness, risk, document status, and decision evidence beside each option.' },
      ],
      features: [
        'Everything in Basic',
        'Multi-user workspace and team responsibilities',
        'Transporter and truck database',
        'Truck-pack document control',
        'Document expiry and missing-information alerts',
        'Quote comparison and offer coordination workflow',
        'Evidence log for checks and status changes',
        'Detailed dashboard and exportable reports',
        'Role-based access for internal users',
      ],
      configuration: [
        { label: 'Users', value: 'Growing team access with role-based internal permissions.' },
        { label: 'Workflows', value: 'Request, document, quote, and verification workflows configured around current operations.' },
        { label: 'Dashboards', value: 'Operational dashboard for pending actions, document gaps, and request progress.' },
        { label: 'Support', value: 'Configuration workshop, onboarding, and standard support.' },
      ],
      proof: 'Best when the operation already has volume and needs accountability, not just visibility.',
      primaryCta: 'Explore Professional',
      secondaryCta: 'Compare packages',
    },
    premium: {
      slug: 'premium',
      name: 'MCT Premium',
      eyebrow: 'Package page',
      seoTitle: 'MCT Premium | Partner Portals, Advanced Visibility, and Risk Control',
      metaDescription: 'MCT Premium adds partner portal options, advanced status views, risk flags, custom reports, and stronger management visibility for logistics operations.',
      shortLabel: 'Advanced visibility',
      heroTitle: 'Advanced visibility, partner access, reports, and risk control.',
      heroBody: 'Premium is for established operations that need more than internal coordination. It adds controlled portal options, stronger status views, risk flags, priority document workflows, and management-ready reporting.',
      summary: 'Give managers and partners a clearer view of what is moving, what is blocked, and what needs attention.',
      priceMonthly: pricingByLocale.en.premium.monthly,
      setupPrice: pricingByLocale.en.premium.setup,
      priceBasis: priceBasisByLocale.en,
      bestFor: [
        'Established teams coordinating with clients, partners, or external operators.',
        'Operations that need risk flags, custom reporting, and advanced status visibility.',
        'Teams preparing for integrations, partner portals, or higher management oversight.',
      ],
      enables: [
        { title: 'Partner portal options', body: 'Give selected clients or partners controlled ways to submit information, follow status, or exchange documents.' },
        { title: 'Advanced status visibility', body: 'Track active requests, document health, risk indicators, and operational milestones with clearer management context.' },
        { title: 'Risk control', body: 'Flag missing, expired, inconsistent, or unverified documents before they become operational problems.' },
        { title: 'Custom reports', body: 'Create tailored report templates for internal control, client updates, and management review.' },
      ],
      features: [
        'Everything in Professional',
        'Controlled client or partner portal options',
        'Advanced request and trip-status views',
        'Rule-based workflow status and reminders',
        'Priority document review workflow',
        'Risk flags for missing, expired, or unverified documents',
        'Management dashboards',
        'Custom report templates',
        'Priority support and onboarding session',
        'API-ready export structure for future integrations',
      ],
      configuration: [
        { label: 'Users', value: 'Internal users plus configured external portal access where needed.' },
        { label: 'Workflows', value: 'Advanced request, partner, document, risk, and reporting workflows.' },
        { label: 'Dashboards', value: 'Management dashboards, risk views, and custom report structures.' },
        { label: 'Support', value: 'Priority onboarding, configuration support, and guided review sessions.' },
      ],
      proof: 'Best when coordination must become visible to partners and credible for management.',
      primaryCta: 'Explore Premium',
      secondaryCta: 'Compare packages',
    },
    enterprise: {
      slug: 'enterprise',
      name: 'MCT Enterprise',
      eyebrow: 'Package page',
      seoTitle: 'MCT Enterprise | Custom Logistics Control Tower Deployment',
      metaDescription: 'MCT Enterprise supports custom workflows, integrations, multi-country setup, executive reporting, governance, and SLA options for large logistics operations.',
      shortLabel: 'Custom deployment',
      heroTitle: 'Custom workflows, integrations, multi-country setup, and SLA options.',
      heroBody: 'Enterprise adapts MCT around large or strategic operations. It is for organizations that need governance, custom roles, integrations, multi-country structures, executive reporting, and dedicated implementation.',
      summary: 'Turn MCT into a configured control layer for complex operating models.',
      priceMonthly: pricingByLocale.en.enterprise.monthly,
      setupPrice: pricingByLocale.en.enterprise.setup,
      priceBasis: priceBasisByLocale.en,
      bestFor: [
        'Large organizations with multiple countries, corridors, projects, departments, or subsidiaries.',
        'Operations requiring integrations, governance, security review, SLA options, or executive reporting.',
        'Strategic clients planning a phased rollout across regions, partners, or business units.',
      ],
      enables: [
        { title: 'Enterprise governance', body: 'Standardize roles, permissions, workflow rules, document types, approvals, and reporting standards.' },
        { title: 'Multi-country deployment', body: 'Support operations across countries, corridors, ports, border points, offices, and client structures.' },
        { title: 'Integration planning', body: 'Evaluate ERP, TMS, telematics, document management, reporting, and API connections against technical feasibility.' },
        { title: 'Dedicated implementation', body: 'Plan configuration, training, rollout, support, and SLA options with a dedicated implementation path.' },
      ],
      features: [
        'Everything in Premium',
        'Custom workflow configuration',
        'Multi-country or multi-business-unit setup',
        'Advanced user roles and approval levels',
        'Integration planning with available client systems',
        'Custom dashboards and executive reporting',
        'Dedicated implementation support',
        'Training and change-management package',
        'Service-level agreement options',
        'Private environment or enhanced security options, evaluated per client need',
      ],
      configuration: [
        { label: 'Users', value: 'Large organization access with advanced roles, groups, permissions, and approval structures.' },
        { label: 'Workflows', value: 'Enterprise workflows, governance rules, escalation paths, and audit requirements.' },
        { label: 'Dashboards', value: 'Executive, departmental, corridor, client, and custom operational dashboards.' },
        { label: 'Support', value: 'Dedicated implementation roadmap, SLA options, and optional control-desk support.' },
      ],
      proof: 'Best when MCT needs to become operational infrastructure, not a standalone workspace.',
      primaryCta: 'Discuss Enterprise',
      secondaryCta: 'Compare packages',
    },
  },
  sv: {
    basic: {
      slug: 'basic',
      name: 'MCT Basic',
      eyebrow: 'Paketsida',
      seoTitle: 'MCT Basic | Strukturerad logistikkontroll för små team',
      metaDescription: 'MCT Basic hjälper små logistikteam att gå från informell samordning till strukturerade transportförfrågningar, dokumentlagring, enkla statusar och grundläggande rapportering.',
      shortLabel: 'Små team',
      heroTitle: 'En tydlig startpunkt för strukturerad logistiksamordning.',
      heroBody: 'Basic är för team som har vuxit ur chattar, mappar och kalkylblad men ännu inte behöver en komplex operativ lösning. Paketet ger en plats för transportarbete, dokument och enkla statusar.',
      summary: 'Gå från informell samordning till ett mer tillförlitligt arbetsflöde utan onödig komplexitet.',
      priceMonthly: pricingByLocale.sv.basic.monthly,
      setupPrice: pricingByLocale.sv.basic.setup,
      priceBasis: priceBasisByLocale.sv,
      bestFor: [
        'Små logistikteam som börjar organisera arbetet digitalt.',
        'Företag som behöver en central plats för förfrågningar, dokument och enkla statusuppdateringar.',
        'Tidiga piloter som behöver struktur innan fler användare, transportörer eller rutter läggs till.',
      ],
      enables: [
        { title: 'Centrala förfrågningsposter', body: 'Samla rutt, gods, tid, kund, transportör och status i ett kontrollerat underlag.' },
        { title: 'Grundläggande dokumentordning', body: 'Lagra viktiga transportdokument i tydliga kategorier så att underlag hittas snabbare.' },
        { title: 'Enkel operativ överblick', body: 'Se aktiva förfrågningar, väntande dokument, tilldelade uppgifter och enkla framstegsindikatorer.' },
        { title: 'Grundläggande rapportering', body: 'Skapa praktiska vecko- eller månadsrapporter för ledning eller kunduppdateringar.' },
      ],
      features: [
        'Registrering av transportförfrågningar',
        'Grundläggande kund- och transportörsregister',
        'Dokumentuppladdning och lagring',
        'Manuell verifieringschecklista',
        'Enkel statusuppföljning',
        'Översikt över aktiva förfrågningar',
        'Exporterbar sammanfattningsrapport',
        'E-postsupport och introduktionsstöd',
      ],
      configuration: [
        { label: 'Användare', value: 'Åtkomst för små team, med slutligt antal användare definierat vid uppstart.' },
        { label: 'Arbetsflöden', value: 'Grundläggande statusar, dokumentlistor och enkla uppgifter.' },
        { label: 'Översikter', value: 'Standardöversikt med begränsad anpassning.' },
        { label: 'Support', value: 'E-postsupport och introduktionsstöd.' },
      ],
      proof: 'Passar när första prioritet är disciplin: färre spridda filer, tydligare status och ett mer trovärdigt arbetsunderlag.',
      primaryCta: 'Starta med Basic',
      secondaryCta: 'Jämför paket',
    },
    professional: {
      slug: 'professional',
      name: 'MCT Professional',
      eyebrow: 'Paketsida',
      seoTitle: 'MCT Professional | Ansvar och dokumentkontroll',
      metaDescription: 'MCT Professional stödjer växande logistikverksamheter med teamansvar, dokumentkontroll, offertjämförelse, underlagsloggar och operativ rapportering.',
      shortLabel: 'Växande verksamheter',
      heroTitle: 'Ansvar och dokumentkontroll för växande verksamheter.',
      heroBody: 'Professional är för team som samordnar fler personer, transportörer, lastbilsdokumentation, dokument och offerter. Det lägger till tydligare ansvar, bättre dokumentuppföljning och ett starkare beslutsunderlag.',
      summary: 'Gör grundläggande överblick till ansvarstagande samordning för dagligt logistikarbete.',
      priceMonthly: pricingByLocale.sv.professional.monthly,
      setupPrice: pricingByLocale.sv.professional.setup,
      priceBasis: priceBasisByLocale.sv,
      bestFor: [
        'Växande koordinatorer, mäklare eller logistikteam med återkommande transportförfrågningar.',
        'Verksamheter som behöver tydligare ägarskap för dokument, offerter och statusuppföljning.',
        'Team som behöver strukturerade rapporter och underlagsloggar innan arbetet skalas vidare.',
      ],
      enables: [
        { title: 'Teamansvar', body: 'Tilldela arbete, tydliggör ägarskap och minska frågan om vem som hanterar vad.' },
        { title: 'Transportörs- och fordonsregister', body: 'Samla transportörsprofiler, fordonsdetaljer, tillstånd och dokumentstatus i en kontrollerad databas.' },
        { title: 'Dokumentkontroll', body: 'Följ saknade filer, utgångsdatum, verifieringsnoteringar och olösta dokumentpunkter.' },
        { title: 'Offertsamordning', body: 'Jämför offerter med beredskap, risk, dokumentstatus och beslutsspår bredvid varje alternativ.' },
      ],
      features: [
        'Allt i Basic',
        'Fleranvändararbetsyta och teamansvar',
        'Transportörs- och lastbilsdatabas',
        'Dokumentkontroll för lastbilsdokumentation',
        'Varningar för utgångsdatum och saknad information',
        'Offertjämförelse och erbjudandeflöde',
        'Underlagslogg för kontroller och statusändringar',
        'Detaljerad översikt och exporterbara rapporter',
        'Rollbaserad åtkomst för interna användare',
      ],
      configuration: [
        { label: 'Användare', value: 'Åtkomst för växande team med rollbaserade interna behörigheter.' },
        { label: 'Arbetsflöden', value: 'Förfrågnings-, dokument-, offert- och verifieringsflöden utifrån nuvarande drift.' },
        { label: 'Översikter', value: 'Operativ översikt för väntande åtgärder, dokumentluckor och förfrågningsstatus.' },
        { label: 'Support', value: 'Konfigurationsworkshop, introduktion och standardsupport.' },
      ],
      proof: 'Passar när verksamheten redan har volym och behöver ansvar, inte bara överblick.',
      primaryCta: 'Utforska Professional',
      secondaryCta: 'Jämför paket',
    },
    premium: {
      slug: 'premium',
      name: 'MCT Premium',
      eyebrow: 'Paketsida',
      seoTitle: 'MCT Premium | Partnerportaler, avancerad överblick och riskkontroll',
      metaDescription: 'MCT Premium lägger till partnerportal, avancerade statusvyer, riskflaggor, anpassade rapporter och starkare ledningsöverblick för logistikverksamheter.',
      shortLabel: 'Avancerad överblick',
      heroTitle: 'Avancerad överblick, partneråtkomst, rapporter och riskkontroll.',
      heroBody: 'Premium är för etablerade verksamheter som behöver mer än intern samordning. Det lägger till kontrollerade portalalternativ, starkare statusvyer, riskflaggor, prioriterade dokumentflöden och ledningsklara rapporter.',
      summary: 'Ge ledning och partners en klarare bild av vad som rör sig, vad som blockerar och vad som behöver åtgärdas.',
      priceMonthly: pricingByLocale.sv.premium.monthly,
      setupPrice: pricingByLocale.sv.premium.setup,
      priceBasis: priceBasisByLocale.sv,
      bestFor: [
        'Etablerade team som samordnar med kunder, partners eller externa operatörer.',
        'Verksamheter som behöver riskflaggor, anpassad rapportering och avancerad statusöverblick.',
        'Team som förbereder integrationer, partnerportaler eller starkare ledningsinsyn.',
      ],
      enables: [
        { title: 'Partnerportal', body: 'Ge utvalda kunder eller partners kontrollerade sätt att skicka information, följa status eller utbyta dokument.' },
        { title: 'Avancerad statusöverblick', body: 'Följ aktiva förfrågningar, dokumenthälsa, riskindikatorer och operativa milstolpar med bättre kontext.' },
        { title: 'Riskkontroll', body: 'Flagga saknade, utgångna, inkonsekventa eller overifierade dokument innan de skapar problem.' },
        { title: 'Anpassade rapporter', body: 'Skapa rapportmallar för intern kontroll, kunduppdateringar och ledningsgranskning.' },
      ],
      features: [
        'Allt i Professional',
        'Kontrollerade kund- eller partnerportaler',
        'Avancerade vyer för förfrågningar och transportstatus',
        'Regelbaserade statusar och påminnelser',
        'Prioriterat dokumentgranskningsflöde',
        'Riskflaggor för saknade, utgångna eller overifierade dokument',
        'Ledningsöversikter',
        'Anpassade rapportmallar',
        'Prioriterad support och introduktion',
        'API-redo exportstruktur för framtida integrationer',
      ],
      configuration: [
        { label: 'Användare', value: 'Interna användare plus konfigurerad extern portalåtkomst vid behov.' },
        { label: 'Arbetsflöden', value: 'Avancerade flöden för förfrågningar, partners, dokument, risk och rapportering.' },
        { label: 'Översikter', value: 'Ledningsöversikter, riskvyer och anpassade rapportstrukturer.' },
        { label: 'Support', value: 'Prioriterad introduktion, konfigurationsstöd och vägledda genomgångar.' },
      ],
      proof: 'Passar när samordning behöver bli synlig för partners och trovärdig för ledning.',
      primaryCta: 'Utforska Premium',
      secondaryCta: 'Jämför paket',
    },
    enterprise: {
      slug: 'enterprise',
      name: 'MCT Enterprise',
      eyebrow: 'Paketsida',
      seoTitle: 'MCT Enterprise | Anpassat logistikkontrolltorn',
      metaDescription: 'MCT Enterprise stödjer anpassade arbetsflöden, integrationer, flerländesupplägg, ledningsrapportering, styrning och SLA-alternativ för stora logistikverksamheter.',
      shortLabel: 'Anpassad utrullning',
      heroTitle: 'Anpassade arbetsflöden, integrationer, flerländesupplägg och SLA-alternativ.',
      heroBody: 'Enterprise anpassar MCT kring stora eller strategiska verksamheter. Det är för organisationer som behöver styrning, anpassade roller, integrationer, flerländesstruktur, ledningsrapportering och dedikerad implementation.',
      summary: 'Gör MCT till ett konfigurerat kontrollager för komplexa operativa modeller.',
      priceMonthly: pricingByLocale.sv.enterprise.monthly,
      setupPrice: pricingByLocale.sv.enterprise.setup,
      priceBasis: priceBasisByLocale.sv,
      bestFor: [
        'Stora organisationer med flera länder, korridorer, projekt, avdelningar eller dotterbolag.',
        'Verksamheter som kräver integrationer, styrning, säkerhetsgranskning, SLA-alternativ eller ledningsrapportering.',
        'Strategiska kunder som planerar stegvis utrullning över regioner, partners eller affärsenheter.',
      ],
      enables: [
        { title: 'Enterprise-styrning', body: 'Standardisera roller, behörigheter, arbetsflödesregler, dokumenttyper, godkännanden och rapportering.' },
        { title: 'Flerländesupplägg', body: 'Stöd verksamhet över länder, korridorer, hamnar, gränspunkter, kontor och kundstrukturer.' },
        { title: 'Integrationsplanering', body: 'Utvärdera ERP, TMS, telematik, dokumenthantering, rapportering och API-kopplingar mot teknisk genomförbarhet.' },
        { title: 'Dedikerad implementation', body: 'Planera konfiguration, utbildning, utrullning, support och SLA-alternativ med en dedikerad väg.' },
      ],
      features: [
        'Allt i Premium',
        'Anpassad arbetsflödeskonfiguration',
        'Flerländes- eller affärsenhetsupplägg',
        'Avancerade användarroller och godkännandenivåer',
        'Integrationsplanering med tillgängliga kundsystem',
        'Anpassade översikter och ledningsrapportering',
        'Dedikerat implementeringsstöd',
        'Utbildning och förändringsstöd',
        'SLA-alternativ',
        'Privat miljö eller förstärkta säkerhetsalternativ, utvärderat per kundbehov',
      ],
      configuration: [
        { label: 'Användare', value: 'Storskalig åtkomst med avancerade roller, grupper, behörigheter och godkännanden.' },
        { label: 'Arbetsflöden', value: 'Enterprise-flöden, styrningsregler, eskaleringar och revisionskrav.' },
        { label: 'Översikter', value: 'Lednings-, avdelnings-, korridor-, kund- och specialöversikter.' },
        { label: 'Support', value: 'Dedikerad implementeringsplan, SLA-alternativ och valfritt kontrollstöd.' },
      ],
      proof: 'Passar när MCT ska bli operativ infrastruktur, inte bara en fristående arbetsyta.',
      primaryCta: 'Diskutera Enterprise',
      secondaryCta: 'Jämför paket',
    },
  },
  fr: {
    basic: {
      slug: 'basic',
      name: 'MCT Basic',
      eyebrow: 'Offre MCT',
      seoTitle: 'MCT Basic | Contrôle logistique structuré pour petites équipes',
      metaDescription: 'MCT Basic aide les petites équipes logistiques à passer de la coordination informelle aux demandes structurées, au stockage documentaire, aux statuts simples et aux rapports de base.',
      shortLabel: 'Petites équipes',
      heroTitle: 'Un point de départ clair pour une coordination logistique structurée.',
      heroBody: 'Basic s’adresse aux équipes qui ont dépassé les conversations, dossiers et tableurs, sans avoir encore besoin d’un dispositif opérationnel complexe. Il apporte un seul endroit pour enregistrer le travail transport, garder les documents ensemble et suivre des statuts simples.',
      summary: 'Passer d’une coordination informelle à un flux plus fiable sans complexité inutile.',
      priceMonthly: pricingByLocale.fr.basic.monthly,
      setupPrice: pricingByLocale.fr.basic.setup,
      priceBasis: priceBasisByLocale.fr,
      bestFor: [
        'Petites équipes logistiques qui commencent à organiser leurs opérations numériquement.',
        'Entreprises qui ont besoin d’un lieu central pour demandes, documents et mises à jour simples.',
        'Pilotes initiaux qui ont besoin de structure avant d’ajouter utilisateurs, transporteurs ou routes.',
      ],
      enables: [
        { title: 'Dossiers de demande centralisés', body: 'Capturer itinéraire, cargaison, calendrier, client, transporteur et statut dans un dossier contrôlé.' },
        { title: 'Organisation documentaire de base', body: 'Stocker les documents transport essentiels dans des catégories claires pour retrouver les preuves plus vite.' },
        { title: 'Visibilité opérationnelle simple', body: 'Voir les demandes actives, documents en attente, tâches assignées et indicateurs de progression simples.' },
        { title: 'Rapports de base', body: 'Générer des synthèses hebdomadaires ou mensuelles pour la direction ou les clients.' },
      ],
      features: [
        'Enregistrement des demandes de transport',
        'Dossiers clients et transporteurs de base',
        'Téléversement et stockage documentaire',
        'Liste de contrôle de vérification manuelle',
        'Suivi simple du statut des demandes',
        'Tableau de bord des demandes actives',
        'Rapport de synthèse exportable',
        'Support e-mail et accompagnement de prise en main',
      ],
      configuration: [
        { label: 'Utilisateurs', value: 'Accès pour petite équipe, avec nombre final défini pendant la mise en place.' },
        { label: 'Flux', value: 'Statuts de base, listes de documents et tâches simples.' },
        { label: 'Tableaux de bord', value: 'Tableau de bord standard avec personnalisation limitée.' },
        { label: 'Support', value: 'Support e-mail et accompagnement de prise en main.' },
      ],
      proof: 'Idéal quand la priorité est la discipline: moins de fichiers dispersés, un statut plus clair et un dossier opérationnel plus fiable.',
      primaryCta: 'Commencer avec Basic',
      secondaryCta: 'Comparer les offres',
    },
    professional: {
      slug: 'professional',
      name: 'MCT Professional',
      eyebrow: 'Offre MCT',
      seoTitle: 'MCT Professional | Responsabilité et contrôle documentaire',
      metaDescription: 'MCT Professional soutient les opérations logistiques en croissance avec responsabilités d’équipe, contrôle documentaire, comparaison de devis, journaux de preuve et rapports opérationnels.',
      shortLabel: 'Opérations en croissance',
      heroTitle: 'Responsabilité et contrôle documentaire pour les opérations en croissance.',
      heroBody: 'Professional est destiné aux équipes qui coordonnent plus de personnes, transporteurs, dossiers camion, documents et devis. Il ajoute des responsabilités plus claires, un meilleur suivi documentaire et un meilleur dossier de décision.',
      summary: 'Transformer la visibilité de base en coordination responsable pour le travail logistique quotidien.',
      priceMonthly: pricingByLocale.fr.professional.monthly,
      setupPrice: pricingByLocale.fr.professional.setup,
      priceBasis: priceBasisByLocale.fr,
      bestFor: [
        'Coordinateurs, courtiers ou équipes logistiques en croissance avec demandes récurrentes.',
        'Opérations qui veulent une responsabilité plus claire des documents, devis et suivis de statut.',
        'Équipes qui ont besoin de rapports structurés et de journaux de preuve avant de passer à l’échelle.',
      ],
      enables: [
        { title: 'Responsabilité d’équipe', body: 'Assigner le travail, clarifier les responsabilités et réduire l’incertitude sur qui gère quoi.' },
        { title: 'Dossiers transporteurs et véhicules', body: 'Garder profils transporteurs, détails véhicules, permis et statuts documentaires dans une base contrôlée.' },
        { title: 'Contrôle documentaire', body: 'Suivre fichiers manquants, expirations, notes de vérification et éléments non résolus.' },
        { title: 'Coordination des devis', body: 'Comparer les devis avec disponibilité, risque, statut documentaire et preuve de décision.' },
      ],
      features: [
        'Tout ce qui est inclus dans Basic',
        'Espace multi-utilisateur et responsabilités d’équipe',
        'Base transporteurs et camions',
        'Contrôle documentaire des dossiers camion',
        'Alertes d’expiration et d’information manquante',
        'Flux de comparaison de devis',
        'Journal de preuve pour contrôles et changements de statut',
        'Tableau de bord détaillé et rapports exportables',
        'Accès par rôles pour utilisateurs internes',
      ],
      configuration: [
        { label: 'Utilisateurs', value: 'Accès équipe en croissance avec permissions internes par rôle.' },
        { label: 'Flux', value: 'Flux de demande, document, devis et vérification configurés selon l’opération.' },
        { label: 'Tableaux de bord', value: 'Tableau de bord opérationnel pour actions en attente, écarts documentaires et progression.' },
        { label: 'Support', value: 'Atelier de configuration, prise en main et support standard.' },
      ],
      proof: 'Idéal quand l’opération a déjà du volume et a besoin de responsabilité, pas seulement de visibilité.',
      primaryCta: 'Explorer Professional',
      secondaryCta: 'Comparer les offres',
    },
    premium: {
      slug: 'premium',
      name: 'MCT Premium',
      eyebrow: 'Offre MCT',
      seoTitle: 'MCT Premium | Portails partenaires, visibilité avancée et contrôle du risque',
      metaDescription: 'MCT Premium ajoute des options de portail partenaire, vues de statut avancées, alertes de risque, rapports personnalisés et visibilité managériale renforcée.',
      shortLabel: 'Visibilité avancée',
      heroTitle: 'Visibilité avancée, accès partenaires, rapports et contrôle du risque.',
      heroBody: 'Premium est conçu pour les opérations établies qui ont besoin de plus que la coordination interne. Il ajoute des options de portail contrôlé, des vues de statut plus fortes, des alertes de risque, des flux documentaires prioritaires et des rapports prêts pour la direction.',
      summary: 'Donner aux managers et partenaires une vision claire de ce qui avance, de ce qui bloque et de ce qui demande attention.',
      priceMonthly: pricingByLocale.fr.premium.monthly,
      setupPrice: pricingByLocale.fr.premium.setup,
      priceBasis: priceBasisByLocale.fr,
      bestFor: [
        'Équipes établies qui coordonnent avec clients, partenaires ou opérateurs externes.',
        'Opérations qui ont besoin d’alertes de risque, de rapports personnalisés et de visibilité avancée.',
        'Équipes qui préparent intégrations, portails partenaires ou supervision managériale renforcée.',
      ],
      enables: [
        { title: 'Options de portail partenaire', body: 'Donner à certains clients ou partenaires un accès contrôlé pour soumettre des informations, suivre le statut ou échanger des documents.' },
        { title: 'Visibilité de statut avancée', body: 'Suivre demandes actives, santé documentaire, indicateurs de risque et jalons opérationnels avec plus de contexte.' },
        { title: 'Contrôle du risque', body: 'Signaler les documents manquants, expirés, incohérents ou non vérifiés avant qu’ils créent des problèmes.' },
        { title: 'Rapports personnalisés', body: 'Créer des modèles de rapports pour contrôle interne, mises à jour clients et revue managériale.' },
      ],
      features: [
        'Tout ce qui est inclus dans Professional',
        'Options de portail client ou partenaire contrôlé',
        'Vues avancées des demandes et statuts transport',
        'Statuts et rappels basés sur règles',
        'Flux prioritaire de revue documentaire',
        'Alertes de risque pour documents manquants, expirés ou non vérifiés',
        'Tableaux de bord de gestion',
        'Modèles de rapports personnalisés',
        'Support prioritaire et session de prise en main',
        'Structure d’export prête API pour futures intégrations',
      ],
      configuration: [
        { label: 'Utilisateurs', value: 'Utilisateurs internes plus accès portail externe configuré si nécessaire.' },
        { label: 'Flux', value: 'Flux avancés pour demandes, partenaires, documents, risques et rapports.' },
        { label: 'Tableaux de bord', value: 'Tableaux de bord de gestion, vues de risque et structures de rapport personnalisées.' },
        { label: 'Support', value: 'Prise en main prioritaire, support de configuration et revues guidées.' },
      ],
      proof: 'Idéal quand la coordination doit devenir visible pour les partenaires et crédible pour la direction.',
      primaryCta: 'Explorer Premium',
      secondaryCta: 'Comparer les offres',
    },
    enterprise: {
      slug: 'enterprise',
      name: 'MCT Enterprise',
      eyebrow: 'Offre MCT',
      seoTitle: 'MCT Enterprise | Déploiement de tour de contrôle logistique personnalisé',
      metaDescription: 'MCT Enterprise soutient les flux personnalisés, intégrations, déploiements multi-pays, rapports exécutifs, gouvernance et options SLA pour grandes opérations logistiques.',
      shortLabel: 'Déploiement personnalisé',
      heroTitle: 'Flux personnalisés, intégrations, multi-pays et options SLA.',
      heroBody: 'Enterprise adapte MCT aux opérations larges ou stratégiques. Il s’adresse aux organisations qui ont besoin de gouvernance, rôles personnalisés, intégrations, structures multi-pays, rapports exécutifs et implémentation dédiée.',
      summary: 'Transformer MCT en couche de contrôle configurée pour des modèles opérationnels complexes.',
      priceMonthly: pricingByLocale.fr.enterprise.monthly,
      setupPrice: pricingByLocale.fr.enterprise.setup,
      priceBasis: priceBasisByLocale.fr,
      bestFor: [
        'Grandes organisations avec plusieurs pays, corridors, projets, départements ou filiales.',
        'Opérations nécessitant intégrations, gouvernance, revue de sécurité, options SLA ou rapports exécutifs.',
        'Clients stratégiques planifiant un déploiement progressif par régions, partenaires ou unités.',
      ],
      enables: [
        { title: 'Gouvernance Enterprise', body: 'Standardiser les rôles, permissions, règles de flux de travail, types de documents, validations et standards de rapports.' },
        { title: 'Déploiement multi-pays', body: 'Soutenir les opérations à travers pays, corridors, ports, frontières, bureaux et structures client.' },
        { title: 'Planification des intégrations', body: 'Évaluer ERP, TMS, télématique, gestion documentaire, rapports et API selon la faisabilité technique.' },
        { title: 'Implémentation dédiée', body: 'Planifier configuration, formation, déploiement, support et options SLA avec un parcours dédié.' },
      ],
      features: [
        'Tout ce qui est inclus dans Premium',
        'Configuration de flux personnalisés',
        'Mise en place multi-pays ou multi-unités',
        'Rôles avancés et niveaux d’approbation',
        'Planification d’intégrations avec systèmes client disponibles',
        'Tableaux de bord personnalisés et rapports exécutifs',
        'Support d’implémentation dédié',
        'Formation et accompagnement du changement',
        'Options SLA',
        'Environnement privé ou options sécurité renforcées, évalués selon le besoin client',
      ],
      configuration: [
        { label: 'Utilisateurs', value: 'Accès grande organisation avec rôles, groupes, permissions et validations avancées.' },
        { label: 'Flux', value: 'Flux Enterprise, règles de gouvernance, escalades et exigences d’audit.' },
        { label: 'Tableaux de bord', value: 'Tableaux de bord exécutifs, départementaux, corridor, client et personnalisés.' },
        { label: 'Support', value: 'Feuille de route d’implémentation dédiée, options SLA et support de contrôle optionnel.' },
      ],
      proof: 'Idéal quand MCT doit devenir une infrastructure opérationnelle, pas seulement un espace de travail.',
      primaryCta: 'Discuter Enterprise',
      secondaryCta: 'Comparer les offres',
    },
  },
  de: {
    basic: {
      slug: 'basic',
      name: 'MCT Basic',
      eyebrow: 'Paketseite',
      seoTitle: 'MCT Basic | Strukturierte Logistikkontrolle für kleine Teams',
      metaDescription: 'MCT Basic hilft kleinen Logistikteams, von informeller Koordination zu strukturierten Transportanfragen, Dokumentenablage, einfachen Status und Basisreporting zu wechseln.',
      shortLabel: 'Kleine Teams',
      heroTitle: 'Ein klarer Einstieg in strukturierte Logistikkoordination.',
      heroBody: 'Basic ist für Teams, die Chats, Ordner und Tabellen hinter sich lassen wollen, aber noch keine komplexe Betriebsumgebung brauchen. Es gibt einen Ort für Transportarbeit, Dokumente und einfache Status.',
      summary: 'Von informeller Koordination zu einem zuverlässigeren Workflow wechseln, ohne unnötige Komplexität.',
      priceMonthly: pricingByLocale.de.basic.monthly,
      setupPrice: pricingByLocale.de.basic.setup,
      priceBasis: priceBasisByLocale.de,
      bestFor: [
        'Kleine Logistikteams, die ihre Abläufe digital organisieren wollen.',
        'Unternehmen, die einen zentralen Ort für Anfragen, Dokumente und einfache Statusupdates brauchen.',
        'Frühe Piloten, die Struktur benötigen, bevor weitere Nutzer, Transporteure oder Routen hinzukommen.',
      ],
      enables: [
        { title: 'Zentrale Anfrageakten', body: 'Route, Fracht, Zeitplan, Kunde, Transporteur und Status in einem kontrollierten Datensatz erfassen.' },
        { title: 'Grundlegende Dokumentenordnung', body: 'Wichtige Transportdokumente in klaren Kategorien speichern, damit Nachweise schneller auffindbar sind.' },
        { title: 'Einfache operative Sichtbarkeit', body: 'Aktive Anfragen, ausstehende Dokumente, zugewiesene Aufgaben und einfache Fortschrittsindikatoren sehen.' },
        { title: 'Basisreporting', body: 'Praktische Wochen- oder Monatsberichte für Management oder Kundenupdates erstellen.' },
      ],
      features: [
        'Registrierung von Transportanfragen',
        'Basisdaten für Kunden und Transporteure',
        'Dokumenten-Upload und Ablage',
        'Manuelle Verifizierungscheckliste',
        'Einfache Statusverfolgung',
        'Dashboard für aktive Anfragen',
        'Exportierbarer Kurzbericht',
        'E-Mail-Support und Onboarding-Hilfe',
      ],
      configuration: [
        { label: 'Nutzer', value: 'Zugang für kleine Teams, finale Nutzerzahl wird beim Setup definiert.' },
        { label: 'Workflows', value: 'Grundstatus, Dokumentlisten und einfache Aufgaben.' },
        { label: 'Dashboards', value: 'Standarddashboard mit begrenzter Anpassung.' },
        { label: 'Support', value: 'E-Mail-Support und Onboarding-Hilfe.' },
      ],
      proof: 'Geeignet, wenn die erste Priorität Disziplin ist: weniger verstreute Dateien, klarerer Status und ein vertrauenswürdiger Betriebsdatensatz.',
      primaryCta: 'Mit Basic starten',
      secondaryCta: 'Pakete vergleichen',
    },
    professional: {
      slug: 'professional',
      name: 'MCT Professional',
      eyebrow: 'Paketseite',
      seoTitle: 'MCT Professional | Verantwortlichkeit und Dokumentenkontrolle',
      metaDescription: 'MCT Professional unterstützt wachsende Logistikabläufe mit Teamverantwortung, Dokumentenkontrolle, Angebotsvergleich, Nachweisprotokollen und operativem Reporting.',
      shortLabel: 'Wachsende Abläufe',
      heroTitle: 'Verantwortlichkeit und Dokumentenkontrolle für wachsende Abläufe.',
      heroBody: 'Professional ist für Teams, die mehr Personen, Transporteure, Fahrzeugdokumente, Unterlagen und Angebote koordinieren. Es bringt klarere Verantwortung, bessere Dokumentennachverfolgung und bessere Entscheidungsnachweise.',
      summary: 'Basis-Sichtbarkeit in verantwortliche Koordination für tägliche Logistikarbeit verwandeln.',
      priceMonthly: pricingByLocale.de.professional.monthly,
      setupPrice: pricingByLocale.de.professional.setup,
      priceBasis: priceBasisByLocale.de,
      bestFor: [
        'Wachsende Koordinatoren, Broker oder Logistikteams mit wiederkehrenden Transportanfragen.',
        'Abläufe, die klarere Verantwortlichkeit für Dokumente, Angebote und Statusverfolgung brauchen.',
        'Teams, die strukturierte Berichte und Nachweisprotokolle benötigen, bevor sie weiter skalieren.',
      ],
      enables: [
        { title: 'Teamverantwortung', body: 'Arbeit zuweisen, Ownership klären und Unsicherheit darüber reduzieren, wer was bearbeitet.' },
        { title: 'Transporteur- und Fahrzeugdaten', body: 'Transporteurprofile, Fahrzeugdetails, Genehmigungen und Dokumentstatus in einer kontrollierten Datenbank halten.' },
        { title: 'Dokumentenkontrolle', body: 'Fehlende Dateien, Ablaufdaten, Verifizierungsnotizen und ungelöste Dokumentpunkte verfolgen.' },
        { title: 'Angebotskoordination', body: 'Angebote mit Bereitschaft, Risiko, Dokumentstatus und Entscheidungsnachweisen vergleichen.' },
      ],
      features: [
        'Alles aus Basic',
        'Mehrnutzer-Workspace und Teamverantwortung',
        'Transporteur- und Fahrzeugdatenbank',
        'Dokumentenkontrolle für Fahrzeugpakete',
        'Warnungen für Ablaufdaten und fehlende Informationen',
        'Angebotsvergleich und Angebotsworkflow',
        'Nachweisprotokoll für Prüfungen und Statusänderungen',
        'Detailliertes Dashboard und exportierbare Berichte',
        'Rollenbasierter Zugriff für interne Nutzer',
      ],
      configuration: [
        { label: 'Nutzer', value: 'Zugang für wachsende Teams mit rollenbasierten internen Berechtigungen.' },
        { label: 'Workflows', value: 'Anfrage-, Dokument-, Angebots- und Verifizierungsworkflows nach aktuellem Betrieb.' },
        { label: 'Dashboards', value: 'Operatives Dashboard für ausstehende Aktionen, Dokumentlücken und Anfragefortschritt.' },
        { label: 'Support', value: 'Konfigurationsworkshop, Onboarding und Standardsupport.' },
      ],
      proof: 'Geeignet, wenn der Betrieb bereits Volumen hat und Verantwortlichkeit braucht, nicht nur Sichtbarkeit.',
      primaryCta: 'Professional entdecken',
      secondaryCta: 'Pakete vergleichen',
    },
    premium: {
      slug: 'premium',
      name: 'MCT Premium',
      eyebrow: 'Paketseite',
      seoTitle: 'MCT Premium | Partnerportale, erweiterte Sichtbarkeit und Risikokontrolle',
      metaDescription: 'MCT Premium ergänzt Partnerportaloptionen, erweiterte Statusansichten, Risikoflags, individuelle Berichte und stärkere Managementsichtbarkeit für Logistikabläufe.',
      shortLabel: 'Erweiterte Sichtbarkeit',
      heroTitle: 'Erweiterte Sichtbarkeit, Partnerzugang, Berichte und Risikokontrolle.',
      heroBody: 'Premium ist für etablierte Abläufe, die mehr als interne Koordination brauchen. Es ergänzt kontrollierte Portaloptionen, stärkere Statusansichten, Risikoflags, priorisierte Dokumentenworkflows und managementfähige Berichte.',
      summary: 'Management und Partnern klarer zeigen, was läuft, was blockiert ist und was Aufmerksamkeit braucht.',
      priceMonthly: pricingByLocale.de.premium.monthly,
      setupPrice: pricingByLocale.de.premium.setup,
      priceBasis: priceBasisByLocale.de,
      bestFor: [
        'Etablierte Teams, die mit Kunden, Partnern oder externen Operatoren koordinieren.',
        'Abläufe, die Risikoflags, individuelle Berichte und erweiterte Statussichtbarkeit brauchen.',
        'Teams, die Integrationen, Partnerportale oder stärkere Managementübersicht vorbereiten.',
      ],
      enables: [
        { title: 'Partnerportaloptionen', body: 'Ausgewählten Kunden oder Partnern kontrollierten Zugriff für Informationen, Status oder Dokumentenaustausch geben.' },
        { title: 'Erweiterte Statussichtbarkeit', body: 'Aktive Anfragen, Dokumentengesundheit, Risikoindikatoren und operative Meilensteine mit mehr Kontext verfolgen.' },
        { title: 'Risikokontrolle', body: 'Fehlende, abgelaufene, inkonsistente oder unverifizierte Dokumente markieren, bevor sie operative Probleme werden.' },
        { title: 'Individuelle Berichte', body: 'Berichtsvorlagen für interne Kontrolle, Kundenupdates und Managementreviews erstellen.' },
      ],
      features: [
        'Alles aus Professional',
        'Kontrollierte Kunden- oder Partnerportaloptionen',
        'Erweiterte Anfrage- und Transportstatusansichten',
        'Regelbasierte Status und Erinnerungen',
        'Priorisierter Dokumentenreview',
        'Risikoflags für fehlende, abgelaufene oder unverifizierte Dokumente',
        'Managementdashboards',
        'Individuelle Berichtsvorlagen',
        'Priority Support und Onboarding-Session',
        'API-bereite Exportstruktur für zukünftige Integrationen',
      ],
      configuration: [
        { label: 'Nutzer', value: 'Interne Nutzer plus konfigurierter externer Portalzugang bei Bedarf.' },
        { label: 'Workflows', value: 'Erweiterte Workflows für Anfragen, Partner, Dokumente, Risiken und Reporting.' },
        { label: 'Dashboards', value: 'Managementdashboards, Risikoansichten und individuelle Berichtstrukturen.' },
        { label: 'Support', value: 'Priorisiertes Onboarding, Konfigurationssupport und geführte Reviews.' },
      ],
      proof: 'Geeignet, wenn Koordination für Partner sichtbar und für das Management glaubwürdig werden muss.',
      primaryCta: 'Premium entdecken',
      secondaryCta: 'Pakete vergleichen',
    },
    enterprise: {
      slug: 'enterprise',
      name: 'MCT Enterprise',
      eyebrow: 'Paketseite',
      seoTitle: 'MCT Enterprise | Individuelle Logistics Control Tower Bereitstellung',
      metaDescription: 'MCT Enterprise unterstützt individuelle Workflows, Integrationen, Multi-Country-Setup, Executive Reporting, Governance und SLA-Optionen für große Logistikabläufe.',
      shortLabel: 'Individuelle Bereitstellung',
      heroTitle: 'Individuelle Workflows, Integrationen, Multi-Country-Setup und SLA-Optionen.',
      heroBody: 'Enterprise passt MCT an große oder strategische Abläufe an. Es ist für Organisationen, die Governance, individuelle Rollen, Integrationen, länderübergreifende Strukturen, Executive Reporting und dedizierte Implementierung brauchen.',
      summary: 'MCT zu einer konfigurierten Kontrollebene für komplexe Betriebsmodelle machen.',
      priceMonthly: pricingByLocale.de.enterprise.monthly,
      setupPrice: pricingByLocale.de.enterprise.setup,
      priceBasis: priceBasisByLocale.de,
      bestFor: [
        'Große Organisationen mit mehreren Ländern, Korridoren, Projekten, Abteilungen oder Tochtergesellschaften.',
        'Abläufe mit Integrationen, Governance, Sicherheitsprüfung, SLA-Optionen oder Executive Reporting.',
        'Strategische Kunden, die einen stufenweisen Rollout über Regionen, Partner oder Geschäftseinheiten planen.',
      ],
      enables: [
        { title: 'Enterprise Governance', body: 'Rollen, Berechtigungen, Workflowregeln, Dokumenttypen, Freigaben und Reportingstandards standardisieren.' },
        { title: 'Multi-Country-Bereitstellung', body: 'Abläufe über Länder, Korridore, Häfen, Grenzpunkte, Büros und Kundenstrukturen unterstützen.' },
        { title: 'Integrationsplanung', body: 'ERP, TMS, Telematik, Dokumentenmanagement, Reporting und API-Verbindungen technisch prüfen.' },
        { title: 'Dedizierte Implementierung', body: 'Konfiguration, Training, Rollout, Support und SLA-Optionen mit einem dedizierten Plan vorbereiten.' },
      ],
      features: [
        'Alles aus Premium',
        'Individuelle Workflow-Konfiguration',
        'Multi-Country- oder Multi-Business-Unit-Setup',
        'Erweiterte Nutzerrollen und Freigabeebenen',
        'Integrationsplanung mit verfügbaren Kundensystemen',
        'Individuelle Dashboards und Executive Reporting',
        'Dedizierter Implementierungssupport',
        'Training und Change-Management-Paket',
        'SLA-Optionen',
        'Private Umgebung oder erhöhte Sicherheitsoptionen, je nach Kundenbedarf geprüft',
      ],
      configuration: [
        { label: 'Nutzer', value: 'Zugang für große Organisationen mit erweiterten Rollen, Gruppen, Berechtigungen und Freigaben.' },
        { label: 'Workflows', value: 'Enterprise-Workflows, Governance-Regeln, Eskalationspfade und Audit-Anforderungen.' },
        { label: 'Dashboards', value: 'Executive-, Abteilungs-, Korridor-, Kunden- und individuelle Dashboards.' },
        { label: 'Support', value: 'Dedizierte Implementierungsroadmap, SLA-Optionen und optionaler Control-Desk-Support.' },
      ],
      proof: 'Geeignet, wenn MCT operative Infrastruktur werden soll, nicht nur ein einzelner Workspace.',
      primaryCta: 'Enterprise besprechen',
      secondaryCta: 'Pakete vergleichen',
    },
  },
};

const pricingCopyByLocale: Record<Locale, MctPricingCopy> = {
  en: {
    seoTitle: 'MCT Pricing | Basic, Professional, Premium, and Enterprise',
    metaDescription: 'Compare MCT Basic, Professional, Premium, and Enterprise packages with starting monthly prices, setup ranges, package fit, and control-tower capabilities.',
    eyebrow: 'MCT pricing',
    heading: 'Choose the level of logistics control your operation needs.',
    body: 'MCT pricing is structured around the maturity of the operation: start with visibility, add accountability, expand into partner access and risk control, or configure an enterprise deployment.',
    monthlyLabel: 'Monthly subscription',
    setupLabel: 'One-time setup and customization',
    basisLabel: 'Pricing basis',
    learnMoreCta: 'Learn more',
    demoCta: 'Request a demo',
    comparisonEyebrow: 'Package comparison',
    comparisonHeading: 'A simple way to compare the four MCT packages.',
    comparisonBody: 'Use the table as a starting point. The final setup is confirmed after a product discussion because workflows, users, data, and integrations change the implementation shape.',
    noteHeading: 'Pricing note',
    noteBody: 'The prices shown are starting points in USD. Final pricing is confirmed after scoping users, workflows, document controls, reporting, integrations, and support expectations.',
    featureRows: [
      { feature: 'Best for', basic: 'Small teams', professional: 'Growing operations', premium: 'Established operations', enterprise: 'Large or strategic clients' },
      { feature: 'Primary value', basic: 'Structured visibility', professional: 'Accountability and document control', premium: 'Partner visibility and risk control', enterprise: 'Custom operating infrastructure' },
      { feature: 'Dashboard', basic: 'Standard', professional: 'Operational', premium: 'Management and risk views', enterprise: 'Executive and custom dashboards' },
      { feature: 'Document control', basic: 'Upload and checklist', professional: 'Expiry alerts and evidence log', premium: 'Priority review and risk flags', enterprise: 'Governance rules and audit requirements' },
      { feature: 'Partner access', basic: 'Not included', professional: 'Limited or optional', premium: 'Portal options', enterprise: 'Custom portals and permissions' },
      { feature: 'Integrations', basic: 'Not included', professional: 'Export support', premium: 'API-ready exports', enterprise: 'Integration planning and connectors' },
      { feature: 'Support', basic: 'Standard', professional: 'Onboarding workshop', premium: 'Priority support', enterprise: 'Dedicated roadmap and SLA options' },
    ],
    finalHeading: 'Need help choosing?',
    finalBody: 'A short demo can show whether Basic, Professional, Premium, or Enterprise fits your current logistics workflow.',
  },
  sv: {
    seoTitle: 'MCT-priser | Basic, Professional, Premium och Enterprise',
    metaDescription: 'Jämför MCT Basic, Professional, Premium och Enterprise med startpriser per månad, uppstartsintervall, paketpassning och kontrolltornsfunktioner.',
    eyebrow: 'MCT-priser',
    heading: 'Välj den nivå av logistikkontroll som verksamheten behöver.',
    body: 'MCT-priser är strukturerade efter verksamhetens mognad: börja med överblick, lägg till ansvar, utöka med partneråtkomst och riskkontroll eller konfigurera en Enterprise-lösning.',
    monthlyLabel: 'Månadsprenumeration',
    setupLabel: 'Engångskostnad för uppstart och anpassning',
    basisLabel: 'Prisgrund',
    learnMoreCta: 'Läs mer',
    demoCta: 'Begär demo',
    comparisonEyebrow: 'Paketjämförelse',
    comparisonHeading: 'Ett enkelt sätt att jämföra de fyra MCT-paketen.',
    comparisonBody: 'Använd tabellen som startpunkt. Slutligt upplägg bekräftas efter ett produktsamtal eftersom arbetsflöden, användare, data och integrationer påverkar implementeringen.',
    noteHeading: 'Prisnotering',
    noteBody: 'Priserna visas som startpunkter i USD. Slutligt pris bekräftas efter avgränsning av användare, arbetsflöden, dokumentkontroller, rapportering, integrationer och supportnivå.',
    featureRows: [
      { feature: 'Passar bäst för', basic: 'Små team', professional: 'Växande verksamheter', premium: 'Etablerad drift', enterprise: 'Stora eller strategiska kunder' },
      { feature: 'Primärt värde', basic: 'Strukturerad överblick', professional: 'Ansvar och dokumentkontroll', premium: 'Partneröverblick och riskkontroll', enterprise: 'Anpassad operativ infrastruktur' },
      { feature: 'Översikt', basic: 'Standard', professional: 'Operativ', premium: 'Lednings- och riskvyer', enterprise: 'Lednings- och anpassade översikter' },
      { feature: 'Dokumentkontroll', basic: 'Uppladdning och checklista', professional: 'Utgångsvarningar och underlagslogg', premium: 'Prioriterad granskning och riskflaggor', enterprise: 'Styrningsregler och revisionskrav' },
      { feature: 'Partneråtkomst', basic: 'Ingår inte', professional: 'Begränsad eller valfri', premium: 'Portalalternativ', enterprise: 'Anpassade portaler och behörigheter' },
      { feature: 'Integrationer', basic: 'Ingår inte', professional: 'Exportstöd', premium: 'API-redo exporter', enterprise: 'Integrationsplanering och kopplingar' },
      { feature: 'Support', basic: 'Standard', professional: 'Introduktionsworkshop', premium: 'Prioriterad support', enterprise: 'Dedikerad färdplan och SLA-alternativ' },
    ],
    finalHeading: 'Behöver du hjälp att välja?',
    finalBody: 'En kort demo kan visa om Basic, Professional, Premium eller Enterprise passar ert nuvarande logistikflöde.',
  },
  fr: {
    seoTitle: 'Tarifs MCT | Basic, Professional, Premium et Enterprise',
    metaDescription: 'Comparez MCT Basic, Professional, Premium et Enterprise avec prix mensuels de départ, mise en place, adéquation de l’offre et capacités de tour de contrôle.',
    eyebrow: 'Tarifs MCT',
    heading: 'Choisissez le niveau de contrôle logistique adapté à votre opération.',
    body: 'La tarification MCT suit la maturité opérationnelle : commencer par la visibilité, ajouter la responsabilité, étendre vers l’accès partenaire et le contrôle du risque, ou configurer un déploiement Enterprise.',
    monthlyLabel: 'Abonnement mensuel',
    setupLabel: 'Mise en place et personnalisation initiales',
    basisLabel: 'Base de tarification',
    learnMoreCta: 'En savoir plus',
    demoCta: 'Demander une démo',
    comparisonEyebrow: 'Comparaison des offres',
    comparisonHeading: 'Une manière simple de comparer les quatre offres MCT.',
    comparisonBody: 'Utilisez le tableau comme point de départ. La configuration finale est confirmée après une discussion produit, car les flux de travail, les utilisateurs, les données et les intégrations influencent la mise en œuvre.',
    noteHeading: 'Note tarifaire',
    noteBody: 'Les prix affichés sont des points de départ en USD. Le prix final est confirmé après cadrage des utilisateurs, flux de travail, contrôles documentaires, rapports, intégrations et attentes de support.',
    featureRows: [
      { feature: 'Idéal pour', basic: 'Petites équipes', professional: 'Opérations en croissance', premium: 'Opérations établies', enterprise: 'Grands clients stratégiques' },
      { feature: 'Valeur principale', basic: 'Visibilité structurée', professional: 'Responsabilité et contrôle documentaire', premium: 'Visibilité partenaire et contrôle du risque', enterprise: 'Infrastructure opérationnelle personnalisée' },
      { feature: 'Tableau de bord', basic: 'Standard', professional: 'Opérationnel', premium: 'Direction et vues de risque', enterprise: 'Exécutif et personnalisé' },
      { feature: 'Contrôle documentaire', basic: 'Chargement et liste de contrôle', professional: 'Alertes d’expiration et journal de preuve', premium: 'Revue prioritaire et alertes de risque', enterprise: 'Règles de gouvernance et audit' },
      { feature: 'Accès partenaire', basic: 'Non inclus', professional: 'Limité ou optionnel', premium: 'Options portail', enterprise: 'Portails et permissions personnalisés' },
      { feature: 'Intégrations', basic: 'Non inclus', professional: 'Support export', premium: 'Exports prêts API', enterprise: 'Planification et connecteurs' },
      { feature: 'Support', basic: 'Standard', professional: 'Atelier de prise en main', premium: 'Support prioritaire', enterprise: 'Feuille de route dédiée et options SLA' },
    ],
    finalHeading: 'Besoin d’aide pour choisir ?',
    finalBody: 'Une courte démo peut montrer si Basic, Professional, Premium ou Enterprise correspond à votre flux logistique actuel.',
  },
  de: {
    seoTitle: 'MCT Preise | Basic, Professional, Premium und Enterprise',
    metaDescription: 'Vergleichen Sie MCT Basic, Professional, Premium und Enterprise mit monatlichen Startpreisen, Setup, Paketfit und Control-Tower-Funktionen.',
    eyebrow: 'MCT Preise',
    heading: 'Wählen Sie das Niveau an Logistikkontrolle, das Ihr Betrieb braucht.',
    body: 'MCT-Preise orientieren sich an der Reife des Betriebs: mit Sichtbarkeit starten, Verantwortlichkeit ergänzen, Partnerzugang und Risikokontrolle ausbauen oder Enterprise konfigurieren.',
    monthlyLabel: 'Monatsabonnement',
    setupLabel: 'Einmaliges Setup und Anpassung',
    basisLabel: 'Preisgrundlage',
    learnMoreCta: 'Mehr erfahren',
    demoCta: 'Demo anfragen',
    comparisonEyebrow: 'Paketvergleich',
    comparisonHeading: 'Ein einfacher Vergleich der vier MCT-Pakete.',
    comparisonBody: 'Nutzen Sie die Tabelle als Startpunkt. Das finale Setup wird nach einem Produktgespräch bestätigt, weil Workflows, Nutzer, Daten und Integrationen die Implementierung prägen.',
    noteHeading: 'Preisnotiz',
    noteBody: 'Die angezeigten Preise sind Startpunkte in USD. Der endgültige Preis wird nach Scope von Nutzern, Workflows, Dokumentenkontrollen, Reporting, Integrationen und Support bestätigt.',
    featureRows: [
      { feature: 'Am besten für', basic: 'Kleine Teams', professional: 'Wachsende Abläufe', premium: 'Etablierte Abläufe', enterprise: 'Große oder strategische Kunden' },
      { feature: 'Hauptwert', basic: 'Strukturierte Sichtbarkeit', professional: 'Verantwortlichkeit und Dokumentenkontrolle', premium: 'Partnersichtbarkeit und Risikokontrolle', enterprise: 'Individuelle Betriebsinfrastruktur' },
      { feature: 'Dashboard', basic: 'Standard', professional: 'Operativ', premium: 'Management- und Risikoansichten', enterprise: 'Executive und individuell' },
      { feature: 'Dokumentenkontrolle', basic: 'Upload und Checkliste', professional: 'Ablaufwarnungen und Nachweisprotokoll', premium: 'Priorisierter Review und Risikoflags', enterprise: 'Governance-Regeln und Audit' },
      { feature: 'Partnerzugang', basic: 'Nicht enthalten', professional: 'Begrenzt oder optional', premium: 'Portaloptionen', enterprise: 'Individuelle Portale und Berechtigungen' },
      { feature: 'Integrationen', basic: 'Nicht enthalten', professional: 'Exportunterstützung', premium: 'API-bereite Exporte', enterprise: 'Integrationsplanung und Konnektoren' },
      { feature: 'Support', basic: 'Standard', professional: 'Onboarding-Workshop', premium: 'Priority Support', enterprise: 'Dedizierte Roadmap und SLA-Optionen' },
    ],
    finalHeading: 'Brauchen Sie Hilfe bei der Auswahl?',
    finalBody: 'Eine kurze Demo kann zeigen, ob Basic, Professional, Premium oder Enterprise zu Ihrem aktuellen Logistikworkflow passt.',
  },
};

const integrationsCopyByLocale: Record<Locale, MctIntegrationsCopy> = {
  en: {
    seoTitle: 'MCT Integrations | Data Exchange and Technical Feasibility',
    metaDescription: 'Learn how MCT integrations work across ERP, TMS, telematics, document systems, partner portals, reporting exports, APIs, and technical feasibility rules.',
    eyebrow: 'Technical page',
    heading: 'Integrations that support logistics control without overpromising.',
    body: 'MCT integrations are scoped around the operational record: requests, documents, transporter data, status events, reports, and partner information. Each integration is evaluated for data access, responsibility, security, and real operational value.',
    primaryCta: 'Discuss integration needs',
    categoriesEyebrow: 'Integration categories',
    categoriesHeading: 'Where MCT can connect.',
    categoriesBody: 'MCT can start with structured exports and grow into deeper connections when the source systems and client responsibilities are clear.',
    categories: [
      { title: 'Operations and business systems', body: 'Connect transport, client, finance, or operational records where the client system provides reliable access.', examples: ['ERP', 'TMS', 'Accounting', 'Internal operations databases'] },
      { title: 'Document and evidence systems', body: 'Move document references, verification notes, expiry dates, and evidence packages into a controlled workflow.', examples: ['Document management', 'Permit records', 'Certificate folders', 'Email document intake'] },
      { title: 'Fleet and status data', body: 'Use vehicle, trip, or milestone data where GPS, telematics, or partner systems make the data available.', examples: ['Telematics', 'GPS status', 'Partner milestone updates', 'Port or corridor events'] },
      { title: 'Partner and client access', body: 'Give selected partners controlled ways to submit information, exchange documents, and view approved status.', examples: ['Client portals', 'Transporter portals', 'Partner submission forms', 'Permissioned dashboards'] },
      { title: 'Reporting and intelligence', body: 'Export MCT records into management reporting, KPI dashboards, and operational review packs.', examples: ['CSV exports', 'BI dashboards', 'Monthly reports', 'Executive summaries'] },
    ],
    exchangeEyebrow: 'Data exchange options',
    exchangeHeading: 'Start simple, then deepen the connection.',
    exchangeBody: 'The right integration pattern depends on the client system, the freshness required, the security model, and the operational risk of the workflow.',
    exchangeOptions: [
      { title: 'Structured import and export', body: 'CSV, Excel, and controlled data templates for early rollout, migration, and reporting.' },
      { title: 'API connection', body: 'REST-style data exchange for systems that provide stable authentication, documentation, and ownership.' },
      { title: 'Webhook or event updates', body: 'Status updates can trigger actions when source systems can publish reliable operational events.' },
      { title: 'Document package exchange', body: 'Document packs, references, and evidence files can move through secure storage or agreed file-transfer processes.' },
      { title: 'Custom connector', body: 'Enterprise clients can scope a custom connector after technical discovery and feasibility review.' },
    ],
    rulesEyebrow: 'Feasibility rules',
    rulesHeading: 'Every integration is scoped before it is promised.',
    rulesBody: 'MCT should never imply that an external system, official portal, or partner workflow can be connected without validation.',
    rules: [
      { title: 'Data ownership must be clear', body: 'The client must have the right to access, process, and share the data used by the integration.' },
      { title: 'Source quality matters', body: 'If a source system has incomplete, inconsistent, or delayed data, MCT can only reflect the quality of what is provided.' },
      { title: 'Security comes first', body: 'Authentication, permissions, audit expectations, hosting needs, and sensitive data handling are reviewed before implementation.' },
      { title: 'Operational responsibility stays explicit', body: 'MCT can organize evidence and status, but it does not replace official authorities, customs brokers, insurers, or legal checks.' },
      { title: 'Pilot before scale', body: 'Complex integrations should begin with a limited pilot, measured value, and a clear rollout plan.' },
    ],
    finalHeading: 'Plan the integration around the workflow.',
    finalBody: 'The best integrations are not technical trophies. They remove manual work, strengthen evidence, and make logistics decisions easier to trust.',
  },
  sv: {
    seoTitle: 'MCT-integrationer | Datautbyte och teknisk genomförbarhet',
    metaDescription: 'Läs hur MCT-integrationer fungerar med ERP, TMS, telematik, dokumentsystem, partnerportaler, rapportexporter, API:er och tekniska genomförbarhetsregler.',
    eyebrow: 'Teknisk sida',
    heading: 'Integrationer som stödjer logistikkontroll utan överlöften.',
    body: 'MCT-integrationer avgränsas kring det operativa underlaget: förfrågningar, dokument, transportörsdata, statushändelser, rapporter och partnerinformation. Varje integration utvärderas för dataåtkomst, ansvar, säkerhet och verkligt operativt värde.',
    primaryCta: 'Diskutera integrationer',
    categoriesEyebrow: 'Integrationskategorier',
    categoriesHeading: 'Där MCT kan kopplas samman.',
    categoriesBody: 'MCT kan börja med strukturerade exporter och växa till djupare kopplingar när källsystem och kundansvar är tydliga.',
    categories: [
      { title: 'Operativa system och affärssystem', body: 'Koppla transport-, kund-, ekonomi- eller operativa register när kundsystemet ger tillförlitlig åtkomst.', examples: ['ERP', 'TMS', 'Ekonomi', 'Interna operativa databaser'] },
      { title: 'Dokument- och underlagssystem', body: 'Flytta dokumentreferenser, verifieringsnoteringar, utgångsdatum och underlagspaket in i ett kontrollerat flöde.', examples: ['Dokumenthantering', 'Tillståndsregister', 'Certifikatmappar', 'E-postintag av dokument'] },
      { title: 'Fleet- och statusdata', body: 'Använd fordons-, resa- eller milstolpsdata när GPS, telematik eller partnersystem gör datan tillgänglig.', examples: ['Telematik', 'GPS-status', 'Partneruppdateringar', 'Hamnar eller korridorer'] },
      { title: 'Partner- och kundåtkomst', body: 'Ge utvalda partners kontrollerade sätt att skicka information, utbyta dokument och se godkänd status.', examples: ['Kundportaler', 'Transportörsportaler', 'Partnerformulär', 'Behörighetsstyrda översikter'] },
      { title: 'Rapporter och beslutsstöd', body: 'Exportera MCT-underlag till ledningsrapporter, KPI-översikter och operativa uppföljningar.', examples: ['CSV-exporter', 'BI-översikter', 'Månadsrapporter', 'Ledningssammanfattningar'] },
    ],
    exchangeEyebrow: 'Datautbyte',
    exchangeHeading: 'Börja enkelt och fördjupa kopplingen.',
    exchangeBody: 'Rätt integrationsmönster beror på kundsystemet, önskad aktualitet, säkerhetsmodell och operativ risk.',
    exchangeOptions: [
      { title: 'Strukturerad import och export', body: 'CSV, Excel och kontrollerade datamallar för tidig utrullning, migrering och rapportering.' },
      { title: 'API-koppling', body: 'REST-liknande datautbyte för system med stabil autentisering, dokumentation och ägarskap.' },
      { title: 'Webhook eller händelseuppdateringar', body: 'Statusuppdateringar kan trigga åtgärder när källsystem kan publicera tillförlitliga operativa händelser.' },
      { title: 'Dokumentpaketsutbyte', body: 'Dokumentpaket, referenser och underlagsfiler kan flyttas via säker lagring eller överenskommen filöverföring.' },
      { title: 'Anpassad koppling', body: 'Enterprise-kunder kan avgränsa en anpassad koppling efter teknisk kartläggning och genomförbarhetsgranskning.' },
    ],
    rulesEyebrow: 'Genomförbarhetsregler',
    rulesHeading: 'Varje integration avgränsas innan den utlovas.',
    rulesBody: 'MCT ska aldrig antyda att ett externt system, officiell portal eller partnerflöde kan kopplas utan validering.',
    rules: [
      { title: 'Dataägarskap måste vara tydligt', body: 'Kunden måste ha rätt att komma åt, behandla och dela den data som används av integrationen.' },
      { title: 'Källkvalitet spelar roll', body: 'Om källsystemet har ofullständig, inkonsekvent eller försenad data kan MCT bara spegla den kvalitet som tillhandahålls.' },
      { title: 'Säkerhet först', body: 'Autentisering, behörigheter, revisionskrav, driftbehov och känslig data granskas innan implementation.' },
      { title: 'Operativt ansvar är tydligt', body: 'MCT kan organisera underlag och status men ersätter inte myndigheter, tullmäklare, försäkringsgivare eller juridiska kontroller.' },
      { title: 'Pilot före uppskalning', body: 'Komplexa integrationer bör börja med en begränsad pilot, mätt värde och tydlig utrullningsplan.' },
    ],
    finalHeading: 'Planera integrationen kring arbetsflödet.',
    finalBody: 'De bästa integrationerna är inte tekniska troféer. De tar bort manuellt arbete, stärker underlag och gör logistikbeslut lättare att lita på.',
  },
  fr: {
    seoTitle: 'Intégrations MCT | Échange de données et faisabilité technique',
    metaDescription: 'Découvrez comment fonctionnent les intégrations MCT avec ERP, TMS, télématique, systèmes documentaires, portails partenaires, exports de rapports, API et règles de faisabilité.',
    eyebrow: 'Page technique',
    heading: 'Des intégrations qui soutiennent le contrôle logistique sans surpromettre.',
    body: 'Les intégrations MCT sont cadrées autour du dossier opérationnel: demandes, documents, données transporteurs, événements de statut, rapports et informations partenaires. Chaque intégration est évaluée selon l’accès aux données, la responsabilité, la sécurité et la valeur opérationnelle réelle.',
    primaryCta: 'Discuter des intégrations',
    categoriesEyebrow: 'Catégories d’intégration',
    categoriesHeading: 'Où MCT peut se connecter.',
    categoriesBody: 'MCT peut commencer par des exports structurés et évoluer vers des connexions plus profondes lorsque les systèmes sources et les responsabilités client sont clairs.',
    categories: [
      { title: 'Systèmes opérationnels et métier', body: 'Connecter dossiers transport, clients, finance ou opérations lorsque le système client offre un accès fiable.', examples: ['ERP', 'TMS', 'Comptabilité', 'Bases opérationnelles internes'] },
      { title: 'Systèmes documentaires et preuves', body: 'Faire entrer références documentaires, notes de vérification, dates d’expiration et paquets de preuves dans un flux contrôlé.', examples: ['Gestion documentaire', 'Registres de permis', 'Dossiers certificats', 'Entrée documents par e-mail'] },
      { title: 'Données flotte et statut', body: 'Utiliser données véhicule, trajet ou jalon lorsque GPS, télématique ou systèmes partenaires les rendent disponibles.', examples: ['Télématique', 'Statut GPS', 'Mises à jour partenaires', 'Événements port ou corridor'] },
      { title: 'Accès partenaires et clients', body: 'Donner à certains partenaires des moyens contrôlés de soumettre des informations, d’échanger des documents et de consulter les statuts approuvés.', examples: ['Portails clients', 'Portails transporteurs', 'Formulaires partenaires', 'Tableaux de bord avec accès limité'] },
      { title: 'Rapports et aide à la décision', body: 'Exporter les dossiers MCT vers des rapports de gestion, des tableaux de bord KPI et des revues opérationnelles.', examples: ['Exports CSV', 'Tableaux de bord BI', 'Rapports mensuels', 'Synthèses pour la direction'] },
    ],
    exchangeEyebrow: 'Options d’échange',
    exchangeHeading: 'Commencer simplement, puis approfondir la connexion.',
    exchangeBody: 'Le bon modèle dépend du système client, de la fraîcheur nécessaire, du modèle de sécurité et du risque opérationnel.',
    exchangeOptions: [
      { title: 'Import et export structurés', body: 'CSV, Excel et modèles de données contrôlés pour le déploiement initial, la migration et les rapports.' },
      { title: 'Connexion API', body: 'Échange de données de type REST pour les systèmes avec authentification, documentation et propriété clairement établies.' },
      { title: 'Webhook ou événements', body: 'Les statuts peuvent déclencher des actions lorsque les systèmes sources publient des événements fiables.' },
      { title: 'Échange de paquets documentaires', body: 'Paquets, références et fichiers de preuve peuvent passer par stockage sécurisé ou transfert convenu.' },
      { title: 'Connecteur personnalisé', body: 'Les clients Enterprise peuvent cadrer un connecteur après une analyse technique et une revue de faisabilité.' },
    ],
    rulesEyebrow: 'Règles de faisabilité',
    rulesHeading: 'Chaque intégration est cadrée avant d’être promise.',
    rulesBody: 'MCT ne doit jamais laisser entendre qu’un système externe, portail officiel ou flux partenaire peut être connecté sans validation.',
    rules: [
      { title: 'La propriété des données doit être claire', body: 'Le client doit avoir le droit d’accéder, traiter et partager les données utilisées par l’intégration.' },
      { title: 'La qualité source compte', body: 'Si le système source est incomplet, incohérent ou retardé, MCT ne peut refléter que la qualité fournie.' },
      { title: 'La sécurité d’abord', body: 'Authentification, permissions, audit, hébergement et données sensibles sont revus avant implémentation.' },
      { title: 'La responsabilité opérationnelle reste explicite', body: 'MCT organise preuves et statuts mais ne remplace pas autorités, courtiers douane, assureurs ou contrôles juridiques.' },
      { title: 'Piloter avant de déployer', body: 'Les intégrations complexes doivent commencer par un pilote limité, une valeur mesurée et un plan clair.' },
    ],
    finalHeading: 'Planifier l’intégration autour du flux de travail.',
    finalBody: 'Les meilleures intégrations ne sont pas des trophées techniques. Elles retirent du travail manuel, renforcent les preuves et rendent les décisions logistiques plus fiables.',
  },
  de: {
    seoTitle: 'MCT Integrationen | Datenaustausch und technische Machbarkeit',
    metaDescription: 'Erfahren Sie, wie MCT-Integrationen mit ERP, TMS, Telematik, Dokumentensystemen, Partnerportalen, Reporting-Exporten, APIs und Machbarkeitsregeln funktionieren.',
    eyebrow: 'Technische Seite',
    heading: 'Integrationen, die Logistikkontrolle stärken, ohne zu viel zu versprechen.',
    body: 'MCT-Integrationen werden um den operativen Datensatz herum gescoped: Anfragen, Dokumente, Transporteurdaten, Statusereignisse, Berichte und Partnerinformationen. Jede Integration wird auf Datenzugang, Verantwortung, Sicherheit und echten operativen Wert geprüft.',
    primaryCta: 'Integrationsbedarf besprechen',
    categoriesEyebrow: 'Integrationskategorien',
    categoriesHeading: 'Wo MCT angebunden werden kann.',
    categoriesBody: 'MCT kann mit strukturierten Exporten starten und in tiefere Verbindungen wachsen, wenn Quellsysteme und Kundenverantwortung klar sind.',
    categories: [
      { title: 'Operations- und Geschäftssysteme', body: 'Transport-, Kunden-, Finanz- oder Betriebsdaten anbinden, wenn das Kundensystem zuverlässigen Zugang bietet.', examples: ['ERP', 'TMS', 'Accounting', 'Interne Betriebsdatenbanken'] },
      { title: 'Dokumenten- und Nachweissysteme', body: 'Dokumentenreferenzen, Verifizierungsnotizen, Ablaufdaten und Nachweispakete in einen kontrollierten Workflow bringen.', examples: ['Dokumentenmanagement', 'Genehmigungsdaten', 'Zertifikatsordner', 'Dokumenteneingang per E-Mail'] },
      { title: 'Flotten- und Statusdaten', body: 'Fahrzeug-, Reise- oder Meilensteindaten nutzen, wenn GPS, Telematik oder Partnersysteme sie verfügbar machen.', examples: ['Telematik', 'GPS-Status', 'Partner-Meilensteine', 'Hafen- oder Korridorereignisse'] },
      { title: 'Partner- und Kundenzugang', body: 'Ausgewählten Partnern kontrollierte Wege für Informationen, Dokumentenaustausch und freigegebene Status geben.', examples: ['Kundenportale', 'Transporteurportale', 'Partnerformulare', 'Berechtigte Dashboards'] },
      { title: 'Reporting und Intelligence', body: 'MCT-Datensätze in Managementreporting, KPI-Dashboards und operative Reviews exportieren.', examples: ['CSV-Exporte', 'BI-Dashboards', 'Monatsberichte', 'Executive Summaries'] },
    ],
    exchangeEyebrow: 'Datenaustausch',
    exchangeHeading: 'Einfach starten, dann vertiefen.',
    exchangeBody: 'Das richtige Integrationsmuster hängt vom Kundensystem, Aktualitätsbedarf, Sicherheitsmodell und operativen Risiko ab.',
    exchangeOptions: [
      { title: 'Strukturierter Import und Export', body: 'CSV, Excel und kontrollierte Datenvorlagen für frühen Rollout, Migration und Reporting.' },
      { title: 'API-Verbindung', body: 'REST-ähnlicher Datenaustausch für Systeme mit stabiler Authentifizierung, Dokumentation und Ownership.' },
      { title: 'Webhook- oder Event-Updates', body: 'Statusupdates können Aktionen auslösen, wenn Quellsysteme zuverlässige operative Ereignisse bereitstellen.' },
      { title: 'Dokumentenpaket-Austausch', body: 'Dokumentenpakete, Referenzen und Nachweisdateien können über sichere Ablage oder vereinbarte Dateiübertragung laufen.' },
      { title: 'Individueller Connector', body: 'Enterprise-Kunden können nach technischer Discovery und Machbarkeitsprüfung einen Connector scopen.' },
    ],
    rulesEyebrow: 'Machbarkeitsregeln',
    rulesHeading: 'Jede Integration wird gescoped, bevor sie versprochen wird.',
    rulesBody: 'MCT sollte nie suggerieren, dass ein externes System, offizielles Portal oder Partnerworkflow ohne Prüfung angebunden werden kann.',
    rules: [
      { title: 'Datenownership muss klar sein', body: 'Der Kunde muss das Recht haben, die für die Integration genutzten Daten zuzugreifen, zu verarbeiten und zu teilen.' },
      { title: 'Quellqualität zählt', body: 'Wenn ein Quellsystem unvollständige, inkonsistente oder verspätete Daten hat, kann MCT nur die bereitgestellte Qualität spiegeln.' },
      { title: 'Sicherheit zuerst', body: 'Authentifizierung, Berechtigungen, Audit-Erwartungen, Hosting und sensible Daten werden vor Umsetzung geprüft.' },
      { title: 'Operative Verantwortung bleibt klar', body: 'MCT kann Nachweise und Status organisieren, ersetzt aber keine Behörden, Zollbroker, Versicherer oder Rechtsprüfungen.' },
      { title: 'Pilot vor Skalierung', body: 'Komplexe Integrationen sollten mit begrenztem Pilot, gemessenem Wert und klarem Rolloutplan starten.' },
    ],
    finalHeading: 'Die Integration am Workflow planen.',
    finalBody: 'Die besten Integrationen sind keine technischen Trophäen. Sie entfernen manuelle Arbeit, stärken Nachweise und machen Logistikentscheidungen vertrauenswürdiger.',
  },
};

export function getMctNav(locale: string): MctNavItem[] {
  return navByLocale[asLocale(locale)];
}

export function getMctPricing(locale: string): MctPricingCopy {
  return pricingCopyByLocale[asLocale(locale)];
}

export function getMctPackages(locale: string): MctPackageDetail[] {
  const packages = packageDetailsByLocale[asLocale(locale)];
  return mctPackageOrder.map((slug) => packages[slug]);
}

export function getMctPackage(locale: string, slug: string): MctPackageDetail | null {
  if (!mctPackageOrder.includes(slug as MctPackageSlug)) return null;
  return packageDetailsByLocale[asLocale(locale)][slug as MctPackageSlug];
}

export function getMctIntegrations(locale: string): MctIntegrationsCopy {
  return integrationsCopyByLocale[asLocale(locale)];
}
