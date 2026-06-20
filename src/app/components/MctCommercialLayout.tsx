import Image from 'next/image';
import type { ReactNode } from 'react';
import MctHeroInteractiveBackdrop from './MctHeroInteractiveBackdrop';
import { pageFrameStyle } from './LayoutFrame';
import { getMctNav, type MctNavItem } from '../content/mctCommercial';
import { localizePath } from '../content/paths';
import type { Locale } from '../content/locale';

export const mctCommercialFrameStyle = pageFrameStyle;

export function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

export function CheckIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function MctProductNav({
  locale,
  activeKey,
}: {
  locale: Locale;
  activeKey: MctNavItem['key'];
}) {
  const nav = getMctNav(locale);

  return (
    <div className="border-y border-[#1F3529]/10 bg-white">
      <nav
        className="flex gap-2 overflow-x-auto py-3"
        style={mctCommercialFrameStyle}
        aria-label="MCT product navigation"
      >
        {nav.map((item) => {
          const isActive = item.key === activeKey;
          return (
            <a
              key={item.key}
              href={localizePath(locale, item.href)}
              className={`whitespace-nowrap rounded-sm px-4 py-2 text-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-[#1F3529] text-white'
                  : 'text-[#37474F]/70 hover:bg-[#2E7D32]/8 hover:text-[#1F3529]'
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </div>
  );
}

export function MctSubpageHero({
  locale,
  activeKey,
  eyebrow,
  title,
  body,
  primaryLabel,
  primaryHref = '/contact',
  secondaryLabel,
  secondaryHref = '/products/mct/pricing',
  children,
}: {
  locale: Locale;
  activeKey: MctNavItem['key'];
  eyebrow: string;
  title: string;
  body: string;
  primaryLabel: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  children?: ReactNode;
}) {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#37474F] py-14 lg:py-16">
        <Image
          src="/hero-logistics-route.jpg"
          alt=""
          fill
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover opacity-24"
          priority
        />
        <div className="absolute inset-0 -z-10 bg-[#37474F]/82" />
        <div
          className="absolute inset-0 -z-10 opacity-80"
          style={{
            background:
              'linear-gradient(90deg, rgba(55,71,79,0.96) 0%, rgba(55,71,79,0.82) 52%, rgba(46,125,50,0.36) 100%)',
          }}
        />
        <MctHeroInteractiveBackdrop />

        <div
          className="relative z-10 grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(280px,0.55fr)]"
          style={mctCommercialFrameStyle}
        >
          <div className="max-w-3xl">
            <div className="mb-5 w-full max-w-[250px] drop-shadow-[0_18px_34px_rgba(0,0,0,0.38)] sm:max-w-[310px]">
              <Image
                src="/images/products/mct-logo-current.png"
                alt="MCT logo"
                width={840}
                height={400}
                className="h-auto w-full object-contain"
                priority
                unoptimized
              />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A5D6A7]">{eyebrow}</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[0.98] tracking-tight text-white md:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/78 md:text-lg">{body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={localizePath(locale, primaryHref)}
                className="inline-flex items-center justify-center gap-3 rounded-sm bg-white px-6 py-3 text-sm font-semibold text-[#1F3529] transition-colors hover:bg-[#A5D6A7]"
              >
                <span>{primaryLabel}</span>
                <ArrowIcon />
              </a>
              {secondaryLabel && (
                <a
                  href={localizePath(locale, secondaryHref)}
                  className="inline-flex items-center justify-center gap-3 rounded-sm border border-white/28 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-[#A5D6A7] hover:bg-white/10"
                >
                  <span>{secondaryLabel}</span>
                  <ArrowIcon />
                </a>
              )}
            </div>
          </div>

          <div className="border-l-2 border-[#A5D6A7] bg-[#37474F]/42 p-5 text-white shadow-[0_20px_70px_rgba(0,0,0,0.18)] backdrop-blur-sm">
            {children}
          </div>
        </div>
      </section>
      <MctProductNav locale={locale} activeKey={activeKey} />
    </>
  );
}

export function MctSectionIntro({
  eyebrow,
  heading,
  body,
  dark = false,
}: {
  eyebrow: string;
  heading: string;
  body: string;
  dark?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${dark ? 'text-[#A5D6A7]' : 'text-[#2E7D32]'}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-4 text-3xl font-light leading-tight md:text-5xl ${dark ? 'text-white' : 'text-[#1F3529]'}`}>
        {heading}
      </h2>
      <p className={`mt-5 text-base leading-8 md:text-lg ${dark ? 'text-white/72' : 'text-[#37474F]/72'}`}>
        {body}
      </p>
    </div>
  );
}

export function MctCtaBand({
  locale,
  heading,
  body,
  primaryLabel,
  primaryHref = '/contact',
  secondaryLabel,
  secondaryHref = '/products/mct/pricing',
}: {
  locale: Locale;
  heading: string;
  body: string;
  primaryLabel: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#37474F] py-20">
      <Image
        src="/hero-logistics-route.jpg"
        alt=""
        fill
        sizes="100vw"
        className="absolute inset-0 object-cover opacity-16"
      />
      <div className="absolute inset-0 bg-[#37474F]/84" />
      <div className="relative text-center" style={mctCommercialFrameStyle}>
        <h2 className="mx-auto max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">{heading}</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/74">{body}</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href={localizePath(locale, primaryHref)}
            className="inline-flex items-center justify-center gap-3 rounded-sm bg-white px-7 py-3.5 text-sm font-semibold text-[#1F3529] transition-colors hover:bg-[#A5D6A7]"
          >
            <span>{primaryLabel}</span>
            <ArrowIcon />
          </a>
          {secondaryLabel && (
            <a
              href={localizePath(locale, secondaryHref)}
              className="inline-flex items-center justify-center gap-3 rounded-sm border border-white/28 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-[#A5D6A7] hover:bg-white/10"
            >
              <span>{secondaryLabel}</span>
              <ArrowIcon />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
