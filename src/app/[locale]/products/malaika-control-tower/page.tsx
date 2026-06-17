import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ProductHero from '@/app/components/ProductHero';
import PackageTierCard from '@/app/components/PackageTierCard';
import FeatureMatrix from '@/app/components/FeatureMatrix';
import { getMct } from '@/app/content/products';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const MCT = getMct(locale);
  return { title: MCT.seoTitle, description: MCT.metaDescription };
}

export default async function MalaikaControlTowerPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const MCT = getMct(locale);
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <ProductHero
        eyebrow="Malaika Control Tower (MCT)"
        title={MCT.name}
        tagline={MCT.tagline}
        body={MCT.hero}
        image={MCT.heroImage}
        primaryCta={MCT.primaryCta}
        secondaryCta={MCT.secondaryCta}
        liveCta={MCT.liveCta}
      />

      {/* Honest status */}
      <div className="bg-[#F5F5DC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <p className="text-sm text-[#37474F]/70 font-light text-center">{MCT.honestStatus}</p>
        </div>
      </div>

      {/* What MCT is / is not */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-light text-[#2E7D32] mb-6">What MCT is</h2>
            {MCT.whatIs.map((para, idx) => (
              <p key={idx} className="text-lg text-[#37474F]/70 font-light leading-relaxed mb-4">
                {para}
              </p>
            ))}
          </div>
          <div className="bg-[#F5F5DC] p-8 rounded-sm">
            <h2 className="text-3xl md:text-4xl font-light text-[#2E7D32] mb-6">What MCT is not</h2>
            <ul className="space-y-4">
              {MCT.isNot.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[#37474F]">
                  <span className="mt-2 w-2 h-2 rounded-full bg-[#2E7D32] flex-shrink-0" />
                  <span className="font-light leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Who MCT is for */}
      <section className="py-24 bg-[#37474F]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-12">Who MCT is for</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MCT.audiences.map((audience) => (
              <div key={audience.title} className="border-t border-white/20 pt-5">
                <h3 className="text-lg font-medium text-white mb-2">{audience.title}</h3>
                <p className="text-white/70 font-light leading-relaxed">{audience.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problems MCT addresses */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-light text-[#2E7D32] mb-12">Problems MCT addresses</h2>
          <div className="space-y-px bg-[#2E7D32]/10 rounded-sm overflow-hidden">
            {MCT.problems.map((row, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6">
                <p className="text-[#37474F] font-medium">{row.problem}</p>
                <p className="text-[#37474F]/70 font-light leading-relaxed">{row.response}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-24 bg-[#F5F5DC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-light text-[#2E7D32] mb-12">Key modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MCT.modules.map((module) => (
              <div key={module.name} className="bg-white p-6 rounded-sm border border-[#2E7D32]/10">
                <h3 className="text-lg font-medium text-[#2E7D32] mb-2">{module.name}</h3>
                <p className="text-[#37474F]/70 font-light leading-relaxed text-sm">{module.explanation}</p>
              </div>
            ))}
          </div>
          {/* Verification trust line */}
          <div className="mt-12 border-l-4 border-[#2E7D32] bg-white p-6 rounded-sm">
            <p className="text-[#37474F]/80 font-light leading-relaxed">{MCT.trustLine}</p>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-light text-[#2E7D32] mb-4">Packages</h2>
          <p className="text-lg text-[#37474F]/70 font-light leading-relaxed max-w-3xl mb-12">
            {MCT.packagesIntro}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {MCT.packages.map((tier, idx) => (
              <PackageTierCard
                key={tier.name}
                tier={tier}
                featured={idx === 1}
                ctaHref={MCT.primaryCta.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Feature matrix */}
      <section className="py-24 bg-[#F5F5DC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-light text-[#2E7D32] mb-12">Compare packages</h2>
          <FeatureMatrix rows={MCT.matrix} tiers={MCT.packages} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#2E7D32]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to bring order to your transport coordination?</h2>
          <p className="text-xl text-white/80 font-light mb-10 max-w-2xl mx-auto">
            Request early access, or explore the live platform to see MCT in action.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={MCT.primaryCta.href}
              className="px-8 py-4 bg-white text-[#2E7D32] font-semibold rounded-sm hover:bg-[#A5D6A7] transition-colors"
            >
              {MCT.primaryCta.label}
            </a>
            <a
              href={MCT.liveCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-slide-fill px-8 py-4 font-medium rounded-sm inline-flex items-center gap-2"
            >
              {MCT.liveCta.label}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
