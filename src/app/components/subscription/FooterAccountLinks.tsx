import React from 'react';
import { localizePath } from '@/app/content/paths';
import type { Locale } from '@/app/content/locale';

type FooterLinkProps = {
  href: string;
  children: React.ReactNode;
};

function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <a href={href} className="text-sm leading-6 text-white/68 transition-colors hover:text-[#A5D6A7]">
      {children}
    </a>
  );
}

export default function FooterAccountLinks({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="footer-account-subscriptions">
      <div className="h-full bg-[#37474F] p-6 sm:p-7">
        <h2 id="footer-account-subscriptions" className="text-sm font-semibold uppercase tracking-[0.16em] text-[#A5D6A7]">
          Account & Subscriptions
        </h2>
        <nav className="mt-5 flex flex-col gap-3" aria-label="Account and subscriptions">
          <FooterLink href={localizePath(locale, '/signin')}>Sign in</FooterLink>
          <FooterLink href={localizePath(locale, '/create-account')}>Create account</FooterLink>
          <FooterLink href={localizePath(locale, '/subscriptions')}>MCT subscriptions</FooterLink>
          <FooterLink href={localizePath(locale, '/account/subscriptions')}>Billing & invoices</FooterLink>
          <FooterLink href={localizePath(locale, '/contact')}>Contact sales</FooterLink>
          <FooterLink href={localizePath(locale, '/checkout')}>Request quote</FooterLink>
        </nav>
      </div>
    </section>
  );
}
