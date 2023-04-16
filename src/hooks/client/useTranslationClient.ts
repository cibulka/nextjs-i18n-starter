'use client';

import i18next, { Namespace } from 'i18next';
import { initReactI18next, useTranslation as useTranslationLib } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

import { I18N_DEFAULT_NS, LOCALES, LOCALE_DEFAULT } from '@/constants/i18n';

import { useLocale } from './useLocale';

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend((loc: string, ns: string) => {
      return import(`../../../localization/${loc}/${ns}.json`);
    }),
  )
  .init({
    supportedLngs: LOCALES,
    fallbackLng: LOCALE_DEFAULT,
    fallbackNS: I18N_DEFAULT_NS,
    defaultNS: I18N_DEFAULT_NS,
  });

export function useTranslationClient(ns: Namespace, locale?: string) {
  const localeCurrent = useLocale();
  const localeUsed = locale || localeCurrent;
  if (i18next.resolvedLanguage !== localeUsed) i18next.changeLanguage(localeUsed);
  return useTranslationLib(ns);
}
