import { asLocale, type Locale } from './locale';

const LOCALE_PREFIXES = ['/en', '/sv', '/fr', '/de'];

export function localizePath(locale: string | Locale, href: string) {
  if (
    !href ||
    href.startsWith('#') ||
    href.startsWith('//') ||
    /^[a-z][a-z0-9+.-]*:/i.test(href)
  ) {
    return href;
  }

  if (!href.startsWith('/')) return href;

  if (LOCALE_PREFIXES.some((prefix) => href === prefix || href.startsWith(`${prefix}/`) || href.startsWith(`${prefix}#`))) {
    return href;
  }

  const activeLocale = asLocale(locale);
  return href === '/' ? `/${activeLocale}` : `/${activeLocale}${href}`;
}
