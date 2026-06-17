'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import TransitionLink from '@/app/components/TransitionLink';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { useTranslation } from '@/app/i18n/I18nContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function InsightsPageContent() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Newsletter Animation
      if (newsletterRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: newsletterRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });

        tl.fromTo(newsletterRef.current,
          {
            y: 100,       // Start lower for better "float up" effect
            opacity: 0,
            scale: 0.95   // Start slightly smaller
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,     // Land at natural size
            duration: 1.2, // Slower duration for "floating" feel
            ease: 'power3.out'
          }
        )
          .to(newsletterRef.current, {
            scale: 1.03,    // Expand slightly
            duration: 0.8,  // Gentle expansion
            ease: 'power2.out'
          });
      }

      // LBYA Animation
      if (wrapperRef.current && textRef.current) {
        gsap.fromTo(textRef.current,
          { y: '100%' },
          {
            y: '0%',
            ease: 'none',
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: 'top top',
              end: '+=100%',
              scrub: true,
              pin: true,
            }
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const insights = [
    {
      id: 1,
      ...t.insights.items.climate,
      image: '/images/insights/climate-resilience.jpg',
      slug: 'designing-for-climate-resilience-in-urban-environments',
    },
    {
      id: 2,
      ...t.insights.items.materials,
      image: '/images/insights/carbon-materials.jpg',
      slug: 'the-future-of-structural-engineering-carbon-negative-materials',
    },
    {
      id: 3,
      ...t.insights.items.digitalTwin,
      image: '/images/insights/digital-twin.jpg',
      slug: 'bim-to-digital-twin-bridging-design-and-operations',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="w-full">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex flex-col justify-end pb-24 px-6 bg-[#2E7D32]">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <div>
              <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tighter leading-none">
                Insights
              </h1>
            </div>
            <div className="flex justify-start md:justify-end">
              <p className="text-xl md:text-2xl text-white font-medium leading-snug max-w-md">
                Perspectives on digital control platforms, BIM control, and African logistics.
              </p>
            </div>
          </div>
        </section>

        {/* Latest Articles Section */}
        <section className="py-24 bg-[#2E7D32]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white p-8 md:p-12">
              <div className="flex items-center justify-between mb-12 border-b border-[#2E7D32]/10 pb-4">
                <h2 className="text-3xl font-light text-[#2E7D32]">Latest Articles</h2>
                <div className="hidden md:flex gap-4 text-sm font-medium text-[#37474F]/60">
                  <span className="text-[#2E7D32] cursor-pointer">All</span>
                  <span className="hover:text-[#2E7D32] cursor-pointer transition-colors">BIM Control</span>
                  <span className="hover:text-[#2E7D32] cursor-pointer transition-colors">African Logistics</span>
                  <span className="hover:text-[#2E7D32] cursor-pointer transition-colors">Product Updates</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {insights.map((insight) => (
                  <TransitionLink
                    key={insight.id}
                    href={`/insights/${insight.slug}`}
                    className="group block"
                  >
                    <div className="relative h-64 overflow-hidden rounded-sm mb-6">
                      <Image
                        src={insight.image}
                        alt={insight.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-2 py-1 bg-[#F5F5DC] text-[#2E7D32] text-[10px] font-bold uppercase tracking-wider rounded-sm">
                          {insight.category}
                        </span>
                        <span className="text-xs text-[#37474F]/40 font-medium">{insight.date}</span>
                      </div>

                      <h3 className="text-xl font-medium text-[#2E7D32] mb-3 group-hover:text-[#1b5e20] transition-colors leading-snug">
                        {insight.title}
                      </h3>
                      <p className="text-[#37474F]/60 text-sm leading-relaxed mb-4 line-clamp-3">
                        {insight.excerpt}
                      </p>

                      <span className="inline-flex items-center gap-2 text-[#2E7D32] font-semibold text-xs uppercase tracking-wider group-hover:gap-3 transition-all">
                        <span>Read Story</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </TransitionLink>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-24 bg-[#F5F5DC]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-light text-[#2E7D32] mb-12 text-center">Explore by Category</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-6 bg-white rounded-sm hover:shadow-lg transition-all cursor-pointer">
                <h3 className="text-xl font-semibold text-[#2E7D32] mb-2">BIM Control</h3>
                <p className="text-[#37474F]/70 text-sm">Information control and governance for BIM teams.</p>
              </div>

              <div className="p-6 bg-white rounded-sm hover:shadow-lg transition-all cursor-pointer">
                <h3 className="text-xl font-semibold text-[#2E7D32] mb-2">African Logistics</h3>
                <p className="text-[#37474F]/70 text-sm">Transport coordination and trade across African corridors.</p>
              </div>

              <div className="p-6 bg-white rounded-sm hover:shadow-lg transition-all cursor-pointer">
                <h3 className="text-xl font-semibold text-[#2E7D32] mb-2">Digital Control Platforms</h3>
                <p className="text-[#37474F]/70 text-sm">How structured workflows turn data into decisions.</p>
              </div>

              <div className="p-6 bg-white rounded-sm hover:shadow-lg transition-all cursor-pointer">
                <h3 className="text-xl font-semibold text-[#2E7D32] mb-2">Product Updates</h3>
                <p className="text-[#37474F]/70 text-sm">News from MCT and Nayeli BIM Control.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-24 bg-[#F5F5DC]">
          <div ref={newsletterRef} className="max-w-4xl mx-auto px-6">
            <div className="bg-[#2E7D32] text-white rounded-2xl p-12 md:p-16 text-center shadow-2xl transform will-change-transform">
              <h2 className="text-3xl md:text-4xl font-light mb-6">Stay Updated</h2>
              <p className="text-lg md:text-xl font-light mb-8 text-white/90">
                Subscribe to receive our latest insights and innovations
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-sm text-[#37474F] focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/95 backdrop-blur-sm"
                />
                <button className="px-8 py-4 bg-white text-[#2E7D32] font-medium rounded-sm hover:bg-[#A5D6A7] transition-all shadow-lg whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* LBYA Animation Section */}
        <div ref={heroRef}>
          <section ref={wrapperRef} className="relative h-screen w-full bg-[#F5F5DC] overflow-hidden flex flex-col justify-between py-32 px-6">
            <div className="max-w-7xl mx-auto w-full">
              <h2 className="text-2xl md:text-3xl font-medium text-[#2E7D32] tracking-wide uppercase">
                Our Philosophy
              </h2>
            </div>

            <div className="w-full overflow-hidden">
              <h2
                ref={textRef}
                className="text-[25vw] leading-[0.8] font-bold text-[#2E7D32] tracking-tighter text-center"
                style={{ fontFamily: "'Tektur', sans-serif" }}
              >
                LBYA
              </h2>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function InsightsPage() {
  return <InsightsPageContent />;
}
