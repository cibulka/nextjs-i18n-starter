import { defineDocumentType } from 'contentlayer/source-files';

import { computeLocaleData } from '../utils';

const DIR = 'pages';

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: `${DIR}/*/*.mdx`,
  contentType: 'mdx',
  fields: {
    order: {
      type: 'number',
    },
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
  },
  computedFields: {
    ...computeLocaleData(DIR),
  },
}));
