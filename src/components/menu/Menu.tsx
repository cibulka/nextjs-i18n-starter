'use client';
import { useState } from 'react';
import { Menu as MenuHeadless } from '@headlessui/react';
import { Float } from '@headlessui-float/react';

import { IconCaretDown } from '@/icons';

import { MenuOptionButton, MenuOptionLink } from './components/MenuOption';

export type MenuOption<T extends string | number> = {
  href?: string;
  label: string | JSX.Element;
  onClick?: () => void;
  value: T;
};

export function Menu<T extends string | number = string>(props: {
  classNameMenu?: string;
  icon?: JSX.Element;
  initialValue?: number;
  options: MenuOption<T>[];
  placement?: 'top-start' | 'top-end' | 'bottom-end' | 'bottom-start';
}) {
  const initialIndex = props.initialValue
    ? props.options.findIndex((v) => v.value === props.initialValue)
    : 0;
  const [index, setIndex] = useState(initialIndex);
  const option = props.options[index];
  const placement = props.placement || 'bottom-start';

  return (
    <MenuHeadless>
      <Float placement={placement} flip>
        <MenuHeadless.Button className="flex items-center text-sm cursor-pointer gap-2">
          {props.icon && <span className="mdMax:hidden w-4 h-4">{props.icon}</span>}
          {option.label}
          <span className="w-4 h-4 ml-2">
            <IconCaretDown />
          </span>
        </MenuHeadless.Button>
        <MenuHeadless.Items
          className={[props.classNameMenu, 'shadow-md mt-2'].filter(Boolean).join(' ')}
        >
          {props.options.map((option, i) => (
            <MenuHeadless.Item key={option.value}>
              {({ active }) => {
                const className = [
                  'flex justify-between py-1 px-4 border-b border-neutral-500',
                  active && 'bg-blue-500',
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
    </MenuHeadless>
  );
}
