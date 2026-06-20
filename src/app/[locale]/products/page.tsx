import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ProductCard from '@/app/components/ProductCard';
import { pageFrameStyle } from '@/app/components/LayoutFrame';
import { getProducts, type ProductSummary } from '@/app/content/products';
import { getSite } from '@/app/content/site';
import { asLocale, type Locale } from '@/app/content/locale';
import { localizePath } from '@/app/content/paths';

type Props = { params: Promise<{ locale: string }> };

const productsPageCopyByLocale: Record<Locale, {
  heroEyebrow: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  signalLabel: string;
  signalBridge: string;
  sectionEyebrow: string;
  sectionHeading: string;
  sectionBody: string;
}> = {
  en: {
    heroEyebrow: 'Digital control products',
    heroPrimaryCta: 'Explore MCT',
    heroSecondaryCta: 'Request demo',
    signalLabel: 'Control signal',
    signalBridge: 'Connected records, checks, and decisions',
    sectionEyebrow: 'Product portfolio',
    sectionHeading: 'Two focused products, each built around control.',
    sectionBody:
      'MCT is commercially ready for logistics control. NBC is a separate early-stage BIM control product. Each product has its own workflow, audience, and reason to exist.',
  },
  sv: {
    heroEyebrow: 'Digitala kontrollprodukter',
    heroPrimaryCta: 'Utforska NBC',
    heroSecondaryCta: 'Kontakta oss',
    signalLabel: 'Kontrollsignal',
    signalBridge: 'Sammankopplade underlag, kontroller och beslut',
    sectionEyebrow: 'Produktportf\u00f6lj',
    sectionHeading: 'En fokuserad produkt byggd kring BIM-kontroll.',
    sectionBody:
      'NBC \u00e4r LBYA:s svenska produktfokus: en BIM-kontrollprodukt i tidig utveckling med tydlig struktur f\u00f6r modellinformation, ansvar, underlag och beslutsberedskap.',
  },
  fr: {
    heroEyebrow: 'Produits de contr\u00f4le num\u00e9rique',
    heroPrimaryCta: 'Explorer MCT',
    heroSecondaryCta: 'Demander une d\u00e9mo',
    signalLabel: 'Signal de contr\u00f4le',
    signalBridge: 'Dossiers, contr\u00f4les et d\u00e9cisions connect\u00e9s',
    sectionEyebrow: 'Portefeuille produit',
    sectionHeading: 'Deux produits cibl\u00e9s, chacun construit autour du contr\u00f4le.',
    sectionBody:
      'MCT est commercialement pr\u00eat pour le contr\u00f4le logistique. NBC est un produit BIM distinct, encore en d\u00e9veloppement pr\u00e9coce. Chaque produit a son propre flux, son public et sa raison d\u2019\u00eatre.',
  },
  de: {
    heroEyebrow: 'Digitale Kontrollprodukte',
    heroPrimaryCta: 'MCT entdecken',
    heroSecondaryCta: 'Demo anfragen',
    signalLabel: 'Kontrollsignal',
    signalBridge: 'Vernetzte Aufzeichnungen, Pr\u00fcfungen und Entscheidungen',
    sectionEyebrow: 'Produktportfolio',
    sectionHeading: 'Zwei fokussierte Produkte, beide rund um Kontrolle entwickelt.',
    sectionBody:
      'MCT ist kommerziell bereit f\u00fcr Logistikkontrolle. NBC ist ein separates BIM-Kontrollprodukt in fr\u00fcher Entwicklung. Jedes Produkt hat seinen eigenen Workflow, seine eigene Zielgruppe und seinen eigenen Zweck.',
  },
};

function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function ProductSignalField({
  products,
  signalLabel,
  signalBridge,
}: {
  products: ProductSummary[];
  signalLabel: string;
  signalBridge: string;
}) {
  const mct = products.find((product) => product.slug === 'mct');
  const nbc = products.find((product) => product.slug === 'nbc');

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 top-24 z-0 overflow-hidden opacity-70 md:relative md:inset-auto md:min-h-[300px] md:opacity-100 lg:min-h-[440px]"
      aria-hidden="true"
    >
      <div
        className="hero-grid-scan absolute inset-y-6 right-0 w-full opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(129, 212, 250, 0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(165, 214, 167, 0.16) 1px, transparent 1px)',
          backgroundSize: '42px 42px',
          maskImage: 'linear-gradient(90deg, transparent, black 18%, black 86%, transparent)',
        }}
      />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 720 440" preserveAspectRatio="none">
        <defs>
          <linearGradient id="products-signal-gradient" x1="0%" y1="70%" x2="100%" y2="25%">
            <stop offset="0%" stopColor="#A5D6A7" stopOpacity="0.2" />
            <stop offset="46%" stopColor="#81D4FA" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#F5C469" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="products-signal-soft" x1="0%" y1="35%" x2="100%" y2="65%">
            <stop offset="0%" stopColor="#A5D6A7" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#81D4FA" stopOpacity="0.42" />
          </linearGradient>
        </defs>

        {[
          'M38 352 C182 206 262 292 388 172 C498 68 588 88 704 44',
          'M64 270 C198 246 240 116 354 132 C488 150 552 284 708 238',
          'M18 398 C174 396 240 344 334 286 C456 210 556 358 702 306',
          'M142 426 C218 316 242 242 332 204 C446 158 514 112 646 128',
        ].map((line) => (
          <path
            key={line}
            className="hero-signal-line"
            d={line}
            fill="none"
            stroke="url(#products-signal-gradient)"
            strokeLinecap="round"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {[
          'M88 74 H182 V126 H284',
          'M426 52 H544 V102 H676',
          'M318 330 H452 V378 H642',
        ].map((line) => (
          <path
            key={line}
            className="hero-future-line"
            d={line}
            fill="none"
            stroke="url(#products-signal-soft)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {[
          { x: 180, y: 126, color: '#A5D6A7' },
          { x: 354, y: 132, color: '#81D4FA' },
          { x: 452, y: 378, color: '#F5C469' },
          { x: 588, y: 88, color: '#F5C469' },
          { x: 642, y: 128, color: '#81D4FA' },
        ].map((node) => (
          <circle
            key={`${node.x}-${node.y}`}
            className="hero-signal-node"
            cx={node.x}
            cy={node.y}
            r="6"
            fill={node.color}
            opacity="0.78"
          />
        ))}
      </svg>

      <div className="absolute right-0 top-8 hidden w-[76%] border-l border-white/16 bg-[#37474F]/30 px-5 py-4 backdrop-blur-sm md:block sm:w-[58%]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A5D6A7]">{signalLabel}</p>
        <p className="mt-2 text-sm leading-6 text-white/74">{signalBridge}</p>
      </div>

      {mct && (
        <div className="absolute bottom-12 left-0 hidden max-w-[18rem] border border-white/14 bg-white/10 p-4 backdrop-blur-sm md:block">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#F5C469]">{mct.acronym}</p>
          <p className="mt-2 text-sm font-medium leading-6 text-white">{mct.status}</p>
        </div>
      )}

      {nbc && (
        <div className="absolute bottom-0 right-6 hidden max-w-[18rem] border border-white/14 bg-[#37474F]/70 p-4 backdrop-blur-sm md:block">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#81D4FA]">{nbc.acronym}</p>
          <p className="mt-2 text-sm font-medium leading-6 text-white">{nbc.status}</p>
        </div>
      )}
    </div>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const o = getSite(locale).productsOverview;
  return { title: o.seoTitle, description: o.metaDescription };
}

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const activeLocale = asLocale(locale);
  const pageCopy = productsPageCopyByLocale[activeLocale];
  const PRODUCTS_OVERVIEW = getSite(locale).productsOverview;
  const PRODUCTS = getProducts(locale);
  const PRODUCT_CARDS = PRODUCTS.map(({ liveCta: _liveCta, ...product }) => product);
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <section className="relative overflow-hidden bg-[#37474F] pt-32 pb-16 lg:pt-40 lg:pb-20">
          <Image
            src="/hero-nature-digital-transition.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-[0.42]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#37474F_0%,rgba(55,71,79,0.94)_32%,rgba(55,71,79,0.62)_68%,rgba(55,71,79,0.82)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_26%,rgba(245,196,105,0.20),transparent_28%),radial-gradient(circle_at_58%_72%,rgba(129,212,250,0.16),transparent_32%)]" />

          <div
            className="content-frame relative z-10 grid items-end gap-12 lg:grid-cols-[0.92fr_1.08fr]"
            style={pageFrameStyle}
          >
            <div className="relative z-10">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-[#A5D6A7]">
                {pageCopy.heroEyebrow}
              </p>
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-8xl lg:text-9xl">
                {PRODUCTS_OVERVIEW.hero}
              </h1>
              <p className="mt-7 max-w-3xl text-xl font-light leading-snug text-white/86 md:text-2xl">
                {PRODUCTS_OVERVIEW.intro}
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <a
                  href={localizePath(activeLocale, activeLocale === 'sv' ? '/products/nbc' : '/products/mct')}
                  className="inline-flex items-center justify-center gap-3 rounded-sm bg-white px-6 py-4 text-sm font-semibold text-[#37474F] shadow-[0_18px_48px_rgba(0,0,0,0.22)] transition-colors hover:bg-[#A5D6A7]"
                >
                  <span>{pageCopy.heroPrimaryCta}</span>
                  <ArrowIcon />
                </a>
                <a
                  href={localizePath(activeLocale, '/contact')}
                  className="inline-flex items-center justify-center gap-3 rounded-sm border border-white/30 px-6 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-[#A5D6A7] hover:bg-white/10"
                >
                  <span>{pageCopy.heroSecondaryCta}</span>
                  <ArrowIcon />
                </a>
              </div>
            </div>

            <ProductSignalField
              products={PRODUCTS}
              signalLabel={pageCopy.signalLabel}
              signalBridge={pageCopy.signalBridge}
            />
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#F6F8F4] py-24">
          <div className="absolute inset-x-0 top-0 h-px bg-[#1F3529]/12" />
          <div className="content-frame" style={pageFrameStyle}>
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2E7D32]">
                {pageCopy.sectionEyebrow}
              </p>
              <h2 className="mt-4 text-4xl font-light leading-tight text-[#1F3529] md:text-6xl">
                {pageCopy.sectionHeading}
              </h2>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[#37474F]/72 md:text-lg">
                {pageCopy.sectionBody}
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8">
              {PRODUCT_CARDS.map((product) => (
                <ProductCard key={product.slug} product={product} locale={activeLocale} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
