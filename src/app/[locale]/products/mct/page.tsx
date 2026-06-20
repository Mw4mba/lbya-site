import type { Metadata } from 'next';
import Image from 'next/image';
import { permanentRedirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { MctConvertedPrice, MctCurrencySwitcher } from '@/app/components/MctCurrencyPricing';
import MctHeroInteractiveBackdrop from '@/app/components/MctHeroInteractiveBackdrop';
import { getMct } from '@/app/content/products';
import { asLocale, type Locale } from '@/app/content/locale';
import { localizePath } from '@/app/content/paths';

type Props = { params: Promise<{ locale: string }> };

type Metric = {
  value: string;
  label: string;
  detail: string;
};

type TextBlock = {
  title: string;
  body: string;
};

type PackageCard = {
  name: string;
  label: string;
  body: string;
  features: string[];
  price?: string;
  setup?: string;
  featured?: boolean;
};

type SolutionFamily = TextBlock & {
  audience: string;
  capabilities: string[];
  cta: string;
  actionLabel?: string;
};

type MctCommercialCopy = {
  page: Partial<MctPageCopy>;
  solutionsEyebrow: string;
  solutionsHeading: string;
  solutionsBody: string;
  solutionFamilies: SolutionFamily[];
};

type DashboardCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  metrics: { label: string; value: string; tone: string }[];
  rows: { name: string; detail: string; status: string }[];
};

type MctPageCopy = {
  productEyebrow: string;
  headline: string;
  heroBody: string;
  primaryCta: string;
  demoBadge: string;
  subscriptionBadge: string;
  proofLine: string;
  metrics: Metric[];
  dashboard: DashboardCopy;
  outcomesEyebrow: string;
  outcomesHeading: string;
  outcomesBody: string;
  outcomes: TextBlock[];
  workflowEyebrow: string;
  workflowHeading: string;
  workflowBody: string;
  workflow: TextBlock[];
  modulesEyebrow: string;
  modulesHeading: string;
  modulesBody: string;
  modules: TextBlock[];
  trustHeading: string;
  trustBody: string;
  packagesEyebrow: string;
  packagesHeading: string;
  packagesBody: string;
  packages: PackageCard[];
  finalHeading: string;
  finalBody: string;
};

const mctPageCopyByLocale: Record<Locale, MctPageCopy> = {
  en: {
    productEyebrow: 'Malaika Control Tower',
    headline: 'Control transport requests, documents, quotes, and decisions in one product.',
    heroBody:
      'MCT replaces scattered logistics coordination with a structured control tower for cargo owners, coordinators, transporters, and partners who need a clearer operating record.',
    primaryCta: 'Request a demo',
    demoBadge: 'Ready for demo',
    subscriptionBadge: 'Enterprise Premium in use',
    proofLine:
      'MCT is commercially ready for demo requests.',
    metrics: [
      { value: 'Ready', label: 'Product status', detail: 'Available for commercial demos now.' },
      { value: 'Live', label: 'Customer proof', detail: 'JARIDAFRICA runs MCT in production.' },
      { value: '1 flow', label: 'Operational record', detail: 'Request, verify, compare, track, report.' },
    ],
    dashboard: {
      eyebrow: 'MCT operations',
      title: 'Shipment control dashboard',
      subtitle: 'Requests, transporters, truck packs, verification, quotes, and status in one workspace.',
      metrics: [
        { label: 'Requests', value: '18', tone: 'bg-[#2E7D32]' },
        { label: 'Truck packs', value: '11', tone: 'bg-[#1D4ED8]' },
        { label: 'Need evidence', value: '5', tone: 'bg-[#D97706]' },
      ],
      rows: [
        { name: 'Route request', detail: 'Kinshasa to Lubumbashi', status: 'Assigned' },
        { name: 'C-BRTA permit', detail: 'QR and portal check', status: 'Verify' },
        { name: 'Quote comparison', detail: 'Price, risk, readiness', status: 'Compare' },
      ],
    },
    outcomesEyebrow: 'Why teams choose MCT',
    outcomesHeading: 'Commercial control for real logistics work.',
    outcomesBody:
      'MCT is shaped around the daily decisions that make transport coordination difficult: incomplete requests, missing documents, unclear transporter readiness, quote history, and evidence that disappears in chats.',
    outcomes: [
      { title: 'Capture every request', body: 'Turn route, cargo, timing, client, and operating requirements into one controlled transport record.' },
      { title: 'Verify truck packs', body: 'Organise permits, driver documents, insurance, expiry dates, and verification notes before decisions are made.' },
      { title: 'Compare options with context', body: 'Review quotes beside readiness, risk, document status, and coordination history.' },
      { title: 'Keep decision evidence', body: 'Attach documents, checks, status changes, and reports to the request so the record stays usable later.' },
    ],
    workflowEyebrow: 'Product workflow',
    workflowHeading: 'From request to evidence report.',
    workflowBody:
      'MCT gives teams a practical operating sequence that can start simple and become more advanced as the organisation matures.',
    workflow: [
      { title: 'Create request', body: 'Enter route, cargo, destination, timing, and operating requirements.' },
      { title: 'Select transporters', body: 'Organise transporter options, availability, and readiness.' },
      { title: 'Upload truck pack', body: 'Collect permits, truck documents, driver files, insurance, and related evidence.' },
      { title: 'Verify documents', body: 'Track completeness, expiry, mismatches, official checks, and unresolved items.' },
      { title: 'Compare quotes', body: 'Review price, risk, document status, and operational fit together.' },
      { title: 'Track status', body: 'Move the shipment through assigned, loading, border, delivered, and closed stages.' },
      { title: 'Export report', body: 'Produce a structured summary for internal control or client review.' },
    ],
    modulesEyebrow: 'What is included',
    modulesHeading: 'A focused product stack for transport control.',
    modulesBody:
      'MCT is not a generic brochure. It is a product environment built around the records, checks, and decisions logistics teams handle every day.',
    modules: [
      { title: 'Request management', body: 'Structured transport requests with owners, contacts, cargo details, and status.' },
      { title: 'Client and partner profiles', body: 'Organised records for clients, transporters, fleet partners, and operational contacts.' },
      { title: 'Truck-pack control', body: 'Transporter, truck, driver, permit, insurance, and expiry data in one place.' },
      { title: 'Document verification', body: 'Verification notes, missing information, expiry flags, and unresolved-document status.' },
      { title: 'Quote coordination', body: 'Cleaner quote comparison and offer history without exposing sensitive margin logic.' },
      { title: 'Status dashboard', body: 'Operational visibility across requests, pending actions, verification, and shipment progress.' },
      { title: 'Evidence trail', body: 'A structured record of documents, checks, decisions, and status changes.' },
      { title: 'Portal-ready access', body: 'Controlled access for selected clients or partners as workflows grow.' },
    ],
    trustHeading: 'Built for responsible verification.',
    trustBody:
      'If a document does not match the official portal, QR result, or required evidence, its status stays unresolved until the issue is corrected. MCT supports evidence-based control rather than informal approval.',
    packagesEyebrow: 'Commercial packages',
    packagesHeading: 'Start with the level of control your operation needs.',
    packagesBody:
      'A demo helps the team choose the right package and see how MCT fits current coordination, verification, reporting, and partner workflows.',
    packages: [
      {
        name: 'MCT Basic',
        label: 'For small teams',
        body: 'A clean starting point for replacing informal coordination.',
        features: ['Request registration', 'Basic client and transporter records', 'Document upload', 'Simple dashboard'],
      },
      {
        name: 'MCT Professional',
        label: 'For growing teams',
        body: 'More structure for coordinators managing users, trucks, documents, and quotes.',
        features: ['Multi-user workspace', 'Transporter and truck database', 'Expiry alerts', 'Quote comparison'],
        featured: true,
      },
      {
        name: 'MCT Premium',
        label: 'For established operations',
        body: 'Stronger oversight for partner collaboration, risk flags, and management visibility.',
        features: ['Portal options', 'Advanced status views', 'Risk flags', 'Custom reports'],
      },
      {
        name: 'MCT Enterprise',
        label: 'For strategic rollout',
        body: 'Configurable control for larger organisations, multi-country workflows, and integrations.',
        features: ['Custom workflows', 'Multi-business setup', 'Integration planning', 'Dedicated implementation'],
      },
    ],
    finalHeading: 'Bring MCT into your logistics operation.',
    finalBody:
      'Request a commercial demo, review the live platform, and see how MCT can turn scattered transport coordination into a controlled product workflow.',
  },
  sv: {
    productEyebrow: 'Malaika Control Tower',
    headline: 'Kontrollera transportf\u00f6rfr\u00e5gningar, dokument, offerter och beslut i en produkt.',
    heroBody:
      'MCT ers\u00e4tter spridd logistiksamordning med ett strukturerat kontrolltorn f\u00f6r varu\u00e4gare, koordinatorer, transport\u00f6rer och partners som beh\u00f6ver ett tydligare operativt underlag.',
    primaryCta: 'Beg\u00e4r demo',
    demoBadge: 'Redo f\u00f6r demo',
    subscriptionBadge: 'Enterprise Premium anv\u00e4nds',
    proofLine:
      'MCT \u00e4r kommersiellt redo f\u00f6r demof\u00f6rfr\u00e5gningar.',
    metrics: [
      { value: 'Redo', label: 'Produktstatus', detail: 'Tillg\u00e4nglig f\u00f6r kommersiella demos nu.' },
      { value: 'Live', label: 'Kundreferens', detail: 'JARIDAFRICA anv\u00e4nder MCT i produktion.' },
      { value: '1 fl\u00f6de', label: 'Operativt underlag', detail: 'F\u00f6rfr\u00e5ga, verifiera, j\u00e4mf\u00f6r, f\u00f6lj upp, rapportera.' },
    ],
    dashboard: {
      eyebrow: 'MCT-operationer',
      title: 'Kontrollpanel f\u00f6r transporter',
      subtitle: 'F\u00f6rfr\u00e5gningar, transport\u00f6rer, lastbilsdokumentation, verifiering, offerter och status i en arbetsyta.',
      metrics: [
        { label: 'F\u00f6rfr\u00e5gningar', value: '18', tone: 'bg-[#2E7D32]' },
        { label: 'Lastbilsdokumentation', value: '11', tone: 'bg-[#1D4ED8]' },
        { label: 'Beh\u00f6ver underlag', value: '5', tone: 'bg-[#D97706]' },
      ],
      rows: [
        { name: 'Ruttf\u00f6rfr\u00e5gan', detail: 'Kinshasa till Lubumbashi', status: 'Tilldelad' },
        { name: 'C-BRTA-tillst\u00e5nd', detail: 'QR- och portalkontroll', status: 'Verifiera' },
        { name: 'Offertj\u00e4mf\u00f6relse', detail: 'Pris, risk, beredskap', status: 'J\u00e4mf\u00f6r' },
      ],
    },
    outcomesEyebrow: 'Varf\u00f6r team v\u00e4ljer MCT',
    outcomesHeading: 'Kommersiell kontroll f\u00f6r verkligt logistikarbete.',
    outcomesBody:
      'MCT \u00e4r byggt kring de vardagliga beslut som g\u00f6r transportsamordning sv\u00e5r: ofullst\u00e4ndiga f\u00f6rfr\u00e5gningar, saknade dokument, oklar transport\u00f6rsberedskap, offertsp\u00e5rning och underlag som f\u00f6rsvinner i chattar.',
    outcomes: [
      { title: 'Samla varje f\u00f6rfr\u00e5gan', body: 'G\u00f6r rutt, gods, tid, kund och operativa krav till ett kontrollerat transportunderlag.' },
      { title: 'Verifiera lastbilsdokumentation', body: 'Organisera tillst\u00e5nd, f\u00f6rardokument, f\u00f6rs\u00e4kring, utg\u00e5ngsdatum och verifieringsnoteringar innan beslut tas.' },
      { title: 'J\u00e4mf\u00f6r alternativ med kontext', body: 'Granska offerter tillsammans med beredskap, risk, dokumentstatus och samordningshistorik.' },
      { title: 'Beh\u00e5ll beslutsunderlaget', body: 'Koppla dokument, kontroller, status\u00e4ndringar och rapporter till f\u00f6rfr\u00e5gan s\u00e5 att underlaget h\u00e5ller \u00f6ver tid.' },
    ],
    workflowEyebrow: 'Produktfl\u00f6de',
    workflowHeading: 'Fr\u00e5n f\u00f6rfr\u00e5gan till underlagsrapport.',
    workflowBody:
      'MCT ger team en praktisk arbetssekvens som kan starta enkelt och bli mer avancerad n\u00e4r organisationen mognar.',
    workflow: [
      { title: 'Skapa f\u00f6rfr\u00e5gan', body: 'Ange rutt, gods, destination, tidsplan och operativa krav.' },
      { title: 'V\u00e4lj transport\u00f6rer', body: 'Organisera transport\u00f6rsalternativ, tillg\u00e4nglighet och beredskap.' },
      { title: 'Ladda upp lastbilsdokumentation', body: 'Samla tillst\u00e5nd, lastbilsdokument, f\u00f6rarhandlingar, f\u00f6rs\u00e4kring och relaterat underlag.' },
      { title: 'Verifiera dokument', body: 'F\u00f6lj fullst\u00e4ndighet, utg\u00e5ngsdatum, avvikelser, officiella kontroller och ol\u00f6sta punkter.' },
      { title: 'J\u00e4mf\u00f6r offerter', body: 'Granska pris, risk, dokumentstatus och operativ passform tillsammans.' },
      { title: 'F\u00f6lj status', body: 'Flytta transporten genom tilldelad, lastning, gr\u00e4ns, levererad och st\u00e4ngd.' },
      { title: 'Exportera rapport', body: 'Skapa en strukturerad sammanfattning f\u00f6r intern kontroll eller kundgranskning.' },
    ],
    modulesEyebrow: 'Vad ing\u00e5r',
    modulesHeading: 'En fokuserad produktstruktur f\u00f6r transportkontroll.',
    modulesBody:
      'MCT \u00e4r inte en generell broschyr. Det \u00e4r en produktmilj\u00f6 byggd kring de register, kontroller och beslut som logistikteam hanterar varje dag.',
    modules: [
      { title: 'F\u00f6rfr\u00e5gningshantering', body: 'Strukturerade transportf\u00f6rfr\u00e5gningar med ansvariga, kontakter, godsdetaljer och status.' },
      { title: 'Kund- och partnerprofiler', body: 'Organiserade register f\u00f6r kunder, transport\u00f6rer, flottpartners och operativa kontakter.' },
      { title: 'Kontroll av lastbilsdokumentation', body: 'Transport\u00f6r, lastbil, f\u00f6rare, tillst\u00e5nd, f\u00f6rs\u00e4kring och utg\u00e5ngsdata p\u00e5 en plats.' },
      { title: 'Dokumentverifiering', body: 'Verifieringsnoteringar, saknad information, utg\u00e5ngsflaggor och status f\u00f6r ol\u00f6sta dokument.' },
      { title: 'Offertsamordning', body: 'Tydligare offertj\u00e4mf\u00f6relse och historik utan att exponera k\u00e4nslig marginallogik.' },
      { title: 'Statuspanel', body: 'Operativ \u00f6verblick \u00f6ver f\u00f6rfr\u00e5gningar, v\u00e4ntande \u00e5tg\u00e4rder, verifiering och transportf\u00f6rlopp.' },
      { title: 'Sp\u00e5rbart underlag', body: 'Ett strukturerat register \u00f6ver dokument, kontroller, beslut och status\u00e4ndringar.' },
      { title: 'Portalf\u00f6rberedd \u00e5tkomst', body: 'Kontrollerad \u00e5tkomst f\u00f6r utvalda kunder eller partners n\u00e4r arbetsfl\u00f6den v\u00e4xer.' },
    ],
    trustHeading: 'Byggt f\u00f6r ansvarsfull verifiering.',
    trustBody:
      'Om ett dokument inte st\u00e4mmer med den officiella portalen, QR-resultatet eller kr\u00e4vt underlag f\u00f6rblir statusen ol\u00f6st tills problemet korrigeras. MCT st\u00f6der evidensbaserad kontroll, inte informellt godk\u00e4nnande.',
    packagesEyebrow: 'Kommersiella paket',
    packagesHeading: 'B\u00f6rja med den kontrollniv\u00e5 er verksamhet beh\u00f6ver.',
    packagesBody:
      'En demo hj\u00e4lper teamet att v\u00e4lja r\u00e4tt paket och se hur MCT passar samordning, verifiering, rapportering och partnerfl\u00f6den.',
    packages: [
      {
        name: 'MCT Basic',
        label: 'F\u00f6r sm\u00e5 team',
        body: 'En tydlig startpunkt f\u00f6r att ers\u00e4tta informell samordning.',
        features: ['F\u00f6rfr\u00e5gningsregistrering', 'Grundl\u00e4ggande kund- och transport\u00f6rsregister', 'Dokumentuppladdning', 'Enkel kontrollpanel'],
      },
      {
        name: 'MCT Professional',
        label: 'F\u00f6r v\u00e4xande team',
        body: 'Mer struktur f\u00f6r koordinatorer som hanterar anv\u00e4ndare, lastbilar, dokument och offerter.',
        features: ['Fleranv\u00e4ndararbetsyta', 'Transport\u00f6rs- och lastbilsdatabas', 'Utg\u00e5ngsvarningar', 'Offertj\u00e4mf\u00f6relse'],
        featured: true,
      },
      {
        name: 'MCT Premium',
        label: 'F\u00f6r etablerad drift',
        body: 'Starkare \u00f6versikt f\u00f6r partnersamverkan, riskflaggor och ledningsinsyn.',
        features: ['Portalalternativ', 'Avancerade statusvyer', 'Riskflaggor', 'Anpassade rapporter'],
      },
      {
        name: 'MCT Enterprise',
        label: 'F\u00f6r strategisk utrullning',
        body: 'Konfigurerbar kontroll f\u00f6r st\u00f6rre organisationer, flerl\u00e4ndesfl\u00f6den och integrationer.',
        features: ['Anpassade arbetsfl\u00f6den', 'Flera aff\u00e4rsenheter', 'Integrationsplanering', 'Dedikerad implementation'],
      },
    ],
    finalHeading: 'Ta in MCT i er logistikverksamhet.',
    finalBody:
      'Beg\u00e4r en kommersiell demo, granska live-plattformen och se hur MCT kan f\u00f6rvandla spridd transportsamordning till ett kontrollerat produktfl\u00f6de.',
  },
  fr: {
    productEyebrow: 'Malaika Control Tower',
    headline: 'Contr\u00f4lez les demandes, documents, devis et d\u00e9cisions transport dans un seul produit.',
    heroBody:
      'MCT remplace la coordination logistique dispers\u00e9e par une tour de contr\u00f4le structur\u00e9e pour les chargeurs, coordinateurs, transporteurs et partenaires qui ont besoin d\u2019un dossier op\u00e9rationnel plus clair.',
    primaryCta: 'Demander une d\u00e9mo',
    demoBadge: 'Pr\u00eat pour les d\u00e9mos',
    subscriptionBadge: 'Enterprise Premium en usage',
    proofLine:
      'MCT est commercialement pr\u00eat pour les demandes de d\u00e9monstration. JARIDAFRICA l\u2019utilise actuellement avec l\u2019abonnement Enterprise Premium.',
    metrics: [
      { value: 'Pr\u00eat', label: 'Statut produit', detail: 'Disponible d\u00e8s maintenant pour des d\u00e9mos commerciales.' },
      { value: 'Live', label: 'R\u00e9f\u00e9rence client', detail: 'JARIDAFRICA utilise MCT en production.' },
      { value: '1 flux', label: 'Dossier op\u00e9rationnel', detail: 'Demander, v\u00e9rifier, comparer, suivre, produire un rapport.' },
    ],
    dashboard: {
      eyebrow: 'Op\u00e9rations MCT',
      title: 'Tableau de contr\u00f4le des transports',
      subtitle: 'Demandes, transporteurs, dossiers camion, v\u00e9rification, devis et statut dans un seul espace.',
      metrics: [
        { label: 'Demandes', value: '18', tone: 'bg-[#2E7D32]' },
        { label: 'Dossiers camion', value: '11', tone: 'bg-[#1D4ED8]' },
        { label: 'Preuves requises', value: '5', tone: 'bg-[#D97706]' },
      ],
      rows: [
        { name: 'Demande d\u2019itin\u00e9raire', detail: 'Kinshasa vers Lubumbashi', status: 'Attribu\u00e9' },
        { name: 'Permis C-BRTA', detail: 'Contr\u00f4le QR et portail', status: 'V\u00e9rifier' },
        { name: 'Comparaison devis', detail: 'Prix, risque, pr\u00e9paration', status: 'Comparer' },
      ],
    },
    outcomesEyebrow: 'Pourquoi les \u00e9quipes choisissent MCT',
    outcomesHeading: 'Un contr\u00f4le commercial pour le vrai travail logistique.',
    outcomesBody:
      'MCT est con\u00e7u autour des d\u00e9cisions quotidiennes qui compliquent la coordination du transport : demandes incompl\u00e8tes, documents manquants, disponibilit\u00e9 transporteur incertaine, historique des devis et preuves perdues dans les conversations.',
    outcomes: [
      { title: 'Capturer chaque demande', body: 'Transformer itin\u00e9raire, cargaison, calendrier, client et exigences op\u00e9rationnelles en un dossier transport contr\u00f4l\u00e9.' },
      { title: 'V\u00e9rifier les dossiers camion', body: 'Organiser permis, documents chauffeur, assurance, dates d\u2019expiration et notes de v\u00e9rification avant les d\u00e9cisions.' },
      { title: 'Comparer avec le contexte', body: 'Examiner les devis avec la pr\u00e9paration, le risque, le statut documentaire et l\u2019historique de coordination.' },
      { title: 'Conserver les preuves', body: 'Relier documents, contr\u00f4les, changements de statut et rapports \u00e0 la demande pour garder un dossier exploitable.' },
    ],
    workflowEyebrow: 'Flux produit',
    workflowHeading: 'De la demande au rapport de preuve.',
    workflowBody:
      'MCT donne aux \u00e9quipes une s\u00e9quence op\u00e9rationnelle pratique, simple au d\u00e9part et plus avanc\u00e9e \u00e0 mesure que l\u2019organisation grandit.',
    workflow: [
      { title: 'Cr\u00e9er la demande', body: 'Saisir itin\u00e9raire, cargaison, destination, calendrier et exigences op\u00e9rationnelles.' },
      { title: 'Choisir les transporteurs', body: 'Organiser les options, la disponibilit\u00e9 et la pr\u00e9paration des transporteurs.' },
      { title: 'Charger le dossier camion', body: 'Collecter permis, documents camion, dossiers chauffeur, assurance et preuves associ\u00e9es.' },
      { title: 'V\u00e9rifier les documents', body: 'Suivre compl\u00e9tude, expirations, incoh\u00e9rences, contr\u00f4les officiels et points non r\u00e9solus.' },
      { title: 'Comparer les devis', body: 'Examiner ensemble le prix, le risque, le statut documentaire et l\u2019ad\u00e9quation op\u00e9rationnelle.' },
      { title: 'Suivre le statut', body: 'Faire avancer le transport entre assignation, chargement, fronti\u00e8re, livraison et cl\u00f4ture.' },
      { title: 'Exporter le rapport', body: 'Produire un r\u00e9sum\u00e9 structur\u00e9 pour le contr\u00f4le interne ou la revue client.' },
    ],
    modulesEyebrow: 'Ce qui est inclus',
    modulesHeading: 'Une structure produit cibl\u00e9e pour le contr\u00f4le du transport.',
    modulesBody:
      'MCT n\u2019est pas une brochure g\u00e9n\u00e9rique. C\u2019est un environnement produit construit autour des dossiers, contr\u00f4les et d\u00e9cisions que les \u00e9quipes logistiques g\u00e8rent chaque jour.',
    modules: [
      { title: 'Gestion des demandes', body: 'Demandes de transport structur\u00e9es avec responsables, contacts, d\u00e9tails de cargaison et statut.' },
      { title: 'Profils clients et partenaires', body: 'Dossiers organis\u00e9s pour clients, transporteurs, partenaires de flotte et contacts op\u00e9rationnels.' },
      { title: 'Contr\u00f4le du dossier camion', body: 'Transporteur, camion, chauffeur, permis, assurance et dates d\u2019expiration au m\u00eame endroit.' },
      { title: 'V\u00e9rification documentaire', body: 'Notes de v\u00e9rification, informations manquantes, alertes d\u2019expiration et statut non r\u00e9solu.' },
      { title: 'Coordination des devis', body: 'Comparaison et historique des offres plus propres sans exposer la logique de marge sensible.' },
      { title: 'Tableau de statut', body: 'Visibilit\u00e9 op\u00e9rationnelle sur les demandes, actions en attente, v\u00e9rification et progression.' },
      { title: 'Trace de preuves', body: 'Dossier structur\u00e9 des documents, contr\u00f4les, d\u00e9cisions et changements de statut.' },
      { title: 'Acc\u00e8s portail pr\u00eat', body: 'Acc\u00e8s contr\u00f4l\u00e9 pour certains clients ou partenaires quand les flux se d\u00e9veloppent.' },
    ],
    trustHeading: 'Con\u00e7u pour une v\u00e9rification responsable.',
    trustBody:
      'Si un document ne correspond pas au portail officiel, au r\u00e9sultat QR ou aux preuves requises, son statut reste non r\u00e9solu jusqu\u2019\u00e0 correction. MCT soutient un contr\u00f4le fond\u00e9 sur les preuves, pas une validation informelle.',
    packagesEyebrow: 'Offres commerciales',
    packagesHeading: 'Commencez avec le niveau de contr\u00f4le adapt\u00e9 \u00e0 votre op\u00e9ration.',
    packagesBody:
      'Une d\u00e9mo aide l\u2019\u00e9quipe \u00e0 choisir la bonne offre et \u00e0 voir comment MCT s\u2019int\u00e8gre \u00e0 la coordination, la v\u00e9rification, les rapports et les flux partenaires.',
    packages: [
      {
        name: 'MCT Basic',
        label: 'Pour petites \u00e9quipes',
        body: 'Un point de d\u00e9part clair pour remplacer la coordination informelle.',
        features: ['Enregistrement des demandes', 'Dossiers clients et transporteurs de base', 'Chargement de documents', 'Tableau de bord simple'],
      },
      {
        name: 'MCT Professional',
        label: 'Pour \u00e9quipes en croissance',
        body: 'Plus de structure pour les coordinateurs qui g\u00e8rent utilisateurs, camions, documents et devis.',
        features: ['Espace multi-utilisateur', 'Base transporteurs et camions', 'Alertes d\u2019expiration', 'Comparaison des devis'],
        featured: true,
      },
      {
        name: 'MCT Premium',
        label: 'Pour op\u00e9rations \u00e9tablies',
        body: 'Plus de supervision pour la collaboration partenaire, les risques et la visibilit\u00e9 de gestion.',
        features: ['Options portail', 'Vues de statut avanc\u00e9es', 'Indicateurs de risque', 'Rapports personnalis\u00e9s'],
      },
      {
        name: 'MCT Enterprise',
        label: 'Pour d\u00e9ploiement strat\u00e9gique',
        body: 'Contr\u00f4le configurable pour grandes organisations, flux multi-pays et int\u00e9grations.',
        features: ['Flux personnalis\u00e9s', 'Structure multi-activit\u00e9s', 'Planification des int\u00e9grations', 'Impl\u00e9mentation d\u00e9di\u00e9e'],
      },
    ],
    finalHeading: 'Int\u00e9grez MCT \u00e0 votre op\u00e9ration logistique.',
    finalBody:
      'Demandez une d\u00e9mo commerciale, consultez la plateforme en ligne et voyez comment MCT transforme une coordination transport dispers\u00e9e en flux produit contr\u00f4l\u00e9.',
  },
  de: {
    productEyebrow: 'Malaika Control Tower',
    headline: 'Transportanfragen, Dokumente, Angebote und Entscheidungen in einem Produkt steuern.',
    heroBody:
      'MCT ersetzt verstreute Logistikkoordination durch einen strukturierten Control Tower f\u00fcr Frachteigent\u00fcmer, Koordinatoren, Transporteure und Partner, die eine klarere operative Aufzeichnung brauchen.',
    primaryCta: 'Demo anfragen',
    demoBadge: 'Bereit f\u00fcr Demo',
    subscriptionBadge: 'Enterprise Premium im Einsatz',
    proofLine:
      'MCT ist kommerziell bereit f\u00fcr Demo-Anfragen. JARIDAFRICA nutzt das Produkt derzeit mit dem Enterprise Premium-Abonnement.',
    metrics: [
      { value: 'Bereit', label: 'Produktstatus', detail: 'Jetzt f\u00fcr kommerzielle Demos verf\u00fcgbar.' },
      { value: 'Live', label: 'Kundennachweis', detail: 'JARIDAFRICA nutzt MCT in Produktion.' },
      { value: '1 Ablauf', label: 'Operative Aufzeichnung', detail: 'Anfragen, pr\u00fcfen, vergleichen, verfolgen, berichten.' },
    ],
    dashboard: {
      eyebrow: 'MCT-Betrieb',
      title: 'Kontrollansicht f\u00fcr Transporte',
      subtitle: 'Anfragen, Transporteure, Lkw-Unterlagen, Pr\u00fcfung, Angebote und Status in einem Arbeitsbereich.',
      metrics: [
        { label: 'Anfragen', value: '18', tone: 'bg-[#2E7D32]' },
        { label: 'Lkw-Pakete', value: '11', tone: 'bg-[#1D4ED8]' },
        { label: 'Nachweise offen', value: '5', tone: 'bg-[#D97706]' },
      ],
      rows: [
        { name: 'Routenanfrage', detail: 'Kinshasa nach Lubumbashi', status: 'Zugewiesen' },
        { name: 'C-BRTA-Genehmigung', detail: 'QR- und Portalpr\u00fcfung', status: 'Pr\u00fcfen' },
        { name: 'Angebotsvergleich', detail: 'Preis, Risiko, Bereitschaft', status: 'Vergleichen' },
      ],
    },
    outcomesEyebrow: 'Warum Teams MCT w\u00e4hlen',
    outcomesHeading: 'Kommerzielle Kontrolle f\u00fcr echte Logistikarbeit.',
    outcomesBody:
      'MCT ist auf die t\u00e4glichen Entscheidungen ausgerichtet, die Transportkoordination schwierig machen: unvollst\u00e4ndige Anfragen, fehlende Dokumente, unklare Transportbereitschaft, Angebotshistorie und Nachweise, die in Chats verloren gehen.',
    outcomes: [
      { title: 'Jede Anfrage erfassen', body: 'Route, Fracht, Zeitplan, Kunde und operative Anforderungen in eine kontrollierte Transportaufzeichnung \u00fcberf\u00fchren.' },
      { title: 'Lkw-Unterlagen pr\u00fcfen', body: 'Genehmigungen, Fahrerdokumente, Versicherung, Ablaufdaten und Pr\u00fcfnotizen vor Entscheidungen organisieren.' },
      { title: 'Optionen mit Kontext vergleichen', body: 'Angebote zusammen mit Bereitschaft, Risiko, Dokumentenstatus und Koordinationshistorie pr\u00fcfen.' },
      { title: 'Entscheidungsnachweise behalten', body: 'Dokumente, Pr\u00fcfungen, Status\u00e4nderungen und Berichte mit der Anfrage verbinden, damit die Aufzeichnung nutzbar bleibt.' },
    ],
    workflowEyebrow: 'Produktablauf',
    workflowHeading: 'Von der Anfrage zum Nachweisbericht.',
    workflowBody:
      'MCT gibt Teams eine praktische operative Sequenz, die einfach starten und mit der Organisation reifer werden kann.',
    workflow: [
      { title: 'Anfrage erstellen', body: 'Route, Fracht, Ziel, Zeitplan und operative Anforderungen eingeben.' },
      { title: 'Transporteure ausw\u00e4hlen', body: 'Transportoptionen, Verf\u00fcgbarkeit und Bereitschaft organisieren.' },
      { title: 'Lkw-Paket hochladen', body: 'Genehmigungen, Lkw-Dokumente, Fahrerdateien, Versicherung und zugeh\u00f6rige Nachweise sammeln.' },
      { title: 'Dokumente pr\u00fcfen', body: 'Vollst\u00e4ndigkeit, Ablaufdaten, Abweichungen, offizielle Pr\u00fcfungen und offene Punkte verfolgen.' },
      { title: 'Angebote vergleichen', body: 'Preis, Risiko, Dokumentenstatus und operative Passung gemeinsam bewerten.' },
      { title: 'Status verfolgen', body: 'Den Transport durch zugewiesen, Beladung, Grenze, geliefert und geschlossen bewegen.' },
      { title: 'Bericht exportieren', body: 'Eine strukturierte Zusammenfassung f\u00fcr interne Kontrolle oder Kundenpr\u00fcfung erzeugen.' },
    ],
    modulesEyebrow: 'Was enthalten ist',
    modulesHeading: 'Ein fokussierter Produkt-Stack f\u00fcr Transportkontrolle.',
    modulesBody:
      'MCT ist keine allgemeine Brosch\u00fcre. Es ist eine Produktumgebung rund um die Aufzeichnungen, Pr\u00fcfungen und Entscheidungen, die Logistikteams t\u00e4glich bearbeiten.',
    modules: [
      { title: 'Anfragemanagement', body: 'Strukturierte Transportanfragen mit Verantwortlichen, Kontakten, Frachtdetails und Status.' },
      { title: 'Kunden- und Partnerprofile', body: 'Organisierte Datens\u00e4tze f\u00fcr Kunden, Transporteure, Flottenpartner und operative Kontakte.' },
      { title: 'Lkw-Paketkontrolle', body: 'Transporteur, Lkw, Fahrer, Genehmigung, Versicherung und Ablaufdaten an einem Ort.' },
      { title: 'Dokumentenpr\u00fcfung', body: 'Pr\u00fcfnotizen, fehlende Informationen, Ablaufflaggen und Status ungel\u00f6ster Dokumente.' },
      { title: 'Angebotskoordination', body: 'Klarerer Angebotsvergleich und Historie, ohne sensible Margenlogik offenzulegen.' },
      { title: 'Statusdashboard', body: 'Operative Sicht auf Anfragen, offene Aktionen, Pr\u00fcfung und Transportfortschritt.' },
      { title: 'Nachweisspur', body: 'Eine strukturierte Aufzeichnung von Dokumenten, Pr\u00fcfungen, Entscheidungen und Status\u00e4nderungen.' },
      { title: 'Portalbereiter Zugang', body: 'Kontrollierter Zugriff f\u00fcr ausgew\u00e4hlte Kunden oder Partner, wenn Workflows wachsen.' },
    ],
    trustHeading: 'F\u00fcr verantwortliche Verifizierung gebaut.',
    trustBody:
      'Wenn ein Dokument nicht mit dem offiziellen Portal, dem QR-Ergebnis oder dem erforderlichen Nachweis \u00fcbereinstimmt, bleibt sein Status bis zur Korrektur ungel\u00f6st. MCT unterst\u00fctzt nachweisbasierte Kontrolle statt informeller Freigabe.',
    packagesEyebrow: 'Kommerzielle Pakete',
    packagesHeading: 'Starten Sie mit dem Kontrollniveau, das zu Ihrem Betrieb passt.',
    packagesBody:
      'Eine Demo hilft dem Team, das passende Paket zu w\u00e4hlen und zu sehen, wie MCT in Koordination, Pr\u00fcfung, Reporting und Partner-Workflows passt.',
    packages: [
      {
        name: 'MCT Basic',
        label: 'F\u00fcr kleine Teams',
        body: 'Ein klarer Startpunkt, um informelle Koordination zu ersetzen.',
        features: ['Anfrageerfassung', 'Basisdaten f\u00fcr Kunden und Transporteure', 'Dokumentenupload', 'Einfaches Dashboard'],
      },
      {
        name: 'MCT Professional',
        label: 'F\u00fcr wachsende Teams',
        body: 'Mehr Struktur f\u00fcr Koordinatoren, die Nutzer, Lkw, Dokumente und Angebote verwalten.',
        features: ['Mehrbenutzer-Arbeitsbereich', 'Transporteur- und Lkw-Datenbank', 'Ablaufwarnungen', 'Angebotsvergleich'],
        featured: true,
      },
      {
        name: 'MCT Premium',
        label: 'F\u00fcr etablierte Betriebe',
        body: 'St\u00e4rkere Aufsicht f\u00fcr Partnerarbeit, Risikoflaggen und Managementsicht.',
        features: ['Portaloptionen', 'Erweiterte Statusansichten', 'Risikoflaggen', 'Individuelle Berichte'],
      },
      {
        name: 'MCT Enterprise',
        label: 'F\u00fcr strategischen Rollout',
        body: 'Konfigurierbare Kontrolle f\u00fcr gr\u00f6\u00dfere Organisationen, Mehrl\u00e4nder-Workflows und Integrationen.',
        features: ['Individuelle Workflows', 'Mehrere Gesch\u00e4ftseinheiten', 'Integrationsplanung', 'Dedizierte Implementierung'],
      },
    ],
    finalHeading: 'Bringen Sie MCT in Ihren Logistikbetrieb.',
    finalBody:
      'Fordern Sie eine kommerzielle Demo an, pr\u00fcfen Sie die Live-Plattform und sehen Sie, wie MCT verstreute Transportkoordination in einen kontrollierten Produkt-Workflow verwandelt.',
  },
};

const mctCommercialCopyEN: MctCommercialCopy = {
  page: {
    headline: 'The control tower for connected logistics.',
    heroBody:
      'MCT gives logistics teams one operating layer for requests, documents, partners, and decisions across African multimodal transport.',
    demoBadge: 'Commercially ready',
    proofLine:
      'Trusted by JARIDAFRICA.',
    metrics: [
      { value: 'Ready', label: 'Product status', detail: 'Available for commercial demos now.' },
      { value: 'Multi', label: 'Transport scope', detail: 'Road freight, sea freight, and rail-ready coordination.' },
      { value: '60-90', label: 'Pilot days', detail: 'A focused path from one corridor or workflow to measurable rollout.' },
    ],
    outcomesEyebrow: 'Control tower pillars',
    outcomesHeading: 'Five pillars for complex logistics.',
    outcomesBody:
      'When logistics work is split across messages, files, and calls, MCT turns the moving parts into a clearer operating record.',
    outcomes: [
      { title: 'Visibility', body: 'Dashboards for shipments, transporters, documents, routes, corridors, ports, border events, and performance status.' },
      { title: 'Verification', body: 'Structured checks for delivery information, transport documents, permits, cargo references, expiry dates, and evidence.' },
      { title: 'Coordination', body: 'Workflows for teams, contractors, transporters, agents, clients, ports, sites, and management.' },
      { title: 'Governance', body: 'Rules, approvals, statuses, accountability, audit history, role-based access, and reporting.' },
      { title: 'Intelligence', body: 'Risk flags, delay insights, recurring issue analysis, trends, and future AI recommendations.' },
    ],
    workflowEyebrow: 'Implementation flow',
    workflowHeading: 'From first discovery to a focused pilot.',
    workflowBody:
      'Start with one corridor, route, client, or department; prove the setup; then scale with confidence.',
    workflow: [
      { title: 'Discovery', body: 'Clarify the operation, users, decisions, documents, risks, and success criteria.' },
      { title: 'Workflow mapping', body: 'Map shipment, transporter, document, approval, reporting, and stakeholder workflows.' },
      { title: 'Package selection', body: 'Choose the package that fits the current level of control and ambition.' },
      { title: 'Configuration', body: 'Set fields, statuses, roles, dashboards, document types, and report templates.' },
      { title: 'Pilot or launch', body: 'Run a focused launch with one team, corridor, client, mode, or workflow.' },
      { title: 'Review and scale', body: 'Measure adoption, adjust the setup, and extend to more teams or modules.' },
    ],
    modulesEyebrow: 'Platform architecture',
    modulesHeading: 'A modular product stack, not a one-size-fits-all tool.',
    modulesBody:
      'Start with the core workflow, then configure the modules your operation actually needs.',
    modules: [
      { title: 'MCT Core', body: 'User management, dashboards, statuses, records, tasks, notifications, document center, reports, and audit history.' },
      { title: 'Logistics modules', body: 'Road freight, sea freight, rail-ready handovers, corridor monitoring, border updates, and port or terminal workflows.' },
      { title: 'Configuration layer', body: 'Custom fields, workflows, approvals, roles, dashboards, document types, report templates, and integrations.' },
      { title: 'Intelligence layer', body: 'Risk scoring, trends, delay analysis, quality indicators, and future AI recommendations.' },
      { title: 'Document control', body: 'Verification checklists, missing-document status, expiry tracking, evidence notes, and approval readiness.' },
      { title: 'Operational reporting', body: 'Standard, management, client, corridor, shipment, and executive views from one source of truth.' },
    ],
    trustHeading: 'Built for responsible verification.',
    trustBody:
      'Incomplete or mismatched documents stay visible until they are corrected, so teams can act on evidence instead of assumptions.',
    packagesEyebrow: 'Commercial packages',
    packagesHeading: 'Choose the package that matches your operation.',
    packagesBody:
      'Compare the starting points, then use a demo to confirm the right fit for your team.',
    packages: [
      {
        name: 'MCT Basic',
        label: 'Structured visibility',
        price: 'Starting price USD 750/month',
        setup: 'Setup starting price USD 1,500',
        body: 'For small teams starting digital organization with central records, documents, status, and simple reporting.',
        features: ['One logistics workflow', 'Small team access', 'Basic statuses and document lists', 'Standard dashboard'],
      },
      {
        name: 'MCT Professional',
        label: 'Accountability and document control',
        price: 'Starting price USD 1,500/month',
        setup: 'Setup starting price USD 3,000',
        body: 'For growing operations that need clearer ownership, document control, quote coordination, evidence logs, and operational reporting.',
        features: ['Multi-user workspace', 'Transporter and truck records', 'Document verification checklist', 'Quote comparison and evidence logs'],
        featured: true,
      },
      {
        name: 'MCT Premium',
        label: 'Advanced visibility and risk control',
        price: 'Starting price USD 3,000/month',
        setup: 'Setup starting price USD 7,500',
        body: 'For established operations that need partner portals, advanced status views, custom reports, priority support, and risk control.',
        features: ['Partner portal options', 'Advanced status and risk views', 'Custom management reports', 'Integration-ready exports'],
      },
      {
        name: 'MCT Enterprise',
        label: 'Enterprise infrastructure',
        price: 'Starting price USD 5,000/month',
        setup: 'Setup starting price USD 10,000',
        body: 'For large logistics organizations needing multi-country deployment, integrations, security, SLA, and executive control.',
        features: ['Enterprise logistics governance', 'Multi-country rollout', 'Integration-ready architecture', 'Dedicated account lead and SLA'],
      },
    ],
    finalHeading: 'Start with one workflow, then scale.',
    finalBody:
      'Request a demo and define the first workflow worth bringing under control.',
  },
  solutionsEyebrow: 'Logistics control scope',
  solutionsHeading: 'One platform for multimodal logistics work.',
  solutionsBody:
    'MCT supports road freight, sea freight, rail freight, and cross-border coordination without reducing the product to simple tracking.',
  solutionFamilies: [
    {
      title: 'Road Freight Control',
      audience: 'For cargo owners, coordinators, transporters, industrial operators, brokers, and corridor teams.',
      body:
        'Structure requests, transporter readiness, truck packs, route status, permits, quote comparison, incidents, proof of delivery, and evidence history.',
      capabilities: [
        'Shipment and corridor dashboard',
        'Truck pack and permit verification',
        'Transporter and driver records',
        'Quote and evidence tracking',
      ],
      actionLabel: 'Inspect route, permit, and truck pack flow',
      cta: 'Request a road freight demo',
    },
    {
      title: 'Sea Freight Control',
      audience: 'For import/export teams, ports, shipping agents, and terminal operators.',
      body:
        'Keep cargo records, port handovers, customs documents, container tracking, and partner follow-up connected to the same operating record.',
      capabilities: [
        'Container and shipment references',
        'Bills of lading and customs documents',
        'Port and terminal visibility',
        'Carrier and handover coordination',
      ],
      actionLabel: 'Explore port handover and customs coordination',
      cta: 'Request a sea freight demo',
    },
    {
      title: 'Rail Freight Control',
      audience: 'For rail operators, corridor managers, intermodal planners, and logistics teams creating handover workflows.',
      body:
        'Manage rail shipment handovers, corridor handoffs, partner responsibilities, and evidence trails across intermodal freight movements.',
      capabilities: [
        'Rail shipment and handover records',
        'Intermodal corridor visibility',
        'Partner handoff and status tracking',
        'Delivery document and evidence workflows',
      ],
      actionLabel: 'Review rail corridor handover workflows',
      cta: 'Request a rail freight demo',
    },
  ],
};

const mctCommercialCopyByLocale: Record<Locale, MctCommercialCopy> = {
  en: mctCommercialCopyEN,
  sv: {
    ...mctCommercialCopyEN,
    page: {
      headline: 'Kontrolltornet f\u00f6r uppkopplad logistik.',
      heroBody:
        'MCT ger logistikteam ett operativt lager f\u00f6r f\u00f6rfr\u00e5gningar, dokument, partners och beslut inom afrikansk multimodal transport.',
      primaryCta: 'Beg\u00e4r demo',
      demoBadge: 'Kommersiellt redo',
      subscriptionBadge: 'Enterprise Premium anv\u00e4nds',
      proofLine:
        'Betrodd av JARIDAFRICA.',
      outcomesHeading: 'Fem pelare f\u00f6r komplex logistik.',
      outcomesBody:
        'N\u00e4r logistikarbete delas mellan meddelanden, filer och samtal g\u00f6r MCT de r\u00f6rliga delarna till ett tydligare operativt underlag.',
      workflowHeading: 'Fr\u00e5n f\u00f6rsta analys till fokuserad pilot.',
      workflowBody:
        'B\u00f6rja med en korridor, rutt, kund eller avdelning; validera uppl\u00e4gget och skala sedan med trygghet.',
      modulesHeading: 'En modul\u00e4r produktstack, inte ett verktyg f\u00f6r allt.',
      modulesBody:
        'B\u00f6rja med k\u00e4rnfl\u00f6det och konfigurera sedan de moduler som verksamheten faktiskt beh\u00f6ver.',
      trustHeading: 'Byggt f\u00f6r ansvarsfull verifiering.',
      trustBody:
        'Ofullst\u00e4ndiga eller felmatchade dokument f\u00f6rblir synliga tills de korrigeras, s\u00e5 team kan agera p\u00e5 underlag i st\u00e4llet f\u00f6r antaganden.',
      packagesHeading: 'V\u00e4lj paketet som passar verksamheten.',
      packagesBody:
        'J\u00e4mf\u00f6r startpunkterna och anv\u00e4nd sedan en demo f\u00f6r att bekr\u00e4fta r\u00e4tt paket f\u00f6r teamet.',
      finalHeading: 'B\u00f6rja med ett arbetsfl\u00f6de och skala sedan.',
      finalBody:
        'Beg\u00e4r en demo och definiera det f\u00f6rsta arbetsfl\u00f6det som \u00e4r v\u00e4rt att kontrollera.',
    },
    solutionsEyebrow: 'Logistiskt kontrollomf\u00e5ng',
    solutionsHeading: 'En plattform f\u00f6r multimodalt logistikarbete.',
    solutionsBody:
      'MCT st\u00f6djer v\u00e4gfrakt, sj\u00f6frakt, j\u00e4rnv\u00e4gsredo \u00f6verl\u00e4mningar och gr\u00e4ns\u00f6verskridande samordning utan att reducera produkten till enkel sp\u00e5rning.',
    solutionFamilies: [
      {
        title: 'Kontroll av v\u00e4gfrakt',
        audience: 'F\u00f6r varu\u00e4gare, koordinatorer, transport\u00f6rer, industriakt\u00f6rer, m\u00e4klare och korridorteam.',
        body:
          'Strukturera f\u00f6rfr\u00e5gningar, transport\u00f6rsberedskap, lastbilsdokumentation, ruttstatus, tillst\u00e5nd, offertj\u00e4mf\u00f6relse, incidenter, leveransunderlag och historik.',
        capabilities: [
          'Transport- och korridor\u00f6versikt',
          'Verifiering av lastbilsdokumentation och tillst\u00e5nd',
          'Transport\u00f6rs- och f\u00f6rarregister',
          'Sp\u00e5rning av offerter och beslutsunderlag',
        ],
        actionLabel: 'Inspektera rutt-, tillst\u00e5nds- och lastbilsfl\u00f6den',
        cta: 'Beg\u00e4r demo f\u00f6r v\u00e4gfrakt',
      },
      {
        title: 'Kontroll f\u00f6r sj\u00f6frakt och j\u00e4rnv\u00e4gsf\u00f6rberedda fl\u00f6den',
        audience: 'F\u00f6r import- och exportteam, hamnar, agenter, gruvbolag, industrigrupper och r\u00e5varuakt\u00f6rer.',
        body:
          'Samordna containerreferenser, fartygsdatum, fraktdokument, tullfiler, hamnuppdateringar, terminal\u00f6verl\u00e4mningar och framtida fl\u00f6den mellan j\u00e4rnv\u00e4g, v\u00e4g och sj\u00f6.',
        capabilities: [
          'Container- och transportreferenser',
          'Fraktdokument och tullhandlingar',
          'Synlighet f\u00f6r hamn, gr\u00e4ns och terminal',
          'Underlag f\u00f6r j\u00e4rnv\u00e4gsf\u00f6rberedda \u00f6verl\u00e4mningar',
        ],
        cta: 'Diskutera en 90-dagars logistikpilot',
      },
    ],
  },
  fr: {
    ...mctCommercialCopyEN,
    page: {
      headline: 'La tour de contr\u00f4le pour une logistique connect\u00e9e.',
      heroBody:
        'MCT donne aux \u00e9quipes logistiques une couche op\u00e9rationnelle pour demandes, documents, partenaires et d\u00e9cisions dans le transport multimodal africain.',
      primaryCta: 'Demander une d\u00e9mo',
      demoBadge: 'Commercialement pr\u00eat',
      subscriptionBadge: 'Enterprise Premium en usage',
      proofLine:
        'Approuv\u00e9 par JARIDAFRICA.',
      outcomesHeading: 'Cinq piliers pour une logistique complexe.',
      outcomesBody:
        'Quand le travail logistique est dispers\u00e9 entre messages, fichiers et appels, MCT transforme les \u00e9l\u00e9ments mobiles en dossier op\u00e9rationnel plus clair.',
      workflowHeading: 'De la premi\u00e8re analyse \u00e0 un pilote cibl\u00e9.',
      workflowBody:
        'Commencez par un corridor, une route, un client ou un service; validez le dispositif, puis passez \u00e0 l\u2019\u00e9chelle avec confiance.',
      modulesHeading: 'Une pile produit modulaire, pas un outil unique pour tout.',
      modulesBody:
        'Commencez par le flux central, puis configurez les modules dont votre op\u00e9ration a r\u00e9ellement besoin.',
      trustHeading: 'Con\u00e7u pour une v\u00e9rification responsable.',
      trustBody:
        'Les documents incomplets ou incoh\u00e9rents restent visibles jusqu\u2019\u00e0 correction, afin que les \u00e9quipes agissent sur des preuves plut\u00f4t que sur des suppositions.',
      packagesHeading: 'Choisissez l\u2019offre adapt\u00e9e \u00e0 votre op\u00e9ration.',
      packagesBody:
        'Comparez les points de d\u00e9part, puis utilisez une d\u00e9mo pour confirmer le bon choix pour votre \u00e9quipe.',
      finalHeading: 'Commencez par un flux, puis passez \u00e0 l\u2019\u00e9chelle.',
      finalBody:
        'Demandez une d\u00e9mo et d\u00e9finissez le premier flux qui m\u00e9rite d\u2019\u00eatre mieux contr\u00f4l\u00e9.',
    },
    solutionsEyebrow: 'P\u00e9rim\u00e8tre de contr\u00f4le logistique',
    solutionsHeading: 'Une plateforme pour la logistique multimodale.',
    solutionsBody:
      'MCT soutient le fret routier, le fret maritime, les relais pr\u00eats pour le rail et la coordination transfrontali\u00e8re sans r\u00e9duire le produit \u00e0 un simple suivi.',
    solutionFamilies: [
      {
        title: 'Contr\u00f4le du fret routier',
        audience: 'Pour les chargeurs, coordinateurs, transporteurs, op\u00e9rateurs industriels, courtiers et \u00e9quipes corridor.',
        body:
          'Structurer les demandes, la disponibilit\u00e9 transporteur, les dossiers camion, le statut des routes, les permis, la comparaison de devis, les incidents, les preuves de livraison et l\u2019historique.',
        capabilities: [
          'Tableau de bord transport et corridor',
          'V\u00e9rification des dossiers camion et permis',
          'Dossiers transporteurs et conducteurs',
          'Suivi des devis et preuves de d\u00e9cision',
        ],
        actionLabel: 'Inspectez le flux de route, permis et dossiers camion',
        cta: 'Demander une d\u00e9mo fret routier',
      },
      {
        title: 'Contr\u00f4le du fret maritime et des flux pr\u00eats pour le rail',
        audience: 'Pour les \u00e9quipes import/export, ports, agents maritimes, entreprises mini\u00e8res, groupes industriels et acteurs des mati\u00e8res premi\u00e8res.',
        body:
          'Coordonner r\u00e9f\u00e9rences conteneurs, dates navires, connaissements, dossiers douaniers, mises \u00e0 jour portuaires, transferts de terminal et futurs flux rail-route-mer.',
        capabilities: [
          'R\u00e9f\u00e9rences conteneurs et transports',
          'Connaissements et documents douaniers',
          'Visibilit\u00e9 port, fronti\u00e8re et terminal',
          'Dossiers de transfert pr\u00eats pour le rail',
        ],
        cta: 'Discuter d\u2019un pilote logistique de 90 jours',
      },
    ],
  },
  de: {
    ...mctCommercialCopyEN,
    page: {
      ...mctCommercialCopyEN.page,
      headline: 'Der Control Tower f\u00fcr vernetzte Logistik.',
      heroBody:
        'MCT gibt Logistikteams eine operative Ebene f\u00fcr Anfragen, Dokumente, Partner und Entscheidungen im afrikanischen multimodalen Transport.',
      primaryCta: 'Demo anfragen',
      demoBadge: 'Kommerziell bereit',
      subscriptionBadge: 'Enterprise Premium im Einsatz',
      proofLine:
        'Vertraut von JARIDAFRICA.',
      outcomesHeading: 'F\u00fcnf S\u00e4ulen f\u00fcr komplexe Logistik.',
      outcomesBody:
        'Wenn Logistikarbeit \u00fcber Nachrichten, Dateien und Anrufe verteilt ist, macht MCT die beweglichen Teile zu einem klareren operativen Datensatz.',
      workflowHeading: 'Von der ersten Analyse zum fokussierten Pilot.',
      workflowBody:
        'Beginnen Sie mit einem Korridor, einer Route, einem Kunden oder einer Abteilung; beweisen Sie das Setup und skalieren Sie dann mit Vertrauen.',
      modulesHeading: 'Ein modularer Produkt-Stack, kein Werkzeug f\u00fcr alles.',
      modulesBody:
        'Starten Sie mit dem Kernworkflow und konfigurieren Sie danach die Module, die Ihr Betrieb wirklich braucht.',
      trustHeading: 'F\u00fcr verantwortliche Verifizierung gebaut.',
      trustBody:
        'Unvollst\u00e4ndige oder nicht passende Dokumente bleiben sichtbar, bis sie korrigiert sind, damit Teams auf Nachweisen statt Annahmen handeln.',
      packagesHeading: 'W\u00e4hlen Sie das Paket, das zu Ihrem Betrieb passt.',
      packagesBody:
        'Vergleichen Sie die Einstiegspunkte und nutzen Sie eine Demo, um den passenden Umfang f\u00fcr Ihr Team zu best\u00e4tigen.',
      finalHeading: 'Beginnen Sie mit einem Workflow und skalieren Sie dann.',
      finalBody:
        'Fordern Sie eine Demo an und definieren Sie den ersten Workflow, der bessere Kontrolle verdient.',
    },
    solutionsEyebrow: 'Logistischer Kontrollumfang',
    solutionsHeading: 'Eine Plattform f\u00fcr multimodale Logistikarbeit.',
    solutionsBody:
      'MCT unterst\u00fctzt Stra\u00dfenfracht, Seefracht, bahnreife \u00dcbergaben und grenz\u00fcbergreifende Koordination, ohne das Produkt auf einfaches Tracking zu reduzieren.',
  },
};

function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function CheckIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function SectionIntro({
  eyebrow,
  heading,
  body,
  dark = false,
}: {
  eyebrow: string;
  heading: string;
  body: string;
  dark?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${dark ? 'text-[#A5D6A7]' : 'text-[#2E7D32]'}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-4 text-3xl font-light leading-tight md:text-5xl ${dark ? 'text-white' : 'text-[#1F3529]'}`}>
        {heading}
      </h2>
      <p className={`mt-5 text-base leading-8 md:text-lg ${dark ? 'text-white/72' : 'text-[#37474F]/72'}`}>
        {body}
      </p>
    </div>
  );
}

const mctHomeFrameStyle = {
  marginLeft: 'clamp(1.5rem, calc(9.14vw - 0.354rem), 7.875rem)',
  marginRight: 'clamp(1.5rem, calc(11.43vw - 1.286rem), 9rem)',
};

const mctPackageLinkCopyByLocale: Record<Locale, { pricing: string; buyNow: string; learnMore: string }> = {
  en: { pricing: 'View pricing overview', buyNow: 'Buy now', learnMore: 'Learn more' },
  sv: { pricing: 'Visa pris\u00f6versikt', buyNow: 'K\u00f6p nu', learnMore: 'L\u00e4s mer' },
  fr: { pricing: 'Voir l\u2019aper\u00e7u des tarifs', buyNow: 'Acheter maintenant', learnMore: 'En savoir plus' },
  de: { pricing: 'Preis\u00fcbersicht ansehen', buyNow: 'Jetzt kaufen', learnMore: 'Mehr erfahren' },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const MCT = getMct(locale);
  return { title: MCT.seoTitle, description: MCT.metaDescription };
}

export default async function MalaikaControlTowerPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const activeLocale = asLocale(locale);
  if (activeLocale === 'sv') {
    permanentRedirect(localizePath(activeLocale, '/products/nbc'));
  }
  const MCT = getMct(locale);
  const commercialCopy = mctCommercialCopyByLocale[activeLocale];
  const copy: MctPageCopy = { ...mctPageCopyByLocale[activeLocale], ...commercialCopy.page };
  const packageLinkCopy = mctPackageLinkCopyByLocale[activeLocale];
  const demoHref = localizePath(activeLocale, '/contact');

  return (
    <div className="min-h-screen bg-white text-[#37474F]">
      <Navbar />

      <main>
        <section className="relative isolate overflow-hidden bg-[#37474F] pt-20 pb-10 lg:pt-20 lg:pb-8">
          <Image
            src={MCT.heroImage}
            alt=""
            fill
            sizes="100vw"
            className="absolute inset-0 -z-20 object-cover opacity-28"
            priority
          />
          <div className="absolute inset-0 -z-10 bg-[#37474F]/76" />
          <div
            className="absolute inset-0 -z-10 opacity-70"
            style={{
              background:
                'linear-gradient(90deg, rgba(55,71,79,0.96) 0%, rgba(55,71,79,0.82) 44%, rgba(46,125,50,0.42) 100%)',
            }}
          />
          <MctHeroInteractiveBackdrop />

          <div className="mct-home-frame relative z-10 grid grid-cols-1 items-center gap-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(280px,0.52fr)] lg:gap-12" style={mctHomeFrameStyle}>
            <div className="max-w-2xl">
              <div className="mb-4 w-full max-w-[230px] drop-shadow-[0_18px_34px_rgba(0,0,0,0.38)] sm:max-w-[300px] lg:max-w-[280px]">
                <Image
                  src={MCT.logo}
                  alt={`${MCT.name} logo`}
                  width={840}
                  height={400}
                  className="h-auto w-full object-contain"
                  priority
                  unoptimized
                />
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A5D6A7]">{MCT.acronym}</p>
              <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-[0.98] tracking-tight text-white md:text-5xl">
                {copy.headline}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/76 md:text-lg">
                {copy.heroBody}
              </p>
            </div>

            <aside className="border-l-2 border-[#A5D6A7] bg-[#37474F]/42 p-4 text-white shadow-[0_20px_70px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:p-5 lg:justify-self-end lg:self-end">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A5D6A7]">{copy.demoBadge}</p>
              <p className="mt-2 text-xl font-semibold leading-tight text-white sm:mt-3 sm:text-2xl">{copy.subscriptionBadge}</p>
              <p className="mt-2 text-xs leading-5 text-white/72 sm:mt-3 sm:text-sm sm:leading-6">{copy.proofLine}</p>

              <div className="mt-4 flex flex-wrap items-center gap-3 sm:mt-5">
                <a
                  href={demoHref}
                  className="inline-flex items-center justify-center gap-3 rounded-sm bg-white px-5 py-2.5 text-sm font-semibold text-[#1F3529] transition-colors hover:bg-[#A5D6A7] sm:px-6 sm:py-3"
                >
                  <span>{copy.primaryCta}</span>
                  <ArrowIcon />
                </a>
              </div>
            </aside>
          </div>
        </section>

        <section className="border-b border-[#1F3529]/10 bg-white">
          <div className="mct-home-frame grid grid-cols-1 divide-y divide-[#1F3529]/10 md:grid-cols-3 md:divide-x md:divide-y-0" style={mctHomeFrameStyle}>
            {copy.metrics.map((metric) => (
              <div key={metric.label} className="py-8 md:px-8">
                <p className="text-3xl font-semibold text-[#1F3529]">{metric.value}</p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.15em] text-[#2E7D32]">{metric.label}</p>
                <p className="mt-3 text-sm leading-6 text-[#37474F]/70">{metric.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white py-24">
          <div className="mct-home-frame" style={mctHomeFrameStyle}>
            <div className="grid gap-10">
              <SectionIntro
                eyebrow={commercialCopy.solutionsEyebrow}
                heading={commercialCopy.solutionsHeading}
                body={commercialCopy.solutionsBody}
              />

              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {commercialCopy.solutionFamilies.map((solution) => (
                  <article
                    key={solution.title}
                    className="flex min-h-[430px] flex-col border border-[#1F3529]/10 bg-white p-6 shadow-[0_18px_55px_rgba(31,53,41,0.08)]"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2E7D32]">{MCT.acronym}</p>
                    <h3 className="mt-4 text-2xl font-semibold text-[#1F3529]">{solution.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-[#37474F]/74">{solution.body}</p>
                    <p className="mt-4 border-l-2 border-[#2E7D32] pl-4 text-sm leading-6 text-[#37474F]/66">
                      {solution.audience}
                    </p>

                    <ul className="mt-7 grid gap-3">
                      {solution.capabilities.map((capability) => (
                        <li key={capability} className="flex gap-3 text-sm leading-6 text-[#37474F]/78">
                          <CheckIcon className="mt-1 h-4 w-4 flex-none text-[#2E7D32]" />
                          <span>{capability}</span>
                        </li>
                      ))}
                    </ul>

                    {solution.actionLabel ? (
                      <div className="mt-7 rounded-sm bg-[#F6F8F4] p-4 text-sm leading-6 text-[#37474F]/88">
                        {solution.actionLabel}
                      </div>
                    ) : null}

                    <a
                      href={demoHref}
                      className="mt-auto inline-flex items-center justify-center gap-3 rounded-sm border border-[#2E7D32]/30 px-5 py-3 text-sm font-semibold text-[#2E7D32] transition-colors hover:border-[#2E7D32] hover:bg-[#2E7D32]/6"
                    >
                      <span>{solution.cta}</span>
                      <ArrowIcon />
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F6F8F4] py-24">
          <div className="mct-home-frame" style={mctHomeFrameStyle}>
            <SectionIntro eyebrow={copy.outcomesEyebrow} heading={copy.outcomesHeading} body={copy.outcomesBody} />
            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
              {copy.outcomes.map((outcome) => (
                <article key={outcome.title} className="border border-[#1F3529]/10 bg-white p-6 shadow-[0_18px_55px_rgba(31,53,41,0.08)]">
                  <span className="mb-6 block h-1.5 w-12 rounded-sm bg-[#2E7D32]" />
                  <h3 className="text-xl font-semibold text-[#1F3529]">{outcome.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#37474F]/72">{outcome.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#37474F] py-24">
          <div className="mct-home-frame" style={mctHomeFrameStyle}>
            <SectionIntro eyebrow={copy.workflowEyebrow} heading={copy.workflowHeading} body={copy.workflowBody} dark />

            <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-6">
              {copy.workflow.map((step, index) => (
                <article key={step.title} className="bg-[#37474F] p-5">
                  <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-sm bg-[#A5D6A7] text-sm font-semibold text-[#1F3529]">
                    {index + 1}
                  </span>
                  <h3 className="text-base font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/68">{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-24">
          <div className="mct-home-frame grid grid-cols-1 gap-12 lg:grid-cols-[0.75fr_1.25fr]" style={mctHomeFrameStyle}>
            <SectionIntro eyebrow={copy.modulesEyebrow} heading={copy.modulesHeading} body={copy.modulesBody} />
            <div className="grid grid-cols-1 gap-px overflow-hidden border border-[#1F3529]/10 bg-[#1F3529]/10 md:grid-cols-2">
              {copy.modules.map((module) => (
                <article key={module.title} className="bg-white p-6">
                  <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-sm bg-[#2E7D32]/10 text-[#2E7D32]">
                    <CheckIcon />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1F3529]">{module.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#37474F]/72">{module.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#EAF2E7] py-20">
          <div className="mct-home-frame grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]" style={mctHomeFrameStyle}>
            <h2 className="text-3xl font-light leading-tight text-[#1F3529] md:text-5xl">{copy.trustHeading}</h2>
            <p className="border-l-4 border-[#2E7D32] bg-white p-6 text-base leading-8 text-[#37474F]/76 shadow-[0_18px_55px_rgba(31,53,41,0.08)] md:text-lg">
              {copy.trustBody}
            </p>
          </div>
        </section>

        <section className="bg-white py-24">
          <div className="mct-home-frame" style={mctHomeFrameStyle}>
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <SectionIntro eyebrow={copy.packagesEyebrow} heading={copy.packagesHeading} body={copy.packagesBody} />
              <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end lg:min-w-[28rem] lg:grid-cols-1">
                <MctCurrencySwitcher locale={activeLocale} />
                <a
                  href={localizePath(activeLocale, '/products/mct/pricing')}
                  className="inline-flex w-fit items-center justify-center gap-3 rounded-sm border border-[#2E7D32]/30 px-5 py-3 text-sm font-semibold text-[#2E7D32] transition-colors hover:border-[#2E7D32] hover:bg-[#2E7D32]/6"
                >
                  <span>{packageLinkCopy.pricing}</span>
                  <ArrowIcon />
                </a>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              {copy.packages.map((tier) => {
                const tierSlug = tier.name.replace('MCT ', '').toLowerCase();
                return (
                  <article
                    key={tier.name}
                    className={`flex min-h-[430px] flex-col border p-6 shadow-[0_18px_55px_rgba(31,53,41,0.08)] ${
                      tier.featured
                        ? 'border-[#2E7D32] bg-[#1F3529] text-white'
                        : 'border-[#1F3529]/10 bg-white text-[#1F3529]'
                    }`}
                  >
                    <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${tier.featured ? 'text-[#A5D6A7]' : 'text-[#2E7D32]'}`}>
                      {tier.label}
                    </p>
                    <h3 className="mt-4 text-2xl font-semibold">{tier.name}</h3>
                    {(tier.price || tier.setup) && (
                      <div className={`mt-5 border-y py-4 ${tier.featured ? 'border-white/16' : 'border-[#1F3529]/10'}`}>
                        {tier.price && (
                          <p className={`text-xl font-semibold ${tier.featured ? 'text-white' : 'text-[#1F3529]'}`}>
                            <MctConvertedPrice source={tier.price} locale={activeLocale} kind="monthly" />
                          </p>
                        )}
                        {tier.setup && (
                          <p className={`mt-1 text-xs font-semibold uppercase tracking-[0.14em] ${tier.featured ? 'text-white/58' : 'text-[#37474F]/56'}`}>
                            <MctConvertedPrice source={tier.setup} locale={activeLocale} kind="setup" />
                          </p>
                        )}
                      </div>
                    )}
                    <p className={`mt-4 text-sm leading-7 ${tier.featured ? 'text-white/72' : 'text-[#37474F]/72'}`}>
                      {tier.body}
                    </p>
                    <ul className="mt-7 grid gap-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex gap-3 text-sm leading-6">
                          <CheckIcon className={`mt-1 h-4 w-4 flex-none ${tier.featured ? 'text-[#A5D6A7]' : 'text-[#2E7D32]'}`} />
                          <span className={tier.featured ? 'text-white/82' : 'text-[#37474F]/82'}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto grid gap-3 pt-7">
                      <a
                        href={localizePath(activeLocale, `/contact?product=mct&package=${tierSlug}`)}
                        className={`inline-flex items-center justify-center gap-3 rounded-sm px-5 py-3 text-sm font-semibold transition-colors ${
                          tier.featured
                            ? 'bg-white text-[#1F3529] hover:bg-[#A5D6A7]'
                            : 'bg-[#2E7D32] text-white hover:bg-[#1F5B25]'
                        }`}
                      >
                        <span>{packageLinkCopy.buyNow}</span>
                        <ArrowIcon />
                      </a>
                      <a
                        href={localizePath(activeLocale, `/products/mct/${tierSlug}`)}
                        className={`inline-flex items-center justify-center gap-3 rounded-sm border px-5 py-3 text-sm font-semibold transition-colors ${
                          tier.featured
                            ? 'border-white/24 text-white hover:border-[#A5D6A7] hover:bg-white/10'
                            : 'border-[#2E7D32]/30 text-[#2E7D32] hover:border-[#2E7D32] hover:bg-[#2E7D32]/6'
                        }`}
                      >
                        <span>{packageLinkCopy.learnMore}</span>
                        <ArrowIcon />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#37474F] py-24">
          <Image
            src={MCT.heroImage}
            alt=""
            fill
            sizes="100vw"
            className="absolute inset-0 object-cover opacity-18"
          />
          <div className="absolute inset-0 bg-[#37474F]/82" />
          <div className="mct-home-frame relative text-center" style={mctHomeFrameStyle}>
            <h2 className="text-4xl font-semibold leading-tight text-white md:text-6xl">{copy.finalHeading}</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/76">{copy.finalBody}</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href={demoHref}
                className="inline-flex items-center justify-center gap-3 rounded-sm bg-white px-8 py-4 text-sm font-semibold text-[#1F3529] transition-colors hover:bg-[#A5D6A7]"
              >
                <span>{copy.primaryCta}</span>
                <ArrowIcon />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
