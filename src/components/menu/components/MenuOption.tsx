import Link from 'next/link';

export function MenuOptionLink(props: {
  className: string;
  href: string;
  label: string | JSX.Element;
}) {
  return (
    <Link href={props.href} className={props.className}>
      {props.label}
    </Link>
  );
}

export function MenuOptionButton(props: {
  className: string;
  label: string | JSX.Element;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={() => props.onClick()}>
      {props.label}
    </button>
  );
}
