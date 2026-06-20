'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocale } from 'next-intl';
import { getSite } from '../content/site';
import { asLocale, type Locale } from '../content/locale';

gsap.registerPlugin(ScrollTrigger);

const exploreCopyByLocale: Record<Locale, string> = {
  en: 'Explore',
  sv: 'Utforska',
  fr: 'Découvrir',
  de: 'Entdecken',
};

function localizePath(locale: Locale, href: string) {
  if (!href.startsWith('/')) return href;
  if (href === '/') return `/${locale}`;
  return `/${locale}${href}`;
}

export default function CaseStudiesSection() {
  const activeLocale = asLocale(useLocale());
  const CASE_STUDIES = getSite(activeLocale).caseStudies;
  const exploreLabel = exploreCopyByLocale[activeLocale];
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
      });

      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
            duration: 0.8,
            delay: index * 0.1,
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="case-studies" ref={sectionRef} className="py-24 bg-[#2E7D32]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={titleRef} className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
            {CASE_STUDIES.heading}
          </h2>
          <p className="text-white/80 text-lg font-light">
            {CASE_STUDIES.subtitle}
          </p>
        </div>

        <div className="space-y-12">
          {CASE_STUDIES.items.map((study, index) => (
            <div
              key={study.title}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            >
              <div className={`relative h-96 overflow-hidden rounded-sm ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#2E7D32]/60" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider">
                    {study.acronym}
                  </span>
                </div>
              </div>

              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <p className="text-[#A5D6A7] text-sm font-semibold mb-2">{study.context}</p>
                <h3 className="text-3xl md:text-4xl font-light text-white mb-4">
                  {study.title}
                </h3>
                <p className="text-white/80 leading-relaxed mb-6 text-lg font-light">
                  {study.description}
                </p>
                <a
                  href={localizePath(activeLocale, study.href)}
                  className="inline-flex items-center gap-2 text-white font-semibold text-sm hover:gap-3 transition-all"
                >
                  <span>{exploreLabel} {study.product}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
