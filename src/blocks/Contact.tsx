'use client';
import React, { useEffect, useState } from 'react';
import { useCopyToClipboard } from 'react-use';

import { EMAIL, STATE } from '@/constants';
import { useTimeoutCancelable } from '@/hooks/client/useTimeoutCancelable';
import { IconExclamation, IconCheck, IconCopy } from '@/icons';
import { State } from '@/types';

export function Contact(props: {
  className?: string;
  classNames?: {
    button?: string;
    link?: string;
    linkBg?: string;
    text?: string;
    wrap?: string;
  };
  call?: string;
  iconLeft?: JSX.Element;
  mailto?: string;
  web?: string;
}) {
  const [state, setState] = useState<State>(STATE.IDLE);
  const [copyState, copyToClipboard] = useCopyToClipboard();

  useEffect(() => {
    if (copyState.error) setState(STATE.FAILURE);
    if (copyState.value) setState(STATE.SUCCESS);
  }, [copyState]);
  useTimeoutCancelable(() => setState(STATE.IDLE), state !== STATE.IDLE ? 1000 : null);

  let protocol;
  let value: string;
  if (props.call) {
    protocol = 'call:';
    value = props.call;
  } else if (props.web) {
    protocol = '';
    value = props.web;
  } else {
    protocol = 'mailto:';
    value = props.mailto || EMAIL;
  }

  return (
    <span
      className={[
        props.className || 'inline-flex',
        props.classNames?.wrap || 'rounded bg-bg-dark',
        'flex items-center',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span
        className={[props.classNames?.link || 'px-4 py-1 border-r-2 border-bg', 'flex items-center']
          .filter(Boolean)
          .join(' ')}
      >
        {props.iconLeft && <span className="w-4 h-4 mr-2">{props.iconLeft}</span>}
        <a
          className={['truncate', props.classNames?.text || 'block'].filter(Boolean).join(' ')}
          href={`${[protocol, value].filter(Boolean).join(':')}`}
        >
          {value}
        </a>
      </span>
      <button
        className={['flex w-8 h-8', props.classNames?.button || 'p-1 flex-shrink-0']
          .filter(Boolean)
          .join(' ')}
        type="button"
        onClick={() => copyToClipboard(value)}
      >
        {state === STATE.FAILURE ? (
          <IconExclamation className="fill-error" />
        ) : state === STATE.SUCCESS ? (
          <IconCheck className="fill-success" />
        ) : (
          <IconCopy />
        )}
      </button>
    </span>
  );
}
