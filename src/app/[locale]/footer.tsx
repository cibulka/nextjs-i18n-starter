'only-server';

import { Contact } from '@/blocks/Contact';
import { LocaleSwitcher } from '@/components/locale-switcher/LocaleSwitcher';
import { IconGlobe } from '@/icons';

export function Footer() {
  return (
    <footer className="flex justify-center py-2 theme-black">
      <div className="cib-section w-full flex items-center justify-between">
        <LocaleSwitcher />
        <Contact
          className="bg-slate-700 text-sm"
          classNames={{ link: 'px-2', button: 'border-l flex items-center justify-center p-2' }}
        />
      </div>
    </footer>
  );
}
