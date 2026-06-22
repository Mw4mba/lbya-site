import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ResourcesHeroInteractiveBackdrop from '@/app/components/ResourcesHeroInteractiveBackdrop';
import { pageFrameStyle } from '@/app/components/LayoutFrame';
import { releaseNotes } from '@/data/mockResources';

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = {
  title: 'Release Notes | LBYA',
  description: 'Release notes for the NBC product direction.',
};

export default async function ResourcesReleaseNotesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-white text-[#1F3529]">
      <Navbar />
      <main>
        <section className="relative overflow-hidden bg-[#37474F] pt-30 pb-20 text-white">
          <ResourcesHeroInteractiveBackdrop variant="release-notes" />
          <div className="relative z-10" style={pageFrameStyle}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A5D6A7]">Release Notes</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">What is taking shape.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/84 md:text-xl">
              Follow the development direction of LBYA’s digital control products.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div style={pageFrameStyle}>
            <div className="space-y-4">
              {releaseNotes.map((note) => (
                <article key={note.id} className="rounded-sm border border-[#DCE3E0] bg-white p-6 shadow-[0_18px_30px_rgba(31,53,41,0.06)]">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2E7D32]">{note.title}</p>
                  <p className="mt-3 text-sm leading-7 text-[#37474F]/82">{note.summary}</p>
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
