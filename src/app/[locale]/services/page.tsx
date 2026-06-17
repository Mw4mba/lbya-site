import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { getSite } from '@/app/content/site';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const SERVICES = getSite(locale).services;
  return { title: SERVICES.seoTitle, description: SERVICES.metaDescription };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const SERVICES = getSite(locale).services;
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="relative bg-[#2E7D32] px-6 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight leading-none">
            {SERVICES.hero}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light leading-snug max-w-md md:justify-self-end">
            {SERVICES.intro}
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-lg text-[#37474F]/70 font-light leading-relaxed max-w-3xl mb-16">
            {SERVICES.rule}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#2E7D32]/10 rounded-sm overflow-hidden">
            {SERVICES.categories.map((category) => (
              <div key={category.title} className="bg-white p-8">
                <h2 className="text-2xl font-medium text-[#2E7D32] mb-4">{category.title}</h2>
                <p className="text-[#37474F]/70 font-light leading-relaxed">{category.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#F5F5DC]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-[#2E7D32] mb-6">
            Looking for product-led support?
          </h2>
          <p className="text-lg text-[#37474F]/70 font-light mb-10 max-w-2xl mx-auto">
            Our services exist to help you adopt and get value from MCT and Nayeli BIM Control. Talk to us about your goals.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#2E7D32] text-white font-medium rounded-sm hover:bg-[#1b5e20] transition-all shadow-lg hover:shadow-xl"
          >
            Contact LBYA
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
