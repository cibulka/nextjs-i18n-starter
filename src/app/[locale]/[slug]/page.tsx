import { allPages } from 'contentlayer/generated';
import { notFound } from 'next/navigation';

import { MdxReader } from '@/components/mdx-reader/MdxReader';
import { getDocument } from '@/content/getDocuments';
import { QUERY_TYPE } from '@/constants/content';

export function generateStaticParams() {
  const slugs = allPages.map((page) => page.slug);
  return Array.from(new Set(slugs));
}

export default function Page(props: { params: { locale: string; slug: string } }) {
  const page = getDocument(QUERY_TYPE.PAGE, props.params.slug, props.params.locale);
  if (!page) notFound();
  return (
    <>
      <div className="flex-1 mb-8" />
      <div className="prose ml-auto mr-auto">
        {/* @ts-expect-error Server component */}
        <MdxReader post={page} locale={props.params.locale} />
      </div>
      <div className="flex-1" />
      <div className="flex-1 mb-8" />
    </>
  );
}
