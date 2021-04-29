import Head from 'next/head';
import { trackingService } from 'lib/tracking-factory';
import { areQueryParamsReady } from 'lib/util';

/**
 * Rendered in case if we have 404 error
 */
const NotFound = (): JSX.Element => {
  if (typeof window !== 'undefined' && areQueryParamsReady()) {
    trackingService
      .trackPage({ url: location.pathname + location.search }, { sc_trk: 'Page not found' })
      .catch((error) => console.error('Tracking failed: ' + error.message));
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

export default NotFound;
