import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ResourcesHeroInteractiveBackdrop from '@/app/components/ResourcesHeroInteractiveBackdrop';
import { pageFrameStyle } from '@/app/components/LayoutFrame';
import { researchPillars } from '@/data/mockResources';
import ThesisDownloadButton from '@/app/components/resource/ThesisDownloadButton';

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = {
  title: 'Research & Thesis | LBYA',
  description: 'Academic directions connected to BIM readiness and evidence control.',
};

export default async function ResourcesResearchThesisPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-white text-[#1F3529]">
      <Navbar />
      <main>
        <section className="relative overflow-hidden bg-[#37474F] pt-30 pb-20 text-white">
          <ResourcesHeroInteractiveBackdrop variant="research-thesis" />
          <div className="relative z-10" style={pageFrameStyle}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A5D6A7]">Research & Thesis</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">A research path for BIM readiness and evidence-control.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/84 md:text-xl">
              NBC’s core ideas can support academic work on Readiness Passports, Decision Gates, Evidence Packs, and
              explainable validation for construction decision-making.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div style={pageFrameStyle}>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2E7D32]">Four research pillars</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">Academic work grounded in practical control.</h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {researchPillars.map((pillar) => (
                <article key={pillar.id} className="rounded-sm border border-[#DCE3E0] bg-white p-6 shadow-[0_18px_30px_rgba(31,53,41,0.06)]">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2E7D32]">{pillar.title}</p>
                  <p className="mt-4 text-sm leading-7 text-[#37474F]/82">{pillar.summary}</p>
                </article>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <ThesisDownloadButton />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
