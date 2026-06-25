import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ApplicationRequestForm from '@/app/components/applications/ApplicationRequestForm';
import type { ApplicationType } from '@/lib/applications/types';
import { asLocale, type Locale } from '@/app/content/locale';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ intent?: string }>;
};

const frame = {
  marginLeft: 'clamp(1.5rem, calc(9.14vw - 0.354rem), 7.875rem)',
  marginRight: 'clamp(1.5rem, calc(11.43vw - 1.286rem), 9rem)',
};

const copyByLocale: Record<
  Locale,
  {
    subtitle: string;
    fallbackTitle: string;
    titles: {
      earlyAccess: string;
      enterpriseIntro: string;
      pilotAccess: string;
    };
  }
> = {
  en: {
    subtitle:
      'Request access, enterprise introduction, or pilot discussion for Nayeli BIM Control. LBYA AB reviews every request before approval or access creation.',
    fallbackTitle: 'NBC application',
    titles: {
      earlyAccess: 'Request access',
      enterpriseIntro: 'Request enterprise introduction',
      pilotAccess: 'Discuss pilot access',
    },
  },
  sv: {
    subtitle:
      'Begar tidig atkomst, enterprise-introduktion eller pilotdialog for Nayeli BIM Control. LBYA AB granskar varje ansokan fore godkannande eller atkomstskapande.',
    fallbackTitle: 'NBC-ansokan',
    titles: {
      earlyAccess: 'Begar tidig atkomst',
      enterpriseIntro: 'Begar enterprise-introduktion',
      pilotAccess: 'Diskutera pilotatkomst',
    },
  },
  fr: {
    subtitle:
      'Demandez un acces anticipe, une introduction enterprise ou une discussion pilote pour Nayeli BIM Control. LBYA AB examine chaque demande avant approbation ou creation d acces.',
    fallbackTitle: 'Demande NBC',
    titles: {
      earlyAccess: 'Demander un acces anticipe',
      enterpriseIntro: 'Demander une introduction enterprise',
      pilotAccess: 'Discuter un acces pilote',
    },
  },
  de: {
    subtitle:
      'Fordern Sie fruehen Zugang, eine Enterprise-Einfuehrung oder ein Pilotgespraech fuer Nayeli BIM Control an. LBYA AB prueft jede Anfrage vor Freigabe oder Zugangserstellung.',
    fallbackTitle: 'NBC-Anfrage',
    titles: {
      earlyAccess: 'Fruehen Zugang anfragen',
      enterpriseIntro: 'Enterprise-Einfuehrung anfragen',
      pilotAccess: 'Pilotzugang besprechen',
    },
  },
};

const intentConfig: Record<
  string,
  {
    applicationType: ApplicationType;
    defaultInterestType: string;
    title: string;
  }
> = {
  early_access: {
    applicationType: 'nbc_early_access',
    defaultInterestType: 'Early access',
    title: 'Request access',
  },
  enterprise_introduction: {
    applicationType: 'nbc_enterprise_introduction',
    defaultInterestType: 'Enterprise introduction',
    title: 'Request enterprise introduction',
  },
  pilot_project: {
    applicationType: 'nbc_pilot_project',
    defaultInterestType: 'Pilot project',
    title: 'Discuss pilot access',
  },
};

export default async function NbcApplyPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);
  const activeLocale = asLocale(locale);
  const copy = copyByLocale[activeLocale];

  const config = intentConfig[query.intent || ''] || {
    applicationType: 'nbc_early_access' as ApplicationType,
    defaultInterestType: 'Early access',
    title: copy.fallbackTitle,
  };

  if (query.intent === 'early_access') config.title = copy.titles.earlyAccess;
  if (query.intent === 'enterprise_introduction') config.title = copy.titles.enterpriseIntro;
  if (query.intent === 'pilot_project') config.title = copy.titles.pilotAccess;

  return (
    <div className="min-h-screen bg-[#F6F8F4] text-[#1F3529]">
      <Navbar />
      <main className="py-20">
        <div style={frame}>
          <ApplicationRequestForm
            preset={{
              title: config.title,
              subtitle: copy.subtitle,
              applicationType: config.applicationType,
              source: 'product_page',
              productCode: 'NBC',
              defaultInterestType: config.defaultInterestType,
            }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
