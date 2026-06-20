import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ProductHero from '@/app/components/ProductHero';
import ControlDashboardMockup from '@/app/components/ControlDashboardMockup';
import { pageFrameStyle } from '@/app/components/LayoutFrame';
import { getNbc } from '@/app/content/products';
import { asLocale, type Locale } from '@/app/content/locale';
import { localizePath } from '@/app/content/paths';

type Props = { params: Promise<{ locale: string }> };
type DirectionPoint = { title: string; body: string };
type NbcSupportCopy = {
  capabilitiesEyebrow: string;
  capabilitiesHeading: string;
  controlsHeading: string;
  lifecycleEyebrow: string;
  lifecycleHeading: string;
};

type NbcPageCopy = {
  layerEyebrow: string;
  layerHeading: string;
  layerBody: string;
  directionEyebrow: string;
  directionHeading: string;
  directionBody: string;
  directionPoints: DirectionPoint[];
  finalHeading: string;
  finalBody: string;
};

const nbcPageCopyByLocale: Record<Locale, NbcPageCopy> = {
  en: {
    layerEyebrow: 'BIM coordination product',
    layerHeading: 'NBC focuses on BIM coordination and model validation.',
    layerBody:
      'Inspired by the way mature BIM platforms structure coordination around federated review, validation, issue control, and handover readiness, NBC is being shaped as LBYA\u2019s dedicated BIM control product.',
    directionEyebrow: 'BIM coordination workflow',
    directionHeading: 'From federated review to decision readiness.',
    directionBody:
      'NBC is separate from MCT. Its focus is BIM: helping teams understand whether model information is coordinated, assigned, reviewed, validated, and ready to support project decisions.',
    directionPoints: [
      { title: 'Federated model review', body: 'Bring discipline models into one coordination view so teams can inspect interfaces, readiness, and information gaps.' },
      { title: 'Clash and issue control', body: 'Turn coordination findings into assigned actions with status, owner, evidence, and follow-up history.' },
      { title: 'Model validation governance', body: 'Check requirements, classifications, naming, data completeness, and handover readiness before decisions move forward.' },
    ],
    finalHeading: 'Help shape a more accountable way to control BIM.',
    finalBody: 'Join the early access list or start a short BIM control conversation with LBYA.',
  },
  sv: {
    layerEyebrow: 'BIM-samordningsprodukt',
    layerHeading: 'NBC fokuserar p\u00e5 BIM-samordning och modellvalidering.',
    layerBody:
      'Inspirerad av hur mogna BIM-plattformar strukturerar samordning kring federerad granskning, validering, \u00e4rendekontroll och \u00f6verl\u00e4mningsberedskap formas NBC som LBYA:s dedikerade BIM-kontrollprodukt.',
    directionEyebrow: 'BIM-samordningsfl\u00f6de',
    directionHeading: 'Fr\u00e5n federerad granskning till beslutsberedskap.',
    directionBody:
      'NBC \u00e4r separat fr\u00e5n MCT. Fokus \u00e4r BIM: att hj\u00e4lpa team f\u00f6rst\u00e5 om modellinformation \u00e4r samordnad, tilldelad, granskad, validerad och redo f\u00f6r projektbeslut.',
    directionPoints: [
      { title: 'Federerad modellgranskning', body: 'Samla disciplinmodeller i en samordningsvy s\u00e5 team kan granska gr\u00e4nssnitt, beredskap och informationsluckor.' },
      { title: 'Kollisions- och \u00e4rendekontroll', body: 'G\u00f6r samordningsfynd till tilldelade \u00e5tg\u00e4rder med status, \u00e4gare, underlag och uppf\u00f6ljningshistorik.' },
      { title: 'Modellvalidering och styrning', body: 'Kontrollera krav, klassificeringar, namngivning, datakompletthet och \u00f6verl\u00e4mningsberedskap innan beslut g\u00e5r vidare.' },
    ],
    finalHeading: 'Hj\u00e4lp till att forma ett mer ansvarstagande s\u00e4tt att kontrollera BIM.',
    finalBody: 'G\u00e5 med p\u00e5 listan f\u00f6r tidig \u00e5tkomst eller starta ett kort samtal om BIM-kontroll med LBYA.',
  },
  fr: {
    layerEyebrow: 'Produit de coordination BIM',
    layerHeading: 'NBC se concentre sur la coordination BIM et la validation de mod\u00e8les.',
    layerBody:
      'Inspir\u00e9 par la fa\u00e7on dont les plateformes BIM matures structurent la coordination autour de la revue f\u00e9d\u00e9r\u00e9e, de la validation, du contr\u00f4le des sujets et de la pr\u00e9paration \u00e0 la remise, NBC devient le produit BIM d\u00e9di\u00e9 de LBYA.',
    directionEyebrow: 'Flux de coordination BIM',
    directionHeading: 'De la revue f\u00e9d\u00e9r\u00e9e \u00e0 la pr\u00e9paration des d\u00e9cisions.',
    directionBody:
      'NBC est distinct de MCT. Son sujet est le BIM: aider les \u00e9quipes \u00e0 savoir si l\u2019information mod\u00e8le est coordonn\u00e9e, attribu\u00e9e, revue, valid\u00e9e et pr\u00eate pour les d\u00e9cisions projet.',
    directionPoints: [
      { title: 'Revue de mod\u00e8le f\u00e9d\u00e9r\u00e9', body: 'R\u00e9unir les mod\u00e8les de discipline dans une vue de coordination afin de v\u00e9rifier interfaces, maturit\u00e9 et lacunes d\u2019information.' },
      { title: 'Contr\u00f4le des conflits et points \u00e0 traiter', body: 'Transformer les constats de coordination en actions attribu\u00e9es avec statut, responsable, preuves et historique de suivi.' },
      { title: 'Validation et gouvernance', body: 'Contr\u00f4ler exigences, classifications, nommage, compl\u00e9tude des donn\u00e9es et pr\u00e9paration \u00e0 la remise avant les d\u00e9cisions.' },
    ],
    finalHeading: 'Aidez \u00e0 fa\u00e7onner une mani\u00e8re plus responsable de contr\u00f4ler le BIM.',
    finalBody: 'Rejoignez la liste d\u2019acc\u00e8s anticip\u00e9 ou lancez une courte conversation BIM avec LBYA.',
  },
  de: {
    layerEyebrow: 'BIM-Koordinationsprodukt',
    layerHeading: 'NBC konzentriert sich auf BIM-Koordination und Modellvalidierung.',
    layerBody:
      'Inspiriert davon, wie reife BIM-Plattformen Koordination rund um federierte Pr\u00fcfung, Validierung, Problemkontrolle und \u00dcbergabereife strukturieren, wird NBC als dediziertes BIM-Kontrollprodukt von LBYA entwickelt.',
    directionEyebrow: 'BIM-Koordinationsworkflow',
    directionHeading: 'Von der federierten Pr\u00fcfung zur Entscheidungsreife.',
    directionBody:
      'NBC ist von MCT getrennt. Der Fokus liegt auf BIM: Teams sollen erkennen, ob Modellinformationen koordiniert, zugewiesen, gepr\u00fcft, validiert und f\u00fcr Projektentscheidungen bereit sind.',
    directionPoints: [
      { title: 'Federierte Modellpr\u00fcfung', body: 'Fachmodelle in einer Koordinationssicht zusammenf\u00fchren, damit Teams Schnittstellen, Reifegrad und Informationsl\u00fccken pr\u00fcfen k\u00f6nnen.' },
      { title: 'Kollisions- und Problemkontrolle', body: 'Koordinationsergebnisse in zugewiesene Aktionen mit Status, Eigent\u00fcmer, Nachweisen und Verlauf \u00fcberf\u00fchren.' },
      { title: 'Modellvalidierung und Governance', body: 'Anforderungen, Klassifikationen, Benennung, Datenvollst\u00e4ndigkeit und \u00dcbergabereife vor Entscheidungen pr\u00fcfen.' },
    ],
    finalHeading: 'Gestalten Sie einen verantwortungsvolleren Weg zur BIM-Kontrolle mit.',
    finalBody: 'Treten Sie der Early-Access-Liste bei oder starten Sie ein kurzes BIM-Kontrollgespr\u00e4ch mit LBYA.',
  },
};

const nbcSupportCopyByLocale: Record<Locale, NbcSupportCopy> = {
  en: {
    capabilitiesEyebrow: 'Coordination capabilities',
    capabilitiesHeading: 'A BIM page structure built around what project teams actually check.',
    controlsHeading: 'What NBC is being shaped to control',
    lifecycleEyebrow: 'Building lifecycle',
    lifecycleHeading: 'Designed for the BIM coordination stage, with handover in mind.',
  },
  sv: {
    capabilitiesEyebrow: 'Samordningsfunktioner',
    capabilitiesHeading: 'En BIM-sida byggd kring det projektteam faktiskt kontrollerar.',
    controlsHeading: 'Det NBC formas f\u00f6r att kontrollera',
    lifecycleEyebrow: 'Byggnadens livscykel',
    lifecycleHeading: 'Utformad f\u00f6r BIM-samordningsfasen, med \u00f6verl\u00e4mning i sikte.',
  },
  fr: {
    capabilitiesEyebrow: 'Capacit\u00e9s de coordination',
    capabilitiesHeading: 'Une page BIM structur\u00e9e autour de ce que les \u00e9quipes projet contr\u00f4lent vraiment.',
    controlsHeading: 'Ce que NBC se construit pour contr\u00f4ler',
    lifecycleEyebrow: 'Cycle de vie du b\u00e2timent',
    lifecycleHeading: 'Con\u00e7u pour la phase de coordination BIM, avec la remise en t\u00eate.',
  },
  de: {
    capabilitiesEyebrow: 'Koordinationsfunktionen',
    capabilitiesHeading: 'Eine BIM-Seite, aufgebaut um das, was Projektteams tats\u00e4chlich pr\u00fcfen.',
    controlsHeading: 'Was NBC kontrollierbar machen soll',
    lifecycleEyebrow: 'Geb\u00e4udelebenszyklus',
    lifecycleHeading: 'F\u00fcr die BIM-Koordinationsphase entwickelt, mit Blick auf die \u00dcbergabe.',
  },
};

function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function CheckIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const NBC = getNbc(locale);
  return { title: NBC.seoTitle, description: NBC.metaDescription };
}

export default async function NayeliBimControlPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const activeLocale = asLocale(locale);
  const NBC = getNbc(locale);
  const pageCopy = nbcPageCopyByLocale[activeLocale];
  const supportCopy = nbcSupportCopyByLocale[activeLocale];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <ProductHero
        eyebrow="Nayeli BIM Control (NBC)"
        title={NBC.name}
        tagline={NBC.tagline}
        body={NBC.heroPositioning}
        image={NBC.heroImage}
        logo={NBC.logo}
        locale={activeLocale}
        primaryCta={NBC.primaryCta}
        secondaryCta={NBC.secondaryCta}
      />

      <div className="bg-[#F5F5DC]">
        <div className="content-frame py-4" style={pageFrameStyle}>
          <p className="text-center text-sm font-light text-[#37474F]/70">{NBC.honestStatus}</p>
        </div>
      </div>

      <main>
        <section className="py-16 lg:py-20">
          <div
            className="content-frame grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.88fr_1.12fr]"
            style={pageFrameStyle}
          >
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#2E7D32]">
                {pageCopy.layerEyebrow}
              </p>
              <h2 className="text-3xl font-light leading-tight text-[#1F3529] md:text-5xl">
                {pageCopy.layerHeading}
              </h2>
              <p className="mt-5 text-base leading-8 text-[#37474F]/74 md:text-lg">
                {pageCopy.layerBody}
              </p>
            </div>
            <ControlDashboardMockup variant="nbc" compact />
          </div>
        </section>

        <section className="bg-[#F7FAF7] py-16 lg:py-20">
          <div className="content-frame" style={pageFrameStyle}>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2E7D32]">
                {pageCopy.directionEyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-light leading-tight text-[#1F3529] md:text-5xl">
                {pageCopy.directionHeading}
              </h2>
              <p className="mt-5 text-base leading-8 text-[#37474F]/72 md:text-lg">
                {pageCopy.directionBody}
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-[#1F3529]/10 bg-[#1F3529]/10 md:grid-cols-3">
              {pageCopy.directionPoints.map((point) => (
                <article key={point.title} className="bg-white p-6">
                  <span className="mb-5 block h-1.5 w-10 rounded-sm bg-[#2E7D32]" />
                  <h3 className="text-xl font-semibold text-[#1F3529]">{point.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#37474F]/72">{point.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-20">
          <div
            className="content-frame grid grid-cols-1 gap-12 lg:grid-cols-[0.72fr_1.28fr]"
            style={pageFrameStyle}
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2E7D32]">
                {supportCopy.capabilitiesEyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-light leading-tight text-[#1F3529] md:text-5xl">
                {supportCopy.capabilitiesHeading}
              </h2>
              <p className="mt-5 text-base leading-8 text-[#37474F]/72 md:text-lg">
                {NBC.controlsIntro}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-px overflow-hidden border border-[#1F3529]/10 bg-[#1F3529]/10 md:grid-cols-2">
              {NBC.modules.slice(0, 8).map((module) => (
                <article key={module.name} className="bg-white p-6">
                  <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-sm bg-[#2E7D32]/10 text-[#2E7D32]">
                    <CheckIcon />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1F3529]">{module.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#37474F]/72">{module.explanation}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#37474F] py-16 text-white lg:py-20">
          <div
            className="content-frame grid grid-cols-1 gap-10 lg:grid-cols-[0.64fr_1.36fr]"
            style={pageFrameStyle}
          >
            <h2 className="text-3xl font-light leading-tight md:text-5xl">{supportCopy.controlsHeading}</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {NBC.controls.map((control) => (
                <div key={control} className="border border-white/10 bg-white/6 p-4">
                  <CheckIcon className="mb-4 h-4 w-4 text-[#A5D6A7]" />
                  <p className="text-sm leading-6 text-white/78">{control}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-20">
          <div className="content-frame" style={pageFrameStyle}>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2E7D32]">
                {supportCopy.lifecycleEyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-light leading-tight text-[#1F3529] md:text-5xl">
                {supportCopy.lifecycleHeading}
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
              {NBC.sections.map((section) => (
                <article key={section.title} className="border border-[#1F3529]/10 bg-[#F7FAF7] p-6">
                  <h3 className="text-xl font-semibold text-[#1F3529]">{section.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#37474F]/74">{section.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#2E7D32] py-20 text-white">
          <div className="content-frame text-center" style={pageFrameStyle}>
            <h2 className="text-4xl font-light leading-tight md:text-5xl">{pageCopy.finalHeading}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/78">
              {pageCopy.finalBody}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a
                href={localizePath(activeLocale, NBC.primaryCta.href)}
                className="inline-flex items-center justify-center gap-3 rounded-sm bg-white px-7 py-3.5 text-sm font-semibold text-[#2E7D32] transition-colors hover:bg-[#A5D6A7]"
              >
                <span>{NBC.primaryCta.label}</span>
                <ArrowIcon />
              </a>
              <a
                href={localizePath(activeLocale, NBC.secondaryCta.href)}
                className="inline-flex items-center justify-center gap-3 rounded-sm border border-white/50 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#2E7D32]"
              >
                <span>{NBC.secondaryCta.label}</span>
                <ArrowIcon />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
