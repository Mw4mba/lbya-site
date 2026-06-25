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
      requestAccess: string;
      requestDemo: string;
      enterpriseUse: string;
    };
  }
> = {
  en: {
    subtitle:
      'Request MCT access, demo support, or enterprise discussion. The request is stored in LBYA AB Applications for review, qualification, and follow-up.',
    fallbackTitle: 'MCT application',
    titles: {
      requestAccess: 'Request access',
      requestDemo: 'Request demo',
      enterpriseUse: 'Discuss enterprise use',
    },
  },
  sv: {
    subtitle:
      'Begar MCT-atkomst, demosupport eller enterprise-dialog. Forfragan lagras i LBYA AB Applications for granskning, kvalificering och uppfoljning.',
    fallbackTitle: 'MCT-ansokan',
    titles: {
      requestAccess: 'Begar atkomst',
      requestDemo: 'Begar demo',
      enterpriseUse: 'Diskutera enterprise-anvandning',
    },
  },
  fr: {
    subtitle:
      'Demandez un acces MCT, une demonstration ou une discussion enterprise. La demande est stockee dans LBYA AB Applications pour examen, qualification et suivi.',
    fallbackTitle: 'Demande MCT',
    titles: {
      requestAccess: 'Demander un acces',
      requestDemo: 'Demander une demonstration',
      enterpriseUse: 'Discuter un usage enterprise',
    },
  },
  de: {
    subtitle:
      'Fordern Sie MCT-Zugang, Demo-Unterstuetzung oder ein Enterprise-Gespraech an. Die Anfrage wird in LBYA AB Applications fuer Pruefung, Qualifizierung und Follow-up gespeichert.',
    fallbackTitle: 'MCT-Anfrage',
    titles: {
      requestAccess: 'Zugang anfragen',
      requestDemo: 'Demo anfragen',
      enterpriseUse: 'Enterprise-Nutzung besprechen',
    },
  },
};

const intentConfig: Record<string, { applicationType: ApplicationType; title: string }> = {
  request_access: {
    applicationType: 'mct_subscription_interest',
    title: 'Request access',
  },
  request_demo: {
    applicationType: 'mct_demo_request',
    title: 'Request demo',
  },
  enterprise_use: {
    applicationType: 'mct_subscription_interest',
    title: 'Discuss enterprise use',
  },
};

export default async function MctApplyPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);
  const activeLocale = asLocale(locale);
  const copy = copyByLocale[activeLocale];

  const config = intentConfig[query.intent || ''] || {
    applicationType: 'mct_subscription_interest' as ApplicationType,
    title: copy.fallbackTitle,
  };

  if (query.intent === 'request_access') config.title = copy.titles.requestAccess;
  if (query.intent === 'request_demo') config.title = copy.titles.requestDemo;
  if (query.intent === 'enterprise_use') config.title = copy.titles.enterpriseUse;

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
              productCode: 'MCT',
            }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
