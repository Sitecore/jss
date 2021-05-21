import Head from 'next/head';
import { useRouter } from 'next/router';
import { isServer } from '@sitecore-jss/sitecore-jss-nextjs';
import { trackingService } from 'lib/tracking-service-factory';

/**
 * Rendered in case if we have 404 error
 */
const NotFound = (): JSX.Element => {
  if (!isServer() && areQueryParamsReady()) {
    trackingService
      .trackPage({ url: location.pathname + location.search }, { sc_trk: 'Page not found' })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((error: any) => console.error('Tracking failed: ' + error.message));
  }

  return (
    <>
      <Head>
        <title>404: NotFound</title>
      </Head>
      <div style={{ padding: 10 }}>
        <h1>Page not found</h1>
        <p>This page does not exist.</p>
        <a href="/">Go to the Home page</a>
      </div>
    </>
  );
};

/*
 * Pages that are statically optimized will be hydrated without their route parameters provided.
 * After hydration, Next.js will trigger an update to your application to provide the route parameters in the query object.
 *
 * The latest Next.js version has router.isReady property.
 * Remove it after switching to the latest Next.js version.
 */
function areQueryParamsReady(): boolean {
  const router = useRouter();

  const minQueryLength = router.query.path !== undefined ? 2 : 1;

  const index = router.asPath.indexOf('?');

  return (
    index < 0 ||
    router.asPath.length === index + 1 ||
    Object.keys(router.query).length >= minQueryLength
  );
}

export default NotFound;
