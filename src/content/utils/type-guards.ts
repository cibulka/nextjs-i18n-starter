import { AllTypes, Page } from 'contentlayer/generated';

import { QUERY_TYPE } from '@/constants/content';

export function isDocSortableByOrder(doc: AllTypes): doc is Page {
  return doc.type === QUERY_TYPE.PAGE;
}
