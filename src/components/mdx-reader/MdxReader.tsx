'server only';
import { AllTypes } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';

import { useComponents } from '@/content/useComponents';

export async function MdxReader(props: { locale: string; pageNum?: number; post: AllTypes }) {
  const MDXContent = useMDXComponent(props.post.body.code);
  const components = useComponents(props.locale, props.post);
  // @ts-expect-error Server component
  return <MDXContent components={components} />;
}
