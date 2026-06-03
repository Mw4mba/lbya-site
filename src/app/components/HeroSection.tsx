'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useTranslation } from '../i18n/I18nContext';

export default function HeroSection() {
  const { t } = useTranslation();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bottomContentRef = useRef<HTMLDivElement>(null);
  const [currentTextIndex, setCurrentTextIndex] = React.useState(0);
  const textRef = useRef<HTMLParagraphElement>(null);

  // Background Image Carousel State
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const heroImages = [
    "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?q=80&w=2070&auto=format&fit=crop", // Stockholm
    "https://images.unsplash.com/photo-1611348524140-53c9a25263d6?q=80&w=2070&auto=format&fit=crop", // Kinshasa
    "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=2071&auto=format&fit=crop", // Cape Town
    "https://images.unsplash.com/photo-1577948000111-9c970dfe3743?q=80&w=2070&auto=format&fit=crop" // Johannesburg
  ];

  const carouselItems = t.hero.carouselItems;

  // Text Carousel Interval
  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      if (textRef.current) {
        gsap.to(textRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          onComplete: () => {
            setCurrentTextIndex((prev) => (prev + 1) % carouselItems.length);
            // Fade in
            if (textRef.current) {
              gsap.fromTo(textRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5 }
              );
            }
          }
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselItems.length]);

  // Image Carousel Interval
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(imageInterval);
  }, [heroImages.length]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: 'power3.out',
      });

      gsap.from(bottomContentRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.4,
        ease: 'power3.out',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative h-screen flex flex-col justify-center lg:justify-end overflow-hidden bg-[#37474F]">
      {/* Full-screen background image carousel with overlay */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <Image
              src={src}
              alt="Background"
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(55,71,79,0.5)_60%,_rgba(46,125,50,0.8)_100%)]" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
        {/* Bottom Left Content - Title */}
        <div className="flex flex-col justify-end items-center max-w-2xl mx-auto lg:mx-0">
          <div className="relative w-48 h-48 md:w-64 md:h-64 mb-6">
            <Image
              src="/logoC.svg"
              alt="LBYA Logo"
              fill
              sizes="(max-width: 768px) 192px, 256px"
              className="object-contain"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
          <h1
            ref={titleRef}
            className="text-center"
          >
            <span
              className="block font-bold tracking-[0.15em] text-white leading-none text-4xl md:text-6xl mb-4"
              style={{ fontFamily: "'Tektur', sans-serif" }}
            >
              LBYA
            </span>
            <span className="block text-lg md:text-2xl text-white/90 font-light tracking-wide">
              {t.hero.slogan}
            </span>
          </h1>
        </div>

        {/* Bottom Right Content - Text Carousel & Buttons */}
        <div className="flex justify-end items-center lg:items-end w-full pr-0 lg:pr-16 xl:pr-24">
          <div ref={bottomContentRef} className="max-w-xl text-center lg:text-right flex flex-col items-center lg:items-end">
            <div className="h-24 md:h-28 mb-8 flex items-end justify-center lg:justify-end">
              <p
                ref={textRef}
                className="text-base md:text-lg lg:text-xl text-white/95 font-light leading-relaxed drop-shadow-md"
              >
                {carouselItems[currentTextIndex]}
              </p>
            </div>

            <div className="flex flex-row gap-4 justify-center lg:justify-end w-full">
              <a
                href="#services"
                className="btn-slide-fill group px-6 py-4 font-medium rounded-sm shadow-xl hover:shadow-2xl inline-flex items-center gap-2 justify-center flex-1 sm:flex-none sm:px-8"
              >
                <span>{t.hero.ctaWhatWeDo}</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-float z-20">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
