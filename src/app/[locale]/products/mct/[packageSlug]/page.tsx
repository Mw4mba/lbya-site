import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import {
  ArrowIcon,
  CheckIcon,
  MctCtaBand,
  MctSectionIntro,
  MctSubpageHero,
  mctCommercialFrameStyle,
} from '@/app/components/MctCommercialLayout';
import { asLocale, type Locale } from '@/app/content/locale';
import { getMctPackage, mctPackageOrder } from '@/app/content/mctCommercial';

type Props = { params: Promise<{ locale: string; packageSlug: string }> };

const packagePageLabelsByLocale: Record<Locale, {
  monthlyLabel: string;
  setupLabel: string;
  basisLabel: string;
  bestForEyebrow: string;
  bestForHeading: string;
  enablesEyebrow: string;
  enablesHeading: string;
  featuresEyebrow: string;
  featuresHeading: string;
  configurationEyebrow: string;
  configurationHeading: string;
  proofEyebrow: string;
  pricingHrefLabel: string;
  demoLabel: string;
}> = {
  en: {
    monthlyLabel: 'Monthly subscription',
    setupLabel: 'One-time setup',
    basisLabel: 'Pricing basis',
    bestForEyebrow: 'Best fit',
    bestForHeading: 'Who this package is built for.',
    enablesEyebrow: 'What it enables',
    enablesHeading: 'A practical step up in control.',
    featuresEyebrow: 'Included capabilities',
    featuresHeading: 'What the package includes.',
    configurationEyebrow: 'Configuration',
    configurationHeading: 'How the setup is shaped.',
    proofEyebrow: 'Package guidance',
    pricingHrefLabel: 'Compare pricing',
    demoLabel: 'Request a demo',
  },
  sv: {
    monthlyLabel: 'Månadsprenumeration',
    setupLabel: 'Engångskostnad för uppstart',
    basisLabel: 'Prisgrund',
    bestForEyebrow: 'Passar bäst för',
    bestForHeading: 'Vem paketet är byggt för.',
    enablesEyebrow: 'Vad det möjliggör',
    enablesHeading: 'Ett praktiskt steg upp i kontroll.',
    featuresEyebrow: 'Inkluderade funktioner',
    featuresHeading: 'Vad paketet innehåller.',
    configurationEyebrow: 'Konfiguration',
    configurationHeading: 'Hur upplägget formas.',
    proofEyebrow: 'Paketvägledning',
    pricingHrefLabel: 'Jämför priser',
    demoLabel: 'Begär demo',
  },
  fr: {
    monthlyLabel: 'Abonnement mensuel',
    setupLabel: 'Mise en place initiale',
    basisLabel: 'Base de tarification',
    bestForEyebrow: 'Meilleure adéquation',
    bestForHeading: 'Pour qui cette offre est conçue.',
    enablesEyebrow: 'Ce qu’il permet',
    enablesHeading: 'Une progression pratique du contrôle.',
    featuresEyebrow: 'Capacités incluses',
    featuresHeading: 'Ce que l’offre inclut.',
    configurationEyebrow: 'Configuration',
    configurationHeading: 'Comment la mise en place est construite.',
    proofEyebrow: 'Conseil sur l’offre',
    pricingHrefLabel: 'Comparer les tarifs',
    demoLabel: 'Demander une démo',
  },
  de: {
    monthlyLabel: 'Monatsabonnement',
    setupLabel: 'Einmaliges Setup',
    basisLabel: 'Preisgrundlage',
    bestForEyebrow: 'Bester Fit',
    bestForHeading: 'Für wen dieses Paket gebaut ist.',
    enablesEyebrow: 'Was es ermöglicht',
    enablesHeading: 'Ein praktischer Schritt zu mehr Kontrolle.',
    featuresEyebrow: 'Enthaltene Funktionen',
    featuresHeading: 'Was das Paket enthält.',
    configurationEyebrow: 'Konfiguration',
    configurationHeading: 'Wie das Setup geformt wird.',
    proofEyebrow: 'Paketempfehlung',
    pricingHrefLabel: 'Preise vergleichen',
    demoLabel: 'Demo anfragen',
  },
};

export function generateStaticParams() {
  return mctPackageOrder.map((packageSlug) => ({ packageSlug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, packageSlug } = await params;
  const tier = getMctPackage(locale, packageSlug);
  if (!tier) return { title: 'MCT Package' };
  return { title: tier.seoTitle, description: tier.metaDescription };
}

export default async function MctPackagePage({ params }: Props) {
  const { locale, packageSlug } = await params;
  setRequestLocale(locale);
  const activeLocale = asLocale(locale);
  const labels = packagePageLabelsByLocale[activeLocale];
  const tier = getMctPackage(activeLocale, packageSlug);

  if (!tier) notFound();

  return (
    <div className="min-h-screen bg-white text-[#37474F]">
      <Navbar />

      <main>
        <MctSubpageHero
          locale={activeLocale}
          activeKey={tier.slug}
          eyebrow={tier.eyebrow}
          title={tier.heroTitle}
          body={tier.heroBody}
          primaryLabel={tier.primaryCta}
          secondaryLabel={labels.pricingHrefLabel}
          secondaryHref="/products/mct/pricing"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A5D6A7]">{tier.name}</p>
          <p className="mt-3 text-2xl font-semibold leading-tight text-white">{tier.shortLabel}</p>
          <div className="mt-5 border-y border-white/14 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/54">{labels.monthlyLabel}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{tier.priceMonthly}</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-white/54">{labels.setupLabel}</p>
            <p className="mt-2 text-lg font-semibold text-white">{tier.setupPrice}</p>
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#A5D6A7]">{labels.basisLabel}</p>
          <p className="mt-2 text-sm leading-6 text-white/70">{tier.priceBasis}</p>
        </MctSubpageHero>

        <section className="bg-white py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.72fr_1.28fr]" style={mctCommercialFrameStyle}>
            <MctSectionIntro
              eyebrow={labels.bestForEyebrow}
              heading={labels.bestForHeading}
              body={tier.summary}
            />
            <div className="grid gap-px overflow-hidden border border-[#1F3529]/10 bg-[#1F3529]/10 md:grid-cols-3">
              {tier.bestFor.map((item) => (
                <article key={item} className="bg-[#F6F8F4] p-5">
                  <CheckIcon className="h-5 w-5 text-[#2E7D32]" />
                  <p className="mt-4 text-sm leading-7 text-[#37474F]/76">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F6F8F4] py-20">
          <div style={mctCommercialFrameStyle}>
            <MctSectionIntro
              eyebrow={labels.enablesEyebrow}
              heading={labels.enablesHeading}
              body={tier.proof}
            />
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              {tier.enables.map((item) => (
                <article key={item.title} className="border border-[#1F3529]/10 bg-white p-6 shadow-[0_18px_55px_rgba(31,53,41,0.08)]">
                  <span className="mb-6 block h-1.5 w-12 rounded-sm bg-[#2E7D32]" />
                  <h2 className="text-xl font-semibold text-[#1F3529]">{item.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-[#37474F]/72">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_0.82fr]" style={mctCommercialFrameStyle}>
            <div>
              <MctSectionIntro
                eyebrow={labels.featuresEyebrow}
                heading={labels.featuresHeading}
                body={tier.summary}
              />
              <ul className="mt-9 grid gap-3 md:grid-cols-2">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-3 border-t border-[#1F3529]/10 pt-3 text-sm leading-6 text-[#37474F]/78">
                    <CheckIcon className="mt-1 h-4 w-4 flex-none text-[#2E7D32]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="bg-[#1F3529] p-6 text-white shadow-[0_18px_55px_rgba(31,53,41,0.16)]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A5D6A7]">
                {labels.configurationEyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-light leading-tight">{labels.configurationHeading}</h2>
              <dl className="mt-7 grid gap-5">
                {tier.configuration.map((item) => (
                  <div key={item.label} className="border-t border-white/12 pt-5">
                    <dt className="text-sm font-semibold text-white">{item.label}</dt>
                    <dd className="mt-2 text-sm leading-6 text-white/68">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </section>

        <section className="bg-[#EAF2E7] py-16">
          <div className="grid gap-8 lg:grid-cols-[0.42fr_1fr]" style={mctCommercialFrameStyle}>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2E7D32]">{labels.proofEyebrow}</p>
            <p className="text-2xl font-light leading-tight text-[#1F3529] md:text-4xl">{tier.proof}</p>
          </div>
        </section>

        <MctCtaBand
          locale={activeLocale}
          heading={tier.name}
          body={tier.summary}
          primaryLabel={labels.demoLabel}
          secondaryLabel={labels.pricingHrefLabel}
          secondaryHref="/products/mct/pricing"
        />
      </main>

      <Footer />
    </div>
  );
}
