'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { asLocale, type Locale } from '../content/locale';

type NewsArticle = {
  title: string;
  source: string;
  date: string;
  tag: string;
  href: string;
  summary: string;
};

type LatestNewsCopy = {
  eyebrow: string;
  heading: string;
  body: string;
  checked: string;
  readArticle: string;
  articles: NewsArticle[];
};

const sharedArticles = {
  pbcToday: {
    title: 'BIM in 2026: Artificial intelligence and best-in-class collaboration',
    source: 'PBC Today',
    date: '15 Jun 2026',
    href: 'https://www.pbctoday.co.uk/news/digital-construction-news/bim-in-2026-artificial-intelligence-best-in-class-collaboration/162865/',
  },
  buildingSmartIds: {
    title: 'We are looking for feedback on your experience with IDS',
    source: 'buildingSMART International',
    date: '14 May 2026',
    href: 'https://www.buildingsmart.org/we-are-looking-for-feedback-on-your-experience-with-ids/',
  },
  autodeskForma: {
    title: "Autodesk Forma March 2026 Construction Releases - Built for What's Next",
    source: 'Autodesk Digital Builder',
    date: '7 Apr 2026',
    href: 'https://www.autodesk.com/blogs/construction/autodesk-forma-march-2026-construction-releases-built-for-whats-next/',
  },
  biblusTrends: {
    title: 'BIM Trends 2026: Evolving Design, Construction, and Skills',
    source: 'BibLus',
    date: '19 Feb 2026',
    href: 'https://biblus.accasoftware.com/en/bim-trends-2026-evolving-design-construction-and-skills/',
  },
};

const latestNewsCopyByLocale: Record<Locale, LatestNewsCopy> = {
  en: {
    eyebrow: 'Latest news',
    heading: 'BIM signals worth watching.',
    body: 'A compact feed of recent BIM, openBIM, AI, and platform updates that point toward stronger information control.',
    checked: 'Checked 19 Jun 2026',
    readArticle: 'Read article',
    articles: [
      {
        ...sharedArticles.pbcToday,
        tag: 'BIM + AI',
        summary: 'AI is pushing BIM toward richer digital twins, better data access, and more collaborative project delivery.',
      },
      {
        ...sharedArticles.buildingSmartIds,
        tag: 'openBIM',
        summary: 'buildingSMART is asking IDS users and implementers for feedback as the Information Delivery Specification reaches its second anniversary.',
      },
      {
        ...sharedArticles.autodeskForma,
        tag: 'Platform updates',
        summary: 'Autodesk outlines 70+ Forma updates, including data, model management, and connected delivery changes.',
      },
      {
        ...sharedArticles.biblusTrends,
        tag: 'BIM trends',
        summary: 'BibLus frames BIM as an intelligent ecosystem spanning AI, digital twins, CDEs, sustainability, and new roles.',
      },
    ],
  },
  sv: {
    eyebrow: 'Senaste nytt',
    heading: 'BIM-signaler att f\u00f6lja.',
    body: 'Ett kort urval av aktuella artiklar om BIM, openBIM, AI och plattformsutveckling som pekar mot starkare informationskontroll.',
    checked: 'Kontrollerad 19 jun 2026',
    readArticle: 'L\u00e4s artikeln',
    articles: [
      {
        ...sharedArticles.pbcToday,
        tag: 'BIM + AI',
        summary: 'AI driver BIM mot rikare digitala tvillingar, b\u00e4ttre data\u00e5tkomst och mer samordnad projektleverans.',
      },
      {
        ...sharedArticles.buildingSmartIds,
        tag: 'openBIM',
        summary: 'buildingSMART efterfr\u00e5gar feedback fr\u00e5n IDS-anv\u00e4ndare och implementerare n\u00e4r specifikationen fyller tv\u00e5 \u00e5r.',
      },
      {
        ...sharedArticles.autodeskForma,
        tag: 'Plattformsnyheter',
        summary: 'Autodesk presenterar \u00f6ver 70 Forma-uppdateringar inom data, modellhantering och mer sammanh\u00e5llen leverans.',
      },
      {
        ...sharedArticles.biblusTrends,
        tag: 'BIM-trender',
        summary: 'BibLus beskriver BIM som ett intelligent ekosystem med AI, digitala tvillingar, CDE, h\u00e5llbarhet och nya roller.',
      },
    ],
  },
  fr: {
    eyebrow: 'Dernières nouvelles',
    heading: 'Les signaux BIM \u00e0 suivre.',
    body: 'Une s\u00e9lection courte d\u2019articles r\u00e9cents sur le BIM, l\u2019openBIM, l\u2019IA et les plateformes qui renforcent le contr\u00f4le de l\u2019information.',
    checked: 'V\u00e9rifi\u00e9 le 19 juin 2026',
    readArticle: 'Lire l\u2019article',
    articles: [
      {
        ...sharedArticles.pbcToday,
        tag: 'BIM + IA',
        summary: 'L\u2019IA pousse le BIM vers des jumeaux num\u00e9riques plus riches, un meilleur acc\u00e8s aux donn\u00e9es et une livraison plus collaborative.',
      },
      {
        ...sharedArticles.buildingSmartIds,
        tag: 'openBIM',
        summary: 'buildingSMART sollicite les retours des utilisateurs et impl\u00e9menteurs IDS alors que la sp\u00e9cification approche son deuxi\u00e8me anniversaire.',
      },
      {
        ...sharedArticles.autodeskForma,
        tag: 'Mises \u00e0 jour plateforme',
        summary: 'Autodesk pr\u00e9sente plus de 70 mises \u00e0 jour Forma autour des donn\u00e9es, des mod\u00e8les et de la livraison connect\u00e9e.',
      },
      {
        ...sharedArticles.biblusTrends,
        tag: 'Tendances BIM',
        summary: 'BibLus pr\u00e9sente le BIM comme un \u00e9cosyst\u00e8me intelligent liant IA, jumeaux num\u00e9riques, CDE, durabilit\u00e9 et nouveaux r\u00f4les.',
      },
    ],
  },
  de: {
    eyebrow: 'Aktuelles',
    heading: 'BIM-Signale, die wichtig werden.',
    body: 'Eine kurze Auswahl aktueller Artikel zu BIM, openBIM, KI und Plattformen, die auf st\u00e4rkere Informationskontrolle einzahlen.',
    checked: 'Gepr\u00fcft am 19. Juni 2026',
    readArticle: 'Artikel lesen',
    articles: [
      {
        ...sharedArticles.pbcToday,
        tag: 'BIM + KI',
        summary: 'KI bewegt BIM in Richtung umfassenderer digitaler Zwillinge, besserem Datenzugang und kollaborativerer Projektabwicklung.',
      },
      {
        ...sharedArticles.buildingSmartIds,
        tag: 'openBIM',
        summary: 'buildingSMART bittet IDS-Nutzer und Implementierer um Feedback, w\u00e4hrend die Information Delivery Specification ihr zweites Jahr erreicht.',
      },
      {
        ...sharedArticles.autodeskForma,
        tag: 'Plattform-Updates',
        summary: 'Autodesk beschreibt mehr als 70 Forma-Updates f\u00fcr Daten, Modellmanagement und vernetzte Projektabwicklung.',
      },
      {
        ...sharedArticles.biblusTrends,
        tag: 'BIM-Trends',
        summary: 'BibLus beschreibt BIM als intelligentes \u00d6kosystem aus KI, digitalen Zwillingen, CDEs, Nachhaltigkeit und neuen Rollen.',
      },
    ],
  },
};

function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function NewsSignalGraphic() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="hero-grid-scan absolute inset-y-0 right-0 w-2/3 opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(rgba(129, 212, 250, 0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(165, 214, 167, 0.12) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage: 'linear-gradient(90deg, transparent, black 32%, black 90%, transparent)',
        }}
      />
      <svg className="absolute inset-x-0 top-0 h-44 w-full opacity-55" viewBox="0 0 1440 300" preserveAspectRatio="none">
        <defs>
          <linearGradient id="latest-news-signal" x1="0%" y1="72%" x2="100%" y2="20%">
            <stop offset="0%" stopColor="#A5D6A7" stopOpacity="0.1" />
            <stop offset="48%" stopColor="#81D4FA" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#F5C469" stopOpacity="0.75" />
          </linearGradient>
        </defs>
        <path
          className="hero-signal-line"
          d="M28 236 C210 70 376 210 540 122 C704 34 792 92 928 138 C1092 194 1198 68 1418 42"
          fill="none"
          stroke="url(#latest-news-signal)"
          strokeLinecap="round"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="hero-future-line"
          d="M172 88 H336 V142 H522 M836 72 H1032 V118 H1264"
          fill="none"
          stroke="#81D4FA"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

export default function LatestNewsSection() {
  const activeLocale = asLocale(useLocale());
  const copy = latestNewsCopyByLocale[activeLocale];

  return (
    <section id="latest-news" className="relative overflow-hidden bg-[#37474F] py-10 text-white sm:py-12">
      <NewsSignalGraphic />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-4 lg:grid-cols-[0.42fr_0.58fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A5D6A7]">
              {copy.eyebrow}
            </p>
            <h2 className="mt-2 max-w-3xl text-2xl font-light leading-tight text-white md:text-3xl">
              {copy.heading}
            </h2>
          </div>
          <div>
            <p className="text-sm leading-6 text-white/68">{copy.body}</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/42">
              {copy.checked}
            </p>
          </div>
        </div>

        <div className="mt-6 flex snap-x gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:gap-0 md:overflow-hidden md:border md:border-white/10 md:bg-white/10 md:pb-0">
          {copy.articles.map((article) => (
            <article
              key={article.href}
              className="w-[82vw] max-w-[21rem] flex-none snap-start border border-white/10 bg-[#37474F]/95 md:w-auto md:max-w-none md:border-b md:border-l-0 md:border-t-0 md:border-r md:even:border-r-0 md:[&:nth-last-child(-n+2)]:border-b-0"
            >
              <a
                href={article.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid h-full gap-3 p-4 transition-colors hover:bg-white/[0.06] sm:p-5"
              >
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.14em]">
                  <span className="text-[#A5D6A7]">{article.tag}</span>
                  <span className="text-white/34">/</span>
                  <span className="text-white/48">{article.date}</span>
                </div>
                <h3 className="overflow-hidden text-base font-light leading-snug text-white [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] md:text-lg">
                  {article.title}
                </h3>
                <p className="hidden text-sm leading-6 text-white/64 xl:block">{article.summary}</p>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/42">
                    {article.source}
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#A5D6A7]">
                    {copy.readArticle}
                    <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
