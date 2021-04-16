import Head from 'next/head';
import { trackingService } from 'lib/tracking-service';
import { withNotFoundPageTracking } from 'lib/with-personalization-and-tracking';

/**
 * Rendered in case if we have 404 error
 */
const NotFound = (): JSX.Element => {
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

export default withNotFoundPageTracking({ trackingService })(NotFound);
