import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { pageFrameStyle } from '@/app/components/LayoutFrame';
import { asLocale, type Locale } from '@/app/content/locale';
import { localizePath } from '@/app/content/paths';

type Props = { params: Promise<{ locale: string }> };

type LegalItem = {
  title: string;
  body: string;
  action?: string;
  href?: string;
};

type LegalCopy = {
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  noticeTitle: string;
  noticeBody: string;
  sections: LegalItem[];
  operatingTitle: string;
  operatingBody: string;
  operatingItems: LegalItem[];
  contactTitle: string;
  contactBody: string;
  contactEmail: string;
};

const legalCopyByLocale: Record<Locale, LegalCopy> = {
  en: {
    seoTitle: 'Policies & Terms | LBYA',
    seoDescription: 'Legal information for LBYA website use, privacy, cookies, product terms, data processing, and customer data exit.',
    eyebrow: 'Legal information',
    title: 'Policies & Terms',
    intro:
      'A practical overview of the policies that apply when you use the LBYA website, contact us, request a demo, or start a commercial conversation about MCT or NBC.',
    updated: 'Last updated: 19 June 2026',
    noticeTitle: 'Public overview',
    noticeBody:
      'This page is written as a clear public guide. Signed order forms, subscription agreements, data processing agreements, or enterprise terms agreed with LBYA take priority over this overview.',
    sections: [
      {
        title: 'Terms of website use',
        body:
          'You may use this website to learn about LBYA products, request information, and contact us. Website content is provided for general product information and may change as our products evolve.',
      },
      {
        title: 'Product and subscription terms',
        body:
          'Commercial access to Malaika Control Tower (MCT), early access to Nayeli BIM Control (NBC), pilots, subscriptions, and enterprise arrangements are governed by the agreement accepted or signed for that product.',
      },
      {
        title: 'Data processing',
        body:
          'When LBYA processes customer data inside a product workspace, the role of LBYA, the customer, and any relevant processors should be documented in a data processing agreement or equivalent commercial terms before production data is handled.',
      },
      {
        title: 'Switching and exit',
        body:
          'If a customer leaves an LBYA product, we aim to support a reasonable exit process. Subject to the agreement and technical feasibility, this may include export of customer records, controlled handover, and deletion or anonymization after required retention periods.',
      },
      {
        title: 'Privacy Policy',
        body:
          'Our privacy policy explains how LBYA collects, uses, stores, and protects personal data from website visitors, contacts, demo requests, applicants, and product conversations.',
        action: 'Read privacy policy',
        href: '/privacy',
      },
      {
        title: 'Cookie choices',
        body:
          'LBYA uses essential cookies to keep the website working. Optional cookies are used only where enabled and can be managed through the consent settings.',
        action: 'Manage consent',
        href: '/consent',
      },
    ],
    operatingTitle: 'How LBYA applies these terms',
    operatingBody:
      'LBYA builds digital control products. The policies below are tailored to that reality: logistics control with MCT, BIM control with NBC, and product conversations that may involve operational information.',
    operatingItems: [
      {
        title: 'Product information is not operational advice',
        body:
          'Content about MCT and NBC does not replace legal, customs, insurance, financial, engineering, safety, or regulatory advice. Customers remain responsible for the decisions they make with their own data and experts.',
      },
      {
        title: 'Customer data belongs to the customer',
        body:
          'Customer records, documents, reports, and workflow evidence provided to a product workspace remain controlled by the customer or the party identified in the relevant agreement.',
      },
      {
        title: 'Sub-processors and integrations',
        body:
          'LBYA may use hosting, email, analytics, security, support, and integration providers to operate the website and products. For product integrations, technical feasibility, access rights, data categories, and transfer risks are reviewed before connection.',
      },
      {
        title: 'Product lifecycle',
        body:
          'MCT is commercially ready. NBC access is available by request. Features, packaging, availability, and technical requirements may change as products improve, security needs evolve, or customer agreements require specific controls.',
      },
    ],
    contactTitle: 'Legal and privacy contact',
    contactBody:
      'For questions about these policies, privacy rights, data processing, product terms, or a customer exit request, contact LBYA directly.',
    contactEmail: 'info@lbya.se',
  },
  sv: {
    seoTitle: 'Policyer och villkor | LBYA',
    seoDescription: 'Juridisk information om LBYA:s webbplats, integritet, cookies, produktvillkor, databehandling och kunddata vid avslut.',
    eyebrow: 'Juridisk information',
    title: 'Policyer och villkor',
    intro:
      'En praktisk översikt över de policyer som gäller när du använder LBYA:s webbplats, kontaktar oss, begär en demo eller inleder en kommersiell dialog om MCT eller NBC.',
    updated: 'Senast uppdaterad: 19 juni 2026',
    noticeTitle: 'Offentlig översikt',
    noticeBody:
      'Den här sidan är skriven som en tydlig offentlig guide. Undertecknade orderformulär, abonnemangsavtal, personuppgiftsbiträdesavtal eller enterprise-villkor som avtalats med LBYA gäller före denna översikt.',
    sections: [
      {
        title: 'Villkor för användning av webbplatsen',
        body:
          'Du får använda webbplatsen för att läsa om LBYA:s produkter, begära information och kontakta oss. Innehållet är allmän produktinformation och kan ändras när produkterna utvecklas.',
      },
      {
        title: 'Produkt- och abonnemangsvillkor',
        body:
          'Kommersiell åtkomst till Malaika Control Tower (MCT), tidig åtkomst till Nayeli BIM Control (NBC), piloter, abonnemang och enterprise-upplägg styrs av det avtal som accepteras eller undertecknas för produkten.',
      },
      {
        title: 'Databehandling',
        body:
          'När LBYA behandlar kunddata i en produktmiljö bör LBYA:s, kundens och eventuella personuppgiftsbiträdens roller dokumenteras i ett personuppgiftsbiträdesavtal eller motsvarande kommersiella villkor innan produktionsdata hanteras.',
      },
      {
        title: 'Byte och avslut',
        body:
          'Om en kund lämnar en LBYA-produkt strävar vi efter att stödja en rimlig avslutsprocess. Beroende på avtal och teknisk möjlighet kan det omfatta export av kundposter, kontrollerad överlämning och radering eller anonymisering efter krav på bevarande.',
      },
      {
        title: 'Integritetspolicy',
        body:
          'Vår integritetspolicy beskriver hur LBYA samlar in, använder, lagrar och skyddar personuppgifter från webbplatsbesökare, kontakter, demoförfrågningar, kandidater och produktdialoger.',
        action: 'Läs integritetspolicyn',
        href: '/privacy',
      },
      {
        title: 'Cookieval',
        body:
          'LBYA använder nödvändiga cookies för att webbplatsen ska fungera. Valfria cookies används bara där de är aktiverade och kan hanteras via samtyckesinställningarna.',
        action: 'Hantera samtycke',
        href: '/consent',
      },
    ],
    operatingTitle: 'Så tillämpar LBYA villkoren',
    operatingBody:
      'LBYA bygger digitala kontrollprodukter. Policyerna är därför anpassade till logistikkontroll med MCT, BIM-kontroll med NBC och produktdialoger där operativ information kan förekomma.',
    operatingItems: [
      {
        title: 'Produktinformation är inte operativ rådgivning',
        body:
          'Innehåll om MCT och NBC ersätter inte juridisk rådgivning, tullrådgivning, försäkringsrådgivning, finansiell rådgivning, teknisk rådgivning, säkerhetsbedömningar eller myndighetskrav. Kunder ansvarar för beslut som fattas med egna data och experter.',
      },
      {
        title: 'Kunddata tillhör kunden',
        body:
          'Kundposter, dokument, rapporter och arbetsflödesunderlag som läggs in i en produktmiljö kontrolleras av kunden eller den part som anges i relevant avtal.',
      },
      {
        title: 'Underbiträden och integrationer',
        body:
          'LBYA kan använda leverantörer för hosting, e-post, analys, säkerhet, support och integrationer för att driva webbplatsen och produkterna. För produktintegrationer granskas teknisk möjlighet, åtkomsträttigheter, datakategorier och överföringsrisker innan anslutning.',
      },
      {
        title: 'Produktlivscykel',
        body:
          'MCT är kommersiellt redo. NBC är i tidig utveckling. Funktioner, paketering, tillgänglighet och tekniska krav kan ändras när produkterna förbättras, säkerhetsbehov förändras eller kundavtal kräver särskilda kontroller.',
      },
    ],
    contactTitle: 'Kontakt för juridik och integritet',
    contactBody:
      'Kontakta LBYA direkt vid frågor om dessa policyer, integritetsrättigheter, databehandling, produktvillkor eller en begäran om avslut.',
    contactEmail: 'info@lbya.se',
  },
  fr: {
    seoTitle: 'Politiques et conditions | LBYA',
    seoDescription: 'Informations juridiques concernant le site LBYA, la confidentialité, les cookies, les conditions produit, le traitement des données et la sortie client.',
    eyebrow: 'Informations juridiques',
    title: 'Politiques et conditions',
    intro:
      'Un aperçu pratique des politiques applicables lorsque vous utilisez le site LBYA, nous contactez, demandez une démo ou engagez une discussion commerciale autour de MCT ou NBC.',
    updated: 'Dernière mise à jour : 19 juin 2026',
    noticeTitle: 'Aperçu public',
    noticeBody:
      'Cette page est rédigée comme un guide public clair. Les bons de commande, contrats d’abonnement, accords de traitement des données ou conditions enterprise convenus avec LBYA prévalent sur cet aperçu.',
    sections: [
      {
        title: 'Conditions d’utilisation du site',
        body:
          'Vous pouvez utiliser ce site pour découvrir les produits LBYA, demander des informations et nous contacter. Le contenu du site est fourni à titre d’information produit générale et peut évoluer avec nos produits.',
      },
      {
        title: 'Conditions produit et abonnement',
        body:
          'L’accès commercial à Malaika Control Tower (MCT), l’accès anticipé à Nayeli BIM Control (NBC), les pilotes, abonnements et accords enterprise sont régis par l’accord accepté ou signé pour le produit concerné.',
      },
      {
        title: 'Traitement des données',
        body:
          'Lorsque LBYA traite des données client dans un espace produit, le rôle de LBYA, du client et des éventuels sous-traitants doit être documenté dans un accord de traitement des données ou des conditions commerciales équivalentes avant le traitement de données de production.',
      },
      {
        title: 'Changement et sortie',
        body:
          'Lorsqu’un client quitte un produit LBYA, nous cherchons à accompagner une sortie raisonnable. Selon l’accord et la faisabilité technique, cela peut inclure l’export des dossiers client, une remise contrôlée et la suppression ou l’anonymisation après les périodes de conservation requises.',
      },
      {
        title: 'Politique de confidentialité',
        body:
          'Notre politique de confidentialité explique comment LBYA collecte, utilise, conserve et protège les données personnelles des visiteurs du site, contacts, demandes de démo, candidats et échanges produit.',
        action: 'Lire la politique',
        href: '/privacy',
      },
      {
        title: 'Choix relatifs aux cookies',
        body:
          'LBYA utilise des cookies essentiels pour faire fonctionner le site. Les cookies optionnels ne sont utilisés que lorsqu’ils sont activés et peuvent être gérés dans les paramètres de consentement.',
        action: 'Gérer le consentement',
        href: '/consent',
      },
    ],
    operatingTitle: 'Comment LBYA applique ces conditions',
    operatingBody:
      'LBYA construit des produits de contrôle numérique. Ces politiques sont donc adaptées au contrôle logistique avec MCT, au contrôle BIM avec NBC et aux échanges produit pouvant inclure des informations opérationnelles.',
    operatingItems: [
      {
        title: 'L’information produit n’est pas un conseil opérationnel',
        body:
          'Le contenu relatif à MCT et NBC ne remplace pas un conseil juridique, douanier, assurantiel, financier, technique, de sécurité ou réglementaire. Les clients restent responsables des décisions prises avec leurs propres données et experts.',
      },
      {
        title: 'Les données client appartiennent au client',
        body:
          'Les dossiers, documents, rapports et preuves de workflow fournis dans un espace produit restent sous le contrôle du client ou de la partie identifiée dans l’accord applicable.',
      },
      {
        title: 'Sous-traitants et intégrations',
        body:
          'LBYA peut utiliser des fournisseurs d’hébergement, e-mail, analyse, sécurité, support et intégration pour exploiter le site et les produits. Pour les intégrations produit, la faisabilité technique, les droits d’accès, les catégories de données et les risques de transfert sont examinés avant connexion.',
      },
      {
        title: 'Cycle de vie produit',
        body:
          'MCT est commercialement prêt. NBC est en développement précoce. Les fonctionnalités, offres, disponibilités et exigences techniques peuvent évoluer avec l’amélioration des produits, les besoins de sécurité ou les contrôles spécifiques requis par les accords client.',
      },
    ],
    contactTitle: 'Contact juridique et confidentialité',
    contactBody:
      'Pour toute question sur ces politiques, les droits liés à la confidentialité, le traitement des données, les conditions produit ou une demande de sortie client, contactez directement LBYA.',
    contactEmail: 'info@lbya.se',
  },
  de: {
    seoTitle: 'Policies & Terms | LBYA',
    seoDescription: 'Legal information for LBYA website use, privacy, cookies, product terms, data processing, and customer data exit.',
    eyebrow: 'Legal information',
    title: 'Policies & Terms',
    intro:
      'A practical overview of the policies that apply when you use the LBYA website, contact us, request a demo, or start a commercial conversation about MCT or NBC.',
    updated: 'Last updated: 19 June 2026',
    noticeTitle: 'Public overview',
    noticeBody:
      'This page is written as a clear public guide. Signed order forms, subscription agreements, data processing agreements, or enterprise terms agreed with LBYA take priority over this overview.',
    sections: [],
    operatingTitle: 'How LBYA applies these terms',
    operatingBody: 'LBYA builds digital control products for logistics and BIM control workflows.',
    operatingItems: [],
    contactTitle: 'Legal and privacy contact',
    contactBody: 'For questions about these policies, contact LBYA directly.',
    contactEmail: 'info@lbya.se',
  },
};

legalCopyByLocale.de.sections = legalCopyByLocale.en.sections;
legalCopyByLocale.de.operatingItems = legalCopyByLocale.en.operatingItems;

function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = asLocale(locale);
  const copy = legalCopyByLocale[activeLocale];
  return { title: copy.seoTitle, description: copy.seoDescription };
}

export default async function LegalPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const activeLocale = asLocale(locale);
  const copy = legalCopyByLocale[activeLocale];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="relative overflow-hidden bg-[#37474F] py-28 text-white lg:py-36">
        <div className="absolute inset-0 opacity-30" aria-hidden="true">
          <div className="hero-grid-scan absolute inset-0" />
          <div className="absolute right-[12%] top-20 h-44 w-44 border border-[#A5D6A7]/25" />
          <div className="absolute bottom-12 left-[8%] h-px w-72 bg-[#A5D6A7]/35" />
        </div>
        <div className="relative z-10 grid gap-10 lg:grid-cols-[0.62fr_0.38fr] lg:items-end" style={pageFrameStyle}>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A5D6A7]">{copy.eyebrow}</p>
            <h1 className="mt-5 text-5xl font-light leading-tight md:text-7xl">{copy.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/78 md:text-xl">{copy.intro}</p>
          </div>
          <aside className="border-l border-white/18 pl-6 text-sm leading-7 text-white/68">
            <p className="font-semibold text-white">{copy.updated}</p>
            <p className="mt-3">{copy.noticeBody}</p>
          </aside>
        </div>
      </section>

      <main>
        <section className="bg-[#F6F8F4] py-16 lg:py-20">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" style={pageFrameStyle}>
            {copy.sections.map((section) => (
              <article key={section.title} className="border border-[#1F3529]/12 bg-white p-6 shadow-[0_18px_45px_rgba(31,53,41,0.07)]">
                <h2 className="text-2xl font-light leading-tight text-[#1F3529]">{section.title}</h2>
                <p className="mt-4 text-sm leading-7 text-[#37474F]/74">{section.body}</p>
                {section.href && section.action && (
                  <a
                    href={localizePath(activeLocale, section.href)}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#2E7D32] transition-colors hover:text-[#1F5B25]"
                  >
                    <span>{section.action}</span>
                    <ArrowIcon />
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.36fr_0.64fr]" style={pageFrameStyle}>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2E7D32]">{copy.noticeTitle}</p>
              <h2 className="mt-4 text-4xl font-light leading-tight text-[#1F3529] md:text-5xl">
                {copy.operatingTitle}
              </h2>
              <p className="mt-5 text-base leading-8 text-[#37474F]/74">{copy.operatingBody}</p>
            </div>
            <div className="grid gap-px overflow-hidden border border-[#1F3529]/10 bg-[#1F3529]/10 md:grid-cols-2">
              {copy.operatingItems.map((item) => (
                <article key={item.title} className="bg-[#F8FAF7] p-6">
                  <span className="mb-5 block h-1.5 w-10 bg-[#2E7D32]" />
                  <h3 className="text-xl font-semibold leading-tight text-[#1F3529]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#37474F]/74">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#1F3529] py-16 text-white">
          <div className="grid gap-8 md:grid-cols-[0.68fr_0.32fr] md:items-center" style={pageFrameStyle}>
            <div>
              <h2 className="text-3xl font-light leading-tight md:text-5xl">{copy.contactTitle}</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/72">{copy.contactBody}</p>
            </div>
            <a
              href={`mailto:${copy.contactEmail}`}
              className="inline-flex w-fit items-center justify-center gap-3 rounded-sm bg-white px-7 py-4 text-sm font-semibold text-[#1F3529] transition-colors hover:bg-[#A5D6A7] md:justify-self-end"
            >
              <span>{copy.contactEmail}</span>
              <ArrowIcon />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
