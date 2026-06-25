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
    title: 'Apply now',
    subtitle:
      'Submit your career application to LBYA AB. The Applications module routes your profile to the Admin Dashboard for structured review and follow-up.',
  },
  sv: {
    title: 'Ansok nu',
    subtitle:
      'Skicka din karriaransokan till LBYA AB. Applications-modulen skickar din profil till Admin Dashboard for strukturerad granskning och uppfoljning.',
  },
  fr: {
    title: 'Postuler maintenant',
    subtitle:
      'Soumettez votre candidature a LBYA AB. Le module Applications transmet votre profil au tableau de bord admin pour un examen structure et un suivi.',
  },
  de: {
    title: 'Jetzt bewerben',
    subtitle:
      'Senden Sie Ihre Bewerbung an LBYA AB. Das Applications-Modul leitet Ihr Profil an das Admin-Dashboard zur strukturierten Pruefung und Nachverfolgung weiter.',
  },
};

export default async function CareersApplyPage({ params }: Props) {
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
              applicationType: 'career_application',
              source: 'careers_page',
              productCode: 'GENERAL',
            }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
