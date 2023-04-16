'use client';

import { EMAIL, STATE } from '@/constants';
import { useCopyToClipboard } from '@/hooks/client/useCopyToClipboard';
import { IconExclamation, IconCheck, IconCopy } from '@/icons';

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
  const { onCopy, state } = useCopyToClipboard();

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
        onClick={() => onCopy(value)}
      >
        {state === STATE.FAILURE ? (
          <IconExclamation />
        ) : state === STATE.SUCCESS ? (
          <IconCheck />
        ) : (
          <IconCopy />
        )}
      </button>
    </span>
  );
}
