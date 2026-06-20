'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocale } from 'next-intl';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { pageFrameStyle } from '@/app/components/LayoutFrame';
import { getComingInsights } from '@/app/content/insights';
import Wordmark from '@/app/components/Wordmark';
import { asLocale, type Locale } from '@/app/content/locale';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type InsightsPageCopy = {
  title: string;
  subtitle: string;
  sectionTitle: string;
  filters: string[];
  status: string;
  planned: string;
  categoryTitle: string;
  categories: { title: string; body: string }[];
  newsletterTitle: string;
  newsletterBody: string;
  emailPlaceholder: string;
  subscribe: string;
  philosophy: string;
};

const insightsPageCopyByLocale: Record<Locale, InsightsPageCopy> = {
  en: {
    title: 'Insights',
    subtitle: 'Clear thinking on digital control products, BIM control, and African logistics.',
    sectionTitle: 'Planned insights',
    filters: ['All', 'BIM Control', 'African Logistics', 'Product Updates'],
    status: 'In preparation',
    planned: 'Planned article',
    categoryTitle: 'Explore by category',
    categories: [
      { title: 'BIM Control', body: 'Information control and governance for BIM teams.' },
      { title: 'African Logistics', body: 'Transport coordination and trade across African corridors.' },
      { title: 'Digital Control Products', body: 'How structured workflows turn data into decisions.' },
      { title: 'Product Updates', body: 'News from MCT and Nayeli BIM Control.' },
    ],
    newsletterTitle: 'Stay close to the product thinking',
    newsletterBody: 'Get future notes on MCT, NBC, and digital control workflows.',
    emailPlaceholder: 'Enter your email',
    subscribe: 'Subscribe',
    philosophy: 'Our philosophy',
  },
  sv: {
    title: 'Insikter',
    subtitle: 'Tydliga perspektiv på digitala kontrollprodukter, BIM-kontroll och afrikansk logistik.',
    sectionTitle: 'Planerade insikter',
    filters: ['Alla', 'BIM-kontroll', 'Afrikansk logistik', 'Produktnyheter'],
    status: 'Under förberedelse',
    planned: 'Planerad artikel',
    categoryTitle: 'Utforska efter kategori',
    categories: [
      { title: 'BIM-kontroll', body: 'Informationskontroll och styrning för BIM-team.' },
      { title: 'Afrikansk logistik', body: 'Transportsamordning och handel längs afrikanska korridorer.' },
      { title: 'Digitala kontrollprodukter', body: 'Hur strukturerade arbetsflöden gör data till beslut.' },
      { title: 'Produktnyheter', body: 'Nyheter från MCT och Nayeli BIM Control.' },
    ],
    newsletterTitle: 'Följ produktidéerna nära',
    newsletterBody: 'Få framtida anteckningar om MCT, NBC och digitala kontrollflöden.',
    emailPlaceholder: 'Ange din e-post',
    subscribe: 'Prenumerera',
    philosophy: 'Vår filosofi',
  },
  fr: {
    title: 'Analyses',
    subtitle: 'Des idées claires sur les produits de contrôle numérique, le contrôle BIM et la logistique africaine.',
    sectionTitle: 'Analyses prévues',
    filters: ['Tous', 'Contrôle BIM', 'Logistique africaine', 'Actualités produit'],
    status: 'En préparation',
    planned: 'Article prévu',
    categoryTitle: 'Explorer par catégorie',
    categories: [
      { title: 'Contrôle BIM', body: 'Contrôle de l’information et gouvernance pour les équipes BIM.' },
      { title: 'Logistique africaine', body: 'Coordination transport et commerce à travers les corridors africains.' },
      { title: 'Produits de contrôle numérique', body: 'Comment les flux structurés transforment les données en décisions.' },
      { title: 'Actualités produit', body: 'Nouvelles de MCT et Nayeli BIM Control.' },
    ],
    newsletterTitle: 'Suivez la réflexion produit',
    newsletterBody: 'Recevez de futures notes sur MCT, NBC et les flux de contrôle numérique.',
    emailPlaceholder: 'Entrez votre e-mail',
    subscribe: "S'abonner",
    philosophy: 'Notre philosophie',
  },
  de: {
    title: 'Einblicke',
    subtitle: 'Klare Gedanken zu digitalen Kontrollprodukten, BIM-Kontrolle und afrikanischer Logistik.',
    sectionTitle: 'Geplante Einblicke',
    filters: ['Alle', 'BIM-Kontrolle', 'Afrikanische Logistik', 'Produktupdates'],
    status: 'In Vorbereitung',
    planned: 'Geplanter Artikel',
    categoryTitle: 'Nach Kategorie erkunden',
    categories: [
      { title: 'BIM-Kontrolle', body: 'Informationskontrolle und Governance für BIM-Teams.' },
      { title: 'Afrikanische Logistik', body: 'Transportkoordination und Handel entlang afrikanischer Korridore.' },
      { title: 'Digitale Kontrollprodukte', body: 'Wie strukturierte Workflows Daten in Entscheidungen verwandeln.' },
      { title: 'Produktupdates', body: 'Neuigkeiten von MCT und Nayeli BIM Control.' },
    ],
    newsletterTitle: 'Nah an der Produktidee bleiben',
    newsletterBody: 'Erhalten Sie künftige Notizen zu MCT, NBC und digitalen Kontrollworkflows.',
    emailPlaceholder: 'E-Mail eingeben',
    subscribe: 'Abonnieren',
    philosophy: 'Unsere Philosophie',
  },
};

function InsightsPageContent() {
  const activeLocale = asLocale(useLocale());
  const copy = insightsPageCopyByLocale[activeLocale];
  const comingInsights = getComingInsights(activeLocale);
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="w-full">
        {/* Hero Section */}
        <section className="relative flex min-h-[60vh] flex-col justify-end bg-[#2E7D32] pb-24">
          <div
            className="content-frame grid grid-cols-1 gap-12 md:grid-cols-2 md:items-end"
            style={pageFrameStyle}
          >
            <div>
              <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tighter leading-none">
                {copy.title}
              </h1>
            </div>
            <div className="flex justify-start md:justify-end">
              <p className="text-xl md:text-2xl text-white font-medium leading-snug max-w-md">
                {copy.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Coming Insights Section */}
        <section className="py-24 bg-[#2E7D32]">
          <div className="content-frame" style={pageFrameStyle}>
            <div className="bg-white p-8 md:p-12">
              <div className="flex items-center justify-between mb-12 border-b border-[#2E7D32]/10 pb-4">
                <h2 className="text-3xl font-light text-[#2E7D32]">{copy.sectionTitle}</h2>
                <div className="hidden md:flex gap-4 text-sm font-medium text-[#37474F]/60">
                  {copy.filters.map((filter, index) => (
                    <span key={filter} className={index === 0 ? 'text-[#2E7D32] cursor-pointer' : 'hover:text-[#2E7D32] cursor-pointer transition-colors'}>
                      {filter}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {comingInsights.map((insight) => (
                  <article key={insight.title} className="group block">
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
                        <span className="text-xs text-[#37474F]/40 font-medium">{copy.status}</span>
                      </div>

                      <h3 className="text-xl font-medium text-[#2E7D32] mb-3 group-hover:text-[#1b5e20] transition-colors leading-snug">
                        {insight.title}
                      </h3>
                      <p className="text-[#37474F]/60 text-sm leading-relaxed mb-4 line-clamp-3">
                        {insight.excerpt}
                      </p>

                      <span className="inline-flex items-center gap-2 text-[#2E7D32] font-semibold text-xs uppercase tracking-wider">
                        {copy.planned}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-24 bg-[#F5F5DC]">
          <div className="content-frame" style={pageFrameStyle}>
            <h2 className="text-4xl font-light text-[#2E7D32] mb-12 text-center">{copy.categoryTitle}</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {copy.categories.map((category) => (
                <div key={category.title} className="p-6 bg-white rounded-sm hover:shadow-lg transition-all cursor-pointer">
                  <h3 className="text-xl font-semibold text-[#2E7D32] mb-2">{category.title}</h3>
                  <p className="text-[#37474F]/70 text-sm">{category.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-24 bg-[#F5F5DC]">
          <div ref={newsletterRef} className="content-frame" style={pageFrameStyle}>
            <div className="mx-auto max-w-4xl bg-[#2E7D32] p-12 text-center text-white shadow-2xl transform will-change-transform md:p-16">
              <h2 className="text-3xl md:text-4xl font-light mb-6">{copy.newsletterTitle}</h2>
              <p className="text-lg md:text-xl font-light mb-8 text-white/90">
                {copy.newsletterBody}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder={copy.emailPlaceholder}
                  className="flex-1 px-6 py-4 rounded-sm text-[#37474F] focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/95 backdrop-blur-sm"
                />
                <button className="px-8 py-4 bg-white text-[#2E7D32] font-medium rounded-sm hover:bg-[#A5D6A7] transition-all shadow-lg whitespace-nowrap">
                  {copy.subscribe}
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* LBYA Animation Section */}
        <div ref={heroRef}>
          <section ref={wrapperRef} className="relative flex h-screen w-full flex-col justify-between overflow-hidden bg-[#F5F5DC] py-32">
            <div className="content-frame" style={pageFrameStyle}>
              <h2 className="text-2xl md:text-3xl font-medium text-[#2E7D32] tracking-wide uppercase">
                {copy.philosophy}
              </h2>
            </div>

            <div className="w-full overflow-hidden">
              <h2
                ref={textRef}
                className="flex justify-center"
              >
                <Wordmark
                  className="h-[18vw] min-h-20 max-h-48 w-[70vw] max-w-4xl"
                  imageStyle={{
                    filter: 'brightness(0) saturate(100%) invert(31%) sepia(42%) saturate(965%) hue-rotate(74deg) brightness(92%) contrast(92%)',
                  }}
                  sizes="80vw"
                />
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
