import { defineRouting } from 'next-intl/routing';

// URL-based locales. Swedish uses the BCP-47 language code `sv` (not the
// country code `se`), per docs/LBYA_i18n_Evaluation.md.
export const routing = defineRouting({
  locales: ['en', 'sv', 'fr', 'de'],
  defaultLocale: 'en',
});

export type AppLocale = (typeof routing.locales)[number];
