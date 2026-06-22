import React from 'react';
import { localizePath } from '@/app/content/paths';
import type { Locale } from '@/app/content/locale';

type FooterAccountCopy = {
  accountSubscriptionsTitle: string;
  accountAndSubscriptions: string;
  signIn: string;
  createAccount: string;
  mctSubscriptions: string;
  contactSales: string;
  requestQuote: string;
};

const footerAccountCopyByLocale: Record<Locale, FooterAccountCopy> = {
  en: {
    accountSubscriptionsTitle: 'Account & Subscriptions',
    accountAndSubscriptions: 'Account and subscriptions',
    signIn: 'Sign in',
    createAccount: 'Create account',
    mctSubscriptions: 'MCT subscriptions',
    contactSales: 'Contact sales',
    requestQuote: 'Request quote',
  },
  sv: {
    accountSubscriptionsTitle: 'Konto & Prenumerationer',
    accountAndSubscriptions: 'Konto och prenumerationer',
    signIn: 'Logga in',
    createAccount: 'Skapa konto',
    mctSubscriptions: 'MCT-prenumerationer',
    contactSales: 'Kontakta försäljning',
    requestQuote: 'Begär offert',
  },
  fr: {
    accountSubscriptionsTitle: 'Compte & Abonnements',
    accountAndSubscriptions: 'Compte et abonnements',
    signIn: 'Se connecter',
    createAccount: 'Créer un compte',
    mctSubscriptions: 'Abonnements MCT',
    contactSales: 'Contacter les ventes',
    requestQuote: 'Demander un devis',
  },
  de: {
    accountSubscriptionsTitle: 'Konto & Abonnements',
    accountAndSubscriptions: 'Konto und Abonnements',
    signIn: 'Anmelden',
    createAccount: 'Konto erstellen',
    mctSubscriptions: 'MCT-Abonnements',
    contactSales: 'Vertrieb kontaktieren',
    requestQuote: 'Angebot anfordern',
  },
};

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
  const copy = footerAccountCopyByLocale[locale];
  
  return (
    <section aria-labelledby="footer-account-subscriptions">
      <div className="h-full bg-[#37474F] p-6 sm:p-7">
        <h2 id="footer-account-subscriptions" className="text-sm font-semibold uppercase tracking-[0.16em] text-[#A5D6A7]">
          {copy.accountSubscriptionsTitle}
        </h2>
        <nav className="mt-5 flex flex-col gap-3" aria-label={copy.accountAndSubscriptions}>
          <FooterLink href={localizePath(locale, '/signin')}>{copy.signIn}</FooterLink>
          <FooterLink href={localizePath(locale, '/create-account')}>{copy.createAccount}</FooterLink>
          <FooterLink href={localizePath(locale, '/subscriptions')}>{copy.mctSubscriptions}</FooterLink>
          <FooterLink href={localizePath(locale, '/contact')}>{copy.contactSales}</FooterLink>
          <FooterLink href={localizePath(locale, '/checkout')}>{copy.requestQuote}</FooterLink>
        </nav>
      </div>
    </section>
  );
}
