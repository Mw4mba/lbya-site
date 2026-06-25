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
    title: 'Submit request',
    subtitle:
      'Send your product, pilot, partnership, or business request to LBYA AB. This form creates an Application record for the Admin Dashboard review flow.',
  },
  sv: {
    title: 'Skicka forfragan',
    subtitle:
      'Skicka din produkt-, pilot-, partner- eller affarsforfragan till LBYA AB. Formularet skapar en ansokningspost for granskning i Admin Dashboard.',
  },
  fr: {
    title: 'Soumettre une demande',
    subtitle:
      'Envoyez votre demande produit, pilote, partenariat ou commerciale a LBYA AB. Ce formulaire cree un enregistrement Applications pour examen dans le tableau de bord admin.',
  },
  de: {
    title: 'Anfrage senden',
    subtitle:
      'Senden Sie Ihre Produkt-, Pilot-, Partnerschafts- oder Geschaeftsanfrage an LBYA AB. Dieses Formular erstellt einen Applications-Eintrag fuer die Pruefung im Admin-Dashboard.',
  },
};

export default async function ContactApplicationPage({ params }: Props) {
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
              source: 'contact_page',
              productCode: 'GENERAL',
            }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
