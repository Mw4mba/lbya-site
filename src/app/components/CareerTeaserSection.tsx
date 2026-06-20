'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { asLocale, type Locale } from '../content/locale';
import { localizePath } from '../content/paths';

type CareerTeaserCopy = {
  eyebrow: string;
  heading: string;
  body: string;
  cta: string;
};

const careerTeaserCopyByLocale: Record<Locale, CareerTeaserCopy> = {
  en: {
    eyebrow: 'Careers at LBYA',
    heading: 'Shape the future with a career at LBYA.',
    body: 'Build digital control products with a team that values clarity, ownership, and future-ready engineering.',
    cta: 'Explore careers',
  },
  sv: {
    eyebrow: 'Karri\u00e4r p\u00e5 LBYA',
    heading: 'Forma framtiden med en karri\u00e4r p\u00e5 LBYA.',
    body: 'Bygg digitala kontrollprodukter med ett team som v\u00e4rdes\u00e4tter tydlighet, \u00e4garskap och framtidsredo teknik.',
    cta: 'Utforska karri\u00e4rer',
  },
  fr: {
    eyebrow: 'Carri\u00e8res chez LBYA',
    heading: 'Fa\u00e7onnez l\u2019avenir avec une carri\u00e8re chez LBYA.',
    body: 'Construisez des produits de contr\u00f4le num\u00e9rique avec une \u00e9quipe qui valorise la clart\u00e9, la responsabilit\u00e9 et une ing\u00e9nierie tourn\u00e9e vers l\u2019avenir.',
    cta: 'Explorer les carri\u00e8res',
  },
  de: {
    eyebrow: 'Karriere bei LBYA',
    heading: 'Gestalten Sie die Zukunft mit einer Karriere bei LBYA.',
    body: 'Entwickeln Sie digitale Kontrollprodukte mit einem Team, das Klarheit, Verantwortung und zukunftsf\u00e4hige Technik sch\u00e4tzt.',
    cta: 'Karriere entdecken',
  },
};

function ArrowIcon() {
  return (
    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

export default function CareerTeaserSection() {
  const activeLocale = asLocale(useLocale());
  const copy = careerTeaserCopyByLocale[activeLocale];

  return (
    <section id="careers-preview" className="relative overflow-hidden bg-[#F6FAF6] py-16 text-[#1F3529] sm:py-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2E7D32]/35 to-transparent" aria-hidden="true" />
      <div className="absolute inset-y-0 right-0 hidden w-1/2 opacity-40 lg:block" aria-hidden="true">
        <div className="absolute right-20 top-8 h-40 w-px bg-gradient-to-b from-transparent via-[#2E7D32]/35 to-transparent" />
        <div className="absolute right-36 top-24 h-px w-56 bg-gradient-to-r from-transparent via-[#81D4FA]/50 to-transparent" />
        <div className="absolute right-16 bottom-8 h-28 w-px bg-gradient-to-b from-transparent via-[#A5D6A7]/50 to-transparent" />
      </div>

      <div
        className="relative z-10 grid gap-8 lg:grid-cols-[0.62fr_0.38fr] lg:items-center"
        style={{
          marginLeft: 'clamp(1.5rem, calc(9.14vw - 0.354rem), 7.875rem)',
          marginRight: 'clamp(1.5rem, calc(11.43vw - 1.286rem), 9rem)',
        }}
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2E7D32]">
            {copy.eyebrow}
          </p>
          <h2 className="mt-4 max-w-4xl text-4xl font-light leading-tight md:text-5xl">
            {copy.heading}
          </h2>
        </div>

        <div className="lg:border-l lg:border-[#2E7D32]/20 lg:pl-8">
          <p className="text-base leading-7 text-[#37474F]/76">
            {copy.body}
          </p>
          <a
            href={localizePath(activeLocale, '/careers')}
            className="group mt-7 inline-flex items-center gap-3 rounded-sm bg-[#1F3529] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2E7D32]"
          >
            {copy.cta}
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
