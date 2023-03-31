import 'server-only';

import { cookies, headers } from 'next/headers';
import { redirect, notFound } from 'next/navigation';
import { sitecorePagePropsFactory } from 'lib/page-props-factory';
// import { sitemapFetcher } from 'lib/sitemap-fetcher';
import { Providers } from './Providers';
import Layout from './jss-layout';
// import { i18n } from '../../../../i18n-config';
// import { StaticPath } from '@sitecore-jss/sitecore-jss-nextjs';

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
// export const dynamic = 'force-dynamic';
/* ============ SSR END =============== */

/* ============ SSG START =============== */
// export const generateStaticParams = async () => {
//   let paths: StaticPath[] = [];

//   if (process.env.NODE_ENV !== 'development' && !process.env.DISABLE_SSG_FETCH) {
//     try {
//       // Note: Next.js runs export in production mode
//       paths = await sitemapFetcher.fetch(i18n.locales);
//     } catch (error) {
//       console.log('Error occurred while fetching static paths');
//       console.log(error);
//     }
//   }

//   return paths;
// };

// // Dynamic segments not included in generateStaticParams are generated on demand.
// // https://beta.nextjs.org/docs/api-reference/segment-config#dynamicparams
// export const dynamicParams = false;

// // https://beta.nextjs.org/docs/api-reference/segment-config#revalidate
// export const revalidate = 5;

// // https://beta.nextjs.org/docs/api-reference/segment-config#dynamic
// export const dynamic = 'error';
/* ============ SSG END =============== */
