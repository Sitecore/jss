import { NextPage } from 'next';
import Head from 'next/head';

interface ErrorPageProps {
  statusCode?: number | null | undefined;
}

/**
 * Rendered in case if we have 500 error, used only in Production mode
 * @link https://nextjs.org/docs/advanced-features/custom-error-page#customizing-the-error-page
 */
const ErrorPage: NextPage<ErrorPageProps> = ({ statusCode }) => (
  <>
    <Head>
      <title>Error</title>
    </Head>
    <div style={{ padding: 10 }}>
      <p>
        {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
      </p>
      <a href="/">Go to the Home page</a>
    </div>
  </>
);

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode };
};

export default ErrorPage;
