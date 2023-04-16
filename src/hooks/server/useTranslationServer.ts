import { createInstance, Namespace } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';

import { I18N_DEFAULT_NS, LOCALES, LOCALE_DEFAULT } from '@/constants/i18n';
import { Locale } from '@/types/i18n';

const initI18next = async (namespace: Namespace, locale: Locale) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend((loc: string, ns: string) => {
        return import(`../../../localization/${loc}/${ns}.json`);
      }),
    )
    .init({
      supportedLngs: LOCALES,
      fallbackLng: LOCALE_DEFAULT,
      lng: locale,
      fallbackNS: I18N_DEFAULT_NS,
      defaultNS: I18N_DEFAULT_NS,
      ns: namespace,
    });
  return i18nInstance;
};

export async function useTranslationServer(namespace: Namespace, locale: Locale) {
  const i18nextInstance = await initI18next(namespace, locale);
  return {
    t: i18nextInstance.getFixedT(locale, namespace),
    i18n: i18nextInstance,
  };
}
