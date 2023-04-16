'server only';
import { PropsWithChildren, ReactNode } from 'react';
import { AllTypes } from 'contentlayer/generated';

import { LinkLocalizedServer } from '@/components/link-localized/LinkLocalizedServer';
import { isAbsoluteUrl } from '@/utils/url';

function isParagraphNode(children: ReactNode[]) {
  const firstEl = children[0];
  return typeof firstEl === 'string' || (firstEl as any)?.type === 'strong';
}

export function useComponents(locale: string, post?: AllTypes) {
  return {
    a: (p: PropsWithChildren & { href: string }) => {
      const isExternal = isAbsoluteUrl(p.href);
      return isExternal ? (
        <a {...p} target="_blank" rel="noreferrer">
          {p.children}
        </a>
      ) : (
        <LinkLocalizedServer href={p.href} locale={locale}>
          {p.children}
        </LinkLocalizedServer>
      );
    },
    p: (p: PropsWithChildren) => {
      const isParagraph =
        typeof p.children === 'string' ||
        (Array.isArray(p.children) && isParagraphNode(p.children));

      return isParagraph ? <p>{p.children}</p> : <>{p.children}</>;
    },
  };
}
