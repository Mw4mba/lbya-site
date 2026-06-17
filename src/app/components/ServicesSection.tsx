'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { getSite } from '../content/site';

export default function ServicesSection() {
  const site = getSite(useLocale());
  const carouselRef = useRef<HTMLDivElement>(null);
  const categories = site.services.categories;
  const [activeIndex, setActiveIndex] = useState(0);

  // Navigate to previous/next slide with looping
  const goToSlide = (direction: 'prev' | 'next') => {
    setActiveIndex((current) => {
      if (direction === 'next') return (current + 1) % categories.length;
      return (current - 1 + categories.length) % categories.length;
    });
  };

  // Scroll active slide into center view
  useEffect(() => {
    if (carouselRef.current) {
      const cards = carouselRef.current.children;
      if (cards[activeIndex]) {
        const card = cards[activeIndex] as HTMLElement;
        const containerWidth = carouselRef.current.offsetWidth;
        const cardLeft = card.offsetLeft;
        const cardWidth = card.offsetWidth;
        const scrollPosition = cardLeft - containerWidth / 2 + cardWidth / 2;

        carouselRef.current.scrollTo({
          left: scrollPosition,
          behavior: 'smooth',
        });
      }
    }
  }, [activeIndex]);

  const active = categories[activeIndex];

  return (
    <section id="services" className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header - Aligned Center */}
        <div className="mb-12 text-center flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2E7D32] mb-6">
            {site.home.servicesTeaser.heading}
          </h2>
          <p className="text-[#37474F]/70 text-lg max-w-xl font-light mb-8">
            {site.home.servicesTeaser.body}
          </p>

          {/* Controls - Centered below subtitle */}
          <div className="flex justify-center gap-2 pb-2">
            <button
              onClick={() => goToSlide('prev')}
              className="p-3 rounded-full hover:bg-black/5 transition-colors bg-transparent border-none"
              aria-label="Previous slide"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 19L8 12L15 5" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => goToSlide('next')}
              className="p-3 rounded-full hover:bg-black/5 transition-colors bg-transparent border-none"
              aria-label="Next slide"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5L16 12L9 19" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel / Tabs Container */}
        <div className="flex flex-col gap-12">
          {/* The Strip of Cards */}
          <div className="w-full">
            <div
              ref={carouselRef}
              className="flex overflow-x-auto gap-6 pb-2 snap-x scrollbar-hide px-2 scroll-smooth"
            >
              {categories.map((item, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={item.title}
                    onClick={() => setActiveIndex(index)}
                    className={`
                      relative group flex-none flex flex-col text-left rounded-sm transition-all duration-500 ease-in-out snap-center
                      ${isActive
                        ? 'w-96 opacity-100 scale-100'
                        : 'w-72 opacity-70 hover:opacity-100 scale-95 hover:scale-95'
                      }
                    `}
                  >
                    {/* Image Container */}
                    <div className="relative w-full h-56 mb-4 overflow-hidden rounded-sm bg-gray-200">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 384px"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {!isActive && <div className="absolute inset-0 bg-white/10" />}
                    </div>

                    {/* Content */}
                    <div className="pt-2 transition-colors duration-300">
                      <h3 className="text-xl font-bold mb-2 text-black group-hover:text-[#2E7D32] transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Content Display with Sandy Brown Background */}
            <div className="mt-8 bg-[#F5F5DC] p-8 rounded-sm">
              <div className="max-w-4xl">
                {/* Description Text */}
                <p className="text-[#37474F] font-light text-lg leading-relaxed mb-6">
                  {active.body}
                </p>

                {/* Tags - Pill-shaped buttons */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {active.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 border border-[#2E7D32] text-[#2E7D32] text-sm font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Learn More link to services index */}
                <div className="pt-2">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-[#2E7D32] text-sm font-medium hover:gap-3 transition-all"
                  >
                    <span>Learn more</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
