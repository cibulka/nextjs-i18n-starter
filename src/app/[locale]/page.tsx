import { MdxReader } from '@/components/mdx-reader/MdxReader';
import { QUERY_TYPE } from '@/constants/content';
import { getDocument } from '@/content/getDocuments';
import { notFound } from 'next/navigation';

export default function Home(props: { params: { locale: string } }) {
  const page = getDocument(QUERY_TYPE.PAGE, 'home', props.params.locale);
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
