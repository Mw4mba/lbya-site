'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from '../i18n/I18nContext';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.from(contentRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
          opacity: 0,
          y: 40,
          duration: 1,
          ease: 'power2.out',
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="careers"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/cta/careers-bg.jpg"
          alt="Team collaboration"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#37474F]/80 via-[#2E7D32]/70 to-[#37474F]/80" />
      </div>

      <div ref={contentRef} className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
          {t.cta.title} <span className="font-semibold">{t.cta.titleBold}</span>
        </h2>
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
          {t.cta.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a
            href="/careers"
            className="btn-slide-fill group px-10 py-5 font-medium rounded-sm shadow-xl hover:shadow-2xl inline-flex items-center gap-3 justify-center"
          >
            <span>{t.cta.searchApply}</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="/about"
            className="btn-slide-fill group px-10 py-5 font-medium rounded-sm shadow-xl hover:shadow-2xl inline-flex items-center gap-3 justify-center"
          >
            <span>Life at <span style={{ fontFamily: "'Tektur', sans-serif", fontSize: '1.3em', lineHeight: '1' }}>LBYA</span></span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
