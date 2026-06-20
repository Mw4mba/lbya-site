import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound, permanentRedirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { asLocale } from '@/app/content/locale';
import { localizePath } from '@/app/content/paths';
import { getSolution, solutionSlugs } from '@/app/content/solutions';

type Props = { params: Promise<{ locale: string; solutionSlug: string }> };

const solutionVisualBySlug = {
  'transport-logistics-africa': {
    image: '/hero-logistics-route.jpg',
    accent: '#F5C469',
  },
  'global-bim-control': {
    image: '/Website/2eff78f1-25dd-4e64-8868-938ea919ab70.png',
    accent: '#81D4FA',
  },
} satisfies Record<string, { image: string; accent: string }>;

export function generateStaticParams() {
  return solutionSlugs.map((solutionSlug) => ({ solutionSlug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, solutionSlug } = await params;
  const solution = getSolution(locale, solutionSlug);
  if (!solution) return { title: 'LBYA Solution' };
  return { title: solution.seoTitle, description: solution.metaDescription };
}

function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function SolutionSignalPanel({ accent }: { accent: string }) {
  const lines = [
    'M28 296 C154 162 246 222 356 134 C476 38 590 74 714 174',
    'M54 88 C182 122 248 44 370 92 C514 148 572 284 728 236',
    'M34 364 C190 354 260 304 366 246 C490 178 564 342 724 310',
  ];

  return (
    <div className="relative min-h-[300px] overflow-hidden border border-white/14 bg-white/8 backdrop-blur-sm lg:min-h-[420px]">
      <div
        className="hero-grid-scan absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            'linear-gradient(rgba(129, 212, 250, 0.20) 1px, transparent 1px), linear-gradient(90deg, rgba(165, 214, 167, 0.14) 1px, transparent 1px)',
          backgroundSize: '38px 38px',
          maskImage: 'linear-gradient(90deg, transparent, black 12%, black 86%, transparent)',
        }}
      />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 760 420" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="solution-signal-gradient" x1="0%" y1="80%" x2="100%" y2="18%">
            <stop offset="0%" stopColor="#A5D6A7" stopOpacity="0.18" />
            <stop offset="48%" stopColor="#81D4FA" stopOpacity="0.68" />
            <stop offset="100%" stopColor={accent} stopOpacity="0.86" />
          </linearGradient>
        </defs>
        {lines.map((line) => (
          <path
            key={line}
            className="hero-signal-line"
            d={line}
            fill="none"
            stroke="url(#solution-signal-gradient)"
            strokeLinecap="round"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {[{ x: 246, y: 222 }, { x: 370, y: 92 }, { x: 572, y: 284 }, { x: 714, y: 174 }].map((node) => (
          <circle
            key={`${node.x}-${node.y}`}
            className="hero-signal-node"
            cx={node.x}
            cy={node.y}
            r="6"
            fill={accent}
            opacity="0.82"
          />
        ))}
      </svg>
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/14 bg-[#37474F]/70 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A5D6A7]">LBYA control layer</p>
        <p className="mt-2 text-sm leading-6 text-white/72">Signals, checks, responsibilities, and evidence connected to one product record.</p>
      </div>
    </div>
  );
}

export default async function SolutionPage({ params }: Props) {
  const { locale, solutionSlug } = await params;
  setRequestLocale(locale);
  const activeLocale = asLocale(locale);
  if (activeLocale === 'sv' && solutionSlug === 'transport-logistics-africa') {
    permanentRedirect(localizePath(activeLocale, '/solutions/global-bim-control'));
  }
  const solution = getSolution(activeLocale, solutionSlug);

  if (!solution) notFound();

  const visual = solutionVisualBySlug[solution.slug];

  return (
    <div className="min-h-screen bg-white text-[#37474F]">
      <Navbar />

      <main>
        <section className="relative overflow-hidden bg-[#37474F] px-6 pb-16 pt-28 lg:px-0 lg:pb-20 lg:pt-32">
          <Image
            src={visual.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-24"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#37474F_0%,rgba(55,71,79,0.97)_38%,rgba(55,71,79,0.70)_72%,rgba(55,71,79,0.92)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_25%,rgba(129,212,250,0.17),transparent_28%),radial-gradient(circle_at_44%_78%,rgba(165,214,167,0.14),transparent_30%)]" />

          <div
            className="relative z-10 grid gap-10 lg:grid-cols-[0.58fr_0.42fr] lg:items-end"
            style={{
              marginLeft: 'clamp(1.5rem, calc(9.14vw - 0.354rem), 7.875rem)',
              marginRight: 'clamp(1.5rem, calc(11.43vw - 1.286rem), 9rem)',
            }}
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#A5D6A7]">
                {solution.eyebrow}
              </p>
              <p className="mt-3 text-sm font-semibold tracking-[0.08em] text-white/70">
                {solution.product}
              </p>
              <h1 className="mt-5 max-w-5xl text-5xl font-semibold tracking-tight text-white md:text-7xl">
                {solution.heroTitle}
              </h1>
              <p className="mt-7 max-w-3xl text-lg font-light leading-8 text-white/82 md:text-xl">
                {solution.heroBody}
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <a
                  href={localizePath(activeLocale, solution.primaryCta.href)}
                  className="inline-flex items-center justify-center gap-3 rounded-sm bg-white px-6 py-4 text-sm font-semibold text-[#37474F] shadow-[0_18px_48px_rgba(0,0,0,0.22)] transition-colors hover:bg-[#A5D6A7]"
                >
                  <span>{solution.primaryCta.label}</span>
                  <ArrowIcon />
                </a>
                <a
                  href={localizePath(activeLocale, solution.secondaryCta.href)}
                  className="inline-flex items-center justify-center gap-3 rounded-sm border border-white/30 px-6 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-[#A5D6A7] hover:bg-white/10"
                >
                  <span>{solution.secondaryCta.label}</span>
                  <ArrowIcon />
                </a>
              </div>
            </div>

            <SolutionSignalPanel accent={visual.accent} />
          </div>
        </section>

        <section className="bg-white py-16 lg:py-20">
          <div
            className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr]"
            style={{
              marginLeft: 'clamp(1.5rem, calc(9.14vw - 0.354rem), 7.875rem)',
              marginRight: 'clamp(1.5rem, calc(11.43vw - 1.286rem), 9rem)',
            }}
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2E7D32]">
                {solution.challengeEyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-light leading-tight text-[#1F3529] md:text-5xl">
                {solution.challengeHeading}
              </h2>
              <p className="mt-5 text-base leading-8 text-[#37474F]/74">
                {solution.challengeBody}
              </p>
            </div>

            <div className="grid gap-px overflow-hidden border border-[#1F3529]/10 bg-[#1F3529]/10 sm:grid-cols-2">
              {solution.challenges.map((item) => (
                <article key={item.title} className="bg-[#F7FAF7] p-6">
                  <h3 className="text-lg font-semibold text-[#1F3529]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#37474F]/74">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#F6F8F4] py-16 lg:py-20">
          <div className="absolute inset-x-0 top-0 h-px bg-[#1F3529]/10" aria-hidden="true" />
          <div
            style={{
              marginLeft: 'clamp(1.5rem, calc(9.14vw - 0.354rem), 7.875rem)',
              marginRight: 'clamp(1.5rem, calc(11.43vw - 1.286rem), 9rem)',
            }}
          >
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2E7D32]">
                {solution.responseEyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-light leading-tight text-[#1F3529] md:text-5xl">
                {solution.responseHeading}
              </h2>
              <p className="mt-5 text-base leading-8 text-[#37474F]/74 md:text-lg">
                {solution.responseBody}
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {solution.responseCards.map((card) => (
                <article key={card.title} className="border border-[#1F3529]/10 bg-white p-6 shadow-[0_18px_45px_rgba(31,53,41,0.06)]">
                  <div className="h-1 w-14 bg-[#2E7D32]" aria-hidden="true" />
                  <h3 className="mt-5 text-xl font-semibold text-[#1F3529]">{card.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#37474F]/74">{card.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-20">
          <div
            className="grid gap-12 lg:grid-cols-[0.36fr_0.64fr] lg:items-start"
            style={{
              marginLeft: 'clamp(1.5rem, calc(9.14vw - 0.354rem), 7.875rem)',
              marginRight: 'clamp(1.5rem, calc(11.43vw - 1.286rem), 9rem)',
            }}
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2E7D32]">
                {solution.workflowEyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-light leading-tight text-[#1F3529] md:text-5xl">
                {solution.workflowHeading}
              </h2>
            </div>

            <div className="grid gap-4">
              {solution.workflow.map((step, index) => (
                <article key={step.title} className="grid gap-4 border border-[#1F3529]/10 bg-[#F7FAF7] p-5 sm:grid-cols-[5rem_1fr] sm:items-start">
                  <div className="text-3xl font-light text-[#2E7D32]">{String(index + 1).padStart(2, '0')}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1F3529]">{step.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#37474F]/74">{step.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#37474F] py-16 text-white lg:py-20">
          <div
            className="grid gap-8 lg:grid-cols-[0.38fr_0.62fr] lg:items-center"
            style={{
              marginLeft: 'clamp(1.5rem, calc(9.14vw - 0.354rem), 7.875rem)',
              marginRight: 'clamp(1.5rem, calc(11.43vw - 1.286rem), 9rem)',
            }}
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A5D6A7]">
                {solution.proofHeading}
              </p>
              <h2 className="mt-4 text-3xl font-light leading-tight md:text-5xl">
                {solution.finalHeading}
              </h2>
            </div>
            <div className="border-l border-white/16 pl-6">
              <p className="text-base leading-8 text-white/74">{solution.proofBody}</p>
              <p className="mt-4 text-base leading-8 text-white/74">{solution.finalBody}</p>
              <a
                href={localizePath(activeLocale, solution.secondaryCta.href)}
                className="mt-7 inline-flex items-center gap-3 rounded-sm bg-white px-6 py-3 text-sm font-semibold text-[#37474F] transition-colors hover:bg-[#A5D6A7]"
              >
                <span>{solution.secondaryCta.label}</span>
                <ArrowIcon />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
