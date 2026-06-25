'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useLocale } from 'next-intl';
import { getSite } from '../content/site';
import { asLocale, type Locale } from '../content/locale';
import { localizePath } from '../content/paths';
import Wordmark from './Wordmark';

const heroStatusByLocale: Record<Locale, string> = {
  en: 'MCT is ready for demo. NBC access is available by request.',
  sv: 'NBC \u00e4r i tidig utveckling f\u00f6r BIM-kontroll.',
  fr: 'MCT est pr\u00eat pour une d\u00e9mo. NBC est en d\u00e9veloppement pr\u00e9coce.',
  de: 'MCT ist demo-bereit. NBC befindet sich in fr\u00fcher Entwicklung.',
};

const rootBranches = [
  { d: 'M190 610 C168 565 172 530 138 496', delay: '0s' },
  { d: 'M214 610 C232 566 248 536 292 506', delay: '0.2s' },
  { d: 'M238 610 C230 555 252 510 336 468', delay: '0.4s' },
  { d: 'M168 610 C134 575 110 548 70 536', delay: '0.6s' },
];

const futureLines = [
  'M902 288 H1012 V240 H1116',
  'M980 378 H1134 V326 H1244',
  'M1010 472 H1164 V522 H1302',
  'M1140 210 H1266 V276 H1370',
];

const signalNodes = [
  { x: 294, y: 499, delay: '0.2s' },
  { x: 336, y: 461, delay: '0.7s' },
  { x: 1012, y: 236, delay: '1s' },
  { x: 1134, y: 322, delay: '1.4s' },
  { x: 1164, y: 518, delay: '1.8s' },
  { x: 1266, y: 272, delay: '2.2s' },
];

function NatureFutureLayer() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#07130A]/55 via-[#07130A]/20 to-transparent" />
      <div
        className="hero-grid-scan absolute right-0 top-20 hidden h-[70%] w-[42%] opacity-35 lg:block"
        style={{
          backgroundImage:
            'linear-gradient(rgba(129, 212, 250, 0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(129, 212, 250, 0.16) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'linear-gradient(90deg, transparent, black 24%, black 78%, transparent)',
        }}
      />
      <svg
        className="absolute inset-x-0 bottom-0 h-[62vh] w-full opacity-95"
        viewBox="0 0 1440 620"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="hero-root-signal" x1="0%" y1="70%" x2="100%" y2="20%">
            <stop offset="0%" stopColor="#A5D6A7" stopOpacity="0.15" />
            <stop offset="35%" stopColor="#A5D6A7" stopOpacity="0.78" />
            <stop offset="66%" stopColor="#F5F5DC" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#81D4FA" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        <path
          className="hero-signal-line"
          d="M42 548 C206 468 268 564 428 470 C584 378 634 300 808 320 C930 334 982 232 1114 272 C1230 306 1290 248 1406 214"
          fill="none"
          stroke="url(#hero-root-signal)"
          strokeWidth="2.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        {rootBranches.map((branch) => (
          <path
            key={branch.d}
            className="hero-root-line"
            d={branch.d}
            fill="none"
            stroke="#A5D6A7"
            strokeWidth="1.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ animationDelay: branch.delay }}
          />
        ))}

        {futureLines.map((line) => (
          <path
            key={line}
            className="hero-future-line hidden md:block"
            d={line}
            fill="none"
            stroke="#81D4FA"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {signalNodes.map((node) => (
          <rect
            key={`${node.x}-${node.y}`}
            className={`hero-signal-node ${node.x < 900 ? '' : 'hidden md:block'}`}
            x={node.x}
            y={node.y}
            width="10"
            height="10"
            fill="none"
            stroke={node.x < 900 ? '#A5D6A7' : '#81D4FA'}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            style={{ animationDelay: node.delay }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function HeroSection() {
  const activeLocale = asLocale(useLocale());
  const home = getSite(activeLocale).home;
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bottomContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHomeAlignment = () => {
      const slogan = document.querySelector<HTMLElement>('[data-hero-align-left]');
      const demoCta = document.querySelector<HTMLElement>('[data-hero-align-right]');

      if (!slogan || !demoCta) return;

      const sloganRect = slogan.getBoundingClientRect();
      const demoRect = demoCta.getBoundingClientRect();
      const layoutWidth = document.documentElement.clientWidth;
      const rightGap = Math.max(0, layoutWidth - demoRect.right);

      document.documentElement.style.setProperty('--home-align-left', `${Math.round(sloganRect.left)}px`);
      document.documentElement.style.setProperty('--home-align-right-gap', `${Math.round(rightGap)}px`);
    };

    updateHomeAlignment();
    const timers = [window.setTimeout(updateHomeAlignment, 250), window.setTimeout(updateHomeAlignment, 800)];
    window.addEventListener('resize', updateHomeAlignment);

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener('resize', updateHomeAlignment);
      document.documentElement.style.removeProperty('--home-align-left');
      document.documentElement.style.removeProperty('--home-align-right-gap');
    };
  }, [activeLocale]);

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
    <section className="relative min-h-[92svh] lg:h-screen flex flex-col justify-center lg:justify-end overflow-hidden bg-[#37474F]">
      {/* Full-screen nature-to-digital image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-nature-digital-transition.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(7,19,10,0.72)_0%,_rgba(46,125,50,0.36)_44%,_rgba(55,71,79,0.62)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,_rgba(255,255,255,0.06)_0%,_rgba(55,71,79,0.36)_58%,_rgba(7,19,10,0.76)_100%)]" />
      </div>

      <NatureFutureLayer />

      <div className="relative z-10 w-full px-6 lg:px-12 pb-12 md:pb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
        {/* Bottom Left Content - Title */}
        <div className="flex flex-col justify-end items-center max-w-2xl mx-auto lg:mx-0">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 mb-5 md:mb-6">
            <div className="hero-core-ring absolute -inset-5 rounded-full border border-[#A5D6A7]/30" />
            <div className="hero-core-ring hero-core-ring-reverse absolute inset-2 rounded-full border border-[#81D4FA]/25" />
            <div className="absolute left-1/2 top-full hidden h-16 w-px -translate-x-1/2 bg-gradient-to-b from-[#A5D6A7]/70 to-transparent md:block" />
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
            <Wordmark
              className="mb-4 h-10 w-36 sm:h-12 sm:w-44 md:h-16 md:w-64"
              priority
              sizes="(max-width: 768px) 176px, 256px"
            />
            <span className="block text-base sm:text-lg md:text-2xl text-white/90 font-light tracking-wide">
              <span data-hero-align-left>{home.hero.slogan}</span>
            </span>
            <span aria-hidden="true" className="mt-5 flex h-4 items-center justify-center gap-2">
              <span className="h-px w-14 bg-[#A5D6A7]/70" />
              <span className="h-2 w-2 rotate-45 border border-[#A5D6A7]" />
              <span className="h-px w-8 bg-white/45" />
              <span className="h-2 w-2 rotate-45 border border-[#81D4FA]" />
              <span className="h-px w-14 bg-[#81D4FA]/70" />
            </span>
          </h1>
        </div>

        {/* Bottom Right Content - Text Carousel & Buttons */}
        <div className="flex justify-end items-center lg:items-end w-full pr-0 lg:pr-16 xl:pr-24">
          <div ref={bottomContentRef} className="max-w-2xl text-center lg:text-right flex flex-col items-center lg:items-end">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-white leading-snug mb-5 drop-shadow-md">
              {home.hero.headline}
            </h2>
            <p className="text-base md:text-lg text-white/88 font-light leading-relaxed drop-shadow-md max-w-xl">
              {home.hero.subheadline}
            </p>
            <p className="mt-5 border-l border-[#A5D6A7]/55 pl-4 text-sm font-medium leading-6 text-white/78 lg:text-right lg:border-l-0 lg:border-r lg:pl-0 lg:pr-4">
              {heroStatusByLocale[activeLocale]}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-end w-full">
              <a
                href={localizePath(activeLocale, home.hero.primaryCtas[0].href)}
                className="bg-white text-[#2E7D32] hover:bg-[#A5D6A7] group px-6 py-4 font-medium rounded-sm shadow-xl hover:shadow-2xl inline-flex items-center gap-2 justify-center transition-colors"
              >
                <span>{home.hero.primaryCtas[0].label}</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href={localizePath(activeLocale, home.hero.primaryCtas[1].href)}
                data-hero-align-right
                className="btn-slide-fill group px-6 py-4 font-medium rounded-sm shadow-xl hover:shadow-2xl inline-flex items-center gap-2 justify-center"
              >
                <span>{home.hero.primaryCtas[1].label}</span>
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
