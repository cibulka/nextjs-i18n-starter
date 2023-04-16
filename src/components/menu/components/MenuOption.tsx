import { forwardRef } from 'react';
import Link from 'next/link';

type MenuOptionLinkProps = {
  className: string;
  href: string;
  label: string | JSX.Element;
  onClick: () => void;
};

export const MenuOptionLink = forwardRef<HTMLAnchorElement, MenuOptionLinkProps>(
  function MenuOptionLinkWithRef(props, ref) {
    return (
      <Link href={props.href} className={props.className} onClick={props.onClick} ref={ref}>
        {props.label}
      </Link>
    );
  },
);

type MenuOptionButtonProps = {
  className: string;
  label: string | JSX.Element;
  onClick: () => void;
};

export const MenuOptionButton = forwardRef<HTMLButtonElement, MenuOptionButtonProps>(
  function MenuOptionButtonWithRef(props, ref) {
    return (
      <button type="button" onClick={() => props.onClick()} ref={ref}>
        {props.label}
      </button>
    );
  },
);
