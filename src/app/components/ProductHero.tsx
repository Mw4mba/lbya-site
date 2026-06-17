import React from 'react';
import Image from 'next/image';

interface Cta {
  label: string;
  href: string;
  external?: boolean;
}

export default function ProductHero({
  eyebrow,
  title,
  tagline,
  body,
  image,
  primaryCta,
  secondaryCta,
  liveCta,
}: {
  eyebrow?: string;
  title: string;
  tagline: string;
  body?: string;
  image?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  liveCta?: Cta;
}) {
  const renderCta = (cta: Cta, variant: 'solid' | 'outline' | 'ghost') => {
    const base = 'inline-flex items-center justify-center gap-2 px-7 py-3.5 font-medium rounded-sm transition-all';
    const styles =
      variant === 'solid'
        ? 'bg-white text-[#2E7D32] hover:bg-[#A5D6A7]'
        : variant === 'outline'
        ? 'border-2 border-white text-white hover:bg-white hover:text-[#2E7D32]'
        : 'text-white/80 hover:text-white underline-offset-4 hover:underline';
    return (
      <a
        key={cta.label}
        href={cta.href}
        {...(cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={`${base} ${styles}`}
      >
        <span>{cta.label}</span>
        {cta.external ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        )}
      </a>
    );
  };

  return (
    <section className="relative bg-[#2E7D32] px-6 pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {image && (
        <div className="absolute inset-0">
          <Image src={image} alt="" fill sizes="100vw" className="object-cover opacity-20" priority />
          <div className="absolute inset-0 bg-linear-to-t from-[#2E7D32] via-[#2E7D32]/70 to-[#2E7D32]/40" />
        </div>
      )}
      <div className="relative z-10 max-w-7xl mx-auto">
        {eyebrow && (
          <p className="text-white/70 text-sm font-medium uppercase tracking-widest mb-4">{eyebrow}</p>
        )}
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-none mb-6 max-w-4xl">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 font-light leading-snug max-w-2xl mb-6">
          {tagline}
        </p>
        {body && (
          <p className="text-base md:text-lg text-white/80 font-light leading-relaxed max-w-3xl mb-10">
            {body}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-4">
          {primaryCta && renderCta(primaryCta, 'solid')}
          {secondaryCta && renderCta(secondaryCta, 'outline')}
          {liveCta && renderCta({ ...liveCta, external: true }, 'ghost')}
        </div>
      </div>
    </section>
  );
}
