import React from 'react';
import Image from 'next/image';
import type { ProductSummary } from '../content/products';
import type { Locale } from '../content/locale';
import { localizePath } from '../content/paths';

type ProductCardCopy = {
  requestDemo: string;
};

const cardCopyByLocale: Record<Locale, ProductCardCopy> = {
  en: {
    requestDemo: 'Request demo',
  },
  sv: {
    requestDemo: 'Beg\u00e4r demo',
  },
  fr: {
    requestDemo: 'Demander une d\u00e9mo',
  },
  de: {
    requestDemo: 'Demo anfragen',
  },
};

function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function ExternalIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

export default function ProductCard({ product, locale }: { product: ProductSummary; locale: Locale }) {
  const copy = cardCopyByLocale[locale];
  const isMct = product.slug === 'mct';

  return (
    <article className="group grid overflow-hidden rounded-sm border border-[#1F3529]/12 bg-white shadow-[0_18px_54px_rgba(31,53,41,0.08)] transition-transform duration-500 hover:-translate-y-1 lg:grid-cols-[0.44fr_0.56fr]">
      <div className="relative min-h-[260px] overflow-hidden bg-[#1F3529]">
        <Image
          src={product.image}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-cover opacity-50 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-br from-[#1F3529]/92 via-[#1F3529]/68 to-[#2E7D32]/58" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(165,214,167,0.28),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08)_0,transparent_42%)]" />

        <div className="relative z-10 flex h-full min-h-[260px] flex-col justify-between p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <span className="rounded-sm border border-white/18 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white">
              {product.status ?? product.acronym}
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-white/48">{product.acronym}</span>
          </div>

          {product.logo ? (
            <div className={`w-full drop-shadow-[0_14px_28px_rgba(0,0,0,0.40)] ${isMct ? 'max-w-[420px]' : 'max-w-[480px]'}`}>
              <Image
                src={product.logo}
                alt={`${product.name} logo`}
                width={isMct ? 720 : 840}
                height={isMct ? 343 : 280}
                className="h-auto w-full object-contain"
                unoptimized
              />
            </div>
          ) : (
            <h2 className="max-w-md text-5xl font-semibold text-white">{product.name}</h2>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-9">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2E7D32]">{product.acronym}</p>
          <h2 className="mt-4 text-3xl font-light leading-tight text-[#1F3529] md:text-4xl">{product.name}</h2>
          <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-[#37474F]/72">{product.tagline}</p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#37474F]/78">{product.cardCopy}</p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-4">
          {isMct && (
            <a
              href={localizePath(locale, '/contact')}
              className="inline-flex items-center justify-center gap-3 rounded-sm bg-[#2E7D32] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1F5B25]"
            >
              <span>{copy.requestDemo}</span>
              <ArrowIcon />
            </a>
          )}

          <a
            href={localizePath(locale, product.primaryCta.href)}
            className={`inline-flex items-center justify-center gap-3 rounded-sm px-6 py-3 text-sm font-semibold transition-colors ${
              isMct
                ? 'border border-[#2E7D32]/35 text-[#2E7D32] hover:border-[#2E7D32] hover:bg-[#2E7D32]/6'
                : 'bg-[#37474F] text-white hover:bg-[#1F3529]'
            }`}
          >
            <span>{product.primaryCta.label}</span>
            <ArrowIcon />
          </a>

          {product.liveCta && (
            <a
              href={product.liveCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-sm px-1 py-3 text-sm font-semibold text-[#37474F]/70 transition-colors hover:text-[#2E7D32]"
            >
              <span>{product.liveCta.label}</span>
              <ExternalIcon />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
