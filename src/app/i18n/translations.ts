// Legacy chrome catalogue. After the product-led pivot, only navbar, footer,
// and insights are still rendered from here; the rest moved to the content
// layer (src/app/content/*). Locale is URL-driven via next-intl (see I18nContext).
// FR/SV/DE for insight article bodies are machine translations, flagged for review.
export type Language = 'EN' | 'FR' | 'SV' | 'DE';

const currentYear = new Date().getFullYear();

interface InsightItem {
  title: string;
  category: string;
  excerpt: string;
  date: string;
}

export interface Translations {
  navbar: {
    products: string;
    services: string;
    about: string;
    insights: string;
    careers: string;
    contact: string;
  };
  insights: {
    title: string;
    subtitle: string;
    readArticle: string;
    readAll: string;
    items: {
      aiConstruction: InsightItem;
      urbanBiodiversity: InsightItem;
      climate: InsightItem;
      materials: InsightItem;
      digitalTwin: InsightItem;
    };
  };
  footer: {
    copyright: string;
    company: {
      title: string;
      about: string;
      careers: string;
      contact: string;
    };
    resources: {
      insights: string;
    };
    legal: {
      privacy: string;
    };
  };
  cookieConsent: {
    title: string;
    description: string;
    detailsDescription: string;
    acceptAll: string;
    rejectAll: string;
    customize: string;
    savePreferences: string;
    back: string;
    learnMore: string;
    privacyPolicy: string;
    essential: {
      title: string;
      description: string;
    };
    functional: {
      title: string;
      description: string;
    };
    analytics: {
      title: string;
      description: string;
    };
    marketing: {
      title: string;
      description: string;
    };
  };
}

export const translations: Record<Language, Translations> = {
  EN: {
    navbar: { products: 'Products', services: 'Services', about: 'About', insights: 'Insights', careers: 'Careers', contact: 'Contact' },
    insights: {
      title: 'Insights',
      subtitle: 'Perspectives on digital control platforms, BIM control, and African logistics.',
      readArticle: 'Read article',
      readAll: 'Read all insights',
      items: {
        aiConstruction: { title: 'The Role of AI in Construction Workflows', category: 'Technology', excerpt: 'How artificial intelligence can support project management, safety routines, and operational efficiency in modern construction.', date: 'December 2025' },
        urbanBiodiversity: { title: 'Integrating Biodiversity into Urban Planning', category: 'Sustainability', excerpt: 'Strategies for creating living cities that support local ecosystems through green corridors and biophilic design.', date: 'November 2025' },
        climate: { title: 'Designing for Climate Resilience in Urban Environments', category: 'Climate', excerpt: 'How nature-based solutions and green infrastructure are transforming city resilience strategies.', date: 'October 2025' },
        materials: { title: 'The Future of Structural Engineering: Carbon-Negative Materials', category: 'Innovation', excerpt: 'Exploring bio-based composites and engineered timber that sequester more carbon than they emit.', date: 'September 2025' },
        digitalTwin: { title: 'BIM to Digital Twin: Bridging Design and Operations', category: 'Technology', excerpt: 'Leveraging digital twins for predictive maintenance and lifecycle optimization of built assets.', date: 'August 2025' },
      },
    },
    footer: {
      copyright: `${currentYear} LBYA AB. All rights reserved.`,
      company: { title: 'Company', about: 'About Us', careers: 'Careers', contact: 'Contact' },
      resources: { insights: 'Insights' },
      legal: { privacy: 'Privacy Policy' },
    },
    cookieConsent: {
      title: 'Your privacy choices',
      description: 'We use essential cookies to keep the site working. With your permission, we may also use optional cookies to remember preferences and understand how the site is used.',
      detailsDescription: 'Choose which types of cookies you want to accept. Essential cookies cannot be disabled because the site needs them to work.',
      acceptAll: 'Accept all',
      rejectAll: 'Reject all',
      customize: 'Customize',
      savePreferences: 'Save preferences',
      back: 'Back',
      learnMore: 'You can change your preferences or learn more in our',
      privacyPolicy: 'Privacy Policy',
      essential: {
        title: 'Essential Cookies',
        description: 'Required for the website to work. Cannot be disabled.',
      },
      functional: {
        title: 'Functional Cookies',
        description: 'Remember choices such as language or consent settings, where those features are enabled.',
      },
      analytics: {
        title: 'Analytics Cookies',
        description: 'Help us understand how people use the website, if analytics tools are enabled.',
      },
      marketing: {
        title: 'Marketing Cookies',
        description: 'Used only if LBYA enables marketing tools that need your consent.',
      },
    },
  },
  FR: {
    navbar: { products: 'Produits', services: 'Services', about: 'À propos', insights: 'Analyses', careers: 'Carrières', contact: 'Contact' },
    insights: {
      title: 'Analyses',
      subtitle: 'Perspectives sur les plateformes de contrôle numérique, le contrôle BIM et la logistique africaine.',
      readArticle: "Lire l'article",
      readAll: 'Toutes les analyses',
      items: {
        aiConstruction: { title: "Le rôle de l'IA dans l'optimisation des flux de travail de construction", category: 'Technologie', excerpt: "Comment l'intelligence artificielle révolutionne la gestion de projet, la sécurité et l'efficacité opérationnelle.", date: 'Décembre 2025' },
        urbanBiodiversity: { title: 'Intégrer la biodiversité dans la planification urbaine', category: 'Durabilité', excerpt: 'Stratégies pour créer des villes vivantes qui soutiennent les écosystèmes locaux grâce à la conception biophilique.', date: 'Novembre 2025' },
        climate: { title: 'Concevoir pour la résilience climatique en milieu urbain', category: 'Climat', excerpt: 'Comment les solutions fondées sur la nature et les infrastructures vertes transforment la résilience urbaine.', date: 'Octobre 2025' },
        materials: { title: "L'avenir de l'ingénierie structurelle : matériaux à carbone négatif", category: 'Innovation', excerpt: "Explorer les composites biosourcés et le bois d'ingénierie qui séquestrent plus de carbone qu'ils n'en émettent.", date: 'Septembre 2025' },
        digitalTwin: { title: 'Du BIM au jumeau numérique : relier conception et exploitation', category: 'Technologie', excerpt: 'Exploiter les jumeaux numériques pour la maintenance prédictive et l’optimisation du cycle de vie des actifs.', date: 'Août 2025' },
      },
    },
    footer: {
      copyright: `${currentYear} LBYA AB. Tous droits réservés.`,
      company: { title: 'Entreprise', about: 'À Propos', careers: 'Carrières', contact: 'Contact' },
      resources: { insights: 'Analyses' },
      legal: { privacy: 'Politique de Confidentialité' },
    },
    cookieConsent: {
      title: 'Vos choix de confidentialité',
      description: 'Nous utilisons les cookies essentiels pour que le site fonctionne. Avec votre permission, nous pouvons également utiliser des cookies supplémentaires pour mémoriser les préférences et comprendre comment le site est utilisé.',
      detailsDescription: 'Choisissez les types de cookies que vous acceptez. Les cookies essentiels ne peuvent pas être désactivés car le site en a besoin pour fonctionner.',
      acceptAll: 'Accepter tous',
      rejectAll: 'Refuser tous',
      customize: 'Personnaliser',
      savePreferences: 'Enregistrer les préférences',
      back: 'Retour',
      learnMore: 'Vous pouvez modifier vos préférences ou en savoir plus dans notre',
      privacyPolicy: 'Politique de Confidentialité',
      essential: {
        title: 'Cookies Essentiels',
        description: 'Obligatoires pour que le site fonctionne. Ne peut pas être désactivé.',
      },
      functional: {
        title: 'Cookies Fonctionnels',
        description: 'Mémorisez les choix tels que la langue ou les paramètres de consentement, où ces fonctionnalités sont activées.',
      },
      analytics: {
        title: 'Cookies Analytiques',
        description: 'Nous aider à comprendre comment les gens utilisent le site web, si les outils d\'analyse sont activés.',
      },
      marketing: {
        title: 'Cookies Marketing',
        description: 'Utilisé uniquement si LBYA active des outils marketing qui nécessitent votre consentement.',
      },
    },
  },
  SV: {
    navbar: { products: 'Produkter', services: 'Tjänster', about: 'Om oss', insights: 'Insikter', careers: 'Karriärer', contact: 'Kontakt' },
    insights: {
      title: 'Insikter',
      subtitle: 'Perspektiv på digitala kontrollplattformar, BIM-kontroll och afrikansk logistik.',
      readArticle: 'Läs artikel',
      readAll: 'Alla insikter',
      items: {
        aiConstruction: { title: 'AI:s roll i att optimera byggarbetsflöden', category: 'Teknologi', excerpt: 'Hur artificiell intelligens revolutionerar projektledning, säkerhet och operativ effektivitet.', date: 'December 2025' },
        urbanBiodiversity: { title: 'Integrera biologisk mångfald i stadsplanering', category: 'Hållbarhet', excerpt: 'Strategier för att skapa levande städer som stödjer lokala ekosystem genom biofilisk design.', date: 'November 2025' },
        climate: { title: 'Design för klimatresiliens i urbana miljöer', category: 'Klimat', excerpt: 'Hur naturbaserade lösningar och grön infrastruktur omvandlar stadens resiliens.', date: 'Oktober 2025' },
        materials: { title: 'Framtiden för konstruktionsteknik: koldioxidnegativa material', category: 'Innovation', excerpt: 'Utforskar biobaserade kompositer och konstruktionsträ som binder mer kol än de släpper ut.', date: 'September 2025' },
        digitalTwin: { title: 'Från BIM till digital tvilling: överbrygga design och drift', category: 'Teknologi', excerpt: 'Utnyttja digitala tvillingar för prediktivt underhåll och livscykeloptimering av byggda tillgångar.', date: 'Augusti 2025' },
      },
    },
    footer: {
      copyright: `${currentYear} LBYA AB. Alla rättigheter förbehållna.`,
      company: { title: 'Företag', about: 'Om Oss', careers: 'Karriärer', contact: 'Kontakt' },
      resources: { insights: 'Insikter' },
      legal: { privacy: 'Integritetspolicy' },
    },
    cookieConsent: {
      title: 'Dina sekretessalternativ',
      description: 'Vi använder väsentliga cookies för att hålla webbplatsen igång. Med ditt tillstånd kan vi också använda valfria cookies för att komma ihåg inställningar och förstå hur webbplatsen används.',
      detailsDescription: 'Välj vilka typer av cookies du vill acceptera. Väsentliga cookies kan inte inaktiveras eftersom webbplatsen behöver dem för att fungera.',
      acceptAll: 'Acceptera alla',
      rejectAll: 'Avvisa alla',
      customize: 'Anpassa',
      savePreferences: 'Spara inställningar',
      back: 'Tillbaka',
      learnMore: 'Du kan ändra dina inställningar eller läsa mer i vår',
      privacyPolicy: 'Integritetspolicy',
      essential: {
        title: 'Väsentliga Cookies',
        description: 'Krävs för att webbplatsen ska fungera. Kan inte inaktiveras.',
      },
      functional: {
        title: 'Funktionella Cookies',
        description: 'Kom ihåg val som språk eller medgivandeinställningar, där dessa funktioner är aktiverade.',
      },
      analytics: {
        title: 'Analyskökies',
        description: 'Hjälpa oss förstå hur människor använder webbplatsen, om analysverktygen är aktiverade.',
      },
      marketing: {
        title: 'Marknadsföringscookies',
        description: 'Endast använt om LBYA möjliggör marknadsföringsverktyg som behöver ditt medgivande.',
      },
    },
  },
  DE: {
    navbar: { products: 'Produkte', services: 'Dienstleistungen', about: 'Über uns', insights: 'Einblicke', careers: 'Karriere', contact: 'Kontakt' },
    insights: {
      title: 'Einblicke',
      subtitle: 'Perspektiven zu digitalen Kontrollplattformen, BIM-Kontrolle und afrikanischer Logistik.',
      readArticle: 'Artikel lesen',
      readAll: 'Alle Einblicke',
      items: {
        aiConstruction: { title: 'Die Rolle von KI bei der Optimierung von Bauabläufen', category: 'Technologie', excerpt: 'Wie künstliche Intelligenz Projektmanagement, Sicherheit und betriebliche Effizienz verändert.', date: 'Dezember 2025' },
        urbanBiodiversity: { title: 'Biodiversität in die Stadtplanung integrieren', category: 'Nachhaltigkeit', excerpt: 'Strategien für lebendige Städte, die lokale Ökosysteme durch biophiles Design unterstützen.', date: 'November 2025' },
        climate: { title: 'Gestaltung für Klimaresilienz in urbanen Räumen', category: 'Klima', excerpt: 'Wie naturbasierte Lösungen und grüne Infrastruktur die Resilienz von Städten verändern.', date: 'Oktober 2025' },
        materials: { title: 'Die Zukunft des Bauingenieurwesens: kohlenstoffnegative Materialien', category: 'Innovation', excerpt: 'Biobasierte Verbundstoffe und Konstruktionsholz, die mehr Kohlenstoff binden als sie ausstoßen.', date: 'September 2025' },
        digitalTwin: { title: 'Von BIM zum digitalen Zwilling: Design und Betrieb verbinden', category: 'Technologie', excerpt: 'Digitale Zwillinge für vorausschauende Wartung und Lebenszyklusoptimierung von Bauwerken nutzen.', date: 'August 2025' },
      },
    },
    footer: {
      copyright: `${currentYear} LBYA AB. Alle Rechte vorbehalten.`,
      company: { title: 'Unternehmen', about: 'Über uns', careers: 'Karriere', contact: 'Kontakt' },
      resources: { insights: 'Einblicke' },
      legal: { privacy: 'Datenschutzerklärung' },
    },
    cookieConsent: {
      title: 'Ihre Datenschutzoptionen',
      description: 'Wir verwenden wesentliche Cookies, um die Website zu betreiben. Mit Ihrer Genehmigung können wir auch optionale Cookies verwenden, um Vorlieben zu merken und zu verstehen, wie die Website verwendet wird.',
      detailsDescription: 'Wählen Sie, welche Cookie-Typen Sie akzeptieren möchten. Wesentliche Cookies können nicht deaktiviert werden, da die Website sie zum Funktionieren benötigt.',
      acceptAll: 'Alle akzeptieren',
      rejectAll: 'Alle ablehnen',
      customize: 'Anpassen',
      savePreferences: 'Einstellungen speichern',
      back: 'Zurück',
      learnMore: 'Sie können Ihre Einstellungen ändern oder mehr in unserer',
      privacyPolicy: 'Datenschutzerklärung',
      essential: {
        title: 'Wesentliche Cookies',
        description: 'Erforderlich damit die Website funktioniert. Kann nicht deaktiviert werden.',
      },
      functional: {
        title: 'Funktionale Cookies',
        description: 'Denken Sie an Entscheidungen wie Sprach- oder Zustimmungseinstellungen, sofern diese Funktionen aktiviert sind.',
      },
      analytics: {
        title: 'Analyse-Cookies',
        description: 'Hilf uns zu verstehen, wie Benutzer die Website nutzen, wenn Analyse-Tools aktiviert sind.',
      },
      marketing: {
        title: 'Marketing-Cookies',
        description: 'Wird nur verwendet, wenn LBYA Marketing-Tools aktiviert, die Ihre Zustimmung erfordern.',
      },
    },
  },
};
