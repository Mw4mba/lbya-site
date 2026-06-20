import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import NbcHeroInteractiveBackdrop from '@/app/components/NbcHeroInteractiveBackdrop';
import { pageFrameStyle } from '@/app/components/LayoutFrame';
import { getNbc } from '@/app/content/products';
import { asLocale, type Locale } from '@/app/content/locale';
import { localizePath } from '@/app/content/paths';

type Props = { params: Promise<{ locale: string }> };

type NbcPackage = {
  name: string;
  kicker: string;
  summary: string;
  suitable: string[];
  includes: string[];
  inheritance?: string;
  cta: string;
};

type NbcFileSupportPackage = {
  packageName: string;
  approach: string;
};

type NbcCopy = {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBody: string;
  heroLine: string;
  primaryCta: string;
  secondaryCta: string;
  productNote: string;
  heroSignals: string[];
  summaryTitle: string;
  summaryBody: string[];
  nameEyebrow: string;
  nameTitle: string;
  nameBody: string[];
  whyEyebrow: string;
  whyTitle: string;
  whyBody: string;
  informationTitle: string;
  informationItems: string[];
  controlEyebrow: string;
  controlTitle: string;
  controlIntro: string;
  controls: { title: string; body: string }[];
  audienceEyebrow: string;
  audienceTitle: string;
  audienceIntro: string;
  audienceGroups: string[];
  valueTitle: string;
  values: { title: string; body: string }[];
  packagesEyebrow: string;
  packagesTitle: string;
  packagesIntro: string;
  packageSuitableLabel: string;
  packageIncludesLabel: string;
  packages: NbcPackage[];
  fileSupportEyebrow: string;
  fileSupportTitle: string;
  fileSupportIntro: string;
  fileSupportPackageTitle: string;
  fileSupportPackageLabel: string;
  fileSupportApproachLabel: string;
  fileSupportPackages: NbcFileSupportPackage[];
  fileSupportMvpTitle: string;
  fileSupportMvpIntro: string;
  fileSupportUploadTitle: string;
  fileSupportValidationTitle: string;
  fileSupportRecognitionTitle: string;
  fileSupportReportsTitle: string;
  fileSupportUploadFormats: string[];
  fileSupportValidationFormats: string[];
  fileSupportRecognitionFormats: string[];
  fileSupportReports: string[];
  deploymentEyebrow: string;
  deploymentTitle: string;
  deploymentBody: string[];
  deploymentDirectionTitle: string;
  deploymentDirections: string[];
  chooseEyebrow: string;
  chooseTitle: string;
  choosePoints: { title: string; body: string }[];
  ctaTitle: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
  footerLine: string;
};

const nbcCopyByLocale: Record<Locale, NbcCopy> = {
  en: {
    heroEyebrow: 'A product by LBYA',
    heroTitle: 'NBC - Nayeli BIM Control',
    heroSubtitle: 'BIM governance, project readiness, and construction intelligence for complex delivery teams.',
    heroBody:
      'NBC is a BIM control platform under development for organizations that need a clearer, more reliable view of model quality, coordination risk, delivery readiness, project evidence, and client decision-making.',
    heroLine: 'Know what is ready. See what is at risk. Control the next decision.',
    primaryCta: 'Explore packages',
    secondaryCta: 'Request private introduction',
    productNote: 'Designed for BIM managers, contractors, consultants, public clients, infrastructure owners, and asset owners.',
    heroSignals: ['Ready', 'Risk', 'Owner'],
    summaryTitle: 'A control layer for BIM information, risk, and readiness.',
    summaryBody: [
      'NBC helps construction teams move from scattered BIM activity to structured project intelligence, with clearer visibility over model health, issue ownership, coordination risk, delivery readiness, reporting, and evidence.',
      'It is being developed for organizations that need stronger BIM control without adding unnecessary complexity, while continuing to work alongside existing authoring, review, collaboration, and Common Data Environment tools.',
    ],
    nameEyebrow: 'About the name',
    nameTitle: 'A name shaped by responsibility for the built environment.',
    nameBody: [
      'NBC stands for Nayeli BIM Control. Nayeli means "I love you", but here the meaning is used quietly and professionally: as a reminder that care, responsibility, and quality belong inside project information.',
      'Projects deserve care. Information deserves control. Decisions deserve clarity. Buildings and infrastructure become hospitals, homes, schools, transport systems, industrial facilities, and public spaces. NBC is being developed to help teams protect the quality of what they know before they decide what to build.',
    ],
    whyEyebrow: 'Why NBC is being developed',
    whyTitle: 'BIM information is expanding. Control must catch up.',
    whyBody:
      'Modern projects generate models, drawings, issues, revisions, reports, approvals, client requirements, coordination decisions, and handover data. As delivery becomes more complex, teams need a trusted way to see what is reliable, what changed, what remains unresolved, and whether the project is ready for the next stage.',
    informationTitle: 'NBC is being designed to support',
    informationItems: [
      'BIM governance',
      'model health visibility',
      'coordination risk tracking',
      'issue responsibility',
      'delivery readiness',
      'client reporting',
      'project evidence',
      'portfolio visibility',
      'secure project control',
    ],
    controlEyebrow: 'Control areas',
    controlTitle: 'What NBC is being shaped to control',
    controlIntro:
      'NBC is not a modelling tool and is not intended to replace existing BIM authoring, checking, collaboration, or CDE platforms. It sits as a BIM control layer around the work teams already do, helping them understand readiness, risk, evidence, and ownership with greater confidence.',
    controls: [
      { title: 'Model Health', body: 'Review the reliability, completeness, and readiness of BIM information before it supports coordination, delivery, client review, or handover.' },
      { title: 'Issue Intelligence', body: 'Track BIM-related issues with severity, responsibility, deadlines, project impact, and decision relevance.' },
      { title: 'Delivery Readiness', body: 'Understand whether project information is ready for coordination, construction documentation, client approval, or handover.' },
      { title: 'Coordination Risk', body: 'Identify unresolved issues, missing information, and discipline conflicts before they become delivery risk.' },
      { title: 'Reports & Evidence', body: 'Create a clearer reporting basis for project teams, clients, milestone reviews, and internal governance.' },
      { title: 'Client Visibility', body: 'Give clients and decision-makers a simplified view of project readiness without exposing unnecessary technical complexity.' },
      { title: 'Portfolio Control', body: 'Help organizations managing several projects compare readiness, risk levels, and BIM control status.' },
      { title: 'Enterprise Governance', body: 'Being designed around role-based access, permissions, audit visibility, controlled workflows, and enterprise deployment needs.' },
    ],
    audienceEyebrow: 'Built for construction industry teams',
    audienceTitle: 'BIM control for delivery teams. Executive clarity for decision-makers.',
    audienceIntro:
      'NBC is intended to help technical teams manage information with discipline while giving leadership a clearer view of readiness, risk, and accountability.',
    audienceGroups: [
      'BIM managers',
      'BIM coordinators',
      'architects',
      'structural engineers',
      'MEP teams',
      'contractors',
      'project managers',
      'public-sector clients',
      'real estate developers',
      'asset owners',
      'infrastructure teams',
      'enterprise construction organizations',
    ],
    valueTitle: 'Value by role',
    values: [
      { title: 'For BIM managers', body: 'Monitor model health, issue status, readiness, reporting, and information quality across teams and projects.' },
      { title: 'For project managers', body: 'See what is blocking progress, which issues require attention, and whether the project is ready for the next decision point.' },
      { title: 'For consultants', body: 'Present a clearer record of model quality, coordination status, and delivery readiness.' },
      { title: 'For contractors', body: 'Detect coordination risks, unresolved issues, and information gaps before they affect construction.' },
      { title: 'For clients and asset owners', body: 'Understand progress, information readiness, risks, approvals, and next actions in a cleaner decision view.' },
      { title: 'For enterprise organizations', body: 'Standardize how BIM governance, project risk, reporting, and evidence are monitored across multiple projects.' },
    ],
    packagesEyebrow: 'NBC packages',
    packagesTitle: 'Select the right level of BIM control for your organization',
    packagesIntro:
      'NBC package conversations are handled through a private introduction. Public pricing is not displayed while the product is being shaped with qualified teams; final availability depends on project context, organization needs, and security requirements.',
    packageSuitableLabel: 'Suitable for',
    packageIncludesLabel: 'Includes',
    packages: [
      {
        name: 'NBC Essential',
        kicker: 'For early validation, pilots, and smaller BIM offices.',
        summary:
          'Create a dependable project view with model uploads, basic health signals, open issues, and a client-ready snapshot.',
        suitable: ['small BIM teams', 'BIM consultants', 'architecture offices', 'engineering offices', 'pilot projects', 'internal BIM quality reviews'],
        includes: ['project command center', 'model upload overview', 'basic model health indicators', 'issue tracking overview', 'delivery readiness snapshot', 'client-friendly project summary', 'basic readiness snapshot', 'basic issue overview', 'basic file tracking', 'simple report preview', 'Readiness Passport preview'],
        cta: 'Request Essential Introduction',
      },
      {
        name: 'NBC Professional',
        kicker: 'For live coordination across disciplines.',
        summary:
          'Add ownership, due dates, validation context, risk indicators, and export-ready reporting for active delivery.',
        suitable: ['BIM coordination teams', 'engineering consultants', 'multidisciplinary design teams', 'contractors', 'project managers', 'client-facing delivery teams'],
        includes: ['advanced command center', 'model validation overview', 'issue intelligence dashboard', 'responsibility and due-date tracking', 'coordination risk indicators', 'export-ready report structure', 'Readiness Passport', 'Decision Gates', 'Evidence Pack', 'What Changed Since Last Review', 'Next Best Action', 'single-project 3D Asset Readiness Snapshot'],
        inheritance: 'Includes all Essential controls.',
        cta: 'Request Professional Access',
      },
      {
        name: 'NBC Enterprise',
        kicker: 'For portfolios, public clients, and large delivery organizations.',
        summary:
          'Standardize governance across projects with portfolio visibility, audit evidence, role structures, and integration-ready workspaces.',
        suitable: ['large contractors', 'public-sector clients', 'infrastructure owners', 'real estate developers', 'enterprise BIM departments', 'multi-project organizations'],
        includes: ['portfolio control dashboard', 'multi-project risk overview', 'enterprise role structure', 'audit evidence overview', 'executive reporting structure', 'integration-ready workspace', 'portfolio decision gates', 'multi-project evidence packs', 'executive weekly brief', 'secure review room', 'project memory', 'custom rule set templates', 'local standards templates', 'advanced 3D Asset Readiness filtering'],
        inheritance: 'Includes all Professional controls.',
        cta: 'Explore Enterprise',
      },
      {
        name: 'NBC Secure Offline',
        kicker: 'For sensitive projects that cannot depend on open cloud access.',
        summary:
          'Keep model review, issue tracking, reporting, and evidence exports under local control for restricted environments.',
        suitable: ['sensitive public infrastructure', 'secure government projects', 'hospitals', 'airports', 'rail and metro projects', 'data centers', 'air-gapped IT networks'],
        includes: ['local project control', 'local model validation overview', 'local issue and risk tracking', 'local report generation', 'local evidence export', 'controlled update process', 'offline evidence packs', 'local project memory', 'deterministic validation records', 'no black box validation', 'local rule set versioning', 'local 3D Asset Readiness Snapshot', 'zero telemetry', 'controlled update cycle'],
        inheritance: 'Includes selected Enterprise capabilities for restricted environments.',
        cta: 'Discuss Secure Offline',
      },
    ],
    fileSupportEyebrow: 'Global file support',
    fileSupportTitle: 'Multi-format BIM control without forcing teams into one tool.',
    fileSupportIntro:
      'NBC is being shaped around the file reality of BIM delivery: open standards, issue files, information requirements, reports, native-model references, and evidence packs. The level of validation depends on the package and the technical access available for each project.',
    fileSupportPackageTitle: 'File support by package',
    fileSupportPackageLabel: 'Package',
    fileSupportApproachLabel: 'File support approach',
    fileSupportPackages: [
      { packageName: 'Essential', approach: 'Basic upload, IFC overview, PDF and XLSX reports.' },
      { packageName: 'Professional', approach: 'IFC validation, BCF issue import/export, and IDS-ready workflows.' },
      { packageName: 'Enterprise', approach: 'Multi-project file control, connectors, custom templates, and advanced verification.' },
      { packageName: 'Secure Offline', approach: 'File-based IFC, BCF, IDS, XLSX, and PDF workflows with no external connectivity.' },
    ],
    fileSupportMvpTitle: 'MVP global file support',
    fileSupportMvpIntro:
      'The first product direction separates formats that can be deeply validated from formats that should be safely stored, recognized, referenced, or exported as project evidence.',
    fileSupportUploadTitle: 'Upload support',
    fileSupportValidationTitle: 'Deep validation',
    fileSupportRecognitionTitle: 'Basic recognition only',
    fileSupportReportsTitle: 'Reports',
    fileSupportUploadFormats: ['IFC', 'BCF / BCFZIP', 'IDS', 'XLSX', 'PDF', 'DWG', 'RVT', 'NWD', 'ZIP'],
    fileSupportValidationFormats: ['IFC', 'IDS', 'BCF', 'XLSX templates'],
    fileSupportRecognitionFormats: ['RVT', 'DWG', 'NWD', 'ZIP', 'PDF'],
    fileSupportReports: ['PDF export', 'XLSX export', 'ZIP evidence pack'],
    deploymentEyebrow: 'Security and deployment positioning',
    deploymentTitle: 'Designed for controlled collaboration, private governance, and secure environments.',
    deploymentBody: [
      'NBC is being designed with flexible deployment needs in mind. Some teams need fast cloud-based collaboration. Larger organizations may require private governance environments. Sensitive projects may require offline operation and strict local control.',
      'Deployment options may vary by package, project requirements, and technical feasibility. Enterprise and secure offline options are intended for qualified use cases only.',
    ],
    deploymentDirectionTitle: 'Deployment direction under consideration',
    deploymentDirections: [
      'Cloud-based workspace for collaborative project teams',
      'Enterprise workspace for larger organizations',
      'Secure offline option for restricted environments',
      'File-based workflows where external connectivity is not permitted',
      'Controlled access and permission structures',
      'Audit-ready reporting and evidence export',
    ],
    chooseEyebrow: 'Why choose NBC?',
    chooseTitle: 'A governance-grade control layer for high-stakes BIM decisions.',
    choosePoints: [
      { title: 'Clarity for project teams', body: 'Understand what is ready, what is missing, what is exposed to risk, and who must act next.' },
      { title: 'Confidence for clients', body: 'Give clients a clearer view of progress, coordination status, readiness, and key decisions.' },
      { title: 'Control for BIM managers', body: 'Support model health visibility, issue intelligence, delivery readiness, and structured reporting.' },
      { title: 'Governance for large organizations', body: 'Standardize how BIM quality, risk, responsibilities, and evidence are monitored across projects.' },
      { title: 'Security options for sensitive projects', body: 'Support restricted environments through secure offline deployment options designed for qualified use cases.' },
      { title: 'Built around responsibility', body: 'Better information control leads to better project decisions and stronger built outcomes.' },
    ],
    ctaTitle: 'Explore NBC privately',
    ctaBody:
      'NBC is currently being developed for project teams, consultants, contractors, public clients, and enterprise construction organizations that need better BIM control. Request a private introduction to discuss project fit, package direction, and how NBC could support your organization.',
    ctaPrimary: 'Request private introduction',
    ctaSecondary: 'View packages',
    footerLine: 'NBC - Nayeli BIM Control. A product by LBYA.',
  },
  sv: {
    heroEyebrow: 'En produkt från LBYA',
    heroTitle: 'NBC - Nayeli BIM Control',
    heroSubtitle: 'BIM-styrning, projektberedskap och byggintelligens för komplexa leveransteam.',
    heroBody:
      'NBC är en BIM-kontrollplattform under utveckling för organisationer som behöver en tydligare och mer tillförlitlig bild av modellkvalitet, samordningsrisk, leveransberedskap, projektunderlag och kundbeslut.',
    heroLine: 'Se vad som är redo. Förstå vad som är utsatt för risk. Kontrollera nästa beslut.',
    primaryCta: 'Utforska paketen',
    secondaryCta: 'Begär privat introduktion',
    productNote: 'Utformad för BIM-ansvariga, entreprenörer, konsulter, offentliga beställare, infrastrukturägare och fastighetsägare.',
    heroSignals: ['Redo', 'Risk', 'Ägare'],
    summaryTitle: 'Ett kontrollager för BIM-information, risk och beredskap.',
    summaryBody: [
      'NBC hjälper byggteam att gå från spridd BIM-aktivitet till strukturerad projektintelligens, med tydligare överblick över modellhälsa, ärendeägarskap, samordningsrisk, leveransberedskap, rapportering och underlag.',
      'Produkten utvecklas för organisationer som behöver starkare BIM-kontroll utan onödig komplexitet, samtidigt som den fungerar bredvid befintliga verktyg för modellering, granskning, samarbete och gemensamma datamiljöer.',
    ],
    nameEyebrow: 'Om namnet',
    nameTitle: 'Ett namn format av ansvar för den byggda miljön.',
    nameBody: [
      'NBC står för Nayeli BIM Control. Nayeli betyder "jag älskar dig", men här används betydelsen diskret och professionellt: som en påminnelse om att omsorg, ansvar och kvalitet hör hemma i projektinformation.',
      'Projekt förtjänar omsorg. Information förtjänar kontroll. Beslut förtjänar tydlighet. Byggnader och infrastruktur blir sjukhus, hem, skolor, transportsystem, industrimiljöer och offentliga platser. NBC utvecklas för att hjälpa team skydda kvaliteten i det de vet innan de beslutar vad som ska byggas.',
    ],
    whyEyebrow: 'Varför NBC utvecklas',
    whyTitle: 'BIM-informationen växer. Kontrollen måste följa med.',
    whyBody:
      'Moderna projekt skapar modeller, ritningar, ärenden, revisioner, rapporter, godkännanden, kundkrav, samordningsbeslut och överlämningsdata. När leveransen blir mer komplex behöver team ett pålitligt sätt att se vad som är tillförlitligt, vad som har ändrats, vad som fortfarande är olöst och om projektet är redo för nästa steg.',
    informationTitle: 'NBC utformas för att stödja',
    informationItems: [
      'BIM-styrning',
      'överblick över modellhälsa',
      'spårning av samordningsrisk',
      'ärendeansvar',
      'leveransberedskap',
      'kundrapportering',
      'projektunderlag',
      'portföljöversikt',
      'säker projektkontroll',
    ],
    controlEyebrow: 'Kontrollområden',
    controlTitle: 'Det NBC formas för att kontrollera',
    controlIntro:
      'NBC är inte ett modelleringsverktyg och är inte avsett att ersätta befintliga BIM-verktyg för modellering, kontroll, samarbete eller gemensamma datamiljöer. Det fungerar som ett BIM-kontrollager runt arbetet team redan gör och hjälper dem förstå beredskap, risk, underlag och ansvar med större trygghet.',
    controls: [
      { title: 'Modellhälsa', body: 'Granska tillförlitlighet, kompletthet och beredskap i BIM-information innan den används för samordning, leverans, kundgranskning eller överlämning.' },
      { title: 'Ärendeintelligens', body: 'Spåra BIM-relaterade ärenden med allvarlighetsgrad, ansvar, tidsfrister, projektpåverkan och beslutsrelevans.' },
      { title: 'Leveransberedskap', body: 'Förstå om projektinformation är redo för samordning, bygghandlingar, kundgodkännande eller överlämning.' },
      { title: 'Samordningsrisk', body: 'Identifiera olösta ärenden, saknad information och disciplinkonflikter innan de blir leveransrisk.' },
      { title: 'Rapporter och underlag', body: 'Skapa en tydligare rapporteringsgrund för projektteam, kunder, milstolpsgranskningar och intern styrning.' },
      { title: 'Kundöverblick', body: 'Ge kunder och beslutsfattare en förenklad bild av projektberedskap utan onödig teknisk komplexitet.' },
      { title: 'Portföljkontroll', body: 'Hjälp organisationer med flera projekt jämföra beredskap, risknivåer och BIM-kontrollstatus.' },
      { title: 'Enterprise-styrning', body: 'Utformas kring rollbaserad åtkomst, behörigheter, revisionssynlighet, kontrollerade arbetsflöden och enterprise-behov.' },
    ],
    audienceEyebrow: 'Byggd för byggbranschens team',
    audienceTitle: 'BIM-kontroll för leveransteam. Tydligare ledningsbild för beslutsfattare.',
    audienceIntro:
      'NBC är avsett att hjälpa tekniska team hantera information med disciplin och samtidigt ge ledningen en tydligare bild av beredskap, risk och ansvar.',
    audienceGroups: [
      'BIM-ansvariga',
      'BIM-samordnare',
      'arkitekter',
      'konstruktörer',
      'installations- och MEP-team',
      'entreprenörer',
      'projektledare',
      'offentliga beställare',
      'fastighetsutvecklare',
      'tillgångsägare',
      'infrastrukturteam',
      'enterprise-organisationer inom bygg',
    ],
    valueTitle: 'Värde per roll',
    values: [
      { title: 'För BIM-ansvariga', body: 'Följ modellhälsa, ärendestatus, beredskap, rapportering och informationskvalitet över team och projekt.' },
      { title: 'För projektledare', body: 'Se vad som blockerar framdrift, vilka ärenden som kräver uppmärksamhet och om projektet är redo för nästa beslutspunkt.' },
      { title: 'För konsulter', body: 'Presentera ett tydligare underlag för modellkvalitet, samordningsstatus och leveransberedskap.' },
      { title: 'För entreprenörer', body: 'Upptäck samordningsrisker, olösta ärenden och informationsluckor innan de påverkar produktionen.' },
      { title: 'För kunder och tillgångsägare', body: 'Förstå framdrift, informationsberedskap, risker, godkännanden och nästa åtgärder i en renare beslutsvy.' },
      { title: 'För enterprise-organisationer', body: 'Standardisera hur BIM-styrning, projektrisk, rapportering och underlag följs över flera projekt.' },
    ],
    packagesEyebrow: 'NBC-paket',
    packagesTitle: 'Välj rätt nivå av BIM-kontroll för organisationen',
    packagesIntro:
      'NBC-paket diskuteras genom en privat introduktion. Offentliga priser visas inte medan produkten formas tillsammans med kvalificerade team; slutlig tillgänglighet beror på projektkontext, organisationsbehov och säkerhetskrav.',
    packageSuitableLabel: 'Passar för',
    packageIncludesLabel: 'Innehåller',
    packages: [
      {
        name: 'NBC Essential',
        kicker: 'För tidig validering, pilotprojekt och mindre BIM-kontor.',
        summary:
          'Skapa en tillförlitlig projektvy med modelluppladdningar, grundläggande hälsosignaler, öppna ärenden och en kundredo översikt.',
        suitable: ['små BIM-team', 'BIM-konsulter', 'arkitektkontor', 'teknikkonsulter', 'pilotprojekt', 'interna BIM-kvalitetsgranskningar'],
        includes: ['projektkommandocenter', 'översikt för modelluppladdning', 'grundläggande modellhälsoindikatorer', 'ärendeöversikt', 'leveransberedskap', 'kundvänlig projektsammanfattning', 'grundläggande beredskapssnapshot', 'grundläggande ärendeöversikt', 'grundläggande filspårning', 'enkel rapportförhandsvisning', 'Readiness Passport-förhandsvisning'],
        cta: 'Begär Essential-introduktion',
      },
      {
        name: 'NBC Professional',
        kicker: 'För aktiv samordning mellan discipliner.',
        summary:
          'Lägg till ansvar, datum, valideringskontext, riskindikatorer och exportrapporter för pågående leverans.',
        suitable: ['BIM-samordningsteam', 'teknikkonsulter', 'multidisciplinära designteam', 'entreprenörer', 'projektledare', 'kundnära leveransteam'],
        includes: ['avancerat kommandocenter', 'modellvalideringsöversikt', 'ärendeintelligens', 'ansvars- och datumspårning', 'riskindikatorer', 'exportrapportstruktur', 'Readiness Passport', 'Decision Gates', 'Evidence Pack', 'Vad som förändrats sedan senaste granskning', 'Nästa bästa åtgärd', 'enskilt projekts 3D Asset Readiness Snapshot'],
        inheritance: 'Innehåller alla kontroller från Essential.',
        cta: 'Begär Professional-introduktion',
      },
      {
        name: 'NBC Enterprise',
        kicker: 'För portföljer, offentliga beställare och stora leveransorganisationer.',
        summary:
          'Standardisera styrning mellan projekt med portföljöversikt, revisionsunderlag, rollstruktur och integrationsredo arbetsytor.',
        suitable: ['stora entreprenörer', 'offentliga beställare', 'infrastrukturägare', 'fastighetsutvecklare', 'enterprise BIM-avdelningar', 'organisationer med flera projekt'],
        includes: ['portföljdashboard', 'risköversikt över flera projekt', 'enterprise-rollstruktur', 'översikt för revisionsunderlag', 'ledningsrapportering', 'integrationsredo arbetsyta', 'portföljbeslutsgrindar', 'underlagspaket för flera projekt', 'exekutivt veckobrev', 'säkert granskningsrum', 'projektminne', 'anpassade regeluppsättningsmallar', 'lokala standardmallar', 'avancerad 3D Asset Readiness-filtrering'],
        inheritance: 'Innehåller alla kontroller från Professional.',
        cta: 'Utforska Enterprise',
      },
      {
        name: 'NBC Secure Offline',
        kicker: 'För känsliga projekt som inte kan vara beroende av öppen molnåtkomst.',
        summary:
          'Håll modellgranskning, ärendespårning, rapportering och underlagsexport under lokal kontroll i begränsade miljöer.',
        suitable: ['känslig offentlig infrastruktur', 'säkra myndighetsprojekt', 'sjukhus', 'flygplatser', 'järnväg och tunnelbana', 'datacenter', 'air-gapped IT-nät'],
        includes: ['lokal projektkontroll', 'lokal modellvalideringsöversikt', 'lokal ärende- och riskspårning', 'lokal rapportgenerering', 'lokal underlagsexport', 'kontrollerad uppdateringsprocess', 'offlineunderlagspaket', 'lokalt projektminne', 'deterministiska valideringsposter', 'ingen svart låda-validering', 'lokal regeluppsättningsversionshantering', 'lokal 3D Asset Readiness Snapshot', 'nolltelemetri', 'kontrollerad uppdateringscykel'],
        inheritance: 'Innehåller utvalda Enterprise-funktioner för begränsade miljöer.',
        cta: 'Diskutera Secure Offline',
      },
    ],
    fileSupportEyebrow: 'Globalt filstöd',
    fileSupportTitle: 'BIM-kontroll för flera format utan att tvinga team till ett enda verktyg.',
    fileSupportIntro:
      'NBC formas kring den filverklighet som finns i BIM-leveranser: öppna standarder, ärendefiler, informationskrav, rapporter, referenser till nativa modeller och underlagspaket. Valideringsnivån beror på paketet och den tekniska åtkomst som finns i varje projekt.',
    fileSupportPackageTitle: 'Filstöd per paket',
    fileSupportPackageLabel: 'Paket',
    fileSupportApproachLabel: 'Filstödsinriktning',
    fileSupportPackages: [
      { packageName: 'Essential', approach: 'Grundläggande uppladdning, IFC-översikt samt PDF- och XLSX-rapporter.' },
      { packageName: 'Professional', approach: 'IFC-validering, BCF-import/export för ärenden och IDS-redo arbetsflöden.' },
      { packageName: 'Enterprise', approach: 'Filkontroll över flera projekt, kopplingar, anpassade mallar och avancerad verifiering.' },
      { packageName: 'Secure Offline', approach: 'Filbaserade IFC-, BCF-, IDS-, XLSX- och PDF-arbetsflöden utan extern anslutning.' },
    ],
    fileSupportMvpTitle: 'MVP för globalt filstöd',
    fileSupportMvpIntro:
      'Den första produktinriktningen skiljer mellan format som kan valideras på djupet och format som ska kunna lagras, kännas igen, refereras eller exporteras som projektunderlag.',
    fileSupportUploadTitle: 'Uppladdningsstöd',
    fileSupportValidationTitle: 'Djup validering',
    fileSupportRecognitionTitle: 'Endast grundläggande igenkänning',
    fileSupportReportsTitle: 'Rapporter',
    fileSupportUploadFormats: ['IFC', 'BCF / BCFZIP', 'IDS', 'XLSX', 'PDF', 'DWG', 'RVT', 'NWD', 'ZIP'],
    fileSupportValidationFormats: ['IFC', 'IDS', 'BCF', 'XLSX-mallar'],
    fileSupportRecognitionFormats: ['RVT', 'DWG', 'NWD', 'ZIP', 'PDF'],
    fileSupportReports: ['PDF-export', 'XLSX-export', 'ZIP-underlagspaket'],
    deploymentEyebrow: 'Säkerhet och driftsättning',
    deploymentTitle: 'Utformad för kontrollerad samverkan, privat styrning och säkra miljöer.',
    deploymentBody: [
      'NBC utformas med flexibla driftsättningsbehov i åtanke. Vissa team behöver snabb molnbaserad samverkan. Större organisationer kan behöva privata styrningsmiljöer. Känsliga projekt kan kräva offline-drift och strikt lokal kontroll.',
      'Driftsättningsalternativ kan variera efter paket, projektkrav och teknisk genomförbarhet. Enterprise och Secure Offline är endast avsedda för kvalificerade användningsfall.',
    ],
    deploymentDirectionTitle: 'Driftsättningsinriktning under utvärdering',
    deploymentDirections: [
      'Molnbaserad arbetsyta för samverkande projektteam',
      'Enterprise-arbetsyta för större organisationer',
      'Secure Offline-alternativ för begränsade miljöer',
      'Filbaserade arbetsflöden där extern anslutning inte är tillåten',
      'Kontrollerad åtkomst och behörighetsstruktur',
      'Revisionsredo rapportering och underlagsexport',
    ],
    chooseEyebrow: 'Varför välja NBC?',
    chooseTitle: 'Ett styrningsklassat kontrollager för viktiga BIM-beslut.',
    choosePoints: [
      { title: 'Tydlighet för projektteam', body: 'Förstå vad som är redo, vad som saknas, vad som är utsatt för risk och vem som måste agera härnäst.' },
      { title: 'Trygghet för kunder', body: 'Ge kunder en tydligare bild av framdrift, samordningsstatus, beredskap och viktiga beslut.' },
      { title: 'Kontroll för BIM-ansvariga', body: 'Stöd överblick över modellhälsa, ärendeintelligens, leveransberedskap och strukturerad rapportering.' },
      { title: 'Styrning för större organisationer', body: 'Standardisera hur BIM-kvalitet, risk, ansvar och underlag följs över projekt.' },
      { title: 'Säkerhetsalternativ för känsliga projekt', body: 'Stöd begränsade miljöer genom säkra offline-alternativ utformade för kvalificerade användningsfall.' },
      { title: 'Byggd kring ansvar', body: 'Bättre informationskontroll leder till bättre projektbeslut och starkare byggda resultat.' },
    ],
    ctaTitle: 'Utforska NBC privat',
    ctaBody:
      'NBC utvecklas för projektteam, konsulter, entreprenörer, offentliga beställare och enterprise-organisationer inom bygg som behöver bättre BIM-kontroll. Begär en privat introduktion för att diskutera projektpassning, paketinriktning och hur NBC kan stödja er organisation.',
    ctaPrimary: 'Begär privat introduktion',
    ctaSecondary: 'Visa paket',
    footerLine: 'NBC - Nayeli BIM Control. En produkt från LBYA.',
  },
  fr: {
    heroEyebrow: 'Un produit de LBYA',
    heroTitle: 'NBC - Nayeli BIM Control',
    heroSubtitle: 'Gouvernance BIM, maturité projet et intelligence construction pour les équipes complexes.',
    heroBody:
      'NBC est une plateforme de contrôle BIM en développement pour les organisations qui ont besoin d’une vision plus claire et plus fiable de la qualité des modèles, des risques de coordination, de la maturité des livrables, des preuves projet et des décisions client.',
    heroLine: 'Savoir ce qui est prêt. Voir ce qui est exposé au risque. Contrôler la prochaine décision.',
    primaryCta: 'Explorer les offres',
    secondaryCta: 'Demander une introduction privée',
    productNote: 'Conçu pour BIM managers, entrepreneurs, consultants, clients publics, propriétaires d’infrastructures et maîtres d’ouvrage.',
    heroSignals: ['Prêt', 'Risque', 'Responsable'],
    summaryTitle: 'Une couche de contrôle pour l’information BIM, le risque et la maturité.',
    summaryBody: [
      'NBC aide les équipes de construction à passer d’une activité BIM dispersée à une intelligence projet structurée, avec une meilleure visibilité sur la santé du modèle, la responsabilité des sujets, les risques de coordination, la maturité des livrables, le reporting et les preuves.',
      'La plateforme est développée pour les organisations qui ont besoin d’un contrôle BIM renforcé sans complexité inutile, tout en restant compatible avec leurs outils existants de production, revue, collaboration et environnements communs de données.',
    ],
    nameEyebrow: 'À propos du nom',
    nameTitle: 'Un nom guidé par la responsabilité envers l’environnement bâti.',
    nameBody: [
      'NBC signifie Nayeli BIM Control. Nayeli signifie « je t’aime », mais ici ce sens est utilisé avec discrétion et professionnalisme : comme un rappel que le soin, la responsabilité et la qualité doivent aussi exister dans l’information projet.',
      'Les projets méritent du soin. L’information mérite du contrôle. Les décisions méritent de la clarté. Les bâtiments et infrastructures deviennent hôpitaux, logements, écoles, systèmes de transport, sites industriels et espaces publics. NBC est développé pour aider les équipes à protéger la qualité de ce qu’elles savent avant de décider ce qu’elles construisent.',
    ],
    whyEyebrow: 'Pourquoi NBC est développé',
    whyTitle: 'L’information BIM s’étend. Le contrôle doit suivre.',
    whyBody:
      'Les projets modernes génèrent modèles, plans, sujets à traiter, révisions, rapports, approbations, exigences client, décisions de coordination et données de remise. À mesure que la livraison devient plus complexe, les équipes ont besoin d’un moyen fiable pour voir ce qui est sûr, ce qui a changé, ce qui reste non résolu et si le projet est prêt pour l’étape suivante.',
    informationTitle: 'NBC est en cours de conception pour soutenir',
    informationItems: [
      'gouvernance BIM',
      'visibilité sur la santé du modèle',
      'suivi des risques de coordination',
      'responsabilité des sujets',
      'préparation des livrables',
      'reporting client',
      'preuves projet',
      'visibilité portefeuille',
      'contrôle projet sécurisé',
    ],
    controlEyebrow: 'Domaines de contrôle',
    controlTitle: 'Ce que NBC est conçu pour contrôler',
    controlIntro:
      'NBC n’est pas un outil de modélisation et n’est pas destiné à remplacer les plateformes BIM existantes de production, vérification, collaboration ou CDE. Il agit comme une couche de contrôle autour du travail déjà réalisé par les équipes, afin de mieux comprendre la maturité, le risque, les preuves et les responsabilités.',
    controls: [
      { title: 'Santé du modèle', body: 'Examiner la fiabilité, la complétude et la maturité de l’information BIM avant coordination, livraison, revue client ou remise.' },
      { title: 'Intelligence des sujets', body: 'Suivre les sujets BIM avec gravité, responsabilité, échéances, impact projet et pertinence décisionnelle.' },
      { title: 'Préparation des livrables', body: 'Comprendre si l’information projet est prête pour la coordination, les documents de construction, l’approbation client ou la remise.' },
      { title: 'Risque de coordination', body: 'Identifier les sujets non résolus, informations manquantes et conflits disciplinaires avant qu’ils ne deviennent des risques de livraison.' },
      { title: 'Rapports et preuves', body: 'Créer une base de reporting plus claire pour les équipes, clients, revues de jalons et gouvernance interne.' },
      { title: 'Visibilité client', body: 'Donner aux clients et décideurs une vue simplifiée de la maturité projet sans complexité technique inutile.' },
      { title: 'Contrôle portefeuille', body: 'Aider les organisations multi-projets à comparer maturité, niveaux de risque et statut du contrôle BIM.' },
      { title: 'Gouvernance Enterprise', body: 'Conçu autour des accès par rôle, permissions, visibilité d’audit, workflows contrôlés et besoins de déploiement Enterprise.' },
    ],
    audienceEyebrow: 'Conçu pour les équipes de construction',
    audienceTitle: 'Contrôle BIM pour les équipes de livraison. Clarté exécutive pour les décideurs.',
    audienceIntro:
      'NBC vise à aider les équipes techniques à gérer l’information avec discipline, tout en donnant à la direction une vue plus claire de la maturité, du risque et des responsabilités.',
    audienceGroups: [
      'BIM managers',
      'coordinateurs BIM',
      'architectes',
      'ingénieurs structure',
      'équipes MEP',
      'entrepreneurs',
      'chefs de projet',
      'clients publics',
      'développeurs immobiliers',
      'maîtres d’ouvrage',
      'équipes infrastructure',
      'organisations construction Enterprise',
    ],
    valueTitle: 'Valeur par rôle',
    values: [
      { title: 'Pour les BIM managers', body: 'Suivre santé du modèle, statut des sujets, maturité, reporting et qualité de l’information entre équipes et projets.' },
      { title: 'Pour les chefs de projet', body: 'Voir ce qui bloque l’avancement, quels sujets demandent attention et si le projet est prêt pour la prochaine décision.' },
      { title: 'Pour les consultants', body: 'Présenter un dossier plus clair sur la qualité du modèle, le statut de coordination et la préparation des livrables.' },
      { title: 'Pour les entrepreneurs', body: 'Détecter risques de coordination, sujets non résolus et lacunes d’information avant qu’ils n’affectent le chantier.' },
      { title: 'Pour les clients et maîtres d’ouvrage', body: 'Comprendre avancement, maturité de l’information, risques, approbations et prochaines actions dans une vue décisionnelle plus nette.' },
      { title: 'Pour les organisations Enterprise', body: 'Standardiser le suivi de la gouvernance BIM, du risque projet, du reporting et des preuves sur plusieurs projets.' },
    ],
    packagesEyebrow: 'Offres NBC',
    packagesTitle: 'Choisissez le bon niveau de contrôle BIM pour votre organisation',
    packagesIntro:
      'Les offres NBC sont discutées dans le cadre d’une introduction privée. Les prix ne sont pas publics pendant que le produit est façonné avec des équipes qualifiées ; la disponibilité finale dépend du contexte projet, des besoins de l’organisation et des exigences de sécurité.',
    packageSuitableLabel: 'Adapté à',
    packageIncludesLabel: 'Inclut',
    packages: [
      {
        name: 'NBC Essential',
        kicker: 'Pour la validation initiale, les pilotes et les petites structures BIM.',
        summary:
          'Créer une vue projet fiable avec téléversements de modèles, premiers signaux de santé, sujets ouverts et synthèse prête pour le client.',
        suitable: ['petites équipes BIM', 'consultants BIM', 'agences d’architecture', 'bureaux d’ingénierie', 'projets pilotes', 'revues qualité BIM internes'],
        includes: ['centre de commande projet', 'vue des téléversements de modèles', 'indicateurs de santé de base', 'vue des sujets', 'instantané de maturité livraison', 'résumé projet côté client', 'instantané de maturité de base', 'vue des sujets de base', 'suivi de fichiers de base', 'aperçu de rapport simple', 'aperçu Readiness Passport'],
        cta: 'Demander une introduction Essential',
      },
      {
        name: 'NBC Professional',
        kicker: 'Pour la coordination active entre disciplines.',
        summary:
          'Ajouter responsabilités, échéances, contexte de validation, indicateurs de risque et reporting exportable pour la livraison en cours.',
        suitable: ['équipes de coordination BIM', 'consultants ingénierie', 'équipes de conception multidisciplinaires', 'entrepreneurs', 'chefs de projet', 'équipes de livraison client'],
        includes: ['centre de commande avancé', 'vue de validation modèle', 'tableau d’intelligence des sujets', 'suivi responsabilités et échéances', 'indicateurs de risque', 'structure de rapport exportable', 'Readiness Passport', 'Decision Gates', 'Evidence Pack', 'Ce qui a changé depuis la dernière revue', 'Prochaine meilleure action', 'instantané 3D Asset Readiness mono-projet'],
        inheritance: 'Inclut tous les contrôles Essential.',
        cta: 'Demander une introduction Professional',
      },
      {
        name: 'NBC Enterprise',
        kicker: 'Pour portefeuilles, clients publics et grandes organisations de livraison.',
        summary:
          'Standardiser la gouvernance entre projets avec visibilité portefeuille, preuves d’audit, structure de rôles et espaces prêts pour intégrations.',
        suitable: ['grands entrepreneurs', 'clients publics', 'propriétaires d’infrastructures', 'développeurs immobiliers', 'départements BIM Enterprise', 'organisations multi-projets'],
        includes: ['dashboard portefeuille', 'vue risque multi-projets', 'structure de rôles Enterprise', 'vue preuves d’audit', 'reporting exécutif', 'espace prêt pour intégrations', 'jalons de décision portefeuille', 'packs de preuves multi-projets', 'bref exécutif hebdomadaire', 'salle de revue sécurisée', 'mémoire projet', 'modèles de règles personnalisées', 'modèles de standards locaux', 'filtrage avancé 3D Asset Readiness'],
        inheritance: 'Inclut tous les contrôles Professional.',
        cta: 'Explorer Enterprise',
      },
      {
        name: 'NBC Secure Offline',
        kicker: 'Pour les projets sensibles qui ne peuvent pas dépendre d’un accès cloud ouvert.',
        summary:
          'Garder revue modèle, suivi des sujets, reporting et export des preuves sous contrôle local dans les environnements restreints.',
        suitable: ['infrastructures publiques sensibles', 'projets gouvernementaux sécurisés', 'hôpitaux', 'aéroports', 'rail et métro', 'data centers', 'réseaux IT air-gapped'],
        includes: ['contrôle projet local', 'vue locale de validation modèle', 'suivi local sujets et risques', 'génération locale de rapports', 'export local des preuves', 'processus de mise à jour contrôlé', 'packs de preuves hors ligne', 'mémoire projet locale', 'enregistrements de validation déterministes', 'aucune validation boîte noire', 'versionnage local des règles', 'instantané 3D Asset Readiness local', 'zéro télémétrie', 'cycle de mise à jour contrôlé'],
        inheritance: 'Inclut certaines capacités Enterprise pour les environnements restreints.',
        cta: 'Discuter Secure Offline',
      },
    ],
    fileSupportEyebrow: 'Support fichiers global',
    fileSupportTitle: 'Un contrôle BIM multi-format sans imposer un seul outil aux équipes.',
    fileSupportIntro:
      'NBC se construit autour de la réalité fichier des livraisons BIM : standards ouverts, fichiers de sujets, exigences d’information, rapports, références aux modèles natifs et packs de preuves. Le niveau de validation dépend de l’offre et de l’accès technique disponible pour chaque projet.',
    fileSupportPackageTitle: 'Support fichiers par offre',
    fileSupportPackageLabel: 'Offre',
    fileSupportApproachLabel: 'Approche de support fichiers',
    fileSupportPackages: [
      { packageName: 'Essential', approach: 'Téléversement de base, vue IFC, rapports PDF et XLSX.' },
      { packageName: 'Professional', approach: 'Validation IFC, import/export de sujets BCF et workflows prêts pour IDS.' },
      { packageName: 'Enterprise', approach: 'Contrôle fichiers multi-projets, connecteurs, modèles personnalisés et vérification avancée.' },
      { packageName: 'Secure Offline', approach: 'Workflows fichiers IFC, BCF, IDS, XLSX et PDF sans connectivité externe.' },
    ],
    fileSupportMvpTitle: 'MVP support fichiers global',
    fileSupportMvpIntro:
      'La première direction produit distingue les formats qui peuvent être validés en profondeur des formats qui doivent être stockés, reconnus, référencés ou exportés comme preuves projet.',
    fileSupportUploadTitle: 'Support téléversement',
    fileSupportValidationTitle: 'Validation approfondie',
    fileSupportRecognitionTitle: 'Reconnaissance de base uniquement',
    fileSupportReportsTitle: 'Rapports',
    fileSupportUploadFormats: ['IFC', 'BCF / BCFZIP', 'IDS', 'XLSX', 'PDF', 'DWG', 'RVT', 'NWD', 'ZIP'],
    fileSupportValidationFormats: ['IFC', 'IDS', 'BCF', 'modèles XLSX'],
    fileSupportRecognitionFormats: ['RVT', 'DWG', 'NWD', 'ZIP', 'PDF'],
    fileSupportReports: ['Export PDF', 'Export XLSX', 'Pack de preuves ZIP'],
    deploymentEyebrow: 'Sécurité et déploiement',
    deploymentTitle: 'Conçu pour la collaboration contrôlée, la gouvernance privée et les environnements sécurisés.',
    deploymentBody: [
      'NBC est conçu avec des besoins de déploiement flexibles. Certaines équipes ont besoin d’une collaboration cloud rapide. Les grandes organisations peuvent exiger des environnements de gouvernance privés. Les projets sensibles peuvent nécessiter un fonctionnement hors ligne et un contrôle local strict.',
      'Les options de déploiement peuvent varier selon l’offre, les exigences projet et la faisabilité technique. Les options Enterprise et Secure Offline sont réservées aux cas qualifiés.',
    ],
    deploymentDirectionTitle: 'Orientation de déploiement à l’étude',
    deploymentDirections: [
      'Espace cloud pour équipes projet collaboratives',
      'Espace Enterprise pour grandes organisations',
      'Option Secure Offline pour environnements restreints',
      'Workflows fichiers lorsque la connectivité externe n’est pas autorisée',
      'Structures d’accès et de permissions contrôlées',
      'Reporting et export de preuves prêts pour audit',
    ],
    chooseEyebrow: 'Pourquoi choisir NBC ?',
    chooseTitle: 'Une couche de contrôle de niveau gouvernance pour les décisions BIM importantes.',
    choosePoints: [
      { title: 'Clarté pour les équipes projet', body: 'Comprendre ce qui est prêt, ce qui manque, ce qui est exposé au risque et qui doit agir ensuite.' },
      { title: 'Confiance pour les clients', body: 'Donner aux clients une vue plus claire de l’avancement, du statut de coordination, de la maturité et des décisions clés.' },
      { title: 'Contrôle pour les BIM managers', body: 'Soutenir visibilité santé modèle, intelligence des sujets, préparation des livrables et reporting structuré.' },
      { title: 'Gouvernance pour grandes organisations', body: 'Standardiser le suivi de la qualité BIM, des risques, des responsabilités et des preuves entre projets.' },
      { title: 'Options sécurité pour projets sensibles', body: 'Soutenir des environnements restreints avec des options offline sécurisées conçues pour les cas qualifiés.' },
      { title: 'Construit autour de la responsabilité', body: 'Un meilleur contrôle de l’information mène à de meilleures décisions projet et à des résultats bâtis plus solides.' },
    ],
    ctaTitle: 'Explorer NBC en privé',
    ctaBody:
      'NBC est actuellement développé pour les équipes projet, consultants, entrepreneurs, clients publics et organisations construction Enterprise qui ont besoin d’un meilleur contrôle BIM. Demandez une introduction privée pour discuter de l’adéquation projet, de l’orientation des offres et de la manière dont NBC pourrait soutenir votre organisation.',
    ctaPrimary: 'Demander une introduction privée',
    ctaSecondary: 'Voir les offres',
    footerLine: 'NBC - Nayeli BIM Control. Un produit de LBYA.',
  },
  de: {} as NbcCopy,
};

nbcCopyByLocale.de = nbcCopyByLocale.en;

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

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-[#1F3529]/10 bg-white px-3 py-1.5 text-xs font-medium text-[#37474F]/78">
      {children}
    </span>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = asLocale(locale);
  const copy = nbcCopyByLocale[activeLocale];

  return {
    title: `${copy.heroTitle} | BIM Governance Platform`,
    description: copy.heroBody,
  };
}

export default async function NayeliBimControlPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const activeLocale = asLocale(locale);
  const NBC = getNbc(locale);
  const copy = nbcCopyByLocale[activeLocale];
  const contactHref = localizePath(activeLocale, '/contact');

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <section className="relative overflow-hidden bg-[#37474F] pb-14 pt-28 text-white lg:pb-18 lg:pt-32">
          <NbcHeroInteractiveBackdrop />
          <div className="content-frame relative z-10" style={pageFrameStyle}>
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.62fr_0.38fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A5D6A7]">
                  {copy.heroEyebrow}
                </p>
                <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-none tracking-tight md:text-6xl">
                  {copy.heroTitle}
                </h1>
                <p className="mt-5 max-w-2xl text-xl font-light leading-snug text-white/92 md:text-2xl">
                  {copy.heroSubtitle}
                </p>
                <p className="mt-5 max-w-3xl text-base font-light leading-8 text-white/78 md:text-lg">
                  {copy.heroBody}
                </p>
                <p className="mt-6 max-w-2xl border-l-2 border-[#A5D6A7] pl-4 text-lg font-medium leading-8 text-white">
                  {copy.heroLine}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="#packages"
                    className="inline-flex items-center justify-center gap-3 rounded-sm bg-white px-7 py-3.5 text-sm font-semibold text-[#2E7D32] transition-colors hover:bg-[#A5D6A7]"
                  >
                    <span>{copy.primaryCta}</span>
                    <ArrowIcon />
                  </a>
                  <a
                    href={contactHref}
                    className="inline-flex items-center justify-center gap-3 rounded-sm border border-white/50 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#2E7D32]"
                  >
                    <span>{copy.secondaryCta}</span>
                    <ArrowIcon />
                  </a>
                </div>
              </div>

              <div className="justify-self-start lg:justify-self-end">
                <div className="w-full max-w-[420px] border border-white/12 bg-white/[0.06] p-6 shadow-2xl shadow-black/20 backdrop-blur-md">
                  <Image
                    src={NBC.logo}
                    alt={`${NBC.name} logo`}
                    width={840}
                    height={280}
                    className="h-auto w-full object-contain"
                    priority
                    unoptimized
                  />
                  <div className="mt-7 grid grid-cols-3 gap-px overflow-hidden bg-white/12 text-center">
                    {copy.heroSignals.map((item) => (
                      <div key={item} className="bg-[#37474F]/80 px-3 py-4">
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#A5D6A7]">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 text-sm leading-7 text-white/72">{copy.productNote}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F7FAF7] py-14">
          <div className="content-frame" style={pageFrameStyle}>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.42fr_0.58fr]">
              <h2 className="text-3xl font-light leading-tight text-[#1F3529] md:text-5xl">
                {copy.summaryTitle}
              </h2>
              <div className="space-y-5 text-base leading-8 text-[#37474F]/76 md:text-lg">
                {copy.summaryBody.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="content-frame grid grid-cols-1 gap-10 lg:grid-cols-[0.42fr_0.58fr]" style={pageFrameStyle}>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2E7D32]">
                {copy.nameEyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-light leading-tight text-[#1F3529] md:text-5xl">
                {copy.nameTitle}
              </h2>
            </div>
            <div className="space-y-5 text-base leading-8 text-[#37474F]/76 md:text-lg">
              {copy.nameBody.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#37474F] py-16 text-white lg:py-20">
          <div className="content-frame grid grid-cols-1 gap-10 lg:grid-cols-[0.55fr_0.45fr]" style={pageFrameStyle}>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#A5D6A7]">
                {copy.whyEyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-light leading-tight md:text-5xl">{copy.whyTitle}</h2>
              <p className="mt-6 text-base leading-8 text-white/76 md:text-lg">{copy.whyBody}</p>
            </div>
            <div className="border border-white/12 bg-white/[0.06] p-6">
              <h3 className="text-xl font-semibold">{copy.informationTitle}</h3>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {copy.informationItems.map((item) => (
                  <div key={item} className="flex items-center gap-3 border border-white/10 bg-white/[0.05] px-4 py-3">
                    <CheckIcon className="h-4 w-4 shrink-0 text-[#A5D6A7]" />
                    <span className="text-sm text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-20">
          <div className="content-frame" style={pageFrameStyle}>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2E7D32]">
                {copy.controlEyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-light leading-tight text-[#1F3529] md:text-5xl">
                {copy.controlTitle}
              </h2>
              <p className="mt-5 text-base leading-8 text-[#37474F]/74 md:text-lg">{copy.controlIntro}</p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-[#1F3529]/10 bg-[#1F3529]/10 md:grid-cols-2 lg:grid-cols-4">
              {copy.controls.map((control) => (
                <article key={control.title} className="bg-white p-6">
                  <span className="mb-6 block h-1.5 w-10 rounded-sm bg-[#2E7D32]" />
                  <h3 className="text-lg font-semibold text-[#1F3529]">{control.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#37474F]/72">{control.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F7FAF7] py-16 lg:py-20">
          <div className="content-frame grid grid-cols-1 gap-10 lg:grid-cols-[0.38fr_0.62fr]" style={pageFrameStyle}>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2E7D32]">
                {copy.audienceEyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-light leading-tight text-[#1F3529] md:text-5xl">
                {copy.audienceTitle}
              </h2>
              <p className="mt-5 text-base leading-8 text-[#37474F]/74 md:text-lg">{copy.audienceIntro}</p>
            </div>
            <div>
              <div className="flex flex-wrap gap-2.5">
                {copy.audienceGroups.map((group) => (
                  <Badge key={group}>{group}</Badge>
                ))}
              </div>
              <h3 className="mt-10 text-2xl font-light text-[#1F3529]">{copy.valueTitle}</h3>
              <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden border border-[#1F3529]/10 bg-[#1F3529]/10 md:grid-cols-2">
                {copy.values.map((value) => (
                  <article key={value.title} className="bg-white p-5">
                    <h4 className="font-semibold text-[#1F3529]">{value.title}</h4>
                    <p className="mt-3 text-sm leading-7 text-[#37474F]/72">{value.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="packages" className="bg-white py-16 lg:py-20">
          <div className="content-frame" style={pageFrameStyle}>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2E7D32]">
                {copy.packagesEyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-light leading-tight text-[#1F3529] md:text-5xl">
                {copy.packagesTitle}
              </h2>
              <p className="mt-5 text-base leading-8 text-[#37474F]/74 md:text-lg">{copy.packagesIntro}</p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-4">
              {copy.packages.map((tier, index) => (
                <article
                  key={tier.name}
                  className={`flex min-h-full flex-col border p-6 ${
                    index === 2
                      ? 'border-[#2E7D32]/35 bg-[#F7FAF7] shadow-xl shadow-[#1F3529]/10'
                      : 'border-[#1F3529]/10 bg-white'
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2E7D32]">{tier.name}</p>
                  <h3 className="mt-4 text-xl font-semibold leading-snug text-[#1F3529]">
                    {tier.kicker}
                  </h3>
                  {tier.inheritance && (
                    <p className="mt-4 text-sm font-semibold leading-7 text-[#37474F]/82">
                      {tier.inheritance}
                    </p>
                  )}
                  <p className="mt-4 text-sm leading-7 text-[#37474F]/72">{tier.summary}</p>

                  <div className="mt-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#37474F]/55">
                      {copy.packageSuitableLabel}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {tier.suitable.slice(0, 4).map((item) => (
                        <span key={item} className="rounded-full bg-[#1F3529]/6 px-3 py-1 text-xs text-[#37474F]/76">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#37474F]/55">
                      {copy.packageIncludesLabel}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {tier.includes.map((feature) => (
                        <li key={feature} className="flex gap-2 text-sm leading-6 text-[#37474F]/74">
                          <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-[#2E7D32]" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-8">
                    <a
                      href={contactHref}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[#37474F] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2E7D32]"
                    >
                      <span>{tier.cta}</span>
                      <ArrowIcon />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F7FAF7] py-16 lg:py-20">
          <div className="content-frame" style={pageFrameStyle}>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.4fr_0.6fr] lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2E7D32]">
                  {copy.fileSupportEyebrow}
                </p>
                <h2 className="mt-4 text-3xl font-light leading-tight text-[#1F3529] md:text-5xl">
                  {copy.fileSupportTitle}
                </h2>
                <p className="mt-5 text-base leading-8 text-[#37474F]/74 md:text-lg">
                  {copy.fileSupportIntro}
                </p>
              </div>

              <div className="overflow-hidden border border-[#1F3529]/10 bg-white">
                <div className="border-b border-[#1F3529]/10 bg-[#37474F] px-5 py-4">
                  <h3 className="text-lg font-semibold text-white">{copy.fileSupportPackageTitle}</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse text-left">
                    <thead>
                      <tr className="border-b border-[#1F3529]/10 bg-[#F7FAF7]">
                        <th className="w-44 px-5 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#37474F]/58">
                          {copy.fileSupportPackageLabel}
                        </th>
                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#37474F]/58">
                          {copy.fileSupportApproachLabel}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {copy.fileSupportPackages.map((item) => (
                        <tr key={item.packageName} className="border-b border-[#1F3529]/8 last:border-b-0">
                          <td className="px-5 py-4 text-sm font-semibold text-[#1F3529]">{item.packageName}</td>
                          <td className="px-5 py-4 text-sm leading-7 text-[#37474F]/74">{item.approach}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="mt-12 border-t border-[#1F3529]/10 pt-10">
              <div className="max-w-3xl">
                <h3 className="text-2xl font-light leading-tight text-[#1F3529] md:text-4xl">
                  {copy.fileSupportMvpTitle}
                </h3>
                <p className="mt-4 text-base leading-8 text-[#37474F]/74">{copy.fileSupportMvpIntro}</p>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden border border-[#1F3529]/10 bg-[#1F3529]/10 md:grid-cols-2 xl:grid-cols-4">
                {[
                  { title: copy.fileSupportUploadTitle, items: copy.fileSupportUploadFormats },
                  { title: copy.fileSupportValidationTitle, items: copy.fileSupportValidationFormats },
                  { title: copy.fileSupportRecognitionTitle, items: copy.fileSupportRecognitionFormats },
                  { title: copy.fileSupportReportsTitle, items: copy.fileSupportReports },
                ].map((group) => (
                  <article key={group.title} className="bg-white p-6">
                    <h4 className="text-base font-semibold text-[#1F3529]">{group.title}</h4>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-[#1F3529]/10 bg-[#F7FAF7] px-3 py-1.5 text-xs font-medium text-[#37474F]/78"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-20">
          <div className="content-frame grid grid-cols-1 gap-10 lg:grid-cols-[0.48fr_0.52fr]" style={pageFrameStyle}>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2E7D32]">
                {copy.deploymentEyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-light leading-tight text-[#1F3529] md:text-5xl">
                {copy.deploymentTitle}
              </h2>
              <div className="mt-5 space-y-5 text-base leading-8 text-[#37474F]/74 md:text-lg">
                {copy.deploymentBody.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="border border-[#1F3529]/10 bg-[#F7FAF7] p-6">
              <h3 className="text-2xl font-light text-[#1F3529]">{copy.deploymentDirectionTitle}</h3>
              <div className="mt-6 grid grid-cols-1 gap-3">
                {copy.deploymentDirections.map((direction) => (
                  <div key={direction} className="flex gap-3 border border-[#1F3529]/8 bg-white p-4">
                    <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-[#2E7D32]" />
                    <span className="text-sm leading-6 text-[#37474F]/76">{direction}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#37474F] py-16 text-white lg:py-20">
          <div className="content-frame" style={pageFrameStyle}>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#A5D6A7]">
                {copy.chooseEyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-light leading-tight md:text-5xl">{copy.chooseTitle}</h2>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
              {copy.choosePoints.map((point) => (
                <article key={point.title} className="bg-[#37474F] p-6">
                  <CheckIcon className="mb-5 h-4 w-4 text-[#A5D6A7]" />
                  <h3 className="text-lg font-semibold">{point.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/74">{point.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#2E7D32] py-18 text-white lg:py-20">
          <div className="content-frame text-center" style={pageFrameStyle}>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">{copy.footerLine}</p>
            <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-light leading-tight md:text-5xl">{copy.ctaTitle}</h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/78 md:text-lg">{copy.ctaBody}</p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a
                href={contactHref}
                className="inline-flex items-center justify-center gap-3 rounded-sm bg-white px-7 py-3.5 text-sm font-semibold text-[#2E7D32] transition-colors hover:bg-[#A5D6A7]"
              >
                <span>{copy.ctaPrimary}</span>
                <ArrowIcon />
              </a>
              <a
                href="#packages"
                className="inline-flex items-center justify-center gap-3 rounded-sm border border-white/50 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#2E7D32]"
              >
                <span>{copy.ctaSecondary}</span>
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
