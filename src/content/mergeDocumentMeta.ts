import { AllTypes } from 'contentlayer/generated';

export function mergeDocumentMeta(postDefault: AllTypes, postTranslated: AllTypes | null) {
  if (!postTranslated) return postDefault;
  if (postTranslated.locale === postDefault.locale) return postTranslated;

  return {
    ...postDefault,
    ...postTranslated,
  };
}
