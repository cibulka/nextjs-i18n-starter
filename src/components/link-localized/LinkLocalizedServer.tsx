'server only';
import Link from 'next/link';

import { LinkProps } from './LinkLocalized.types';
import { getLocalizedUrl } from './LinkLocalized.utils';

export function LinkLocalizedServer(props: LinkProps & { locale: string }) {
  if (!props.locale) {
    throw new Error('LinkLocalizedServer: Must have locale in props.');
  }
  if (typeof props.href !== 'string') {
    throw new Error('LinkLocalizedServer: Supports only strings ATM.');
  }

  const href = getLocalizedUrl(props.href, props.locale);
  return (
    <Link {...props} href={href}>
      {props.children}
    </Link>
  );
}
