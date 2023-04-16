import { AllTypes } from 'contentlayer/generated';

import { QueryType } from '@/types/content';

export type Query = {
  types: QueryType[];
};

export function filterDocument(post: AllTypes, query: Query, filter?: (post: AllTypes) => boolean) {
  if (filter && !filter(post)) return false;

  if (!query.types.includes(post.type)) return false;

  return true;
}
