import { NextPage } from 'next';
import Link from 'next/link';
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
      <Link href="/" locale={false}>
        Go to the Home page
      </Link>
    </div>
  </>
);

ErrorPage.getInitialProps = ({ res }) => {
  return { statusCode: res?.statusCode };
};

export default ErrorPage;
