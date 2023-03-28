import 'server-only';

import { cookies, headers } from 'next/headers';
import { redirect, notFound } from 'next/navigation';
import { sitecorePagePropsFactory } from 'lib/page-props-factory';
import { Providers } from './Providers';
import Layout from './jss-layout';

type PageProps = { params: { path?: string[]; lang: string } };

export default async function Page({ params }: PageProps) {
  const context = {
    preview: false,
    params,
    locale: params.lang,
    req: { cookies: cookies(), headers: headers() },
  };

  const pageProps = await sitecorePagePropsFactory.create(context);

  if (pageProps.notFound) {
    notFound();
  }

  if (pageProps.redirect) {
    redirect(pageProps.redirect.destination);
  }

  return (
    <Providers {...pageProps}>
      <Layout layoutData={pageProps.layoutData} headLinks={pageProps.headLinks} />
    </Providers>
  );
}

// <Head /> tag implementation
export async function generateMetadata({ params }: PageProps) {
  return {
    title: params.path ? params.path[0] : 'Home',
  };
}

/* ============ SSR START =============== */
export const dynamic = 'force-dynamic';
/* ============ SSR END =============== */

/* ============ SSG START =============== */
// // https://beta.nextjs.org/docs/api-reference/segment-config#generatestaticparams
// export async function generateStaticParams() {
//   return [{ lang: 'en', path: 'styleguide' }, { lang: 'en' }];
// }

// // Dynamic segments not included in generateStaticParams are generated on demand.
// // https://beta.nextjs.org/docs/api-reference/segment-config#dynamicparams
// export const dynamicParams = true;

// // https://beta.nextjs.org/docs/api-reference/segment-config#revalidate
// export const revalidate = 5;

// // https://beta.nextjs.org/docs/api-reference/segment-config#dynamic
// export const dynamic = 'error';
/* ============ SSG END =============== */
