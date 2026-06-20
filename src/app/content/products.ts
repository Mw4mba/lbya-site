// Product content layer (locale-aware). EN is the authored source of truth
// (docs/LBYA_Content_Critique.md section 6). SV/FR/DE are machine translations,
// flagged for human review. Deep MCT reference tables (modules, problems,
// packages feature bullets, matrix) currently fall back to EN in non-EN locales;
// translating them is the remaining machine-translation batch. Access via getMct/getNbc/getProducts.
import type { Locale } from './locale';
import { asLocale } from './locale';

/** Live deployment of the Malaika Control Tower logistics platform. */
export const LIVE_MCT_URL = 'https://www.jaridafrica.com';

export interface ProductSummary {
  slug: string;
  name: string;
  acronym: string;
  status?: string;
  tagline: string;
  cardCopy: string;
  href: string;
  image: string;
  logo?: string;
  primaryCta: { label: string; href: string };
  liveCta?: { label: string; href: string };
}

export interface ProblemResponse { problem: string; response: string }
export interface ProductModule { name: string; explanation: string }
export interface PackageTier { name: string; bestFor: string; positioning: string; features: string[]; cta: string }
export interface MatrixRow { feature: string; basic: string; professional: string; premium: string; enterprise: string }
export interface NbcSection { title: string; body: string }

const MCT_IMAGE = '/hero-logistics-route.jpg';
const MCT_LOGO = '/images/products/mct-logo-current.png';
const NBC_IMAGE = '/Website/2eff78f1-25dd-4e64-8868-938ea919ab70.png';
const NBC_LOGO = '/images/products/nbc-logo.png';

// ---------------------------------------------------------------------------
// Product summaries (homepage showcase and /products overview) - fully localised
// ---------------------------------------------------------------------------

const productsByLocale: Record<Locale, ProductSummary[]> = {
  en: [
    { slug: 'mct', name: 'Malaika Control Tower', acronym: 'MCT', status: 'Ready product', tagline: 'A logistics control tower for African multimodal operations.', cardCopy: 'MCT is commercially ready and already used by JARIDAFRICA on the Enterprise Premium subscription. It brings shipment requests, transporter records, document verification, quotes, corridor status, and decision evidence into one structured logistics environment.', href: '/products/mct', image: MCT_IMAGE, logo: MCT_LOGO, primaryCta: { label: 'Explore MCT', href: '/products/mct' }, liveCta: { label: 'View JARIDAFRICA platform', href: LIVE_MCT_URL } },
    { slug: 'nayeli-bim-control', name: 'Nayeli BIM Control', acronym: 'NBC', status: 'Early-stage development', tagline: 'BIM control built for clarity, accountability, and trust.', cardCopy: 'NBC is in early development. It is being shaped around BIM information control: requirements, model quality, issue ownership, evidence, and decision readiness.', href: '/products/nayeli-bim-control', image: NBC_IMAGE, logo: NBC_LOGO, primaryCta: { label: 'Discover NBC', href: '/products/nayeli-bim-control' } },
  ],
  sv: [
    { slug: 'mct', name: 'Malaika Control Tower', acronym: 'MCT', status: 'Färdig produkt', tagline: 'Ett logistiskt kontrolltorn för afrikanska multimodala operationer.', cardCopy: 'MCT är kommersiellt redo och används redan av JARIDAFRICA med Enterprise Premium. Det samlar transportförfrågningar, transportörsregister, dokumentverifiering, offerter, korridorstatus och beslutsunderlag i en strukturerad logistikmiljö.', href: '/products/mct', image: MCT_IMAGE, logo: MCT_LOGO, primaryCta: { label: 'Utforska MCT', href: '/products/mct' }, liveCta: { label: 'Visa JARIDAFRICA-plattformen', href: LIVE_MCT_URL } },
    { slug: 'nayeli-bim-control', name: 'Nayeli BIM Control', acronym: 'NBC', status: 'Tidigt utvecklingsskede', tagline: 'BIM-kontroll byggd för tydlighet, ansvar och tillit.', cardCopy: 'NBC är i tidig utveckling. Produkten formas kring BIM-informationskontroll: krav, modellkvalitet, ärendeansvar, underlag och beslutsberedskap.', href: '/products/nayeli-bim-control', image: NBC_IMAGE, logo: NBC_LOGO, primaryCta: { label: 'Upptäck NBC', href: '/products/nayeli-bim-control' } },
  ],
  fr: [
    { slug: 'mct', name: 'Malaika Control Tower', acronym: 'MCT', status: 'Produit prêt', tagline: 'Une tour de contrôle logistique pour les opérations multimodales africaines.', cardCopy: "MCT est commercialement prêt et déjà utilisé par JARIDAFRICA avec Enterprise Premium. Il réunit demandes d'expédition, dossiers transporteurs, vérification documentaire, devis, statut de corridor et preuves de décision dans un environnement logistique structuré.", href: '/products/mct', image: MCT_IMAGE, logo: MCT_LOGO, primaryCta: { label: 'Explorer MCT', href: '/products/mct' }, liveCta: { label: 'Voir la plateforme JARIDAFRICA', href: LIVE_MCT_URL } },
    { slug: 'nayeli-bim-control', name: 'Nayeli BIM Control', acronym: 'NBC', status: 'Développement initial', tagline: 'Contrôle BIM conçu pour la clarté, la responsabilité et la confiance.', cardCopy: "NBC est en phase de développement initial. Le produit se construit autour du contrôle de l'information BIM : exigences, qualité du modèle, responsabilité des points à traiter, preuves et préparation à la décision.", href: '/products/nayeli-bim-control', image: NBC_IMAGE, logo: NBC_LOGO, primaryCta: { label: 'Découvrir NBC', href: '/products/nayeli-bim-control' } },
  ],
  de: [
    { slug: 'mct', name: 'Malaika Control Tower', acronym: 'MCT', status: 'Fertiges Produkt', tagline: 'Ein logistischer Control Tower für afrikanische multimodale Abläufe.', cardCopy: 'MCT ist kommerziell bereit und wird bereits von JARIDAFRICA mit Enterprise Premium genutzt. Es bündelt Sendungsanfragen, Transporteurdaten, Dokumentenverifizierung, Angebote, Korridorstatus und Entscheidungsnachweise in einer strukturierten Logistikumgebung.', href: '/products/mct', image: MCT_IMAGE, logo: MCT_LOGO, primaryCta: { label: 'MCT entdecken', href: '/products/mct' }, liveCta: { label: 'JARIDAFRICA-Plattform ansehen', href: LIVE_MCT_URL } },
    { slug: 'nayeli-bim-control', name: 'Nayeli BIM Control', acronym: 'NBC', status: 'Frühe Entwicklungsphase', tagline: 'BIM-Kontrolle für Klarheit, Verantwortung und Vertrauen.', cardCopy: 'NBC befindet sich in früher Entwicklung. Das Produkt wird rund um BIM-Informationskontrolle aufgebaut: Anforderungen, Modellqualität, Themenverantwortung, Nachweise und Entscheidungsreife.', href: '/products/nayeli-bim-control', image: NBC_IMAGE, logo: NBC_LOGO, primaryCta: { label: 'NBC entdecken', href: '/products/nayeli-bim-control' } },
  ],
};

export function getProducts(locale: string): ProductSummary[] {
  return productsByLocale[asLocale(locale)];
}

// ---------------------------------------------------------------------------
// Malaika Control Tower (MCT) - EN base
// ---------------------------------------------------------------------------

const mctEN = {
  slug: 'mct',
  name: 'Malaika Control Tower',
  acronym: 'MCT',
  seoTitle: 'Malaika Control Tower | Logistics Control Tower Platform',
  metaDescription: 'MCT is a digital logistics control-tower platform for African multimodal transport coordination, document verification, shipment visibility, and operational reporting.',
  tagline: 'A logistics control tower for African multimodal operations.',
  heroImage: MCT_IMAGE,
  logo: MCT_LOGO,
  hero: 'MCT brings shipment visibility, document verification, coordination, and logistics reporting into one digital environment. It turns fragmented transport operations into structured workflows, clear decisions, and reliable evidence.',
  primaryCta: { label: 'Request a demo', href: '/contact' },
  secondaryCta: { label: 'Book a product discussion', href: '/contact' },
  liveCta: { label: 'Visit the live platform', href: LIVE_MCT_URL },
  honestStatus: 'MCT is ready and available for demo requests. JARIDAFRICA currently uses MCT with the Enterprise Premium subscription.',
  packagesIntro: 'Choose the level of control that fits your operation. A demo can help you see which package makes sense for your team.',
  whatIs: [
    'MCT is a digital logistics control-tower platform designed to monitor, verify, coordinate, and report transport operations from one structured environment.',
    'It can be configured for African road freight, sea freight, rail-ready handovers, cross-border corridor coordination, document control, compliance workflows, issue management, and operational intelligence.',
    'The result is a professional logistics layer where every request, shipment, document, transporter record, quote, status update, approval, and decision is easier to track, review, and trust.',
  ],
  isNot: [
    'It is not an ERP, accounting system, customs broker, freight forwarder, insurer, or legal due-diligence provider.',
    'It does not guarantee customs clearance, border crossing, payment security, live GPS visibility, or official approval unless those features and responsibilities are formally implemented.',
    'It is a logistics control layer that organizes evidence, responsibilities, status, workflows, and reports so teams can make better transport decisions.',
    'It can grow through integrations, partnerships, configuration, and enterprise workflows.',
  ],
  audiences: [
    { title: 'Cargo owners and clients', detail: 'who need clearer visibility and structure when requesting transport.' },
    { title: 'Transport coordinators', detail: 'who manage quotes, transporters, documents, and daily operational communication.' },
    { title: 'Transporters and fleet partners', detail: 'who need a professional way to present availability, documents, and service status.' },
    { title: 'Ports, agents, and corridor partners', detail: 'who need clearer document status, stakeholder records, border updates, and operational evidence.' },
    { title: 'Mining, industrial, and commodity teams', detail: 'that need stronger control over shipments, documents, corridors, and management reporting.' },
    { title: 'Enterprise logistics operators', detail: 'who need custom roles, dashboards, workflows, approvals, integrations, and scale-ready governance.' },
  ],
  problems: [
    { problem: 'Transport requests are scattered across WhatsApp, email, calls, and spreadsheets.', response: 'Requests move into one controlled workflow with clear statuses, contacts, and actions.' },
    { problem: 'Truck and transporter documents are difficult to verify and organise.', response: 'Transporter profiles, truck packs, and document expiry dates live in one place, with verification notes attached to each.' },
    { problem: 'Quote negotiation and margin management are hard to track.', response: 'Organised quote comparisons and offer history keep coordination tidy, without exposing sensitive margin logic.' },
    { problem: 'The operational status is hard to see.', response: 'A dashboard shows the request stage, document status, assigned owner, and coordination progress.' },
    { problem: 'Evidence is lost in chats and folders.', response: 'Documents, checks, and decisions are recorded against the request for later review.' },
    { problem: 'Clients need trust, but the process often feels informal.', response: 'A more professional and traceable environment supports every step of coordination.' },
  ] as ProblemResponse[],
  workflow: [
    { stage: 'Create shipment request', detail: 'Client enters route, cargo type, destination, timing, and service needs.' },
    { stage: 'Invite or select transporters', detail: 'MCT organises transporter options, availability, and status.' },
    { stage: 'Upload truck pack', detail: 'Transporter uploads C-BRTA permit, truck documents, driver documents, insurance, and related evidence.' },
    { stage: 'Verify documents', detail: 'Completeness, expiry, mismatches, and official portal or QR verification are prioritised.' },
    { stage: 'Compare quotes', detail: 'Client or coordinator reviews options with price, risk, document status, and readiness.' },
    { stage: 'Track status', detail: 'Shipment moves through quote, assigned, loading, border, delivered, and closed stages.' },
    { stage: 'Export report', detail: 'MCT produces evidence and summary reports for internal control or client review.' },
  ],
  modules: [
    { name: 'Request management', explanation: 'Capture transport requests in a structured format: origin and destination, cargo details, timeline, client details, and operational requirements.' },
    { name: 'Client and partner profiles', explanation: 'Maintain organised records for clients, transporters, fleet partners, and operational contacts.' },
    { name: 'Transporter and truck verification', explanation: 'Organise transporter documents, truck packs, permits, expiry dates, and verification notes, with support for verification rather than an automatic guarantee.' },
    { name: 'Document control', explanation: 'Store, classify, and review key documents linked to a request, truck, transporter, or operation.' },
    { name: 'Quote and offer coordination', explanation: 'Compare transport options, manage quote history, and coordinate internally before presenting offers.' },
    { name: 'Operational status tracking', explanation: 'Track each request through inquiry, coordination, confirmation, execution, completion, and review.' },
    { name: 'Evidence and audit trail', explanation: 'Keep a structured record of key checks, documents, decisions, and status changes.' },
    { name: 'Dashboard and reporting', explanation: 'Give coordinators and managers a clearer overview of active requests, pending actions, and verification status.' },
    { name: 'Partner and client portal', explanation: 'Provide controlled access for selected clients or partners to submit information, follow status, or exchange documents.' },
    { name: 'Future integrations', explanation: 'Designed to integrate with tools such as GPS and telematics, accounting, and ERP or TMS systems over time.' },
  ] as ProductModule[],
  trustLine: 'MCT emphasises official verification and evidence-based document control. If a document does not match the official portal or QR verification, its status stays unresolved until the issue is corrected.',
  packages: [
    { name: 'MCT Basic', bestFor: 'Small teams and early users replacing informal coordination with a clean starting point.', positioning: 'Start with the essentials. Register transport requests, store key documents, track basic status, and build a more professional workflow without added complexity.', features: ['Transport request registration', 'Basic client and transporter records', 'Document upload and storage', 'Manual verification checklist', 'Basic request status tracking', 'Simple dashboard for active requests', 'Exportable summary report', 'Standard support'], cta: 'Request a demo' },
    { name: 'MCT Professional', bestFor: 'Growing coordinators and brokers managing multiple users, transporters, trucks, and quotes.', positioning: 'Move from basic organisation to operational control. Assign responsibilities, manage transporter and truck records, monitor document gaps, compare quotes, and keep evidence of key checks.', features: ['Everything in Basic', 'Multi-user workspace and team responsibilities', 'Transporter and truck database', 'Truck-pack document control', 'Document expiry and missing-information alerts', 'Quote comparison and offer coordination workflow', 'Evidence log for checks and status changes', 'More detailed dashboard and exportable reports', 'Role-based access for internal users'], cta: 'Book a demo' },
    { name: 'MCT Premium', bestFor: 'Established teams that need management visibility, partner collaboration, and risk control.', positioning: 'Scale coordination with stronger oversight. Add controlled portal access, risk flags, priority document review, management dashboards, custom reports, and integration-ready exports.', features: ['Everything in Professional', 'Controlled client or partner portal options', 'Advanced request and trip-status views', 'Rule-based workflow status and reminders', 'Priority document review workflow', 'Risk flags for missing, expired, or unverified documents', 'Advanced dashboards for management oversight', 'Custom report templates', 'Priority support and onboarding session', 'API-ready export structure for future integrations'], cta: 'Request premium access' },
    { name: 'MCT Enterprise', bestFor: 'Large or strategic clients with complex needs in governance, integration, security, or rollout.', positioning: 'Configure MCT around enterprise operations. Tailor workflows, approval levels, multi-region structures, integration planning, executive reporting, and dedicated implementation.', features: ['Everything in Premium', 'Custom workflow configuration', 'Multi-country or multi-business-unit setup', 'Advanced user roles and approval levels', 'Integration planning with ERP, TMS, accounting, or telematics where technically available', 'Custom dashboards and executive reporting', 'Dedicated implementation support', 'Training and change-management package', 'Service-level agreement options', 'Private environment or enhanced security options, evaluated per client need'], cta: 'Discuss enterprise needs' },
  ] as PackageTier[],
  matrix: [
    { feature: 'Best for', basic: 'Small team', professional: 'Growing team', premium: 'Advanced team', enterprise: 'Custom organisation' },
    { feature: 'Request management', basic: 'Included', professional: 'Included', premium: 'Advanced', enterprise: 'Custom' },
    { feature: 'Client and transporter records', basic: 'Basic', professional: 'Advanced', premium: 'Advanced', enterprise: 'Custom' },
    { feature: 'Truck and document database', basic: 'Basic upload', professional: 'Structured database', premium: 'Advanced control', enterprise: 'Custom governance' },
    { feature: 'Verification workflow', basic: 'Manual checklist', professional: 'Status flags and evidence log', premium: 'Risk flags and priority workflow', enterprise: 'Custom verification process' },
    { feature: 'Quote coordination', basic: 'Basic notes', professional: 'Quote comparison', premium: 'Advanced quote workflow', enterprise: 'Custom commercial workflow' },
    { feature: 'Dashboard', basic: 'Basic', professional: 'Operational', premium: 'Management dashboard', enterprise: 'Executive and custom dashboards' },
    { feature: 'Partner or client portal', basic: 'Not included', professional: 'Optional or limited', premium: 'Included where configured', enterprise: 'Custom portal options' },
    { feature: 'Reports', basic: 'Basic export', professional: 'Detailed export', premium: 'Custom templates', enterprise: 'Custom reporting pack' },
    { feature: 'API and integration readiness', basic: 'Not included', professional: 'Export support', premium: 'API-ready data structure', enterprise: 'Integration planning and custom connectors' },
    { feature: 'Support', basic: 'Standard', professional: 'Standard plus onboarding', premium: 'Priority support', enterprise: 'Dedicated implementation and support' },
  ] as MatrixRow[],
};

type MctContent = typeof mctEN;

// Per-locale overrides for the marketing-level fields. Omitted fields (modules,
// problems, packages, matrix) fall back to the EN base via the shallow merge.
const mctOverrides: Partial<Record<Locale, Partial<MctContent>>> = {
  sv: {
    tagline: 'Transport- och logistikkontroll för sammankopplad afrikansk handel.',
    hero: 'MCT skapar ordning, tillit och överblick i transportsamordning. Det förvandlar spridda meddelanden och dokument till ett arbetsflöde byggt för afrikansk logistik, så att varje förfrågan har tydlig status, ansvarig person och ett underlag teamet kan stå för.',
    primaryCta: { label: 'Begär en demo', href: '/contact' },
    secondaryCta: { label: 'Boka ett produktsamtal', href: '/contact' },
    liveCta: { label: 'Besök live-plattformen', href: LIVE_MCT_URL },
    honestStatus: 'MCT är redo och tillgängligt för demoförfrågningar. JARIDAFRICA använder redan MCT med prenumerationen Enterprise Premium.',
    packagesIntro: 'Välj den nivå av kontroll som passar din verksamhet. En demo kan hjälpa dig att se vilket paket som passar ditt team.',
    whatIs: [
      'MCT är en praktisk kontrollprodukt för transportsamordning på den afrikanska marknaden. Den ersätter spridd kommunikation med ett strukturerat sätt att hantera förfrågningar, transportörer, lastbilsdokument, offerter, sändningsstatus och beslutsunderlag.',
      'Resultatet är en professionell samordningsmiljö där varje förfrågan, dokument och beslut blir lättare att spåra, granska och lita på.',
    ],
    isNot: [
      'Den ersätter inte transportföretag, speditörer, tullmyndigheter, försäkringsbolag eller juridisk due diligence.',
      'Den utlovar inte garanterad lastbilstillgång, tullklarering, gränspassage, betalningssäkerhet eller live-GPS om dessa funktioner inte formellt har implementerats.',
      'Den är idag inte ett fullständigt ERP, bokföringssystem eller globalt transportledningssystem.',
      'Den är en fokuserad kontrollprodukt som kan växa genom integrationer, partnerskap och företagsarbetsflöden.',
    ],
    audiences: [
      { title: 'Lastägare och kunder', detail: 'som behöver tydligare överblick och struktur när de begär transport.' },
      { title: 'Transportkoordinatorer', detail: 'som hanterar offerter, lastbilar, dokument och daglig operativ kommunikation.' },
      { title: 'Transportörer och flottpartners', detail: 'som behöver ett professionellt sätt att presentera tillgänglighet, dokument och servicestatus.' },
      { title: 'Frakt- och logistikpartners', detail: 'som arbetar över afrikanska korridorer och gränsöverskridande verksamhet.' },
      { title: 'Aktörer på den afrikanska marknaden', detail: 'som behöver starkare samordning och underlag när de flyttar gods.' },
      { title: 'Aktörer som sköter samordning åt kunder', detail: 'som hanterar verifierade transportdokument, underlag och kunduppdateringar.' },
    ],
    trustLine: 'MCT betonar officiell verifiering och underlagsbaserad dokumentkontroll. Om ett dokument inte matchar den officiella portalen eller QR-verifieringen förblir statusen olöst tills avvikelsen korrigerats.',
  },
  fr: {
    tagline: 'Contrôle du transport et de la logistique pour un commerce africain connecté.',
    hero: "MCT apporte ordre, confiance et visibilité à la coordination transport. Il transforme messages et documents dispersés en un flux conçu pour la logistique africaine, afin que chaque demande ait un statut clair, un responsable et un dossier que votre équipe peut assumer.",
    primaryCta: { label: 'Demander une démo', href: '/contact' },
    secondaryCta: { label: 'Réserver un échange produit', href: '/contact' },
    liveCta: { label: 'Voir la plateforme en ligne', href: LIVE_MCT_URL },
    honestStatus: "MCT est prêt et disponible pour les demandes de démonstration. JARIDAFRICA utilise déjà MCT avec l'abonnement Enterprise Premium.",
    packagesIntro: "Choisissez le niveau de contrôle adapté à votre activité. Une démonstration peut vous aider à voir quelle offre convient à votre équipe.",
    whatIs: [
      "MCT est un produit de contrôle pratique pour la coordination du transport sur le marché africain. Il remplace une communication dispersée par une manière structurée de gérer demandes, transporteurs, documents de camions, devis, statut des expéditions et preuves de décision.",
      "Le résultat est un environnement de coordination professionnel où chaque demande, document et décision devient plus facile à suivre, examiner et valider.",
    ],
    isNot: [
      "Elle ne remplace pas les sociétés de transport, transitaires, autorités douanières, assureurs ni la diligence juridique.",
      "Elle ne prétend pas garantir la disponibilité des camions, le dédouanement, le passage des frontières, la sécurité des paiements ou la visibilité GPS en direct, sauf si ces fonctionnalités sont formellement mises en œuvre.",
      "Elle n'est pas aujourd'hui un ERP complet, un système comptable ou un système mondial de gestion du transport.",
      "C'est un produit de contrôle ciblé qui peut évoluer grâce aux intégrations, partenariats et flux d'entreprise.",
    ],
    audiences: [
      { title: 'Propriétaires de fret et clients', detail: "qui ont besoin de plus de visibilité et de structure lorsqu'ils demandent un transport." },
      { title: 'Coordinateurs de transport', detail: 'qui gèrent devis, camions, documents et communication opérationnelle quotidienne.' },
      { title: 'Transporteurs et partenaires de flotte', detail: 'qui ont besoin d’une manière professionnelle de présenter disponibilité, documents et statut de service.' },
      { title: 'Partenaires fret et logistique', detail: 'travaillant sur les corridors africains et les opérations transfrontalières.' },
      { title: 'Opérateurs du marché africain', detail: "qui ont besoin d'une coordination et de preuves renforcées pour déplacer des marchandises." },
      { title: 'Opérateurs assurant la coordination pour des clients', detail: 'qui gèrent dossiers de transport vérifiés, preuves et mises à jour clients.' },
    ],
    trustLine: "MCT met l'accent sur la vérification officielle et le contrôle documentaire fondé sur des preuves. Si un document ne correspond pas au portail officiel ou à la vérification QR, le statut reste non résolu jusqu'à correction.",
  },
  de: {
    tagline: 'Transport- und Logistikkontrolle für vernetzten afrikanischen Handel.',
    hero: 'MCT bringt Ordnung, Vertrauen und Transparenz in die Transportkoordination. Es verwandelt verstreute Nachrichten und Dokumente in einen Workflow für die afrikanische Logistik, sodass jede Anfrage einen klaren Status, eine verantwortliche Person und eine belastbare Aufzeichnung hat.',
    primaryCta: { label: 'Demo anfragen', href: '/contact' },
    secondaryCta: { label: 'Produktgespräch buchen', href: '/contact' },
    liveCta: { label: 'Live-Plattform besuchen', href: LIVE_MCT_URL },
    honestStatus: 'MCT ist bereit und für Demo-Anfragen verfügbar. JARIDAFRICA nutzt MCT bereits mit dem Enterprise Premium-Abonnement.',
    packagesIntro: 'Wählen Sie das Kontrollniveau, das zu Ihrem Betrieb passt. Eine Demo kann zeigen, welches Paket zu Ihrem Team passt.',
    whatIs: [
      'MCT ist ein praktisches Kontrollprodukt für die Transportkoordination auf dem afrikanischen Markt. Es ersetzt verstreute Kommunikation durch eine strukturierte Art, Anfragen, Transporteure, Lkw-Dokumente, Angebote, Sendungsstatus und Entscheidungsnachweise zu verwalten.',
      'Das Ergebnis ist eine professionelle Koordinationsumgebung, in der jede Anfrage, jedes Dokument und jede Entscheidung leichter verfolgt, geprüft und vertraut werden kann.',
    ],
    isNot: [
      'Sie ersetzt keine Transportunternehmen, Spediteure, Zollbehörden, Versicherer oder die rechtliche Sorgfaltsprüfung.',
      'Sie verspricht keine garantierte Lkw-Verfügbarkeit, Zollabfertigung, Grenzüberquerung, Zahlungssicherheit oder Live-GPS, sofern diese Funktionen nicht formell implementiert sind.',
      'Sie ist heute kein vollständiges ERP, Buchhaltungssystem oder globales Transportmanagementsystem.',
      'Es ist ein fokussiertes Kontrollprodukt, das durch Integrationen, Partnerschaften und Unternehmensabläufe wachsen kann.',
    ],
    audiences: [
      { title: 'Frachteigentümer und Kunden', detail: 'die bei Transportanfragen mehr Transparenz und Struktur benötigen.' },
      { title: 'Transportkoordinatoren', detail: 'die Angebote, Lkw, Dokumente und die tägliche operative Kommunikation verwalten.' },
      { title: 'Transporteure und Flottenpartner', detail: 'die Verfügbarkeit, Dokumente und Servicestatus professionell darstellen möchten.' },
      { title: 'Fracht- und Logistikpartner', detail: 'die über afrikanische Korridore und grenzüberschreitende Abläufe arbeiten.' },
      { title: 'Akteure des afrikanischen Marktes', detail: 'die beim Warentransport stärkere Koordination und Nachweise benötigen.' },
      { title: 'Akteure, die Koordination für Kunden übernehmen', detail: 'die verifizierte Transportunterlagen, Nachweise und Kundenupdates verwalten.' },
    ],
    trustLine: 'MCT legt Wert auf offizielle Verifizierung und nachweisbasierte Dokumentenkontrolle. Stimmt ein Dokument nicht mit dem offiziellen Portal oder der QR-Verifizierung überein, bleibt der Status bis zur Korrektur ungelöst.',
  },
};

export function getMct(locale: string): MctContent {
  const override = mctOverrides[asLocale(locale)] ?? {};
  return {
    ...mctEN,
    ...override,
    whatIs: mctEN.whatIs,
    isNot: mctEN.isNot,
    audiences: mctEN.audiences,
  };
}

// ---------------------------------------------------------------------------
// Nayeli BIM Control (NBC) - EN base
// ---------------------------------------------------------------------------

const nbcEN = {
  slug: 'nayeli-bim-control',
  name: 'Nayeli BIM Control',
  acronym: 'NBC',
  seoTitle: 'Nayeli BIM Control | BIM Control Platform',
  metaDescription: 'NBC is an early-stage BIM control product for coordination, federated model review, model validation, issue ownership, evidence, and decision readiness.',
  tagline: 'BIM control built for clarity, accountability, and trust.',
  heroImage: NBC_IMAGE,
  logo: NBC_LOGO,
  heroPositioning: 'Nayeli BIM Control is being shaped around BIM coordination, federated model review, model validation, issue ownership, and decision readiness. It is separate from MCT and focused only on BIM control.',
  supporting: 'NBC gives project teams a clearer way to manage BIM information from requirements to coordinated, validated, construction-ready decisions. It brings model quality, issue ownership, and evidence into one workflow so teams can reduce uncertainty and move forward with confidence.',
  primaryCta: { label: 'Join the early access list', href: '/contact' },
  secondaryCta: { label: 'Compare product fit', href: '/products' },
  honestStatus: 'NBC is still in the early stages of development. LBYA is inviting BIM managers, consultants, contractors, and client teams to shape pilot workflows.',
  controlsIntro: 'NBC is a BIM control layer for architecture, engineering, construction, and client teams. It is not a modelling tool, and it does not replace Revit, Solibri, Autodesk Construction Cloud, BIMcollab, or a CDE. It helps teams understand whether BIM information is reliable, traceable, assigned, reviewed, and ready for decisions.',
  controls: [
    'BIM requirements and information needs',
    'Model health and quality indicators',
    'Model upload and validation status',
    'Issue tracking and responsibilities',
    'Coordination risk and unresolved information gaps',
    'Delivery readiness for milestones and client decisions',
    'Reports, evidence, and review history',
    'Team roles, permissions, and accountability',
    'Client project overview without overwhelming technical detail',
  ],
  audiences: [
    { title: 'BIM managers', need: 'Control requirements, model health, issues, and delivery readiness.', help: 'Central dashboard for BIM control and accountable follow-up.' },
    { title: 'Architects', need: 'Understand model status and what must be fixed before delivery.', help: 'Clear assignments, issue lists, and upload feedback.' },
    { title: 'Structural engineers', need: 'Track model quality, changes, coordination issues, and deliverables.', help: 'Discipline-specific control and evidence of readiness.' },
    { title: 'MEP teams', need: 'Coordinate model issues and avoid late-stage surprises.', help: 'Risk visibility and issue responsibility tracking.' },
    { title: 'Contractors', need: 'Monitor information reliability before construction decisions.', help: 'Delivery readiness and coordination risk overview.' },
    { title: 'Clients', need: 'See whether BIM information is reviewed, traceable, and decision-ready.', help: 'Simplified client portal and executive project overview.' },
  ],
  modules: [
    { name: 'Project dashboard', explanation: 'Overview of project status, model health, issues, risks, uploads, and delivery readiness.' },
    { name: 'BIM requirement manager', explanation: 'Create and track BIM requirements, responsibilities, and evidence.' },
    { name: 'Model upload and validation', explanation: 'Record model uploads, versions, checks, missing information, and review status.' },
    { name: 'Model health overview', explanation: 'Track quality indicators such as warnings, missing data, naming, classifications, and completeness.' },
    { name: 'Issue and responsibility tracking', explanation: 'Assign issues, due dates, status, discipline, comments, and evidence.' },
    { name: 'Coordination risk board', explanation: 'Highlight unresolved coordination risks and decision blockers.' },
    { name: 'Delivery readiness tracker', explanation: 'Show whether models and documents are ready for each milestone.' },
    { name: 'Evidence and report centre', explanation: 'Generate project summaries, review logs, and client-ready evidence.' },
    { name: 'Client overview portal', explanation: 'Give clients a simplified status view without exposing unnecessary technical complexity.' },
    { name: 'Roles and permissions', explanation: 'Control who can view, upload, review, approve, assign, and export information.' },
  ] as ProductModule[],
  packagesIntro: 'Start with a simple BIM control dashboard, then add stronger governance, reporting, permissions, client views, and integrations as the workflow matures.',
  packages: [
    { name: 'NBC Basic', bestFor: 'Small BIM teams needing a simple control dashboard.', positioning: 'Create the first reliable project view with requirements, uploads, issues, and readiness status.', features: ['Project dashboard', 'Basic requirements list', 'Model upload log', 'Issue list', 'Basic readiness status', 'Simple reports'], cta: 'Join early access' },
    { name: 'NBC Professional', bestFor: 'Consultants and project teams managing multiple disciplines.', positioning: 'Add accountable follow-up across requirements, model health, issue assignment, reports, and user roles.', features: ['Everything in Basic', 'Requirement tracking', 'Issue assignment', 'Model health metrics', 'Review reports', 'Role-based access'], cta: 'Request product demo' },
    { name: 'NBC Premium', bestFor: 'BIM managers and contractors needing stronger control.', positioning: 'Strengthen coordination with risk boards, delivery readiness, evidence, permissions, and client overview.', features: ['Everything in Professional', 'Coordination risk board', 'Delivery readiness tracker', 'Evidence centre', 'Advanced permissions', 'Client overview portal'], cta: 'Discuss a pilot project' },
    { name: 'NBC Enterprise', bestFor: 'Large organisations, public clients, and multi-project programmes.', positioning: 'Configure NBC around multi-project governance, integrations, templates, reporting, and enterprise permissions.', features: ['Everything in Premium', 'Custom workflows', 'Integrations', 'Multi-project reporting', 'Enterprise templates', 'Dedicated support'], cta: 'Discuss enterprise needs' },
  ] as PackageTier[],
  sections: [
    { title: 'Why BIM needs a control layer', body: 'Modelling and coordination tools are mature, but the information around them often is not. Requirements, responsibilities, and quality evidence still live in scattered places, which makes it hard to know what has truly been resolved. NBC adds the control layer that holds this together.' },
    { title: 'From model checking to BIM governance', body: 'Checking a model tells you what is wrong today. Governance tells you who owns each issue, what evidence supports a decision, and whether the project is ready to move forward. NBC helps teams make that shift without abandoning the tools they already use.' },
    { title: 'Connecting requirements, issues, and decision readiness', body: 'NBC links information requirements to model quality, issue ownership, and the evidence behind each decision. For example, a requirement can be traced to the issues it raised, the checks that closed them, and the person accountable, so decisions rest on a clear record.' },
    { title: 'Designed to work alongside your existing BIM tools', body: 'NBC is a control layer, not a modelling tool and not a replacement for your authoring or review software. It is designed to sit alongside existing BIM workflows and strengthen the information that flows through them.' },
    { title: 'Early-stage development and partnership', body: 'NBC is still in early development. We are inviting project teams and partners who want to help shape a more accountable way to control BIM information.' },
  ] as NbcSection[],
};

type NbcContent = typeof nbcEN;

const nbcOverrides: Partial<Record<Locale, Partial<NbcContent>>> = {
  sv: {
    tagline: 'BIM-kontroll byggd för tydlighet, ansvar och tillit.',
    heroPositioning: 'Nayeli BIM Control formas kring BIM-samordning, federerad modellgranskning, modellvalidering, ärendeansvar och beslutsberedskap. Produkten är separat från MCT och fokuserar endast på BIM-kontroll.',
    supporting: 'NBC ger projektteam ett tydligare sätt att hantera BIM-information från krav till samordnade, validerade och byggklara beslut. Det samlar modellkvalitet, ärendeansvar och underlag i ett arbetsflöde, så att team kan minska osäkerhet och gå vidare med större trygghet.',
    primaryCta: { label: 'Gå med i listan för tidig åtkomst', href: '/contact' },
    secondaryCta: { label: 'Jämför produktpassning', href: '/products' },
    honestStatus: 'NBC är i tidig utveckling. LBYA bjuder in BIM-ansvariga, konsulter, entreprenörer och beställarteam att forma pilotarbetsflöden.',
    controlsIntro: 'NBC är ett BIM-kontrollager för arkitektur-, teknik-, bygg- och beställarteam. Det är inte ett modelleringsverktyg och ersätter inte Revit, Solibri, Autodesk Construction Cloud, BIMcollab eller en CDE. Det hjälper team att förstå om BIM-information är tillförlitlig, spårbar, tilldelad, granskad och redo för beslut.',
    controls: [
      'BIM-krav och informationsbehov',
      'Modellhälsa och kvalitetsindikatorer',
      'Modelluppladdningar och valideringsstatus',
      'Ärendeuppföljning och ansvar',
      'Samordningsrisker och olösta informationsluckor',
      'Leveransberedskap för milstolpar och beställarbeslut',
      'Rapporter, underlag och granskningshistorik',
      'Teamroller, behörigheter och ansvar',
      'Projektöversikt för beställare utan onödig teknisk detaljnivå',
    ],
    audiences: [
      { title: 'BIM-ansvariga', need: 'Kontrollera krav, modellhälsa, ärenden och leveransberedskap.', help: 'Samlad översikt för BIM-kontroll och ansvarstagande uppföljning.' },
      { title: 'Arkitekter', need: 'Förstå modellstatus och vad som behöver åtgärdas före leverans.', help: 'Tydliga tilldelningar, ärendelistor och återkoppling på uppladdningar.' },
      { title: 'Konstruktörer', need: 'Följa modellkvalitet, ändringar, samordningsfrågor och leverabler.', help: 'Disciplinanpassad kontroll och underlag för leveransberedskap.' },
      { title: 'Installationssamordnare', need: 'Samordna modellfrågor och undvika sena överraskningar.', help: 'Risköversikt och tydligt ansvar för ärenden.' },
      { title: 'Entreprenörer', need: 'Följa informationskvalitet innan byggbeslut tas.', help: 'Leveransberedskap och översikt över samordningsrisker.' },
      { title: 'Beställare', need: 'Se om BIM-informationen är granskad, spårbar och beslutsredo.', help: 'Förenklad beställarportal och ledningsöversikt för projektet.' },
    ],
    modules: [
      { name: 'Projektöversikt', explanation: 'Översikt över projektstatus, modellhälsa, ärenden, risker, uppladdningar och leveransberedskap.' },
      { name: 'BIM-kravhantering', explanation: 'Skapa och följ upp BIM-krav, ansvar och underlag.' },
      { name: 'Modelluppladdning och validering', explanation: 'Registrera modelluppladdningar, versioner, kontroller, saknad information och granskningsstatus.' },
      { name: 'Översikt över modellhälsa', explanation: 'Följ kvalitetsindikatorer som varningar, saknad data, namngivning, klassificeringar och kompletthet.' },
      { name: 'Ärende- och ansvarsspårning', explanation: 'Tilldela ärenden, datum, status, disciplin, kommentarer och underlag.' },
      { name: 'Riskvy för samordning', explanation: 'Lyft fram olösta samordningsrisker och beslutshinder.' },
      { name: 'Spårning av leveransberedskap', explanation: 'Visa om modeller och dokument är redo för varje milstolpe.' },
      { name: 'Underlags- och rapportcenter', explanation: 'Skapa projektsammanfattningar, granskningsloggar och underlag för beställare.' },
      { name: 'Beställaröversikt', explanation: 'Ge beställare en förenklad statusvy utan onödig teknisk komplexitet.' },
      { name: 'Roller och behörigheter', explanation: 'Styr vem som kan se, ladda upp, granska, godkänna, tilldela och exportera information.' },
    ],
    packagesIntro: 'Börja med en enkel BIM-kontrollöversikt och lägg sedan till starkare styrning, rapporter, behörigheter, beställarvyer och integrationer när arbetssättet mognar.',
    packages: [
      { name: 'NBC Basic', bestFor: 'Små BIM-team som behöver en enkel kontrollöversikt.', positioning: 'Skapa den första tillförlitliga projektvyn med krav, uppladdningar, ärenden och beredskapsstatus.', features: ['Projektöversikt', 'Grundläggande kravlista', 'Logg för modelluppladdningar', 'Ärendelista', 'Grundläggande beredskapsstatus', 'Enkla rapporter'], cta: 'Gå med i tidig åtkomst' },
      { name: 'NBC Professional', bestFor: 'Konsulter och projektteam som hanterar flera discipliner.', positioning: 'Lägg till ansvarstagande uppföljning av krav, modellhälsa, ärendetilldelning, rapporter och användarroller.', features: ['Allt i Basic', 'Kravuppföljning', 'Ärendetilldelning', 'Mätvärden för modellhälsa', 'Granskningsrapporter', 'Rollbaserad åtkomst'], cta: 'Begär produktdemo' },
      { name: 'NBC Premium', bestFor: 'BIM-ansvariga och entreprenörer som behöver starkare kontroll.', positioning: 'Stärk samordningen med riskvyer, leveransberedskap, underlag, behörigheter och beställaröversikt.', features: ['Allt i Professional', 'Riskvy för samordning', 'Spårning av leveransberedskap', 'Underlagscenter', 'Avancerade behörigheter', 'Beställaröversikt'], cta: 'Diskutera ett pilotprojekt' },
      { name: 'NBC Enterprise', bestFor: 'Större organisationer, offentliga beställare och program med flera projekt.', positioning: 'Konfigurera NBC kring styrning för flera projekt, integrationer, mallar, rapporter och behörigheter på organisationsnivå.', features: ['Allt i Premium', 'Anpassade arbetsflöden', 'Integrationer', 'Rapporter för flera projekt', 'Enterprise-mallar', 'Dedikerad support'], cta: 'Diskutera Enterprise-behov' },
    ],
    sections: [
      { title: 'Varför BIM behöver ett kontrollager', body: 'Modellerings- och samordningsverktyg är mogna, men informationen runt dem är det ofta inte. Krav, ansvar och kvalitetsunderlag ligger fortfarande på spridda ställen, vilket gör det svårt att veta vad som verkligen är löst. NBC lägger till kontrollagret som håller ihop detta.' },
      { title: 'Från modellkontroll till BIM-styrning', body: 'Att kontrollera en modell visar vad som är fel idag. Styrning visar vem som ansvarar för varje fråga, vilket underlag som stödjer ett beslut och om projektet är redo att gå vidare. NBC hjälper team att göra det skiftet utan att överge de verktyg de redan använder.' },
      { title: 'Koppla samman krav, frågor och beslutsberedskap', body: 'NBC kopplar informationskrav till modellkvalitet, ansvar för frågor och underlaget bakom varje beslut. Ett krav kan till exempel spåras till de frågor det skapade, kontrollerna som löste dem och den ansvariga personen, så att beslut vilar på ett tydligt underlag.' },
      { title: 'Utformad för att fungera tillsammans med dina befintliga BIM-verktyg', body: 'NBC är ett kontrollager, inte ett modelleringsverktyg och inte en ersättning för era projekterings- eller granskningsverktyg. Det är utformat för att finnas vid sidan av befintliga BIM-arbetsflöden och stärka informationen som flödar genom dem.' },
      { title: 'Tidigt utvecklingsskede och partnerskap', body: 'NBC är fortfarande i tidig utveckling. Vi bjuder in projektteam och partners som vill hjälpa till att forma ett mer ansvarstagande sätt att kontrollera BIM-information.' },
    ],
  },
  fr: {
    tagline: 'Contrôle BIM conçu pour la clarté, la responsabilité et la confiance.',
    heroPositioning: "Nayeli BIM Control se construit autour de la coordination BIM, de la revue de modèles fédérés, de la validation de modèles, de la responsabilité des points à traiter et de la préparation des décisions. Le produit est séparé de MCT et se concentre uniquement sur le contrôle BIM.",
    supporting: "NBC offre aux équipes projet une façon plus claire de gérer l'information BIM, des exigences aux décisions coordonnées, validées et prêtes pour la construction. Il réunit qualité du modèle, responsabilité des points à traiter et preuves dans un même flux, afin que les équipes réduisent l'incertitude et avancent avec confiance.",
    primaryCta: { label: "Rejoindre la liste d'accès anticipé", href: '/contact' },
    secondaryCta: { label: "Comparer l'adéquation produit", href: '/products' },
    honestStatus: "NBC est en phase de développement initial. LBYA invite les responsables BIM, consultants, entrepreneurs et équipes clientes à façonner des flux pilotes.",
    controlsIntro: "NBC est une couche de contrôle BIM pour les équipes d'architecture, d'ingénierie, de construction et de maîtrise d'ouvrage. Ce n'est pas un outil de modélisation et il ne remplace pas Revit, Solibri, Autodesk Construction Cloud, BIMcollab ou un environnement commun de données. Il aide les équipes à savoir si l'information BIM est fiable, traçable, attribuée, revue et prête pour les décisions.",
    controls: [
      'Exigences BIM et besoins d’information',
      'Santé du modèle et indicateurs qualité',
      'Téléversements de modèles et statut de validation',
      'Suivi des points à traiter et responsabilités',
      'Risques de coordination et lacunes d’information non résolues',
      'Préparation des livrables pour les jalons et les décisions client',
      'Rapports, preuves et historique de revue',
      'Rôles, permissions et responsabilités d’équipe',
      'Vue projet client sans détail technique excessif',
    ],
    audiences: [
      { title: 'Responsables BIM', need: 'Contrôler les exigences, la santé du modèle, les points à traiter et la préparation des livrables.', help: 'Vue centrale pour le contrôle BIM et le suivi responsable.' },
      { title: 'Architectes', need: 'Comprendre le statut du modèle et ce qui doit être corrigé avant la livraison.', help: 'Affectations claires, listes de points à traiter et retours sur les téléversements.' },
      { title: 'Ingénieurs structure', need: 'Suivre la qualité du modèle, les changements, les sujets de coordination et les livrables.', help: 'Contrôle par discipline et preuves de préparation.' },
      { title: 'Équipes MEP', need: 'Coordonner les points liés au modèle et éviter les surprises tardives.', help: 'Visibilité des risques et responsabilité claire des points à traiter.' },
      { title: 'Entrepreneurs', need: 'Surveiller la fiabilité de l’information avant les décisions de construction.', help: 'Préparation des livrables et vue des risques de coordination.' },
      { title: 'Clients', need: 'Voir si l’information BIM est revue, traçable et prête pour la décision.', help: 'Portail client simplifié et vue projet pour la direction.' },
    ],
    modules: [
      { name: 'Tableau de bord projet', explanation: 'Vue d’ensemble du statut projet, de la santé du modèle, des points à traiter, des risques, des téléversements et de la préparation des livrables.' },
      { name: 'Gestionnaire d’exigences BIM', explanation: 'Créer et suivre les exigences BIM, les responsabilités et les preuves.' },
      { name: 'Téléversement et validation de modèles', explanation: 'Enregistrer les téléversements, versions, contrôles, informations manquantes et statuts de revue.' },
      { name: 'Vue de santé du modèle', explanation: 'Suivre les indicateurs qualité comme les avertissements, données manquantes, nommage, classifications et complétude.' },
      { name: 'Suivi des points et responsabilités', explanation: 'Attribuer points à traiter, échéances, statut, discipline, commentaires et preuves.' },
      { name: 'Vue des risques de coordination', explanation: 'Mettre en évidence les risques de coordination non résolus et les blocages de décision.' },
      { name: 'Suivi de préparation des livrables', explanation: 'Montrer si modèles et documents sont prêts pour chaque jalon.' },
      { name: 'Centre de preuves et rapports', explanation: 'Créer des synthèses projet, journaux de revue et preuves prêtes pour le client.' },
      { name: 'Vue client', explanation: 'Donner aux clients une vue de statut simplifiée sans complexité technique inutile.' },
      { name: 'Rôles et permissions', explanation: 'Contrôler qui peut voir, téléverser, revoir, approuver, attribuer et exporter l’information.' },
    ],
    packagesIntro: 'Commencer avec un tableau de bord BIM simple, puis ajouter une gouvernance plus forte, des rapports, des permissions, des vues client et des intégrations lorsque le flux mûrit.',
    packages: [
      { name: 'NBC Basic', bestFor: 'Petites équipes BIM ayant besoin d’un tableau de bord simple.', positioning: 'Créer une première vue projet fiable avec exigences, téléversements, points à traiter et statut de préparation.', features: ['Tableau de bord projet', 'Liste d’exigences de base', 'Journal des téléversements de modèles', 'Liste de points à traiter', 'Statut de préparation de base', 'Rapports simples'], cta: 'Rejoindre l’accès anticipé' },
      { name: 'NBC Professional', bestFor: 'Consultants et équipes projet gérant plusieurs disciplines.', positioning: 'Ajouter un suivi responsable des exigences, de la santé du modèle, de l’attribution des points, des rapports et des rôles utilisateur.', features: ['Tout ce qui est inclus dans Basic', 'Suivi des exigences', 'Attribution des points à traiter', 'Indicateurs de santé du modèle', 'Rapports de revue', 'Accès par rôle'], cta: 'Demander une démo produit' },
      { name: 'NBC Premium', bestFor: 'Responsables BIM et entrepreneurs ayant besoin d’un contrôle renforcé.', positioning: 'Renforcer la coordination avec vues des risques, préparation des livrables, preuves, permissions et vue client.', features: ['Tout ce qui est inclus dans Professional', 'Vue des risques de coordination', 'Suivi de préparation des livrables', 'Centre de preuves', 'Permissions avancées', 'Vue client'], cta: 'Discuter un projet pilote' },
      { name: 'NBC Enterprise', bestFor: 'Grandes organisations, clients publics et programmes multi-projets.', positioning: 'Configurer NBC autour de la gouvernance multi-projets, des intégrations, des modèles, des rapports et des permissions Enterprise.', features: ['Tout ce qui est inclus dans Premium', 'Flux personnalisés', 'Intégrations', 'Rapports multi-projets', 'Modèles Enterprise', 'Support dédié'], cta: 'Discuter des besoins Enterprise' },
    ],
    sections: [
      { title: "Pourquoi le BIM a besoin d'une couche de contrôle", body: "Les outils de modélisation et de coordination sont matures, mais l'information autour d'eux ne l'est souvent pas. Exigences, responsabilités et preuves de qualité restent dispersées, ce qui rend difficile de savoir ce qui est vraiment résolu. NBC ajoute la couche de contrôle qui relie tout cela." },
      { title: 'De la vérification de modèle à la gouvernance BIM', body: "Vérifier un modèle indique ce qui ne va pas aujourd'hui. La gouvernance indique qui est responsable de chaque point, quelles preuves soutiennent une décision et si le projet est prêt à avancer. NBC aide les équipes à opérer ce changement sans abandonner les outils qu'elles utilisent déjà." },
      { title: 'Relier exigences, points à traiter et préparation à la décision', body: "NBC relie les exigences d'information à la qualité du modèle, à la responsabilité des points à traiter et aux preuves derrière chaque décision. Une exigence peut par exemple être reliée aux points qu'elle a soulevés, aux vérifications qui les ont clôturés et à la personne responsable, afin que les décisions reposent sur un dossier clair." },
      { title: 'Conçu pour fonctionner avec vos outils BIM existants', body: "NBC est une couche de contrôle, pas un outil de modélisation ni un remplacement de vos logiciels de production ou de revue. Il est conçu pour accompagner les flux BIM existants et renforcer l'information qui les traverse." },
      { title: 'Développement initial et partenariat', body: "NBC est encore en phase de développement initial. Nous invitons les équipes projet et les partenaires qui souhaitent aider à façonner une manière plus responsable de contrôler l'information BIM." },
    ],
  },
  de: {
    tagline: 'BIM-Kontrolle für Klarheit, Verantwortung und Vertrauen.',
    heroPositioning: 'Nayeli BIM Control wird rund um BIM-Koordination, federierte Modellprüfung, Modellvalidierung, Problemverantwortung und Entscheidungsreife entwickelt. Das Produkt ist von MCT getrennt und konzentriert sich ausschließlich auf BIM-Kontrolle.',
    supporting: 'NBC bietet Projektteams einen klareren Weg, BIM-Informationen von Anforderungen bis zu koordinierten, validierten und baureifen Entscheidungen zu verwalten. Es bringt Modellqualität, Problemverantwortung und Nachweise in einen Workflow, sodass Teams Unsicherheit reduzieren und mit Vertrauen vorankommen.',
    primaryCta: { label: 'Der Early-Access-Liste beitreten', href: '/contact' },
    secondaryCta: { label: 'Produktpassung vergleichen', href: '/products' },
    honestStatus: 'NBC befindet sich in früher Entwicklung. LBYA lädt BIM-Manager, Berater, Auftragnehmer und Kundenteams ein, Pilot-Workflows mitzugestalten.',
    sections: [
      { title: 'Warum BIM eine Kontrollebene braucht', body: 'Modellierungs- und Koordinationswerkzeuge sind ausgereift, die Informationen darum herum jedoch oft nicht. Anforderungen, Verantwortlichkeiten und Qualitätsnachweise liegen weiterhin verstreut, was es schwer macht zu wissen, was wirklich gelöst ist. NBC fügt die Kontrollebene hinzu, die dies zusammenhält.' },
      { title: 'Von der Modellprüfung zur BIM-Governance', body: 'Eine Modellprüfung zeigt, was heute falsch ist. Governance zeigt, wer für jedes Problem verantwortlich ist, welche Nachweise eine Entscheidung stützen und ob das Projekt bereit ist, voranzugehen. NBC hilft Teams bei diesem Wandel, ohne die bereits genutzten Werkzeuge aufzugeben.' },
      { title: 'Anforderungen, Probleme und Entscheidungsreife verbinden', body: 'NBC verknüpft Informationsanforderungen mit Modellqualität, Problemverantwortung und den Nachweisen hinter jeder Entscheidung. Eine Anforderung lässt sich etwa zu den Problemen, die sie auslöste, den Prüfungen, die sie schlossen, und der verantwortlichen Person zurückverfolgen, sodass Entscheidungen auf einer klaren Aufzeichnung beruhen.' },
      { title: 'Für die Zusammenarbeit mit Ihren bestehenden BIM-Werkzeugen konzipiert', body: 'NBC ist eine Kontrollebene, kein Modellierungswerkzeug und kein Ersatz für Ihre Autoren- oder Prüfsoftware. Es ist darauf ausgelegt, neben bestehenden BIM-Arbeitsabläufen zu stehen und die durch sie fließenden Informationen zu stärken.' },
      { title: 'Frühe Entwicklungsphase und Partnerschaft', body: 'NBC befindet sich noch in früher Entwicklung. Wir laden Projektteams und Partner ein, die einen verantwortlicheren Weg zur Kontrolle von BIM-Informationen mitgestalten möchten.' },
    ],
  },
};

export function getNbc(locale: string): NbcContent {
  return { ...nbcEN, ...(nbcOverrides[asLocale(locale)] ?? {}) };
}
