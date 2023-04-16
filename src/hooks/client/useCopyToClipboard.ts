'use client';
import { useState } from 'react';

import { STATE } from '@/constants';
import { State } from '@/types';
import { useTimeoutCancelable } from './useTimeoutCancelable';

export function useCopyToClipboard(reset: number | null = 1000) {
  const [state, setState] = useState<State>(STATE.IDLE);

  useTimeoutCancelable(() => setState(STATE.IDLE), reset);

  function onCopy(value: string) {
    if (!navigator?.clipboard) {
      setState(STATE.FAILURE);
      return;
    }
    navigator.clipboard
      .writeText(value)
      .then(() => setState(STATE.SUCCESS))
      .catch(() => setState(STATE.FAILURE));
  }

  return { onCopy, state };
}
