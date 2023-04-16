'use client';
import { usePathname } from 'next/navigation';

import { Menu } from '@/components/menu/Menu';
import { LinkLocalizedClient } from '@/components/link-localized/LinkLocalizedClient';
import { getLocalizedUrl } from '@/components/link-localized/LinkLocalized.utils';
import { LOCALES } from '@/constants/i18n';
import { useLocale } from '@/hooks/client/useLocale';
import { IconGlobe } from '@/icons';

import { useGetLabel } from './LocaleSwitcher.utils';

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const getLabel = useGetLabel();

  const otherLocales = LOCALES.filter((l) => l !== locale);

  if (otherLocales.length === 0) return null;

  if (otherLocales.length === 1) {
    return (
      <LinkLocalizedClient
        href={pathname}
        className="flex items-center gap-2"
        locale={otherLocales[0]}
      >
        <span className="w-6 h-6">
          <IconGlobe />
        </span>
        <span>{getLabel(otherLocales[0])}</span>
      </LinkLocalizedClient>
    );
  }

  return (
    <Menu
      classNameMenu="theme-black"
      icon={<IconGlobe />}
      options={LOCALES.map((l) => ({
        href: getLocalizedUrl(pathname, l),
        value: l,
        label: getLabel(l),
      }))}
    />
  );
}
