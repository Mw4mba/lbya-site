'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocale } from 'next-intl';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { getSite } from '@/app/content/site';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

import Image from 'next/image';

export default function AboutPage() {
  const ABOUT = getSite(useLocale()).about;
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      if (wrapperRef.current && textRef.current) {
        const ctx = gsap.context(() => {
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
                pinSpacing: true,
              }
            }
          );
        }, wrapperRef);

        return () => ctx.revert();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Visual Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <Image
          src="/Website/2.png"
          alt="About Us Hero"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2E7D32] via-[#2E7D32]/40 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 w-full px-6 pb-12 md:pb-24">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tighter leading-none">
              Our Story
            </h1>
          </div>
        </div>
      </section>

      {/* Intro Text Section - Green */}
      <section className="bg-[#2E7D32] py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-light text-white mb-8 leading-tight tracking-tight">
            {ABOUT.intro.heading}
          </h2>
          <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-light">
            {ABOUT.intro.body}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24">

        {/* Mission Section - Inspired by Jeton's "Money, but better" */}
        {/* What We Do Section */}
        {/* What We Do Section */}
        <div className="relative min-h-[800px] py-12 mb-32">
          {/* Centered Logo */}
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <Image
              src="/logoC.svg"
              alt="LBYA"
              width={400}
              height={400}
              className="object-contain opacity-20"
              style={{ filter: 'invert(58%) sepia(8%) saturate(2250%) hue-rotate(352deg) brightness(96%) contrast(89%)' }}
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 w-full h-full min-h-[700px]">
            {/* Top Left Content */}
            <div className="md:self-start">
              <h2 className="text-4xl md:text-5xl font-light text-[#2E7D32] mb-8">
                {ABOUT.evolution.heading}
              </h2>
              <p className="text-xl text-[#37474F]/80 leading-relaxed">
                {ABOUT.evolution.body}
              </p>
            </div>

            {/* Bottom Right Content */}
            <div className="md:col-start-2 md:self-end md:text-right">
              <p className="text-xl text-[#37474F]/80 leading-relaxed">
                {ABOUT.evolution.body2}
              </p>
            </div>
          </div>
        </div>

        {/* Values Section - Inspired by Jeton's "01. For you" */}
        <div className="mb-32">
          <h2 className="text-4xl font-light text-[#2E7D32] mb-16 text-center">{ABOUT.vision.heading}</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {ABOUT.vision.points.map((point, idx) => (
              <div key={point.title} className="border-t border-[#2E7D32]/20 pt-8">
                <span className="text-6xl font-light text-[#A5D6A7]/50 mb-6 block">
                  0{idx + 1}.
                </span>
                <h3 className="text-2xl font-medium text-[#2E7D32] mb-4">{point.title}</h3>
                <p className="text-[#37474F]/80 leading-relaxed">{point.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quote Section */}
        <div className="bg-[#F5F5DC] p-12 md:p-24 rounded-sm mb-32 text-center">
          <blockquote className="text-2xl md:text-3xl font-light text-[#2E7D32] leading-relaxed mb-8">
            "We observed how the construction industry was drifting away from nature. Even the simplest projects ignored their environmental context. The fact that today's infrastructure was not resilient enough for tomorrow's climate ignited our desire to create <span style={{ fontFamily: "'Tektur', sans-serif" }}>LBYA</span>."
          </blockquote>
          <cite className="text-[#37474F] font-medium not-italic block">
            <span style={{ fontFamily: "'Tektur', sans-serif" }}>LBYA</span>
          </cite>
        </div>

        {/* Closing statement */}
        <div className="text-center mb-16">
          <p className="text-3xl md:text-4xl font-light text-[#2E7D32] tracking-tight max-w-3xl mx-auto">
            {ABOUT.closing}
          </p>
        </div>

        <div className="mt-16 pt-8 border-t border-[#2E7D32]/20 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#2E7D32] text-white font-medium rounded-sm hover:bg-[#1b5e20] transition-all shadow-lg hover:shadow-xl"
          >
            Contact Us
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* LBYA Animation Section */}
      <div ref={heroRef}>
        <section ref={wrapperRef} className="relative min-h-[50vh] md:h-screen w-full bg-[#F5F5DC] overflow-hidden flex flex-col justify-center gap-8 md:gap-0 md:justify-between py-12 md:py-32 px-6">
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

      <Footer />
    </div >
  );
}
