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
  tagline: string;
  cardCopy: string;
  href: string;
  image: string;
  primaryCta: { label: string; href: string };
  liveCta?: { label: string; href: string };
}

export interface ProblemResponse { problem: string; response: string }
export interface ProductModule { name: string; explanation: string }
export interface PackageTier { name: string; bestFor: string; positioning: string; features: string[]; cta: string }
export interface MatrixRow { feature: string; basic: string; professional: string; premium: string; enterprise: string }
export interface NbcSection { title: string; body: string }

const MCT_IMAGE = 'https://images.unsplash.com/photo-1577948000111-9c970dfe3743?q=80&w=2070&auto=format&fit=crop';
const NBC_IMAGE = '/images/insights/digital-twin.jpg';

// ---------------------------------------------------------------------------
// Product summaries (homepage showcase and /products overview) - fully localised
// ---------------------------------------------------------------------------

const productsByLocale: Record<Locale, ProductSummary[]> = {
  en: [
    { slug: 'malaika-control-tower', name: 'Malaika Control Tower', acronym: 'MCT', tagline: 'Transport and logistics control for connected African trade.', cardCopy: 'MCT gives African logistics teams a clearer way to coordinate transport. Instead of losing requests, documents, and quotes across chats and spreadsheets, your team runs each step through one structured workflow with built-in verification support.', href: '/products/malaika-control-tower', image: MCT_IMAGE, primaryCta: { label: 'Explore MCT', href: '/products/malaika-control-tower' }, liveCta: { label: 'Visit the live platform', href: LIVE_MCT_URL } },
    { slug: 'nayeli-bim-control', name: 'Nayeli BIM Control', acronym: 'NBC', tagline: 'BIM control built with care, clarity, and trust.', cardCopy: 'NBC takes BIM teams beyond model checking into real information control. It links requirements, model quality, and issue ownership, so teams know what is resolved, what is not, and who is responsible.', href: '/products/nayeli-bim-control', image: NBC_IMAGE, primaryCta: { label: 'Discover NBC', href: '/products/nayeli-bim-control' } },
  ],
  sv: [
    { slug: 'malaika-control-tower', name: 'Malaika Control Tower', acronym: 'MCT', tagline: 'Transport- och logistikkontroll för sammankopplad afrikansk handel.', cardCopy: 'MCT ger afrikanska logistikteam ett tydligare sätt att samordna transport. Istället för att tappa bort förfrågningar, dokument och offerter i chattar och kalkylark kör ditt team varje steg genom ett strukturerat arbetsflöde med inbyggt verifieringsstöd.', href: '/products/malaika-control-tower', image: MCT_IMAGE, primaryCta: { label: 'Utforska MCT', href: '/products/malaika-control-tower' }, liveCta: { label: 'Besök den live-plattformen', href: LIVE_MCT_URL } },
    { slug: 'nayeli-bim-control', name: 'Nayeli BIM Control', acronym: 'NBC', tagline: 'BIM-kontroll byggd med omsorg, tydlighet och tillit.', cardCopy: 'NBC tar BIM-team bortom modellkontroll till verklig informationskontroll. Det kopplar samman krav, modellkvalitet och ansvar för frågor, så att team vet vad som är löst, vad som inte är det och vem som ansvarar.', href: '/products/nayeli-bim-control', image: NBC_IMAGE, primaryCta: { label: 'Upptäck NBC', href: '/products/nayeli-bim-control' } },
  ],
  fr: [
    { slug: 'malaika-control-tower', name: 'Malaika Control Tower', acronym: 'MCT', tagline: 'Contrôle du transport et de la logistique pour un commerce africain connecté.', cardCopy: "MCT offre aux équipes logistiques africaines une façon plus claire de coordonner le transport. Au lieu de perdre demandes, documents et devis dans des conversations et des tableurs, votre équipe gère chaque étape dans un flux structuré avec un soutien de vérification intégré.", href: '/products/malaika-control-tower', image: MCT_IMAGE, primaryCta: { label: 'Explorer MCT', href: '/products/malaika-control-tower' }, liveCta: { label: 'Voir la plateforme en ligne', href: LIVE_MCT_URL } },
    { slug: 'nayeli-bim-control', name: 'Nayeli BIM Control', acronym: 'NBC', tagline: 'Contrôle BIM conçu avec soin, clarté et confiance.', cardCopy: "NBC fait passer les équipes BIM de la vérification de modèle au véritable contrôle de l'information. Il relie exigences, qualité du modèle et responsabilité des problèmes, afin que les équipes sachent ce qui est résolu, ce qui ne l'est pas et qui est responsable.", href: '/products/nayeli-bim-control', image: NBC_IMAGE, primaryCta: { label: 'Découvrir NBC', href: '/products/nayeli-bim-control' } },
  ],
  de: [
    { slug: 'malaika-control-tower', name: 'Malaika Control Tower', acronym: 'MCT', tagline: 'Transport- und Logistikkontrolle für vernetzten afrikanischen Handel.', cardCopy: 'MCT bietet afrikanischen Logistikteams einen klareren Weg, Transporte zu koordinieren. Statt Anfragen, Dokumente und Angebote in Chats und Tabellen zu verlieren, führt Ihr Team jeden Schritt durch einen strukturierten Arbeitsablauf mit integrierter Verifizierungsunterstützung.', href: '/products/malaika-control-tower', image: MCT_IMAGE, primaryCta: { label: 'MCT entdecken', href: '/products/malaika-control-tower' }, liveCta: { label: 'Live-Plattform besuchen', href: LIVE_MCT_URL } },
    { slug: 'nayeli-bim-control', name: 'Nayeli BIM Control', acronym: 'NBC', tagline: 'BIM-Kontrolle, mit Sorgfalt, Klarheit und Vertrauen gebaut.', cardCopy: 'NBC führt BIM-Teams über die Modellprüfung hinaus zur echten Informationskontrolle. Es verknüpft Anforderungen, Modellqualität und Problemverantwortung, sodass Teams wissen, was gelöst ist, was nicht und wer verantwortlich ist.', href: '/products/nayeli-bim-control', image: NBC_IMAGE, primaryCta: { label: 'NBC entdecken', href: '/products/nayeli-bim-control' } },
  ],
};

export function getProducts(locale: string): ProductSummary[] {
  return productsByLocale[asLocale(locale)];
}

// ---------------------------------------------------------------------------
// Malaika Control Tower (MCT) - EN base
// ---------------------------------------------------------------------------

const mctEN = {
  slug: 'malaika-control-tower',
  name: 'Malaika Control Tower',
  acronym: 'MCT',
  seoTitle: 'Malaika Control Tower | Transport and Logistics Control',
  metaDescription: 'MCT is a digital control platform for African transport and logistics coordination, document control, verification support, and operational visibility.',
  tagline: 'Transport and logistics control for connected African trade.',
  heroImage: MCT_IMAGE,
  hero: 'MCT brings order, trust, and visibility to complex transport coordination. It turns scattered messages and documents into one structured workflow built for African logistics, so every request has a clear status, an owner, and a record you can stand behind.',
  primaryCta: { label: 'Request early access', href: '/contact' },
  secondaryCta: { label: 'Book a product discussion', href: '/contact' },
  liveCta: { label: 'Visit the live platform', href: LIVE_MCT_URL },
  honestStatus: 'MCT is in early access. Capabilities expand as integrations are formally implemented and verified.',
  packagesIntro: 'Choose the level of control that fits your operation. Request early access to find the right package for your team.',
  whatIs: [
    'MCT is a practical control platform for transport coordination in the African market. It replaces scattered communication with one structured way to manage requests, transporters, truck documents, quotes, shipment status, and decision evidence.',
    'The result is a professional coordination environment where each request, document, and decision can be tracked, reviewed, and trusted.',
  ],
  isNot: [
    'It is not a replacement for transport companies, freight forwarders, customs authorities, insurers, or legal due diligence.',
    'It does not claim to guarantee truck availability, customs clearance, border crossing, payment security, or live GPS visibility unless those features are formally implemented.',
    'It is not a full ERP, accounting system, or global transport management system today.',
    'It is a focused control platform that can grow through integrations, partnerships, and enterprise workflows.',
  ],
  audiences: [
    { title: 'Cargo owners and clients', detail: 'who need clearer visibility and structure when requesting transport.' },
    { title: 'Transport coordinators', detail: 'who manage quotes, trucks, documents, and daily operational communication.' },
    { title: 'Transporters and fleet partners', detail: 'who need a professional way to present availability, documents, and service status.' },
    { title: 'Freight and logistics partners', detail: 'working across African corridors and cross-border operations.' },
    { title: 'African market operators', detail: 'who need stronger coordination and evidence when moving goods.' },
    { title: 'Operators running coordination on behalf of clients', detail: 'who manage verified transport packs, evidence, and client-facing updates.' },
  ],
  problems: [
    { problem: 'Transport requests are scattered across WhatsApp, email, calls, and spreadsheets.', response: 'Requests move into one controlled workflow with clear statuses, contacts, and actions.' },
    { problem: 'Truck and transporter documents are difficult to verify and organise.', response: 'Transporter profiles, truck packs, and document expiry dates live in one place, with verification notes attached to each.' },
    { problem: 'Quote negotiation and margin management are hard to track.', response: 'Organised quote comparisons and offer history keep coordination tidy, without exposing sensitive margin logic.' },
    { problem: 'There is no clear operational status.', response: 'A dashboard shows the request stage, document status, assigned owner, and coordination progress.' },
    { problem: 'Evidence is lost in chats and folders.', response: 'Documents, checks, and decisions are recorded against the request for later review.' },
    { problem: 'Clients need trust, but the process is often informal.', response: 'A more professional and traceable environment surrounds every step of coordination.' },
  ] as ProblemResponse[],
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
  trustLine: 'MCT emphasises official verification and evidence-based document control. If documents do not match the official portal or QR verification, the status is treated as unresolved until corrected.',
  packages: [
    { name: 'MCT Basic', bestFor: 'Small teams and early users replacing informal coordination with a clean starting point.', positioning: 'Start with the essentials. Register transport requests, store key documents, track basic status, and build a more professional workflow without added complexity.', features: ['Transport request registration', 'Basic client and transporter records', 'Document upload and storage', 'Manual verification checklist', 'Basic request status tracking', 'Simple dashboard for active requests', 'Exportable summary report', 'Standard support'], cta: 'Request early access' },
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
    hero: 'MCT skapar ordning, tillit och överblick i komplex transportsamordning. Det förvandlar spridda meddelanden och dokument till ett strukturerat arbetsflöde byggt för afrikansk logistik, så att varje förfrågan har en tydlig status, en ägare och ett underlag du kan stå för.',
    primaryCta: { label: 'Begär tidig åtkomst', href: '/contact' },
    secondaryCta: { label: 'Boka ett produktsamtal', href: '/contact' },
    liveCta: { label: 'Besök den live-plattformen', href: LIVE_MCT_URL },
    honestStatus: 'MCT är i tidig åtkomst. Funktionerna utökas när integrationer formellt implementeras och verifieras.',
    packagesIntro: 'Välj den nivå av kontroll som passar din verksamhet. Begär tidig åtkomst för att hitta rätt paket för ditt team.',
    whatIs: [
      'MCT är en praktisk kontrollplattform för transportsamordning på den afrikanska marknaden. Den ersätter spridd kommunikation med ett strukturerat sätt att hantera förfrågningar, transportörer, lastbilsdokument, offerter, sändningsstatus och beslutsunderlag.',
      'Resultatet är en professionell samordningsmiljö där varje förfrågan, dokument och beslut kan spåras, granskas och litas på.',
    ],
    isNot: [
      'Den ersätter inte transportföretag, speditörer, tullmyndigheter, försäkringsbolag eller juridisk due diligence.',
      'Den utlovar inte garanterad lastbilstillgång, tullklarering, gränspassage, betalningssäkerhet eller live-GPS om dessa funktioner inte formellt har implementerats.',
      'Den är idag inte ett fullständigt ERP, bokföringssystem eller globalt transportledningssystem.',
      'Den är en fokuserad kontrollplattform som kan växa genom integrationer, partnerskap och företagsarbetsflöden.',
    ],
    audiences: [
      { title: 'Lastägare och kunder', detail: 'som behöver tydligare överblick och struktur när de begär transport.' },
      { title: 'Transportkoordinatorer', detail: 'som hanterar offerter, lastbilar, dokument och daglig operativ kommunikation.' },
      { title: 'Transportörer och flottpartners', detail: 'som behöver ett professionellt sätt att presentera tillgänglighet, dokument och servicestatus.' },
      { title: 'Frakt- och logistikpartners', detail: 'som arbetar över afrikanska korridorer och gränsöverskridande verksamhet.' },
      { title: 'Aktörer på den afrikanska marknaden', detail: 'som behöver starkare samordning och underlag när de flyttar gods.' },
      { title: 'Aktörer som sköter samordning åt kunder', detail: 'som hanterar verifierade transportdokument, underlag och kunduppdateringar.' },
    ],
    trustLine: 'MCT betonar officiell verifiering och bevisbaserad dokumentkontroll. Om dokument inte matchar den officiella portalen eller QR-verifieringen behandlas statusen som olöst tills den korrigerats.',
  },
  fr: {
    tagline: 'Contrôle du transport et de la logistique pour un commerce africain connecté.',
    hero: "MCT apporte ordre, confiance et visibilité à une coordination de transport complexe. Il transforme messages et documents épars en un flux structuré conçu pour la logistique africaine, afin que chaque demande ait un statut clair, un responsable et un dossier que vous pouvez assumer.",
    primaryCta: { label: "Demander un accès anticipé", href: '/contact' },
    secondaryCta: { label: 'Réserver un échange produit', href: '/contact' },
    liveCta: { label: 'Voir la plateforme en ligne', href: LIVE_MCT_URL },
    honestStatus: "MCT est en accès anticipé. Les capacités s'étendent à mesure que les intégrations sont formellement mises en œuvre et vérifiées.",
    packagesIntro: "Choisissez le niveau de contrôle adapté à votre activité. Demandez un accès anticipé pour trouver l'offre adaptée à votre équipe.",
    whatIs: [
      "MCT est une plateforme de contrôle pratique pour la coordination du transport sur le marché africain. Elle remplace une communication éparse par une manière structurée de gérer demandes, transporteurs, documents de camions, devis, statut des expéditions et preuves de décision.",
      "Le résultat est un environnement de coordination professionnel où chaque demande, document et décision peut être suivi, examiné et fiable.",
    ],
    isNot: [
      "Elle ne remplace pas les sociétés de transport, transitaires, autorités douanières, assureurs ni la diligence juridique.",
      "Elle ne prétend pas garantir la disponibilité des camions, le dédouanement, le passage des frontières, la sécurité des paiements ou la visibilité GPS en direct, sauf si ces fonctionnalités sont formellement mises en œuvre.",
      "Elle n'est pas aujourd'hui un ERP complet, un système comptable ou un système mondial de gestion du transport.",
      "C'est une plateforme de contrôle ciblée qui peut évoluer grâce aux intégrations, partenariats et flux d'entreprise.",
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
    hero: 'MCT bringt Ordnung, Vertrauen und Transparenz in die komplexe Transportkoordination. Es verwandelt verstreute Nachrichten und Dokumente in einen strukturierten Arbeitsablauf für die afrikanische Logistik, sodass jede Anfrage einen klaren Status, einen Verantwortlichen und eine belastbare Aufzeichnung hat.',
    primaryCta: { label: 'Frühen Zugang anfragen', href: '/contact' },
    secondaryCta: { label: 'Produktgespräch buchen', href: '/contact' },
    liveCta: { label: 'Live-Plattform besuchen', href: LIVE_MCT_URL },
    honestStatus: 'MCT befindet sich im Early Access. Die Funktionen werden erweitert, sobald Integrationen formell implementiert und verifiziert sind.',
    packagesIntro: 'Wählen Sie das Kontrollniveau, das zu Ihrem Betrieb passt. Fragen Sie frühen Zugang an, um das richtige Paket für Ihr Team zu finden.',
    whatIs: [
      'MCT ist eine praktische Kontrollplattform für die Transportkoordination auf dem afrikanischen Markt. Sie ersetzt verstreute Kommunikation durch eine strukturierte Art, Anfragen, Transporteure, Lkw-Dokumente, Angebote, Sendungsstatus und Entscheidungsnachweise zu verwalten.',
      'Das Ergebnis ist eine professionelle Koordinationsumgebung, in der jede Anfrage, jedes Dokument und jede Entscheidung verfolgt, geprüft und vertraut werden kann.',
    ],
    isNot: [
      'Sie ersetzt keine Transportunternehmen, Spediteure, Zollbehörden, Versicherer oder die rechtliche Sorgfaltsprüfung.',
      'Sie verspricht keine garantierte Lkw-Verfügbarkeit, Zollabfertigung, Grenzüberquerung, Zahlungssicherheit oder Live-GPS, sofern diese Funktionen nicht formell implementiert sind.',
      'Sie ist heute kein vollständiges ERP, Buchhaltungssystem oder globales Transportmanagementsystem.',
      'Sie ist eine fokussierte Kontrollplattform, die durch Integrationen, Partnerschaften und Unternehmensabläufe wachsen kann.',
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
  return { ...mctEN, ...(mctOverrides[asLocale(locale)] ?? {}) };
}

// ---------------------------------------------------------------------------
// Nayeli BIM Control (NBC) - EN base
// ---------------------------------------------------------------------------

const nbcEN = {
  slug: 'nayeli-bim-control',
  name: 'Nayeli BIM Control',
  acronym: 'NBC',
  seoTitle: 'Nayeli BIM Control | BIM Control Platform',
  metaDescription: 'NBC helps project teams connect BIM requirements, model quality, issue responsibility, evidence, and decision readiness.',
  tagline: 'BIM control built with care, clarity, and trust.',
  heroImage: NBC_IMAGE,
  heroPositioning: 'Most BIM platforms help teams create, coordinate, or review models. Nayeli BIM Control focuses on the critical layer between those steps: controlling information, responsibilities, and quality evidence, so BIM becomes more accountable and easier to act on.',
  supporting: 'NBC gives project teams a clearer way to control BIM information from requirements to decision readiness. It brings model quality, issue ownership, and evidence into one structured workflow, so teams reduce uncertainty and move forward with confidence.',
  primaryCta: { label: 'Join the early access list', href: '/contact' },
  secondaryCta: { label: 'Request a BIM control discussion', href: '/contact' },
  sections: [
    { title: 'Why BIM needs a control layer', body: 'Modelling and coordination tools are mature, but the information around them often is not. Requirements, responsibilities, and quality evidence still live in scattered places, which makes it hard to know what has truly been resolved. NBC adds the control layer that holds this together.' },
    { title: 'From model checking to BIM governance', body: 'Checking a model tells you what is wrong today. Governance tells you who owns each issue, what evidence supports a decision, and whether the project is ready to move forward. NBC helps teams make that shift without abandoning the tools they already use.' },
    { title: 'Connecting requirements, issues, and decision readiness', body: 'NBC links information requirements to model quality, issue ownership, and the evidence behind each decision. For example, a requirement can be traced to the issues it raised, the checks that closed them, and the person accountable, so decisions rest on a clear record.' },
    { title: 'Designed to work alongside your existing BIM tools', body: 'NBC is a control layer, not a modelling tool and not a replacement for your authoring or review software. It is designed to sit alongside existing BIM workflows and strengthen the information that flows through them.' },
    { title: 'Early access and partnership', body: 'NBC is entering its early-access phase. We are inviting project teams and partners who want to shape a more accountable way to control BIM information.' },
  ] as NbcSection[],
};

type NbcContent = typeof nbcEN;

const nbcOverrides: Partial<Record<Locale, Partial<NbcContent>>> = {
  sv: {
    tagline: 'BIM-kontroll byggd med omsorg, tydlighet och tillit.',
    heroPositioning: 'De flesta BIM-plattformar hjälper team att skapa, samordna eller granska modeller. Nayeli BIM Control fokuserar på det kritiska lagret mellan dessa steg: att kontrollera information, ansvar och kvalitetsunderlag, så att BIM blir mer ansvarstagande och lättare att agera på.',
    supporting: 'NBC ger projektteam ett tydligare sätt att kontrollera BIM-information från krav till beslutsberedskap. Det samlar modellkvalitet, ansvar för frågor och underlag i ett strukturerat arbetsflöde, så att team minskar osäkerhet och går framåt med självförtroende.',
    primaryCta: { label: 'Gå med i listan för tidig åtkomst', href: '/contact' },
    secondaryCta: { label: 'Begär ett BIM-kontrollsamtal', href: '/contact' },
    sections: [
      { title: 'Varför BIM behöver ett kontrollager', body: 'Modellerings- och samordningsverktyg är mogna, men informationen runt dem är det ofta inte. Krav, ansvar och kvalitetsunderlag ligger fortfarande på spridda ställen, vilket gör det svårt att veta vad som verkligen är löst. NBC lägger till kontrollagret som håller ihop detta.' },
      { title: 'Från modellkontroll till BIM-styrning', body: 'Att kontrollera en modell visar vad som är fel idag. Styrning visar vem som äger varje fråga, vilket underlag som stödjer ett beslut och om projektet är redo att gå vidare. NBC hjälper team att göra det skiftet utan att överge de verktyg de redan använder.' },
      { title: 'Koppla samman krav, frågor och beslutsberedskap', body: 'NBC kopplar informationskrav till modellkvalitet, ansvar för frågor och underlaget bakom varje beslut. Ett krav kan till exempel spåras till de frågor det väckte, kontrollerna som stängde dem och den ansvariga personen, så att beslut vilar på ett tydligt underlag.' },
      { title: 'Utformad för att fungera tillsammans med dina befintliga BIM-verktyg', body: 'NBC är ett kontrollager, inte ett modelleringsverktyg och inte en ersättning för din författar- eller granskningsprogramvara. Det är utformat för att finnas vid sidan av befintliga BIM-arbetsflöden och stärka informationen som flödar genom dem.' },
      { title: 'Tidig åtkomst och partnerskap', body: 'NBC går in i sin fas för tidig åtkomst. Vi bjuder in projektteam och partners som vill forma ett mer ansvarstagande sätt att kontrollera BIM-information.' },
    ],
  },
  fr: {
    tagline: 'Contrôle BIM conçu avec soin, clarté et confiance.',
    heroPositioning: "La plupart des plateformes BIM aident les équipes à créer, coordonner ou réviser des modèles. Nayeli BIM Control se concentre sur la couche critique entre ces étapes : contrôler l'information, les responsabilités et les preuves de qualité, afin que le BIM devienne plus responsable et plus facile à exploiter.",
    supporting: "NBC offre aux équipes projet une façon plus claire de contrôler l'information BIM, des exigences à la préparation à la décision. Il réunit qualité du modèle, responsabilité des problèmes et preuves dans un flux structuré, afin que les équipes réduisent l'incertitude et avancent avec confiance.",
    primaryCta: { label: "Rejoindre la liste d'accès anticipé", href: '/contact' },
    secondaryCta: { label: 'Demander un échange sur le contrôle BIM', href: '/contact' },
    sections: [
      { title: "Pourquoi le BIM a besoin d'une couche de contrôle", body: "Les outils de modélisation et de coordination sont matures, mais l'information autour d'eux ne l'est souvent pas. Exigences, responsabilités et preuves de qualité restent dispersées, ce qui rend difficile de savoir ce qui est vraiment résolu. NBC ajoute la couche de contrôle qui relie tout cela." },
      { title: 'De la vérification de modèle à la gouvernance BIM', body: "Vérifier un modèle indique ce qui ne va pas aujourd'hui. La gouvernance indique qui possède chaque problème, quelles preuves soutiennent une décision et si le projet est prêt à avancer. NBC aide les équipes à opérer ce changement sans abandonner les outils qu'elles utilisent déjà." },
      { title: 'Relier exigences, problèmes et préparation à la décision', body: "NBC relie les exigences d'information à la qualité du modèle, à la responsabilité des problèmes et aux preuves derrière chaque décision. Une exigence peut par exemple être reliée aux problèmes qu'elle a soulevés, aux vérifications qui les ont clôturés et à la personne responsable, afin que les décisions reposent sur un dossier clair." },
      { title: 'Conçu pour fonctionner avec vos outils BIM existants', body: "NBC est une couche de contrôle, pas un outil de modélisation ni un remplacement de votre logiciel de création ou de révision. Il est conçu pour accompagner les flux BIM existants et renforcer l'information qui les traverse." },
      { title: 'Accès anticipé et partenariat', body: "NBC entre dans sa phase d'accès anticipé. Nous invitons les équipes projet et les partenaires qui souhaitent façonner une manière plus responsable de contrôler l'information BIM." },
    ],
  },
  de: {
    tagline: 'BIM-Kontrolle, mit Sorgfalt, Klarheit und Vertrauen gebaut.',
    heroPositioning: 'Die meisten BIM-Plattformen helfen Teams, Modelle zu erstellen, zu koordinieren oder zu prüfen. Nayeli BIM Control konzentriert sich auf die kritische Ebene zwischen diesen Schritten: die Kontrolle von Informationen, Verantwortlichkeiten und Qualitätsnachweisen, damit BIM verantwortlicher und leichter umsetzbar wird.',
    supporting: 'NBC bietet Projektteams einen klareren Weg, BIM-Informationen von den Anforderungen bis zur Entscheidungsreife zu kontrollieren. Es bringt Modellqualität, Problemverantwortung und Nachweise in einen strukturierten Arbeitsablauf, sodass Teams Unsicherheit reduzieren und mit Vertrauen vorankommen.',
    primaryCta: { label: 'Der Early-Access-Liste beitreten', href: '/contact' },
    secondaryCta: { label: 'Ein BIM-Kontrollgespräch anfragen', href: '/contact' },
    sections: [
      { title: 'Warum BIM eine Kontrollebene braucht', body: 'Modellierungs- und Koordinationswerkzeuge sind ausgereift, die Informationen darum herum jedoch oft nicht. Anforderungen, Verantwortlichkeiten und Qualitätsnachweise liegen weiterhin verstreut, was es schwer macht zu wissen, was wirklich gelöst ist. NBC fügt die Kontrollebene hinzu, die dies zusammenhält.' },
      { title: 'Von der Modellprüfung zur BIM-Governance', body: 'Eine Modellprüfung zeigt, was heute falsch ist. Governance zeigt, wer für jedes Problem verantwortlich ist, welche Nachweise eine Entscheidung stützen und ob das Projekt bereit ist, voranzugehen. NBC hilft Teams bei diesem Wandel, ohne die bereits genutzten Werkzeuge aufzugeben.' },
      { title: 'Anforderungen, Probleme und Entscheidungsreife verbinden', body: 'NBC verknüpft Informationsanforderungen mit Modellqualität, Problemverantwortung und den Nachweisen hinter jeder Entscheidung. Eine Anforderung lässt sich etwa zu den Problemen, die sie auslöste, den Prüfungen, die sie schlossen, und der verantwortlichen Person zurückverfolgen, sodass Entscheidungen auf einer klaren Aufzeichnung beruhen.' },
      { title: 'Für die Zusammenarbeit mit Ihren bestehenden BIM-Werkzeugen konzipiert', body: 'NBC ist eine Kontrollebene, kein Modellierungswerkzeug und kein Ersatz für Ihre Autoren- oder Prüfsoftware. Es ist darauf ausgelegt, neben bestehenden BIM-Arbeitsabläufen zu stehen und die durch sie fließenden Informationen zu stärken.' },
      { title: 'Early Access und Partnerschaft', body: 'NBC tritt in seine Early-Access-Phase ein. Wir laden Projektteams und Partner ein, die einen verantwortlicheren Weg zur Kontrolle von BIM-Informationen mitgestalten möchten.' },
    ],
  },
};

export function getNbc(locale: string): NbcContent {
  return { ...nbcEN, ...(nbcOverrides[asLocale(locale)] ?? {}) };
}
