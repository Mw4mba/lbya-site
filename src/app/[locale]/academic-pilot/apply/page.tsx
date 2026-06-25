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
    title: 'Apply for academic pilot',
    subtitle:
      'Submit your NBC Academic Pilot request. LBYA AB reviews each application for project fit, academic alignment, and collaboration potential.',
  },
  sv: {
    title: 'Ansok till akademisk pilot',
    subtitle:
      'Skicka din ansokan till NBC Academic Pilot. LBYA AB granskar varje ansokan utifran projektpassning, akademisk inriktning och samarbetspotential.',
  },
  fr: {
    title: 'Postuler au pilote academique',
    subtitle:
      'Soumettez votre demande NBC Academic Pilot. LBYA AB examine chaque candidature selon l adequation projet, l alignement academique et le potentiel de collaboration.',
  },
  de: {
    title: 'Fur akademischen Piloten bewerben',
    subtitle:
      'Senden Sie Ihre NBC Academic Pilot Anfrage. LBYA AB prueft jede Bewerbung auf Projektpassung, akademische Ausrichtung und Kooperationspotenzial.',
  },
};

export default async function AcademicPilotApplyPage({ params }: Props) {
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
              applicationType: 'nbc_academic_pilot',
              source: 'academic_pilot_page',
              productCode: 'NBC',
              defaultInterestType: 'Academic research',
            }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
