'use client';

import React from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { getProducts, type ProductSummary } from '../content/products';
import { asLocale, type Locale } from '../content/locale';
import { localizePath } from '../content/paths';

type ProductShowcaseCopy = {
  eyebrow: string;
  heading: string;
  body: string;
  learnMoreCta: string;
  requestDemoCta: string;
  briefBySlug: Record<string, string>;
};

const productShowcaseCopyByLocale: Record<Locale, ProductShowcaseCopy> = {
  en: {
    eyebrow: 'Products',
    heading: 'Products built for control, not noise.',
    body: 'Start with the product that matches your work. MCT is ready to demo for logistics control; NBC is still taking shape as a focused BIM control product.',
    learnMoreCta: 'Learn more',
    requestDemoCta: 'Request demo',
    briefBySlug: {
      'mct':
        'Ready for multimodal logistics coordination, document control, transporter records, quote comparison, status tracking, reporting, and operational evidence.',
      'nbc':
        'An early-stage BIM control product for teams that need clearer model information, responsibility, and decision evidence.',
    },
  },
  sv: {
    eyebrow: 'Produkter',
    heading: 'En produkt byggd f\u00f6r tydlig BIM-kontroll.',
    body: 'NBC formas som en fokuserad BIM-kontrollprodukt f\u00f6r team som beh\u00f6ver b\u00e4ttre ansvar, modellinformation och beslutsunderlag.',
    learnMoreCta: 'L\u00e4s mer',
    requestDemoCta: 'Beg\u00e4r demo',
    briefBySlug: {
      'mct':
        'Redo f\u00f6r multimodal logistiksamordning, dokumentkontroll, transport\u00f6rsregister, offertj\u00e4mf\u00f6relse, statusuppf\u00f6ljning, rapportering och operativa underlag.',
      'nbc':
        'En BIM-kontrollprodukt i tidig fas f\u00f6r team som beh\u00f6ver tydligare modellinformation, ansvar och beslutsunderlag.',
    },
  },
  fr: {
    eyebrow: 'Produits',
    heading: 'Des produits con\u00e7us pour le contr\u00f4le, pas pour la confusion.',
    body: 'Commencez par le produit qui correspond \u00e0 votre travail. MCT est pr\u00eat pour une d\u00e9mo de contr\u00f4le logistique ; NBC prend encore forme comme produit BIM cibl\u00e9.',
    learnMoreCta: 'En savoir plus',
    requestDemoCta: 'Demander une d\u00e9mo',
    briefBySlug: {
      'mct':
        'Pr\u00eat pour la coordination logistique multimodale, le contr\u00f4le documentaire, les dossiers transporteurs, la comparaison de devis, le suivi de statut, les rapports et les preuves op\u00e9rationnelles.',
      'nbc':
        'Un produit de contr\u00f4le BIM en phase initiale pour les \u00e9quipes qui veulent une information de mod\u00e8le, des responsabilit\u00e9s et des preuves de d\u00e9cision plus claires.',
    },
  },
  de: {
    eyebrow: 'Produkte',
    heading: 'Produkte f\u00fcr Kontrolle statt Rauschen.',
    body: 'Beginnen Sie mit dem Produkt, das zu Ihrer Arbeit passt. MCT ist heute f\u00fcr Logistikkontrolle demo-bereit; NBC entwickelt sich weiter als fokussiertes BIM-Kontrollprodukt.',
    learnMoreCta: 'Mehr erfahren',
    requestDemoCta: 'Demo anfragen',
    briefBySlug: {
      'mct':
        'Bereit f\u00fcr multimodale Logistikkoordination, Dokumentenkontrolle, Transporteurdaten, Angebotsvergleich, Statusverfolgung, Reporting und operative Nachweise.',
      'nbc':
        'Ein BIM-Kontrollprodukt in fr\u00fcher Phase f\u00fcr Teams, die klarere Modellinformationen, Verantwortlichkeit und Entscheidungsnachweise brauchen.',
    },
  },
};

function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function ProductsSignalLayer() {
  const signalLines = [
    'M24 210 C174 110 300 196 438 124 C576 52 730 80 896 152 C1052 220 1188 112 1416 74',
    'M72 342 C254 304 318 228 486 238 C684 250 754 356 930 318 C1108 280 1204 210 1394 248',
    'M18 456 C196 462 314 398 440 326 C622 222 756 398 920 382 C1090 366 1198 478 1422 404',
  ];
  const futureLines = [
    'M214 86 H344 V138 H510',
    'M846 90 H1012 V142 H1228',
    'M596 438 H772 V386 H984',
  ];
  const nodes = [
    { x: 344, y: 138, color: '#2E7D32', delay: '0.2s' },
    { x: 510, y: 138, color: '#81D4FA', delay: '0.8s' },
    { x: 772, y: 386, color: '#2E7D32', delay: '1.2s' },
    { x: 1012, y: 142, color: '#81D4FA', delay: '1.7s' },
    { x: 1228, y: 142, color: '#F5C469', delay: '2.2s' },
  ];

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
        className="hero-grid-scan absolute inset-y-0 right-0 hidden w-[72%] opacity-35 md:block"
        style={{
          backgroundImage:
            'linear-gradient(rgba(129, 212, 250, 0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(46, 125, 50, 0.12) 1px, transparent 1px)',
          backgroundSize: '46px 46px',
          maskImage: 'linear-gradient(90deg, transparent, black 20%, black 88%, transparent)',
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0)_0%,rgba(165,214,167,0.08)_45%,rgba(129,212,250,0.10)_100%)]" />
      <svg
        className="absolute inset-x-0 top-4 h-[82%] w-full opacity-70"
        viewBox="0 0 1440 520"
      >
        <defs>
          <linearGradient id="products-home-signal" x1="0%" y1="68%" x2="100%" y2="24%">
            <stop offset="0%" stopColor="#2E7D32" stopOpacity="0.12" />
            <stop offset="45%" stopColor="#2E7D32" stopOpacity="0.42" />
          </linearGradient>
          <linearGradient id="products-home-soft" x1="0%" y1="35%" x2="100%" y2="65%">
            <stop offset="0%" stopColor="#A5D6A7" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#81D4FA" stopOpacity="0.34" />
          </linearGradient>
        </defs>

        {signalLines.map((line, index) => (
          <path
            key={line}
            className="hero-signal-line"
            d={line}
            fill="none"
            stroke="url(#products-home-signal)"
            strokeLinecap="round"
            strokeWidth={index === 1 ? 1.6 : 2}
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {futureLines.map((line) => (
          <path
            key={line}
            className="hero-future-line"
            d={line}
            fill="none"
            stroke="url(#products-home-soft)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.4"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {nodes.map((node) => (
          <rect
            key={`${node.x}-${node.y}`}
            className="hero-signal-node"
            x={node.x}
            y={node.y}
            width="9"
            height="9"
            fill="none"
            stroke={node.color}
            strokeWidth="1.6"
            vectorEffect="non-scaling-stroke"
            style={{ animationDelay: node.delay }}
          />
        ))}
      </svg>
    </div>
  );
}

function ProductLogo({ product }: { product: ProductSummary }) {
  if (!product.logo) {
    return (
      <span className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
        {product.acronym}
      </span>
    );
  }

  const dimensions = product.slug === 'mct'
    ? { width: 720, height: 343 }
    : { width: 840, height: 280 };

  return (
    <Image
      src={product.logo}
      alt={`${product.name} logo`}
      width={dimensions.width}
      height={dimensions.height}
      className="max-h-12 max-w-full object-contain"
      style={{ width: 'auto', height: 'auto' }}
      unoptimized
    />
  );
}

function CompactProductCard({
  product,
  description,
  learnMore,
  requestDemo,
  locale,
}: {
  product: ProductSummary;
  description: string;
  learnMore: string;
  requestDemo: string;
  locale: Locale;
}) {
  const isMct = product.slug === 'mct';

  return (
    <article className="w-full flex-none snap-start overflow-hidden border border-[#1F3529]/12 bg-white shadow-[0_18px_45px_rgba(31,53,41,0.08)] md:w-auto">
      <div className="grid h-full grid-rows-[6.5rem_1fr]">
        <div className="relative flex items-center justify-center overflow-hidden bg-[#37474F] p-4">
          <Image
            src={product.image}
            alt=""
            fill
            sizes="(max-width: 768px) 80vw, 42vw"
            className="object-cover opacity-24"
          />
          <div className="absolute inset-0 bg-linear-to-br from-[#37474F]/92 via-[#37474F]/72 to-[#2E7D32]/45" />
          <div className="relative z-10 flex w-full justify-center">
            <ProductLogo product={product} />
          </div>
        </div>

        <div className="flex flex-col p-4 sm:p-5">
          <p className="overflow-hidden text-sm leading-6 text-[#37474F]/74 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4]">
            {description}
          </p>

          <div className="mt-auto flex flex-wrap gap-3 pt-5">
            <a
              href={localizePath(locale, product.href)}
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#1F3529] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2E7D32]"
            >
              <span>{learnMore}</span>
              <ArrowIcon />
            </a>

            {isMct && (
              <a
                href={localizePath(locale, '/contact')}
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-[#2E7D32]/35 px-4 py-2.5 text-sm font-semibold text-[#2E7D32] transition-colors hover:border-[#2E7D32] hover:bg-[#2E7D32]/6"
              >
                <span>{requestDemo}</span>
                <ArrowIcon />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function SingleProductShowcase({
  product,
  description,
  learnMore,
  requestDemo,
  locale,
}: {
  product: ProductSummary;
  description: string;
  learnMore: string;
  requestDemo: string;
  locale: Locale;
}) {
  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#2E7D32]">
          En produkt
        </p>
        <h3 className="mt-4 text-4xl font-semibold tracking-tight text-[#1F3529] md:text-5xl">
          {product.name}
        </h3>
        <p className="mt-5 text-lg leading-8 text-[#37474F]/82">
          {product.tagline}
        </p>
        <p className="mt-6 text-sm leading-7 text-[#37474F]/75">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={localizePath(locale, product.href)}
            className="inline-flex items-center gap-2 rounded-sm bg-[#1F3529] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2E7D32]"
          >
            <span>{learnMore}</span>
            <ArrowIcon />
          </a>
          <a
            href={localizePath(locale, '/contact')}
            className="inline-flex items-center gap-2 rounded-sm border border-[#2E7D32]/40 bg-white px-5 py-3 text-sm font-semibold text-[#2E7D32] transition-colors hover:bg-[#2E7D32]/10"
          >
            <span>{requestDemo}</span>
            <ArrowIcon />
          </a>
        </div>
      </div>

      <article className="overflow-hidden rounded-4xl border border-[#1F3529]/12 bg-[#F7FAF7] shadow-[0_28px_60px_rgba(31,53,41,0.08)]">
        <div className="relative h-104 overflow-hidden sm:h-120">
          <Image
            src={product.image}
            alt=""
            fill
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-linear-to-br from-[#2E7D32]/15 via-[#1F3529]/10 to-transparent" />
          <div className="absolute inset-0 flex items-end p-8">
            <div className="w-full rounded-[1.75rem] bg-white/92 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex rounded-full bg-[#E8F5E9] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#2E7D32]">
                  {product.status}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#37474F]/60">
                  {product.acronym}
                </span>
              </div>
              <h4 className="mt-5 text-3xl font-semibold text-[#1F3529]">
                {product.name}
              </h4>
              <p className="mt-4 text-sm leading-7 text-[#37474F]/80">
                {product.cardCopy}
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default function ProductsShowcase() {
  const locale = useLocale();
  const activeLocale = asLocale(locale);
  const copy = productShowcaseCopyByLocale[activeLocale];
  const products = getProducts(locale);
  const showSingleProductLayout = activeLocale === 'sv' && products.length === 1;

  return (
    <section id="products" aria-label="Products" className="relative overflow-hidden bg-white py-12 sm:py-14">
      <ProductsSignalLayer />
      <div className="absolute inset-x-0 top-0 h-px bg-[#1F3529]/12" />
      <div className="absolute bottom-0 left-0 top-0 hidden w-3 bg-[#37474F] lg:block" aria-hidden="true" />

      <div
        className="relative z-10"
        style={{
          marginLeft: 'clamp(1.5rem, calc(9.14vw - 0.354rem), 7.875rem)',
          marginRight: 'clamp(1.5rem, calc(11.43vw - 1.286rem), 9rem)',
        }}
      >
        <div className="grid gap-4 lg:grid-cols-[0.34fr_0.66fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#2E7D32]">
              {copy.eyebrow}
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-light leading-tight text-[#1F3529] md:text-4xl">
              {copy.heading}
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-[#37474F]/72 lg:justify-self-end">
            {copy.body}
          </p>
        </div>

        {showSingleProductLayout ? (
          <SingleProductShowcase
            product={products[0]}
            description={copy.briefBySlug[products[0].slug] ?? products[0].tagline}
            learnMore={copy.learnMoreCta}
            requestDemo={copy.requestDemoCta}
            locale={activeLocale}
          />
        ) : (
          <div className="mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:overflow-visible md:pb-0">
            {products.map((product) => (
              <CompactProductCard
                key={product.slug}
                product={product}
                description={copy.briefBySlug[product.slug] ?? product.tagline}
                learnMore={copy.learnMoreCta}
                requestDemo={copy.requestDemoCta}
                locale={activeLocale}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
