'use client';

import Navbar from '@/app/components/Navbar';
import HeroSection from '@/app/components/HeroSection';
import ProductsShowcase from '@/app/components/ProductsShowcase';
import SolutionsTeaserSection from '@/app/components/SolutionsTeaserSection';
import CareerTeaserSection from '@/app/components/CareerTeaserSection';
import Footer from '@/app/components/Footer';
import { useLocale } from 'next-intl';
import { asLocale } from '@/app/content/locale';

export default function Home() {
  const activeLocale = asLocale(useLocale());

  return (
    <main className={`w-full overflow-x-hidden ${activeLocale === 'sv' ? 'sv-home-rectangles' : ''}`}>
      <Navbar />
      <HeroSection />
      <ProductsShowcase />
      <SolutionsTeaserSection />
      <CareerTeaserSection />
      <Footer />
    </main>
  );
}
