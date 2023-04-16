'use client';
import { useState } from 'react';
import { Menu as MenuHeadless } from '@headlessui/react';
import { Float } from '@headlessui-float/react';

import { IconCaretDown } from '@/icons';

import { MenuOptionButton, MenuOptionLink } from './components/MenuOption';

export type MenuOption<T extends string | number> = {
  href?: string;
  isSelected?: boolean;
  label: string | JSX.Element;
  onClick?: () => void;
  value: T;
};

export function Menu<T extends string | number = string>(props: {
  className?: string;
  classNames?: {
    buttonClosed?: string;
    buttonOpen?: string;
    menu?: string;
    menuItem?: string;
    menuItemActive?: string;
    menuItemIdle?: string;
    menuItemSelected?: string;
  };
  icon?: JSX.Element;
  initialValue?: number;
  options: MenuOption<T>[];
  placement?: 'top-start' | 'top-end' | 'bottom-end' | 'bottom-start';
  menuWidth: string;
}) {
  const initialIndex = props.initialValue
    ? props.options.findIndex((v) => v.value === props.initialValue)
    : 0;
  const [index, setIndex] = useState(initialIndex);
  const option = props.options[index];
  const placement = props.placement || 'bottom-start';

  return (
    <MenuHeadless>
      {({ open }) => (
        <Float placement={placement} flip={32}>
          <MenuHeadless.Button
            className={[
              'flex items-center gap-2',
              'cursor-pointer gap-2',
              'py-1 px-4',
              props.className,
              !open && props.classNames?.buttonClosed,
              open && (props.classNames?.buttonOpen || 'bg-page-bright'),
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {props.icon && !open && <span className="mdMax:hidden w-6 h-6'">{props.icon}</span>}
            {option.label}
            <span
              className={[
                'w-3 h-3',
                'transform transition-transform',
                open ? 'rotate-180' : 'rotate-0',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <IconCaretDown />
            </span>
          </MenuHeadless.Button>
          <MenuHeadless.Items
            className={[props.classNames?.menu, 'shadow-md mt-2', 'focus:outline-0']
              .filter(Boolean)
              .join(' ')}
            style={{ width: props.menuWidth }}
          >
            {props.options.map((option, i) => (
              <MenuHeadless.Item key={option.value}>
                {({ active }) => {
                  const className = [
                    'flex justify-between',
                    props.classNames?.menuItem || 'py-2 px-4',
                    active && (props.classNames?.menuItemActive || 'bg-action'),
                    option.isSelected && (props.classNames?.menuItemSelected || 'font-bold'),
                  ]
                    .filter(Boolean)
                    .join(' ');
                  return option.href ? (
                    <MenuOptionLink className={className} href={option.href} label={option.label} />
                  ) : (
                    <MenuOptionButton
                      className={className}
                      onClick={() => {
                        setIndex(i);
                        if (option.onClick) option.onClick();
                      }}
                      label={option.label}
                    />
                  );
                }}
              </MenuHeadless.Item>
            ))}
          </MenuHeadless.Items>
        </Float>
      )}
    </MenuHeadless>
  );
}
