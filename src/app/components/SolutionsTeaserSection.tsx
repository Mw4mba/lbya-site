'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { asLocale } from '../content/locale';
import { localizePath } from '../content/paths';
import { getSolutions, getSolutionsHomeCopy } from '../content/solutions';

function ArrowIcon() {
  return (
    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function SolutionsSignalLayer() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 z-0 overflow-hidden"
      style={{
        left: 'clamp(1.5rem, calc(9.14vw - 0.354rem), 7.875rem)',
        right: 'clamp(1.5rem, calc(11.43vw - 1.286rem), 9rem)',
      }}
    >
      <div
        className="hero-grid-scan absolute inset-y-0 right-0 w-[74%] opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(rgba(129, 212, 250, 0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(165, 214, 167, 0.12) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage: 'linear-gradient(90deg, transparent, black 18%, black 88%, transparent)',
        }}
      />
      <svg className="absolute inset-0 h-full w-full opacity-70" viewBox="0 0 1440 420" preserveAspectRatio="none">
        <defs>
          <linearGradient id="solutions-teaser-signal" x1="0%" y1="65%" x2="100%" y2="22%">
            <stop offset="0%" stopColor="#A5D6A7" stopOpacity="0.14" />
            <stop offset="48%" stopColor="#81D4FA" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#F5C469" stopOpacity="0.32" />
          </linearGradient>
        </defs>
        {[
          'M20 332 C190 204 304 256 452 170 C610 78 734 132 888 210 C1052 294 1210 120 1420 74',
          'M74 98 C238 142 330 68 486 118 C660 174 774 300 934 258 C1090 218 1204 278 1396 214',
        ].map((line) => (
          <path
            key={line}
            className="hero-signal-line"
            d={line}
            fill="none"
            stroke="url(#solutions-teaser-signal)"
            strokeLinecap="round"
            strokeWidth="1.8"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    </div>
  );
}

export default function SolutionsTeaserSection() {
  const activeLocale = asLocale(useLocale());
  const copy = getSolutionsHomeCopy(activeLocale);
  const solutions = getSolutions(activeLocale);

  return (
    <section id="solutions" className="relative overflow-hidden bg-[#F7FAF7] py-14 text-[#1F3529] sm:py-16">
      <SolutionsSignalLayer />
      <div className="absolute inset-x-0 top-0 h-px bg-[#1F3529]/10" aria-hidden="true" />

      <div
        className="relative z-10"
        style={{
          marginLeft: 'clamp(1.5rem, calc(9.14vw - 0.354rem), 7.875rem)',
          marginRight: 'clamp(1.5rem, calc(11.43vw - 1.286rem), 9rem)',
        }}
      >
        <div className="grid gap-5 lg:grid-cols-[0.36fr_0.64fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#2E7D32]">
              {copy.eyebrow}
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-light leading-tight md:text-4xl">
              {copy.heading}
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-[#37474F]/72 lg:justify-self-end">
            {copy.body}
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {solutions.map((solution) => (
            <article
              key={solution.slug}
              className="group relative overflow-hidden border border-[#1F3529]/12 bg-white/86 p-5 shadow-[0_18px_44px_rgba(31,53,41,0.07)] backdrop-blur-sm sm:p-6"
            >
              <div className="absolute inset-y-0 left-0 w-1 bg-[#2E7D32]" aria-hidden="true" />
              <div className="absolute right-5 top-5 h-12 w-12 border border-[#1F3529]/10" aria-hidden="true">
                <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#81D4FA]/45" />
                <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[#A5D6A7]/60" />
              </div>

              <div className="relative pr-16">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2E7D32]">
                  {solution.product}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[#1F3529]">
                  {solution.title}
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#37474F]/74">
                  {solution.body}
                </p>
                <a
                  href={localizePath(activeLocale, solution.href)}
                  className="group/link mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#2E7D32] transition-colors hover:text-[#1F3529]"
                >
                  <span>{copy.cta}</span>
                  <ArrowIcon />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
