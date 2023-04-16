'only-server';
import Link from 'next/link';

import { getDocuments } from '@/content/getDocuments';
import { QUERY_TYPE } from '@/constants/content';
import { LinkLocalizedServer } from '@/components/link-localized/LinkLocalizedServer';
import { useTranslationServer } from '@/hooks/server/useTranslationServer';
import { Locale } from '@/types/i18n';

export async function Nav(props: { locale: Locale }) {
  const pages = getDocuments({ types: [QUERY_TYPE.PAGE] }, props.locale, 'order');
  const { t } = await useTranslationServer('common', props.locale);

  return (
    <nav className="flex justify-center">
      <div className="cib-section py-2 w-full flex items-center justify-between">
        <h1 className="font-bold">
          <LinkLocalizedServer href="/" locale={props.locale}>
            {t('app.title')}
          </LinkLocalizedServer>
        </h1>
        {pages.length > 0 ? (
          <ul className="cib-section flex items-center gap-4">
            {pages.map((page) => (
              <li key={page.slug}>
                <Link href={page.url} className="underline">
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div>No pages</div>
        )}
      </div>
    </nav>
  );
}
