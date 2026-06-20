'use client';

import Navbar from '@/app/components/Navbar';
import HeroSection from '@/app/components/HeroSection';
import ProductsShowcase from '@/app/components/ProductsShowcase';
import SolutionsTeaserSection from '@/app/components/SolutionsTeaserSection';
import CareerTeaserSection from '@/app/components/CareerTeaserSection';
import Footer from '@/app/components/Footer';

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ProductsShowcase />
      <SolutionsTeaserSection />
      <CareerTeaserSection />
      <Footer />
    </main>
  );
}
