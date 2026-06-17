'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocale } from 'next-intl';
import { getProducts } from '../content/products';
import { getSite } from '../content/site';

gsap.registerPlugin(ScrollTrigger);

export default function ProductsShowcase() {
  const locale = useLocale();
  const products = getProducts(locale);
  const home = getSite(locale).home;
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        opacity: 0,
        y: 30,
        duration: 0.8,
      });

      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: { trigger: card, start: 'top 85%' },
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
    <section id="products" ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={titleRef} className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-[#2E7D32] text-sm font-semibold uppercase tracking-widest mb-4">Products</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#2E7D32] mb-6">
            {home.answer.heading}
          </h2>
          <p className="text-[#37474F]/70 text-lg font-light leading-relaxed">
            {home.problem.body} {home.answer.body}
          </p>
        </div>

        <div className="space-y-16 lg:space-y-24">
          {products.map((product, index) => (
            <div
              key={product.slug}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              <div className={`relative h-80 lg:h-96 overflow-hidden rounded-sm ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#2E7D32]/60 to-transparent" />
                <span className="absolute top-6 left-6 inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider">
                  {product.acronym}
                </span>
              </div>

              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <h3 className="text-3xl md:text-4xl font-light text-[#2E7D32] mb-3">{product.name}</h3>
                <p className="text-[#37474F]/60 text-sm font-medium mb-5">{product.tagline}</p>
                <p className="text-[#37474F]/80 leading-relaxed mb-8 text-lg font-light">
                  {product.cardCopy}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={product.primaryCta.href}
                    className="btn-slide-fill-green group px-7 py-3.5 font-medium rounded-sm inline-flex items-center gap-2"
                  >
                    <span>{product.primaryCta.label}</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  {product.liveCta && (
                    <a
                      href={product.liveCta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#37474F]/60 hover:text-[#2E7D32] font-medium text-sm transition-colors"
                    >
                      <span>{product.liveCta.label}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
