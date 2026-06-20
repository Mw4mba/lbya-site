'use client';

import React from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { asLocale, type Locale } from '../content/locale';
import { getProducts } from '../content/products';
import { getSolutions } from '../content/solutions';
import Wordmark from './Wordmark';

const LINKEDIN_URL = 'https://www.linkedin.com/company/lbya';

type FooterCopy = {
  tagline: string;
  productsTitle: string;
  solutionsTitle: string;
  companyTitle: string;
  contactTitle: string;
  career: string;
  about: string;
  contact: string;
  privacy: string;
  cookies: string;
  consent: string;
  policiesTerms: string;
  linkedIn: string;
  address: string;
  registered: string;
  rights: string;
};

const footerCopyByLocale: Record<Locale, FooterCopy> = {
  en: {
    tagline: 'Rooted in Nature, Designed for the Future.',
    productsTitle: 'Products',
    solutionsTitle: 'Solutions',
    companyTitle: 'Company',
    contactTitle: 'Contact',
    career: 'Career',
    about: 'About LBYA',
    contact: 'Contact form',
    privacy: 'Privacy',
    cookies: 'Cookies',
    consent: 'Consent',
    policiesTerms: 'Policies & Terms',
    linkedIn: 'LinkedIn',
    address: 'Gamla Enköpingsvägen 150\n174 64 Sundbyberg',
    registered: 'LBYA AB',
    rights: 'All rights reserved.',
  },
  sv: {
    tagline: 'Rooted in Nature, Designed for the Future.',
    productsTitle: 'Produkter',
    solutionsTitle: 'L\u00f6sningar',
    companyTitle: 'F\u00f6retag',
    contactTitle: 'Kontakt',
    career: 'Karri\u00e4r',
    about: 'Om LBYA',
    contact: 'Kontaktformulär',
    privacy: 'Integritet',
    cookies: 'Cookies',
    consent: 'Samtycke',
    policiesTerms: 'Policyer och villkor',
    linkedIn: 'LinkedIn',
    address: 'Gamla Enk\u00f6pingsv\u00e4gen 150\n174 64 Sundbyberg',
    registered: 'LBYA AB',
    rights: 'Alla r\u00e4ttigheter f\u00f6rbeh\u00e5llna.',
  },
  fr: {
    tagline: 'Rooted in Nature, Designed for the Future.',
    productsTitle: 'Produits',
    solutionsTitle: 'Solutions',
    companyTitle: 'Entreprise',
    contactTitle: 'Contact',
    career: 'Carri\u00e8re',
    about: '\u00c0 propos de LBYA',
    contact: 'Formulaire de contact',
    privacy: 'Confidentialit\u00e9',
    cookies: 'Cookies',
    consent: 'Consentement',
    policiesTerms: 'Politiques et conditions',
    linkedIn: 'LinkedIn',
    address: 'Gamla Enk\u00f6pingsv\u00e4gen 150\n174 64 Sundbyberg',
    registered: 'LBYA AB',
    rights: 'Tous droits r\u00e9serv\u00e9s.',
  },
  de: {
    tagline: 'Rooted in Nature, Designed for the Future.',
    productsTitle: 'Produkte',
    solutionsTitle: 'L\u00f6sungen',
    companyTitle: 'Unternehmen',
    contactTitle: 'Kontakt',
    career: 'Karriere',
    about: '\u00dcber LBYA',
    contact: 'Kontaktformular',
    privacy: 'Datenschutz',
    cookies: 'Cookies',
    consent: 'Einwilligung',
    policiesTerms: 'Policies & Terms',
    linkedIn: 'LinkedIn',
    address: 'Gamla Enk\u00f6pingsv\u00e4gen 150\n174 64 Sundbyberg',
    registered: 'LBYA AB',
    rights: 'Alle Rechte vorbehalten.',
  },
};

function localizePath(locale: Locale, href: string) {
  if (!href.startsWith('/')) return href;
  if (href === '/') return `/${locale}`;
  return `/${locale}${href}`;
}

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="text-sm leading-6 text-white/68 transition-colors hover:text-[#A5D6A7]"
    >
      {children}
    </a>
  );
}

function ArrowIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.94 8.98H3.56V20h3.38V8.98ZM5.25 4C4.17 4 3.3 4.86 3.3 5.92c0 1.08.87 1.93 1.95 1.93s1.95-.85 1.95-1.93C7.2 4.86 6.33 4 5.25 4ZM20.7 13.68c0-3.32-1.78-4.86-4.15-4.86a3.58 3.58 0 0 0-3.22 1.77h-.05V8.98h-3.24V20h3.37v-5.45c0-1.44.27-2.83 2.05-2.83 1.76 0 1.78 1.64 1.78 2.92V20h3.37l.09-6.32Z" />
    </svg>
  );
}

export default function Footer() {
  const activeLocale = asLocale(useLocale());
  const copy = footerCopyByLocale[activeLocale];
  const products = getProducts(activeLocale);
  const solutions = getSolutions(activeLocale);
  const currentYear = new Date().getFullYear();
  const footerRef = React.useRef<HTMLElement>(null);

  const handlePointerMove = React.useCallback((event: React.PointerEvent<HTMLElement>) => {
    const footer = footerRef.current;
    if (!footer) return;
    const rect = footer.getBoundingClientRect();
    footer.style.setProperty('--footer-fx-x', `${event.clientX - rect.left}px`);
    footer.style.setProperty('--footer-fx-y', `${event.clientY - rect.top}px`);
  }, []);

  const handlePointerLeave = React.useCallback(() => {
    const footer = footerRef.current;
    if (!footer) return;
    footer.style.setProperty('--footer-fx-x', '50%');
    footer.style.setProperty('--footer-fx-y', '0%');
  }, []);

  return (
    <footer
      ref={footerRef}
      id="site-footer"
      className="relative overflow-hidden border-t border-white/10 bg-[#37474F] text-white"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        '--footer-fx-x': '50%',
        '--footer-fx-y': '0%',
      } as React.CSSProperties}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(129,212,250,0.16),transparent_45%),radial-gradient(circle_at_85%_0%,rgba(165,214,167,0.14),transparent_42%)]" />
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background:
              'radial-gradient(360px circle at var(--footer-fx-x) var(--footer-fx-y), rgba(129,212,250,0.24), transparent 62%), radial-gradient(420px circle at calc(var(--footer-fx-x) - 18%) calc(var(--footer-fx-y) + 14%), rgba(165,214,167,0.18), transparent 66%)',
          }}
        />
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#A5D6A7]/60 to-transparent" />

        {/* Mobile: compact organic terrain */}
        <svg className="absolute inset-x-0 bottom-0 h-28 w-full sm:hidden" viewBox="0 0 1200 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="footer-hill-mobile" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4F7378" stopOpacity="0.26" />
              <stop offset="100%" stopColor="#3B5F69" stopOpacity="0.22" />
            </linearGradient>
            <linearGradient id="footer-root-mobile" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A5D6A7" stopOpacity="0.26" />
              <stop offset="100%" stopColor="#81D4FA" stopOpacity="0.22" />
            </linearGradient>
          </defs>
          <path d="M0 118 C200 102 300 86 466 92 C628 98 760 124 924 116 C1060 110 1148 92 1200 88 V180 H0 Z" fill="url(#footer-hill-mobile)" />
          <path d="M48 98 C196 78 356 72 510 84 C664 96 820 120 968 112 C1070 106 1140 96 1182 90" fill="none" stroke="url(#footer-root-mobile)" strokeWidth="3.2" strokeLinecap="round" />
        </svg>

        {/* Desktop: layered hills and root lines */}
        <svg className="hidden sm:absolute sm:inset-0 sm:h-full sm:w-full" viewBox="0 0 1200 320" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="footer-hill-front" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#41636C" stopOpacity="0.34" />
              <stop offset="100%" stopColor="#35545D" stopOpacity="0.28" />
            </linearGradient>
            <linearGradient id="footer-hill-back" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5C7D84" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#4F707B" stopOpacity="0.16" />
            </linearGradient>
            <linearGradient id="footer-root-lines" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A5D6A7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#81D4FA" stopOpacity="0.24" />
            </linearGradient>
            <linearGradient id="footer-leaf-soft" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A5D6A7" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#81D4FA" stopOpacity="0.14" />
            </linearGradient>
          </defs>
          <path d="M0 226 C148 202 264 178 396 182 C544 186 652 226 794 230 C922 234 1060 208 1200 174 V320 H0 Z" fill="url(#footer-hill-front)" />
          <path d="M0 190 C150 174 258 146 410 150 C552 154 678 192 826 192 C980 192 1084 170 1200 144 V320 H0 Z" fill="url(#footer-hill-back)" />
          <path d="M62 204 C182 180 318 168 456 180 C594 192 736 222 868 214 C1008 206 1114 184 1176 170" fill="none" stroke="url(#footer-root-lines)" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M118 238 C238 220 362 214 482 226 C614 238 746 260 866 254 C972 248 1070 230 1152 216" fill="none" stroke="url(#footer-root-lines)" strokeWidth="3" strokeLinecap="round" opacity="0.74" />
          <g transform="translate(174,92) scale(0.86)">
            <path d="M0 12 C26 -11 54 -11 78 12 C54 35 26 35 0 12 Z" fill="url(#footer-leaf-soft)" />
          </g>
          <g transform="translate(820,68) scale(0.78)">
            <path d="M0 12 C26 -11 54 -11 78 12 C54 35 26 35 0 12 Z" fill="url(#footer-leaf-soft)" />
          </g>
        </svg>
      </div>

      <div
        className="relative z-10"
        style={{
          marginLeft: 'clamp(1.5rem, calc(9.14vw - 0.354rem), 7.875rem)',
          marginRight: 'clamp(1.5rem, calc(11.43vw - 1.286rem), 9rem)',
        }}
      >
        <div className="flex flex-col items-center py-12 text-center sm:py-16">
          <a
            href={localizePath(activeLocale, '/')}
            className="inline-flex flex-col items-center"
            aria-label="LBYA home"
          >
            <span className="relative block h-28 w-28 overflow-hidden sm:h-36 sm:w-36">
              <Image
                src="/logoC.svg"
                alt=""
                fill
                sizes="(max-width: 640px) 112px, 144px"
                className="object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </span>
            <Wordmark className="mt-7 h-10 w-44 sm:h-12 sm:w-56" sizes="224px" />
          </a>
          <p className="mt-6 max-w-3xl text-2xl font-light leading-tight text-white sm:text-4xl">
            {copy.tagline}
          </p>
        </div>

        <div className="grid gap-px overflow-hidden border-y border-white/12 bg-white/12 md:grid-cols-2 xl:grid-cols-4">
            <section aria-labelledby="footer-products">
              <div className="h-full bg-[#37474F] p-6 sm:p-7">
              <h2 id="footer-products" className="text-sm font-semibold uppercase tracking-[0.16em] text-[#A5D6A7]">
                {copy.productsTitle}
              </h2>
              <nav className="mt-5 flex flex-col gap-3" aria-label={copy.productsTitle}>
                {products.map((product) => (
                  <a
                    key={product.slug}
                    href={localizePath(activeLocale, product.href)}
                    className="group flex items-center justify-between gap-4 text-sm font-semibold text-white/84 transition-colors hover:text-[#A5D6A7]"
                  >
                    <span>{product.acronym}</span>
                    <ArrowIcon />
                  </a>
                ))}
              </nav>
              </div>
            </section>

            <section aria-labelledby="footer-solutions">
              <div className="h-full bg-[#37474F] p-6 sm:p-7">
              <h2 id="footer-solutions" className="text-sm font-semibold uppercase tracking-[0.16em] text-[#A5D6A7]">
                {copy.solutionsTitle}
              </h2>
              <nav className="mt-5 flex flex-col gap-3" aria-label={copy.solutionsTitle}>
                {solutions.map((solution) => (
                  <FooterLink key={solution.slug} href={localizePath(activeLocale, solution.href)}>
                    {solution.title}
                  </FooterLink>
                ))}
              </nav>
              </div>
            </section>

            <section aria-labelledby="footer-company">
              <div className="h-full bg-[#37474F] p-6 sm:p-7">
              <h2 id="footer-company" className="text-sm font-semibold uppercase tracking-[0.16em] text-[#A5D6A7]">
                {copy.companyTitle}
              </h2>
              <nav className="mt-5 flex flex-col gap-3" aria-label={copy.companyTitle}>
                <FooterLink href={localizePath(activeLocale, '/careers')}>{copy.career}</FooterLink>
                <FooterLink href={localizePath(activeLocale, '/about')}>{copy.about}</FooterLink>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={copy.linkedIn}
                  className="group inline-flex w-fit items-center gap-2 text-sm font-semibold leading-6 text-white/72 transition-colors hover:text-[#A5D6A7]"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-white/16 bg-white/6 text-white transition-colors group-hover:border-[#A5D6A7]/50">
                    <LinkedInIcon />
                  </span>
                  <span>{copy.linkedIn}</span>
                </a>
              </nav>
              </div>
            </section>

            <section aria-labelledby="footer-contact">
              <div className="h-full bg-[#37474F] p-6 sm:p-7">
              <h2 id="footer-contact" className="text-sm font-semibold uppercase tracking-[0.16em] text-[#A5D6A7]">
                {copy.contactTitle}
              </h2>
              <div className="mt-5 flex flex-col gap-3">
                <FooterLink href="mailto:info@lbya.se">info@lbya.se</FooterLink>
                <FooterLink href={localizePath(activeLocale, '/contact')}>{copy.contact}</FooterLink>
                <address className="max-w-60 whitespace-pre-line text-sm not-italic leading-6 text-white/58">{copy.address}</address>
              </div>
              </div>
            </section>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/12 py-6 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            {currentYear} {copy.registered}. {copy.rights}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <FooterLink href={localizePath(activeLocale, '/legal')}>{copy.policiesTerms}</FooterLink>
            <FooterLink href={localizePath(activeLocale, '/privacy')}>{copy.privacy}</FooterLink>
            <FooterLink href={localizePath(activeLocale, '/privacy#cookies')}>{copy.cookies}</FooterLink>
            <FooterLink href={localizePath(activeLocale, '/consent')}>{copy.consent}</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
