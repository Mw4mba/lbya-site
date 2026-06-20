// Shared locale type for the content layer. Mirrors src/i18n/routing.ts.
export type Locale = 'en' | 'sv' | 'fr' | 'de';

const ACTIVE_LOCALES = ['en', 'sv', 'fr'] as const;

export function asLocale(value: string): Locale {
  return ACTIVE_LOCALES.includes(value as (typeof ACTIVE_LOCALES)[number])
    ? (value as Locale)
    : 'en';
}
