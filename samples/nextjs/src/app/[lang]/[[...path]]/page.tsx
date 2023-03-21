import { cookies } from 'next/headers';
import { headers } from 'next/headers';
import { sitecorePagePropsFactory } from 'lib/page-props-factory';

type PageProps = { params: { path?: string[]; lang: string } };

export const dynamic = 'force-dynamic';

export default async function Page({ params }: PageProps) {
  const context = {
    preview: false,
    params,
    locale: params.lang,
    req: { cookies: cookies(), headers: headers() },
  };
  const data = await sitecorePagePropsFactory.create(context);

  console.log('FETCHED:', data);

  // console.log('=====', params, rest);
  return <div>PAGE!!!!</div>;
}

// <Head /> tag implementation
export async function generateMetadata({ params, ...rest }: PageProps) {
  console.log(params, rest);
  return {
    title: params.path ? params.path[0] : 'Home',
  };
}
