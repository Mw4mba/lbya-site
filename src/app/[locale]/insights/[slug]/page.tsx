'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { useTranslation } from '@/app/i18n/I18nContext';

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const { t, language } = useTranslation();

  // Map slug to article data
  const getArticleData = () => {
    if (slug.includes('climate-resilience') || slug.includes('resilience-climatique') || slug.includes('klimatresiliens')) {
      return t.insights.items.climate;
    } else if (slug.includes('carbon-negative') || slug.includes('carbone-negatif') || slug.includes('koldioxidnegativa')) {
      return t.insights.items.materials;
    } else if (slug.includes('digital-twin') || slug.includes('jumeau-numerique') || slug.includes('digital-tvilling')) {
      return t.insights.items.digitalTwin;
    } else if (slug.includes('ai-in-optimizing') || slug.includes('role-de-l-ia') || slug.includes('ai-s-roll')) {
      return t.insights.items.aiConstruction;
    } else if (slug.includes('integrating-biodiversity') || slug.includes('integrer-la-biodiversite') || slug.includes('integrera-biologisk')) {
      return t.insights.items.urbanBiodiversity;
    }
    // Default fallback
    return {
      title: slug.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' '),
      category: 'Article',
      excerpt: '',
      date: ''
    };
  };

  const article = getArticleData();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="w-full">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-[#2E7D32] hover:text-[#1b5e20] mb-8 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {language === 'EN' ? 'Back to Insights' : language === 'FR' ? 'Retour aux Insights' : 'Tillbaka till Insikter'}
          </Link>

          <div className="mb-8">
            <span className="px-4 py-2 bg-[#2E7D32] text-white text-xs font-semibold uppercase tracking-wider">
              {article.category}
            </span>
            <p className="text-sm text-[#37474F]/60 mt-6 font-medium">{article.date}</p>
          </div>

          <h1 className="text-4xl md:text-5xl font-light text-[#2E7D32] mb-8 leading-tight">
            {article.title}
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-[#37474F]/80 leading-relaxed mb-6">
              {article.excerpt}
            </p>

            <p className="text-[#37474F]/80 leading-relaxed mb-4">
              {language === 'EN'
                ? 'This is a detailed exploration of the topic. Full article content will be developed to provide in-depth analysis, case studies, and actionable insights.'
                : language === 'FR'
                  ? 'Ceci est une exploration détaillée du sujet. Le contenu complet de l\'article sera développé pour fournir une analyse approfondie, des études de cas et des informations exploitables.'
                  : 'Detta är en detaljerad utforskning av ämnet. Fullständigt artikelinnehåll kommer att utvecklas för att ge djupgående analys, fallstudier och handlingsbara insikter.'}
            </p>

            <h2 className="text-2xl font-light text-[#2E7D32] mt-12 mb-4">
              {language === 'EN' ? 'Key Insights' : language === 'FR' ? 'Informations Clés' : 'Viktiga Insikter'}
            </h2>

            <p className="text-[#37474F]/80 leading-relaxed mb-4">
              {language === 'EN'
                ? 'Our research and experience in this field have revealed important patterns and opportunities. We continue to explore innovative solutions that push the boundaries of sustainable engineering.'
                : language === 'FR'
                  ? 'Nos recherches et notre expérience dans ce domaine ont révélé des tendances et des opportunités importantes. Nous continuons d\'explorer des solutions innovantes qui repoussent les limites de l\'ingénierie durable.'
                  : 'Vår forskning och erfarenhet inom detta område har avslöjat viktiga mönster och möjligheter. Vi fortsätter att utforska innovativa lösningar som driver gränserna för hållbar teknik.'}
            </p>

            <div className="bg-[#F5F5DC] p-8 rounded-sm my-8">
              <p className="text-[#2E7D32] font-medium italic">
                "{language === 'EN'
                  ? 'Innovation in sustainable engineering requires both technical excellence and environmental responsibility.'
                  : language === 'FR'
                    ? 'L\'innovation en ingénierie durable nécessite à la fois l\'excellence technique et la responsabilité environnementale.'
                    : 'Innovation inom hållbar teknik kräver både teknisk excellens och miljöansvar.'}"
              </p>
            </div>

            <p className="text-[#37474F]/80 leading-relaxed mb-4">
              {language === 'EN'
                ? 'Additional article content will be developed and added here. This page structure is ready to receive full article content including images, diagrams, and detailed analysis.'
                : language === 'FR'
                  ? 'Du contenu d\'article supplémentaire sera développé et ajouté ici. Cette structure de page est prête à recevoir le contenu complet de l\'article, y compris des images, des diagrammes et une analyse détaillée.'
                  : 'Ytterligare artikelinnehåll kommer att utvecklas och läggas till här. Denna sidstruktur är redo att ta emot fullständigt artikelinnehåll inklusive bilder, diagram och detaljerad analys.'}
            </p>
          </div>

          {/* Related Articles Section */}
          <div className="mt-24 pt-12 border-t border-[#2E7D32]/20">
            <h3 className="text-2xl font-light text-[#2E7D32] mb-8">Read Next</h3>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Link href="/insights/designing-for-climate-resilience-in-urban-environments" className="group block">
                <div className="h-48 bg-[#F5F5DC] rounded-sm mb-4 relative overflow-hidden">
                  {/* Placeholder Image */}
                  <div className="absolute inset-0 bg-[#2E7D32]/10 group-hover:bg-[#2E7D32]/20 transition-colors"></div>
                </div>
                <h4 className="text-lg font-medium text-[#2E7D32] group-hover:text-[#1b5e20] transition-colors">Designing for Climate Resilience</h4>
                <p className="text-sm text-[#37474F]/60 mt-2">Explore how urban planning is adapting to changing climate patterns.</p>
              </Link>
              <Link href="/insights/the-future-of-structural-engineering-carbon-negative-materials" className="group block">
                <div className="h-48 bg-[#F5F5DC] rounded-sm mb-4 relative overflow-hidden">
                  {/* Placeholder Image */}
                  <div className="absolute inset-0 bg-[#2E7D32]/10 group-hover:bg-[#2E7D32]/20 transition-colors"></div>
                </div>
                <h4 className="text-lg font-medium text-[#2E7D32] group-hover:text-[#1b5e20] transition-colors">Carbon Negative Materials</h4>
                <p className="text-sm text-[#37474F]/60 mt-2">Innovations in materials science that are changing construction.</p>
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/insights"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#2E7D32] text-white font-medium rounded-sm hover:bg-[#1b5e20] transition-all shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t.insights.readAll}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
