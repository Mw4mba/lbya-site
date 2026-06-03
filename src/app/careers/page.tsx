'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function CareersPage() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          { scaleY: 0, transformOrigin: 'bottom' },
          {
            scaleY: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });
  }, []);
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex flex-col justify-end pb-24 px-6 bg-[#2E7D32]">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
          <div>
            <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tighter leading-none">
              Careers at <span style={{ fontFamily: "'Tektur', sans-serif" }}>LBYA</span>
            </h1>
          </div>
          <div className="flex justify-start md:justify-end">
            <p className="text-xl md:text-2xl text-white font-medium leading-snug max-w-md">
              Build a career that's as unique as you. Join our team of innovators shaping a sustainable future.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24">

        <div className="bg-[#2E7D32] p-8 md:p-16 rounded-sm mb-16">
          <h2 className="text-3xl font-light text-[#F5F5DC] mb-12 text-center">Why Work With Us?</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div ref={(el) => { cardsRef.current[0] = el; }} className="border-t border-[#F5F5DC]/20 pt-8">
              <span className="text-6xl font-light text-[#F5F5DC]/50 mb-6 block">01.</span>
              <h3 className="text-2xl font-medium text-[#F5F5DC] mb-4">Impactful Work</h3>
              <p className="text-[#F5F5DC]/80 leading-relaxed">
                Contribute to projects that make a real difference in creating a sustainable future.
              </p>
            </div>

            <div ref={(el) => { cardsRef.current[1] = el; }} className="border-t border-[#F5F5DC]/20 pt-8 md:mt-0">
              <span className="text-6xl font-light text-[#F5F5DC]/50 mb-6 block">02.</span>
              <h3 className="text-2xl font-medium text-[#F5F5DC] mb-4">Collaborative Culture</h3>
              <p className="text-[#F5F5DC]/80 leading-relaxed">
                Work with talented professionals in an environment that values diversity and teamwork.
              </p>
            </div>

            <div ref={(el) => { cardsRef.current[2] = el; }} className="border-t border-[#F5F5DC]/20 pt-8 md:mt-0">
              <span className="text-6xl font-light text-[#F5F5DC]/50 mb-6 block">03.</span>
              <h3 className="text-2xl font-medium text-[#F5F5DC] mb-4">Growth & Development</h3>
              <p className="text-[#F5F5DC]/80 leading-relaxed">
                Access continuous learning opportunities and clear career progression paths.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-light text-[#2E7D32] mb-6">Open Positions</h2>
          <p className="text-[#37474F]/80 mb-8">
            We currently have no open positions. Check back soon for new opportunities, or submit your application below to be considered for future roles.
          </p>

          <div className="rounded-sm p-12 text-center bg-white border border-[#2E7D32]">
            <svg className="w-16 h-16 text-[#2E7D32] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="text-lg text-[#2E7D32] font-medium">No current listings</p>
          </div>
        </div>

        <div className="bg-[#2E7D32] text-white p-12 rounded-sm">
          <h2 className="text-3xl font-light mb-4">Don't see the right position?</h2>
          <p className="text-white/90 mb-6 text-lg">
            We're always looking for talented individuals. Send us your CV and tell us why you'd like to join <span style={{ fontFamily: "'Tektur', sans-serif" }}>LBYA</span>.
          </p>
          <button className="px-8 py-4 bg-white text-[#2E7D32] font-medium rounded-sm hover:bg-[#A5D6A7] transition-all shadow-lg hover:shadow-xl">
            Submit Your Application
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
