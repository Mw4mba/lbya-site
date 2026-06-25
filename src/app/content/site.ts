// Site content layer (locale-aware). Source of truth: docs/LBYA_Content_Critique.md
// section 6 (clean copy deck). British English for EN; SV/FR/DE are machine
// translations flagged for human review (Phase 3 decision). Access via getSite(locale).
import type { Locale } from './locale';
import { asLocale } from './locale';

interface Cta {
  label: string;
  href: string;
}

export interface ServiceCategory {
  title: string;
  body: string;
  image: string;
  tags: string[];
  deliverables?: string[];
  outcome?: string;
  relatedProduct?: string;
}

export interface CaseStudy {
  product: string;
  acronym: string;
  title: string;
  context: string;
  description: string;
  image: string;
  href: string;
}

export interface SiteContent {
  home: {
    hero: {
      headline: string;
      subheadline: string;
      slogan: string;
      carousel: string[];
      primaryCtas: Cta[];
      secondaryCta: Cta;
    };
    problem: { heading: string; body: string; points: string[] };
    answer: { heading: string; body: string };
    why: { heading: string; body: string; points: { title: string; detail: string }[] };
    servicesTeaser: { heading: string; body: string; cta: Cta };
    finalCta: { heading: string; body: string; primaryCta: Cta; secondaryCta: Cta };
  };
  productsOverview: { seoTitle: string; metaDescription: string; hero: string; intro: string };
  services: {
    seoTitle: string;
    metaDescription: string;
    hero: string;
    intro: string;
    rule: string;
    categories: ServiceCategory[];
  };
  contact: { headline: string; paragraph: string; inquiryTypes: string[] };
  about: {
    heroHeading: string;
    intro: { heading: string; body: string };
    evolution: { heading: string; body: string; body2: string };
    vision: { heading: string; points: { title: string; detail: string }[] };
    philosophy?: { heading: string; body: string };
    founder?: { heading: string; body: string; points: string[] };
    closing: string;
  };
  caseStudies: { heading: string; subtitle: string; items: CaseStudy[] };
}

// Locale-invariant assets reused across all languages.
const IMG = {
  bimDigital: '/Website/2eff78f1-25dd-4e64-8868-938ea919ab70.png',
  structural: '/Website/STRUCTURAL.png',
  digitalTwin: '/images/insights/digital-twin.jpg',
  mining: '/Website/MINING.jpg',
  kinshasa: 'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?q=80&w=2070&auto=format&fit=crop',
  stockholm: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?q=80&w=2070&auto=format&fit=crop',
  capetown: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=2071&auto=format&fit=crop',
};

const en: SiteContent = {
  home: {
    hero: {
      headline: 'We build digital control platforms for connected industries.',
      subheadline:
        'We help teams keep logistics and BIM work clear, organised, and easy to trust, from requests and documents to responsibilities and decisions.',
      slogan: 'Rooted in Nature, Designed for the Future.',
      carousel: [
        'Keep logistics and BIM work clear from request to decision.',
        'Connect teams, documents, checks, and responsibility in one product workflow.',
        'Turn scattered updates into a record people can trust.',
        'Know what is ready, what needs attention, and who owns the next step.',
      ],
      primaryCtas: [
        { label: 'Explore our products', href: '#products' },
        { label: 'Request a demo', href: '/contact' },
      ],
      secondaryCta: { label: 'Explore MCT and NBC', href: '/products' },
    },
    problem: {
      heading: 'Important work gets lost between tools',
      body: 'Many teams still manage critical work through messages, spreadsheets, and disconnected files. That makes ownership unclear and leaves people unsure about what was checked, approved, or still waiting.',
      points: ['Fragmented information', 'Disconnected tools', 'Weak verification', 'Unclear responsibility'],
    },
    answer: {
      heading: 'LBYA brings the record together',
      body: 'Our products give teams one place to follow the work, attach the evidence, and see the decision trail, so important details are easier to find and easier to trust.',
    },
    why: {
      heading: 'Why it matters',
      body: 'When the record is clear, teams spend less time chasing updates and more time making the right call.',
      points: [
        { title: 'Clarity', detail: 'Requests, documents, and decisions stay in one organised place.' },
        { title: 'Traceability', detail: 'Checks, evidence, and status changes are easy to review later.' },
        { title: 'Coordination', detail: 'People know what changed, who is responsible, and what comes next.' },
        { title: 'Decision readiness', detail: 'Teams can act because the record is clear enough to trust.' },
      ],
    },
    servicesTeaser: {
      heading: 'Find the product path that fits',
      body: 'Use MCT for logistics control, NBC for BIM control, or bring both into a connected product workflow.',
      cta: { label: 'Compare products', href: '/products' },
    },
    finalCta: {
      heading: 'Explore the right LBYA product for your team',
      body: 'Request a demo, compare MCT and NBC, or talk through a pilot with us.',
      primaryCta: { label: 'Request a demo', href: '/contact' },
      secondaryCta: { label: 'Compare products', href: '/products' },
    },
  },
  productsOverview: {
    seoTitle: 'LBYA AB - Digital Control Products for Connected Industries',
    metaDescription:
      'Explore Malaika Control Tower and Nayeli BIM Control, LBYA AB digital control products for logistics and BIM teams.',
    hero: 'Products',
    intro:
      'LBYA builds digital control products that help teams turn scattered information into clear, traceable decisions. Malaika Control Tower focuses on transport and logistics. Nayeli BIM Control brings the same discipline to BIM.',
  },
  services: {
    seoTitle: 'LBYA Services | BIM, Integration, Engineering, and African Operations Advisory',
    metaDescription:
      'LBYA services support BIM and digital construction advisory, structural and BIM engineering, software/API integration, and African market operations.',
    hero: 'Services',
    intro:
      'Commercial advisory and implementation services that help teams map control gaps, prepare product adoption, and modernise how work gets done.',
    rule: 'Every service supports product implementation, digital transformation, or market adoption.',
    categories: [
      { title: 'BIM and Digital Construction Advisory', body: 'For BIM managers, clients, consultants, and contractors who need clearer information requirements, model coordination workflows, IFC/BCF/IDS support, BIM quality control, delivery readiness, and NBC preparation.', image: IMG.bimDigital, tags: ['BIM strategy', 'IFC / BCF / IDS', 'Quality control'], relatedProduct: 'Nayeli BIM Control', outcome: 'A practical BIM control framework that teams can implement, review, and improve.', deliverables: ['Workshop and discovery report', 'BIM control framework', 'Implementation roadmap', 'Training and handover notes'] },
      { title: 'Structural and BIM Engineering Support', body: 'For teams that need support with structural modelling, coordination, drawing and model quality, BIM deliverables, and engineering workflow improvement.', image: IMG.structural, tags: ['Structural design', 'Model-based delivery', 'Eurocode'], relatedProduct: 'Nayeli BIM Control', outcome: 'Cleaner deliverables, clearer responsibilities, and stronger engineering coordination.', deliverables: ['Model and drawing quality review', 'Coordination workflow map', 'Requirements and user stories', 'Support documentation'] },
      { title: 'Software and API Integration', body: 'For organisations that need connections between BIM tools, dashboards, databases, automation scripts, CDEs, logistics platforms, and business systems.', image: IMG.digitalTwin, tags: ['Integrations', 'Dashboards', 'Automation'], relatedProduct: 'MCT and NBC', outcome: 'A technical roadmap that turns scattered systems into a connected workflow.', deliverables: ['System and data-flow diagnosis', 'Dashboard or prototype concept', 'API and integration roadmap', 'Developer-ready requirements'] },
      { title: 'African Market and Operations Advisory', body: 'For companies working with African logistics, transporter coordination, documentation workflows, market entry, and MCT implementation strategy.', image: IMG.mining, tags: ['Logistics', 'Market entry', 'Partnerships'], relatedProduct: 'Malaika Control Tower', outcome: 'A grounded operating model for coordination, documentation, verification, and local partnerships.', deliverables: ['Workflow and process map', 'Control gap diagnosis', 'MCT pilot path', 'Market and operations advisory notes'] },
    ],
  },
  contact: {
    headline: 'Tell us what you want to explore.',
    paragraph:
      'Share what you need: MCT access, NBC access, a product demo, a comparison, or a pilot conversation.',
    inquiryTypes: [
      'Request MCT access',
      'Request NBC access',
      'Compare MCT and NBC',
      'Request a product demo',
      'Discuss product integration',
      'Discuss product partnership',
      'General inquiry',
    ],
  },
  about: {
    heroHeading: 'Our Story',
    intro: {
      heading: 'Everything is connected',
      body: 'LBYA began with a simple belief: people, nature, infrastructure, information, and markets are connected. Today, we build digital control products that help teams manage complexity with more clarity and trust.',
    },
    evolution: {
      heading: 'From fragmented work to focused products',
      body: 'Our work is rooted in nature-inspired thinking and designed for the future. LBYA grew from direct experience with fragmented engineering, BIM, logistics, and market workflows. That experience made one thing clear: teams need better control of information, not just more tools.',
      body2:
        'Through Malaika Control Tower and Nayeli BIM Control, LBYA builds software that brings information, responsibility, and decisions into clearer product workflows.',
    },
    vision: {
      heading: 'Our product vision',
      points: [
        { title: 'Malaika Control Tower', detail: 'A ready logistics control product for connected African trade, available for demo requests.' },
        { title: 'Nayeli BIM Control', detail: 'A BIM control product built to make model information more accountable.' },
        { title: 'Global ambition', detail: 'Products lead the company, with room to grow into connected industries worldwide.' },
      ],
    },
    philosophy: {
      heading: 'Our philosophy',
      body: 'Natural systems work because signals, resources, risks, and adaptation stay connected. LBYA brings that thinking into software. We design products that help teams see what is connected, check what is reliable, and act before complexity becomes disorder.',
    },
    founder: {
      heading: 'Why LBYA exists',
      body: 'LBYA brings together lived experience, engineering thinking, African opportunity, Swedish structure, and the ambition to build useful digital products. The company grew from seeing fragmented workflows in construction, BIM, logistics, and market operations, then asking what kind of control layer would make those systems easier to trust.',
      points: [
        'From engineering and BIM experience to product development.',
        'From fragmented workflows to digital control layers.',
        'From local knowledge of African logistics and markets to scalable products.',
        'From one-project problem solving to products that can support many teams.',
      ],
    },
    closing: 'Rooted in Nature, Designed for the Future.',
  },
  caseStudies: {
    heading: 'Case studies',
    subtitle: 'MCT shows African logistics coordination in practice. NBC shows how BIM Control can support project teams anywhere.',
    items: [
      { product: 'Malaika Control Tower', acronym: 'MCT', title: 'African logistics coordination', context: 'MCT for African logistics corridors', description: 'MCT brings transport requests, transporter data, truck documents, quotes, verification notes, and operational decisions into one workflow. The focus is simple: clearer ownership, better traceability, and more trust across cross-border logistics.', image: IMG.kinshasa, href: '/products/mct' },
      { product: 'Nayeli BIM Control', acronym: 'NBC', title: 'BIM Control for global project teams', context: 'Global BIM information control', description: 'NBC is designed for BIM teams anywhere: clients, BIM managers, consultants, contractors, and multidisciplinary delivery teams that need clearer requirements, model quality, issue ownership, evidence, and decision readiness.', image: IMG.bimDigital, href: '/products/nbc' },
    ],
  },
};

const sv: SiteContent = {
  home: {
    hero: {
      headline: 'Vi bygger digitala kontrollplattformar för sammankopplade branscher.',
      subheadline:
        'Vi hjälper team att hålla logistik- och BIM-arbete tydligt, organiserat och lätt att lita på, från förfrågningar och dokument till ansvar och beslut.',
      slogan: 'Rotad i naturen, designad för framtiden.',
      carousel: [
        'Håll logistik- och BIM-arbete tydligt från förfrågan till beslut.',
        'Koppla samman team, dokument, kontroller och ansvar i ett produktflöde.',
        'Gör spridda uppdateringar till ett underlag människor kan lita på.',
        'Se vad som är klart, vad som behöver åtgärdas och vem som ansvarar för nästa steg.',
      ],
      primaryCtas: [
        { label: 'Utforska våra produkter', href: '#products' },
        { label: 'Begär demo', href: '/contact' },
      ],
      secondaryCta: { label: 'Utforska MCT och NBC', href: '/products' },
    },
    problem: {
      heading: 'Viktigt arbete försvinner mellan verktygen',
      body: 'Många team hanterar fortfarande kritiskt arbete i meddelanden, kalkylark och fristående filer. Då blir ansvaret otydligt och det är svårt att veta vad som är kontrollerat, godkänt eller fortfarande väntar.',
      points: ['Fragmenterad information', 'Frånkopplade verktyg', 'Svag verifiering', 'Oklart ansvar'],
    },
    answer: {
      heading: 'LBYA samlar underlaget',
      body: 'Våra produkter ger team en plats där de kan följa arbetet, lägga till underlag och se beslutshistoriken, så att viktiga detaljer blir lättare att hitta och lita på.',
    },
    why: {
      heading: 'Varför det spelar roll',
      body: 'När underlaget är tydligt lägger team mindre tid på att jaga uppdateringar och mer tid på att fatta rätt beslut.',
      points: [
        { title: 'Tydlighet', detail: 'Förfrågningar, dokument och beslut hålls på en organiserad plats.' },
        { title: 'Spårbarhet', detail: 'Kontroller, underlag och statusändringar går enkelt att granska i efterhand.' },
        { title: 'Samordning', detail: 'Team ser vad som har ändrats, vem som ansvarar och vad nästa steg är.' },
        { title: 'Beslutsberedskap', detail: 'Team kan agera eftersom underlaget är tillräckligt tydligt för att lita på.' },
      ],
    },
    servicesTeaser: {
      heading: 'Hitta produktvägen som passar',
      body: 'Använd MCT för logistikkontroll, NBC för BIM-kontroll eller båda i ett sammanhängande produktflöde.',
      cta: { label: 'Jämför produkter', href: '/products' },
    },
    finalCta: {
      heading: 'Utforska rätt LBYA-produkt för ert team',
      body: 'Begär demo, jämför MCT och NBC eller prata med oss om en pilot.',
      primaryCta: { label: 'Begär demo', href: '/contact' },
      secondaryCta: { label: 'Jämför produkter', href: '/products' },
    },
  },
  productsOverview: {
    seoTitle: 'LBYA Produkter | Nayeli BIM Control',
    metaDescription:
      'Utforska Nayeli BIM Control, LBYA:s digitala BIM-kontrollprodukt.',
    hero: 'Produkter',
    intro:
      'LBYA bygger digitala kontrollprodukter som hjälper team att göra spridd information till tydliga, spårbara beslut. I den svenska versionen fokuserar vi på Nayeli BIM Control och dess roll inom BIM-samordning, modellinformation och beslutsunderlag.',
  },
  services: {
    seoTitle: 'LBYA Tjänster | Stöd för implementering och digital transformation',
    metaDescription:
      'Experttjänster som stödjer BIM, mjukvaruintegration, konstruktionsteknik och verksamhet på den afrikanska marknaden.',
    hero: 'Tjänster',
    intro:
      'Experttjänster som hjälper team att införa våra produkter och modernisera sitt arbetssätt. Tjänsterna stödjer implementering och rådgivning, inte tvärtom.',
    rule: 'Varje tjänst stödjer produktimplementering, digital transformation eller marknadsintroduktion.',
    categories: [
      { title: 'BIM- och digital byggrådgivning', body: 'Stöd för BIM-strategi, modellkoordinering och informationshantering, inklusive IFC-, BCF- och IDS-orienterade arbetsflöden, BIM-kvalitetskontroll och förberedelse för NBC-införande.', image: IMG.bimDigital, tags: ['BIM-strategi', 'IFC / BCF / IDS', 'Kvalitetskontroll'] },
      { title: 'Konstruktions- och BIM-ingenjörsstöd', body: 'Specialiststöd för konstruktionsteknik, modellbaserad leverans, koordinering och Eurocode-orienterad projekteringsdokumentation där det är relevant.', image: IMG.structural, tags: ['Konstruktionsdesign', 'Modellbaserad leverans', 'Eurocode'] },
      { title: 'Mjukvaru- och API-integration', body: 'Utvecklings- och integrationsstöd för BIM-verktyg, dashboards, automatisering, dataflöden och produktimplementering.', image: IMG.digitalTwin, tags: ['Integrationer', 'Dashboards', 'Automatisering'] },
      { title: 'Rådgivning för afrikansk marknad och verksamhet', body: 'Stöd för företag som arbetar med afrikansk logistik, transportkoordinering, gruvrelaterade affärskopplingar och operativ marknadsetablering kopplad till MCT och LBYA-nätverket.', image: IMG.mining, tags: ['Logistik', 'Marknadsinträde', 'Partnerskap'] },
    ],
  },
  contact: {
    headline: 'Berätta vad du vill utforska.',
    paragraph:
      'Berätta vad du behöver: MCT-åtkomst, tidig NBC-åtkomst, en produktdemo, en jämförelse eller ett samtal om pilotprojekt.',
    inquiryTypes: [
      'Begär MCT-åtkomst',
      'Gå med i NBC:s tidiga åtkomst',
      'Jämför MCT och NBC',
      'Begär en produktdemo',
      'Diskutera produktintegration',
      'Diskutera produktpartnerskap',
      'Allmän fråga',
    ],
  },
  about: {
    heroHeading: 'Vår historia',
    intro: {
      heading: 'Allt hänger ihop',
      body: 'LBYA började med en enkel övertygelse: människor, natur, infrastruktur, information och marknader hänger ihop. Idag bygger vi digitala kontrollprodukter som hjälper team att hantera komplexitet med mer tydlighet och tillit.',
    },
    evolution: {
      heading: 'Från fragmenterat arbete till fokuserade produkter',
      body: 'Vårt arbete är rotat i naturinspirerat tänkande och designat för framtiden. LBYA växte fram ur direkt erfarenhet av splittrade arbetsflöden inom teknik, BIM, logistik och marknadsarbete. Det gjorde en sak tydlig: team behöver bättre kontroll över information, inte bara fler verktyg.',
      body2:
        'Genom Malaika Control Tower och Nayeli BIM Control bygger LBYA mjukvara som samlar information, ansvar och beslut i tydligare produktflöden.',
    },
    vision: {
      heading: 'Vår produktvision',
      points: [
        { title: 'Malaika Control Tower', detail: 'En färdig logistikkontrollprodukt för sammankopplad afrikansk handel, tillgänglig för demoförfrågningar.' },
        { title: 'Nayeli BIM Control', detail: 'En BIM-kontrollprodukt i tidig utveckling, byggd för att göra modellinformation tydligare och mer spårbar.' },
        { title: 'Global ambition', detail: 'Produkterna leder bolaget, med utrymme att växa in i sammankopplade branscher världen över.' },
      ],
    },
    closing: 'Rotad i naturen, designad för framtiden.',
  },
  caseStudies: {
    heading: 'Fallstudier',
    subtitle: 'MCT visar afrikansk logistiksamordning i praktiken. NBC visar hur BIM Control kan stödja projektteam var som helst.',
    items: [
      { product: 'Malaika Control Tower', acronym: 'MCT', title: 'Afrikansk logistiksamordning', context: 'MCT för afrikanska logistikkorridorer', description: 'MCT samlar transportförfrågningar, transportörsdata, lastbilsdokument, offerter, verifieringsanteckningar och operativa beslut i ett arbetsflöde. Fokus är enkelt: tydligare ägarskap, bättre spårbarhet och mer tillit i gränsöverskridande logistik.', image: IMG.kinshasa, href: '/products/mct' },
      { product: 'Nayeli BIM Control', acronym: 'NBC', title: 'BIM Control för globala projektteam', context: 'Global BIM-informationskontroll', description: 'NBC är utformat för BIM-team överallt: beställare, BIM-ansvariga, konsulter, entreprenörer och multidisciplinära leveransteam som behöver tydligare krav, modellkvalitet, ärendeägarskap, underlag och beslutsberedskap.', image: IMG.bimDigital, href: '/products/nbc' },
    ],
  },
};

const fr: SiteContent = {
  home: {
    hero: {
      headline: 'Nous construisons des plateformes de contrôle numérique pour des industries connectées.',
      subheadline:
        "Nous aidons les équipes à garder la logistique et le BIM clairs, organisés et faciles à vérifier, des demandes et documents jusqu'aux responsabilités et décisions.",
      slogan: "Enraciné dans la nature, conçu pour l'avenir.",
      carousel: [
        'Gardez la logistique et le BIM clairs, de la demande à la décision.',
        'Reliez équipes, documents, contrôles et responsabilités dans un même flux opérationnel.',
        'Transformez des mises à jour dispersées en un dossier fiable.',
        'Voyez ce qui est prêt, ce qui demande attention et qui est responsable de la prochaine étape.',
      ],
      primaryCtas: [
        { label: 'Explorer nos produits', href: '#products' },
        { label: 'Demander une démo', href: '/contact' },
      ],
      secondaryCta: { label: 'Explorer MCT et NBC', href: '/products' },
    },
    problem: {
      heading: "Le travail important se perd entre les outils",
      body: "Beaucoup d'équipes gèrent encore le travail critique dans des messages, tableurs et fichiers séparés. Les responsabilités deviennent floues et il devient difficile de savoir ce qui a été vérifié, approuvé ou reste en attente.",
      points: ['Information fragmentée', 'Outils déconnectés', 'Vérification insuffisante', 'Responsabilités floues'],
    },
    answer: {
      heading: 'LBYA rassemble le dossier',
      body: "Nos produits donnent aux équipes un endroit pour suivre le travail, joindre les preuves et voir l'historique des décisions, afin que les détails importants soient plus faciles à retrouver et à valider.",
    },
    why: {
      heading: "Pourquoi c'est important",
      body: "Lorsque le dossier est clair, les équipes passent moins de temps à chercher des mises à jour et plus de temps à prendre les bonnes décisions.",
      points: [
        { title: 'Clarté', detail: 'Les demandes, documents et décisions restent dans un espace organisé.' },
        { title: 'Traçabilité', detail: 'Les contrôles, preuves et changements de statut restent faciles à revoir.' },
        { title: 'Coordination', detail: 'Les équipes voient ce qui a changé, qui est responsable et quelle est la prochaine étape.' },
        { title: 'Préparation à la décision', detail: 'Les équipes peuvent agir parce que le dossier est assez clair pour être fiable.' },
      ],
    },
    servicesTeaser: {
      heading: 'Trouvez le parcours produit adapté',
      body: "Utilisez MCT pour le contrôle logistique, NBC pour le contrôle BIM, ou les deux dans un flux produit connecté.",
      cta: { label: 'Comparer les produits', href: '/products' },
    },
    finalCta: {
      heading: "Explorez le bon produit LBYA pour votre équipe",
      body: "Demandez une démo, comparez MCT et NBC, ou échangez avec nous sur un pilote.",
      primaryCta: { label: 'Demander une démo', href: '/contact' },
      secondaryCta: { label: 'Comparer les produits', href: '/products' },
    },
  },
  productsOverview: {
    seoTitle: 'Produits LBYA | Plateformes de contrôle numérique',
    metaDescription:
      'Découvrez les produits de contrôle numérique de LBYA pour les équipes logistiques et BIM.',
    hero: 'Produits',
    intro:
      "LBYA conçoit des produits de contrôle numérique qui aident les équipes à transformer l'information dispersée en décisions claires et traçables. Malaika Control Tower se concentre sur le transport et la logistique. Nayeli BIM Control apporte la même rigueur au BIM.",
  },
  services: {
    seoTitle: 'Services LBYA | Soutien à la mise en œuvre et à la transformation numérique',
    metaDescription:
      'Des services experts soutenant le BIM, l’intégration logicielle, l’ingénierie structurelle et les opérations sur le marché africain.',
    hero: 'Services',
    intro:
      "Des services experts qui aident les équipes à adopter nos produits et à moderniser leur façon de travailler. Les services soutiennent la mise en œuvre et le conseil, et non l'inverse.",
    rule: "Chaque service soutient la mise en œuvre des produits, la transformation numérique ou l'adoption sur le marché.",
    categories: [
      { title: 'Conseil en BIM et construction numérique', body: "Soutien à la stratégie BIM, à la coordination des modèles et à la gestion de l'information, y compris les flux orientés IFC, BCF et IDS, le contrôle qualité BIM et la préparation à l'adoption de NBC.", image: IMG.bimDigital, tags: ['Stratégie BIM', 'IFC / BCF / IDS', 'Contrôle qualité'] },
      { title: 'Soutien en ingénierie structurelle et BIM', body: "Soutien spécialisé pour l'ingénierie structurelle, la livraison basée sur les modèles, la coordination et la documentation de conception orientée Eurocode le cas échéant.", image: IMG.structural, tags: ['Conception structurelle', 'Livraison par modèle', 'Eurocode'] },
      { title: 'Intégration logicielle et API', body: 'Soutien au développement et à l’intégration pour les outils BIM, les tableaux de bord, l’automatisation, les flux de données et la mise en œuvre des produits.', image: IMG.digitalTwin, tags: ['Intégrations', 'Tableaux de bord', 'Automatisation'] },
      { title: 'Conseil sur le marché et les opérations en Afrique', body: 'Soutien aux entreprises travaillant avec la logistique africaine, la coordination des transports, les liens commerciaux liés à l’exploitation minière et l’entrée opérationnelle sur le marché, en lien avec MCT et le réseau LBYA.', image: IMG.mining, tags: ['Logistique', 'Entrée sur le marché', 'Partenariats'] },
    ],
  },
  contact: {
    headline: 'Dites-nous ce que vous voulez explorer.',
    paragraph:
      "Partagez votre besoin : accès MCT, accès anticipé NBC, démonstration produit, comparaison ou échange autour d'un pilote.",
    inquiryTypes: [
      'Demander un accès MCT',
      "Rejoindre l'accès anticipé NBC",
      'Comparer MCT et NBC',
      'Demander une démonstration produit',
      "Discuter d'une intégration produit",
      "Discuter d'un partenariat produit",
      'Demande générale',
    ],
  },
  about: {
    heroHeading: 'Notre histoire',
    intro: {
      heading: 'Tout est connecté',
      body: "LBYA est née d'une conviction simple : les personnes, la nature, les infrastructures, l'information et les marchés sont connectés. Aujourd'hui, nous construisons des produits de contrôle numérique qui aident les équipes à gérer la complexité avec plus de clarté et de confiance.",
    },
    evolution: {
      heading: 'Du travail fragmenté aux produits ciblés',
      body: "Notre travail est enraciné dans une pensée inspirée par la nature et conçu pour l'avenir. LBYA vient d'une expérience directe des flux fragmentés dans l'ingénierie, le BIM, la logistique et les marchés. Cette expérience a rendu une chose claire : les équipes ont besoin d'un meilleur contrôle de l'information, pas seulement de plus d'outils.",
      body2:
        "Avec Malaika Control Tower et Nayeli BIM Control, LBYA construit des logiciels qui rassemblent information, responsabilité et décisions dans des flux produit plus clairs.",
    },
    vision: {
      heading: 'Notre vision produit',
      points: [
        { title: 'Malaika Control Tower', detail: 'Un produit prêt pour le contrôle logistique du commerce africain connecté, disponible sur demande de démonstration.' },
        { title: 'Nayeli BIM Control', detail: "Un produit de contrôle BIM en développement précoce, conçu pour rendre l'information du modèle plus claire et plus traçable." },
        { title: 'Ambition mondiale', detail: "Les produits guident l'entreprise, avec la capacité de grandir vers des industries connectées dans le monde entier." },
      ],
    },
    closing: "Enraciné dans la nature, conçu pour l'avenir.",
  },
  caseStudies: {
    heading: 'Études de cas',
    subtitle: "MCT montre la coordination logistique africaine en pratique. NBC montre comment BIM Control peut soutenir les équipes projet partout.",
    items: [
      { product: 'Malaika Control Tower', acronym: 'MCT', title: 'Coordination logistique africaine', context: 'MCT pour les corridors logistiques africains', description: "MCT rassemble les demandes de transport, les données transporteurs, les dossiers de camions, les devis, les notes de vérification et les décisions opérationnelles dans un même flux. L'objectif est simple : plus de responsabilité, une meilleure traçabilité et plus de confiance dans la logistique transfrontalière.", image: IMG.kinshasa, href: '/products/mct' },
      { product: 'Nayeli BIM Control', acronym: 'NBC', title: 'BIM Control pour les équipes projet internationales', context: "Contrôle global de l'information BIM", description: "NBC est conçu pour les équipes BIM partout dans le monde : clients, BIM managers, consultants, entrepreneurs et équipes de livraison multidisciplinaires qui ont besoin d'exigences plus claires, de qualité de modèle, de responsabilité des problèmes, de preuves et de préparation à la décision.", image: IMG.bimDigital, href: '/products/nbc' },
    ],
  },
};

const de: SiteContent = {
  home: {
    hero: {
      headline: 'Wir entwickeln digitale Kontrollplattformen für vernetzte Branchen.',
      subheadline:
        'Wir helfen Teams, Logistik- und BIM-Arbeit klar, organisiert und verlässlich zu halten, von Anfragen und Dokumenten bis zu Verantwortlichkeiten und Entscheidungen.',
      slogan: 'Verwurzelt in der Natur, gestaltet für die Zukunft.',
      carousel: [
        'Logistik- und BIM-Arbeit klar halten, von der Anfrage bis zur Entscheidung.',
        'Teams, Dokumente, Prüfungen und Verantwortlichkeiten in einem Produktworkflow verbinden.',
        'Verstreute Updates in eine verlässliche Aufzeichnung verwandeln.',
        'Sehen, was bereit ist, was Aufmerksamkeit braucht und wer den nächsten Schritt übernimmt.',
      ],
      primaryCtas: [
        { label: 'Unsere Produkte entdecken', href: '#products' },
        { label: 'Demo anfragen', href: '/contact' },
      ],
      secondaryCta: { label: 'MCT und NBC entdecken', href: '/products' },
    },
    problem: {
      heading: 'Wichtige Arbeit geht zwischen Werkzeugen verloren',
      body: 'Viele Teams steuern kritische Arbeit noch über Nachrichten, Tabellen und getrennte Dateien. Dadurch werden Verantwortlichkeiten unklar, und niemand sieht schnell genug, was geprüft, freigegeben oder noch offen ist.',
      points: ['Fragmentierte Informationen', 'Getrennte Werkzeuge', 'Schwache Verifizierung', 'Unklare Verantwortung'],
    },
    answer: {
      heading: 'LBYA bringt die Aufzeichnung zusammen',
      body: 'Unsere Produkte geben Teams einen Ort, an dem sie Arbeit verfolgen, Nachweise anhängen und den Entscheidungsverlauf sehen können, damit wichtige Details leichter zu finden und zu vertrauen sind.',
    },
    why: {
      heading: 'Warum es wichtig ist',
      body: 'Wenn die Aufzeichnung klar ist, verbringen Teams weniger Zeit mit dem Suchen nach Updates und mehr Zeit mit den richtigen Entscheidungen.',
      points: [
        { title: 'Klarheit', detail: 'Anfragen, Dokumente und Entscheidungen bleiben an einem organisierten Ort.' },
        { title: 'Nachvollziehbarkeit', detail: 'Prüfungen, Nachweise und Statusänderungen lassen sich später leicht überprüfen.' },
        { title: 'Koordination', detail: 'Teams sehen, was sich geändert hat, wer verantwortlich ist und was als Nächstes kommt.' },
        { title: 'Entscheidungsreife', detail: 'Teams können handeln, weil die Aufzeichnung klar genug ist, um ihr zu vertrauen.' },
      ],
    },
    servicesTeaser: {
      heading: 'Den passenden Produktpfad finden',
      body: 'Nutzen Sie MCT für Logistikkontrolle, NBC für BIM-Kontrolle oder beide in einem vernetzten Produktworkflow.',
      cta: { label: 'Produkte vergleichen', href: '/products' },
    },
    finalCta: {
      heading: 'Das richtige LBYA-Produkt für Ihr Team entdecken',
      body: 'Fragen Sie eine Demo an, vergleichen Sie MCT und NBC oder sprechen Sie mit uns über einen Pilot.',
      primaryCta: { label: 'Demo anfragen', href: '/contact' },
      secondaryCta: { label: 'Produkte vergleichen', href: '/products' },
    },
  },
  productsOverview: {
    seoTitle: 'LBYA Produkte | Digitale Kontrollplattformen',
    metaDescription:
      'Entdecken Sie die digitalen Kontrollprodukte von LBYA für Logistik- und BIM-Teams.',
    hero: 'Produkte',
    intro:
      'LBYA entwickelt digitale Kontrollprodukte, die Teams helfen, verstreute Informationen in klare, nachvollziehbare Entscheidungen zu verwandeln. Malaika Control Tower konzentriert sich auf Transport und Logistik. Nayeli BIM Control bringt dieselbe Disziplin ins BIM.',
  },
  services: {
    seoTitle: 'LBYA Dienstleistungen | Unterstützung für Implementierung und digitale Transformation',
    metaDescription:
      'Expertendienstleistungen zur Unterstützung von BIM, Softwareintegration, Bauingenieurwesen und Betrieb auf dem afrikanischen Markt.',
    hero: 'Dienstleistungen',
    intro:
      'Expertendienstleistungen, die Teams helfen, unsere Produkte einzuführen und ihre Arbeitsweise zu modernisieren. Die Dienstleistungen unterstützen Implementierung und Beratung, nicht umgekehrt.',
    rule: 'Jede Dienstleistung unterstützt die Produktimplementierung, die digitale Transformation oder die Markteinführung.',
    categories: [
      { title: 'BIM- und digitale Bauberatung', body: 'Unterstützung für BIM-Strategie, Modellkoordination und Informationsmanagement, einschließlich IFC-, BCF- und IDS-orientierter Arbeitsabläufe, BIM-Qualitätskontrolle und Vorbereitung auf die NBC-Einführung.', image: IMG.bimDigital, tags: ['BIM-Strategie', 'IFC / BCF / IDS', 'Qualitätskontrolle'] },
      { title: 'Unterstützung im Tragwerks- und BIM-Engineering', body: 'Spezialisierte Unterstützung für Tragwerksplanung, modellbasierte Lieferung, Koordination und Eurocode-orientierte Planungsdokumentation, wo relevant.', image: IMG.structural, tags: ['Tragwerksplanung', 'Modellbasierte Lieferung', 'Eurocode'] },
      { title: 'Software- und API-Integration', body: 'Entwicklungs- und Integrationsunterstützung für BIM-Werkzeuge, Dashboards, Automatisierung, Datenflüsse und Produktimplementierung.', image: IMG.digitalTwin, tags: ['Integrationen', 'Dashboards', 'Automatisierung'] },
      { title: 'Beratung für afrikanischen Markt und Betrieb', body: 'Unterstützung für Unternehmen, die mit afrikanischer Logistik, Transportkoordination, bergbaubezogenen Geschäftsbeziehungen und operativem Markteintritt arbeiten, verbunden mit MCT und dem LBYA-Netzwerk.', image: IMG.mining, tags: ['Logistik', 'Markteintritt', 'Partnerschaften'] },
    ],
  },
  contact: {
    headline: 'Sagen Sie uns, was Sie erkunden möchten.',
    paragraph:
      'Teilen Sie uns mit, was Sie brauchen: MCT-Zugang, frühen NBC-Zugang, eine Produktdemo, einen Vergleich oder ein Gespräch über einen Pilot.',
    inquiryTypes: [
      'MCT-Zugang anfragen',
      'Frühen NBC-Zugang anfragen',
      'MCT und NBC vergleichen',
      'Produktdemo anfragen',
      'Produktintegration besprechen',
      'Produktpartnerschaft besprechen',
      'Allgemeine Anfrage',
    ],
  },
  about: {
    heroHeading: 'Unsere Geschichte',
    intro: {
      heading: 'Alles ist verbunden',
      body: 'LBYA begann mit einer einfachen Überzeugung: Menschen, Natur, Infrastruktur, Information und Märkte sind verbunden. Heute bauen wir digitale Kontrollprodukte, die Teams helfen, Komplexität mit mehr Klarheit und Vertrauen zu bewältigen.',
    },
    evolution: {
      heading: 'Von fragmentierter Arbeit zu fokussierten Produkten',
      body: 'Unsere Arbeit ist in naturinspiriertem Denken verwurzelt und für die Zukunft gestaltet. LBYA entstand aus direkter Erfahrung mit fragmentierten Workflows in Engineering, BIM, Logistik und Marktprozessen. Diese Erfahrung machte eines klar: Teams brauchen bessere Kontrolle über Informationen, nicht nur mehr Werkzeuge.',
      body2:
        'Mit Malaika Control Tower und Nayeli BIM Control baut LBYA Software, die Informationen, Verantwortung und Entscheidungen in klarere Produktworkflows bringt.',
    },
    vision: {
      heading: 'Unsere Produktvision',
      points: [
        { title: 'Malaika Control Tower', detail: 'Ein fertiges Logistikkontrollprodukt für vernetzten afrikanischen Handel, verfügbar für Demo-Anfragen.' },
        { title: 'Nayeli BIM Control', detail: 'Ein BIM-Kontrollprodukt in früher Entwicklung, entwickelt für verantwortungsvollere Modellinformationen.' },
        { title: 'Globale Ambition', detail: 'Produkte führen das Unternehmen, mit Raum für Wachstum in vernetzte Branchen weltweit.' },
      ],
    },
    closing: 'Verwurzelt in der Natur, gestaltet für die Zukunft.',
  },
  caseStudies: {
    heading: 'Fallstudien',
    subtitle: 'MCT zeigt afrikanische Logistikkoordination in der Praxis. NBC zeigt, wie BIM Control Projektteams überall unterstützen kann.',
    items: [
      { product: 'Malaika Control Tower', acronym: 'MCT', title: 'Afrikanische Logistikkoordination', context: 'MCT für afrikanische Logistikkorridore', description: 'MCT bringt Transportanfragen, Transporteurdaten, Lkw-Dokumente, Angebote, Verifizierungsnotizen und operative Entscheidungen in einen Workflow. Der Fokus ist einfach: klarere Verantwortung, bessere Nachvollziehbarkeit und mehr Vertrauen in grenzüberschreitender Logistik.', image: IMG.kinshasa, href: '/products/mct' },
      { product: 'Nayeli BIM Control', acronym: 'NBC', title: 'BIM Control für globale Projektteams', context: 'Globale BIM-Informationskontrolle', description: 'NBC ist für BIM-Teams überall konzipiert: Auftraggeber, BIM-Manager, Berater, Bauunternehmen und multidisziplinäre Lieferteams, die klarere Anforderungen, Modellqualität, Themenverantwortung, Nachweise und Entscheidungsreife benötigen.', image: IMG.bimDigital, href: '/products/nbc' },
    ],
  },
};

const SITE: Record<Locale, SiteContent> = { en, sv, fr, de };

export function getSite(locale: string): SiteContent {
  return SITE[asLocale(locale)];
}
