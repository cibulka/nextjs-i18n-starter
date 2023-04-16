'use client';
import Link from 'next/link';

import { useLocale } from '@/hooks/client/useLocale';
import { Locale } from '@/types/i18n';

import { getLocalizedUrl } from './LinkLocalized.utils';
import { LinkProps } from './LinkLocalized.types';

export function LinkLocalizedClient(props: LinkProps & { locale?: Locale }) {
  const localeCurrent = useLocale();
  const locale = props.locale || localeCurrent;
  if (typeof props.href !== 'string') {
    throw new Error('LinkLocalizedClient: Supports only strings ATM.');
  }
  const href = getLocalizedUrl(props.href, locale);

  return (
    <Link {...props} href={href}>
      {props.children}
    </Link>
  );
}
