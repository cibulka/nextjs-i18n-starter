import { QUERY_TYPE } from '@/constants/content';

export type QueryType = typeof QUERY_TYPE[keyof typeof QUERY_TYPE];
