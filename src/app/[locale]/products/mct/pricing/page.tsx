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
import { localizePath } from '@/app/content/paths';
import { getMctPackages, getMctPricing } from '@/app/content/mctCommercial';

type Props = { params: Promise<{ locale: string }> };

const featureLabelByLocale = {
  en: 'Feature',
  sv: 'Funktion',
  fr: 'Fonction',
  de: 'Funktion',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const copy = getMctPricing(locale);
  return { title: copy.seoTitle, description: copy.metaDescription };
}

export default async function MctPricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const activeLocale = asLocale(locale);
  const copy = getMctPricing(activeLocale);
  const packages = getMctPackages(activeLocale);
  const featureLabel = featureLabelByLocale[activeLocale];

  return (
    <div className="min-h-screen bg-white text-[#37474F]">
      <Navbar />

      <main>
        <MctSubpageHero
          locale={activeLocale}
          activeKey="pricing"
          eyebrow={copy.eyebrow}
          title={copy.heading}
          body={copy.body}
          primaryLabel={copy.demoCta}
          secondaryLabel={copy.learnMoreCta}
          secondaryHref="/products/mct"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A5D6A7]">{copy.basisLabel}</p>
          <p className="mt-3 text-sm leading-6 text-white/72">{copy.noteBody}</p>
          <div className="mt-5 grid gap-3">
            {packages.map((tier) => (
              <a
                key={tier.slug}
                href={localizePath(activeLocale, `/products/mct/${tier.slug}`)}
                className="group flex items-center justify-between gap-4 border-t border-white/12 pt-3 text-sm"
              >
                <span className="font-semibold text-white group-hover:text-[#A5D6A7]">{tier.name}</span>
                <span className="text-white/60">{tier.priceMonthly.replace('From ', '')}</span>
              </a>
            ))}
          </div>
        </MctSubpageHero>

        <section className="bg-white py-20">
          <div style={mctCommercialFrameStyle}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              {packages.map((tier) => {
                const featured = tier.slug === 'professional';
                return (
                  <article
                    key={tier.slug}
                    className={`flex min-h-[520px] flex-col border p-6 shadow-[0_18px_55px_rgba(31,53,41,0.08)] ${
                      featured ? 'border-[#2E7D32] bg-[#1F3529] text-white' : 'border-[#1F3529]/10 bg-white text-[#1F3529]'
                    }`}
                  >
                    <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${featured ? 'text-[#A5D6A7]' : 'text-[#2E7D32]'}`}>
                      {tier.shortLabel}
                    </p>
                    <h2 className="mt-4 text-2xl font-semibold">{tier.name}</h2>
                    <p className={`mt-4 text-sm leading-7 ${featured ? 'text-white/72' : 'text-[#37474F]/72'}`}>
                      {tier.summary}
                    </p>

                    <div className={`mt-6 border-y py-5 ${featured ? 'border-white/14' : 'border-[#1F3529]/10'}`}>
                      <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${featured ? 'text-white/54' : 'text-[#37474F]/54'}`}>
                        {copy.monthlyLabel}
                      </p>
                      <p className="mt-2 text-2xl font-semibold">{tier.priceMonthly}</p>
                      <p className={`mt-4 text-xs font-semibold uppercase tracking-[0.14em] ${featured ? 'text-white/54' : 'text-[#37474F]/54'}`}>
                        {copy.setupLabel}
                      </p>
                      <p className="mt-2 text-lg font-semibold">{tier.setupPrice}</p>
                    </div>

                    <ul className="mt-6 grid gap-3">
                      {tier.features.slice(0, 5).map((feature) => (
                        <li key={feature} className="flex gap-3 text-sm leading-6">
                          <CheckIcon className={`mt-1 h-4 w-4 flex-none ${featured ? 'text-[#A5D6A7]' : 'text-[#2E7D32]'}`} />
                          <span className={featured ? 'text-white/82' : 'text-[#37474F]/82'}>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex flex-col gap-3 pt-7">
                      <a
                        href={localizePath(activeLocale, `/products/mct/${tier.slug}`)}
                        className={`inline-flex items-center justify-center gap-3 rounded-sm px-5 py-3 text-sm font-semibold transition-colors ${
                          featured ? 'bg-white text-[#1F3529] hover:bg-[#A5D6A7]' : 'bg-[#2E7D32] text-white hover:bg-[#1F5B25]'
                        }`}
                      >
                        <span>{copy.learnMoreCta}</span>
                        <ArrowIcon />
                      </a>
                      <a
                        href={localizePath(activeLocale, '/contact')}
                        className={`inline-flex items-center justify-center gap-3 rounded-sm border px-5 py-3 text-sm font-semibold transition-colors ${
                          featured
                            ? 'border-white/24 text-white hover:border-[#A5D6A7] hover:bg-white/10'
                            : 'border-[#2E7D32]/28 text-[#2E7D32] hover:border-[#2E7D32] hover:bg-[#2E7D32]/6'
                        }`}
                      >
                        <span>{copy.demoCta}</span>
                        <ArrowIcon />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#F6F8F4] py-20">
          <div style={mctCommercialFrameStyle}>
            <MctSectionIntro
              eyebrow={copy.comparisonEyebrow}
              heading={copy.comparisonHeading}
              body={copy.comparisonBody}
            />

            <div className="mt-10 hidden overflow-x-auto border border-[#1F3529]/10 md:block">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-[#1F3529] text-white">
                    <th className="sticky left-0 bg-[#1F3529] px-5 py-4 text-sm font-semibold">{featureLabel}</th>
                    {packages.map((tier) => (
                      <th key={tier.slug} className="px-5 py-4 text-sm font-semibold">
                        {tier.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {copy.featureRows.map((row, index) => (
                    <tr key={row.feature} className={index % 2 === 0 ? 'bg-white' : 'bg-[#EAF2E7]/70'}>
                      <th
                        scope="row"
                        className={`sticky left-0 px-5 py-4 text-sm font-semibold text-[#1F3529] ${
                          index % 2 === 0 ? 'bg-white' : 'bg-[#EAF2E7]'
                        }`}
                      >
                        {row.feature}
                      </th>
                      <td className="px-5 py-4 text-sm leading-6 text-[#37474F]/76">{row.basic}</td>
                      <td className="px-5 py-4 text-sm leading-6 text-[#37474F]/76">{row.professional}</td>
                      <td className="px-5 py-4 text-sm leading-6 text-[#37474F]/76">{row.premium}</td>
                      <td className="px-5 py-4 text-sm leading-6 text-[#37474F]/76">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-10 grid gap-5 md:hidden">
              {packages.map((tier) => (
                <article key={tier.slug} className="border border-[#1F3529]/10 bg-white p-5">
                  <h3 className="text-lg font-semibold text-[#1F3529]">{tier.name}</h3>
                  <dl className="mt-4 grid gap-3">
                    {copy.featureRows.map((row) => (
                      <div key={row.feature} className="border-t border-[#1F3529]/10 pt-3">
                        <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2E7D32]">{row.feature}</dt>
                        <dd className="mt-1 text-sm leading-6 text-[#37474F]/74">
                          {row[tier.slug]}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="grid gap-8 lg:grid-cols-[0.55fr_1fr]" style={mctCommercialFrameStyle}>
            <h2 className="text-3xl font-light leading-tight text-[#1F3529] md:text-5xl">{copy.noteHeading}</h2>
            <p className="border-l-4 border-[#2E7D32] bg-[#F6F8F4] p-6 text-base leading-8 text-[#37474F]/76 shadow-[0_18px_55px_rgba(31,53,41,0.08)]">
              {copy.noteBody}
            </p>
          </div>
        </section>

        <MctCtaBand
          locale={activeLocale}
          heading={copy.finalHeading}
          body={copy.finalBody}
          primaryLabel={copy.demoCta}
          secondaryLabel={copy.learnMoreCta}
          secondaryHref="/products/mct"
        />
      </main>

      <Footer />
    </div>
  );
}
