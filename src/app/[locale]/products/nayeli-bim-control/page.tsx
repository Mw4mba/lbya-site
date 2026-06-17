import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ProductHero from '@/app/components/ProductHero';
import { getNbc } from '@/app/content/products';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const NBC = getNbc(locale);
  return { title: NBC.seoTitle, description: NBC.metaDescription };
}

export default async function NayeliBimControlPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const NBC = getNbc(locale);
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <ProductHero
        eyebrow="Nayeli BIM Control (NBC)"
        title={NBC.name}
        tagline={NBC.tagline}
        body={NBC.heroPositioning}
        image={NBC.heroImage}
        primaryCta={NBC.primaryCta}
        secondaryCta={NBC.secondaryCta}
      />

      {/* Positioning supporting paragraph */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-xl md:text-2xl text-[#37474F]/80 font-light leading-relaxed">
            {NBC.supporting}
          </p>
        </div>
      </section>

      {/* Sections */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {NBC.sections.map((section, idx) => (
            <div key={section.title}>
              {idx > 0 && <div className="border-t border-[#2E7D32]/15" />}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start py-12">
                <h2 className="text-3xl md:text-4xl font-light text-[#2E7D32]">{section.title}</h2>
                <p className="text-lg text-[#37474F]/70 font-light leading-relaxed">{section.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#2E7D32]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Help shape a more accountable way to control BIM</h2>
          <p className="text-xl text-white/80 font-light mb-10 max-w-2xl mx-auto">
            NBC is entering early access. Join the list, or start a BIM control discussion with our team.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={NBC.primaryCta.href}
              className="px-8 py-4 bg-white text-[#2E7D32] font-semibold rounded-sm hover:bg-[#A5D6A7] transition-colors"
            >
              {NBC.primaryCta.label}
            </a>
            <a
              href={NBC.secondaryCta.href}
              className="btn-slide-fill px-8 py-4 font-medium rounded-sm inline-flex items-center gap-2"
            >
              {NBC.secondaryCta.label}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
