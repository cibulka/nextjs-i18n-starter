import { AllTypes } from 'contentlayer/generated';
import path from 'path';

export function getSlugAndLocale(post: AllTypes) {
  const result = path.basename(post._raw.sourceFileName, '.mdx').split('.').filter(Boolean);
  if (result.length !== 2) throw new Error('NOPE');
  return result as [string, string];
}

export function computeLocaleData(dir: string) {
  return {
    locale: {
      type: 'string' as const,
      resolve: (post: AllTypes) => {
        const [, locale] = getSlugAndLocale(post);
        return locale;
      },
    },
    slug: {
      type: 'string' as const,
      resolve: (post: AllTypes) => {
        const [slug] = getSlugAndLocale(post);
        return slug;
      },
    },
    url: {
      type: 'string' as const,
      resolve: (post: AllTypes) => {
        const [slug, locale] = getSlugAndLocale(post);
        if (dir === 'pages') {
          return `/${locale}/${slug}`;
        }
        return `/${locale}/${dir}/${slug}`;
      },
    },
  };
}
