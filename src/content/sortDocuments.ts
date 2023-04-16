import { AllTypes } from 'contentlayer/generated';

import { isDocSortableByOrder } from './utils/type-guards';

export function sortByOrder(a: AllTypes, b: AllTypes) {
  if (!isDocSortableByOrder(a)) return -1;
  if (!isDocSortableByOrder(b)) return 1;
  return (a.order || 0) - (b.order || 0);
}

export function sortByTitle(a: AllTypes, b: AllTypes) {
  return a.title.localeCompare(b.title);
}
