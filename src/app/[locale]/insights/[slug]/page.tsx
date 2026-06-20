'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { pageFrameStyle } from '@/app/components/LayoutFrame';
import { getComingInsights, type ComingInsight } from '@/app/content/insights';
import { asLocale, type Locale } from '@/app/content/locale';

type ArticlePageCopy = {
  back: string;
  status: string;
  intro: string;
  keyHeading: string;
  keyBody: string;
  quote: string;
  nextHeading: string;
  readAll: string;
  related: { title: string; body: string; href: string }[];
};

const articlePageCopyByLocale: Record<Locale, ArticlePageCopy> = {
  en: {
    back: 'Back to insights',
    status: 'Planned article',
    intro: 'This topic is part of LBYA\'s product thinking pipeline. The full article will expand on the practical choices teams face when they need clearer control, better evidence, and more reliable decisions.',
    keyHeading: 'What this will cover',
    keyBody: 'The article will focus on real workflow questions: what information needs to be controlled, who owns the next step, which evidence matters, and how a product can make that record easier to trust.',
    quote: 'Good control is not about adding more administration. It is about making the important record clear enough for people to act.',
    nextHeading: 'Explore the products behind the thinking',
    readAll: 'View all insights',
    related: [
      { title: 'Malaika Control Tower', body: 'Logistics control for requests, documents, verification, quotes, and decision evidence.', href: '/products/mct' },
      { title: 'Nayeli BIM Control', body: 'BIM control for requirements, model quality, issue ownership, evidence, and readiness.', href: '/products/nayeli-bim-control' },
    ],
  },
  sv: {
    back: 'Tillbaka till insikter',
    status: 'Planerad artikel',
    intro: 'Det här ämnet ingår i LBYA:s produktidéer. Den fullständiga artikeln kommer att utveckla de praktiska val team möter när de behöver tydligare kontroll, bättre underlag och mer tillförlitliga beslut.',
    keyHeading: 'Vad artikeln kommer att täcka',
    keyBody: 'Artikeln fokuserar på verkliga arbetsflödesfrågor: vilken information behöver kontrolleras, vem äger nästa steg, vilket underlag spelar roll och hur kan en produkt göra helheten lättare att lita på.',
    quote: 'Bra kontroll handlar inte om mer administration. Det handlar om att göra det viktiga underlaget tillräckligt tydligt för att människor ska kunna agera.',
    nextHeading: 'Utforska produkterna bakom tänkandet',
    readAll: 'Visa alla insikter',
    related: [
      { title: 'Malaika Control Tower', body: 'Logistikkontroll för förfrågningar, dokument, verifiering, offerter och beslutsunderlag.', href: '/products/mct' },
      { title: 'Nayeli BIM Control', body: 'BIM-kontroll för krav, modellkvalitet, ärendeägarskap, underlag och beredskap.', href: '/products/nayeli-bim-control' },
    ],
  },
  fr: {
    back: 'Retour aux analyses',
    status: 'Article prévu',
    intro: "Ce sujet fait partie de la réflexion produit de LBYA. L'article complet développera les choix pratiques auxquels les équipes font face lorsqu'elles ont besoin de plus de contrôle, de meilleures preuves et de décisions plus fiables.",
    keyHeading: "Ce que l'article couvrira",
    keyBody: "L'article se concentrera sur des questions concrètes de flux de travail : quelle information doit être contrôlée, qui porte la prochaine étape, quelles preuves comptent et comment un produit peut rendre ce dossier plus fiable.",
    quote: "Un bon contrôle ne consiste pas à ajouter plus d'administration. Il consiste à rendre le dossier important assez clair pour agir.",
    nextHeading: 'Explorer les produits derrière cette réflexion',
    readAll: 'Voir toutes les analyses',
    related: [
      { title: 'Malaika Control Tower', body: 'Contrôle logistique pour demandes, documents, vérification, devis et preuves de décision.', href: '/products/mct' },
      { title: 'Nayeli BIM Control', body: 'Contrôle BIM pour exigences, qualité du modèle, responsabilité des problèmes, preuves et préparation.', href: '/products/nayeli-bim-control' },
    ],
  },
  de: {
    back: 'Zurück zu Einblicke',
    status: 'Geplanter Artikel',
    intro: 'Dieses Thema gehört zur Produktdenkarbeit von LBYA. Der vollständige Artikel wird die praktischen Entscheidungen vertiefen, vor denen Teams stehen, wenn sie klarere Kontrolle, bessere Nachweise und verlässlichere Entscheidungen brauchen.',
    keyHeading: 'Was der Artikel behandeln wird',
    keyBody: 'Der Artikel konzentriert sich auf echte Workflow-Fragen: Welche Informationen müssen kontrolliert werden, wer übernimmt den nächsten Schritt, welche Nachweise zählen und wie kann ein Produkt diese Aufzeichnung vertrauenswürdiger machen.',
    quote: 'Gute Kontrolle bedeutet nicht mehr Verwaltung. Sie bedeutet, die wichtige Aufzeichnung klar genug zu machen, damit Menschen handeln können.',
    nextHeading: 'Die Produkte hinter dem Denken erkunden',
    readAll: 'Alle Einblicke ansehen',
    related: [
      { title: 'Malaika Control Tower', body: 'Logistikkontrolle für Anfragen, Dokumente, Prüfung, Angebote und Entscheidungsnachweise.', href: '/products/mct' },
      { title: 'Nayeli BIM Control', body: 'BIM-Kontrolle für Anforderungen, Modellqualität, Themenverantwortung, Nachweise und Bereitschaft.', href: '/products/nayeli-bim-control' },
    ],
  },
};

function pickArticle(slug: string, insights: ComingInsight[]) {
  const lowerSlug = slug.toLowerCase();
  if (lowerSlug.includes('bim') || lowerSlug.includes('model')) return insights[0];
  if (lowerSlug.includes('logistic') || lowerSlug.includes('transport') || lowerSlug.includes('document')) return insights[1];
  return insights[2] ?? insights[0];
}

function localizePath(locale: Locale, href: string) {
  if (!href.startsWith('/')) return href;
  return `/${locale}${href}`;
}

export default function ArticlePage() {
  const params = useParams();
  const activeLocale = asLocale(useLocale());
  const copy = articlePageCopyByLocale[activeLocale];
  const slug = String(params.slug ?? '');
  const article = pickArticle(slug, getComingInsights(activeLocale));

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="w-full">
        <div className="content-frame py-24" style={pageFrameStyle}>
          <article className="max-w-4xl">
          <Link
            href={`/${activeLocale}/insights`}
            className="mb-8 inline-flex items-center gap-2 font-medium text-[#2E7D32] hover:text-[#1b5e20]"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {copy.back}
          </Link>

          <div className="mb-8">
            <span className="bg-[#2E7D32] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white">
              {article.category}
            </span>
            <p className="mt-6 text-sm font-medium text-[#37474F]/60">{copy.status}</p>
          </div>

          <h1 className="mb-8 text-4xl font-light leading-tight text-[#2E7D32] md:text-5xl">
            {article.title}
          </h1>

          <div className="max-w-none">
            <p className="mb-6 text-lg leading-relaxed text-[#37474F]/80">
              {article.excerpt}
            </p>
            <p className="mb-4 leading-relaxed text-[#37474F]/80">
              {copy.intro}
            </p>

            <h2 className="mb-4 mt-12 text-2xl font-light text-[#2E7D32]">
              {copy.keyHeading}
            </h2>
            <p className="mb-4 leading-relaxed text-[#37474F]/80">
              {copy.keyBody}
            </p>

            <div className="my-8 rounded-sm bg-[#F5F5DC] p-8">
              <p className="font-medium italic text-[#2E7D32]">
                "{copy.quote}"
              </p>
            </div>
          </div>

          <div className="mt-24 border-t border-[#2E7D32]/20 pt-12">
            <h3 className="mb-8 text-2xl font-light text-[#2E7D32]">{copy.nextHeading}</h3>
            <div className="mb-12 grid gap-8 md:grid-cols-2">
              {copy.related.map((item) => (
                <Link key={item.href} href={localizePath(activeLocale, item.href)} className="group block rounded-sm border border-[#2E7D32]/15 bg-[#F7FAF7] p-6 transition-colors hover:bg-[#F5F5DC]">
                  <h4 className="text-lg font-medium text-[#2E7D32] transition-colors group-hover:text-[#1b5e20]">{item.title}</h4>
                  <p className="mt-3 text-sm leading-6 text-[#37474F]/68">{item.body}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <Link
              href={`/${activeLocale}/insights`}
              className="inline-flex items-center gap-3 rounded-sm bg-[#2E7D32] px-8 py-4 font-medium text-white shadow-lg transition-all hover:bg-[#1b5e20] hover:shadow-xl"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {copy.readAll}
            </Link>
          </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
