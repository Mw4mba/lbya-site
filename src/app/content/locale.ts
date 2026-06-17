// Shared locale type for the content layer. Mirrors src/i18n/routing.ts.
export type Locale = 'en' | 'sv' | 'fr' | 'de';

export function asLocale(value: string): Locale {
  return (['en', 'sv', 'fr', 'de'] as const).includes(value as Locale)
    ? (value as Locale)
    : 'en';
}
