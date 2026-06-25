import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ResourcesHeroInteractiveBackdrop from '@/app/components/ResourcesHeroInteractiveBackdrop';
import { pageFrameStyle } from '@/app/components/LayoutFrame';
import { asLocale, type Locale } from '@/app/content/locale';
import { localizePath } from '@/app/content/paths';
import { resourceAreas } from '@/data/mockResources';

type Props = { params: Promise<{ locale: string }> };

const heroStats = [
  { label: 'Focus', value: 'Delivery readiness' },
  { label: 'Lens', value: 'Information trust' },
  { label: 'Path', value: 'Evidence and integrations' },
];

export const metadata: Metadata = {
  title: 'Resources | LBYA',
  description: 'Resources for better control, delivery readiness, information trust, integrations, and research around NBC and LBYA.',
};

function ArrowIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

export default async function ResourcesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const activeLocale = asLocale(locale);

  return (
    <div className="min-h-screen bg-white text-[#1F3529]">
      <Navbar />

      <main>
        <section className="relative overflow-hidden bg-[#37474F] pt-30 pb-20 text-white">
          <ResourcesHeroInteractiveBackdrop variant="resources" />
          <div className="relative" style={pageFrameStyle}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A5D6A7]">Resources</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">Knowledge for better control.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/84 md:text-xl">
              Explore insights, problem notes, research directions, and integration plans behind LBYA’s digital
              control products.
            </p>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/78 md:text-lg">
              For NBC, resources focus on delivery readiness, information trust, issue responsibility, evidence, and the
              software ecosystem that real-estate, infrastructure, and industrial teams already use.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={localizePath(activeLocale, '/resources/insights')}
                className="inline-flex items-center gap-3 rounded-sm bg-white px-7 py-3.5 text-sm font-semibold text-[#2E7D32] transition-colors hover:bg-[#A5D6A7]"
              >
                <span>Explore insights</span>
                <ArrowIcon />
              </Link>
              <Link
                href={localizePath(activeLocale, '/resources/integrations')}
                className="inline-flex items-center gap-3 rounded-sm border border-white/50 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#2E7D32]"
              >
                <span>View integrations</span>
                <ArrowIcon />
              </Link>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div key={stat.label} className="rounded-sm border border-white/12 bg-white/6 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A5D6A7]">{stat.label}</p>
                  <p className="mt-2 text-lg font-medium text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F7FAF7] py-16">
          <div style={pageFrameStyle}>
            <p className="max-w-5xl text-base leading-8 text-[#37474F]/82 md:text-lg">
              Resources are organised around the problems our products are built to control: unclear information,
              scattered responsibilities, weak evidence, and decisions made without enough trust.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div style={pageFrameStyle}>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2E7D32]">Resource areas</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">Useful knowledge, not noise.</h2>
              <p className="mt-6 text-base leading-8 text-[#37474F]/82 md:text-lg">
                Resources are organised around the problems our products are built to control: unclear information,
                scattered responsibilities, weak evidence, and decisions made without enough trust.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {resourceAreas.map((resource) => (
                <article key={resource.id} className="group overflow-hidden rounded-sm border border-[#DCE3E0] bg-white shadow-[0_18px_30px_rgba(31,53,41,0.06)] transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex h-full flex-col p-6 sm:p-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2E7D32]">{resource.title}</p>
                    <p className="mt-4 text-base leading-7 text-[#37474F]/82">{resource.description}</p>
                    <div className="mt-6">
                      <Link
                        href={localizePath(activeLocale, resource.href)}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#2E7D32] transition-colors group-hover:text-[#1b5e20]"
                      >
                        <span>{resource.cta}</span>
                        <ArrowIcon />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F7FAF7] py-16">
          <div style={pageFrameStyle}>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2E7D32]">Positioning</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">For the problems behind control.</h2>
              <p className="mt-6 text-base leading-8 text-[#37474F]/82 md:text-lg">
                Resources support the same message as the products: LBYA builds digital control platforms for
                connected industries, and these pages explain the problems, workflows, research, and integrations
                behind that control.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div style={pageFrameStyle}>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {[
                { title: 'Insight-led', body: 'Short articles on BIM readiness, information trust, and control.' },
                { title: 'Problem-led', body: 'A structured view of what NBC is designed to solve.' },
                { title: 'Integration-led', body: 'Practical notes on tools and file formats around the workflow.' },
                { title: 'Research-led', body: 'Academic directions that stay close to real delivery problems.' },
              ].map((item) => (
                <div key={item.title} className="rounded-sm border border-[#DCE3E0] bg-white p-6 shadow-[0_16px_28px_rgba(31,53,41,0.05)]">
                  <p className="text-lg font-semibold text-[#1F3529]">{item.title}</p>
                  <p className="mt-3 text-sm leading-6 text-[#37474F]/80">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
