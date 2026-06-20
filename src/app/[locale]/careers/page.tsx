'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { pageFrameStyle } from '@/app/components/LayoutFrame';
import { asLocale, type Locale } from '@/app/content/locale';

gsap.registerPlugin(ScrollTrigger);

const CAREERS_EMAIL = 'info@lbya.se';

type TextItem = { title: string; detail: string };
type CareerCopy = {
  eyebrow: string;
  heading: string;
  body: string;
  primaryCta: string;
  secondaryCta: string;
  focusTitle: string;
  focusBody: string;
  focusAreas: TextItem[];
  rolesTitle: string;
  rolesBody: string;
  roles: (TextItem & { meta: string })[];
  processTitle: string;
  process: TextItem[];
  formTitle: string;
  formIntro: string;
  formNote: string;
  successTitle: string;
  successBody: string;
  submit: string;
  submitted: string;
  fields: {
    role: string;
    rolePlaceholder: string;
    name: string;
    email: string;
    location: string;
    workMode: string;
    availability: string;
    linkedin: string;
    portfolio: string;
    cv: string;
    message: string;
    consent: string;
  };
  placeholders: {
    name: string;
    email: string;
    location: string;
    availability: string;
    linkedin: string;
    portfolio: string;
    cv: string;
    message: string;
  };
  roleOptions: string[];
  workModeOptions: string[];
  emailSubject: string;
};

const careersCopyByLocale: Record<Locale, CareerCopy> = {
  en: {
    eyebrow: 'Careers',
    heading: 'Build digital control products with LBYA.',
    body: 'We are building MCT and NBC with people who care about useful software, clear information, and products that make complex work easier to trust.',
    primaryCta: 'Apply now',
    secondaryCta: 'View focus areas',
    focusTitle: 'Where we are looking for talent',
    focusBody: 'LBYA is small and product-led, so strong applications connect directly to the products we are building.',
    focusAreas: [
      { title: 'Product engineering', detail: 'Frontend, full-stack, data workflows, integrations, dashboards, and product quality for MCT and NBC.' },
      { title: 'BIM control', detail: 'BIM managers, coordinators, model quality specialists, IFC/BCF/IDS knowledge, and project information control.' },
      { title: 'Logistics operations', detail: 'Transport coordination, African trade corridors, documentation workflows, verification, and partner operations.' },
      { title: 'Product design and growth', detail: 'User experience, product storytelling, customer onboarding, research, and product-market learning.' },
    ],
    rolesTitle: 'Open applications',
    rolesBody: 'We are not listing fixed vacancies today, but we welcome focused applications for the product areas below.',
    roles: [
      { title: 'MCT product and logistics', meta: 'Ready product', detail: 'For people who can help improve logistics workflows, customer onboarding, verification, and product operations.' },
      { title: 'NBC BIM control', meta: 'Early development', detail: 'For BIM specialists and product thinkers who can help shape requirements, model quality, issues, and evidence workflows.' },
      { title: 'Software and product engineering', meta: 'Product build', detail: 'For developers who enjoy practical interfaces, clean workflows, data structure, integrations, and reliable product details.' },
    ],
    processTitle: 'Application process',
    process: [
      { title: 'Application review', detail: 'We read the application against current product needs and future collaboration fit.' },
      { title: 'Intro conversation', detail: 'A short call to understand your experience, motivation, availability, and the product area you care about.' },
      { title: 'Product conversation', detail: 'A focused discussion around MCT, NBC, or a practical work sample when that makes sense.' },
      { title: 'Next step', detail: 'If there is a fit, we agree on role shape, timing, expectations, and collaboration terms.' },
    ],
    formTitle: 'Job application',
    formIntro: 'Tell us where you can contribute. Job applications go straight to info@lbya.se through your email client.',
    formNote: 'For CV files, add a shareable link below or attach the file when your email client opens.',
    successTitle: 'Your application is addressed to info@lbya.se.',
    successBody: 'If your email client did not open, send the same details to info@lbya.se.',
    submit: 'Send application to info@lbya.se',
    submitted: 'Email prepared',
    fields: {
      role: 'Area of interest',
      rolePlaceholder: 'Select an area',
      name: 'Full name',
      email: 'Email',
      location: 'Location',
      workMode: 'Preferred work mode',
      availability: 'Availability',
      linkedin: 'LinkedIn',
      portfolio: 'Portfolio or GitHub',
      cv: 'CV or resume link',
      message: 'Why LBYA?',
      consent: 'I agree that LBYA may review my application and contact me about relevant opportunities.',
    },
    placeholders: {
      name: 'Your full name',
      email: 'your.email@example.com',
      location: 'City, country',
      availability: 'Notice period, internship dates, or start date',
      linkedin: 'https://linkedin.com/in/...',
      portfolio: 'https://...',
      cv: 'Shareable CV link',
      message: 'Tell us what you want to build, what you are good at, and which product area fits you.',
    },
    roleOptions: ['MCT product and logistics', 'NBC BIM control', 'Software and product engineering', 'Product design and growth', 'Internship or thesis', 'Open application'],
    workModeOptions: ['Remote', 'Hybrid in Sweden', 'On-site by agreement', 'Flexible'],
    emailSubject: 'Career application to LBYA',
  },
  sv: {
    eyebrow: 'Karriär',
    heading: 'Bygg digitala kontrollprodukter med LBYA.',
    body: 'Vi bygger MCT och NBC med människor som bryr sig om användbar mjukvara, tydlig information och produkter som gör komplext arbete lättare att lita på.',
    primaryCta: 'Ansök nu',
    secondaryCta: 'Se fokusområden',
    focusTitle: 'Där vi söker talang',
    focusBody: 'LBYA är litet och produktdrivet, så starka ansökningar kopplar tydligt till produkterna vi bygger.',
    focusAreas: [
      { title: 'Produktutveckling', detail: 'Frontend, fullstack, dataflöden, integrationer, översikter och produktkvalitet för MCT och NBC.' },
      { title: 'BIM-kontroll', detail: 'BIM-ansvariga, koordinatorer, specialister på modellkvalitet, IFC/BCF/IDS och informationskontroll i projekt.' },
      { title: 'Logistik och operation', detail: 'Transportsamordning, afrikanska handelskorridorer, dokumentflöden, verifiering och partnerarbete.' },
      { title: 'Produktdesign och tillväxt', detail: 'Användarupplevelse, produktkommunikation, kundintroduktion, research och produktmarknadslärande.' },
    ],
    rolesTitle: 'Öppna ansökningar',
    rolesBody: 'Vi listar inga fasta tjänster just nu, men välkomnar fokuserade ansökningar inom produktområdena nedan.',
    roles: [
      { title: 'MCT produkt och logistik', meta: 'Färdig produkt', detail: 'För dig som kan förbättra logistikflöden, kundintroduktion, verifiering och produktoperation.' },
      { title: 'NBC BIM-kontroll', meta: 'Tidig utveckling', detail: 'För BIM-specialister och produktpersoner som kan forma krav, modellkvalitet, ärenden och underlagsflöden.' },
      { title: 'Mjukvara och produktutveckling', meta: 'Produktbygge', detail: 'För utvecklare som gillar praktiska gränssnitt, rena flöden, datastruktur, integrationer och pålitliga produktdetaljer.' },
    ],
    processTitle: 'Ansökningsprocess',
    process: [
      { title: 'Ansökningsgranskning', detail: 'Vi läser ansökan utifrån aktuella produktbehov och framtida samarbetsmöjligheter.' },
      { title: 'Introduktionssamtal', detail: 'Ett kort samtal om erfarenhet, motivation, tillgänglighet och vilket produktområde du bryr dig om.' },
      { title: 'Produktsamtal', detail: 'En fokuserad diskussion om MCT, NBC eller ett praktiskt arbetsprov när det passar.' },
      { title: 'Nästa steg', detail: 'Om det finns en matchning kommer vi överens om roll, timing, förväntningar och samarbetsvillkor.' },
    ],
    formTitle: 'Jobbansökan',
    formIntro: 'Berätta var du kan bidra. Jobbansökningar går direkt till info@lbya.se via ditt mejlprogram.',
    formNote: 'För CV-filer kan du lägga in en delbar länk nedan eller bifoga filen när mejlprogrammet öppnas.',
    successTitle: 'Din ansökan är adresserad till info@lbya.se.',
    successBody: 'Om mejlprogrammet inte öppnades kan du skicka samma uppgifter till info@lbya.se.',
    submit: 'Skicka ansökan till info@lbya.se',
    submitted: 'Mejl förberett',
    fields: {
      role: 'Intresseområde',
      rolePlaceholder: 'Välj ett område',
      name: 'Fullständigt namn',
      email: 'E-post',
      location: 'Plats',
      workMode: 'Önskat arbetssätt',
      availability: 'Tillgänglighet',
      linkedin: 'LinkedIn',
      portfolio: 'Portfolio eller GitHub',
      cv: 'CV-länk',
      message: 'Varför LBYA?',
      consent: 'Jag samtycker till att LBYA får granska min ansökan och kontakta mig om relevanta möjligheter.',
    },
    placeholders: {
      name: 'Ditt fullständiga namn',
      email: 'din.epost@example.com',
      location: 'Stad, land',
      availability: 'Uppsägningstid, praktikperiod eller startdatum',
      linkedin: 'https://linkedin.com/in/...',
      portfolio: 'https://...',
      cv: 'Delbar CV-länk',
      message: 'Berätta vad du vill bygga, vad du är bra på och vilket produktområde som passar dig.',
    },
    roleOptions: ['MCT produkt och logistik', 'NBC BIM-kontroll', 'Mjukvara och produktutveckling', 'Produktdesign och tillväxt', 'Praktik eller examensarbete', 'Öppen ansökan'],
    workModeOptions: ['Distans', 'Hybrid i Sverige', 'På plats enligt överenskommelse', 'Flexibelt'],
    emailSubject: 'Karriäransökan till LBYA',
  },
  fr: {
    eyebrow: 'Carrières',
    heading: 'Construisez des produits de contrôle numérique avec LBYA.',
    body: 'Nous développons MCT et NBC avec des personnes qui aiment les logiciels utiles, l’information claire et les produits qui rendent le travail complexe plus fiable.',
    primaryCta: 'Postuler',
    secondaryCta: 'Voir les domaines',
    focusTitle: 'Les talents que nous recherchons',
    focusBody: 'LBYA est une entreprise petite et orientée produit. Les meilleures candidatures se relient donc directement aux produits que nous construisons.',
    focusAreas: [
      { title: 'Ingénierie produit', detail: 'Frontend, full-stack, flux de données, intégrations, tableaux de bord et qualité produit pour MCT et NBC.' },
      { title: 'Contrôle BIM', detail: 'BIM managers, coordinateurs, spécialistes de la qualité des modèles, connaissances IFC/BCF/IDS et contrôle de l’information projet.' },
      { title: 'Opérations logistiques', detail: 'Coordination du transport, corridors commerciaux africains, flux documentaires, vérification et opérations partenaires.' },
      { title: 'Design produit et croissance', detail: 'Expérience utilisateur, récit produit, prise en main client, recherche et apprentissage marché-produit.' },
    ],
    rolesTitle: 'Candidatures ouvertes',
    rolesBody: 'Nous n’affichons pas de postes fixes aujourd’hui, mais nous accueillons les candidatures ciblées dans les domaines ci-dessous.',
    roles: [
      { title: 'Produit MCT et logistique', meta: 'Produit prêt', detail: 'Pour les personnes capables d’améliorer les flux logistiques, la prise en main client, la vérification et les opérations produit.' },
      { title: 'Contrôle BIM NBC', meta: 'Développement précoce', detail: 'Pour les spécialistes BIM et profils produit capables de façonner les exigences, la qualité du modèle, les problèmes et les preuves.' },
      { title: 'Logiciel et ingénierie produit', meta: 'Construction produit', detail: 'Pour les développeurs qui aiment les interfaces pratiques, les flux clairs, la structure des données, les intégrations et les détails fiables.' },
    ],
    processTitle: 'Processus de candidature',
    process: [
      { title: 'Étude de la candidature', detail: 'Nous lisons la candidature selon les besoins produit actuels et le potentiel de collaboration future.' },
      { title: 'Conversation d’introduction', detail: 'Un court appel pour comprendre votre expérience, votre motivation, votre disponibilité et le domaine produit qui vous intéresse.' },
      { title: 'Conversation produit', detail: 'Un échange ciblé autour de MCT, NBC ou d’un exemple de travail lorsque cela a du sens.' },
      { title: 'Prochaine étape', detail: 'S’il y a une bonne adéquation, nous convenons de la forme du rôle, du calendrier, des attentes et des conditions.' },
    ],
    formTitle: 'Candidature',
    formIntro: 'Dites-nous où vous pouvez contribuer. Les candidatures sont adressées directement à info@lbya.se via votre client e-mail.',
    formNote: 'Pour les fichiers CV, ajoutez un lien partageable ci-dessous ou joignez le fichier lorsque votre client e-mail s’ouvre.',
    successTitle: 'Votre candidature est adressée à info@lbya.se.',
    successBody: 'Si votre client e-mail ne s’est pas ouvert, envoyez les mêmes informations à info@lbya.se.',
    submit: 'Envoyer la candidature à info@lbya.se',
    submitted: 'E-mail préparé',
    fields: {
      role: 'Domaine d’intérêt',
      rolePlaceholder: 'Sélectionner un domaine',
      name: 'Nom complet',
      email: 'E-mail',
      location: 'Localisation',
      workMode: 'Mode de travail souhaité',
      availability: 'Disponibilité',
      linkedin: 'LinkedIn',
      portfolio: 'Portfolio ou GitHub',
      cv: 'Lien CV',
      message: 'Pourquoi LBYA ?',
      consent: 'J’accepte que LBYA examine ma candidature et me contacte au sujet d’opportunités pertinentes.',
    },
    placeholders: {
      name: 'Votre nom complet',
      email: 'votre.email@example.com',
      location: 'Ville, pays',
      availability: 'Préavis, dates de stage ou date de début',
      linkedin: 'https://linkedin.com/in/...',
      portfolio: 'https://...',
      cv: 'Lien CV partageable',
      message: 'Dites-nous ce que vous voulez construire, vos points forts et le domaine produit qui vous correspond.',
    },
    roleOptions: ['Produit MCT et logistique', 'Contrôle BIM NBC', 'Logiciel et ingénierie produit', 'Design produit et croissance', 'Stage ou mémoire', 'Candidature ouverte'],
    workModeOptions: ['À distance', 'Hybride en Suède', 'Sur site selon accord', 'Flexible'],
    emailSubject: 'Candidature carrière LBYA',
  },
  de: {
    eyebrow: 'Karriere',
    heading: 'Bauen Sie digitale Kontrollprodukte mit LBYA.',
    body: 'Wir entwickeln MCT und NBC mit Menschen, die nützliche Software, klare Informationen und Produkte schätzen, die komplexe Arbeit verlässlicher machen.',
    primaryCta: 'Jetzt bewerben',
    secondaryCta: 'Fokusbereiche ansehen',
    focusTitle: 'Wo wir Talent suchen',
    focusBody: 'LBYA ist klein und produktorientiert. Starke Bewerbungen stellen deshalb einen klaren Bezug zu unseren Produkten her.',
    focusAreas: [
      { title: 'Produktentwicklung', detail: 'Frontend, Full-Stack, Datenflüsse, Integrationen, Dashboards und Produktqualität für MCT und NBC.' },
      { title: 'BIM-Kontrolle', detail: 'BIM-Manager, Koordinatoren, Modellqualität, IFC/BCF/IDS-Kenntnisse und Kontrolle von Projektinformationen.' },
      { title: 'Logistik und Betrieb', detail: 'Transportkoordination, afrikanische Handelskorridore, Dokumentenabläufe, Verifizierung und Partnerbetrieb.' },
      { title: 'Produktdesign und Wachstum', detail: 'Nutzererlebnis, Produktkommunikation, Kundeneinführung, Research und Produkt-Markt-Lernen.' },
    ],
    rolesTitle: 'Initiativbewerbungen',
    rolesBody: 'Wir listen aktuell keine festen Stellen, freuen uns aber über fokussierte Bewerbungen für die folgenden Produktbereiche.',
    roles: [
      { title: 'MCT Produkt und Logistik', meta: 'Fertiges Produkt', detail: 'Für Menschen, die Logistikworkflows, Kundeneinführung, Verifizierung und Produktbetrieb verbessern können.' },
      { title: 'NBC BIM-Kontrolle', meta: 'Frühe Entwicklung', detail: 'Für BIM-Spezialisten und Produktdenker, die Anforderungen, Modellqualität, Themen und Nachweisabläufe mitgestalten können.' },
      { title: 'Software und Produktentwicklung', meta: 'Produktaufbau', detail: 'Für Entwickler, die praktische Oberflächen, klare Workflows, Datenstruktur, Integrationen und verlässliche Produktdetails mögen.' },
    ],
    processTitle: 'Bewerbungsprozess',
    process: [
      { title: 'Prüfung der Bewerbung', detail: 'Wir lesen die Bewerbung im Hinblick auf aktuelle Produktbedarfe und künftige Zusammenarbeit.' },
      { title: 'Erstes Gespräch', detail: 'Ein kurzes Gespräch über Erfahrung, Motivation, Verfügbarkeit und den Produktbereich, der Sie interessiert.' },
      { title: 'Produktgespräch', detail: 'Ein fokussierter Austausch zu MCT, NBC oder einer praktischen Arbeitsprobe, wenn das sinnvoll ist.' },
      { title: 'Nächster Schritt', detail: 'Wenn es passt, vereinbaren wir Rollenform, Timing, Erwartungen und Bedingungen der Zusammenarbeit.' },
    ],
    formTitle: 'Bewerbung',
    formIntro: 'Sagen Sie uns, wo Sie beitragen können. Das Formular bereitet eine klare Bewerbungs-E-Mail an LBYA vor.',
    formNote: 'Für Lebenslauf-Dateien können Sie unten einen teilbaren Link einfügen oder die Datei anhängen, wenn Ihr E-Mail-Programm geöffnet wird.',
    successTitle: 'Ihre Bewerbungs-E-Mail ist bereit.',
    successBody: 'Falls sich Ihr E-Mail-Programm nicht geöffnet hat, senden Sie dieselben Angaben an info@lbya.se.',
    submit: 'Bewerbungs-E-Mail vorbereiten',
    submitted: 'E-Mail vorbereitet',
    fields: {
      role: 'Interessengebiet',
      rolePlaceholder: 'Bereich auswählen',
      name: 'Vollständiger Name',
      email: 'E-Mail',
      location: 'Standort',
      workMode: 'Bevorzugte Arbeitsform',
      availability: 'Verfügbarkeit',
      linkedin: 'LinkedIn',
      portfolio: 'Portfolio oder GitHub',
      cv: 'Lebenslauf-Link',
      message: 'Warum LBYA?',
      consent: 'Ich stimme zu, dass LBYA meine Bewerbung prüfen und mich zu passenden Möglichkeiten kontaktieren darf.',
    },
    placeholders: {
      name: 'Ihr vollständiger Name',
      email: 'ihre.email@example.com',
      location: 'Stadt, Land',
      availability: 'Kündigungsfrist, Praktikumsdaten oder Startdatum',
      linkedin: 'https://linkedin.com/in/...',
      portfolio: 'https://...',
      cv: 'Teilbarer Lebenslauf-Link',
      message: 'Sagen Sie uns, was Sie bauen möchten, worin Sie gut sind und welcher Produktbereich zu Ihnen passt.',
    },
    roleOptions: ['MCT Produkt und Logistik', 'NBC BIM-Kontrolle', 'Software und Produktentwicklung', 'Produktdesign und Wachstum', 'Praktikum oder Abschlussarbeit', 'Initiativbewerbung'],
    workModeOptions: ['Remote', 'Hybrid in Schweden', 'Vor Ort nach Vereinbarung', 'Flexibel'],
    emailSubject: 'Karrierebewerbung bei LBYA',
  },
};

function localizePath(locale: Locale, href: string) {
  if (!href.startsWith('/')) return href;
  if (href === '/') return `/${locale}`;
  return `/${locale}${href}`;
}

function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-[#24362C]">
      {children}
    </label>
  );
}

export default function CareersPage() {
  const activeLocale = asLocale(useLocale());
  const copy = careersCopyByLocale[activeLocale];
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(introRef.current, {
        opacity: 0,
        y: 28,
        duration: 0.8,
        ease: 'power3.out',
      });

      cardRefs.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: { trigger: card, start: 'top 86%' },
            opacity: 0,
            y: 28,
            duration: 0.65,
            delay: index * 0.05,
            ease: 'power2.out',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const lines = [
      `${copy.fields.role}: ${formData.get('role') ?? ''}`,
      `${copy.fields.name}: ${formData.get('name') ?? ''}`,
      `${copy.fields.email}: ${formData.get('email') ?? ''}`,
      `${copy.fields.location}: ${formData.get('location') ?? ''}`,
      `${copy.fields.workMode}: ${formData.get('workMode') ?? ''}`,
      `${copy.fields.availability}: ${formData.get('availability') ?? ''}`,
      `${copy.fields.linkedin}: ${formData.get('linkedin') ?? ''}`,
      `${copy.fields.portfolio}: ${formData.get('portfolio') ?? ''}`,
      `${copy.fields.cv}: ${formData.get('cv') ?? ''}`,
      '',
      `${copy.fields.message}:`,
      `${formData.get('message') ?? ''}`,
    ];

    const subject = `${copy.emailSubject} - ${formData.get('name') ?? ''}`;
    const mailto = `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;

    setSubmitted(true);
    window.location.href = mailto;
  };

  return (
    <div className="min-h-screen bg-[#F6F8F4]">
      <Navbar />

      <section ref={sectionRef} className="relative overflow-hidden bg-[#37474F] text-white">
        <div className="absolute inset-0">
          <Image
            src="/hero-nature-digital-transition.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-[0.48]"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#37474F] via-[#37474F]/78 to-[#37474F]/38" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-[#F6F8F4] to-transparent" />
        </div>

        <div
          ref={introRef}
          className="content-frame relative grid min-h-[72vh] content-end gap-10 pb-24 pt-32 lg:grid-cols-[0.95fr_0.75fr] lg:items-end"
          style={pageFrameStyle}
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#A5D6A7]">{copy.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-light leading-[1.02] md:text-7xl">
              {copy.heading}
            </h1>
          </div>
          <div className="max-w-xl lg:justify-self-end">
            <p className="text-lg leading-8 text-white/78 md:text-xl">
              {copy.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#application"
                className="inline-flex items-center gap-3 rounded-sm bg-white px-6 py-3.5 text-sm font-semibold text-[#1F3529] transition-colors hover:bg-[#A5D6A7]"
              >
                <span>{copy.primaryCta}</span>
                <ArrowIcon />
              </a>
              <a
                href="#focus-areas"
                className="inline-flex items-center gap-3 border-b border-white/35 py-3.5 text-sm font-semibold text-white/82 transition-colors hover:border-white hover:text-white"
              >
                <span>{copy.secondaryCta}</span>
                <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

      <main>
        <section id="focus-areas" className="content-frame py-20" style={pageFrameStyle}>
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2E7D32]">{copy.eyebrow}</p>
              <h2 className="mt-4 text-4xl font-light leading-tight text-[#1F3529] md:text-5xl">
                {copy.focusTitle}
              </h2>
              <p className="mt-5 text-base leading-8 text-[#37474F]/72">
                {copy.focusBody}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {copy.focusAreas.map((area, index) => (
                <article
                  key={area.title}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="border border-[#1F3529]/12 bg-white p-6 shadow-[0_14px_45px_rgba(38,66,53,0.08)]"
                >
                  <span className="text-sm font-semibold text-[#2E7D32]">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="mt-5 text-2xl font-light leading-tight text-[#1F3529]">{area.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#37474F]/70">{area.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="content-frame" style={pageFrameStyle}>
            <div className="max-w-3xl">
              <h2 className="text-4xl font-light leading-tight text-[#1F3529] md:text-5xl">{copy.rolesTitle}</h2>
              <p className="mt-5 text-base leading-8 text-[#37474F]/72">{copy.rolesBody}</p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {copy.roles.map((role, index) => (
                <article
                  key={role.title}
                  ref={(el) => {
                    cardRefs.current[index + copy.focusAreas.length] = el;
                  }}
                  className="flex min-h-[260px] flex-col justify-between border border-[#1F3529]/12 bg-[#F6F8F4] p-6"
                >
                  <div>
                    <span className="inline-flex border border-[#2E7D32]/24 bg-[#2E7D32]/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#2E7D32]">
                      {role.meta}
                    </span>
                    <h3 className="mt-5 text-2xl font-light leading-tight text-[#1F3529]">{role.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-[#37474F]/72">{role.detail}</p>
                  </div>
                  <a href="#application" className="mt-8 inline-flex w-fit items-center gap-3 border-b border-[#2E7D32]/35 py-2 text-sm font-semibold text-[#2E7D32] transition-colors hover:border-[#2E7D32] hover:text-[#1F5B25]">
                    <span>{copy.primaryCta}</span>
                    <ArrowIcon />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="application" className="bg-[#1F3529] py-20 text-white">
          <div className="content-frame grid gap-10 lg:grid-cols-[0.72fr_1.28fr]" style={pageFrameStyle}>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#A5D6A7]">{copy.eyebrow}</p>
              <h2 className="mt-4 text-4xl font-light leading-tight md:text-5xl">{copy.formTitle}</h2>
              <p className="mt-5 text-base leading-8 text-white/70">{copy.formIntro}</p>
              <p className="mt-5 border-l border-[#A5D6A7]/45 pl-4 text-sm leading-7 text-white/58">{copy.formNote}</p>
              {submitted && (
                <div className="mt-8 border border-[#A5D6A7]/30 bg-[#A5D6A7]/10 p-5">
                  <p className="font-semibold text-[#A5D6A7]">{copy.successTitle}</p>
                  <p className="mt-2 text-sm leading-6 text-white/68">{copy.successBody}</p>
                </div>
              )}
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="bg-white p-6 text-[#1F3529] shadow-[0_24px_80px_rgba(0,0,0,0.18)] sm:p-8">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <FieldLabel htmlFor="role">{copy.fields.role}</FieldLabel>
                  <select id="role" name="role" required defaultValue="" className="w-full border border-[#1F3529]/18 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[#2E7D32]">
                    <option value="" disabled>{copy.fields.rolePlaceholder}</option>
                    {copy.roleOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <FieldLabel htmlFor="name">{copy.fields.name}</FieldLabel>
                  <input id="name" name="name" required type="text" placeholder={copy.placeholders.name} className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm outline-none transition-colors focus:border-[#2E7D32]" />
                </div>
                <div>
                  <FieldLabel htmlFor="email">{copy.fields.email}</FieldLabel>
                  <input id="email" name="email" required type="email" placeholder={copy.placeholders.email} className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm outline-none transition-colors focus:border-[#2E7D32]" />
                </div>
                <div>
                  <FieldLabel htmlFor="location">{copy.fields.location}</FieldLabel>
                  <input id="location" name="location" required type="text" placeholder={copy.placeholders.location} className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm outline-none transition-colors focus:border-[#2E7D32]" />
                </div>
                <div>
                  <FieldLabel htmlFor="workMode">{copy.fields.workMode}</FieldLabel>
                  <select id="workMode" name="workMode" required defaultValue={copy.workModeOptions[0]} className="w-full border border-[#1F3529]/18 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[#2E7D32]">
                    {copy.workModeOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <FieldLabel htmlFor="availability">{copy.fields.availability}</FieldLabel>
                  <input id="availability" name="availability" required type="text" placeholder={copy.placeholders.availability} className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm outline-none transition-colors focus:border-[#2E7D32]" />
                </div>
                <div>
                  <FieldLabel htmlFor="linkedin">{copy.fields.linkedin}</FieldLabel>
                  <input id="linkedin" name="linkedin" type="url" placeholder={copy.placeholders.linkedin} className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm outline-none transition-colors focus:border-[#2E7D32]" />
                </div>
                <div>
                  <FieldLabel htmlFor="portfolio">{copy.fields.portfolio}</FieldLabel>
                  <input id="portfolio" name="portfolio" type="url" placeholder={copy.placeholders.portfolio} className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm outline-none transition-colors focus:border-[#2E7D32]" />
                </div>
                <div className="md:col-span-2">
                  <FieldLabel htmlFor="cv">{copy.fields.cv}</FieldLabel>
                  <input id="cv" name="cv" type="url" placeholder={copy.placeholders.cv} className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm outline-none transition-colors focus:border-[#2E7D32]" />
                </div>
                <div className="md:col-span-2">
                  <FieldLabel htmlFor="message">{copy.fields.message}</FieldLabel>
                  <textarea id="message" name="message" required rows={6} placeholder={copy.placeholders.message} className="w-full resize-none border border-[#1F3529]/18 px-4 py-3 text-sm leading-6 outline-none transition-colors focus:border-[#2E7D32]" />
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-start gap-3 text-sm leading-6 text-[#37474F]/78">
                    <input name="consent" required type="checkbox" className="mt-1 h-4 w-4 accent-[#2E7D32]" />
                    <span>{copy.fields.consent}</span>
                  </label>
                </div>
              </div>

              <button type="submit" className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-sm bg-[#2E7D32] px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#1F5B25]">
                <span>{submitted ? copy.submitted : copy.submit}</span>
                <ArrowIcon />
              </button>
            </form>
          </div>
        </section>

        <section className="bg-[#F6F8F4] py-14">
          <div
            className="content-frame flex flex-col gap-4 border-t border-[#1F3529]/12 pt-8 text-sm text-[#37474F]/62 md:flex-row md:items-center md:justify-between"
            style={pageFrameStyle}
          >
            <span>info@lbya.se</span>
            <a href={localizePath(activeLocale, '/contact')} className="inline-flex w-fit items-center gap-3 border-b border-[#2E7D32]/35 py-2 font-semibold text-[#2E7D32] transition-colors hover:border-[#2E7D32] hover:text-[#1F5B25]">
              <span>{copy.secondaryCta}</span>
              <ArrowIcon />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
