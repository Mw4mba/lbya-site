'use client';

import Navbar from '@/app/components/Navbar';
import HeroSection from '@/app/components/HeroSection';
import ProductsShowcase from '@/app/components/ProductsShowcase';
import VisionSection from '@/app/components/VisionSection';
import ServicesSection from '@/app/components/ServicesSection';
import InsightsSection from '@/app/components/InsightsSection';
import CaseStudiesSection from '@/app/components/CaseStudiesSection';
import CTASection from '@/app/components/CTASection';
import Footer from '@/app/components/Footer';

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ProductsShowcase />
      <VisionSection />
      <ServicesSection />
      <InsightsSection />
      <CaseStudiesSection />
      <CTASection />
      <Footer />
    </main>
  );
}
