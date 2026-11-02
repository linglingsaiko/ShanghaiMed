import { isValidLocale, localePath, type Locale } from './i18n'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://shanghaimedhealth.com'
export const PUBLIC_LOCALES: Locale[] = ['en', 'ja', 'ar', 'ru', 'mn', 'ms', 'id']

export const OG_LOCALES: Record<Locale, string> = {
  en: 'en_US',
  ja: 'ja_JP',
  ar: 'ar_SA',
  ru: 'ru_RU',
  mn: 'mn_MN',
  ms: 'ms_MY',
  id: 'id_ID',
}

export function resolvePublicLocale(lang?: string): Locale {
  return lang && isValidLocale(lang) ? lang : 'en'
}

export function localizedUrl(lang: Locale, pathname: string): string {
  if (pathname === '/' && lang !== 'en') return `${SITE_URL}/${lang}`
  return `${SITE_URL}${localePath(lang, pathname)}`
}

export function languageAlternates(
  pathname: string,
  locales: Locale[] = PUBLIC_LOCALES,
): Record<string, string> {
  const languages: Record<string, string> = {}
  locales.forEach(lang => {
    languages[lang] = localizedUrl(lang, pathname)
  })
  languages['x-default'] = localizedUrl('en', pathname)
  return languages
}
