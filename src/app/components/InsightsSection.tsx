'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocale } from 'next-intl';
import { getComingInsights } from '../content/insights';
import { asLocale, type Locale } from '../content/locale';

gsap.registerPlugin(ScrollTrigger);

type InsightsCopy = {
  eyebrow: string;
  heading: string;
  body: string;
  status: string;
  featuredLabel: string;
  supportingLabel: string;
  cta: string;
  pipeline: { label: string; value: string }[];
};

const insightsCopyByLocale: Record<Locale, InsightsCopy> = {
  en: {
    eyebrow: 'Planned insights',
    heading: 'Product thinking as MCT and NBC mature.',
    body: 'The next articles connect directly to MCT, NBC, and the product decisions customers need to understand before they choose a path.',
    status: 'In preparation',
    featuredLabel: 'Featured theme',
    supportingLabel: 'Next in queue',
    cta: 'View insight themes',
    pipeline: [
      { label: 'MCT', value: 'Logistics proof and document trust' },
      { label: 'NBC', value: 'BIM control and decision readiness' },
      { label: 'Products', value: 'Traceable product workflows' },
    ],
  },
  sv: {
    eyebrow: 'Planerade insikter',
    heading: 'Produkttänkande medan MCT och NBC mognar.',
    body: 'De kommande artiklarna kopplas direkt till MCT, NBC och de produktbeslut som kunder behöver förstå innan de väljer väg.',
    status: 'Under förberedelse',
    featuredLabel: 'Utvalt tema',
    supportingLabel: 'Nästa i kön',
    cta: 'Visa insiktsteman',
    pipeline: [
      { label: 'MCT', value: 'Logistikunderlag och dokumenttillit' },
      { label: 'NBC', value: 'BIM-kontroll och beslutsberedskap' },
      { label: 'Produkter', value: 'Spårbara produktarbetsflöden' },
    ],
  },
  fr: {
    eyebrow: 'Analyses prévues',
    heading: 'Une réflexion produit à mesure que MCT et NBC mûrissent.',
    body: 'Les prochains articles sont directement liés à MCT, NBC et aux décisions produit que les clients doivent comprendre avant de choisir une voie.',
    status: 'En préparation',
    featuredLabel: 'Thème principal',
    supportingLabel: 'Prochains sujets',
    cta: 'Voir les thèmes d’analyse',
    pipeline: [
      { label: 'MCT', value: 'Preuves logistiques et confiance documentaire' },
      { label: 'NBC', value: 'Contrôle BIM et préparation à la décision' },
      { label: 'Produits', value: 'Flux produit traçables' },
    ],
  },
  de: {
    eyebrow: 'Geplante Einblicke',
    heading: 'Produktdenken, während MCT und NBC reifen.',
    body: 'Die nächsten Artikel knüpfen direkt an MCT, NBC und die Produktentscheidungen an, die Kunden verstehen müssen, bevor sie einen Pfad wählen.',
    status: 'In Vorbereitung',
    featuredLabel: 'Hauptthema',
    supportingLabel: 'Als Nächstes',
    cta: 'Insight-Themen ansehen',
    pipeline: [
      { label: 'MCT', value: 'Logistiknachweise und Dokumentenvertrauen' },
      { label: 'NBC', value: 'BIM-Kontrolle und Entscheidungsreife' },
      { label: 'Produkte', value: 'Nachverfolgbare Produkt-Workflows' },
    ],
  },
};

function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

export default function InsightsSection() {
  const activeLocale = asLocale(useLocale());
  const copy = insightsCopyByLocale[activeLocale];
  const insights = getComingInsights(activeLocale);
  const [featuredInsight, ...supportingInsights] = insights;
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);

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
            scrollTrigger: { trigger: card, start: 'top 86%' },
            opacity: 0,
            y: 34,
            duration: 0.65,
            delay: index * 0.08,
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  if (!featuredInsight) {
    return null;
  }

  return (
    <section id="insights" ref={sectionRef} className="relative overflow-hidden bg-[#37474F] py-20 text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-white/12" />
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div ref={titleRef} className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F5C469]">{copy.eyebrow}</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-light leading-tight md:text-5xl">
              {copy.heading}
            </h2>
          </div>
          <div>
            <p className="max-w-3xl text-base leading-8 text-white/70 md:text-lg">{copy.body}</p>
            <div className="mt-6 grid grid-cols-1 border-y border-white/14 sm:grid-cols-3">
              {copy.pipeline.map((item) => (
                <div key={item.label} className="border-white/14 py-4 pr-5 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#F5C469]/72">{item.label}</p>
                  <p className="mt-2 text-sm leading-6 text-white/72">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article
            ref={(el) => {
              cardsRef.current[0] = el;
            }}
            className="group overflow-hidden rounded-sm border border-white/12 bg-white/[0.04]"
          >
            <div className="relative min-h-[320px] overflow-hidden">
              <Image
                src={featuredInsight.image}
                alt={featuredInsight.title}
                fill
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#37474F]/88 via-[#37474F]/25 to-transparent" />
              <div className="absolute left-5 top-5 flex flex-wrap items-center gap-3">
                <span className="bg-[#F5C469] px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#37474F]">
                  {copy.featuredLabel}
                </span>
                <span className="border border-white/30 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                  {featuredInsight.category}
                </span>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#F5C469]/78">{copy.status}</p>
              <h3 className="mt-4 text-3xl font-light leading-tight text-white md:text-4xl">
                {featuredInsight.title}
              </h3>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/68">{featuredInsight.excerpt}</p>
            </div>
          </article>

          <div className="grid grid-cols-1 gap-6">
            {supportingInsights.map((insight, index) => (
              <article
                key={insight.title}
                ref={(el) => {
                  cardsRef.current[index + 1] = el;
                }}
                className="group grid grid-cols-1 overflow-hidden rounded-sm border border-white/12 bg-white/[0.04] sm:grid-cols-[190px_1fr]"
              >
                <div className="relative min-h-[190px] overflow-hidden">
                  <Image
                    src={insight.image}
                    alt={insight.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 190px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#37474F]/20" />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#F5C469]/78">{copy.supportingLabel}</p>
                  <p className="mt-3 text-sm font-semibold text-white/58">{insight.category}</p>
                  <h3 className="mt-3 text-xl font-medium leading-snug text-white">{insight.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/62">{insight.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <a
            href={`/${activeLocale}/insights`}
            className="inline-flex items-center gap-3 rounded-sm bg-white px-7 py-3.5 font-medium text-[#37474F] transition-colors hover:bg-[#F5C469]"
          >
            <span>{copy.cta}</span>
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
