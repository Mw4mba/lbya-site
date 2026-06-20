import { asLocale, type Locale } from './locale';

export type SolutionSlug = 'transport-logistics-africa' | 'global-bim-control';

export type SolutionSummary = {
  slug: SolutionSlug;
  eyebrow: string;
  title: string;
  body: string;
  product: string;
  href: string;
};

export type SolutionDetail = SolutionSummary & {
  seoTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroBody: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  challengeEyebrow: string;
  challengeHeading: string;
  challengeBody: string;
  challenges: { title: string; body: string }[];
  responseEyebrow: string;
  responseHeading: string;
  responseBody: string;
  responseCards: { title: string; body: string }[];
  workflowEyebrow: string;
  workflowHeading: string;
  workflow: { title: string; body: string }[];
  proofHeading: string;
  proofBody: string;
  finalHeading: string;
  finalBody: string;
};

export type SolutionsHomeCopy = {
  eyebrow: string;
  heading: string;
  body: string;
  cta: string;
};

export const solutionSlugs: SolutionSlug[] = ['transport-logistics-africa', 'global-bim-control'];

const homeCopyByLocale: Record<Locale, SolutionsHomeCopy> = {
  en: {
    eyebrow: 'Solutions',
    heading: 'Two product paths for two very different control problems.',
    body: 'MCT supports logistics coordination across African corridors. NBC focuses on BIM coordination and model-information control for global project teams.',
    cta: 'Explore solution',
  },
  sv: {
    eyebrow: 'L\u00f6sningar',
    heading: 'En fokuserad produktv\u00e4g f\u00f6r BIM-kontroll.',
    body: 'NBC fokuserar p\u00e5 BIM-samordning, modellinformation, ansvar och beslutsunderlag f\u00f6r projektteam som beh\u00f6ver b\u00e4ttre kontroll.',
    cta: 'Utforska l\u00f6sningen',
  },
  fr: {
    eyebrow: 'Solutions',
    heading: 'Deux parcours produit pour deux probl\u00e8mes de contr\u00f4le tr\u00e8s diff\u00e9rents.',
    body: 'MCT soutient la coordination logistique sur les corridors africains. NBC se concentre sur la coordination BIM et le contr\u00f4le de l\u2019information mod\u00e8le pour les \u00e9quipes projet internationales.',
    cta: 'Explorer la solution',
  },
  de: {
    eyebrow: 'L\u00f6sungen',
    heading: 'Zwei Produktpfade f\u00fcr zwei sehr unterschiedliche Kontrollprobleme.',
    body: 'MCT unterst\u00fctzt Logistikkoordination auf afrikanischen Korridoren. NBC konzentriert sich auf BIM-Koordination und Modellinformationskontrolle f\u00fcr globale Projektteams.',
    cta: 'L\u00f6sung entdecken',
  },
};

const solutionsByLocale: Record<Locale, SolutionDetail[]> = {
  en: [
    {
      slug: 'transport-logistics-africa',
      eyebrow: 'MCT solution',
      title: 'African transport logistics',
      body: 'A control layer for requests, transporter records, documents, quotes, shipment status, and evidence across African road, sea, and rail-ready workflows.',
      product: 'Malaika Control Tower',
      href: '/solutions/transport-logistics-africa',
      seoTitle: 'African Transport Logistics Solution | Malaika Control Tower',
      metaDescription:
        'See how MCT supports African transport logistics with road freight, sea freight, rail-ready handovers, document control, quote comparison, and operational evidence.',
      heroTitle: 'Bring control to African transport logistics.',
      heroBody:
        'African logistics often depends on many partners, informal updates, corridor changes, and sensitive documents. MCT gives teams one operating record for the work: request, verify, compare, track, and report.',
      primaryCta: { label: 'Explore MCT', href: '/products/mct' },
      secondaryCta: { label: 'Request a demo', href: '/contact' },
      challengeEyebrow: 'The logistics problem',
      challengeHeading: 'Coordination breaks when the record is scattered.',
      challengeBody:
        'Cross-border and multimodal logistics need clear ownership, trusted documents, and fast decisions. When the work lives across messages, spreadsheets, and folders, risk becomes harder to see.',
      challenges: [
        { title: 'Requests arrive incomplete', body: 'Cargo details, routes, timing, contacts, and service needs are often split across different channels.' },
        { title: 'Document readiness is unclear', body: 'Truck packs, permits, driver files, insurance, and expiry dates need evidence before a decision is safe.' },
        { title: 'Quotes lack context', body: 'Price alone is not enough. Teams also need transporter readiness, route risk, document status, and history.' },
        { title: 'Corridor updates disappear', body: 'Road, port, border, and handover information can be lost in informal communication.' },
      ],
      responseEyebrow: 'How MCT supports it',
      responseHeading: 'One product workflow for road, sea, and rail-ready logistics.',
      responseBody:
        'MCT is built as a logistics control tower: practical enough for daily coordination, structured enough for professional reporting, and ready to grow with partner access and integrations.',
      responseCards: [
        { title: 'Road freight control', body: 'Manage route requests, transporter options, truck packs, permits, document status, quotes, and shipment progress in one workspace.' },
        { title: 'Sea freight coordination', body: 'Keep cargo records, port-related handovers, partner notes, documents, and follow-up actions connected to the same operating record.' },
        { title: 'Rail-ready handovers', body: 'Prepare structured records for future rail or intermodal workflows, including handover status, partner responsibilities, and evidence trails.' },
      ],
      workflowEyebrow: 'MCT control flow',
      workflowHeading: 'From transport request to evidence report.',
      workflow: [
        { title: 'Capture the request', body: 'Create a structured record for route, cargo, timing, client details, and operating needs.' },
        { title: 'Verify readiness', body: 'Organise transporter, truck, driver, permit, insurance, and document evidence before approval.' },
        { title: 'Compare options', body: 'Review quotes beside risk, readiness, document status, and coordination history.' },
        { title: 'Track the operation', body: 'Follow status through assignment, loading, border or port stages, delivery, and closeout.' },
        { title: 'Export the record', body: 'Produce a clear report with decisions, documents, checks, and unresolved items.' },
      ],
      proofHeading: 'Commercially ready',
      proofBody:
        'MCT is ready for demo requests.',
      finalHeading: 'Start with one logistics workflow.',
      finalBody:
        'Use a demo to map your first controlled workflow, then scale the product around documents, partners, reporting, and integration needs.',
    },
    {
      slug: 'global-bim-control',
      eyebrow: 'NBC solution',
      title: 'Global BIM control',
      body: 'A focused early-stage BIM control direction for model review, issue ownership, validation governance, and decision evidence across project teams.',
      product: 'Nayeli BIM Control',
      href: '/solutions/global-bim-control',
      seoTitle: 'Global BIM Control Solution | Nayeli BIM Control',
      metaDescription:
        'Explore the BIM control gap NBC is being shaped to address: model quality, issue ownership, validation governance, evidence, and handover readiness.',
      heroTitle: 'Close the BIM control gap between models, issues, and decisions.',
      heroBody:
        'BIM teams already use powerful authoring, coordination, and common data tools. The gap is often between them: who owns the issue, what was checked, which requirement failed, and whether the model information is ready to support a decision.',
      primaryCta: { label: 'Explore NBC', href: '/products/nbc' },
      secondaryCta: { label: 'Discuss early access', href: '/contact' },
      challengeEyebrow: 'The market gap',
      challengeHeading: 'BIM coordination still loses accountability between tools.',
      challengeBody:
        'Projects can have models, issue lists, documents, and dashboards without having a clear control record. NBC is being shaped around that missing layer.',
      challenges: [
        { title: 'Model quality is checked too late', body: 'Information gaps, naming issues, classifications, and requirement failures often appear after decisions have already moved.' },
        { title: 'Issue ownership is fragmented', body: 'Findings can move between meetings, exports, emails, and platforms without a clean responsibility trail.' },
        { title: 'Validation is hard to evidence', body: 'Teams need to know what rule was checked, what failed, what changed, and what remains unresolved.' },
        { title: 'Handover readiness is uncertain', body: 'A model can look coordinated while still missing information required for client review, operations, or downstream use.' },
      ],
      responseEyebrow: 'How NBC is positioned',
      responseHeading: 'A BIM control product direction, separate from logistics.',
      responseBody:
        'NBC is not MCT and does not manage transport. It is being shaped for BIM teams that need clearer control over model information, coordination issues, validation evidence, and decision readiness.',
      responseCards: [
        { title: 'Federated model review', body: 'Bring discipline model information into a clearer review structure so teams can inspect readiness, interfaces, and gaps.' },
        { title: 'Issue and action control', body: 'Connect findings to owners, status, evidence, due attention, and follow-up history.' },
        { title: 'Validation governance', body: 'Support checks around requirements, classifications, naming, data completeness, and handover readiness.' },
      ],
      workflowEyebrow: 'NBC control flow',
      workflowHeading: 'From model question to decision evidence.',
      workflow: [
        { title: 'Review the model context', body: 'Understand discipline inputs, coordination scope, information requirements, and project priorities.' },
        { title: 'Identify issues', body: 'Turn clashes, missing data, requirement gaps, and coordination findings into controlled items.' },
        { title: 'Assign responsibility', body: 'Clarify ownership, status, evidence, and what must change before the issue can close.' },
        { title: 'Validate readiness', body: 'Check whether the model information is complete enough for the next project decision.' },
        { title: 'Keep the evidence', body: 'Preserve the control record so reviews, decisions, and handover discussions stay traceable.' },
      ],
      proofHeading: 'Early-stage product direction',
      proofBody:
        'NBC is intentionally kept focused while it develops. The public message stays simple: BIM coordination, model-information control, and stronger decision evidence.',
      finalHeading: 'Shape a practical BIM control layer.',
      finalBody:
        'Talk with LBYA if your team wants to discuss BIM coordination gaps, early access, or the product direction behind NBC.',
    },
  ],
  sv: [
    {
      slug: 'transport-logistics-africa',
      eyebrow: 'MCT-l\u00f6sning',
      title: 'Afrikansk transportlogistik',
      body: 'Ett kontrollager för förfrågningar, transportörsregister, dokument, offerter, transportstatus och underlag i afrikanska flöden för väg, sjö och framtida järnvägsöverlämningar.',
      product: 'Malaika Control Tower',
      href: '/solutions/transport-logistics-africa',
      seoTitle: 'Afrikansk transportlogistik | Malaika Control Tower',
      metaDescription:
        'Se hur MCT stödjer afrikansk transportlogistik med vägfrakt, sjöfrakt, järnvägsförberedda överlämningar, dokumentkontroll, offertjämförelse och operativa underlag.',
      heroTitle: 'Skapa kontroll i afrikansk transportlogistik.',
      heroBody:
        'Afrikansk logistik beror ofta på många partners, informella uppdateringar, korridorförändringar och känsliga dokument. MCT ger team ett samlat operativt underlag för att begära, verifiera, jämföra, följa upp och rapportera.',
      primaryCta: { label: 'Utforska MCT', href: '/products/mct' },
      secondaryCta: { label: 'Beg\u00e4r demo', href: '/contact' },
      challengeEyebrow: 'Logistikproblemet',
      challengeHeading: 'Samordningen brister n\u00e4r underlaget \u00e4r splittrat.',
      challengeBody:
        'Gr\u00e4ns\u00f6verskridande och multimodal logistik kr\u00e4ver tydligt ansvar, p\u00e5litliga dokument och snabba beslut. N\u00e4r arbetet ligger i meddelanden, kalkylark och mappar blir risk sv\u00e5rare att se.',
      challenges: [
        { title: 'F\u00f6rfr\u00e5gningar \u00e4r ofullst\u00e4ndiga', body: 'Godsdetaljer, rutter, tider, kontakter och servicebehov delas ofta mellan flera kanaler.' },
        { title: 'Dokumentberedskap är oklar', body: 'Lastbilsdokumentation, tillstånd, förarhandlingar, försäkring och utgångsdatum behöver underlag innan beslut.' },
        { title: 'Offerter saknar sammanhang', body: 'Pris räcker inte. Team behöver också transportörens beredskap, ruttens risk, dokumentstatus och historik.' },
        { title: 'Korridoruppdateringar försvinner', body: 'Information om väg, hamn, gräns och överlämning kan tappas bort i informell kommunikation.' },
      ],
      responseEyebrow: 'Hur MCT st\u00f6djer arbetet',
      responseHeading: 'Ett produktflöde för väg-, sjö- och järnvägsförberedd logistik.',
      responseBody:
        'MCT \u00e4r byggt som ett logistiskt kontrolltorn: praktiskt nog f\u00f6r daglig samordning, strukturerat nog f\u00f6r professionell rapportering och redo att v\u00e4xa med partner\u00e5tkomst och integrationer.',
      responseCards: [
        { title: 'Kontroll av vägfrakt', body: 'Hantera ruttförfrågningar, transportörsalternativ, lastbilsdokumentation, tillstånd, dokumentstatus, offerter och transportförlopp i en arbetsyta.' },
        { title: 'Samordning av sjöfrakt', body: 'Håll godsunderlag, hamnrelaterade överlämningar, partnernoteringar, dokument och uppföljning kopplade till samma operativa underlag.' },
        { title: 'Järnvägsförberedda överlämningar', body: 'Förbered strukturerade underlag för framtida järnvägs- eller intermodala flöden med överlämningsstatus, partneransvar och spårbart underlag.' },
      ],
      workflowEyebrow: 'MCT-kontrollfl\u00f6de',
      workflowHeading: 'Fr\u00e5n transportf\u00f6rfr\u00e5gan till underlagsrapport.',
      workflow: [
        { title: 'F\u00e5nga f\u00f6rfr\u00e5gan', body: 'Skapa ett strukturerat underlag f\u00f6r rutt, gods, tid, kundinformation och operativa behov.' },
        { title: 'Verifiera beredskap', body: 'Organisera transport\u00f6r, lastbil, f\u00f6rare, tillst\u00e5nd, f\u00f6rs\u00e4kring och dokumentunderlag f\u00f6re godk\u00e4nnande.' },
        { title: 'J\u00e4mf\u00f6r alternativ', body: 'Granska offerter tillsammans med risk, beredskap, dokumentstatus och samordningshistorik.' },
        { title: 'F\u00f6lj operationen', body: 'F\u00f6lj status genom tilldelning, lastning, gr\u00e4ns- eller hamnsteg, leverans och avslut.' },
        { title: 'Exportera underlaget', body: 'Skapa en tydlig rapport med beslut, dokument, kontroller och ol\u00f6sta punkter.' },
      ],
      proofHeading: 'Kommersiellt redo',
      proofBody:
        'MCT \u00e4r redo f\u00f6r demof\u00f6rfr\u00e5gningar.',
      finalHeading: 'B\u00f6rja med ett logistikfl\u00f6de.',
      finalBody:
        'Anv\u00e4nd en demo f\u00f6r att kartl\u00e4gga ert f\u00f6rsta kontrollerade arbetsfl\u00f6de och skala sedan produkten kring dokument, partners, rapportering och integrationer.',
    },
    {
      slug: 'global-bim-control',
      eyebrow: 'NBC-l\u00f6sning',
      title: 'Global BIM-kontroll',
      body: 'En fokuserad BIM-kontrollprodukt i tidig fas för modellgranskning, ärendeansvar, valideringsstyrning och beslutsunderlag i projektteam.',
      product: 'Nayeli BIM Control',
      href: '/solutions/global-bim-control',
      seoTitle: 'Global BIM-kontroll | Nayeli BIM Control',
      metaDescription:
        'Utforska BIM-kontrollglappet som NBC formas för att lösa: modellkvalitet, ärendeansvar, valideringsstyrning, underlag och överlämningsberedskap.',
      heroTitle: 'Stäng BIM-kontrollglappet mellan modeller, ärenden och beslut.',
      heroBody:
        'BIM-team använder redan kraftfulla verktyg för modellering, samordning och gemensamma datamiljöer. Glappet finns ofta mellan dem: vem ansvarar för ärendet, vad kontrollerades, vilket krav brast och är modellinformationen redo för beslut?',
      primaryCta: { label: 'Utforska NBC', href: '/products/nbc' },
      secondaryCta: { label: 'Diskutera tidig \u00e5tkomst', href: '/contact' },
      challengeEyebrow: 'Luckan i marknaden',
      challengeHeading: 'BIM-samordning tappar fortfarande ansvar mellan verktyg.',
      challengeBody:
        'Projekt kan ha modeller, ärendelistor, dokument och översikter utan ett tydligt kontrollunderlag. NBC formas kring det saknade lagret.',
      challenges: [
        { title: 'Modellkvalitet kontrolleras f\u00f6r sent', body: 'Informationsluckor, namngivning, klassificeringar och kravfel syns ofta efter att beslut redan g\u00e5tt vidare.' },
        { title: '\u00c4rende\u00e4garskap \u00e4r splittrat', body: 'Fynd flyttar mellan m\u00f6ten, exporter, mejl och plattformar utan ren ansvarshistorik.' },
        { title: 'Validering är svår att belägga', body: 'Team behöver veta vilken regel som kontrollerades, vad som inte uppfylldes, vad som ändrades och vad som är olöst.' },
        { title: '\u00d6verl\u00e4mningsberedskap \u00e4r os\u00e4ker', body: 'En modell kan se samordnad ut men sakna information f\u00f6r best\u00e4llargranskning, drift eller n\u00e4sta anv\u00e4ndning.' },
      ],
      responseEyebrow: 'Hur NBC positioneras',
      responseHeading: 'En BIM-kontrollprodukt, separat fr\u00e5n logistik.',
      responseBody:
        'NBC \u00e4r inte MCT och hanterar inte transport. Den formas f\u00f6r BIM-team som beh\u00f6ver tydligare kontroll \u00f6ver modellinformation, samordnings\u00e4renden, valideringsunderlag och beslutsberedskap.',
      responseCards: [
        { title: 'Federerad modellgranskning', body: 'Samla disciplininformation i en tydligare granskningsstruktur s\u00e5 team kan se beredskap, gr\u00e4nssnitt och luckor.' },
        { title: '\u00c4rende- och \u00e5tg\u00e4rdskontroll', body: 'Koppla fynd till ansvariga, status, underlag, uppm\u00e4rksamhet och uppf\u00f6ljningshistorik.' },
        { title: 'Valideringsstyrning', body: 'St\u00f6d kontroller kring krav, klassificeringar, namngivning, datakompletthet och \u00f6verl\u00e4mningsberedskap.' },
      ],
      workflowEyebrow: 'NBC-kontrollfl\u00f6de',
      workflowHeading: 'Fr\u00e5n modellfr\u00e5ga till beslutsunderlag.',
      workflow: [
        { title: 'Granska modellkontext', body: 'F\u00f6rst\u00e5 disciplinunderlag, samordningsomfattning, informationskrav och projektprioriteringar.' },
        { title: 'Identifiera ärenden', body: 'Gör kollisioner, saknade data, kravluckor och samordningsfynd till kontrollerade punkter.' },
        { title: 'Tilldela ansvar', body: 'Tydligg\u00f6r \u00e4garskap, status, underlag och vad som m\u00e5ste \u00e4ndras innan \u00e4rendet kan st\u00e4ngas.' },
        { title: 'Validera beredskap', body: 'Kontrollera om modellinformationen \u00e4r tillr\u00e4ckligt komplett f\u00f6r n\u00e4sta projektbeslut.' },
        { title: 'Beh\u00e5ll underlaget', body: 'Spara kontrollunderlaget s\u00e5 granskningar, beslut och \u00f6verl\u00e4mning f\u00f6rblir sp\u00e5rbara.' },
      ],
      proofHeading: 'Produktriktning i tidig fas',
      proofBody:
        'NBC h\u00e5lls avsiktligt fokuserad medan den utvecklas. Det publika budskapet \u00e4r enkelt: BIM-samordning, kontroll av modellinformation och starkare beslutsunderlag.',
      finalHeading: 'Forma ett praktiskt BIM-kontrollager.',
      finalBody:
        'Prata med LBYA om ert team vill diskutera BIM-samordningsgap, tidig \u00e5tkomst eller produktinriktningen bakom NBC.',
    },
  ],
  fr: [
    {
      slug: 'transport-logistics-africa',
      eyebrow: 'Solution MCT',
      title: 'Logistique de transport en Afrique',
      body: 'Une couche de contr\u00f4le pour les demandes, dossiers transporteurs, documents, devis, statuts de transport et preuves dans les flux africains routiers, maritimes et pr\u00eats pour le rail.',
      product: 'Malaika Control Tower',
      href: '/solutions/transport-logistics-africa',
      seoTitle: 'Solution de logistique de transport en Afrique | Malaika Control Tower',
      metaDescription:
        'Voyez comment MCT soutient la logistique de transport en Afrique avec fret routier, fret maritime, transferts pr\u00eats pour le rail, contr\u00f4le documentaire, comparaison de devis et preuves op\u00e9rationnelles.',
      heroTitle: 'Apporter du contr\u00f4le \u00e0 la logistique de transport en Afrique.',
      heroBody:
        'La logistique africaine d\u00e9pend souvent de nombreux partenaires, de mises \u00e0 jour informelles, de changements de corridor et de documents sensibles. MCT donne aux \u00e9quipes un dossier op\u00e9rationnel unique pour demander, v\u00e9rifier, comparer, suivre et produire des rapports.',
      primaryCta: { label: 'Explorer MCT', href: '/products/mct' },
      secondaryCta: { label: 'Demander une d\u00e9mo', href: '/contact' },
      challengeEyebrow: 'Le probl\u00e8me logistique',
      challengeHeading: 'La coordination se casse lorsque le dossier est dispers\u00e9.',
      challengeBody:
        'La logistique transfrontali\u00e8re et multimodale demande une responsabilit\u00e9 claire, des documents fiables et des d\u00e9cisions rapides. Quand le travail se trouve dans des messages, tableurs et dossiers, le risque devient moins visible.',
      challenges: [
        { title: 'Les demandes arrivent incompl\u00e8tes', body: 'Les d\u00e9tails de cargaison, itin\u00e9raires, d\u00e9lais, contacts et besoins de service sont souvent r\u00e9partis entre plusieurs canaux.' },
        { title: 'La pr\u00e9paration documentaire est floue', body: 'Les dossiers camion, permis, dossiers conducteurs, assurances et dates d\u2019expiration exigent des preuves avant toute d\u00e9cision.' },
        { title: 'Les devis manquent de contexte', body: 'Le prix seul ne suffit pas. Les \u00e9quipes doivent aussi voir la disponibilit\u00e9 du transporteur, le risque d\u2019itin\u00e9raire, le statut documentaire et l\u2019historique.' },
        { title: 'Les mises \u00e0 jour de corridor disparaissent', body: 'Les informations de route, port, fronti\u00e8re et transfert peuvent se perdre dans la communication informelle.' },
      ],
      responseEyebrow: 'Comment MCT soutient le travail',
      responseHeading: 'Un flux produit pour la logistique routi\u00e8re, maritime et pr\u00eate pour le rail.',
      responseBody:
        'MCT est construit comme une tour de contr\u00f4le logistique : assez pratique pour la coordination quotidienne, assez structur\u00e9 pour des rapports professionnels, et pr\u00eat \u00e0 grandir avec acc\u00e8s partenaires et int\u00e9grations.',
      responseCards: [
        { title: 'Contr\u00f4le du fret routier', body: 'G\u00e9rer demandes d\u2019itin\u00e9raire, options transporteurs, dossiers camion, permis, statut documentaire, devis et progression dans un seul espace.' },
        { title: 'Coordination du fret maritime', body: 'Garder dossiers de cargaison, transferts portuaires, notes partenaires, documents et actions de suivi connect\u00e9s au m\u00eame dossier op\u00e9rationnel.' },
        { title: 'Transferts pr\u00eats pour le rail', body: 'Pr\u00e9parer des dossiers structur\u00e9s pour de futurs flux ferroviaires ou intermodaux, avec statut de transfert, responsabilit\u00e9s partenaires et preuves tra\u00e7ables.' },
      ],
      workflowEyebrow: 'Flux de contr\u00f4le MCT',
      workflowHeading: 'De la demande transport au rapport de preuves.',
      workflow: [
        { title: 'Capturer la demande', body: 'Cr\u00e9er un dossier structur\u00e9 pour itin\u00e9raire, cargaison, d\u00e9lais, client et besoins op\u00e9rationnels.' },
        { title: 'V\u00e9rifier la pr\u00e9paration', body: 'Organiser transporteur, camion, conducteur, permis, assurance et preuves documentaires avant validation.' },
        { title: 'Comparer les options', body: 'Revoir les devis avec risque, pr\u00e9paration, statut documentaire et historique de coordination.' },
        { title: 'Suivre l\u2019op\u00e9ration', body: 'Suivre le statut de l\u2019assignation au chargement, \u00e0 la fronti\u00e8re ou au port, jusqu\u2019\u00e0 livraison et cl\u00f4ture.' },
        { title: 'Exporter le dossier', body: 'Produire un rapport clair avec d\u00e9cisions, documents, contr\u00f4les et points non r\u00e9solus.' },
      ],
      proofHeading: 'Commercialement pr\u00eat',
      proofBody:
        'MCT est pr\u00eat pour les demandes de d\u00e9mo.',
      finalHeading: 'Commencez par un flux logistique.',
      finalBody:
        'Utilisez une d\u00e9mo pour cartographier votre premier flux contr\u00f4l\u00e9, puis faites \u00e9voluer le produit autour des documents, partenaires, rapports et int\u00e9grations.',
    },
    {
      slug: 'global-bim-control',
      eyebrow: 'Solution NBC',
      title: 'Contr\u00f4le BIM global',
      body: 'Une direction BIM cibl\u00e9e en phase initiale pour la revue de mod\u00e8le, la responsabilit\u00e9 des points \u00e0 traiter, la gouvernance de validation et les preuves de d\u00e9cision.',
      product: 'Nayeli BIM Control',
      href: '/solutions/global-bim-control',
      seoTitle: 'Solution contr\u00f4le BIM global | Nayeli BIM Control',
      metaDescription:
        'Explorez l\u2019\u00e9cart de contr\u00f4le BIM que NBC vise \u00e0 traiter : qualit\u00e9 de mod\u00e8le, responsabilit\u00e9 des points \u00e0 traiter, validation, preuves et pr\u00e9paration \u00e0 la remise.',
      heroTitle: 'Fermer l\u2019\u00e9cart de contr\u00f4le BIM entre mod\u00e8les, points \u00e0 traiter et d\u00e9cisions.',
      heroBody:
        'Les \u00e9quipes BIM utilisent d\u00e9j\u00e0 des outils puissants de production, de coordination et d\u2019environnement commun de donn\u00e9es. L\u2019\u00e9cart se trouve souvent entre eux : qui est responsable du point, qu\u2019est-ce qui a \u00e9t\u00e9 contr\u00f4l\u00e9, quelle exigence n\u2019est pas respect\u00e9e, et l\u2019information du mod\u00e8le est-elle pr\u00eate pour une d\u00e9cision ?',
      primaryCta: { label: 'Explorer NBC', href: '/products/nbc' },
      secondaryCta: { label: 'Discuter acc\u00e8s anticip\u00e9', href: '/contact' },
      challengeEyebrow: 'L\u2019\u00e9cart du march\u00e9',
      challengeHeading: 'La coordination BIM perd encore la responsabilit\u00e9 entre les outils.',
      challengeBody:
        'Un projet peut disposer de mod\u00e8les, listes de points \u00e0 traiter, documents et tableaux de bord sans dossier de contr\u00f4le clair. NBC se construit autour de cette couche manquante.',
      challenges: [
        { title: 'La qualit\u00e9 du mod\u00e8le est v\u00e9rifi\u00e9e trop tard', body: 'Lacunes d\u2019information, nommage, classifications et exigences non respect\u00e9es apparaissent souvent apr\u00e8s les d\u00e9cisions.' },
        { title: 'La responsabilit\u00e9 des points \u00e0 traiter est fragment\u00e9e', body: 'Les constats passent entre r\u00e9unions, exports, e-mails et plateformes sans historique clair.' },
        { title: 'La validation est difficile \u00e0 prouver', body: 'Les \u00e9quipes doivent savoir quelle r\u00e8gle a \u00e9t\u00e9 v\u00e9rifi\u00e9e, ce qui n\u2019a pas \u00e9t\u00e9 respect\u00e9, ce qui a chang\u00e9 et ce qui reste ouvert.' },
        { title: 'La remise reste incertaine', body: 'Un mod\u00e8le peut sembler coordonn\u00e9 tout en manquant l\u2019information requise pour revue client, exploitation ou usage aval.' },
      ],
      responseEyebrow: 'Positionnement NBC',
      responseHeading: 'Un produit de contr\u00f4le BIM, s\u00e9par\u00e9 de la logistique.',
      responseBody:
        'NBC n\u2019est pas MCT et ne g\u00e8re pas le transport. Il se construit pour les \u00e9quipes BIM qui veulent plus de contr\u00f4le sur l\u2019information du mod\u00e8le, les points de coordination, les preuves de validation et la pr\u00e9paration des d\u00e9cisions.',
      responseCards: [
        { title: 'Revue de mod\u00e8le f\u00e9d\u00e9r\u00e9', body: 'Rassembler l\u2019information des disciplines dans une structure de revue plus claire pour voir la maturit\u00e9, les interfaces et les lacunes.' },
        { title: 'Contr\u00f4le des points et actions', body: 'Relier les constats aux responsables, statuts, preuves, points d\u2019attention et historiques de suivi.' },
        { title: 'Gouvernance de validation', body: 'Soutenir les contr\u00f4les autour des exigences, classifications, nommage, compl\u00e9tude des donn\u00e9es et remise.' },
      ],
      workflowEyebrow: 'Flux de contr\u00f4le NBC',
      workflowHeading: 'De la question mod\u00e8le \u00e0 la preuve de d\u00e9cision.',
      workflow: [
        { title: 'Revoir le contexte du mod\u00e8le', body: 'Comprendre les contributions des disciplines, le p\u00e9rim\u00e8tre de coordination, les exigences informationnelles et les priorit\u00e9s du projet.' },
        { title: 'Identifier les points \u00e0 traiter', body: 'Transformer conflits, donn\u00e9es manquantes, \u00e9carts d\u2019exigences et constats de coordination en \u00e9l\u00e9ments contr\u00f4l\u00e9s.' },
        { title: 'Attribuer la responsabilit\u00e9', body: 'Clarifier le responsable, le statut, la preuve et le changement n\u00e9cessaire avant cl\u00f4ture.' },
        { title: 'Valider la pr\u00e9paration', body: 'V\u00e9rifier si l\u2019information mod\u00e8le est assez compl\u00e8te pour la prochaine d\u00e9cision projet.' },
        { title: 'Garder les preuves', body: 'Pr\u00e9server le dossier de contr\u00f4le pour rendre revues, d\u00e9cisions et remises tra\u00e7ables.' },
      ],
      proofHeading: 'Direction produit en phase pr\u00e9coce',
      proofBody:
        'NBC reste volontairement cibl\u00e9 pendant son d\u00e9veloppement. Le message public reste simple : coordination BIM, contr\u00f4le de l\u2019information du mod\u00e8le et preuves de d\u00e9cision plus solides.',
      finalHeading: 'Fa\u00e7onnez une couche de contr\u00f4le BIM pratique.',
      finalBody:
        'Parlez avec LBYA si votre \u00e9quipe veut discuter des \u00e9carts de coordination BIM, de l\u2019acc\u00e8s anticip\u00e9 ou de la direction produit NBC.',
    },
  ],
  de: [
    {
      slug: 'transport-logistics-africa',
      eyebrow: 'MCT-L\u00f6sung',
      title: 'Afrikanische Transportlogistik',
      body: 'Eine Kontrollschicht f\u00fcr Anfragen, Transporteurdaten, Dokumente, Angebote, Sendungsstatus und Nachweise in afrikanischen Workflows f\u00fcr Stra\u00dfe, See und rail-ready \u00dcbergaben.',
      product: 'Malaika Control Tower',
      href: '/solutions/transport-logistics-africa',
      seoTitle: 'Afrikanische Transportlogistik | Malaika Control Tower',
      metaDescription:
        'Sehen Sie, wie MCT afrikanische Transportlogistik mit Stra\u00dfenfracht, Seefracht, rail-ready \u00dcbergaben, Dokumentenkontrolle, Angebotsvergleich und operativen Nachweisen unterst\u00fctzt.',
      heroTitle: 'Mehr Kontrolle f\u00fcr afrikanische Transportlogistik.',
      heroBody:
        'Afrikanische Logistik h\u00e4ngt oft von vielen Partnern, informellen Updates, Korridor\u00e4nderungen und sensiblen Dokumenten ab. MCT gibt Teams eine gemeinsame operative Aufzeichnung: anfragen, verifizieren, vergleichen, verfolgen und berichten.',
      primaryCta: { label: 'MCT entdecken', href: '/products/mct' },
      secondaryCta: { label: 'Demo anfragen', href: '/contact' },
      challengeEyebrow: 'Das Logistikproblem',
      challengeHeading: 'Koordination bricht, wenn die Aufzeichnung verstreut ist.',
      challengeBody:
        'Grenz\u00fcberschreitende und multimodale Logistik braucht klare Verantwortung, vertrauensw\u00fcrdige Dokumente und schnelle Entscheidungen. Wenn die Arbeit in Nachrichten, Tabellen und Ordnern liegt, wird Risiko schwerer sichtbar.',
      challenges: [
        { title: 'Anfragen sind unvollst\u00e4ndig', body: 'Frachtdetails, Routen, Timing, Kontakte und Servicebedarf sind oft \u00fcber mehrere Kan\u00e4le verteilt.' },
        { title: 'Dokumentenbereitschaft ist unklar', body: 'Truck packs, Genehmigungen, Fahrerunterlagen, Versicherung und Ablaufdaten brauchen Nachweise vor Entscheidungen.' },
        { title: 'Angebote fehlen Kontext', body: 'Preis allein reicht nicht. Teams brauchen auch Transporteurbereitschaft, Routenrisiko, Dokumentenstatus und Historie.' },
        { title: 'Korridor-Updates verschwinden', body: 'Informationen zu Stra\u00dfe, Hafen, Grenze und \u00dcbergabe k\u00f6nnen in informeller Kommunikation verloren gehen.' },
      ],
      responseEyebrow: 'Wie MCT unterst\u00fctzt',
      responseHeading: 'Ein Produktworkflow f\u00fcr Stra\u00dfe, See und rail-ready Logistik.',
      responseBody:
        'MCT ist als logistischer Control Tower gebaut: praktisch genug f\u00fcr t\u00e4gliche Koordination, strukturiert genug f\u00fcr professionelles Reporting und bereit f\u00fcr Partnerzugang und Integrationen.',
      responseCards: [
        { title: 'Kontrolle f\u00fcr Stra\u00dfenfracht', body: 'Routenanfragen, Transporteur-Optionen, Truck packs, Genehmigungen, Dokumentenstatus, Angebote und Sendungsfortschritt in einem Workspace steuern.' },
        { title: 'Koordination f\u00fcr Seefracht', body: 'Frachtunterlagen, hafenbezogene \u00dcbergaben, Partnernotizen, Dokumente und Folgeaktionen mit derselben operativen Aufzeichnung verbinden.' },
        { title: 'Rail-ready \u00dcbergaben', body: 'Strukturierte Unterlagen f\u00fcr k\u00fcnftige Bahn- oder intermodale Workflows vorbereiten, inklusive \u00dcbergabestatus, Partnerverantwortung und Nachweiskette.' },
      ],
      workflowEyebrow: 'MCT-Kontrollfluss',
      workflowHeading: 'Von der Transportanfrage zum Nachweisbericht.',
      workflow: [
        { title: 'Anfrage erfassen', body: 'Eine strukturierte Aufzeichnung f\u00fcr Route, Fracht, Timing, Kundendaten und operative Bed\u00fcrfnisse erstellen.' },
        { title: 'Bereitschaft verifizieren', body: 'Transporteur, Lkw, Fahrer, Genehmigungen, Versicherung und Dokumentennachweise vor Freigabe organisieren.' },
        { title: 'Optionen vergleichen', body: 'Angebote neben Risiko, Bereitschaft, Dokumentenstatus und Koordinationshistorie pr\u00fcfen.' },
        { title: 'Operation verfolgen', body: 'Status durch Zuweisung, Beladung, Grenze oder Hafen, Lieferung und Abschluss verfolgen.' },
        { title: 'Aufzeichnung exportieren', body: 'Einen klaren Bericht mit Entscheidungen, Dokumenten, Pr\u00fcfungen und offenen Punkten erstellen.' },
      ],
      proofHeading: 'Kommerziell bereit',
      proofBody:
        'MCT ist bereit f\u00fcr Demo-Anfragen.',
      finalHeading: 'Mit einem Logistikworkflow starten.',
      finalBody:
        'Nutzen Sie eine Demo, um den ersten kontrollierten Workflow zu definieren, und skalieren Sie das Produkt danach rund um Dokumente, Partner, Reporting und Integrationen.',
    },
    {
      slug: 'global-bim-control',
      eyebrow: 'NBC-L\u00f6sung',
      title: 'Globale BIM-Kontrolle',
      body: 'Eine fokussierte BIM-Kontrollrichtung in fr\u00fcher Phase f\u00fcr Modellpr\u00fcfung, Problemverantwortung, Validierungs-Governance und Entscheidungsnachweise in Projektteams.',
      product: 'Nayeli BIM Control',
      href: '/solutions/global-bim-control',
      seoTitle: 'Globale BIM-Kontrolle | Nayeli BIM Control',
      metaDescription:
        'Entdecken Sie die BIM-Kontrolll\u00fccke, die NBC adressieren soll: Modellqualit\u00e4t, Problemverantwortung, Validierungs-Governance, Nachweise und \u00dcbergabereife.',
      heroTitle: 'Die BIM-Kontrolll\u00fccke zwischen Modellen, Problemen und Entscheidungen schlie\u00dfen.',
      heroBody:
        'BIM-Teams nutzen bereits starke Werkzeuge f\u00fcr Autorierung, Koordination und gemeinsame Daten. Die L\u00fccke liegt oft dazwischen: Wer besitzt das Problem, was wurde gepr\u00fcft, welche Anforderung ist fehlgeschlagen, und ist die Modellinformation entscheidungsbereit?',
      primaryCta: { label: 'NBC entdecken', href: '/products/nbc' },
      secondaryCta: { label: 'Early Access besprechen', href: '/contact' },
      challengeEyebrow: 'Die Marktl\u00fccke',
      challengeHeading: 'BIM-Koordination verliert Verantwortung noch immer zwischen Werkzeugen.',
      challengeBody:
        'Projekte k\u00f6nnen Modelle, Problemlisten, Dokumente und Dashboards haben, ohne eine klare Kontrollaufzeichnung zu besitzen. NBC wird um diese fehlende Schicht herum entwickelt.',
      challenges: [
        { title: 'Modellqualit\u00e4t wird zu sp\u00e4t gepr\u00fcft', body: 'Informationsl\u00fccken, Benennung, Klassifikationen und Anforderungsfehler erscheinen oft erst, nachdem Entscheidungen weitergelaufen sind.' },
        { title: 'Problemverantwortung ist fragmentiert', body: 'Feststellungen wandern zwischen Meetings, Exporten, E-Mails und Plattformen ohne klare Verantwortungshistorie.' },
        { title: 'Validierung ist schwer nachweisbar', body: 'Teams m\u00fcssen wissen, welche Regel gepr\u00fcft wurde, was fehlgeschlagen ist, was sich ge\u00e4ndert hat und was offen bleibt.' },
        { title: '\u00dcbergabereife ist unsicher', body: 'Ein Modell kann koordiniert wirken und trotzdem Informationen f\u00fcr Kundenpr\u00fcfung, Betrieb oder nachgelagerte Nutzung vermissen.' },
      ],
      responseEyebrow: 'Wie NBC positioniert ist',
      responseHeading: 'Ein BIM-Kontrollprodukt, getrennt von Logistik.',
      responseBody:
        'NBC ist nicht MCT und steuert keinen Transport. Es wird f\u00fcr BIM-Teams entwickelt, die mehr Kontrolle \u00fcber Modellinformationen, Koordinationsprobleme, Validierungsnachweise und Entscheidungsreife brauchen.',
      responseCards: [
        { title: 'Federierte Modellpr\u00fcfung', body: 'Fachinformationen in eine klarere Pr\u00fcfstruktur bringen, damit Teams Reife, Schnittstellen und L\u00fccken sehen.' },
        { title: 'Problem- und Aktionskontrolle', body: 'Feststellungen mit Verantwortlichen, Status, Nachweisen, Aufmerksamkeit und Verlauf verbinden.' },
        { title: 'Validierungs-Governance', body: 'Pr\u00fcfungen rund um Anforderungen, Klassifikationen, Benennung, Datenvollst\u00e4ndigkeit und \u00dcbergabereife unterst\u00fctzen.' },
      ],
      workflowEyebrow: 'NBC-Kontrollfluss',
      workflowHeading: 'Von der Modellfrage zum Entscheidungsnachweis.',
      workflow: [
        { title: 'Modellkontext pr\u00fcfen', body: 'Fachinputs, Koordinationsumfang, Informationsanforderungen und Projektpriorit\u00e4ten verstehen.' },
        { title: 'Probleme identifizieren', body: 'Clashes, fehlende Daten, Anforderungsl\u00fccken und Koordinationsfunde in kontrollierte Punkte \u00fcberf\u00fchren.' },
        { title: 'Verantwortung zuweisen', body: 'Eigent\u00fcmer, Status, Nachweis und notwendige \u00c4nderung vor Abschluss klarstellen.' },
        { title: 'Bereitschaft validieren', body: 'Pr\u00fcfen, ob Modellinformationen komplett genug f\u00fcr die n\u00e4chste Projektentscheidung sind.' },
        { title: 'Nachweise sichern', body: 'Die Kontrollaufzeichnung erhalten, damit Pr\u00fcfungen, Entscheidungen und \u00dcbergaben nachvollziehbar bleiben.' },
      ],
      proofHeading: 'Produktrichtung in fr\u00fcher Phase',
      proofBody:
        'NBC bleibt w\u00e4hrend der Entwicklung bewusst fokussiert. Die \u00f6ffentliche Botschaft bleibt einfach: BIM-Koordination, Modellinformationskontrolle und st\u00e4rkere Entscheidungsnachweise.',
      finalHeading: 'Eine praktische BIM-Kontrollschicht gestalten.',
      finalBody:
        'Sprechen Sie mit LBYA, wenn Ihr Team BIM-Koordinationsl\u00fccken, Early Access oder die Produktrichtung hinter NBC diskutieren m\u00f6chte.',
    },
  ],
};

export function getSolutionsHomeCopy(locale: string): SolutionsHomeCopy {
  return homeCopyByLocale[asLocale(locale)];
}

export function getSolutions(locale: string): SolutionDetail[] {
  const activeLocale = asLocale(locale);
  const solutions = solutionsByLocale[activeLocale];
  return activeLocale === 'sv'
    ? solutions.filter((solution) => solution.slug === 'global-bim-control')
    : solutions;
}

export function getSolution(locale: string, slug: string): SolutionDetail | undefined {
  return getSolutions(locale).find((solution) => solution.slug === slug);
}
