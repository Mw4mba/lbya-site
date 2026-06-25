'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useRef } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Wordmark from '@/app/components/Wordmark';
import { asLocale, type Locale } from '@/app/content/locale';
import { localizePath } from '@/app/content/paths';

type AboutPoint = {
  title: string;
  body: string;
};

type AboutPageCopy = {
  heroEyebrow: string;
  heroHeading: string;
  heroBody: string;
  primaryCta: string;
  secondaryCta: string;
  systemLabel: string;
  systemTitle: string;
  systemItems: string[];
  principlesEyebrow: string;
  principlesHeading: string;
  principlesBody: string;
  principles: AboutPoint[];
  productsEyebrow: string;
  productsHeading: string;
  productsBody: string;
  productStatus: Record<string, string>;
  productBriefs: Record<string, string>;
  goals: AboutPoint[];
  learnMore: string;
  requestDemo: string;
  methodEyebrow: string;
  methodHeading: string;
  methodBody: string;
  method: AboutPoint[];
  proofLabel: string;
  proofText: string;
  closingHeading: string;
  closingBody: string;
  closingCta: string;
};

const aboutPageCopyByLocale: Record<Locale, AboutPageCopy> = {
  en: {
    heroEyebrow: 'About LBYA',
    heroHeading: 'Everything is connected.',
    heroBody:
      'LBYA was founded on the belief that people, nature, infrastructure, information, and markets belong to one connected system. We exist to turn complexity into clearer structures that people can use, trust, and improve.',
    primaryCta: 'See our goals',
    secondaryCta: 'Contact LBYA',
    systemLabel: 'Rooted in Nature, Designed for the Future.',
    systemTitle: 'Rooted in nature. Designed for the future.',
    systemItems: ['Observe the whole system', 'Build with clear purpose', 'Design for long-term trust'],
    principlesEyebrow: 'Our story',
    principlesHeading: 'A company shaped by nature, technology, and practical responsibility.',
    principlesBody:
      'LBYA began with broad knowledge in architecture, engineering, BIM/VDC, IT, and market operations. That mix taught us that better tools matter only when they help people make clearer decisions.',
    principles: [
      { title: 'Everything is connected', body: 'People, information, assets, and decisions influence one another. LBYA designs with that wider system in mind.' },
      { title: 'Nature gives us a model', body: 'Natural systems are resilient because they are connected, adaptive, and balanced. That thinking shapes how we approach technology.' },
      { title: 'Technology should reduce noise', body: 'Digital systems should make responsibility, evidence, and next steps easier to see, not add another layer of confusion.' },
    ],
    productsEyebrow: 'Why LBYA exists',
    productsHeading: 'To help organisations manage complexity with clarity, structure, and trust.',
    productsBody:
      'Our goal is to build useful digital control platforms for industries where information moves across many people, places, documents, and decisions.',
    productStatus: {
      mct: 'Ready product',
      'nbc': 'Access by request',
    },
    productBriefs: {
      mct: 'A ready logistics control tower for transport requests, transporter records, document verification, quote coordination, status tracking, and operational reporting.',
      'nbc': 'A mid-stage BIM control product for model information, issue ownership, evidence, and decision readiness.',
    },
    goals: [
      { title: 'Make work visible', body: 'Give teams a clearer view of what is happening, what is missing, and what needs attention.' },
      { title: 'Strengthen trust', body: 'Keep important information structured enough for people to review, explain, and stand behind.' },
      { title: 'Build with focus', body: 'Create specific digital products that solve real coordination problems instead of promising everything at once.' },
      { title: 'Grow responsibly', body: 'Build from Sweden with a global outlook and a long-term respect for people, markets, and the environment.' },
    ],
    learnMore: 'Learn more',
    requestDemo: 'Request demo',
    methodEyebrow: 'Meaning of the slogan',
    methodHeading: 'Rooted in Nature, Designed for the Future.',
    methodBody:
      'For LBYA, the slogan is not decoration. It explains how we think: learn from living systems, then design digital structures that are resilient, useful, and ready for what comes next.',
    method: [
      { title: 'Rooted in Nature', body: 'We look at connection, balance, adaptation, and long-term resilience before deciding what a digital system should do.' },
      { title: 'Designed for the Future', body: 'We build for industries that are becoming more data-driven, more connected, and more dependent on trustworthy records.' },
      { title: 'Human control', body: 'The goal is not technology for its own sake. The goal is to help people coordinate work with more confidence.' },
      { title: 'Global ambition', body: 'LBYA is rooted in strong technical discipline and shaped by an international outlook, with a focus on connected industries that need better control.' },
    ],
    proofLabel: 'Where we are going',
    proofText: 'LBYA is a trusted technology company for connected industries: disciplined in how we build, international in outlook, and focused on products that make complex coordination easier to trust.',
    closingHeading: 'Rooted in Nature, Designed for the Future.',
    closingBody:
      'The company is moving from broad services to focused products, while keeping the same foundation: responsible systems thinking, practical engineering, and respect for the environments where our technology is used.',
    closingCta: 'Talk to LBYA',
  },
  sv: {
    heroEyebrow: 'Om LBYA',
    heroHeading: 'Allt h\u00e4nger samman.',
    heroBody:
      'LBYA grundades p\u00e5 \u00f6vertygelsen att m\u00e4nniskor, natur, infrastruktur, information och marknader ing\u00e5r i ett sammanh\u00e4ngande system. Vi finns f\u00f6r att g\u00f6ra komplexitet tydligare, mer strukturerad och l\u00e4ttare att lita p\u00e5.',
    primaryCta: 'Se v\u00e5ra m\u00e5l',
    secondaryCta: 'Kontakta LBYA',
    systemLabel: 'Rooted in Nature, Designed for the Future.',
    systemTitle: 'Rotad i naturen. Designad f\u00f6r framtiden.',
    systemItems: ['Se hela systemet', 'Bygg med tydligt syfte', 'Designa f\u00f6r l\u00e5ngsiktigt f\u00f6rtroende'],
    principlesEyebrow: 'V\u00e5r ber\u00e4ttelse',
    principlesHeading: 'Ett f\u00f6retag format av natur, teknik och praktiskt ansvar.',
    principlesBody:
      'LBYA b\u00f6rjade med bred kunskap inom arkitektur, teknik, BIM/VDC, IT och marknadsoperationer. Den kombinationen l\u00e4rde oss att b\u00e4ttre verktyg bara spelar roll n\u00e4r de hj\u00e4lper m\u00e4nniskor att fatta tydligare beslut.',
    principles: [
      { title: 'Allt h\u00e4nger samman', body: 'M\u00e4nniskor, information, tillg\u00e5ngar och beslut p\u00e5verkar varandra. LBYA designar med hela systemet i \u00e5tanke.' },
      { title: 'Naturen ger oss en modell', body: 'Naturliga system \u00e4r motst\u00e5ndskraftiga eftersom de \u00e4r sammankopplade, anpassningsbara och balanserade. Det pr\u00e4glar v\u00e5r syn p\u00e5 teknik.' },
      { title: 'Teknik ska minska brus', body: 'Digitala system ska g\u00f6ra ansvar, underlag och n\u00e4sta steg l\u00e4ttare att se, inte skapa \u00e4nnu ett lager av os\u00e4kerhet.' },
    ],
    productsEyebrow: 'Varf\u00f6r LBYA finns',
    productsHeading: 'F\u00f6r att hj\u00e4lpa organisationer hantera komplexitet med tydlighet, struktur och f\u00f6rtroende.',
    productsBody:
      'V\u00e5rt m\u00e5l \u00e4r att bygga anv\u00e4ndbara digitala kontrollplattformar f\u00f6r branscher d\u00e4r information r\u00f6r sig mellan m\u00e5nga personer, platser, dokument och beslut.',
    productStatus: {
      mct: 'F\u00e4rdig produkt',
      'nbc': 'Tidigt utvecklingsskede',
    },
    productBriefs: {
      mct: 'Ett redo kontrolltorn f\u00f6r logistik med transportf\u00f6rfr\u00e5gningar, transport\u00f6rsregister, dokumentverifiering, offerthantering, statusuppf\u00f6ljning och rapportering.',
      'nbc': 'En BIM-kontrollprodukt i tidig utveckling f\u00f6r modellinformation, \u00e4rendeansvar, underlag och beslutsberedskap.',
    },
    goals: [
      { title: 'G\u00f6ra arbete synligt', body: 'Ge team en tydligare bild av vad som h\u00e4nder, vad som saknas och vad som beh\u00f6ver uppm\u00e4rksamhet.' },
      { title: 'St\u00e4rka f\u00f6rtroende', body: 'H\u00e5lla viktig information tillr\u00e4ckligt strukturerad f\u00f6r att kunna granskas, f\u00f6rklaras och st\u00e5s f\u00f6r.' },
      { title: 'Bygga med fokus', body: 'Skapa specifika digitala produkter som l\u00f6ser verkliga samordningsproblem i st\u00e4llet f\u00f6r att lova allt p\u00e5 en g\u00e5ng.' },
      { title: 'V\u00e4xa ansvarsfullt', body: 'Bygga fr\u00e5n Sverige med global utblick och l\u00e5ngsiktig respekt f\u00f6r m\u00e4nniskor, marknader och milj\u00f6.' },
    ],
    learnMore: 'L\u00e4s mer',
    requestDemo: 'Beg\u00e4r demo',
    methodEyebrow: 'Sloganens betydelse',
    methodHeading: 'Rooted in Nature, Designed for the Future.',
    methodBody:
      'F\u00f6r LBYA \u00e4r sloganen inte dekoration. Den beskriver hur vi t\u00e4nker: l\u00e4r av levande system och designa sedan digitala strukturer som \u00e4r robusta, anv\u00e4ndbara och redo f\u00f6r det som kommer.',
    method: [
      { title: 'Rooted in Nature', body: 'Vi ser p\u00e5 samband, balans, anpassning och l\u00e5ngsiktig motst\u00e5ndskraft innan vi avg\u00f6r vad ett digitalt system ska g\u00f6ra.' },
      { title: 'Designed for the Future', body: 'Vi bygger f\u00f6r branscher som blir mer datadrivna, mer sammankopplade och mer beroende av tillf\u00f6rlitliga underlag.' },
      { title: 'M\u00e4nsklig kontroll', body: 'M\u00e5let \u00e4r inte teknik f\u00f6r teknikens skull. M\u00e5let \u00e4r att hj\u00e4lpa m\u00e4nniskor samordna arbete med st\u00f6rre trygghet.' },
      { title: 'Global ambition', body: 'LBYA \u00e4r rotat i stark teknisk disciplin och format av en internationell utblick, med fokus p\u00e5 sammankopplade branscher som beh\u00f6ver b\u00e4ttre kontroll.' },
    ],
    proofLabel: 'Vart vi \u00e4r p\u00e5 v\u00e4g',
    proofText: 'LBYA \u00e4r ett f\u00f6rtroendeingivande teknikbolag f\u00f6r sammankopplade branscher: disciplinerat i hur vi bygger, internationellt i utblick och fokuserat p\u00e5 produkter som g\u00f6r komplex samordning l\u00e4ttare att lita p\u00e5.',
    closingHeading: 'Rooted in Nature, Designed for the Future.',
    closingBody:
      'F\u00f6retaget r\u00f6r sig fr\u00e5n breda tj\u00e4nster till fokuserade produkter, men beh\u00e5ller samma grund: ansvarsfullt systemt\u00e4nkande, praktisk ingenj\u00f6rskonst och respekt f\u00f6r milj\u00f6erna d\u00e4r tekniken anv\u00e4nds.',
    closingCta: 'Prata med LBYA',
  },
  fr: {
    heroEyebrow: 'A propos de LBYA',
    heroHeading: 'Tout est li\u00e9.',
    heroBody:
      'LBYA est n\u00e9e de la conviction que les personnes, la nature, les infrastructures, l\u2019information et les march\u00e9s font partie d\u2019un m\u00eame syst\u00e8me. Notre r\u00f4le est de rendre la complexit\u00e9 plus claire, plus structur\u00e9e et plus fiable.',
    primaryCta: 'Voir nos objectifs',
    secondaryCta: 'Contacter LBYA',
    systemLabel: 'Rooted in Nature, Designed for the Future.',
    systemTitle: 'Ancr\u00e9 dans la nature. Con\u00e7u pour l\u2019avenir.',
    systemItems: ['Observer le syst\u00e8me entier', 'Construire avec un objectif clair', 'Concevoir pour une confiance durable'],
    principlesEyebrow: 'Notre histoire',
    principlesHeading: 'Une entreprise fa\u00e7onn\u00e9e par la nature, la technologie et la responsabilit\u00e9 pratique.',
    principlesBody:
      'LBYA est partie d\u2019une connaissance large de l\u2019architecture, de l\u2019ing\u00e9nierie, du BIM/VDC, de l\u2019IT et des op\u00e9rations de march\u00e9. Cette combinaison nous a appris qu\u2019un meilleur outil compte seulement s\u2019il aide les personnes \u00e0 prendre des d\u00e9cisions plus claires.',
    principles: [
      { title: 'Tout est li\u00e9', body: 'Les personnes, l\u2019information, les actifs et les d\u00e9cisions s\u2019influencent. LBYA con\u00e7oit avec cette vision d\u2019ensemble.' },
      { title: 'La nature nous inspire', body: 'Les syst\u00e8mes naturels sont r\u00e9silients parce qu\u2019ils sont connect\u00e9s, adaptables et \u00e9quilibr\u00e9s. Cette pens\u00e9e guide notre approche de la technologie.' },
      { title: 'La technologie doit clarifier', body: 'Les syst\u00e8mes num\u00e9riques doivent rendre les responsabilit\u00e9s, les preuves et les prochaines \u00e9tapes plus visibles, pas ajouter de la confusion.' },
    ],
    productsEyebrow: 'Pourquoi LBYA existe',
    productsHeading: 'Aider les organisations \u00e0 g\u00e9rer la complexit\u00e9 avec clart\u00e9, structure et confiance.',
    productsBody:
      'Notre objectif est de construire des plateformes de contr\u00f4le num\u00e9rique utiles pour les secteurs o\u00f9 l\u2019information circule entre de nombreuses personnes, lieux, documents et d\u00e9cisions.',
    productStatus: {
      mct: 'Produit pr\u00eat',
      'nbc': 'D\u00e9veloppement pr\u00e9coce',
    },
    productBriefs: {
      mct: 'Une tour de contr\u00f4le logistique pr\u00eate pour les demandes transport, dossiers transporteurs, v\u00e9rification documentaire, coordination des devis, suivi de statut et rapports.',
      'nbc': 'Un produit BIM en d\u00e9veloppement pr\u00e9coce pour l\u2019information mod\u00e8le, la responsabilit\u00e9 des sujets, les preuves et la pr\u00e9paration des d\u00e9cisions.',
    },
    goals: [
      { title: 'Rendre le travail visible', body: 'Donner aux \u00e9quipes une vision plus claire de ce qui avance, de ce qui manque et de ce qui demande attention.' },
      { title: 'Renforcer la confiance', body: 'Garder les informations importantes assez structur\u00e9es pour \u00eatre revues, expliqu\u00e9es et assum\u00e9es.' },
      { title: 'Construire avec focus', body: 'Cr\u00e9er des produits num\u00e9riques sp\u00e9cifiques qui r\u00e9solvent de vrais probl\u00e8mes de coordination, sans promettre tout \u00e0 la fois.' },
      { title: 'Grandir avec responsabilit\u00e9', body: 'Construire depuis la Su\u00e8de avec une ambition internationale et un respect durable pour les personnes, les march\u00e9s et l\u2019environnement.' },
    ],
    learnMore: 'En savoir plus',
    requestDemo: 'Demander une d\u00e9mo',
    methodEyebrow: 'Le sens du slogan',
    methodHeading: 'Rooted in Nature, Designed for the Future.',
    methodBody:
      'Pour LBYA, le slogan n\u2019est pas d\u00e9coratif. Il explique notre mani\u00e8re de penser : apprendre des syst\u00e8mes vivants, puis concevoir des structures num\u00e9riques r\u00e9silientes, utiles et pr\u00eates pour la suite.',
    method: [
      { title: 'Rooted in Nature', body: 'Nous regardons les liens, l\u2019\u00e9quilibre, l\u2019adaptation et la r\u00e9silience avant de d\u00e9cider ce qu\u2019un syst\u00e8me num\u00e9rique doit faire.' },
      { title: 'Designed for the Future', body: 'Nous construisons pour des secteurs plus connect\u00e9s, plus orient\u00e9s donn\u00e9es et plus d\u00e9pendants de dossiers fiables.' },
      { title: 'Contr\u00f4le humain', body: 'Le but n\u2019est pas la technologie pour elle-m\u00eame. Le but est d\u2019aider les personnes \u00e0 coordonner le travail avec plus de confiance.' },
      { title: 'Ambition globale', body: 'LBYA est ancr\u00e9e dans une forte discipline technique et fa\u00e7onn\u00e9e par une perspective internationale, avec un focus sur les secteurs connect\u00e9s qui ont besoin de plus de contr\u00f4le.' },
    ],
    proofLabel: 'Notre direction',
    proofText: 'LBYA est une entreprise technologique de confiance pour les industries connect\u00e9es : disciplin\u00e9e dans sa fa\u00e7on de construire, internationale dans son ambition et concentr\u00e9e sur des produits qui rendent la coordination complexe plus fiable.',
    closingHeading: 'Rooted in Nature, Designed for the Future.',
    closingBody:
      'L\u2019entreprise passe de services larges \u00e0 des produits cibl\u00e9s, tout en gardant la m\u00eame base : pens\u00e9e syst\u00e8me responsable, ing\u00e9nierie pratique et respect des environnements o\u00f9 la technologie est utilis\u00e9e.',
    closingCta: 'Parler \u00e0 LBYA',
  },
  de: {
    heroEyebrow: '\u00dcber LBYA',
    heroHeading: 'Alles ist verbunden.',
    heroBody:
      'LBYA wurde aus der \u00dcberzeugung gegr\u00fcndet, dass Menschen, Natur, Infrastruktur, Information und M\u00e4rkte Teil eines verbundenen Systems sind. Wir wollen Komplexit\u00e4t klarer, strukturierter und vertrauensw\u00fcrdiger machen.',
    primaryCta: 'Unsere Ziele',
    secondaryCta: 'LBYA kontaktieren',
    systemLabel: 'Rooted in Nature, Designed for the Future.',
    systemTitle: 'In der Natur verwurzelt. F\u00fcr die Zukunft entworfen.',
    systemItems: ['Das ganze System sehen', 'Mit klarem Zweck bauen', 'F\u00fcr langfristiges Vertrauen gestalten'],
    principlesEyebrow: 'Unsere Geschichte',
    principlesHeading: 'Ein Unternehmen, gepr\u00e4gt von Natur, Technologie und praktischer Verantwortung.',
    principlesBody:
      'LBYA begann mit breitem Wissen in Architektur, Ingenieurwesen, BIM/VDC, IT und Marktoperationen. Diese Mischung zeigte uns, dass bessere Werkzeuge nur dann z\u00e4hlen, wenn sie Menschen zu klareren Entscheidungen verhelfen.',
    principles: [
      { title: 'Alles ist verbunden', body: 'Menschen, Informationen, Anlagen und Entscheidungen beeinflussen einander. LBYA gestaltet mit diesem gr\u00f6\u00dferen System im Blick.' },
      { title: 'Die Natur gibt uns ein Modell', body: 'Nat\u00fcrliche Systeme sind widerstandsf\u00e4hig, weil sie verbunden, anpassungsf\u00e4hig und ausgewogen sind. Dieses Denken pr\u00e4gt unseren Umgang mit Technologie.' },
      { title: 'Technologie soll kl\u00e4ren', body: 'Digitale Systeme sollen Verantwortung, Nachweise und n\u00e4chste Schritte sichtbarer machen, nicht eine weitere Schicht der Unsicherheit schaffen.' },
    ],
    productsEyebrow: 'Warum LBYA existiert',
    productsHeading: 'Organisationen helfen, Komplexit\u00e4t mit Klarheit, Struktur und Vertrauen zu bew\u00e4ltigen.',
    productsBody:
      'Unser Ziel ist es, n\u00fctzliche digitale Kontrollplattformen f\u00fcr Branchen zu bauen, in denen Informationen zwischen vielen Menschen, Orten, Dokumenten und Entscheidungen flie\u00dfen.',
    productStatus: {
      mct: 'Fertiges Produkt',
      'nbc': 'Fr\u00fche Entwicklungsphase',
    },
    productBriefs: {
      mct: 'Ein einsatzbereiter Logistik-Control-Tower f\u00fcr Transportanfragen, Transporteurdaten, Dokumentenpr\u00fcfung, Angebotskoordination, Statusverfolgung und Reporting.',
      'nbc': 'Ein BIM-Kontrollprodukt in fr\u00fcher Entwicklung f\u00fcr Modellinformationen, Themenverantwortung, Nachweise und Entscheidungsreife.',
    },
    goals: [
      { title: 'Arbeit sichtbar machen', body: 'Teams einen klareren Blick darauf geben, was passiert, was fehlt und was Aufmerksamkeit braucht.' },
      { title: 'Vertrauen st\u00e4rken', body: 'Wichtige Informationen so strukturiert halten, dass Menschen sie pr\u00fcfen, erkl\u00e4ren und vertreten k\u00f6nnen.' },
      { title: 'Mit Fokus bauen', body: 'Spezifische digitale Produkte schaffen, die reale Koordinationsprobleme l\u00f6sen, statt alles auf einmal zu versprechen.' },
      { title: 'Verantwortungsvoll wachsen', body: 'Aus Schweden heraus mit globalem Blick und langfristigem Respekt f\u00fcr Menschen, M\u00e4rkte und Umwelt bauen.' },
    ],
    learnMore: 'Mehr erfahren',
    requestDemo: 'Demo anfragen',
    methodEyebrow: 'Die Bedeutung des Slogans',
    methodHeading: 'Rooted in Nature, Designed for the Future.',
    methodBody:
      'F\u00fcr LBYA ist der Slogan keine Dekoration. Er beschreibt, wie wir denken: von lebenden Systemen lernen und dann digitale Strukturen entwerfen, die robust, n\u00fctzlich und zukunftsbereit sind.',
    method: [
      { title: 'Rooted in Nature', body: 'Wir betrachten Verbindung, Gleichgewicht, Anpassung und langfristige Widerstandskraft, bevor wir entscheiden, was ein digitales System leisten soll.' },
      { title: 'Designed for the Future', body: 'Wir bauen f\u00fcr Branchen, die datengetriebener, vernetzter und abh\u00e4ngiger von vertrauensw\u00fcrdigen Aufzeichnungen werden.' },
      { title: 'Menschliche Kontrolle', body: 'Das Ziel ist nicht Technologie um ihrer selbst willen. Das Ziel ist, Menschen zu helfen, Arbeit mit mehr Vertrauen zu koordinieren.' },
      { title: 'Globale Ambition', body: 'LBYA ist in starker technischer Disziplin verwurzelt und von einem internationalen Blick gepr\u00e4gt, mit Fokus auf vernetzte Branchen, die bessere Kontrolle brauchen.' },
    ],
    proofLabel: 'Wohin wir gehen',
    proofText: 'LBYA ist ein vertrauensw\u00fcrdiges Technologieunternehmen f\u00fcr vernetzte Branchen: diszipliniert im Aufbau, international im Blick und fokussiert auf Produkte, die komplexe Koordination verl\u00e4sslicher machen.',
    closingHeading: 'Rooted in Nature, Designed for the Future.',
    closingBody:
      'Das Unternehmen entwickelt sich von breiten Dienstleistungen zu fokussierten Produkten und bewahrt dabei dieselbe Grundlage: verantwortungsvolles Systemdenken, praktische Ingenieursarbeit und Respekt vor den Umgebungen, in denen Technologie genutzt wird.',
    closingCta: 'Mit LBYA sprechen',
  },
};

function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function AboutSignalLayer() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="hero-grid-scan absolute inset-y-0 right-0 hidden w-[62%] opacity-35 lg:block"
        style={{
          backgroundImage:
            'linear-gradient(rgba(129, 212, 250, 0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(165, 214, 167, 0.12) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'linear-gradient(90deg, transparent, black 22%, black 88%, transparent)',
        }}
      />
      <svg className="absolute inset-x-0 bottom-0 h-[78%] w-full opacity-80" viewBox="0 0 1440 520" preserveAspectRatio="none">
        <defs>
          <linearGradient id="about-signal" x1="0%" y1="70%" x2="100%" y2="20%">
            <stop offset="0%" stopColor="#A5D6A7" stopOpacity="0.15" />
            <stop offset="44%" stopColor="#A5D6A7" stopOpacity="0.58" />
            <stop offset="76%" stopColor="#81D4FA" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#F5C469" stopOpacity="0.62" />
          </linearGradient>
          <linearGradient id="about-soft" x1="0%" y1="30%" x2="100%" y2="70%">
            <stop offset="0%" stopColor="#A5D6A7" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#81D4FA" stopOpacity="0.42" />
          </linearGradient>
        </defs>
        {[
          'M16 438 C184 344 262 424 420 316 C596 196 712 232 870 286 C1036 342 1192 172 1418 108',
          'M72 224 C246 280 338 136 496 174 C664 214 742 384 930 342 C1096 306 1222 366 1398 282',
          'M156 502 C260 426 322 350 458 352 C626 354 762 470 918 424 C1118 366 1238 454 1424 386',
        ].map((line) => (
          <path
            key={line}
            className="hero-signal-line"
            d={line}
            fill="none"
            stroke="url(#about-signal)"
            strokeLinecap="round"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {[
          'M232 86 H364 V142 H536',
          'M836 78 H1016 V136 H1240',
          'M608 426 H784 V372 H984',
        ].map((line) => (
          <path
            key={line}
            className="hero-future-line hidden md:block"
            d={line}
            fill="none"
            stroke="url(#about-soft)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {[
          { x: 364, y: 142, color: '#A5D6A7' },
          { x: 536, y: 142, color: '#81D4FA' },
          { x: 784, y: 372, color: '#A5D6A7' },
          { x: 1016, y: 136, color: '#81D4FA' },
          { x: 1240, y: 136, color: '#F5C469' },
        ].map((node) => (
          <rect
            key={`${node.x}-${node.y}`}
            className="hero-signal-node"
            x={node.x}
            y={node.y}
            width="9"
            height="9"
            fill="none"
            stroke={node.color}
            strokeWidth="1.6"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    </div>
  );
}

function SystemVisual({ copy }: { copy: AboutPageCopy }) {
  return (
    <div className="relative min-h-[360px] overflow-hidden border border-white/14 bg-white/8 p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-sm">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(165,214,167,0.12),rgba(129,212,250,0.10)_48%,rgba(255,255,255,0)_72%)]" />
      <div
        className="hero-grid-scan absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
        }}
      />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A5D6A7]">{copy.systemLabel}</p>
            <h2 className="mt-4 max-w-sm text-3xl font-light leading-tight text-white md:text-4xl">{copy.systemTitle}</h2>
          </div>
          <span className="relative block h-36 w-36 shrink-0">
            <Image
              src="/logoC.svg"
              alt=""
              fill
              sizes="144px"
              className="object-contain"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </span>
        </div>

        <div className="mt-auto grid gap-3 pt-10">
          {copy.systemItems.map((item, index) => (
            <div key={item} className="grid grid-cols-[auto_1fr] items-center gap-4 border-t border-white/12 pt-3">
              <span className="text-xs font-semibold text-[#81D4FA]">0{index + 1}</span>
              <p className="text-sm font-medium text-white/82">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const activeLocale = asLocale(useLocale());
  const copy = aboutPageCopyByLocale[activeLocale];

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
          <div className="absolute inset-0 -z-20 bg-[#37474F]/78" />
          <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(55,71,79,0.98)_0%,rgba(55,71,79,0.86)_44%,rgba(46,125,50,0.46)_100%)]" />
          <AboutSignalLayer />

          <div
            className="relative z-10 grid gap-10 lg:grid-cols-[0.58fr_0.42fr] lg:items-end"
            style={{
              marginLeft: 'clamp(1.5rem, calc(9.14vw - 0.354rem), 7.875rem)',
              marginRight: 'clamp(1.5rem, calc(11.43vw - 1.286rem), 9rem)',
            }}
          >
            <div className="max-w-4xl">
              <div className="mb-8 flex items-center gap-4">
                <span className="relative block h-14 w-14 shrink-0">
                  <Image
                    src="/logoC.svg"
                    alt=""
                    fill
                    sizes="56px"
                    className="object-contain"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </span>
                <Wordmark className="h-10 w-36 sm:h-12 sm:w-48" priority sizes="192px" />
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#A5D6A7]">
                {copy.heroEyebrow}
              </p>
              <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-[1.02] tracking-tight text-white md:text-6xl lg:text-7xl">
                {copy.heroHeading}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 md:text-lg">
                {copy.heroBody}
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <Link
                  href="#about-goals"
                  className="inline-flex items-center justify-center gap-3 rounded-sm bg-white px-6 py-4 text-sm font-semibold text-[#1F3529] shadow-[0_18px_48px_rgba(0,0,0,0.22)] transition-colors hover:bg-[#A5D6A7]"
                >
                  <span>{copy.primaryCta}</span>
                  <ArrowIcon />
                </Link>
                <Link
                  href={localizePath(activeLocale, '/contact')}
                  className="inline-flex items-center justify-center gap-3 rounded-sm border border-white/28 px-6 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-[#A5D6A7] hover:bg-white/10"
                >
                  <span>{copy.secondaryCta}</span>
                  <ArrowIcon />
                </Link>
              </div>
            </div>

            <div className="hidden lg:block">
              <SystemVisual copy={copy} />
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#F6F8F4] py-16 sm:py-20">
          <div className="absolute inset-x-0 top-0 h-px bg-[#1F3529]/10" aria-hidden="true" />
          <div
            className="relative z-10 grid gap-10 lg:grid-cols-[0.42fr_0.58fr]"
            style={{
              marginLeft: 'clamp(1.5rem, calc(9.14vw - 0.354rem), 7.875rem)',
              marginRight: 'clamp(1.5rem, calc(11.43vw - 1.286rem), 9rem)',
            }}
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2E7D32]">
                {copy.principlesEyebrow}
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-light leading-tight text-[#1F3529] md:text-5xl">
                {copy.principlesHeading}
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#37474F]/72">
                {copy.principlesBody}
              </p>
            </div>

            <div className="grid gap-px overflow-hidden border border-[#1F3529]/10 bg-[#1F3529]/10 md:grid-cols-3">
              {copy.principles.map((point, index) => (
                <article key={point.title} className="bg-white p-6">
                  <span className="mb-8 flex h-10 w-10 items-center justify-center rounded-sm bg-[#2E7D32]/10 text-sm font-semibold text-[#2E7D32]">
                    0{index + 1}
                  </span>
                  <h3 className="text-xl font-semibold text-[#1F3529]">{point.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#37474F]/72">{point.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about-goals" className="about-goals-interactive relative overflow-hidden bg-white py-16 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 z-0 overflow-hidden opacity-70"
            style={{
              left: 'clamp(1.5rem, calc(9.14vw - 0.354rem), 7.875rem)',
              right: 'clamp(1.5rem, calc(11.43vw - 1.286rem), 9rem)',
            }}
          >
            <div className="about-goals-glow absolute inset-0" />
            <div className="about-goals-rings absolute inset-0" />
            <div className="about-goals-sweep absolute inset-0" />
            <div
              className="about-goals-grid absolute inset-y-0 right-0 hidden w-[70%] opacity-25 lg:block"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(129, 212, 250, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(46, 125, 50, 0.10) 1px, transparent 1px)',
                backgroundSize: '46px 46px',
                maskImage: 'linear-gradient(90deg, transparent, black 18%, black 88%, transparent)',
              }}
            />
          </div>
          <div
            className="relative z-10"
            style={{
              marginLeft: 'clamp(1.5rem, calc(9.14vw - 0.354rem), 7.875rem)',
              marginRight: 'clamp(1.5rem, calc(11.43vw - 1.286rem), 9rem)',
            }}
          >
            <div className="grid gap-6 lg:grid-cols-[0.38fr_0.62fr] lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2E7D32]">
                  {copy.productsEyebrow}
                </p>
                <h2 className="mt-4 max-w-3xl text-3xl font-light leading-tight text-[#1F3529] md:text-5xl">
                  {copy.productsHeading}
                </h2>
              </div>
              <p className="max-w-3xl text-base leading-8 text-[#37474F]/72 lg:justify-self-end">
                {copy.productsBody}
              </p>
            </div>

            <div className="mt-10 grid gap-px overflow-hidden border border-[#1F3529]/10 bg-[#1F3529]/10 md:grid-cols-2 lg:grid-cols-4">
              {copy.goals.map((goal, index) => (
                <article key={goal.title} className="group relative min-h-[250px] bg-white p-6 transition-colors hover:bg-[#F6F8F4]">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2E7D32]">
                    0{index + 1}
                  </span>
                  <h3 className="mt-8 text-xl font-semibold leading-tight text-[#1F3529]">{goal.title}</h3>
                  <p className="mt-5 text-sm leading-7 text-[#37474F]/72">{goal.body}</p>
                  <span className="absolute bottom-0 left-0 h-1 w-0 bg-[#2E7D32] transition-all duration-300 group-hover:w-full" aria-hidden="true" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#37474F] py-16 text-white sm:py-20">
          <div
            className="grid gap-10 lg:grid-cols-[0.38fr_0.62fr]"
            style={{
              marginLeft: 'clamp(1.5rem, calc(9.14vw - 0.354rem), 7.875rem)',
              marginRight: 'clamp(1.5rem, calc(11.43vw - 1.286rem), 9rem)',
            }}
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A5D6A7]">
                {copy.methodEyebrow}
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-light leading-tight md:text-5xl">
                {copy.methodHeading}
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/72">
                {copy.methodBody}
              </p>
            </div>

            <div className="grid gap-px overflow-hidden border border-white/12 bg-white/12 md:grid-cols-2">
              {copy.method.map((item, index) => (
                <article key={item.title} className="bg-[#37474F] p-6">
                  <span className="mb-6 flex h-10 w-10 items-center justify-center rounded-sm bg-[#A5D6A7] text-sm font-semibold text-[#1F3529]">
                    {index + 1}
                  </span>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/70">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F6F8F4] py-16 sm:py-20">
          <div
            className="grid gap-8 lg:grid-cols-[0.55fr_0.45fr] lg:items-center"
            style={{
              marginLeft: 'clamp(1.5rem, calc(9.14vw - 0.354rem), 7.875rem)',
              marginRight: 'clamp(1.5rem, calc(11.43vw - 1.286rem), 9rem)',
            }}
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2E7D32]">
                {copy.proofLabel}
              </p>
              <h2 className="mt-4 max-w-4xl text-3xl font-light leading-tight text-[#1F3529] md:text-5xl">
                {copy.closingHeading}
              </h2>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[#37474F]/72">
                {copy.closingBody}
              </p>
            </div>

            <div className="border-l-4 border-[#2E7D32] bg-white p-6 shadow-[0_18px_55px_rgba(31,53,41,0.08)]">
              <p className="text-base leading-8 text-[#37474F]/76">{copy.proofText}</p>
              <Link
                href={localizePath(activeLocale, '/contact')}
                className="mt-7 inline-flex items-center justify-center gap-3 rounded-sm bg-[#1F3529] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2E7D32]"
              >
                <span>{copy.closingCta}</span>
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
