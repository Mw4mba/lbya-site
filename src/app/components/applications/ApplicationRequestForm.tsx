"use client";

import React, { useMemo, useState } from 'react';
import { useLocale } from 'next-intl';
import { asLocale, type Locale } from '@/app/content/locale';
import type { ApplicationSource, ApplicationType } from '@/lib/applications/types';

type FormPreset = {
  title: string;
  subtitle: string;
  applicationType: ApplicationType;
  source: ApplicationSource;
  productCode?: 'MCT' | 'NBC' | 'LBYA_BIM' | 'GENERAL';
  defaultInterestType?: string;
};

type ApiResult = {
  ok?: boolean;
  error?: string;
  confirmation?: {
    title: string;
    body: string;
  };
};

type FormCopy = {
  submissionFailed: string;
  fallbackTitle: string;
  fallbackBody: string;
  applicationTypeLabel: string;
  preferredContactMethodLabel: string;
  priorityLabel: string;
  contactEmail: string;
  contactPhone: string;
  priorityOptions: { low: string; medium: string; high: string; urgent: string };
  sectionTitles: {
    career: string;
    academic: string;
    nbc: string;
    business: string;
  };
  fields: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    companyName: string;
    jobTitle: string;
    country: string;
    city: string;
    website: string;
    productInterest: string;
    companySize: string;
    industrySector: string;
    projectType: string;
    numberOfUsers: string;
    expectedUsage: string;
    billingInterest: string;
    preferredPackage: string;
    timeline: string;
    projectSector: string;
    selectSector: string;
    assetType: string;
    mainChallenge: string;
    currentBimTools: string;
    cdePlatformUsed: string;
    issuePlatformUsed: string;
    interestType: string;
    selectInterest: string;
    university: string;
    studyProgram: string;
    degreeLevel: string;
    expectedThesisPeriod: string;
    supervisorName: string;
    supervisorEmail: string;
    researchInterest: string;
    studentTeamSize: string;
    roleAppliedFor: string;
    expectedAvailability: string;
    linkedInUrl: string;
    portfolioUrl: string;
    locationPreference: string;
    cvUpload: string;
    cvHelp: string;
    coverMessage: string;
    message: string;
    consent: string;
  };
  sectorOptions: {
    realEstate: string;
    infrastructure: string;
    industry: string;
    mixed: string;
    custom: string;
  };
  interestOptions: {
    earlyAccess: string;
    enterpriseIntroduction: string;
    pilotProject: string;
    academicResearch: string;
    thesisCollaboration: string;
    partnership: string;
    generalInformation: string;
  };
  submit: string;
  submitting: string;
};

const applicationTypeOptionsByLocale: Record<Locale, Array<{ value: ApplicationType; label: string }>> = {
  en: [
    { value: 'mct_subscription_interest', label: 'MCT subscription interest' },
    { value: 'mct_demo_request', label: 'Product demo request' },
    { value: 'nbc_early_access', label: 'NBC early access' },
    { value: 'nbc_enterprise_introduction', label: 'NBC enterprise introduction' },
    { value: 'nbc_pilot_project', label: 'Pilot project request' },
    { value: 'nbc_academic_pilot', label: 'NBC academic pilot' },
    { value: 'nbc_thesis_research', label: 'NBC thesis/research collaboration' },
    { value: 'partnership_request', label: 'Partnership request' },
    { value: 'career_application', label: 'Career application' },
    { value: 'general_business_request', label: 'General business request' },
  ],
  sv: [
    { value: 'mct_subscription_interest', label: 'MCT prenumerationsintresse' },
    { value: 'mct_demo_request', label: 'Produktdemo forfragan' },
    { value: 'nbc_early_access', label: 'NBC tidig atkomst' },
    { value: 'nbc_enterprise_introduction', label: 'NBC enterprise-introduktion' },
    { value: 'nbc_pilot_project', label: 'Pilotprojekt forfragan' },
    { value: 'nbc_academic_pilot', label: 'NBC akademisk pilot' },
    { value: 'nbc_thesis_research', label: 'NBC examensarbete/forskning' },
    { value: 'partnership_request', label: 'Partnerskapsforfragan' },
    { value: 'career_application', label: 'Karriaransokan' },
    { value: 'general_business_request', label: 'Allman affarsforfragan' },
  ],
  fr: [
    { value: 'mct_subscription_interest', label: 'Interet abonnement MCT' },
    { value: 'mct_demo_request', label: 'Demande de demonstration produit' },
    { value: 'nbc_early_access', label: 'Acces anticipe NBC' },
    { value: 'nbc_enterprise_introduction', label: 'Introduction enterprise NBC' },
    { value: 'nbc_pilot_project', label: 'Demande de projet pilote' },
    { value: 'nbc_academic_pilot', label: 'Pilote academique NBC' },
    { value: 'nbc_thesis_research', label: 'Collaboration these/recherche NBC' },
    { value: 'partnership_request', label: 'Demande de partenariat' },
    { value: 'career_application', label: 'Candidature carriere' },
    { value: 'general_business_request', label: 'Demande commerciale generale' },
  ],
  de: [
    { value: 'mct_subscription_interest', label: 'MCT Abonnementinteresse' },
    { value: 'mct_demo_request', label: 'Produktdemo Anfrage' },
    { value: 'nbc_early_access', label: 'NBC Fruehzugang' },
    { value: 'nbc_enterprise_introduction', label: 'NBC Enterprise-Einfuehrung' },
    { value: 'nbc_pilot_project', label: 'Pilotprojekt Anfrage' },
    { value: 'nbc_academic_pilot', label: 'NBC Akademischer Pilot' },
    { value: 'nbc_thesis_research', label: 'NBC Thesis/Forschungskooperation' },
    { value: 'partnership_request', label: 'Partnerschaftsanfrage' },
    { value: 'career_application', label: 'Karrierebewerbung' },
    { value: 'general_business_request', label: 'Allgemeine Geschaeftsanfrage' },
  ],
};

const formCopyByLocale: Record<Locale, FormCopy> = {
  en: {
    submissionFailed: 'Submission failed',
    fallbackTitle: 'Thank you. Your request has been received by LBYA AB.',
    fallbackBody:
      'We will review your information and contact you if the request matches the current product, pilot, academic, or enterprise discussion stage.',
    applicationTypeLabel: 'Application type',
    preferredContactMethodLabel: 'Preferred contact method',
    priorityLabel: 'Priority',
    contactEmail: 'Email',
    contactPhone: 'Phone',
    priorityOptions: { low: 'Low', medium: 'Medium', high: 'High', urgent: 'Urgent' },
    sectionTitles: {
      career: 'Career application details',
      academic: 'Academic pilot details',
      nbc: 'NBC project details',
      business: 'Business request details',
    },
    fields: {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      phone: 'Phone number',
      companyName: 'Company / Organization',
      jobTitle: 'Job title / Role',
      country: 'Country',
      city: 'City',
      website: 'Website',
      productInterest: 'Product interest',
      companySize: 'Company size',
      industrySector: 'Industry / sector',
      projectType: 'Project type',
      numberOfUsers: 'Number of users / seats',
      expectedUsage: 'Expected usage',
      billingInterest: 'Billing interest',
      preferredPackage: 'Preferred package',
      timeline: 'Timeline',
      projectSector: 'Project sector',
      selectSector: 'Select sector',
      assetType: 'Asset type',
      mainChallenge: 'Main challenge',
      currentBimTools: 'Current BIM tools',
      cdePlatformUsed: 'CDE / document platform used',
      issuePlatformUsed: 'Issue platform used',
      interestType: 'Interest type',
      selectInterest: 'Select interest',
      university: 'University',
      studyProgram: 'Study program',
      degreeLevel: 'Degree level',
      expectedThesisPeriod: 'Expected thesis/project period',
      supervisorName: 'Supervisor name',
      supervisorEmail: 'Supervisor email',
      researchInterest: 'Research interest',
      studentTeamSize: 'Student team size',
      roleAppliedFor: 'Role applied for',
      expectedAvailability: 'Expected availability',
      linkedInUrl: 'LinkedIn profile',
      portfolioUrl: 'Portfolio link',
      locationPreference: 'Location preference',
      cvUpload: 'CV upload',
      cvHelp: 'Allowed: PDF, DOC, DOCX. File handling is restricted and validated server-side.',
      coverMessage: 'Cover message',
      message: 'Message',
      consent:
        'I agree that LBYA AB may process the information provided in this form to review and respond to my request.',
    },
    sectorOptions: {
      realEstate: 'Real-estate',
      infrastructure: 'Infrastructure',
      industry: 'Industry',
      mixed: 'Mixed / Multi-sector',
      custom: 'Custom',
    },
    interestOptions: {
      earlyAccess: 'Early access',
      enterpriseIntroduction: 'Enterprise introduction',
      pilotProject: 'Pilot project',
      academicResearch: 'Academic research',
      thesisCollaboration: 'Thesis collaboration',
      partnership: 'Partnership',
      generalInformation: 'General information',
    },
    submit: 'Submit request',
    submitting: 'Submitting...',
  },
  sv: {
    submissionFailed: 'Skickning misslyckades',
    fallbackTitle: 'Tack. Din forfragan har mottagits av LBYA AB.',
    fallbackBody:
      'Vi granskar din information och kontaktar dig om forfragan matchar aktuell produkt-, pilot-, akademisk eller enterprise-dialog.',
    applicationTypeLabel: 'Ansokningstyp',
    preferredContactMethodLabel: 'Foredragen kontaktmetod',
    priorityLabel: 'Prioritet',
    contactEmail: 'E-post',
    contactPhone: 'Telefon',
    priorityOptions: { low: 'Lag', medium: 'Medel', high: 'Hog', urgent: 'Akut' },
    sectionTitles: {
      career: 'Detaljer for karriaransokan',
      academic: 'Detaljer for akademisk pilot',
      nbc: 'Detaljer for NBC-projekt',
      business: 'Detaljer for affarsforfragan',
    },
    fields: {
      firstName: 'Fornamn',
      lastName: 'Efternamn',
      email: 'E-post',
      phone: 'Telefonnummer',
      companyName: 'Foretag / Organisation',
      jobTitle: 'Jobbtitel / Roll',
      country: 'Land',
      city: 'Stad',
      website: 'Webbplats',
      productInterest: 'Produktintresse',
      companySize: 'Foretagsstorlek',
      industrySector: 'Bransch / sektor',
      projectType: 'Projekttyp',
      numberOfUsers: 'Antal anvandare / platser',
      expectedUsage: 'Forvantad anvandning',
      billingInterest: 'Faktureringsintresse',
      preferredPackage: 'Foredraget paket',
      timeline: 'Tidslinje',
      projectSector: 'Projektsektor',
      selectSector: 'Valj sektor',
      assetType: 'Tillgangstyp',
      mainChallenge: 'Huvudutmaning',
      currentBimTools: 'Nuvarande BIM-verktyg',
      cdePlatformUsed: 'Anvand CDE-/dokumentplattform',
      issuePlatformUsed: 'Anvand issue-plattform',
      interestType: 'Intressetyp',
      selectInterest: 'Valj intresse',
      university: 'Universitet',
      studyProgram: 'Studieprogram',
      degreeLevel: 'Examensniva',
      expectedThesisPeriod: 'Forvantad examensperiod/projektperiod',
      supervisorName: 'Handledarens namn',
      supervisorEmail: 'Handledarens e-post',
      researchInterest: 'Forskningsintresse',
      studentTeamSize: 'Storlek pa studentteam',
      roleAppliedFor: 'Sokt roll',
      expectedAvailability: 'Forvantad tillganglighet',
      linkedInUrl: 'LinkedIn-profil',
      portfolioUrl: 'Portfolio-lank',
      locationPreference: 'Platspreferens',
      cvUpload: 'Ladda upp CV',
      cvHelp: 'Tillatet: PDF, DOC, DOCX. Filhantering ar begransad och valideras server-side.',
      coverMessage: 'Personligt meddelande',
      message: 'Meddelande',
      consent:
        'Jag samtycker till att LBYA AB far behandla informationen i detta formular for att granska och besvara min forfragan.',
    },
    sectorOptions: {
      realEstate: 'Fastighet',
      infrastructure: 'Infrastruktur',
      industry: 'Industri',
      mixed: 'Blandad / Flersektor',
      custom: 'Anpassad',
    },
    interestOptions: {
      earlyAccess: 'Tidig atkomst',
      enterpriseIntroduction: 'Enterprise-introduktion',
      pilotProject: 'Pilotprojekt',
      academicResearch: 'Akademisk forskning',
      thesisCollaboration: 'Examenssamarbete',
      partnership: 'Partnerskap',
      generalInformation: 'Allman information',
    },
    submit: 'Skicka forfragan',
    submitting: 'Skickar...',
  },
  fr: {
    submissionFailed: 'Envoi echoue',
    fallbackTitle: 'Merci. Votre demande a ete recue par LBYA AB.',
    fallbackBody:
      'Nous examinerons vos informations et vous contacterons si la demande correspond a la phase actuelle produit, pilote, academique ou enterprise.',
    applicationTypeLabel: 'Type de demande',
    preferredContactMethodLabel: 'Methode de contact preferee',
    priorityLabel: 'Priorite',
    contactEmail: 'E-mail',
    contactPhone: 'Telephone',
    priorityOptions: { low: 'Faible', medium: 'Moyenne', high: 'Elevee', urgent: 'Urgente' },
    sectionTitles: {
      career: 'Details de candidature',
      academic: 'Details du pilote academique',
      nbc: 'Details du projet NBC',
      business: 'Details de demande commerciale',
    },
    fields: {
      firstName: 'Prenom',
      lastName: 'Nom',
      email: 'E-mail',
      phone: 'Numero de telephone',
      companyName: 'Entreprise / Organisation',
      jobTitle: 'Fonction / Role',
      country: 'Pays',
      city: 'Ville',
      website: 'Site web',
      productInterest: 'Interet produit',
      companySize: 'Taille de l entreprise',
      industrySector: 'Industrie / secteur',
      projectType: 'Type de projet',
      numberOfUsers: 'Nombre d utilisateurs / sieges',
      expectedUsage: 'Usage attendu',
      billingInterest: 'Interet de facturation',
      preferredPackage: 'Forfait prefere',
      timeline: 'Calendrier',
      projectSector: 'Secteur du projet',
      selectSector: 'Choisir un secteur',
      assetType: 'Type d actif',
      mainChallenge: 'Defi principal',
      currentBimTools: 'Outils BIM actuels',
      cdePlatformUsed: 'Plateforme CDE / documentaire utilisee',
      issuePlatformUsed: 'Plateforme de suivi des problemes',
      interestType: 'Type d interet',
      selectInterest: 'Choisir un interet',
      university: 'Universite',
      studyProgram: 'Programme d etudes',
      degreeLevel: 'Niveau de diplome',
      expectedThesisPeriod: 'Periode prevue pour these/projet',
      supervisorName: 'Nom du superviseur',
      supervisorEmail: 'E-mail du superviseur',
      researchInterest: 'Interet de recherche',
      studentTeamSize: 'Taille de l equipe etudiante',
      roleAppliedFor: 'Poste vise',
      expectedAvailability: 'Disponibilite souhaitee',
      linkedInUrl: 'Profil LinkedIn',
      portfolioUrl: 'Lien portfolio',
      locationPreference: 'Preference de localisation',
      cvUpload: 'Televersement CV',
      cvHelp: 'Autorise: PDF, DOC, DOCX. Le traitement de fichier est limite et valide cote serveur.',
      coverMessage: 'Message de motivation',
      message: 'Message',
      consent:
        'J accepte que LBYA AB traite les informations fournies dans ce formulaire pour examiner et repondre a ma demande.',
    },
    sectorOptions: {
      realEstate: 'Immobilier',
      infrastructure: 'Infrastructure',
      industry: 'Industrie',
      mixed: 'Mixte / Multi-secteur',
      custom: 'Personnalise',
    },
    interestOptions: {
      earlyAccess: 'Acces anticipe',
      enterpriseIntroduction: 'Introduction enterprise',
      pilotProject: 'Projet pilote',
      academicResearch: 'Recherche academique',
      thesisCollaboration: 'Collaboration these',
      partnership: 'Partenariat',
      generalInformation: 'Information generale',
    },
    submit: 'Soumettre la demande',
    submitting: 'Envoi en cours...',
  },
  de: {
    submissionFailed: 'Senden fehlgeschlagen',
    fallbackTitle: 'Vielen Dank. Ihre Anfrage wurde von LBYA AB empfangen.',
    fallbackBody:
      'Wir pruefen Ihre Angaben und kontaktieren Sie, wenn die Anfrage zur aktuellen Produkt-, Pilot-, akademischen oder Enterprise-Phase passt.',
    applicationTypeLabel: 'Anfragetyp',
    preferredContactMethodLabel: 'Bevorzugte Kontaktmethode',
    priorityLabel: 'Prioritaet',
    contactEmail: 'E-Mail',
    contactPhone: 'Telefon',
    priorityOptions: { low: 'Niedrig', medium: 'Mittel', high: 'Hoch', urgent: 'Dringend' },
    sectionTitles: {
      career: 'Details zur Bewerbung',
      academic: 'Details zum akademischen Piloten',
      nbc: 'Details zum NBC-Projekt',
      business: 'Details zur Geschaeftsanfrage',
    },
    fields: {
      firstName: 'Vorname',
      lastName: 'Nachname',
      email: 'E-Mail',
      phone: 'Telefonnummer',
      companyName: 'Unternehmen / Organisation',
      jobTitle: 'Position / Rolle',
      country: 'Land',
      city: 'Stadt',
      website: 'Webseite',
      productInterest: 'Produktinteresse',
      companySize: 'Unternehmensgroesse',
      industrySector: 'Branche / Sektor',
      projectType: 'Projekttyp',
      numberOfUsers: 'Anzahl Nutzer / Sitze',
      expectedUsage: 'Erwartete Nutzung',
      billingInterest: 'Abrechnungsinteresse',
      preferredPackage: 'Bevorzugtes Paket',
      timeline: 'Zeitplan',
      projectSector: 'Projektsektor',
      selectSector: 'Sektor auswaehlen',
      assetType: 'Asset-Typ',
      mainChallenge: 'Hauptproblem',
      currentBimTools: 'Aktuelle BIM-Tools',
      cdePlatformUsed: 'Verwendete CDE-/Dokumentplattform',
      issuePlatformUsed: 'Verwendete Issue-Plattform',
      interestType: 'Interesstyp',
      selectInterest: 'Interesse auswaehlen',
      university: 'Universitaet',
      studyProgram: 'Studiengang',
      degreeLevel: 'Abschlussniveau',
      expectedThesisPeriod: 'Erwarteter Thesis-/Projektzeitraum',
      supervisorName: 'Name der Betreuungsperson',
      supervisorEmail: 'E-Mail der Betreuungsperson',
      researchInterest: 'Forschungsinteresse',
      studentTeamSize: 'Groesse des Studierendenteams',
      roleAppliedFor: 'Beworbene Rolle',
      expectedAvailability: 'Erwartete Verfuegbarkeit',
      linkedInUrl: 'LinkedIn-Profil',
      portfolioUrl: 'Portfolio-Link',
      locationPreference: 'Standortpraeferenz',
      cvUpload: 'Lebenslauf hochladen',
      cvHelp: 'Zulaessig: PDF, DOC, DOCX. Datei-Handling ist eingeschraenkt und serverseitig validiert.',
      coverMessage: 'Anschreiben',
      message: 'Nachricht',
      consent:
        'Ich stimme zu, dass LBYA AB die in diesem Formular angegebenen Informationen verarbeiten darf, um meine Anfrage zu pruefen und zu beantworten.',
    },
    sectorOptions: {
      realEstate: 'Immobilien',
      infrastructure: 'Infrastruktur',
      industry: 'Industrie',
      mixed: 'Gemischt / Multi-Sektor',
      custom: 'Benutzerdefiniert',
    },
    interestOptions: {
      earlyAccess: 'Fruehzugang',
      enterpriseIntroduction: 'Enterprise-Einfuehrung',
      pilotProject: 'Pilotprojekt',
      academicResearch: 'Akademische Forschung',
      thesisCollaboration: 'Thesis-Kooperation',
      partnership: 'Partnerschaft',
      generalInformation: 'Allgemeine Information',
    },
    submit: 'Anfrage senden',
    submitting: 'Wird gesendet...',
  },
};

export default function ApplicationRequestForm({ preset }: { preset: FormPreset }) {
  const activeLocale = asLocale(useLocale());
  const copy = formCopyByLocale[activeLocale];
  const applicationTypeOptions = applicationTypeOptionsByLocale[activeLocale];

  const [applicationType, setApplicationType] = useState<ApplicationType>(preset.applicationType);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{ title: string; body: string } | null>(null);
  const [cvFileName, setCvFileName] = useState('');

  const showBusiness =
    applicationType !== 'career_application' &&
    applicationType !== 'nbc_academic_pilot' &&
    applicationType !== 'nbc_thesis_research';
  const showNbc = applicationType.startsWith('nbc_');
  const showAcademic = applicationType === 'nbc_academic_pilot' || applicationType === 'nbc_thesis_research';
  const showCareer = applicationType === 'career_application';

  const formSectionTitle = useMemo(() => {
    if (showCareer) return copy.sectionTitles.career;
    if (showAcademic) return copy.sectionTitles.academic;
    if (showNbc) return copy.sectionTitles.nbc;
    return copy.sectionTitles.business;
  }, [copy.sectionTitles, showAcademic, showCareer, showNbc]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setConfirmation(null);

    const data = new FormData(event.currentTarget);
    const payload: Record<string, unknown> = {
      applicationType,
      source: preset.source,
      productCode: preset.productCode ?? 'GENERAL',
      status: 'new',
      priority: data.get('priority') || 'medium',
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      phone: data.get('phone'),
      companyName: data.get('companyName'),
      organizationName: data.get('organizationName'),
      jobTitle: data.get('jobTitle'),
      country: data.get('country'),
      city: data.get('city'),
      website: data.get('website'),
      message: data.get('message'),
      preferredContactMethod: data.get('preferredContactMethod'),
      productInterest: data.get('productInterest'),
      companySize: data.get('companySize'),
      industrySector: data.get('industrySector'),
      projectType: data.get('projectType'),
      numberOfUsers: data.get('numberOfUsers'),
      expectedUsage: data.get('expectedUsage'),
      billingInterest: data.get('billingInterest'),
      preferredPackage: data.get('preferredPackage'),
      expectedTimeline: data.get('expectedTimeline'),
      projectSector: data.get('projectSector'),
      assetType: data.get('assetType'),
      mainChallenge: data.get('mainChallenge'),
      cdePlatformUsed: data.get('cdePlatformUsed'),
      issuePlatformUsed: data.get('issuePlatformUsed'),
      interestType: data.get('interestType'),
      university: data.get('university'),
      studyProgram: data.get('studyProgram'),
      degreeLevel: data.get('degreeLevel'),
      expectedThesisPeriod: data.get('expectedThesisPeriod'),
      supervisorName: data.get('supervisorName'),
      supervisorEmail: data.get('supervisorEmail'),
      researchInterest: data.get('researchInterest'),
      studentTeamSize: data.get('studentTeamSize'),
      roleAppliedFor: data.get('roleAppliedFor'),
      linkedInUrl: data.get('linkedInUrl'),
      portfolioUrl: data.get('portfolioUrl'),
      cvFileId: data.get('cvFileId') || cvFileName,
      coverMessage: data.get('coverMessage'),
      expectedAvailability: data.get('expectedAvailability'),
      locationPreference: data.get('locationPreference'),
      tagsJson: [],
      currentToolsJson: {
        bimTools: data.get('currentBimTools'),
      },
      consentAccepted: data.get('consentAccepted') === 'on',
      websiteField: data.get('websiteField'),
    };

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => ({}))) as ApiResult;
      if (!response.ok || !result.ok) {
        throw new Error(result.error || copy.submissionFailed);
      }

      setConfirmation(
        result.confirmation || {
          title: copy.fallbackTitle,
          body: copy.fallbackBody,
        }
      );
      (event.currentTarget as HTMLFormElement).reset();
      setCvFileName('');
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : copy.submissionFailed);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="border border-[#1F3529]/12 bg-white p-6 shadow-[0_14px_34px_rgba(38,66,53,0.08)] sm:p-8">
      <h1 className="text-3xl font-light text-[#1F3529] sm:text-4xl">{preset.title}</h1>
      <p className="mt-4 max-w-3xl text-base leading-8 text-[#37474F]/80">{preset.subtitle}</p>

      {confirmation && (
        <div className="mt-6 border-l-4 border-[#2E7D32] bg-[#F1F6F2] p-4">
          <p className="font-semibold text-[#1F3529]">{confirmation.title}</p>
          <p className="mt-2 text-sm leading-7 text-[#37474F]/80">{confirmation.body}</p>
        </div>
      )}

      {error && (
        <div className="mt-6 border-l-4 border-[#B91C1C] bg-[#FEF2F2] p-4">
          <p className="font-semibold text-[#991B1B]">{copy.submissionFailed}</p>
          <p className="mt-2 text-sm leading-7 text-[#7F1D1D]">{error}</p>
        </div>
      )}

      <form className="mt-8 grid gap-5" onSubmit={onSubmit}>
        <input type="text" name="websiteField" autoComplete="off" tabIndex={-1} className="hidden" />

        <div className="grid gap-5 md:grid-cols-3">
          <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">
            {copy.applicationTypeLabel}
            <select
              value={applicationType}
              onChange={(event) => setApplicationType(event.target.value as ApplicationType)}
              className="w-full border border-[#1F3529]/18 bg-white px-4 py-3 text-sm font-normal outline-none"
              name="applicationType"
            >
              {applicationTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">
            {copy.preferredContactMethodLabel}
            <select name="preferredContactMethod" className="w-full border border-[#1F3529]/18 bg-white px-4 py-3 text-sm font-normal outline-none">
              <option value="email">{copy.contactEmail}</option>
              <option value="phone">{copy.contactPhone}</option>
            </select>
          </label>

          <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">
            {copy.priorityLabel}
            <select
              name="priority"
              defaultValue="medium"
              className="w-full border border-[#1F3529]/18 bg-white px-4 py-3 text-sm font-normal outline-none"
            >
              <option value="low">{copy.priorityOptions.low}</option>
              <option value="medium">{copy.priorityOptions.medium}</option>
              <option value="high">{copy.priorityOptions.high}</option>
              <option value="urgent">{copy.priorityOptions.urgent}</option>
            </select>
          </label>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">{copy.fields.firstName}<input name="firstName" required className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
          <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">{copy.fields.lastName}<input name="lastName" required className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
          <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">{copy.fields.email}<input name="email" type="email" required className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
          <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">{copy.fields.phone}<input name="phone" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
          <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">{copy.fields.companyName}<input name="companyName" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
          <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">{copy.fields.jobTitle}<input name="jobTitle" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
          <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">{copy.fields.country}<input name="country" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
          <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">{copy.fields.city}<input name="city" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
          <label className="grid gap-2 text-sm font-semibold text-[#1F3529] md:col-span-2">{copy.fields.website}<input name="website" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
        </div>

        <div className="mt-2 border-t border-[#1F3529]/10 pt-4">
          <h2 className="text-xl font-light text-[#1F3529]">{formSectionTitle}</h2>
        </div>

        {showBusiness && (
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">{copy.fields.productInterest}<input name="productInterest" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
            <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">{copy.fields.companySize}<input name="companySize" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
            <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">{copy.fields.industrySector}<input name="industrySector" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
            <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">{copy.fields.projectType}<input name="projectType" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
            <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">{copy.fields.numberOfUsers}<input name="numberOfUsers" type="number" min={1} className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
            <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">{copy.fields.expectedUsage}<input name="expectedUsage" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
            <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">{copy.fields.billingInterest}<input name="billingInterest" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
            <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">{copy.fields.preferredPackage}<input name="preferredPackage" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
            <label className="grid gap-2 text-sm font-semibold text-[#1F3529] md:col-span-2">{copy.fields.timeline}<input name="expectedTimeline" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
          </div>
        )}

        {showNbc && (
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">
              {copy.fields.projectSector}
              <select name="projectSector" className="w-full border border-[#1F3529]/18 bg-white px-4 py-3 text-sm font-normal outline-none">
                <option value="">{copy.fields.selectSector}</option>
                <option value="real_estate">{copy.sectorOptions.realEstate}</option>
                <option value="infrastructure">{copy.sectorOptions.infrastructure}</option>
                <option value="industry">{copy.sectorOptions.industry}</option>
                <option value="mixed_multi_sector">{copy.sectorOptions.mixed}</option>
                <option value="custom">{copy.sectorOptions.custom}</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">{copy.fields.assetType}<input name="assetType" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
            <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">{copy.fields.mainChallenge}<input name="mainChallenge" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
            <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">{copy.fields.currentBimTools}<input name="currentBimTools" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
            <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">{copy.fields.cdePlatformUsed}<input name="cdePlatformUsed" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
            <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">{copy.fields.issuePlatformUsed}<input name="issuePlatformUsed" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
            <label className="grid gap-2 text-sm font-semibold text-[#1F3529] md:col-span-2">
              {copy.fields.interestType}
              <select name="interestType" defaultValue={preset.defaultInterestType || ''} className="w-full border border-[#1F3529]/18 bg-white px-4 py-3 text-sm font-normal outline-none">
                <option value="">{copy.fields.selectInterest}</option>
                <option value="Early access">{copy.interestOptions.earlyAccess}</option>
                <option value="Enterprise introduction">{copy.interestOptions.enterpriseIntroduction}</option>
                <option value="Pilot project">{copy.interestOptions.pilotProject}</option>
                <option value="Academic research">{copy.interestOptions.academicResearch}</option>
                <option value="Thesis collaboration">{copy.interestOptions.thesisCollaboration}</option>
                <option value="Partnership">{copy.interestOptions.partnership}</option>
                <option value="General information">{copy.interestOptions.generalInformation}</option>
              </select>
            </label>
          </div>
        )}

        {showAcademic && (
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">{copy.fields.university}<input name="university" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
            <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">{copy.fields.studyProgram}<input name="studyProgram" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
            <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">{copy.fields.degreeLevel}<input name="degreeLevel" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
            <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">{copy.fields.expectedThesisPeriod}<input name="expectedThesisPeriod" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
            <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">{copy.fields.supervisorName}<input name="supervisorName" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
            <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">{copy.fields.supervisorEmail}<input name="supervisorEmail" type="email" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
            <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">{copy.fields.researchInterest}<input name="researchInterest" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
            <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">{copy.fields.studentTeamSize}<input name="studentTeamSize" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
          </div>
        )}

        {showCareer && (
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">{copy.fields.roleAppliedFor}<input name="roleAppliedFor" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
            <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">{copy.fields.expectedAvailability}<input name="expectedAvailability" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
            <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">{copy.fields.linkedInUrl}<input name="linkedInUrl" type="url" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
            <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">{copy.fields.portfolioUrl}<input name="portfolioUrl" type="url" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
            <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">{copy.fields.locationPreference}<input name="locationPreference" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
            <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">
              {copy.fields.cvUpload}
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(event) => setCvFileName(event.target.files?.[0]?.name || '')}
                className="w-full border border-[#1F3529]/18 px-4 py-2.5 text-sm font-normal outline-none"
              />
              <input type="hidden" name="cvFileId" value={cvFileName} />
              <span className="text-xs font-normal text-[#37474F]/70">{copy.fields.cvHelp}</span>
            </label>
            <label className="grid gap-2 text-sm font-semibold text-[#1F3529] md:col-span-2">{copy.fields.coverMessage}<textarea name="coverMessage" rows={4} className="w-full resize-none border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" /></label>
          </div>
        )}

        <label className="grid gap-2 text-sm font-semibold text-[#1F3529]">
          {copy.fields.message}
          <textarea name="message" required rows={5} className="w-full resize-none border border-[#1F3529]/18 px-4 py-3 text-sm font-normal outline-none" />
        </label>

        <label className="flex items-start gap-3 text-sm leading-7 text-[#37474F]/80">
          <input type="checkbox" name="consentAccepted" required className="mt-1 h-4 w-4 accent-[#2E7D32]" />
          <span>{copy.fields.consent}</span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-sm bg-[#1F3529] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#2E7D32] disabled:opacity-60 sm:w-fit"
        >
          {isSubmitting ? copy.submitting : copy.submit}
        </button>
      </form>
    </section>
  );
}
