'use client';
import { usePathname } from 'next/navigation';

import { LOCALES, LOCALE_DEFAULT } from '@/constants/i18n';

export function useLocale() {
  const locale = useLocaleStrict();
  return locale || LOCALE_DEFAULT;
}

export function useLocaleStrict() {
  const pathname = usePathname();
  const locale = pathname?.split('/').filter(Boolean)[0];
  return locale && ([...LOCALES] as string[]).includes(locale) ? locale : null;
}

export function useIsActivePath() {
  function normalizePathname(p: string, segments: number) {
    let result = p;
    result = result.replace(/^\/+/, '');

    LOCALES.forEach((locale) => {
      const regex = new RegExp(`^${locale}`, '');
      result = result.replace(regex, '');
    });

    result = result.split('/').filter(Boolean).slice(0, segments).join('/');
    return result;
  }

  const pathname = usePathname();

  return function isActivePath(path: string, segments = 1) {
    return pathname && normalizePathname(pathname, segments) === normalizePathname(path, segments);
  };
}
