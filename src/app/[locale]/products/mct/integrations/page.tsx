import type { Metadata } from 'next';
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
import { asLocale } from '@/app/content/locale';
import { getMctIntegrations } from '@/app/content/mctCommercial';

type Props = { params: Promise<{ locale: string }> };

const statLabelsByLocale = {
  en: ['categories', 'exchange options', 'feasibility rules'],
  sv: ['kategorier', 'utbytesalternativ', 'genomförbarhetsregler'],
  fr: ['catégories', 'options d’échange', 'règles de faisabilité'],
  de: ['Kategorien', 'Austauschoptionen', 'Machbarkeitsregeln'],
};

const pricingLabelByLocale = {
  en: 'View pricing',
  sv: 'Visa priser',
  fr: 'Voir les tarifs',
  de: 'Preise ansehen',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const copy = getMctIntegrations(locale);
  return { title: copy.seoTitle, description: copy.metaDescription };
}

export default async function MctIntegrationsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const activeLocale = asLocale(locale);
  const copy = getMctIntegrations(activeLocale);
  const statLabels = statLabelsByLocale[activeLocale];
  const pricingLabel = pricingLabelByLocale[activeLocale];

  return (
    <div className="min-h-screen bg-white text-[#37474F]">
      <Navbar />

      <main>
        <MctSubpageHero
          locale={activeLocale}
          activeKey="integrations"
          eyebrow={copy.eyebrow}
          title={copy.heading}
          body={copy.body}
          primaryLabel={copy.primaryCta}
          secondaryLabel={pricingLabel}
          secondaryHref="/products/mct/pricing"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A5D6A7]">
            {copy.rulesEyebrow}
          </p>
          <p className="mt-3 text-2xl font-semibold leading-tight text-white">{copy.rulesHeading}</p>
          <p className="mt-3 text-sm leading-6 text-white/70">{copy.rulesBody}</p>
          <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/12 pt-5">
            <div>
              <p className="text-2xl font-semibold text-white">{copy.categories.length}</p>
              <p className="mt-1 text-xs leading-5 text-white/54">{statLabels[0]}</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">{copy.exchangeOptions.length}</p>
              <p className="mt-1 text-xs leading-5 text-white/54">{statLabels[1]}</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">{copy.rules.length}</p>
              <p className="mt-1 text-xs leading-5 text-white/54">{statLabels[2]}</p>
            </div>
          </div>
        </MctSubpageHero>

        <section className="bg-white py-20">
          <div style={mctCommercialFrameStyle}>
            <MctSectionIntro
              eyebrow={copy.categoriesEyebrow}
              heading={copy.categoriesHeading}
              body={copy.categoriesBody}
            />
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
              {copy.categories.map((category) => (
                <article key={category.title} className="flex min-h-[340px] flex-col border border-[#1F3529]/10 bg-[#F6F8F4] p-5 shadow-[0_18px_55px_rgba(31,53,41,0.08)]">
                  <span className="mb-6 block h-1.5 w-12 rounded-sm bg-[#2E7D32]" />
                  <h2 className="text-xl font-semibold text-[#1F3529]">{category.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-[#37474F]/72">{category.body}</p>
                  <ul className="mt-auto grid gap-2 pt-6">
                    {category.examples.map((example) => (
                      <li key={example} className="flex gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#2E7D32]">
                        <CheckIcon className="mt-0.5 h-3.5 w-3.5 flex-none" />
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#37474F] py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.72fr_1.28fr]" style={mctCommercialFrameStyle}>
            <MctSectionIntro
              eyebrow={copy.exchangeEyebrow}
              heading={copy.exchangeHeading}
              body={copy.exchangeBody}
              dark
            />
            <div className="grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2">
              {copy.exchangeOptions.map((option) => (
                <article key={option.title} className="bg-[#37474F] p-6">
                  <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-sm bg-[#A5D6A7] text-[#1F3529]">
                    <ArrowIcon />
                  </div>
                  <h2 className="text-lg font-semibold text-white">{option.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-white/68">{option.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F6F8F4] py-20">
          <div style={mctCommercialFrameStyle}>
            <MctSectionIntro
              eyebrow={copy.rulesEyebrow}
              heading={copy.rulesHeading}
              body={copy.rulesBody}
            />
            <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-[#1F3529]/10 bg-[#1F3529]/10 md:grid-cols-5">
              {copy.rules.map((rule, index) => (
                <article key={rule.title} className="bg-white p-5">
                  <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-sm bg-[#2E7D32]/10 text-sm font-semibold text-[#2E7D32]">
                    {index + 1}
                  </span>
                  <h2 className="text-base font-semibold text-[#1F3529]">{rule.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-[#37474F]/70">{rule.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <MctCtaBand
          locale={activeLocale}
          heading={copy.finalHeading}
          body={copy.finalBody}
          primaryLabel={copy.primaryCta}
          secondaryLabel={pricingLabel}
          secondaryHref="/products/mct/pricing"
        />
      </main>

      <Footer />
    </div>
  );
}
