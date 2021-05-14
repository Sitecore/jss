import Head from 'next/head';
import { useEffect } from 'react';
import { trackingService } from 'lib/tracking-service-factory';

/**
 * Rendered in case if we have 404 error
 */
const NotFound = (): JSX.Element => {
  useEffect(() => {
    if (document.cookie.split(';').some((item) => item.trim().startsWith('skip_404_tracking='))) {
      document.cookie = 'skip_404_tracking=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    } else {
      trackingService
        .trackPage({ url: location.pathname + location.search }, { sc_trk: 'Page not found' })
        .catch((error) => console.error('Tracking failed: ' + error.message));
    }
  }, []);

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
