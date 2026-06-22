import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ResourcesHeroInteractiveBackdrop from '@/app/components/ResourcesHeroInteractiveBackdrop';
import { pageFrameStyle } from '@/app/components/LayoutFrame';
import { guideTopics } from '@/data/mockResources';

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = {
  title: 'Help & Guides | LBYA',
  description: 'Simple explanations for better control in NBC.',
};

export default async function ResourcesHelpGuidesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-white text-[#1F3529]">
      <Navbar />
      <main>
        <section className="relative overflow-hidden bg-[#37474F] pt-30 pb-20 text-white">
          <ResourcesHeroInteractiveBackdrop variant="help-guides" />
          <div className="relative z-10" style={pageFrameStyle}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A5D6A7]">Help & Guides</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">Simple explanations for better control.</h1>
          </div>
        </section>

        <section className="py-16">
          <div style={pageFrameStyle}>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {guideTopics.map((guide) => (
                <article key={guide.id} className="rounded-sm border border-[#DCE3E0] bg-white p-6 shadow-[0_18px_30px_rgba(31,53,41,0.06)]">
                  <p className="text-lg font-semibold text-[#1F3529]">{guide.title}</p>
                  <p className="mt-3 text-sm leading-7 text-[#37474F]/82">{guide.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
