'only-server';

import { Contact } from '@/blocks/contact/Contact';
import { LocaleSwitcher } from '@/components/locale-switcher/LocaleSwitcher';

export function Footer() {
  return (
    <footer className="flex justify-center py-2 theme-black">
      <div className="cib-section w-full flex items-center justify-between">
        <LocaleSwitcher />
        <Contact
          className="bg-page-bright text-sm"
          classNames={{ link: 'px-2', button: 'border-l flex items-center justify-center p-2' }}
        />
      </div>
    </footer>
  );
}
