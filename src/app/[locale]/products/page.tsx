import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ProductCard from '@/app/components/ProductCard';
import { getProducts } from '@/app/content/products';
import { getSite } from '@/app/content/site';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const o = getSite(locale).productsOverview;
  return { title: o.seoTitle, description: o.metaDescription };
}

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const PRODUCTS_OVERVIEW = getSite(locale).productsOverview;
  const PRODUCTS = getProducts(locale);
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="relative bg-[#2E7D32] px-6 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-7xl mx-auto">
          <p className="text-white/70 text-sm font-medium uppercase tracking-widest mb-4">
            Digital control platforms
          </p>
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight leading-none mb-8">
            {PRODUCTS_OVERVIEW.hero}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light leading-snug max-w-3xl">
            {PRODUCTS_OVERVIEW.intro}
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
