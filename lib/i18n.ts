// i18n helper functions
// URL-driven locale system (replaces localStorage-based LanguageContext)

export type Locale = 'en' | 'ja' | 'ar' | 'ru' | 'mn';

export const LOCALES: Locale[] = ['en', 'ja', 'ar', 'ru', 'mn'];

export const DEFAULT_LOCALE: Locale = 'en';

export const RTL_LOCALES: Locale[] = ['ar'];

export function isRtl(locale: Locale): boolean {
  return RTL_LOCALES.includes(locale);
}

export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}

/**
 * Generate a localized path from a locale and a pathname.
 * English uses root paths (/blog), other locales use prefixed paths (/ja/blog).
 */
export function localePath(locale: Locale, pathname: string): string {
  if (locale === DEFAULT_LOCALE) {
    return pathname;
  }
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `/${locale}${normalized}`;
}

/**
 * Extract locale from a pathname.
 * Returns DEFAULT_LOCALE if no locale prefix is found.
 */
export function getLocaleFromPathname(pathname: string): Locale {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length > 0 && isValidLocale(parts[0])) {
    return parts[0] as Locale;
  }
  return DEFAULT_LOCALE;
}

/**
 * Remove locale prefix from a pathname.
 */
export function stripLocalePrefix(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length > 0 && isValidLocale(parts[0])) {
    return '/' + parts.slice(1).join('/');
  }
  return pathname;
}
