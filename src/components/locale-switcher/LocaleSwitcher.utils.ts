'use client';
import { useLocale } from '@/hooks/client/useLocale';
import { useTranslationClient } from '@/hooks/client/useTranslationClient';
import { Locale } from '@/types/i18n';

export function useGetLabel() {
  const locale = useLocale();
  const { t } = useTranslationClient('common', locale);
  return function getLabel(l: Locale) {
    return t('lang', { lng: l });
  };
}
