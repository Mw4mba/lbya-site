'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { Language, translations, Translations } from './translations';

export type { Language };

// Map next-intl URL locales to the legacy translation Language keys.
const localeToLanguage: Record<string, Language> = {
  en: 'EN',
  fr: 'FR',
  sv: 'SV',
};

export function localeToLang(locale: string): Language {
  return localeToLanguage[locale] ?? 'EN';
}

interface I18nContextType {
  language: Language;
  t: Translations;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Language is now driven by the URL locale (provided by next-intl), not localStorage.
export function I18nProvider({ children, locale }: { children: ReactNode; locale: string }) {
  const language = localeToLang(locale);
  const value: I18nContextType = { language, t: translations[language] };
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within I18nProvider');
  }
  return context;
}
