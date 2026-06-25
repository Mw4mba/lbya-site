import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ApplicationRequestForm from '@/app/components/applications/ApplicationRequestForm';
import { asLocale, type Locale } from '@/app/content/locale';

type Props = { params: Promise<{ locale: string }> };

const frame = {
  marginLeft: 'clamp(1.5rem, calc(9.14vw - 0.354rem), 7.875rem)',
  marginRight: 'clamp(1.5rem, calc(11.43vw - 1.286rem), 9rem)',
};

const copyByLocale: Record<Locale, { title: string; subtitle: string }> = {
  en: {
    title: 'Applications',
    subtitle:
      'Submit your request to LBYA AB. We review product interest, pilot requests, partnerships, and business applications through one unified applications flow.',
  },
  sv: {
    title: 'Ansokningar',
    subtitle:
      'Skicka din forfragan till LBYA AB. Vi granskar produktintresse, pilotforfragningar, partnerskap och affarsansokningar i ett samlat ansokningsflode.',
  },
  fr: {
    title: 'Candidatures',
    subtitle:
      'Soumettez votre demande a LBYA AB. Nous examinons l interesse produit, les demandes pilote, les partenariats et les demandes commerciales via un flux unique.',
  },
  de: {
    title: 'Anfragen',
    subtitle:
      'Senden Sie Ihre Anfrage an LBYA AB. Wir pruefen Produktinteresse, Pilotanfragen, Partnerschaften und Geschaeftsanfragen in einem einheitlichen Antragsfluss.',
  },
};

export default async function ApplyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const activeLocale = asLocale(locale);
  const copy = copyByLocale[activeLocale];

  return (
    <div className="min-h-screen bg-[#F6F8F4] text-[#1F3529]">
      <Navbar />
      <main className="py-20">
        <div style={frame}>
          <ApplicationRequestForm
            preset={{
              title: copy.title,
              subtitle: copy.subtitle,
              applicationType: 'general_business_request',
              source: 'website',
              productCode: 'GENERAL',
            }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
