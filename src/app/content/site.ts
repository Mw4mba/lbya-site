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
      headline: 'Digital control platforms for connected industries.',
      subheadline:
        'LBYA builds digital platforms that help teams control information, coordinate work, and verify what matters. We work across construction, BIM, and African logistics, where clear decisions depend on trustworthy data.',
      slogan: 'Rooted in Nature, Designed for the Future.',
      carousel: [
        'Digital control platforms for connected industries.',
        'Control information, coordinate work, and verify what matters.',
        'Built for construction, BIM, and African logistics.',
        'Turning complexity into clarity, structure, and trusted decisions.',
      ],
      primaryCtas: [
        { label: 'Explore MCT', href: '/products/malaika-control-tower' },
        { label: 'Discover Nayeli BIM Control', href: '/products/nayeli-bim-control' },
      ],
      secondaryCta: { label: 'Partner with LBYA', href: '/contact' },
    },
    problem: {
      heading: 'The work happens in the gaps between tools',
      body: 'Most teams lose time in the gaps between tools. Information is scattered, ownership is unclear, and there is rarely a reliable record of what was checked or decided.',
      points: ['Fragmented information', 'Disconnected tools', 'Weak verification', 'Unclear responsibility'],
    },
    answer: {
      heading: 'LBYA closes those gaps',
      body: 'Our platforms connect the people, documents, and decisions that move work forward, so nothing important lives only in a chat thread or a spreadsheet.',
    },
    why: {
      heading: 'Why it matters',
      body: 'Clarity, traceability, and decision readiness. Teams act faster when they can trust the record in front of them.',
      points: [
        { title: 'Clarity', detail: 'One structured place for requests, documents, and decisions.' },
        { title: 'Traceability', detail: 'A record of checks, evidence, and status changes you can review.' },
        { title: 'Coordination', detail: 'People, responsibilities, and updates connected around the work.' },
        { title: 'Decision readiness', detail: 'Act with confidence because the record can be trusted.' },
      ],
    },
    servicesTeaser: {
      heading: 'Services that support adoption',
      body: 'Expert services that help teams adopt our products and modernise how they work. Products lead, and services support implementation, BIM strategy, integration, and African market operations.',
      cta: { label: 'Explore services', href: '/services' },
    },
    finalCta: {
      heading: "Let's build connected digital control systems together",
      body: 'Become a pilot partner, book a demo, or talk to LBYA.',
      primaryCta: { label: 'Become a pilot partner', href: '/contact' },
      secondaryCta: { label: 'Book a demo', href: '/contact' },
    },
  },
  productsOverview: {
    seoTitle: 'LBYA Products | Digital Control Platforms',
    metaDescription:
      'Explore LBYA digital control platforms for logistics, BIM, construction, and operations in the African market.',
    hero: 'Products',
    intro:
      'LBYA builds digital control platforms that turn fragmented information into structured, traceable decisions. Malaika Control Tower leads in transport and logistics, and Nayeli BIM Control brings the same discipline to BIM.',
  },
  services: {
    seoTitle: 'LBYA Services | Implementation and Digital Transformation Support',
    metaDescription:
      'Expert services supporting BIM, software integration, structural engineering, and African market operations.',
    hero: 'Services',
    intro:
      'Expert services that help teams adopt our products and modernise how they work. Services support implementation and advisory, not the other way around.',
    rule: 'Every service supports product implementation, digital transformation, or market adoption.',
    categories: [
      { title: 'BIM and Digital Construction Advisory', body: 'Support for BIM strategy, model coordination, and information management, including IFC, BCF, and IDS oriented workflows, BIM quality control, and preparation for NBC adoption.', image: IMG.bimDigital, tags: ['BIM strategy', 'IFC / BCF / IDS', 'Quality control'] },
      { title: 'Structural and BIM Engineering Support', body: 'Specialist support for structural engineering, model-based delivery, coordination, and Eurocode oriented design documentation where relevant.', image: IMG.structural, tags: ['Structural design', 'Model-based delivery', 'Eurocode'] },
      { title: 'Software and API Integration', body: 'Development and integration support for BIM tools, dashboards, automation, data workflows, and product implementation.', image: IMG.digitalTwin, tags: ['Integrations', 'Dashboards', 'Automation'] },
      { title: 'African Market and Operations Advisory', body: 'Support for companies working with African logistics, transport coordination, mining-related business connections, and operational market entry linked to MCT and the LBYA network.', image: IMG.mining, tags: ['Logistics', 'Market entry', 'Partnerships'] },
    ],
  },
  contact: {
    headline: "Let's build connected digital control systems together.",
    paragraph:
      'Contact LBYA to discuss MCT, Nayeli BIM Control, product partnerships, pilot projects, digital transformation support, or strategic collaboration.',
    inquiryTypes: [
      'I want to learn about MCT',
      'I want to learn about Nayeli BIM Control',
      'I want to become a pilot partner',
      'I need BIM or digital construction support',
      'I need African market or logistics support',
      'I want to discuss software or API integration',
      'I want to discuss investment or partnership',
      'Other',
    ],
  },
  about: {
    heroHeading: 'Our Story',
    intro: {
      heading: 'Everything is connected',
      body: 'LBYA was founded on the belief that everything is connected: people, nature, infrastructure, information, and markets. Today, LBYA develops digital control platforms that help organisations manage complexity with clarity, structure, and trust.',
    },
    evolution: {
      heading: 'From services to products',
      body: 'Our work is rooted in nature-inspired thinking and designed for the future. LBYA began by delivering expert engineering and digital construction services, and that experience shaped a clear conviction: teams need better ways to control information, not just more tools.',
      body2:
        'Through products such as Malaika Control Tower and Nayeli BIM Control, LBYA now builds software that connects fragmented information, strengthens coordination, and supports better decisions across construction, BIM, logistics, and African market operations.',
    },
    vision: {
      heading: 'Our product vision',
      points: [
        { title: 'Malaika Control Tower', detail: 'Transport and logistics control for connected African trade, in early access today.' },
        { title: 'Nayeli BIM Control', detail: 'The next strategic step: a control layer that makes BIM more accountable and easier to act on.' },
        { title: 'Global ambition', detail: 'Products lead and services support, so LBYA can grow from a focused start into connected industries worldwide.' },
      ],
    },
    closing: 'Rooted in Nature, Designed for the Future.',
  },
  caseStudies: {
    heading: 'Case studies',
    subtitle: 'Representative use cases for our platforms, from African logistics coordination to BIM information control.',
    items: [
      { product: 'Malaika Control Tower', acronym: 'MCT', title: 'Coordinating cross-border transport', context: 'African logistics corridors', description: 'A coordinator juggling requests across chats, email, and spreadsheets brings every transport request into one structured workflow. Clear statuses, assigned ownership, and a record of each decision turn scattered communication into traceable coordination.', image: IMG.kinshasa, href: '/products/malaika-control-tower' },
      { product: 'Nayeli BIM Control', acronym: 'NBC', title: 'Controlling information on a multidisciplinary project', context: 'BIM coordination', description: 'When requirements, model issues, and responsibilities span several disciplines, NBC links each requirement to the issues it raises, the checks that close them, and the person accountable. The team can see what is resolved and what is ready for a decision.', image: IMG.stockholm, href: '/products/nayeli-bim-control' },
      { product: 'Malaika Control Tower', acronym: 'MCT', title: 'Verifying truck packs and building trust', context: 'Document control and verification', description: 'Before goods move, transporter profiles, truck packs, permits, and expiry dates are kept in one place. When a document does not match official verification, the status stays unresolved until corrected, so clients can trust the process behind every shipment.', image: IMG.capetown, href: '/products/malaika-control-tower' },
    ],
  },
};

const sv: SiteContent = {
  home: {
    hero: {
      headline: 'Digitala kontrollplattformar för sammankopplade branscher.',
      subheadline:
        'LBYA bygger digitala plattformar som hjälper team att kontrollera information, samordna arbete och verifiera det som är viktigt. Vi arbetar inom bygg, BIM och afrikansk logistik, där tydliga beslut bygger på tillförlitliga data.',
      slogan: 'Rotad i naturen, designad för framtiden.',
      carousel: [
        'Digitala kontrollplattformar för sammankopplade branscher.',
        'Kontrollera information, samordna arbete och verifiera det som är viktigt.',
        'Byggd för bygg, BIM och afrikansk logistik.',
        'Förvandlar komplexitet till tydlighet, struktur och pålitliga beslut.',
      ],
      primaryCtas: [
        { label: 'Utforska MCT', href: '/products/malaika-control-tower' },
        { label: 'Upptäck Nayeli BIM Control', href: '/products/nayeli-bim-control' },
      ],
      secondaryCta: { label: 'Samarbeta med LBYA', href: '/contact' },
    },
    problem: {
      heading: 'Arbetet sker i glappen mellan verktygen',
      body: 'De flesta team förlorar tid i glappen mellan verktyg. Informationen är spridd, ansvaret oklart, och det finns sällan en tillförlitlig dokumentation av vad som kontrollerats eller beslutats.',
      points: ['Fragmenterad information', 'Frånkopplade verktyg', 'Svag verifiering', 'Oklart ansvar'],
    },
    answer: {
      heading: 'LBYA sluter de glappen',
      body: 'Våra plattformar kopplar samman människorna, dokumenten och besluten som driver arbetet framåt, så att inget viktigt bara lever i en chatt eller ett kalkylark.',
    },
    why: {
      heading: 'Varför det spelar roll',
      body: 'Tydlighet, spårbarhet och beslutsberedskap. Team agerar snabbare när de kan lita på underlaget framför sig.',
      points: [
        { title: 'Tydlighet', detail: 'En strukturerad plats för förfrågningar, dokument och beslut.' },
        { title: 'Spårbarhet', detail: 'En dokumentation av kontroller, bevis och statusändringar som du kan granska.' },
        { title: 'Samordning', detail: 'Människor, ansvar och uppdateringar samlade kring arbetet.' },
        { title: 'Beslutsberedskap', detail: 'Agera med självförtroende eftersom underlaget går att lita på.' },
      ],
    },
    servicesTeaser: {
      heading: 'Tjänster som stödjer införandet',
      body: 'Experttjänster som hjälper team att införa våra produkter och modernisera sitt arbetssätt. Produkterna leder, och tjänsterna stödjer implementering, BIM-strategi, integration och verksamhet på den afrikanska marknaden.',
      cta: { label: 'Utforska tjänster', href: '/services' },
    },
    finalCta: {
      heading: 'Låt oss bygga sammankopplade digitala kontrollsystem tillsammans',
      body: 'Bli en pilotpartner, boka en demo eller prata med LBYA.',
      primaryCta: { label: 'Bli pilotpartner', href: '/contact' },
      secondaryCta: { label: 'Boka en demo', href: '/contact' },
    },
  },
  productsOverview: {
    seoTitle: 'LBYA Produkter | Digitala kontrollplattformar',
    metaDescription:
      'Utforska LBYA:s digitala kontrollplattformar för logistik, BIM, bygg och verksamhet på den afrikanska marknaden.',
    hero: 'Produkter',
    intro:
      'LBYA bygger digitala kontrollplattformar som förvandlar fragmenterad information till strukturerade, spårbara beslut. Malaika Control Tower leder inom transport och logistik, och Nayeli BIM Control för samma disciplin till BIM.',
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
    headline: 'Låt oss bygga sammankopplade digitala kontrollsystem tillsammans.',
    paragraph:
      'Kontakta LBYA för att diskutera MCT, Nayeli BIM Control, produktpartnerskap, pilotprojekt, stöd för digital transformation eller strategiskt samarbete.',
    inquiryTypes: [
      'Jag vill veta mer om MCT',
      'Jag vill veta mer om Nayeli BIM Control',
      'Jag vill bli pilotpartner',
      'Jag behöver stöd med BIM eller digitalt byggande',
      'Jag behöver stöd med afrikansk marknad eller logistik',
      'Jag vill diskutera mjukvaru- eller API-integration',
      'Jag vill diskutera investering eller partnerskap',
      'Annat',
    ],
  },
  about: {
    heroHeading: 'Vår historia',
    intro: {
      heading: 'Allt hänger ihop',
      body: 'LBYA grundades på övertygelsen att allt hänger ihop: människor, natur, infrastruktur, information och marknader. Idag utvecklar LBYA digitala kontrollplattformar som hjälper organisationer att hantera komplexitet med tydlighet, struktur och tillit.',
    },
    evolution: {
      heading: 'Från tjänster till produkter',
      body: 'Vårt arbete är rotat i naturinspirerat tänkande och designat för framtiden. LBYA började med att leverera expertis inom ingenjörs- och digitala byggtjänster, och den erfarenheten formade en tydlig övertygelse: team behöver bättre sätt att kontrollera information, inte bara fler verktyg.',
      body2:
        'Genom produkter som Malaika Control Tower och Nayeli BIM Control bygger LBYA nu mjukvara som kopplar samman fragmenterad information, stärker samordningen och stödjer bättre beslut inom bygg, BIM, logistik och verksamhet på den afrikanska marknaden.',
    },
    vision: {
      heading: 'Vår produktvision',
      points: [
        { title: 'Malaika Control Tower', detail: 'Transport- och logistikkontroll för sammankopplad afrikansk handel, i tidig åtkomst idag.' },
        { title: 'Nayeli BIM Control', detail: 'Nästa strategiska steg: ett kontrollager som gör BIM mer ansvarstagande och lättare att agera på.' },
        { title: 'Global ambition', detail: 'Produkterna leder och tjänsterna stödjer, så att LBYA kan växa från en fokuserad start till sammankopplade branscher världen över.' },
      ],
    },
    closing: 'Rotad i naturen, designad för framtiden.',
  },
  caseStudies: {
    heading: 'Fallstudier',
    subtitle: 'Representativa användningsfall för våra plattformar, från afrikansk logistiksamordning till BIM-informationskontroll.',
    items: [
      { product: 'Malaika Control Tower', acronym: 'MCT', title: 'Samordna gränsöverskridande transport', context: 'Afrikanska logistikkorridorer', description: 'En koordinator som jonglerar förfrågningar mellan chattar, e-post och kalkylark samlar varje transportförfrågan i ett strukturerat arbetsflöde. Tydliga statusar, tilldelat ansvar och dokumentation av varje beslut förvandlar spridd kommunikation till spårbar samordning.', image: IMG.kinshasa, href: '/products/malaika-control-tower' },
      { product: 'Nayeli BIM Control', acronym: 'NBC', title: 'Kontrollera information i ett tvärvetenskapligt projekt', context: 'BIM-koordinering', description: 'När krav, modellfrågor och ansvar sträcker sig över flera discipliner kopplar NBC varje krav till de frågor det väcker, kontrollerna som stänger dem och den ansvariga personen. Teamet ser vad som är löst och vad som är klart för beslut.', image: IMG.stockholm, href: '/products/nayeli-bim-control' },
      { product: 'Malaika Control Tower', acronym: 'MCT', title: 'Verifiera lastbilsdokument och bygga tillit', context: 'Dokumentkontroll och verifiering', description: 'Innan gods flyttas hålls transportörsprofiler, lastbilsdokument, tillstånd och utgångsdatum på ett ställe. När ett dokument inte matchar den officiella verifieringen förblir statusen olöst tills det korrigerats, så att kunderna kan lita på processen bakom varje sändning.', image: IMG.capetown, href: '/products/malaika-control-tower' },
    ],
  },
};

const fr: SiteContent = {
  home: {
    hero: {
      headline: 'Plateformes de contrôle numérique pour des industries connectées.',
      subheadline:
        "LBYA conçoit des plateformes numériques qui aident les équipes à contrôler l'information, coordonner le travail et vérifier l'essentiel. Nous intervenons dans la construction, le BIM et la logistique africaine, où des décisions claires reposent sur des données fiables.",
      slogan: "Enraciné dans la nature, conçu pour l'avenir.",
      carousel: [
        'Plateformes de contrôle numérique pour des industries connectées.',
        "Contrôler l'information, coordonner le travail et vérifier l'essentiel.",
        'Conçu pour la construction, le BIM et la logistique africaine.',
        'Transformer la complexité en clarté, structure et décisions fiables.',
      ],
      primaryCtas: [
        { label: 'Explorer MCT', href: '/products/malaika-control-tower' },
        { label: 'Découvrir Nayeli BIM Control', href: '/products/nayeli-bim-control' },
      ],
      secondaryCta: { label: 'Devenir partenaire de LBYA', href: '/contact' },
    },
    problem: {
      heading: "Le travail se joue dans les interstices entre les outils",
      body: "La plupart des équipes perdent du temps dans les interstices entre les outils. L'information est dispersée, les responsabilités sont floues, et il existe rarement une trace fiable de ce qui a été vérifié ou décidé.",
      points: ['Information fragmentée', 'Outils déconnectés', 'Vérification insuffisante', 'Responsabilités floues'],
    },
    answer: {
      heading: 'LBYA comble ces interstices',
      body: "Nos plateformes relient les personnes, les documents et les décisions qui font avancer le travail, afin que rien d'important ne vive uniquement dans une conversation ou un tableur.",
    },
    why: {
      heading: 'Pourquoi est-ce important',
      body: "Clarté, traçabilité et préparation à la décision. Les équipes agissent plus vite lorsqu'elles peuvent se fier au dossier devant elles.",
      points: [
        { title: 'Clarté', detail: 'Un seul endroit structuré pour les demandes, les documents et les décisions.' },
        { title: 'Traçabilité', detail: 'Un historique des vérifications, des preuves et des changements de statut, consultable.' },
        { title: 'Coordination', detail: 'Personnes, responsabilités et mises à jour reliées autour du travail.' },
        { title: 'Préparation à la décision', detail: 'Agir avec confiance car le dossier est fiable.' },
      ],
    },
    servicesTeaser: {
      heading: "Des services qui soutiennent l'adoption",
      body: "Des services experts qui aident les équipes à adopter nos produits et à moderniser leur façon de travailler. Les produits mènent, et les services soutiennent la mise en œuvre, la stratégie BIM, l'intégration et les opérations sur le marché africain.",
      cta: { label: 'Explorer les services', href: '/services' },
    },
    finalCta: {
      heading: 'Construisons ensemble des systèmes de contrôle numérique connectés',
      body: 'Devenez partenaire pilote, réservez une démo ou contactez LBYA.',
      primaryCta: { label: 'Devenir partenaire pilote', href: '/contact' },
      secondaryCta: { label: 'Réserver une démo', href: '/contact' },
    },
  },
  productsOverview: {
    seoTitle: 'Produits LBYA | Plateformes de contrôle numérique',
    metaDescription:
      'Découvrez les plateformes de contrôle numérique de LBYA pour la logistique, le BIM, la construction et les opérations sur le marché africain.',
    hero: 'Produits',
    intro:
      "LBYA conçoit des plateformes de contrôle numérique qui transforment l'information fragmentée en décisions structurées et traçables. Malaika Control Tower est leader dans le transport et la logistique, et Nayeli BIM Control apporte la même rigueur au BIM.",
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
    headline: 'Construisons ensemble des systèmes de contrôle numérique connectés.',
    paragraph:
      'Contactez LBYA pour discuter de MCT, Nayeli BIM Control, de partenariats produits, de projets pilotes, du soutien à la transformation numérique ou de collaboration stratégique.',
    inquiryTypes: [
      'Je souhaite en savoir plus sur MCT',
      'Je souhaite en savoir plus sur Nayeli BIM Control',
      'Je souhaite devenir partenaire pilote',
      "J'ai besoin de soutien en BIM ou construction numérique",
      "J'ai besoin de soutien sur le marché ou la logistique en Afrique",
      "Je souhaite discuter d'intégration logicielle ou API",
      'Je souhaite discuter investissement ou partenariat',
      'Autre',
    ],
  },
  about: {
    heroHeading: 'Notre histoire',
    intro: {
      heading: 'Tout est connecté',
      body: "LBYA est née de la conviction que tout est connecté : les personnes, la nature, les infrastructures, l'information et les marchés. Aujourd'hui, LBYA développe des plateformes de contrôle numérique qui aident les organisations à gérer la complexité avec clarté, structure et confiance.",
    },
    evolution: {
      heading: 'Des services aux produits',
      body: "Notre travail est enraciné dans une pensée inspirée par la nature et conçu pour l'avenir. LBYA a commencé par fournir des services experts en ingénierie et construction numérique, et cette expérience a forgé une conviction claire : les équipes ont besoin de meilleurs moyens de contrôler l'information, pas seulement de plus d'outils.",
      body2:
        "À travers des produits comme Malaika Control Tower et Nayeli BIM Control, LBYA conçoit désormais des logiciels qui relient l'information fragmentée, renforcent la coordination et soutiennent de meilleures décisions dans la construction, le BIM, la logistique et les opérations sur le marché africain.",
    },
    vision: {
      heading: 'Notre vision produit',
      points: [
        { title: 'Malaika Control Tower', detail: "Contrôle du transport et de la logistique pour un commerce africain connecté, en accès anticipé aujourd'hui." },
        { title: 'Nayeli BIM Control', detail: "La prochaine étape stratégique : une couche de contrôle qui rend le BIM plus responsable et plus facile à exploiter." },
        { title: 'Ambition mondiale', detail: 'Les produits mènent et les services soutiennent, afin que LBYA puisse grandir d’un départ ciblé vers des industries connectées dans le monde entier.' },
      ],
    },
    closing: "Enraciné dans la nature, conçu pour l'avenir.",
  },
  caseStudies: {
    heading: 'Études de cas',
    subtitle: "Cas d'usage représentatifs de nos plateformes, de la coordination logistique africaine au contrôle de l'information BIM.",
    items: [
      { product: 'Malaika Control Tower', acronym: 'MCT', title: 'Coordonner le transport transfrontalier', context: 'Corridors logistiques africains', description: "Un coordinateur jonglant avec des demandes entre messageries, e-mails et tableurs regroupe chaque demande de transport dans un flux structuré. Statuts clairs, responsabilités attribuées et trace de chaque décision transforment une communication dispersée en une coordination traçable.", image: IMG.kinshasa, href: '/products/malaika-control-tower' },
      { product: 'Nayeli BIM Control', acronym: 'NBC', title: "Contrôler l'information sur un projet pluridisciplinaire", context: 'Coordination BIM', description: "Lorsque les exigences, les problèmes de modèle et les responsabilités s'étendent à plusieurs disciplines, NBC relie chaque exigence aux problèmes qu'elle soulève, aux vérifications qui les clôturent et à la personne responsable. L'équipe voit ce qui est résolu et ce qui est prêt pour une décision.", image: IMG.stockholm, href: '/products/nayeli-bim-control' },
      { product: 'Malaika Control Tower', acronym: 'MCT', title: 'Vérifier les dossiers de camions et bâtir la confiance', context: 'Contrôle documentaire et vérification', description: "Avant le déplacement des marchandises, les profils des transporteurs, les dossiers de camions, les permis et les dates d'expiration sont réunis en un seul endroit. Lorsqu'un document ne correspond pas à la vérification officielle, le statut reste non résolu jusqu'à correction, afin que les clients puissent faire confiance au processus derrière chaque expédition.", image: IMG.capetown, href: '/products/malaika-control-tower' },
    ],
  },
};

const de: SiteContent = {
  home: {
    hero: {
      headline: 'Digitale Kontrollplattformen für vernetzte Branchen.',
      subheadline:
        'LBYA entwickelt digitale Plattformen, die Teams helfen, Informationen zu kontrollieren, Arbeit zu koordinieren und das Wesentliche zu verifizieren. Wir arbeiten in den Bereichen Bau, BIM und afrikanische Logistik, wo klare Entscheidungen auf verlässlichen Daten beruhen.',
      slogan: 'Verwurzelt in der Natur, gestaltet für die Zukunft.',
      carousel: [
        'Digitale Kontrollplattformen für vernetzte Branchen.',
        'Informationen kontrollieren, Arbeit koordinieren und das Wesentliche verifizieren.',
        'Entwickelt für Bau, BIM und afrikanische Logistik.',
        'Komplexität in Klarheit, Struktur und verlässliche Entscheidungen verwandeln.',
      ],
      primaryCtas: [
        { label: 'MCT entdecken', href: '/products/malaika-control-tower' },
        { label: 'Nayeli BIM Control entdecken', href: '/products/nayeli-bim-control' },
      ],
      secondaryCta: { label: 'Partner von LBYA werden', href: '/contact' },
    },
    problem: {
      heading: 'Die Arbeit passiert in den Lücken zwischen den Werkzeugen',
      body: 'Die meisten Teams verlieren Zeit in den Lücken zwischen Werkzeugen. Informationen sind verstreut, Verantwortlichkeiten unklar, und es gibt selten eine verlässliche Aufzeichnung darüber, was geprüft oder entschieden wurde.',
      points: ['Fragmentierte Informationen', 'Getrennte Werkzeuge', 'Schwache Verifizierung', 'Unklare Verantwortung'],
    },
    answer: {
      heading: 'LBYA schließt diese Lücken',
      body: 'Unsere Plattformen verbinden die Menschen, Dokumente und Entscheidungen, die die Arbeit voranbringen, damit nichts Wichtiges nur in einem Chat oder einer Tabelle existiert.',
    },
    why: {
      heading: 'Warum es wichtig ist',
      body: 'Klarheit, Nachvollziehbarkeit und Entscheidungsreife. Teams handeln schneller, wenn sie der Aufzeichnung vor sich vertrauen können.',
      points: [
        { title: 'Klarheit', detail: 'Ein strukturierter Ort für Anfragen, Dokumente und Entscheidungen.' },
        { title: 'Nachvollziehbarkeit', detail: 'Eine überprüfbare Aufzeichnung von Prüfungen, Nachweisen und Statusänderungen.' },
        { title: 'Koordination', detail: 'Menschen, Verantwortlichkeiten und Aktualisierungen rund um die Arbeit verbunden.' },
        { title: 'Entscheidungsreife', detail: 'Mit Vertrauen handeln, weil die Aufzeichnung verlässlich ist.' },
      ],
    },
    servicesTeaser: {
      heading: 'Dienstleistungen, die die Einführung unterstützen',
      body: 'Expertendienstleistungen, die Teams helfen, unsere Produkte einzuführen und ihre Arbeitsweise zu modernisieren. Die Produkte führen, und die Dienstleistungen unterstützen Implementierung, BIM-Strategie, Integration und Betrieb auf dem afrikanischen Markt.',
      cta: { label: 'Dienstleistungen entdecken', href: '/services' },
    },
    finalCta: {
      heading: 'Lassen Sie uns gemeinsam vernetzte digitale Kontrollsysteme aufbauen',
      body: 'Werden Sie Pilotpartner, buchen Sie eine Demo oder sprechen Sie mit LBYA.',
      primaryCta: { label: 'Pilotpartner werden', href: '/contact' },
      secondaryCta: { label: 'Demo buchen', href: '/contact' },
    },
  },
  productsOverview: {
    seoTitle: 'LBYA Produkte | Digitale Kontrollplattformen',
    metaDescription:
      'Entdecken Sie die digitalen Kontrollplattformen von LBYA für Logistik, BIM, Bau und Betrieb auf dem afrikanischen Markt.',
    hero: 'Produkte',
    intro:
      'LBYA entwickelt digitale Kontrollplattformen, die fragmentierte Informationen in strukturierte, nachvollziehbare Entscheidungen verwandeln. Malaika Control Tower führt in Transport und Logistik, und Nayeli BIM Control bringt dieselbe Disziplin ins BIM.',
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
    headline: 'Lassen Sie uns gemeinsam vernetzte digitale Kontrollsysteme aufbauen.',
    paragraph:
      'Kontaktieren Sie LBYA, um über MCT, Nayeli BIM Control, Produktpartnerschaften, Pilotprojekte, Unterstützung bei der digitalen Transformation oder strategische Zusammenarbeit zu sprechen.',
    inquiryTypes: [
      'Ich möchte mehr über MCT erfahren',
      'Ich möchte mehr über Nayeli BIM Control erfahren',
      'Ich möchte Pilotpartner werden',
      'Ich brauche Unterstützung bei BIM oder digitalem Bauen',
      'Ich brauche Unterstützung beim afrikanischen Markt oder bei Logistik',
      'Ich möchte über Software- oder API-Integration sprechen',
      'Ich möchte über Investition oder Partnerschaft sprechen',
      'Sonstiges',
    ],
  },
  about: {
    heroHeading: 'Unsere Geschichte',
    intro: {
      heading: 'Alles ist verbunden',
      body: 'LBYA wurde aus der Überzeugung gegründet, dass alles verbunden ist: Menschen, Natur, Infrastruktur, Information und Märkte. Heute entwickelt LBYA digitale Kontrollplattformen, die Organisationen helfen, Komplexität mit Klarheit, Struktur und Vertrauen zu bewältigen.',
    },
    evolution: {
      heading: 'Von Dienstleistungen zu Produkten',
      body: 'Unsere Arbeit ist in naturinspiriertem Denken verwurzelt und für die Zukunft gestaltet. LBYA begann mit der Erbringung von Experten-Engineering- und digitalen Bauleistungen, und diese Erfahrung formte eine klare Überzeugung: Teams brauchen bessere Wege, Informationen zu kontrollieren, nicht nur mehr Werkzeuge.',
      body2:
        'Mit Produkten wie Malaika Control Tower und Nayeli BIM Control entwickelt LBYA nun Software, die fragmentierte Informationen verbindet, die Koordination stärkt und bessere Entscheidungen in Bau, BIM, Logistik und Betrieb auf dem afrikanischen Markt unterstützt.',
    },
    vision: {
      heading: 'Unsere Produktvision',
      points: [
        { title: 'Malaika Control Tower', detail: 'Transport- und Logistikkontrolle für vernetzten afrikanischen Handel, heute im Early Access.' },
        { title: 'Nayeli BIM Control', detail: 'Der nächste strategische Schritt: eine Kontrollebene, die BIM verantwortlicher und leichter umsetzbar macht.' },
        { title: 'Globale Ambition', detail: 'Produkte führen und Dienstleistungen unterstützen, sodass LBYA von einem fokussierten Start zu vernetzten Branchen weltweit wachsen kann.' },
      ],
    },
    closing: 'Verwurzelt in der Natur, gestaltet für die Zukunft.',
  },
  caseStudies: {
    heading: 'Fallstudien',
    subtitle: 'Repräsentative Anwendungsfälle für unsere Plattformen, von der afrikanischen Logistikkoordination bis zur BIM-Informationskontrolle.',
    items: [
      { product: 'Malaika Control Tower', acronym: 'MCT', title: 'Grenzüberschreitenden Transport koordinieren', context: 'Afrikanische Logistikkorridore', description: 'Ein Koordinator, der Anfragen zwischen Chats, E-Mails und Tabellen jongliert, bringt jede Transportanfrage in einen strukturierten Arbeitsablauf. Klare Status, zugewiesene Verantwortung und eine Aufzeichnung jeder Entscheidung verwandeln verstreute Kommunikation in nachvollziehbare Koordination.', image: IMG.kinshasa, href: '/products/malaika-control-tower' },
      { product: 'Nayeli BIM Control', acronym: 'NBC', title: 'Informationen in einem multidisziplinären Projekt kontrollieren', context: 'BIM-Koordination', description: 'Wenn Anforderungen, Modellprobleme und Verantwortlichkeiten mehrere Disziplinen umfassen, verknüpft NBC jede Anforderung mit den Problemen, die sie aufwirft, den Prüfungen, die sie schließen, und der verantwortlichen Person. Das Team sieht, was gelöst ist und was für eine Entscheidung bereit ist.', image: IMG.stockholm, href: '/products/nayeli-bim-control' },
      { product: 'Malaika Control Tower', acronym: 'MCT', title: 'Lkw-Unterlagen verifizieren und Vertrauen aufbauen', context: 'Dokumentenkontrolle und Verifizierung', description: 'Bevor Waren bewegt werden, werden Transporteurprofile, Lkw-Unterlagen, Genehmigungen und Ablaufdaten an einem Ort geführt. Wenn ein Dokument nicht mit der offiziellen Verifizierung übereinstimmt, bleibt der Status ungelöst, bis er korrigiert ist, sodass Kunden dem Prozess hinter jeder Sendung vertrauen können.', image: IMG.capetown, href: '/products/malaika-control-tower' },
    ],
  },
};

const SITE: Record<Locale, SiteContent> = { en, sv, fr, de };

export function getSite(locale: string): SiteContent {
  return SITE[asLocale(locale)];
}
