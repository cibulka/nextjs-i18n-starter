'use client';
import { usePathname } from 'next/navigation';

import { Menu } from '@/components/menu/Menu';
import { LinkLocalizedClient } from '@/components/link-localized/LinkLocalizedClient';
import { getLocalizedUrl } from '@/components/link-localized/LinkLocalized.utils';
import { LOCALES } from '@/constants/i18n';
import { useLocale } from '@/hooks/client/useLocale';
import { IconGlobe } from '@/icons';
import { Locale } from '@/types/i18n';

// the most efficient solution is to hardcode the labels here
function getLabel(locale: Locale) {
  switch (locale) {
    case 'cs':
      return 'Česky';
    case 'es':
      return 'Español';
    case 'de':
      return 'Deutsch';
    case 'en':
    default:
      return 'English';
  }
}

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

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
      className="theme-black text-sm"
      classNames={{
        menu: 'bg-page-bright',
        menuItem: 'px-4 py-2',
      }}
      icon={<IconGlobe />}
      menuWidth="15em"
      options={LOCALES.map((l) => ({
        href: getLocalizedUrl(pathname, l),
        isSelected: l === locale,
        value: l,
        label: getLabel(l),
      }))}
    />
  );
}
