import { QUERY_TYPE } from '@/constants/content';
import { QueryType } from '@/types/content';

export function getCommaSeparatedValues(str: string | string[]) {
  if (Array.isArray(str)) return str;
  return str
    .split(',')
    .filter(Boolean)
    .map((str) => str.trim());
}

export function normalizeString(str: string) {
  let result = str;
  result = result.toLocaleLowerCase();
  result = result.trim();
  return result;
}

export function normalizeQueryType(type: string, strict = true) {
  switch (normalizeString(type)) {
    case 'page':
    case 'pages':
      return QUERY_TYPE.PAGE;
    default:
      if (strict) throw new Error(`normalizeQueryType: Unknown type ${type}.`);
      return null;
  }
}

export function getTypesFromCommaSeparatedString(str: string) {
  let result: QueryType[] = [];
  getCommaSeparatedValues(str).forEach((v) => {
    const type = normalizeQueryType(v, false);
    if (type) result = [...result, type];
  });
  return result;
}
