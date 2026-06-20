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

  return (
    <footer id="site-footer" className="relative overflow-hidden border-t border-white/10 bg-[#37474F] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden="true">
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#A5D6A7]/70 to-transparent" />
        <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full border border-white/10" />
        <div className="absolute -top-12 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full border border-white/5" />
        <div
          className="hero-grid-scan absolute inset-x-0 top-0 h-full opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(rgba(165, 214, 167, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(129, 212, 250, 0.10) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'linear-gradient(180deg, black, transparent 72%)',
          }}
        />
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
