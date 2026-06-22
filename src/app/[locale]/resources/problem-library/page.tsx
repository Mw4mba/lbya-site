import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ResourcesHeroInteractiveBackdrop from '@/app/components/ResourcesHeroInteractiveBackdrop';
import { pageFrameStyle } from '@/app/components/LayoutFrame';
import { resourceProblems } from '@/data/mockResources';

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = {
  title: 'Problem Library | LBYA',
  description: 'Problems worth controlling through NBC.',
};

export default async function ResourcesProblemLibraryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-white text-[#1F3529]">
      <Navbar />
      <main>
        <section className="relative overflow-hidden bg-[#37474F] pt-30 pb-20 text-white">
          <ResourcesHeroInteractiveBackdrop variant="problem-library" />
          <div className="relative z-10" style={pageFrameStyle}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A5D6A7]">Problem Library</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">Problems worth controlling.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/84 md:text-xl">
              NBC is being developed around recurring digital construction problems that affect trust, readiness,
              responsibility, and decisions.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div style={pageFrameStyle}>
            <div className="grid gap-5 md:grid-cols-2">
              {resourceProblems.map((item) => (
                <article key={item.id} className="rounded-sm border border-[#DCE3E0] bg-white p-6 shadow-[0_18px_30px_rgba(31,53,41,0.06)]">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2E7D32]">Problem</p>
                  <h2 className="mt-3 text-2xl font-semibold text-[#1F3529]">{item.problem}</h2>
                  <div className="mt-5 space-y-4 text-sm leading-7 text-[#37474F]/82">
                    <p><span className="font-semibold text-[#1F3529]">Why it matters:</span> {item.whyItMatters}</p>
                    <p><span className="font-semibold text-[#1F3529]">NBC response:</span> {item.nbcResponse}</p>
                    <p><span className="font-semibold text-[#1F3529]">Related features:</span> {item.relatedFeatures.join(', ')}</p>
                  </div>
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
