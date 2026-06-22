import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ResourcesHeroInteractiveBackdrop from '@/app/components/ResourcesHeroInteractiveBackdrop';
import { pageFrameStyle } from '@/app/components/LayoutFrame';
import { asLocale, type Locale } from '@/app/content/locale';
import { localizePath } from '@/app/content/paths';
import { nbcInsightArticles } from '@/data/mockResources';

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = {
  title: 'Insights | LBYA',
  description: 'Insights on BIM readiness, information trust, evidence, and decision control behind NBC.',
};

function ArrowIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

export default async function ResourcesInsightsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const activeLocale = asLocale(locale);

  return (
    <div className="min-h-screen bg-white text-[#1F3529]">
      <Navbar />

      <main>
        <section className="relative overflow-hidden bg-[#37474F] pt-30 pb-20 text-white">
          <ResourcesHeroInteractiveBackdrop variant="insights" />
          <div className="relative" style={pageFrameStyle}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A5D6A7]">Insights</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">The problems behind BIM readiness and information trust.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/84 md:text-xl">
              NBC insights explain why construction teams need clearer readiness, stronger evidence, better issue
              accountability, and more transparent validation workflows.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div style={pageFrameStyle}>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {nbcInsightArticles.map((article) => (
                <article key={article.id} className="overflow-hidden rounded-sm border border-[#DCE3E0] bg-white shadow-[0_18px_30px_rgba(31,53,41,0.06)]">
                  <div className="flex h-full flex-col p-6 sm:p-7">
                    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#2E7D32]">
                      <span>{article.category}</span>
                      <span className="text-[#37474F]/38">•</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h2 className="mt-4 text-xl font-semibold leading-tight text-[#1F3529]">{article.title}</h2>
                    <p className="mt-4 text-sm leading-7 text-[#37474F]/82">{article.summary}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-[#A5D6A7]/40 bg-[#F6FAF6] px-3 py-1 text-xs font-medium text-[#2E7D32]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6">
                      <Link
                        href={localizePath(activeLocale, '/resources')}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#2E7D32] transition-colors hover:text-[#1b5e20]"
                      >
                        <span>Read more</span>
                        <ArrowIcon />
                      </Link>
                    </div>
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
