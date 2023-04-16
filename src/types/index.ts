import { STATE } from '@/constants';

export type State = typeof STATE[keyof typeof STATE];
