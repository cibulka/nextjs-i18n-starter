'server only';
import { AllTypes, allPages } from 'contentlayer/generated';

import { LOCALE_DEFAULT } from '@/constants/i18n';
import { QUERY_TYPE } from '@/constants/content';
import { QueryType } from '@/types/content';
import { normalizeQueryType } from '@/utils/normalize';

import { Query, filterDocument } from './filterDocument';
import { mergeDocumentMeta } from './mergeDocumentMeta';
import { sortByOrder, sortByTitle } from './sortDocuments';

function getAllDocumentsByType(type: QueryType) {
  switch (normalizeQueryType(type, false)) {
    case QUERY_TYPE.PAGE:
      return allPages;
    default:
      throw new Error(`getDocumentsByType: Unknown type ${type}.`);
  }
}

function getAllDocumentsByTypes(types: QueryType[]) {
  return types.map(getAllDocumentsByType).flat();
}

function getDocumentMerged(types: QueryType[], slug: string, locale: string) {
  const allPosts = getAllDocumentsByTypes(types);
  const postsWithSlug = allPosts.filter((p) => p.slug === slug);
  const postDefault = postsWithSlug.find((p) => p.locale === LOCALE_DEFAULT);
  const postTranslated = postsWithSlug.find((p) => p.locale === locale) || null;
  return postDefault ? mergeDocumentMeta(postDefault, postTranslated) : null;
}

/* API */

export function getDocuments(query: Query, locale: string, sort: 'order' | 'title') {
  const allPosts = getAllDocumentsByTypes(query.types);
  const postsFiltered = allPosts.filter((p) => {
    return query ? filterDocument(p, query) : true;
  });

  const slugs = Array.from(new Set(postsFiltered.map((p) => p.slug)));

  let result: AllTypes[] = [];
  slugs.forEach((slug) => {
    const merged = getDocumentMerged(query.types, slug, locale);
    if (merged) result = [...result, merged];
  });

  switch (sort) {
    case 'order':
      result = result.sort(sortByOrder);
      break;
    case 'title':
      result = result.sort(sortByTitle);
      break;
    default:
      throw new Error('Unknown sort');
  }

  return result;
}

export function getDocument(type: QueryType, slug: string, locale: string) {
  return getDocumentMerged([type], slug, locale);
}
