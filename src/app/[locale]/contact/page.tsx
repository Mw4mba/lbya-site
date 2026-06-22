'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { asLocale, type Locale } from '@/app/content/locale';
import { localizePath } from '@/app/content/paths';

type ContactPath = {
  title: string;
  detail: string;
  product: string;
};

type ContactPageCopy = {
  eyebrow: string;
  headline: string;
  intro: string;
  primaryCta: string;
  secondaryCta: string;
  pathsEyebrow: string;
  pathsHeading: string;
  pathsBody: string;
  paths: ContactPath[];
  formEyebrow: string;
  formTitle: string;
  formBody: string;
  inquiryLabel: string;
  inquiryPlaceholder: string;
  inquiryOptions: string[];
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  companyLabel: string;
  companyPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submit: string;
  submitted: string;
  successTitle: string;
  successBody: string;
  contactTitle: string;
  contactBody: string;
  emailTitle: string;
  phoneTitle: string;
  addressTitle: string;
  responseTitle: string;
  responseBody: string;
  nextTitle: string;
  nextItems: string[];
  address: string;
  phone: string;
};

const contactPageCopyByLocale: Record<Locale, ContactPageCopy> = {
  en: {
    eyebrow: 'Contact LBYA',
    headline: 'Start with the product conversation that fits your team.',
    intro:
      'Tell us whether you want to explore MCT, join NBC early access, compare product fit, or discuss a pilot. We will route the conversation around the workflow you actually need to control.',
    primaryCta: 'Request MCT demo',
    secondaryCta: 'Join NBC early access',
    pathsEyebrow: 'Choose a path',
    pathsHeading: 'The fastest way to get a useful answer is to start with the right product intent.',
    pathsBody: 'Use the cards below to frame the conversation, then send the details that matter for your workflow.',
    paths: [
      { product: 'MCT', title: 'Request MCT access', detail: 'For logistics teams that need clearer shipment requests, truck packs, quote comparison, document checks, and reporting.' },
      { product: 'NBC', title: 'Join NBC early access', detail: 'For BIM teams that want to shape model information control, issue ownership, evidence, and decision readiness.' },
      { product: 'Fit', title: 'Compare product fit', detail: 'For teams deciding whether MCT, NBC, or a later combined workflow makes sense.' },
      { product: 'Pilot', title: 'Discuss a pilot', detail: 'For product integrations, African logistics corridors, BIM control trials, and strategic collaboration.' },
    ],
    formEyebrow: 'Product inquiry',
    formTitle: 'Send a focused message',
    formBody: 'A few concrete details help us respond with the right next step.',
    inquiryLabel: 'What would you like to discuss?',
    inquiryPlaceholder: 'Select one option',
    inquiryOptions: [
      'Request MCT access',
      'Join NBC early access',
      'Request a product demo',
      'Discuss product integration',
      'Discuss product partnership',
      'General inquiry',
    ],
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    emailLabel: 'Email',
    emailPlaceholder: 'you@example.com',
    companyLabel: 'Company',
    companyPlaceholder: 'Company or organisation',
    messageLabel: 'Message',
    messagePlaceholder: 'Tell us about your workflow, product interest, timeline, or pilot need.',
    submit: 'Send message',
    submitted: 'Message noted',
    successTitle: 'Thank you. Your message is ready for follow-up.',
    successBody: 'LBYA normally responds within one business day. You can also email sales@lbya.se directly.',
    contactTitle: 'Direct contact',
    contactBody: 'Prefer a shorter route? Use email or phone, and include the product you want to discuss.',
    emailTitle: 'Email',
    phoneTitle: 'Phone',
    addressTitle: 'Address',
    responseTitle: 'Response time',
    responseBody: 'Usually within one business day.',
    nextTitle: 'Helpful details to include',
    nextItems: ['Product interest: MCT, NBC, or both', 'Workflow or pilot context', 'Company size and country', 'Preferred timeline for a demo or discussion'],
    address: 'Gamla Enköpingsvägen 150\n174 64 Sundbyberg',
    phone: '+46 76 596 0161',
  },
  sv: {
    eyebrow: 'Kontakta LBYA',
    headline: 'B\u00f6rja med produktsamtalet som passar ert team.',
    intro:
      'Ber\u00e4tta om du vill utforska MCT, g\u00e5 med i NBC:s tidiga \u00e5tkomst, j\u00e4mf\u00f6ra vilken produkt som passar eller diskutera en pilot. Vi utg\u00e5r fr\u00e5n arbetsfl\u00f6det ni beh\u00f6ver kontrollera.',
    primaryCta: 'Beg\u00e4r MCT-demo',
    secondaryCta: 'G\u00e5 med i NBC:s tidiga \u00e5tkomst',
    pathsEyebrow: 'V\u00e4lj v\u00e4g',
    pathsHeading: 'Det snabbaste s\u00e4ttet att f\u00e5 ett anv\u00e4ndbart svar \u00e4r att b\u00f6rja med r\u00e4tt produktbehov.',
    pathsBody: 'Anv\u00e4nd korten nedan f\u00f6r att rama in samtalet och skicka sedan de detaljer som betyder mest f\u00f6r ert arbetsfl\u00f6de.',
    paths: [
      { product: 'MCT', title: 'Beg\u00e4r MCT-\u00e5tkomst', detail: 'F\u00f6r logistikteam som beh\u00f6ver tydligare transportf\u00f6rfr\u00e5gningar, lastbilsdokumentation, offerter, dokumentkontroller och rapportering.' },
      { product: 'NBC', title: 'G\u00e5 med i NBC:s tidiga \u00e5tkomst', detail: 'F\u00f6r BIM-team som vill forma kontroll av modellinformation, \u00e4rendeansvar, underlag och beslutsberedskap.' },
      { product: 'Fit', title: 'J\u00e4mf\u00f6r produktval', detail: 'F\u00f6r team som avg\u00f6r om MCT, NBC eller ett senare gemensamt arbetsfl\u00f6de passar.' },
      { product: 'Pilot', title: 'Diskutera en pilot', detail: 'F\u00f6r produktintegrationer, afrikanska logistikkorridorer, BIM-kontrolltester och strategiskt samarbete.' },
    ],
    formEyebrow: 'Produktf\u00f6rfr\u00e5gan',
    formTitle: 'Skicka ett fokuserat meddelande',
    formBody: 'N\u00e5gra konkreta detaljer hj\u00e4lper oss att svara med r\u00e4tt n\u00e4sta steg.',
    inquiryLabel: 'Vad vill du diskutera?',
    inquiryPlaceholder: 'V\u00e4lj ett alternativ',
    inquiryOptions: [
      'Beg\u00e4r MCT-\u00e5tkomst',
      'G\u00e5 med i NBC:s tidiga \u00e5tkomst',
      'Beg\u00e4r en produktdemo',
      'Diskutera produktintegration',
      'Diskutera produktpartnerskap',
      'Allm\u00e4n fr\u00e5ga',
    ],
    nameLabel: 'Namn',
    namePlaceholder: 'Ditt namn',
    emailLabel: 'E-post',
    emailPlaceholder: 'du@example.com',
    companyLabel: 'F\u00f6retag',
    companyPlaceholder: 'F\u00f6retag eller organisation',
    messageLabel: 'Meddelande',
    messagePlaceholder: 'Ber\u00e4tta om ert arbetsfl\u00f6de, produktintresse, tidsplan eller pilotbehov.',
    submit: 'Skicka meddelande',
    submitted: 'Meddelande noterat',
    successTitle: 'Tack. Ditt meddelande \u00e4r redo f\u00f6r uppf\u00f6ljning.',
    successBody: 'LBYA svarar normalt inom en arbetsdag. Du kan ocks\u00e5 mejla sales@lbya.se direkt.',
    contactTitle: 'Direktkontakt',
    contactBody: 'Vill du ta en kortare väg? Använd e-post eller telefon och ange vilken produkt du vill diskutera.',
    emailTitle: 'E-post',
    phoneTitle: 'Telefon',
    addressTitle: 'Adress',
    responseTitle: 'Svarstid',
    responseBody: 'Vanligtvis inom en arbetsdag.',
    nextTitle: 'Bra detaljer att skicka med',
    nextItems: ['Produktintresse: MCT, NBC eller båda', 'Arbetsflöde eller pilotkontext', 'Företagsstorlek och land', 'Önskad tidpunkt för demo eller samtal'],
    address: 'Gamla Enköpingsvägen 150\n174 64 Sundbyberg',
    phone: '+46 76 596 0161',
  },
  fr: {
    eyebrow: 'Contacter LBYA',
    headline: 'Commencez par la conversation produit adapt\u00e9e \u00e0 votre \u00e9quipe.',
    intro:
      'Dites-nous si vous voulez explorer MCT, rejoindre l\u2019acc\u00e8s anticip\u00e9 NBC, comparer le produit le plus adapt\u00e9 ou discuter d\u2019un pilote. Nous orienterons l\u2019\u00e9change autour du flux de travail que vous devez vraiment contr\u00f4ler.',
    primaryCta: 'Demander une d\u00e9mo MCT',
    secondaryCta: 'Rejoindre l\u2019acc\u00e8s anticip\u00e9 NBC',
    pathsEyebrow: 'Choisir un parcours',
    pathsHeading: 'Le moyen le plus rapide d\u2019obtenir une r\u00e9ponse utile est de commencer par le bon besoin produit.',
    pathsBody: 'Utilisez les cartes ci-dessous pour cadrer l\u2019\u00e9change, puis envoyez les d\u00e9tails importants pour votre flux de travail.',
    paths: [
      { product: 'MCT', title: 'Demander un acc\u00e8s MCT', detail: 'Pour les \u00e9quipes logistiques qui ont besoin de demandes de transport, dossiers camion, devis, contr\u00f4les documentaires et rapports plus clairs.' },
      { product: 'NBC', title: 'Rejoindre l\u2019acc\u00e8s anticip\u00e9 NBC', detail: 'Pour les \u00e9quipes BIM qui veulent fa\u00e7onner le contr\u00f4le de l\u2019information du mod\u00e8le, les responsabilit\u00e9s, les preuves et la pr\u00e9paration des d\u00e9cisions.' },
      { product: 'Fit', title: 'Comparer le produit adapt\u00e9', detail: 'Pour les \u00e9quipes qui d\u00e9cident si MCT, NBC ou un futur flux combin\u00e9 est pertinent.' },
      { product: 'Pilot', title: 'Discuter d\u2019un pilote', detail: 'Pour les int\u00e9grations produit, corridors logistiques africains, essais de contr\u00f4le BIM et collaborations strat\u00e9giques.' },
    ],
    formEyebrow: 'Demande produit',
    formTitle: 'Envoyer un message cibl\u00e9',
    formBody: 'Quelques d\u00e9tails concrets nous aident \u00e0 r\u00e9pondre avec la bonne prochaine \u00e9tape.',
    inquiryLabel: 'De quoi souhaitez-vous discuter ?',
    inquiryPlaceholder: 'S\u00e9lectionner une option',
    inquiryOptions: [
      'Demander un acc\u00e8s MCT',
      'Rejoindre l\u2019acc\u00e8s anticip\u00e9 NBC',
      'Demander un accès MCT',
      'Rejoindre l\'accès anticipé NBC',
      'Demander une démonstration produit',
      'Discuter d\'une intégration produit',
      'Discuter d\'un partenariat produit',
      'Demande générale',
    ],
    nameLabel: 'Nom',
    namePlaceholder: 'Votre nom',
    emailLabel: 'E-mail',
    emailPlaceholder: 'vous@example.com',
    companyLabel: 'Entreprise',
    companyPlaceholder: 'Entreprise ou organisation',
    messageLabel: 'Message',
    messagePlaceholder: 'Parlez-nous de votre flux de travail, de votre intérêt produit, de votre calendrier ou de votre besoin pilote.',
    submit: 'Envoyer le message',
    submitted: 'Message noté',
    successTitle: 'Merci. Nous avons les éléments pour vous répondre.',
    successBody: 'LBYA répond normalement sous un jour ouvrable. Vous pouvez aussi écrire directement à sales@lbya.se.',
    contactTitle: 'Contact direct',
    contactBody: 'Vous préférez une voie plus directe ? Utilisez l\'e-mail ou le téléphone et indiquez le produit que vous souhaitez discuter.',
    emailTitle: 'E-mail',
    phoneTitle: 'Téléphone',
    addressTitle: 'Adresse',
    responseTitle: 'Délai de réponse',
    responseBody: 'Généralement sous un jour ouvrable.',
    nextTitle: 'Détails utiles à inclure',
    nextItems: ['Produit visé : MCT, NBC ou les deux', 'Contexte du flux de travail ou du pilote', 'Taille de l\'entreprise et pays', 'Calendrier souhaité pour une démo ou un échange'],
    address: 'Gamla Enköpingsvägen 150\n174 64 Sundbyberg',
    phone: '+46 76 596 0161',
  },
  de: {
    eyebrow: 'LBYA kontaktieren',
    headline: 'Beginnen Sie mit dem Produktgespr\u00e4ch, das zu Ihrem Team passt.',
    intro:
      'Sagen Sie uns, ob Sie MCT erkunden, fr\u00fchen NBC-Zugang anfragen, die Produktpassung vergleichen oder einen Pilot besprechen m\u00f6chten. Wir richten das Gespr\u00e4ch am Workflow aus, den Sie wirklich kontrollieren m\u00fcssen.',
    primaryCta: 'MCT-Demo anfragen',
    secondaryCta: 'Fr\u00fchen NBC-Zugang anfragen',
    pathsEyebrow: 'Kontaktweg w\u00e4hlen',
    pathsHeading: 'Der schnellste Weg zu einer n\u00fctzlichen Antwort beginnt mit der richtigen Produktabsicht.',
    pathsBody: 'Nutzen Sie die Karten unten, um das Gespr\u00e4ch einzuordnen, und senden Sie dann die wichtigsten Details zu Ihrem Workflow.',
    paths: [
      { product: 'MCT', title: 'MCT-Zugang anfragen', detail: 'F\u00fcr Logistikteams, die klarere Transportanfragen, Lkw-Unterlagen, Angebote, Dokumentenpr\u00fcfungen und Reporting brauchen.' },
      { product: 'NBC', title: 'Fr\u00fchen NBC-Zugang anfragen', detail: 'F\u00fcr BIM-Teams, die Modellinformationskontrolle, Themenverantwortung, Nachweise und Entscheidungsreife mitgestalten m\u00f6chten.' },
      { product: 'Fit', title: 'Produktpassung vergleichen', detail: 'F\u00fcr Teams, die entscheiden, ob MCT, NBC oder ein sp\u00e4ter kombinierter Workflow sinnvoll ist.' },
      { product: 'Pilot', title: 'Pilot besprechen', detail: 'F\u00fcr Produktintegrationen, afrikanische Logistikkorridore, BIM-Kontrolltests und strategische Zusammenarbeit.' },
    ],
    formEyebrow: 'Produktanfrage',
    formTitle: 'Eine fokussierte Nachricht senden',
    formBody: 'Einige konkrete Details helfen uns, mit dem richtigen n\u00e4chsten Schritt zu antworten.',
    inquiryLabel: 'Was m\u00f6chten Sie besprechen?',
    inquiryPlaceholder: 'Option ausw\u00e4hlen',
    inquiryOptions: [
      'MCT-Zugang anfragen',
      'Fr\u00fchen NBC-Zugang anfragen',

      'Produktdemo anfragen',
      'Produktintegration besprechen',
      'Produktpartnerschaft besprechen',
      'Allgemeine Anfrage',
    ],
    nameLabel: 'Name',
    namePlaceholder: 'Ihr Name',
    emailLabel: 'E-Mail',
    emailPlaceholder: 'sie@example.com',
    companyLabel: 'Unternehmen',
    companyPlaceholder: 'Unternehmen oder Organisation',
    messageLabel: 'Nachricht',
    messagePlaceholder: 'Beschreiben Sie Ihren Workflow, Ihr Produktinteresse, Ihren Zeitplan oder Pilotbedarf.',
    submit: 'Nachricht senden',
    submitted: 'Nachricht notiert',
    successTitle: 'Danke. Ihre Nachricht ist bereit f\u00fcr die Nachverfolgung.',
    successBody: 'LBYA antwortet normalerweise innerhalb eines Arbeitstags. Sie k\u00f6nnen auch direkt an sales@lbya.se schreiben.',
    contactTitle: 'Direkter Kontakt',
    contactBody: 'Bevorzugen Sie einen kürzeren Weg? Nutzen Sie E-Mail oder Telefon und nennen Sie das Produkt, das Sie besprechen möchten.',
    emailTitle: 'E-Mail',
    phoneTitle: 'Telefon',
    addressTitle: 'Adresse',
    responseTitle: 'Antwortzeit',
    responseBody: 'Normalerweise innerhalb eines Arbeitstags.',
    nextTitle: 'Hilfreiche Angaben',
    nextItems: ['Produktinteresse: MCT, NBC oder beide', 'Workflow- oder Pilotkontext', 'Unternehmensgröße und Land', 'Gewünschter Zeitpunkt für Demo oder Gespräch'],
    address: 'Gamla Enköpingsvägen 150\n174 64 Sundbyberg',
    phone: '+46 76 596 0161',
  },
};

function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function MailIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.9 5.27a2 2 0 0 0 2.2 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z" />
    </svg>
  );
}

function PinIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21s7-5.18 7-11a7 7 0 1 0-14 0c0 5.82 7 11 7 11Z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    </svg>
  );
}

function PhoneIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5Z" />
    </svg>
  );
}

function ContactSignalLayer() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="hero-grid-scan absolute inset-y-0 right-0 hidden w-[62%] opacity-35 lg:block"
        style={{
          backgroundImage:
            'linear-gradient(rgba(129, 212, 250, 0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(165, 214, 167, 0.12) 1px, transparent 1px)',
          backgroundSize: '46px 46px',
          maskImage: 'linear-gradient(90deg, transparent, black 18%, black 88%, transparent)',
        }}
      />
      <svg className="absolute inset-x-0 bottom-0 h-[70%] w-full opacity-70" viewBox="0 0 1440 500" preserveAspectRatio="none">
        <defs>
          <linearGradient id="contact-signal" x1="0%" y1="70%" x2="100%" y2="20%">
            <stop offset="0%" stopColor="#A5D6A7" stopOpacity="0.14" />
            <stop offset="50%" stopColor="#81D4FA" stopOpacity="0.52" />
            <stop offset="100%" stopColor="#F5C469" stopOpacity="0.58" />
          </linearGradient>
        </defs>
        {[
          'M28 402 C196 288 314 374 480 240 C660 94 796 214 930 260 C1098 318 1232 154 1414 90',
          'M70 206 C242 244 346 110 514 166 C690 224 760 356 938 312 C1088 274 1210 342 1396 254',
          'M184 474 C300 392 384 338 520 350 C700 366 794 452 946 418 C1118 378 1258 446 1422 378',
        ].map((line) => (
          <path
            key={line}
            className="hero-signal-line"
            d={line}
            fill="none"
            stroke="url(#contact-signal)"
            strokeLinecap="round"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    </div>
  );
}

export default function ContactPage() {
  const activeLocale = asLocale(useLocale());
  const copy = contactPageCopyByLocale[activeLocale];
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <div className="min-h-screen bg-white text-[#37474F]">
      <Navbar />

      <main>
        <section className="relative isolate overflow-hidden bg-[#37474F] pt-20 pb-16 lg:pt-24 lg:pb-20">
          <Image
            src="/hero-nature-digital-transition.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 -z-30 object-cover opacity-34"
          />
          <div className="absolute inset-0 -z-20 bg-[#37474F]/82" />
          <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(55,71,79,0.98)_0%,rgba(55,71,79,0.84)_45%,rgba(46,125,50,0.48)_100%)]" />
          <ContactSignalLayer />

          <div
            className="relative z-10 grid gap-10 lg:grid-cols-[0.66fr_0.34fr] lg:items-end"
            style={{
              marginLeft: 'clamp(1.5rem, calc(9.14vw - 0.354rem), 7.875rem)',
              marginRight: 'clamp(1.5rem, calc(11.43vw - 1.286rem), 9rem)',
            }}
          >
            <div className="max-w-5xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#A5D6A7]">{copy.eyebrow}</p>
              <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-[1.02] tracking-tight text-white md:text-6xl lg:text-7xl">
                {copy.headline}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-white/78 md:text-lg">
                {copy.intro}
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <a
                  href="#contact-form"
                  className="inline-flex items-center justify-center gap-3 rounded-sm bg-white px-6 py-4 text-sm font-semibold text-[#1F3529] shadow-[0_18px_48px_rgba(0,0,0,0.22)] transition-colors hover:bg-[#A5D6A7]"
                >
                  <span>{copy.primaryCta}</span>
                  <ArrowIcon />
                </a>
                <Link
                  href={localizePath(activeLocale, '/products/nbc')}
                  className="inline-flex items-center justify-center gap-3 rounded-sm border border-white/28 px-6 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-[#A5D6A7] hover:bg-white/10"
                >
                  <span>{copy.secondaryCta}</span>
                  <ArrowIcon />
                </Link>
              </div>
            </div>

            <aside className="border-l-2 border-[#A5D6A7] bg-[#37474F]/42 p-5 text-white shadow-[0_20px_70px_rgba(0,0,0,0.18)] backdrop-blur-sm lg:justify-self-end">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A5D6A7]">{copy.responseTitle}</p>
              <p className="mt-3 text-2xl font-semibold leading-tight">{copy.responseBody}</p>
              <a href="mailto:sales@lbya.se" className="mt-5 inline-flex items-center gap-3 text-sm font-semibold text-white transition-colors hover:text-[#A5D6A7]">
                <MailIcon className="h-4 w-4" />
                sales@lbya.se
              </a>
            </aside>
          </div>
        </section>

        <section className="bg-[#F6F8F4] py-16 sm:py-20">
          <div
            style={{
              marginLeft: 'clamp(1.5rem, calc(9.14vw - 0.354rem), 7.875rem)',
              marginRight: 'clamp(1.5rem, calc(11.43vw - 1.286rem), 9rem)',
            }}
          >
            <div className="grid gap-6 lg:grid-cols-[0.42fr_0.58fr] lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2E7D32]">
                  {copy.pathsEyebrow}
                </p>
                <h2 className="mt-4 max-w-3xl text-3xl font-light leading-tight text-[#1F3529] md:text-5xl">
                  {copy.pathsHeading}
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-8 text-[#37474F]/72 lg:justify-self-end">
                {copy.pathsBody}
              </p>
            </div>

            <div className="mt-10 grid gap-px overflow-hidden border border-[#1F3529]/10 bg-[#1F3529]/10 md:grid-cols-2 xl:grid-cols-4">
              {copy.paths.map((path) => (
                <article key={path.title} className="bg-white p-6">
                  <span className="mb-7 inline-flex h-10 min-w-10 items-center justify-center rounded-sm bg-[#2E7D32]/10 px-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#2E7D32]">
                    {path.product}
                  </span>
                  <h3 className="text-xl font-semibold text-[#1F3529]">{path.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#37474F]/72">{path.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact-form" className="bg-white py-16 sm:py-20">
          <div
            className="grid gap-10 lg:grid-cols-[0.62fr_0.38fr] lg:items-start"
            style={{
              marginLeft: 'clamp(1.5rem, calc(9.14vw - 0.354rem), 7.875rem)',
              marginRight: 'clamp(1.5rem, calc(11.43vw - 1.286rem), 9rem)',
            }}
          >
            <div className="border border-[#1F3529]/10 bg-white p-6 shadow-[0_18px_55px_rgba(31,53,41,0.08)] sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2E7D32]">{copy.formEyebrow}</p>
              <h2 className="mt-3 text-3xl font-light leading-tight text-[#1F3529] md:text-5xl">{copy.formTitle}</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#37474F]/72">{copy.formBody}</p>

              {submitted && (
                <div className="mt-8 border-l-4 border-[#2E7D32] bg-[#F6F8F4] p-5">
                  <p className="font-semibold text-[#1F3529]">{copy.successTitle}</p>
                  <p className="mt-2 text-sm leading-6 text-[#37474F]/72">{copy.successBody}</p>
                </div>
              )}

              <form
                className="mt-8 grid gap-5"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubmitted(true);
                }}
              >
                <div>
                  <label htmlFor="inquiry" className="mb-2 block text-sm font-semibold text-[#1F3529]">
                    {copy.inquiryLabel}
                  </label>
                  <select
                    id="inquiry"
                    name="inquiry"
                    defaultValue=""
                    className="w-full rounded-sm border border-[#1F3529]/16 bg-white px-4 py-3 text-[#37474F] outline-none transition-colors focus:border-[#2E7D32]"
                  >
                    <option value="" disabled>
                      {copy.inquiryPlaceholder}
                    </option>
                    {copy.inquiryOptions.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-semibold text-[#1F3529]">
                      {copy.nameLabel}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder={copy.namePlaceholder}
                      className="w-full rounded-sm border border-[#1F3529]/16 px-4 py-3 outline-none transition-colors focus:border-[#2E7D32]"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#1F3529]">
                      {copy.emailLabel}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder={copy.emailPlaceholder}
                      className="w-full rounded-sm border border-[#1F3529]/16 px-4 py-3 outline-none transition-colors focus:border-[#2E7D32]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="mb-2 block text-sm font-semibold text-[#1F3529]">
                    {copy.companyLabel}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    placeholder={copy.companyPlaceholder}
                    className="w-full rounded-sm border border-[#1F3529]/16 px-4 py-3 outline-none transition-colors focus:border-[#2E7D32]"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-semibold text-[#1F3529]">
                    {copy.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder={copy.messagePlaceholder}
                    className="w-full resize-none rounded-sm border border-[#1F3529]/16 px-4 py-3 outline-none transition-colors focus:border-[#2E7D32]"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-sm bg-[#1F3529] px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#2E7D32] sm:w-fit"
                >
                  <span>{submitted ? copy.submitted : copy.submit}</span>
                  <ArrowIcon />
                </button>
              </form>
            </div>

            <aside className="grid gap-5">
              <div className="border border-[#1F3529]/10 bg-[#F6F8F4] p-6">
                <h2 className="text-2xl font-semibold text-[#1F3529]">{copy.contactTitle}</h2>
                <p className="mt-4 text-sm leading-7 text-[#37474F]/72">{copy.contactBody}</p>

                <div className="mt-7 grid gap-5">
                  <a href="mailto:sales@lbya.se" className="group flex items-start gap-4 text-[#37474F]">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-white text-[#2E7D32] shadow-[0_10px_28px_rgba(31,53,41,0.08)]">
                      <MailIcon />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[#2E7D32]">{copy.emailTitle}</span>
                      <span className="mt-1 block text-sm font-semibold transition-colors group-hover:text-[#2E7D32]">sales@lbya.se</span>
                    </span>
                  </a>

                  <a href="tel:+46765960161" className="group flex items-start gap-4 text-[#37474F]">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-white text-[#2E7D32] shadow-[0_10px_28px_rgba(31,53,41,0.08)]">
                      <PhoneIcon />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[#2E7D32]">{copy.phoneTitle}</span>
                      <span className="mt-1 block text-sm font-semibold transition-colors group-hover:text-[#2E7D32]">{copy.phone}</span>
                    </span>
                  </a>

                  <div className="flex items-start gap-4 text-[#37474F]">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-white text-[#2E7D32] shadow-[0_10px_28px_rgba(31,53,41,0.08)]">
                      <PinIcon />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[#2E7D32]">{copy.addressTitle}</span>
                      <span className="mt-1 block whitespace-pre-line text-sm font-semibold leading-6">{copy.address}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-[#2E7D32] bg-[#37474F] p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A5D6A7]">{copy.nextTitle}</p>
                <ul className="mt-5 grid gap-3">
                  {copy.nextItems.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-white/74">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A5D6A7]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
