import { LOCALES } from '@/constants/i18n';

export function getLocalizedUrl(href: string, locale: string) {
  let result = href;
  result = result.replace(/^\/|\/$/g, '');
  LOCALES.forEach((locale) => {
    if (result.startsWith(locale)) result = result.replace(locale, '');
  });
  result = result.replace(/^\/|\/$/g, '');
  result = `/${locale}/${result}`;
  return result;
}
